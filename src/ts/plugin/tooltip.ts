import { createElement, fire, HTMLElementAttributes, on } from '../helper';
import { Positionable } from './positionable';

export interface TooltipOptions {
  alignment: string;
  anchorClass: string;
  position: string;
  tooltipClass: string;
  tooltipHeight: number;
  tooltipWidth: number;
}

export class Tooltip extends Positionable {
  public tooltip: HTMLElement;

  /**
   * Default settings for plugin
   */
  private defaults = new Map(Object.entries({
    /**
     * Position of tooltip. Can be left, right, bottom or top.
     * @option
     * @type {string}
     * @default 'top'
     */
    position: 'top',
    /**
     * Alignment of tooltip relative to anchor. Can be left, right, bottom, top, or center.
     * @option
     * @type {string}
     * @default 'center'
     */
    alignment: 'center',
    /**
     * Distance, in pixels, the tooltip spacing auto-adjust for a vertical tooltip
     * @option
     * @type {number}
     * @default 14
     */
    tooltipHeight: 14,
    /**
     * Distance, in pixels, the tooltip spacing auto-adjust for a horizontal tooltip
     * @option
     * @type {number}
     * @default 12
     */
    tooltipWidth: 12,
    /**
     * Class applied to the tooltip templates.
     * @option
     * @type {string}
     * @default 'tooltip'
     */
    tooltipClass: 'tooltip',

    /**
     * Class applied to the tooltip anchor element.
     * @option
     * @type {string}
     * @default 'has-tip'
     */
    anchorClass: 'has-tip',
  }));

  constructor(element: HTMLElement, options?: TooltipOptions) {
    super('Tooltip', element);

    this.setOptions(options, this.defaults);
    this.element.classList.add(this.options.get('anchorClass'));

    this.init();

    this.createTooltip();
    this.initCustomEvents();
    this.initMouseEvents();
  }

  public open() {
    this.tooltip.style.display = 'block';
    this.setPosition(this.tooltip, this.element);
    fire(this.element, 'open.base.tooltip');
  }

  public setPosition(parentElement: HTMLElement, childElement: HTMLElement) {
    super.setPosition(parentElement, childElement);

    let top = parseInt(parentElement.style.top, 10);
    let left = parseInt(parentElement.style.left, 10);

    switch (this.options.get('position')) {
      case 'top':
        top -= this.options.get('tooltipWidth');
        break;
      case 'left':
        left -= this.options.get('tooltipWidth');
        break;
      case 'right':
        left += this.options.get('tooltipWidth');
        break;
      default:
        top += this.options.get('tooltipWidth');
    }

    parentElement.style.top = `${top}px`;
    parentElement.style.left = `${left}px`;
  }

  public close() {
    this.tooltip.style.display = 'none';
    fire(this.element, 'closed.base.tooltip');
  }

  private createTooltip(): void {
    this.tooltip = createElement('div', <HTMLElementAttributes>{
      text: this.element.title,
      id: this.pluginId,
      class: [this.options.get('tooltipClass'), this.options.get('position'), `align-${this.options.get('alignment')}`],
    });

    this.element.title = '';
    document.body.appendChild(this.tooltip);
  }

  private initCustomEvents() {
    on('open.base.trigger', this.element, this.open.bind(this));
    on('close.base.trigger', this.element, this.close.bind(this));
  }

  private initMouseEvents() {
    on('mouseenter', this.element, this.open.bind(this));
    on('mouseleave', this.element, this.close.bind(this));
  }
}
