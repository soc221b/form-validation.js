import { proxyStructure, publicKey, privateKey } from './proxy'
import { validate, rulesResultKey } from './validate'
import { wrapState, IStatableValidator } from './validation-state'
import { isPromise } from './util'
import { wrapSchema, ISchemaValidator, schemaKey } from './schema'

export interface IValidator extends IStatableValidator {
  [publicKey]: {
    pending: boolean
    invalid: boolean
    dirty: boolean
    anyDirty: boolean
    error: boolean
    anyError: boolean
    errors: {
      [key: string]: any
    }

    validate: () => void
    reset: () => void
    touch: () => void
  }
}

export const proxy = ({ form, schema, validator, hooks }: any) => {
  return proxyStructure({
    object: form,
    clone: validator,
    callback: baseValidator => {
      wrapState(baseValidator)
      wrapSchema({ rootSchema: schema, validator: baseValidator as ISchemaValidator })
      wrapMethods(form, baseValidator)
      if (baseValidator[privateKey].validated) {
        baseValidator[publicKey].validate()
      }

      hooks && hooks.onChanged && hooks.onChanged(baseValidator)
    },
  })
}

const wrapMethods = (rootForm: any, validator: any) => {
  const schema = validator[privateKey][schemaKey]

  const $validate = () => {
    validator[privateKey].setValidated(true)
    validator[privateKey].setInvalid(false)
    validator[privateKey].resetPending()
    validator[publicKey].errors = {}
    validator[privateKey].previousResult = {}

    const result = validate({ rootForm, validator })
    validator[privateKey].previousResult = result[rulesResultKey]
    result[rulesResultKey] = validator[privateKey].previousResult
    for (const ruleKey of Object.keys(schema.$rules)) {
      if (isPromise(result[rulesResultKey][ruleKey])) {
        validator[privateKey].setPending(true)

        result[rulesResultKey][ruleKey].finally(async () => {
          // ignore previous promise
          if (validator[privateKey].previousResult !== result[rulesResultKey]) return

          const ruleResult = await result[rulesResultKey][ruleKey]
          if (ruleResult !== undefined) {
            validator[privateKey].setInvalid(true)
            validator[publicKey].errors[ruleKey] = await result[ruleKey]
          }
          validator[privateKey].setPending(false)
        })
      } else {
        if (result[rulesResultKey][ruleKey] !== undefined) {
          validator[privateKey].setInvalid(true)
          validator[publicKey].errors[ruleKey] = result[ruleKey]
        }
      }
    }

    let nestedResult: any = {}
    for (const key of Object.keys(validator).filter(key => key !== publicKey && key !== privateKey)) {
      nestedResult[key] = validator[key][publicKey].validate()
    }

    return Promise.all(Object.values(result[rulesResultKey]))
      .then(() => Promise.all(Object.values(nestedResult)))
      .then(() => undefined)
  }
  const $reset = () => {
    validator[privateKey].setValidated(false)
    validator[privateKey].setInvalid(false)
    validator[privateKey].setDirty(false)
    validator[privateKey].resetPending()
    validator[privateKey].previousResult = {}
    validator[publicKey].errors = {}

    for (const key of Object.keys(validator).filter(key => key !== publicKey && key !== privateKey)) {
      validator[key][publicKey].reset()
    }
  }
  const $touch = () => {
    validator[privateKey].setDirty(true)

    for (const key of Object.keys(validator).filter(key => key !== publicKey && key !== privateKey)) {
      validator[key][publicKey].touch()
    }
  }

  validator[publicKey].validate = $validate
  validator[publicKey].reset = $reset
  validator[publicKey].touch = $touch
}
