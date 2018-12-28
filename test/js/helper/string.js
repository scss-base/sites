import chai from 'chai';
import { camelCase, capitalize, kebabCase, pascalCase, random, snakeCase } from '../../../src/js/helper';

chai.should();

describe('String', function () {
  describe('camelCase()', function () {
    it('should return a camel cased string', function () {
      camelCase('foo bar').should.be.a('string');
      chai.assert.equal(camelCase('foo bar'), 'fooBar');
      chai.assert.equal(camelCase('Foo Bar'), 'fooBar');
      chai.assert.equal(camelCase('fooBar'), 'fooBar');
      chai.assert.equal(camelCase('FooBar'), 'fooBar');
      chai.assert.equal(camelCase('--foo-bar--'), 'fooBar');
      chai.assert.equal(camelCase('__FOO_BAR__'), 'fooBar');
      chai.assert.equal(camelCase('!--foo-¿?-bar--121-**%'), 'fooBar121');
    });
  });

  describe('capitalize()', function () {
    it('should return a pascal cased string', function () {
      chai.assert.equal(capitalize('FOO'), 'Foo');
    });
  });

  describe('kebabCase()', function () {
    it('should return a kebab cased string', function () {
      kebabCase('foo bar').should.be.a('string');
      chai.assert.equal(kebabCase('foo bar'), 'foo-bar');
      chai.assert.equal(kebabCase('Foo Bar'), 'foo-bar');
      chai.assert.equal(kebabCase('fooBar'), 'foo-bar');
      chai.assert.equal(kebabCase('FooBar'), 'foo-bar');
      chai.assert.equal(kebabCase('--foo-bar--'), 'foo-bar');
      chai.assert.equal(kebabCase('__FOO_BAR__'), 'foo-bar');
      chai.assert.equal(kebabCase('!--foo-¿?-bar--121-**%'), 'foo-bar-121');
    });
  });

  describe('pascalCase()', function () {
    it('should return a pascal cased string', function () {
      pascalCase('foo bar').should.be.a('string');
      chai.assert.equal(pascalCase('foo bar'), 'FooBar');
      chai.assert.equal(pascalCase('Foo Bar'), 'FooBar');
      chai.assert.equal(pascalCase('FooBar'), 'FooBar');
      chai.assert.equal(pascalCase('FooBar'), 'FooBar');
      chai.assert.equal(pascalCase('--foo-bar--'), 'FooBar');
      chai.assert.equal(pascalCase('__FOO_BAR__'), 'FooBar');
      chai.assert.equal(pascalCase('!--foo-¿?-bar--121-**%'), 'FooBar121');
    });
  });

  describe('random()', function () {
    it('generates a random ID matching a given length', function () {
      const id = random(6);

      id.should.be.a('string');
      id.should.have.lengthOf(6);
    });

    it('can append a namespace to the number', function () {
      var id = random(6, 'plugin');

      id.should.be.a('string');
      id.should.have.lengthOf(6 + 'plugin-'.length);
      id.should.contain('plugin-');
    });
  });

  describe('snakeCase()', function () {
    it('should return a snake cased string', function () {
      snakeCase('foo bar').should.be.a('string');
      chai.assert.equal(snakeCase('foo bar'), 'foo_bar');
      chai.assert.equal(snakeCase('Foo Bar'), 'foo_bar');
      chai.assert.equal(snakeCase('fooBar'), 'foo_bar');
      chai.assert.equal(snakeCase('FooBar'), 'foo_bar');
      chai.assert.equal(snakeCase('--foo-bar--'), 'foo_bar');
      chai.assert.equal(snakeCase('__FOO_BAR__'), 'foo_bar');
      chai.assert.equal(snakeCase('!--foo-¿?-bar--121-**%'), 'foo_bar_121');
    });
  });
});


