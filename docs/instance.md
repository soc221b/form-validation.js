# Methods

- `$validate: ((target: any) => Promise<any>) | ((target: any) => void)`
- `$validateSync(target: any) => void`
- `$reset(): void`

```javascript
const minlength = length => ({ value }) => {
  if (value.length < length) {
    return `Must be at least ${length} characters long.`
  }
}

const form = {
  password: '123'
}

const instance = FormValidation.createInstance({
  password: {
    $rule: [
      minLength(6)
    ]
  }
})

instance.$validate(form, () => {
  instance.password.$reset() // reset the password
) // validate entire form
```

# Getters

- `$messages: any[]`
- `$hasMessage: boolean`
- `$hasValidated: boolean`
- `$isPending: boolean`
- `$params: object`
- `$iter: any[] | obejct`

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

instance.$validate(form, () => {
  console.log(instance.password.$messages)
  console.log(instance.password.$hasMessage)
})

// > [`Must be at least 6 characters long.`]
// > true
```
