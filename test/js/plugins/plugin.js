import chai from 'chai';
import Plugin from '../../../src/js/plugins/plugin';

const assert = chai.assert;
const expect = chai.expect;

chai.should();

describe('Plugin', function () {
  let htmlDivElement;

  class TestPlugin extends Plugin {
    constructor(element, options) {
      super(element);
      this.pluginName = 'TestPlugin';
      this.options = options;
    }
  }

  beforeEach(function () {
    htmlDivElement = document.createElement('div');
    htmlDivElement.id = 'plugin';
    document.body.appendChild(htmlDivElement);
  });

  afterEach(function () {
    htmlDivElement.remove();
  });

  it('new...', function () {
    const plugin = new TestPlugin(document.querySelector('#plugin'));

    expect(plugin).to.be.an.instanceof(Plugin);
    plugin.element.should.be.an('HTMLDivElement');
    assert.equal(plugin.pluginName, 'test-plugin');
    assert.equal(htmlDivElement.dataset.testPlugin, plugin.pluginId);
  });

  it('should do not set a data-plugin-name attribute if exist', function () {
    htmlDivElement.setAttribute('data-test-plugin', 'test-plugin-0gfllv');

    const plugin = new TestPlugin(document.querySelector('#plugin'));

    expect(plugin).to.be.an.instanceof(Plugin);
    plugin.element.should.be.an('HTMLDivElement');
    assert.equal(plugin.pluginName, 'test-plugin');
    assert.equal(htmlDivElement.dataset.testPlugin, 'test-plugin-0gfllv');
  });

  it('should handle options', function () {
    htmlDivElement.setAttribute('data-option3', 'false');

    class TestPlugin2 extends Plugin {
      defaults = new Map(Object.entries({
        option1: undefined,
        option2: undefined,
      }));

      constructor(element, options) {
        super(element);
        this.pluginName = 'TestPlugin';

        this.options = this.defaults;
        this.options = options;
        this.options = this.getOptionsFromElement();
      }
    }

    const plugin1 = new TestPlugin(document.querySelector('#plugin'), new Map().set('option1', 'value1'));
    const plugin2 = new TestPlugin(document.querySelector('#plugin'), { option1: 'value1' });
    const plugin3 = new TestPlugin2(document.querySelector('#plugin'), { option1: 'value1' });


    assert.lengthOf(plugin1.options, 1);
    assert.hasAllKeys(plugin1.options, ['option1']);

    assert.lengthOf(plugin2.options, 1);
    assert.hasAllKeys(plugin2.options, ['option1']);

    assert.lengthOf(plugin3.options, 3);
    assert.hasAllKeys(plugin3.options, ['option1', 'option2', 'option3']);
    assert.isDefined(plugin3.options.get('option1'));
    assert.equal(plugin3.options.get('option1'), 'value1');
    assert.isUndefined(plugin3.options.get('option2'));
    assert.equal(plugin3.options.get('option3'), false);
  });

  it('should fire a init event', function () {
    const eventListener = function (event) {
      assert.strictEqual(event.type, 'init.base.testPlugin');
    };

    htmlDivElement.addEventListener('init.base.testPlugin', eventListener);
    new TestPlugin(document.querySelector('#plugin'));
    htmlDivElement.removeEventListener('test.detail', eventListener);
  });
});
