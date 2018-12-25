// import { Triggers } from './utilities'
import { Dropdown, DropdownMenu, Modal, Toggler } from './plugins';
import { $ } from './utilities';

// Triggers.init();

window.Base = {
  Dropdown,
  DropdownMenu,
  Modal,
  Toggler,
};

const $modal1 = $('#modal1');
//$modal1.on('init.base.modal', () => {
//  console.log('init.base.modal1');
//});

const $modal1c = $('#modal1');
//$modal1c.on('init.base.modal', () => {
//  console.log('init.base.modal1c');
//});


const modal1 = new Base.Modal($modal1);

//modal1.open();
