import { $$, fire, on } from '../helper';
import Positionable from './positionable';

export default class DropdownMenu extends Positionable {

  constructor(element, options = new Map()) {
    super(element);

    this.pluginName = 'DropdownMenu';
    this.defaults = new Map(Object.entries({}));

    this.options = this.defaults;
    this.options = options;
    this.options = this.getOptionsFromElement();

    this.subs = $$('li > ul', this.element);

    this._init();
  }

  open(sub, anchor) {
    anchor.classList.add('is-opened');
    this._setPosition(sub, anchor);
    fire(this.element, 'open.base.dropdown-menu');
  }

  close(anchor) {
    anchor.classList.remove('is-opened');
    fire(this.element, 'closed.base.dropdown-menu');
  }

  _init() {
    this.subs.forEach(sub => {
      const anchor = sub.closest('li');

      anchor.classList.add('has-submenu');
      this._initMouseEvents(sub, anchor);
    });
  }

  _initMouseEvents(sub, anchor) {
    on('mouseenter', anchor, this.open.bind(this, sub, anchor));
    on('mouseleave', anchor, this.close.bind(this, anchor));
  }

  _setPosition(sub, anchor) {
    const out = this.outViewport(sub);

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
