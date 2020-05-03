import createSchema from '../../src/createSchema'

test('it should validate with sync rule', () => {
  const value = {}
  const promise = Promise.resolve(value)
  const schema = {
    $rule: () => promise,
  }
  const instance = createSchema(schema)

  instance.$validateSync(undefined)
  expect(instance.$messages.length).toStrictEqual(1)
  expect(instance.$messages[0]).toBe(promise)
})

test('it should validate with async rule', async () => {
  const value = {}
  const promise = Promise.resolve(value)
  const schema = {
    $rule: () => promise,
  }
  const instance = createSchema(schema)

  await instance.$validate(undefined)
  expect(instance.$messages.length).toStrictEqual(1)
  expect(instance.$messages[0]).toBe(value)
})

test('it should validate with given rule', () => {
  const value = {}
  const schema = {
    $rule: () => value,
  }
  const instance = createSchema(schema)

  instance.$validateSync(undefined)
  expect(instance.$messages.length).toStrictEqual(1)
  expect(instance.$messages[0]).toBe(value)
})

test('it should normalize value before validate it', () => {
  const value = {}
  const schema = {
    $rule: ({ value }) => value,
    $normalizer: () => value,
  }
  const instance = createSchema(schema)

  instance.$validateSync(undefined)
  expect(instance.$messages.length).toStrictEqual(1)
  expect(instance.$messages[0]).toBe(value)
})

test('it should pass params to $rule', () => {
  const value = {}
  const schema = {
    $rule: ({ params }) => params.value,
    $params: {
      value,
    },
  }
  const instance = createSchema(schema)

  instance.$validateSync(undefined)
  expect(instance.$messages.length).toStrictEqual(1)
  expect(instance.$messages[0]).toBe(value)
})

test('it should pass params to $normalizer', () => {
  const value = {}
  const schema = {
    $rule: ({ value }) => value,
    $normalizer: ({ params }) => params.value,
    $params: {
      value,
    },
  }
  const instance = createSchema(schema)

  instance.$validateSync(undefined)
  expect(instance.$messages.length).toStrictEqual(1)
  expect(instance.$messages[0]).toBe(value)
})

test('it should validate recursively (object)', () => {
  const value = {}
  const form = {
    nesting: {
      value,
    },
  }
  const schema = {
    nesting: {
      value: {
        $rule: ({ value }) => value,
      },
    },
  }
  const instance = createSchema(schema)

  instance.$validateSync(form)
  expect(instance.nesting.value.$messages.length).toStrictEqual(1)
  expect(instance.nesting.value.$messages[0]).toBe(value)
})

test('it should validate recursively (array)', () => {
  const value = {}
  const form = [[value]]
  const schema = {
    0: {
      0: {
        $rule: ({ value }) => value,
      },
    },
  }
  const instance = createSchema(schema)

  instance.$validateSync(form)
  expect(instance[0][0].$messages.length).toStrictEqual(1)
  expect(instance[0][0].$messages[0]).toBe(value)
})

test('it should reset recursively', () => {
  const value = {}
  const form = {
    nesting: {
      value,
    },
  }
  const schema = {
    nesting: {
      value: {
        $rule: ({ value }) => value,
      },
    },
  }
  const instance = createSchema(schema)
  instance.$validateSync(form)
  expect(instance.nesting.value.$messages.length).toStrictEqual(1)
  expect(instance.nesting.value.$messages[0]).toBe(value)

  instance.$reset()
  expect(instance.nesting.value.$messages.length).toStrictEqual(0)
})
