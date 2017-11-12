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
    // console.log(this.element);
  }
}

export { Modal };
