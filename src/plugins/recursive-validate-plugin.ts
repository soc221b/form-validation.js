import { Validator, VALIDATOR_KEY } from '../validator'
import { recursiveCallChildren } from './util'

const createValidate = (originalValidate: Function) =>
  function doValidate(this: Validator) {
    const promises: any[] = []
    recursiveCallChildren({
      validator: this,
      callback: childWrapper => {
        promises.push(originalValidate.call(childWrapper[VALIDATOR_KEY]))
        return false
      },
      shouldCallSelf: true,
    })
    return Promise.all(promises)
  }

export default class RecursiveValidatePlugin {
  applied: boolean = false

  apply(validator: Validator) {
    if (this.applied) return
    this.applied = true
    validator.constructor.prototype.doValidate = createValidate(validator.constructor.prototype.doValidate)
  }
}
