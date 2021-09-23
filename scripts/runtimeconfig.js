const { exit } = require('process');
const utilities = require('./utilities')
const configFilePath = `${__dirname}/../functions/.runtimeconfig.json`

const EXIT_CODES = {
    SUCCESS: 0,
    UNKNOWN: 1,
    TOO_FEW_ARGUMENTS: 2,
    UNRECOGNIZED_OPERATION: 3,
    FAILED_OPERATION: 4,
}

const FIREBASE_BASE_COMMAND = 'firebase'
const FIREBASE_FUNCTIONS_BASE_COMMAND = `${FIREBASE_BASE_COMMAND} functions`
const FIREBASE_FUNCTION_CONFIG_BASE_COMMAND = `${FIREBASE_FUNCTIONS_BASE_COMMAND}:config`

const COMMANDS = {
    FIREBASE: {
        DEPLOY: `${FIREBASE_BASE_COMMAND} deploy`, // TODO - Implement
        FUNCTIONS: {
            CONFIG: {
                GET: `${FIREBASE_FUNCTION_CONFIG_BASE_COMMAND}:get`,
                SET: `${FIREBASE_FUNCTION_CONFIG_BASE_COMMAND}:set`,
                UNSET: `${FIREBASE_FUNCTION_CONFIG_BASE_COMMAND}:unset`,
            }
        }
    }
}

// TODO - ADD LOGIC TO VERIFY SCHEMA OF LOCAL AND REMOTE RUNTIME JSON MATCHES

//------------------------------------------------------------------------------

/**
 * Updates the production runtime configuration to match the local copy.
 * 
 * @returns A promise for the async operation.
 */
async function setConfig() {
    const config = require(configFilePath);

    let values = Object.entries(utilities.flatten(config)).map(entry => {
        const key = entry[0]
        const raw_value = entry[1]
        const value = (typeof raw_value === 'string')
        ? `"${raw_value}"` 
        : raw_value

        return `${key}=${value}`  
    })
    .join(' ')

    return utilities.execute(`${COMMANDS.FIREBASE.FUNCTIONS.CONFIG.SET} ${values}`)
}

//------------------------------------------------------------------------------

/**
 * Retrieves and logs the runtime configuration to stdout.
 */
async function getConfig() {
    return utilities
    .execute(COMMANDS.FIREBASE.FUNCTIONS.CONFIG.GET)
    .then(console.log)
}

//------------------------------------------------------------------------------

/**
 * Clears the entire configuration.
 */
async function unsetConfig() {
    return utilities
    .execute(COMMANDS.FIREBASE.FUNCTIONS.CONFIG.GET)
    .then(JSON.parse)
    .then(utilities.flatten)
    .then(Object.keys)
    .then(output => output.join(' '))
    .then(keys => `${COMMANDS.FIREBASE.FUNCTIONS.CONFIG.UNSET} ${keys}`)
    .then(utilities.execute)
}

//------------------------------------------------------------------------------

/**
 * Main entry point to program.
 */
async function main() {
    let exitCode = EXIT_CODES.UNKNOWN

    const operations = {
        'get': getConfig,
        'set': setConfig,
        'unset': unsetConfig,
    }

    if (process.argv.length < 3) {
        console.error(`No operation supplied, please provide one of the following: ${Object.keys(operations)}`)
        exitCode = EXIT_CODES.TOO_FEW_ARGUMENTS
    }

    const command = process.argv[2]
    const operation = operations[command]
    
    if (operation) {
        try {
            await operation()
            exitCode = EXIT_CODES.SUCCESS
        } catch (error) {
            console.error(error)
            exitCode = EXIT_CODES.FAILED_OPERATION
        }
    } else {
        console.error(`Unrecognized operation: ${operation}`)
        console.error(`Please use one of the following: ${Object.keys(operations)}`)
        exitCode = EXIT_CODES.UNRECOGNIZED_OPERATION
    }

    return exitCode
}

//------------------------------------------------------------------------------

// PROGRAM STARTS HERE
main().then(exit)
