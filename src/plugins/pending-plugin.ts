import { Validator } from '../validator'

declare module '../validator' {
  interface States {
    pending: boolean
  }
}

const active = (validator: Validator) => {
  validator.$states.pending = true
}

const inactive = (validator: Validator) => {
  validator.$states.pending = false
}

const Tap = {
  name: 'pending-plugin',
  before: ['any-pending-plugin'],
}

export default class PendingPlugin {
  apply(validator: Validator) {
    validator.$hooks.onCreated.tap(Tap, inactive)

    validator.$hooks.onDoBeforeValidate.tap(Tap, active)

    validator.$hooks.onDoValidated.tap(Tap, inactive)

    validator.$hooks.onDoReseted.tap(Tap, inactive)
  }
}
