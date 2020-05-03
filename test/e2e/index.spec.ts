import createSchema from '../../src/createSchema'

test('it should validate with given rule', async () => {
  const error = new Error()
  const schema = {
    $rule: ({ value }) => (value.startsWith(' ') ? error : undefined),
  }

  const instance = createSchema(schema)
  await instance.$validate(' ')
  expect(instance.$hasMessage).toStrictEqual(true)
  expect(instance.$messages[0]).toBe(error)
})

test('it should normalize value before validate it', async () => {
  const error = new Error()
  const schema = {
    $rule: ({ value }) => (value.startsWith(' ') ? error : undefined),
    $normalizer: ({ value }) => value.trim(),
  }

  const instance = createSchema(schema)
  await instance.$validate(' ')
  expect(instance.$hasMessage).toStrictEqual(false)
  expect(instance.$messages[0]).toBe(undefined)
})

test('it should pass params to $rule', async () => {
  const error = new Error()
  const schema = {
    $rule: ({ params }) => params.error,
    $params: {
      error,
    },
  }

  const instance = createSchema(schema)
  await instance.$validate('')
  expect(instance.$hasMessage).toStrictEqual(true)
  expect(instance.$messages[0]).toBe(error)
})

test('it should pass params to $normalizer', async () => {
  const error = new Error()
  const schema = {
    $rule: ({ value }) => value,
    $normalizer: ({ params }) => params.error,
    $params: {
      error,
    },
  }

  const instance = createSchema(schema)
  await instance.$validate('')
  expect(instance.$hasMessage).toStrictEqual(true)
  expect(instance.$messages[0]).toBe(error)
})
