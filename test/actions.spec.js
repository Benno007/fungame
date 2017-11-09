const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const fibo = require('../src/isFib');
const actions = require('../src/actions');
chai.use(sinonChai);

const assert = chai.assert;
const expect = chai.expect;
const callback = sinon.spy();

describe('actions', () => {
    beforeEach(function () {
        sinon.spy(console, 'log');
    });

    afterEach(function () {
        console.log.restore();
    });

    it('runs halt and the callback', () => {
        actions.runAction({}, 'halt', [2], callback);
        expect(console.log).to.be.called;
        assert.isUndefined(actions.interval);
        assert(callback.calledWith([2]));
    });

    it('adds a number', () => {
        const result = actions.runAction({}, '5', [2], callback);
        assert(callback.called);
        expect(result).to.be.an('array').to.include(2).to.include(5);
    });

    it('adds a number thats a fibonacci number', () => {
        fibo.getFibonaccied(10);
        const result = actions.runAction({}, '8', [2], callback);
        assert(callback.called);
        expect(console.log).to.be.called;
        expect(result).to.be.an('array').to.include(2).to.include(8);
    });


    it('runs the the callback and does not console log', () => {
        actions.runAction({}, 'nothing', [1, 2, 3], callback);
        expect(console.log).to.not.be.called;
        assert(callback.calledWith([1, 2, 3]));
    });
});