import { proxyStructure, modelKey, pathKey } from '../../src/proxy'

test('proxyStructure', () => {
  const validator: { [key: string]: any } = {}
  let form: { [key: string]: any } = {}
  form = proxyStructure({ object: form, clone: validator })

  expect(validator).toStrictEqual({ [modelKey]: {}, [pathKey]: [] })
  form.account = undefined
  expect(validator).toStrictEqual({
    [modelKey]: { account: undefined },
    [pathKey]: [],
    account: { [modelKey]: undefined, [pathKey]: ['account'] },
  })
  form.account = ''
  expect(validator).toStrictEqual({
    [modelKey]: { account: '' },
    [pathKey]: [],
    account: { [modelKey]: '', [pathKey]: ['account'] },
  })
  delete form.account
  expect(validator).toStrictEqual({ [modelKey]: {}, [pathKey]: [] })
})

test('proxyStructure (object)', () => {
  const validator: { [key: string]: any } = {}
  let form: { [key: string]: any } = {}
  form = proxyStructure({ object: form, clone: validator })

  expect(validator.mapping).toStrictEqual(undefined)
  form.mapping = undefined
  expect(validator.mapping).toStrictEqual({ [modelKey]: undefined, [pathKey]: ['mapping'] })
  delete form.mapping
  expect(validator.mapping).toStrictEqual(undefined)

  form.mapping = {}
  expect(validator.mapping).toStrictEqual({ [modelKey]: {}, [pathKey]: ['mapping'] })

  form.mapping.key1 = 1
  expect(validator.mapping).toStrictEqual({
    [modelKey]: { key1: 1 },
    [pathKey]: ['mapping'],
    key1: { [modelKey]: 1, [pathKey]: ['mapping', 'key1'] },
  })

  form.mapping.key2 = 2
  expect(validator.mapping).toStrictEqual({
    [modelKey]: { key1: 1, key2: 2 },
    [pathKey]: ['mapping'],
    key1: { [modelKey]: 1, [pathKey]: ['mapping', 'key1'] },
    key2: { [modelKey]: 2, [pathKey]: ['mapping', 'key2'] },
  })

  delete form.mapping
  expect(validator.mapping).toStrictEqual(undefined)

  form.mapping = {
    key1: 1,
    key2: 2,
  }
  expect(validator.mapping).toStrictEqual({
    [modelKey]: { key1: 1, key2: 2 },
    [pathKey]: ['mapping'],
    key1: { [modelKey]: 1, [pathKey]: ['mapping', 'key1'] },
    key2: { [modelKey]: 2, [pathKey]: ['mapping', 'key2'] },
  })
})

test('proxyStructure (array)', () => {
  const validator: { [key: string]: any } = {}
  let form: { [key: string]: any } = {}
  form = proxyStructure({ object: form, clone: validator })

  expect(validator.ipAddresses).toStrictEqual(undefined)
  form.ipAddresses = undefined
  expect(validator.ipAddresses).toStrictEqual({ [modelKey]: undefined, [pathKey]: ['ipAddresses'] })
  delete form.ipAddresses
  expect(validator.ipAddresses).toStrictEqual(undefined)

  form.ipAddresses = []
  expect(validator.ipAddresses).toStrictEqual({
    [modelKey]: [],
    [pathKey]: ['ipAddresses'],
    length: { [modelKey]: 0, [pathKey]: ['ipAddresses', 'length'] },
  })

  form.ipAddresses.push('1.1.1.1')
  expect(validator.ipAddresses).toStrictEqual({
    [modelKey]: ['1.1.1.1'],
    [pathKey]: ['ipAddresses'],
    0: { [modelKey]: '1.1.1.1', [pathKey]: ['ipAddresses', '0'] },
    length: { [modelKey]: 1, [pathKey]: ['ipAddresses', 'length'] },
  })

  form.ipAddresses.push('3.3.3.3')
  expect(validator.ipAddresses).toStrictEqual({
    [modelKey]: ['1.1.1.1', '3.3.3.3'],
    [pathKey]: ['ipAddresses'],
    0: { [modelKey]: '1.1.1.1', [pathKey]: ['ipAddresses', '0'] },
    1: { [modelKey]: '3.3.3.3', [pathKey]: ['ipAddresses', '1'] },
    length: { [modelKey]: 2, [pathKey]: ['ipAddresses', 'length'] },
  })

  form.ipAddresses.splice(1, 0, '2.2.2.2')
  expect(validator.ipAddresses).toStrictEqual({
    [modelKey]: ['1.1.1.1', '2.2.2.2', '3.3.3.3'],
    [pathKey]: ['ipAddresses'],
    0: { [modelKey]: '1.1.1.1', [pathKey]: ['ipAddresses', '0'] },
    1: { [modelKey]: '2.2.2.2', [pathKey]: ['ipAddresses', '1'] },
    2: { [modelKey]: '3.3.3.3', [pathKey]: ['ipAddresses', '2'] },
    length: { [modelKey]: 3, [pathKey]: ['ipAddresses', 'length'] },
  })

  form.ipAddresses.splice(1, 1)
  expect(validator.ipAddresses).toStrictEqual({
    [modelKey]: ['1.1.1.1', '3.3.3.3'],
    [pathKey]: ['ipAddresses'],
    0: { [modelKey]: '1.1.1.1', [pathKey]: ['ipAddresses', '0'] },
    1: { [modelKey]: '3.3.3.3', [pathKey]: ['ipAddresses', '1'] },
    length: { [modelKey]: 2, [pathKey]: ['ipAddresses', 'length'] },
  })

  form.ipAddresses.pop()
  expect(validator.ipAddresses).toStrictEqual({
    [modelKey]: ['1.1.1.1'],
    [pathKey]: ['ipAddresses'],
    0: { [modelKey]: '1.1.1.1', [pathKey]: ['ipAddresses', '0'] },
    length: { [modelKey]: 1, [pathKey]: ['ipAddresses', 'length'] },
  })

  form.ipAddresses.shift()
  expect(validator.ipAddresses).toStrictEqual({
    [modelKey]: [],
    [pathKey]: ['ipAddresses'],
    length: { [modelKey]: 0, [pathKey]: ['ipAddresses', 'length'] },
  })

  form.ipAddresses = undefined
  expect(validator.ipAddresses).toStrictEqual({ [modelKey]: undefined, [pathKey]: ['ipAddresses'] })

  form.ipAddresses = ['1.1.1.1', '2.2.2.2', '3.3.3.3']
  expect(validator.ipAddresses).toStrictEqual({
    [modelKey]: ['1.1.1.1', '2.2.2.2', '3.3.3.3'],
    [pathKey]: ['ipAddresses'],
    0: { [modelKey]: '1.1.1.1', [pathKey]: ['ipAddresses', '0'] },
    1: { [modelKey]: '2.2.2.2', [pathKey]: ['ipAddresses', '1'] },
    2: { [modelKey]: '3.3.3.3', [pathKey]: ['ipAddresses', '2'] },
    length: { [modelKey]: 3, [pathKey]: ['ipAddresses', 'length'] },
  })

  form.ipAddresses = []
  expect(validator.ipAddresses).toStrictEqual({
    [modelKey]: [],
    [pathKey]: ['ipAddresses'],
    length: { [modelKey]: 0, [pathKey]: ['ipAddresses', 'length'] },
  })
})

