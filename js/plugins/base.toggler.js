import { BasePlugin } from '../base.plugin';

import { $ } from '../utilities/base.dom';

/**
 * Toggler module to toggle a css class
 */
class Toggler extends BasePlugin {

  /**
   *
   * @param element
   * @param [options]
   */
  constructor(element, options) {
    super(element, options);

    this.element = element;
    this.container = $(`#${this.element.dataset.toggle}`);
    this.click();
  }

  click() {
    this.element.addEventListener('click', this.toggle.bind(this));
  }

  toggle() {
    const className = this.container.dataset.toggler;
    this.container.classList.toggle(className);
  }
}

export { Toggler };
