export function fire(element: HTMLElement, event: string, detail: any) {
  return element.dispatchEvent(
    new CustomEvent(event, {
      bubbles: true,
      cancelable: true,
      detail: detail
    })
  );
}

export function off(event, element, fn: () => any, capture = false) {

}

export function on(event, element, fn: () => any, capture = false) {

}
