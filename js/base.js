import { BaseCore } from './base.core';
import { Dropdown } from './plugins/base.dropdown';
import { DropdownMenu } from './plugins/base.dropdown-menu';
import { Toggler } from './plugins/base.toggler';

const Base = window.Base = new BaseCore();

Base.plugin(Dropdown);
Base.plugin(DropdownMenu);
Base.plugin(Toggler);

Base.init();
