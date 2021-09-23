const { builtinModules } = require('module');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * Flattens a specified JSON object.
 * 
 * @param {*} object The object to flatten.
 * @returns A flat JSON object where nested keys are delimited with . notation.
 */
 function flatten(object) {
    const toReturn = {}

    for (const i in object) {
        if (!object.hasOwnProperty(i)) continue

        if ((typeof object[i]) == 'object' && object[i] !== null) {
            const flatObject = flatten(object[i])

            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;
                toReturn[i + '.' + x] = flatObject[x]
            }
        } else {
            toReturn[i] = object[i]
        }
    }
    return toReturn;
}

async function execute(command) {
    const { stdout, stderr } = await exec(command)

    return stdout;
  }

  module.exports = {
      execute,
      flatten,
  }