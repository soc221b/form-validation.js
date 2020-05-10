import { Schema, Instance } from '../type/index'
import {
  addSchemaProxy,
  createDefaultInstance,
  disableEnumerabilityForInstanceReservedProperties,
  attachFunctions,
} from './instance'
import { normalizeSchema, disableEnumerabilityForSchemaReservedProperties } from './schema'

export default function createInstance(schema: Schema): Instance {
  const normalizedSchema: Required<Schema> = normalizeSchema(schema)
  disableEnumerabilityForSchemaReservedProperties(normalizedSchema)

  const instance: Instance = createDefaultInstance(normalizedSchema)
  disableEnumerabilityForInstanceReservedProperties(instance)
  addSchemaProxy(instance, normalizedSchema)

  Object.keys(normalizedSchema).forEach(key => {
    instance[key] = createInstance(normalizedSchema[key])
  })

  attachFunctions(instance)

  return instance
}
