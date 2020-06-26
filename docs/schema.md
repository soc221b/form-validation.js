# ToC

- [Structure](#structure)
- [Rules](#rules)
- [Errors](#errors)
- [Normalizer](#normalizer)
- [Params](#params)

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
  $rules: {}, // rules for the entire form
  $iter: {
    $rules: {}, // rules for the form.? (i.e. the form.account in here)
  },
  password: {
    $rules: {}, // rules for the form.password
  },
}
```

```javascript
const form = {
  emails: [
    '123'
    '456'
  ],
}

const schema = {
  emails: {
    $rules: {}, // rules for the entire emails
    $iter: {
      $rules: {}, // rules for the emails[?] (i.e. the emails[1] in here)
    },
    0: {
      $rules: {}, // rules for the emails[0]
    },
  }
}
```

# Rules

Except for the `undefined`, Anything is returned from rule methods that will be treated as invalid.

## Example

```javascript
const form = {
  password: '',
}

const schema = {
  password: {
    $rules: {
      required({ value }) {
        if (value.length === 0) {
          return 'Something went wrong'
        }
      },
    },
  },
}
```

# Errors

```javascript
const form = {
  password: '',
}

const schema = {
  password: {
    $rules: {
      required({ value }) {
        if (value.length === 0) {
          return 'Something went wrong'
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

# Normalizer

## Example

```javascript
const form = {
  password: '   ',
}

const schema = {
  password: {
    $normalizer: ({ value }) => value.trim(),
    $rules: {
      required({ value }) {
        if (value.length === 0) {
          return 'Something went wrong'
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

## Example

To pass something to the rule methods or else to override default behavior.

```javascript
const form = {
  password: '',
}

const schema = {
  password: {
    $params: {
      languageCode: 'fr',
    },
    $rules: {
      required({ value }) {
        if (value === '') {
          return 'Something went wrong'
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
