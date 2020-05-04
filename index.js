'use strict'
const pkg = require('./package.json')

if (process.env.NODE_ENV === 'production') {
  module.exports = require(`./dist/${pkg.name}.cjs.prod.js`)
} else {
  module.exports = require(`./dist/${pkg.name}.cjs.js`)
}
