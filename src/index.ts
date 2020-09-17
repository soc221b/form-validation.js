import { proxy as dettoProxy } from 'detto'
import { ValidationWrapper, Validator as OriginalValidator, VALIDATOR_KEY, Plugin } from './validator'
import { Schema } from '../type'
import { normalizeSchema } from './schema'
import { isArray, log, time, timeEnd } from './util'

export function proxy<T>({
  form,
  schema,
  plugins,
}: {
  form: T
  schema: Partial<Schema>
  plugins?: Plugin[]
}): { proxiedForm: T; validationWrapper: any } {
  // isolate prototype chain
  class Validator extends OriginalValidator {}

  const rootForm = form
  const rootSchema = normalizeSchema(schema)
  const rootWrapper: any = isArray(rootForm) ? [] : {}

  return {
    proxiedForm: dettoProxy({
      object: form,
      detto: rootWrapper as T,
      callback: (wrapper: ValidationWrapper) => {
        log('wrapper callback')
        time('wrapper callback')
        if (wrapper[VALIDATOR_KEY] === undefined) {
          wrapper[VALIDATOR_KEY] = new Validator(rootForm, rootWrapper, rootSchema, wrapper, plugins)
          wrapper[VALIDATOR_KEY]!.$hooks.onCreated.call(wrapper[VALIDATOR_KEY])
        } else {
          wrapper[VALIDATOR_KEY]!.$hooks.onUpdated.call(wrapper[VALIDATOR_KEY])
        }
        timeEnd('wrapper callback')
      },
    }),
    validationWrapper: rootWrapper,
  }
}

export { Validator, Plugin } from './validator'
export { default as AnyDirtyPlugin } from './plugins/any-dirty-plugin'
export { default as AnyErrorPlugin } from './plugins/any-error-plugin'
export { default as AnyInvalidPlugin } from './plugins/any-invalid-plugin'
export { default as AnyPendingPlugin } from './plugins/any-pending-plugin'
export { default as CachePlugin } from './plugins/cache-plugin'
export { default as DirtyPlugin } from './plugins/dirty-plugin'
export { default as ErrorPlugin } from './plugins/error-plugin'
export { default as ErrorsPlugin } from './plugins/errors-plugin'
export { default as InvalidPlugin } from './plugins/invalid-plugin'
export { default as PendingPlugin } from './plugins/pending-plugin'
export { default as IterPlugin } from './plugins/iter-plugin'
export { default as ReValidatePlugin } from './plugins/re-validate-plugin'
export { default as RecursiveResetPlugin } from './plugins/recursive-reset-plugin'
export { default as RecursiveTouchPlugin } from './plugins/recursive-touch-plugin'
export { default as RecursiveValidatePlugin } from './plugins/recursive-validate-plugin'
export { default as TouchPlugin } from './plugins/touch-plugin'
export { default as ValidatedPlugin } from './plugins/validated-plugin'
export { default as AliasPlugin } from './plugins/alias-plugin'
export { recursiveCallChildren, recursiveCallParent } from './plugins/util'
