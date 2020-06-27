import { proxyStructure, publicKey, privateKey, pathKey, listenerKey } from '../../src/proxy'

test('proxyStructure', () => {
  const validator: { [key: string]: any } = {}
  let form: { [key: string]: any } = {}
  form = proxyStructure({ object: form, clone: validator })

  expect(validator).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: [],
      [listenerKey]: [],
    },
  })
  form.account = undefined
  expect(validator).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: [],
      [listenerKey]: [],
    },
    account: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['account'],
        [listenerKey]: [],
      },
    },
  })
  form.account = ''
  expect(validator).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: [],
      [listenerKey]: [],
    },
    account: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['account'],
        [listenerKey]: [],
      },
    },
  })
  delete form.account
  expect(validator).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: [],
      [listenerKey]: [],
    },
  })
})

test('proxyStructure (object)', () => {
  const validator: { [key: string]: any } = {}
  let form: { [key: string]: any } = {}
  form = proxyStructure({ object: form, clone: validator })

  expect(validator.mapping).toStrictEqual(undefined)
  form.mapping = undefined
  expect(validator.mapping).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: ['mapping'],
      [listenerKey]: [],
    },
  })
  delete form.mapping
  expect(validator.mapping).toStrictEqual(undefined)

  form.mapping = {}
  expect(validator.mapping).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: ['mapping'],
      [listenerKey]: [],
    },
  })

  form.mapping.key1 = 1
  expect(validator.mapping).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: ['mapping'],
      [listenerKey]: [],
    },
    key1: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['mapping', 'key1'],
        [listenerKey]: [],
      },
    },
  })

  form.mapping.key2 = 2
  expect(validator.mapping).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: ['mapping'],
      [listenerKey]: [],
    },
    key1: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['mapping', 'key1'],
        [listenerKey]: [],
      },
    },
    key2: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['mapping', 'key2'],
        [listenerKey]: [],
      },
    },
  })

  delete form.mapping
  expect(validator.mapping).toStrictEqual(undefined)

  form.mapping = {
    key1: 1,
    key2: 2,
  }
  expect(validator.mapping).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: ['mapping'],
      [listenerKey]: [],
    },
    key1: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['mapping', 'key1'],
        [listenerKey]: [],
      },
    },
    key2: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['mapping', 'key2'],
        [listenerKey]: [],
      },
    },
  })
})

test('proxyStructure (array)', () => {
  const validator: { [key: string]: any } = {}
  let form: { [key: string]: any } = {}
  form = proxyStructure({ object: form, clone: validator })

  expect(validator.ipAddresses).toStrictEqual(undefined)
  form.ipAddresses = undefined
  expect(validator.ipAddresses).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: ['ipAddresses'],
      [listenerKey]: [],
    },
  })
  delete form.ipAddresses
  expect(validator.ipAddresses).toStrictEqual(undefined)

  form.ipAddresses = []
  expect(validator.ipAddresses).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: ['ipAddresses'],
      [listenerKey]: [],
    },
    length: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['ipAddresses', 'length'],
        [listenerKey]: [],
      },
    },
  })

  form.ipAddresses.push('1.1.1.1')
  expect(validator.ipAddresses).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: ['ipAddresses'],
      [listenerKey]: [],
    },
    0: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['ipAddresses', '0'],
        [listenerKey]: [],
      },
    },
    length: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['ipAddresses', 'length'],
        [listenerKey]: [],
      },
    },
  })

  form.ipAddresses.push('3.3.3.3')
  expect(validator.ipAddresses).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: ['ipAddresses'],
      [listenerKey]: [],
    },
    0: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['ipAddresses', '0'],
        [listenerKey]: [],
      },
    },
    1: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['ipAddresses', '1'],
        [listenerKey]: [],
      },
    },
    length: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['ipAddresses', 'length'],
        [listenerKey]: [],
      },
    },
  })

  form.ipAddresses.splice(1, 0, '2.2.2.2')
  expect(validator.ipAddresses).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: ['ipAddresses'],
      [listenerKey]: [],
    },
    0: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['ipAddresses', '0'],
        [listenerKey]: [],
      },
    },
    1: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['ipAddresses', '1'],
        [listenerKey]: [],
      },
    },
    2: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['ipAddresses', '2'],
        [listenerKey]: [],
      },
    },
    length: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['ipAddresses', 'length'],
        [listenerKey]: [],
      },
    },
  })

  form.ipAddresses.splice(1, 1)
  expect(validator.ipAddresses).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: ['ipAddresses'],
      [listenerKey]: [],
    },
    0: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['ipAddresses', '0'],
        [listenerKey]: [],
      },
    },
    1: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['ipAddresses', '1'],
        [listenerKey]: [],
      },
    },
    length: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['ipAddresses', 'length'],
        [listenerKey]: [],
      },
    },
  })

  form.ipAddresses.pop()
  expect(validator.ipAddresses).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: ['ipAddresses'],
      [listenerKey]: [],
    },
    0: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['ipAddresses', '0'],
        [listenerKey]: [],
      },
    },
    length: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['ipAddresses', 'length'],
        [listenerKey]: [],
      },
    },
  })

  form.ipAddresses.shift()
  expect(validator.ipAddresses).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: ['ipAddresses'],
      [listenerKey]: [],
    },
    length: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['ipAddresses', 'length'],
        [listenerKey]: [],
      },
    },
  })

  form.ipAddresses = undefined
  expect(validator.ipAddresses).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: ['ipAddresses'],
      [listenerKey]: [],
    },
  })

  form.ipAddresses = ['1.1.1.1', '2.2.2.2', '3.3.3.3']
  expect(validator.ipAddresses).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: ['ipAddresses'],
      [listenerKey]: [],
    },
    0: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['ipAddresses', '0'],
        [listenerKey]: [],
      },
    },
    1: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['ipAddresses', '1'],
        [listenerKey]: [],
      },
    },
    2: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['ipAddresses', '2'],
        [listenerKey]: [],
      },
    },
    length: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['ipAddresses', 'length'],
        [listenerKey]: [],
      },
    },
  })

  form.ipAddresses = []
  expect(validator.ipAddresses).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: ['ipAddresses'],
      [listenerKey]: [],
    },
    length: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['ipAddresses', 'length'],
        [listenerKey]: [],
      },
    },
  })
})

