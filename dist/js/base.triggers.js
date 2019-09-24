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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/js/helper/dom.js
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
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

/***/ 1:
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
// CONCATENATED MODULE: ./src/js/utility/media-query.js
function media_query_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function media_query_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function media_query_createClass(Constructor, protoProps, staticProps) { if (protoProps) media_query_defineProperties(Constructor.prototype, protoProps); if (staticProps) media_query_defineProperties(Constructor, staticProps); return Constructor; }


var media_query_MediaQuery =
/*#__PURE__*/
function () {
  function MediaQuery() {
    media_query_classCallCheck(this, MediaQuery);
  }

  media_query_createClass(MediaQuery, null, [{
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
/* concated harmony reexport MediaQuery */__webpack_require__.d(__webpack_exports__, "c", function() { return media_query_MediaQuery; });
/* concated harmony reexport Triggers */__webpack_require__.d(__webpack_exports__, "d", function() { return triggers_Triggers; });





/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

window['Base'] = Object.assign(Object.assign({}, window['Base']), {
  Triggers: _utility__WEBPACK_IMPORTED_MODULE_0__[/* Triggers */ "d"]
});

/***/ })

/******/ });
//# sourceMappingURL=base.triggers.js.map