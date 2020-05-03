const rollup = require('rollup')
const { resolve } = require('path')
const { terser } = require('rollup-plugin-terser')

const builds = {
  'esm-min': {
    src: resolve('src/index.js'),
    dest: resolve('dist/vue-chronos.esm.min.js'),
    format: 'es',
    env: 'production',
    min: true,
  },
  'cjs-min': {
    src: resolve('src/index.js'),
    dest: resolve('dist/vue-chronos.common.min.js'),
    format: 'cjs',
    env: 'production',
    min: true,
  },
  'umd-min': {
    src: resolve('src/index.js'),
    dest: resolve('dist/vue-chronos.min.js'),
    format: 'umd',
    env: 'production',
    min: true,
  },
  esm: {
    src: resolve('src/index.js'),
    dest: resolve('dist/vue-chronos.esm.js'),
    format: 'es',
    env: 'production',
  },
  cjs: {
    src: resolve('src/index.js'),
    dest: resolve('dist/vue-chronos.common.js'),
    format: 'cjs',
    env: 'production',
  },
  umd: {
    src: resolve('src/index.js'),
    dest: resolve('dist/vue-chronos.js'),
    format: 'umd',
    env: 'production',
  },
}

function generateInputOptions(buildName) {
  const build = builds[buildName]
  const options = {
    input: build.src,
    onwarn: (msg, warn) => {
      warn(msg)
    },
  }
  return options
}

function generateOuputOptions(buildName) {
  const build = builds[buildName]
  const options = {
    file: build.dest,
    format: build.format,
    name: 'VueChronos',
    plugins: /\.min\.js$/.test(build.dest) ? [terser()] : [],
  }
  return options
}

async function exec() {
  await Promise.all(
    Object.keys(builds).map(async buildName => {
      const inputOptions = generateInputOptions(buildName)
      const outputOptions = generateOuputOptions(buildName)
      const bundle = await rollup.rollup(inputOptions)
      await bundle.write(outputOptions)
    }),
  )
  finished = true
}

let finished = false
async function wait() {
  if (finished) return
  await new Promise(setTimeout)
  await wait()
}

if (require.main === module) {
  exec()
  wait()
}
