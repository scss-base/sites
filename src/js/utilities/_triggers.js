import { $$ } from './index';
import { camelCase, kebabCase } from '../helper';
import * as Plugins from '../plugins';
import _trigger from './_trigger';

const _plugins = new Map();

export default class _triggers {
  static init() {
    $$(_trigger.selectors).forEach(element => {
      const trigger = new _trigger(element);
      _triggers.plugins = trigger.targets;
      _triggers.listeners = trigger;
    });
  }

  static set plugins(targets) {
    targets.forEach(target => {
      const targetId = target.get('id');
      const targetElement = target.get('element');

      const pluginName = Object.keys(Plugins)
        .find(plugin =>
          Object.keys(targetElement.dataset).includes(camelCase(kebabCase(Plugins[plugin].className))));

      if (!_plugins.has(targetId)) {
        _plugins.set(targetId, new Plugins[pluginName](targetElement));
      }
    });
  }

  static get plugins() {
    return _plugins;
  }

  static set listeners(trigger) {
    trigger.targets.forEach(target => {
      if (target.has('method')) {
        const targetId = target.get('id');
        const targetMethod = target.get('method');

        trigger.element.addEventListener('click', event => {
          event.preventDefault();
          _triggers.plugins.get(targetId)[targetMethod]();
        });
      }
    });
  }
}
