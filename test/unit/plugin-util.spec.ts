import { proxy, recursiveCallChildren, recursiveCallParent } from '../../'
import { VALIDATOR_KEY } from '../../src/validator'

test('it should call parent recusively', () => {
  const form = {
    deep1: {
      nested1: {
        key1: 'value1',
        key2: 'value2',
      },
      nested2: {
        key1: 'value1',
        key2: 'value2',
      },
    },
    deep2: {
      nested1: {
        key1: 'value1',
        key2: 'value2',
      },
      nested2: {
        key1: 'value1',
        key2: 'value2',
      },
    },
  }
  const { validationWrapper } = proxy({ form, schema: {} })
  const fn = jest.fn()

  fn.mockClear()
  recursiveCallParent({ validator: validationWrapper.deep1.nested1.key1[VALIDATOR_KEY], callback: fn })
  expect(fn).toBeCalled()
  expect(fn.mock.calls[0][0]).toStrictEqual(validationWrapper.deep1.nested1)
  expect(fn.mock.calls[1][0]).toStrictEqual(validationWrapper.deep1)
  expect(fn.mock.calls[2][0]).toStrictEqual(validationWrapper)

  fn.mockClear()
  recursiveCallParent({ validator: validationWrapper.deep1.nested1[VALIDATOR_KEY], callback: fn })
  expect(fn).toBeCalled()
  expect(fn.mock.calls[0][0]).toStrictEqual(validationWrapper.deep1)
  expect(fn.mock.calls[1][0]).toStrictEqual(validationWrapper)

  fn.mockClear()
  recursiveCallParent({ validator: validationWrapper.deep1[VALIDATOR_KEY], callback: fn })
  expect(fn).toBeCalled()
  expect(fn.mock.calls[0][0]).toStrictEqual(validationWrapper)

  fn.mockClear()
  recursiveCallParent({ validator: validationWrapper[VALIDATOR_KEY], callback: fn })
  expect(fn).not.toBeCalled()
})

test('it should call self and parent recusively', () => {
  const form = {
    deep1: {
      nested1: {
        key1: 'value1',
        key2: 'value2',
      },
      nested2: {
        key1: 'value1',
        key2: 'value2',
      },
    },
    deep2: {
      nested1: {
        key1: 'value1',
        key2: 'value2',
      },
      nested2: {
        key1: 'value1',
        key2: 'value2',
      },
    },
  }
  const { validationWrapper } = proxy({ form, schema: {} })
  const fn = jest.fn()

  fn.mockClear()
  recursiveCallParent({
    validator: validationWrapper.deep1.nested1.key1[VALIDATOR_KEY],
    callback: fn,
    shouldCallSelf: true,
  })
  expect(fn).toBeCalled()
  expect(fn.mock.calls[0][0]).toStrictEqual(validationWrapper.deep1.nested1.key1)
  expect(fn.mock.calls[1][0]).toStrictEqual(validationWrapper.deep1.nested1)
  expect(fn.mock.calls[2][0]).toStrictEqual(validationWrapper.deep1)
  expect(fn.mock.calls[3][0]).toStrictEqual(validationWrapper)

  fn.mockClear()
  recursiveCallParent({ validator: validationWrapper.deep1.nested1[VALIDATOR_KEY], callback: fn, shouldCallSelf: true })
  expect(fn).toBeCalled()
  expect(fn.mock.calls[0][0]).toStrictEqual(validationWrapper.deep1.nested1)
  expect(fn.mock.calls[1][0]).toStrictEqual(validationWrapper.deep1)
  expect(fn.mock.calls[2][0]).toStrictEqual(validationWrapper)

  fn.mockClear()
  recursiveCallParent({ validator: validationWrapper.deep1[VALIDATOR_KEY], callback: fn, shouldCallSelf: true })
  expect(fn).toBeCalled()
  expect(fn.mock.calls[0][0]).toStrictEqual(validationWrapper.deep1)
  expect(fn.mock.calls[1][0]).toStrictEqual(validationWrapper)

  fn.mockClear()
  recursiveCallParent({ validator: validationWrapper[VALIDATOR_KEY], callback: fn, shouldCallSelf: true })
  expect(fn).toBeCalled()
  expect(fn.mock.calls[0][0]).toStrictEqual(validationWrapper)
})

