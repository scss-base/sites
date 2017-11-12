import { BaseCore } from './base.core';
import { Dropdown } from './plugins/base.dropdown';
import { DropdownMenu } from './plugins/base.dropdown-menu';
import { Toggler } from './plugins/base.toggler';
import { Trigger } from './utilities/base.trigger';

const Base = window.Base = new BaseCore();
Base.plugin(Dropdown);
Base.plugin(DropdownMenu);
Base.plugin(Toggler);
Base.plugin(Trigger);

Base.init();
