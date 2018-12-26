import { $, $$, Core } from './index';

export default class Triggers {
  static init() {
    Core.ready(() => {
      Triggers.addListeners();
    });
  }

  static openListener(event) {
    const id = event.target.dataset.open;
    $(`#${id}`).trigger('open.base.trigger');
  };

  static closeListener(event) {
    const id = event.target.dataset.close;
    if (id) {
      $(`#${id}`).trigger('close.base.trigger');
    } else {
      event.target.closest('[data-base-plugin]').trigger('close.base.trigger');
    }
  }

  static toggleListener(event) {
    const id = event.target.dataset.toggle;
    $(`#${id}`).trigger('toggle.base.trigger');
  }

  static closeMeListener(event) {
    const plugin = event.type.split('.')[2];
    const pluginId = event.detail;

    $$(`[data-${plugin}]`).forEach(element => {
      if (pluginId !== element.dataset[plugin]) {
        element.trigger('close.base.trigger');
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
    $$('[data-open]')
      .forEach(element =>
        element.off('click', Triggers.openListener).on('click', Triggers.openListener));
  }

  static addCloseListener() {
    $$('[data-close]')
      .forEach(element =>
        element.off('click', Triggers.closeListener).on('click', Triggers.closeListener));
  }

  static addToggleListener() {
    $$('[data-toggle]')
      .forEach(element =>
        element.off('click', Triggers.toggleListener).on('click', Triggers.toggleListener));
  }

  static addCloseMeListener() {
    const pluginNames = ['dropdown', 'modal', 'tooltip'];
    pluginNames.forEach(pluginName => {
      $$(`[data-${pluginName}]`).forEach(element => {
        element.off(`closeme.base.${pluginName}`, Triggers.closeMeListener).on(`closeme.base.${pluginName}`, Triggers.closeMeListener);
      });
    });
  }
}
