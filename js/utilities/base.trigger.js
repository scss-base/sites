import { $, $$ } from './base.dom';
import Plugin from '../plugins';

const triggerTypes = [
  { name: 'close', plugin: 'Modal' },
  { name: 'open', plugin: 'Modal' },
  { name: 'toggle', plugin: 'Toggler' }
];
const triggerAttributes = triggerTypes.map(value => `[data-${value.name}]`);

class Trigger {

  constructor() {
    this.bindClickEvents();
  }

  bindClickEvents() {
    $$(triggerAttributes).forEach(element => {
      const triggers = this.getClickTriggers(element);

      triggers.forEach(trigger => {
        trigger.element.addEventListener('click', event => {
          event.preventDefault();
          triggerTypes.forEach(triggerType => {
            if (triggerType.name === trigger.type) {
              const plugin = new Plugin[triggerType.plugin](trigger.targetElement);
              plugin[trigger.type]();
            }
          });
        });
      });
    });
  }

  /**
   *
   * @param element
   * @returns {{type: string, element: HTMLElement, targetElement: HTMLElement}[]}
   */
  getClickTriggers(element) {
    return Object.keys(element.dataset)
      .filter(filterValue => triggerTypes.filter(triggerType => triggerType.name === filterValue).length > 0)
      .map(type => ({ type, element, targetElement: $(`#${element.dataset[type]}`) }));
  }
}

export { Trigger }
