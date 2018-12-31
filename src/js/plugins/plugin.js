import { camelCase, fire, kebabCase, random } from '../helper';

export default class Plugin {
  /**
   * @param {Element} element - Element object to use for the modal.
   */
  constructor(element) {
    this.element = element;
    this.elementId = element.id;
  }

  /**
   * @param {String} pluginName
   */
  set pluginName(pluginName) {
    this._pluginName = kebabCase(pluginName);
    this.pluginId = random(6, this.pluginName);

    this.element.setAttribute('data-base-plugin', this.pluginId);

    if (
      !this.element.hasAttribute(`data-${this.pluginName}`) ||
      this.element.getAttribute(`data-${this.pluginName}`).length === 0
    ) {
      this.element.setAttribute(`data-${this.pluginName}`, this.pluginId);
    }

    fire(this.element, `init.base.${camelCase(this.pluginName)}`);
  }

  /**
   * @returns {String}
   */
  get pluginName() {
    return this._pluginName;
  }

  /**
   * @param {Object | Map<any[], any>} options
   */
  set options(options) {
    if (options instanceof Object && !(options instanceof Map)) {
      options = new Map(Object.entries(options));
    }

    if (!this._options) {
      this._options = options;
      return;
    }

    options.forEach((value, key) => {
      this._options.set(key, value);
    });
  }

  /**
   * @returns {Map<any[], any>}
   */
  get options() {
    return this._options;
  }


  /**
   * @returns {Map<any[], any>}
   */
  getOptionsFromElement() {
    return new Map(Object.entries(this.element.dataset).map(datasetValue => datasetValue
      .map(value => value === 'true' || value === 'false' ? JSON.parse(value) : value))
      .filter(key => !(key.includes('basePlugin') || key.includes(camelCase(this.pluginName)))));
  }
}
