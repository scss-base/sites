import { createElement, fire, HTMLElementAttributes, off, on } from '../helper';
import { Core, Keyboard, Triggers } from '../utility';
import { Plugin } from './plugin';

/**
 * Modal module.
 * @module Modal
 * @extends Plugin
 * @requires Core
 * @requires Keyboard
 * @requires Triggers
 */
export class Modal extends Plugin {
  private isOpen: boolean;
  private overlay: HTMLElement;
  private overlayListener: (event: MouseEvent) => void;
  private keyboardListener: (event: KeyboardEvent) => void;

  /**
   * Default settings for plugin
   */
  private defaults = new Map(Object.entries({
    /**
     * Allows a click on the overlay to close the modal.
     * @option
     * @type {boolean}
     * @default true
     */
    closeOnClick: true,

    /**
     * Allows the modal to close if the user presses the `ESCAPE` key.
     * @option
     * @type {boolean}
     * @default true
     */
    closeOnEsc: true,

    /**
     * Link the location hash to the modal.
     * Set the location hash when the modal is opened/closed, and open/close the modal when the location changes.
     * @option
     * @type {boolean}
     * @default true
     */
    deepLink: true,

    /**
     * Allows adding additional class names to the reveal overlay.
     * @option
     * @type {string}
     * @default null
     */
    additionalOverlayClasses: undefined,
  }));

  /**
   * Creates a new instance of Modal.
   * @param element
   * @param options
   */
  constructor(element: HTMLElement, options?: any) {
    super('modal', element);

    this.setOptions(options, this.defaults);

    this.isOpen = false;

    this.createOverlay();
    this.initCustomEvents();

    Triggers.init();
    Keyboard.register(this.pluginName, {
      'ESCAPE': 'close',
    });

    if (this.options.get('deepLink') && window.location.hash === (`#${this.element.id}`)) {
      Core.load(this.open.bind(this));
    }
  }

  /**
   * Opens the Modal and closes all others by default.
   * @fires Modal#closeme
   * @fires Modal#opened
   */
  public open(): void {
    /**
     * Fires immediately before the modal opens.
     * Closes any other Modals that are currently open
     * @event Modal#closeme
     */
    fire(this.element, 'closeme.base.modal', this.pluginId);

    this.isOpen = true;

    this.element.style.display = 'block';
    this.overlay.style.display = 'block';

    this.disableScrollbar();
    this.addModalEvents();

    if (this.options.get('deepLink')) {
      this.updateHistory();
    }

    /**
     * Fires when the Modal has successfully opened.
     * @event Modal#opened
     */
    fire(this.element, 'opened.base.modal');
  }

  /**
   * Closes the Modal
   * @fires Modal#closed
   */
  public close(): void {
    this.isOpen = false;
    this.element.style.display = 'none';
    this.overlay.style.display = 'none';

    this.enableScrollbar();
    this.removeModalEvents();

    if (this.options.get('deepLink')) {
      this.resetHistory();
    }

    /**
     * Fires when the modal is done closing.
     * @event Modal#closed
     */
    fire(this.element, 'closed.base.modal');
  }

  /**
   * Toggles the open/closed state of a modal.
   */
  public toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Adds event listeners for the Modal.
   * @private
   */
  private initCustomEvents(): void {
    on('open.base.trigger', this.element, this.open.bind(this));
    on('close.base.trigger', this.element, this.close.bind(this));
    on('toggle.base.trigger', this.element, this.toggle.bind(this));
  }

  /**
   * Adds event listeners for the overlay.
   * @private
   */
  private addModalEvents(): void {
    if (this.options.get('closeOnEsc')) {
      this.keyboardListener = (event) => {
        Keyboard.handleKey(event, this.pluginName, {
          close: this.close.bind(this),
        });
      };
      on('keydown', window, this.keyboardListener);
    }

    if (this.options.get('closeOnClick')) {
      this.overlayListener = (event) => {
        event.stopPropagation();
        if ((event.target as HTMLElement).closest('[data-base-plugin]') !== this.element) {
          this.close();
        }
      };
      on('click', this.overlay, this.overlayListener);
    }
  }

  /**
   * Removes global event listeners.
   * @private
   */
  private removeModalEvents() {
    if (this.options.get('closeOnEsc')) {
      off('keydown', window, this.keyboardListener);
    }

    if (this.options.get('closeOnClick')) {
      off('click', this.overlay, this.overlayListener);
    }
  }

  /**
   * Creates an overlay, which appears behind the Modal.
   * @private
   */
  private createOverlay(): void {
    this.overlay = createElement('div', <HTMLElementAttributes>{
      html: this.element,
      class: this.options.get('additionalOverlayClasses')
        ? `modal-overlay ${this.options.get('additionalOverlayClasses')}` : 'modal-overlay',
    });

    document.body.appendChild(this.overlay);
  }

  /**
   * Update or replace browser history
   * @private
   */
  private updateHistory(): void {
    const hash = `#${this.elementId}`;

    if (window.location.hash === hash) {
      return;
    }

    if (window.history.pushState) {
      window.history.pushState({}, '', hash);
    } else {
      window.location.hash = hash;
    }
  }

  /**
   * Remove the history hash
   * @private
   */
  private resetHistory(): void {
    if (window.history.replaceState) {
      const urlWithoutHash = window.location.pathname + window.location.search;
      window.history.replaceState('', document.title, urlWithoutHash);
    } else {
      window.location.hash = '';
    }
  }

  /**
   * Disables the scrollbar when Modal is shown.
   * @private
   */
  private disableScrollbar(): void {
    document.documentElement.setAttribute('style', 'overflow: hidden;');
  }

  /**
   * Enables the scroll when Modal closes.
   * @private
   */
  private enableScrollbar(): void {
    document.documentElement.setAttribute('style', 'overflow: auto;');
  }
}