test('it should call children recusively', () => {
  const form = {
    deep1: {
      nested1: {
        key1: 'value1',
        key2: 'value2',
      },
      nested2: {
        key1: 'value1',
        key2: 'value2',
      },
    },
    deep2: {
      nested1: {
        key1: 'value1',
        key2: 'value2',
      },
      nested2: {
        key1: 'value1',
        key2: 'value2',
      },
    },
  }
  const { validationWrapper } = proxy({ form, schema: {} })
  const fn = jest.fn()

  fn.mockClear()
  recursiveCallChildren({ validator: validationWrapper.deep1.nested1.key1[VALIDATOR_KEY], callback: fn })
  expect(fn).not.toBeCalled()

  fn.mockClear()
  recursiveCallChildren({ validator: validationWrapper.deep1.nested1[VALIDATOR_KEY], callback: fn })
  expect(fn).toBeCalled()
  expect(fn.mock.calls[0][0]).toStrictEqual(validationWrapper.deep1.nested1.key1)
  expect(fn.mock.calls[1][0]).toStrictEqual(validationWrapper.deep1.nested1.key2)

  fn.mockClear()
  recursiveCallChildren({ validator: validationWrapper.deep1[VALIDATOR_KEY], callback: fn })
  expect(fn).toBeCalled()
  expect(fn.mock.calls[0][0]).toStrictEqual(validationWrapper.deep1.nested1)
  expect(fn.mock.calls[1][0]).toStrictEqual(validationWrapper.deep1.nested2)
  expect(fn.mock.calls[2][0]).toStrictEqual(validationWrapper.deep1.nested1.key1)
  expect(fn.mock.calls[3][0]).toStrictEqual(validationWrapper.deep1.nested1.key2)
  expect(fn.mock.calls[4][0]).toStrictEqual(validationWrapper.deep1.nested2.key1)
  expect(fn.mock.calls[5][0]).toStrictEqual(validationWrapper.deep1.nested2.key2)

  fn.mockClear()
  recursiveCallChildren({ validator: validationWrapper[VALIDATOR_KEY], callback: fn })
  expect(fn).toBeCalled()
  expect(fn.mock.calls[0][0]).toStrictEqual(validationWrapper.deep1)
  expect(fn.mock.calls[1][0]).toStrictEqual(validationWrapper.deep2)
  expect(fn.mock.calls[2][0]).toStrictEqual(validationWrapper.deep1.nested1)
  expect(fn.mock.calls[3][0]).toStrictEqual(validationWrapper.deep1.nested2)
  expect(fn.mock.calls[4][0]).toStrictEqual(validationWrapper.deep2.nested1)
  expect(fn.mock.calls[5][0]).toStrictEqual(validationWrapper.deep2.nested2)
  expect(fn.mock.calls[6][0]).toStrictEqual(validationWrapper.deep1.nested1.key1)
  expect(fn.mock.calls[7][0]).toStrictEqual(validationWrapper.deep1.nested1.key2)
  expect(fn.mock.calls[8][0]).toStrictEqual(validationWrapper.deep1.nested2.key1)
  expect(fn.mock.calls[9][0]).toStrictEqual(validationWrapper.deep1.nested2.key2)
  expect(fn.mock.calls[10][0]).toStrictEqual(validationWrapper.deep2.nested1.key1)
  expect(fn.mock.calls[11][0]).toStrictEqual(validationWrapper.deep2.nested1.key2)
  expect(fn.mock.calls[12][0]).toStrictEqual(validationWrapper.deep2.nested2.key1)
  expect(fn.mock.calls[13][0]).toStrictEqual(validationWrapper.deep2.nested2.key2)
})

