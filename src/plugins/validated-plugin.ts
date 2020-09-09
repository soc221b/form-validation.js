import { Validator } from '../validator'

declare module '../validator' {
  interface States {
    validated: boolean
  }
}

const active = (validator: Validator) => {
  validator.$states.validated = true
}

const inactive = (validator: Validator) => {
  validator.$states.validated = false
}

export default class ValidatedPlugin {
  apply(validator: Validator) {
    validator.$hooks.onCreated.tap('validated-plugin', inactive)

    validator.$hooks.onDoBeforeValidate.tap('validated-plugin', active)

    validator.$hooks.onDoReseted.tap('validated-plugin', inactive)
  }
}
