import { getByPath, getOwnKeys, isPromise } from './util'
import { getSchema } from './schema'
import { Schema, Param } from '../type'
import Tapable from 'tapable'

export const VALIDATOR_KEY = '$v'

export interface ValidationWrapper {
  [VALIDATOR_KEY]?: Validator
  [key: string]: any
}

export interface States {
  messages: {
    [key: string]: any
  }
}

export interface Hooks {
  onCreated: any
  onBeforeValidate: any
  onDoBeforeValidate: any
  onValidated: any
  onDoValidated: any
  onValidatedEach: any
  onDoValidatedEach: any
  onBeforeReset: any
  onDoBeforeReset: any
  onReseted: any
  onDoReseted: any
}

export type Plugin =
  | Function
  | {
      apply(validator: Validator): void
    }

interface Validator {
  $rootForm: any
  $rootWrapper: ValidationWrapper
  $rootSchema: Schema
  $path: string[]
  $states: States
  $lastRuleResults: { [key: string]: any }
  $hooks: Hooks
}

class Validator {
  constructor(rootForm: any, rootWrapper: ValidationWrapper, rootSchema: Schema, path: string[], plugins?: Plugin[]) {
    this.$rootForm = rootForm
    this.$rootWrapper = rootWrapper
    this.$rootSchema = rootSchema
    this.$path = path
    this.$states = { ...this.$states, messages: {} }
    this.$lastRuleResults = {}
    this.$hooks = {
      ...this.$hooks,
      onCreated: new Tapable.SyncHook(['validator']),
      onBeforeValidate: new Tapable.SyncHook(['validator']),
      onDoBeforeValidate: new Tapable.SyncHook(['validator']),
      onValidated: new Tapable.SyncHook(['validator']),
      onDoValidated: new Tapable.SyncHook(['validator']),
      onValidatedEach: new Tapable.SyncHook(['validator', 'ruleKey']),
      onDoValidatedEach: new Tapable.SyncHook(['validator', 'ruleKey']),
      onBeforeReset: new Tapable.SyncHook(['validator']),
      onDoBeforeReset: new Tapable.SyncHook(['validator']),
      onReseted: new Tapable.SyncHook(['validator']),
      onDoReseted: new Tapable.SyncHook(['validator']),
    }

    if (plugins) {
      for (const plugin of plugins) {
        if (typeof plugin === 'function') {
          plugin(this)
        } else {
          plugin.apply(this)
        }
      }
    }
  }

  validate(this: Validator): any {
    this.$hooks.onBeforeValidate.call(this)

    const ruleResults = this.doValidate()

    for (const ruleKey of getOwnKeys(ruleResults)) {
      if (isPromise(ruleResults[ruleKey])) {
        ruleResults[ruleKey].finally(() => {
          if (this.$lastRuleResults !== ruleResults) return

          this.$hooks.onValidatedEach.call(this, ruleKey)
        })
      } else {
        this.$hooks.onValidatedEach.call(this, ruleKey)
      }
    }

    if (Object.values(ruleResults).some(isPromise)) {
      return Promise.all(Object.values(ruleResults)).then(() => {
        this.$hooks.onValidated.call(this)
      })
    } else {
      this.$hooks.onValidated.call(this)
      return
    }
  }

  doValidate(this: Validator): any {
    this.$hooks.onDoBeforeValidate.call(this)

    const schema = this.getSchema(this.$path)
    if (schema.$noSchemaSpecified === false) {
      this.$hooks.onDoValidated.call(this)
      return
    }

    const param: Param = {
      value: this.getForm(this.$path),
      key: this.$path.length === 0 ? undefined : this.$path[this.$path.length],
      parent: this.$path.length === 0 ? undefined : this.getForm(this.$path.slice(0, -1)),
      path: this.$path.slice(),
      root: this.$rootWrapper,
      params: schema.$params,
    }

    param.value = schema.$normalizer(param)

    const ruleResults: { [key: string]: any } = (this.$lastRuleResults = {})
    for (const ruleKey of getOwnKeys(schema.$rules)) {
      ruleResults[ruleKey] = schema.$rules[ruleKey](param)

      if (isPromise(ruleResults[ruleKey])) {
        ;(ruleResults[ruleKey] as Promise<any>).finally(async () => {
          if (this.$lastRuleResults !== ruleResults) return

          const ruleResult = await ruleResults[ruleKey]

          const message = schema.$messages[ruleKey]({
            ...param,
            params: {
              ...param.params,
              $rules: {
                [ruleKey]: ruleResult,
              },
            },
          })
          this.$states.messages[ruleKey] = message
          this.$hooks.onDoValidatedEach.call(this, ruleKey)
        })
      } else {
        const message = schema.$messages[ruleKey]({
          ...param,
          params: {
            ...param.params,
            $rules: {
              [ruleKey]: ruleResults[ruleKey],
            },
          },
        })
        this.$states.messages[ruleKey] = message
        this.$hooks.onDoValidatedEach.call(this, ruleKey)
      }
    }

    if (Object.values(ruleResults).some(isPromise)) {
      return Promise.all(Object.values(ruleResults))
        .then(() => this.$hooks.onDoValidated.call(this))
        .then(() => ruleResults)
    } else {
      this.$hooks.onDoValidated.call(this)
      return ruleResults
    }
  }

  reset(this: Validator): any {
    this.$hooks.onBeforeReset.call(this)

    this.doReset()

    this.$hooks.onReseted.call(this)
  }

  doReset(this: Validator): any {
    this.$hooks.onDoBeforeReset.call(this)

    this.$states.messages = {}
    this.$lastRuleResults = {}

    this.$hooks.onDoReseted.call(this)
  }

  getWrapper(path: string[]): any {
    return getByPath(this.$rootWrapper, path)
  }

  getForm(path: string[]): any {
    return getByPath(this.$rootForm, path)
  }

  getSchema(path: string[]): any {
    return getSchema({ rootSchema: this.$rootSchema, path })
  }
}

export { Validator }
