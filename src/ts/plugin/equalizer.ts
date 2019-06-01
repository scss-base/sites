import { $$, fire, getDimensions, imageLoader, on } from '../helper';
import { Plugin } from './plugin';

export class Equalizer extends Plugin {
  private watched: NodeListOf<HTMLElement>;
  private reflowListener: () => void;

  /**
   * Default settings for plugin
   */
  private defaults = new Map(Object.entries({
    /**
     * Enable height equalization when stacked on smaller screens.
     * @option
     * @type {boolean}
     * @default false
     */
    equalizeOnStack: false,
    /**
     * Enable height equalization row by row.
     * @option
     * @type {boolean}
     * @default false
     */
    equalizeByRow: false,
  }));

  constructor(element: HTMLElement, options?: any) {
    super('equalizer', element);

    this.setOptions(options, this.defaults);
    this.watched = $$('[data-equalizer-watch]', this.element);

    this.initUiEvents();

    const images = $$('img', this.element);
    if (images.length) {
      imageLoader(images, this.reflow.bind(this));
    } else {
      this.reflow();
    }
  }

  /**
   * Determines if the first 2 elements are not stacked.
   */
  private get isStacked(): boolean {
    return this.watched.length >= 2
      ? this.watched[0].getBoundingClientRect().top !== this.watched[1].getBoundingClientRect().top
      : false;
  }

  /**
   * Initializes UI events for Equalizer.
   */
  private initUiEvents(): void {
    this.reflowListener = () => this.reflow();
    on('resize', window, this.reflowListener);
  }

  /**
   * Calls necessary functions to update Equalizer upon DOM change
   */
  private reflow(): void {
    if (!this.options.get('equalizeOnStack') && this.isStacked) {
      this.watched.forEach(element => element.style.height = 'auto');
      return;
    }

    return this.options.get('equalizeByRow') ? this.adjustByRow() : this.adjust();
  }

  /**
   * Changes the CSS height property of each child in an Equalizer parent to match the tallest
   * @fires Equalizer#preequalized
   * @fires Equalizer#postequalized
   */
  private adjust(): void {
    let heights = [];
    this.watched.forEach(element => {
      element.style.height = 'auto';
      heights.push(element.offsetHeight);
    });
    const max = Math.max(...heights);

    /**
     * Fires before the heights are applied
     * @event Equalizer#preequalized
     */
    fire(this.element, 'preequalized.base.equalizer');
    this.watched.forEach(element => element.style.height = `${max}px`);

    /**
     * Fires when the heights have been applied
     * @event Equalizer#postequalized
     */
    fire(this.element, 'postequalized.base.equalizer');
  }

  /**
   * Changes the CSS height property of each child in an Equalizer parent to match the tallest by row
   * @fires Equalizer#preequalized
   * @fires Equalizer#preequalizedrow
   * @fires Equalizer#postequalizedrow
   * @fires Equalizer#postequalized
   */
  private adjustByRow(): void {
    const rows = this.groupByRow();

    /**
     * Fires before the heights are applied
     */
    fire(this.element, 'preequalized.base.equalizer');

    rows.forEach((row: HTMLElement[]) => {
      let heights = [];
      row.forEach(element => heights.push(element.offsetHeight));

      /**
       * Fires before the heights per row are applied
       * @event Equalizer#preequalizedrow
       */
      fire(this.element, 'preequalizedrow.base.equalizer');

      const max = Math.max(...heights);
      row.forEach(element => element.style.height = `${max}px`);

      /**
       * Fires when the heights per row have been applied
       * @event Equalizer#postequalizedrow
       */
      fire(this.element, 'postequalizedrow.base.equalizer');
    });

    /**
     * Fires when the heights have been applied
     * @event Equalizer#postequalized
     */
    fire(this.element, 'postequalized.base.equalizer');
  }

  /**
   * Finds the watchers with the same offset top value and retuns them in an array.
   * @returns An array of watchers grouped by row.
   */
  private groupByRow(): HTMLElement[][] {
    let lastElementOffsetTop = getDimensions(this.watched[0]).offset.top;
    const rows = [];
    let rowCount = 0;

    rows[rowCount] = [];
    this.watched.forEach(element => {
      element.style.height = 'auto';

      const elementOffsetTop = getDimensions(element).offset.top;

      if (elementOffsetTop !== lastElementOffsetTop) {
        rowCount += 1;
        rows[rowCount] = [];
        lastElementOffsetTop = elementOffsetTop;
      }

      rows[rowCount].push(element);
    });

    return rows;
  }
}

