import chai from 'chai';
import {Dropdown} from '../../../src/js_old/plugins';
import {fire} from '../../../src/js_old/helper';

const assert = chai.assert;

describe('Dropdown', function () {
  let dropdownElement;
  let dropdownOpenButton;
  let dropdownCloseButton;
  let dropdownToggleButton;

  let dropdown1;

  before(function () {
    dropdownElement = document.createElement('div');
    dropdownElement.id = 'dropdown1';
    dropdownElement.style.display = 'none';
    document.body.appendChild(dropdownElement);

    dropdownOpenButton = document.createElement('a');
    dropdownOpenButton.setAttribute('data-open', 'dropdown1');
    document.body.appendChild(dropdownOpenButton);

    dropdownCloseButton = document.createElement('a');
    dropdownCloseButton.setAttribute('data-close', 'dropdown1');
    document.body.appendChild(dropdownCloseButton);

    dropdownToggleButton = document.createElement('a');
    dropdownToggleButton.setAttribute('data-toggle', 'dropdown1');
    document.body.appendChild(dropdownToggleButton);

    dropdown1 = new Dropdown(dropdownElement);
  });

  after(function () {
    dropdownElement.remove();
    dropdownOpenButton.remove();
    dropdownCloseButton.remove();
    dropdownToggleButton.remove();
  });

  describe('open()', function () {
    it('should open dropdown', function () {
      dropdown1.currentAnchor = dropdownElement;
      dropdown1.open();

      assert.equal(dropdown1.isOpen, true);
      assert.equal(dropdownElement.style.display, 'block');
    });
  });

  describe('close()', function () {
    it('should close dropdown', function () {
      dropdown1.currentAnchor = dropdownElement;

      dropdown1.open();
      dropdown1.close();

      assert.equal(dropdown1.isOpen, false);
      assert.equal(dropdownElement.style.display, 'none');
    });
  });

  describe('toggle()', function () {
    it('should toggle dropdown', function () {
      dropdown1.currentAnchor = dropdownElement;

      dropdown1.toggle();
      assert.equal(dropdown1.isOpen, true);
      assert.equal(dropdownElement.style.display, 'block');

      dropdown1.toggle();
      assert.equal(dropdown1.isOpen, false);
      assert.equal(dropdownElement.style.display, 'none');
    });
  });

  describe('_initEvents()', function () {
    it('should open on "open.base.trigger" event', function () {
      dropdown1.currentAnchor = dropdownElement;

      fire(dropdownElement, 'open.base.trigger');
      assert.equal(dropdown1.isOpen, true);
      assert.equal(dropdownElement.style.display, 'block');
    });

    it('should close on "close.base.trigger" event', function () {
      dropdown1.currentAnchor = dropdownElement;

      fire(dropdownElement, 'close.base.trigger');
      assert.equal(dropdown1.isOpen, false);
      assert.equal(dropdownElement.style.display, 'none');
    });

    it('should toggle on "toggle.base.trigger" event', function () {
      dropdown1.currentAnchor = dropdownElement;

      fire(dropdownElement, 'toggle.base.trigger');
      assert.equal(dropdown1.isOpen, true);
      assert.equal(dropdownElement.style.display, 'block');
      fire(dropdownElement, 'toggle.base.trigger');
      assert.equal(dropdown1.isOpen, false);
      assert.equal(dropdownElement.style.display, 'none');
    });
  });

  describe('_initMouseEvents()', function () {
    it('should listen on mouse events', function () {
      // const dropdown1 = new Dropdown(dropdownElement, { hover: true });
      // dropdown1.currentAnchor = dropdownElement;
      //
      // fire(dropdownOpenButton, 'mouseenter');
      // assert.equal(dropdown1.isOpen, true);
      // assert.equal(dropdownElement.style.display, 'block');
    });
  });
});


