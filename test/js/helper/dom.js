import chai from 'chai';
import { $, $$ } from '../../../src/js/helper';

chai.should();

describe('Dom', function () {

  let htmlDivElement1;
  let htmlDivElement2;

  before(function () {
    htmlDivElement1 = document.createElement('div');
    htmlDivElement1.id = 'div1';
    document.body.appendChild(htmlDivElement1);

    htmlDivElement2 = document.createElement('div');
    htmlDivElement2.id = 'div2';
    document.body.appendChild(htmlDivElement2);
  });

  after(function () {
    htmlDivElement1.remove();
    htmlDivElement2.remove();
  });

  describe('$()', function () {
    it('should return a element', function () {
      const div1 = $('#div1');
      const div2 = $('#div2', document);

      div1.should.be.an('HTMLDivElement');
      div2.should.be.an('HTMLDivElement');
    });
  });

  describe('$$()', function () {
    it('should return a node list of elements', function () {
      const divList1 = $$('div');
      const divList2 = $$('div', document);

      divList1.should.be.an('NodeList');
      divList2.should.be.an('NodeList');
    });
  });
});
