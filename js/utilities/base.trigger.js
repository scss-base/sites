import { $, $$ } from './base.dom';
import Plugins from '../plugins';

const triggerTypes = ['close', 'open', 'toggle'];

class Trigger {

  constructor() {



    this.bindClickEvents();
  }

  bindClickEvents() {
    $$('[data-close], [data-open], [data-toggle]').forEach(element => {
      const triggerType = this.getTriggerType(element);

      console.log(element);


      if (triggerType) {
        element.addEventListener('click', () => {
          const id = element.dataset[triggerType];
          const targetElement = $(`#${id}`);

          console.log(Plugins);
          console.log(targetElement);
          console.log(element.dataset[triggerType]);
          console.log('test', element.dataset, triggerType);

        });
      }
    });
  }

  getTriggerType(element) {
    let type = null;

    Object.keys(element.dataset).forEach(dataName => {
      switch (dataName) {
        case 'close':
          type = 'close';
          break;
        case 'open':
          type = 'open';
          break;
        case 'toggle':
          type = 'toggle';
          break;
        default:
          return false;
      }
    });

    return type;
  }

  getPluginClass() {

  }

  // initCloseListener() {
  //   $$('[ data-close]').forEach(element => {
  //     const id = element.dataset.close;
  //     const selector = $(`#${id}`);
  //
  //     if (selector.dataset.hasOwnProperty('modal')) {
  //       // @todo duplicate
  //       new Modal(selector);
  //     }
  //   });
  // }
  //
  // initOpenListener() {
  //   $$('[ data-open]').forEach(element => {
  //     const id = element.dataset.open;
  //     const selector = $(`#${id}`);
  //
  //     if (selector.dataset.hasOwnProperty('modal')) {
  //       // @todo duplicate
  //       new Modal(selector);
  //     }
  //   });
  // }
  //
  // initToggleListener() {
  //   $$('[ data-toggle]').forEach(element => {
  //     element.addEventListener('click', this.toggle);
  //   });
  // }
  //
  // toggle() {
  //   const toggler = new Toggler($(`#${this.dataset.toggle}`));
  //   toggler.toggle();
  // }
}

export { Trigger }
