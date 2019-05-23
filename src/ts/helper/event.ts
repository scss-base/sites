export function fire(element: HTMLElement, event: string, detail?: any) {
  return element.dispatchEvent(
    new CustomEvent(event, <CustomEventInit>{
      bubbles: true,
      cancelable: true,
      detail: detail
    })
  );
}

export function off(type: string, element: Element, listener: EventListener, capture?: boolean): void {
  element.removeEventListener(type, listener, <EventListenerOptions>{ capture });
}

export function on(
  type: string,
  element: Element,
  listener: EventListener,
  capture?: boolean,
  once?: boolean,
  passive?: boolean
): void {
  element.addEventListener(type, listener, <AddEventListenerOptions>{ capture, once, passive });
}
