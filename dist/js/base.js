/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/js/helper/dom.js
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
  }
  return t;
};
/**
 *
 * @param {string} selectors
 * @param {HTMLElement | Document} node
 * @returns {Element}
 */


function $(selectors) {
  var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return node.querySelector(selectors);
}
/**
 *
 * @param {string} selectors
 * @param {HTMLElement | Document} node
 * @returns {NodeListOf<Element>}
 */

function $$(selectors) {
  var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return node.querySelectorAll(selectors);
}
/**
 * Creates an HTML element specified by tag name and sets attributes by a passed object.
 * @param {string} tagName
 * @param {HTMLElementAttributes} attributes
 */

function createElement(tagName, attributes) {
  var element = document.createElement(tagName);

  var html = attributes.html,
      text = attributes.text,
      filteredAttributes = __rest(attributes, ["html", "text"]);

  if (html) {
    element.appendChild(html);
  } else {
    element.innerHTML = text ? text : null;
  }

  for (var attributeName in filteredAttributes) {
    if (filteredAttributes.hasOwnProperty(attributeName)) {
      var attributeValue = filteredAttributes[attributeName];

      if (Array.isArray(attributeValue)) {
        attributeValue = attributeValue.join(' ');
      }

      element.setAttribute(attributeName, attributeValue);
    }
  }

  return element;
}
/**
 *
 * @param element
 */

function getDimensions(element) {
  var elementRect = element.getBoundingClientRect();
  return {
    width: elementRect.width,
    height: elementRect.height,
    top: elementRect.top,
    left: elementRect.left,
    offset: {
      top: elementRect.top + window.pageYOffset,
      left: elementRect.left + window.pageXOffset
    }
  };
}
function outViewport(element) {
  var elementRect = getDimensions(element);
  var top = elementRect.offset.top - window.pageYOffset;
  var bottom = window.innerHeight + window.pageYOffset - (elementRect.offset.top + elementRect.height);
  var left = elementRect.offset.left - window.pageXOffset;
  var right = window.innerWidth - (elementRect.offset.left + elementRect.width);
  top = Math.min(top, 0);
  bottom = Math.min(bottom, 0);
  left = Math.min(left, 0);
  right = Math.min(right, 0);
  return {
    top: top,
    bottom: bottom,
    left: left,
    right: right
  };
}
// CONCATENATED MODULE: ./src/js/helper/event.js
function fire(element, event, detail) {
  return element.dispatchEvent(new CustomEvent(event, {
    bubbles: true,
    cancelable: true,
    detail: detail
  }));
}
function off(type, element, listener, capture) {
  element.removeEventListener(type, listener, {
    capture: capture
  });
}
function on(type, element, listener, capture) {
  element.addEventListener(type, listener, {
    capture: capture
  });
}

function composeListener(type, element, listener, capture) {
  return function listenerFn(event) {
    listener(event);
    element.removeEventListener(type, listenerFn, {
      capture: capture
    });
  };
}

function one(type, element, listener, capture) {
  element.addEventListener(type, composeListener(type, element, listener, capture), {
    capture: capture
  });
}
// CONCATENATED MODULE: ./src/js/helper/image.js

/**
 * Loader function that helps to trigger a callback when multiple images has been loaded.
 *
 * @param {Array} images An array of strings with the paths to the images.
 * @param {Function} fn Callback function executed when all images has been loaded or not.
 */

function imageLoader(images, fn) {
  var loaded = 0;

  var verifier = function verifier() {
    loaded += 1;

    if (loaded === images.length) {
      fn.apply(undefined);
    }
  };

  images.forEach(function (image) {
    if (image.complete) {
      verifier();
      return;
    }

    one('load', image, verifier);
    one('error', image, verifier);
  });
}
// CONCATENATED MODULE: ./src/js/helper/string.js
/**
 * Converts string to camel case.
 * @link https://en.wikipedia.org/wiki/Camel_case
 * @param {string} string
 * @returns {string}
 */
function camelCase(string) {
  return "".concat(string).replace(new RegExp(/[-_]+/, 'g'), ' ').replace(new RegExp(/[^\w\s]/, 'g'), '').replace(new RegExp(/\s+(.)(\w+)/, 'g'), function ($1, $2, $3) {
    return "".concat($2.toUpperCase() + $3.toLowerCase());
  }).replace(new RegExp(/\s/, 'g'), '').replace(new RegExp(/\w/), function (s) {
    return s.toLowerCase();
  });
}
/**
 * Converts string to pascal case.
 * @link https://en.wikipedia.org/wiki/Camel_case
 * @param string
 * @returns {string}
 */

function pascalCase(string) {
  return "".concat(string).replace(new RegExp(/[-_]+/, 'g'), ' ').replace(new RegExp(/[^\w\s]/, 'g'), '').replace(new RegExp(/\s+(.)(\w+)/, 'g'), function ($1, $2, $3) {
    return "".concat($2.toUpperCase() + $3.toLowerCase());
  }).replace(new RegExp(/\s/, 'g'), '').replace(new RegExp(/\w/), function (s) {
    return s.toUpperCase();
  });
}
/**
 * Converts the first character of string to upper case and the remaining to lower case.
 * @param string
 * @returns {string}
 */

function capitalize(string) {
  return "".concat(string).charAt(0).toUpperCase() + "".concat(string).slice(1).toLowerCase();
}
/**
 * Converts string to kebab case.
 * @link https://en.wikipedia.org/wiki/Kebab_case
 * @param {string} string
 * @returns {string}
 */

function kebabCase(string) {
  return "".concat(string).replace(new RegExp(/[-_]+/, 'g'), ' ').replace(new RegExp(/[^\w\s]/, 'g'), '').trim().replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
}
/**
 * Converts string to snake case.
 * @link https://en.wikipedia.org/wiki/Snake_case
 * @param {string} string
 * @returns {string}
 */

function snakeCase(string) {
  return "".concat(string).replace(new RegExp(/[-_]+/, 'g'), ' ').replace(new RegExp(/[^\w\s]/, 'g'), '').trim().replace(/([a-z0-9])([A-Z])/g, '$1_$2').replace(/\s+/g, '_').toLowerCase();
}
/**
 * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
 * @param {string} namespace - name of plugin to be incorporated in uid, optional.
 * @returns {string} random base-36 uid with namespacing
 */

function random(length) {
  var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var pid = Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1);
  return namespace ? "".concat(namespace, "-").concat(pid) : "".concat(pid);
}
// CONCATENATED MODULE: ./src/js/helper/index.js
/* concated harmony reexport $ */__webpack_require__.d(__webpack_exports__, "a", function() { return $; });
/* concated harmony reexport $$ */__webpack_require__.d(__webpack_exports__, "b", function() { return $$; });
/* concated harmony reexport createElement */__webpack_require__.d(__webpack_exports__, "d", function() { return createElement; });
/* concated harmony reexport getDimensions */__webpack_require__.d(__webpack_exports__, "f", function() { return getDimensions; });
/* concated harmony reexport outViewport */__webpack_require__.d(__webpack_exports__, "l", function() { return outViewport; });
/* concated harmony reexport fire */__webpack_require__.d(__webpack_exports__, "e", function() { return fire; });
/* concated harmony reexport off */__webpack_require__.d(__webpack_exports__, "i", function() { return off; });
/* concated harmony reexport on */__webpack_require__.d(__webpack_exports__, "j", function() { return on; });
/* concated harmony reexport one */__webpack_require__.d(__webpack_exports__, "k", function() { return one; });
/* concated harmony reexport imageLoader */__webpack_require__.d(__webpack_exports__, "g", function() { return imageLoader; });
/* concated harmony reexport camelCase */__webpack_require__.d(__webpack_exports__, "c", function() { return camelCase; });
/* unused concated harmony import capitalize */
/* concated harmony reexport kebabCase */__webpack_require__.d(__webpack_exports__, "h", function() { return kebabCase; });
/* unused concated harmony import pascalCase */
/* concated harmony reexport random */__webpack_require__.d(__webpack_exports__, "m", function() { return random; });
/* concated harmony reexport snakeCase */__webpack_require__.d(__webpack_exports__, "n", function() { return snakeCase; });





