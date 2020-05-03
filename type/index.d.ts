// common
export type Param = {
  value?: any
  key?: string
  path?: string[]
  target?: any
  params?: Object
}

// schema
export interface Schema {
  $rule?: Rule
  $normalizer?: Normalizer
  $params?: object
  [key: string]: any
}

// rule
type FunctionRule = ({ value, key, path, target, params }: Param) => any
type ArrayRule = FunctionRule[]
export type Rule = FunctionRule | ArrayRule

// normlizer
export type Normalizer = ({ value, key, path, target, params }: Param) => any

// params
export type Params = object

export interface FormValidationInstance {
  $validateSync: (target: any) => void
  $validate: ((target: any) => Promise<any>) | ((target: any) => void)
  $reset: () => void
  $messages: any[]
  $hasMessage: boolean
  $hasValidated: boolean
  $isPending: boolean
  $params: object
  $iter: any[] | object | null
  [key: string]: any
}
