import createInstance from '../../src/createInstance'

test('it should pass param to reserved functions', async () => {
  const param = {}
  const nesting = {}
  const form = {
    nesting,
  }
  let called = Array(6).fill(false)
  const schema = {
    $params: {
      param,
    },
    $normalizer({ value, key, path, target, params }: any) {
      called[0] = true
      expect(value).toBe(form)
      expect(key).toBe(undefined)
      expect(path).toStrictEqual([])
      expect(target).toBe(form)
      expect(params.param).toBe(param)
      return value
    },
    $rules: {
      rule({ value, key, path, target, params }: any) {
        called[1] = true
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
        called[2] = true
        expect(value).toBe(form)
        expect(key).toBe(undefined)
        expect(path).toStrictEqual([])
        expect(target).toBe(form)
        expect(params.param).toBe(param)
      },
    },
    nesting: {
      $params: {
        param,
      },
      $normalizer({ value, key, path, target, params }: any) {
        called[3] = true
        expect(value).toBe(nesting)
        expect(key).toBe('nesting')
        expect(path).toStrictEqual(['nesting'])
        expect(target).toBe(form)
        expect(params.param).toBe(param)
        return value
      },
      $rules: {
        rule({ value, key, path, target, params }: any) {
          called[4] = true
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
          called[5] = true
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
  expect(called.every(called => called)).toStrictEqual(true)
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
      value: null,
    },
  }
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
    nesting: {
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
      value: {
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
      },
    },
  }
  const validator = createInstance(schema)

  await validator.$validate(form)
  expect(validator.$errors.rule).toBe(value)
  expect(validator.nesting.$errors.rule).toBe(value)
  expect(validator.nesting.value.$errors.rule).toBe(value)
})

test('it should validate recursively (array)', async () => {
  const value = {}
  const form = [[null]]
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
    0: {
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
      0: {
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
      },
    },
  }
  const validator = createInstance(schema)

  await validator.$validate(form)
  expect(validator.$errors.rule).toBe(value)
  expect(validator[0].$errors.rule).toBe(value)
  expect(validator[0][0].$errors.rule).toBe(value)
})

test('it should reset recursively (object)', async () => {
  const value = {}
  const form = {
    nesting: {
      value: null,
    },
  }
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
    nesting: {
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
      value: {
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
      },
    },
  }
  const validator = createInstance(schema)

  await validator.$validate(form)
  expect(validator.$errors.rule).toBe(value)
  expect(validator.nesting.$errors.rule).toBe(value)
  expect(validator.nesting.value.$errors.rule).toBe(value)

  validator.nesting.value.$reset()
  expect(validator.$errors.rule).toBe(value)
  expect(validator.nesting.$errors.rule).toBe(value)
  expect(validator.nesting.value.$errors.rule).toBe(undefined)

  await validator.$validate(form)
  expect(validator.$errors.rule).toBe(value)
  expect(validator.nesting.$errors.rule).toBe(value)
  expect(validator.nesting.value.$errors.rule).toBe(value)

  validator.nesting.$reset()
  expect(validator.$errors.rule).toBe(value)
  expect(validator.nesting.$errors.rule).toBe(undefined)
  expect(validator.nesting.value.$errors.rule).toBe(undefined)

  await validator.$validate(form)
  expect(validator.$errors.rule).toBe(value)
  expect(validator.nesting.$errors.rule).toBe(value)
  expect(validator.nesting.value.$errors.rule).toBe(value)

  validator.$reset()
  expect(validator.$errors.rule).toBe(undefined)
  expect(validator.nesting.$errors.rule).toBe(undefined)
  expect(validator.nesting.value.$errors.rule).toBe(undefined)
})

test('it should reset recursively (array)', async () => {
  const value = {}
  const form = [[null]]
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
    0: {
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
      0: {
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
      },
    },
  }
  const validator = createInstance(schema)

  await validator.$validate(form)
  expect(validator.$errors.rule).toBe(value)
  expect(validator[0].$errors.rule).toBe(value)
  expect(validator[0][0].$errors.rule).toBe(value)

  validator[0][0].$reset()
  expect(validator.$errors.rule).toBe(value)
  expect(validator[0].$errors.rule).toBe(value)
  expect(validator[0][0].$errors.rule).toBe(undefined)

  await validator.$validate(form)
  expect(validator.$errors.rule).toBe(value)
  expect(validator[0].$errors.rule).toBe(value)
  expect(validator[0][0].$errors.rule).toBe(value)

  validator[0].$reset()
  expect(validator.$errors.rule).toBe(value)
  expect(validator[0].$errors.rule).toBe(undefined)
  expect(validator[0][0].$errors.rule).toBe(undefined)

  await validator.$validate(form)
  expect(validator.$errors.rule).toBe(value)
  expect(validator[0].$errors.rule).toBe(value)
  expect(validator[0][0].$errors.rule).toBe(value)

  validator.$reset()
  expect(validator.$errors.rule).toBe(undefined)
  expect(validator[0].$errors.rule).toBe(undefined)
  expect(validator[0][0].$errors.rule).toBe(undefined)
})
