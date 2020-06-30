const wait = ms => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

function logInfo(state, validator) {
  console.log('state: ', state)
  console.log('validator: ', validator)
}

const form = {
  account1: '',
  account2: '',
  account3: '',
  account4: '',
}

const schema = {
  account1: {
    $rules: {
      minLength({ value }) {
        if (value.length < 6) return false
      },
    },
    $errors: {
      minLength() {
        return `Must be at least 6 charachers.`
      },
    },
  },
  account2: {
    $normalizer({ value }) {
      return value.trim()
    },
    $rules: {
      minLength({ value }) {
        if (value.length < 6) return false
      },
    },
    $errors: {
      minLength() {
        return `Must be at least 6 charachers.`
      },
    },
  },
  account3: {
    $params: {
      minLength: 6,
    },
    $rules: {
      minLength({ value, params }) {
        if (value.length < params.minLength) return false
      },
    },
    $errors: {
      minLength({ params }) {
        return `Must be at least ${params.minLength} charachers.`
      },
    },
  },
  account4: {
    $rules: {
      async minLength({ value }) {
        await wait(1000)
        if (value.length < 6) return false
      },
    },
    $errors: {
      minLength() {
        return `Must be at least 6 charachers.`
      },
    },
  },
}

const validator = {}
