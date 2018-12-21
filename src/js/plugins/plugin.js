export default class Plugin {

  /**
   *
   * @param element
   * @param [options]
   */
  constructor(element, options) {
    this.element = element;
  }

  emit(type, detail, scope) {
    const event = new CustomEvent(type, { detail });
    scope ? scope.dispatchEvent(event) : this.element.dispatchEvent(event);
    return this;
  }

  on(type, fn, options, scope) {
    scope ? scope.addEventListener(type, fn, options) : document.addEventListener(type, fn, options);
    return this;
  }

  off(type, fn, options, scope) {
    scope ? scope.removeEventListener(type, fn, options) : document.removeEventListener(type, fn, options);
    return this;
  }
}