/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./src/js/helper/index.js + 4 modules
var helper = __webpack_require__(0);

// CONCATENATED MODULE: ./src/js/utility/core.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var core_Core =
/*#__PURE__*/
function () {
  function Core() {
    _classCallCheck(this, Core);
  }

  _createClass(Core, null, [{
    key: "ready",

    /**
     * Run event after the DOM is ready
     * @param {Function} fn - Callback function
     */
    value: function ready(fn) {
      // If document is already loaded, run method
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        return fn.apply();
      } // Otherwise, wait until document is loaded


      Object(helper["j" /* on */])('DOMContentLoaded', document, fn);
    }
    /**
     * Run event when the whole page has loaded, including all dependent resources such as stylesheets images
     * @param {Function} fn - Callback function
     */

  }, {
    key: "load",
    value: function load(fn) {
      // If document is already loaded, run method
      if (document.readyState === 'complete') {
        return fn.apply();
      } // Otherwise, wait until window is loaded


      Object(helper["j" /* on */])('load', window, fn);
    }
  }]);

  return Core;
}();
// CONCATENATED MODULE: ./src/js/utility/keyboard.js
function keyboard_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function keyboard_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function keyboard_createClass(Constructor, protoProps, staticProps) { if (protoProps) keyboard_defineProperties(Constructor.prototype, protoProps); if (staticProps) keyboard_defineProperties(Constructor, staticProps); return Constructor; }


var keyboard_Keyboard =
/*#__PURE__*/
function () {
  function Keyboard() {
    keyboard_classCallCheck(this, Keyboard);
  }

  keyboard_createClass(Keyboard, null, [{
    key: "register",

    /**
     * Registers a keys object with plugin name.
     * @param {string} pluginName - Base plugin's name, e.g. Modal
     * @param {Object.<string, string>} keys
     */
    value: function register(pluginName, keys) {
      Keyboard.plugins.set(pluginName, keys);
    }
    /**
     * Handles the given (keyboard) event.
     *
     * @param {KeyboardEvent} event - the event generated by the event handler
     * @param {string} pluginName - Base plugin's name, e.g. Modal
     * @param {Object} functions - collection of functions that are to be executed
     */

  }, {
    key: "handleKey",
    value: function handleKey(event, pluginName, functions) {
      if (!Keyboard.plugins.has(pluginName)) {
        throw new TypeError('Plugin name not defined!');
      }

      var key = Keyboard.parseKey(event);
      var plugins = Keyboard.plugins.get(pluginName);
      var fn = functions[plugins[key]];

      if (fn && typeof fn === 'function') {
        fn.apply();
      }
    }
    /**
     * Parses the (keyboard) event and returns a String that represents its key.
     * @param {KeyboardEvent} event - the event generated by the event handler
     * @returns {string} key - String that represents the key pressed
     */

  }, {
    key: "parseKey",
    value: function parseKey(event) {
      var excludedKeys = ['Alt', 'Control', 'Shift'];
      var ieSpecificKeys = new Map(Object.entries({
        'Up': 'ArrowUp',
        'Left': 'ArrowLeft',
        'Right': 'ArrowRight',
        'Down': 'ArrowDown',
        'Esc': 'Escape'
      }));
      var key = '';

      if (!excludedKeys.includes(event.key)) {
        key = Object(helper["n" /* snakeCase */])(ieSpecificKeys.has(event.key) ? ieSpecificKeys.get(event.key) : event.key).toUpperCase();
      }

      if (event.altKey) key = "ALT_".concat(key);
      if (event.ctrlKey) key = "CTRL_".concat(key);
      if (event.metaKey) key = "META_".concat(key);
      if (event.shiftKey) key = "SHIFT_".concat(key);
      return key.replace(new RegExp(/_$/), '');
    }
  }]);

  return Keyboard;
}();
keyboard_Keyboard.plugins = new Map();
// CONCATENATED MODULE: ./src/js/utility/mediaQuery.js
function mediaQuery_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function mediaQuery_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function mediaQuery_createClass(Constructor, protoProps, staticProps) { if (protoProps) mediaQuery_defineProperties(Constructor.prototype, protoProps); if (staticProps) mediaQuery_defineProperties(Constructor, staticProps); return Constructor; }


var mediaQuery_MediaQuery =
/*#__PURE__*/
function () {
  function MediaQuery() {
    mediaQuery_classCallCheck(this, MediaQuery);
  }

  mediaQuery_createClass(MediaQuery, null, [{
    key: "init",

    /**
     * Initializes the media query helper and activating the breakpoint watcher.
     * @private
     */
    value: function init() {
      MediaQuery.outdated = MediaQuery.current;
      MediaQuery.initWatcher();
    }
    /**
     * Gets all css breakpoints
     * @returns {Object} JSON parsed object with all available CSS breakpoints.
     */

  }, {
    key: "get",

    /**
     * Gets the media query of a breakpoint.
     * @param {String} breakpoint - Name of the breakpoint to get.
     * @returns {String|null} - The media query of the breakpoint, or `null` if the breakpoint doesn't exist.
     */
    value: function get(breakpoint) {
      return MediaQuery.queries.has(breakpoint) ? MediaQuery.queries.get(breakpoint) : null;
    }
    /**
     * Checks if the screen is at least as wide as a breakpoint.
     * @param {String} breakpoint - Name of the breakpoint to check.
     * @returns {Boolean} `true` if the breakpoint matches, `false` if it's smaller.
     */

  }, {
    key: "atLeast",
    value: function atLeast(breakpoint) {
      var query = MediaQuery.get(breakpoint);
      return query ? window.matchMedia(query).matches : false;
    }
    /**
     * Checks if the screen matches to a breakpoint.
     * @param {String} breakpoint - Name of the breakpoint to check, either 'small only' or 'small'. Omitting 'only' falls back to using atLeast() method.
     * @returns {Boolean} `true` if the breakpoint matches, `false` if it does not.
     */

  }, {
    key: "is",
    value: function is(breakpoint) {
      var breakpointArray = breakpoint.trim().split(' ');

      if (breakpointArray.length > 1 && breakpointArray[1] === 'only') {
        return breakpointArray[0] === MediaQuery.current;
      } else {
        return MediaQuery.atLeast(breakpointArray[0]);
      }
    }
    /**
     * Breakpoint listener for watcher, which fires an event on the window whenever the breakpoint changes.
     * @fires MediaQuery#changed
     */

  }, {
    key: "watcherListener",
    value: function watcherListener() {
      var current = MediaQuery.current;
      var outdated = MediaQuery.outdated;

      if (current !== outdated) {
        MediaQuery.outdated = current;
        /**
         * Fires when the breakpoint changes.
         * @event MediaQuery#changed
         */

        Object(helper["e" /* fire */])(window, 'changed.base.mediaquery', {
          current: current,
          outdated: outdated
        });
      }
    }
    /**
     * Initializes a breakpoint listener on window resize.
     */

  }, {
    key: "initWatcher",
    value: function initWatcher() {
      Object(helper["j" /* on */])('resize', window, MediaQuery.watcherListener);
    }
  }, {
    key: "breakpoints",
    get: function get() {
      var breakpoints = window.getComputedStyle(document.body).getPropertyValue('--breakpoints');
      return JSON.parse(breakpoints.substring(2, breakpoints.length - 1));
    }
    /**
     * Gets all named media queries
     * @returns {Map<string, string>} A map object with all named media queries.
     */

  }, {
    key: "queries",
    get: function get() {
      var queries = new Map();

      for (var prop in MediaQuery.breakpoints) {
        if (MediaQuery.breakpoints.hasOwnProperty(prop)) {
          queries.set(prop, "only screen and (min-width: ".concat(MediaQuery.breakpoints[prop], ")"));
        }
      }

      return queries;
    }
    /**
     * Gets the current breakpoint name
     * @returns {String} Name of the current breakpoint.
     */

  }, {
    key: "current",
    get: function get() {
      var matched = '';
      MediaQuery.queries.forEach(function (value, key) {
        if (window.matchMedia(value).matches) {
          matched = key;
        }
      });
      return matched;
    }
  }]);

  return MediaQuery;
}();
// CONCATENATED MODULE: ./src/js/utility/triggers.js
function triggers_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function triggers_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function triggers_createClass(Constructor, protoProps, staticProps) { if (protoProps) triggers_defineProperties(Constructor.prototype, protoProps); if (staticProps) triggers_defineProperties(Constructor, staticProps); return Constructor; }


