# ToC

- [Structure](#structure)
- [Rules](#rules)
- [Errors](#errors)
- [Normalizer](#normalizer)
- [Params](#params)

# Structure

Everything is pretty intuitive and reasonable, validation schema is as same as the structure of data which you wanted to
validate for.

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
      $rules: {}, // rules for the passwords[?] (i.e. the passwords[1] in here)
    },
    0: {
      $rules: {}, // rules for the passwords[0]
    },
  }
)
```

```javascript
const form = {
  account: '123',
  password: '123',
}

const instance = FormValidation.createInstance({
  $rules: {}, // rules for the form
  $iter: {
    $rules: {}, // rules for the form.? (i.e. the form.account in here)
  },
  password: {
    $rules: {}, // rules for the form.password
  },
})
```

Since the `Map` is implemented with
[iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols), it can
also be iterated.

> Note: **FormValidation** also use Constructor.prototype.keys (like `new Map()` here) or Object.keys(instance) (like
> `{}` in the previous example) to achieve iteration.

```javascript
const form = new Map([
  ['account', '123'],
  ['password', '123'],
])

const instance = FormValidation.createInstance({
  $rules: {}, // rules for the form
  $iter: {
    $rules: {}, // rules for the form.? (i.e. the form.get('account') in here)
  },
  password: {
    $rules: {}, // rules for the form.get('password')
  },
})
```

# Rules

Except for the `undefined`, Anything is returned from rule methods that will be treated as invalid.

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
          return 'Something went wrong'
        }
      },
    },
  },
})

await instance.$validate(form)

console.log(instance.$hasError)
// > true
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
})

await instance.$validate(form)

console.log(instance.$errors.required)
// > Must be filled.
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
})

await instance.$validate(form)

console.log(instance.$errors.required)
// > Must be filled.
```

# Params

## Example

To pass something to the rule methods or else to override default behavior.

```javascript
const form = {
  password: '',
}

const instance = FormValidation.createInstance({
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
})

await instance.$validate(form)

console.log(instance.$errors.required)
// > Doit être rempli.
```
