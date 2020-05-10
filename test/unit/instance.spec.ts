import {
  createDefaultInstance,
  addSchemaProxy,
  disableEnumerabilityForInstanceReservedProperties,
} from '../../src/instance'
import { Instance, Schema } from '../../type'
import { createDefaultSchema } from '../../src/schema'

test('createDefaultInstance', () => {
  const instance = createDefaultInstance()
  const schema = createDefaultSchema()

  expect(typeof instance.$validate).toStrictEqual('function')
  expect(typeof instance.$reset).toStrictEqual('function')

  expect(instance.$hasError).toStrictEqual(false)
  expect(instance.$hasValidated).toStrictEqual(false)
  expect(instance.$errors).toStrictEqual({})
  expect(instance.$isPending).toStrictEqual(false)
  expect(instance.$iter).toStrictEqual({})
  expect(instance.$params).toStrictEqual({})

  expect(instance._schema).toStrictEqual(schema)
})

test('addSchemaProxy', () => {
  const schema: Required<Schema> = {
    $params: {},
    $normalizer: () => {},
    $rules: {},
    $errors: {},

    deep: {
      $params: {},
      $normalizer: () => {},
      $rules: {},
      $errors: {},

      nesting: {
        $params: {},
        $normalizer: () => {},
        $rules: {},
        $errors: {},
      },
    },
  }
  const instance: Instance = createDefaultInstance()
  instance.deep = createDefaultInstance()

  addSchemaProxy(instance, schema)

  expect(instance._schema.$params).toBe(schema.$params)
  expect(instance._schema.$normalizer).toBe(schema.$normalizer)
  expect(instance._schema.$rules).toBe(schema.$rules)
  expect(instance._schema.$errors).toBe(schema.$errors)

  expect(instance._schema.deep.$params).toBe(schema.deep.$params)
  expect(instance._schema.deep.$normalizer).toBe(schema.deep.$normalizer)
  expect(instance._schema.deep.$rules).toBe(schema.deep.$rules)
  expect(instance._schema.deep.$errors).toBe(schema.deep.$errors)

  expect(instance._schema.deep.nesting.$params).toBe(schema.deep.nesting.$params)
  expect(instance._schema.deep.nesting.$normalizer).toBe(schema.deep.nesting.$normalizer)
  expect(instance._schema.deep.nesting.$rules).toBe(schema.deep.nesting.$rules)
  expect(instance._schema.deep.nesting.$errors).toBe(schema.deep.nesting.$errors)

  expect(instance.deep._schema.$params).toBe(schema.deep.$params)
  expect(instance.deep._schema.$normalizer).toBe(schema.deep.$normalizer)
  expect(instance.deep._schema.$rules).toBe(schema.deep.$rules)
  expect(instance.deep._schema.$errors).toBe(schema.deep.$errors)

  expect(instance.deep._schema.nesting.$params).toBe(schema.deep.nesting.$params)
  expect(instance.deep._schema.nesting.$normalizer).toBe(schema.deep.nesting.$normalizer)
  expect(instance.deep._schema.nesting.$rules).toBe(schema.deep.nesting.$rules)
  expect(instance.deep._schema.nesting.$errors).toBe(schema.deep.nesting.$errors)
})

test('disableEnumerabilityForInstanceReservedProperties', () => {
  const instance: Instance = createDefaultInstance()

  expect(Object.keys(instance).length).toStrictEqual(9)

  disableEnumerabilityForInstanceReservedProperties(instance)

  expect(Object.keys(instance)).toStrictEqual([])
})
