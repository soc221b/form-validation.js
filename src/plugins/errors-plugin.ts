import { Validator } from '../validator'
import { ErrorParam } from '../../type'
import { log, time, timeEnd } from '../util'

declare module '../validator' {
  interface States {
    errors: {
      [key: string]: any
    }
  }
}

const init = (validator: Validator) => {
  validator.$states.errors = {}
}

const update = (validator: Validator) => {
  log('errors', validator)
  time('errors')
  const ruleResult = validator.$lastRuleResults

  if (ruleResult === undefined) return
  const schema = validator.getSchema(validator.$path)
  const errorParam: ErrorParam = {
    value: validator.getForm(validator.$path),
    key: validator.$path.length === 0 ? undefined : validator.$path[validator.$path.length - 1],
    parent: validator.$path.length === 0 ? undefined : validator.getForm(validator.$path.slice(0, -1)),
    path: validator.$path.slice(),
    root: validator.$rootForm,
    params: {
      ...schema.$params,
      $rules: ruleResult,
    },
  }

  for (const ruleKey of Object.keys(ruleResult)) {
    validator.$states.errors[ruleKey] = schema.$messages[ruleKey](errorParam)
  }
  timeEnd('errors')
}

const Tap = {
  name: 'errors-plugin',
}

export default class ErrorPlugin {
  apply(validator: Validator) {
    validator.$hooks.onCreated.tap(Tap, init)
    validator.$hooks.onValidated.tap(Tap, update)
  }
}
