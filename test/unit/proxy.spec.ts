import { proxyStructure, modelKey } from '../../src/proxy'

test('proxyStructure', () => {
  let form: { [key: string]: any } = {}
  const validator: { [key: string]: any } = {}
  form = proxyStructure({ object: form, clone: validator })

  form.account = undefined
  expect(validator.account).toStrictEqual({ [modelKey]: undefined })
  form.account = ''
  expect(validator.account).toStrictEqual({ [modelKey]: '' })
  delete form.account
  expect(validator.account).toBe(undefined)
})

test('proxyStructure (object)', () => {
  let form: { [key: string]: any } = {}
  const validator: { [key: string]: any } = {}
  form = proxyStructure({ object: form, clone: validator })

  expect(validator.mapping).toStrictEqual(undefined)

  form.mapping = undefined
  expect(validator.mapping).toStrictEqual({ [modelKey]: undefined })

  delete form.mapping
  expect(validator.mapping).toStrictEqual(undefined)

  form.mapping = {}
  expect(validator.mapping).toStrictEqual({ [modelKey]: {} })

  form.mapping.key1 = 1
  expect(validator.mapping).toStrictEqual({ [modelKey]: { key1: 1 }, key1: { [modelKey]: 1 } })
  expect(validator.mapping.key1).toStrictEqual({ [modelKey]: 1 })

  form.mapping.key2 = 2
  expect(validator.mapping).toStrictEqual({
    [modelKey]: { key1: 1, key2: 2 },
    key1: { [modelKey]: 1 },
    key2: { [modelKey]: 2 },
  })
  expect(validator.mapping.key1).toStrictEqual({ [modelKey]: 1 })
  expect(validator.mapping.key2).toStrictEqual({ [modelKey]: 2 })

  delete form.mapping
  expect(validator.mapping).toStrictEqual(undefined)

  form.mapping = {
    key1: 1,
    key2: 2,
  }
  expect(validator.mapping).toStrictEqual({
    [modelKey]: { key1: 1, key2: 2 },
    key1: { [modelKey]: 1 },
    key2: { [modelKey]: 2 },
  })
  expect(validator.mapping.key1).toStrictEqual({ [modelKey]: 1 })
  expect(validator.mapping.key2).toStrictEqual({ [modelKey]: 2 })
})

