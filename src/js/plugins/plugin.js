import { kebabCase, random } from '../helper';

export default class Plugin {
  /**
   * @param plugin
   */
  set pluginName(plugin) {
    const pluginName = plugin.constructor.name ? plugin.constructor.name : plugin.className;
    this._pluginName = kebabCase(pluginName);
  }

  /**
   * @returns {String}
   */
  get pluginName() {
    return this._pluginName;
  }

  /**
   * @param {DOMStringMap} dataset
   */
  set dataset(dataset) {
    if (dataset instanceof DOMStringMap) {
      this._dataset = new Map(Object.entries(dataset).map(datasetValue => datasetValue
        .map(value => value === 'true' || value === 'false' ? JSON.parse(value) : value)));
    }
  }

  /**
   * @returns {Map<string, null | boolean | string>}
   */
  get dataset() {
    return this._dataset;
  }

  /**
   * @param options
   */
  set options(options) {
    let _options = options || {};

    if (_options instanceof Object && !(_options instanceof Map)) {
      _options = Object.entries(_options);
    }

    this._options = !this._options ? new Map(_options) : new Map([..._options, ...this.options]);
  }

  /**
   * @returns {Map<string, string>}
   */
  get options() {
    return this._options;
  }

  /**
   * @param {Element} element - Element object to use for the modal.
   * @param {Object} options
   */
  constructor(element, options) {
    this.element = element;
    this.elementId = element.id;
    this.options = options;
    this.pluginName = this;
    this.pluginId = random(6, this.pluginName);

    if (
      !this.element.hasAttribute(`data-${this.pluginName}`) ||
      this.element.getAttribute(`data-${this.pluginName}`).length === 0
    ) {
      this.element.setAttribute(`data-${this.pluginName}`, this.pluginId);
    }

    if (!this.element.hasAttribute('data-base-plugin')) {
      this.element.setAttribute('data-base-plugin', this.pluginId);
    }

    this.dataset = this.element.dataset;
    this.options = this.dataset;

    this.element.trigger(`init.base.${this.pluginName}`);
  }
}
