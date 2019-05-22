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