var triggers_Triggers =
/*#__PURE__*/
function () {
  function Triggers() {
    triggers_classCallCheck(this, Triggers);
  }

  triggers_createClass(Triggers, null, [{
    key: "init",
    value: function init() {
      Triggers.addListeners();
    }
  }, {
    key: "openListener",
    value: function openListener(event) {
      var id = event.target.dataset.open;
      Object(helper["e" /* fire */])(Object(helper["a" /* $ */])("#".concat(id)), 'open.base.trigger');
    }
  }, {
    key: "closeListener",
    value: function closeListener(event) {
      var id = event.target.dataset.close;
      Object(helper["e" /* fire */])(id ? Object(helper["a" /* $ */])("#".concat(id)) : event.target.closest('[data-base-plugin]'), 'close.base.trigger');
    }
  }, {
    key: "toggleListener",
    value: function toggleListener(event) {
      var id = event.target.dataset.toggle;
      Object(helper["e" /* fire */])(Object(helper["a" /* $ */])("#".concat(id)), 'toggle.base.trigger');
    }
  }, {
    key: "closeMeListener",
    value: function closeMeListener(event) {
      var plugin = event.type.split('.')[2];
      var pluginId = event.detail;
      Object(helper["b" /* $$ */])("[data-".concat(plugin, "]")).forEach(function (element) {
        if (pluginId !== element.dataset[plugin]) {
          Object(helper["e" /* fire */])(element, 'close.base.trigger');
        }
      });
    }
  }, {
    key: "addListeners",
    value: function addListeners() {
      Triggers.addOpenListener();
      Triggers.addCloseListener();
      Triggers.addToggleListener();
      Triggers.addCloseMeListener();
    }
  }, {
    key: "addOpenListener",
    value: function addOpenListener() {
      Object(helper["b" /* $$ */])('[data-open]').forEach(function (element) {
        Object(helper["i" /* off */])('click', element, Triggers.openListener);
        Object(helper["j" /* on */])('click', element, Triggers.openListener);
      });
    }
  }, {
    key: "addCloseListener",
    value: function addCloseListener() {
      Object(helper["b" /* $$ */])('[data-close]').forEach(function (element) {
        Object(helper["i" /* off */])('click', element, Triggers.closeListener);
        Object(helper["j" /* on */])('click', element, Triggers.closeListener);
      });
    }
  }, {
    key: "addToggleListener",
    value: function addToggleListener() {
      Object(helper["b" /* $$ */])('[data-toggle]').forEach(function (element) {
        Object(helper["i" /* off */])('click', element, Triggers.toggleListener);
        Object(helper["j" /* on */])('click', element, Triggers.toggleListener);
      });
    }
  }, {
    key: "addCloseMeListener",
    value: function addCloseMeListener() {
      var pluginNames = ['dropdown', 'modal', 'tooltip'];
      pluginNames.forEach(function (pluginName) {
        Object(helper["b" /* $$ */])("[data-".concat(pluginName, "]")).forEach(function (element) {
          Object(helper["i" /* off */])("closeme.base.".concat(pluginName), element, Triggers.closeMeListener);
          Object(helper["j" /* on */])("closeme.base.".concat(pluginName), element, Triggers.closeMeListener);
        });
      });
    }
  }]);

  return Triggers;
}();
// CONCATENATED MODULE: ./src/js/utility/index.js
/* concated harmony reexport Core */__webpack_require__.d(__webpack_exports__, "a", function() { return core_Core; });
/* concated harmony reexport Keyboard */__webpack_require__.d(__webpack_exports__, "b", function() { return keyboard_Keyboard; });
/* concated harmony reexport MediaQuery */__webpack_require__.d(__webpack_exports__, "c", function() { return mediaQuery_MediaQuery; });
/* concated harmony reexport Triggers */__webpack_require__.d(__webpack_exports__, "d", function() { return triggers_Triggers; });





/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./src/js/helper/index.js + 4 modules
var helper = __webpack_require__(0);

// EXTERNAL MODULE: ./src/js/utility/index.js + 4 modules
var utility = __webpack_require__(1);

// CONCATENATED MODULE: ./src/js/plugin/plugin.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var plugin_Plugin =
/*#__PURE__*/
function () {
  function Plugin(pluginName, element) {
    _classCallCheck(this, Plugin);

    this.element = element;
    this.elementId = element.id;
    this.pluginName = pluginName;
    this.pluginId = this.pluginName;
    this.element.setAttribute('data-base-plugin', this.pluginId);

    if (!this.element.hasAttribute("data-".concat(this.pluginName)) || this.element.getAttribute("data-".concat(this.pluginName)).length === 0) {
      this.element.setAttribute("data-".concat(this.pluginName), this.pluginId);
    }

    Object(helper["e" /* fire */])(this.element, "init.base.".concat(Object(helper["c" /* camelCase */])(this.pluginName)));
  }

  _createClass(Plugin, [{
    key: "setOptions",
    value: function setOptions(options, defaults) {
      if (options && options instanceof Object) {
        this.options = new Map([].concat(_toConsumableArray(defaults), _toConsumableArray(new Map(Object.entries(options))), _toConsumableArray(this.dataset(defaults))));
      } else {
        this.options = new Map([].concat(_toConsumableArray(defaults), _toConsumableArray(this.dataset(defaults))));
      }
    }
  }, {
    key: "dataset",
    value: function dataset(defaults) {
      return new Map(Object.entries(this.element.dataset).filter(function (dataset) {
        return defaults.has(dataset[0]);
      }).map(function (dataset) {
        if (dataset[1] === 'true' || dataset[1] == 'false') {
          dataset[1] = JSON.parse(dataset[1]);
        }

        return dataset;
      }));
    }
  }, {
    key: "pluginName",
    set: function set(pluginName) {
      this._pluginName = Object(helper["h" /* kebabCase */])(pluginName);
    },
    get: function get() {
      return this._pluginName;
    }
  }, {
    key: "pluginId",
    set: function set(pluginName) {
      this._pluginId = Object(helper["m" /* random */])(6, pluginName);
    },
    get: function get() {
      return this._pluginId;
    }
  }]);

  return Plugin;
}();
// CONCATENATED MODULE: ./src/js/plugin/positionable.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function positionable_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function positionable_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function positionable_createClass(Constructor, protoProps, staticProps) { if (protoProps) positionable_defineProperties(Constructor.prototype, protoProps); if (staticProps) positionable_defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var positionable_Positionable =
/*#__PURE__*/
function (_Plugin) {
  _inherits(Positionable, _Plugin);

  function Positionable() {
    positionable_classCallCheck(this, Positionable);

    return _possibleConstructorReturn(this, _getPrototypeOf(Positionable).apply(this, arguments));
  }

  positionable_createClass(Positionable, [{
    key: "init",
    value: function init() {
      this.originalPosition = this.options.get('position');
      this.originalAlignment = this.options.get('alignment');
    }
  }, {
    key: "setPosition",
    value: function setPosition(parentElement, childElement) {
      this.parentElement = parentElement;
      this.childElement = childElement;
      this.position();
      this.reposition();
    }
  }, {
    key: "position",
    value: function position() {
      var parentElementRect = Object(helper["f" /* getDimensions */])(this.parentElement);
      var childElementRect = Object(helper["f" /* getDimensions */])(this.childElement);
      var top;
      var left;

      switch (this.options.get('position')) {
        case 'top':
          top = childElementRect.offset.top - parentElementRect.height;
          left = childElementRect.offset.left;
          break;

        case 'left':
          top = childElementRect.offset.top;
          left = childElementRect.offset.left - parentElementRect.width;
          break;

        case 'right':
          top = childElementRect.offset.top;
          left = childElementRect.offset.left + childElementRect.width;
          break;

        default:
          top = childElementRect.offset.top + childElementRect.height;
          left = childElementRect.offset.left;
      }

      this.parentElement.style.top = "".concat(top, "px");
      this.parentElement.style.left = "".concat(left, "px");

      if (this.options.has('alignment')) {
        this.alignment();
      }
    }
  }, {
    key: "reposition",
    value: function reposition() {
      var out = Object(helper["l" /* outViewport */])(this.parentElement);

      if (Object.values(out).some(function (o) {
        return o < 0;
      })) {
        var position = Object.keys(out).reduce(function (a, b) {
          return out[a] < out[b] ? a : b;
        });
        this.parentElement.classList.remove('top', 'bottom', 'left', 'right');

        switch (position) {
          case 'bottom':
            this.parentElement.classList.add('top');
            this.options.set('position', 'top');
            break;

          case 'top':
            this.parentElement.classList.add('bottom');
            this.options.set('position', 'bottom');
            break;

          case 'left':
            this.parentElement.classList.add('right');
            this.options.set('position', 'right');
            break;

          case 'right':
            this.parentElement.classList.add('left');
            this.options.set('position', 'left');
            break;
        }

        this.position();
      }
    }
  }, {
    key: "alignment",
    value: function alignment() {
      var parentElementRect = Object(helper["f" /* getDimensions */])(this.parentElement);
      var childElementRect = Object(helper["f" /* getDimensions */])(this.childElement);
      var hAlignmentOffset = 0;
      var vAlignmentOffset = 0;

      switch (this.options.get('alignment')) {
        case 'top':
          vAlignmentOffset = childElementRect.offset.top;
          break;

        case 'bottom':
          vAlignmentOffset = childElementRect.offset.top + childElementRect.height - parentElementRect.height;
          break;

        case 'left':
          hAlignmentOffset = childElementRect.offset.left;
          break;

        case 'right':
          hAlignmentOffset = childElementRect.offset.left + childElementRect.width - parentElementRect.width;
          break;

        default:
          hAlignmentOffset = childElementRect.offset.left - (parentElementRect.width / 2 - childElementRect.width / 2);
          vAlignmentOffset = childElementRect.offset.top - (parentElementRect.height / 2 - childElementRect.height / 2);
      }

      switch (this.options.get('position')) {
        case 'left':
        case 'right':
          this.parentElement.style.top = "".concat(vAlignmentOffset, "px");
          break;

        case 'top':
        default:
          this.parentElement.style.left = "".concat(hAlignmentOffset, "px");
      }
    }
  }]);

  return Positionable;
}(plugin_Plugin);
// CONCATENATED MODULE: ./src/js/plugin/dropdown.js
function dropdown_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { dropdown_typeof = function _typeof(obj) { return typeof obj; }; } else { dropdown_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return dropdown_typeof(obj); }

