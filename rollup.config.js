export default commandLineArgs => {
  const rm = require('rimraf')
  const path = require('path')
  const ts = require('rollup-plugin-typescript2')
  const terser = require('rollup-plugin-terser').terser
  const pkg = require(path.resolve(`package.json`))

  rm.sync(path.resolve('dist/**/*'))

  const configs = {
    esm: {
      input: 'src/index.ts',
      output: {
        file: path.resolve(`dist/${pkg.name}.esm.js`),
        format: `es`,
      },
      plugins: [ts()],
    },
    cjs: {
      input: 'src/index.ts',
      output: {
        file: path.resolve(`dist/${pkg.name}.cjs.js`),
        format: `cjs`,
      },
      plugins: [ts()],
    },
    global: {
      input: 'src/index.ts',
      output: {
        file: path.resolve(`dist/${pkg.name}.global.js`),
        format: `iife`,
        name: pkg.name
          .split(/[^\w]/)
          .map(n => n.slice(0, 1).toUpperCase() + n.slice(1))
          .join(''),
        extend: true,
      },
      plugins: [ts()],
    },

    'esm-prod': {
      input: 'src/index.ts',
      output: {
        file: path.resolve(`dist/${pkg.name}.esm.prod.js`),
        format: `es`,
      },
      plugins: [ts(), terser()],
    },
    'cjs-prod': {
      input: 'src/index.ts',
      output: {
        file: path.resolve(`dist/${pkg.name}.cjs.prod.js`),
        format: `cjs`,
      },
      plugins: [ts(), terser()],
    },
    'global-prod': {
      input: 'src/index.ts',
      output: {
        file: path.resolve(`dist/${pkg.name}.global.prod.js`),
        format: `iife`,
        name: pkg.name
          .split(/[^\w]/)
          .map(n => n.slice(0, 1).toUpperCase() + n.slice(1))
          .join(''),
        extend: true,
      },
      plugins: [ts(), terser()],
    },
  }

  return Object.values(configs)
}
