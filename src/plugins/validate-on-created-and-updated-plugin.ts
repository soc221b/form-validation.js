import { Validator } from "../validator"

const validateOnCreatedAndUpdated = (validator: Validator) => {
  validator.$validate()
}

const Tap = {
  name: 'validate-on-created-plugin',
}

export default class ValidateOnCreatedPlugin {
  apply (validator: Validator) {
    validator.$hooks.onCreated.tap(Tap, validateOnCreatedAndUpdated)
    validator.$hooks.onUpdated.tap(Tap, validateOnCreatedAndUpdated)
  }
}
