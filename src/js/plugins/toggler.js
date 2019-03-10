import Plugin from './plugin';
import { Triggers } from '../utilities';
import { fire, on } from '../helper';

/**
 * Toggler module to toggle a css class
 */
export default class Toggler extends Plugin {

  /**
   * Creates a new instance of Toggler.
   * @param element
   * @param [options]
   */
  constructor(element, options = new Map()) {
    super(element);

    this.pluginName = 'Toggler';
    this.defaults = new Map(Object.entries({
      /**
       * Class of the element to toggle. It can be provided with or without "."
       * @option
       * @type {string}
       */
      toggler: undefined,
    }));

    this.options = this.defaults;
    this.options = options;
    this.options = this.getOptionsFromElement();

    this._initCustomEvents();
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
      fire(this.element, 'on.base.toggler');
    } else {
      /**
       * Fires if the target element does not have the class after a toggle.
       * @event Toggler#off
       */
      fire(this.element, 'off.base.toggler');
    }
  }

  /**
   * Adds event listeners for the Toggler.
   * @private
   */
  _initCustomEvents() {
    on('toggle.base.trigger', this.element, this.toggle.bind(this));
  }
}
