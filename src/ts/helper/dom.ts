/**
 *
 * @param {string} selectors
 * @param {HTMLElement | Document} node
 * @returns {Element}
 */
export function $(selectors: string, node: HTMLElement | Document =  document): HTMLElement {
  return node.querySelector(selectors);
}

/**
 *
 * @param {string} selectors
 * @param {HTMLElement | Document} node
 * @returns {NodeListOf<Element>}
 */
export function $$(selectors: string, node: HTMLElement | Document =  document): NodeListOf<HTMLElement> {
  return node.querySelectorAll(selectors);
}

export interface HTMLElementAttributes {
  html?: HTMLElement;
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
  const { html, text, ...filteredAttributes } = attributes;

  if (html) {
    element.appendChild(html);
  } else {
    element.innerHTML = text ? text : null;
  }

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

export interface DimensionsRect {
  height: number;
  width: number;
  readonly top: number;
  readonly left: number;
  offset: {
    readonly top: number;
    readonly left: number;
  }
}

/**
 *
 * @param element
 */
export function getDimensions(element: HTMLElement): DimensionsRect {
  const elementRect = element.getBoundingClientRect();

  return {
    width: elementRect.width,
    height: elementRect.height,
    top: elementRect.top,
    left: elementRect.left,
    offset: {
      top: elementRect.top + window.pageYOffset,
      left: elementRect.left + window.pageXOffset
    }
  };
}

export function outViewport(element: HTMLElement): any {
  const elementRect = getDimensions(element);

  let top = elementRect.offset.top - window.pageYOffset;
  let bottom = (window.innerHeight + window.pageYOffset) - (elementRect.offset.top + elementRect.height);
  let left = elementRect.offset.left - window.pageXOffset;
  let right = window.innerWidth - (elementRect.offset.left + elementRect.width);


  top = Math.min(top, 0);
  bottom = Math.min(bottom, 0);
  left = Math.min(left, 0);
  right = Math.min(right, 0);

  return { top, bottom, left, right };
}
