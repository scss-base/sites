import { fire, on } from '../helper';
export class MediaQuery {
    /**
     * Initializes the media query helper and activating the breakpoint watcher.
     * @private
     */
    static init() {
        MediaQuery.outdated = MediaQuery.current;
        MediaQuery.initWatcher();
    }
    /**
     * Gets all css breakpoints
     * @returns {Object} JSON parsed object with all available CSS breakpoints.
     */
    static get breakpoints() {
        const breakpoints = window.getComputedStyle(document.body).getPropertyValue('--breakpoints');
        return JSON.parse(breakpoints.substring(2, breakpoints.length - 1));
    }
    /**
     * Gets all named media queries
     * @returns {Map<string, string>} A map object with all named media queries.
     */
    static get queries() {
        const queries = new Map();
        for (const prop in MediaQuery.breakpoints) {
            if (MediaQuery.breakpoints.hasOwnProperty(prop)) {
                queries.set(prop, `only screen and (min-width: ${MediaQuery.breakpoints[prop]})`);
            }
        }
        return queries;
    }
    /**
     * Gets the current breakpoint name
     * @returns {String} Name of the current breakpoint.
     */
    static get current() {
        let matched = '';
        MediaQuery.queries.forEach((value, key) => {
            if (window.matchMedia(value).matches) {
                matched = key;
            }
        });
        return matched;
    }
    /**
     * Gets the media query of a breakpoint.
     * @param {String} breakpoint - Name of the breakpoint to get.
     * @returns {String|null} - The media query of the breakpoint, or `null` if the breakpoint doesn't exist.
     */
    static get(breakpoint) {
        return MediaQuery.queries.has(breakpoint) ? MediaQuery.queries.get(breakpoint) : null;
    }
    /**
     * Checks if the screen is at least as wide as a breakpoint.
     * @param {String} breakpoint - Name of the breakpoint to check.
     * @returns {Boolean} `true` if the breakpoint matches, `false` if it's smaller.
     */
    static atLeast(breakpoint) {
        const query = MediaQuery.get(breakpoint);
        return query ? window.matchMedia(query).matches : false;
    }
    /**
     * Checks if the screen matches to a breakpoint.
     * @param {String} breakpoint - Name of the breakpoint to check, either 'small only' or 'small'. Omitting 'only' falls back to using atLeast() method.
     * @returns {Boolean} `true` if the breakpoint matches, `false` if it does not.
     */
    static is(breakpoint) {
        const breakpointArray = breakpoint.trim().split(' ');
        if (breakpointArray.length > 1 && breakpointArray[1] === 'only') {
            return breakpointArray[0] === MediaQuery.current;
        }
        else {
            return MediaQuery.atLeast(breakpointArray[0]);
        }
    }
    /**
     * Breakpoint listener for watcher, which fires an event on the window whenever the breakpoint changes.
     * @fires MediaQuery#changed
     */
    static watcherListener() {
        const current = MediaQuery.current;
        const outdated = MediaQuery.outdated;
        if (current !== outdated) {
            MediaQuery.outdated = current;
            /**
             * Fires when the breakpoint changes.
             * @event MediaQuery#changed
             */
            fire(window, 'changed.base.mediaquery', { current, outdated });
        }
    }
    /**
     * Initializes a breakpoint listener on window resize.
     */
    static initWatcher() {
        on('resize', window, MediaQuery.watcherListener);
    }
}
