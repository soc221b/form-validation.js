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
  })

  form.ipAddresses.shift()
  expect(validator.ipAddresses).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: ['ipAddresses'],
      [listenerKey]: [],
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
  })

  form.ipAddresses = []
  expect(validator.ipAddresses).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: ['ipAddresses'],
      [listenerKey]: [],
    },
  })
})

test('array: push', () => {
  const clone: { [key: string]: any } = {}
  let object: { [key: string]: any } = { ipAddresses: [] }
  object = proxyStructure({ object, clone })
  let oldClone = []

  object.ipAddresses = []
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.push()
  expect(clone.ipAddresses.length).toBe(0)
  expect(clone.ipAddresses[0]).not.toBeDefined()

  object.ipAddresses = []
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.push('')
  expect(clone.ipAddresses.length).toBe(1)
  expect(clone.ipAddresses[0]).toBeDefined()

  object.ipAddresses = ['']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.push('')
  expect(clone.ipAddresses.length).toBe(2)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBeDefined()

  object.ipAddresses = ['', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.push('')
  expect(clone.ipAddresses.length).toBe(3)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBeDefined()
})

test('array: pop', () => {
  const clone: { [key: string]: any } = {}
  let object: { [key: string]: any } = { ipAddresses: [] }
  object = proxyStructure({ object, clone })
  let oldClone = []

  object.ipAddresses = []
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.pop()
  expect(clone.ipAddresses.length).toBe(0)
  expect(clone.ipAddresses[0]).not.toBeDefined()

  object.ipAddresses = ['']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.pop()
  expect(clone.ipAddresses.length).toBe(0)
  expect(clone.ipAddresses[0]).not.toBeDefined()

  object.ipAddresses = ['', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.pop()
  expect(clone.ipAddresses.length).toBe(1)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).not.toBeDefined()
})

test('array: shift', () => {
  const clone: { [key: string]: any } = {}
  let object: { [key: string]: any } = { ipAddresses: [] }
  object = proxyStructure({ object, clone })
  let oldClone = []

  object.ipAddresses = []
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.shift()
  expect(clone.ipAddresses.length).toBe(0)
  expect(clone.ipAddresses[0]).not.toBeDefined()

  object.ipAddresses = ['']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.shift()
  expect(clone.ipAddresses.length).toBe(0)
  expect(clone.ipAddresses[0]).not.toBeDefined()

  object.ipAddresses = ['', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.shift()
  expect(clone.ipAddresses.length).toBe(1)
  expect(clone.ipAddresses[0]).toBe(oldClone[1])
  expect(clone.ipAddresses[1]).not.toBeDefined()
})

test('array: unshift', () => {
  const clone: { [key: string]: any } = {}
  let object: { [key: string]: any } = { ipAddresses: [] }
  object = proxyStructure({ object, clone })
  let oldClone = []

  object.ipAddresses = []
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.unshift()
  expect(clone.ipAddresses.length).toBe(0)
  expect(clone.ipAddresses[0]).not.toBeDefined()

  object.ipAddresses = []
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.unshift('')
  expect(clone.ipAddresses.length).toBe(1)
  expect(clone.ipAddresses[0]).toBeDefined()

  object.ipAddresses = ['']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.unshift('')
  expect(clone.ipAddresses.length).toBe(2)
  expect(clone.ipAddresses[0]).toBeDefined()
  expect(clone.ipAddresses[1]).toBe(oldClone[0])

  object.ipAddresses = ['', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.unshift('')
  expect(clone.ipAddresses.length).toBe(3)
  expect(clone.ipAddresses[0]).toBeDefined()
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBe(oldClone[0])
})

test('array: splice (one arg)', () => {
  const clone: { [key: string]: any } = {}
  let object: { [key: string]: any } = { ipAddresses: [] }
  object = proxyStructure({ object, clone })
  let oldClone = []

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(10)
  expect(clone.ipAddresses.length).toBe(3)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBe(oldClone[2])

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(3)
  expect(clone.ipAddresses.length).toBe(3)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBe(oldClone[2])

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(2)
  expect(clone.ipAddresses.length).toBe(2)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).not.toBeDefined()

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(1)
  expect(clone.ipAddresses.length).toBe(1)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).not.toBeDefined()
  expect(clone.ipAddresses[2]).not.toBeDefined()

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice()
  expect(clone.ipAddresses.length).toBe(0)
  expect(clone.ipAddresses[0]).not.toBeDefined()
  expect(clone.ipAddresses[1]).not.toBeDefined()
  expect(clone.ipAddresses[2]).not.toBeDefined()

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(-1)
  expect(clone.ipAddresses.length).toBe(2)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).not.toBeDefined()

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(-2)
  expect(clone.ipAddresses.length).toBe(1)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).not.toBeDefined()
  expect(clone.ipAddresses[2]).not.toBeDefined()

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(-3)
  expect(clone.ipAddresses.length).toBe(0)
  expect(clone.ipAddresses[0]).not.toBeDefined()
  expect(clone.ipAddresses[1]).not.toBeDefined()
  expect(clone.ipAddresses[2]).not.toBeDefined()

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(-10)
  expect(clone.ipAddresses.length).toBe(0)
  expect(clone.ipAddresses[0]).not.toBeDefined()
  expect(clone.ipAddresses[1]).not.toBeDefined()
  expect(clone.ipAddresses[2]).not.toBeDefined()
})

