import chai from 'chai';
import Positionable from '../../../src/js/plugins/positionable';

const expect = chai.expect;

describe('Positionable', function () {
  let dropdownElement;

  before(function () {
    dropdownElement = document.createElement('div');
    dropdownElement.id = 'dropdown1';
    dropdownElement.style.display = 'none';
    document.body.appendChild(dropdownElement);
  });

  after(function () {
    dropdownElement.remove();
  });

  describe('getDimensions()', function () {
    it('should throw error', function () {
      const dropdown1 = new Positionable(dropdownElement);
      expect(dropdown1.getDimensions.bind(dropdown1, window)).to.throw(TypeError);
      expect(dropdown1.getDimensions.bind(dropdown1, dropdownElement)).to.not.throw(TypeError);
    });
  });
});