test('proxyStructure (nested)', () => {
  const validator: { [key: string]: any } = {}
  let form: { [key: string]: any } = {}
  form = proxyStructure({ object: form, clone: validator })

  form.nested = {}
  expect(validator).toStrictEqual({
    [modelKey]: { nested: {} },
    [pathKey]: [],
    nested: { [modelKey]: {}, [pathKey]: ['nested'] },
  })

  form.nested.ipAddresses = undefined
  expect(validator).toStrictEqual({
    [modelKey]: { nested: { ipAddresses: undefined } },
    [pathKey]: [],
    nested: {
      [modelKey]: { ipAddresses: undefined },
      [pathKey]: ['nested'],
      ipAddresses: {
        [modelKey]: undefined,
        [pathKey]: ['nested', 'ipAddresses'],
      },
    },
  })
  delete form.nested.ipAddresses
  expect(validator).toStrictEqual({
    [modelKey]: { nested: {} },
    [pathKey]: [],
    nested: { [modelKey]: {}, [pathKey]: ['nested'] },
  })

  form.nested.ipAddresses = ['1.1.1.1', '2.2.2.2', '3.3.3.3']
  expect(validator).toStrictEqual({
    [modelKey]: { nested: { ipAddresses: ['1.1.1.1', '2.2.2.2', '3.3.3.3'] } },
    [pathKey]: [],
    nested: {
      [modelKey]: { ipAddresses: ['1.1.1.1', '2.2.2.2', '3.3.3.3'] },
      [pathKey]: ['nested'],
      ipAddresses: {
        [modelKey]: ['1.1.1.1', '2.2.2.2', '3.3.3.3'],
        [pathKey]: ['nested', 'ipAddresses'],
        0: { [modelKey]: '1.1.1.1', [pathKey]: ['nested', 'ipAddresses', '0'] },
        1: { [modelKey]: '2.2.2.2', [pathKey]: ['nested', 'ipAddresses', '1'] },
        2: { [modelKey]: '3.3.3.3', [pathKey]: ['nested', 'ipAddresses', '2'] },
        length: { [modelKey]: 3, [pathKey]: ['nested', 'ipAddresses', 'length'] },
      },
    },
  })

  form.nested = {}
  form.nested.mapping = {
    key1: 1,
    key2: 2,
  }
  expect(validator).toStrictEqual({
    [modelKey]: { nested: { mapping: { key1: 1, key2: 2 } } },
    [pathKey]: [],
    nested: {
      [modelKey]: { mapping: { key1: 1, key2: 2 } },
      [pathKey]: ['nested'],
      mapping: {
        [modelKey]: { key1: 1, key2: 2 },
        [pathKey]: ['nested', 'mapping'],
        key1: { [modelKey]: 1, [pathKey]: ['nested', 'mapping', 'key1'] },
        key2: { [modelKey]: 2, [pathKey]: ['nested', 'mapping', 'key2'] },
      },
    },
  })
})
