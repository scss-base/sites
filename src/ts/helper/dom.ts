/**
 *
 * @param {string} selectors
 * @param {Element} node
 * @returns {Element}
 */
export function $(selectors: string, node?: Element): Element {
  return node ? node.querySelector(selectors) : document.querySelector(selectors);
}

/**
 *
 * @param {string} selectors
 * @param {Element} node
 * @returns {NodeListOf<Element>}
 */
export function $$(selectors: string, node?: Element): NodeListOf<Element> {
  return node ? node.querySelectorAll(selectors) : document.querySelectorAll(selectors);
}

export interface HTMLElementAttributes {
  text?: string;
  id?: string;
  class?: string | string[];
}

/**
 * Creates an HTML element specified by tag name and sets attributes by a passed object.
 * @param {string} tagName
 * @param {HTMLElementAttributes} attributes
 */
export function createElement(tagName: string, attributes: HTMLElementAttributes): HTMLElement {
  const element = document.createElement(tagName);
  const { text, ...filteredAttributes } = attributes;

  element.innerHTML = text ? text : null;

  for (const attributeName in filteredAttributes) {
    if (filteredAttributes.hasOwnProperty(attributeName)) {
      let attributeValue = filteredAttributes[attributeName];

      if (Array.isArray(attributeValue)) {
        attributeValue = attributeValue.join(' ');
      }

      element.setAttribute(attributeName, attributeValue);
    }
  }

  return element;
}
