# ToC

- [Getters](#getters)
- [Methods](#methods)

# Getters

- `validator.$isInvalid: boolean`
- `validator.$isPending: boolean`
- `validator.$isError: boolean`
- `validator.$isAnyError: boolean`
- `validator.$isDirty: boolean`
- `validator.$isAnyDirty: boolean`
- `validator.$errors: { [key: string]: any }`
- `validator.$params: { $rulesResult: { [key: string]: any }, [key: string]: any }`
- `validator.$iter: { [key: string]: Validator }`

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
      required() {
        return 'Must be filled'
      },
    },
  },
}

const validator = {}

FormValidation.proxy({ form, schema, validator })

await validator.$validate(form)

console.log(validator.password.$isError)
// > true
console.log(validator.password.$errors.required)
// > `Must be filled`
```

# Methods

- `validator.$validate()`
- `validator.$touch()`
- `validator.$reset()`

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

const validator = {}

FormValidation.proxy({ form, schema, validator })

console.log(validator.password.$isInvalid)
// > false
console.log(validator.password.$isError)
// > false

validator.$validate()
console.log(validator.password.$isInvalid)
// > true
console.log(validator.password.$isError)
// > false

validator.$touch()
console.log(validator.password.$isInvalid)
// > true
console.log(validator.password.$isError)
// > true

validator.$reset()
console.log(validator.password.$isInvalid)
// > false
console.log(validator.password.$isError)
// > false
```
