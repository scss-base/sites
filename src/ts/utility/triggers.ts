import { $, $$, fire, off, on } from '../helper';

export class Triggers {
  public static init(): void {
    Triggers.addListeners();
  }

  private static openListener(event): void {
    const id = event.target.dataset.open;
    fire($(`#${id}`), 'open.base.trigger');
  }

  private static closeListener(event): void {
    const id = event.target.dataset.close;
    fire(id ? $(`#${id}`) : event.target.closest('[data-base-plugin]'), 'close.base.trigger');
  }

  private static toggleListener(event): void {
    const id = event.target.dataset.toggle;
    fire($(`#${id}`), 'toggle.base.trigger');
  }

  private static closeMeListener(event): void {
    const plugin = event.type.split('.')[2];
    const pluginId = event.detail;

    $$(`[data-${plugin}]`).forEach(element => {
      if (pluginId !== element.dataset[plugin]) {
        fire(element, 'close.base.trigger');
      }
    });
  }

  private static addListeners(): void {
    Triggers.addOpenListener();
    Triggers.addCloseListener();
    Triggers.addToggleListener();
    Triggers.addCloseMeListener();
  }

  private static addOpenListener(): void {
    $$('[data-open]').forEach(element => {
      off('click', element, Triggers.openListener);
      on('click', element, Triggers.openListener);
    });
  }

  private static addCloseListener(): void {
    $$('[data-close]').forEach(element => {
      off('click', element, Triggers.closeListener);
      on('click', element, Triggers.closeListener);
    });
  }

  private static addToggleListener(): void {
    $$('[data-toggle]').forEach(element => {
      off('click', element, Triggers.toggleListener);
      on('click', element, Triggers.toggleListener);
    });
  }

  private static addCloseMeListener(): void {
    const pluginNames = ['dropdown', 'modal', 'tooltip'];
    pluginNames.forEach(pluginName => {
      $$(`[data-${pluginName}]`).forEach(element => {
        off(`closeme.base.${pluginName}`, element, Triggers.closeMeListener);
        on(`closeme.base.${pluginName}`, element, Triggers.closeMeListener);
      });
    });
  }
}
