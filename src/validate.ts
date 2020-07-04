import { getByPath, isPromise } from './util'
import { IStatableValidator } from './validation-state'
import { privateKey, pathKey } from './proxy'
import { schemaKey } from './schema'

export const rulesResultKey = '$rules'

export interface IFunctionParams {
  value: any
  key?: string
  parent: any
  path: string[]
  root: any
  params: { [key: string]: any }
}

export interface IValidateParams {
  rootForm: any
  validator: IStatableValidator
}

export interface IValidateResult {
  [rulesResultKey]: { [key: string]: any }
  [key: string]: any
}

export const validate = ({ rootForm, validator }: IValidateParams): IValidateResult => {
  const params = {
    [rulesResultKey]: {},
    ...validator[privateKey][schemaKey].$params,
  }
  const normalizer = validator[privateKey][schemaKey].$normalizer
  const rules = validator[privateKey][schemaKey].$rules
  const errors = validator[privateKey][schemaKey].$errors

  const root = rootForm
  const path = validator[privateKey][pathKey]
  const parent = path.length === 0 ? undefined : getByPath(rootForm, path.slice(0, -1))
  const key = path.length === 0 ? undefined : path[path.length - 1]
  const value = normalizer({
    value: path.length === 0 ? rootForm : getByPath(rootForm, path),
    key,
    parent,
    path,
    root,
    params,
  })

  const result: IValidateResult = { [rulesResultKey]: {} }
  for (const ruleKey of Object.keys(rules)) {
    const functionParams: IFunctionParams = { value, key, parent, path, root, params }
    const validationResult = rules[ruleKey](functionParams)
    result[rulesResultKey][ruleKey] = validationResult
    functionParams.params[rulesResultKey][ruleKey] = validationResult
    result[ruleKey] = undefined
    if (isPromise(validationResult)) {
      validationResult.finally(async () => {
        if ((await validationResult) !== undefined) {
          result[ruleKey] = errors[ruleKey](functionParams)
        }
      })
    } else if (validationResult !== undefined) {
      result[ruleKey] = errors[ruleKey](functionParams)
    }
  }
  return result
}
