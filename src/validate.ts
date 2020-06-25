import { getByPath } from './util'

export interface ISchema {
  $params: { [key: string]: any }
  $rules: { [key: string]: ({}: IFunctionParams) => any }
  $errors: { [key: string]: ({}: IFunctionParams) => any }
  // TODO: use recursive definition to highlight nesting types
  [key: string]: any
}
export interface IInstance {
  _rootModel: any
  _path: string
  $errors: { [key: string]: any }
  // TODO: use recursive definition to highlight nesting types
  [key: string]: any
}
export interface IFunctionParams {
  value: any
  key?: string
  parent?: any
  path?: string[]
  root: any
  params: { [key: string]: any }
}

export const validate = ({ schema, instance }: { schema: ISchema; instance: IInstance }) => {
  const path = instance._path === '' ? undefined : instance._path.split('.')
  const value = path === undefined ? instance._rootModel : getByPath(instance._rootModel, path)
  const key = path === undefined ? undefined : path[path.length - 1]
  const parent = path === undefined || path.length === 1 ? undefined : getByPath(instance._rootModel, path.slice(0, -1))
  const root = instance._rootModel
  const params = schema.$params

  for (const ruleKey of Object.keys(schema.$rules)) {
    const functionParams = { value, key, parent, path, root, params }
    if (schema.$rules[ruleKey](functionParams) !== undefined) {
      instance.$errors[ruleKey] = schema.$errors[ruleKey](functionParams)
    }
  }
}
