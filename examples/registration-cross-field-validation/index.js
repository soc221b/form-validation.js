const form = {
  account: '',
  password: '',
  confirmPassword: '',
}

const schema = {
  account: {
    $rules: {
      required({ value }) {
        if (value === '') return false
      },
    },
    $errors: {
      required() {
        return 'Please enter an account.'
      },
    },
  },
  password: {
    $rules: {
      required({ value }) {
        if (value === '') return false
      },
    },
    $errors: {
      required() {
        return 'Please enter a passowrd.'
      },
    },
  },
  confirmPassword: {
    $params: {
      sameAs: 'password',
    },
    $rules: {
      required({ value, params, target }) {
        const password = target[params.sameAs]
        if (value !== password) return false
      },
    },
    $errors: {
      required() {
        return 'Please confirm your password.'
      },
    },
  },
}

const validator = FormValidation.createInstance(schema)
validator.$bind(form)

const formElements = {
  account: document.getElementById('account'),
  accountError: document.getElementById('account-error'),
  password: document.getElementById('password'),
  passwordError: document.getElementById('password-error'),
  confirmPassword: document.getElementById('confirm-password'),
  confirmPasswordError: document.getElementById('confirm-password-error'),
}

formElements.account.addEventListener('input', async () => {
  form.account = formElements.account.value
  await validator.account.$validate()
  formElements.accountError.innerText = validator.account.$errors.required || ''
  render()
})

formElements.password.addEventListener('input', async () => {
  form.password = formElements.password.value
  await validator.password.$validate()
  formElements.passwordError.innerText = validator.password.$errors.required || ''
  render()
})

formElements.confirmPassword.addEventListener('input', async () => {
  form.confirmPassword = formElements.confirmPassword.value
  await validator.confirmPassword.$validate()
  formElements.confirmPasswordError.innerText = validator.confirmPassword.$errors.required || ''
  render()
})

function render() {
  console.clear()
  console.log('form: ', JSON.stringify(form, null, 2))
  console.log('validator: ', getValidatorInfo(validator))
}
