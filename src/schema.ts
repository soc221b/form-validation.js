import { Schema, Param } from '../type/index'
import { isPlainObject, hasKey } from './util'

const defaultSchema = createDefaultSchema()
const defaultNormalizer = ({ value }: Param) => value
export function createDefaultSchema(): Required<Schema> {
  return {
    $params: {},
    $normalizer: defaultNormalizer,
    $rules: {},
    $errors: {},
  }
}

export function normalizeSchema(schema: Schema): Required<Schema> {
  const normalizedSchema: Required<Schema> = createDefaultSchema()

  Object.keys(normalizedSchema).forEach(key => {
    if (hasKey(schema, key) === false) return

    normalizedSchema[key] = schema[key]
  })

  Object.keys(schema).forEach(key => {
    if (hasKey(normalizedSchema, key)) return

    if (isPlainObject(schema[key]) === false) {
      normalizedSchema[key] = schema[key]
      return
    }

    normalizedSchema[key] = normalizeSchema(schema[key])
  })

  return normalizedSchema
}

export function disableEnumerabilityForSchemaReservedProperties(schema: Required<Schema>): void {
  const descriptor = {
    enumerable: false,
    configurable: true,
    writable: true,
  }
  Object.keys(defaultSchema).forEach(key => {
    Object.defineProperty(schema, key, descriptor)
  })

  Object.keys(schema).forEach(key => {
    if (hasKey(defaultSchema, key)) return
    if (isPlainObject(schema[key]) === false) return

    disableEnumerabilityForSchemaReservedProperties(schema[key])
  })
}
