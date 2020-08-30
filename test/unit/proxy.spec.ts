import { proxyStructure, publicKey, privateKey, pathKey } from '../../src/proxy'

test('proxyStructure (primitive types in object)', () => {
  const object: any = {
    undefined: undefined,
    null: null,
    boolean: false,
    number: 0,
    string: '',
  }
  const clone: any = {}
  const wrap = jest.fn()
  const proxiedObject = proxyStructure({ object, clone, wrap })

  expect(object).toStrictEqual(proxiedObject)
  expect(clone).toStrictEqual({
    undefined: {},
    null: {},
    boolean: {},
    number: {},
    string: {},
  })
  expect(wrap.mock.calls.length).toBe(6)
  expect(JSON.stringify(wrap.mock.calls.sort())).toStrictEqual(
    JSON.stringify(
      [
        [object, clone, []],
        [object.undefined, clone.undefined, ['undefined']],
        [object.null, clone.null, ['null']],
        [object.boolean, clone.boolean, ['boolean']],
        [object.number, clone.number, ['number']],
        [object.string, clone.string, ['string']],
      ].sort(),
    ),
  )
})

test('proxyStructure (primitive types in array)', () => {
  const object: any = [undefined, null, false, 0, '']
  const clone: any = []
  const wrap = jest.fn()
  const proxiedObject = proxyStructure({ object, clone, wrap })

  expect(object).toStrictEqual(proxiedObject)
  expect(clone).toStrictEqual([{}, {}, {}, {}, {}])
  expect(wrap.mock.calls.length).toBe(6)
  expect(JSON.stringify(wrap.mock.calls.sort())).toStrictEqual(
    JSON.stringify(
      [
        [object, clone, []],
        [object[0], clone[0], ['0']],
        [object[1], clone[1], ['1']],
        [object[2], clone[2], ['2']],
        [object[3], clone[3], ['3']],
        [object[4], clone[4], ['4']],
      ].sort(),
    ),
  )
})

test('proxyStructure (object: init)', () => {
  const object: any = {
    key: {
      nestedKey: {
        deepNestedKey: null,
      },
    },
  }
  const clone: any = {}
  const wrap = jest.fn()
  const proxiedObject = proxyStructure({ object, clone, wrap })

  expect(object).toStrictEqual(proxiedObject)
  expect(clone).toStrictEqual({
    key: {
      nestedKey: {
        deepNestedKey: {},
      },
    },
  })
  expect(wrap.mock.calls.length).toBe(4)
  expect(JSON.stringify(wrap.mock.calls.sort())).toStrictEqual(
    JSON.stringify(
      [
        [object, clone, []],
        [object.key, clone.key, ['key']],
        [object.key.nestedKey, clone.key.nestedKey, ['key', 'nestedKey']],
        [object.key.nestedKey.deepNestedKey, clone.key.nestedKey.deepNestedKey, ['key', 'nestedKey', 'deepNestedKey']],
      ].sort(),
    ),
  )
})

test('proxyStructure (object: add key)', () => {
  const object: any = {}
  const clone: any = {}
  const wrap = jest.fn()
  const proxiedObject = proxyStructure({ object, clone, wrap })

  wrap.mockClear()
  proxiedObject.key = {}
  expect(clone).toStrictEqual({
    key: {},
  })
  expect(wrap.mock.calls.length).toBe(1)
  expect(JSON.stringify(wrap.mock.calls[0])).toStrictEqual(JSON.stringify([object.key, clone.key, ['key']]))

  wrap.mockClear()
  proxiedObject.key.nestedKey = {}
  expect(clone).toStrictEqual({
    key: {
      nestedKey: {},
    },
  })
  expect(wrap.mock.calls.length).toBe(1)
  expect(JSON.stringify(wrap.mock.calls[0])).toStrictEqual(
    JSON.stringify([object.key.nestedKey, clone.key.nestedKey, ['key', 'nestedKey']]),
  )

  wrap.mockClear()
  proxiedObject.key.nestedKey.deepNestedKey = {}
  expect(clone).toStrictEqual({
    key: {
      nestedKey: {
        deepNestedKey: {},
      },
    },
  })
  expect(wrap.mock.calls.length).toBe(1)
  expect(JSON.stringify(wrap.mock.calls[0])).toStrictEqual(
    JSON.stringify([
      object.key.nestedKey.deepNestedKey,
      clone.key.nestedKey.deepNestedKey,
      ['key', 'nestedKey', 'deepNestedKey'],
    ]),
  )
})