function dropdown_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function dropdown_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function dropdown_createClass(Constructor, protoProps, staticProps) { if (protoProps) dropdown_defineProperties(Constructor.prototype, protoProps); if (staticProps) dropdown_defineProperties(Constructor, staticProps); return Constructor; }

function dropdown_possibleConstructorReturn(self, call) { if (call && (dropdown_typeof(call) === "object" || typeof call === "function")) { return call; } return dropdown_assertThisInitialized(self); }

function dropdown_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = dropdown_getPrototypeOf(object); if (object === null) break; } return object; }

function dropdown_getPrototypeOf(o) { dropdown_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return dropdown_getPrototypeOf(o); }

function dropdown_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) dropdown_setPrototypeOf(subClass, superClass); }

function dropdown_setPrototypeOf(o, p) { dropdown_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return dropdown_setPrototypeOf(o, p); }




var dropdown_Dropdown =
/*#__PURE__*/
function (_Positionable) {
  dropdown_inherits(Dropdown, _Positionable);

  function Dropdown(element, options) {
    var _this;

    dropdown_classCallCheck(this, Dropdown);

    _this = dropdown_possibleConstructorReturn(this, dropdown_getPrototypeOf(Dropdown).call(this, 'dropdown', element));
    /**
     * Default settings for plugin
     */

    _this.defaults = new Map(Object.entries({
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
      position: 'bottom'
    }));

    _this.setOptions(options, _this.defaults);

    _this.isOpen = false;
    _this.anchors = Object(helper["b" /* $$ */])("[data-open=\"".concat(_this.elementId, "\"], [data-toggle=\"").concat(_this.elementId, "\"]"));
    _this.currentAnchor = _this.anchors[0];

    _this.initCustomEvents();

    _this.initMouseEvents();

    _this.initUiEvents();

    utility["d" /* Triggers */].init();
    return _this;
  }
  /**
   * Opens the dropdown, and fires a bubbling event to close other dropdowns.
   * @fires Dropdown#closeme
   * @fires Dropdown#opened
   */


  dropdown_createClass(Dropdown, [{
    key: "open",
    value: function open() {
      /**
       * Fires to close other open dropdowns, typically when dropdown is opening
       * @event Dropdown#closeme
       */
      Object(helper["e" /* fire */])(this.element, 'closeme.base.dropdown', this.pluginId);
      this.element.style.display = 'block';
      this.setPosition(this.element, this.currentAnchor);
      Object(helper["e" /* fire */])(this.element, 'opened.base.dropdown');
    }
    /**
     * Closes the open dropdown.
     * @fires Dropdown#closed
     */

  }, {
    key: "close",
    value: function close() {
      this.isOpen = false;
      this.element.style.display = 'none';
      /**
       * Fires once the dropdown is no longer visible.
       * @event Dropdown#closed
       */

      Object(helper["e" /* fire */])(this.element, 'closed.base.dropdown');
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (!this.isOpen) {
        this.open();
      } else {
        this.close();
      }
    }
  }, {
    key: "setPosition",
    value: function setPosition(parentElement, childElement) {
      _get(dropdown_getPrototypeOf(Dropdown.prototype), "setPosition", this).call(this, parentElement, childElement);

      var top = parseInt(parentElement.style.top, 10);
      var left = parseInt(parentElement.style.left, 10);

      switch (this.options.get('position')) {
        case 'top':
          top -= this.options.get('vOffset');
          left += this.options.get('hOffset');
          break;

        case 'left':
          top += this.options.get('vOffset');
          left -= this.options.get('hOffset');
          break;

        case 'right':
        default:
          top += this.options.get('vOffset');
          left += this.options.get('hOffset');
      }

      parentElement.style.top = "".concat(top, "px");
      parentElement.style.left = "".concat(left, "px");
    }
  }, {
    key: "initCustomEvents",
    value: function initCustomEvents() {
      Object(helper["j" /* on */])('open.base.trigger', this.element, this.open.bind(this));
      Object(helper["j" /* on */])('close.base.trigger', this.element, this.close.bind(this));
      Object(helper["j" /* on */])('toggle.base.trigger', this.element, this.toggle.bind(this));
    }
  }, {
    key: "initMouseEvents",
    value: function initMouseEvents() {
      var _this2 = this;

      var timeout;
      this.anchors.forEach(function (anchor) {
        return Object(helper["j" /* on */])('mouseenter', anchor, function (event) {
          return _this2.currentAnchor = event.target;
        });
      });

      if (this.options.get('hover')) {
        this.anchors.forEach(function (anchor) {
          Object(helper["j" /* on */])('mouseenter', anchor, function () {
            clearTimeout(timeout);
            timeout = setTimeout(function () {
              return _this2.open();
            });
          });
          Object(helper["j" /* on */])('mouseleave', anchor, function () {
            clearTimeout(timeout);
            timeout = setTimeout(function () {
              return _this2.close();
            });
          });
        });
        Object(helper["j" /* on */])('mouseenter', this.element, function () {
          clearTimeout(timeout);
        });
        Object(helper["j" /* on */])('mouseleave', this.element, function () {
          clearTimeout(timeout);
          timeout = setTimeout(function () {
            return _this2.close();
          });
        });
      }
    }
  }, {
    key: "initUiEvents",
    value: function initUiEvents() {
      Object(helper["j" /* on */])('click', this.element, this.close.bind(this));
      Object(helper["j" /* on */])('resize', window, this.close.bind(this));
      Object(helper["j" /* on */])('scroll', window, this.close.bind(this));
    }
  }]);

  return Dropdown;
}(positionable_Positionable);
// CONCATENATED MODULE: ./src/js/plugin/dropdown-menu.js
function dropdown_menu_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { dropdown_menu_typeof = function _typeof(obj) { return typeof obj; }; } else { dropdown_menu_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return dropdown_menu_typeof(obj); }

