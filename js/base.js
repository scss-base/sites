import { BaseCore } from './base.core';
import { Dropdown } from './plugins/base.dropdown';

const Base = new BaseCore();

Base.plugin(Dropdown, 'Dropdown');

Base.init();