test('proxyStructure (object: delete key)', () => {
  const object: any = {
    key: {
      nestedKey: {
        deepNestedKey: {},
      },
    },
  }
  const clone: any = {}
  const wrap = jest.fn()
  const proxiedObject = proxyStructure({ object, clone, wrap })

  wrap.mockClear()
  delete proxiedObject.key.nestedKey.deepNestedKey
  expect(clone).toStrictEqual({
    key: {
      nestedKey: {},
    },
  })
  expect(wrap.mock.calls.length).toBe(0)

  wrap.mockClear()
  delete proxiedObject.key
  expect(clone).toStrictEqual({})
  expect(wrap.mock.calls.length).toBe(0)
})

test('proxyStructure (object: reassign)', () => {
  const object: any = {
    key: {
      nestedKey: {
        deepNestedKey: {},
      },
    },
  }
  const clone: any = {}
  const wrap = jest.fn()
  const proxiedObject = proxyStructure({ object, clone, wrap })

  wrap.mockClear()
  proxiedObject.key.nestedKey = {}
  expect(clone).toStrictEqual({
    key: {
      nestedKey: {},
    },
  })
  expect(wrap.mock.calls.length).toBe(1)
  expect(JSON.stringify(wrap.mock.calls[0])).toStrictEqual(
    JSON.stringify([object.key.nestedKey, clone.key.nestedKey, ['key', 'nestedKey']]),
  )

  wrap.mockClear()
  proxiedObject.key = {
    nestedKey2: {
      deepNestedKey: {},
    },
  }
  expect(clone).toStrictEqual({
    key: {
      nestedKey2: {
        deepNestedKey: {},
      },
    },
  })
  expect(wrap.mock.calls.length).toBe(3)
  expect(JSON.stringify(wrap.mock.calls.sort())).toStrictEqual(
    JSON.stringify(
      [
        [object.key, clone.key, ['key']],
        [object.key.nestedKey2, clone.key.nestedKey2, ['key', 'nestedKey2']],
        [
          object.key.nestedKey2.deepNestedKey,
          clone.key.nestedKey2.deepNestedKey,
          ['key', 'nestedKey2', 'deepNestedKey'],
        ],
      ].sort(),
    ),
  )

  wrap.mockClear()
  proxiedObject.key = {}
  expect(clone).toStrictEqual({
    key: {},
  })
  expect(wrap.mock.calls.length).toBe(1)
  expect(JSON.stringify(wrap.mock.calls[0])).toStrictEqual(JSON.stringify([object.key, clone.key, ['key']]))
})

