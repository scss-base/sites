import Positionable from './positionable';
import { fire, on } from '../helper';

export default class Tooltip extends Positionable {

  constructor(element, options = new Map()) {
    super(element);

    this.pluginName = 'Tooltip';
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
    }));

    this.options = this.defaults;
    this.options = options;
    this.options = this.getOptionsFromElement();

    this.element.classList.add('has-tip');

    this._createTooltip();
    this._initCustomEvents();
    this._initMouseEvents();
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

  _initCustomEvents() {
    on('open.base.trigger', this.element, this.open.bind(this));
    on('close.base.trigger', this.element, this.close.bind(this));
  }

  _initMouseEvents() {
    on('mouseenter', this.element, this.open.bind(this));
    on('mouseleave', this.element, this.close.bind(this));
  }

  _createTooltip() {
    this.tooltip = document.createElement('div');
    this.tooltip.setAttribute('id', this.pluginId);
    this.tooltip.setAttribute('class', `tooltip ${this.options.get('position')} align-${this.options.get('alignment')}`);
    this.tooltip.innerHTML = this.element.title;
    this.element.title = '';
    document.body.appendChild(this.tooltip);
  }

  _setPosition() {
    const elementDims = this.getDimensions(this.element);
    const tooltipDims = this.getDimensions(this.tooltip);
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
    const out = this.outViewport(this.tooltip);

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
