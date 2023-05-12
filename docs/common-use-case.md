# ToC

- [Custom Error](#custom-error)
- [Same As](#same-as)
- [Unique](#unique)

# Custom Error

You can return anything from rule methods, thus you can do anything to deal with:

```javascript
const form = {
  account: '123',
}

const schema = {
  account: {
    $params: {
      min: 5,
    },
    $rules: {
      minLength({ value, params }) {
        if (value.length <= params.min) {
          return false
        }
      },
    },
    $errors: {
      minLength({ params }) {
        return [`error`, `Must be at least ${params.min} characters long.`]
      },
    },
  },
}

const validator = {}

const proxiedForm = FormValidation.proxy({ form, schema, validator })

validator.$v.validate()
const [type, message] = validator.account.$v.errors.minLength
if (type === 'error') {
  console.log(message)
  // > Must be at least 5 charcters
}
```

# Same As

```javascript
const form = {
  password: '123',
  confirmPassword: '456',
}

const schema = {
  confirmPassword: {
    $params: {
      sameAsFieldPath: ['password'],
      sameAsFieldName: 'Password',
    },
    $rules: {
      sameAs({ value, params, target }) {
        const anotherValue = params.sameAsFieldPath.reduce((anotherValue, key) => anotherValue[key], target)
        if (anotherValue !== value) {
          return 'Something went wrong'
        }
      },
    },
    $errors: {
      sameAs({ params }) {
        return `This field should be the same as the ${params.sameAsFieldName}.`
      },
    },
  },
}

const validator = {}

const proxiedForm = FormValidation.proxy({ form, schema, validator })

validator.$v.validate()
console.log(validator.confirmPassword.$v.errors.sameAs)
// > This field should be the same as the Password.
```

# Unique

```javascript
const form = {
  ipAllowList: ['8.8.8.8', '8.8.8.8'],
}

const schema = {
  ipAllowList: {
    $iter: {
      $params: {
        fieldName: 'Ip',
      },
      $rule: {
        unique({ path, target }) {
          const selfIndex = path.pop()
          const parent = path.reduce((parent, key) => parent[key], target)
          for (const index in parent) {
            if (parent[selfIndex] === parent[index] && parseInt(index, 10) > selfIndex) {
              return false
            }
          }
        },
      },
      $errors: {
        unique({ params }) {
          return `This ${params.fieldName} is duplicated`
        },
      },
    },
  },
}

const validator = {}

const proxiedForm = FormValidation.proxy({ form, schema, validator })

validator.$validate()
console.log(validator.ipAllowList[0].$v.errors.unique)
// > undefined
console.log(validator.ipAllowList[1].$v.errors.unique)
// > This Ip is duplicated
```
