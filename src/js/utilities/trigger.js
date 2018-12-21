import { $ } from './index';
import { kebabCase } from '../helper';

export default class Trigger {
  static get types() {
    return new Set([
      'close',
      'dropdown-menu',
      'open',
      'toggle',
    ]);
  }

  static get methods() {
    return new Set([
      'close',
      'open',
      'toggle',
    ]);
  }

  static get selectors() {
    return Array.from(Trigger.types.values(), type => `[data-${type}]`);
  }

  constructor(element) {
    this.element = element;
    this.dataset = element;
  }

  set dataset(element) {
    this._dataset = new Map();

    Object.keys(element.dataset).forEach(datasetName => {
      const key = kebabCase(datasetName);
      const value = element.dataset[datasetName] || null;

      if (Trigger.types.has(key)) {
        this._dataset.set(key, value);
      }
    });
  }

  get dataset() {
    return this._dataset;
  }

  get targets() {
    this._targets = new Set();

    this.dataset.forEach((value, key) => {
      const target = new Map();

      const id = value || `${key}-${Math.random().toString(36).slice(2)}`;
      const element = value ? $(`#${id}`) : this.element;

      target.set('id', id);
      target.set('element', element);

      if (id && Trigger.methods.has(key)) {
        target.set('method', key)
      }

      this._targets.add(target);
    });

    return this._targets;
  }
}