test('array: splice (two args)', () => {
  const clone: { [key: string]: any } = {}
  let object: { [key: string]: any } = { ipAddresses: [] }
  object = proxyStructure({ object, clone })
  let oldClone = []

  throw Error('not yet be implemented.')
})

test('array: splice (three args)', () => {
  const clone: { [key: string]: any } = {}
  let object: { [key: string]: any } = { ipAddresses: [] }
  object = proxyStructure({ object, clone })
  let oldClone = []

  throw Error('not yet be implemented.')
})

test('array: reverse', () => {
  const clone: { [key: string]: any } = {}
  let object: { [key: string]: any } = { ipAddresses: [] }
  object = proxyStructure({ object, clone })
  let oldClone = []

  object.ipAddresses = []
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.reverse()
  expect(clone.ipAddresses.length).toBe(0)
  expect(clone.ipAddresses[0]).not.toBeDefined()

  object.ipAddresses = [1]
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.reverse()
  expect(clone.ipAddresses.length).toBe(1)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])

  object.ipAddresses = [1, 2]
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.reverse()
  expect(clone.ipAddresses.length).toBe(2)
  expect(clone.ipAddresses[0]).toBe(oldClone[1])
  expect(clone.ipAddresses[1]).toBe(oldClone[0])

  object.ipAddresses = [1, 2, 3]
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.reverse()
  expect(clone.ipAddresses.length).toBe(3)
  expect(clone.ipAddresses[0]).toBe(oldClone[2])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBe(oldClone[0])

  object.ipAddresses = [1, 2, 3, 4]
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.reverse()
  expect(clone.ipAddresses.length).toBe(4)
  expect(clone.ipAddresses[0]).toBe(oldClone[3])
  expect(clone.ipAddresses[1]).toBe(oldClone[2])
  expect(clone.ipAddresses[2]).toBe(oldClone[1])
  expect(clone.ipAddresses[3]).toBe(oldClone[0])
})

