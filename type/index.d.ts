// schema
export type Schema = {
  $params?: { [key: string]: any }
  $normalizer?: Normalizer
  $rules?: { [key: string]: Rule }
  $errors?: { [key: string]: Error }

  // todo: nested values should still validate $params and else
  [key: string]: any
}

export type Param = {
  value?: any
  key?: string
  path?: Path
  target?: any
  params?: { [key: string]: any }
}

// rules
export type Rule = ({ value, key, path, target, params }: Required<Param>) => boolean | Promise<boolean>

// normlizer
export type Normalizer = ({ value, key, path, target, params }: Required<Param>) => any

// errors
export type Error = ({ value, key, path, target, params }: Required<Param>) => any

export type Instance = {
  $validate: (target: any) => Promise<any>
  $reset: () => void

  $errors: { [key: string]: any }
  $hasError: boolean
  $hasValidated: boolean
  $isPending: boolean
  $params: { [key: string]: any }
  $iter: { [key: string]: any }

  _schema: Required<Schema>

  [key: string]: any
}

export type Path = string[]
