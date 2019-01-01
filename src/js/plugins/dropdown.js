import Positionable from './positionable';
import { $$, fire, on } from '../helper';
import { Triggers } from '../utilities';

export default class Dropdown extends Positionable {
  /**
   * @type {Map<string, boolean>}
   */
  defaults = new Map(Object.entries({

    /**
     * Allow to open on hover events
     * @option
     * @type {boolean}
     * @default false
     */
    hover: false,

    /**
     * Number of pixels between the dropdown container and the triggering element on open.
     * @option
     * @type {number}
     * @default 0
     */
    vOffset: 0,
    /**
     * Number of pixels between the dropdown container and the triggering element on open.
     * @option
     * @type {number}
     * @default 0
     */
    hOffset: 0,
    /**
     * Position of dropdown container. Can be left, right, bottom or top.
     * @option
     * @type {string}
     * @default 'bottom'
     */
    position: 'bottom',
  }));

  constructor(element, options = new Map()) {
    super(element);
    this.pluginName = 'Dropdown';

    this.options = this.defaults;
    this.options = options;
    this.options = this.getOptionsFromElement();

    this.isOpen = false;
    this.anchors = $$([`[data-open="${this.elementId}"]`, `[data-toggle="${this.elementId}"]`]);
    this.currentAnchor = this.anchors[0];
    this._initCustomEvents();
    this._initMouseEvents();
    this._initUiEvents();

    Triggers.init();
  }

  /**
   * Opens the dropdown, and fires a bubbling event to close other dropdowns.
   * @fires Dropdown#closeme
   * @fires Dropdown#open
   */
  open() {
    /**
     * Fires to close other open dropdowns, typically when dropdown is opening
     * @event Dropdown#closeme
     */
    fire(this.element, 'closeme.base.dropdown', this.pluginId);

    this.isOpen = true;
    this.element.style.display = 'block';

    this._setPosition();
    fire(this.element, 'open.base.dropdown');
  }

  /**
   * Closes the open dropdown.
   * @fires Dropdown#closed
   */
  close() {
    this.isOpen = false;
    this.element.style.display = 'none';

    /**
     * Fires once the dropdown is no longer visible.
     * @event Dropdown#closed
     */
    fire(this.element, 'closed.base.dropdown');
  }

  toggle() {
    if (!this.isOpen) {
      this.open();
    } else {
      this.close();
    }
  }

  _initCustomEvents() {
    on('open.base.trigger', this.element, this.open.bind(this));
    on('close.base.trigger', this.element, this.close.bind(this));
    on('toggle.base.trigger', this.element, this.toggle.bind(this));
  }

  _initMouseEvents() {
    let timeout;

    this.anchors
      .forEach(anchor => on('mouseenter', anchor, event => this.currentAnchor = event.target));

    if (this.options.get('hover')) {
      this.anchors.forEach(anchor => {
        on('mouseenter', anchor, () => {
          clearTimeout(timeout);
          timeout = setTimeout(() => this.open());
        });
        on('mouseleave', anchor, () => {
          clearTimeout(timeout);
          timeout = setTimeout(() => this.close());
        });
      });

      on('mouseenter', this.element, () => {
        clearTimeout(timeout);
      });
      on('mouseleave', this.element, () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => this.close());
      });
    }
  }

  _initUiEvents() {
    on('click', this.element, this.close.bind(this));
    on('resize', this._setPosition.bind(this));
    on('scroll', this._setPosition.bind(this));
  }

  _setPosition() {
    const elementDims = this.getDimensions(this.element);
    const anchorDims = this.getDimensions(this.currentAnchor);
    let top, left;

    switch (this.options.get('position')) {
      case 'left':
        top = anchorDims.offset.top + this.options.get('vOffset');
        left = anchorDims.offset.left - elementDims.width - this.options.get('hOffset');
        break;
      case 'right':
        top = anchorDims.offset.top + this.options.get('vOffset');
        left = anchorDims.offset.left + anchorDims.width + this.options.get('hOffset');
        break;
      case 'top':
        top = anchorDims.offset.top - elementDims.height - this.options.get('vOffset');
        left = anchorDims.offset.left + this.options.get('hOffset');
        break;
      default:
        top = anchorDims.offset.top + anchorDims.height + this.options.get('vOffset');
        left = anchorDims.offset.left + this.options.get('hOffset');
    }


    this.element.style.top = `${top}px`;
    this.element.style.left = `${left}px`;

    // this._reposition();
  }

  //
  // _reposition() {
  //   const anchorDims = this.getDimensions(this.currentAnchor);
  //   const elementDims = this.getDimensions(this.element);
  //
  //   const elementLeft = elementDims.left + document.body.scrollLeft;
  //   const elementTop = elementDims.top + document.body.scrollTop;
  //   const hCheck = (elementLeft > 0 && elementLeft + elementDims.width < window.innerWidth);
  //   const vCheck = (elementTop > 0 && elementTop + elementDims.height < window.innerHeight);
  //   let top, left;
  //
  //   if (!hCheck) {
  //     if (this.options.get('position') === 'bottom' || this.options.get('position') === 'top') {
  //       left = anchorDims.offset.left - elementDims.width + anchorDims.width + this.options.get('hOffset');
  //     } else if (this.options.get('position') === 'left') {
  //       left = anchorDims.offset.left + anchorDims.width + this.options.get('hOffset');
  //     } else {
  //       left = anchorDims.offset.left - elementDims.width - this.options.get('hOffset');
  //     }
  //
  //     this.element.style.left = `${left}px`;
  //   }
  //
  //   if (!vCheck) {
  //     if (this.options.get('position') === 'bottom') {
  //       top = anchorDims.offset.top - elementDims.height - this.options.get('vOffset');
  //     } else {
  //       top = anchorDims.offset.top + anchorDims.height + this.options.get('vOffset');
  //     }
  //
  //     this.element.style.top = `${top}px`;
  //   }
  // }
}
