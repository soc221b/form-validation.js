import { validate, IFunctionParams, IValidateParams, IValidateResult } from '../../src/validate'

const uniqueSymbol = Symbol('uniqueSymbol')

test('validate', () => {
  const functionParams: { [key: string]: any } = {
    value: uniqueSymbol,
    key: uniqueSymbol,
    parent: uniqueSymbol,
    path: uniqueSymbol,
    root: uniqueSymbol,
    params: uniqueSymbol,
  }
  const result = {}
  const error = {}
  const value = {}
  const rootForm = value
  const rootSchema = {
    $params: { param: {} },
    $rules: {
      rule: ({ value, key, parent, path, root, params }: IFunctionParams) => {
        functionParams.value = value
        functionParams.key = key
        functionParams.parent = parent
        functionParams.path = path
        functionParams.root = root
        functionParams.params = params
        return result
      },
    },
    $errors: {
      rule: () => error,
    },
  }
  const validateParams: IValidateParams = {
    rootForm,
  }

  const validateResult = validate(validateParams)

  expect(functionParams.value).toBe(value)
  expect(functionParams.key).toBe(undefined)
  expect(functionParams.parent).toBe(undefined)
  expect(functionParams.path).toStrictEqual([])
  expect(functionParams.root).toBe(value)
  expect(functionParams.params).toStrictEqual(rootSchema.$params)

  expect(validateResult.rule).toBe(error)
  expect(validateResult.$rulesResult.rule).toBe(result)
})

test('validate (nested)', () => {
  const functionParams: { [key: string]: any } = {
    value: uniqueSymbol,
    key: uniqueSymbol,
    parent: uniqueSymbol,
    path: uniqueSymbol,
    root: uniqueSymbol,
    params: uniqueSymbol,
  }
  const result = {}
  const error = {}
  const rootForm = { nested: { value: {} } }
  const rootSchema = {
    nested: {
      value: {
        $params: { param: {} },
        $rules: {
          rule: ({ value, key, parent, path, root, params }: IFunctionParams) => {
            functionParams.value = value
            functionParams.key = key
            functionParams.parent = parent
            functionParams.path = path
            functionParams.root = root
            functionParams.params = params
            return result
          },
        },
        $errors: { rule: () => error },
      },
    },
  }
  const validateParams: IValidateParams = {
    rootForm,
    rootSchema,
    path: ['nested', 'value'],
  }

  const validateResult = validate(validateParams)

  expect(functionParams.value).toBe(rootForm.nested.value)
  expect(functionParams.key).toBe('value')
  expect(functionParams.parent).toBe(rootForm.nested)
  expect(functionParams.path).toStrictEqual(['nested', 'value'])
  expect(functionParams.root).toBe(rootForm)
  expect(functionParams.params).toStrictEqual(rootSchema.nested.value.$params)

  expect(validateResult.rule).toBe(error)
  expect(validateResult.$rulesResult.rule).toBe(result)
})
