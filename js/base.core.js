const BASE_VERSION = '1.0.0';

class BaseCore {

  constructor() {
    this.version = BASE_VERSION;
  }

  init() {
    Object.keys(this.plugins).forEach(pluginName => {
      this[pluginName] = this.plugins[pluginName];
    });
  }

  plugin(pluginClass, pluginName) {
    const name = pluginName || pluginClass.prototype.constructor.name;
    this.plugins = Object.assign({}, this.plugins, {[name]: pluginClass});
  }

  ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState != 'loading')
          fn();
      });
    }
  }
}

export {BaseCore};
