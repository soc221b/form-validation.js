import { validate, IFunctionParams, IValidateParams, IValidateResult } from '../../src/validate'

const uniqueSymbol = Symbol('uniqueSymbol')

test('validate', () => {
  const functionParams: { [key: string]: any } = {
    value: uniqueSymbol,
    key: uniqueSymbol,
    parent: uniqueSymbol,
    params: uniqueSymbol,
    path: uniqueSymbol,
    root: uniqueSymbol,
  }
  const result = {}
  const error = {}
  const value = {}
  const root = value
  const validateParams: IValidateParams = {
    root,
    path: [],
    params: { param: {} },
    rules: {
      rule: ({ value, key, parent, params, path, root }: IFunctionParams) => {
        functionParams.value = value
        functionParams.key = key
        functionParams.parent = parent
        functionParams.params = params
        functionParams.path = path
        functionParams.root = root
        return result
      },
    },
    errors: { rule: () => error },
  }

  const validateResult = validate(validateParams)

  expect(functionParams.value).toBe(value)
  expect(functionParams.key).toBe(undefined)
  expect(functionParams.parent).toBe(undefined)
  expect(functionParams.path).toStrictEqual([])
  expect(functionParams.root).toBe(value)
  expect(functionParams.params).toStrictEqual(validateParams.params)

  expect(validateResult.rule).toBe(error)
  expect(validateResult.$rulesResult.rule).toBe(result)
})

test('validate (nested)', () => {
  const functionParams: { [key: string]: any } = {
    value: uniqueSymbol,
    key: uniqueSymbol,
    parent: uniqueSymbol,
    params: uniqueSymbol,
    path: uniqueSymbol,
    root: uniqueSymbol,
  }
  const result = {}
  const error = {}
  const validateParams: IValidateParams = {
    root: { nested: { value: {} } },
    path: ['nested', 'value'],
    params: { param: {} },
    rules: {
      rule: ({ value, key, parent, params, path, root }: IFunctionParams) => {
        functionParams.value = value
        functionParams.key = key
        functionParams.parent = parent
        functionParams.params = params
        functionParams.path = path
        functionParams.root = root
        return result
      },
    },
    errors: { rule: () => error },
  }

  const validateResult = validate(validateParams)

  expect(functionParams.value).toBe(validateParams.root.nested.value)
  expect(functionParams.key).toBe('value')
  expect(functionParams.parent).toBe(validateParams.root.nested)
  expect(functionParams.path).toStrictEqual(['nested', 'value'])
  expect(functionParams.root).toBe(validateParams.root)
  expect(functionParams.params).toStrictEqual(validateParams.params)

  expect(validateResult.rule).toBe(error)
  expect(validateResult.$rulesResult.rule).toBe(result)
})