function dropdown_menu_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function dropdown_menu_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function dropdown_menu_createClass(Constructor, protoProps, staticProps) { if (protoProps) dropdown_menu_defineProperties(Constructor.prototype, protoProps); if (staticProps) dropdown_menu_defineProperties(Constructor, staticProps); return Constructor; }

function dropdown_menu_possibleConstructorReturn(self, call) { if (call && (dropdown_menu_typeof(call) === "object" || typeof call === "function")) { return call; } return dropdown_menu_assertThisInitialized(self); }

function dropdown_menu_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function dropdown_menu_getPrototypeOf(o) { dropdown_menu_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return dropdown_menu_getPrototypeOf(o); }

function dropdown_menu_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) dropdown_menu_setPrototypeOf(subClass, superClass); }

function dropdown_menu_setPrototypeOf(o, p) { dropdown_menu_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return dropdown_menu_setPrototypeOf(o, p); }



var dropdown_menu_DropdownMenu =
/*#__PURE__*/
function (_Positionable) {
  dropdown_menu_inherits(DropdownMenu, _Positionable);

  /**
   * @param element
   * @param options
   */
  function DropdownMenu(element, options) {
    var _this;

    dropdown_menu_classCallCheck(this, DropdownMenu);

    _this = dropdown_menu_possibleConstructorReturn(this, dropdown_menu_getPrototypeOf(DropdownMenu).call(this, 'dropdownMenu', element));

    _this.setOptions(options, new Map());

    _this.subs = Object(helper["b" /* $$ */])('li > ul', _this.element);

    _this.subs.forEach(function (sub) {
      var anchor = sub.closest('li');
      anchor.classList.add('has-submenu');

      _this.initMouseEvents(sub, anchor);
    });

    return _this;
  }
  /**
   * @param sub
   * @param anchor
   */


  dropdown_menu_createClass(DropdownMenu, [{
    key: "open",
    value: function open(sub, anchor) {
      anchor.classList.add('is-opened');
      this.setPosition(sub, anchor);
      Object(helper["e" /* fire */])(this.element, 'opened.base.dropdown-menu');
    }
    /**
     * @param anchor
     */

  }, {
    key: "close",
    value: function close(anchor) {
      anchor.classList.remove('is-opened');
      Object(helper["e" /* fire */])(this.element, 'closed.base.dropdown-menu');
    }
    /**
     * @param sub
     * @param anchor
     */

  }, {
    key: "setPosition",
    value: function setPosition(sub, anchor) {
      var out = Object(helper["l" /* outViewport */])(sub);

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

  }, {
    key: "initMouseEvents",
    value: function initMouseEvents(sub, anchor) {
      Object(helper["j" /* on */])('mouseenter', anchor, this.open.bind(this, sub, anchor));
      Object(helper["j" /* on */])('mouseleave', anchor, this.close.bind(this, anchor));
    }
  }]);

  return DropdownMenu;
}(positionable_Positionable);
// CONCATENATED MODULE: ./src/js/plugin/equalizer.js
function equalizer_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { equalizer_typeof = function _typeof(obj) { return typeof obj; }; } else { equalizer_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return equalizer_typeof(obj); }

function equalizer_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function equalizer_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function equalizer_createClass(Constructor, protoProps, staticProps) { if (protoProps) equalizer_defineProperties(Constructor.prototype, protoProps); if (staticProps) equalizer_defineProperties(Constructor, staticProps); return Constructor; }

function equalizer_possibleConstructorReturn(self, call) { if (call && (equalizer_typeof(call) === "object" || typeof call === "function")) { return call; } return equalizer_assertThisInitialized(self); }

function equalizer_getPrototypeOf(o) { equalizer_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return equalizer_getPrototypeOf(o); }

function equalizer_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function equalizer_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) equalizer_setPrototypeOf(subClass, superClass); }

function equalizer_setPrototypeOf(o, p) { equalizer_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return equalizer_setPrototypeOf(o, p); }



var equalizer_Equalizer =
/*#__PURE__*/
function (_Plugin) {
  equalizer_inherits(Equalizer, _Plugin);

  function Equalizer(element, options) {
    var _this;

    equalizer_classCallCheck(this, Equalizer);

    _this = equalizer_possibleConstructorReturn(this, equalizer_getPrototypeOf(Equalizer).call(this, 'equalizer', element));
    /**
     * Default settings for plugin
     */

    _this.defaults = new Map(Object.entries({
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
      equalizeByRow: false
    }));

    _this.setOptions(options, _this.defaults);

    _this.watched = Object(helper["b" /* $$ */])('[data-equalizer-watch]', _this.element);

    _this.initUiEvents();

    var images = Object(helper["b" /* $$ */])('img', _this.element);

    if (images.length) {
      Object(helper["g" /* imageLoader */])(images, _this.reflow.bind(equalizer_assertThisInitialized(_this)));
    } else {
      _this.reflow();
    }

    return _this;
  }
  /**
   * Determines if the first 2 elements are not stacked.
   */


  equalizer_createClass(Equalizer, [{
    key: "initUiEvents",

    /**
     * Initializes UI events for Equalizer.
     */
    value: function initUiEvents() {
      var _this2 = this;

      this.reflowListener = function () {
        return _this2.reflow();
      };

      Object(helper["j" /* on */])('resize', window, this.reflowListener);
    }
    /**
     * Calls necessary functions to update Equalizer upon DOM change
     */

  }, {
    key: "reflow",
    value: function reflow() {
      if (!this.options.get('equalizeOnStack') && this.isStacked) {
        this.watched.forEach(function (element) {
          return element.style.height = 'auto';
        });
        return;
      }

      return this.options.get('equalizeByRow') ? this.adjustByRow() : this.adjust();
    }
    /**
     * Changes the CSS height property of each child in an Equalizer parent to match the tallest
     * @fires Equalizer#preequalized
     * @fires Equalizer#postequalized
     */

  }, {
    key: "adjust",
    value: function adjust() {
      var heights = [];
      this.watched.forEach(function (element) {
        element.style.height = 'auto';
        heights.push(element.offsetHeight);
      });
      var max = Math.max.apply(Math, heights);
      /**
       * Fires before the heights are applied
       * @event Equalizer#preequalized
       */

      Object(helper["e" /* fire */])(this.element, 'preequalized.base.equalizer');
      this.watched.forEach(function (element) {
        return element.style.height = "".concat(max, "px");
      });
      /**
       * Fires when the heights have been applied
       * @event Equalizer#postequalized
       */

      Object(helper["e" /* fire */])(this.element, 'postequalized.base.equalizer');
    }
    /**
     * Changes the CSS height property of each child in an Equalizer parent to match the tallest by row
     * @fires Equalizer#preequalized
     * @fires Equalizer#preequalizedrow
     * @fires Equalizer#postequalizedrow
     * @fires Equalizer#postequalized
     */

  }, {
    key: "adjustByRow",
    value: function adjustByRow() {
      var _this3 = this;

      var rows = this.groupByRow();
      /**
       * Fires before the heights are applied
       */

      Object(helper["e" /* fire */])(this.element, 'preequalized.base.equalizer');
      rows.forEach(function (row) {
        var heights = [];
        row.forEach(function (element) {
          return heights.push(element.offsetHeight);
        });
        /**
         * Fires before the heights per row are applied
         * @event Equalizer#preequalizedrow
         */

        Object(helper["e" /* fire */])(_this3.element, 'preequalizedrow.base.equalizer');
        var max = Math.max.apply(Math, heights);
        row.forEach(function (element) {
          return element.style.height = "".concat(max, "px");
        });
        /**
         * Fires when the heights per row have been applied
         * @event Equalizer#postequalizedrow
         */

        Object(helper["e" /* fire */])(_this3.element, 'postequalizedrow.base.equalizer');
      });
      /**
       * Fires when the heights have been applied
       * @event Equalizer#postequalized
       */

      Object(helper["e" /* fire */])(this.element, 'postequalized.base.equalizer');
    }
    /**
     * Finds the watchers with the same offset top value and retuns them in an array.
     * @returns An array of watchers grouped by row.
     */

  }, {
    key: "groupByRow",
    value: function groupByRow() {
      var lastElementOffsetTop = Object(helper["f" /* getDimensions */])(this.watched[0]).offset.top;
      var rows = [];
      var rowCount = 0;
      rows[rowCount] = [];
      this.watched.forEach(function (element) {
        element.style.height = 'auto';
        var elementOffsetTop = Object(helper["f" /* getDimensions */])(element).offset.top;

        if (elementOffsetTop !== lastElementOffsetTop) {
          rowCount += 1;
          rows[rowCount] = [];
          lastElementOffsetTop = elementOffsetTop;
        }

        rows[rowCount].push(element);
      });
      return rows;
    }
  }, {
    key: "isStacked",
    get: function get() {
      return this.watched.length >= 2 ? this.watched[0].getBoundingClientRect().top !== this.watched[1].getBoundingClientRect().top : false;
    }
  }]);

  return Equalizer;
}(plugin_Plugin);
// CONCATENATED MODULE: ./src/js/plugin/modal.js
function modal_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { modal_typeof = function _typeof(obj) { return typeof obj; }; } else { modal_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return modal_typeof(obj); }

