import {createElement, fire, getDimensions, on, outViewport} from '../helper';
import {Positionable} from './positionable';

export class Tooltip extends Positionable {
  constructor(element, options) {
    super('Tooltip', element);
    this.defaults = new Map(Object.entries({
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
    this.setOptions(options, this.defaults);
    this.element.classList.add(this.options.get('triggerClass'));
    this.init();
    this._createTooltip();
    this.initCustomEvents();
    this.initMouseEvents();
  }

  open() {
    this.tooltip.style.display = 'block';
    this._setPosition();
    fire(this.element, 'open.base.tooltip');
  }

  close() {
    this.tooltip.style.display = 'none';
    fire(this.element, 'closed.base.tooltip');
  }

  _createTooltip() {
    this.tooltip = createElement('div', {
      text: this.element.title,
      id: this.pluginId,
      class: [this.options.get('tooltipClass'), this.options.get('position'), `align-${this.options.get('alignment')}`],
    });
    this.element.title = '';
    document.body.appendChild(this.tooltip);
  }

  initCustomEvents() {
    on('open.base.trigger', this.element, this.open.bind(this));
    on('close.base.trigger', this.element, this.close.bind(this));
  }

  initMouseEvents() {
    on('mouseenter', this.element, this.open.bind(this));
    on('mouseleave', this.element, this.close.bind(this));
  }

  _setPosition() {
    const elementDims = getDimensions(this.element);
    const tooltipDims = getDimensions(this.tooltip);
    let top, left;
    let hAlignmentOffset = 0;
    let vAlignmentOffset = 0;
    switch (this.options.get('alignment')) {
      case 'top':
        vAlignmentOffset = elementDims.offset.top;
        break;
      case 'bottom':
        vAlignmentOffset = elementDims.offset.top + elementDims.height - tooltipDims.height;
        break;
      case 'left':
        hAlignmentOffset = elementDims.offset.left;
        break;
      case 'right':
        hAlignmentOffset = elementDims.offset.left + elementDims.width - tooltipDims.width;
        break;
      default:
        hAlignmentOffset = elementDims.offset.left - (tooltipDims.width / 2 - elementDims.width / 2);
        vAlignmentOffset = elementDims.offset.top - (tooltipDims.height / 2 - elementDims.height / 2);
    }
    switch (this.options.get('position')) {
      case 'left':
        top = vAlignmentOffset;
        left = elementDims.offset.left - tooltipDims.width - this.options.get('tooltipWidth');
        break;
      case 'right':
        top = vAlignmentOffset;
        left = elementDims.offset.left + elementDims.width + this.options.get('tooltipWidth');
        break;
      case 'bottom':
        top = elementDims.offset.top + elementDims.height + this.options.get('tooltipHeight');
        left = hAlignmentOffset;
        break;
      default:
        top = elementDims.offset.top - tooltipDims.height - this.options.get('tooltipHeight');
        left = hAlignmentOffset;
    }
    this.tooltip.style.top = `${top}px`;
    this.tooltip.style.left = `${left}px`;
    this._reposition();
  }

  _reposition() {
    const out = outViewport(this.tooltip);
    if (Object.values(out).some(o => o < 0)) {
      const position = Object.keys(out).reduce((a, b) => out[a] < out[b] ? a : b);
      this.tooltip.classList.remove('top', 'bottom', 'left', 'right');
      switch (position) {
        case 'bottom':
          this.tooltip.classList.add('top');
          this.options.set('position', 'top');
          break;
        case 'top':
          this.tooltip.classList.add('bottom');
          this.options.set('position', 'bottom');
          break;
        case 'left':
          this.tooltip.classList.add('right');
          this.options.set('position', 'right');
          break;
        case 'right':
          this.tooltip.classList.add('left');
          this.options.set('position', 'left');
          break;
      }
      this._setPosition();
    }
  }
}
