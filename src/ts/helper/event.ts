export function fire(element: Window | Document | Element, event: string, detail?: any) {
  return element.dispatchEvent(
    new CustomEvent(event, <CustomEventInit>{
      bubbles: true,
      cancelable: true,
      detail: detail
    })
  );
}

export function off(
  type: string,
  element: Window | Document | Element,
  listener: EventListener,
  capture?: boolean
): void {
  element.removeEventListener(type, listener, <EventListenerOptions>{ capture });
}

export function on(
  type: string,
  element: Window | Document | Element,
  listener: EventListener,
  capture?: boolean
): void {
  element.addEventListener(type, listener, <AddEventListenerOptions>{ capture });
}

function composeListener(
  type: string,
  element: Window | Document | Element,
  listener: EventListener,
  capture?: boolean
): EventListener {
  return function listenerFn(event: Event) {
    listener(event);
    element.removeEventListener(type, listenerFn, <AddEventListenerOptions>{ capture });
  }
}

export function one(
  type: string,
  element: Window | Document | Element,
  listener: EventListener,
  capture?: boolean
): void {
  element.addEventListener(type, composeListener(type, element, listener, capture), <AddEventListenerOptions>{ capture });
}
