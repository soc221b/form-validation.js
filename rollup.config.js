import rm from 'rimraf'
import path from 'path'
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

rm.sync(path.resolve('dist/**/*'))

const packageName = 'form-validation'
const pascalCasePackageName = 'Form-Validation'

const input = 'src/index.ts'
const formats = ['es', 'umd', 'amd', 'cjs', 'iife', 'system']
const plugins = [ts()]

const configs = []
formats.forEach(format => {
  const config = {
    input,
    plugins,
    output: {
      format,
      name: pascalCasePackageName,
      extend: true,
    },
  }

  configs.push({
    ...config,
    output: {
      ...config.output,
      file: path.resolve(`dist/${packageName}.${format}.js`),
    },
  })

  configs.push({
    ...config,
    plugins: [...config.plugins, terser()],
    output: {
      ...config.output,
      file: path.resolve(`dist/${packageName}.${format}.prod.js`),
    },
  })
})
export default configs
