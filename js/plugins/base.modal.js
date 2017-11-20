import { BasePlugin } from '../base.plugin';

/**
 * Modal module
 */
class Modal extends BasePlugin {

  /**
   *
   * @param element
   * @param [options]
   */
  constructor(element, options) {
    super(element, options);
    this.element = element;
  }

  close() {
    this.element.style.display = 'none';
  }

  open() {
    this.element.style.display = 'block';
  }
}

export { Modal };
