import { Instance, Schema, Rule, Path, Param } from '../type/index'

import { isPlainObject, noop, hasKey, isArray, getByPath, isPromise, deepCopy, curry } from './util'
import { createDefaultSchema } from './schema'

const defaultInstance = createDefaultInstance()

export function createDefaultInstance(schema: Required<Schema> = createDefaultSchema()): Instance {
  const defaultSchema = createDefaultSchema()
  const instance: Instance = {
    $validate: () => Promise.resolve(),
    $reset: noop,
    $hasValidated: false,
    $isPending: false,

    $hasError: false,
    $errors: {},

    $iter: {},
    $params: {},

    _schema: createDefaultSchema(),
  }

  Object.keys(schema).forEach(key => {
    if (hasKey(defaultSchema, key)) return
    if (isPlainObject(schema[key]) === false) return

    instance[key] = createDefaultInstance(schema[key])
  })

  return instance
}

export function addSchemaProxy(instance: Instance, normalizedSchema: Required<Schema>): void {
  if (isPlainObject(instance) === false) return
  if (isPlainObject(normalizedSchema) === false) return

  const descriptor = {
    get() {
      return normalizedSchema
    },
    set() {
      if (__DEV__) {
        throw Error('Do not directly mutate schema from instance.')
      }
    },
  }
  Object.defineProperty(instance, '_schema', descriptor)

  Object.keys(instance).forEach(key => {
    if (hasKey(defaultInstance, key)) return

    addSchemaProxy(instance[key], normalizedSchema[key])
  })
}

export function disableEnumerabilityForInstanceReservedProperties(instance: Instance): void {
  if (isPlainObject(instance) === false) return

  const descriptor = {
    enumerable: false,
    configurable: true,
    writable: true,
  }
  Object.keys(defaultInstance).forEach(key => {
    Object.defineProperty(instance, key, descriptor)
  })

  Object.keys(instance).forEach(key => {
    if (hasKey(defaultInstance, key)) return

    disableEnumerabilityForInstanceReservedProperties(instance[key])
  })
}

export function attachFunctions(instance: Instance) {
  instance.$validate = target => validate({ instance, path: [], target })
  instance.$reset = () => reset({ instance })

  Object.keys(instance).forEach(key => {
    if (hasKey(defaultInstance, key)) return
    if (isPlainObject(instance[key]) === false) return

    attachFunctions(instance[key])
  })
}

type ValidateParams = {
  instance: Instance
  path: Path
  target: any
}
export async function validate({ instance, path, target }: ValidateParams): Promise<void> {
  instance.$hasValidated = true
  instance.$isPending = true
  instance.$hasError = false
  instance.$errors = {}

  const key = path[path.length - 1]
  const value = getByPath(target, path)
  const params = instance._schema.$params
  const normalizedValue = instance._schema.$normalizer({ value, key, params, path, target })
  await Promise.all(
    Object.keys(instance._schema.$rules).map(async ruleKey => {
      const rule = instance._schema.$rules[ruleKey]
      const success = await rule({ value: normalizedValue, key, path, params, target })
      if (success === false) {
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

  if (isPlainObject(value) === false && isArray(value) === false) return
  await Promise.all(
    Object.keys(instance).map(async key => {
      if (isPlainObject(instance[key]) === false) return

      await validate({ instance: instance[key], path: [...path, key], target: target })
    }),
  )
}

type ResetParams = {
  instance: Instance
}
export function reset({ instance }: ResetParams) {
  instance.$hasValidated = false
  instance.$isPending = false
  instance.$hasError = false
  instance.$errors = {}

  Object.keys(instance).forEach(key => {
    if (hasKey(defaultInstance, key)) return
    if (isPlainObject(instance[key]) === false) return

    reset({ instance: instance[key] })
  })
}