function modal_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function modal_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function modal_createClass(Constructor, protoProps, staticProps) { if (protoProps) modal_defineProperties(Constructor.prototype, protoProps); if (staticProps) modal_defineProperties(Constructor, staticProps); return Constructor; }

function modal_possibleConstructorReturn(self, call) { if (call && (modal_typeof(call) === "object" || typeof call === "function")) { return call; } return modal_assertThisInitialized(self); }

function modal_getPrototypeOf(o) { modal_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return modal_getPrototypeOf(o); }

function modal_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function modal_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) modal_setPrototypeOf(subClass, superClass); }

function modal_setPrototypeOf(o, p) { modal_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return modal_setPrototypeOf(o, p); }




/**
 * Modal module.
 * @module Modal
 * @extends Plugin
 * @requires Core
 * @requires Keyboard
 * @requires Triggers
 */

var modal_Modal =
/*#__PURE__*/
function (_Plugin) {
  modal_inherits(Modal, _Plugin);

  /**
   * Creates a new instance of Modal.
   * @param element
   * @param options
   */
  function Modal(element, options) {
    var _this;

    modal_classCallCheck(this, Modal);

    _this = modal_possibleConstructorReturn(this, modal_getPrototypeOf(Modal).call(this, 'modal', element));
    /**
     * Default settings for plugin
     */

    _this.defaults = new Map(Object.entries({
      /**
       * Allows a click on the overlay to close the modal.
       * @option
       * @type {boolean}
       * @default true
       */
      closeOnClick: true,

      /**
       * Allows the modal to close if the user presses the `ESCAPE` key.
       * @option
       * @type {boolean}
       * @default true
       */
      closeOnEsc: true,

      /**
       * Link the location hash to the modal.
       * Set the location hash when the modal is opened/closed, and open/close the modal when the location changes.
       * @option
       * @type {boolean}
       * @default true
       */
      deepLink: true,

      /**
       * Allows adding additional class names to the reveal overlay.
       * @option
       * @type {string}
       * @default null
       */
      additionalOverlayClasses: undefined
    }));

    _this.setOptions(options, _this.defaults);

    _this.isOpen = false;

    _this.createOverlay();

    _this.initCustomEvents();

    utility["d" /* Triggers */].init();
    utility["b" /* Keyboard */].register(_this.pluginName, {
      'ESCAPE': 'close'
    });

    if (_this.options.get('deepLink') && window.location.hash === "#".concat(_this.element.id)) {
      utility["a" /* Core */].load(_this.open.bind(modal_assertThisInitialized(_this)));
    }

    return _this;
  }
  /**
   * Opens the Modal and closes all others by default.
   * @fires Modal#closeme
   * @fires Modal#opened
   */


  modal_createClass(Modal, [{
    key: "open",
    value: function open() {
      /**
       * Fires immediately before the modal opens.
       * Closes any other Modals that are currently open
       * @event Modal#closeme
       */
      Object(helper["e" /* fire */])(this.element, 'closeme.base.modal', this.pluginId);
      this.isOpen = true;
      this.element.style.display = 'block';
      this.overlay.style.display = 'block';
      this.disableScrollbar();
      this.addModalEvents();

      if (this.options.get('deepLink')) {
        this.updateHistory();
      }
      /**
       * Fires when the Modal has successfully opened.
       * @event Modal#opened
       */


      Object(helper["e" /* fire */])(this.element, 'opened.base.modal');
    }
    /**
     * Closes the Modal
     * @fires Modal#closed
     */

  }, {
    key: "close",
    value: function close() {
      this.isOpen = false;
      this.element.style.display = 'none';
      this.overlay.style.display = 'none';
      this.enableScrollbar();
      this.removeModalEvents();

      if (this.options.get('deepLink')) {
        this.resetHistory();
      }
      /**
       * Fires when the modal is done closing.
       * @event Modal#closed
       */


      Object(helper["e" /* fire */])(this.element, 'closed.base.modal');
    }
    /**
     * Toggles the open/closed state of a modal.
     */

  }, {
    key: "toggle",
    value: function toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }
    /**
     * Adds event listeners for the Modal.
     * @private
     */

  }, {
    key: "initCustomEvents",
    value: function initCustomEvents() {
      Object(helper["j" /* on */])('open.base.trigger', this.element, this.open.bind(this));
      Object(helper["j" /* on */])('close.base.trigger', this.element, this.close.bind(this));
      Object(helper["j" /* on */])('toggle.base.trigger', this.element, this.toggle.bind(this));
    }
    /**
     * Adds event listeners for the overlay.
     * @private
     */

  }, {
    key: "addModalEvents",
    value: function addModalEvents() {
      var _this2 = this;

      if (this.options.get('closeOnEsc')) {
        this.keyboardListener = function (event) {
          utility["b" /* Keyboard */].handleKey(event, _this2.pluginName, {
            close: _this2.close.bind(_this2)
          });
        };

        Object(helper["j" /* on */])('keydown', window, this.keyboardListener);
      }

      if (this.options.get('closeOnClick')) {
        this.overlayListener = function (event) {
          event.stopPropagation();

          if (event.target.closest('[data-base-plugin]') !== _this2.element) {
            _this2.close();
          }
        };

        Object(helper["j" /* on */])('click', this.overlay, this.overlayListener);
      }
    }
    /**
     * Removes global event listeners.
     * @private
     */

  }, {
    key: "removeModalEvents",
    value: function removeModalEvents() {
      if (this.options.get('closeOnEsc')) {
        Object(helper["i" /* off */])('keydown', window, this.keyboardListener);
      }

      if (this.options.get('closeOnClick')) {
        Object(helper["i" /* off */])('click', this.overlay, this.overlayListener);
      }
    }
    /**
     * Creates an overlay, which appears behind the Modal.
     * @private
     */

  }, {
    key: "createOverlay",
    value: function createOverlay() {
      this.overlay = Object(helper["d" /* createElement */])('div', {
        html: this.element,
        class: this.options.get('additionalOverlayClasses') ? "modal-overlay ".concat(this.options.get('additionalOverlayClasses')) : 'modal-overlay'
      });
      document.body.appendChild(this.overlay);
    }
    /**
     * Update or replace browser history
     * @private
     */

  }, {
    key: "updateHistory",
    value: function updateHistory() {
      var hash = "#".concat(this.elementId);

      if (window.location.hash === hash) {
        return;
      }

      if (window.history.pushState) {
        window.history.pushState({}, '', hash);
      } else {
        window.location.hash = hash;
      }
    }
    /**
     * Remove the history hash
     * @private
     */

  }, {
    key: "resetHistory",
    value: function resetHistory() {
      if (window.history.replaceState) {
        var urlWithoutHash = window.location.pathname + window.location.search;
        window.history.replaceState('', document.title, urlWithoutHash);
      } else {
        window.location.hash = '';
      }
    }
    /**
     * Disables the scrollbar when Modal is shown.
     * @private
     */

  }, {
    key: "disableScrollbar",
    value: function disableScrollbar() {
      document.documentElement.setAttribute('style', 'overflow: hidden;');
    }
    /**
     * Enables the scroll when Modal closes.
     * @private
     */

  }, {
    key: "enableScrollbar",
    value: function enableScrollbar() {
      document.documentElement.setAttribute('style', 'overflow: auto;');
    }
  }]);

  return Modal;
}(plugin_Plugin);
// CONCATENATED MODULE: ./src/js/plugin/off-canvas.js
function off_canvas_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { off_canvas_typeof = function _typeof(obj) { return typeof obj; }; } else { off_canvas_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return off_canvas_typeof(obj); }

