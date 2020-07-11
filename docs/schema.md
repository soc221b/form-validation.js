# ToC

- [Rules](#rules)
- [Errors](#errors)
- [Normalizer](#normalizer)
- [Params](#params)
- [Deep Structure](#deep-structure)

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

# Deep Structure

Validation schema is as same as the structure of the form you passed.

## Full Example

```javascript
const form = {
  specifiedFiled1: '',
  specifiedFiled2: '',
  notSpecifiedFiled1: '',
  notSpecifiedFiled2: '',

  nestedArray: ['', '', '', ''],

  nestedObject: {
    specifiedFiled1: '',
    specifiedFiled2: '',
    notSpecifiedFiled1: '',
    notSpecifiedFiled2: '',
  },

  // very deep example
  accounts: {
    Jeffrey: {
      emails: ['', ''],
    },
    Denial: {
      emails: ['', ''],
    },
  },
}

// for entire form
const schema = {
  $rules: {},

  // for form.specifiedFiled1
  specifiedFiled1: {
    $rules: {},
  },
  // for form.specifiedFiled2
  specifiedFiled2: {
    $rules: {},
  },

  // for form.notSpecifiedFiled1 and form.notSpecifiedFiled2
  $iter: {
    $rules: {},
  },

  // for form.nestedArray
  nestedArray: {
    $rules: {},

    // for form.nestedArray[0]
    0: {
      $rules: {},
    },
    // for form.nestedArray[1]
    1: {
      $rules: {},
    },

    // for form.nestedArray[2] and form.nestedArray[3]
    $iter: {
      $rules: {},
    },
  },

  // for form.nestedObject
  nestedObject: {
    $rules: {},

    // for form.nestedObject.specifiedField1
    specifiedField1: {
      $rules: {},
    },
    // for form.nestedObject.specifiedField2
    specifiedField2: {
      $rules: {},
    },

    // for form.nestedObject.notSpecifiedField1 and form.nestedObject.notSpecifiedField2
    $iter: {
      $rules: {},
    },
  },

  // very deep example
  accounts: {
    // for form.accounts.Jeffrey and
    // for form.accounts.Denial
    $iter: {
      // for form.accounts.Jeffrey.emails and
      // for form.accounts.Denial.emails
      emails: {
        // for form.accounts.Jeffrey.emails[0] and
        // for form.accounts.Jeffrey.emails[1] and
        // for form.accounts.Denial.emails[0] and
        // for form.accounts.Denial.emails[1]
        $iter: {
          $rules: {},
        },
      },
    },
  },
}

const validator = {}
```
