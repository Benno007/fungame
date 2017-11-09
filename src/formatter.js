/**
 * Given an array of values, de-dupe them into an object of value:count
 * Sort them and return them as a string.
 * @param {Array} values An array of values
 * @returns {String|Null} If there are no values, keep the interface clean...
 */
module.exports = formatValues = (values) => {
    if (!values || !values.length) {
        return null;
    }
    // Ded-upe by incrementing an object
    const counts = values.reduce((accumulator, val) => {
        if (!accumulator[val]) {
            accumulator[val] = 0;
        }
        accumulator[val] += 1;
        return accumulator;
    }, {});

    // Sort keys by descending order of their values
    const sorted = Object.keys(counts).sort((curr, next) => counts[next] - counts[curr]);
    // Create an array of key:value
    const array = sorted.map(number => `${number}:${counts[number]}`);
    return `\n${array.join(', ')}`;
};
