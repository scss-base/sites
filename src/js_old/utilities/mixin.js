/**
 * @see http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
 */
class MixinBuilder {
  constructor(superclass) {
    this.superclass = superclass;
  }

  with(...mixins) {
    return mixins.reduce((c, mixin) => mixin(c), this.superclass);
  }
}

export const mix = superclass => new MixinBuilder(superclass);
