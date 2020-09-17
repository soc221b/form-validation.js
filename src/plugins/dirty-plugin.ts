import { Validator } from '../validator'

declare module '../validator' {
  interface States {
    dirty: boolean
  }
}

function active(validator: Validator) {
  validator.$states.dirty = true
}

const inactive = (validator: Validator) => {
  validator.$states.dirty = false
}

const Tap = {
  name: 'dirty-plugin',
  before: ['error-plugin', 'any-dirty-plugin', 'any-error-plugin'],
}

export default class DirtyPlugin {
  apply(validator: Validator) {
    validator.$hooks.onCreated.tap(Tap, inactive)

    validator.$hooks.onTouched.tap(Tap, active)

    validator.$hooks.onReseted.tap(Tap, inactive)
  }
}
