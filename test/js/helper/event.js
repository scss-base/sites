import chai from 'chai';
import {fire, off, on} from '../../../src/js_old/helper';

const assert = chai.assert;

describe('Event', function () {

  before(function () {
    const container = document.createElement('div');
    container.innerHTML = `
      <div class="js-test-parent">
        <div class="js-test-child"></div>
      </div>`;
    document.body.appendChild(container);
  });

  describe('fire()', function () {
    it('should fire a custom events with detail', function () {

      const eventListener = function (event) {
        assert(event.bubbles);
        assert(event.cancelable);
        assert.equal(event.type, 'test.detail');
        assert.deepEqual(event.detail, { id: 42, login: 'foo' });
        assert.strictEqual(document.body, event.target);
        assert.instanceOf(event, CustomEvent);
      };

      document.addEventListener('test.detail', eventListener);
      fire(document.body, 'test.detail', { id: 42, login: 'foo' });
      document.removeEventListener('test.detail', eventListener);
    });

    it('should fire an custom event without detail', function () {
      const eventListener = function (event) {
        assert(event.detail === undefined || event.detail === null);
        assert.instanceOf(event, CustomEvent);
      };
      document.addEventListener('test:fire', eventListener);
      fire(document.body, 'test:fire');
      document.removeEventListener('test:fire', eventListener);
    });

    it('should canceled when default prevented', function () {
      const eventListener = event => event.preventDefault();
      document.addEventListener('test:cancel', eventListener);
      const canceled = !fire(document.body, 'test:cancel');
      assert.equal(canceled, true);
      document.removeEventListener('test:cancel', eventListener);
    });

    it('should not canceled when default is not prevented', function () {
      const [eventListener, trace] = spy(event => assert.ok(event));
      document.addEventListener('test:event', eventListener);
      const canceled = !fire(document.body, 'test:event');
      assert.equal(canceled, false);
      assert.equal(trace.calls, 1);
      document.removeEventListener('test:event', eventListener);
    });
  });

  describe('on()/off()', function () {
    it('should observe an custom event on body', function () {
      let triggered = false;
      const eventListener = function (event) {
        triggered = true;
        assert(event.bubbles);
        assert(event.cancelable);
        assert.equal(event.type, 'test:on');
        assert.deepEqual({ id: 42, login: 'foo' }, event.detail);
        assert.strictEqual(document.body, event.target);
        assert.strictEqual(document.body, event.currentTarget);
        assert.strictEqual(document.body, this);
        assert.strictEqual(this, event.currentTarget);
        assert.instanceOf(event, CustomEvent);
      };
      on('test:on', document.body, eventListener);
      fire(document.body, 'test:on', { id: 42, login: 'foo' });
      off('test:on', document.body, eventListener);
      assert.equal(triggered, true);
    });

    it('should observe an custom event on window (default)', function () {
      let triggered = false;
      const eventListener = function (event) {
        triggered = true;
        assert(event.bubbles);
        assert(event.cancelable);
        assert.equal(event.type, 'test:on');
        assert.deepEqual({ id: 42, login: 'foo' }, event.detail);
        assert.strictEqual(window, event.target);
        assert.strictEqual(window, event.currentTarget);
        assert.strictEqual(window, this);
        assert.strictEqual(this, event.currentTarget);
        assert.instanceOf(event, CustomEvent);
      };
      on('test:on', eventListener);
      fire(window, 'test:on', { id: 42, login: 'foo' });
      off('test:on', eventListener);
      assert.equal(triggered, true);
    });

    it('should fire listeners in tree order', function () {
      const order = [];
      const parent = document.querySelector('.js-test-parent');
      const child = document.querySelector('.js-test-child');

      const one = function (event) {
        assert.strictEqual(child, event.target);
        assert.strictEqual(parent, event.currentTarget);
        assert.strictEqual(this, event.currentTarget);
        assert.strictEqual(this, parent);
        order.push(1);
      };

      const two = function (event) {
        assert.strictEqual(child, event.target);
        assert.strictEqual(child, event.currentTarget);
        assert.strictEqual(this, event.currentTarget);
        assert.strictEqual(this, child);
        order.push(2);
      };

      const three = function (event) {
        assert.strictEqual(child, event.target);
        assert.strictEqual(parent, event.currentTarget);
        assert.strictEqual(this, event.currentTarget);
        assert.strictEqual(this, parent);
        order.push(3);
      };

      const four = function (event) {
        assert.strictEqual(child, event.target);
        assert.strictEqual(child, event.currentTarget);
        assert.strictEqual(this, event.currentTarget);
        assert.strictEqual(this, child);
        order.push(4);
      };

      on('test:order', '.js-test-parent', one, true);
      on('test:order', '.js-test-child', two, true);
      on('test:order', '.js-test-parent', three);
      on('test:order', '.js-test-child', four);
      fire('.js-test-child', 'test:order');
      off('test:order', '.js-test-parent', one, true);
      off('test:order', '.js-test-child', two, true);
      off('test:order', '.js-test-parent', three);
      off('test:order', '.js-test-child', four);

      assert.deepEqual([1, 2, 4, 3], order);
    });

    it('should fail on a non exist DOM element', function () {
      const eventListener = () => {
      };
      assert.equal(on('test:on', 'doesNotExist'), false);
      assert.equal(on('test:on', 'doesNotExist', eventListener), false);
      assert.equal(off('test:off', 'doesNotExist'), false);
      assert.equal(off('test:off', 'doesNotExist', eventListener), false);
    });
  });

  function spy(fn) {
    const tracker = { calls: 0 };
    const capture = function () {
      tracker.calls++;
      return fn.apply(this, arguments);
    };
    return [capture, tracker];
  }
});
