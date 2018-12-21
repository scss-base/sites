import Plugin from './plugin';
import { Dropdown } from './index';
import { $$ } from '../utilities/dom';

export default class DropdownMenu extends Plugin {

  constructor(element, options) {
    super(element, options);
    this._find();
  }

  /**
   * @returns {string}
   */
  static get className() {
    return 'DropdownMenu';
  }

  _find() {
    this.submenus = $$('li > ul', this.element);
    this.submenus.forEach(submenu => {
      new Dropdown(submenu);
    });
  }
}
