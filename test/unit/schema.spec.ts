import { createDefaultSchema, normalizeSchema, disableEnumerabilityForSchemaReservedProperties } from '../../src/schema'

test('createDefaultSchema', () => {
  const schema = createDefaultSchema()

  expect(schema.$params).toStrictEqual({})
  expect(typeof schema.$normalizer).toStrictEqual('function')
  expect(schema.$rules).toStrictEqual({})
  expect(schema.$errors).toStrictEqual({})
})

test('normalizeSchema', () => {
  const schema1 = {
    deep: {
      nesting: {},
    },
  }
  const normalizedSchema1 = normalizeSchema(schema1)
  expect(normalizedSchema1.$params).toStrictEqual({})
  expect(typeof normalizedSchema1.$normalizer).toStrictEqual('function')
  expect(normalizedSchema1.$rules).toStrictEqual({})
  expect(normalizedSchema1.$errors).toStrictEqual({})

  expect(normalizedSchema1.deep.$params).toStrictEqual({})
  expect(typeof normalizedSchema1.deep.$normalizer).toStrictEqual('function')
  expect(normalizedSchema1.deep.$rules).toStrictEqual({})
  expect(normalizedSchema1.deep.$errors).toStrictEqual({})

  expect(normalizedSchema1.deep.nesting.$params).toStrictEqual({})
  expect(typeof normalizedSchema1.deep.nesting.$normalizer).toStrictEqual('function')
  expect(normalizedSchema1.deep.nesting.$rules).toStrictEqual({})
  expect(normalizedSchema1.deep.nesting.$errors).toStrictEqual({})

  const schema2 = createDefaultSchema()
  schema2.deep = createDefaultSchema()
  schema2.deep.nesting = createDefaultSchema()
  const normalizedSchema2 = normalizeSchema(schema2)

  expect(normalizedSchema2.$params.param).toBe(schema2.$params.param)
  expect(normalizedSchema2.$normalizer).toBe(schema2.$normalizer)
  expect(normalizedSchema2.$rules.rule).toBe(schema2.$rules.rule)
  expect(normalizedSchema2.$errors.rule).toBe(schema2.$errors.rule)

  expect(normalizedSchema2.deep.$params.param).toBe(schema2.deep.$params.param)
  expect(normalizedSchema2.deep.$normalizer).toBe(schema2.deep.$normalizer)
  expect(normalizedSchema2.deep.$rules.rule).toBe(schema2.deep.$rules.rule)
  expect(normalizedSchema2.deep.$errors.rule).toBe(schema2.deep.$errors.rule)

  expect(normalizedSchema2.deep.nesting.$params.param).toBe(schema2.deep.nesting.$params.param)
  expect(normalizedSchema2.deep.nesting.$normalizer).toBe(schema2.deep.nesting.$normalizer)
  expect(normalizedSchema2.deep.nesting.$rules.rule).toBe(schema2.deep.nesting.$rules.rule)
  expect(normalizedSchema2.deep.nesting.$errors.rule).toBe(schema2.deep.nesting.$errors.rule)
})

test('disableEnumerabilityForSchemaReservedProperties', () => {
  const schema = createDefaultSchema()
  schema.deep = createDefaultSchema()
  schema.deep.nesting = createDefaultSchema()

  expect(Object.keys(schema).length).toStrictEqual(5)
  expect(Object.keys(schema.deep).length).toStrictEqual(5)
  expect(Object.keys(schema.deep.nesting).length).toStrictEqual(4)

  disableEnumerabilityForSchemaReservedProperties(schema)
  expect(Object.keys(schema)).toStrictEqual(['deep'])
  expect(Object.keys(schema.deep)).toStrictEqual(['nesting'])
  expect(Object.keys(schema.deep.nesting)).toStrictEqual([])
})
