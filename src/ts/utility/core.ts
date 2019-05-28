import { on } from '../helper';

export class Core {

  /**
   * Run event after the DOM is ready
   * @param {Function} fn - Callback function
   */
  static ready(fn: any): void {
    // If document is already loaded, run method
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      return fn.apply();
    }

    // Otherwise, wait until document is loaded
    on('DOMContentLoaded', document, fn);
  }

  /**
   * Run event when the whole page has loaded, including all dependent resources such as stylesheets images
   * @param {Function} fn - Callback function
   */
  static load(fn: any): void {
    // If document is already loaded, run method
    if (document.readyState === 'complete') {
      return fn.apply();
    }

    // Otherwise, wait until window is loaded
    on('load', window, fn);
  }
}
