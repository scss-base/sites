import { $$, fire, on, outViewport } from '../helper';
import { Positionable } from './positionable';

export class DropdownMenu extends Positionable {
  /**
   * @private
   */
  private subs: NodeListOf<HTMLElement>;

  /**
   * @param element
   * @param options
   */
  constructor(element: HTMLElement, options?: Object) {
    super('DropdownMenu', element);
    this.setOptions(options, new Map());

    this.subs = $$('li > ul', this.element);
    this.subs.forEach(sub => {
      const anchor = sub.closest('li');

      anchor.classList.add('has-submenu');
      this.initMouseEvents(sub, anchor);
    });
  }

  /**
   * @param sub
   * @param anchor
   */
  public open(sub: HTMLElement, anchor: HTMLElement): void {
    anchor.classList.add('is-opened');
    this.setPosition(sub, anchor);
    fire(this.element, 'open.base.dropdown-menu');
  }

  /**
   * @param anchor
   */
  public close(anchor: HTMLElement): void {
    anchor.classList.remove('is-opened');
    fire(this.element, 'closed.base.dropdown-menu');
  }

  /**
   * @param sub
   * @param anchor
   */
  public setPosition(sub: HTMLElement, anchor: HTMLElement): void {
    const out = outViewport(sub);

    if (out.bottom < 0) {
      anchor.classList.remove('opens-down');
      anchor.classList.add('opens-up');
    }

    if (out.top < 0) {
      anchor.classList.remove('opens-up');
      anchor.classList.add('opens-down');
    }

    if (out.left < 0) {
      anchor.classList.remove('opens-left');
      anchor.classList.add('opens-right');
    }

    if (out.right < 0) {
      anchor.classList.remove('opens-right');
      anchor.classList.add('opens-left');
    }
  }

  /**
   * @private
   * @param sub
   * @param anchor
   */
  private initMouseEvents(sub: HTMLElement, anchor: HTMLElement) {
    on('mouseenter', anchor, this.open.bind(this, sub, anchor));
    on('mouseleave', anchor, this.close.bind(this, anchor));
  }
}
