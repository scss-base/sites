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

}

export {BaseCore};
