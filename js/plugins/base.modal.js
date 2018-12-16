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
    this.isHidden = true;
  }

  /**
   * @returns {string}
   */
  static get name () {
    return 'modal';
  }

  /**
   * @param {boolean} hidden
   */
  set isHidden (hidden) {
    this._hidden = hidden;
  }

  /**
   * @returns {boolean}
   */
  get isHidden () {
    return this._hidden;
  }

  close() {
    this.element.style.display = 'none';
    this.isHidden = true;
  }

  open() {
    this.element.style.display = 'block';
    this.isHidden = false;
  }

  toggle() {
    this.isHidden ? this.open() : this.close();
  }
}

export { Modal };
