const schema = {
  account: {
    $params: {
      param: 'account',
    },
    $rules: {
      required({ value, key, parent, path, root, params }) {
        console.log('value: ', JSON.stringify(value))
        console.log('key: ', JSON.stringify(key))
        console.log('parent: ', JSON.stringify(parent))
        console.log('path: ', JSON.stringify(path))
        console.log('root: ', JSON.stringify(root))
        console.log('params: ', JSON.stringify(params))
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
    $params: {
      param: 'password',
    },
    $rules: {
      required({ value, key, parent, path, root, params }) {
        console.log('value: ', JSON.stringify(value))
        console.log('key: ', JSON.stringify(key))
        console.log('parent: ', JSON.stringify(parent))
        console.log('path: ', JSON.stringify(path))
        console.log('root: ', JSON.stringify(root))
        console.log('params: ', JSON.stringify(params))
        if (value === '') return false
      },
    },
    $errors: {
      required() {
        return 'Please enter a passowrd.'
      },
    },
  },
  emails: {
    $params: {
      param: 'emails',
    },
    $rules: {
      required({ value, key, parent, path, root, params }) {
        console.log('value: ', JSON.stringify(value))
        console.log('key: ', JSON.stringify(key))
        console.log('parent: ', JSON.stringify(parent))
        console.log('path: ', JSON.stringify(path))
        console.log('root: ', JSON.stringify(root))
        console.log('params: ', JSON.stringify(params))
        if (value === '') return false
      },
    },
    $errors() {
      return 'Please enter an email'
    },
  },
}

function logInfo(state, validator) {
  console.log('state: ', JSON.stringify(state, null, 2))
  console.log('validator: ', JSON.stringify(validator, null, 2))
}
