import { getByPath, getOwnKeys, isPromise, log, time, timeEnd } from './util'
import { getSchema } from './schema'
import { Schema, Param } from '../type'
import Tapable from 'tapable'

export const VALIDATOR_KEY = '$v'

export interface ValidationWrapper {
  [VALIDATOR_KEY]?: Validator
  [key: string]: any
}

export interface States {}

export interface Hooks {
  onCreated: any
  onUpdated: any
  onBeforeValidate: any
  onValidated: any
  onValidatedEach: any
  onBeforeReset: any
  onReseted: any
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
  constructor(
    rootForm: any,
    rootWrapper: ValidationWrapper,
    rootSchema: Schema,
    wrapper: Partial<ValidationWrapper>,
    plugins?: Plugin[],
  ) {
    this.$rootForm = rootForm
    this.$rootWrapper = rootWrapper
    this.$rootSchema = rootSchema
    Object.defineProperty(this, '$path', {
      configurable: true,
      enumerable: true,
      get() {
        return wrapper.__detto_path__
      },
    })
    this.$states = { ...this.$states }
    this.$lastRuleResults = {}
    this.$hooks = {
      ...this.$hooks,
      onCreated: new Tapable.SyncHook(['validator']),
      onUpdated: new Tapable.SyncHook(['validator']),
      onBeforeValidate: new Tapable.SyncHook(['validator']),
      onValidated: new Tapable.SyncHook(['validator']),
      onValidatedEach: new Tapable.SyncHook(['validator', 'ruleKey']),
      onBeforeReset: new Tapable.SyncHook(['validator']),
      onReseted: new Tapable.SyncHook(['validator']),
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
    log('getSchema', this)
    time('getSchema')
    const schema = this.getSchema(this.$path)
    if (schema.$noSchemaSpecified === false) {
      timeEnd('getSchema')
      return
    }
    timeEnd('getSchema')

    this.$hooks.onBeforeValidate.call(this)

    log('do validate', this)
    time('do validate')
    const param: Param = {
      value: this.getForm(this.$path),
      key: this.$path.length === 0 ? undefined : this.$path[this.$path.length - 1],
      parent: this.$path.length === 0 ? undefined : this.getForm(this.$path.slice(0, -1)),
      path: this.$path.slice(),
      root: this.$rootForm,
      params: schema.$params,
    }

    param.value = schema.$normalizer(param)

    const ruleResults: { [key: string]: any } = (this.$lastRuleResults = {})
    for (const ruleKey of getOwnKeys(schema.$rules)) {
      ruleResults[ruleKey] = schema.$rules[ruleKey](param)

      if (isPromise(ruleResults[ruleKey])) {
        ;(ruleResults[ruleKey] as Promise<any>).finally(async () => {
          if (this.$lastRuleResults !== ruleResults) return
          ruleResults[ruleKey] = await ruleResults[ruleKey]
          this.$hooks.onValidatedEach.call(this, ruleKey)
        })
      } else {
        this.$hooks.onValidatedEach.call(this, ruleKey)
      }
    }
    timeEnd('do validate')

    if (Object.values(ruleResults).some(isPromise)) {
      Promise.all(Object.values(ruleResults)).then(() => {
        if (this.$lastRuleResults !== ruleResults) return
        this.$hooks.onValidated.call(this)
      })
    } else {
      this.$hooks.onValidated.call(this)
    }
  }

  reset(this: Validator): any {
    this.$hooks.onBeforeReset.call(this)

    this.$lastRuleResults = {}

    this.$hooks.onReseted.call(this)
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
