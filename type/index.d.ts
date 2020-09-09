export interface Schema {
  $noSchemaSpecified: boolean
  $params: { [key: string]: any }
  $normalizer: Normalizer
  $rules: { [key: string]: Rule }
  $messages: { [key: string]: Error }

  [key: string]: Schema | any
}

export interface Param {
  value: any
  key: string | undefined
  path: string[]
  parent: any
  root: any
  params: { [key: string]: any }
}

export type Normalizer = ({ value, key, parent, path, root, params }: Param) => any

export type Rule = ({ value, key, parent, path, root, params }: Param) => any | Promise<any>

export interface ErrorParam extends Param {
  params: {
    [key: string]: any
    $rules: {
      [key: string]: any
    }
  }
}
export type Error = ({ value, key, parent, path, root, params }: ErrorParam) => any
