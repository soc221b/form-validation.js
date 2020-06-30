import { proxyStructure, publicKey, privateKey, pathKey } from './proxy'
import { validate, IValidateResult, rulesResultKey } from './validate'
import { wrapState, IStatableValidator } from './validation-state'
import { getByPath, isPromise } from './util'
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

export const proxy = ({ form, schema, validator }: any) => {
  return proxyStructure({
    object: form,
    clone: validator,
    callback: baseValidator => {
      wrapState(baseValidator)
      wrapSchema({ rootSchema: schema, validator: baseValidator as ISchemaValidator })
      wrapMethods(form, baseValidator)
    },
  })
}

const wrapMethods = (rootForm: any, validator: any) => {
  const schema = validator[privateKey][schemaKey]

  let previousResult: any = null

  const $validate = () => {
    validator[privateKey].resetPending()
    validator[publicKey].errors = {}

    const result = validate({ rootForm, validator })
    for (const ruleKey of Object.keys(schema.$rules)) {
      if (isPromise(result[rulesResultKey][ruleKey])) {
        validator[privateKey].setPending(true)

        result[rulesResultKey][ruleKey].finally(async () => {
          // ignore previous promise
          if (previousResult !== result[rulesResultKey]) return

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
    previousResult = result[rulesResultKey]

    for (const key of Object.keys(validator).filter(key => key !== publicKey && key !== privateKey)) {
      validator[key][publicKey].validate()
    }
  }
  const $reset = () => {
    validator[privateKey].setInvalid(false)
    validator[privateKey].setDirty(false)
    validator[privateKey].setInvalid(false)
    validator[privateKey].resetPending()
    validator[publicKey].errors = {}
    previousResult = null

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
