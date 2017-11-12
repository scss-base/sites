import { $, $$ } from './base.dom';
import { Toggler } from '../plugins/base.toggler';
import { Modal } from '../plugins/base.modal';

class Trigger {

  constructor() {
    this.listeners = {};
    this.init();
  }

  init() {
    $$('[ data-close], [data-open], [ data-toggle]').forEach(element => {
      const id = element.dataset.close || element.dataset.open || element.dataset.toggle;
      if (!this.listeners[id]) {
        let className = undefined;
        const selector = $(`#${id}`);
        Object.keys(selector.dataset).forEach(dataName => {
          switch (dataName) {
            case 'modal':
              className = new Modal(selector);
              break;
            case 'toggler':
              className = new Toggler(selector);
              break;
          }
        });
        this.listeners[id] = className;
      }
    });
    this.initListeners();
  }

  initListeners() {
    console.log(this.listeners);
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
