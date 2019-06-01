import { snakeCase } from '../helper';
export class Keyboard {
    /**
     * Registers a keys object with plugin name.
     * @param {string} pluginName - Base plugin's name, e.g. Modal
     * @param {Object.<string, string>} keys
     */
    static register(pluginName, keys) {
        Keyboard.plugins.set(pluginName, keys);
    }
    /**
     * Handles the given (keyboard) event.
     *
     * @param {KeyboardEvent} event - the event generated by the event handler
     * @param {string} pluginName - Base plugin's name, e.g. Modal
     * @param {Object} functions - collection of functions that are to be executed
     */
    static handleKey(event, pluginName, functions) {
        if (!Keyboard.plugins.has(pluginName)) {
            throw new TypeError('Plugin name not defined!');
        }
        const key = Keyboard.parseKey(event);
        const plugins = Keyboard.plugins.get(pluginName);
        const fn = functions[plugins[key]];
        if (fn && typeof fn === 'function') {
            fn.apply();
        }
    }
    /**
     * Parses the (keyboard) event and returns a String that represents its key.
     * @param {KeyboardEvent} event - the event generated by the event handler
     * @returns {string} key - String that represents the key pressed
     */
    static parseKey(event) {
        const excludedKeys = ['Alt', 'Control', 'Shift'];
        const ieSpecificKeys = new Map(Object.entries({
            'Up': 'ArrowUp',
            'Left': 'ArrowLeft',
            'Right': 'ArrowRight',
            'Down': 'ArrowDown',
            'Esc': 'Escape',
        }));
        let key = '';
        if (!excludedKeys.includes(event.key)) {
            key = snakeCase(ieSpecificKeys.has(event.key) ? ieSpecificKeys.get(event.key) : event.key).toUpperCase();
        }
        if (event.altKey)
            key = `ALT_${key}`;
        if (event.ctrlKey)
            key = `CTRL_${key}`;
        if (event.metaKey)
            key = `META_${key}`;
        if (event.shiftKey)
            key = `SHIFT_${key}`;
        return key.replace(new RegExp(/_$/), '');
    }
}
Keyboard.plugins = new Map();