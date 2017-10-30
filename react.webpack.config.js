/* eslint-env node */
/* eslint no-console: 0 */

const webpack = require('webpack'),
      path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      ProgressBarPlugin = require('progress-bar-webpack-plugin'),
      getArg = require('./lib/script-arg.js')

const ENV = process.env.NODE_ENV || 'development',
      PROD = ENV === 'production',
      DEV = ENV === 'development',
      __ENV__ = JSON.stringify(ENV),
      __DEV__ = JSON.stringify(DEV),
      __PROD__ = JSON.stringify(PROD),

      isHot = DEV && getArg('hot', 'true').toString() === 'true'

const filename = PROD ? '[name].min.js' : '[name].js'

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    react: './react.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      'node_modules'
    ]
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          sourceMaps: true,
          presets: ['env', 'react']
        }
      }
    // }, {
    // 	test: /\.json$/,
    // 	use: 'json-loader'
    }]
  },
  plugins: [
    new ProgressBarPlugin({ width: 75, clear: true}),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      __ENV__,
      __DEV__,
      __PROD__,
      'process.env.NODE_ENV': __ENV__
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['react'],
      template: './index.html',
      filename: 'react.html'
    })
  ],

  stats: { colors: true },

  // node: {
  // 	global: true,
  // 	process: false,
  // 	Buffer: false,
  // 	__filename: false,
  // 	__dirname: false,
  // 	setImmediate: false
  // },

  devtool: PROD ? 'source-map' : 'inline-source-map',
}

if(PROD) {
  config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        'unsafe_comps': true,
        properties: true,
        'keep_fargs': false,
        'pure_getters': true,
        'collapse_vars': true,
        unsafe: true,
        warnings: false,
        'screw_ie8': true,
        sequences: true,
        'dead_code': true,
        'drop_debugger': true,
        comparisons: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        'hoist_funs': true,
        'if_return': true,
        'join_vars': true,
        cascade: true,
        'drop_console': true
      }
    })
  ])
}
if(DEV) {
  if(isHot) {
    config.plugins.concat([
      new webpack.HotModuleReplacementPlugin()
    ])
  }
  Object.assign(config, {
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 8000,
      hot: isHot,
      // https: {
      //   key: fs.readFileSync('/path/to/server.key'),
      //   cert: fs.readFileSync('/path/to/server.crt'),
      //   ca: fs.readFileSync('/path/to/ca.pem'),
      // },
      open: true,
    },
    watch: true,
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 1000,
      // poll: 5000,
    },
  })
}

module.exports = config
