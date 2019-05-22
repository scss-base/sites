import { Core } from './index';
import { $, $$, off, on, fire } from '../helper';

export default class Triggers {
  static init() {
    Core.ready(() => {
      Triggers.addListeners();
    });
  }

  static openListener(event) {
    const id = event.target.dataset.open;
    fire($(`#${id}`), 'open.base.trigger');
  }

  static closeListener(event) {
    const id = event.target.dataset.close;
    fire(id ? $(`#${id}`) : event.target.closest('[data-base-plugin]'), 'close.base.trigger');
  }

  static toggleListener(event) {
    const id = event.target.dataset.toggle;
    fire($(`#${id}`), 'toggle.base.trigger');
  }

  static closeMeListener(event) {
    const plugin = event.type.split('.')[2];
    const pluginId = event.detail;

    $$(`[data-${plugin}]`).forEach(element => {
      if (pluginId !== element.dataset[plugin]) {
        fire(element, 'close.base.trigger');
      }
    });
  }

  static addListeners() {
    Triggers.addOpenListener();
    Triggers.addCloseListener();
    Triggers.addToggleListener();
    Triggers.addCloseMeListener();
  }

  static addOpenListener() {
    $$('[data-open]').forEach(element => {
      off('click', element, Triggers.openListener);
      on('click', element, Triggers.openListener);
    });
  }

  static addCloseListener() {
    $$('[data-close]').forEach(element => {
      off('click', element, Triggers.closeListener);
      on('click', element, Triggers.closeListener);
    });
  }

  static addToggleListener() {
    $$('[data-toggle]').forEach(element => {
      off('click', element, Triggers.toggleListener);
      on('click', element, Triggers.toggleListener);
    });
  }

  static addCloseMeListener() {
    const pluginNames = ['dropdown', 'modal', 'tooltip'];
    pluginNames.forEach(pluginName => {
      $$(`[data-${pluginName}]`).forEach(element => {
        off(`closeme.base.${pluginName}`, element, Triggers.closeMeListener);
        on(`closeme.base.${pluginName}`, element, Triggers.closeMeListener);
      });
    });
  }
}
