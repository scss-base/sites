import BasePlugin from '../base.plugin';
import { $ } from '../utilities/base.dom';

/**
 * Modal module
 */
export default class Modal extends BasePlugin {

  /**
   *
   * @param element
   * @param [options]
   */
  constructor(element, options) {
    super(element, options);
    this.modal = element;
    this.overlay = $('#modal-overlay');
    this.isHidden = true;

    if (!this.overlay) {
      this._createOverlay();
    }
  }

  /**
   * @returns {string}
   */
  static get name () {
    return 'modal';
  }

  /**
   * @param {boolean} hidden
   */
  set isHidden (hidden) {
    this._hidden = hidden;
  }

  /**
   * @returns {boolean}
   */
  get isHidden () {
    return this._hidden;
  }

  close() {
    this.modal.style.display = this.overlay.style.display = 'none';
    this.isHidden = true;
  }

  open() {
    this.modal.style.display = this.overlay.style.display = 'block';
    this.isHidden = false;
  }

  toggle() {
    this.isHidden ? this.open() : this.close();
  }

  _bindEvents() {

  }

  _createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.setAttribute('id', 'modal-overlay');
    this.overlay.appendChild(this.modal);
    $('body').appendChild(this.overlay);
  }
}
