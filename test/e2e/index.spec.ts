import { createInstance } from '../../src/index'

test('it should pass param to reserved functions', async () => {
  const param = {}
  const value = {}
  const nesting = {
    value,
  }
  const form = {
    nesting,
  }
  const called = Array(6).fill(false)
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
      value: {
        $params: {
          param,
        },
        $normalizer({ value, key, path, target, params }: any) {
          called[3] = true
          expect(value).toBe(value)
          expect(key).toBe('value')
          expect(path).toStrictEqual(['nesting', 'value'])
          expect(target).toBe(form)
          expect(params.param).toBe(param)
          return value
        },
        $rules: {
          rule({ value, key, path, target, params }: any) {
            called[4] = true
            expect(value).toBe(value)
            expect(key).toBe('value')
            expect(path).toStrictEqual(['nesting', 'value'])
            expect(target).toBe(form)
            expect(params.param).toBe(param)
            return false
          },
        },
        $errors: {
          rule({ value, key, path, target, params }: any) {
            called[5] = true
            expect(value).toBe(value)
            expect(key).toBe('value')
            expect(path).toStrictEqual(['nesting', 'value'])
            expect(target).toBe(form)
            expect(params.param).toBe(param)
          },
        },
      }
    },
  }

  const validator = createInstance(schema)
  validator.$bind(form)

  await validator.$validate()
  expect(called.every(called => called)).toStrictEqual(true)
})

test('it should validate with rules', async () => {
  const value = {}
  const form = undefined
  let schema
  let validator

  schema = {
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
  validator = createInstance(schema)
  validator.$bind(form)

  await validator.$validate()
  expect(validator.$errors.rule).toBe(value)


  schema = {
    $rules: {
      rule() {
        return undefined
      },
    },
    $errors: {
      rule() {
        return value
      },
    },
  }
  validator = createInstance(schema)
  validator.$bind(form)

  await validator.$validate()
  expect(validator.$errors.rule).toBe(undefined)
})

test('it should normalize value before validate it', async () => {
  const value = {}
  const form = undefined
  const schema = {
    $normalizer: () => value,
    $rules: {
      rule({ value }: any) {
        return value
      },
    },
    $errors: {
      rule({ value }: any) {
        return value
      },
    },
  }
  const validator = createInstance(schema)
  validator.$bind(form)

  await validator.$validate()
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
  validator.$bind(form)

  await validator.$validate()
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
  validator.$bind(form)

  await validator.$validate()
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
  validator.$bind(form)

  await validator.$validate()
  expect(validator.$errors.rule).toBe(value)
  expect(validator.nesting.$errors.rule).toBe(value)
  expect(validator.nesting.value.$errors.rule).toBe(value)

  validator.nesting.value.$reset()
  expect(validator.$errors.rule).toBe(value)
  expect(validator.nesting.$errors.rule).toBe(value)
  expect(validator.nesting.value.$errors.rule).toBe(undefined)

  await validator.$validate()
  validator.nesting.$reset()
  expect(validator.$errors.rule).toBe(value)
  expect(validator.nesting.$errors.rule).toBe(undefined)
  expect(validator.nesting.value.$errors.rule).toBe(undefined)

  await validator.$validate()
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
  validator.$bind(form)

  await validator.$validate()
  expect(validator.$errors.rule).toBe(value)
  expect(validator[0].$errors.rule).toBe(value)
  expect(validator[0][0].$errors.rule).toBe(value)

  validator[0][0].$reset()
  expect(validator.$errors.rule).toBe(value)
  expect(validator[0].$errors.rule).toBe(value)
  expect(validator[0][0].$errors.rule).toBe(undefined)

  await validator.$validate()
  validator[0].$reset()
  expect(validator.$errors.rule).toBe(value)
  expect(validator[0].$errors.rule).toBe(undefined)
  expect(validator[0][0].$errors.rule).toBe(undefined)

  await validator.$validate()
  validator.$reset()
  expect(validator.$errors.rule).toBe(undefined)
  expect(validator[0].$errors.rule).toBe(undefined)
  expect(validator[0][0].$errors.rule).toBe(undefined)
})

test('it should bind target recursively (object)', async () => {
  const form = { nesting: { value: {} } }
  const called = Array(3).fill(false)
  const schema = {
    $rules: {
      rule({ value, target }: any) {
        called[0] = true
        expect(value).toBe(form)
        expect(target).toBe(form)
      },
    },
    nesting: {
      $rules: {
        rule({ value, target }: any) {
          called[1] = true
          expect(value).toBe(form.nesting)
          expect(target).toBe(form)
        },
      },
      value: {
        $rules: {
          rule({ value, target }: any) {
            called[2] = true
            expect(value).toBe(form.nesting.value)
            expect(target).toBe(form)
          },
        },
      },
    },
  }
  const validator = createInstance(schema)

  validator.$bind(form)
  await validator.$validate()
  expect(called[0]).toStrictEqual(true)
  expect(called[1]).toStrictEqual(true)
  expect(called[2]).toStrictEqual(true)

  called.fill(false)
  await validator.nesting.$validate()
  expect(called[0]).toStrictEqual(false)
  expect(called[1]).toStrictEqual(true)
  expect(called[2]).toStrictEqual(true)

  called.fill(false)
  await validator.nesting.value.$validate()
  expect(called[0]).toStrictEqual(false)
  expect(called[1]).toStrictEqual(false)
  expect(called[2]).toStrictEqual(true)
})
