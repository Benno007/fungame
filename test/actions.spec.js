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
        sinon.useFakeTimers();
    });

    afterEach(function () {
        console.log.restore();
    });

    describe('runAction', () => {
        it('runs halt and the callback', () => {
            actions.runAction({}, 'halt', [2], callback);
            expect(console.log).to.be.called;
            assert.isNull(actions.interval);
            assert(callback.calledWith([2]));
        });

        it('runs resume and the callback', () => {
            actions.runAction({}, 'resume', [2], callback);
            expect(console.log).to.be.called;
            // not sure if this is true because using fake timers?
            assert.isNull(actions.interval);
            assert(callback.calledWith([2]));
        });

        it('runs quit and the callback', () => {
            process.exit = sinon.spy();
            const close = sinon.spy();
            actions.runAction({close}, 'quit', [2], callback);
            expect(console.log).to.be.called;
            assert(process.exit.called);
            assert(close.called);

        });

        it('adds a number', () => {
            const result = actions.runAction({}, '5', [2], callback);
            assert(callback.called);
            expect(result).to.be.an('array').to.include(2).to.include(5);
        });

        it('does nothing with infinity', () => {
            const result = actions.runAction({}, 'Infinity', [2], callback);
            assert(callback.called);
            expect(result).to.be.an('array').to.include(2).to.not.include('Infinity');
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

    describe('firstQuestion', () => {
        it('run the first question when passed a valid input', () => {
            actions.firstQuestion({}, '12', [], callback);
            expect(console.log).to.not.be.called;
            expect(fibo.cache).to.have.lengthOf(1001);
            assert(callback.called);
        });

        it('runs the close method when an invalid input is passed', () => {
            const close = sinon.spy();
            actions.firstQuestion({close}, 'abc', [], callback);
            assert(close.called);
        });
    });


});