import {
  AnyDirtyPlugin,
  AnyErrorPlugin,
  DirtyPlugin,
  ErrorPlugin,
  InvalidPlugin,
  PendingPlugin,
  Plugin,
  proxy,
} from '../../'

function sameAs({ value, root, params }: any) {
  const anotherValue = params.anotherPath.reduce((anotherValue: any, key: string) => anotherValue[key], root)
  if (value !== anotherValue) return false
}

test('same as', () => {
  const form = {
    password: '',
    confirmPassword: '',
  }
  const schema = {
    confirmPassword: {
      $params: {
        anotherPath: ['password'],
      },
      $rules: {
        sameAs,
      },
      $errors: {
        sameAs() {
          return 'should be same as password'
        },
      },
    },
  }
  const plugins: Plugin[] = [
    new InvalidPlugin(),
    new PendingPlugin(),
    new DirtyPlugin(),
    new AnyDirtyPlugin(),
    new ErrorPlugin(),
    new AnyErrorPlugin(),
  ]
  const { proxiedForm, validationWrapper: validator } = proxy({ form, schema, plugins })
  console.log(validator.$v.$states.invalid)

  validator.$v.validate()
  expect(validator.$v.invalid).toBe(false)
  expect(validator.$v.pending).toBe(false)
  expect(validator.$v.dirty).toBe(false)
  expect(validator.$v.anyDirty).toBe(false)
  expect(validator.$v.error).toBe(false)
  expect(validator.$v.anyError).toBe(false)

  expect(validator.confirmPassword.$v.invalid).toBe(false)
  expect(validator.confirmPassword.$v.pending).toBe(false)
  expect(validator.confirmPassword.$v.dirty).toBe(false)
  expect(validator.confirmPassword.$v.anyDirty).toBe(false)
  expect(validator.confirmPassword.$v.error).toBe(false)
  expect(validator.confirmPassword.$v.anyError).toBe(false)
  expect(validator.confirmPassword.$v.errors.sameAs).toBe(undefined)

  proxiedForm.password = '123'
  validator.$v.validate()
  expect(validator.$v.invalid).toBe(true)
  expect(validator.$v.pending).toBe(false)
  expect(validator.$v.dirty).toBe(false)
  expect(validator.$v.anyDirty).toBe(false)
  expect(validator.$v.error).toBe(false)
  expect(validator.$v.anyError).toBe(false)

  expect(validator.confirmPassword.$v.invalid).toBe(true)
  expect(validator.confirmPassword.$v.pending).toBe(false)
  expect(validator.confirmPassword.$v.dirty).toBe(false)
  expect(validator.confirmPassword.$v.anyDirty).toBe(false)
  expect(validator.confirmPassword.$v.error).toBe(false)
  expect(validator.confirmPassword.$v.anyError).toBe(false)
  expect(validator.confirmPassword.$v.errors.sameAs).toBe('should be same as password')

  proxiedForm.password = '123'
  validator.$v.touch()
  expect(validator.$v.invalid).toBe(true)
  expect(validator.$v.pending).toBe(false)
  expect(validator.$v.dirty).toBe(true)
  expect(validator.$v.anyDirty).toBe(true)
  expect(validator.$v.error).toBe(false)
  expect(validator.$v.anyError).toBe(true)

  expect(validator.confirmPassword.$v.invalid).toBe(true)
  expect(validator.confirmPassword.$v.pending).toBe(false)
  expect(validator.confirmPassword.$v.dirty).toBe(true)
  expect(validator.confirmPassword.$v.anyDirty).toBe(true)
  expect(validator.confirmPassword.$v.error).toBe(true)
  expect(validator.confirmPassword.$v.anyError).toBe(true)
  expect(validator.confirmPassword.$v.errors.sameAs).toBe('should be same as password')

  proxiedForm.confirmPassword = '123'
  validator.$v.touch()
  expect(validator.$v.invalid).toBe(false)
  expect(validator.$v.pending).toBe(false)
  expect(validator.$v.dirty).toBe(true)
  expect(validator.$v.anyDirty).toBe(true)
  expect(validator.$v.error).toBe(false)
  expect(validator.$v.anyError).toBe(false)

  expect(validator.confirmPassword.$v.invalid).toBe(false)
  expect(validator.confirmPassword.$v.pending).toBe(false)
  expect(validator.confirmPassword.$v.dirty).toBe(true)
  expect(validator.confirmPassword.$v.anyDirty).toBe(true)
  expect(validator.confirmPassword.$v.error).toBe(false)
  expect(validator.confirmPassword.$v.anyError).toBe(false)
  expect(validator.confirmPassword.$v.errors.sameAs).toBe(undefined)

  validator.$v.reset()
  expect(validator.$v.invalid).toBe(false)
  expect(validator.$v.pending).toBe(false)
  expect(validator.$v.dirty).toBe(false)
  expect(validator.$v.anyDirty).toBe(false)
  expect(validator.$v.error).toBe(false)
  expect(validator.$v.anyError).toBe(false)

  expect(validator.confirmPassword.$v.invalid).toBe(false)
  expect(validator.confirmPassword.$v.pending).toBe(false)
  expect(validator.confirmPassword.$v.dirty).toBe(false)
  expect(validator.confirmPassword.$v.anyDirty).toBe(false)
  expect(validator.confirmPassword.$v.error).toBe(false)
  expect(validator.confirmPassword.$v.anyError).toBe(false)
  expect(validator.confirmPassword.$v.errors.sameAs).toBe(undefined)
})

