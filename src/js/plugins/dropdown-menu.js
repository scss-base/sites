import { $$, fire, on } from '../helper';
import Positionable from './positionable';

export default class DropdownMenu extends Positionable {
  /**
   * @type {Map<string, *>}
   */
  defaults = new Map(Object.entries({}));

  constructor(element, options = new Map()) {
    super(element);
    this.pluginName = 'DropdownMenu';

    this.options = this.defaults;
    this.options = options;
    this.options = this.getOptionsFromElement();

    this.children = $$('li > ul', this.element);

    this._init();
  }

  open(child, anchor) {
    anchor.classList.add('is-opened');
    this._setPosition(child, anchor);
    fire(this.element, 'open.base.dropdown-menu');
  }

  close(anchor) {
    anchor.classList.remove('is-opened');
    fire(this.element, 'closed.base.dropdown-menu');
  }

  _init() {
    this.children.forEach(child => {
      const anchor = child.closest('li');

      anchor.classList.add('has-submenu');
      this._initMouseEvents(child, anchor);
    });
  }

  _initMouseEvents(child, anchor) {
    on('mouseenter', anchor, this.open.bind(this, child, anchor));
    on('mouseleave', anchor, this.close.bind(this, anchor));
  }

  _setPosition(child, anchor) {
    const out = this.outViewport(child);

    if (out.bottom < 0) {
      anchor.classList.remove('opens-down');
      anchor.classList.add('opens-up');
    }

    if (out.top < 0) {
      anchor.classList.remove('opens-up');
      anchor.classList.add('opens-down');
    }

    if (out.left < 0) {
      anchor.classList.remove('opens-left');
      anchor.classList.add('opens-right');
    }

    if (out.right < 0) {
      anchor.classList.remove('opens-right');
      anchor.classList.add('opens-left');
    }
  }
}
