/**
 *
 * @param selectors
 * @param scope
 * @returns {HTMLElement}
 */
const $ = (selectors, scope) => scope ? scope.querySelector(selectors) : document.querySelector(selectors);

/**
 *
 * @param selectors
 * @param scope
 * @returns {NodeList}
 */
const $$ = (selectors, scope) => scope ? scope.querySelectorAll(selectors) : document.querySelectorAll(selectors);

export {
  $,
  $$,
};
