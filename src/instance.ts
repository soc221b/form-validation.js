import { Instance, Schema, Path } from '../type/index'

import { isPlainObject, noop, hasKey, getByPath } from './util'
import { createDefaultSchema } from './schema'

import { normalizeSchema, defaultSchema } from './schema'

type ValidateParams = {
  instance: Instance
  path: Path
}

type ResetParams = {
  instance: Instance
}

export function createInstance(schema: Schema, path: Path = []): Instance {
  const normalizedSchema: Required<Schema> = normalizeSchema(schema)

  const instance: Instance = _createInstance(normalizedSchema)
  Object.keys(normalizedSchema).forEach(key => {
    if (hasKey(defaultSchema, key)) return
    instance[key] = createInstance(normalizedSchema[key], path.concat(key))
  })
  attachFunctions(instance, path)
  attachIter(instance, path)

  return instance
}

export const defaultInstance = _createInstance()

export function _createInstance(schema: Required<Schema> = createDefaultSchema()): Instance {
  const instance: Instance = {
    $bind: undefined,
    $validate: () => Promise.resolve(),
    $reset: noop,
    $hasValidated: false,
    $isPending: false,

    $hasError: false,
    $errors: Object.keys(schema.$rules).reduce(($errors: { [key: string]: any }, key) => {
      $errors[key] = undefined
      return $errors
    }, {}),

    $iter: {},
    $params: {},

    _schema: schema,
    _target: undefined,
  }

  return instance
}

export function attachIter(instance: Instance, path: Path) {
  Object.keys(instance).forEach(key => {
    if (hasKey(defaultInstance, key)) return
    instance.$iter[key] = instance[key]
  })
}

export function attachFunctions(instance: Instance, path: Path) {
  instance.$bind = (target: any) => _bindRecursively(instance, target)
  _attachFunctions(instance, path)
}
function _bindRecursively(instance: Instance, target: any) {
  instance._target = target

  Object.keys(instance).forEach(key => {
    if (hasKey(defaultInstance, key)) return
    if (isPlainObject(instance[key]) === false) return

    _bindRecursively(instance[key], target)
  })
}
function _attachFunctions(instance: Instance, path: Path) {
  instance.$validate = () => validate({ instance, path })
  instance.$reset = () => reset({ instance })
}

export async function validate({ instance, path }: ValidateParams): Promise<void> {
  await Promise.all([
    _validate({ instance, path }),
    ...Object.keys(instance).map(async key => {
      if (hasKey(defaultInstance, key)) return
      if (isPlainObject(instance[key]) === false) return

      await validate({ instance: instance[key], path: path.concat(key) })
    }),
  ])
}

async function _validate({ instance, path }: ValidateParams): Promise<void> {
  instance.$hasValidated = true
  instance.$isPending = true
  instance.$hasError = false
  Object.keys(instance.$errors).forEach(key => (instance.$errors[key] = undefined))

  const target = instance._target
  const key = path[path.length - 1]
  const value = getByPath(target, path)
  const params = instance._schema.$params
  const normalizedValue = instance._schema.$normalizer({ value, key, params, path, target })
  await Promise.all(
    Object.keys(instance._schema.$rules).map(async ruleKey => {
      const rule = instance._schema.$rules[ruleKey]
      const success = await rule({ value: normalizedValue, key, path, params, target })
      if (success !== undefined) {
        instance.$hasError = true
        instance.$errors[ruleKey] = instance._schema.$errors[ruleKey]({
          value: normalizedValue,
          key,
          path,
          params,
          target,
        })
      }
    }),
  )
  instance.$isPending = false
}

export function reset({ instance }: ResetParams) {
  _reset({ instance })
  Object.keys(instance).forEach(key => {
    if (hasKey(defaultInstance, key)) return
    if (isPlainObject(instance[key]) === false) return

    reset({ instance: instance[key] })
  })
}
export function _reset({ instance }: ResetParams) {
  instance.$hasValidated = false
  instance.$isPending = false
  instance.$hasError = false
  Object.keys(instance.$errors).forEach(key => (instance.$errors[key] = undefined))
}
