import { $ } from '../utilities/dom';
import Plugin from './plugin';

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
    this.isHidden = true;

    this._createOverlay();
    this._bindEvents();
  }

  /**
   * @returns {string}
   */
  static get className() {
    return 'Modal';
  }

  /**
   * @param {boolean} hidden
   */
  set isHidden(hidden) {
    this._hidden = hidden;
  }

  /**
   * @returns {boolean}
   */
  get isHidden() {
    return this._hidden;
  }

  close() {
    this.emit('close.modal');
    this.element.style.display = this.overlay.style.display = 'none';
    this.isHidden = true;
  }

  open() {
    this.emit('closeme.modal', null, document);
    this.emit('open.modal');
    this.element.style.display = this.overlay.style.display = 'block';
    this.isHidden = false;
  }

  toggle() {
    this.isHidden ? this.open() : this.close();
  }

  _bindEvents() {
    this.on('closeme.modal', () => {
      this.element.style.display = 'none';
    }, false, document);
  }

  _createOverlay() {
    if (!this.overlay) {
      this.overlay = document.createElement('div');
      this.overlay.setAttribute('id', 'modal-overlay');
      $('body').appendChild(this.overlay);
    }

    if (this.element) {
      this.overlay.appendChild(this.element);
    }
  }
}
