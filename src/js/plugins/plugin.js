import {camelCase, fire, kebabCase, random} from '../helper';

export class Plugin {
  constructor(pluginName, element) {
    this.element = element;
    this.elementId = element.id;
    this.pluginName = pluginName;
    this.pluginId = this.pluginName;
    this.element.setAttribute('data-base-plugin', this.pluginId);
    if (!this.element.hasAttribute(`data-${this.pluginName}`) ||
      this.element.getAttribute(`data-${this.pluginName}`).length === 0) {
      this.element.setAttribute(`data-${this.pluginName}`, this.pluginId);
    }
    fire(this.element, `init.base.${camelCase(this.pluginName)}`);
  }

  set pluginName(pluginName) {
    this._pluginName = kebabCase(pluginName);
  }

  get pluginName() {
    return this._pluginName;
  }

  set pluginId(pluginName) {
    this._pluginId = random(6, pluginName);
  }

  get pluginId() {
    return this._pluginId;
  }

  setOptions(options, defaults) {
    if (options instanceof Object) {
      this.options = new Map([...defaults, ...new Map(Object.entries(options)), ...this._dataset]);
    } else {
      this.options = new Map([...defaults, ...this._dataset]);
    }
  }

  get _dataset() {
    return new Map(Object.entries(this.element.dataset).filter(key => !(key.includes('basePlugin') || key.includes(camelCase(this.pluginName)))));
  }
}
