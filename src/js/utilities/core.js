export default class Core {

  /**
   * Run event after the DOM is ready
   * @param {Function} fn - Callback function
   * @returns {*}
   */
  static ready(fn) {
    // Sanity check
    if (typeof fn !== 'function') return;

    // If document is already loaded, run method
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      return fn();
    }

    // Otherwise, wait until document is loaded
    document.addEventListener('DOMContentLoaded', fn, false);
  }
}