test('proxyStructure (nested)', () => {
  const validator: { [key: string]: any } = {}
  let form: { [key: string]: any } = {}
  form = proxyStructure({ object: form, clone: validator })

  form.nested = {}
  expect(validator).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: [],
      [listenerKey]: [],
    },
    nested: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['nested'],
        [listenerKey]: [],
      },
    },
  })

  form.nested.ipAddresses = undefined
  expect(validator).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: [],
      [listenerKey]: [],
    },
    nested: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['nested'],
        [listenerKey]: [],
      },
      ipAddresses: {
        [publicKey]: {},
        [privateKey]: {
          [pathKey]: ['nested', 'ipAddresses'],
          [listenerKey]: [],
        },
      },
    },
  })

  delete form.nested.ipAddresses
  expect(validator).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: [],
      [listenerKey]: [],
    },
    nested: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['nested'],
        [listenerKey]: [],
      },
    },
  })

  form.nested.ipAddresses = ['1.1.1.1', '2.2.2.2', '3.3.3.3']
  expect(validator).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: [],
      [listenerKey]: [],
    },
    nested: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['nested'],
        [listenerKey]: [],
      },
      ipAddresses: {
        [publicKey]: {},
        [privateKey]: {
          [pathKey]: ['nested', 'ipAddresses'],
          [listenerKey]: [],
        },
        0: {
          [publicKey]: {},
          [privateKey]: {
            [pathKey]: ['nested', 'ipAddresses', '0'],
            [listenerKey]: [],
          },
        },
        1: {
          [publicKey]: {},
          [privateKey]: {
            [pathKey]: ['nested', 'ipAddresses', '1'],
            [listenerKey]: [],
          },
        },
        2: {
          [publicKey]: {},
          [privateKey]: {
            [pathKey]: ['nested', 'ipAddresses', '2'],
            [listenerKey]: [],
          },
        },
        length: {
          [publicKey]: {},
          [privateKey]: {
            [pathKey]: ['nested', 'ipAddresses', 'length'],
            [listenerKey]: [],
          },
        },
      },
    },
  })

  form.nested = {}
  form.nested.mapping = {
    key1: 1,
    key2: 2,
  }
  expect(validator).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: [],
      [listenerKey]: [],
    },
    nested: {
      [publicKey]: {},
      [privateKey]: {
        [pathKey]: ['nested'],
        [listenerKey]: [],
      },
      mapping: {
        [publicKey]: {},
        [privateKey]: {
          [pathKey]: ['nested', 'mapping'],
          [listenerKey]: [],
        },
        key1: {
          [publicKey]: {},
          [privateKey]: {
            [pathKey]: ['nested', 'mapping', 'key1'],
            [listenerKey]: [],
          },
        },
        key2: {
          [publicKey]: {},
          [privateKey]: {
            [pathKey]: ['nested', 'mapping', 'key2'],
            [listenerKey]: [],
          },
        },
      },
    },
  })
})

