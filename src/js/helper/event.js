/**
 * Fires an event.
 * @param {String | HTMLElement} element - The element to dispatch the event to.
 * @param {String} event - The event type
 * @param detail
 * @returns {Boolean}
 */
export function fire(element, event, detail) {
  element = typeof element === 'string' ? document.querySelector(element) : element;
  return element.dispatchEvent(
    new CustomEvent(event, {
      bubbles: true,
      cancelable: true,
      detail: detail
    })
  );
}

/**
 * Removes an event listener.
 * @param {String} event - The event type
 * @param {Window | HTMLElement | Function | String} element - The element to remove the event to (optional, defaults to window)
 * @param {Function} fn - The callback that ran on the event
 * @param {Boolean} capture - If true, forces bubbling on non-bubbling events
 * @returns {Boolean}
 */
export function off(event, element, fn = undefined, capture = false) {
  if (typeof (element) === 'function') {
    capture = !!fn;
    fn = element;
    element = window;
  }

  element = typeof element === 'string' ? document.querySelector(element) : element;

  if (!element || typeof fn !== 'function') {
    return false;
  }

  element.addEventListener(event, fn, capture);
  return false;
}

/**
 * Adds an event listener.
 * @param {String} event - The event type
 * @param {Window | HTMLElement | Function | String} element - The element to attach the event to (optional, defaults to window)
 * @param {Function} fn - The callback to run on the event
 * @param {Boolean} capture - If true, forces bubbling on non-bubbling events
 * @returns {Boolean}
 */
export function on(event, element, fn = undefined, capture = false) {
  if (typeof (element) === 'function') {
    capture = !!fn;
    fn = element;
    element = window;
  }

  element = typeof element === 'string' ? document.querySelector(element) : element;

  if (!element || typeof fn !== 'function') {
    return false;
  }

  element.addEventListener(event, fn, capture);
  return true;
}
