import { Validator } from '../validator'

declare module '../validator' {
  interface States {
    error: boolean
  }
}

const update = (validator: Validator) => {
  validator.$states.error =
    validator.$states.dirty === true && Object.values(validator.$states.messages).some(message => message !== undefined)
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

    validator.$hooks.onDoTouched.tap(Tap, update)

    validator.$hooks.onDoValidatedEach.tap(Tap, update)

    validator.$hooks.onDoReseted.tap(Tap, inactive)
  }
}