function off_canvas_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function off_canvas_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function off_canvas_createClass(Constructor, protoProps, staticProps) { if (protoProps) off_canvas_defineProperties(Constructor.prototype, protoProps); if (staticProps) off_canvas_defineProperties(Constructor, staticProps); return Constructor; }

function off_canvas_possibleConstructorReturn(self, call) { if (call && (off_canvas_typeof(call) === "object" || typeof call === "function")) { return call; } return off_canvas_assertThisInitialized(self); }

function off_canvas_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function off_canvas_getPrototypeOf(o) { off_canvas_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return off_canvas_getPrototypeOf(o); }

function off_canvas_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) off_canvas_setPrototypeOf(subClass, superClass); }

function off_canvas_setPrototypeOf(o, p) { off_canvas_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return off_canvas_setPrototypeOf(o, p); }




var off_canvas_OffCanvas =
/*#__PURE__*/
function (_Plugin) {
  off_canvas_inherits(OffCanvas, _Plugin);

  /**
   * Creates a new instance of OffCanvas
   * @param element
   * @param options
   */
  function OffCanvas(element, options) {
    var _this;

    off_canvas_classCallCheck(this, OffCanvas);

    _this = off_canvas_possibleConstructorReturn(this, off_canvas_getPrototypeOf(OffCanvas).call(this, 'offCanvas', element));
    /**
     * Default settings for plugin
     */

    _this.defaults = new Map(Object.entries({
      /**
       * Target an off-canvas content container by ID that may be placed anywhere. If null the closest content container will be taken.
       * @option
       * @type {?string}
       * @default null
       */
      contentId: null,

      /**
       * Target an off-canvas content container by class name that should be placed closest to off-canvas panel.
       * @option
       * @type {string}
       * @default off-canvas-content
       */
      contentClass: 'off-canvas-content',

      /**
       * Allow the user to click outside of the menu to close it.
       * @option
       * @type {boolean}
       * @default true
       */
      closeOnClick: true,

      /**
       * Adds an overlay.
       * @option
       * @type {boolean}
       * @default true
       */
      contentOverlay: true
    }));

    _this.setOptions(options, _this.defaults);

    _this.setContent();

    _this.setPosition();

    _this.createOverlay();

    _this.initCustomEvents();

    utility["d" /* Triggers */].init();
    return _this;
  }
  /**
   * Opens the off-canvas menu.
   * @fires OffCanvas#opened
   */


  off_canvas_createClass(OffCanvas, [{
    key: "open",
    value: function open() {
      this.element.classList.add('is-open');
      this.content.classList.add("is-open-".concat(this.position));

      if (this.options.get('contentOverlay')) {
        this.overlay.classList.add('is-visible');
      }

      if (this.options.get('closeOnClick') === true && this.options.get('contentOverlay')) {
        this.overlay.classList.add('is-closable');
      }

      this.addOverlayEvent();
      /**
       * Fires when the off-canvas menu open transition is done.
       * @event OffCanvas#opened
       */

      Object(helper["e" /* fire */])(this.element, 'opened.base.off-canvas');
    }
    /**
     * Closes the off-canvas menu.
     * @fires OffCanvas#closed
     */

  }, {
    key: "close",
    value: function close() {
      this.element.classList.remove('is-open');
      this.content.classList.remove("is-open-".concat(this.position));

      if (this.options.get('contentOverlay')) {
        this.overlay.classList.remove('is-visible');
      }

      if (this.options.get('closeOnClick') === true && this.options.get('contentOverlay')) {
        this.overlay.classList.remove('is-closable');
      }

      this.removeOverlayEvent();
      /**
       * Fires when the off-canvas menu close transition is done.
       * @event OffCanvas#closed
       */

      Object(helper["e" /* fire */])(this.element, 'closed.base.off-canvas');
    }
    /**
     * Toggles the off-canvas menu open or closed.
     */

  }, {
    key: "toggle",
    value: function toggle() {
      if (this.element.classList.contains('is-open')) {
        this.close();
      } else {
        this.open();
      }
    }
    /**
     * Adds event listeners to the off-canvas.
     * @private
     */

  }, {
    key: "initCustomEvents",
    value: function initCustomEvents() {
      Object(helper["j" /* on */])('open.base.trigger', this.element, this.open.bind(this));
      Object(helper["j" /* on */])('close.base.trigger', this.element, this.close.bind(this));
      Object(helper["j" /* on */])('toggle.base.trigger', this.element, this.toggle.bind(this));
    }
  }, {
    key: "setContent",
    value: function setContent() {
      this.content = this.options.get('contentId') ? Object(helper["a" /* $ */])("#".concat(this.options.get('contentId'))) : Object(helper["a" /* $ */])(".".concat(this.options.get('contentClass')), this.element.parentElement);
    }
  }, {
    key: "setPosition",
    value: function setPosition() {
      var _this2 = this;

      var positionList = ['position-left', 'position-top', 'position-right', 'position-bottom'].filter(function (position) {
        return _this2.element.classList.contains(position);
      });
      this.position = positionList.length ? positionList[0].replace('position-', '') : 'left';
    }
  }, {
    key: "createOverlay",
    value: function createOverlay() {
      var overlay = Object(helper["a" /* $ */])('.js-off-canvas-overlay', this.element.parentElement);

      if (this.options.get('contentOverlay') && !overlay) {
        this.overlay = Object(helper["d" /* createElement */])('div', {
          class: 'js-off-canvas-overlay'
        });
        this.element.parentElement.append(this.overlay);
      } else if (this.options.get('contentOverlay') && overlay) {
        this.overlay = overlay;
      }
    }
  }, {
    key: "addOverlayEvent",
    value: function addOverlayEvent() {
      var _this3 = this;

      if (this.options.get('closeOnClick')) {
        this.overlayListener = function (event) {
          event.stopPropagation();

          _this3.close();
        };

        Object(helper["j" /* on */])('click', this.overlay, this.overlayListener);
      }
    }
  }, {
    key: "removeOverlayEvent",
    value: function removeOverlayEvent() {
      if (this.options.get('closeOnClick')) {
        Object(helper["i" /* off */])('click', this.overlay, this.overlayListener);
      }
    }
  }]);

  return OffCanvas;
}(plugin_Plugin);
// CONCATENATED MODULE: ./src/js/plugin/toggler.js
function toggler_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { toggler_typeof = function _typeof(obj) { return typeof obj; }; } else { toggler_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return toggler_typeof(obj); }

function toggler_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function toggler_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function toggler_createClass(Constructor, protoProps, staticProps) { if (protoProps) toggler_defineProperties(Constructor.prototype, protoProps); if (staticProps) toggler_defineProperties(Constructor, staticProps); return Constructor; }

function toggler_possibleConstructorReturn(self, call) { if (call && (toggler_typeof(call) === "object" || typeof call === "function")) { return call; } return toggler_assertThisInitialized(self); }

function toggler_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function toggler_getPrototypeOf(o) { toggler_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return toggler_getPrototypeOf(o); }

function toggler_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) toggler_setPrototypeOf(subClass, superClass); }

function toggler_setPrototypeOf(o, p) { toggler_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return toggler_setPrototypeOf(o, p); }




/**
 * Toggler plugin to toggle a css class
 */

