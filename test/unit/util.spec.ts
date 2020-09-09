import {
  toString,
  isPlainObject,
  isArray,
  isFunction,
  deepCopy,
  getByPath,
  setByPath,
  noop,
  identity,
  isPromise,
  curry,
  hasOwnKey,
} from '../../src/util'

test('toString', () => {
  expect(toString('')).toStrictEqual('[object String]')
})

test('isPlainObject', () => {
  expect(isPlainObject({})).toStrictEqual(true)
  expect(isPlainObject([])).toStrictEqual(false)
})

test('isArray', () => {
  expect(isArray([])).toStrictEqual(true)
  expect(isArray({})).toStrictEqual(false)
})

test('isFunction', () => {
  expect(isFunction(() => {})).toStrictEqual(true)
})

test('isPromise', () => {
  expect(isPromise(Promise.resolve())).toStrictEqual(true)
  expect(isPromise({ then: () => {} })).toStrictEqual(true)
  expect(isPromise({})).toStrictEqual(false)
})

test('hasOwnKey', () => {
  expect(hasOwnKey({ k: '' }, 'k')).toStrictEqual(true)
})

test('deepCopy', () => {
  const boolean = true
  const number = 42
  const string = 'str'
  const func = () => {}
  const date = new Date()
  const array: any = [boolean, number, string, func, date]
  const object: any = {
    boolean,
    string,
    number,
    array,
    func,
    date,
  }
  // circular reference
  array.push(object)
  object.object = object

  expect(deepCopy(null)).toStrictEqual(null)
  expect(deepCopy(boolean)).toStrictEqual(boolean)
  expect(deepCopy(number)).toStrictEqual(number)
  expect(deepCopy(string)).toStrictEqual(string)
  expect(deepCopy(array)).toStrictEqual(array)
  expect(deepCopy(object)).toStrictEqual(object)

  expect(deepCopy(func)).toStrictEqual(func)
  expect(deepCopy(date)).toStrictEqual(date)
})

test('getByPath', () => {
  const value = {}
  let path: string[]
  const object = {
    path: {
      to: {
        nesting: value,
      },
    },
  }
  const array = [[[value]]]

  path = ['path', 'to', 'nesting']
  expect(getByPath(object, path)).toBe(value)
  expect(path.length).toBe(3)

  path = []
  expect(getByPath(object, [])).toBe(object)
  expect(path.length).toBe(0)

  path = ['0', '0', '0']
  expect(getByPath(array, ['0', '0', '0'])).toBe(value)
  expect(path.length).toBe(3)

  path = []
  expect(getByPath(array, path)).toBe(array)
  expect(path.length).toBe(0)
})

test('setByPath', () => {
  const oldValue = {}
  const value = {}

  const object = {
    path: {
      to: {
        nesting: oldValue,
      },
    },
  }

  expect(setByPath(object, ['path', 'to', 'nesting'], value)).toBe(value)
  expect(object.path.to.nesting).toBe(value)

  expect(setByPath(object, [], value)).toBe(value)

  const array = [[[oldValue]]]

  expect(setByPath(array, ['0', '0', '0'], value)).toBe(value)
  expect(array[0][0][0]).toBe(value)

  expect(setByPath(array, [], value)).toBe(value)
})

test('noop', () => {
  expect(typeof noop).toStrictEqual('function')
  expect(noop()).toStrictEqual(undefined)
})

test('identity', () => {
  const object = {}
  expect(typeof identity).toStrictEqual('function')
  expect(identity(object)).toBe(object)
})

test('curry', () => {
  function foo(a: number, b: number, c: number): number {
    return a + b + c
  }

  expect(curry(foo, 1, 2, 3)).toStrictEqual(6)
  expect(curry(foo, 1, 2)(3)).toStrictEqual(6)
  expect(curry(foo, 1)(2)(3)).toStrictEqual(6)
  expect(curry(foo)(1)(2)(3)).toStrictEqual(6)
  expect(curry(foo, 1)(2, 3)).toStrictEqual(6)
  expect(curry(foo)(1)(2, 3)).toStrictEqual(6)
  expect(curry(foo)(1, 2, 3)).toStrictEqual(6)
  expect(curry(foo)()(1, 2, 3)).toStrictEqual(6)
  expect(curry(foo)()()(1, 2, 3)).toStrictEqual(6)
})
