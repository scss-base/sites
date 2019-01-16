import Positionable from './positionable';
import { fire, on } from '../helper';

export default class Tooltip extends Positionable {
  /**
   * @type {Map<string, *>}
   */
  defaults = new Map(Object.entries({}));

  constructor(element, options = new Map()) {
    super(element);
    this.pluginName = 'Tooltip';

    this.options = this.defaults;
    this.options = options;
    this.options = this.getOptionsFromElement();

    this.element.classList.add('has-tip');

    this._createTooltip();
    this._initCustomEvents();
    this._initMouseEvents();
  }

  open() {
    fire(this.element, 'closeme.base.tooltip');

    this.tooltip.style.display = 'block';
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
    this.tooltip.setAttribute('class', 'tooltip');
    this.tooltip.innerHTML = this.element.title;
    this.element.title = '';
    document.body.appendChild(this.tooltip);
  }
}
