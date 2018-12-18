import { version } from '../package.json';
import Trigger from './utilities/base.trigger';

export default class BaseCore {

  constructor() {
    this.version = version;
    this.plugins = this.plugins || {};
  }

  init() {
    Object.keys(this.plugins).forEach(pluginName => {
      this[pluginName] = this.plugins[pluginName];
    });

    new Trigger();
  }

  plugin(pluginClass, pluginName) {
    const name = pluginName || pluginClass.prototype.constructor.name;
    this.plugins = Object.assign({}, this.plugins, { [name]: pluginClass });
  }

  ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      document.attachEvent('onreadystatechange', () => {
        if (document.readyState !== 'loading')
          fn();
      });
    }
  }
}