test('it should call self and children recusively', () => {
  const form = {
    deep1: {
      nested1: {
        key1: 'value1',
        key2: 'value2',
      },
      nested2: {
        key1: 'value1',
        key2: 'value2',
      },
    },
    deep2: {
      nested1: {
        key1: 'value1',
        key2: 'value2',
      },
      nested2: {
        key1: 'value1',
        key2: 'value2',
      },
    },
  }
  const { validationWrapper } = proxy({ form, schema: {} })
  const fn = jest.fn()

  fn.mockClear()
  recursiveCallChildren({
    validator: validationWrapper.deep1.nested1.key1[VALIDATOR_KEY],
    callback: fn,
    shouldCallSelf: true,
  })
  expect(fn).toBeCalled()
  expect(fn.mock.calls[0][0]).toStrictEqual(validationWrapper.deep1.nested1.key1)

  fn.mockClear()
  recursiveCallChildren({
    validator: validationWrapper.deep1.nested1[VALIDATOR_KEY],
    callback: fn,
    shouldCallSelf: true,
  })
  expect(fn).toBeCalled()
  expect(fn.mock.calls[0][0]).toStrictEqual(validationWrapper.deep1.nested1)
  expect(fn.mock.calls[1][0]).toStrictEqual(validationWrapper.deep1.nested1.key1)
  expect(fn.mock.calls[2][0]).toStrictEqual(validationWrapper.deep1.nested1.key2)

  fn.mockClear()
  recursiveCallChildren({ validator: validationWrapper.deep1[VALIDATOR_KEY], callback: fn, shouldCallSelf: true })
  expect(fn).toBeCalled()
  expect(fn.mock.calls[0][0]).toStrictEqual(validationWrapper.deep1)
  expect(fn.mock.calls[1][0]).toStrictEqual(validationWrapper.deep1.nested1)
  expect(fn.mock.calls[2][0]).toStrictEqual(validationWrapper.deep1.nested2)
  expect(fn.mock.calls[3][0]).toStrictEqual(validationWrapper.deep1.nested1.key1)
  expect(fn.mock.calls[4][0]).toStrictEqual(validationWrapper.deep1.nested1.key2)
  expect(fn.mock.calls[5][0]).toStrictEqual(validationWrapper.deep1.nested2.key1)
  expect(fn.mock.calls[6][0]).toStrictEqual(validationWrapper.deep1.nested2.key2)

  fn.mockClear()
  recursiveCallChildren({ validator: validationWrapper[VALIDATOR_KEY], callback: fn, shouldCallSelf: true })
  expect(fn).toBeCalled()
  expect(fn.mock.calls[0][0]).toStrictEqual(validationWrapper)
  expect(fn.mock.calls[1][0]).toStrictEqual(validationWrapper.deep1)
  expect(fn.mock.calls[2][0]).toStrictEqual(validationWrapper.deep2)
  expect(fn.mock.calls[3][0]).toStrictEqual(validationWrapper.deep1.nested1)
  expect(fn.mock.calls[4][0]).toStrictEqual(validationWrapper.deep1.nested2)
  expect(fn.mock.calls[5][0]).toStrictEqual(validationWrapper.deep2.nested1)
  expect(fn.mock.calls[6][0]).toStrictEqual(validationWrapper.deep2.nested2)
  expect(fn.mock.calls[7][0]).toStrictEqual(validationWrapper.deep1.nested1.key1)
  expect(fn.mock.calls[8][0]).toStrictEqual(validationWrapper.deep1.nested1.key2)
  expect(fn.mock.calls[9][0]).toStrictEqual(validationWrapper.deep1.nested2.key1)
  expect(fn.mock.calls[10][0]).toStrictEqual(validationWrapper.deep1.nested2.key2)
  expect(fn.mock.calls[11][0]).toStrictEqual(validationWrapper.deep2.nested1.key1)
  expect(fn.mock.calls[12][0]).toStrictEqual(validationWrapper.deep2.nested1.key2)
  expect(fn.mock.calls[13][0]).toStrictEqual(validationWrapper.deep2.nested2.key1)
  expect(fn.mock.calls[14][0]).toStrictEqual(validationWrapper.deep2.nested2.key2)
})
