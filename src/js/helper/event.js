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
export function on(type, element, listener, capture) {
    element.addEventListener(type, listener, { capture });
}
function composeListener(type, element, listener, capture) {
    return function listenerFn(event) {
        listener(event);
        element.removeEventListener(type, listenerFn, { capture });
    };
}
export function one(type, element, listener, capture) {
    element.addEventListener(type, composeListener(type, element, listener, capture), { capture });
}
