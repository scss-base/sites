import Plugin from './plugin';

export default class Dropdown extends Plugin {

  constructor(element, options) {
    super(element, options);
    this.parentElement = this.element.parentElement;
    this._bindEvents();

  }

  /**
   * @returns {string}
   */
  static get className() {
    return 'Dropdown';
  }

  _bindEvents() {
    this.on('mouseenter', this._mouseenter.bind(this), false, this.parentElement);
    this.on('mouseleave', this._mouseleave.bind(this), false, this.parentElement);
  }

  _mouseenter() {
    this.parentElement.classList.add('is-opened');
    this._reposition();
  }

  _mouseleave() {
    this.parentElement.classList.remove('is-opened');
  }

  /**
   * Adjusts the positionable possible position
   * @todo Create a class Positionable...
   */
  _reposition() {
    const menuRect = this.element.getBoundingClientRect();
    const menuLeft = menuRect.left + document.body.scrollLeft;
    const menuTop = menuRect.top + document.body.scrollTop;
    const menuHeight = this.element.offsetHeight;
    const menuWidth = this.element.offsetWidth;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    const horizontalCheck = (menuLeft > 0 && menuLeft + menuWidth < windowWidth);
    const verticalCheck = (menuTop > 0 && menuTop + menuHeight < windowHeight);

    if (!horizontalCheck) {
      this.parentElement.classList.toggle('js-reposition-right');
    }

    if (!verticalCheck) {
      this.parentElement.classList.toggle('js-reposition-up');
    }
  }
}
