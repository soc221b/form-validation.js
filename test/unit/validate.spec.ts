import { validate, IFunctionParams, IInstance, ISchema } from '../../src/validate'

const uniqueSymbol = Symbol('uniqueSymbol')

test('validate', () => {
  const params: { [key: string]: any } = {
    value: uniqueSymbol,
    key: uniqueSymbol,
    parent: uniqueSymbol,
    params: uniqueSymbol,
    path: uniqueSymbol,
    root: uniqueSymbol,
  }
  const rule = ({
    value: _value,
    key: _key,
    parent: _parent,
    params: _params,
    path: _path,
    root: _root,
  }: IFunctionParams) => {
    params.value = _value
    params.key = _key
    params.parent = _parent
    params.params = _params
    params.path = _path
    params.root = _root
  }
  const root = {}
  const param = {}
  const schema: ISchema = {
    $params: {
      param,
    },
    $rules: {
      required: rule,
    },
    $errors: {
      required: () => {},
    },
  }
  const instance: IInstance = {
    _rootModel: root,
    _path: '',
    $errors: {
      required: undefined,
    },
  }

  validate({ schema, instance })
  expect(params.value).toBe(root)
  expect(params.key).toBe(undefined)
  expect(params.parent).toBe(undefined)
  expect(params.path).toBe(undefined)
  expect(params.root).toBe(root)
  expect((params.params as any).param).toStrictEqual(param)
})

test('validate (nested)', () => {
  const params: { [key: string]: any } = {
    value: uniqueSymbol,
    key: uniqueSymbol,
    parent: uniqueSymbol,
    params: uniqueSymbol,
    path: uniqueSymbol,
    root: uniqueSymbol,
  }
  const rule = ({
    value: _value,
    key: _key,
    parent: _parent,
    params: _params,
    path: _path,
    root: _root,
  }: IFunctionParams) => {
    params.value = _value
    params.key = _key
    params.parent = _parent
    params.params = _params
    params.path = _path
    params.root = _root
  }
  const value = {}
  const key = 'key'
  const parent = { key: value }
  const path = 'nested.key'
  const root = { nested: parent }
  const param = {}
  const schema: ISchema = {
    $params: {},
    $rules: {},
    $errors: {},
    nested: {
      $params: {},
      $rules: {},
      $errors: {},
      key: {
        $params: {
          param,
        },
        $rules: {
          required: rule,
        },
        $errors: {
          required: () => {},
        },
      },
    },
  }
  const instance: IInstance = {
    _rootModel: root,
    _path: '',
    $errors: {},
    nested: {
      _rootModel: root,
      _path: 'nested',
      $errors: {},
      key: {
        _rootModel: root,
        _path: 'nested.key',
        $errors: {
          required: undefined,
        },
      },
    },
  }

  validate({ schema: schema.nested.key, instance: instance.nested.key })
  expect(params.value).toBe(value)
  expect(params.key).toBe(key)
  expect(params.parent).toBe(parent)
  expect((params.path as string[]).join('.')).toBe(path)
  expect(params.root).toBe(root)
  expect((params.params as any).param).toBe(param)
})
