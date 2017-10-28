/* eslint-env node */

/**
 * Utility function to read a double dash argument pased into a node run script
 * after --. For example:
 *
 * `npm run myscript -- --foo=bar`
 *
 * Use `getArg('foo', 'mydefault')` to retriece 'bar' in the example above.
 *
 * @param {string} argName The name of the argument to getArg
 * @param {string|boolean} defaultVal the default value to return if argument is not present
 *
 **/

function getArg(argName, defaultVal) {
  var argVal = defaultVal
  process.argv.forEach(function(test) {
    var pattern = new RegExp('^--' + argName)
    if(test.match(pattern)) {
      argVal = test.replace(pattern, '').replace(/^=/, '')

      // set argument as true if not supplied with trailing "="
      if(argVal === '') {
        argVal = true
      }
    }
  })

  return argVal
}

module.exports = getArg
