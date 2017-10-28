#!/usr/bin/env node
/* eslint-env node */
/* eslint no-console: 0 */

const compiler = require('./get-compiler.js')

compiler.run((err, status) => {
  process.stdout.write(status.toString({
    chunks: false, // Makes the build much quieter
    colors: true
  }) + '\n')
})
