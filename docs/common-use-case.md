# ToC

- [Custom Error](#custom-error)
- [Same As](#same-as)
- [Unique](#unique)

# Custom Error

You can return anything from rule methods, thus you can do anything to deal with:

```javascript
const form = {
  password: '123',
}

const schema = {
  password: {
    $params: {
      min: 5,
    },
    $rules: {
      minLength({ value, params }) {
        if (value.length <= params.min) {
          return 'Something went wrong'
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

FormValidation.proxy({ form, schema, validator })

validator.$validate()
const [type, message] = validator.password.$errors.minLength
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
      sameAsField: ['password'],
      sameAsFieldName: 'Password',
    },
    $rules: {
      sameAs({ value, params, target }) {
        const anotherValue = params.sameAsField.reduce((anotherValue, key) => anotherValue[key], target)
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

FormValidation.proxy({ form, schema, validator })

validator.$validate()
console.log(validator.confirmPassword.$errors.sameAs)
// > This field should be the same as the Password.
```

# Unique

```javascript
const form = {
  ipWhiteList: ['8.8.8.8', '8.8.8.8'],
}

const schema = {
  ipWhiteList: {
    $iter: {
      $params: {
        field: 'Ip',
      },
      $rule: {
        unique({ path, target }) {
          const selfIndex = path.pop()
          const parent = path.reduce((parent, key) => parent[key], target)
          for (const index in parent) {
            if (parent[selfIndex] === parent[index] && parseInt(index, 10) > selfIndex) {
              return 'Something went wrong'
            }
          }
        },
      },
      $errors: {
        unique({ params }) {
          return `This ${params.field} is duplicated`
        },
      },
    },
  },
}

const validator = {}

FormValidation.proxy({ form, schema, validator })

validator.$validate()
console.log(validator.ipWhiteList[0].$errors.unique)
// > undefined
console.log(validator.ipWhiteList[1].$errors.unique)
// > This Ip is duplicated
```
