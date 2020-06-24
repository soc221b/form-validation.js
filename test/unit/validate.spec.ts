import { validate, IRuleParams, IInstance, ISchema } from '../../src/validate'

test('validate', () => {
  const params: Partial<IRuleParams> = {
    value: undefined,
    key: undefined,
    parent: undefined,
    params: undefined,
    path: undefined,
    root: undefined,
  }
  const rule = ({
    value: _value,
    key: _key,
    parent: _parent,
    params: _params,
    path: _path,
    root: _root,
  }: IRuleParams) => {
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
    $errors: {},
  }
  const instance: IInstance = {
    $rootModel: root,
    $parentModel: undefined,
    $model: root,
    $path: '',
    $errors: {
      required: undefined,
    },
  }

  validate({ schema, instance })
  expect(params.value).toBe(root)
  expect(params.key).toBe('')
  expect(params.parent).toBe(undefined)
  expect(params.path).toBe('')
  expect(params.root).toBe(root)
  expect((params.params as any).param).toBe(param)
})

test('validate (nested)', () => {
  const params: Partial<IRuleParams> = {
    value: undefined,
    key: undefined,
    parent: undefined,
    params: undefined,
    path: undefined,
    root: undefined,
  }
  const rule = ({
    value: _value,
    key: _key,
    parent: _parent,
    params: _params,
    path: _path,
    root: _root,
  }: IRuleParams) => {
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
        $errors: {},
      },
    },
  }
  const instance: IInstance = {
    $rootModel: root,
    $parentModel: undefined,
    $model: root,
    $path: '',
    $errors: {},
    nested: {
      $rootModel: root,
      $parentModel: root,
      $model: parent,
      $path: 'nested',
      $errors: {},
      key: {
        $rootModel: root,
        $parentModel: parent,
        $model: value,
        $path: 'nested.key',
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
  expect(params.path).toBe(path)
  expect(params.root).toBe(root)
  expect((params.params as any).param).toBe(param)
})
