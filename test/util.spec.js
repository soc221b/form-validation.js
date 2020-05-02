import {
  toString,
  isPlainObject,
  isArray,
  isFunction,
  deepCopy,
  normalizePath,
  getByPath,
  setByPath,
} from '../src/util';

test('toString', () => {
  expect(toString('')).toStrictEqual('[object String]');
});

test('isPlainObject', () => {
  expect(isPlainObject({})).toStrictEqual(true);
  expect(isPlainObject([])).toStrictEqual(false);
});

test('isArray', () => {
  expect(isArray([])).toStrictEqual(true);
  expect(isArray({})).toStrictEqual(false);
});

test('isFunction', () => {
  expect(isFunction(() => {})).toStrictEqual(true);
});

test('deepCopy', () => {
  const boolean = true;
  const number = 42;
  const string = 'foo';
  const func = () => {};
  const array = [boolean, number, string, func];
  const object = {
    boolean, string, number, array, func,
  };
  array.push(object);
  object.object = object;

  expect(deepCopy(boolean)).toStrictEqual(boolean);
  expect(deepCopy(number)).toStrictEqual(number);
  expect(deepCopy(string)).toStrictEqual(string);
  expect(deepCopy(func)).toStrictEqual(func);
  expect(deepCopy(array)).toStrictEqual(array);
  expect(deepCopy(object)).toStrictEqual(object);
});

test('normalizePath', () => {
  const path1 = 'path.to.nesting';
  expect(normalizePath(path1)).toStrictEqual(['path', 'to', 'nesting']);

  const path2 = path1.split('.');
  expect(normalizePath(path2)).toStrictEqual(['path', 'to', 'nesting']);
  expect(normalizePath(path2)).not.toBe(path2);

  const path3 = '';
  expect(normalizePath(path3)).toStrictEqual([]);
});

test('getByPath (object)', () => {
  const object = {
    path: {
      to: {
        nesting: {},
      },
    },
  };

  expect(getByPath(object, ['path', 'to', 'nesting'])).toBe(object.path.to.nesting);
  expect(getByPath(object, 'path.to.nesting')).toBe(object.path.to.nesting);

  expect(getByPath(object, [])).toBe(object);
  expect(getByPath(object, '')).toBe(object);
});

test('getByPath (array)', () => {
  const array = [
    [
      [
        {},
      ],
    ],
  ];

  expect(getByPath(array, ['0', '0', '0'])).toBe(array[0][0][0]);
  expect(getByPath(array, '0.0.0')).toBe(array[0][0][0]);

  expect(getByPath(array, [])).toBe(array);
  expect(getByPath(array, '')).toBe(array);
});

test('setByPath (object)', () => {
  const oldValue = {};
  const value = {};
  const object = {
    path: {
      to: {
        nesting: oldValue,
      },
    },
  };

  expect(setByPath(object, ['path', 'to', 'nesting'], value)).toBe(value);
  expect(setByPath(object, 'path.to.nesting', value)).toBe(value);
  expect(object.path.to.nesting).toBe(value);

  expect(setByPath(object, [], value)).toBe(value);
  expect(setByPath(object, '', value)).toBe(value);
});

test('setByPath (array)', () => {
  const oldValue = {};
  const value = {};
  const array = [
    [
      [
        oldValue,
      ],
    ],
  ];

  expect(setByPath(array, ['0', '0', '0'], value)).toBe(value);
  expect(setByPath(array, '0.0.0', value)).toBe(value);
  expect(array[0][0][0]).toBe(value);

  expect(setByPath(array, [], value)).toBe(value);
  expect(setByPath(array, '', value)).toBe(value);
});