test('proxyStructure listener', () => {
  const validator: { [key: string]: any } = {}
  let form: { [key: string]: any } = {}
  form = proxyStructure({ object: form, clone: validator })
  const fn = jest.fn(() => {})

  validator[privateKey][listenerKey].push(fn)

  fn.mockClear()
  form.nested1 = undefined
  expect(JSON.stringify(fn.mock.calls)).toStrictEqual(JSON.stringify([[['nested1']]]))

  fn.mockClear()
  delete form.nested1
  expect(JSON.stringify(fn.mock.calls)).toStrictEqual(JSON.stringify([[['nested1']]]))

  fn.mockClear()
  form.nested1 = {}
  expect(JSON.stringify(fn.mock.calls)).toStrictEqual(JSON.stringify([[['nested1']]]))
})

test('proxyStructure listener (nested 2 layer)', () => {
  const validator: { [key: string]: any } = {}
  let form: { [key: string]: any } = {}
  form = proxyStructure({ object: form, clone: validator })
  const fn = jest.fn(() => {})
  const fn1 = jest.fn(() => {})

  form.nested1 = {}
  validator[privateKey][listenerKey].push(fn)
  validator.nested1[privateKey][listenerKey].push(fn1)

  fn.mockClear()
  fn1.mockClear()
  form.nested1.nested11 = undefined
  expect(JSON.stringify(fn.mock.calls)).toStrictEqual(JSON.stringify([]))
  expect(JSON.stringify(fn1.mock.calls)).toStrictEqual(JSON.stringify([[['nested1', 'nested11']]]))

  fn.mockClear()
  fn1.mockClear()
  delete form.nested1.nested11
  expect(JSON.stringify(fn.mock.calls)).toStrictEqual(JSON.stringify([]))
  expect(JSON.stringify(fn1.mock.calls)).toStrictEqual(JSON.stringify([[['nested1', 'nested11']]]))

  fn.mockClear()
  fn1.mockClear()
  form.nested1.nested11 = {}
  expect(JSON.stringify(fn.mock.calls)).toStrictEqual(JSON.stringify([]))
  expect(JSON.stringify(fn1.mock.calls)).toStrictEqual(JSON.stringify([[['nested1', 'nested11']]]))

  fn.mockClear()
  fn1.mockClear()
  form.nested1 = undefined
  expect(JSON.stringify(fn.mock.calls)).toStrictEqual(JSON.stringify([[['nested1']]]))
  expect(JSON.stringify(fn1.mock.calls)).toStrictEqual(JSON.stringify([]))

  fn.mockClear()
  fn1.mockClear()
  delete form.nested1
  expect(JSON.stringify(fn.mock.calls)).toStrictEqual(JSON.stringify([[['nested1']]]))
  expect(JSON.stringify(fn1.mock.calls)).toStrictEqual(JSON.stringify([]))

  fn.mockClear()
  fn1.mockClear()
  form.nested1 = { nested11: {}, nested12: {} }
  expect(JSON.stringify(fn.mock.calls)).toStrictEqual(JSON.stringify([[['nested1']]]))
  expect(JSON.stringify(fn1.mock.calls)).toStrictEqual(JSON.stringify([]))
})

