import { Normalizer, Rule, Error } from '../type'
import { IBaseValidator, publicKey, privateKey, pathKey } from './proxy'
import { IStatableValidator } from './validation-state'
import { getByPath, noop, isPlainObject, isFunction } from './util'

export const schemaKey = 'schema'

interface ISchema {
  $params: { [key: string]: any }
  $normalizer: Normalizer
  $rules: { [key: string]: Rule }
  $errors: { [key: string]: Error }

  [key: string]: any
}

export interface ISchemaValidator extends IBaseValidator, IStatableValidator {
  [key: string]: any
  [privateKey]: {
    [pathKey]: string[]
    invalid: boolean
    validated: boolean
    pending: number
    dirty: boolean
    setValidated: (value: boolean) => void
    setInvalid: (value: boolean) => void
    setDirty: (value: boolean) => void
    setPending: (value: boolean) => void
    resetPending: () => void
    [key: string]: any

    [schemaKey]: ISchema
  }
  [publicKey]: {
    [key: string]: any

    pending: boolean
    invalid: boolean
    dirty: boolean
    anyDirty: boolean
    error: boolean
    anyError: boolean
    errors: {
      [key: string]: any
    }
  }
}

const createDefaultSchema = (): ISchema => {
  return {
    $params: {},
    $normalizer: ({ value }) => value,
    $rules: {},
    $errors: {},
  }
}

export const wrapSchema = ({
  rootSchema,
  validator,
}: {
  rootSchema: Partial<ISchema>
  validator: IStatableValidator
}): void => {
  const path = validator[privateKey][pathKey]

  // init
  const defaultSchema = createDefaultSchema()
  validator[privateKey][schemaKey] = (validator[privateKey][schemaKey] || {}) as ISchemaValidator
  validator[privateKey][schemaKey].$params = defaultSchema.$params
  validator[privateKey][schemaKey].$normalizer = defaultSchema.$normalizer
  validator[privateKey][schemaKey].$rules = defaultSchema.$rules
  validator[privateKey][schemaKey].$errors = defaultSchema.$errors

  applyMostAppropriateSchema({ rootSchema, validator, path: path.slice(), startIndex: 0 })

  // normalize errors
  for (const key in validator[privateKey][schemaKey].$rules) {
    if (validator[privateKey][schemaKey].$errors[key] === undefined) {
      validator[privateKey][schemaKey].$errors[key] = noop
    }
  }
}

const applyMostAppropriateSchema = ({
  rootSchema,
  validator,
  path,
  startIndex,
}: {
  rootSchema: Partial<ISchema>
  validator: IStatableValidator
  path: string[]
  startIndex: number
}) => {
  if (startIndex === path.length) {
    try {
      const schema = getByPath(rootSchema, path)
      if (shouldUseSchema(schema)) {
        if (isPlainObject(schema.$params)) validator[privateKey][schemaKey].$params = schema.$params
        if (isFunction(schema.$normalizer)) validator[privateKey][schemaKey].$normalizer = schema.$normalizer
        if (isPlainObject(schema.$rules)) validator[privateKey][schemaKey].$rules = schema.$rules
        if (isPlainObject(schema.$errors)) validator[privateKey][schemaKey].$errors = schema.$errors
        return true
      }
    } catch (error) {}

    return false
  }

  // dedicate
  if (applyMostAppropriateSchema({ rootSchema, validator, path, startIndex: startIndex + 1 })) return true

  // iter
  const oldKey = path[startIndex]
  path[startIndex] = '$iter'
  if (applyMostAppropriateSchema({ rootSchema, validator, path, startIndex: startIndex + 1 })) return true
  path[startIndex] = oldKey

  return false
}

const shouldUseSchema = (schema?: Partial<ISchema>) => {
  if (schema === undefined) return false

  if (schema.$params !== undefined) return true
  if (schema.$normalizer !== undefined) return true
  if (schema.$rules !== undefined) return true
  if (schema.$errors !== undefined) return true

  return false
}
