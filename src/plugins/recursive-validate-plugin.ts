import { Validator, VALIDATOR_KEY } from '../validator'
import { recursiveCallChildren } from './util'

const createValidate = (originalValidate: Function) =>
  function validate(this: Validator) {
    recursiveCallChildren({
      validator: this,
      callback: childWrapper => {
        originalValidate.call(childWrapper[VALIDATOR_KEY])
        return false
      },
      shouldCallSelf: true,
    })
  }

export default class RecursiveValidatePlugin {
  applied: boolean = false

  apply(validator: Validator) {
    if (this.applied) return
    this.applied = true
    validator.constructor.prototype.validate = createValidate(validator.constructor.prototype.validate)
  }
}
