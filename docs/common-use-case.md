# Custom Message

You can return anything from rule methods, which also means you have full control of the `$messages`.

For example, you can return the following values to determine the `$messages` is error or not:

```javascript
const minlength = length => ({ value }) => {
  if (value.length < length) {
    return [`error`, `Must be at least ${length} characters long.`]
  }
}
const tooWeak = ({ value }) => {
  if (value.length < 20) {
    return [`warning`, `Should use more characters.`]
  }
}

const form = {
  password: '123',
}

const instance = FormValidation.createInstance({
  password: {
    $rule: [minLength(6), tooWeak],
  },
})

instance.$validate(form, () => {
  console.log(instance.password.$messages)
})

// > [[`error`, `Must be at least 6 characters long.`],  [`warning`, `Should use more characters.`]]
```

# Same As

```javascript
const sameAs = anotherPath => ({ value, target, params }) => {
  const anotherValue = anotherPath.reduce((value, key) => value[key], target)
  if (anotherValue !== value) {
    return `This field should be the same as ${params.sameAsField}.`
  }
}

const form = {
  password: '123',
  confirmPassword: '456',
}

const instance = FormValidation.createInstance({
  confirmPassword: {
    $params: {
      sameAsField: 'Password',
    },
    $rule: sameAs(['password']),
  },
})
```
