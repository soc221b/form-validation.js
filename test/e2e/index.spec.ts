import { proxy } from '../../src/index'

test('$rules should works', () => {
  const form = {
    account: '',
  }
  const schema = {
    account: {
      $rules: {
        required({ value }: any) {
          if (value === '') return false
        },
      },
    },
  }
  const validator: any = {}
  const proxiedForm: any = proxy({ form, schema, validator })

  expect(validator.account.$v.invalid).toBe(false)

  validator.account.$v.validate()
  expect(validator.account.$v.invalid).toBe(true)

  proxiedForm.account = ' '
  validator.account.$v.validate()
  expect(validator.account.$v.invalid).toBe(false)

  proxiedForm.account = ''
  validator.account.$v.validate()
  expect(validator.account.$v.invalid).toBe(true)
})

test('$errors should works', () => {
  const form = {
    account: '',
  }
  const schema = {
    account: {
      $rules: {
        required({ value }: any) {
          if (value === '') return false
        },
      },
      $errors: {
        required() {
          return 'Must be filled.'
        },
      },
    },
  }
  const validator: any = {}
  const proxiedForm: any = proxy({ form, schema, validator })

  expect(validator.account.$v.errors.required).toBe(undefined)

  validator.account.$v.validate()
  expect(validator.account.$v.errors.required).toBe('Must be filled.')

  proxiedForm.account = ' '
  validator.account.$v.validate()
  expect(validator.account.$v.errors.required).toBe(undefined)

  proxiedForm.account = ''
  validator.account.$v.validate()
  expect(validator.account.$v.errors.required).toBe('Must be filled.')
})

test('$normalizer should works', () => {
  const form = {
    account: '',
  }
  const schema = {
    account: {
      $normalizer({ value }: any) {
        return value.trim()
      },
      $rules: {
        required({ value }: any) {
          if (value === '') return false
        },
      },
      $errors: {
        required() {
          return 'Must be filled.'
        },
      },
    },
  }
  const validator: any = {}
  const proxiedForm: any = proxy({ form, schema, validator })

  expect(validator.account.$v.errors.required).toBe(undefined)

  validator.account.$v.validate()
  expect(validator.account.$v.errors.required).toBe('Must be filled.')

  proxiedForm.account = ' '
  validator.account.$v.validate()
  expect(validator.account.$v.errors.required).toBe('Must be filled.')

  proxiedForm.account = '1'
  validator.account.$v.validate()
  expect(validator.account.$v.errors.required).toBe(undefined)

  proxiedForm.account = ' '
  validator.account.$v.validate()
  expect(validator.account.$v.errors.required).toBe('Must be filled.')
})

test('$params should works', () => {
  const form = {
    account: '',
  }
  const schema = {
    account: {
      $params: {
        normalizer: (value: any) => value.trim(),
        rule: (value: any) => value === '',
        error: 'Must be filled',
      },
      $normalizer({ value, params }: any) {
        return params.normalizer(value)
      },
      $rules: {
        required({ value, params }: any) {
          if (params.rule(value)) return false
        },
      },
      $errors: {
        required({ params }: any) {
          return params.error
        },
      },
    },
  }
  const validator: any = {}
  const proxiedForm: any = proxy({ form, schema, validator })

  expect(validator.account.$v.errors.required).toBe(undefined)

  validator.account.$v.validate()
  expect(validator.account.$v.errors.required).toBe('Must be filled')

  proxiedForm.account = ' '
  validator.account.$v.validate()
  expect(validator.account.$v.errors.required).toBe('Must be filled')

  proxiedForm.account = '1'
  validator.account.$v.validate()
  expect(validator.account.$v.errors.required).toBe(undefined)

  proxiedForm.account = ''
  validator.account.$v.validate()
  expect(validator.account.$v.errors.required).toBe('Must be filled')
})

test('$rules results should be passed to $errors', () => {
  const form = {
    account: '',
  }
  const schema = {
    account: {
      $rules: {
        required({ value }: any) {
          if (value === '') return 'Must be filled.'
        },
      },
      $errors: {
        required({ params }: any) {
          return params.$rules.required
        },
      },
    },
  }
  const validator: any = {}
  const proxiedForm: any = proxy({ form, schema, validator })

  expect(validator.account.$v.errors.required).toBe(undefined)

  validator.account.$v.validate()
  expect(validator.account.$v.errors.required).toBe('Must be filled.')

  proxiedForm.account = ' '
  validator.account.$v.validate()
  expect(validator.account.$v.errors.required).toBe(undefined)

  proxiedForm.account = ''
  validator.account.$v.validate()
  expect(validator.account.$v.errors.required).toBe('Must be filled.')
})
