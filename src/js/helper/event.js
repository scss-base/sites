export function fire(element, event, detail) {
    return element.dispatchEvent(new CustomEvent(event, {
        bubbles: true,
        cancelable: true,
        detail: detail
    }));
}
export function off(type, element, listener, capture) {
    element.removeEventListener(type, listener, { capture });
}
export function on(type, element, listener, capture, once, passive) {
    element.addEventListener(type, listener, { capture, once, passive });
}
