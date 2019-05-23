import { createElement, fire, HTMLElementAttributes, on } from '../helper';
import { Plugin } from './plugin';

export class Tooltip extends Plugin {
  public tooltip: HTMLElement;

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
    triggerClass: 'has-tip',
  }));

  constructor(element: HTMLElement, options?: Object) {
    super('Tooltip', element);

    this.setOptions(options, this.defaults);
    this.element.classList.add(this.options.get('triggerClass'));

    this._createTooltip();
    this._initCustomEvents();
    this._initMouseEvents();
  }

  public open() {
    this.tooltip.style.display = 'block';
    fire(this.element, 'open.base.tooltip');
  }

  public close() {
    this.tooltip.style.display = 'none';
    fire(this.element, 'closed.base.tooltip');
  }

  private _createTooltip(): void {
    this.tooltip = createElement('div', <HTMLElementAttributes>{
      text: this.element.title,
      id: this.pluginId,
      class: [this.options.get('tooltipClass'), this.options.get('position'), `align-${this.options.get('alignment')}`],
    });

    this.element.title = '';
    document.body.appendChild(this.tooltip);
  }

  private _initCustomEvents() {
    on('open.base.trigger', this.element, this.open.bind(this));
    on('close.base.trigger', this.element, this.close.bind(this));
  }

  private _initMouseEvents() {
    on('mouseenter', this.element, this.open.bind(this));
    on('mouseleave', this.element, this.close.bind(this));
  }
}