function unique({ value, key, parent }: any) {
  const index = parseInt(key, 10)
  let i = 0
  while (i < index) {
    if (value === parent[i]) return false
    ++i
  }
}

test('same as', () => {
  const form = {
    ipAddresses: ['8.8.8.8', '8.8.8.8', '8.8.8.8'],
  }
  const schema = {
    ipAddresses: {
      $iter: {
        $rules: {
          unique,
        },
        $errors: {
          unique() {
            return 'should be unique'
          },
        },
      },
    },
  }
  const { proxiedForm, validationWrapper: validator } = proxy({ form, schema })

  validator.$v.validate()
  expect(validator.ipAddresses[0].$v.invalid).toBe(false)
  expect(validator.ipAddresses[1].$v.invalid).toBe(true)
  expect(validator.ipAddresses[2].$v.invalid).toBe(true)

  proxiedForm.ipAddresses[0] = '1.1.1.1'
  validator.$v.validate()
  expect(validator.ipAddresses[0].$v.invalid).toBe(false)
  expect(validator.ipAddresses[1].$v.invalid).toBe(false)
  expect(validator.ipAddresses[2].$v.invalid).toBe(true)

  proxiedForm.ipAddresses[1] = '1.1.1.1'
  validator.$v.validate()
  expect(validator.ipAddresses[0].$v.invalid).toBe(false)
  expect(validator.ipAddresses[1].$v.invalid).toBe(true)
  expect(validator.ipAddresses[2].$v.invalid).toBe(false)
})

function exists({ value }: any) {
  return new Promise(resolve => setTimeout(resolve, 5)).then(() => {
    if (value !== '') return false
  })
}

test('async', async () => {
  const form = {
    account: '',
  }
  const schema = {
    account: {
      $rules: {
        exists,
      },
      $errors: {
        exists() {
          return 'this account has been used'
        },
      },
    },
  }
  const { proxiedForm, validationWrapper: validator } = proxy({ form, schema })

  let promise = null

  promise = validator.$v.validate()
  expect(validator.account.$v.invalid).toBe(false)
  expect(validator.account.$v.pending).toBe(true)

  await promise
  expect(validator.account.$v.invalid).toBe(false)
  expect(validator.account.$v.pending).toBe(false)

  proxiedForm.account = '123'
  promise = validator.$v.validate()
  expect(validator.account.$v.invalid).toBe(false)
  expect(validator.account.$v.pending).toBe(true)

  await promise
  expect(validator.account.$v.invalid).toBe(true)
  expect(validator.account.$v.pending).toBe(false)

  promise = validator.$v.validate()
  promise = validator.$v.validate()
  proxiedForm.account = ''
  promise = validator.$v.validate()
  expect(validator.account.$v.invalid).toBe(false)
  expect(validator.account.$v.pending).toBe(true)

  await promise
  expect(validator.account.$v.invalid).toBe(false)
  expect(validator.account.$v.pending).toBe(false)
})
