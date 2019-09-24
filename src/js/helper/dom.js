var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
/**
 *
 * @param {string} selectors
 * @param {HTMLElement | Document} node
 * @returns {Element}
 */
export function $(selectors, node = document) {
    return node.querySelector(selectors);
}
/**
 *
 * @param {string} selectors
 * @param {HTMLElement | Document} node
 * @returns {NodeListOf<Element>}
 */
export function $$(selectors, node = document) {
    return node.querySelectorAll(selectors);
}
/**
 * Creates an HTML element specified by tag name and sets attributes by a passed object.
 * @param {string} tagName
 * @param {HTMLElementAttributes} attributes
 */
export function createElement(tagName, attributes) {
    const element = document.createElement(tagName);
    const { html, text } = attributes, filteredAttributes = __rest(attributes, ["html", "text"]);
    if (html) {
        element.appendChild(html);
    }
    else {
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
/**
 *
 * @param element
 */
export function getDimensions(element) {
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
export function outViewport(element) {
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
