const formatValues = require('./formatter');
const fibo = require('./isFib');

// The interval in ms
let intervalValue;
// The interval instance
let interval;

/**
 * Helper to clear the timer
 */
const cancelTimer = () => {
    clearInterval(interval);
    interval = undefined;
};

/**
 * Output the values at the interval
 * @param {Array} values An array of values
 */
const intervalCallback = (values) => {
    const output = formatValues(values);
    if (output) {
        console.log(output);
    }
};

/**
 * On close, log out the values, close the ability to accept more input and quit the process.
 * @param {Stream} rl the readline interface
 * @param {Array} values the value cache
 * @param {Function} callback the triggerQuestion callback
 */
const quit = (rl, values, callback) => {
    console.log(formatValues(values) || 'No values entered');
    console.log('The end :-)');
    rl.close();
    cancelTimer();
    process.exit();
};
/**
 * Reset the interval and ask another question
 * @param {Stream} rl the readline interface
 * @param {Array} values the value cache
 * @param {Function} callback the triggerQuestion callback
 */
const resume = (rl, values, callback) => {
    interval = setInterval(() => intervalCallback(values), intervalValue);
    console.log('Timer resumed');
    callback(values);
};
/**
 * Stop the interval timer and show the question again, waiting for the user's input.
 * @param {Stream} rl the readline interface
 * @param {Array} values the value cache
 * @param {Function} callback the triggerQuestion callback
 */
const halt = (rl, values, callback) => {
    cancelTimer();
    console.log('Timer halted');
    callback(values);
};

/**
 * A map of methods
 * @type {*}
 */
const actions = {
    halt,
    resume,
    quit
};

/**
 * Running the first question, check to ensure its a real number.
 * If it isn't, close up shop and try again. If it is, cache the first 1000 fibonacci numbers
 * and begin the interval.
 * @param {Stream} rl The readline stream
 * @param {String} number User input
 * @param {Array} valueCache the value cache
 * @param {Function} callback The callback method
 */
const firstQuestion = (rl, number, valueCache, callback) => {
    intervalValue = parseFloat(number) * 1000;
    if (isNaN(intervalValue) || intervalValue === Infinity) {
        rl.close();
    } else {
        fibo.getFibonaccied(1000);
        interval = setInterval(() => intervalCallback(valueCache), intervalValue);
        callback();
    }
};
/**
 * Run an action after asking a question, either halt/resume/quit, or add a number.
 * If its an invalid number, ask again
 * @param {Stream} rl The readline stream
 * @param {String} input User input
 * @param {Array} valueCache the value cache
 * @param {Function} callback The callback method
 */
const runAction = (rl, input, valueCache, callback) => {
    // Don't be tricky and try and put Infinity...
    if (!isNaN(input) && input !== 'Infinity') {
        if (input !== '') {
            const number = parseInt(input, 10);
            valueCache.push(number);
            if (fibo.isFibonacci(number)) {
                console.log('FIB');
            }
        }
        callback(valueCache);
    } else {
        // If the method exists in my-little-factory of actions, run it, otherwise trigger another question!
        actions[input] && actions[input](rl, valueCache, callback) || callback(valueCache);
    }
    return valueCache;
};

/**
 * Close message
 */
const close = () => {
    if (!intervalValue) {
        console.warn('Please enter an interval value...');
    }
};

module.exports = {
    firstQuestion,
    runAction,
    close
};