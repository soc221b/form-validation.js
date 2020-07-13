# form-validation.js

# Status: Beta

[![npm version](https://badge.fury.io/js/form-validation.js.svg)](https://badge.fury.io/js/form-validation.js)
[![CI](https://github.com/iendeavor/form-validation.js/workflows/CI/badge.svg)](https://github.com/iendeavor/form-validation.js/actions)
[![Coverage Status](https://coveralls.io/repos/github/iendeavor/form-validation.js/badge.svg?branch=develop)](https://coveralls.io/github/iendeavor/form-validation.js?branch=develop)
[![size](https://img.shields.io/bundlephobia/min/form-validation.js?label=gzip)](https://bundlephobia.com/result?p=form-validation.js)

# Live Examples

[vue@2 + element-ui](https://codesandbox.io/s/form-validationjs-x-element-ui-2boj7)

[back to top](#)

# Feature

Intuitive APIs. 🎯

Asynchronous Rules Support.

Nested Object/Aray Support.

Array Manipulations (push, pop, shift, unshift, splice, reverse) Support.

Zero Dependencies, Native Javascript only.

[back to top](#)

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

      alreadyBeenUsed({ value, key, parent, path, root, params }) {
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
await valdiator.$v.validate()

console.log(valdiator.$v.invalid)
// > true
console.log(valdiator.$v.errors.weak)
// > 'Too short.'
```

[back to top](#)

# Documentation

- [Schema](/docs/schema.md)

  - [Rules](/docs/schema.md#rules)
  - [Errors](/docs/schema.md#errors)
  - [Normalizer](/docs/schema.md#normalizer)
  - [Params](/docs/schema.md#params)
  - [Deep Structure](/docs/schema.md#deep-structure)

- [Validator](/docs/validator.md)

- [Common Use Case](/docs/common-use-case.md)
  - [Custom Error](/docs/common-use-case.md#custom-error)
  - [Same As](/docs/common-use-case.md#same-as)
  - [Unique](/docs/common-use-case.md#unique)

[back to top](#)

# Contributing

Please read [CONTRIBUTING.md](/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull
requests to us.

[back to top](#)

# Versioning

We use [SemVer](https://semver.org/) for versioning. For the versions available, see the tags on this repository.

[back to top](#)

# License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details

[back to top](#)
