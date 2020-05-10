# Methods

- `$validate: ((target: any) => Promise<any>)`
- `$reset(): void`

```javascript
const form = {
  password: '',
}

const instance = FormValidation.createInstance({
  password: {
    $rules: {
      required({ value }) {
        if (value.length === 0) {
          return false
        }
      },
    },
  },
})

instance.$validate(form)
// Now the instance.password has errors
instance.$reset()
// Now the instance.password has no errors
```

# Getters

- `$errors: any[]`
- `$hasError: boolean`
- `$hasValidated: boolean`
- `$isPending: boolean`
- `$params: object`
- `$iter: any[] | obejct`

```javascript
const form = {
  password: '',
}

const instance = FormValidation.createInstance({
  password: {
    $rules: {
      required({ value }) {
        if (value.length === 0) {
          return false
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

instance.$validate(form, () => {
  console.log(instance.password.$hasError)
  console.log(instance.password.$errors.required)
})

// > true
// > `Must be filled`
```
