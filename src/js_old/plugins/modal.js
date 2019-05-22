import Plugin from './plugin';
import { fire, off, on } from '../helper';
// import { Keyboard, Triggers } from '../utilities';
import { Triggers } from '../utilities';

/**
 * Modal module.
 * @module Modal
 * @extends Plugin
 * @requires $
 * @requires Keyboard
 * @requires Triggers
 */
export default class Modal extends Plugin {
  /**
   * Creates a new instance of Modal.
   * @param {HTMLElement} element - HTMLElement object to use for the modal.
   * @param {Object} options - optional parameters.
   */
  constructor(element, options = new Map()) {
    super(element, options);

    this.pluginName = 'Modal';
    this.defaults = new Map(Object.entries({

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
     * @type {Map<string, function>}
     * @private
     */
    this._globalListeners = new Map();
    this.options = this.defaults;
    this.options = options;
    this.options = this.getOptionsFromElement();

    this.isOpen = false;

    this._createOverlay();
    this._initCustomEvents();

    Triggers.init();
    // Keyboard.register('Modal', {
    //   'ESCAPE': 'close',
    // });
  }

  /**
   * Opens the Modal and closes all others by default.
   * @fires Modal#closeme
   * @fires Modal#open
   */
  open() {
    /**
     * Fires immediately before the modal opens.
     * Closes any other Modals that are currently open
     * @event Modal#closeme
     */
    fire(this.element, 'closeme.base.modal', this.pluginId);

    this.isOpen = true;

    this.element.style.display = 'block';
    this.overlay.style.display = 'block';

    this._disableScrollbar();
    // this._updateHistory();
    this._addModalEvents();

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
  close() {
    this.isOpen = false;
    this.element.style.display = 'none';
    this.overlay.style.display = 'none';

    this._enableScrollbar();
    // this._resetHistory();
    this._removeModalEvents();

    /**
     * Fires when the modal is done closing.
     * @event Modal#closed
     */
    fire(this.element, 'closed.base.modal');
  }

  /**
   * Toggles the open/closed state of a modal.
   */
  toggle() {
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
  _initCustomEvents() {
    on('open.base.trigger', this.element, this.open.bind(this));
    on('close.base.trigger', this.element, this.close.bind(this));
    on('toggle.base.trigger', this.element, this.toggle.bind(this));
  }

  /**
   * Adds global event listeners.
   * @private
   */
  _addModalEvents() {
    // if (this.options.get('closeOnEsc')) {
    //   this._globalListeners.set('keydown.modal', this._keyDownListener.bind(this));
    //   on('keydown', this._globalListeners.get('click.overlay'));
    // }

    if (this.options.get('closeOnClick')) {
      this._globalListeners.set('click.overlay', this._clickOverlayListener.bind(this));
      on('click', this.overlay, this._globalListeners.get('click.overlay'));
    }
  }

  /**
   * Removes global event listeners.
   * @private
   */
  _removeModalEvents() {
    // if (this.options.get('closeOnEsc')) {
    //   off('keydown', this._globalListeners.get('keydown.modal'));
    //   this._globalListeners.delete('keydown.modal');
    // }

    if (this.options.get('closeOnClick')) {
      off('click', this.overlay, this._globalListeners.get('keydown.modal'));
      this._globalListeners.delete('click.overlay');
    }
  }

  /**
   * @param event
   * @private
   */
  // _keyDownListener(event) {
  //   Keyboard.handleKey(event, 'Modal', {
  //     close: () => this.close(),
  //   });
  // }

  /**
   * Creates an overlay, which appears behind the Modal.
   * @private
   */
  _createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.setAttribute(
      'class',
      this.options.get('additionalOverlayClasses') ?
        `modal-overlay ${this.options.get('additionalOverlayClasses')}` : 'modal-overlay'
    );
    this.overlay.appendChild(this.element);
    document.body.appendChild(this.overlay);
  }

  /**
   * @param event
   * @private
   */
  _clickOverlayListener(event) {
    event.stopPropagation();
    if (event.target.closest('[data-base-plugin]') !== this.element) {
      this.close();
    }
  }

  /**
   * @private
   */
  _updateHistory() {
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
  _resetHistory() {
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
  _disableScrollbar() {
    document.documentElement.setAttribute('style', 'overflow: hidden;');
  }

  /**
   * Enables the scroll when Modal closes.
   * @private
   */
  _enableScrollbar() {
    document.documentElement.setAttribute('style', 'overflow: auto;');
  }
}
