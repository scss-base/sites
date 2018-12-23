import { kebabCase, pid } from '../helper';

export default class Plugin {

  /**
   * @param {Element} element - Element object to use for the modal.
   * @param {Object} options
   */
  constructor(element, options) {
    this.id = element;
    this.element = element;
    this.pluginName = this;
    this.pluginId = this.pluginName;

    if (
      !this.element.hasAttribute(`data-${this.pluginName}`) ||
      this.element.getAttribute(`data-${this.pluginName}`).length === 0
    ) {
      this.element.setAttribute(`data-${this.pluginName}`, this.pluginId)
    }

    this.element.emit(`init.base.${this.pluginName}`);
  }

  set id(element) {
    this._id = element.id;
  }

  get id() {
    return this._id;
  }

  set pluginId(pluginName) {
    this._pluginId = pid(6, pluginName);
  }

  get pluginId() {
    return this._pluginId
  }

  set pluginName(object) {
    const pluginName = object.constructor.name ? object.constructor.name : object.className;
    this._pluginName = kebabCase(pluginName);
  }

  get pluginName() {
    return this._pluginName;
  }
}
