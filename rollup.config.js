import rm from 'rimraf'
import path from 'path'
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import globals from 'rollup-plugin-node-globals'
import common from '@rollup/plugin-commonjs'
import builtIn from 'rollup-plugin-node-builtins'

rm.sync(path.resolve('dist/**/*'))

const packageName = 'form-validation'
const pascalCasePackageName = 'FormValidation'

const input = 'src/index.ts'
const formats = ['es', 'umd', 'cjs']

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
  const plugins = [
    common(),
    builtIn(),
    ts(),
    replace({
      __DEV__: false,
    }),
    resolve(),
    globals(),
  ]

  configs.push({
    ...config,
    plugins,
    output: {
      ...config.output,
      file: path.resolve(`dist/${packageName}.${format}.js`),
    },
  })

  if (format !== 'umd') return
  configs.push({
    ...config,
    plugins: [...plugins, terser()],
    output: {
      ...config.output,
      file: path.resolve(`dist/${packageName}.${format}.prod.js`),
    },
  })
})
export default configs
