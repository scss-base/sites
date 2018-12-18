import BaseCore from './base.core';
import Dropdown from './plugins/base.dropdown';
import DropdownMenu from './plugins/base.dropdown-menu';
import Toggler from './plugins/base.toggler';

// import { Trigger } from './utilities/base.trigger';
// import { Emitter } from './utilities/base.emitter';

const Base = window.Base = new BaseCore();

Base.plugin(Dropdown);
Base.plugin(DropdownMenu);
Base.plugin(Toggler);
// Base.plugin(Emitter);

Base.init();
Base.ready(() => {
  // new Trigger();

  // let emitter = new Base.Emitter();


  // // let emitter2 = new Base.Emitter();
  // //
  // emitter.on('test', data => {
  //   console.log('data', data);
  // });
  // //
  // //
  // // emitter2.on('test', data => {
  // //   console.log('data2', data);
  // // });
  // //
  // emitter.emit('test', 'testdata');
  // // emitter2.emit('test', 'testdata2');
  //
  // console.log(emitter);
  // console.log(emitter2);

});
