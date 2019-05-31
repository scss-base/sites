import { fire, on } from '../helper';
import { Triggers } from '../utility';
import { Plugin } from './plugin';
/**
 * Toggler plugin to toggle a css class
 */
export class Toggler extends Plugin {
    /**
     * Creates a new instance of Toggler.
     * @param element
     * @param options
     */
    constructor(element, options) {
        super('toggler', element);
        /**
         * Default settings for plugin
         */
        this.defaults = new Map(Object.entries({
            /**
             * Class of the element to toggle. It can be provided with or without "."
             * @option
             * @type {string}
             */
            toggler: undefined,
        }));
        this.setOptions(options, this.defaults);
        this.initCustomEvents();
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
        const className = this.options.get('toggler').replace(/^\./, '');
        this.element.classList.toggle(className);
        if (this.element.classList.contains(className)) {
            /**
             * Fires if the target element has the class after a toggle.
             * @event Toggler#on
             */
            fire(this.element, 'on.base.toggler');
        }
        else {
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
    initCustomEvents() {
        on('toggle.base.trigger', this.element, this.toggle.bind(this));
    }
}
