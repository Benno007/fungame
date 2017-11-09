const readline = require('readline');
const actions = require('./src/actions');


// Initialise the readline:
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Close if you provide an invalid interval value first up.
 */
rl.on('close', actions.close);

// An initial store of values
const valueCache = [];
/**
 * Trigger a subsequent question, checking for fibonacci numbers or actions.
 */
const triggerQuestion = (values) => {
    const adverb = values && values.length ? 'next' : 'first';
    rl.question(`Please enter the ${adverb} number: `, (input) => {
        actions.runAction(rl, input, valueCache, triggerQuestion);
    });
};

/**
 * Ask the initial question
 */
rl.question('Please input the number of time in seconds between emitting numbers and their frequency: ', (number) => {
    actions.firstQuestion(rl, number, valueCache, triggerQuestion);
});