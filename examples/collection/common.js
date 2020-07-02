const wait = ms => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

const deepCopy = value => JSON.parse(JSON.stringify(value))

function logInfo(state, validator) {
  console.log('state: ', state)
  console.log('validator: ', validator)
}

const form = {
  accountList: ['', ''],
}

const schema = {
  accountList: {
    $rules: {
      minLength({ value }) {
        if (value.length < 3) return false
      },
    },
    $errors: {
      required() {
        return `Must be at least 3 accounts.`
      },
    },
    $iter: {
      $rules: {
        required({ value }) {
          if (value === '') return false
        },
      },
      $errors: {
        required() {
          return `Must be filled.`
        },
      },
    },
    0: {
      $rules: {
        required({ value }) {
          if (value === '') return false
        },
        fullName({ value }) {
          if (value.split(' ').length < 2) return false
        },
      },
      $errors: {
        required() {
          return `Must be filled.`
        },
        fullName() {
          return `Must be full-name.`
        },
      },
    },
  },
}

const validator = {}
