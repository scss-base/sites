import { createElement, fire, HTMLElementAttributes, on } from "../helper";
import { Triggers } from "../utility";
import { Plugin } from './plugin';

export class Modal extends Plugin {
  private isOpen: boolean;
  private overlay: HTMLElement;
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

    // /**
    //  * Allows the modal to close if the user presses the `ESCAPE` key.
    //  * @option
    //  * @type {boolean}
    //  * @default true
    //  */
    // closeOnEsc: true,

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
    super('Modal', element);

    this.setOptions(options, this.defaults);

    this.isOpen = false;

    this.createOverlay();
    this.initCustomEvents();

    Triggers.init();
  }

  /**
   * Opens the Modal and closes all others by default.
   * @fires Modal#closeme
   * @fires Modal#open
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
    // this._updateHistory();
    this.addModalEvents();

    /**
     * Fires when the Modal has successfully opened.
     * @event Modal#open
     */
    fire(this.element, 'open.base.modal');
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
    // this._resetHistory();
    this.removeModalEvents();

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
    // if (this.options.get('closeOnEsc')) {
    //   this._globalListeners.set('keydown.modal', this._keyDownListener.bind(this));
    //   on('keydown', this._globalListeners.get('click.overlay'));
    // }

    if (this.options.get('closeOnClick')) {
      console.log('closeOnClick', 'on');
      // this._globalListeners.set('click.overlay', this._clickOverlayListener.bind(this));
      // on('click', this.overlay, this._globalListeners.get('click.overlay'));
    }
  }

  /**
   * Removes global event listeners.
   * @private
   */
  private removeModalEvents() {
    // if (this.options.get('closeOnEsc')) {
    //   off('keydown', this._globalListeners.get('keydown.modal'));
    //   this._globalListeners.delete('keydown.modal');
    // }

    if (this.options.get('closeOnClick')) {
      console.log('closeOnClick', 'off');
      // off('click', this.overlay, this._globalListeners.get('keydown.modal'));
      // this._globalListeners.delete('click.overlay');
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
   * @private
   */
  private clickOverlayListener(event): void {
    event.stopPropagation();

    if (event.target.closest('[data-base-plugin]') !== this.element) {
      this.close();
    }
  }

  /**
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
