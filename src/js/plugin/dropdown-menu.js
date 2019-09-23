import { $$, fire, on, outViewport } from '../helper';
import { Positionable } from './positionable';
export class DropdownMenu extends Positionable {
    /**
     * @param element
     * @param options
     */
    constructor(element, options) {
        super('dropdownMenu', element);
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
    open(sub, anchor) {
        anchor.classList.add('is-opened');
        this.setPosition(sub, anchor);
        fire(this.element, 'opened.base.dropdown-menu');
    }
    /**
     * @param anchor
     */
    close(anchor) {
        anchor.classList.remove('is-opened');
        fire(this.element, 'closed.base.dropdown-menu');
    }
    /**
     * @param sub
     * @param anchor
     */
    setPosition(sub, anchor) {
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
    initMouseEvents(sub, anchor) {
        on('mouseenter', anchor, this.open.bind(this, sub, anchor));
        on('mouseleave', anchor, this.close.bind(this, anchor));
    }
}
