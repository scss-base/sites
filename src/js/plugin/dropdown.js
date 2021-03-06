import { $$, fire, on } from '../helper';
import { Triggers } from '../utility';
import { Positionable } from './positionable';
export class Dropdown extends Positionable {
    constructor(element, options) {
        super('dropdown', element);
        /**
         * Default settings for plugin
         */
        this.defaults = new Map(Object.entries({
            /**
             * Allow to open on hover events
             * @option
             * @type {boolean}
             * @default false
             */
            hover: false,
            /**
             * Number of pixels between the dropdown container and the triggering element on open.
             * @option
             * @type {number}
             * @default 0
             */
            vOffset: 0,
            /**
             * Number of pixels between the dropdown container and the triggering element on open.
             * @option
             * @type {number}
             * @default 0
             */
            hOffset: 0,
            /**
             * Position of dropdown container. Can be left, right, bottom or top.
             * @option
             * @type {string}
             * @default 'bottom'
             */
            position: 'bottom',
        }));
        this.setOptions(options, this.defaults);
        this.isOpen = false;
        this.anchors = $$(`[data-open="${this.elementId}"], [data-toggle="${this.elementId}"]`);
        this.currentAnchor = this.anchors[0];
        this.initCustomEvents();
        this.initMouseEvents();
        this.initUiEvents();
        Triggers.init();
    }
    /**
     * Opens the dropdown, and fires a bubbling event to close other dropdowns.
     * @fires Dropdown#closeme
     * @fires Dropdown#opened
     */
    open() {
        /**
         * Fires to close other open dropdowns, typically when dropdown is opening
         * @event Dropdown#closeme
         */
        fire(this.element, 'closeme.base.dropdown', this.pluginId);
        this.element.style.display = 'block';
        this.setPosition(this.element, this.currentAnchor);
        fire(this.element, 'opened.base.dropdown');
    }
    /**
     * Closes the open dropdown.
     * @fires Dropdown#closed
     */
    close() {
        this.isOpen = false;
        this.element.style.display = 'none';
        /**
         * Fires once the dropdown is no longer visible.
         * @event Dropdown#closed
         */
        fire(this.element, 'closed.base.dropdown');
    }
    toggle() {
        if (!this.isOpen) {
            this.open();
        }
        else {
            this.close();
        }
    }
    setPosition(parentElement, childElement) {
        super.setPosition(parentElement, childElement);
        let top = parseInt(parentElement.style.top, 10);
        let left = parseInt(parentElement.style.left, 10);
        switch (this.options.get('position')) {
            case 'top':
                top -= this.options.get('vOffset');
                left += this.options.get('hOffset');
                break;
            case 'left':
                top += this.options.get('vOffset');
                left -= this.options.get('hOffset');
                break;
            case 'right':
            default:
                top += this.options.get('vOffset');
                left += this.options.get('hOffset');
        }
        parentElement.style.top = `${top}px`;
        parentElement.style.left = `${left}px`;
    }
    initCustomEvents() {
        on('open.base.trigger', this.element, this.open.bind(this));
        on('close.base.trigger', this.element, this.close.bind(this));
        on('toggle.base.trigger', this.element, this.toggle.bind(this));
    }
    initMouseEvents() {
        let timeout;
        this.anchors
            .forEach(anchor => on('mouseenter', anchor, event => this.currentAnchor = event.target));
        if (this.options.get('hover')) {
            this.anchors.forEach(anchor => {
                on('mouseenter', anchor, () => {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => this.open());
                });
                on('mouseleave', anchor, () => {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => this.close());
                });
            });
            on('mouseenter', this.element, () => {
                clearTimeout(timeout);
            });
            on('mouseleave', this.element, () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => this.close());
            });
        }
    }
    initUiEvents() {
        on('click', this.element, this.close.bind(this));
        on('resize', window, this.close.bind(this));
        on('scroll', window, this.close.bind(this));
    }
}
