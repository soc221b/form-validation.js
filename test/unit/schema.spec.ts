import { getSchema } from '../../src/schema'

const abcd = () => {}
const abci = () => {}
const abid = () => {}
const abii = () => {}
const aicd = () => {}
const aici = () => {}
const aiid = () => {}
const aiii = () => {}
const ibcd = () => {}
const ibci = () => {}
const ibid = () => {}
const ibii = () => {}
const iicd = () => {}
const iici = () => {}
const iiid = () => {}
const iiii = () => {}

const rootSchema: any = {
  $iter: {
    $iter: {
      $iter: {
        $iter: {
          $rules: { rule: iiii },
        },
        d: {
          $rules: { rule: iiid },
        },
      },
      c: {
        $iter: {
          $rules: { rule: iici },
        },
        d: {
          $rules: { rule: iicd },
        },
      },
    },
    b: {
      $iter: {
        $iter: {
          $rules: { rule: ibii },
        },
        d: {
          $rules: { rule: ibid },
        },
      },
      c: {
        $iter: {
          $rules: { rule: ibci },
        },
        d: {
          $rules: { rule: ibcd },
        },
      },
    },
  },
  a: {
    $iter: {
      $iter: {
        $iter: {
          $rules: { rule: aiii },
        },
        d: {
          $rules: { rule: aiid },
        },
      },
      c: {
        $iter: {
          $rules: { rule: aici },
        },
        d: {
          $rules: { rule: aicd },
        },
      },
    },
    b: {
      $iter: {
        $iter: {
          $rules: { rule: abii },
        },
        d: {
          $rules: { rule: abid },
        },
      },
      c: {
        $iter: {
          $rules: { rule: abci },
        },
        d: {
          $rules: { rule: abcd },
        },
      },
    },
  },
}

const path = ['a', 'b', 'c', 'd']

test('schema a.b.c.d', () => {
  expect(getSchema({ rootSchema, path }).$rules.rule).toBe(abcd)
})

test('schema a.b.c.i', () => {
  delete rootSchema.a.b.c.d.$rules
  expect(getSchema({ rootSchema, path }).$rules.rule).toBe(abci)
})

test('schema a.b.i.d', () => {
  delete rootSchema.a.b.c.$iter.$rules
  expect(getSchema({ rootSchema, path }).$rules.rule).toBe(abid)
})

test('schema a.b.i.i', () => {
  delete rootSchema.a.b.$iter.d.$rules
  expect(getSchema({ rootSchema, path }).$rules.rule).toBe(abii)
})

test('schema a.i.c.d', () => {
  delete rootSchema.a.b.$iter.$iter.$rules
  expect(getSchema({ rootSchema, path }).$rules.rule).toBe(aicd)
})

test('schema a.i.c.i', () => {
  delete rootSchema.a.$iter.c.d.$rules
  expect(getSchema({ rootSchema, path }).$rules.rule).toBe(aici)
})

test('schema a.i.i.d', () => {
  delete rootSchema.a.$iter.c.$iter.$rules
  expect(getSchema({ rootSchema, path }).$rules.rule).toBe(aiid)
})

test('schema a.i.i.i', () => {
  delete rootSchema.a.$iter.$iter.d.$rules
  expect(getSchema({ rootSchema, path }).$rules.rule).toBe(aiii)
})

test('schema i.b.c.d', () => {
  delete rootSchema.a.$iter.$iter.$iter.$rules
  expect(getSchema({ rootSchema, path }).$rules.rule).toBe(ibcd)
})

test('schema i.b.c.i', () => {
  delete rootSchema.$iter.b.c.d.$rules
  expect(getSchema({ rootSchema, path }).$rules.rule).toBe(ibci)
})

test('schema i.b.i.d', () => {
  delete rootSchema.$iter.b.c.$iter.$rules
  expect(getSchema({ rootSchema, path }).$rules.rule).toBe(ibid)
})

test('schema i.b.i.i', () => {
  delete rootSchema.$iter.b.$iter.d.$rules
  expect(getSchema({ rootSchema, path }).$rules.rule).toBe(ibii)
})

test('schema i.i.c.d', () => {
  delete rootSchema.$iter.b.$iter.$iter.$rules
  expect(getSchema({ rootSchema, path }).$rules.rule).toBe(iicd)
})

test('schema i.i.c.i', () => {
  delete rootSchema.$iter.$iter.c.d.$rules
  expect(getSchema({ rootSchema, path }).$rules.rule).toBe(iici)
})

test('schema i.i.i.d', () => {
  delete rootSchema.$iter.$iter.c.$iter.$rules
  expect(getSchema({ rootSchema, path }).$rules.rule).toBe(iiid)
})

test('schema i.i.i.i', () => {
  delete rootSchema.$iter.$iter.$iter.d.$rules
  expect(getSchema({ rootSchema, path }).$rules.rule).toBe(iiii)
})

test('cache', () => {
  const path = 'abcdefghij'.split('')
  const rootSchema: any = {}
  let schema = rootSchema
  path.forEach(() => {
    schema.$iter = {}
    schema = schema.$iter
  })
  schema.$rules = { rule: iiii }

  const cache = new WeakMap()
  const times = 64
  let i
  const beforeWithCache = Date.now()
  i = 0
  while (++i < times) {
    expect(getSchema({ rootSchema, path, cache }).$rules.rule).toBe(iiii)
  }
  const afterWithCache = Date.now()

  const before = Date.now()
  i = 0
  while (++i < times) {
    expect(getSchema({ rootSchema, path }).$rules.rule).toBe(iiii)
  }
  const after = Date.now()
  expect((afterWithCache - beforeWithCache) * 8 < after - before).toBe(true)
})
