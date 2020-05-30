import { createDefaultSchema, normalizeSchema, disableEnumerabilityForSchemaReservedProperties } from '../../src/schema'

test('createDefaultSchema', () => {
  const schema = createDefaultSchema()

  expect(schema.$params).toStrictEqual({})
  expect(typeof schema.$normalizer).toStrictEqual('function')
  expect(schema.$rules).toStrictEqual({})
  expect(schema.$errors).toStrictEqual({})
})

test('normalizeSchema', () => {
  const anotherKey1 = Symbol('anotherKey1')
  const schema = {
    anotherKey1,
    nesting: {},
  }

  const normalizedSchema = normalizeSchema(schema)
  expect(normalizedSchema.$params).toStrictEqual({})
  expect(typeof normalizedSchema.$normalizer).toStrictEqual('function')
  expect(normalizedSchema.$rules).toStrictEqual({})
  expect(normalizedSchema.$errors).toStrictEqual({})

  expect(normalizedSchema.nesting.$params).toStrictEqual({})
  expect(typeof normalizedSchema.nesting.$normalizer).toStrictEqual('function')
  expect(normalizedSchema.nesting.$rules).toStrictEqual({})
  expect(normalizedSchema.nesting.$errors).toStrictEqual({})

  expect(normalizedSchema.anotherKey1).toStrictEqual(anotherKey1)
})

test('disableEnumerabilityForSchemaReservedProperties', () => {
  const $errors = {}
  const $normalizer = function () {}
  const $params = {}
  const $rules = {}
  const anotherKey1 = {}
  const $anotherKey2 = {}
  const schema = {
    $errors,
    $normalizer,
    $params,
    $rules,
    anotherKey1,
    $anotherKey2,
  }

  expect(Object.keys(schema)).toStrictEqual([
    '$errors',
    '$normalizer',
    '$params',
    '$rules',
    'anotherKey1',
    '$anotherKey2',
  ])
  expect(schema.$errors).toBe($errors)
  expect(schema.$normalizer).toBe($normalizer)
  expect(schema.$params).toBe($params)
  expect(schema.$rules).toBe($rules)
  expect(schema.anotherKey1).toBe(anotherKey1)
  expect(schema.$anotherKey2).toBe($anotherKey2)

  disableEnumerabilityForSchemaReservedProperties(schema)

  expect(Object.keys(schema)).toStrictEqual(['anotherKey1', '$anotherKey2'])
  expect(schema.$errors).toBe($errors)
  expect(schema.$normalizer).toBe($normalizer)
  expect(schema.$params).toBe($params)
  expect(schema.$rules).toBe($rules)
  expect(schema.anotherKey1).toBe(anotherKey1)
  expect(schema.$anotherKey2).toBe($anotherKey2)
})
