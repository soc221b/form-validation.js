import createInstance from '../../src/createInstance'

test('it should pass param to reserved functions', async () => {
  const param = {}
  const nesting = {}
  const form = {
    nesting,
  }
  let called = 0
  const schema = {
    $params: {
      param,
    },
    $normalizer({ value, key, path, target, params }: any) {
      called++
      expect(value).toBe(form)
      expect(key).toBe(undefined)
      expect(path).toStrictEqual([])
      expect(target).toBe(form)
      expect(params.param).toBe(param)
      return value
    },
    $rules: {
      rule({ value, key, path, target, params }: any) {
        called++
        expect(value).toBe(form)
        expect(key).toBe(undefined)
        expect(path).toStrictEqual([])
        expect(target).toBe(form)
        expect(params.param).toBe(param)
        return false
      },
    },
    $errors: {
      rule({ value, key, path, target, params }: any) {
        called++
        expect(value).toBe(form)
        expect(key).toBe(undefined)
        expect(path).toStrictEqual([])
        expect(target).toBe(form)
        expect(params.param).toBe(param)
      },
    },
  }

  const instance = createInstance(schema)
  await instance.$validate(form)
  expect(called).toStrictEqual(3)
})

test('it should pass param to reserved functions (nesting)', async () => {
  const param = {}
  const nesting = {}
  const form = {
    nesting,
  }
  let called = 0
  const schema = {
    nesting: {
      $params: {
        param,
      },
      $normalizer({ value, key, path, target, params }: any) {
        called++
        expect(value).toBe(nesting)
        expect(key).toBe('nesting')
        expect(path).toStrictEqual(['nesting'])
        expect(target).toBe(form)
        expect(params.param).toBe(param)
        return value
      },
      $rules: {
        rule({ value, key, path, target, params }: any) {
          called++
          expect(value).toBe(nesting)
          expect(key).toBe('nesting')
          expect(path).toStrictEqual(['nesting'])
          expect(target).toBe(form)
          expect(params.param).toBe(param)
          return false
        },
      },
      $errors: {
        rule({ value, key, path, target, params }: any) {
          called++
          expect(value).toBe(nesting)
          expect(key).toBe('nesting')
          expect(path).toStrictEqual(['nesting'])
          expect(target).toBe(form)
          expect(params.param).toBe(param)
        },
      },
    },
  }

  const instance = createInstance(schema)
  await instance.$validate(form)
  expect(called).toStrictEqual(3)
})

test('it should validate with rules', async () => {
  const value = {}
  const form = undefined
  const schema = {
    $rules: {
      rule() {
        return false
      },
    },
    $errors: {
      rule() {
        return value
      },
    },
  }
  const validator = createInstance(schema)

  await validator.$validate(form)
  expect(validator.$errors.rule).toBe(value)
})

test('it should normalize value before validate it', async () => {
  const value = {}
  const form = undefined
  const schema = {
    $normalizer: () => value,
    $rules: {
      rule() {
        return false
      },
    },
    $errors: {
      rule({ value }: any) {
        return value
      },
    },
  }
  const validator = createInstance(schema)

  await validator.$validate(form)
  expect(validator.$errors.rule).toBe(value)
})

test('it should validate recursively (object)', async () => {
  const value = {}
  const form = {
    nesting: {
      value,
    },
  }
  const schema = {
    nesting: {
      value: {
        $rules: {
          rule() {
            return false
          },
        },
        $errors: {
          rule({ value }: any) {
            return value
          },
        },
      },
    },
  }
  const validator = createInstance(schema)

  await validator.$validate(form)
  expect(validator.nesting.value.$errors.rule).toBe(value)
})

test('it should validate recursively (array)', async () => {
  const value = {}
  const form: any[][] = []
  form.push([])
  form[0].push(value)
  const schema = {
    0: {
      0: {
        $rules: {
          rule() {
            return false
          },
        },
        $errors: {
          rule({ value }: any) {
            return value
          },
        },
      },
    },
  }
  const validator = createInstance(schema)

  await validator.$validate(form)
  expect(validator[0][0].$errors.rule).toBe(value)
})

test('it should reset recursively (object)', async () => {
  const value = {}
  const form = {
    nesting: {
      value,
    },
  }
  const schema = {
    nesting: {
      value: {
        $rules: {
          rule() {
            return false
          },
        },
        $errors: {
          rule({ value }: any) {
            return value
          },
        },
      },
    },
  }
  const validator = createInstance(schema)

  await validator.$validate(form)
  expect(validator.nesting.value.$errors.rule).toBe(value)

  validator.$reset()
  expect(validator.nesting.value.$errors.rule).toBe(undefined)
})

test('it should reset recursively (array)', async () => {
  const value = {}
  const form: any[][] = []
  form.push([])
  form[0].push(value)
  const schema = {
    0: {
      0: {
        $rules: {
          rule() {
            return false
          },
        },
        $errors: {
          rule({ value }: any) {
            return value
          },
        },
      },
    },
  }
  const validator = createInstance(schema)

  await validator.$validate(form)
  expect(validator[0][0].$errors.rule).toBe(value)

  validator.$reset()
  expect(validator[0][0].$errors.rule).toBe(undefined)
})
