# Structure

## Definition

`FormValidation.createInstance(schema: Schema): Instance`

Everything is pretty intuitive and reasonable, validation schema is as same as the structure of data which you validate
for.

## Example

```javascript
const password = '123'

const instance = FormValidation.createInstance({
  // for password
  $rule: () => {},
})
```

```javascript
const passwords = [
  '123'
  '456'
]

const instance = FormValidation.createInstance(
  { // for passwords
    $rule: () => {},
    $iter: { // for passwords[?]
      $rule: () => {},
    },
    0: { // for passwords[0]
      $rule: () => {},
    }
  }
)
```

```javascript
const form = {
  password: '123',
}

const instance = FormValidation.createInstance({
  // for form
  $rule: () => {},
  $iter: {
    // for form.?
    $rule: () => {},
  },
  password: {
    // for form.password
    $rule: () => {},
  },
})
```

# Rule

## Definition

`$rule: Rule`

Except for the `undefined`, Anything is returned from rule methods that will be passed to the
[`$messages`](/iendeavor/form-validation/wiki/instance#getters) getter.

## Example

```javascript
const minlength = length => ({ value }) => {
  if (value.length < length) {
    return `Must be at least ${length} characters long.`
  }
}

const form = {
  password: '123',
}

const instance = FormValidation.createInstance({
  password: {
    $rule: [minLength(6)],
  },
})
```

# Normalizer

## Definition

`$normalizer: Normalizer`

The value will be normalized before validate.

## Example

```javascript
const minlength = length => ({ value }) => {
  if (value.length < length) {
    return `Must be at least ${length} characters long.`
  }
}

const form = {
  password: '123   ',
}

const instance = FormValidation.createInstance({
  password: {
    $rule: minLength(6), // without normalizer, the `$messages` getter returns []
    $normalizer: ({ value }) => value.trim(), // with normalizer, the `$messages` getter returns ['Must be at least 6 characters long.']
  },
})
```

# Params

## Definition

`$params: object`

## Example

You could pass something to the rule methods or others to override default behavior.

```javascript
const minlength = length => ({ value, params }) => {
  const language = params.language || currentLanguage

  if (value.length < length) {
    return translate(`Must be at least {length} characters long.`, { length, language })
  }
}

const form = {
  password: '123',
}

const instance = FormValidation.createInstance({
  password: {
    $params: {
      language: 'en-US',
    },
    $rule: minLength(6),
  },
})
```
