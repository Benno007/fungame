// Start the cache with the first three in the sequence so the function will work
const cache = [0, 1, 1];
/**
 * Recursively call itself until the cache has been populated down to the first entries in the sequence.
 * @param {Number} n Start at this
 * @returns {Array} An array populated with numbers.
 */
const getFibonaccied = (n) => {
    if (typeof cache[n] === 'undefined')
        cache[n] = getFibonaccied(n - 1) + getFibonaccied(n - 2);
    return cache[n];
};
// Export the method to check if its in the array
module.exports = {
    isFibonacci: (n) => cache.includes(n),
    getFibonaccied,
    cache
};