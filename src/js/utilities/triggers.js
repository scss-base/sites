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

  static addListeners() {
    $$('[data-open]')
      .forEach(element =>
        element.off('click', Triggers.openListener).on('click', Triggers.openListener, false));
    $$('[data-close]')
      .forEach(element =>
        element.off('click', Triggers.closeListener).on('click', Triggers.closeListener, false));
    $$('[data-toggle]')
      .forEach(element =>
        element.off('click', Triggers.toggleListener).on('click', Triggers.toggleListener, false));
  }
}