test('proxyStructure (array: init)', () => {
  const object: any = [[[null]]]
  const clone: any = []
  const wrap = jest.fn()
  const proxiedObject = proxyStructure({ object, clone, wrap })

  expect(object).toStrictEqual(proxiedObject)
  expect(clone).toStrictEqual([[[{}]]])
  expect(wrap.mock.calls.length).toBe(4)
  expect(JSON.stringify(wrap.mock.calls.sort())).toStrictEqual(
    JSON.stringify(
      [
        [object, clone, []],
        [object[0], clone[0], ['0']],
        [object[0][0], clone[0][0], ['0', '0']],
        [object[0][0][0], clone[0][0][0], ['0', '0', '0']],
      ].sort(),
    ),
  )
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
  expect(clone.ipAddresses[1]).toBe(oldClone[0])
  expect(clone.ipAddresses[2]).toBe(oldClone[1])
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
  object.ipAddresses.splice(0)
  expect(clone.ipAddresses.length).toBe(0)
  expect(clone.ipAddresses[0]).not.toBeDefined()
  expect(clone.ipAddresses[1]).not.toBeDefined()
  expect(clone.ipAddresses[2]).not.toBeDefined()

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice()
  expect(clone.ipAddresses.length).toBe(3)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBe(oldClone[2])

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

  object.ipAddresses = ['', '', '', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(10, 0)
  expect(clone.ipAddresses.length).toBe(5)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBe(oldClone[2])
  expect(clone.ipAddresses[3]).toBe(oldClone[3])
  expect(clone.ipAddresses[4]).toBe(oldClone[4])

  object.ipAddresses = ['', '', '', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(10, -10)
  expect(clone.ipAddresses.length).toBe(5)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBe(oldClone[2])
  expect(clone.ipAddresses[3]).toBe(oldClone[3])
  expect(clone.ipAddresses[4]).toBe(oldClone[4])

  object.ipAddresses = ['', '', '', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(10, 10)
  expect(clone.ipAddresses.length).toBe(5)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBe(oldClone[2])
  expect(clone.ipAddresses[3]).toBe(oldClone[3])
  expect(clone.ipAddresses[4]).toBe(oldClone[4])

  object.ipAddresses = ['', '', '', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(2, 3)
  expect(clone.ipAddresses.length).toBe(2)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).not.toBeDefined()
  expect(clone.ipAddresses[3]).not.toBeDefined()
  expect(clone.ipAddresses[4]).not.toBeDefined()

  object.ipAddresses = ['', '', '', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(1, 3)
  expect(clone.ipAddresses.length).toBe(2)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[4])
  expect(clone.ipAddresses[2]).not.toBeDefined()
  expect(clone.ipAddresses[3]).not.toBeDefined()
  expect(clone.ipAddresses[4]).not.toBeDefined()

  object.ipAddresses = ['', '', '', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(0, 3)
  expect(clone.ipAddresses.length).toBe(2)
  expect(clone.ipAddresses[0]).toBe(oldClone[3])
  expect(clone.ipAddresses[1]).toBe(oldClone[4])
  expect(clone.ipAddresses[2]).not.toBeDefined()
  expect(clone.ipAddresses[3]).not.toBeDefined()
  expect(clone.ipAddresses[4]).not.toBeDefined()

  object.ipAddresses = ['', '', '', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(2, 2)
  expect(clone.ipAddresses.length).toBe(3)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBe(oldClone[4])
  expect(clone.ipAddresses[3]).not.toBeDefined()
  expect(clone.ipAddresses[4]).not.toBeDefined()

  object.ipAddresses = ['', '', '', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(1, 2)
  expect(clone.ipAddresses.length).toBe(3)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[3])
  expect(clone.ipAddresses[2]).toBe(oldClone[4])
  expect(clone.ipAddresses[3]).not.toBeDefined()
  expect(clone.ipAddresses[4]).not.toBeDefined()

  object.ipAddresses = ['', '', '', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(0, 2)
  expect(clone.ipAddresses.length).toBe(3)
  expect(clone.ipAddresses[0]).toBe(oldClone[2])
  expect(clone.ipAddresses[1]).toBe(oldClone[3])
  expect(clone.ipAddresses[2]).toBe(oldClone[4])
  expect(clone.ipAddresses[3]).not.toBeDefined()
  expect(clone.ipAddresses[4]).not.toBeDefined()

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(2, 1)
  expect(clone.ipAddresses.length).toBe(2)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).not.toBeDefined()

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(1, 1)
  expect(clone.ipAddresses.length).toBe(2)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[2])
  expect(clone.ipAddresses[2]).not.toBeDefined()

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(0, 1)
  expect(clone.ipAddresses.length).toBe(2)
  expect(clone.ipAddresses[0]).toBe(oldClone[1])
  expect(clone.ipAddresses[1]).toBe(oldClone[2])
  expect(clone.ipAddresses[2]).not.toBeDefined()
})

test('array: splice (three args)', () => {
  const clone: { [key: string]: any } = {}
  let object: { [key: string]: any } = { ipAddresses: [] }
  object = proxyStructure({ object, clone })
  let oldClone = []

  object.ipAddresses = ['', '', '', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(0, 0, '', '')
  expect(clone.ipAddresses.length).toBe(7)
  expect(clone.ipAddresses[0]).toBeDefined()
  expect(clone.ipAddresses[1]).toBeDefined()
  expect(clone.ipAddresses[2]).toBe(oldClone[0])
  expect(clone.ipAddresses[3]).toBe(oldClone[1])
  expect(clone.ipAddresses[4]).toBe(oldClone[2])
  expect(clone.ipAddresses[5]).toBe(oldClone[3])
  expect(clone.ipAddresses[6]).toBe(oldClone[4])

  object.ipAddresses = ['', '', '', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(2, 0, '', '')
  expect(clone.ipAddresses.length).toBe(7)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBeDefined()
  expect(clone.ipAddresses[3]).toBeDefined()
  expect(clone.ipAddresses[4]).toBe(oldClone[2])
  expect(clone.ipAddresses[5]).toBe(oldClone[3])
  expect(clone.ipAddresses[6]).toBe(oldClone[4])

  object.ipAddresses = ['', '', '', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(4, 0, '', '')
  expect(clone.ipAddresses.length).toBe(7)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBe(oldClone[2])
  expect(clone.ipAddresses[3]).toBe(oldClone[3])
  expect(clone.ipAddresses[4]).not.toBe(oldClone[4])
  expect(clone.ipAddresses[4]).toBeDefined()
  expect(clone.ipAddresses[5]).toBeDefined()
  expect(clone.ipAddresses[6]).toBe(oldClone[4])

  object.ipAddresses = ['', '', '', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(0, 2, '', '')
  expect(clone.ipAddresses.length).toBe(5)
  expect(clone.ipAddresses[0]).not.toBe(oldClone[0])
  expect(clone.ipAddresses[0]).toBeDefined()
  expect(clone.ipAddresses[1]).not.toBe(oldClone[1])
  expect(clone.ipAddresses[1]).toBeDefined()
  expect(clone.ipAddresses[2]).toBe(oldClone[2])
  expect(clone.ipAddresses[3]).toBe(oldClone[3])
  expect(clone.ipAddresses[4]).toBe(oldClone[4])

  object.ipAddresses = ['', '', '', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(2, 2, '', '')
  expect(clone.ipAddresses.length).toBe(5)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).not.toBe(oldClone[2])
  expect(clone.ipAddresses[2]).toBeDefined()
  expect(clone.ipAddresses[3]).not.toBe(oldClone[3])
  expect(clone.ipAddresses[3]).toBeDefined()
  expect(clone.ipAddresses[4]).toBe(oldClone[4])

  object.ipAddresses = ['', '', '', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(4, 2, '', '')
  expect(clone.ipAddresses.length).toBe(6)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBe(oldClone[2])
  expect(clone.ipAddresses[3]).toBe(oldClone[3])
  expect(clone.ipAddresses[4]).toBe(oldClone[4])
  expect(clone.ipAddresses[5]).toBeDefined()

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(0, 0, '', '')
  expect(clone.ipAddresses.length).toBe(5)
  expect(clone.ipAddresses[0]).not.toBe(oldClone[0])
  expect(clone.ipAddresses[0]).toBeDefined()
  expect(clone.ipAddresses[1]).not.toBe(oldClone[1])
  expect(clone.ipAddresses[1]).toBeDefined()
  expect(clone.ipAddresses[2]).toBe(oldClone[0])
  expect(clone.ipAddresses[3]).toBe(oldClone[1])
  expect(clone.ipAddresses[4]).toBe(oldClone[2])

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(2, 0, '')
  expect(clone.ipAddresses.length).toBe(4)
  expect(clone.ipAddresses[0]).toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBe(oldClone[1])
  expect(clone.ipAddresses[2]).not.toBe(oldClone[2])
  expect(clone.ipAddresses[2]).toBeDefined()
  expect(clone.ipAddresses[3]).toBe(oldClone[2])

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(0, 0, '', '')
  expect(clone.ipAddresses.length).toBe(5)
  expect(clone.ipAddresses[0]).toBeDefined()
  expect(clone.ipAddresses[0]).not.toBe(oldClone[0])
  expect(clone.ipAddresses[1]).toBeDefined()
  expect(clone.ipAddresses[1]).not.toBe(oldClone[1])
  expect(clone.ipAddresses[2]).toBe(oldClone[0])
  expect(clone.ipAddresses[3]).toBe(oldClone[1])
  expect(clone.ipAddresses[4]).toBe(oldClone[2])

  object.ipAddresses = ['', '', '']
  oldClone = clone.ipAddresses.slice()
  object.ipAddresses.splice(0, 2, '', '')
  expect(clone.ipAddresses.length).toBe(3)
  expect(clone.ipAddresses[0]).not.toBe(oldClone[0])
  expect(clone.ipAddresses[1]).not.toBe(oldClone[1])
  expect(clone.ipAddresses[0]).toBeDefined()
  expect(clone.ipAddresses[1]).toBeDefined()
  expect(clone.ipAddresses[2]).toBe(oldClone[2])
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
    nested: {},
  })

  form.nested.ipAddresses = undefined
  expect(validator).toStrictEqual({
    nested: {
      ipAddresses: {},
    },
  })

  delete form.nested.ipAddresses
  expect(validator).toStrictEqual({
    nested: {},
  })

  form.nested.ipAddresses = ['1.1.1.1', '2.2.2.2', '3.3.3.3']
  expect(validator).toStrictEqual({
    nested: {
      ipAddresses: [{}, {}, {}],
    },
  })

  form.nested = {}
  form.nested.mapping = {
    key1: 1,
    key2: 2,
  }
  expect(validator).toStrictEqual({
    nested: {
      mapping: {
        key1: {},
        key2: {},
      },
    },
  })
})

test('callback', () => {
  const validator: { [key: string]: any } = {}
  const fn = jest.fn(wrapper => {})
  const callback = (wrapper: any, path: string[]) => {
    fn(wrapper)
  }
  let form: { [key: string]: any } = {}
  form = proxyStructure({ object: form, clone: validator, callback })

  expect(fn.mock.calls.length).toBe(1)
  expect(fn.mock.calls[0][0]).toStrictEqual({})
})

test('callback (nested)', () => {
  const validator: { [key: string]: any } = {}
  const fn = jest.fn(wrapper => {})
  const callback = (wrapper: any, path: string[]) => {
    fn(wrapper)
  }
  let form: { [key: string]: any } = {
    nested: {},
  }
  form = proxyStructure({ object: form, clone: validator, callback })

  expect(fn.mock.calls.length).toBe(2)
  expect(fn.mock.calls[0][0]).toStrictEqual({ nested: {} })
  expect(fn.mock.calls[1][0]).toStrictEqual({})
})