test('proxyStructure listener (nested 3 layer)', () => {
  const validator: { [key: string]: any } = {}
  let form: { [key: string]: any } = {}
  form = proxyStructure({ object: form, clone: validator })
  const fn = jest.fn(() => {})
  const fn1 = jest.fn(() => {})
  const fn11 = jest.fn(() => {})

  form.nested1 = {}
  form.nested1.nested11 = {}
  form.nested1.nested11.nested111 = {}
  validator[privateKey][listenerKey].push(fn)
  validator.nested1[privateKey][listenerKey].push(fn1)
  validator.nested1.nested11[privateKey][listenerKey].push(fn11)

  fn.mockClear()
  fn1.mockClear()
  fn11.mockClear()
  form.nested1.nested11.nested111 = undefined
  expect(JSON.stringify(fn.mock.calls)).toStrictEqual(JSON.stringify([]))
  expect(JSON.stringify(fn1.mock.calls)).toStrictEqual(JSON.stringify([]))
  expect(JSON.stringify(fn11.mock.calls)).toStrictEqual(JSON.stringify([[['nested1', 'nested11', 'nested111']]]))

  fn.mockClear()
  fn1.mockClear()
  fn11.mockClear()
  delete form.nested1.nested11.nested111
  expect(JSON.stringify(fn.mock.calls)).toStrictEqual(JSON.stringify([]))
  expect(JSON.stringify(fn1.mock.calls)).toStrictEqual(JSON.stringify([]))
  expect(JSON.stringify(fn11.mock.calls)).toStrictEqual(JSON.stringify([[['nested1', 'nested11', 'nested111']]]))

  fn.mockClear()
  fn1.mockClear()
  fn11.mockClear()
  form.nested1.nested11.nested111 = {}
  expect(JSON.stringify(fn.mock.calls)).toStrictEqual(JSON.stringify([]))
  expect(JSON.stringify(fn1.mock.calls)).toStrictEqual(JSON.stringify([]))
  expect(JSON.stringify(fn11.mock.calls)).toStrictEqual(JSON.stringify([[['nested1', 'nested11', 'nested111']]]))

  fn.mockClear()
  fn1.mockClear()
  fn11.mockClear()
  form.nested1.nested11 = undefined
  expect(JSON.stringify(fn.mock.calls)).toStrictEqual(JSON.stringify([]))
  expect(JSON.stringify(fn1.mock.calls)).toStrictEqual(JSON.stringify([[['nested1', 'nested11']]]))
  expect(JSON.stringify(fn11.mock.calls)).toStrictEqual(JSON.stringify([]))

  fn.mockClear()
  fn1.mockClear()
  fn11.mockClear()
  delete form.nested1.nested11
  expect(JSON.stringify(fn.mock.calls)).toStrictEqual(JSON.stringify([]))
  expect(JSON.stringify(fn1.mock.calls)).toStrictEqual(JSON.stringify([[['nested1', 'nested11']]]))
  expect(JSON.stringify(fn11.mock.calls)).toStrictEqual(JSON.stringify([]))

  fn.mockClear()
  fn1.mockClear()
  fn11.mockClear()
  form.nested1.nested11 = { nested111: {} }
  expect(JSON.stringify(fn.mock.calls)).toStrictEqual(JSON.stringify([]))
  expect(JSON.stringify(fn1.mock.calls)).toStrictEqual(JSON.stringify([[['nested1', 'nested11']]]))
  expect(JSON.stringify(fn11.mock.calls)).toStrictEqual(JSON.stringify([]))

  fn.mockClear()
  fn1.mockClear()
  fn11.mockClear()
  form.nested1 = undefined
  expect(JSON.stringify(fn.mock.calls)).toStrictEqual(JSON.stringify([[['nested1']]]))
  expect(JSON.stringify(fn1.mock.calls)).toStrictEqual(JSON.stringify([]))
  expect(JSON.stringify(fn11.mock.calls)).toStrictEqual(JSON.stringify([]))

  fn.mockClear()
  fn1.mockClear()
  fn11.mockClear()
  delete form.nested1
  expect(JSON.stringify(fn.mock.calls)).toStrictEqual(JSON.stringify([[['nested1']]]))
  expect(JSON.stringify(fn1.mock.calls)).toStrictEqual(JSON.stringify([]))
  expect(JSON.stringify(fn11.mock.calls)).toStrictEqual(JSON.stringify([]))

  fn.mockClear()
  fn1.mockClear()
  fn11.mockClear()
  form.nested1 = { nested11: { nested111: {} } }
  expect(JSON.stringify(fn.mock.calls)).toStrictEqual(JSON.stringify([[['nested1']]]))
  expect(JSON.stringify(fn1.mock.calls)).toStrictEqual(JSON.stringify([]))
  expect(JSON.stringify(fn11.mock.calls)).toStrictEqual(JSON.stringify([]))
})

test('callback', () => {
  const validator: { [key: string]: any } = {}
  const fn = jest.fn(wrapper => {})
  const callback = (wrapper: any) => {
    fn(wrapper)
  }
  let form: { [key: string]: any } = {}
  form = proxyStructure({ object: form, clone: validator, callback })

  expect(fn.mock.calls.length).toBe(1)
  expect(fn.mock.calls[0][0]).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: [],
      [listenerKey]: [],
    },
  })
})
