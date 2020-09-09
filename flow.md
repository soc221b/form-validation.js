# form-validations.js

# Flow

- props

  ```
  this.state = {}
  this.hooks = {}
  ```

- methods

  - init

    - validator.state = Vue.reactive({})
    - validator.hooks = Object.create(null)
    - initHooks

      ```
      this.hooks.onInit = ...
      this.hooks.onInitValidator = ...
      this.hooks.onValidate = ...
      this.hooks.onReset = ...
      ```

      this.hooks.onInitValidator({ data, validator, currentData, currentValidator, path })

  - validate

    ```
    run validate
    this.hooks.onValidate({ data, validator, currentData, currentValidator, path, ruleKey, result })
    ```

  - reset
    ```
    call onReset({ data, validator, currentData, currentValidator, path })
    ```

# Plugins

## ValidatedPlugin

- onInitValidator({ data, validator, currentData, currentValidator, path })

  ```
  validator.state.validated = false
  ```

- onValidate({ data, validator, currentData, currentValidator, path, ruleKey, result })

  ```
  validator.state.validated = true
  ```

- onReset({ data, validator, currentData, currentValidator, path })
  ```
  validator.state.validated = false
  ```

## DirtyPlugin

- prototype

  ```
  Validator.prototype.touch = function () {
    this.state.dirty = true
  }
  ```

- onInitValidator({ data, validator, currentData, currentValidator, path })

  ```
  validator.state.dirty = false
  ```

- onReset({ data, validator, currentData, currentValidator, path })
  ```
  validator.state.dirty = false
  ```

## ErrorPlugin

- onInitValidator({ data, validator, currentData, currentValidator, path })

  ```
  validator.state.error = false
  validator.state.errors = {}
  ```

- onValidate({ data, validator, currentData, currentValidator, path, ruleKey, result })

  ```
  validator.state.error = result !== undefined
  validator.state.errors[ruleKey] = result
  ```

- onReset({ data, validator, currentData, currentValidator, path })
  ```
  validator.state.error = false
  validator.state.errors = {}
  ```
