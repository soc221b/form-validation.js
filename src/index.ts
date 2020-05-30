import { Schema, Instance, Path } from '../type/index'
import { _createInstance, disableEnumerabilityForInstanceReservedProperties, attachFunctions } from './instance'
import { normalizeSchema, disableEnumerabilityForSchemaReservedProperties } from './schema'

function createInstance(schema: Schema, path: Path = []): Instance {
  const normalizedSchema: Required<Schema> = normalizeSchema(schema)
  disableEnumerabilityForSchemaReservedProperties(normalizedSchema)

  const instance: Instance = _createInstance(normalizedSchema)

  attachFunctions(instance, path)
  disableEnumerabilityForInstanceReservedProperties(instance)

  Object.keys(normalizedSchema).forEach(key => {
    instance[key] = createInstance(normalizedSchema[key], path.concat(key))
  })

  return instance
}

export { getByPath } from './util'
export { createInstance }
