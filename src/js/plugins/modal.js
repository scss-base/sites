import { $ } from '../utilities/dom';
import Plugin from './plugin';
import { Triggers } from '../utilities';

/**
 * Modal module
 */
export default class Modal extends Plugin {

  /**
   *
   * @param element
   * @param [options]
   */
  constructor(element, options) {
    super(element, options);

    this.overlay = $('#modal-overlay');
    this.isActive = false;

    this._createOverlay();
    this._moveElement();
    this._bindEvents();

    Triggers.init();
  }

  /**
   * Gets the class name
   *
   * @returns {string}
   */
  get className() {
    return 'Modal';
  }

  /**
   * @param {boolean} hidden
   */
  set isActive(hidden) {
    this._active = hidden;
  }

  /**
   * @returns {boolean}
   */
  get isActive() {
    return this._active;
  }

  close() {
    this.isActive = false;
    this._removeHistoryHash();

    this.element.style.display = 'none';
    this.overlay.style.display = 'none';

    this.element.trigger('close.base.modal');
  }

  open() {
    this.isActive = true;
    this._createHistoryHash();

    this.element.style.display = 'block';
    this.overlay.style.display = 'block';

    this.element.trigger('open.base.modal');
  }

  toggle() {
    if (this.isActive) {
      this.close();
    } else {
      this.open();
    }
  }

  _bindEvents() {
    this.element.on('open.base.trigger', this.open.bind(this), false);
    this.element.on('close.base.trigger', this.close.bind(this), false);
    this.element.on('toggle.base.trigger', this.toggle.bind(this), false);

    /*
    this.on('closeme.modal', () => {
      this.element.style.display = 'none';
    }, false, document);
    */
  }

  _createOverlay() {
    if (!this.overlay) {
      this.overlay = document.createElement('div');
      this.overlay.setAttribute('id', 'modal-overlay');
      $('body').appendChild(this.overlay);
    }
  }

  _moveElement() {
    if (this.element) {
      this.overlay.appendChild(this.element);
    }
  }

  _createHistoryHash() {
    const hash = `#${this.id}`;

    if (window.location.hash === hash) {
      return;
    }

    if (window.history.pushState) {
      window.history.pushState({}, '', hash);
    } else {
      window.location.hash = hash;
    }
  }

  _removeHistoryHash() {
    const hash = `#${this.id}`;

    if (window.location.hash === hash) {
      return;
    }

    if (window.history.replaceState) {
      const urlWithoutHash = window.location.pathname + window.location.search
      window.history.replaceState('', document.title, urlWithoutHash);
    } else {
      window.location.hash = '';
    }
  }
}
