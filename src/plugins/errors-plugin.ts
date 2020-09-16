import { isPromise } from '../util'
import { Validator } from '../validator'
import { ErrorParam } from '../../type'

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

const update = (validator: Validator, ruleKey: string) => {
  const ruleResult = validator.$lastRuleResults[ruleKey]
  if (isPromise(ruleResult)) {
    delete validator.$states.errors[ruleKey]
    return
  }

  if (ruleResult === undefined) return
  const schema = validator.getSchema(validator.$path)
  const errorParam: ErrorParam = {
    value: validator.getForm(validator.$path),
    key: validator.$path.length === 0 ? undefined : validator.$path[validator.$path.length],
    parent: validator.$path.length === 0 ? undefined : validator.getForm(validator.$path.slice(0, -1)),
    path: validator.$path.slice(),
    root: validator.$rootForm,
    params: schema.$params,
  }

  validator.$states.errors[ruleKey] = schema.$errors[ruleKey](errorParam)
}

const Tap = {
  name: 'errors-plugin',
}

export default class ErrorPlugin {
  apply(validator: Validator) {
    validator.$hooks.onCreated.tap(Tap, init)
    validator.$hooks.onValidatedEach.tap(Tap, update)
  }
}