test('proxyStructure (array)', () => {
  let form: { [key: string]: any } = {}
  const validator: { [key: string]: any } = {}
  form = proxyStructure({ object: form, clone: validator })

  expect(validator.ipAddresses).toStrictEqual(undefined)
  form.ipAddresses = undefined
  expect(validator.ipAddresses).toStrictEqual({ [modelKey]: undefined })
  delete form.ipAddresses
  expect(validator.ipAddresses).toStrictEqual(undefined)

  form.ipAddresses = []
  expect(validator.ipAddresses).toStrictEqual({ [modelKey]: [], length: { [modelKey]: 0 } })
  form.ipAddresses.push('1.1.1.1')
  expect(validator.ipAddresses).toStrictEqual({
    [modelKey]: ['1.1.1.1'],
    0: { [modelKey]: '1.1.1.1' },
    length: { [modelKey]: 1 },
  })
  expect(validator.ipAddresses[0]).toStrictEqual({ [modelKey]: '1.1.1.1' })
  form.ipAddresses.push('3.3.3.3')
  expect(validator.ipAddresses).toStrictEqual({
    [modelKey]: ['1.1.1.1', '3.3.3.3'],
    0: { [modelKey]: '1.1.1.1' },
    1: { [modelKey]: '3.3.3.3' },
    length: { [modelKey]: 2 },
  })
  expect(validator.ipAddresses[0]).toStrictEqual({ [modelKey]: '1.1.1.1' })
  expect(validator.ipAddresses[1]).toStrictEqual({ [modelKey]: '3.3.3.3' })
  form.ipAddresses.splice(1, 0, '2.2.2.2')
  expect(validator.ipAddresses).toStrictEqual({
    [modelKey]: ['1.1.1.1', '2.2.2.2', '3.3.3.3'],
    0: { [modelKey]: '1.1.1.1' },
    1: { [modelKey]: '2.2.2.2' },
    2: { [modelKey]: '3.3.3.3' },
    length: { [modelKey]: 3 },
  })
  expect(validator.ipAddresses[0]).toStrictEqual({ [modelKey]: '1.1.1.1' })
  expect(validator.ipAddresses[1]).toStrictEqual({ [modelKey]: '2.2.2.2' })
  expect(validator.ipAddresses[2]).toStrictEqual({ [modelKey]: '3.3.3.3' })
  form.ipAddresses.splice(1, 1)
  expect(validator.ipAddresses).toStrictEqual({
    [modelKey]: ['1.1.1.1', '3.3.3.3'],
    0: { [modelKey]: '1.1.1.1' },
    1: { [modelKey]: '3.3.3.3' },
    length: { [modelKey]: 2 },
  })
  expect(validator.ipAddresses[0]).toStrictEqual({ [modelKey]: '1.1.1.1' })
  expect(validator.ipAddresses[1]).toStrictEqual({ [modelKey]: '3.3.3.3' })
  form.ipAddresses.pop()
  expect(validator.ipAddresses).toStrictEqual({
    [modelKey]: ['1.1.1.1'],
    0: { [modelKey]: '1.1.1.1' },
    length: { [modelKey]: 1 },
  })
  expect(validator.ipAddresses[0]).toStrictEqual({ [modelKey]: '1.1.1.1' })
  form.ipAddresses.shift()
  expect(validator.ipAddresses).toStrictEqual({ [modelKey]: [], length: { [modelKey]: 0 } })
  form.ipAddresses = undefined
  expect(validator.ipAddresses).toStrictEqual({ [modelKey]: undefined })

  form.ipAddresses = ['1.1.1.1', '2.2.2.2', '3.3.3.3']
  expect(validator.ipAddresses).toStrictEqual({
    [modelKey]: ['1.1.1.1', '2.2.2.2', '3.3.3.3'],
    0: { [modelKey]: '1.1.1.1' },
    1: { [modelKey]: '2.2.2.2' },
    2: { [modelKey]: '3.3.3.3' },
    length: { [modelKey]: 3 },
  })
  expect(validator.ipAddresses[0]).toStrictEqual({ [modelKey]: '1.1.1.1' })
  expect(validator.ipAddresses[1]).toStrictEqual({ [modelKey]: '2.2.2.2' })
  expect(validator.ipAddresses[2]).toStrictEqual({ [modelKey]: '3.3.3.3' })

  form.ipAddresses = []
  expect(validator.ipAddresses).toStrictEqual({ [modelKey]: [], length: { [modelKey]: 0 } })
})

test('proxyStructure (nested)', () => {
  let form: { [key: string]: any } = {}
  const validator: { [key: string]: any } = {}
  form = proxyStructure({ object: form, clone: validator })

  form.nested = {}
  expect(validator.nested).toStrictEqual({ [modelKey]: {} })

  expect(validator.nested.ipAddresses).toStrictEqual(undefined)
  form.nested.ipAddresses = undefined
  expect(validator.nested.ipAddresses).toStrictEqual({ [modelKey]: undefined })
  delete form.nested.ipAddresses
  expect(validator.nested.ipAddresses).toStrictEqual(undefined)

  form.nested.ipAddresses = ['1.1.1.1', '2.2.2.2', '3.3.3.3']
  expect(validator.nested.ipAddresses).toStrictEqual({
    [modelKey]: ['1.1.1.1', '2.2.2.2', '3.3.3.3'],
    0: { [modelKey]: '1.1.1.1' },
    1: { [modelKey]: '2.2.2.2' },
    2: { [modelKey]: '3.3.3.3' },
    length: { [modelKey]: 3 },
  })
  expect(validator.nested.ipAddresses[0]).toStrictEqual({ [modelKey]: '1.1.1.1' })
  expect(validator.nested.ipAddresses[1]).toStrictEqual({ [modelKey]: '2.2.2.2' })
  expect(validator.nested.ipAddresses[2]).toStrictEqual({ [modelKey]: '3.3.3.3' })

  form.nested.mapping = {
    key1: 1,
    key2: 2,
  }
  expect(validator.nested.mapping).toStrictEqual({
    [modelKey]: { key1: 1, key2: 2 },
    key1: { [modelKey]: 1 },
    key2: { [modelKey]: 2 },
  })
  expect(validator.nested.mapping.key1).toStrictEqual({ [modelKey]: 1 })
  expect(validator.nested.mapping.key2).toStrictEqual({ [modelKey]: 2 })
})
