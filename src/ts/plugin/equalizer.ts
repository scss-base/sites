import { $$, fire, on } from '../helper';
import { Plugin } from './plugin';

export class Equalizer extends Plugin {
  private watched: NodeListOf<HTMLElement>;

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
     * String representing the minimum breakpoint size the plugin should equalize heights on.
     * @option
     * @type {string}
     * @default 'medium'
     */
    equalizeOn: 'medium'
  }));

  constructor(element: HTMLElement, options?: any) {
    super('equalizer', element);

    this.setOptions(options, this.defaults);

    this.watched = $$('[data-equalizer-watch]', this.element);

    console.log(this.watched);

    this.reflow();
  }

  /**
   * Determines if the first 2 elements are not stacked.
   */
  private get isStacked(): boolean {
    return this.watched.length >= 2
      ? this.watched[0].getBoundingClientRect().top !== this.watched[1].getBoundingClientRect().top
      : false;
  }

  private initUiEvents(): void {
    on('resize', window, this.reflow.bind(this));
  }

  /**
   * Calls necessary functions to update Equalizer upon DOM change
   */
  private reflow(): void {
    if (!this.options.get('equalizeOnStack') && this.isStacked) {
      this.watched.forEach(element => element.style.height = 'auto');
      return;
    }

    if (this.options.get('equalizeByRow')) {

    } else {
      this.adjust();
    }
  }

  /**
   * Changes the CSS height property of each child in an Equalizer parent to match the tallest
   * @fires Equalizer#preequalized
   * @fires Equalizer#postequalized
   */
  private adjust(): void {
    let heights = [];

    this.watched.forEach(element => heights.push(element.offsetHeight));

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
}
