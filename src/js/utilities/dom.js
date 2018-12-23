/**
 * Execute all handlers and behaviors attached to the matched elements for the given event type.
 *
 * @param {String} type
 * @param {*} detail
 */
HTMLElement.prototype.trigger = function (type, detail = null) {
  const event = new CustomEvent(type, { detail });
  this.dispatchEvent(event);

  return this;
};

/**
 * Attach an event handler function for one or more events to the selected elements.
 *
 * @param {String} type
 * @param fn
 * @param options
 */
HTMLElement.prototype.on = function (type, fn, options) {
  this.addEventListener(type, fn, options);

  return this;
};

/**
 * Remove an event handler.
 *
 * @param type
 * @param fn
 * @param options
 */
HTMLElement.prototype.off = function (type, fn, options) {
  this.removeEventListener(type, fn, options);

  return this;
};

/**
 *
 * @param selectors
 * @param node
 * @returns {Element}
 */
export const $ = (selectors, node) => node ? node.querySelector(selectors) : document.querySelector(selectors);

/**
 *
 * @param selectors
 * @param node
 * @returns {NodeListOf<Element>}
 */
export const $$ = (selectors, node) => node ? node.querySelectorAll(selectors) : document.querySelectorAll(selectors);
