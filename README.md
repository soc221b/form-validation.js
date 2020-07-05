# form-validation.js

# Status: Beta

[![npm version](https://badge.fury.io/js/form-validation.js.svg)](https://badge.fury.io/js/form-validation.js)
![CI](https://github.com/iendeavor/form-validation.js/workflows/CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/iendeavor/form-validation.js/badge.svg?branch=develop)](https://coveralls.io/github/iendeavor/form-validation.js?branch=develop)

# Feature

Intuitive APIs. 🎯

Asynchronous Rules Support.

Nested object/array Support.

Zero dependencies.

# Overview

```javascript
const form = {
  account: '',
}

const schema = {
  account: {
    $params: {
      languageCode: 'en',
      minLength: 6,
    },

    $normalizer({ value, key, parent, path, root, params }) {
      return typeof value === 'string' ? value.trim() : ''
    },

    $rules: {
      weak({ value, key, parent, path, root, params }) {
        if (value.length < params.minLength) return 'Too short'
        if (/\W/.test(value)) return 'Must contain special charachar'
      },

      async alreadyBeenUsed({ value, key, parent, path, root, params }) {
        if (value === '') return

        if (await isExists(value)) return false
      },
    },

    $errors: {
      weak({ value, key, parent, path, root, params }) {
        return params.$rules.weak
      },

      alreadyBeenUsed() {
        const languageCode = params.languageCode || 'en-US'
        return translate(`This account has already been used.`, { languageCode })
      },
    },
  },
}

const valdiator = {}

// in order to track form's data sctructure (e.g., add new property to object, or push new element to array), you should always update your fields from the proxiedForm instead of the original form
const proxiedForm = FormValidation.proxy({ form, schema, validator })

// validate the entire form
valdiator.$v.validate()

console.log(valdiator.$v.invalid)
// > true
console.log(valdiator.$v.errors.weak)
// > 'Too short.'
console.log(valdiator.$v.errors.alreadyBeenUsed)
// > 'This account has already been used.'
```

## Docs

- [Schema](/docs/schema.md)
- [Instance](/docs/instance.md)
- [Common Use Case](/docs/common-use-case.md)

## TODOs

- Supports for dynamic schema structure
- Supports for array built-in operations
  - [x] push
  - [x] pop
  - [ ] shift
  - [ ] unshift
  - [ ] splice
  - [ ] sort
  - [ ] reverse
  - [ ] length

# Need help?

Please open [GitHub issues](https://github.com/iendeavor/form-validation.js/issues). Please search previous issues
before creating a new issue.
