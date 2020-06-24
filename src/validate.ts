export interface ISchema {
  $params: { [key: string]: any }
  $rules: { [key: string]: ({}: IRuleParams) => any }
  $errors: { [key: string]: any }
  // TODO: use recursive definition to highlight nesting types
  [key: string]: any
}
export interface IInstance {
  $rootModel: any
  $parentModel: any
  $model: any
  $path: string
  $errors: { [key: string]: any }
  // TODO: use recursive definition to highlight nesting types
  [key: string]: any
}
export interface IRuleParams {
  value: any
  key: string
  parent: any
  path: string
  root: any
  params: { [key: string]: any }
}

export const validate = ({ schema, instance }: { schema: ISchema; instance: IInstance }) => {
  const value = instance.$model
  const splitedPath = instance.$path.split('.')
  const key = splitedPath.length === 0 ? '' : splitedPath[splitedPath.length - 1]
  const parent = instance.$parentModel
  const path = instance.$path
  const root = instance.$rootModel
  const params = schema.$params

  for (const ruleKey of Object.keys(schema.$rules)) {
    if (schema.$rules[ruleKey]({ value, key, parent, path, root, params }) !== undefined) {
      instance.$errors[ruleKey] = schema.$errors[ruleKey]
    }
  }
}
