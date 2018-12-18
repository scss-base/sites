import BasePlugin from '../base.plugin';
import Dropdown from './base.dropdown';
import { $$ } from '../utilities/base.dom';

export default class DropdownMenu extends BasePlugin {

  constructor(element, options) {
    super(element, options);
    this.element = element;
    this.find();
  }

  find() {
    this.submenus = $$('li > ul', this.element);
    this.submenus.forEach(submenu => {
      new Dropdown(submenu);
    });
  }
}
