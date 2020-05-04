import { Schema, FormValidationInstance, FunctionRule } from '../type/index'
import { isArray, isPlainObject, isFunction, deepCopy, noop, identity } from './util'

function generateDefaultFormValidationInstance(): FormValidationInstance {
  return {
    $validateSync: noop,
    $validate: noop,
    $reset: noop,
    $hasMessage: false,
    $isPending: false,
    $iter: null,
    $messages: [],
    $params: {},
    $hasValidated: false,

    _rule: null,
    _params: null,
    _normalizer: null,
  }
}

function normalizeInstance(instance: FormValidationInstance): FormValidationInstance {
  const normalized = deepCopy(instance)

  if (isFunction(normalized._normalizer) === false) {
    normalized._normalizer = identity
  }

  if (isFunction(normalized._rule)) {
    normalized._rule = [normalized._rule as FunctionRule]
  } else if (isArray(normalized._rule) === false) {
    normalized._rule = []
  }

  if (isPlainObject(normalized._params) === false) {
    normalized._params = {}
  }

  return normalized
}

function definePropertiesForSchema(schema: Schema): void {
  const descriptor = {
    enumerable: false,
  }

  Object.defineProperty(schema, '$rule', descriptor)
  Object.defineProperty(schema, '$params', descriptor)
  Object.defineProperty(schema, '$normalizer', descriptor)
}

function definePropertiesForInstance(instance: FormValidationInstance): void {
  const descriptor = {
    enumerable: false,
    writable: true,
  }

  Object.defineProperty(instance, '$validateSync', descriptor)
  Object.defineProperty(instance, '$validate', descriptor)
  Object.defineProperty(instance, '$reset', descriptor)

  Object.defineProperty(instance, '$hasMessage', descriptor)
  Object.defineProperty(instance, '$isPending', descriptor)
  Object.defineProperty(instance, '$iter', descriptor)
  Object.defineProperty(instance, '$messages', descriptor)
  Object.defineProperty(instance, '$params', descriptor)
  Object.defineProperty(instance, '$hasValidated', descriptor)

  Object.defineProperty(instance, '_rule', descriptor)
  Object.defineProperty(instance, '_params', descriptor)
  Object.defineProperty(instance, '_normalizer', descriptor)
}

export default function createSchema(schema: Schema): FormValidationInstance {
  const copiedSchema = deepCopy(schema)
  definePropertiesForSchema(copiedSchema)

  let instance: FormValidationInstance = generateDefaultFormValidationInstance()
  instance._rule = copiedSchema.$rule
  instance._params = copiedSchema.$params
  instance._normalizer = copiedSchema.$normalizer
  instance = normalizeInstance(instance)

  Object.keys(copiedSchema).forEach(key => {
    instance[key] = createSchema(copiedSchema[key])
  })

  definePropertiesForInstance(instance)
  return instance
}
