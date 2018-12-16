import { BasePlugin } from '../base.plugin';

class Dropdown extends BasePlugin {

  constructor(element, options) {
    super(element, options);
    this.element = element;
    this.parentElement = this.element.parentElement;
    this.events();
  }

  events() {
    this.parentElement.addEventListener('mouseenter', this.mouseenter.bind(this));
    this.parentElement.addEventListener('mouseleave', this.mouseleave.bind(this));
  }

  mouseenter() {
    this.parentElement.classList.add('is-opened');
    this.reposition();
  }

  mouseleave() {
    this.parentElement.classList.remove('is-opened');
  }

  /**
   * Adjusts the positionable possible position
   * @todo Create a class Positionable...
   */
  reposition() {
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

export { Dropdown };
