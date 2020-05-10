# Custom Message

You can return anything from rule methods, which also means you have full control of the `$messages`.

For example, you can return the following values to determine the `$messages` is error or not:

```javascript
const form = {
  password: '123',
}

const instance = FormValidation.createInstance({
  password: {
    $rules: {
      minLength({ value }) {
        if (value.length <= 5) {
          return false
        }
      },
    },
    $messages: {
      minLength() {
        return [`error`, `Must be at least 6 characters long.`]
      },
    },
  },
})

instance.$validate(form, () => {
  console.log(instance.password.$messages.minLength)
})

// > [`error`, `Must be at least 6 characters long.`]
```

# Same As

```javascript
const form = {
  password: '123',
  confirmPassword: '456',
}

const instance = FormValidation.createInstance({
  confirmPassword: {
    $params: {
      sameAsField: ['password'],
    },
    $rules: {
      sameAs({ value, params, target }) {
        const anotherValue = params.sameAsField.reduce((anotherValue, key) => anotherValue[key], target)
        if (anotherValue !== value) {
          return false
        }
      },
    },
    $errors: {
      sameAs({ params }) {
        return `This field should be the same as ${params.sameAsField.join('.')}.`
      },
    },
  },
})
```

# Unique

```javascript
const form = {
  ipWhiteList: ['8.8.8.8', '8.8.8.8'],
}

// O(n^2)
const instance = FormValidation.createInstance({
  ipWhiteList: {
    $iter: {
      $rule: {
        unique({ path, target }) {
          const selfIndex = path.pop()
          const parent = path.reduce((parent, key) => parent[key], target)
          for (const index in parent) {
            if (parent[selfIndex] === parent[index] && index != selfIndex) {
              return false
            }
          }
        },
      },
    },
  },
})

// O(n)
const instance = FormValidation.createInstance({
  ipWhiteList: {
    $rule: {
      unique({ value: ips }) {
        const values = new Set()
        for (const ip of ips) {
          if (values.has(ip)) {
            return false
          }
          values.set(ip)
        }
      },
    },
  },
})
```
