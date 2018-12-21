import { $$ } from './index';
import { camelCase, kebabCase } from '../helper';
import * as Plugins from '../plugins';
import Trigger from './trigger';

const _plugins = new Map();

export default class Triggers {
  static init() {
    $$(Trigger.selectors).forEach(element => {
      const trigger = new Trigger(element);
      Triggers.plugins = trigger.targets;
      Triggers.listeners = trigger;
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
          Triggers.plugins.get(targetId)[targetMethod]();
        });
      }
    });
  }
}
