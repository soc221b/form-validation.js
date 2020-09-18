import { Param, Schema } from '../type'
import { getByPathWithFallback, getOwnKeys, hasOwnKey, noop } from './util'

// TODO: performance impact
export const normalizeSchema = (schema: Partial<Schema>): Schema => {
  const defaultSchema = getDefaultSchema()

  if (schema.$params === undefined) schema.$params = defaultSchema.$params
  if (schema.$normalizer === undefined) schema.$normalizer = defaultSchema.$normalizer
  if (schema.$rules === undefined) schema.$rules = defaultSchema.$rules
  if (schema.$messages === undefined) schema.$messages = defaultSchema.$messages
  for (const key of getOwnKeys(schema.$rules)) {
    if (hasOwnKey(schema.$messages, key) === false) {
      schema.$messages[key] = noop
    }
  }

  for (const key of getOwnKeys(schema)) {
    if (hasOwnKey(defaultSchema, key)) continue
    schema[key] = normalizeSchema(schema[key])
  }

  return schema as Schema
}

export const getSchema = ({ rootSchema, path }: { rootSchema: Schema; path: string[] }): Schema => {
  const schema = _getSchema({ rootSchema, path: path.slice(), startIndex: 0 })
  if (schema) {
    return schema
  }

  const defaultSchema = getDefaultSchema()
  defaultSchema.$noSchemaSpecified = true
  return defaultSchema
}

const _getSchema = ({
  rootSchema,
  path,
  startIndex,
}: {
  rootSchema: Schema
  path: string[]
  startIndex: number
}): Schema | null => {
  let schema: Schema | null = null

  if (startIndex === path.length) {
    schema = getByPathWithFallback(rootSchema, path, null)

    if (schema && schema.$rules) return schema

    return null
  }

  // dedicate
  schema = _getSchema({ rootSchema, path, startIndex: startIndex + 1 })
  if (schema !== null) return schema

  // iter
  const oldKey = path[startIndex]
  path[startIndex] = '$iter'
  schema = _getSchema({ rootSchema, path, startIndex: startIndex + 1 })
  if (schema !== null) return schema
  path[startIndex] = oldKey

  return null
}

const getDefaultSchema = (): Schema => {
  return {
    $noSchemaSpecified: false,
    $params: {},
    $normalizer: ({ value }: Partial<Param>) => value,
    $rules: {},
    $messages: {},
  }
}
