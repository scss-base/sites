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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);

var Base = {
  $: _helper__WEBPACK_IMPORTED_MODULE_0__[/* $ */ "a"]
};
window['Base'] = Base;

/***/ })
/******/ ]);
//# sourceMappingURL=base.core.js.map