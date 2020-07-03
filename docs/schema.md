# ToC

- [Rules](#rules)
- [Errors](#errors)
- [Normalizer](#normalizer)
- [Params](#params)
- [Structure](#structure)

# Rules

```javascript
const form = {
  account: '',
}

const schema = {
  account: {
    $rules: {
      required({ value }) {
        if (value === '') {
          // return non-undefined value to denote the rule is rejected
          return false
        }
      },
      // asynchronizable
      async alreadyBeenUsed({ value }) {
        if (await isExists(value)) {
          return false
        }
      },
      weak({ value }) {
        if (value.length < 6) {
          // anything returned from rules will be passed as params.$rules[<ruleName>] to $errors
          return 'too short'
        }
        if (/\W/.test(value)) {
          return 'Must contain special charachar'
        }
      },
    },
  },
}
```

# Errors

```javascript
const form = {
  account: '',
}

const schema = {
  account: {
    $rules: {
      required({ value }) {
        if (value === '') {
          return false
        }
      },
      async alreadyBeenUsed ({ value }) {
        if (await isExists(value)) {
          return false
        }
      },
      weak ({ value }) {
        if (value.length < 6) {
          return 'too short'
        }
        if (/\W/.test(value) === false) {
          return 'Must contain special charachar'
        }
      }
    }
    $errors: {
      required () {
        // return an error message
        return 'Must be filled.'
      },
      alreadyBeenUsed () {
        // you can return anything from $errors
        return ['error', 'This account has already been used.']
      },
      weak ({ params }) {
        // params will always has the prop: $rules
        // you can use it to get the result returned by all rules' validation
        return params.$rules.weak
      }
    }
  },
}
```

# Normalizer

```javascript
const form = {
  account: '',
}

const schema = {
  account: {
    $normalizer: ({ value }) => {
      // normalizer will be called before validation
      return value.trim()
    },
    $rules: {
      required({ value }) {
        if (value === '') {
          return false
        }
      },
    },
    $errors: {
      required({ value }) {
        return `Must be filled.`
      },
    },
  },
}
```

# Params

```javascript
const form = {
  account: '',
}

const schema = {
  account: {
    // to pass something to the rule methods or else to do more things
    $params: {
      languageCode: 'fr',
    },
    $rules: {
      required({ value }) {
        if (value === '') {
          return false
        }
      },
    },
    $errros: {
      required({ params }) {
        const languageCode = params.languageCode || 'en-US'
        return translate(`Must be filled.`, { languageCode })
      },
    },
  },
}
```

# Structure

Everything is pretty intuitive and reasonable, validation schema is as same as the structure of data which you wanted to
validate for.

## Classic Example

```javascript
const form = {
  account: '123',
  password: '123',
}

const schema = {
  // rules for the entire form
  $rules: {},
  $iter: {
    // ruels for non-specified nested keys
    // i.e. the form.account in here.
    $rules: {},
  },
  password: {
    // rules for the form.password
    $rules: {},
  },
}
```
