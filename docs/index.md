The most customizable validation framework for JavaScript.

# Feature

Intuitive APIs. 🎯

Asynchronous Rules Support.

Type Annotation Support. 💡

Full-custom Message Support.

Written in TypeScript. 💪

Self Sufficient.

# Getting Started

```javascript
// create custom rule
const minlength = length => ({ value }) => {
  if (value.length < length) {
    return `Must be at least ${length} characters long.`
  }
}

// to be validated for
const form = {
  password: '123'
}

// create form validation instance
const instance = FormValidation.createInstance({
  password: {
    $rule: minlength(6)
  }
})

// validate the form
instance.$validate(form, () => {
  console.log(instance.$hasMessage)
  console.log(instance.$messages)
})

// > true
// > ['Must be at least 6 characters long.']
```

# No Built-in Rules

Even though the `required` is a very common rule method, sometimes you still need to re-write it.

For example, if you want to introduce internationalization:

```javascript
const required = ({ value, params }) => {
  const isError = value === void 0

  if (isError) {
    // you may need to translate message
    const language = params.language || currentLanguage
    return translate(`This field is required.`, { language })
  }
}

const form = {
  password: '123',
}

const instance = FormValidation.createInstance({
  password: {
    $params: {
      language: 'en-US'
    },
    $rule: required
  }
})
```
