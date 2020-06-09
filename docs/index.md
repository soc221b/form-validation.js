The most customizable validation framework for JavaScript.

# Feature

Intuitive APIs. 🎯

Asynchronous Rules Support.

Type Annotation Support. 💡

Written in TypeScript. 💪

Iterable protocol Support.

Self Sufficient.

# Getting Started

```javascript
// to be validated for
const form = {
  password: '',
}

// create form validation instance
const instance = FormValidation.createInstance({
  password: {
    $rules: {
      required({ value, key, path, target, params }) {
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

// validate the form
await instance.$validate(form)

console.log(instance.$hasError)
// > true
console.log(instance.$errors.required)
// > 'Must be filled`
```
