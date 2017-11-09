const chai = require('chai');
const expect = chai.expect;
const formatValues = require('../src/formatter');

describe('formatValues', () => {

    it('returns null when provided an empty array', () => {
        expect(formatValues([])).to.be.a('null');
    });

    it('returns null when provided an undefined arg', () => {
        expect(formatValues()).to.be.a('null');
    });

    it('returns a string of values when values are provided', () => {
        const values = [1,1,2,2,2,3,3,4,4,4,5];
        const result = formatValues(values);
        expect(result).to.be.a('string');
        expect(result).to.equal('\n2:3, 4:3, 1:2, 3:2, 5:1');
    });
});