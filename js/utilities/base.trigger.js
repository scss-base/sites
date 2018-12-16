import { $, $$ } from './base.dom';
import Plugins from '../plugins';

/**
 * @type {string[]}
 */
const triggerNames = ['close', 'open', 'toggle'];

/**
 * @type {string[]}
 */
const triggerAttributes = triggerNames.map(name => `[data-${name}]`);

class Trigger {

  constructor() {
    this.bindClickEvents();
  }

  bindClickEvents() {
    $$(triggerAttributes).forEach(element => {
      const triggers = this.getClickTriggers(element);

      triggers.forEach(trigger => {
        console.log(triggers, trigger);
        trigger.element.addEventListener('click', event => {
          event.preventDefault();
          const plugin = new trigger.plugin(trigger.targetElement);
          plugin[trigger.method]();
        });
      });
    });
  }

  /**
   *
   * @param element
   * @returns {{plugin: *, element: HTMLElement, targetElement: HTMLElement}[]}
   */
  getClickTriggers(element) {
    return Object.keys(element.dataset)
      .filter(filterValue => triggerNames.filter(triggerName => triggerName === filterValue).length > 0)
      .map(method => {
        const targetId = `#${element.dataset[method]}`;
        const targetElement = $(targetId);
        const pluginName = Object.keys(Plugins).find(plugin => Object.keys(targetElement.dataset).includes(Plugins[plugin].name));
        const plugin = Plugins[pluginName];

        return { plugin, method, element, targetElement};
      });
  }
}

export { Trigger }
