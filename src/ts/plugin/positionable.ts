import { getDimensions, outViewport } from '../helper';
import { Plugin } from './plugin';

export abstract class Positionable extends Plugin {
  public originalPosition: string;
  public originalAlignment: string;

  private parentElement: HTMLElement;
  private childElement: HTMLElement;

  public init(): void {
    this.originalPosition = this.options.get('position');
    this.originalAlignment = this.options.get('alignment');
  }

  public setPosition(parentElement: HTMLElement, childElement: HTMLElement): void {
    this.parentElement = parentElement;
    this.childElement = childElement;

    this.position();
    this.reposition();
  }

  private position(): void {
    const parentElementRect = getDimensions(this.parentElement);
    const childElementRect = getDimensions(this.childElement);

    let top: number;
    let left: number;

    switch (this.options.get('position')) {
      case 'top':
        top = childElementRect.offset.top - parentElementRect.height;
        left = childElementRect.offset.left;
        break;
      case 'left':
        top = childElementRect.offset.top;
        left = childElementRect.offset.left - parentElementRect.width;
        break;
      case 'right':
        top = childElementRect.offset.top;
        left = childElementRect.offset.left + childElementRect.width;
        break;
      default:
        top = childElementRect.offset.top + childElementRect.height;
        left = childElementRect.offset.left;
    }

    this.parentElement.style.top = `${top}px`;
    this.parentElement.style.left = `${left}px`;

    if (this.options.has('alignment')) {
      this.alignment();
    }
  }

  private reposition(): void {
    const out = outViewport(this.parentElement);

    if (Object.values(out).some(o => o < 0)) {
      const position = Object.keys(out).reduce((a, b) => out[a] < out[b] ? a : b);

      this.parentElement.classList.remove('top', 'bottom', 'left', 'right');

      switch (position) {
        case 'bottom':
          this.parentElement.classList.add('top');
          this.options.set('position', 'top');
          break;
        case 'top':
          this.parentElement.classList.add('bottom');
          this.options.set('position', 'bottom');
          break;
        case 'left':
          this.parentElement.classList.add('right');
          this.options.set('position', 'right');
          break;
        case 'right':
          this.parentElement.classList.add('left');
          this.options.set('position', 'left');
          break;
      }

      this.position();
    }
  }

  private alignment(): void {
    const parentElementRect = getDimensions(this.parentElement);
    const childElementRect = getDimensions(this.childElement);

    let hAlignmentOffset = 0;
    let vAlignmentOffset = 0;

    switch (this.options.get('alignment')) {
      case 'top':
        vAlignmentOffset = childElementRect.offset.top;
        break;
      case 'bottom':
        vAlignmentOffset = childElementRect.offset.top + childElementRect.height - parentElementRect.height;
        break;
      case 'left':
        hAlignmentOffset = childElementRect.offset.left;
        break;
      case 'right':
        hAlignmentOffset = childElementRect.offset.left + childElementRect.width - parentElementRect.width;
        break;
      default:
        hAlignmentOffset = childElementRect.offset.left - (parentElementRect.width / 2 - childElementRect.width / 2);
        vAlignmentOffset = childElementRect.offset.top - (parentElementRect.height / 2 - childElementRect.height / 2);
    }

    switch (this.options.get('position')) {
      case 'left':
      case 'right':
        this.parentElement.style.top = `${vAlignmentOffset}px`;
        break;
      case 'top':
      default:
        this.parentElement.style.left = `${hAlignmentOffset}px`;
    }
  }
}
