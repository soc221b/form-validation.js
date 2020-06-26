The most customizable validation framework for JavaScript.

# Feature

Intuitive APIs. 🎯

Asynchronous Rules Support.

Type Annotation Support. 💡

Written in TypeScript. 💪

Iterable protocol Support.

Self Sufficient.

# Overview

```javascript
// the form to be validated for
const form = {
  password: '  ',
}

// the rules for validate
const schema = {
  password: {
    $normalizer({ value, key, parent, path, root, params }) {
      return value.trim()
    },
    $params: {
      minLength: 6,
    },
    $rules: {
      minLength({ value, key, parent, path, root, params }) {
        if (value.length < params.minLength) {
          return 'Invalid'
        }
      },
    },
    $errors: {
      minLength({ value, key, parent, path, root, params }) {
        return `Must be at least ${params.minLength} charachars.`
      },
    },
  },
}

// the validation instance
const valdiator = {}

FormValidation.proxy({ form, schema, validator })

// validate the entire form
await valdiator.$validate(form)

console.log(valdiator.$isError)
// > true
console.log(valdiator.$errors.minLength)
// > 'Must be at least 6 charachars.'
```
