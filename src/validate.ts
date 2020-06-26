import { getByPath } from './util'

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
  rootSchema: any
  path: string[]
}

export interface IValidateResult {
  $rulesResult: { [key: string]: any }
  [key: string]: any
}

export const validate = ({ rootForm, rootSchema, path }: IValidateParams): IValidateResult => {
  let root
  let parent
  let key
  let value
  let params
  let rules
  let errors
  if (path.length === 0) {
    root = rootForm
    parent = undefined
    key = undefined
    value = rootForm
    params = rootSchema.$params
    rules = rootSchema.$rules
    errors = rootSchema.$errors
  } else {
    root = rootForm
    parent = getByPath(rootForm, path.slice(0, -1))
    key = path[path.length - 1]
    value = parent[key]
    params = getByPath(rootSchema, path.concat('$params'))
    rules = getByPath(rootSchema, path.concat('$rules'))
    errors = getByPath(rootSchema, path.concat('$errors'))
  }

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
