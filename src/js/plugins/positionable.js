import Plugin from './plugin';

export default class Positionable extends Plugin {
  getDimensions(element) {
    if (element === window || element === document) {
      throw new TypeError('An error has occurred, so that the machine cannot continue the job.');
    }

    const elementRect = element.getBoundingClientRect();

    const windowY = window.pageYOffset;
    const windowX = window.pageXOffset;

    return {
      width: elementRect.width,
      height: elementRect.height,
      top: elementRect.top,
      left: elementRect.left,
      offset: {
        top: elementRect.top + windowY,
        left: elementRect.left + windowX
      },
    };
  }
}
