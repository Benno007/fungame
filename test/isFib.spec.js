const chai = require('chai');
const expect = chai.expect;
const fibo = require('../src/isFib');

describe('isFibonacci', () => {
    beforeEach(() => {
        fibo.getFibonaccied(10);
    });
    it('returns true when the number is fibonacci', () => {
        expect(fibo.isFibonacci(8)).to.be.true;
    });

    it('returns false when the number is not fibonacci', () => {
        expect(fibo.isFibonacci(7)).to.be.false;
    });

    it('returns false when a string is provided', () => {
        expect(fibo.isFibonacci('8')).to.be.false;
    });

    it('expects that there are 11 numbers in the sequence cache array', () => {
        expect(fibo.cache).to.have.lengthOf(11)
    })
});