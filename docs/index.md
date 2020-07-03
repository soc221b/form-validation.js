The most customizable validation framework for JavaScript.

# Feature

Intuitive APIs. 🎯

Asynchronous Rules Support.

Type Annotation Support. 💡

Written in TypeScript. 💪

Nested object/array Support.

Zero dependencies.

# Overview

```javascript
const form = {
  account: '',
}

const schema = {
  account: {
    $normalizer({ value, key, parent, path, root, params }) {
      return value.trim()
    },
    $params: {
      minLength: 6,
    },
    $rules: {
      minLength({ value, key, parent, path, root, params }) {
        if (value.length < params.minLength) {
          return false
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

const valdiator = {}

const proxiedForm = FormValidation.proxy({ form, schema, validator })

// in order to track form's data sctructure,
// you should always update your fields from the proxiedForm instead of the original form
proxiedForm.account = 'something...'

// validate the entire form
valdiator.$v.validate(form)

console.log(valdiator.$v.invalid)
// > true
console.log(valdiator.$v.errors.minLength)
// > 'Must be at least 6 charachars.'
```
