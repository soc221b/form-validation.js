import { Schema, Instance, Path } from '../type/index'
import { _createInstance, attachFunctions, attachIter, defaultInstance } from './instance'
import { normalizeSchema, defaultSchema } from './schema'
import { hasKey } from './util'

function createInstance(schema: Schema, path: Path = []): Instance {
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

export { getByPath } from './util'
export { createInstance }
