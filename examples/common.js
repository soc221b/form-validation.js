const wait = ms => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    })
  })
}
const schema = {
  account: {
    $params: {
      name: 'account',
      minLength: 6,
    },
    $normalizer({ value }) {
      return value.trim()
    },
    $rules: {
      required({ value }) {
        if (value === '') return false
      },
      minLength({ value, params }) {
        if (value.length < params.minLength) return false
      },
      async existed() {
        await wait(1000)
        return Promise.resolve(Math.random() > 0.5)
      },
    },
    $errors: {
      required({ params }) {
        return `Please enter an ${params.name}.`
      },
      minLength({ params }) {
        return `The ${params.name} must be at lease ${params.minLength} charachers.`
      },
      existed({ value, params }) {
        return `This ${params.name}: ${value} has been used.`
      },
    },
  },
  password: {
    $params: {
      name: 'password',
    },
    $normalizer({ value }) {
      return value.trim()
    },
    $rules: {
      required({ value }) {
        if (value === '') return false
      },
      weak({ value, root }) {
        if (value.length < 10) {
          return 'Too short.'
        }
        if (FormValidation.getByPath(root, ['account']) === value) {
          return 'Password can not be the same as account'
        }
      },
    },
    $errors: {
      required({ params }) {
        return `Please enter an ${params.name}.`
      },
      weak({ params }) {
        return params.$rulesResult.weak
      },
    },
  },
  emails: {
    $params: {
      minLength: 1,
    },
    $rules: {
      minLength({ value, params }) {
        if (value.length < params.minLength) return false
      },
    },
    $errors() {
      return 'Please enter an email'
    },
    $iter: {
      $normalizer({ value }) {
        return value.trim()
      },
      $rules: {
        email({ value }) {
          if (value === '') return
          if (/.+@.+/.test(value)) return false
        },
      },
      $errors: {
        email() {
          return 'Please enter valid email address.'
        },
      },
    },
    0: {
      $normalizer({ value }) {
        return value.trim()
      },
      $rules: {
        required({ value }) {
          if (value === '') return false
        },
        email({ value }) {
          if (value === '') return
          if (/.+@.+/.test(value)) return false
        },
      },
      $errors: {
        required() {
          return `Please enter an email.`
        },
      },
    },
  },
}

function logInfo(state, validator) {
  console.log('state: ', state)
  console.log('validator: ', validator)
}
