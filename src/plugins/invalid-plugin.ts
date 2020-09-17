import { isPromise } from '../util'
import { Validator } from '../validator'

declare module '../validator' {
  interface States {
    invalid: boolean
  }
}

const update = (validator: Validator) => {
  validator.$states.invalid = Object.values(validator.$lastRuleResults).some(
    ruleResult => isPromise(ruleResult) === false && ruleResult !== undefined,
  )
}

const inactive = (validator: Validator) => {
  validator.$states.invalid = false
}

const Tap = {
  name: 'invalid-plugin',
  before: ['any-invalid-plugin', 'error-plugin', 'any-error-plugin'],
}

export default class InvalidPlugin {
  apply(validator: Validator) {
    validator.$hooks.onCreated.tap(Tap, inactive)

    validator.$hooks.onBeforeValidate.tap(Tap, inactive)

    validator.$hooks.onValidated.tap(Tap, update)

    validator.$hooks.onReseted.tap(Tap, inactive)
  }
}
