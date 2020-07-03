# ToC

# Validator

Getters

- `validator.$v.invalid: boolean`
- `validator.$v.pending: boolean`
- `validator.$v.error: boolean`
- `validator.$v.anyError: boolean`
- `validator.$v.dirty: boolean`
- `validator.$v.anyDirty: boolean`
- `validator.$v.errors: { [key: string]: any }`
- `validator.$v.params: { $rules: { [key: string]: any }, [key: string]: any }`

Methods:

- `validator.$v.validate()`
- `validator.$v.touch()`
- `validator.$v.reset()`

```javascript
const form = {
  account: '',
}

const schema = {
  account: {
    $rules: {
      async alreadyBeenUsed({ value }) {
        if (await isExists(value)) {
          return false
        }
      },
    },
    $errors: {
      alreadyBeenUsed() {
        return 'This account has already been used.'
      },
    },
  },
}

const validator = {}

const proxiedForm = FormValidation.proxy({ form, schema, validator })
/*
validator.account.$v === {
  invalid: false,
  pending: false,
  error: false,
  anyError: false,
  dirty: false,
  anyDirty: false,
  errors: {
  },
  params: {
    $rules: {
    }
  }
}
*/

const mayBePromise = validator.$v.validate()
/*
validator.account.$v === {
  invalid: false,
  * pending: true,
  error: false,
  anyError: false,
  dirty: false,
  anyDirty: false,
  errors: {
  },
  params: {
    $rules: {
    }
  }
}
*/

await mayBePromise
/*
validator.account.$v === {
  * invalid: true,
  * pending: false,
  error: false,
  anyError: false,
  dirty: false,
  anyDirty: false,
  * errors: {
  *   alreadyBeenUsed: 'This account has already been used.'
  * },
  params: {
    $rules: {
      alreadyBeenUsed: false
    }
  }
}
*/

validator.$v.touch()
/*
validator.account.$v === {
  invalid: true,
  pending: false,
  * error: true,
  * anyError: true,
  * dirty: true,
  * anyDirty: true,
  errors: {
    alreadyBeenUsed: 'This account has already been used.'
  },
  params: {
    $rules: {
      alreadyBeenUsed: false
    }
  }
}
*/

validator.$v.reset()
/*
validator.account.$v === {
  * invalid: false,
  pending: false,
  * error: false,
  * anyError: false,
  * dirty: false,
  * anyDirty: false,
  * errors: {
  *
  * },
  params: {
    $rules: {
  *
    }
  }
}
*/
```
