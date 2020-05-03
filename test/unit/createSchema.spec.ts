import createSchema from '../../src/createSchema'

test('it should create instance', () => {
  const instance = createSchema({
    path: {
      to: {
        nesting: {},
      },
    },
  })

  expect(typeof instance.$validate).toStrictEqual('function')
  expect(typeof instance.path.$validate).toStrictEqual('function')
  expect(typeof instance.path.to.$validate).toStrictEqual('function')
  expect(typeof instance.path.to.nesting.$validate).toStrictEqual('function')
})

test('the built-in functions/props should not be enumerated', () => {
  const instance = createSchema({
    path: {
      to: {
        nesting: {},
      },
    },
  })

  expect(Object.keys(instance)).toStrictEqual(['path'])
  expect(Object.keys(instance.path)).toStrictEqual(['to'])
  expect(Object.keys(instance.path.to)).toStrictEqual(['nesting'])
})
