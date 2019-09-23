import { $, createElement, fire, HTMLElementAttributes, off, on } from '../helper';
import { Triggers } from '../utility';
import { Plugin } from './plugin';

export class OffCanvas extends Plugin {
  private content: HTMLElement;
  private overlay: HTMLElement;
  private overlayListener: (event: MouseEvent) => void;
  private position: string;

  /**
   * Default settings for plugin
   */
  private defaults = new Map(Object.entries({
    /**
     * Target an off-canvas content container by ID that may be placed anywhere. If null the closest content container will be taken.
     * @option
     * @type {?string}
     * @default null
     */
    contentId: null,

    /**
     * Target an off-canvas content container by class name that should be placed closest to off-canvas panel.
     * @option
     * @type {string}
     * @default off-canvas-content
     */
    contentClass: 'off-canvas-content',

    /**
     * Allow the user to click outside of the menu to close it.
     * @option
     * @type {boolean}
     * @default true
     */
    closeOnClick: true,

    /**
     * Adds an overlay.
     * @option
     * @type {boolean}
     * @default true
     */
    contentOverlay: true,
  }));

  /**
   * Creates a new instance of OffCanvas
   * @param element
   * @param options
   */
  constructor(element: HTMLElement, options?: any) {
    super('offCanvas', element);

    this.setOptions(options, this.defaults);
    this.setContent();
    this.setPosition();

    this.createOverlay();
    this.initCustomEvents();

    Triggers.init();
  }

  /**
   * Opens the off-canvas menu.
   * @fires OffCanvas#opened
   */
  public open(): void {
    this.element.classList.add('is-open');
    this.content.classList.add(`is-open-${this.position}`);

    if (this.options.get('contentOverlay')) {
      this.overlay.classList.add('is-visible');
    }

    if (this.options.get('closeOnClick') === true && this.options.get('contentOverlay')) {
      this.overlay.classList.add('is-closable');
    }

    this.addOverlayEvent();

    /**
     * Fires when the off-canvas menu open transition is done.
     * @event OffCanvas#opened
     */
    fire(this.element, 'opened.base.off-canvas');
  }

  /**
   * Closes the off-canvas menu.
   * @fires OffCanvas#closed
   */
  public close(): void {
    this.element.classList.remove('is-open');
    this.content.classList.remove(`is-open-${this.position}`);

    if (this.options.get('contentOverlay')) {
      this.overlay.classList.remove('is-visible');
    }

    if (this.options.get('closeOnClick') === true && this.options.get('contentOverlay')) {
      this.overlay.classList.remove('is-closable');
    }

    this.removeOverlayEvent();

    /**
     * Fires when the off-canvas menu close transition is done.
     * @event OffCanvas#closed
     */
    fire(this.element, 'closed.base.off-canvas');
  }

  /**
   * Toggles the off-canvas menu open or closed.
   */
  public toggle(): void {
    if (this.element.classList.contains('is-open')) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Adds event listeners to the off-canvas.
   * @private
   */
  private initCustomEvents(): void {
    on('open.base.trigger', this.element, this.open.bind(this));
    on('close.base.trigger', this.element, this.close.bind(this));
    on('toggle.base.trigger', this.element, this.toggle.bind(this));
  }

  private setContent(): void {
    this.content = this.options.get('contentId') ?
      $(`#${this.options.get('contentId')}`) :
      $(`.${this.options.get('contentClass')}`, this.element.parentElement);
  }

  private setPosition(): void {
    const positionList = ['position-left', 'position-top', 'position-right', 'position-bottom']
      .filter((position: string) => this.element.classList.contains(position));

    this.position = positionList.length ? positionList[0].replace('position-', '') : 'left';
  }

  private createOverlay(): void {
    const overlay = $('.js-off-canvas-overlay', this.element.parentElement);

    if (this.options.get('contentOverlay') && !overlay) {
      this.overlay = createElement('div', <HTMLElementAttributes>{
        class: 'js-off-canvas-overlay'
      });
      this.element.parentElement.append(this.overlay);
    } else if (this.options.get('contentOverlay') && overlay) {
      this.overlay = overlay;
    }
  }

  private addOverlayEvent(): void {
    if (this.options.get('closeOnClick')) {
      this.overlayListener = (event) => {
        event.stopPropagation();
        this.close();
      };
      on('click', this.overlay, this.overlayListener);
    }
  }

  private removeOverlayEvent(): void {
    if (this.options.get('closeOnClick')) {
      off('click', this.overlay, this.overlayListener);
    }
  }
}
