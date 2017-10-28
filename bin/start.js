#!/usr/bin/env node
/* eslint-env node */
/* eslint no-console: 0 */

const webpackDevServer = require('webpack-dev-server')
const compiler = require('./get-compiler.js')

const server = new webpackDevServer(compiler)

server.listen(8000, '0.0.0.0', () => {
  console.log('dev server listening on port 8000')
})
