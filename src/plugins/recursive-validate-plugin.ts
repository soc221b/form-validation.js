import { log, time, timeEnd } from '../util'
import { Validator, VALIDATOR_KEY } from '../validator'
import { recursiveCallChildren } from './util'

const createValidate = (originalValidate: Function) =>
  function validate(this: Validator) {
    log('validate', this.$path)
    time('validate')
    recursiveCallChildren({
      validator: this,
      callback: childWrapper => {
        log('validate callback', childWrapper)
        time('validate callback')
        originalValidate.call(childWrapper[VALIDATOR_KEY])
        timeEnd('validate callback')
        return false
      },
      shouldCallSelf: true,
    })
    timeEnd('validate')
  }

export default class RecursiveValidatePlugin {
  applied: boolean = false

  apply(validator: Validator) {
    if (this.applied) return
    this.applied = true
    validator.constructor.prototype.validate = createValidate(validator.constructor.prototype.validate)
  }
}
