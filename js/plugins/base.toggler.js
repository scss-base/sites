import { BasePlugin } from '../base.plugin';

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
  }

  toggle() {
    const className = this.element.dataset.toggler;
    this.element.classList.toggle(className);
  }
}

export { Toggler };