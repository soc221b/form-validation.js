import { Normalizer, Rule, Error } from '../type'
import { IBaseValidator, publicKey, privateKey, pathKey, listenerKey, IPath } from './proxy'
import { IStatableValidator } from './validation-state'
import { getByPath } from './util'

export const schemaKey = 'schema'

interface ISchema {
  $params: { [key: string]: any }
  $normalizer: Normalizer
  $rules: { [key: string]: Rule }
  $errors: { [key: string]: Error }

  [key: string]: any
}

export interface ISchemaValidator extends IBaseValidator, IStatableValidator {
  [privateKey]: {
    [pathKey]: IPath
    [listenerKey]: ((...args: any) => any)[]
    invalid: boolean
    validated: boolean
    pending: number
    dirty: boolean
    setValidated: (value: boolean) => void
    setInvalid: (value: boolean) => void
    setDirty: (value: boolean) => void
    setPending: (value: boolean) => void
    resetPending: () => void

    [schemaKey]: ISchema

    [key: string]: any
  }
  [publicKey]: {
    pending: boolean
    invalid: boolean
    dirty: boolean
    anyDirty: boolean
    error: boolean
    anyError: boolean
    errors: {
      [key: string]: any
    }

    [key: string]: any
  }

  [key: string]: any
}

const defaultSchema: ISchema = {
  $params: {},
  $normalizer: ({ value }) => value,
  $rules: {},
  $errors: {},
}

export const wrapSchema = ({
  rootSchema,
  validator,
}: {
  rootSchema: Partial<ISchema>
  validator: IStatableValidator
}): void => {
  const path = validator[privateKey][pathKey]
  let schema

  // init
  validator[privateKey][schemaKey] = (validator[privateKey][schemaKey] || {}) as ISchemaValidator
  validator[privateKey][schemaKey].$params = defaultSchema.$params
  validator[privateKey][schemaKey].$normalizer = defaultSchema.$normalizer
  validator[privateKey][schemaKey].$rules = defaultSchema.$rules
  validator[privateKey][schemaKey].$errors = defaultSchema.$errors

  // iter
  if (path.length !== 0) {
    try {
      schema = getByPath(rootSchema, path.slice(0, -1).concat('$iter'))
    } catch (error) {}
    if (schema) {
      if (schema.$params !== undefined) validator[privateKey][schemaKey].$params = schema.$params
      if (schema.$normalizer !== undefined) validator[privateKey][schemaKey].$normalizer = schema.$normalizer
      if (schema.$rules !== undefined) validator[privateKey][schemaKey].$rules = schema.$rules
      if (schema.$errors !== undefined) validator[privateKey][schemaKey].$errors = schema.$errors
    }
  }

  // dedicate
  try {
    schema = getByPath(rootSchema, path)
  } catch (error) {}
  if (schema) {
    if (schema.$params !== undefined) validator[privateKey][schemaKey].$params = schema.$params
    if (schema.$normalizer !== undefined) validator[privateKey][schemaKey].$normalizer = schema.$normalizer
    if (schema.$rules !== undefined) validator[privateKey][schemaKey].$rules = schema.$rules
    if (schema.$errors !== undefined) validator[privateKey][schemaKey].$errors = schema.$errors
  }
}
