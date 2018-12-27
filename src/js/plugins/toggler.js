import Plugin from './plugin';
import { Triggers } from '../utilities';

/**
 * Toggler module to toggle a css class
 */
export default class Toggler extends Plugin {
  /**
   * Gets class name.
   * @type {string}
   */
  className = 'Toggler';

  /**
   *
   * @type {Map<string, boolean | string>}
   */
  defaults = new Map(Object.entries({
    /**
     * Class of the element to toggle. It can be provided with or without "."
     * @option
     * @type {string}
     */
    toggler: undefined,
  }));

  /**
   * Creates a new instance of Toggler.
   * @param element
   * @param [options]
   */
  constructor(element, options) {
    super(element, options);
    this.options = this.defaults;

    this._addListeners();
    Triggers.init();
  }

  /**
   * Toggles the target class on the target element. An event is fired from the original trigger depending on if
   * the resultant state was "on" or "off".
   *
   * @function
   * @fires Toggler#on
   * @fires Toggler#off
   */
  toggle() {
    const className = this.options.get('toggler');
    this.element.classList.toggle(className);

    if (this.element.classList.contains(className)) {
      /**
       * Fires if the target element has the class after a toggle.
       * @event Toggler#on
       */
      this.element.trigger('on.base.toggler');
    } else {
      /**
       * Fires if the target element does not have the class after a toggle.
       * @event Toggler#off
       */
      this.element.trigger('off.base.toggler');
    }
  }

  /**
   * Adds event listeners for the Toggler.
   * @private
   */
  _addListeners() {
    this.element.on('toggle.base.trigger', this.toggle.bind(this));
  }
}