var toggler_Toggler =
/*#__PURE__*/
function (_Plugin) {
  toggler_inherits(Toggler, _Plugin);

  /**
   * Creates a new instance of Toggler.
   * @param element
   * @param options
   */
  function Toggler(element, options) {
    var _this;

    toggler_classCallCheck(this, Toggler);

    _this = toggler_possibleConstructorReturn(this, toggler_getPrototypeOf(Toggler).call(this, 'toggler', element));
    /**
     * Default settings for plugin
     */

    _this.defaults = new Map(Object.entries({
      /**
       * Class of the element to toggle. It can be provided with or without "."
       * @option
       * @type {string}
       */
      toggler: undefined
    }));

    _this.setOptions(options, _this.defaults);

    _this.initCustomEvents();

    utility["d" /* Triggers */].init();
    return _this;
  }
  /**
   * Toggles the target class on the target element. An event is fired from the original trigger depending on if
   * the resultant state was "on" or "off".
   *
   * @function
   * @fires Toggler#on
   * @fires Toggler#off
   */


  toggler_createClass(Toggler, [{
    key: "toggle",
    value: function toggle() {
      var className = this.options.get('toggler').replace(/^\./, '');
      this.element.classList.toggle(className);

      if (this.element.classList.contains(className)) {
        /**
         * Fires if the target element has the class after a toggle.
         * @event Toggler#on
         */
        Object(helper["e" /* fire */])(this.element, 'on.base.toggler');
      } else {
        /**
         * Fires if the target element does not have the class after a toggle.
         * @event Toggler#off
         */
        Object(helper["e" /* fire */])(this.element, 'off.base.toggler');
      }
    }
    /**
     * Adds event listeners for the Toggler.
     * @private
     */

  }, {
    key: "initCustomEvents",
    value: function initCustomEvents() {
      Object(helper["j" /* on */])('toggle.base.trigger', this.element, this.toggle.bind(this));
    }
  }]);

  return Toggler;
}(plugin_Plugin);
// CONCATENATED MODULE: ./src/js/plugin/tooltip.js
function tooltip_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { tooltip_typeof = function _typeof(obj) { return typeof obj; }; } else { tooltip_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return tooltip_typeof(obj); }

function tooltip_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function tooltip_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function tooltip_createClass(Constructor, protoProps, staticProps) { if (protoProps) tooltip_defineProperties(Constructor.prototype, protoProps); if (staticProps) tooltip_defineProperties(Constructor, staticProps); return Constructor; }

function tooltip_possibleConstructorReturn(self, call) { if (call && (tooltip_typeof(call) === "object" || typeof call === "function")) { return call; } return tooltip_assertThisInitialized(self); }

function tooltip_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function tooltip_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { tooltip_get = Reflect.get; } else { tooltip_get = function _get(target, property, receiver) { var base = tooltip_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return tooltip_get(target, property, receiver || target); }

function tooltip_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = tooltip_getPrototypeOf(object); if (object === null) break; } return object; }

function tooltip_getPrototypeOf(o) { tooltip_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return tooltip_getPrototypeOf(o); }

function tooltip_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) tooltip_setPrototypeOf(subClass, superClass); }

function tooltip_setPrototypeOf(o, p) { tooltip_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return tooltip_setPrototypeOf(o, p); }



var tooltip_Tooltip =
/*#__PURE__*/
function (_Positionable) {
  tooltip_inherits(Tooltip, _Positionable);

  function Tooltip(element, options) {
    var _this;

    tooltip_classCallCheck(this, Tooltip);

    _this = tooltip_possibleConstructorReturn(this, tooltip_getPrototypeOf(Tooltip).call(this, 'tooltip', element));
    /**
     * Default settings for plugin
     */

    _this.defaults = new Map(Object.entries({
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
      anchorClass: 'has-tip'
    }));

    _this.setOptions(options, _this.defaults);

    _this.element.classList.add(_this.options.get('anchorClass'));

    _this.init();

    _this.createTooltip();

    _this.initCustomEvents();

    _this.initMouseEvents();

    return _this;
  }

  tooltip_createClass(Tooltip, [{
    key: "open",
    value: function open() {
      this.tooltip.style.display = 'block';
      this.setPosition(this.tooltip, this.element);
      Object(helper["e" /* fire */])(this.element, 'opened.base.tooltip');
    }
  }, {
    key: "setPosition",
    value: function setPosition(parentElement, childElement) {
      tooltip_get(tooltip_getPrototypeOf(Tooltip.prototype), "setPosition", this).call(this, parentElement, childElement);

      var top = parseInt(parentElement.style.top, 10);
      var left = parseInt(parentElement.style.left, 10);

      switch (this.options.get('position')) {
        case 'top':
          top -= this.options.get('tooltipWidth');
          break;

        case 'left':
          left -= this.options.get('tooltipWidth');
          break;

        case 'right':
          left += this.options.get('tooltipWidth');
          break;

        default:
          top += this.options.get('tooltipWidth');
      }

      parentElement.style.top = "".concat(top, "px");
      parentElement.style.left = "".concat(left, "px");
    }
  }, {
    key: "close",
    value: function close() {
      this.tooltip.style.display = 'none';
      Object(helper["e" /* fire */])(this.element, 'closed.base.tooltip');
    }
  }, {
    key: "createTooltip",
    value: function createTooltip() {
      this.tooltip = Object(helper["d" /* createElement */])('div', {
        text: this.element.title,
        id: this.pluginId,
        class: [this.options.get('tooltipClass'), this.options.get('position'), "align-".concat(this.options.get('alignment'))]
      });
      this.element.title = '';
      document.body.appendChild(this.tooltip);
    }
  }, {
    key: "initCustomEvents",
    value: function initCustomEvents() {
      Object(helper["j" /* on */])('open.base.trigger', this.element, this.open.bind(this));
      Object(helper["j" /* on */])('close.base.trigger', this.element, this.close.bind(this));
    }
  }, {
    key: "initMouseEvents",
    value: function initMouseEvents() {
      Object(helper["j" /* on */])('mouseenter', this.element, this.open.bind(this));
      Object(helper["j" /* on */])('mouseleave', this.element, this.close.bind(this));
    }
  }]);

  return Tooltip;
}(positionable_Positionable);
// CONCATENATED MODULE: ./src/js/plugin/index.js
/* concated harmony reexport Dropdown */__webpack_require__.d(__webpack_exports__, "a", function() { return dropdown_Dropdown; });
/* concated harmony reexport DropdownMenu */__webpack_require__.d(__webpack_exports__, "b", function() { return dropdown_menu_DropdownMenu; });
/* concated harmony reexport Equalizer */__webpack_require__.d(__webpack_exports__, "c", function() { return equalizer_Equalizer; });
/* concated harmony reexport Modal */__webpack_require__.d(__webpack_exports__, "d", function() { return modal_Modal; });
/* concated harmony reexport OffCanvas */__webpack_require__.d(__webpack_exports__, "e", function() { return off_canvas_OffCanvas; });
/* concated harmony reexport Toggler */__webpack_require__.d(__webpack_exports__, "f", function() { return toggler_Toggler; });
/* concated harmony reexport Tooltip */__webpack_require__.d(__webpack_exports__, "g", function() { return tooltip_Tooltip; });








/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);



var Base = {
  $: _helper__WEBPACK_IMPORTED_MODULE_2__[/* $ */ "a"],
  Dropdown: _plugin__WEBPACK_IMPORTED_MODULE_0__[/* Dropdown */ "a"],
  DropdownMenu: _plugin__WEBPACK_IMPORTED_MODULE_0__[/* DropdownMenu */ "b"],
  Equalizer: _plugin__WEBPACK_IMPORTED_MODULE_0__[/* Equalizer */ "c"],
  MediaQuery: _utility__WEBPACK_IMPORTED_MODULE_1__[/* MediaQuery */ "c"],
  Modal: _plugin__WEBPACK_IMPORTED_MODULE_0__[/* Modal */ "d"],
  OffCanvas: _plugin__WEBPACK_IMPORTED_MODULE_0__[/* OffCanvas */ "e"],
  Toggler: _plugin__WEBPACK_IMPORTED_MODULE_0__[/* Toggler */ "f"],
  Tooltip: _plugin__WEBPACK_IMPORTED_MODULE_0__[/* Tooltip */ "g"]
};
window['Base'] = Base;

/***/ })
/******/ ]);
//# sourceMappingURL=base.js.map