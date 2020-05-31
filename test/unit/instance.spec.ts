import { _createInstance, attachIter } from '../../src/instance'
import { createDefaultSchema } from '../../src/schema'

test('_createInstance', () => {
  const validator = _createInstance()
  const schema = createDefaultSchema()

  expect(typeof validator.$validate).toStrictEqual('function')
  expect(typeof validator.$reset).toStrictEqual('function')

  expect(validator.$hasError).toStrictEqual(false)
  expect(validator.$hasValidated).toStrictEqual(false)
  expect(validator.$errors).toStrictEqual({})
  expect(validator.$isPending).toStrictEqual(false)
  expect(validator.$iter).toStrictEqual({})
  expect(validator.$params).toStrictEqual({})

  expect(validator._schema).toStrictEqual(schema)
  expect(validator._rootTarget).toStrictEqual(undefined)
})

test('attachIter', () => {
  const $errors = {}
  const $hasError = false
  const $hasValidated = false
  const $isPending = false
  const $iter = {}
  const $params = {}
  const $reset = () => undefined
  const $validate = () => Promise.resolve()
  const _schema = createDefaultSchema()
  const _target = {}
  const another1 = {}
  const $another2 = {}

  const validator: any = {
    $errors,
    $hasError,
    $hasValidated,
    $isPending,
    $iter,
    $params,
    $reset,
    $validate,
    _schema,
    _target,
    another1,
    $another2,
  }

  expect(Object.keys(validator)).toEqual(expect.arrayContaining([]))
  attachIter(validator, [])

  expect(Object.keys(validator.$iter)).toEqual(expect.arrayContaining(['another1', '$another2']))
  expect(validator.$iter.another1).toBe(another1)
  expect(validator.$iter.$another2).toBe($another2)
})
