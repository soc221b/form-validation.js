# ToC

- [Methods](#methods)
- [Getters](#getters)

# Methods

- `instance.$validate: (target: any) => Promise<void>`
- `instance.$reset(): void`

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
console.log(instance.password.$hasError)
// > true

instance.$reset()
console.log(instance.password.$hasError)
// > false
```

# Getters

- `instance.$errors: { [key: string]: any }`
- `instance.$hasError: boolean`
- `instance.$hasValidated: boolean`
- `instance.$isPending: boolean`
- `instance.$params: { [key: string]: any }`
- `instance.$iter: { [key: string]: Instance }`

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
      required() {
        return 'Must be filled'
      },
    },
  },
})

await instance.$validate(form)

console.log(instance.password.$hasError)
// > true
console.log(instance.password.$errors.required)
// > `Must be filled`
```
