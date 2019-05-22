import Plugin from './plugin';

export default class Positionable extends Plugin {
  /**
   * @param element
   * @returns {{top: number, offset: {top: number, left: number}, left: number, width: number, height: number}}
   */
  getDimensions(element) {
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

  /**
   * @param element
   * @returns {{top: number, left: number, bottom: number, right: number}}
   */
  outViewport(element) {
    const elementDims = this.getDimensions(element);

    let top = elementDims.offset.top - window.pageYOffset;
    let bottom = (window.innerHeight + window.pageYOffset) - (elementDims.offset.top + elementDims.height);
    let left = elementDims.offset.left - window.pageXOffset;
    let right = window.innerWidth - (elementDims.offset.left + elementDims.width);


    top = Math.min(top, 0);
    bottom = Math.min(bottom, 0);
    left = Math.min(left, 0);
    right = Math.min(right, 0);

    return { top, bottom, left, right };
  }
}
