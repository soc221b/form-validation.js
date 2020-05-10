# Structure

Everything is pretty intuitive and reasonable, validation schema is as same as the structure of data which you validate
for.

## Example

```javascript
const password = '123'

const instance = FormValidation.createInstance({
  $rules: {}, // rules for the password
})
```

```javascript
const passwords = [
  '123'
  '456'
]

const instance = FormValidation.createInstance(
  {
    $rules: {}, // rules for the passwords
    $iter: {
      $rules: {}, // rules for the passwords[?] (i.e. the passwords[0] and passwords[1] in here)
    },
    0: {
      $rules: {}, // rules for the passwords[0]
    },
  }
)
```

```javascript
const form = {
  password: '123',
}

const instance = FormValidation.createInstance({
  $rules: {}, // rules for the form
  $iter: {
    $rules: {}, // rules for the form.? (i.e. the form.password in here)
  },
  password: {
    $rules: {}, // rules for the form.password
  },
})
```

# Rules

Except for the `undefined`, Anything is returned from rule methods that will be treated as invalid, and return values
will be passed to the [`$errors`](/iendeavor/form-validation/wiki/schema#errors).

## Example

```javascript
const form = {
  password: '',
}

const instance = FormValidation.createInstance({
  password: {
    $rules: {
      required({ value }) {
        if (value.length === 0) {
          return false
        }
      },
    },
  },
})
```

# Errors

```typescript
type $errors = {
  [key: string]: Error
}
```

```javascript
const form = {
  password: '',
}

const instance = FormValidation.createInstance({
  password: {
    $rules: {
      required({ value }) {
        if (value.length === 0) {
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
})
```

# Normalizer

## Example

```javascript
const form = {
  password: '   ',
}

const instance = FormValidation.createInstance({
  password: {
    $normalizer: ({ value }) => value.trim(),
    $rules: {
      required({ value }) {
        if (value.length === 0) {
          return false
        }
      },
    },
  },
})
```

# Params

## Example

To pass something to the rule methods or else to override default behavior.

```javascript
const form = {
  password: '123',
}

const instance = FormValidation.createInstance({
  password: {
    $params: {
      languageCode: 'nl',
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
})
```
