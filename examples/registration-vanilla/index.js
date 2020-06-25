const form = {
  account: '',
  password: '',
}

const validator = FormValidation.createInstance(schema)
validator.$bind(form)

const formElements = {
  account: document.getElementById('account'),
  accountError: document.getElementById('account-error'),
  password: document.getElementById('password'),
  passwordError: document.getElementById('password-error'),
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

function render() {
  console.clear()
  console.log('form: ', JSON.stringify(form, null, 2))
  console.log('validator: ', getValidatorInfo(validator))
}