test('array: sort', () => {
  const clone: { [key: string]: any } = {}
  let object: { [key: string]: any } = { ipAddresses: [] }
  object = proxyStructure({ object, clone })
  let oldClone = []

  object.ipAddresses = []
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.sort()
  expect(clone.ipAddresses.length).toBe(0)

  object.ipAddresses = [1]
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.sort()
  expect(clone.ipAddresses.length).toBe(1)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])

  object.ipAddresses = [2, 1]
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.sort()
  expect(clone.ipAddresses.length).toBe(2)
  expect(clone.ipAddresses[0]).toBe(oldClone[1])
  expect(clone.ipAddresses[1]).toBe(oldClone[0])

  object.ipAddresses = [3, 2, 1]
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.sort()
  expect(clone.ipAddresses.length).toBe(3)
  expect(clone.ipAddresses[0]).toBe(oldClone[2])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBe(oldClone[0])

  object.ipAddresses = [4, 3, 2, 1]
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.sort()
  expect(clone.ipAddresses.length).toBe(4)
  expect(clone.ipAddresses[0]).toBe(oldClone[3])
  expect(clone.ipAddresses[1]).toBe(oldClone[2])
  expect(clone.ipAddresses[2]).toBe(oldClone[1])
  expect(clone.ipAddresses[3]).toBe(oldClone[0])

  object.ipAddresses = [1, 2]
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.sort()
  expect(clone.ipAddresses.length).toBe(2)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])

  object.ipAddresses = [1, 2, 3]
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.sort()
  expect(clone.ipAddresses.length).toBe(3)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBe(oldClone[2])

  object.ipAddresses = [1, 2, 3, 4]
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.sort()
  expect(clone.ipAddresses.length).toBe(4)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBe(oldClone[2])
  expect(clone.ipAddresses[3]).toBe(oldClone[3])
})

test('array: length', () => {
  const clone: { [key: string]: any } = {}
  let object: { [key: string]: any } = { ipAddresses: [] }
  object = proxyStructure({ object, clone })
  let oldClone = []

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.length = 10
  expect(clone.ipAddresses.length).toBe(10)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBe(oldClone[2])

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.length = 3
  expect(clone.ipAddresses.length).toBe(3)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBe(oldClone[2])

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.length = 2
  expect(clone.ipAddresses.length).toBe(2)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).not.toBeDefined()

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.length = 1
  expect(clone.ipAddresses.length).toBe(1)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).not.toBeDefined()
  expect(clone.ipAddresses[2]).not.toBeDefined()

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.length = 0
  expect(clone.ipAddresses.length).toBe(0)
  expect(clone.ipAddresses[0]).not.toBeDefined()
  expect(clone.ipAddresses[1]).not.toBeDefined()
  expect(clone.ipAddresses[2]).not.toBeDefined()
})

test('array: lookup setting', () => {
  const clone: { [key: string]: any } = {}
  let object: { [key: string]: any } = { ipAddresses: [] }
  object = proxyStructure({ object, clone })
  let oldClone = []

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses[9] = ''
  expect(clone.ipAddresses.length).toBe(10)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBe(oldClone[2])
  expect(clone.ipAddresses[3]).not.toBeDefined()
  expect(clone.ipAddresses[9]).toBeDefined()

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses[3] = ''
  expect(clone.ipAddresses.length).toBe(4)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBe(oldClone[2])
  expect(clone.ipAddresses[3]).toBeDefined()

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses[2] = ''
  expect(clone.ipAddresses.length).toBe(3)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBeDefined()

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses[1] = ''
  expect(clone.ipAddresses.length).toBe(3)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBeDefined()
  expect(clone.ipAddresses[2]).toBe(oldClone[2])

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses[0] = ''
  expect(clone.ipAddresses.length).toBe(3)
  expect(clone.ipAddresses[0]).toBeDefined()
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBe(oldClone[2])
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

test('callback (nested)', () => {
  const validator: { [key: string]: any } = {}
  const fn = jest.fn(wrapper => {})
  const callback = (wrapper: any) => {
    fn(wrapper)
  }
  let form: { [key: string]: any } = {
    nested: {},
  }
  form = proxyStructure({ object: form, clone: validator, callback })

  expect(fn.mock.calls.length).toBe(2)
  expect(fn.mock.calls[0][0]).toStrictEqual({
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
  expect(fn.mock.calls[1][0]).toStrictEqual({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: ['nested'],
      [listenerKey]: [],
    },
  })
})
