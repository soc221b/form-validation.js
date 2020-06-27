import { proxyStructure, publicKey, privateKey, pathKey } from './proxy'
import { validate, IValidateResult } from './validate'
import { wrapState, IStatableValidator } from './validation-state'
import { getByPath, isPromise } from './util'
import { wrapSchema, ISchemaValidator } from './schema'

export interface IValidator extends IStatableValidator {
  [publicKey]: {
    pending: boolean
    invalid: boolean
    dirty: boolean
    anyDirty: boolean
    error: boolean
    anyError: boolean

    validate: () => void
    reset: () => void
    touch: () => void
  }
}

export const proxy = ({ form, schema, validator }: any) => {
  return proxyStructure({
    object: form,
    clone: validator,
    callback: baseValidator => {
      wrapState(baseValidator)
      wrapSchema({ rootSchema: schema, validator: baseValidator as ISchemaValidator })
      wrapMethods({ form, schema, baseValidator })
    },
  })
}

const wrapMethods = ({ rootForm, rootSchema, rootValidator, wrapper }: any) => {
  const path = wrapper[privateKey][pathKey]
  const validator: IValidator = getByPath(rootValidator, path)
  const schema = getByPath(rootSchema, path)

  let previousResult: any = null

  const $validate = () => {
    validator[privateKey].resetPending()

    const result = validate({ rootForm, validator })
    for (const ruleKey of Object.keys(schema.$rules)) {
      if (isPromise(result[ruleKey])) {
        validator[privateKey].setPending(true)

        result.$rulesResult[ruleKey].finally(async () => {
          // ignore previous promise
          if (previousResult !== result.$rulesResult) return

          if ((await result.$rulesResult[ruleKey]) !== undefined) {
            validator[privateKey].setInvalid(true)
          }
          validator[privateKey].setPending(false)
        })
      } else {
        if (result.$rulesResult[ruleKey] !== undefined) {
          validator[privateKey].setInvalid(true)
        }
      }
    }

    previousResult = result.$rulesResult
  }
  const $reset = () => {
    validator[privateKey].setInvalid(false)
    validator[privateKey].setDirty(false)
    validator[privateKey].resetPending()
    previousResult = null
  }
  const $touch = () => {
    validator[privateKey].setDirty(true)
  }

  validator[publicKey].validate = $validate
  validator[publicKey].reset = $reset
  validator[publicKey].touch = $touch
}
