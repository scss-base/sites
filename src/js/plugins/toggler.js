import Plugin from './plugin';

/**
 * Toggler module to toggle a css class
 */
export default class Toggler extends Plugin {

  /**
   * @param element
   * @param [options]
   */
  constructor(element, options) {
    super(element, options);
  }

  /**
   * @returns {string}
   */
  static get className() {
    return 'Toggler';
  }

  /**
   * Toggle class name
   */
  toggle() {
    const className = this.element.dataset.toggler;
    this.element.classList.toggle(className);
  }
}
