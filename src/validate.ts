import { getByPath } from './util'

export interface IFunctionParams {
  value: any
  key?: string
  parent?: any
  path?: string[]
  root: any
  params: { [key: string]: any }
}

export interface IValidateParams {
  rules: { [key: string]: ({}: IFunctionParams) => any }
  errors: { [key: string]: ({}: IFunctionParams) => any }
  root: any
  path: string[]
  params: { [key: string]: any }
}

export interface IValidateResult {
  $rulesResult: { [key: string]: any }
  [key: string]: any
}

export const validate = ({ rules, errors, root, path, params }: IValidateParams): IValidateResult => {
  const value = path === undefined ? root : getByPath(root, path)
  const key = path === undefined ? undefined : path[path.length - 1]
  const parent = path.length <= 1 ? undefined : getByPath(root, path.slice(0, -1))

  const result: IValidateResult = { $rulesResult: {} }
  for (const ruleKey of Object.keys(rules)) {
    const functionParams: IFunctionParams = { value, key, parent, path, root, params }
    const validationResult = rules[ruleKey](functionParams)
    if (validationResult !== undefined) {
      result.$rulesResult[ruleKey] = validationResult
      result[ruleKey] = errors[ruleKey](functionParams)
    }
  }
  return result
}
