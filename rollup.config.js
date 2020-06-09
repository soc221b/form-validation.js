import rm from 'rimraf'
import path from 'path'
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import globals from 'rollup-plugin-node-globals'

rm.sync(path.resolve('dist/**/*'))

const packageName = 'form-validation'
const pascalCasePackageName = 'FormValidation'

const input = 'src/index.ts'
const formats = ['es', 'umd', 'amd', 'cjs', 'iife', 'system']

const configs = []
formats.forEach(format => {
  const config = {
    input,
    output: {
      format,
      name: pascalCasePackageName,
      extend: true,
    },
  }

  configs.push({
    ...config,
    plugins: [
      ts(),
      replace({
        __DEV__: true,
      }),
      resolve(),
      globals(),
    ],
    output: {
      ...config.output,
      file: path.resolve(`dist/${packageName}.${format}.js`),
    },
  })

  configs.push({
    ...config,
    plugins: [
      ts(),
      replace({
        __DEV__: false,
      }),
      resolve(),
      globals(),
      terser(),
    ],
    output: {
      ...config.output,
      file: path.resolve(`dist/${packageName}.${format}.prod.js`),
    },
  })
})
export default configs
