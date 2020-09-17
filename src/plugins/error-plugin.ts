import { isPromise } from '../util'
import { Validator } from '../validator'

declare module '../validator' {
  interface States {
    error: boolean
  }
}

const update = (validator: Validator) => {
  validator.$states.error =
    validator.$states.dirty === true &&
    Object.values(validator.$lastRuleResults).some(
      ruleResult => isPromise(ruleResult) === false && ruleResult !== undefined,
    )
}

const inactive = (validator: Validator) => {
  validator.$states.error = false
}

const Tap = {
  name: 'error-plugin',
  before: ['any-error-plugin'],
}

export default class ErrorPlugin {
  apply(validator: Validator) {
    validator.$hooks.onCreated.tap(Tap, inactive)

    validator.$hooks.onTouched.tap(Tap, update)

    validator.$hooks.onValidatedEach.tap(Tap, update)

    validator.$hooks.onReseted.tap(Tap, inactive)
  }
}
