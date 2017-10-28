#!/usr/bin/env node
/* eslint-env node */
/* eslint no-console: 0 */

const getenv = require('getenv')

// set NODE_ENV if not set yet
process.env.NODE_ENV = getenv.string('NODE_ENV', 'development')

const webpack = require('webpack'),
      preactLink = require('../webpack.config.js')

module.exports = webpack(preactLink)
