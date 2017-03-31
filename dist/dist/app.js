/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(10)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jsoneditor_dist_jsoneditor_minimalist_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jsoneditor_dist_jsoneditor_minimalist_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jsoneditor_dist_jsoneditor_minimalist_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jsoneditor_dist_jsoneditor_min_css__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jsoneditor_dist_jsoneditor_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jsoneditor_dist_jsoneditor_min_css__);





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'json-editor',
  data: function data() {
    return {
      editor: null
    };
  },

  props: {
    json: {
      required: true
    },
    options: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  mounted: function mounted() {
    var container = this.$refs.jsoneditor;
    var options = this.options;
    this.editor = new __WEBPACK_IMPORTED_MODULE_0_jsoneditor_dist_jsoneditor_minimalist_js___default.a(container, options);
    this.editor.set(this.json);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.editor) {
      this.editor.destroy();
      this.editor = null;
    }
  }
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "jsoneditor"
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a9983da8", module.exports)
  }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("12a70dfe", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-a9983da8\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./JsonEditor.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-a9983da8\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./JsonEditor.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * jsoneditor.js
 *
 * @brief
 * JSONEditor is a web-based tool to view, edit, format, and validate JSON.
 * It has various modes such as a tree editor, a code editor, and a plain text
 * editor.
 *
 * Supported browsers: Chrome, Firefox, Safari, Opera, Internet Explorer 8+
 *
 * @license
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 *
 * Copyright (c) 2011-2017 Jos de Jong, http://jsoneditoronline.org
 *
 * @author  Jos de Jong, <wjosdejong@gmail.com>
 * @version 5.5.11
 * @date    2017-01-06
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["JSONEditor"] = factory();
	else
		root["JSONEditor"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Ajv;
	try {
	  Ajv = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"ajv\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	}
	catch (err) {
	  // no problem... when we need Ajv we will throw a neat exception
	}

	var treemode = __webpack_require__(1);
	var textmode = __webpack_require__(12);
	var util = __webpack_require__(4);

	/**
	 * @constructor JSONEditor
	 * @param {Element} container    Container element
	 * @param {Object}  [options]    Object with options. available options:
	 *                               {String} mode        Editor mode. Available values:
	 *                                                    'tree' (default), 'view',
	 *                                                    'form', 'text', and 'code'.
	 *                               {function} onChange  Callback method, triggered
	 *                                                    on change of contents
	 *                               {function} onError   Callback method, triggered
	 *                                                    when an error occurs
	 *                               {Boolean} search     Enable search box.
	 *                                                    True by default
	 *                                                    Only applicable for modes
	 *                                                    'tree', 'view', and 'form'
	 *                               {Boolean} history    Enable history (undo/redo).
	 *                                                    True by default
	 *                                                    Only applicable for modes
	 *                                                    'tree', 'view', and 'form'
	 *                               {String} name        Field name for the root node.
	 *                                                    Only applicable for modes
	 *                                                    'tree', 'view', and 'form'
	 *                               {Number} indentation     Number of indentation
	 *                                                        spaces. 4 by default.
	 *                                                        Only applicable for
	 *                                                        modes 'text' and 'code'
	 *                               {boolean} escapeUnicode  If true, unicode
	 *                                                        characters are escaped.
	 *                                                        false by default.
	 *                               {boolean} sortObjectKeys If true, object keys are
	 *                                                        sorted before display.
	 *                                                        false by default.
	 * @param {Object | undefined} json JSON object
	 */
	function JSONEditor (container, options, json) {
	  if (!(this instanceof JSONEditor)) {
	    throw new Error('JSONEditor constructor called without "new".');
	  }

	  // check for unsupported browser (IE8 and older)
	  var ieVersion = util.getInternetExplorerVersion();
	  if (ieVersion != -1 && ieVersion < 9) {
	    throw new Error('Unsupported browser, IE9 or newer required. ' +
	        'Please install the newest version of your browser.');
	  }

	  if (options) {
	    // check for deprecated options
	    if (options.error) {
	      console.warn('Option "error" has been renamed to "onError"');
	      options.onError = options.error;
	      delete options.error;
	    }
	    if (options.change) {
	      console.warn('Option "change" has been renamed to "onChange"');
	      options.onChange = options.change;
	      delete options.change;
	    }
	    if (options.editable) {
	      console.warn('Option "editable" has been renamed to "onEditable"');
	      options.onEditable = options.editable;
	      delete options.editable;
	    }

	    // validate options
	    if (options) {
	      var VALID_OPTIONS = [
	        'ace', 'theme',
	        'ajv', 'schema',
	        'onChange', 'onEditable', 'onError', 'onModeChange',
	        'escapeUnicode', 'history', 'search', 'mode', 'modes', 'name', 'indentation', 'sortObjectKeys'
	      ];

	      Object.keys(options).forEach(function (option) {
	        if (VALID_OPTIONS.indexOf(option) === -1) {
	          console.warn('Unknown option "' + option + '". This option will be ignored');
	        }
	      });
	    }
	  }

	  if (arguments.length) {
	    this._create(container, options, json);
	  }
	}

	/**
	 * Configuration for all registered modes. Example:
	 * {
	 *     tree: {
	 *         mixin: TreeEditor,
	 *         data: 'json'
	 *     },
	 *     text: {
	 *         mixin: TextEditor,
	 *         data: 'text'
	 *     }
	 * }
	 *
	 * @type { Object.<String, {mixin: Object, data: String} > }
	 */
	JSONEditor.modes = {};

	// debounce interval for JSON schema vaidation in milliseconds
	JSONEditor.prototype.DEBOUNCE_INTERVAL = 150;

	/**
	 * Create the JSONEditor
	 * @param {Element} container    Container element
	 * @param {Object}  [options]    See description in constructor
	 * @param {Object | undefined} json JSON object
	 * @private
	 */
	JSONEditor.prototype._create = function (container, options, json) {
	  this.container = container;
	  this.options = options || {};
	  this.json = json || {};

	  var mode = this.options.mode || 'tree';
	  this.setMode(mode);
	};

	/**
	 * Destroy the editor. Clean up DOM, event listeners, and web workers.
	 */
	JSONEditor.prototype.destroy = function () {};

	/**
	 * Set JSON object in editor
	 * @param {Object | undefined} json      JSON data
	 */
	JSONEditor.prototype.set = function (json) {
	  this.json = json;
	};

	/**
	 * Get JSON from the editor
	 * @returns {Object} json
	 */
	JSONEditor.prototype.get = function () {
	  return this.json;
	};

	/**
	 * Set string containing JSON for the editor
	 * @param {String | undefined} jsonText
	 */
	JSONEditor.prototype.setText = function (jsonText) {
	  this.json = util.parse(jsonText);
	};

	/**
	 * Get stringified JSON contents from the editor
	 * @returns {String} jsonText
	 */
	JSONEditor.prototype.getText = function () {
	  return JSON.stringify(this.json);
	};

	/**
	 * Set a field name for the root node.
	 * @param {String | undefined} name
	 */
	JSONEditor.prototype.setName = function (name) {
	  if (!this.options) {
	    this.options = {};
	  }
	  this.options.name = name;
	};

	/**
	 * Get the field name for the root node.
	 * @return {String | undefined} name
	 */
	JSONEditor.prototype.getName = function () {
	  return this.options && this.options.name;
	};

	/**
	 * Change the mode of the editor.
	 * JSONEditor will be extended with all methods needed for the chosen mode.
	 * @param {String} mode     Available modes: 'tree' (default), 'view', 'form',
	 *                          'text', and 'code'.
	 */
	JSONEditor.prototype.setMode = function (mode) {
	  var container = this.container;
	  var options = util.extend({}, this.options);
	  var oldMode = options.mode;
	  var data;
	  var name;

	  options.mode = mode;
	  var config = JSONEditor.modes[mode];
	  if (config) {
	    try {
	      var asText = (config.data == 'text');
	      name = this.getName();
	      data = this[asText ? 'getText' : 'get'](); // get text or json

	      this.destroy();
	      util.clear(this);
	      util.extend(this, config.mixin);
	      this.create(container, options);

	      this.setName(name);
	      this[asText ? 'setText' : 'set'](data); // set text or json

	      if (typeof config.load === 'function') {
	        try {
	          config.load.call(this);
	        }
	        catch (err) {
	          console.error(err);
	        }
	      }

	      if (typeof options.onModeChange === 'function' && mode !== oldMode) {
	        try {
	          options.onModeChange(mode, oldMode);
	        }
	        catch (err) {
	          console.error(err);
	        }
	      }
	    }
	    catch (err) {
	      this._onError(err);
	    }
	  }
	  else {
	    throw new Error('Unknown mode "' + options.mode + '"');
	  }
	};

	/**
	 * Get the current mode
	 * @return {string}
	 */
	JSONEditor.prototype.getMode = function () {
	  return this.options.mode;
	};

	/**
	 * Throw an error. If an error callback is configured in options.error, this
	 * callback will be invoked. Else, a regular error is thrown.
	 * @param {Error} err
	 * @private
	 */
	JSONEditor.prototype._onError = function(err) {
	  if (this.options && typeof this.options.onError === 'function') {
	    this.options.onError(err);
	  }
	  else {
	    throw err;
	  }
	};

	/**
	 * Set a JSON schema for validation of the JSON object.
	 * To remove the schema, call JSONEditor.setSchema(null)
	 * @param {Object | null} schema
	 */
	JSONEditor.prototype.setSchema = function (schema) {
	  // compile a JSON schema validator if a JSON schema is provided
	  if (schema) {
	    var ajv;
	    try {
	      // grab ajv from options if provided, else create a new instance
	      ajv = this.options.ajv || Ajv({ allErrors: true, verbose: true });

	    }
	    catch (err) {
	      console.warn('Failed to create an instance of Ajv, JSON Schema validation is not available. Please use a JSONEditor bundle including Ajv, or pass an instance of Ajv as via the configuration option `ajv`.');
	    }

	    if (ajv) {
	      this.validateSchema = ajv.compile(schema);

	      // add schema to the options, so that when switching to an other mode,
	      // the set schema is not lost
	      this.options.schema = schema;

	      // validate now
	      this.validate();
	    }

	    this.refresh(); // update DOM
	  }
	  else {
	    // remove current schema
	    this.validateSchema = null;
	    this.options.schema = null;
	    this.validate(); // to clear current error messages
	    this.refresh();  // update DOM
	  }
	};

	/**
	 * Validate current JSON object against the configured JSON schema
	 * Throws an exception when no JSON schema is configured
	 */
	JSONEditor.prototype.validate = function () {
	  // must be implemented by treemode and textmode
	};

	/**
	 * Refresh the rendered contents
	 */
	JSONEditor.prototype.refresh = function () {
	  // can be implemented by treemode and textmode
	};

	/**
	 * Register a plugin with one ore multiple modes for the JSON Editor.
	 *
	 * A mode is described as an object with properties:
	 *
	 * - `mode: String`           The name of the mode.
	 * - `mixin: Object`          An object containing the mixin functions which
	 *                            will be added to the JSONEditor. Must contain functions
	 *                            create, get, getText, set, and setText. May have
	 *                            additional functions.
	 *                            When the JSONEditor switches to a mixin, all mixin
	 *                            functions are added to the JSONEditor, and then
	 *                            the function `create(container, options)` is executed.
	 * - `data: 'text' | 'json'`  The type of data that will be used to load the mixin.
	 * - `[load: function]`       An optional function called after the mixin
	 *                            has been loaded.
	 *
	 * @param {Object | Array} mode  A mode object or an array with multiple mode objects.
	 */
	JSONEditor.registerMode = function (mode) {
	  var i, prop;

	  if (util.isArray(mode)) {
	    // multiple modes
	    for (i = 0; i < mode.length; i++) {
	      JSONEditor.registerMode(mode[i]);
	    }
	  }
	  else {
	    // validate the new mode
	    if (!('mode' in mode)) throw new Error('Property "mode" missing');
	    if (!('mixin' in mode)) throw new Error('Property "mixin" missing');
	    if (!('data' in mode)) throw new Error('Property "data" missing');
	    var name = mode.mode;
	    if (name in JSONEditor.modes) {
	      throw new Error('Mode "' + name + '" already registered');
	    }

	    // validate the mixin
	    if (typeof mode.mixin.create !== 'function') {
	      throw new Error('Required function "create" missing on mixin');
	    }
	    var reserved = ['setMode', 'registerMode', 'modes'];
	    for (i = 0; i < reserved.length; i++) {
	      prop = reserved[i];
	      if (prop in mode.mixin) {
	        throw new Error('Reserved property "' + prop + '" not allowed in mixin');
	      }
	    }

	    JSONEditor.modes[name] = mode;
	  }
	};

	// register tree and text modes
	JSONEditor.registerMode(treemode);
	JSONEditor.registerMode(textmode);

	module.exports = JSONEditor;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';


	var Highlighter = __webpack_require__(2);
	var History = __webpack_require__(3);
	var SearchBox = __webpack_require__(6);
	var ContextMenu = __webpack_require__(7);
	var Node = __webpack_require__(8);
	var ModeSwitcher = __webpack_require__(11);
	var util = __webpack_require__(4);

	// create a mixin with the functions for tree mode
	var treemode = {};

	/**
	 * Create a tree editor
	 * @param {Element} container    Container element
	 * @param {Object}  [options]    Object with options. available options:
	 *                               {String} mode            Editor mode. Available values:
	 *                                                        'tree' (default), 'view',
	 *                                                        and 'form'.
	 *                               {Boolean} search         Enable search box.
	 *                                                        True by default
	 *                               {Boolean} history        Enable history (undo/redo).
	 *                                                        True by default
	 *                               {function} onChange      Callback method, triggered
	 *                                                        on change of contents
	 *                               {String} name            Field name for the root node.
	 *                               {boolean} escapeUnicode  If true, unicode
	 *                                                        characters are escaped.
	 *                                                        false by default.
	 *                               {Object} schema          A JSON Schema for validation
	 * @private
	 */
	treemode.create = function (container, options) {
	  if (!container) {
	    throw new Error('No container element provided.');
	  }
	  this.container = container;
	  this.dom = {};
	  this.highlighter = new Highlighter();
	  this.selection = undefined; // will hold the last input selection
	  this.multiselection = {
	    nodes: []
	  };
	  this.validateSchema = null; // will be set in .setSchema(schema)
	  this.errorNodes = [];

	  this.node = null;
	  this.focusTarget = null;

	  this._setOptions(options);

	  if (this.options.history && this.options.mode !== 'view') {
	    this.history = new History(this);
	  }

	  this._createFrame();
	  this._createTable();
	};

	/**
	 * Destroy the editor. Clean up DOM, event listeners, and web workers.
	 */
	treemode.destroy = function () {
	  if (this.frame && this.container && this.frame.parentNode == this.container) {
	    this.container.removeChild(this.frame);
	    this.frame = null;
	  }
	  this.container = null;

	  this.dom = null;

	  this.clear();
	  this.node = null;
	  this.focusTarget = null;
	  this.selection = null;
	  this.multiselection = null;
	  this.errorNodes = null;
	  this.validateSchema = null;
	  this._debouncedValidate = null;

	  if (this.history) {
	    this.history.destroy();
	    this.history = null;
	  }

	  if (this.searchBox) {
	    this.searchBox.destroy();
	    this.searchBox = null;
	  }

	  if (this.modeSwitcher) {
	    this.modeSwitcher.destroy();
	    this.modeSwitcher = null;
	  }
	};

	/**
	 * Initialize and set default options
	 * @param {Object}  [options]    See description in constructor
	 * @private
	 */
	treemode._setOptions = function (options) {
	  this.options = {
	    search: true,
	    history: true,
	    mode: 'tree',
	    name: undefined,   // field name of root node
	    schema: null
	  };

	  // copy all options
	  if (options) {
	    for (var prop in options) {
	      if (options.hasOwnProperty(prop)) {
	        this.options[prop] = options[prop];
	      }
	    }
	  }

	  // compile a JSON schema validator if a JSON schema is provided
	  this.setSchema(this.options.schema);

	  // create a debounced validate function
	  this._debouncedValidate = util.debounce(this.validate.bind(this), this.DEBOUNCE_INTERVAL);
	};

	/**
	 * Set JSON object in editor
	 * @param {Object | undefined} json      JSON data
	 * @param {String}             [name]    Optional field name for the root node.
	 *                                       Can also be set using setName(name).
	 */
	treemode.set = function (json, name) {
	  // adjust field name for root node
	  if (name) {
	    // TODO: deprecated since version 2.2.0. Cleanup some day.
	    console.warn('Second parameter "name" is deprecated. Use setName(name) instead.');
	    this.options.name = name;
	  }

	  // verify if json is valid JSON, ignore when a function
	  if (json instanceof Function || (json === undefined)) {
	    this.clear();
	  }
	  else {
	    this.content.removeChild(this.table);  // Take the table offline

	    // replace the root node
	    var params = {
	      field: this.options.name,
	      value: json
	    };
	    var node = new Node(this, params);
	    this._setRoot(node);

	    // validate JSON schema (if configured)
	    this.validate();

	    // expand
	    var recurse = false;
	    this.node.expand(recurse);

	    this.content.appendChild(this.table);  // Put the table online again
	  }

	  // TODO: maintain history, store last state and previous document
	  if (this.history) {
	    this.history.clear();
	  }

	  // clear search
	  if (this.searchBox) {
	    this.searchBox.clear();
	  }
	};

	/**
	 * Get JSON object from editor
	 * @return {Object | undefined} json
	 */
	treemode.get = function () {
	  // remove focus from currently edited node
	  if (this.focusTarget) {
	    var node = Node.getNodeFromTarget(this.focusTarget);
	    if (node) {
	      node.blur();
	    }
	  }

	  if (this.node) {
	    return this.node.getValue();
	  }
	  else {
	    return undefined;
	  }
	};

	/**
	 * Get the text contents of the editor
	 * @return {String} jsonText
	 */
	treemode.getText = function() {
	  return JSON.stringify(this.get());
	};

	/**
	 * Set the text contents of the editor
	 * @param {String} jsonText
	 */
	treemode.setText = function(jsonText) {
	  this.set(util.parse(jsonText));
	};

	/**
	 * Set a field name for the root node.
	 * @param {String | undefined} name
	 */
	treemode.setName = function (name) {
	  this.options.name = name;
	  if (this.node) {
	    this.node.updateField(this.options.name);
	  }
	};

	/**
	 * Get the field name for the root node.
	 * @return {String | undefined} name
	 */
	treemode.getName = function () {
	  return this.options.name;
	};

	/**
	 * Set focus to the editor. Focus will be set to:
	 * - the first editable field or value, or else
	 * - to the expand button of the root node, or else
	 * - to the context menu button of the root node, or else
	 * - to the first button in the top menu
	 */
	treemode.focus = function () {
	  var input = this.content.querySelector('[contenteditable=true]');
	  if (input) {
	    input.focus();
	  }
	  else if (this.node.dom.expand) {
	    this.node.dom.expand.focus();
	  }
	  else if (this.node.dom.menu) {
	    this.node.dom.menu.focus();
	  }
	  else {
	    // focus to the first button in the menu
	    input = this.frame.querySelector('button');
	    if (input) {
	      input.focus();
	    }
	  }
	};

	/**
	 * Remove the root node from the editor
	 */
	treemode.clear = function () {
	  if (this.node) {
	    this.node.collapse();
	    this.tbody.removeChild(this.node.getDom());
	    delete this.node;
	  }
	};

	/**
	 * Set the root node for the json editor
	 * @param {Node} node
	 * @private
	 */
	treemode._setRoot = function (node) {
	  this.clear();

	  this.node = node;

	  // append to the dom
	  this.tbody.appendChild(node.getDom());
	};

	/**
	 * Search text in all nodes
	 * The nodes will be expanded when the text is found one of its childs,
	 * else it will be collapsed. Searches are case insensitive.
	 * @param {String} text
	 * @return {Object[]} results  Array with nodes containing the search results
	 *                             The result objects contains fields:
	 *                             - {Node} node,
	 *                             - {String} elem  the dom element name where
	 *                                              the result is found ('field' or
	 *                                              'value')
	 */
	treemode.search = function (text) {
	  var results;
	  if (this.node) {
	    this.content.removeChild(this.table);  // Take the table offline
	    results = this.node.search(text);
	    this.content.appendChild(this.table);  // Put the table online again
	  }
	  else {
	    results = [];
	  }

	  return results;
	};

	/**
	 * Expand all nodes
	 */
	treemode.expandAll = function () {
	  if (this.node) {
	    this.content.removeChild(this.table);  // Take the table offline
	    this.node.expand();
	    this.content.appendChild(this.table);  // Put the table online again
	  }
	};

	/**
	 * Collapse all nodes
	 */
	treemode.collapseAll = function () {
	  if (this.node) {
	    this.content.removeChild(this.table);  // Take the table offline
	    this.node.collapse();
	    this.content.appendChild(this.table);  // Put the table online again
	  }
	};

	/**
	 * The method onChange is called whenever a field or value is changed, created,
	 * deleted, duplicated, etc.
	 * @param {String} action  Change action. Available values: "editField",
	 *                         "editValue", "changeType", "appendNode",
	 *                         "removeNode", "duplicateNode", "moveNode", "expand",
	 *                         "collapse".
	 * @param {Object} params  Object containing parameters describing the change.
	 *                         The parameters in params depend on the action (for
	 *                         example for "editValue" the Node, old value, and new
	 *                         value are provided). params contains all information
	 *                         needed to undo or redo the action.
	 * @private
	 */
	treemode._onAction = function (action, params) {
	  // add an action to the history
	  if (this.history) {
	    this.history.add(action, params);
	  }

	  this._onChange();
	};

	/**
	 * Handle a change:
	 * - Validate JSON schema
	 * - Send a callback to the onChange listener if provided
	 * @private
	 */
	treemode._onChange = function () {
	  // validate JSON schema (if configured)
	  this._debouncedValidate();

	  // trigger the onChange callback
	  if (this.options.onChange) {
	    try {
	      this.options.onChange();
	    }
	    catch (err) {
	      console.error('Error in onChange callback: ', err);
	    }
	  }
	};

	/**
	 * Validate current JSON object against the configured JSON schema
	 * Throws an exception when no JSON schema is configured
	 */
	treemode.validate = function () {
	  // clear all current errors
	  if (this.errorNodes) {
	    this.errorNodes.forEach(function (node) {
	      node.setError(null);
	    });
	  }

	  var root = this.node;
	  if (!root) { // TODO: this should be redundant but is needed on mode switch
	    return;
	  }

	  // check for duplicate keys
	  var duplicateErrors = root.validate();

	  // validate the JSON
	  var schemaErrors = [];
	  if (this.validateSchema) {
	    var valid = this.validateSchema(root.getValue());
	    if (!valid) {
	      // apply all new errors
	      schemaErrors = this.validateSchema.errors
	          .map(function (error) {
	            return util.improveSchemaError(error);
	          })
	          .map(function findNode (error) {
	            return {
	              node: root.findNode(error.dataPath),
	              error: error
	            }
	          })
	          .filter(function hasNode (entry) {
	            return entry.node != null
	          });
	    }
	  }

	  // display the error in the nodes with a problem
	  this.errorNodes = duplicateErrors
	      .concat(schemaErrors)
	      .reduce(function expandParents (all, entry) {
	        // expand parents, then merge such that parents come first and
	        // original entries last
	        return entry.node
	            .findParents()
	            .map(function (parent) {
	              return {
	                node: parent,
	                child: entry.node,
	                error: {
	                  message: parent.type === 'object'
	                      ? 'Contains invalid properties' // object
	                      : 'Contains invalid items'      // array
	                }
	              };
	            })
	            .concat(all, [entry]);
	      }, [])
	      // TODO: dedupe the parent nodes
	      .map(function setError (entry) {
	        entry.node.setError(entry.error, entry.child);
	        return entry.node;
	      });
	};

	/**
	 * Refresh the rendered contents
	 */
	treemode.refresh = function () {
	  if (this.node) {
	    this.node.updateDom({recurse: true});
	  }
	};

	/**
	 * Start autoscrolling when given mouse position is above the top of the
	 * editor contents, or below the bottom.
	 * @param {Number} mouseY  Absolute mouse position in pixels
	 */
	treemode.startAutoScroll = function (mouseY) {
	  var me = this;
	  var content = this.content;
	  var top = util.getAbsoluteTop(content);
	  var height = content.clientHeight;
	  var bottom = top + height;
	  var margin = 24;
	  var interval = 50; // ms

	  if ((mouseY < top + margin) && content.scrollTop > 0) {
	    this.autoScrollStep = ((top + margin) - mouseY) / 3;
	  }
	  else if (mouseY > bottom - margin &&
	      height + content.scrollTop < content.scrollHeight) {
	    this.autoScrollStep = ((bottom - margin) - mouseY) / 3;
	  }
	  else {
	    this.autoScrollStep = undefined;
	  }

	  if (this.autoScrollStep) {
	    if (!this.autoScrollTimer) {
	      this.autoScrollTimer = setInterval(function () {
	        if (me.autoScrollStep) {
	          content.scrollTop -= me.autoScrollStep;
	        }
	        else {
	          me.stopAutoScroll();
	        }
	      }, interval);
	    }
	  }
	  else {
	    this.stopAutoScroll();
	  }
	};

	/**
	 * Stop auto scrolling. Only applicable when scrolling
	 */
	treemode.stopAutoScroll = function () {
	  if (this.autoScrollTimer) {
	    clearTimeout(this.autoScrollTimer);
	    delete this.autoScrollTimer;
	  }
	  if (this.autoScrollStep) {
	    delete this.autoScrollStep;
	  }
	};


	/**
	 * Set the focus to an element in the editor, set text selection, and
	 * set scroll position.
	 * @param {Object} selection  An object containing fields:
	 *                            {Element | undefined} dom     The dom element
	 *                                                          which has focus
	 *                            {Range | TextRange} range     A text selection
	 *                            {Node[]} nodes                Nodes in case of multi selection
	 *                            {Number} scrollTop            Scroll position
	 */
	treemode.setSelection = function (selection) {
	  if (!selection) {
	    return;
	  }

	  if ('scrollTop' in selection && this.content) {
	    // TODO: animated scroll
	    this.content.scrollTop = selection.scrollTop;
	  }
	  if (selection.nodes) {
	    // multi-select
	    this.select(selection.nodes);
	  }
	  if (selection.range) {
	    util.setSelectionOffset(selection.range);
	  }
	  if (selection.dom) {
	    selection.dom.focus();
	  }
	};

	/**
	 * Get the current focus
	 * @return {Object} selection An object containing fields:
	 *                            {Element | undefined} dom     The dom element
	 *                                                          which has focus
	 *                            {Range | TextRange} range     A text selection
	 *                            {Node[]} nodes                Nodes in case of multi selection
	 *                            {Number} scrollTop            Scroll position
	 */
	treemode.getSelection = function () {
	  var range = util.getSelectionOffset();
	  if (range && range.container.nodeName !== 'DIV') { // filter on (editable) divs)
	    range = null;
	  }

	  return {
	    dom: this.focusTarget,
	    range: range,
	    nodes: this.multiselection.nodes.slice(0),
	    scrollTop: this.content ? this.content.scrollTop : 0
	  };
	};

	/**
	 * Adjust the scroll position such that given top position is shown at 1/4
	 * of the window height.
	 * @param {Number} top
	 * @param {function(boolean)} [callback]   Callback, executed when animation is
	 *                                         finished. The callback returns true
	 *                                         when animation is finished, or false
	 *                                         when not.
	 */
	treemode.scrollTo = function (top, callback) {
	  var content = this.content;
	  if (content) {
	    var editor = this;
	    // cancel any running animation
	    if (editor.animateTimeout) {
	      clearTimeout(editor.animateTimeout);
	      delete editor.animateTimeout;
	    }
	    if (editor.animateCallback) {
	      editor.animateCallback(false);
	      delete editor.animateCallback;
	    }

	    // calculate final scroll position
	    var height = content.clientHeight;
	    var bottom = content.scrollHeight - height;
	    var finalScrollTop = Math.min(Math.max(top - height / 4, 0), bottom);

	    // animate towards the new scroll position
	    var animate = function () {
	      var scrollTop = content.scrollTop;
	      var diff = (finalScrollTop - scrollTop);
	      if (Math.abs(diff) > 3) {
	        content.scrollTop += diff / 3;
	        editor.animateCallback = callback;
	        editor.animateTimeout = setTimeout(animate, 50);
	      }
	      else {
	        // finished
	        if (callback) {
	          callback(true);
	        }
	        content.scrollTop = finalScrollTop;
	        delete editor.animateTimeout;
	        delete editor.animateCallback;
	      }
	    };
	    animate();
	  }
	  else {
	    if (callback) {
	      callback(false);
	    }
	  }
	};

	/**
	 * Create main frame
	 * @private
	 */
	treemode._createFrame = function () {
	  // create the frame
	  this.frame = document.createElement('div');
	  this.frame.className = 'jsoneditor jsoneditor-mode-' + this.options.mode;
	  this.container.appendChild(this.frame);

	  // create one global event listener to handle all events from all nodes
	  var editor = this;
	  function onEvent(event) {
	    // when switching to mode "code" or "text" via the menu, some events
	    // are still fired whilst the _onEvent methods is already removed.
	    if (editor._onEvent) {
	      editor._onEvent(event);
	    }
	  }
	  this.frame.onclick = function (event) {
	    var target = event.target;// || event.srcElement;

	    onEvent(event);

	    // prevent default submit action of buttons when editor is located
	    // inside a form
	    if (target.nodeName == 'BUTTON') {
	      event.preventDefault();
	    }
	  };
	  this.frame.oninput = onEvent;
	  this.frame.onchange = onEvent;
	  this.frame.onkeydown = onEvent;
	  this.frame.onkeyup = onEvent;
	  this.frame.oncut = onEvent;
	  this.frame.onpaste = onEvent;
	  this.frame.onmousedown = onEvent;
	  this.frame.onmouseup = onEvent;
	  this.frame.onmouseover = onEvent;
	  this.frame.onmouseout = onEvent;
	  // Note: focus and blur events do not propagate, therefore they defined
	  // using an eventListener with useCapture=true
	  // see http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
	  util.addEventListener(this.frame, 'focus', onEvent, true);
	  util.addEventListener(this.frame, 'blur', onEvent, true);
	  this.frame.onfocusin = onEvent;  // for IE
	  this.frame.onfocusout = onEvent; // for IE

	  // create menu
	  this.menu = document.createElement('div');
	  this.menu.className = 'jsoneditor-menu';
	  this.frame.appendChild(this.menu);

	  // create expand all button
	  var expandAll = document.createElement('button');
	  expandAll.type = 'button';
	  expandAll.className = 'jsoneditor-expand-all';
	  expandAll.title = 'Expand all fields';
	  expandAll.onclick = function () {
	    editor.expandAll();
	  };
	  this.menu.appendChild(expandAll);

	  // create expand all button
	  var collapseAll = document.createElement('button');
	  collapseAll.type = 'button';
	  collapseAll.title = 'Collapse all fields';
	  collapseAll.className = 'jsoneditor-collapse-all';
	  collapseAll.onclick = function () {
	    editor.collapseAll();
	  };
	  this.menu.appendChild(collapseAll);

	  // create undo/redo buttons
	  if (this.history) {
	    // create undo button
	    var undo = document.createElement('button');
	    undo.type = 'button';
	    undo.className = 'jsoneditor-undo jsoneditor-separator';
	    undo.title = 'Undo last action (Ctrl+Z)';
	    undo.onclick = function () {
	      editor._onUndo();
	    };
	    this.menu.appendChild(undo);
	    this.dom.undo = undo;

	    // create redo button
	    var redo = document.createElement('button');
	    redo.type = 'button';
	    redo.className = 'jsoneditor-redo';
	    redo.title = 'Redo (Ctrl+Shift+Z)';
	    redo.onclick = function () {
	      editor._onRedo();
	    };
	    this.menu.appendChild(redo);
	    this.dom.redo = redo;

	    // register handler for onchange of history
	    this.history.onChange = function () {
	      undo.disabled = !editor.history.canUndo();
	      redo.disabled = !editor.history.canRedo();
	    };
	    this.history.onChange();
	  }

	  // create mode box
	  if (this.options && this.options.modes && this.options.modes.length) {
	    var me = this;
	    this.modeSwitcher = new ModeSwitcher(this.menu, this.options.modes, this.options.mode, function onSwitch(mode) {
	      me.modeSwitcher.destroy();

	      // switch mode and restore focus
	      me.setMode(mode);
	      me.modeSwitcher.focus();
	    });
	  }

	  // create search box
	  if (this.options.search) {
	    this.searchBox = new SearchBox(this, this.menu);
	  }
	};

	/**
	 * Perform an undo action
	 * @private
	 */
	treemode._onUndo = function () {
	  if (this.history) {
	    // undo last action
	    this.history.undo();

	    // fire change event
	    this._onChange();
	  }
	};

	/**
	 * Perform a redo action
	 * @private
	 */
	treemode._onRedo = function () {
	  if (this.history) {
	    // redo last action
	    this.history.redo();

	    // fire change event
	    this._onChange();
	  }
	};

	/**
	 * Event handler
	 * @param event
	 * @private
	 */
	treemode._onEvent = function (event) {
	  if (event.type == 'keydown') {
	    this._onKeyDown(event);
	  }

	  if (event.type == 'focus') {
	    this.focusTarget = event.target;
	  }

	  if (event.type == 'mousedown') {
	    this._startDragDistance(event);
	  }
	  if (event.type == 'mousemove' || event.type == 'mouseup' || event.type == 'click') {
	    this._updateDragDistance(event);
	  }

	  var node = Node.getNodeFromTarget(event.target);

	  if (node && node.selected) {
	    if (event.type == 'click') {
	      if (event.target == node.dom.menu) {
	        this.showContextMenu(event.target);

	        // stop propagation (else we will open the context menu of a single node)
	        return;
	      }

	      // deselect a multi selection
	      if (!event.hasMoved) {
	        this.deselect();
	      }
	    }

	    if (event.type == 'mousedown') {
	      // drag multiple nodes
	      Node.onDragStart(this.multiselection.nodes, event);
	    }
	  }
	  else {
	    if (event.type == 'mousedown') {
	      this.deselect();

	      if (node && event.target == node.dom.drag) {
	        // drag a singe node
	        Node.onDragStart(node, event);
	      }
	      else if (!node || (event.target != node.dom.field && event.target != node.dom.value && event.target != node.dom.select)) {
	        // select multiple nodes
	        this._onMultiSelectStart(event);
	      }
	    }
	  }

	  if (node) {
	    node.onEvent(event);
	  }
	};

	treemode._startDragDistance = function (event) {
	  this.dragDistanceEvent = {
	    initialTarget: event.target,
	    initialPageX: event.pageX,
	    initialPageY: event.pageY,
	    dragDistance: 0,
	    hasMoved: false
	  };
	};

	treemode._updateDragDistance = function (event) {
	  if (!this.dragDistanceEvent) {
	    this._startDragDistance(event);
	  }

	  var diffX = event.pageX - this.dragDistanceEvent.initialPageX;
	  var diffY = event.pageY - this.dragDistanceEvent.initialPageY;

	  this.dragDistanceEvent.dragDistance = Math.sqrt(diffX * diffX + diffY * diffY);
	  this.dragDistanceEvent.hasMoved =
	      this.dragDistanceEvent.hasMoved || this.dragDistanceEvent.dragDistance > 10;

	  event.dragDistance = this.dragDistanceEvent.dragDistance;
	  event.hasMoved = this.dragDistanceEvent.hasMoved;

	  return event.dragDistance;
	};

	/**
	 * Start multi selection of nodes by dragging the mouse
	 * @param event
	 * @private
	 */
	treemode._onMultiSelectStart = function (event) {
	  var node = Node.getNodeFromTarget(event.target);

	  if (this.options.mode !== 'tree' || this.options.onEditable !== undefined) {
	    // dragging not allowed in modes 'view' and 'form'
	    // TODO: allow multiselection of items when option onEditable is specified
	    return;
	  }

	  this.multiselection = {
	    start: node || null,
	    end: null,
	    nodes: []
	  };

	  this._startDragDistance(event);

	  var editor = this;
	  if (!this.mousemove) {
	    this.mousemove = util.addEventListener(window, 'mousemove', function (event) {
	      editor._onMultiSelect(event);
	    });
	  }
	  if (!this.mouseup) {
	    this.mouseup = util.addEventListener(window, 'mouseup', function (event ) {
	      editor._onMultiSelectEnd(event);
	    });
	  }

	};

	/**
	 * Multiselect nodes by dragging
	 * @param event
	 * @private
	 */
	treemode._onMultiSelect = function (event) {
	  event.preventDefault();

	  this._updateDragDistance(event);
	  if (!event.hasMoved) {
	    return;
	  }

	  var node = Node.getNodeFromTarget(event.target);

	  if (node) {
	    if (this.multiselection.start == null) {
	      this.multiselection.start = node;
	    }
	    this.multiselection.end = node;
	  }

	  // deselect previous selection
	  this.deselect();

	  // find the selected nodes in the range from first to last
	  var start = this.multiselection.start;
	  var end = this.multiselection.end || this.multiselection.start;
	  if (start && end) {
	    // find the top level childs, all having the same parent
	    this.multiselection.nodes = this._findTopLevelNodes(start, end);
	    this.select(this.multiselection.nodes);
	  }
	};

	/**
	 * End of multiselect nodes by dragging
	 * @param event
	 * @private
	 */
	treemode._onMultiSelectEnd = function (event) {
	  // set focus to the context menu button of the first node
	  if (this.multiselection.nodes[0]) {
	    this.multiselection.nodes[0].dom.menu.focus();
	  }

	  this.multiselection.start = null;
	  this.multiselection.end = null;

	  // cleanup global event listeners
	  if (this.mousemove) {
	    util.removeEventListener(window, 'mousemove', this.mousemove);
	    delete this.mousemove;
	  }
	  if (this.mouseup) {
	    util.removeEventListener(window, 'mouseup', this.mouseup);
	    delete this.mouseup;
	  }
	};

	/**
	 * deselect currently selected nodes
	 * @param {boolean} [clearStartAndEnd=false]  If true, the `start` and `end`
	 *                                            state is cleared too.
	 */
	treemode.deselect = function (clearStartAndEnd) {
	  this.multiselection.nodes.forEach(function (node) {
	    node.setSelected(false);
	  });
	  this.multiselection.nodes = [];

	  if (clearStartAndEnd) {
	    this.multiselection.start = null;
	    this.multiselection.end = null;
	  }
	};

	/**
	 * select nodes
	 * @param {Node[] | Node} nodes
	 */
	treemode.select = function (nodes) {
	  if (!Array.isArray(nodes)) {
	    return this.select([nodes]);
	  }

	  if (nodes) {
	    this.deselect();

	    this.multiselection.nodes = nodes.slice(0);

	    var first = nodes[0];
	    nodes.forEach(function (node) {
	      node.setSelected(true, node === first);
	    });
	  }
	};

	/**
	 * From two arbitrary selected nodes, find their shared parent node.
	 * From that parent node, select the two child nodes in the brances going to
	 * nodes `start` and `end`, and select all childs in between.
	 * @param {Node} start
	 * @param {Node} end
	 * @return {Array.<Node>} Returns an ordered list with child nodes
	 * @private
	 */
	treemode._findTopLevelNodes = function (start, end) {
	  var startPath = start.getNodePath();
	  var endPath = end.getNodePath();
	  var i = 0;
	  while (i < startPath.length && startPath[i] === endPath[i]) {
	    i++;
	  }
	  var root = startPath[i - 1];
	  var startChild = startPath[i];
	  var endChild = endPath[i];

	  if (!startChild || !endChild) {
	    if (root.parent) {
	      // startChild is a parent of endChild or vice versa
	      startChild = root;
	      endChild = root;
	      root = root.parent
	    }
	    else {
	      // we have selected the root node (which doesn't have a parent)
	      startChild = root.childs[0];
	      endChild = root.childs[root.childs.length - 1];
	    }
	  }

	  if (root && startChild && endChild) {
	    var startIndex = root.childs.indexOf(startChild);
	    var endIndex = root.childs.indexOf(endChild);
	    var firstIndex = Math.min(startIndex, endIndex);
	    var lastIndex = Math.max(startIndex, endIndex);

	    return root.childs.slice(firstIndex, lastIndex + 1);
	  }
	  else {
	    return [];
	  }
	};

	/**
	 * Event handler for keydown. Handles shortcut keys
	 * @param {Event} event
	 * @private
	 */
	treemode._onKeyDown = function (event) {
	  var keynum = event.which || event.keyCode;
	  var ctrlKey = event.ctrlKey;
	  var shiftKey = event.shiftKey;
	  var handled = false;

	  if (keynum == 9) { // Tab or Shift+Tab
	    var me = this;
	    setTimeout(function () {
	      // select all text when moving focus to an editable div
	      util.selectContentEditable(me.focusTarget);
	    }, 0);
	  }

	  if (this.searchBox) {
	    if (ctrlKey && keynum == 70) { // Ctrl+F
	      this.searchBox.dom.search.focus();
	      this.searchBox.dom.search.select();
	      handled = true;
	    }
	    else if (keynum == 114 || (ctrlKey && keynum == 71)) { // F3 or Ctrl+G
	      var focus = true;
	      if (!shiftKey) {
	        // select next search result (F3 or Ctrl+G)
	        this.searchBox.next(focus);
	      }
	      else {
	        // select previous search result (Shift+F3 or Ctrl+Shift+G)
	        this.searchBox.previous(focus);
	      }

	      handled = true;
	    }
	  }

	  if (this.history) {
	    if (ctrlKey && !shiftKey && keynum == 90) { // Ctrl+Z
	      // undo
	      this._onUndo();
	      handled = true;
	    }
	    else if (ctrlKey && shiftKey && keynum == 90) { // Ctrl+Shift+Z
	      // redo
	      this._onRedo();
	      handled = true;
	    }
	  }

	  if (handled) {
	    event.preventDefault();
	    event.stopPropagation();
	  }
	};

	/**
	 * Create main table
	 * @private
	 */
	treemode._createTable = function () {
	  var contentOuter = document.createElement('div');
	  contentOuter.className = 'jsoneditor-outer';
	  this.contentOuter = contentOuter;

	  this.content = document.createElement('div');
	  this.content.className = 'jsoneditor-tree';
	  contentOuter.appendChild(this.content);

	  this.table = document.createElement('table');
	  this.table.className = 'jsoneditor-tree';
	  this.content.appendChild(this.table);

	  // create colgroup where the first two columns don't have a fixed
	  // width, and the edit columns do have a fixed width
	  var col;
	  this.colgroupContent = document.createElement('colgroup');
	  if (this.options.mode === 'tree') {
	    col = document.createElement('col');
	    col.width = "24px";
	    this.colgroupContent.appendChild(col);
	  }
	  col = document.createElement('col');
	  col.width = "24px";
	  this.colgroupContent.appendChild(col);
	  col = document.createElement('col');
	  this.colgroupContent.appendChild(col);
	  this.table.appendChild(this.colgroupContent);

	  this.tbody = document.createElement('tbody');
	  this.table.appendChild(this.tbody);

	  this.frame.appendChild(contentOuter);
	};

	/**
	 * Show a contextmenu for this node.
	 * Used for multiselection
	 * @param {HTMLElement} anchor   Anchor element to attache the context menu to.
	 * @param {function} [onClose]   Callback method called when the context menu
	 *                               is being closed.
	 */
	treemode.showContextMenu = function (anchor, onClose) {
	  var items = [];
	  var editor = this;

	  // create duplicate button
	  items.push({
	    text: 'Duplicate',
	    title: 'Duplicate selected fields (Ctrl+D)',
	    className: 'jsoneditor-duplicate',
	    click: function () {
	      Node.onDuplicate(editor.multiselection.nodes);
	    }
	  });

	  // create remove button
	  items.push({
	    text: 'Remove',
	    title: 'Remove selected fields (Ctrl+Del)',
	    className: 'jsoneditor-remove',
	    click: function () {
	      Node.onRemove(editor.multiselection.nodes);
	    }
	  });

	  var menu = new ContextMenu(items, {close: onClose});
	  menu.show(anchor, this.content);
	};


	// define modes
	module.exports = [
	  {
	    mode: 'tree',
	    mixin: treemode,
	    data: 'json'
	  },
	  {
	    mode: 'view',
	    mixin: treemode,
	    data: 'json'
	  },
	  {
	    mode: 'form',
	    mixin: treemode,
	    data: 'json'
	  }
	];


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * The highlighter can highlight/unhighlight a node, and
	 * animate the visibility of a context menu.
	 * @constructor Highlighter
	 */
	function Highlighter () {
	  this.locked = false;
	}

	/**
	 * Hightlight given node and its childs
	 * @param {Node} node
	 */
	Highlighter.prototype.highlight = function (node) {
	  if (this.locked) {
	    return;
	  }

	  if (this.node != node) {
	    // unhighlight current node
	    if (this.node) {
	      this.node.setHighlight(false);
	    }

	    // highlight new node
	    this.node = node;
	    this.node.setHighlight(true);
	  }

	  // cancel any current timeout
	  this._cancelUnhighlight();
	};

	/**
	 * Unhighlight currently highlighted node.
	 * Will be done after a delay
	 */
	Highlighter.prototype.unhighlight = function () {
	  if (this.locked) {
	    return;
	  }

	  var me = this;
	  if (this.node) {
	    this._cancelUnhighlight();

	    // do the unhighlighting after a small delay, to prevent re-highlighting
	    // the same node when moving from the drag-icon to the contextmenu-icon
	    // or vice versa.
	    this.unhighlightTimer = setTimeout(function () {
	      me.node.setHighlight(false);
	      me.node = undefined;
	      me.unhighlightTimer = undefined;
	    }, 0);
	  }
	};

	/**
	 * Cancel an unhighlight action (if before the timeout of the unhighlight action)
	 * @private
	 */
	Highlighter.prototype._cancelUnhighlight = function () {
	  if (this.unhighlightTimer) {
	    clearTimeout(this.unhighlightTimer);
	    this.unhighlightTimer = undefined;
	  }
	};

	/**
	 * Lock highlighting or unhighlighting nodes.
	 * methods highlight and unhighlight do not work while locked.
	 */
	Highlighter.prototype.lock = function () {
	  this.locked = true;
	};

	/**
	 * Unlock highlighting or unhighlighting nodes
	 */
	Highlighter.prototype.unlock = function () {
	  this.locked = false;
	};

	module.exports = Highlighter;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(4);

	/**
	 * @constructor History
	 * Store action history, enables undo and redo
	 * @param {JSONEditor} editor
	 */
	function History (editor) {
	  this.editor = editor;
	  this.history = [];
	  this.index = -1;

	  this.clear();

	  // map with all supported actions
	  this.actions = {
	    'editField': {
	      'undo': function (params) {
	        params.node.updateField(params.oldValue);
	      },
	      'redo': function (params) {
	        params.node.updateField(params.newValue);
	      }
	    },
	    'editValue': {
	      'undo': function (params) {
	        params.node.updateValue(params.oldValue);
	      },
	      'redo': function (params) {
	        params.node.updateValue(params.newValue);
	      }
	    },
	    'changeType': {
	      'undo': function (params) {
	        params.node.changeType(params.oldType);
	      },
	      'redo': function (params) {
	        params.node.changeType(params.newType);
	      }
	    },

	    'appendNodes': {
	      'undo': function (params) {
	        params.nodes.forEach(function (node) {
	          params.parent.removeChild(node);
	        });
	      },
	      'redo': function (params) {
	        params.nodes.forEach(function (node) {
	          params.parent.appendChild(node);
	        });
	      }
	    },
	    'insertBeforeNodes': {
	      'undo': function (params) {
	        params.nodes.forEach(function (node) {
	          params.parent.removeChild(node);
	        });
	      },
	      'redo': function (params) {
	        params.nodes.forEach(function (node) {
	          params.parent.insertBefore(node, params.beforeNode);
	        });
	      }
	    },
	    'insertAfterNodes': {
	      'undo': function (params) {
	        params.nodes.forEach(function (node) {
	          params.parent.removeChild(node);
	        });
	      },
	      'redo': function (params) {
	        var afterNode = params.afterNode;
	        params.nodes.forEach(function (node) {
	          params.parent.insertAfter(params.node, afterNode);
	          afterNode = node;
	        });
	      }
	    },
	    'removeNodes': {
	      'undo': function (params) {
	        var parent = params.parent;
	        var beforeNode = parent.childs[params.index] || parent.append;
	        params.nodes.forEach(function (node) {
	          parent.insertBefore(node, beforeNode);
	        });
	      },
	      'redo': function (params) {
	        params.nodes.forEach(function (node) {
	          params.parent.removeChild(node);
	        });
	      }
	    },
	    'duplicateNodes': {
	      'undo': function (params) {
	        params.nodes.forEach(function (node) {
	          params.parent.removeChild(node);
	        });
	      },
	      'redo': function (params) {
	        var afterNode = params.afterNode;
	        params.nodes.forEach(function (node) {
	          params.parent.insertAfter(node, afterNode);
	          afterNode = node;
	        });
	      }
	    },
	    'moveNodes': {
	      'undo': function (params) {
	        params.nodes.forEach(function (node) {
	          params.oldBeforeNode.parent.moveBefore(node, params.oldBeforeNode);
	        });
	      },
	      'redo': function (params) {
	        params.nodes.forEach(function (node) {
	          params.newBeforeNode.parent.moveBefore(node, params.newBeforeNode);
	        });
	      }
	    },

	    'sort': {
	      'undo': function (params) {
	        var node = params.node;
	        node.hideChilds();
	        node.sort = params.oldSort;
	        node.childs = params.oldChilds;
	        node.showChilds();
	      },
	      'redo': function (params) {
	        var node = params.node;
	        node.hideChilds();
	        node.sort = params.newSort;
	        node.childs = params.newChilds;
	        node.showChilds();
	      }
	    }

	    // TODO: restore the original caret position and selection with each undo
	    // TODO: implement history for actions "expand", "collapse", "scroll", "setDocument"
	  };
	}

	/**
	 * The method onChange is executed when the History is changed, and can
	 * be overloaded.
	 */
	History.prototype.onChange = function () {};

	/**
	 * Add a new action to the history
	 * @param {String} action  The executed action. Available actions: "editField",
	 *                         "editValue", "changeType", "appendNode",
	 *                         "removeNode", "duplicateNode", "moveNode"
	 * @param {Object} params  Object containing parameters describing the change.
	 *                         The parameters in params depend on the action (for
	 *                         example for "editValue" the Node, old value, and new
	 *                         value are provided). params contains all information
	 *                         needed to undo or redo the action.
	 */
	History.prototype.add = function (action, params) {
	  this.index++;
	  this.history[this.index] = {
	    'action': action,
	    'params': params,
	    'timestamp': new Date()
	  };

	  // remove redo actions which are invalid now
	  if (this.index < this.history.length - 1) {
	    this.history.splice(this.index + 1, this.history.length - this.index - 1);
	  }

	  // fire onchange event
	  this.onChange();
	};

	/**
	 * Clear history
	 */
	History.prototype.clear = function () {
	  this.history = [];
	  this.index = -1;

	  // fire onchange event
	  this.onChange();
	};

	/**
	 * Check if there is an action available for undo
	 * @return {Boolean} canUndo
	 */
	History.prototype.canUndo = function () {
	  return (this.index >= 0);
	};

	/**
	 * Check if there is an action available for redo
	 * @return {Boolean} canRedo
	 */
	History.prototype.canRedo = function () {
	  return (this.index < this.history.length - 1);
	};

	/**
	 * Undo the last action
	 */
	History.prototype.undo = function () {
	  if (this.canUndo()) {
	    var obj = this.history[this.index];
	    if (obj) {
	      var action = this.actions[obj.action];
	      if (action && action.undo) {
	        action.undo(obj.params);
	        if (obj.params.oldSelection) {
	          this.editor.setSelection(obj.params.oldSelection);
	        }
	      }
	      else {
	        console.error(new Error('unknown action "' + obj.action + '"'));
	      }
	    }
	    this.index--;

	    // fire onchange event
	    this.onChange();
	  }
	};

	/**
	 * Redo the last action
	 */
	History.prototype.redo = function () {
	  if (this.canRedo()) {
	    this.index++;

	    var obj = this.history[this.index];
	    if (obj) {
	      var action = this.actions[obj.action];
	      if (action && action.redo) {
	        action.redo(obj.params);
	        if (obj.params.newSelection) {
	          this.editor.setSelection(obj.params.newSelection);
	        }
	      }
	      else {
	        console.error(new Error('unknown action "' + obj.action + '"'));
	      }
	    }

	    // fire onchange event
	    this.onChange();
	  }
	};

	/**
	 * Destroy history
	 */
	History.prototype.destroy = function () {
	  this.editor = null;

	  this.history = [];
	  this.index = -1;
	};

	module.exports = History;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var jsonlint = __webpack_require__(5);

	/**
	 * Parse JSON using the parser built-in in the browser.
	 * On exception, the jsonString is validated and a detailed error is thrown.
	 * @param {String} jsonString
	 * @return {JSON} json
	 */
	exports.parse = function parse(jsonString) {
	  try {
	    return JSON.parse(jsonString);
	  }
	  catch (err) {
	    // try to throw a more detailed error message using validate
	    exports.validate(jsonString);

	    // rethrow the original error
	    throw err;
	  }
	};

	/**
	 * Sanitize a JSON-like string containing. For example changes JavaScript
	 * notation into JSON notation.
	 * This function for example changes a string like "{a: 2, 'b': {c: 'd'}"
	 * into '{"a": 2, "b": {"c": "d"}'
	 * @param {string} jsString
	 * @returns {string} json
	 */
	exports.sanitize = function (jsString) {
	  // escape all single and double quotes inside strings
	  var chars = [];
	  var i = 0;

	  //If JSON starts with a function (characters/digits/"_-"), remove this function.
	  //This is useful for "stripping" JSONP objects to become JSON
	  //For example: /* some comment */ function_12321321 ( [{"a":"b"}] ); => [{"a":"b"}]
	  var match = jsString.match(/^\s*(\/\*(.|[\r\n])*?\*\/)?\s*[\da-zA-Z_$]+\s*\(([\s\S]*)\)\s*;?\s*$/);
	  if (match) {
	    jsString = match[3];
	  }

	  // helper functions to get the current/prev/next character
	  function curr () { return jsString.charAt(i);     }
	  function next()  { return jsString.charAt(i + 1); }
	  function prev()  { return jsString.charAt(i - 1); }

	  // get the last parsed non-whitespace character
	  function lastNonWhitespace () {
	    var p = chars.length - 1;

	    while (p >= 0) {
	      var pp = chars[p];
	      if (pp !== ' ' && pp !== '\n' && pp !== '\r' && pp !== '\t') { // non whitespace
	        return pp;
	      }
	      p--;
	    }

	    return '';
	  }

	  // skip a block comment '/* ... */'
	  function skipBlockComment () {
	    i += 2;
	    while (i < jsString.length && (curr() !== '*' || next() !== '/')) {
	      i++;
	    }
	    i += 2;
	  }

	  // skip a comment '// ...'
	  function skipComment () {
	    i += 2;
	    while (i < jsString.length && (curr() !== '\n')) {
	      i++;
	    }
	  }

	  // parse single or double quoted string
	  function parseString(quote) {
	    chars.push('"');
	    i++;
	    var c = curr();
	    while (i < jsString.length && c !== quote) {
	      if (c === '"' && prev() !== '\\') {
	        // unescaped double quote, escape it
	        chars.push('\\');
	      }

	      // handle escape character
	      if (c === '\\') {
	        i++;
	        c = curr();

	        // remove the escape character when followed by a single quote ', not needed
	        if (c !== '\'') {
	          chars.push('\\');
	        }
	      }
	      chars.push(c);

	      i++;
	      c = curr();
	    }
	    if (c === quote) {
	      chars.push('"');
	      i++;
	    }
	  }

	  // parse an unquoted key
	  function parseKey() {
	    var specialValues = ['null', 'true', 'false'];
	    var key = '';
	    var c = curr();

	    var regexp = /[a-zA-Z_$\d]/; // letter, number, underscore, dollar character
	    while (regexp.test(c)) {
	      key += c;
	      i++;
	      c = curr();
	    }

	    if (specialValues.indexOf(key) === -1) {
	      chars.push('"' + key + '"');
	    }
	    else {
	      chars.push(key);
	    }
	  }

	  while(i < jsString.length) {
	    var c = curr();

	    if (c === '/' && next() === '*') {
	      skipBlockComment();
	    }
	    else if (c === '/' && next() === '/') {
	      skipComment();
	    }
	    else if (c === '\'' || c === '"') {
	      parseString(c);
	    }
	    else if (/[a-zA-Z_$]/.test(c) && ['{', ','].indexOf(lastNonWhitespace()) !== -1) {
	      // an unquoted object key (like a in '{a:2}')
	      parseKey();
	    }
	    else {
	      chars.push(c);
	      i++;
	    }
	  }

	  return chars.join('');
	};

	/**
	 * Escape unicode characters.
	 * For example input '\u2661' (length 1) will output '\\u2661' (length 5).
	 * @param {string} text
	 * @return {string}
	 */
	exports.escapeUnicodeChars = function (text) {
	  // see https://www.wikiwand.com/en/UTF-16
	  // note: we leave surrogate pairs as two individual chars,
	  // as JSON doesn't interpret them as a single unicode char.
	  return text.replace(/[\u007F-\uFFFF]/g, function(c) {
	    return '\\u'+('0000' + c.charCodeAt(0).toString(16)).slice(-4);
	  })
	};

	/**
	 * Validate a string containing a JSON object
	 * This method uses JSONLint to validate the String. If JSONLint is not
	 * available, the built-in JSON parser of the browser is used.
	 * @param {String} jsonString   String with an (invalid) JSON object
	 * @throws Error
	 */
	exports.validate = function validate(jsonString) {
	  if (typeof(jsonlint) != 'undefined') {
	    jsonlint.parse(jsonString);
	  }
	  else {
	    JSON.parse(jsonString);
	  }
	};

	/**
	 * Extend object a with the properties of object b
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 */
	exports.extend = function extend(a, b) {
	  for (var prop in b) {
	    if (b.hasOwnProperty(prop)) {
	      a[prop] = b[prop];
	    }
	  }
	  return a;
	};

	/**
	 * Remove all properties from object a
	 * @param {Object} a
	 * @return {Object} a
	 */
	exports.clear = function clear (a) {
	  for (var prop in a) {
	    if (a.hasOwnProperty(prop)) {
	      delete a[prop];
	    }
	  }
	  return a;
	};

	/**
	 * Get the type of an object
	 * @param {*} object
	 * @return {String} type
	 */
	exports.type = function type (object) {
	  if (object === null) {
	    return 'null';
	  }
	  if (object === undefined) {
	    return 'undefined';
	  }
	  if ((object instanceof Number) || (typeof object === 'number')) {
	    return 'number';
	  }
	  if ((object instanceof String) || (typeof object === 'string')) {
	    return 'string';
	  }
	  if ((object instanceof Boolean) || (typeof object === 'boolean')) {
	    return 'boolean';
	  }
	  if ((object instanceof RegExp) || (typeof object === 'regexp')) {
	    return 'regexp';
	  }
	  if (exports.isArray(object)) {
	    return 'array';
	  }

	  return 'object';
	};

	/**
	 * Test whether a text contains a url (matches when a string starts
	 * with 'http://*' or 'https://*' and has no whitespace characters)
	 * @param {String} text
	 */
	var isUrlRegex = /^https?:\/\/\S+$/;
	exports.isUrl = function isUrl (text) {
	  return (typeof text == 'string' || text instanceof String) &&
	      isUrlRegex.test(text);
	};

	/**
	 * Tes whether given object is an Array
	 * @param {*} obj
	 * @returns {boolean} returns true when obj is an array
	 */
	exports.isArray = function (obj) {
	  return Object.prototype.toString.call(obj) === '[object Array]';
	};

	/**
	 * Retrieve the absolute left value of a DOM element
	 * @param {Element} elem    A dom element, for example a div
	 * @return {Number} left    The absolute left position of this element
	 *                          in the browser page.
	 */
	exports.getAbsoluteLeft = function getAbsoluteLeft(elem) {
	  var rect = elem.getBoundingClientRect();
	  return rect.left + window.pageXOffset || document.scrollLeft || 0;
	};

	/**
	 * Retrieve the absolute top value of a DOM element
	 * @param {Element} elem    A dom element, for example a div
	 * @return {Number} top     The absolute top position of this element
	 *                          in the browser page.
	 */
	exports.getAbsoluteTop = function getAbsoluteTop(elem) {
	  var rect = elem.getBoundingClientRect();
	  return rect.top + window.pageYOffset || document.scrollTop || 0;
	};

	/**
	 * add a className to the given elements style
	 * @param {Element} elem
	 * @param {String} className
	 */
	exports.addClassName = function addClassName(elem, className) {
	  var classes = elem.className.split(' ');
	  if (classes.indexOf(className) == -1) {
	    classes.push(className); // add the class to the array
	    elem.className = classes.join(' ');
	  }
	};

	/**
	 * add a className to the given elements style
	 * @param {Element} elem
	 * @param {String} className
	 */
	exports.removeClassName = function removeClassName(elem, className) {
	  var classes = elem.className.split(' ');
	  var index = classes.indexOf(className);
	  if (index != -1) {
	    classes.splice(index, 1); // remove the class from the array
	    elem.className = classes.join(' ');
	  }
	};

	/**
	 * Strip the formatting from the contents of a div
	 * the formatting from the div itself is not stripped, only from its childs.
	 * @param {Element} divElement
	 */
	exports.stripFormatting = function stripFormatting(divElement) {
	  var childs = divElement.childNodes;
	  for (var i = 0, iMax = childs.length; i < iMax; i++) {
	    var child = childs[i];

	    // remove the style
	    if (child.style) {
	      // TODO: test if child.attributes does contain style
	      child.removeAttribute('style');
	    }

	    // remove all attributes
	    var attributes = child.attributes;
	    if (attributes) {
	      for (var j = attributes.length - 1; j >= 0; j--) {
	        var attribute = attributes[j];
	        if (attribute.specified === true) {
	          child.removeAttribute(attribute.name);
	        }
	      }
	    }

	    // recursively strip childs
	    exports.stripFormatting(child);
	  }
	};

	/**
	 * Set focus to the end of an editable div
	 * code from Nico Burns
	 * http://stackoverflow.com/users/140293/nico-burns
	 * http://stackoverflow.com/questions/1125292/how-to-move-cursor-to-end-of-contenteditable-entity
	 * @param {Element} contentEditableElement   A content editable div
	 */
	exports.setEndOfContentEditable = function setEndOfContentEditable(contentEditableElement) {
	  var range, selection;
	  if(document.createRange) {
	    range = document.createRange();//Create a range (a range is a like the selection but invisible)
	    range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
	    range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
	    selection = window.getSelection();//get the selection object (allows you to change selection)
	    selection.removeAllRanges();//remove any selections already made
	    selection.addRange(range);//make the range you have just created the visible selection
	  }
	};

	/**
	 * Select all text of a content editable div.
	 * http://stackoverflow.com/a/3806004/1262753
	 * @param {Element} contentEditableElement   A content editable div
	 */
	exports.selectContentEditable = function selectContentEditable(contentEditableElement) {
	  if (!contentEditableElement || contentEditableElement.nodeName != 'DIV') {
	    return;
	  }

	  var sel, range;
	  if (window.getSelection && document.createRange) {
	    range = document.createRange();
	    range.selectNodeContents(contentEditableElement);
	    sel = window.getSelection();
	    sel.removeAllRanges();
	    sel.addRange(range);
	  }
	};

	/**
	 * Get text selection
	 * http://stackoverflow.com/questions/4687808/contenteditable-selected-text-save-and-restore
	 * @return {Range | TextRange | null} range
	 */
	exports.getSelection = function getSelection() {
	  if (window.getSelection) {
	    var sel = window.getSelection();
	    if (sel.getRangeAt && sel.rangeCount) {
	      return sel.getRangeAt(0);
	    }
	  }
	  return null;
	};

	/**
	 * Set text selection
	 * http://stackoverflow.com/questions/4687808/contenteditable-selected-text-save-and-restore
	 * @param {Range | TextRange | null} range
	 */
	exports.setSelection = function setSelection(range) {
	  if (range) {
	    if (window.getSelection) {
	      var sel = window.getSelection();
	      sel.removeAllRanges();
	      sel.addRange(range);
	    }
	  }
	};

	/**
	 * Get selected text range
	 * @return {Object} params  object containing parameters:
	 *                              {Number}  startOffset
	 *                              {Number}  endOffset
	 *                              {Element} container  HTML element holding the
	 *                                                   selected text element
	 *                          Returns null if no text selection is found
	 */
	exports.getSelectionOffset = function getSelectionOffset() {
	  var range = exports.getSelection();

	  if (range && 'startOffset' in range && 'endOffset' in range &&
	      range.startContainer && (range.startContainer == range.endContainer)) {
	    return {
	      startOffset: range.startOffset,
	      endOffset: range.endOffset,
	      container: range.startContainer.parentNode
	    };
	  }

	  return null;
	};

	/**
	 * Set selected text range in given element
	 * @param {Object} params   An object containing:
	 *                              {Element} container
	 *                              {Number} startOffset
	 *                              {Number} endOffset
	 */
	exports.setSelectionOffset = function setSelectionOffset(params) {
	  if (document.createRange && window.getSelection) {
	    var selection = window.getSelection();
	    if(selection) {
	      var range = document.createRange();

	      if (!params.container.firstChild) {
	        params.container.appendChild(document.createTextNode(''));
	      }

	      // TODO: do not suppose that the first child of the container is a textnode,
	      //       but recursively find the textnodes
	      range.setStart(params.container.firstChild, params.startOffset);
	      range.setEnd(params.container.firstChild, params.endOffset);

	      exports.setSelection(range);
	    }
	  }
	};

	/**
	 * Get the inner text of an HTML element (for example a div element)
	 * @param {Element} element
	 * @param {Object} [buffer]
	 * @return {String} innerText
	 */
	exports.getInnerText = function getInnerText(element, buffer) {
	  var first = (buffer == undefined);
	  if (first) {
	    buffer = {
	      'text': '',
	      'flush': function () {
	        var text = this.text;
	        this.text = '';
	        return text;
	      },
	      'set': function (text) {
	        this.text = text;
	      }
	    };
	  }

	  // text node
	  if (element.nodeValue) {
	    return buffer.flush() + element.nodeValue;
	  }

	  // divs or other HTML elements
	  if (element.hasChildNodes()) {
	    var childNodes = element.childNodes;
	    var innerText = '';

	    for (var i = 0, iMax = childNodes.length; i < iMax; i++) {
	      var child = childNodes[i];

	      if (child.nodeName == 'DIV' || child.nodeName == 'P') {
	        var prevChild = childNodes[i - 1];
	        var prevName = prevChild ? prevChild.nodeName : undefined;
	        if (prevName && prevName != 'DIV' && prevName != 'P' && prevName != 'BR') {
	          innerText += '\n';
	          buffer.flush();
	        }
	        innerText += exports.getInnerText(child, buffer);
	        buffer.set('\n');
	      }
	      else if (child.nodeName == 'BR') {
	        innerText += buffer.flush();
	        buffer.set('\n');
	      }
	      else {
	        innerText += exports.getInnerText(child, buffer);
	      }
	    }

	    return innerText;
	  }
	  else {
	    if (element.nodeName == 'P' && exports.getInternetExplorerVersion() != -1) {
	      // On Internet Explorer, a <p> with hasChildNodes()==false is
	      // rendered with a new line. Note that a <p> with
	      // hasChildNodes()==true is rendered without a new line
	      // Other browsers always ensure there is a <br> inside the <p>,
	      // and if not, the <p> does not render a new line
	      return buffer.flush();
	    }
	  }

	  // br or unknown
	  return '';
	};

	/**
	 * Returns the version of Internet Explorer or a -1
	 * (indicating the use of another browser).
	 * Source: http://msdn.microsoft.com/en-us/library/ms537509(v=vs.85).aspx
	 * @return {Number} Internet Explorer version, or -1 in case of an other browser
	 */
	exports.getInternetExplorerVersion = function getInternetExplorerVersion() {
	  if (_ieVersion == -1) {
	    var rv = -1; // Return value assumes failure.
	    if (navigator.appName == 'Microsoft Internet Explorer')
	    {
	      var ua = navigator.userAgent;
	      var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	      if (re.exec(ua) != null) {
	        rv = parseFloat( RegExp.$1 );
	      }
	    }

	    _ieVersion = rv;
	  }

	  return _ieVersion;
	};

	/**
	 * Test whether the current browser is Firefox
	 * @returns {boolean} isFirefox
	 */
	exports.isFirefox = function isFirefox () {
	  return (navigator.userAgent.indexOf("Firefox") != -1);
	};

	/**
	 * cached internet explorer version
	 * @type {Number}
	 * @private
	 */
	var _ieVersion = -1;

	/**
	 * Add and event listener. Works for all browsers
	 * @param {Element}     element    An html element
	 * @param {string}      action     The action, for example "click",
	 *                                 without the prefix "on"
	 * @param {function}    listener   The callback function to be executed
	 * @param {boolean}     [useCapture] false by default
	 * @return {function}   the created event listener
	 */
	exports.addEventListener = function addEventListener(element, action, listener, useCapture) {
	  if (element.addEventListener) {
	    if (useCapture === undefined)
	      useCapture = false;

	    if (action === "mousewheel" && exports.isFirefox()) {
	      action = "DOMMouseScroll";  // For Firefox
	    }

	    element.addEventListener(action, listener, useCapture);
	    return listener;
	  } else if (element.attachEvent) {
	    // Old IE browsers
	    var f = function () {
	      return listener.call(element, window.event);
	    };
	    element.attachEvent("on" + action, f);
	    return f;
	  }
	};

	/**
	 * Remove an event listener from an element
	 * @param {Element}  element   An html dom element
	 * @param {string}   action    The name of the event, for example "mousedown"
	 * @param {function} listener  The listener function
	 * @param {boolean}  [useCapture]   false by default
	 */
	exports.removeEventListener = function removeEventListener(element, action, listener, useCapture) {
	  if (element.removeEventListener) {
	    if (useCapture === undefined)
	      useCapture = false;

	    if (action === "mousewheel" && exports.isFirefox()) {
	      action = "DOMMouseScroll";  // For Firefox
	    }

	    element.removeEventListener(action, listener, useCapture);
	  } else if (element.detachEvent) {
	    // Old IE browsers
	    element.detachEvent("on" + action, listener);
	  }
	};

	/**
	 * Parse a JSON path like '.items[3].name' into an array
	 * @param {string} jsonPath
	 * @return {Array}
	 */
	exports.parsePath = function parsePath(jsonPath) {
	  var prop, remainder;

	  if (jsonPath.length === 0) {
	    return [];
	  }

	  // find a match like '.prop'
	  var match = jsonPath.match(/^\.(\w+)/);
	  if (match) {
	    prop = match[1];
	    remainder = jsonPath.substr(prop.length + 1);
	  }
	  else if (jsonPath[0] === '[') {
	    // find a match like
	    var end = jsonPath.indexOf(']');
	    if (end === -1) {
	      throw new SyntaxError('Character ] expected in path');
	    }
	    if (end === 1) {
	      throw new SyntaxError('Index expected after [');
	    }

	    var value = jsonPath.substring(1, end);
	    if (value[0] === '\'') {
	      // ajv produces string prop names with single quotes, so we need
	      // to reformat them into valid double-quoted JSON strings
	      value = '\"' + value.substring(1, value.length - 1) + '\"';
	    }

	    prop = value === '*' ? value : JSON.parse(value); // parse string and number
	    remainder = jsonPath.substr(end + 1);
	  }
	  else {
	    throw new SyntaxError('Failed to parse path');
	  }

	  return [prop].concat(parsePath(remainder))
	};

	/**
	 * Improve the error message of a JSON schema error
	 * @param {Object} error
	 * @return {Object} The error
	 */
	exports.improveSchemaError = function (error) {
	  if (error.keyword === 'enum' && Array.isArray(error.schema)) {
	    var enums = error.schema;
	    if (enums) {
	      enums = enums.map(function (value) {
	        return JSON.stringify(value);
	      });

	      if (enums.length > 5) {
	        var more = ['(' + (enums.length - 5) + ' more...)'];
	        enums = enums.slice(0, 5);
	        enums.push(more);
	      }
	      error.message = 'should be equal to one of: ' + enums.join(', ');
	    }
	  }

	  if (error.keyword === 'additionalProperties') {
	    error.message = 'should NOT have additional property: ' + error.params.additionalProperty;
	  }

	  return error;
	};

	/**
	 * Test whether the child rect fits completely inside the parent rect.
	 * @param {ClientRect} parent
	 * @param {ClientRect} child
	 * @param {number} margin
	 */
	exports.insideRect = function (parent, child, margin) {
	  var _margin = margin !== undefined ? margin : 0;
	  return child.left   - _margin >= parent.left
	      && child.right  + _margin <= parent.right
	      && child.top    - _margin >= parent.top
	      && child.bottom + _margin <= parent.bottom;
	};

	/**
	 * Returns a function, that, as long as it continues to be invoked, will not
	 * be triggered. The function will be called after it stops being called for
	 * N milliseconds.
	 *
	 * Source: https://davidwalsh.name/javascript-debounce-function
	 *
	 * @param {function} func
	 * @param {number} wait                 Number in milliseconds
	 * @param {boolean} [immediate=false]   If `immediate` is passed, trigger the
	 *                                      function on the leading edge, instead
	 *                                      of the trailing.
	 * @return {function} Return the debounced function
	 */
	exports.debounce = function debounce(func, wait, immediate) {
	  var timeout;
	  return function() {
	    var context = this, args = arguments;
	    var later = function() {
	      timeout = null;
	      if (!immediate) func.apply(context, args);
	    };
	    var callNow = immediate && !timeout;
	    clearTimeout(timeout);
	    timeout = setTimeout(later, wait);
	    if (callNow) func.apply(context, args);
	  };
	};

	/**
	 * Determines the difference between two texts.
	 * Can only detect one removed or inserted block of characters.
	 * @param {string} oldText
	 * @param {string} newText
	 * @return {{start: number, end: number}} Returns the start and end
	 *                                        of the changed part in newText.
	 */
	exports.textDiff = function textDiff(oldText, newText) {
	  var len = newText.length;
	  var start = 0;
	  var oldEnd = oldText.length;
	  var newEnd = newText.length;

	  while (newText.charAt(start) === oldText.charAt(start)
	  && start < len) {
	    start++;
	  }

	  while (newText.charAt(newEnd - 1) === oldText.charAt(oldEnd - 1)
	  && newEnd > start && oldEnd > 0) {
	    newEnd--;
	    oldEnd--;
	  }

	  return {start: start, end: newEnd};
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* Jison generated parser */
	var jsonlint = (function(){
	var parser = {trace: function trace() { },
	yy: {},
	symbols_: {"error":2,"JSONString":3,"STRING":4,"JSONNumber":5,"NUMBER":6,"JSONNullLiteral":7,"NULL":8,"JSONBooleanLiteral":9,"TRUE":10,"FALSE":11,"JSONText":12,"JSONValue":13,"EOF":14,"JSONObject":15,"JSONArray":16,"{":17,"}":18,"JSONMemberList":19,"JSONMember":20,":":21,",":22,"[":23,"]":24,"JSONElementList":25,"$accept":0,"$end":1},
	terminals_: {2:"error",4:"STRING",6:"NUMBER",8:"NULL",10:"TRUE",11:"FALSE",14:"EOF",17:"{",18:"}",21:":",22:",",23:"[",24:"]"},
	productions_: [0,[3,1],[5,1],[7,1],[9,1],[9,1],[12,2],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[15,2],[15,3],[20,3],[19,1],[19,3],[16,2],[16,3],[25,1],[25,3]],
	performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

	var $0 = $$.length - 1;
	switch (yystate) {
	case 1: // replace escaped characters with actual character
	          this.$ = yytext.replace(/\\(\\|")/g, "$"+"1")
	                     .replace(/\\n/g,'\n')
	                     .replace(/\\r/g,'\r')
	                     .replace(/\\t/g,'\t')
	                     .replace(/\\v/g,'\v')
	                     .replace(/\\f/g,'\f')
	                     .replace(/\\b/g,'\b');
	        
	break;
	case 2:this.$ = Number(yytext);
	break;
	case 3:this.$ = null;
	break;
	case 4:this.$ = true;
	break;
	case 5:this.$ = false;
	break;
	case 6:return this.$ = $$[$0-1];
	break;
	case 13:this.$ = {};
	break;
	case 14:this.$ = $$[$0-1];
	break;
	case 15:this.$ = [$$[$0-2], $$[$0]];
	break;
	case 16:this.$ = {}; this.$[$$[$0][0]] = $$[$0][1];
	break;
	case 17:this.$ = $$[$0-2]; $$[$0-2][$$[$0][0]] = $$[$0][1];
	break;
	case 18:this.$ = [];
	break;
	case 19:this.$ = $$[$0-1];
	break;
	case 20:this.$ = [$$[$0]];
	break;
	case 21:this.$ = $$[$0-2]; $$[$0-2].push($$[$0]);
	break;
	}
	},
	table: [{3:5,4:[1,12],5:6,6:[1,13],7:3,8:[1,9],9:4,10:[1,10],11:[1,11],12:1,13:2,15:7,16:8,17:[1,14],23:[1,15]},{1:[3]},{14:[1,16]},{14:[2,7],18:[2,7],22:[2,7],24:[2,7]},{14:[2,8],18:[2,8],22:[2,8],24:[2,8]},{14:[2,9],18:[2,9],22:[2,9],24:[2,9]},{14:[2,10],18:[2,10],22:[2,10],24:[2,10]},{14:[2,11],18:[2,11],22:[2,11],24:[2,11]},{14:[2,12],18:[2,12],22:[2,12],24:[2,12]},{14:[2,3],18:[2,3],22:[2,3],24:[2,3]},{14:[2,4],18:[2,4],22:[2,4],24:[2,4]},{14:[2,5],18:[2,5],22:[2,5],24:[2,5]},{14:[2,1],18:[2,1],21:[2,1],22:[2,1],24:[2,1]},{14:[2,2],18:[2,2],22:[2,2],24:[2,2]},{3:20,4:[1,12],18:[1,17],19:18,20:19},{3:5,4:[1,12],5:6,6:[1,13],7:3,8:[1,9],9:4,10:[1,10],11:[1,11],13:23,15:7,16:8,17:[1,14],23:[1,15],24:[1,21],25:22},{1:[2,6]},{14:[2,13],18:[2,13],22:[2,13],24:[2,13]},{18:[1,24],22:[1,25]},{18:[2,16],22:[2,16]},{21:[1,26]},{14:[2,18],18:[2,18],22:[2,18],24:[2,18]},{22:[1,28],24:[1,27]},{22:[2,20],24:[2,20]},{14:[2,14],18:[2,14],22:[2,14],24:[2,14]},{3:20,4:[1,12],20:29},{3:5,4:[1,12],5:6,6:[1,13],7:3,8:[1,9],9:4,10:[1,10],11:[1,11],13:30,15:7,16:8,17:[1,14],23:[1,15]},{14:[2,19],18:[2,19],22:[2,19],24:[2,19]},{3:5,4:[1,12],5:6,6:[1,13],7:3,8:[1,9],9:4,10:[1,10],11:[1,11],13:31,15:7,16:8,17:[1,14],23:[1,15]},{18:[2,17],22:[2,17]},{18:[2,15],22:[2,15]},{22:[2,21],24:[2,21]}],
	defaultActions: {16:[2,6]},
	parseError: function parseError(str, hash) {
	    throw new Error(str);
	},
	parse: function parse(input) {
	    var self = this,
	        stack = [0],
	        vstack = [null], // semantic value stack
	        lstack = [], // location stack
	        table = this.table,
	        yytext = '',
	        yylineno = 0,
	        yyleng = 0,
	        recovering = 0,
	        TERROR = 2,
	        EOF = 1;

	    //this.reductionCount = this.shiftCount = 0;

	    this.lexer.setInput(input);
	    this.lexer.yy = this.yy;
	    this.yy.lexer = this.lexer;
	    if (typeof this.lexer.yylloc == 'undefined')
	        this.lexer.yylloc = {};
	    var yyloc = this.lexer.yylloc;
	    lstack.push(yyloc);

	    if (typeof this.yy.parseError === 'function')
	        this.parseError = this.yy.parseError;

	    function popStack (n) {
	        stack.length = stack.length - 2*n;
	        vstack.length = vstack.length - n;
	        lstack.length = lstack.length - n;
	    }

	    function lex() {
	        var token;
	        token = self.lexer.lex() || 1; // $end = 1
	        // if token isn't its numeric value, convert
	        if (typeof token !== 'number') {
	            token = self.symbols_[token] || token;
	        }
	        return token;
	    }

	    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
	    while (true) {
	        // retreive state number from top of stack
	        state = stack[stack.length-1];

	        // use default actions if available
	        if (this.defaultActions[state]) {
	            action = this.defaultActions[state];
	        } else {
	            if (symbol == null)
	                symbol = lex();
	            // read action for current state and first input
	            action = table[state] && table[state][symbol];
	        }

	        // handle parse error
	        _handle_error:
	        if (typeof action === 'undefined' || !action.length || !action[0]) {

	            if (!recovering) {
	                // Report error
	                expected = [];
	                for (p in table[state]) if (this.terminals_[p] && p > 2) {
	                    expected.push("'"+this.terminals_[p]+"'");
	                }
	                var errStr = '';
	                if (this.lexer.showPosition) {
	                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + this.terminals_[symbol]+ "'";
	                } else {
	                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
	                                  (symbol == 1 /*EOF*/ ? "end of input" :
	                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
	                }
	                this.parseError(errStr,
	                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
	            }

	            // just recovered from another error
	            if (recovering == 3) {
	                if (symbol == EOF) {
	                    throw new Error(errStr || 'Parsing halted.');
	                }

	                // discard current lookahead and grab another
	                yyleng = this.lexer.yyleng;
	                yytext = this.lexer.yytext;
	                yylineno = this.lexer.yylineno;
	                yyloc = this.lexer.yylloc;
	                symbol = lex();
	            }

	            // try to recover from error
	            while (1) {
	                // check for error recovery rule in this state
	                if ((TERROR.toString()) in table[state]) {
	                    break;
	                }
	                if (state == 0) {
	                    throw new Error(errStr || 'Parsing halted.');
	                }
	                popStack(1);
	                state = stack[stack.length-1];
	            }

	            preErrorSymbol = symbol; // save the lookahead token
	            symbol = TERROR;         // insert generic error symbol as new lookahead
	            state = stack[stack.length-1];
	            action = table[state] && table[state][TERROR];
	            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
	        }

	        // this shouldn't happen, unless resolve defaults are off
	        if (action[0] instanceof Array && action.length > 1) {
	            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
	        }

	        switch (action[0]) {

	            case 1: // shift
	                //this.shiftCount++;

	                stack.push(symbol);
	                vstack.push(this.lexer.yytext);
	                lstack.push(this.lexer.yylloc);
	                stack.push(action[1]); // push state
	                symbol = null;
	                if (!preErrorSymbol) { // normal execution/no error
	                    yyleng = this.lexer.yyleng;
	                    yytext = this.lexer.yytext;
	                    yylineno = this.lexer.yylineno;
	                    yyloc = this.lexer.yylloc;
	                    if (recovering > 0)
	                        recovering--;
	                } else { // error just occurred, resume old lookahead f/ before error
	                    symbol = preErrorSymbol;
	                    preErrorSymbol = null;
	                }
	                break;

	            case 2: // reduce
	                //this.reductionCount++;

	                len = this.productions_[action[1]][1];

	                // perform semantic action
	                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
	                // default location, uses first token for firsts, last for lasts
	                yyval._$ = {
	                    first_line: lstack[lstack.length-(len||1)].first_line,
	                    last_line: lstack[lstack.length-1].last_line,
	                    first_column: lstack[lstack.length-(len||1)].first_column,
	                    last_column: lstack[lstack.length-1].last_column
	                };
	                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

	                if (typeof r !== 'undefined') {
	                    return r;
	                }

	                // pop off stack
	                if (len) {
	                    stack = stack.slice(0,-1*len*2);
	                    vstack = vstack.slice(0, -1*len);
	                    lstack = lstack.slice(0, -1*len);
	                }

	                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
	                vstack.push(yyval.$);
	                lstack.push(yyval._$);
	                // goto new state = table[STATE][NONTERMINAL]
	                newState = table[stack[stack.length-2]][stack[stack.length-1]];
	                stack.push(newState);
	                break;

	            case 3: // accept
	                return true;
	        }

	    }

	    return true;
	}};
	/* Jison generated lexer */
	var lexer = (function(){
	var lexer = ({EOF:1,
	parseError:function parseError(str, hash) {
	        if (this.yy.parseError) {
	            this.yy.parseError(str, hash);
	        } else {
	            throw new Error(str);
	        }
	    },
	setInput:function (input) {
	        this._input = input;
	        this._more = this._less = this.done = false;
	        this.yylineno = this.yyleng = 0;
	        this.yytext = this.matched = this.match = '';
	        this.conditionStack = ['INITIAL'];
	        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
	        return this;
	    },
	input:function () {
	        var ch = this._input[0];
	        this.yytext+=ch;
	        this.yyleng++;
	        this.match+=ch;
	        this.matched+=ch;
	        var lines = ch.match(/\n/);
	        if (lines) this.yylineno++;
	        this._input = this._input.slice(1);
	        return ch;
	    },
	unput:function (ch) {
	        this._input = ch + this._input;
	        return this;
	    },
	more:function () {
	        this._more = true;
	        return this;
	    },
	less:function (n) {
	        this._input = this.match.slice(n) + this._input;
	    },
	pastInput:function () {
	        var past = this.matched.substr(0, this.matched.length - this.match.length);
	        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
	    },
	upcomingInput:function () {
	        var next = this.match;
	        if (next.length < 20) {
	            next += this._input.substr(0, 20-next.length);
	        }
	        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
	    },
	showPosition:function () {
	        var pre = this.pastInput();
	        var c = new Array(pre.length + 1).join("-");
	        return pre + this.upcomingInput() + "\n" + c+"^";
	    },
	next:function () {
	        if (this.done) {
	            return this.EOF;
	        }
	        if (!this._input) this.done = true;

	        var token,
	            match,
	            tempMatch,
	            index,
	            col,
	            lines;
	        if (!this._more) {
	            this.yytext = '';
	            this.match = '';
	        }
	        var rules = this._currentRules();
	        for (var i=0;i < rules.length; i++) {
	            tempMatch = this._input.match(this.rules[rules[i]]);
	            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
	                match = tempMatch;
	                index = i;
	                if (!this.options.flex) break;
	            }
	        }
	        if (match) {
	            lines = match[0].match(/\n.*/g);
	            if (lines) this.yylineno += lines.length;
	            this.yylloc = {first_line: this.yylloc.last_line,
	                           last_line: this.yylineno+1,
	                           first_column: this.yylloc.last_column,
	                           last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
	            this.yytext += match[0];
	            this.match += match[0];
	            this.yyleng = this.yytext.length;
	            this._more = false;
	            this._input = this._input.slice(match[0].length);
	            this.matched += match[0];
	            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
	            if (this.done && this._input) this.done = false;
	            if (token) return token;
	            else return;
	        }
	        if (this._input === "") {
	            return this.EOF;
	        } else {
	            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
	                    {text: "", token: null, line: this.yylineno});
	        }
	    },
	lex:function lex() {
	        var r = this.next();
	        if (typeof r !== 'undefined') {
	            return r;
	        } else {
	            return this.lex();
	        }
	    },
	begin:function begin(condition) {
	        this.conditionStack.push(condition);
	    },
	popState:function popState() {
	        return this.conditionStack.pop();
	    },
	_currentRules:function _currentRules() {
	        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
	    },
	topState:function () {
	        return this.conditionStack[this.conditionStack.length-2];
	    },
	pushState:function begin(condition) {
	        this.begin(condition);
	    }});
	lexer.options = {};
	lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

	var YYSTATE=YY_START
	switch($avoiding_name_collisions) {
	case 0:/* skip whitespace */
	break;
	case 1:return 6
	break;
	case 2:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 4
	break;
	case 3:return 17
	break;
	case 4:return 18
	break;
	case 5:return 23
	break;
	case 6:return 24
	break;
	case 7:return 22
	break;
	case 8:return 21
	break;
	case 9:return 10
	break;
	case 10:return 11
	break;
	case 11:return 8
	break;
	case 12:return 14
	break;
	case 13:return 'INVALID'
	break;
	}
	};
	lexer.rules = [/^(?:\s+)/,/^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/,/^(?:"(?:\\[\\"bfnrt/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?::)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:null\b)/,/^(?:$)/,/^(?:.)/];
	lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13],"inclusive":true}};


	;
	return lexer;})()
	parser.lexer = lexer;
	return parser;
	})();
	if (true) {
	  exports.parser = jsonlint;
	  exports.parse = jsonlint.parse.bind(jsonlint);
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * @constructor SearchBox
	 * Create a search box in given HTML container
	 * @param {JSONEditor} editor    The JSON Editor to attach to
	 * @param {Element} container               HTML container element of where to
	 *                                          create the search box
	 */
	function SearchBox (editor, container) {
	  var searchBox = this;

	  this.editor = editor;
	  this.timeout = undefined;
	  this.delay = 200; // ms
	  this.lastText = undefined;

	  this.dom = {};
	  this.dom.container = container;

	  var table = document.createElement('table');
	  this.dom.table = table;
	  table.className = 'jsoneditor-search';
	  container.appendChild(table);
	  var tbody = document.createElement('tbody');
	  this.dom.tbody = tbody;
	  table.appendChild(tbody);
	  var tr = document.createElement('tr');
	  tbody.appendChild(tr);

	  var td = document.createElement('td');
	  tr.appendChild(td);
	  var results = document.createElement('div');
	  this.dom.results = results;
	  results.className = 'jsoneditor-results';
	  td.appendChild(results);

	  td = document.createElement('td');
	  tr.appendChild(td);
	  var divInput = document.createElement('div');
	  this.dom.input = divInput;
	  divInput.className = 'jsoneditor-frame';
	  divInput.title = 'Search fields and values';
	  td.appendChild(divInput);

	  // table to contain the text input and search button
	  var tableInput = document.createElement('table');
	  divInput.appendChild(tableInput);
	  var tbodySearch = document.createElement('tbody');
	  tableInput.appendChild(tbodySearch);
	  tr = document.createElement('tr');
	  tbodySearch.appendChild(tr);

	  var refreshSearch = document.createElement('button');
	  refreshSearch.type = 'button';
	  refreshSearch.className = 'jsoneditor-refresh';
	  td = document.createElement('td');
	  td.appendChild(refreshSearch);
	  tr.appendChild(td);

	  var search = document.createElement('input');
	  // search.type = 'button';
	  this.dom.search = search;
	  search.oninput = function (event) {
	    searchBox._onDelayedSearch(event);
	  };
	  search.onchange = function (event) { // For IE 9
	    searchBox._onSearch();
	  };
	  search.onkeydown = function (event) {
	    searchBox._onKeyDown(event);
	  };
	  search.onkeyup = function (event) {
	    searchBox._onKeyUp(event);
	  };
	  refreshSearch.onclick = function (event) {
	    search.select();
	  };

	  // TODO: ESC in FF restores the last input, is a FF bug, https://bugzilla.mozilla.org/show_bug.cgi?id=598819
	  td = document.createElement('td');
	  td.appendChild(search);
	  tr.appendChild(td);

	  var searchNext = document.createElement('button');
	  searchNext.type = 'button';
	  searchNext.title = 'Next result (Enter)';
	  searchNext.className = 'jsoneditor-next';
	  searchNext.onclick = function () {
	    searchBox.next();
	  };
	  td = document.createElement('td');
	  td.appendChild(searchNext);
	  tr.appendChild(td);

	  var searchPrevious = document.createElement('button');
	  searchPrevious.type = 'button';
	  searchPrevious.title = 'Previous result (Shift+Enter)';
	  searchPrevious.className = 'jsoneditor-previous';
	  searchPrevious.onclick = function () {
	    searchBox.previous();
	  };
	  td = document.createElement('td');
	  td.appendChild(searchPrevious);
	  tr.appendChild(td);
	}

	/**
	 * Go to the next search result
	 * @param {boolean} [focus]   If true, focus will be set to the next result
	 *                            focus is false by default.
	 */
	SearchBox.prototype.next = function(focus) {
	  if (this.results != undefined) {
	    var index = (this.resultIndex != undefined) ? this.resultIndex + 1 : 0;
	    if (index > this.results.length - 1) {
	      index = 0;
	    }
	    this._setActiveResult(index, focus);
	  }
	};

	/**
	 * Go to the prevous search result
	 * @param {boolean} [focus]   If true, focus will be set to the next result
	 *                            focus is false by default.
	 */
	SearchBox.prototype.previous = function(focus) {
	  if (this.results != undefined) {
	    var max = this.results.length - 1;
	    var index = (this.resultIndex != undefined) ? this.resultIndex - 1 : max;
	    if (index < 0) {
	      index = max;
	    }
	    this._setActiveResult(index, focus);
	  }
	};

	/**
	 * Set new value for the current active result
	 * @param {Number} index
	 * @param {boolean} [focus]   If true, focus will be set to the next result.
	 *                            focus is false by default.
	 * @private
	 */
	SearchBox.prototype._setActiveResult = function(index, focus) {
	  // de-activate current active result
	  if (this.activeResult) {
	    var prevNode = this.activeResult.node;
	    var prevElem = this.activeResult.elem;
	    if (prevElem == 'field') {
	      delete prevNode.searchFieldActive;
	    }
	    else {
	      delete prevNode.searchValueActive;
	    }
	    prevNode.updateDom();
	  }

	  if (!this.results || !this.results[index]) {
	    // out of range, set to undefined
	    this.resultIndex = undefined;
	    this.activeResult = undefined;
	    return;
	  }

	  this.resultIndex = index;

	  // set new node active
	  var node = this.results[this.resultIndex].node;
	  var elem = this.results[this.resultIndex].elem;
	  if (elem == 'field') {
	    node.searchFieldActive = true;
	  }
	  else {
	    node.searchValueActive = true;
	  }
	  this.activeResult = this.results[this.resultIndex];
	  node.updateDom();

	  // TODO: not so nice that the focus is only set after the animation is finished
	  node.scrollTo(function () {
	    if (focus) {
	      node.focus(elem);
	    }
	  });
	};

	/**
	 * Cancel any running onDelayedSearch.
	 * @private
	 */
	SearchBox.prototype._clearDelay = function() {
	  if (this.timeout != undefined) {
	    clearTimeout(this.timeout);
	    delete this.timeout;
	  }
	};

	/**
	 * Start a timer to execute a search after a short delay.
	 * Used for reducing the number of searches while typing.
	 * @param {Event} event
	 * @private
	 */
	SearchBox.prototype._onDelayedSearch = function (event) {
	  // execute the search after a short delay (reduces the number of
	  // search actions while typing in the search text box)
	  this._clearDelay();
	  var searchBox = this;
	  this.timeout = setTimeout(function (event) {
	    searchBox._onSearch();
	  },
	  this.delay);
	};

	/**
	 * Handle onSearch event
	 * @param {boolean} [forceSearch]  If true, search will be executed again even
	 *                                 when the search text is not changed.
	 *                                 Default is false.
	 * @private
	 */
	SearchBox.prototype._onSearch = function (forceSearch) {
	  this._clearDelay();

	  var value = this.dom.search.value;
	  var text = (value.length > 0) ? value : undefined;
	  if (text != this.lastText || forceSearch) {
	    // only search again when changed
	    this.lastText = text;
	    this.results = this.editor.search(text);
	    this._setActiveResult(undefined);

	    // display search results
	    if (text != undefined) {
	      var resultCount = this.results.length;
	      switch (resultCount) {
	        case 0: this.dom.results.innerHTML = 'no&nbsp;results'; break;
	        case 1: this.dom.results.innerHTML = '1&nbsp;result'; break;
	        default: this.dom.results.innerHTML = resultCount + '&nbsp;results'; break;
	      }
	    }
	    else {
	      this.dom.results.innerHTML = '';
	    }
	  }
	};

	/**
	 * Handle onKeyDown event in the input box
	 * @param {Event} event
	 * @private
	 */
	SearchBox.prototype._onKeyDown = function (event) {
	  var keynum = event.which;
	  if (keynum == 27) { // ESC
	    this.dom.search.value = '';  // clear search
	    this._onSearch();
	    event.preventDefault();
	    event.stopPropagation();
	  }
	  else if (keynum == 13) { // Enter
	    if (event.ctrlKey) {
	      // force to search again
	      this._onSearch(true);
	    }
	    else if (event.shiftKey) {
	      // move to the previous search result
	      this.previous();
	    }
	    else {
	      // move to the next search result
	      this.next();
	    }
	    event.preventDefault();
	    event.stopPropagation();
	  }
	};

	/**
	 * Handle onKeyUp event in the input box
	 * @param {Event} event
	 * @private
	 */
	SearchBox.prototype._onKeyUp = function (event) {
	  var keynum = event.keyCode;
	  if (keynum != 27 && keynum != 13) { // !show and !Enter
	    this._onDelayedSearch(event);   // For IE 9
	  }
	};

	/**
	 * Clear the search results
	 */
	SearchBox.prototype.clear = function () {
	  this.dom.search.value = '';
	  this._onSearch();
	};

	/**
	 * Destroy the search box
	 */
	SearchBox.prototype.destroy = function () {
	  this.editor = null;
	  this.dom.container.removeChild(this.dom.table);
	  this.dom = null;

	  this.results = null;
	  this.activeResult = null;

	  this._clearDelay();

	};

	module.exports = SearchBox;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(4);

	/**
	 * A context menu
	 * @param {Object[]} items    Array containing the menu structure
	 *                            TODO: describe structure
	 * @param {Object} [options]  Object with options. Available options:
	 *                            {function} close    Callback called when the
	 *                                                context menu is being closed.
	 * @constructor
	 */
	function ContextMenu (items, options) {
	  this.dom = {};

	  var me = this;
	  var dom = this.dom;
	  this.anchor = undefined;
	  this.items = items;
	  this.eventListeners = {};
	  this.selection = undefined; // holds the selection before the menu was opened
	  this.onClose = options ? options.close : undefined;

	  // create root element
	  var root = document.createElement('div');
	  root.className = 'jsoneditor-contextmenu-root';
	  dom.root = root;

	  // create a container element
	  var menu = document.createElement('div');
	  menu.className = 'jsoneditor-contextmenu';
	  dom.menu = menu;
	  root.appendChild(menu);

	  // create a list to hold the menu items
	  var list = document.createElement('ul');
	  list.className = 'jsoneditor-menu';
	  menu.appendChild(list);
	  dom.list = list;
	  dom.items = []; // list with all buttons

	  // create a (non-visible) button to set the focus to the menu
	  var focusButton = document.createElement('button');
	  focusButton.type = 'button';
	  dom.focusButton = focusButton;
	  var li = document.createElement('li');
	  li.style.overflow = 'hidden';
	  li.style.height = '0';
	  li.appendChild(focusButton);
	  list.appendChild(li);

	  function createMenuItems (list, domItems, items) {
	    items.forEach(function (item) {
	      if (item.type == 'separator') {
	        // create a separator
	        var separator = document.createElement('div');
	        separator.className = 'jsoneditor-separator';
	        li = document.createElement('li');
	        li.appendChild(separator);
	        list.appendChild(li);
	      }
	      else {
	        var domItem = {};

	        // create a menu item
	        var li = document.createElement('li');
	        list.appendChild(li);

	        // create a button in the menu item
	        var button = document.createElement('button');
	        button.type = 'button';
	        button.className = item.className;
	        domItem.button = button;
	        if (item.title) {
	          button.title = item.title;
	        }
	        if (item.click) {
	          button.onclick = function (event) {
	            event.preventDefault();
	            me.hide();
	            item.click();
	          };
	        }
	        li.appendChild(button);

	        // create the contents of the button
	        if (item.submenu) {
	          // add the icon to the button
	          var divIcon = document.createElement('div');
	          divIcon.className = 'jsoneditor-icon';
	          button.appendChild(divIcon);
	          button.appendChild(document.createTextNode(item.text));

	          var buttonSubmenu;
	          if (item.click) {
	            // submenu and a button with a click handler
	            button.className += ' jsoneditor-default';

	            var buttonExpand = document.createElement('button');
	            buttonExpand.type = 'button';
	            domItem.buttonExpand = buttonExpand;
	            buttonExpand.className = 'jsoneditor-expand';
	            buttonExpand.innerHTML = '<div class="jsoneditor-expand"></div>';
	            li.appendChild(buttonExpand);
	            if (item.submenuTitle) {
	              buttonExpand.title = item.submenuTitle;
	            }

	            buttonSubmenu = buttonExpand;
	          }
	          else {
	            // submenu and a button without a click handler
	            var divExpand = document.createElement('div');
	            divExpand.className = 'jsoneditor-expand';
	            button.appendChild(divExpand);

	            buttonSubmenu = button;
	          }

	          // attach a handler to expand/collapse the submenu
	          buttonSubmenu.onclick = function (event) {
	            event.preventDefault();
	            me._onExpandItem(domItem);
	            buttonSubmenu.focus();
	          };

	          // create the submenu
	          var domSubItems = [];
	          domItem.subItems = domSubItems;
	          var ul = document.createElement('ul');
	          domItem.ul = ul;
	          ul.className = 'jsoneditor-menu';
	          ul.style.height = '0';
	          li.appendChild(ul);
	          createMenuItems(ul, domSubItems, item.submenu);
	        }
	        else {
	          // no submenu, just a button with clickhandler
	          button.innerHTML = '<div class="jsoneditor-icon"></div>' + item.text;
	        }

	        domItems.push(domItem);
	      }
	    });
	  }
	  createMenuItems(list, this.dom.items, items);

	  // TODO: when the editor is small, show the submenu on the right instead of inline?

	  // calculate the max height of the menu with one submenu expanded
	  this.maxHeight = 0; // height in pixels
	  items.forEach(function (item) {
	    var height = (items.length + (item.submenu ? item.submenu.length : 0)) * 24;
	    me.maxHeight = Math.max(me.maxHeight, height);
	  });
	}

	/**
	 * Get the currently visible buttons
	 * @return {Array.<HTMLElement>} buttons
	 * @private
	 */
	ContextMenu.prototype._getVisibleButtons = function () {
	  var buttons = [];
	  var me = this;
	  this.dom.items.forEach(function (item) {
	    buttons.push(item.button);
	    if (item.buttonExpand) {
	      buttons.push(item.buttonExpand);
	    }
	    if (item.subItems && item == me.expandedItem) {
	      item.subItems.forEach(function (subItem) {
	        buttons.push(subItem.button);
	        if (subItem.buttonExpand) {
	          buttons.push(subItem.buttonExpand);
	        }
	        // TODO: change to fully recursive method
	      });
	    }
	  });

	  return buttons;
	};

	// currently displayed context menu, a singleton. We may only have one visible context menu
	ContextMenu.visibleMenu = undefined;

	/**
	 * Attach the menu to an anchor
	 * @param {HTMLElement} anchor          Anchor where the menu will be attached
	 *                                      as sibling.
	 * @param {HTMLElement} [contentWindow] The DIV with with the (scrollable) contents
	 */
	ContextMenu.prototype.show = function (anchor, contentWindow) {
	  this.hide();

	  // determine whether to display the menu below or above the anchor
	  var showBelow = true;
	  if (contentWindow) {
	    var anchorRect = anchor.getBoundingClientRect();
	    var contentRect = contentWindow.getBoundingClientRect();

	    if (anchorRect.bottom + this.maxHeight < contentRect.bottom) {
	      // fits below -> show below
	    }
	    else if (anchorRect.top - this.maxHeight > contentRect.top) {
	      // fits above -> show above
	      showBelow = false;
	    }
	    else {
	      // doesn't fit above nor below -> show below
	    }
	  }

	  // position the menu
	  if (showBelow) {
	    // display the menu below the anchor
	    var anchorHeight = anchor.offsetHeight;
	    this.dom.menu.style.left = '0px';
	    this.dom.menu.style.top = anchorHeight + 'px';
	    this.dom.menu.style.bottom = '';
	  }
	  else {
	    // display the menu above the anchor
	    this.dom.menu.style.left = '0px';
	    this.dom.menu.style.top = '';
	    this.dom.menu.style.bottom = '0px';
	  }

	  // attach the menu to the parent of the anchor
	  var parent = anchor.parentNode;
	  parent.insertBefore(this.dom.root, parent.firstChild);

	  // create and attach event listeners
	  var me = this;
	  var list = this.dom.list;
	  this.eventListeners.mousedown = util.addEventListener(window, 'mousedown', function (event) {
	    // hide menu on click outside of the menu
	    var target = event.target;
	    if ((target != list) && !me._isChildOf(target, list)) {
	      me.hide();
	      event.stopPropagation();
	      event.preventDefault();
	    }
	  });
	  this.eventListeners.keydown = util.addEventListener(window, 'keydown', function (event) {
	    me._onKeyDown(event);
	  });

	  // move focus to the first button in the context menu
	  this.selection = util.getSelection();
	  this.anchor = anchor;
	  setTimeout(function () {
	    me.dom.focusButton.focus();
	  }, 0);

	  if (ContextMenu.visibleMenu) {
	    ContextMenu.visibleMenu.hide();
	  }
	  ContextMenu.visibleMenu = this;
	};

	/**
	 * Hide the context menu if visible
	 */
	ContextMenu.prototype.hide = function () {
	  // remove the menu from the DOM
	  if (this.dom.root.parentNode) {
	    this.dom.root.parentNode.removeChild(this.dom.root);
	    if (this.onClose) {
	      this.onClose();
	    }
	  }

	  // remove all event listeners
	  // all event listeners are supposed to be attached to document.
	  for (var name in this.eventListeners) {
	    if (this.eventListeners.hasOwnProperty(name)) {
	      var fn = this.eventListeners[name];
	      if (fn) {
	        util.removeEventListener(window, name, fn);
	      }
	      delete this.eventListeners[name];
	    }
	  }

	  if (ContextMenu.visibleMenu == this) {
	    ContextMenu.visibleMenu = undefined;
	  }
	};

	/**
	 * Expand a submenu
	 * Any currently expanded submenu will be hided.
	 * @param {Object} domItem
	 * @private
	 */
	ContextMenu.prototype._onExpandItem = function (domItem) {
	  var me = this;
	  var alreadyVisible = (domItem == this.expandedItem);

	  // hide the currently visible submenu
	  var expandedItem = this.expandedItem;
	  if (expandedItem) {
	    //var ul = expandedItem.ul;
	    expandedItem.ul.style.height = '0';
	    expandedItem.ul.style.padding = '';
	    setTimeout(function () {
	      if (me.expandedItem != expandedItem) {
	        expandedItem.ul.style.display = '';
	        util.removeClassName(expandedItem.ul.parentNode, 'jsoneditor-selected');
	      }
	    }, 300); // timeout duration must match the css transition duration
	    this.expandedItem = undefined;
	  }

	  if (!alreadyVisible) {
	    var ul = domItem.ul;
	    ul.style.display = 'block';
	    var height = ul.clientHeight; // force a reflow in Firefox
	    setTimeout(function () {
	      if (me.expandedItem == domItem) {
	        ul.style.height = (ul.childNodes.length * 24) + 'px';
	        ul.style.padding = '5px 10px';
	      }
	    }, 0);
	    util.addClassName(ul.parentNode, 'jsoneditor-selected');
	    this.expandedItem = domItem;
	  }
	};

	/**
	 * Handle onkeydown event
	 * @param {Event} event
	 * @private
	 */
	ContextMenu.prototype._onKeyDown = function (event) {
	  var target = event.target;
	  var keynum = event.which;
	  var handled = false;
	  var buttons, targetIndex, prevButton, nextButton;

	  if (keynum == 27) { // ESC
	    // hide the menu on ESC key

	    // restore previous selection and focus
	    if (this.selection) {
	      util.setSelection(this.selection);
	    }
	    if (this.anchor) {
	      this.anchor.focus();
	    }

	    this.hide();

	    handled = true;
	  }
	  else if (keynum == 9) { // Tab
	    if (!event.shiftKey) { // Tab
	      buttons = this._getVisibleButtons();
	      targetIndex = buttons.indexOf(target);
	      if (targetIndex == buttons.length - 1) {
	        // move to first button
	        buttons[0].focus();
	        handled = true;
	      }
	    }
	    else { // Shift+Tab
	      buttons = this._getVisibleButtons();
	      targetIndex = buttons.indexOf(target);
	      if (targetIndex == 0) {
	        // move to last button
	        buttons[buttons.length - 1].focus();
	        handled = true;
	      }
	    }
	  }
	  else if (keynum == 37) { // Arrow Left
	    if (target.className == 'jsoneditor-expand') {
	      buttons = this._getVisibleButtons();
	      targetIndex = buttons.indexOf(target);
	      prevButton = buttons[targetIndex - 1];
	      if (prevButton) {
	        prevButton.focus();
	      }
	    }
	    handled = true;
	  }
	  else if (keynum == 38) { // Arrow Up
	    buttons = this._getVisibleButtons();
	    targetIndex = buttons.indexOf(target);
	    prevButton = buttons[targetIndex - 1];
	    if (prevButton && prevButton.className == 'jsoneditor-expand') {
	      // skip expand button
	      prevButton = buttons[targetIndex - 2];
	    }
	    if (!prevButton) {
	      // move to last button
	      prevButton = buttons[buttons.length - 1];
	    }
	    if (prevButton) {
	      prevButton.focus();
	    }
	    handled = true;
	  }
	  else if (keynum == 39) { // Arrow Right
	    buttons = this._getVisibleButtons();
	    targetIndex = buttons.indexOf(target);
	    nextButton = buttons[targetIndex + 1];
	    if (nextButton && nextButton.className == 'jsoneditor-expand') {
	      nextButton.focus();
	    }
	    handled = true;
	  }
	  else if (keynum == 40) { // Arrow Down
	    buttons = this._getVisibleButtons();
	    targetIndex = buttons.indexOf(target);
	    nextButton = buttons[targetIndex + 1];
	    if (nextButton && nextButton.className == 'jsoneditor-expand') {
	      // skip expand button
	      nextButton = buttons[targetIndex + 2];
	    }
	    if (!nextButton) {
	      // move to first button
	      nextButton = buttons[0];
	    }
	    if (nextButton) {
	      nextButton.focus();
	      handled = true;
	    }
	    handled = true;
	  }
	  // TODO: arrow left and right

	  if (handled) {
	    event.stopPropagation();
	    event.preventDefault();
	  }
	};

	/**
	 * Test if an element is a child of a parent element.
	 * @param {Element} child
	 * @param {Element} parent
	 * @return {boolean} isChild
	 */
	ContextMenu.prototype._isChildOf = function (child, parent) {
	  var e = child.parentNode;
	  while (e) {
	    if (e == parent) {
	      return true;
	    }
	    e = e.parentNode;
	  }

	  return false;
	};

	module.exports = ContextMenu;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var naturalSort = __webpack_require__(9);
	var ContextMenu = __webpack_require__(7);
	var appendNodeFactory = __webpack_require__(10);
	var util = __webpack_require__(4);

	/**
	 * @constructor Node
	 * Create a new Node
	 * @param {./treemode} editor
	 * @param {Object} [params] Can contain parameters:
	 *                          {string}  field
	 *                          {boolean} fieldEditable
	 *                          {*}       value
	 *                          {String}  type  Can have values 'auto', 'array',
	 *                                          'object', or 'string'.
	 */
	function Node (editor, params) {
	  /** @type {./treemode} */
	  this.editor = editor;
	  this.dom = {};
	  this.expanded = false;

	  if(params && (params instanceof Object)) {
	    this.setField(params.field, params.fieldEditable);
	    this.setValue(params.value, params.type);
	  }
	  else {
	    this.setField('');
	    this.setValue(null);
	  }

	  this._debouncedOnChangeValue = util.debounce(this._onChangeValue.bind(this), Node.prototype.DEBOUNCE_INTERVAL);
	  this._debouncedOnChangeField = util.debounce(this._onChangeField.bind(this), Node.prototype.DEBOUNCE_INTERVAL);
	}

	// debounce interval for keyboard input in milliseconds
	Node.prototype.DEBOUNCE_INTERVAL = 150;

	/**
	 * Determine whether the field and/or value of this node are editable
	 * @private
	 */
	Node.prototype._updateEditability = function () {
	  this.editable = {
	    field: true,
	    value: true
	  };

	  if (this.editor) {
	    this.editable.field = this.editor.options.mode === 'tree';
	    this.editable.value = this.editor.options.mode !== 'view';

	    if ((this.editor.options.mode === 'tree' || this.editor.options.mode === 'form') &&
	        (typeof this.editor.options.onEditable === 'function')) {
	      var editable = this.editor.options.onEditable({
	        field: this.field,
	        value: this.value,
	        path: this.getPath()
	      });

	      if (typeof editable === 'boolean') {
	        this.editable.field = editable;
	        this.editable.value = editable;
	      }
	      else {
	        if (typeof editable.field === 'boolean') this.editable.field = editable.field;
	        if (typeof editable.value === 'boolean') this.editable.value = editable.value;
	      }
	    }
	  }
	};

	/**
	 * Get the path of this node
	 * @return {String[]} Array containing the path to this node
	 */
	Node.prototype.getPath = function () {
	  var node = this;
	  var path = [];
	  while (node) {
	    var field = !node.parent
	        ? undefined  // do not add an (optional) field name of the root node
	        :  (node.parent.type != 'array')
	            ? node.field
	            : node.index;

	    if (field !== undefined) {
	      path.unshift(field);
	    }
	    node = node.parent;
	  }
	  return path;
	};

	/**
	 * Find a Node from a JSON path like '.items[3].name'
	 * @param {string} jsonPath
	 * @return {Node | null} Returns the Node when found, returns null if not found
	 */
	Node.prototype.findNode = function (jsonPath) {
	  var path = util.parsePath(jsonPath);
	  var node = this;
	  while (node && path.length > 0) {
	    var prop = path.shift();
	    if (typeof prop === 'number') {
	      if (node.type !== 'array') {
	        throw new Error('Cannot get child node at index ' + prop + ': node is no array');
	      }
	      node = node.childs[prop];
	    }
	    else { // string
	      if (node.type !== 'object') {
	        throw new Error('Cannot get child node ' + prop + ': node is no object');
	      }
	      node = node.childs.filter(function (child) {
	        return child.field === prop;
	      })[0];
	    }
	  }

	  return node;
	};

	/**
	 * Find all parents of this node. The parents are ordered from root node towards
	 * the original node.
	 * @return {Array.<Node>}
	 */
	Node.prototype.findParents = function () {
	  var parents = [];
	  var parent = this.parent;
	  while (parent) {
	    parents.unshift(parent);
	    parent = parent.parent;
	  }
	  return parents;
	};

	/**
	 *
	 * @param {{dataPath: string, keyword: string, message: string, params: Object, schemaPath: string} | null} error
	 * @param {Node} [child]  When this is the error of a parent node, pointing
	 *                        to an invalid child node, the child node itself
	 *                        can be provided. If provided, clicking the error
	 *                        icon will set focus to the invalid child node.
	 */
	Node.prototype.setError = function (error, child) {
	  // ensure the dom exists
	  this.getDom();

	  this.error = error;
	  var tdError = this.dom.tdError;
	  if (error) {
	    if (!tdError) {
	      tdError = document.createElement('td');
	      this.dom.tdError = tdError;
	      this.dom.tdValue.parentNode.appendChild(tdError);
	    }

	    var popover = document.createElement('div');
	    popover.className = 'jsoneditor-popover jsoneditor-right';
	    popover.appendChild(document.createTextNode(error.message));

	    var button = document.createElement('button');
	    button.type = 'button';
	    button.className = 'jsoneditor-schema-error';
	    button.appendChild(popover);

	    // update the direction of the popover
	    button.onmouseover = button.onfocus = function updateDirection() {
	      var directions = ['right', 'above', 'below', 'left'];
	      for (var i = 0; i < directions.length; i++) {
	        var direction = directions[i];
	        popover.className = 'jsoneditor-popover jsoneditor-' + direction;

	        var contentRect = this.editor.content.getBoundingClientRect();
	        var popoverRect = popover.getBoundingClientRect();
	        var margin = 20; // account for a scroll bar
	        var fit = util.insideRect(contentRect, popoverRect, margin);

	        if (fit) {
	          break;
	        }
	      }
	    }.bind(this);

	    // when clicking the error icon, expand all nodes towards the invalid
	    // child node, and set focus to the child node
	    if (child) {
	      button.onclick = function showInvalidNode() {
	        child.findParents().forEach(function (parent) {
	          parent.expand(false);
	        });

	        child.scrollTo(function () {
	          child.focus();
	        });
	      };
	    }

	    // apply the error message to the node
	    while (tdError.firstChild) {
	      tdError.removeChild(tdError.firstChild);
	    }
	    tdError.appendChild(button);
	  }
	  else {
	    if (tdError) {
	      this.dom.tdError.parentNode.removeChild(this.dom.tdError);
	      delete this.dom.tdError;
	    }
	  }
	};

	/**
	 * Get the index of this node: the index in the list of childs where this
	 * node is part of
	 * @return {number} Returns the index, or -1 if this is the root node
	 */
	Node.prototype.getIndex = function () {
	  return this.parent ? this.parent.childs.indexOf(this) : -1;
	};

	/**
	 * Set parent node
	 * @param {Node} parent
	 */
	Node.prototype.setParent = function(parent) {
	  this.parent = parent;
	};

	/**
	 * Set field
	 * @param {String}  field
	 * @param {boolean} [fieldEditable]
	 */
	Node.prototype.setField = function(field, fieldEditable) {
	  this.field = field;
	  this.previousField = field;
	  this.fieldEditable = (fieldEditable === true);
	};

	/**
	 * Get field
	 * @return {String}
	 */
	Node.prototype.getField = function() {
	  if (this.field === undefined) {
	    this._getDomField();
	  }

	  return this.field;
	};

	/**
	 * Set value. Value is a JSON structure or an element String, Boolean, etc.
	 * @param {*} value
	 * @param {String} [type]  Specify the type of the value. Can be 'auto',
	 *                         'array', 'object', or 'string'
	 */
	Node.prototype.setValue = function(value, type) {
	  var childValue, child;

	  // first clear all current childs (if any)
	  var childs = this.childs;
	  if (childs) {
	    while (childs.length) {
	      this.removeChild(childs[0]);
	    }
	  }

	  // TODO: remove the DOM of this Node

	  this.type = this._getType(value);

	  // check if type corresponds with the provided type
	  if (type && type != this.type) {
	    if (type == 'string' && this.type == 'auto') {
	      this.type = type;
	    }
	    else {
	      throw new Error('Type mismatch: ' +
	          'cannot cast value of type "' + this.type +
	          ' to the specified type "' + type + '"');
	    }
	  }

	  if (this.type == 'array') {
	    // array
	    this.childs = [];
	    for (var i = 0, iMax = value.length; i < iMax; i++) {
	      childValue = value[i];
	      if (childValue !== undefined && !(childValue instanceof Function)) {
	        // ignore undefined and functions
	        child = new Node(this.editor, {
	          value: childValue
	        });
	        this.appendChild(child);
	      }
	    }
	    this.value = '';
	  }
	  else if (this.type == 'object') {
	    // object
	    this.childs = [];
	    for (var childField in value) {
	      if (value.hasOwnProperty(childField)) {
	        childValue = value[childField];
	        if (childValue !== undefined && !(childValue instanceof Function)) {
	          // ignore undefined and functions
	          child = new Node(this.editor, {
	            field: childField,
	            value: childValue
	          });
	          this.appendChild(child);
	        }
	      }
	    }
	    this.value = '';

	    // sort object keys
	    if (this.editor.options.sortObjectKeys === true) {
	      this.sort('asc');
	    }
	  }
	  else {
	    // value
	    this.childs = undefined;
	    this.value = value;
	  }

	  this.previousValue = this.value;
	};

	/**
	 * Get value. Value is a JSON structure
	 * @return {*} value
	 */
	Node.prototype.getValue = function() {
	  //var childs, i, iMax;

	  if (this.type == 'array') {
	    var arr = [];
	    this.childs.forEach (function (child) {
	      arr.push(child.getValue());
	    });
	    return arr;
	  }
	  else if (this.type == 'object') {
	    var obj = {};
	    this.childs.forEach (function (child) {
	      obj[child.getField()] = child.getValue();
	    });
	    return obj;
	  }
	  else {
	    if (this.value === undefined) {
	      this._getDomValue();
	    }

	    return this.value;
	  }
	};

	/**
	 * Get the nesting level of this node
	 * @return {Number} level
	 */
	Node.prototype.getLevel = function() {
	  return (this.parent ? this.parent.getLevel() + 1 : 0);
	};

	/**
	 * Get path of the root node till the current node
	 * @return {Node[]} Returns an array with nodes
	 */
	Node.prototype.getNodePath = function() {
	  var path = this.parent ? this.parent.getNodePath() : [];
	  path.push(this);
	  return path;
	};

	/**
	 * Create a clone of a node
	 * The complete state of a clone is copied, including whether it is expanded or
	 * not. The DOM elements are not cloned.
	 * @return {Node} clone
	 */
	Node.prototype.clone = function() {
	  var clone = new Node(this.editor);
	  clone.type = this.type;
	  clone.field = this.field;
	  clone.fieldInnerText = this.fieldInnerText;
	  clone.fieldEditable = this.fieldEditable;
	  clone.value = this.value;
	  clone.valueInnerText = this.valueInnerText;
	  clone.expanded = this.expanded;

	  if (this.childs) {
	    // an object or array
	    var cloneChilds = [];
	    this.childs.forEach(function (child) {
	      var childClone = child.clone();
	      childClone.setParent(clone);
	      cloneChilds.push(childClone);
	    });
	    clone.childs = cloneChilds;
	  }
	  else {
	    // a value
	    clone.childs = undefined;
	  }

	  return clone;
	};

	/**
	 * Expand this node and optionally its childs.
	 * @param {boolean} [recurse] Optional recursion, true by default. When
	 *                            true, all childs will be expanded recursively
	 */
	Node.prototype.expand = function(recurse) {
	  if (!this.childs) {
	    return;
	  }

	  // set this node expanded
	  this.expanded = true;
	  if (this.dom.expand) {
	    this.dom.expand.className = 'jsoneditor-expanded';
	  }

	  this.showChilds();

	  if (recurse !== false) {
	    this.childs.forEach(function (child) {
	      child.expand(recurse);
	    });
	  }
	};

	/**
	 * Collapse this node and optionally its childs.
	 * @param {boolean} [recurse] Optional recursion, true by default. When
	 *                            true, all childs will be collapsed recursively
	 */
	Node.prototype.collapse = function(recurse) {
	  if (!this.childs) {
	    return;
	  }

	  this.hideChilds();

	  // collapse childs in case of recurse
	  if (recurse !== false) {
	    this.childs.forEach(function (child) {
	      child.collapse(recurse);
	    });

	  }

	  // make this node collapsed
	  if (this.dom.expand) {
	    this.dom.expand.className = 'jsoneditor-collapsed';
	  }
	  this.expanded = false;
	};

	/**
	 * Recursively show all childs when they are expanded
	 */
	Node.prototype.showChilds = function() {
	  var childs = this.childs;
	  if (!childs) {
	    return;
	  }
	  if (!this.expanded) {
	    return;
	  }

	  var tr = this.dom.tr;
	  var table = tr ? tr.parentNode : undefined;
	  if (table) {
	    // show row with append button
	    var append = this.getAppend();
	    var nextTr = tr.nextSibling;
	    if (nextTr) {
	      table.insertBefore(append, nextTr);
	    }
	    else {
	      table.appendChild(append);
	    }

	    // show childs
	    this.childs.forEach(function (child) {
	      table.insertBefore(child.getDom(), append);
	      child.showChilds();
	    });
	  }
	};

	/**
	 * Hide the node with all its childs
	 */
	Node.prototype.hide = function() {
	  var tr = this.dom.tr;
	  var table = tr ? tr.parentNode : undefined;
	  if (table) {
	    table.removeChild(tr);
	  }
	  this.hideChilds();
	};


	/**
	 * Recursively hide all childs
	 */
	Node.prototype.hideChilds = function() {
	  var childs = this.childs;
	  if (!childs) {
	    return;
	  }
	  if (!this.expanded) {
	    return;
	  }

	  // hide append row
	  var append = this.getAppend();
	  if (append.parentNode) {
	    append.parentNode.removeChild(append);
	  }

	  // hide childs
	  this.childs.forEach(function (child) {
	    child.hide();
	  });
	};


	/**
	 * Add a new child to the node.
	 * Only applicable when Node value is of type array or object
	 * @param {Node} node
	 */
	Node.prototype.appendChild = function(node) {
	  if (this._hasChilds()) {
	    // adjust the link to the parent
	    node.setParent(this);
	    node.fieldEditable = (this.type == 'object');
	    if (this.type == 'array') {
	      node.index = this.childs.length;
	    }
	    this.childs.push(node);

	    if (this.expanded) {
	      // insert into the DOM, before the appendRow
	      var newTr = node.getDom();
	      var appendTr = this.getAppend();
	      var table = appendTr ? appendTr.parentNode : undefined;
	      if (appendTr && table) {
	        table.insertBefore(newTr, appendTr);
	      }

	      node.showChilds();
	    }

	    this.updateDom({'updateIndexes': true});
	    node.updateDom({'recurse': true});
	  }
	};


	/**
	 * Move a node from its current parent to this node
	 * Only applicable when Node value is of type array or object
	 * @param {Node} node
	 * @param {Node} beforeNode
	 */
	Node.prototype.moveBefore = function(node, beforeNode) {
	  if (this._hasChilds()) {
	    // create a temporary row, to prevent the scroll position from jumping
	    // when removing the node
	    var tbody = (this.dom.tr) ? this.dom.tr.parentNode : undefined;
	    if (tbody) {
	      var trTemp = document.createElement('tr');
	      trTemp.style.height = tbody.clientHeight + 'px';
	      tbody.appendChild(trTemp);
	    }

	    if (node.parent) {
	      node.parent.removeChild(node);
	    }

	    if (beforeNode instanceof AppendNode) {
	      this.appendChild(node);
	    }
	    else {
	      this.insertBefore(node, beforeNode);
	    }

	    if (tbody) {
	      tbody.removeChild(trTemp);
	    }
	  }
	};

	/**
	 * Move a node from its current parent to this node
	 * Only applicable when Node value is of type array or object.
	 * If index is out of range, the node will be appended to the end
	 * @param {Node} node
	 * @param {Number} index
	 */
	Node.prototype.moveTo = function (node, index) {
	  if (node.parent == this) {
	    // same parent
	    var currentIndex = this.childs.indexOf(node);
	    if (currentIndex < index) {
	      // compensate the index for removal of the node itself
	      index++;
	    }
	  }

	  var beforeNode = this.childs[index] || this.append;
	  this.moveBefore(node, beforeNode);
	};

	/**
	 * Insert a new child before a given node
	 * Only applicable when Node value is of type array or object
	 * @param {Node} node
	 * @param {Node} beforeNode
	 */
	Node.prototype.insertBefore = function(node, beforeNode) {
	  if (this._hasChilds()) {
	    if (beforeNode == this.append) {
	      // append to the child nodes

	      // adjust the link to the parent
	      node.setParent(this);
	      node.fieldEditable = (this.type == 'object');
	      this.childs.push(node);
	    }
	    else {
	      // insert before a child node
	      var index = this.childs.indexOf(beforeNode);
	      if (index == -1) {
	        throw new Error('Node not found');
	      }

	      // adjust the link to the parent
	      node.setParent(this);
	      node.fieldEditable = (this.type == 'object');
	      this.childs.splice(index, 0, node);
	    }

	    if (this.expanded) {
	      // insert into the DOM
	      var newTr = node.getDom();
	      var nextTr = beforeNode.getDom();
	      var table = nextTr ? nextTr.parentNode : undefined;
	      if (nextTr && table) {
	        table.insertBefore(newTr, nextTr);
	      }

	      node.showChilds();
	    }

	    this.updateDom({'updateIndexes': true});
	    node.updateDom({'recurse': true});
	  }
	};

	/**
	 * Insert a new child before a given node
	 * Only applicable when Node value is of type array or object
	 * @param {Node} node
	 * @param {Node} afterNode
	 */
	Node.prototype.insertAfter = function(node, afterNode) {
	  if (this._hasChilds()) {
	    var index = this.childs.indexOf(afterNode);
	    var beforeNode = this.childs[index + 1];
	    if (beforeNode) {
	      this.insertBefore(node, beforeNode);
	    }
	    else {
	      this.appendChild(node);
	    }
	  }
	};

	/**
	 * Search in this node
	 * The node will be expanded when the text is found one of its childs, else
	 * it will be collapsed. Searches are case insensitive.
	 * @param {String} text
	 * @return {Node[]} results  Array with nodes containing the search text
	 */
	Node.prototype.search = function(text) {
	  var results = [];
	  var index;
	  var search = text ? text.toLowerCase() : undefined;

	  // delete old search data
	  delete this.searchField;
	  delete this.searchValue;

	  // search in field
	  if (this.field != undefined) {
	    var field = String(this.field).toLowerCase();
	    index = field.indexOf(search);
	    if (index != -1) {
	      this.searchField = true;
	      results.push({
	        'node': this,
	        'elem': 'field'
	      });
	    }

	    // update dom
	    this._updateDomField();
	  }

	  // search in value
	  if (this._hasChilds()) {
	    // array, object

	    // search the nodes childs
	    if (this.childs) {
	      var childResults = [];
	      this.childs.forEach(function (child) {
	        childResults = childResults.concat(child.search(text));
	      });
	      results = results.concat(childResults);
	    }

	    // update dom
	    if (search != undefined) {
	      var recurse = false;
	      if (childResults.length == 0) {
	        this.collapse(recurse);
	      }
	      else {
	        this.expand(recurse);
	      }
	    }
	  }
	  else {
	    // string, auto
	    if (this.value != undefined ) {
	      var value = String(this.value).toLowerCase();
	      index = value.indexOf(search);
	      if (index != -1) {
	        this.searchValue = true;
	        results.push({
	          'node': this,
	          'elem': 'value'
	        });
	      }
	    }

	    // update dom
	    this._updateDomValue();
	  }

	  return results;
	};

	/**
	 * Move the scroll position such that this node is in the visible area.
	 * The node will not get the focus
	 * @param {function(boolean)} [callback]
	 */
	Node.prototype.scrollTo = function(callback) {
	  if (!this.dom.tr || !this.dom.tr.parentNode) {
	    // if the node is not visible, expand its parents
	    var parent = this.parent;
	    var recurse = false;
	    while (parent) {
	      parent.expand(recurse);
	      parent = parent.parent;
	    }
	  }

	  if (this.dom.tr && this.dom.tr.parentNode) {
	    this.editor.scrollTo(this.dom.tr.offsetTop, callback);
	  }
	};


	// stores the element name currently having the focus
	Node.focusElement = undefined;

	/**
	 * Set focus to this node
	 * @param {String} [elementName]  The field name of the element to get the
	 *                                focus available values: 'drag', 'menu',
	 *                                'expand', 'field', 'value' (default)
	 */
	Node.prototype.focus = function(elementName) {
	  Node.focusElement = elementName;

	  if (this.dom.tr && this.dom.tr.parentNode) {
	    var dom = this.dom;

	    switch (elementName) {
	      case 'drag':
	        if (dom.drag) {
	          dom.drag.focus();
	        }
	        else {
	          dom.menu.focus();
	        }
	        break;

	      case 'menu':
	        dom.menu.focus();
	        break;

	      case 'expand':
	        if (this._hasChilds()) {
	          dom.expand.focus();
	        }
	        else if (dom.field && this.fieldEditable) {
	          dom.field.focus();
	          util.selectContentEditable(dom.field);
	        }
	        else if (dom.value && !this._hasChilds()) {
	          dom.value.focus();
	          util.selectContentEditable(dom.value);
	        }
	        else {
	          dom.menu.focus();
	        }
	        break;

	      case 'field':
	        if (dom.field && this.fieldEditable) {
	          dom.field.focus();
	          util.selectContentEditable(dom.field);
	        }
	        else if (dom.value && !this._hasChilds()) {
	          dom.value.focus();
	          util.selectContentEditable(dom.value);
	        }
	        else if (this._hasChilds()) {
	          dom.expand.focus();
	        }
	        else {
	          dom.menu.focus();
	        }
	        break;

	      case 'value':
	      default:
	        if (dom.value && !this._hasChilds()) {
	          dom.value.focus();
	          util.selectContentEditable(dom.value);
	        }
	        else if (dom.field && this.fieldEditable) {
	          dom.field.focus();
	          util.selectContentEditable(dom.field);
	        }
	        else if (this._hasChilds()) {
	          dom.expand.focus();
	        }
	        else {
	          dom.menu.focus();
	        }
	        break;
	    }
	  }
	};

	/**
	 * Select all text in an editable div after a delay of 0 ms
	 * @param {Element} editableDiv
	 */
	Node.select = function(editableDiv) {
	  setTimeout(function () {
	    util.selectContentEditable(editableDiv);
	  }, 0);
	};

	/**
	 * Update the values from the DOM field and value of this node
	 */
	Node.prototype.blur = function() {
	  // retrieve the actual field and value from the DOM.
	  this._getDomValue(false);
	  this._getDomField(false);
	};

	/**
	 * Check if given node is a child. The method will check recursively to find
	 * this node.
	 * @param {Node} node
	 * @return {boolean} containsNode
	 */
	Node.prototype.containsNode = function(node) {
	  if (this == node) {
	    return true;
	  }

	  var childs = this.childs;
	  if (childs) {
	    // TODO: use the js5 Array.some() here?
	    for (var i = 0, iMax = childs.length; i < iMax; i++) {
	      if (childs[i].containsNode(node)) {
	        return true;
	      }
	    }
	  }

	  return false;
	};

	/**
	 * Move given node into this node
	 * @param {Node} node           the childNode to be moved
	 * @param {Node} beforeNode     node will be inserted before given
	 *                                         node. If no beforeNode is given,
	 *                                         the node is appended at the end
	 * @private
	 */
	Node.prototype._move = function(node, beforeNode) {
	  if (node == beforeNode) {
	    // nothing to do...
	    return;
	  }

	  // check if this node is not a child of the node to be moved here
	  if (node.containsNode(this)) {
	    throw new Error('Cannot move a field into a child of itself');
	  }

	  // remove the original node
	  if (node.parent) {
	    node.parent.removeChild(node);
	  }

	  // create a clone of the node
	  var clone = node.clone();
	  node.clearDom();

	  // insert or append the node
	  if (beforeNode) {
	    this.insertBefore(clone, beforeNode);
	  }
	  else {
	    this.appendChild(clone);
	  }

	  /* TODO: adjust the field name (to prevent equal field names)
	   if (this.type == 'object') {
	   }
	   */
	};

	/**
	 * Remove a child from the node.
	 * Only applicable when Node value is of type array or object
	 * @param {Node} node   The child node to be removed;
	 * @return {Node | undefined} node  The removed node on success,
	 *                                             else undefined
	 */
	Node.prototype.removeChild = function(node) {
	  if (this.childs) {
	    var index = this.childs.indexOf(node);

	    if (index != -1) {
	      node.hide();

	      // delete old search results
	      delete node.searchField;
	      delete node.searchValue;

	      var removedNode = this.childs.splice(index, 1)[0];
	      removedNode.parent = null;

	      this.updateDom({'updateIndexes': true});

	      return removedNode;
	    }
	  }

	  return undefined;
	};

	/**
	 * Remove a child node node from this node
	 * This method is equal to Node.removeChild, except that _remove fire an
	 * onChange event.
	 * @param {Node} node
	 * @private
	 */
	Node.prototype._remove = function (node) {
	  this.removeChild(node);
	};

	/**
	 * Change the type of the value of this Node
	 * @param {String} newType
	 */
	Node.prototype.changeType = function (newType) {
	  var oldType = this.type;

	  if (oldType == newType) {
	    // type is not changed
	    return;
	  }

	  if ((newType == 'string' || newType == 'auto') &&
	      (oldType == 'string' || oldType == 'auto')) {
	    // this is an easy change
	    this.type = newType;
	  }
	  else {
	    // change from array to object, or from string/auto to object/array
	    var table = this.dom.tr ? this.dom.tr.parentNode : undefined;
	    var lastTr;
	    if (this.expanded) {
	      lastTr = this.getAppend();
	    }
	    else {
	      lastTr = this.getDom();
	    }
	    var nextTr = (lastTr && lastTr.parentNode) ? lastTr.nextSibling : undefined;

	    // hide current field and all its childs
	    this.hide();
	    this.clearDom();

	    // adjust the field and the value
	    this.type = newType;

	    // adjust childs
	    if (newType == 'object') {
	      if (!this.childs) {
	        this.childs = [];
	      }

	      this.childs.forEach(function (child, index) {
	        child.clearDom();
	        delete child.index;
	        child.fieldEditable = true;
	        if (child.field == undefined) {
	          child.field = '';
	        }
	      });

	      if (oldType == 'string' || oldType == 'auto') {
	        this.expanded = true;
	      }
	    }
	    else if (newType == 'array') {
	      if (!this.childs) {
	        this.childs = [];
	      }

	      this.childs.forEach(function (child, index) {
	        child.clearDom();
	        child.fieldEditable = false;
	        child.index = index;
	      });

	      if (oldType == 'string' || oldType == 'auto') {
	        this.expanded = true;
	      }
	    }
	    else {
	      this.expanded = false;
	    }

	    // create new DOM
	    if (table) {
	      if (nextTr) {
	        table.insertBefore(this.getDom(), nextTr);
	      }
	      else {
	        table.appendChild(this.getDom());
	      }
	    }
	    this.showChilds();
	  }

	  if (newType == 'auto' || newType == 'string') {
	    // cast value to the correct type
	    if (newType == 'string') {
	      this.value = String(this.value);
	    }
	    else {
	      this.value = this._stringCast(String(this.value));
	    }

	    this.focus();
	  }

	  this.updateDom({'updateIndexes': true});
	};

	/**
	 * Retrieve value from DOM
	 * @param {boolean} [silent]  If true (default), no errors will be thrown in
	 *                            case of invalid data
	 * @private
	 */
	Node.prototype._getDomValue = function(silent) {
	  if (this.dom.value && this.type != 'array' && this.type != 'object') {
	    this.valueInnerText = util.getInnerText(this.dom.value);
	  }

	  if (this.valueInnerText != undefined) {
	    try {
	      // retrieve the value
	      var value;
	      if (this.type == 'string') {
	        value = this._unescapeHTML(this.valueInnerText);
	      }
	      else {
	        var str = this._unescapeHTML(this.valueInnerText);
	        value = this._stringCast(str);
	      }
	      if (value !== this.value) {
	        this.value = value;
	        this._debouncedOnChangeValue();
	      }
	    }
	    catch (err) {
	      this.value = undefined;
	      // TODO: sent an action with the new, invalid value?
	      if (silent !== true) {
	        throw err;
	      }
	    }
	  }
	};

	/**
	 * Handle a changed value
	 * @private
	 */
	Node.prototype._onChangeValue = function () {
	  // get current selection, then override the range such that we can select
	  // the added/removed text on undo/redo
	  var oldSelection = this.editor.getSelection();
	  if (oldSelection.range) {
	    var undoDiff = util.textDiff(String(this.value), String(this.previousValue));
	    oldSelection.range.startOffset = undoDiff.start;
	    oldSelection.range.endOffset = undoDiff.end;
	  }
	  var newSelection = this.editor.getSelection();
	  if (newSelection.range) {
	    var redoDiff = util.textDiff(String(this.previousValue), String(this.value));
	    newSelection.range.startOffset = redoDiff.start;
	    newSelection.range.endOffset = redoDiff.end;
	  }

	  this.editor._onAction('editValue', {
	    node: this,
	    oldValue: this.previousValue,
	    newValue: this.value,
	    oldSelection: oldSelection,
	    newSelection: newSelection
	  });

	  this.previousValue = this.value;
	};

	/**
	 * Handle a changed field
	 * @private
	 */
	Node.prototype._onChangeField = function () {
	  // get current selection, then override the range such that we can select
	  // the added/removed text on undo/redo
	  var oldSelection = this.editor.getSelection();
	  if (oldSelection.range) {
	    var undoDiff = util.textDiff(this.field, this.previousField);
	    oldSelection.range.startOffset = undoDiff.start;
	    oldSelection.range.endOffset = undoDiff.end;
	  }
	  var newSelection = this.editor.getSelection();
	  if (newSelection.range) {
	    var redoDiff = util.textDiff(this.previousField, this.field);
	    newSelection.range.startOffset = redoDiff.start;
	    newSelection.range.endOffset = redoDiff.end;
	  }

	  this.editor._onAction('editField', {
	    node: this,
	    oldValue: this.previousField,
	    newValue: this.field,
	    oldSelection: oldSelection,
	    newSelection: newSelection
	  });

	  this.previousField = this.field;
	};

	/**
	 * Update dom value:
	 * - the text color of the value, depending on the type of the value
	 * - the height of the field, depending on the width
	 * - background color in case it is empty
	 * @private
	 */
	Node.prototype._updateDomValue = function () {
	  var domValue = this.dom.value;
	  if (domValue) {
	    var classNames = ['jsoneditor-value'];


	    // set text color depending on value type
	    var value = this.value;
	    var type = (this.type == 'auto') ? util.type(value) : this.type;
	    var isUrl = type == 'string' && util.isUrl(value);
	    classNames.push('jsoneditor-' + type);
	    if (isUrl) {
	      classNames.push('jsoneditor-url');
	    }

	    // visual styling when empty
	    var isEmpty = (String(this.value) == '' && this.type != 'array' && this.type != 'object');
	    if (isEmpty) {
	      classNames.push('jsoneditor-empty');
	    }

	    // highlight when there is a search result
	    if (this.searchValueActive) {
	      classNames.push('jsoneditor-highlight-active');
	    }
	    if (this.searchValue) {
	      classNames.push('jsoneditor-highlight');
	    }

	    domValue.className = classNames.join(' ');

	    // update title
	    if (type == 'array' || type == 'object') {
	      var count = this.childs ? this.childs.length : 0;
	      domValue.title = this.type + ' containing ' + count + ' items';
	    }
	    else if (isUrl && this.editable.value) {
	      domValue.title = 'Ctrl+Click or Ctrl+Enter to open url in new window';
	    }
	    else {
	      domValue.title = '';
	    }

	    // show checkbox when the value is a boolean
	    if (type === 'boolean' && this.editable.value) {
	      if (!this.dom.checkbox) {
	        this.dom.checkbox = document.createElement('input');
	        this.dom.checkbox.type = 'checkbox';
	        this.dom.tdCheckbox = document.createElement('td');
	        this.dom.tdCheckbox.className = 'jsoneditor-tree';
	        this.dom.tdCheckbox.appendChild(this.dom.checkbox);

	        this.dom.tdValue.parentNode.insertBefore(this.dom.tdCheckbox, this.dom.tdValue);
	      }

	      this.dom.checkbox.checked = this.value;
	    }
	    else {
	      // cleanup checkbox when displayed
	      if (this.dom.tdCheckbox) {
	        this.dom.tdCheckbox.parentNode.removeChild(this.dom.tdCheckbox);
	        delete this.dom.tdCheckbox;
	        delete this.dom.checkbox;
	      }
	    }

	    if (this.enum && this.editable.value) {
	      // create select box when this node has an enum object
	      if (!this.dom.select) {
	        this.dom.select = document.createElement('select');
	        this.id = this.field + "_" + new Date().getUTCMilliseconds();
	        this.dom.select.id = this.id;
	        this.dom.select.name = this.dom.select.id;

	        //Create the default empty option
	        this.dom.select.option = document.createElement('option');
	        this.dom.select.option.value = '';
	        this.dom.select.option.innerHTML = '--';
	        this.dom.select.appendChild(this.dom.select.option);

	        //Iterate all enum values and add them as options
	        for(var i = 0; i < this.enum.length; i++) {
	          this.dom.select.option = document.createElement('option');
	          this.dom.select.option.value = this.enum[i];
	          this.dom.select.option.innerHTML = this.enum[i];
	          if(this.dom.select.option.value == this.value){
	            this.dom.select.option.selected = true;
	          }
	          this.dom.select.appendChild(this.dom.select.option);
	        }

	        this.dom.tdSelect = document.createElement('td');
	        this.dom.tdSelect.className = 'jsoneditor-tree';
	        this.dom.tdSelect.appendChild(this.dom.select);
	        this.dom.tdValue.parentNode.insertBefore(this.dom.tdSelect, this.dom.tdValue);
	      }

	      // If the enum is inside a composite type display
	      // both the simple input and the dropdown field
	      if(this.schema && (
	          !this.schema.hasOwnProperty("oneOf") &&
	          !this.schema.hasOwnProperty("anyOf") &&
	          !this.schema.hasOwnProperty("allOf"))
	      ) {
	        this.valueFieldHTML = this.dom.tdValue.innerHTML;
	        this.dom.tdValue.style.visibility = 'hidden';
	        this.dom.tdValue.innerHTML = '';
	      } else {
	        delete this.valueFieldHTML;
	      }
	    }
	    else {
	      // cleanup select box when displayed
	      if (this.dom.tdSelect) {
	        this.dom.tdSelect.parentNode.removeChild(this.dom.tdSelect);
	        delete this.dom.tdSelect;
	        delete this.dom.select;
	        this.dom.tdValue.innerHTML = this.valueFieldHTML;
	        this.dom.tdValue.style.visibility = '';
	        delete this.valueFieldHTML;
	      }
	    }

	    // strip formatting from the contents of the editable div
	    util.stripFormatting(domValue);
	  }
	};

	/**
	 * Update dom field:
	 * - the text color of the field, depending on the text
	 * - the height of the field, depending on the width
	 * - background color in case it is empty
	 * @private
	 */
	Node.prototype._updateDomField = function () {
	  var domField = this.dom.field;
	  if (domField) {
	    // make backgound color lightgray when empty
	    var isEmpty = (String(this.field) == '' && this.parent.type != 'array');
	    if (isEmpty) {
	      util.addClassName(domField, 'jsoneditor-empty');
	    }
	    else {
	      util.removeClassName(domField, 'jsoneditor-empty');
	    }

	    // highlight when there is a search result
	    if (this.searchFieldActive) {
	      util.addClassName(domField, 'jsoneditor-highlight-active');
	    }
	    else {
	      util.removeClassName(domField, 'jsoneditor-highlight-active');
	    }
	    if (this.searchField) {
	      util.addClassName(domField, 'jsoneditor-highlight');
	    }
	    else {
	      util.removeClassName(domField, 'jsoneditor-highlight');
	    }

	    // strip formatting from the contents of the editable div
	    util.stripFormatting(domField);
	  }
	};

	/**
	 * Retrieve field from DOM
	 * @param {boolean} [silent]  If true (default), no errors will be thrown in
	 *                            case of invalid data
	 * @private
	 */
	Node.prototype._getDomField = function(silent) {
	  if (this.dom.field && this.fieldEditable) {
	    this.fieldInnerText = util.getInnerText(this.dom.field);
	  }

	  if (this.fieldInnerText != undefined) {
	    try {
	      var field = this._unescapeHTML(this.fieldInnerText);

	      if (field !== this.field) {
	        this.field = field;
	        this._debouncedOnChangeField();
	      }
	    }
	    catch (err) {
	      this.field = undefined;
	      // TODO: sent an action here, with the new, invalid value?
	      if (silent !== true) {
	        throw err;
	      }
	    }
	  }
	};

	/**
	 * Validate this node and all it's childs
	 * @return {Array.<{node: Node, error: {message: string}}>} Returns a list with duplicates
	 */
	Node.prototype.validate = function () {
	  var errors = [];

	  // find duplicate keys
	  if (this.type === 'object') {
	    var keys = {};
	    var duplicateKeys = [];
	    for (var i = 0; i < this.childs.length; i++) {
	      var child = this.childs[i];
	      if (keys.hasOwnProperty(child.field)) {
	        duplicateKeys.push(child.field);
	      }
	      keys[child.field] = true;
	    }

	    if (duplicateKeys.length > 0) {
	      errors = this.childs
	          .filter(function (node) {
	            return duplicateKeys.indexOf(node.field) !== -1;
	          })
	          .map(function (node) {
	            return {
	              node: node,
	              error: {
	                message: 'duplicate key "' + node.field + '"'
	              }
	            }
	          });
	    }
	  }

	  // recurse over the childs
	  if (this.childs) {
	    for (var i = 0; i < this.childs.length; i++) {
	      var e = this.childs[i].validate();
	      if (e.length > 0) {
	        errors = errors.concat(e);
	      }
	    }
	  }

	  return errors;
	};

	/**
	 * Clear the dom of the node
	 */
	Node.prototype.clearDom = function() {
	  // TODO: hide the node first?
	  //this.hide();
	  // TODO: recursively clear dom?

	  this.dom = {};
	};

	/**
	 * Get the HTML DOM TR element of the node.
	 * The dom will be generated when not yet created
	 * @return {Element} tr    HTML DOM TR Element
	 */
	Node.prototype.getDom = function() {
	  var dom = this.dom;
	  if (dom.tr) {
	    return dom.tr;
	  }

	  this._updateEditability();

	  // create row
	  dom.tr = document.createElement('tr');
	  dom.tr.node = this;

	  if (this.editor.options.mode === 'tree') { // note: we take here the global setting
	    var tdDrag = document.createElement('td');
	    if (this.editable.field) {
	      // create draggable area
	      if (this.parent) {
	        var domDrag = document.createElement('button');
	        domDrag.type = 'button';
	        dom.drag = domDrag;
	        domDrag.className = 'jsoneditor-dragarea';
	        domDrag.title = 'Drag to move this field (Alt+Shift+Arrows)';
	        tdDrag.appendChild(domDrag);
	      }
	    }
	    dom.tr.appendChild(tdDrag);

	    // create context menu
	    var tdMenu = document.createElement('td');
	    var menu = document.createElement('button');
	    menu.type = 'button';
	    dom.menu = menu;
	    menu.className = 'jsoneditor-contextmenu';
	    menu.title = 'Click to open the actions menu (Ctrl+M)';
	    tdMenu.appendChild(dom.menu);
	    dom.tr.appendChild(tdMenu);
	  }

	  // create tree and field
	  var tdField = document.createElement('td');
	  dom.tr.appendChild(tdField);
	  dom.tree = this._createDomTree();
	  tdField.appendChild(dom.tree);

	  this.updateDom({'updateIndexes': true});

	  return dom.tr;
	};

	/**
	 * DragStart event, fired on mousedown on the dragarea at the left side of a Node
	 * @param {Node[] | Node} nodes
	 * @param {Event} event
	 */
	Node.onDragStart = function (nodes, event) {
	  if (!Array.isArray(nodes)) {
	    return Node.onDragStart([nodes], event);
	  }
	  if (nodes.length === 0) {
	    return;
	  }

	  var firstNode = nodes[0];
	  var lastNode = nodes[nodes.length - 1];
	  var draggedNode = Node.getNodeFromTarget(event.target);
	  var beforeNode = lastNode._nextSibling();
	  var editor = firstNode.editor;

	  // in case of multiple selected nodes, offsetY prevents the selection from
	  // jumping when you start dragging one of the lower down nodes in the selection
	  var offsetY = util.getAbsoluteTop(draggedNode.dom.tr) - util.getAbsoluteTop(firstNode.dom.tr);

	  if (!editor.mousemove) {
	    editor.mousemove = util.addEventListener(window, 'mousemove', function (event) {
	      Node.onDrag(nodes, event);
	    });
	  }

	  if (!editor.mouseup) {
	    editor.mouseup = util.addEventListener(window, 'mouseup',function (event ) {
	      Node.onDragEnd(nodes, event);
	    });
	  }

	  editor.highlighter.lock();
	  editor.drag = {
	    oldCursor: document.body.style.cursor,
	    oldSelection: editor.getSelection(),
	    oldBeforeNode: beforeNode,
	    mouseX: event.pageX,
	    offsetY: offsetY,
	    level: firstNode.getLevel()
	  };
	  document.body.style.cursor = 'move';

	  event.preventDefault();
	};

	/**
	 * Drag event, fired when moving the mouse while dragging a Node
	 * @param {Node[] | Node} nodes
	 * @param {Event} event
	 */
	Node.onDrag = function (nodes, event) {
	  if (!Array.isArray(nodes)) {
	    return Node.onDrag([nodes], event);
	  }
	  if (nodes.length === 0) {
	    return;
	  }

	  // TODO: this method has grown too large. Split it in a number of methods
	  var editor = nodes[0].editor;
	  var mouseY = event.pageY - editor.drag.offsetY;
	  var mouseX = event.pageX;
	  var trThis, trPrev, trNext, trFirst, trLast, trRoot;
	  var nodePrev, nodeNext;
	  var topThis, topPrev, topFirst, heightThis, bottomNext, heightNext;
	  var moved = false;

	  // TODO: add an ESC option, which resets to the original position

	  // move up/down
	  var firstNode = nodes[0];
	  trThis = firstNode.dom.tr;
	  topThis = util.getAbsoluteTop(trThis);
	  heightThis = trThis.offsetHeight;
	  if (mouseY < topThis) {
	    // move up
	    trPrev = trThis;
	    do {
	      trPrev = trPrev.previousSibling;
	      nodePrev = Node.getNodeFromTarget(trPrev);
	      topPrev = trPrev ? util.getAbsoluteTop(trPrev) : 0;
	    }
	    while (trPrev && mouseY < topPrev);

	    if (nodePrev && !nodePrev.parent) {
	      nodePrev = undefined;
	    }

	    if (!nodePrev) {
	      // move to the first node
	      trRoot = trThis.parentNode.firstChild;
	      trPrev = trRoot ? trRoot.nextSibling : undefined;
	      nodePrev = Node.getNodeFromTarget(trPrev);
	      if (nodePrev == firstNode) {
	        nodePrev = undefined;
	      }
	    }

	    if (nodePrev) {
	      // check if mouseY is really inside the found node
	      trPrev = nodePrev.dom.tr;
	      topPrev = trPrev ? util.getAbsoluteTop(trPrev) : 0;
	      if (mouseY > topPrev + heightThis) {
	        nodePrev = undefined;
	      }
	    }

	    if (nodePrev) {
	      nodes.forEach(function (node) {
	        nodePrev.parent.moveBefore(node, nodePrev);
	      });
	      moved = true;
	    }
	  }
	  else {
	    // move down
	    var lastNode = nodes[nodes.length - 1];
	    trLast = (lastNode.expanded && lastNode.append) ? lastNode.append.getDom() : lastNode.dom.tr;
	    trFirst = trLast ? trLast.nextSibling : undefined;
	    if (trFirst) {
	      topFirst = util.getAbsoluteTop(trFirst);
	      trNext = trFirst;
	      do {
	        nodeNext = Node.getNodeFromTarget(trNext);
	        if (trNext) {
	          bottomNext = trNext.nextSibling ?
	              util.getAbsoluteTop(trNext.nextSibling) : 0;
	          heightNext = trNext ? (bottomNext - topFirst) : 0;

	          if (nodeNext.parent.childs.length == nodes.length &&
	              nodeNext.parent.childs[nodes.length - 1] == lastNode) {
	            // We are about to remove the last child of this parent,
	            // which will make the parents appendNode visible.
	            topThis += 27;
	            // TODO: dangerous to suppose the height of the appendNode a constant of 27 px.
	          }
	        }

	        trNext = trNext.nextSibling;
	      }
	      while (trNext && mouseY > topThis + heightNext);

	      if (nodeNext && nodeNext.parent) {
	        // calculate the desired level
	        var diffX = (mouseX - editor.drag.mouseX);
	        var diffLevel = Math.round(diffX / 24 / 2);
	        var level = editor.drag.level + diffLevel; // desired level
	        var levelNext = nodeNext.getLevel();     // level to be

	        // find the best fitting level (move upwards over the append nodes)
	        trPrev = nodeNext.dom.tr.previousSibling;
	        while (levelNext < level && trPrev) {
	          nodePrev = Node.getNodeFromTarget(trPrev);

	          var isDraggedNode = nodes.some(function (node) {
	            return node === nodePrev || nodePrev._isChildOf(node);
	          });

	          if (isDraggedNode) {
	            // neglect the dragged nodes themselves and their childs
	          }
	          else if (nodePrev instanceof AppendNode) {
	            var childs = nodePrev.parent.childs;
	            if (childs.length != nodes.length || childs[nodes.length - 1] != lastNode) {
	              // non-visible append node of a list of childs
	              // consisting of not only this node (else the
	              // append node will change into a visible "empty"
	              // text when removing this node).
	              nodeNext = Node.getNodeFromTarget(trPrev);
	              levelNext = nodeNext.getLevel();
	            }
	            else {
	              break;
	            }
	          }
	          else {
	            break;
	          }

	          trPrev = trPrev.previousSibling;
	        }

	        // move the node when its position is changed
	        if (trLast.nextSibling != nodeNext.dom.tr) {
	          nodes.forEach(function (node) {
	            nodeNext.parent.moveBefore(node, nodeNext);
	          });
	          moved = true;
	        }
	      }
	    }
	  }

	  if (moved) {
	    // update the dragging parameters when moved
	    editor.drag.mouseX = mouseX;
	    editor.drag.level = firstNode.getLevel();
	  }

	  // auto scroll when hovering around the top of the editor
	  editor.startAutoScroll(mouseY);

	  event.preventDefault();
	};

	/**
	 * Drag event, fired on mouseup after having dragged a node
	 * @param {Node[] | Node} nodes
	 * @param {Event} event
	 */
	Node.onDragEnd = function (nodes, event) {
	  if (!Array.isArray(nodes)) {
	    return Node.onDrag([nodes], event);
	  }
	  if (nodes.length === 0) {
	    return;
	  }

	  var firstNode = nodes[0];
	  var editor = firstNode.editor;
	  var parent = firstNode.parent;
	  var firstIndex = parent.childs.indexOf(firstNode);
	  var beforeNode = parent.childs[firstIndex + nodes.length] || parent.append;

	  // set focus to the context menu button of the first node
	  if (nodes[0]) {
	    nodes[0].dom.menu.focus();
	  }

	  var params = {
	    nodes: nodes,
	    oldSelection: editor.drag.oldSelection,
	    newSelection: editor.getSelection(),
	    oldBeforeNode: editor.drag.oldBeforeNode,
	    newBeforeNode: beforeNode
	  };

	  if (params.oldBeforeNode != params.newBeforeNode) {
	    // only register this action if the node is actually moved to another place
	    editor._onAction('moveNodes', params);
	  }

	  document.body.style.cursor = editor.drag.oldCursor;
	  editor.highlighter.unlock();
	  nodes.forEach(function (node) {
	    if (event.target !== node.dom.drag && event.target !== node.dom.menu) {
	      editor.highlighter.unhighlight();
	    }
	  });
	  delete editor.drag;

	  if (editor.mousemove) {
	    util.removeEventListener(window, 'mousemove', editor.mousemove);
	    delete editor.mousemove;
	  }
	  if (editor.mouseup) {
	    util.removeEventListener(window, 'mouseup', editor.mouseup);
	    delete editor.mouseup;
	  }

	  // Stop any running auto scroll
	  editor.stopAutoScroll();

	  event.preventDefault();
	};

	/**
	 * Test if this node is a child of an other node
	 * @param {Node} node
	 * @return {boolean} isChild
	 * @private
	 */
	Node.prototype._isChildOf = function (node) {
	  var n = this.parent;
	  while (n) {
	    if (n == node) {
	      return true;
	    }
	    n = n.parent;
	  }

	  return false;
	};

	/**
	 * Create an editable field
	 * @return {Element} domField
	 * @private
	 */
	Node.prototype._createDomField = function () {
	  return document.createElement('div');
	};

	/**
	 * Set highlighting for this node and all its childs.
	 * Only applied to the currently visible (expanded childs)
	 * @param {boolean} highlight
	 */
	Node.prototype.setHighlight = function (highlight) {
	  if (this.dom.tr) {
	    if (highlight) {
	      util.addClassName(this.dom.tr, 'jsoneditor-highlight');
	    }
	    else {
	      util.removeClassName(this.dom.tr, 'jsoneditor-highlight');
	    }

	    if (this.append) {
	      this.append.setHighlight(highlight);
	    }

	    if (this.childs) {
	      this.childs.forEach(function (child) {
	        child.setHighlight(highlight);
	      });
	    }
	  }
	};

	/**
	 * Select or deselect a node
	 * @param {boolean} selected
	 * @param {boolean} [isFirst]
	 */
	Node.prototype.setSelected = function (selected, isFirst) {
	  this.selected = selected;

	  if (this.dom.tr) {
	    if (selected) {
	      util.addClassName(this.dom.tr, 'jsoneditor-selected');
	    }
	    else {
	      util.removeClassName(this.dom.tr, 'jsoneditor-selected');
	    }

	    if (isFirst) {
	      util.addClassName(this.dom.tr, 'jsoneditor-first');
	    }
	    else {
	      util.removeClassName(this.dom.tr, 'jsoneditor-first');
	    }

	    if (this.append) {
	      this.append.setSelected(selected);
	    }

	    if (this.childs) {
	      this.childs.forEach(function (child) {
	        child.setSelected(selected);
	      });
	    }
	  }
	};

	/**
	 * Update the value of the node. Only primitive types are allowed, no Object
	 * or Array is allowed.
	 * @param {String | Number | Boolean | null} value
	 */
	Node.prototype.updateValue = function (value) {
	  this.value = value;
	  this.updateDom();
	};

	/**
	 * Update the field of the node.
	 * @param {String} field
	 */
	Node.prototype.updateField = function (field) {
	  this.field = field;
	  this.updateDom();
	};

	/**
	 * Update the HTML DOM, optionally recursing through the childs
	 * @param {Object} [options] Available parameters:
	 *                          {boolean} [recurse]         If true, the
	 *                          DOM of the childs will be updated recursively.
	 *                          False by default.
	 *                          {boolean} [updateIndexes]   If true, the childs
	 *                          indexes of the node will be updated too. False by
	 *                          default.
	 */
	Node.prototype.updateDom = function (options) {
	  // update level indentation
	  var domTree = this.dom.tree;
	  if (domTree) {
	    domTree.style.marginLeft = this.getLevel() * 24 + 'px';
	  }

	  // apply field to DOM
	  var domField = this.dom.field;
	  if (domField) {
	    if (this.fieldEditable) {
	      // parent is an object
	      domField.contentEditable = this.editable.field;
	      domField.spellcheck = false;
	      domField.className = 'jsoneditor-field';
	    }
	    else {
	      // parent is an array this is the root node
	      domField.className = 'jsoneditor-readonly';
	    }

	    var fieldText;
	    if (this.index != undefined) {
	      fieldText = this.index;
	    }
	    else if (this.field != undefined) {
	      fieldText = this.field;
	    }
	    else if (this._hasChilds()) {
	      fieldText = this.type;
	    }
	    else {
	      fieldText = '';
	    }
	    domField.innerHTML = this._escapeHTML(fieldText);

	    this._updateSchema();
	  }

	  // apply value to DOM
	  var domValue = this.dom.value;
	  if (domValue) {
	    var count = this.childs ? this.childs.length : 0;
	    if (this.type == 'array') {
	      domValue.innerHTML = '[' + count + ']';
	      util.addClassName(this.dom.tr, 'jsoneditor-expandable');
	    }
	    else if (this.type == 'object') {
	      domValue.innerHTML = '{' + count + '}';
	      util.addClassName(this.dom.tr, 'jsoneditor-expandable');
	    }
	    else {
	      domValue.innerHTML = this._escapeHTML(this.value);
	      util.removeClassName(this.dom.tr, 'jsoneditor-expandable');
	    }
	  }

	  // update field and value
	  this._updateDomField();
	  this._updateDomValue();

	  // update childs indexes
	  if (options && options.updateIndexes === true) {
	    // updateIndexes is true or undefined
	    this._updateDomIndexes();
	  }

	  if (options && options.recurse === true) {
	    // recurse is true or undefined. update childs recursively
	    if (this.childs) {
	      this.childs.forEach(function (child) {
	        child.updateDom(options);
	      });
	    }
	  }

	  // update row with append button
	  if (this.append) {
	    this.append.updateDom();
	  }
	};

	/**
	 * Locate the JSON schema of the node and check for any enum type
	 * @private
	 */
	Node.prototype._updateSchema = function () {
	  //Locating the schema of the node and checking for any enum type
	  if(this.editor && this.editor.options) {
	    // find the part of the json schema matching this nodes path
	    this.schema = Node._findSchema(this.editor.options.schema, this.getPath());
	    if (this.schema) {
	      this.enum = Node._findEnum(this.schema);
	    }
	    else {
	      delete this.enum;
	    }
	  }
	};

	/**
	 * find an enum definition in a JSON schema, as property `enum` or inside
	 * one of the schemas composites (`oneOf`, `anyOf`, `allOf`)
	 * @param  {Object} schema
	 * @return {Array | null} Returns the enum when found, null otherwise.
	 * @private
	 */
	Node._findEnum = function (schema) {
	  if (schema.enum) {
	    return schema.enum;
	  }

	  var composite = schema.oneOf || schema.anyOf || schema.allOf;
	  if (composite) {
	    var match = composite.filter(function (entry) {return entry.enum});
	    if (match.length > 0) {
	      return match[0].enum;
	    }
	  }

	  return null
	};

	/**
	 * Return the part of a JSON schema matching given path.
	 * @param {Object} schema
	 * @param {Array.<string | number>} path
	 * @return {Object | null}
	 * @private
	 */
	Node._findSchema = function (schema, path) {
	  var childSchema = schema;

	  for (var i = 0; i < path.length && childSchema; i++) {
	    var key = path[i];
	    if (typeof key === 'string' && childSchema.properties) {
	      childSchema = childSchema.properties[key] || null
	    }
	    else if (typeof key === 'number' && childSchema.items) {
	      childSchema = childSchema.items
	    }
	  }

	  return childSchema
	};

	/**
	 * Update the DOM of the childs of a node: update indexes and undefined field
	 * names.
	 * Only applicable when structure is an array or object
	 * @private
	 */
	Node.prototype._updateDomIndexes = function () {
	  var domValue = this.dom.value;
	  var childs = this.childs;
	  if (domValue && childs) {
	    if (this.type == 'array') {
	      childs.forEach(function (child, index) {
	        child.index = index;
	        var childField = child.dom.field;
	        if (childField) {
	          childField.innerHTML = index;
	        }
	      });
	    }
	    else if (this.type == 'object') {
	      childs.forEach(function (child) {
	        if (child.index != undefined) {
	          delete child.index;

	          if (child.field == undefined) {
	            child.field = '';
	          }
	        }
	      });
	    }
	  }
	};

	/**
	 * Create an editable value
	 * @private
	 */
	Node.prototype._createDomValue = function () {
	  var domValue;

	  if (this.type == 'array') {
	    domValue = document.createElement('div');
	    domValue.innerHTML = '[...]';
	  }
	  else if (this.type == 'object') {
	    domValue = document.createElement('div');
	    domValue.innerHTML = '{...}';
	  }
	  else {
	    if (!this.editable.value && util.isUrl(this.value)) {
	      // create a link in case of read-only editor and value containing an url
	      domValue = document.createElement('a');
	      domValue.href = this.value;
	      domValue.target = '_blank';
	      domValue.innerHTML = this._escapeHTML(this.value);
	    }
	    else {
	      // create an editable or read-only div
	      domValue = document.createElement('div');
	      domValue.contentEditable = this.editable.value;
	      domValue.spellcheck = false;
	      domValue.innerHTML = this._escapeHTML(this.value);
	    }
	  }

	  return domValue;
	};

	/**
	 * Create an expand/collapse button
	 * @return {Element} expand
	 * @private
	 */
	Node.prototype._createDomExpandButton = function () {
	  // create expand button
	  var expand = document.createElement('button');
	  expand.type = 'button';
	  if (this._hasChilds()) {
	    expand.className = this.expanded ? 'jsoneditor-expanded' : 'jsoneditor-collapsed';
	    expand.title =
	        'Click to expand/collapse this field (Ctrl+E). \n' +
	        'Ctrl+Click to expand/collapse including all childs.';
	  }
	  else {
	    expand.className = 'jsoneditor-invisible';
	    expand.title = '';
	  }

	  return expand;
	};


	/**
	 * Create a DOM tree element, containing the expand/collapse button
	 * @return {Element} domTree
	 * @private
	 */
	Node.prototype._createDomTree = function () {
	  var dom = this.dom;
	  var domTree = document.createElement('table');
	  var tbody = document.createElement('tbody');
	  domTree.style.borderCollapse = 'collapse'; // TODO: put in css
	  domTree.className = 'jsoneditor-values';
	  domTree.appendChild(tbody);
	  var tr = document.createElement('tr');
	  tbody.appendChild(tr);

	  // create expand button
	  var tdExpand = document.createElement('td');
	  tdExpand.className = 'jsoneditor-tree';
	  tr.appendChild(tdExpand);
	  dom.expand = this._createDomExpandButton();
	  tdExpand.appendChild(dom.expand);
	  dom.tdExpand = tdExpand;

	  // create the field
	  var tdField = document.createElement('td');
	  tdField.className = 'jsoneditor-tree';
	  tr.appendChild(tdField);
	  dom.field = this._createDomField();
	  tdField.appendChild(dom.field);
	  dom.tdField = tdField;

	  // create a separator
	  var tdSeparator = document.createElement('td');
	  tdSeparator.className = 'jsoneditor-tree';
	  tr.appendChild(tdSeparator);
	  if (this.type != 'object' && this.type != 'array') {
	    tdSeparator.appendChild(document.createTextNode(':'));
	    tdSeparator.className = 'jsoneditor-separator';
	  }
	  dom.tdSeparator = tdSeparator;

	  // create the value
	  var tdValue = document.createElement('td');
	  tdValue.className = 'jsoneditor-tree';
	  tr.appendChild(tdValue);
	  dom.value = this._createDomValue();
	  tdValue.appendChild(dom.value);
	  dom.tdValue = tdValue;

	  return domTree;
	};

	/**
	 * Handle an event. The event is caught centrally by the editor
	 * @param {Event} event
	 */
	Node.prototype.onEvent = function (event) {
	  var type = event.type,
	      target = event.target || event.srcElement,
	      dom = this.dom,
	      node = this,
	      expandable = this._hasChilds();

	  // check if mouse is on menu or on dragarea.
	  // If so, highlight current row and its childs
	  if (target == dom.drag || target == dom.menu) {
	    if (type == 'mouseover') {
	      this.editor.highlighter.highlight(this);
	    }
	    else if (type == 'mouseout') {
	      this.editor.highlighter.unhighlight();
	    }
	  }

	  // context menu events
	  if (type == 'click' && target == dom.menu) {
	    var highlighter = node.editor.highlighter;
	    highlighter.highlight(node);
	    highlighter.lock();
	    util.addClassName(dom.menu, 'jsoneditor-selected');
	    this.showContextMenu(dom.menu, function () {
	      util.removeClassName(dom.menu, 'jsoneditor-selected');
	      highlighter.unlock();
	      highlighter.unhighlight();
	    });
	  }

	  // expand events
	  if (type == 'click') {
	    if (target == dom.expand ||
	        ((node.editor.options.mode === 'view' || node.editor.options.mode === 'form') && target.nodeName === 'DIV')) {
	      if (expandable) {
	        var recurse = event.ctrlKey; // with ctrl-key, expand/collapse all
	        this._onExpand(recurse);
	      }
	    }
	  }

	  // swap the value of a boolean when the checkbox displayed left is clicked
	  if (type == 'change' && target == dom.checkbox) {
	    this.dom.value.innerHTML = !this.value;
	    this._getDomValue();
	  }

	  // update the value of the node based on the selected option
	  if (type == 'change' && target == dom.select) {
	    this.dom.value.innerHTML = dom.select.value;
	    this._getDomValue();
	    this._updateDomValue();
	  }

	  // value events
	  var domValue = dom.value;
	  if (target == domValue) {
	    //noinspection FallthroughInSwitchStatementJS
	    switch (type) {
	      case 'blur':
	      case 'change':
	        this._getDomValue(true);
	        this._updateDomValue();
	        if (this.value) {
	          domValue.innerHTML = this._escapeHTML(this.value);
	        }
	        break;

	      case 'input':
	        //this._debouncedGetDomValue(true); // TODO
	        this._getDomValue(true);
	        this._updateDomValue();
	        break;

	      case 'keydown':
	      case 'mousedown':
	          // TODO: cleanup
	        this.editor.selection = this.editor.getSelection();
	        break;

	      case 'click':
	        if (event.ctrlKey || !this.editable.value) {
	          if (util.isUrl(this.value)) {
	            window.open(this.value, '_blank');
	          }
	        }
	        break;

	      case 'keyup':
	        //this._debouncedGetDomValue(true); // TODO
	        this._getDomValue(true);
	        this._updateDomValue();
	        break;

	      case 'cut':
	      case 'paste':
	        setTimeout(function () {
	          node._getDomValue(true);
	          node._updateDomValue();
	        }, 1);
	        break;
	    }
	  }

	  // field events
	  var domField = dom.field;
	  if (target == domField) {
	    switch (type) {
	      case 'blur':
	      case 'change':
	        this._getDomField(true);
	        this._updateDomField();
	        if (this.field) {
	          domField.innerHTML = this._escapeHTML(this.field);
	        }
	        break;

	      case 'input':
	        this._getDomField(true);
	        this._updateSchema();
	        this._updateDomField();
	        this._updateDomValue();
	        break;

	      case 'keydown':
	      case 'mousedown':
	        this.editor.selection = this.editor.getSelection();
	        break;

	      case 'keyup':
	        this._getDomField(true);
	        this._updateDomField();
	        break;

	      case 'cut':
	      case 'paste':
	        setTimeout(function () {
	          node._getDomField(true);
	          node._updateDomField();
	        }, 1);
	        break;
	    }
	  }

	  // focus
	  // when clicked in whitespace left or right from the field or value, set focus
	  var domTree = dom.tree;
	  if (target == domTree.parentNode && type == 'click' && !event.hasMoved) {
	    var left = (event.offsetX != undefined) ?
	        (event.offsetX < (this.getLevel() + 1) * 24) :
	        (event.pageX < util.getAbsoluteLeft(dom.tdSeparator));// for FF
	    if (left || expandable) {
	      // node is expandable when it is an object or array
	      if (domField) {
	        util.setEndOfContentEditable(domField);
	        domField.focus();
	      }
	    }
	    else {
	      if (domValue && !this.enum) {
	        util.setEndOfContentEditable(domValue);
	        domValue.focus();
	      }
	    }
	  }
	  if (((target == dom.tdExpand && !expandable) || target == dom.tdField || target == dom.tdSeparator) &&
	      (type == 'click' && !event.hasMoved)) {
	    if (domField) {
	      util.setEndOfContentEditable(domField);
	      domField.focus();
	    }
	  }

	  if (type == 'keydown') {
	    this.onKeyDown(event);
	  }
	};

	/**
	 * Key down event handler
	 * @param {Event} event
	 */
	Node.prototype.onKeyDown = function (event) {
	  var keynum = event.which || event.keyCode;
	  var target = event.target || event.srcElement;
	  var ctrlKey = event.ctrlKey;
	  var shiftKey = event.shiftKey;
	  var altKey = event.altKey;
	  var handled = false;
	  var prevNode, nextNode, nextDom, nextDom2;
	  var editable = this.editor.options.mode === 'tree';
	  var oldSelection;
	  var oldBeforeNode;
	  var nodes;
	  var multiselection;
	  var selectedNodes = this.editor.multiselection.nodes.length > 0
	      ? this.editor.multiselection.nodes
	      : [this];
	  var firstNode = selectedNodes[0];
	  var lastNode = selectedNodes[selectedNodes.length - 1];

	  // console.log(ctrlKey, keynum, event.charCode); // TODO: cleanup
	  if (keynum == 13) { // Enter
	    if (target == this.dom.value) {
	      if (!this.editable.value || event.ctrlKey) {
	        if (util.isUrl(this.value)) {
	          window.open(this.value, '_blank');
	          handled = true;
	        }
	      }
	    }
	    else if (target == this.dom.expand) {
	      var expandable = this._hasChilds();
	      if (expandable) {
	        var recurse = event.ctrlKey; // with ctrl-key, expand/collapse all
	        this._onExpand(recurse);
	        target.focus();
	        handled = true;
	      }
	    }
	  }
	  else if (keynum == 68) {  // D
	    if (ctrlKey && editable) {   // Ctrl+D
	      Node.onDuplicate(selectedNodes);
	      handled = true;
	    }
	  }
	  else if (keynum == 69) { // E
	    if (ctrlKey) {       // Ctrl+E and Ctrl+Shift+E
	      this._onExpand(shiftKey);  // recurse = shiftKey
	      target.focus(); // TODO: should restore focus in case of recursing expand (which takes DOM offline)
	      handled = true;
	    }
	  }
	  else if (keynum == 77 && editable) { // M
	    if (ctrlKey) { // Ctrl+M
	      this.showContextMenu(target);
	      handled = true;
	    }
	  }
	  else if (keynum == 46 && editable) { // Del
	    if (ctrlKey) {       // Ctrl+Del
	      Node.onRemove(selectedNodes);
	      handled = true;
	    }
	  }
	  else if (keynum == 45 && editable) { // Ins
	    if (ctrlKey && !shiftKey) {       // Ctrl+Ins
	      this._onInsertBefore();
	      handled = true;
	    }
	    else if (ctrlKey && shiftKey) {   // Ctrl+Shift+Ins
	      this._onInsertAfter();
	      handled = true;
	    }
	  }
	  else if (keynum == 35) { // End
	    if (altKey) { // Alt+End
	      // find the last node
	      var endNode = this._lastNode();
	      if (endNode) {
	        endNode.focus(Node.focusElement || this._getElementName(target));
	      }
	      handled = true;
	    }
	  }
	  else if (keynum == 36) { // Home
	    if (altKey) { // Alt+Home
	      // find the first node
	      var homeNode = this._firstNode();
	      if (homeNode) {
	        homeNode.focus(Node.focusElement || this._getElementName(target));
	      }
	      handled = true;
	    }
	  }
	  else if (keynum == 37) {        // Arrow Left
	    if (altKey && !shiftKey) {  // Alt + Arrow Left
	      // move to left element
	      var prevElement = this._previousElement(target);
	      if (prevElement) {
	        this.focus(this._getElementName(prevElement));
	      }
	      handled = true;
	    }
	    else if (altKey && shiftKey && editable) { // Alt + Shift + Arrow left
	      if (lastNode.expanded) {
	        var appendDom = lastNode.getAppend();
	        nextDom = appendDom ? appendDom.nextSibling : undefined;
	      }
	      else {
	        var dom = lastNode.getDom();
	        nextDom = dom.nextSibling;
	      }
	      if (nextDom) {
	        nextNode = Node.getNodeFromTarget(nextDom);
	        nextDom2 = nextDom.nextSibling;
	        nextNode2 = Node.getNodeFromTarget(nextDom2);
	        if (nextNode && nextNode instanceof AppendNode &&
	            !(lastNode.parent.childs.length == 1) &&
	            nextNode2 && nextNode2.parent) {
	          oldSelection = this.editor.getSelection();
	          oldBeforeNode = lastNode._nextSibling();

	          selectedNodes.forEach(function (node) {
	            nextNode2.parent.moveBefore(node, nextNode2);
	          });
	          this.focus(Node.focusElement || this._getElementName(target));

	          this.editor._onAction('moveNodes', {
	            nodes: selectedNodes,
	            oldBeforeNode: oldBeforeNode,
	            newBeforeNode: nextNode2,
	            oldSelection: oldSelection,
	            newSelection: this.editor.getSelection()
	          });
	        }
	      }
	    }
	  }
	  else if (keynum == 38) {        // Arrow Up
	    if (altKey && !shiftKey) {  // Alt + Arrow Up
	      // find the previous node
	      prevNode = this._previousNode();
	      if (prevNode) {
	        this.editor.deselect(true);
	        prevNode.focus(Node.focusElement || this._getElementName(target));
	      }
	      handled = true;
	    }
	    else if (!altKey && ctrlKey && shiftKey && editable) { // Ctrl + Shift + Arrow Up
	      // select multiple nodes
	      prevNode = this._previousNode();
	      if (prevNode) {
	        multiselection = this.editor.multiselection;
	        multiselection.start = multiselection.start || this;
	        multiselection.end = prevNode;
	        nodes = this.editor._findTopLevelNodes(multiselection.start, multiselection.end);

	        this.editor.select(nodes);
	        prevNode.focus('field'); // select field as we know this always exists
	      }
	      handled = true;
	    }
	    else if (altKey && shiftKey && editable) { // Alt + Shift + Arrow Up
	      // find the previous node
	      prevNode = firstNode._previousNode();
	      if (prevNode && prevNode.parent) {
	        oldSelection = this.editor.getSelection();
	        oldBeforeNode = lastNode._nextSibling();

	        selectedNodes.forEach(function (node) {
	          prevNode.parent.moveBefore(node, prevNode);
	        });
	        this.focus(Node.focusElement || this._getElementName(target));

	        this.editor._onAction('moveNodes', {
	          nodes: selectedNodes,
	          oldBeforeNode: oldBeforeNode,
	          newBeforeNode: prevNode,
	          oldSelection: oldSelection,
	          newSelection: this.editor.getSelection()
	        });
	      }
	      handled = true;
	    }
	  }
	  else if (keynum == 39) {        // Arrow Right
	    if (altKey && !shiftKey) {  // Alt + Arrow Right
	      // move to right element
	      var nextElement = this._nextElement(target);
	      if (nextElement) {
	        this.focus(this._getElementName(nextElement));
	      }
	      handled = true;
	    }
	    else if (altKey && shiftKey && editable) { // Alt + Shift + Arrow Right
	      dom = firstNode.getDom();
	      var prevDom = dom.previousSibling;
	      if (prevDom) {
	        prevNode = Node.getNodeFromTarget(prevDom);
	        if (prevNode && prevNode.parent &&
	            (prevNode instanceof AppendNode)
	            && !prevNode.isVisible()) {
	          oldSelection = this.editor.getSelection();
	          oldBeforeNode = lastNode._nextSibling();

	          selectedNodes.forEach(function (node) {
	            prevNode.parent.moveBefore(node, prevNode);
	          });
	          this.focus(Node.focusElement || this._getElementName(target));

	          this.editor._onAction('moveNodes', {
	            nodes: selectedNodes,
	            oldBeforeNode: oldBeforeNode,
	            newBeforeNode: prevNode,
	            oldSelection: oldSelection,
	            newSelection: this.editor.getSelection()
	          });
	        }
	      }
	    }
	  }
	  else if (keynum == 40) {        // Arrow Down
	    if (altKey && !shiftKey) {  // Alt + Arrow Down
	      // find the next node
	      nextNode = this._nextNode();
	      if (nextNode) {
	        this.editor.deselect(true);
	        nextNode.focus(Node.focusElement || this._getElementName(target));
	      }
	      handled = true;
	    }
	    else if (!altKey && ctrlKey && shiftKey && editable) { // Ctrl + Shift + Arrow Down
	      // select multiple nodes
	      nextNode = this._nextNode();
	      if (nextNode) {
	        multiselection = this.editor.multiselection;
	        multiselection.start = multiselection.start || this;
	        multiselection.end = nextNode;
	        nodes = this.editor._findTopLevelNodes(multiselection.start, multiselection.end);

	        this.editor.select(nodes);
	        nextNode.focus('field'); // select field as we know this always exists
	      }
	      handled = true;
	    }
	    else if (altKey && shiftKey && editable) { // Alt + Shift + Arrow Down
	      // find the 2nd next node and move before that one
	      if (lastNode.expanded) {
	        nextNode = lastNode.append ? lastNode.append._nextNode() : undefined;
	      }
	      else {
	        nextNode = lastNode._nextNode();
	      }
	      var nextNode2 = nextNode && (nextNode._nextNode() || nextNode.parent.append);
	      if (nextNode2 && nextNode2.parent) {
	        oldSelection = this.editor.getSelection();
	        oldBeforeNode = lastNode._nextSibling();

	        selectedNodes.forEach(function (node) {
	          nextNode2.parent.moveBefore(node, nextNode2);
	        });
	        this.focus(Node.focusElement || this._getElementName(target));

	        this.editor._onAction('moveNodes', {
	          nodes: selectedNodes,
	          oldBeforeNode: oldBeforeNode,
	          newBeforeNode: nextNode2,
	          oldSelection: oldSelection,
	          newSelection: this.editor.getSelection()
	        });
	      }
	      handled = true;
	    }
	  }

	  if (handled) {
	    event.preventDefault();
	    event.stopPropagation();
	  }
	};

	/**
	 * Handle the expand event, when clicked on the expand button
	 * @param {boolean} recurse   If true, child nodes will be expanded too
	 * @private
	 */
	Node.prototype._onExpand = function (recurse) {
	  if (recurse) {
	    // Take the table offline
	    var table = this.dom.tr.parentNode; // TODO: not nice to access the main table like this
	    var frame = table.parentNode;
	    var scrollTop = frame.scrollTop;
	    frame.removeChild(table);
	  }

	  if (this.expanded) {
	    this.collapse(recurse);
	  }
	  else {
	    this.expand(recurse);
	  }

	  if (recurse) {
	    // Put the table online again
	    frame.appendChild(table);
	    frame.scrollTop = scrollTop;
	  }
	};

	/**
	 * Remove nodes
	 * @param {Node[] | Node} nodes
	 */
	Node.onRemove = function(nodes) {
	  if (!Array.isArray(nodes)) {
	    return Node.onRemove([nodes]);
	  }

	  if (nodes && nodes.length > 0) {
	    var firstNode = nodes[0];
	    var parent = firstNode.parent;
	    var editor = firstNode.editor;
	    var firstIndex = firstNode.getIndex();
	    editor.highlighter.unhighlight();

	    // adjust the focus
	    var oldSelection = editor.getSelection();
	    Node.blurNodes(nodes);
	    var newSelection = editor.getSelection();

	    // remove the nodes
	    nodes.forEach(function (node) {
	      node.parent._remove(node);
	    });

	    // store history action
	    editor._onAction('removeNodes', {
	      nodes: nodes.slice(0), // store a copy of the array!
	      parent: parent,
	      index: firstIndex,
	      oldSelection: oldSelection,
	      newSelection: newSelection
	    });
	  }
	};


	/**
	 * Duplicate nodes
	 * duplicated nodes will be added right after the original nodes
	 * @param {Node[] | Node} nodes
	 */
	Node.onDuplicate = function(nodes) {
	  if (!Array.isArray(nodes)) {
	    return Node.onDuplicate([nodes]);
	  }

	  if (nodes && nodes.length > 0) {
	    var lastNode = nodes[nodes.length - 1];
	    var parent = lastNode.parent;
	    var editor = lastNode.editor;

	    editor.deselect(editor.multiselection.nodes);

	    // duplicate the nodes
	    var oldSelection = editor.getSelection();
	    var afterNode = lastNode;
	    var clones = nodes.map(function (node) {
	      var clone = node.clone();
	      parent.insertAfter(clone, afterNode);
	      afterNode = clone;
	      return clone;
	    });

	    // set selection to the duplicated nodes
	    if (nodes.length === 1) {
	      clones[0].focus();
	    }
	    else {
	      editor.select(clones);
	    }
	    var newSelection = editor.getSelection();

	    editor._onAction('duplicateNodes', {
	      afterNode: lastNode,
	      nodes: clones,
	      parent: parent,
	      oldSelection: oldSelection,
	      newSelection: newSelection
	    });
	  }
	};

	/**
	 * Handle insert before event
	 * @param {String} [field]
	 * @param {*} [value]
	 * @param {String} [type]   Can be 'auto', 'array', 'object', or 'string'
	 * @private
	 */
	Node.prototype._onInsertBefore = function (field, value, type) {
	  var oldSelection = this.editor.getSelection();

	  var newNode = new Node(this.editor, {
	    field: (field != undefined) ? field : '',
	    value: (value != undefined) ? value : '',
	    type: type
	  });
	  newNode.expand(true);
	  this.parent.insertBefore(newNode, this);
	  this.editor.highlighter.unhighlight();
	  newNode.focus('field');
	  var newSelection = this.editor.getSelection();

	  this.editor._onAction('insertBeforeNodes', {
	    nodes: [newNode],
	    beforeNode: this,
	    parent: this.parent,
	    oldSelection: oldSelection,
	    newSelection: newSelection
	  });
	};

	/**
	 * Handle insert after event
	 * @param {String} [field]
	 * @param {*} [value]
	 * @param {String} [type]   Can be 'auto', 'array', 'object', or 'string'
	 * @private
	 */
	Node.prototype._onInsertAfter = function (field, value, type) {
	  var oldSelection = this.editor.getSelection();

	  var newNode = new Node(this.editor, {
	    field: (field != undefined) ? field : '',
	    value: (value != undefined) ? value : '',
	    type: type
	  });
	  newNode.expand(true);
	  this.parent.insertAfter(newNode, this);
	  this.editor.highlighter.unhighlight();
	  newNode.focus('field');
	  var newSelection = this.editor.getSelection();

	  this.editor._onAction('insertAfterNodes', {
	    nodes: [newNode],
	    afterNode: this,
	    parent: this.parent,
	    oldSelection: oldSelection,
	    newSelection: newSelection
	  });
	};

	/**
	 * Handle append event
	 * @param {String} [field]
	 * @param {*} [value]
	 * @param {String} [type]   Can be 'auto', 'array', 'object', or 'string'
	 * @private
	 */
	Node.prototype._onAppend = function (field, value, type) {
	  var oldSelection = this.editor.getSelection();

	  var newNode = new Node(this.editor, {
	    field: (field != undefined) ? field : '',
	    value: (value != undefined) ? value : '',
	    type: type
	  });
	  newNode.expand(true);
	  this.parent.appendChild(newNode);
	  this.editor.highlighter.unhighlight();
	  newNode.focus('field');
	  var newSelection = this.editor.getSelection();

	  this.editor._onAction('appendNodes', {
	    nodes: [newNode],
	    parent: this.parent,
	    oldSelection: oldSelection,
	    newSelection: newSelection
	  });
	};

	/**
	 * Change the type of the node's value
	 * @param {String} newType
	 * @private
	 */
	Node.prototype._onChangeType = function (newType) {
	  var oldType = this.type;
	  if (newType != oldType) {
	    var oldSelection = this.editor.getSelection();
	    this.changeType(newType);
	    var newSelection = this.editor.getSelection();

	    this.editor._onAction('changeType', {
	      node: this,
	      oldType: oldType,
	      newType: newType,
	      oldSelection: oldSelection,
	      newSelection: newSelection
	    });
	  }
	};

	/**
	 * Sort the child's of the node. Only applicable when the node has type 'object'
	 * or 'array'.
	 * @param {String} direction   Sorting direction. Available values: "asc", "desc"
	 * @private
	 */
	Node.prototype.sort = function (direction) {
	  if (!this._hasChilds()) {
	    return;
	  }

	  var order = (direction == 'desc') ? -1 : 1;
	  var prop = (this.type == 'array') ? 'value': 'field';
	  this.hideChilds();

	  var oldChilds = this.childs;
	  var oldSortOrder = this.sortOrder;

	  // copy the array (the old one will be kept for an undo action
	  this.childs = this.childs.concat();

	  // sort the arrays
	  this.childs.sort(function (a, b) {
	    return order * naturalSort(a[prop], b[prop]);
	  });
	  this.sortOrder = (order == 1) ? 'asc' : 'desc';

	  this.editor._onAction('sort', {
	    node: this,
	    oldChilds: oldChilds,
	    oldSort: oldSortOrder,
	    newChilds: this.childs,
	    newSort: this.sortOrder
	  });

	  this.showChilds();
	};

	/**
	 * Create a table row with an append button.
	 * @return {HTMLElement | undefined} buttonAppend or undefined when inapplicable
	 */
	Node.prototype.getAppend = function () {
	  if (!this.append) {
	    this.append = new AppendNode(this.editor);
	    this.append.setParent(this);
	  }
	  return this.append.getDom();
	};

	/**
	 * Find the node from an event target
	 * @param {Node} target
	 * @return {Node | undefined} node  or undefined when not found
	 * @static
	 */
	Node.getNodeFromTarget = function (target) {
	  while (target) {
	    if (target.node) {
	      return target.node;
	    }
	    target = target.parentNode;
	  }

	  return undefined;
	};

	/**
	 * Remove the focus of given nodes, and move the focus to the (a) node before,
	 * (b) the node after, or (c) the parent node.
	 * @param {Array.<Node> | Node} nodes
	 */
	Node.blurNodes = function (nodes) {
	  if (!Array.isArray(nodes)) {
	    Node.blurNodes([nodes]);
	    return;
	  }

	  var firstNode = nodes[0];
	  var parent = firstNode.parent;
	  var firstIndex = firstNode.getIndex();

	  if (parent.childs[firstIndex + nodes.length]) {
	    parent.childs[firstIndex + nodes.length].focus();
	  }
	  else if (parent.childs[firstIndex - 1]) {
	    parent.childs[firstIndex - 1].focus();
	  }
	  else {
	    parent.focus();
	  }
	};

	/**
	 * Get the next sibling of current node
	 * @return {Node} nextSibling
	 * @private
	 */
	Node.prototype._nextSibling = function () {
	  var index = this.parent.childs.indexOf(this);
	  return this.parent.childs[index + 1] || this.parent.append;
	};

	/**
	 * Get the previously rendered node
	 * @return {Node | null} previousNode
	 * @private
	 */
	Node.prototype._previousNode = function () {
	  var prevNode = null;
	  var dom = this.getDom();
	  if (dom && dom.parentNode) {
	    // find the previous field
	    var prevDom = dom;
	    do {
	      prevDom = prevDom.previousSibling;
	      prevNode = Node.getNodeFromTarget(prevDom);
	    }
	    while (prevDom && (prevNode instanceof AppendNode && !prevNode.isVisible()));
	  }
	  return prevNode;
	};

	/**
	 * Get the next rendered node
	 * @return {Node | null} nextNode
	 * @private
	 */
	Node.prototype._nextNode = function () {
	  var nextNode = null;
	  var dom = this.getDom();
	  if (dom && dom.parentNode) {
	    // find the previous field
	    var nextDom = dom;
	    do {
	      nextDom = nextDom.nextSibling;
	      nextNode = Node.getNodeFromTarget(nextDom);
	    }
	    while (nextDom && (nextNode instanceof AppendNode && !nextNode.isVisible()));
	  }

	  return nextNode;
	};

	/**
	 * Get the first rendered node
	 * @return {Node | null} firstNode
	 * @private
	 */
	Node.prototype._firstNode = function () {
	  var firstNode = null;
	  var dom = this.getDom();
	  if (dom && dom.parentNode) {
	    var firstDom = dom.parentNode.firstChild;
	    firstNode = Node.getNodeFromTarget(firstDom);
	  }

	  return firstNode;
	};

	/**
	 * Get the last rendered node
	 * @return {Node | null} lastNode
	 * @private
	 */
	Node.prototype._lastNode = function () {
	  var lastNode = null;
	  var dom = this.getDom();
	  if (dom && dom.parentNode) {
	    var lastDom = dom.parentNode.lastChild;
	    lastNode =  Node.getNodeFromTarget(lastDom);
	    while (lastDom && (lastNode instanceof AppendNode && !lastNode.isVisible())) {
	      lastDom = lastDom.previousSibling;
	      lastNode =  Node.getNodeFromTarget(lastDom);
	    }
	  }
	  return lastNode;
	};

	/**
	 * Get the next element which can have focus.
	 * @param {Element} elem
	 * @return {Element | null} nextElem
	 * @private
	 */
	Node.prototype._previousElement = function (elem) {
	  var dom = this.dom;
	  // noinspection FallthroughInSwitchStatementJS
	  switch (elem) {
	    case dom.value:
	      if (this.fieldEditable) {
	        return dom.field;
	      }
	    // intentional fall through
	    case dom.field:
	      if (this._hasChilds()) {
	        return dom.expand;
	      }
	    // intentional fall through
	    case dom.expand:
	      return dom.menu;
	    case dom.menu:
	      if (dom.drag) {
	        return dom.drag;
	      }
	    // intentional fall through
	    default:
	      return null;
	  }
	};

	/**
	 * Get the next element which can have focus.
	 * @param {Element} elem
	 * @return {Element | null} nextElem
	 * @private
	 */
	Node.prototype._nextElement = function (elem) {
	  var dom = this.dom;
	  // noinspection FallthroughInSwitchStatementJS
	  switch (elem) {
	    case dom.drag:
	      return dom.menu;
	    case dom.menu:
	      if (this._hasChilds()) {
	        return dom.expand;
	      }
	    // intentional fall through
	    case dom.expand:
	      if (this.fieldEditable) {
	        return dom.field;
	      }
	    // intentional fall through
	    case dom.field:
	      if (!this._hasChilds()) {
	        return dom.value;
	      }
	    default:
	      return null;
	  }
	};

	/**
	 * Get the dom name of given element. returns null if not found.
	 * For example when element == dom.field, "field" is returned.
	 * @param {Element} element
	 * @return {String | null} elementName  Available elements with name: 'drag',
	 *                                      'menu', 'expand', 'field', 'value'
	 * @private
	 */
	Node.prototype._getElementName = function (element) {
	  var dom = this.dom;
	  for (var name in dom) {
	    if (dom.hasOwnProperty(name)) {
	      if (dom[name] == element) {
	        return name;
	      }
	    }
	  }
	  return null;
	};

	/**
	 * Test if this node has childs. This is the case when the node is an object
	 * or array.
	 * @return {boolean} hasChilds
	 * @private
	 */
	Node.prototype._hasChilds = function () {
	  return this.type == 'array' || this.type == 'object';
	};

	// titles with explanation for the different types
	Node.TYPE_TITLES = {
	  'auto': 'Field type "auto". ' +
	      'The field type is automatically determined from the value ' +
	      'and can be a string, number, boolean, or null.',
	  'object': 'Field type "object". ' +
	      'An object contains an unordered set of key/value pairs.',
	  'array': 'Field type "array". ' +
	      'An array contains an ordered collection of values.',
	  'string': 'Field type "string". ' +
	      'Field type is not determined from the value, ' +
	      'but always returned as string.'
	};

	/**
	 * Show a contextmenu for this node
	 * @param {HTMLElement} anchor   Anchor element to attach the context menu to
	 *                               as sibling.
	 * @param {function} [onClose]   Callback method called when the context menu
	 *                               is being closed.
	 */
	Node.prototype.showContextMenu = function (anchor, onClose) {
	  var node = this;
	  var titles = Node.TYPE_TITLES;
	  var items = [];

	  if (this.editable.value) {
	    items.push({
	      text: 'Type',
	      title: 'Change the type of this field',
	      className: 'jsoneditor-type-' + this.type,
	      submenu: [
	        {
	          text: 'Auto',
	          className: 'jsoneditor-type-auto' +
	              (this.type == 'auto' ? ' jsoneditor-selected' : ''),
	          title: titles.auto,
	          click: function () {
	            node._onChangeType('auto');
	          }
	        },
	        {
	          text: 'Array',
	          className: 'jsoneditor-type-array' +
	              (this.type == 'array' ? ' jsoneditor-selected' : ''),
	          title: titles.array,
	          click: function () {
	            node._onChangeType('array');
	          }
	        },
	        {
	          text: 'Object',
	          className: 'jsoneditor-type-object' +
	              (this.type == 'object' ? ' jsoneditor-selected' : ''),
	          title: titles.object,
	          click: function () {
	            node._onChangeType('object');
	          }
	        },
	        {
	          text: 'String',
	          className: 'jsoneditor-type-string' +
	              (this.type == 'string' ? ' jsoneditor-selected' : ''),
	          title: titles.string,
	          click: function () {
	            node._onChangeType('string');
	          }
	        }
	      ]
	    });
	  }

	  if (this._hasChilds()) {
	    var direction = ((this.sortOrder == 'asc') ? 'desc': 'asc');
	    items.push({
	      text: 'Sort',
	      title: 'Sort the childs of this ' + this.type,
	      className: 'jsoneditor-sort-' + direction,
	      click: function () {
	        node.sort(direction);
	      },
	      submenu: [
	        {
	          text: 'Ascending',
	          className: 'jsoneditor-sort-asc',
	          title: 'Sort the childs of this ' + this.type + ' in ascending order',
	          click: function () {
	            node.sort('asc');
	          }
	        },
	        {
	          text: 'Descending',
	          className: 'jsoneditor-sort-desc',
	          title: 'Sort the childs of this ' + this.type +' in descending order',
	          click: function () {
	            node.sort('desc');
	          }
	        }
	      ]
	    });
	  }

	  if (this.parent && this.parent._hasChilds()) {
	    if (items.length) {
	      // create a separator
	      items.push({
	        'type': 'separator'
	      });
	    }

	    // create append button (for last child node only)
	    var childs = node.parent.childs;
	    if (node == childs[childs.length - 1]) {
	      items.push({
	        text: 'Append',
	        title: 'Append a new field with type \'auto\' after this field (Ctrl+Shift+Ins)',
	        submenuTitle: 'Select the type of the field to be appended',
	        className: 'jsoneditor-append',
	        click: function () {
	          node._onAppend('', '', 'auto');
	        },
	        submenu: [
	          {
	            text: 'Auto',
	            className: 'jsoneditor-type-auto',
	            title: titles.auto,
	            click: function () {
	              node._onAppend('', '', 'auto');
	            }
	          },
	          {
	            text: 'Array',
	            className: 'jsoneditor-type-array',
	            title: titles.array,
	            click: function () {
	              node._onAppend('', []);
	            }
	          },
	          {
	            text: 'Object',
	            className: 'jsoneditor-type-object',
	            title: titles.object,
	            click: function () {
	              node._onAppend('', {});
	            }
	          },
	          {
	            text: 'String',
	            className: 'jsoneditor-type-string',
	            title: titles.string,
	            click: function () {
	              node._onAppend('', '', 'string');
	            }
	          }
	        ]
	      });
	    }

	    // create insert button
	    items.push({
	      text: 'Insert',
	      title: 'Insert a new field with type \'auto\' before this field (Ctrl+Ins)',
	      submenuTitle: 'Select the type of the field to be inserted',
	      className: 'jsoneditor-insert',
	      click: function () {
	        node._onInsertBefore('', '', 'auto');
	      },
	      submenu: [
	        {
	          text: 'Auto',
	          className: 'jsoneditor-type-auto',
	          title: titles.auto,
	          click: function () {
	            node._onInsertBefore('', '', 'auto');
	          }
	        },
	        {
	          text: 'Array',
	          className: 'jsoneditor-type-array',
	          title: titles.array,
	          click: function () {
	            node._onInsertBefore('', []);
	          }
	        },
	        {
	          text: 'Object',
	          className: 'jsoneditor-type-object',
	          title: titles.object,
	          click: function () {
	            node._onInsertBefore('', {});
	          }
	        },
	        {
	          text: 'String',
	          className: 'jsoneditor-type-string',
	          title: titles.string,
	          click: function () {
	            node._onInsertBefore('', '', 'string');
	          }
	        }
	      ]
	    });

	    if (this.editable.field) {
	      // create duplicate button
	      items.push({
	        text: 'Duplicate',
	        title: 'Duplicate this field (Ctrl+D)',
	        className: 'jsoneditor-duplicate',
	        click: function () {
	          Node.onDuplicate(node);
	        }
	      });

	      // create remove button
	      items.push({
	        text: 'Remove',
	        title: 'Remove this field (Ctrl+Del)',
	        className: 'jsoneditor-remove',
	        click: function () {
	          Node.onRemove(node);
	        }
	      });
	    }
	  }

	  var menu = new ContextMenu(items, {close: onClose});
	  menu.show(anchor, this.editor.content);
	};

	/**
	 * get the type of a value
	 * @param {*} value
	 * @return {String} type   Can be 'object', 'array', 'string', 'auto'
	 * @private
	 */
	Node.prototype._getType = function(value) {
	  if (value instanceof Array) {
	    return 'array';
	  }
	  if (value instanceof Object) {
	    return 'object';
	  }
	  if (typeof(value) == 'string' && typeof(this._stringCast(value)) != 'string') {
	    return 'string';
	  }

	  return 'auto';
	};

	/**
	 * cast contents of a string to the correct type. This can be a string,
	 * a number, a boolean, etc
	 * @param {String} str
	 * @return {*} castedStr
	 * @private
	 */
	Node.prototype._stringCast = function(str) {
	  var lower = str.toLowerCase(),
	      num = Number(str),          // will nicely fail with '123ab'
	      numFloat = parseFloat(str); // will nicely fail with '  '

	  if (str == '') {
	    return '';
	  }
	  else if (lower == 'null') {
	    return null;
	  }
	  else if (lower == 'true') {
	    return true;
	  }
	  else if (lower == 'false') {
	    return false;
	  }
	  else if (!isNaN(num) && !isNaN(numFloat)) {
	    return num;
	  }
	  else {
	    return str;
	  }
	};

	/**
	 * escape a text, such that it can be displayed safely in an HTML element
	 * @param {String} text
	 * @return {String} escapedText
	 * @private
	 */
	Node.prototype._escapeHTML = function (text) {
	  if (typeof text !== 'string') {
	    return String(text);
	  }
	  else {
	    var htmlEscaped = String(text)
	        .replace(/&/g, '&amp;')    // must be replaced first!
	        .replace(/</g, '&lt;')
	        .replace(/>/g, '&gt;')
	        .replace(/  /g, ' &nbsp;') // replace double space with an nbsp and space
	        .replace(/^ /, '&nbsp;')   // space at start
	        .replace(/ $/, '&nbsp;');  // space at end

	    var json = JSON.stringify(htmlEscaped);
	    var html = json.substring(1, json.length - 1);
	    if (this.editor.options.escapeUnicode === true) {
	      html = util.escapeUnicodeChars(html);
	    }
	    return html;
	  }
	};

	/**
	 * unescape a string.
	 * @param {String} escapedText
	 * @return {String} text
	 * @private
	 */
	Node.prototype._unescapeHTML = function (escapedText) {
	  var json = '"' + this._escapeJSON(escapedText) + '"';
	  var htmlEscaped = util.parse(json);

	  return htmlEscaped
	      .replace(/&lt;/g, '<')
	      .replace(/&gt;/g, '>')
	      .replace(/&nbsp;|\u00A0/g, ' ')
	      .replace(/&amp;/g, '&');   // must be replaced last
	};

	/**
	 * escape a text to make it a valid JSON string. The method will:
	 *   - replace unescaped double quotes with '\"'
	 *   - replace unescaped backslash with '\\'
	 *   - replace returns with '\n'
	 * @param {String} text
	 * @return {String} escapedText
	 * @private
	 */
	Node.prototype._escapeJSON = function (text) {
	  // TODO: replace with some smart regex (only when a new solution is faster!)
	  var escaped = '';
	  var i = 0;
	  while (i < text.length) {
	    var c = text.charAt(i);
	    if (c == '\n') {
	      escaped += '\\n';
	    }
	    else if (c == '\\') {
	      escaped += c;
	      i++;

	      c = text.charAt(i);
	      if (c === '' || '"\\/bfnrtu'.indexOf(c) == -1) {
	        escaped += '\\';  // no valid escape character
	      }
	      escaped += c;
	    }
	    else if (c == '"') {
	      escaped += '\\"';
	    }
	    else {
	      escaped += c;
	    }
	    i++;
	  }

	  return escaped;
	};

	// TODO: find a nicer solution to resolve this circular dependency between Node and AppendNode
	var AppendNode = appendNodeFactory(Node);

	module.exports = Node;


/***/ },
/* 9 */
/***/ function(module, exports) {

	/*
	 * Natural Sort algorithm for Javascript - Version 0.7 - Released under MIT license
	 * Author: Jim Palmer (based on chunking idea from Dave Koelle)
	 */
	/*jshint unused:false */
	module.exports = function naturalSort (a, b) {
		"use strict";
		var re = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
			sre = /(^[ ]*|[ ]*$)/g,
			dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
			hre = /^0x[0-9a-f]+$/i,
			ore = /^0/,
			i = function(s) { return naturalSort.insensitive && ('' + s).toLowerCase() || '' + s; },
			// convert all to strings strip whitespace
			x = i(a).replace(sre, '') || '',
			y = i(b).replace(sre, '') || '',
			// chunk/tokenize
			xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
			yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
			// numeric, hex or date detection
			xD = parseInt(x.match(hre), 16) || (xN.length !== 1 && x.match(dre) && Date.parse(x)),
			yD = parseInt(y.match(hre), 16) || xD && y.match(dre) && Date.parse(y) || null,
			oFxNcL, oFyNcL;
		// first try and sort Hex codes or Dates
		if (yD) {
			if ( xD < yD ) { return -1; }
			else if ( xD > yD ) { return 1; }
		}
		// natural sorting through split numeric strings and default strings
		for(var cLoc=0, numS=Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
			// find floats not starting with '0', string or 0 if not defined (Clint Priest)
			oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
			oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
			// handle numeric vs string comparison - number < string - (Kyle Adams)
			if (isNaN(oFxNcL) !== isNaN(oFyNcL)) { return (isNaN(oFxNcL)) ? 1 : -1; }
			// rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
			else if (typeof oFxNcL !== typeof oFyNcL) {
				oFxNcL += '';
				oFyNcL += '';
			}
			if (oFxNcL < oFyNcL) { return -1; }
			if (oFxNcL > oFyNcL) { return 1; }
		}
		return 0;
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(4);
	var ContextMenu = __webpack_require__(7);

	/**
	 * A factory function to create an AppendNode, which depends on a Node
	 * @param {Node} Node
	 */
	function appendNodeFactory(Node) {
	  /**
	   * @constructor AppendNode
	   * @extends Node
	   * @param {TreeEditor} editor
	   * Create a new AppendNode. This is a special node which is created at the
	   * end of the list with childs for an object or array
	   */
	  function AppendNode (editor) {
	    /** @type {TreeEditor} */
	    this.editor = editor;
	    this.dom = {};
	  }

	  AppendNode.prototype = new Node();

	  /**
	   * Return a table row with an append button.
	   * @return {Element} dom   TR element
	   */
	  AppendNode.prototype.getDom = function () {
	    // TODO: implement a new solution for the append node
	    var dom = this.dom;

	    if (dom.tr) {
	      return dom.tr;
	    }

	    this._updateEditability();

	    // a row for the append button
	    var trAppend = document.createElement('tr');
	    trAppend.node = this;
	    dom.tr = trAppend;

	    // TODO: consistent naming

	    if (this.editor.options.mode === 'tree') {
	      // a cell for the dragarea column
	      dom.tdDrag = document.createElement('td');

	      // create context menu
	      var tdMenu = document.createElement('td');
	      dom.tdMenu = tdMenu;
	      var menu = document.createElement('button');
	      menu.type = 'button';
	      menu.className = 'jsoneditor-contextmenu';
	      menu.title = 'Click to open the actions menu (Ctrl+M)';
	      dom.menu = menu;
	      tdMenu.appendChild(dom.menu);
	    }

	    // a cell for the contents (showing text 'empty')
	    var tdAppend = document.createElement('td');
	    var domText = document.createElement('div');
	    domText.innerHTML = '(empty)';
	    domText.className = 'jsoneditor-readonly';
	    tdAppend.appendChild(domText);
	    dom.td = tdAppend;
	    dom.text = domText;

	    this.updateDom();

	    return trAppend;
	  };

	  /**
	   * Update the HTML dom of the Node
	   */
	  AppendNode.prototype.updateDom = function () {
	    var dom = this.dom;
	    var tdAppend = dom.td;
	    if (tdAppend) {
	      tdAppend.style.paddingLeft = (this.getLevel() * 24 + 26) + 'px';
	      // TODO: not so nice hard coded offset
	    }

	    var domText = dom.text;
	    if (domText) {
	      domText.innerHTML = '(empty ' + this.parent.type + ')';
	    }

	    // attach or detach the contents of the append node:
	    // hide when the parent has childs, show when the parent has no childs
	    var trAppend = dom.tr;
	    if (!this.isVisible()) {
	      if (dom.tr.firstChild) {
	        if (dom.tdDrag) {
	          trAppend.removeChild(dom.tdDrag);
	        }
	        if (dom.tdMenu) {
	          trAppend.removeChild(dom.tdMenu);
	        }
	        trAppend.removeChild(tdAppend);
	      }
	    }
	    else {
	      if (!dom.tr.firstChild) {
	        if (dom.tdDrag) {
	          trAppend.appendChild(dom.tdDrag);
	        }
	        if (dom.tdMenu) {
	          trAppend.appendChild(dom.tdMenu);
	        }
	        trAppend.appendChild(tdAppend);
	      }
	    }
	  };

	  /**
	   * Check whether the AppendNode is currently visible.
	   * the AppendNode is visible when its parent has no childs (i.e. is empty).
	   * @return {boolean} isVisible
	   */
	  AppendNode.prototype.isVisible = function () {
	    return (this.parent.childs.length == 0);
	  };

	  /**
	   * Show a contextmenu for this node
	   * @param {HTMLElement} anchor   The element to attach the menu to.
	   * @param {function} [onClose]   Callback method called when the context menu
	   *                               is being closed.
	   */
	  AppendNode.prototype.showContextMenu = function (anchor, onClose) {
	    var node = this;
	    var titles = Node.TYPE_TITLES;
	    var items = [
	      // create append button
	      {
	        'text': 'Append',
	        'title': 'Append a new field with type \'auto\' (Ctrl+Shift+Ins)',
	        'submenuTitle': 'Select the type of the field to be appended',
	        'className': 'jsoneditor-insert',
	        'click': function () {
	          node._onAppend('', '', 'auto');
	        },
	        'submenu': [
	          {
	            'text': 'Auto',
	            'className': 'jsoneditor-type-auto',
	            'title': titles.auto,
	            'click': function () {
	              node._onAppend('', '', 'auto');
	            }
	          },
	          {
	            'text': 'Array',
	            'className': 'jsoneditor-type-array',
	            'title': titles.array,
	            'click': function () {
	              node._onAppend('', []);
	            }
	          },
	          {
	            'text': 'Object',
	            'className': 'jsoneditor-type-object',
	            'title': titles.object,
	            'click': function () {
	              node._onAppend('', {});
	            }
	          },
	          {
	            'text': 'String',
	            'className': 'jsoneditor-type-string',
	            'title': titles.string,
	            'click': function () {
	              node._onAppend('', '', 'string');
	            }
	          }
	        ]
	      }
	    ];

	    var menu = new ContextMenu(items, {close: onClose});
	    menu.show(anchor, this.editor.content);
	  };

	  /**
	   * Handle an event. The event is catched centrally by the editor
	   * @param {Event} event
	   */
	  AppendNode.prototype.onEvent = function (event) {
	    var type = event.type;
	    var target = event.target || event.srcElement;
	    var dom = this.dom;

	    // highlight the append nodes parent
	    var menu = dom.menu;
	    if (target == menu) {
	      if (type == 'mouseover') {
	        this.editor.highlighter.highlight(this.parent);
	      }
	      else if (type == 'mouseout') {
	        this.editor.highlighter.unhighlight();
	      }
	    }

	    // context menu events
	    if (type == 'click' && target == dom.menu) {
	      var highlighter = this.editor.highlighter;
	      highlighter.highlight(this.parent);
	      highlighter.lock();
	      util.addClassName(dom.menu, 'jsoneditor-selected');
	      this.showContextMenu(dom.menu, function () {
	        util.removeClassName(dom.menu, 'jsoneditor-selected');
	        highlighter.unlock();
	        highlighter.unhighlight();
	      });
	    }

	    if (type == 'keydown') {
	      this.onKeyDown(event);
	    }
	  };

	  return AppendNode;
	}

	module.exports = appendNodeFactory;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ContextMenu = __webpack_require__(7);

	/**
	 * Create a select box to be used in the editor menu's, which allows to switch mode
	 * @param {HTMLElement} container
	 * @param {String[]} modes  Available modes: 'code', 'form', 'text', 'tree', 'view'
	 * @param {String} current  Available modes: 'code', 'form', 'text', 'tree', 'view'
	 * @param {function(mode: string)} onSwitch  Callback invoked on switch
	 * @constructor
	 */
	function ModeSwitcher(container, modes, current, onSwitch) {
	  // available modes
	  var availableModes = {
	    code: {
	      'text': 'Code',
	      'title': 'Switch to code highlighter',
	      'click': function () {
	        onSwitch('code')
	      }
	    },
	    form: {
	      'text': 'Form',
	      'title': 'Switch to form editor',
	      'click': function () {
	        onSwitch('form');
	      }
	    },
	    text: {
	      'text': 'Text',
	      'title': 'Switch to plain text editor',
	      'click': function () {
	        onSwitch('text');
	      }
	    },
	    tree: {
	      'text': 'Tree',
	      'title': 'Switch to tree editor',
	      'click': function () {
	        onSwitch('tree');
	      }
	    },
	    view: {
	      'text': 'View',
	      'title': 'Switch to tree view',
	      'click': function () {
	        onSwitch('view');
	      }
	    }
	  };

	  // list the selected modes
	  var items = [];
	  for (var i = 0; i < modes.length; i++) {
	    var mode = modes[i];
	    var item = availableModes[mode];
	    if (!item) {
	      throw new Error('Unknown mode "' + mode + '"');
	    }

	    item.className = 'jsoneditor-type-modes' + ((current == mode) ? ' jsoneditor-selected' : '');
	    items.push(item);
	  }

	  // retrieve the title of current mode
	  var currentMode = availableModes[current];
	  if (!currentMode) {
	    throw new Error('Unknown mode "' + current + '"');
	  }
	  var currentTitle = currentMode.text;

	  // create the html element
	  var box = document.createElement('button');
	  box.type = 'button';
	  box.className = 'jsoneditor-modes jsoneditor-separator';
	  box.innerHTML = currentTitle + ' &#x25BE;';
	  box.title = 'Switch editor mode';
	  box.onclick = function () {
	    var menu = new ContextMenu(items);
	    menu.show(box);
	  };

	  var frame = document.createElement('div');
	  frame.className = 'jsoneditor-modes';
	  frame.style.position = 'relative';
	  frame.appendChild(box);

	  container.appendChild(frame);

	  this.dom = {
	    container: container,
	    box: box,
	    frame: frame
	  };
	}

	/**
	 * Set focus to switcher
	 */
	ModeSwitcher.prototype.focus = function () {
	  this.dom.box.focus();
	};

	/**
	 * Destroy the ModeSwitcher, remove from DOM
	 */
	ModeSwitcher.prototype.destroy = function () {
	  if (this.dom && this.dom.frame && this.dom.frame.parentNode) {
	    this.dom.frame.parentNode.removeChild(this.dom.frame);
	  }
	  this.dom = null;
	};

	module.exports = ModeSwitcher;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ace;
	try {
	  ace = __webpack_require__(13);
	}
	catch (err) {
	  // failed to load ace, no problem, we will fall back to plain text
	}

	var ModeSwitcher = __webpack_require__(11);
	var util = __webpack_require__(4);

	// create a mixin with the functions for text mode
	var textmode = {};

	var MAX_ERRORS = 3; // maximum number of displayed errors at the bottom

	var DEFAULT_THEME = 'ace/theme/jsoneditor';

	/**
	 * Create a text editor
	 * @param {Element} container
	 * @param {Object} [options]   Object with options. available options:
	 *                             {String} mode             Available values:
	 *                                                       "text" (default)
	 *                                                       or "code".
	 *                             {Number} indentation      Number of indentation
	 *                                                       spaces. 2 by default.
	 *                             {function} onChange       Callback method
	 *                                                       triggered on change
	 *                             {function} onModeChange   Callback method
	 *                                                       triggered after setMode
	 *                             {Object} ace              A custom instance of
	 *                                                       Ace editor.
	 *                             {boolean} escapeUnicode   If true, unicode
	 *                                                       characters are escaped.
	 *                                                       false by default.
	 * @private
	 */
	textmode.create = function (container, options) {
	  // read options
	  options = options || {};
	  this.options = options;

	  // indentation
	  if (options.indentation) {
	    this.indentation = Number(options.indentation);
	  }
	  else {
	    this.indentation = 2; // number of spaces
	  }

	  // grab ace from options if provided
	  var _ace = options.ace ? options.ace : ace;

	  // determine mode
	  this.mode = (options.mode == 'code') ? 'code' : 'text';
	  if (this.mode == 'code') {
	    // verify whether Ace editor is available and supported
	    if (typeof _ace === 'undefined') {
	      this.mode = 'text';
	      console.warn('Failed to load Ace editor, falling back to plain text mode. Please use a JSONEditor bundle including Ace, or pass Ace as via the configuration option `ace`.');
	    }
	  }

	  // determine theme
	  this.theme = options.theme || DEFAULT_THEME;
	  if (this.theme === DEFAULT_THEME && window.ace) {
	    __webpack_require__(17);
	  }

	  var me = this;
	  this.container = container;
	  this.dom = {};
	  this.aceEditor = undefined;  // ace code editor
	  this.textarea = undefined;  // plain text editor (fallback when Ace is not available)
	  this.validateSchema = null;

	  // create a debounced validate function
	  this._debouncedValidate = util.debounce(this.validate.bind(this), this.DEBOUNCE_INTERVAL);

	  this.width = container.clientWidth;
	  this.height = container.clientHeight;

	  this.frame = document.createElement('div');
	  this.frame.className = 'jsoneditor jsoneditor-mode-' + this.options.mode;
	  this.frame.onclick = function (event) {
	    // prevent default submit action when the editor is located inside a form
	    event.preventDefault();
	  };
	  this.frame.onkeydown = function (event) {
	    me._onKeyDown(event);
	  };

	  // create menu
	  this.menu = document.createElement('div');
	  this.menu.className = 'jsoneditor-menu';
	  this.frame.appendChild(this.menu);

	  // create format button
	  var buttonFormat = document.createElement('button');
	  buttonFormat.type = 'button';
	  buttonFormat.className = 'jsoneditor-format';
	  buttonFormat.title = 'Format JSON data, with proper indentation and line feeds (Ctrl+\\)';
	  this.menu.appendChild(buttonFormat);
	  buttonFormat.onclick = function () {
	    try {
	      me.format();
	      me._onChange();
	    }
	    catch (err) {
	      me._onError(err);
	    }
	  };

	  // create compact button
	  var buttonCompact = document.createElement('button');
	  buttonCompact.type = 'button';
	  buttonCompact.className = 'jsoneditor-compact';
	  buttonCompact.title = 'Compact JSON data, remove all whitespaces (Ctrl+Shift+\\)';
	  this.menu.appendChild(buttonCompact);
	  buttonCompact.onclick = function () {
	    try {
	      me.compact();
	      me._onChange();
	    }
	    catch (err) {
	      me._onError(err);
	    }
	  };

	  // create mode box
	  if (this.options && this.options.modes && this.options.modes.length) {
	    this.modeSwitcher = new ModeSwitcher(this.menu, this.options.modes, this.options.mode, function onSwitch(mode) {
	      // switch mode and restore focus
	      me.setMode(mode);
	      me.modeSwitcher.focus();
	    });
	  }

	  this.content = document.createElement('div');
	  this.content.className = 'jsoneditor-outer';
	  this.frame.appendChild(this.content);

	  this.container.appendChild(this.frame);

	  if (this.mode == 'code') {
	    this.editorDom = document.createElement('div');
	    this.editorDom.style.height = '100%'; // TODO: move to css
	    this.editorDom.style.width = '100%'; // TODO: move to css
	    this.content.appendChild(this.editorDom);

	    var aceEditor = _ace.edit(this.editorDom);
	    aceEditor.$blockScrolling = Infinity;
	    aceEditor.setTheme(this.theme);
	    aceEditor.setShowPrintMargin(false);
	    aceEditor.setFontSize(13);
	    aceEditor.getSession().setMode('ace/mode/json');
	    aceEditor.getSession().setTabSize(this.indentation);
	    aceEditor.getSession().setUseSoftTabs(true);
	    aceEditor.getSession().setUseWrapMode(true);
	    aceEditor.commands.bindKey('Ctrl-L', null);    // disable Ctrl+L (is used by the browser to select the address bar)
	    aceEditor.commands.bindKey('Command-L', null); // disable Ctrl+L (is used by the browser to select the address bar)
	    this.aceEditor = aceEditor;

	    // TODO: deprecated since v5.0.0. Cleanup backward compatibility some day
	    if (!this.hasOwnProperty('editor')) {
	      Object.defineProperty(this, 'editor', {
	        get: function () {
	          console.warn('Property "editor" has been renamed to "aceEditor".');
	          return me.aceEditor;
	        },
	        set: function (aceEditor) {
	          console.warn('Property "editor" has been renamed to "aceEditor".');
	          me.aceEditor = aceEditor;
	        }
	      });
	    }

	    var poweredBy = document.createElement('a');
	    poweredBy.appendChild(document.createTextNode('powered by ace'));
	    poweredBy.href = 'http://ace.ajax.org';
	    poweredBy.target = '_blank';
	    poweredBy.className = 'jsoneditor-poweredBy';
	    poweredBy.onclick = function () {
	      // TODO: this anchor falls below the margin of the content,
	      // therefore the normal a.href does not work. We use a click event
	      // for now, but this should be fixed.
	      window.open(poweredBy.href, poweredBy.target);
	    };
	    this.menu.appendChild(poweredBy);

	    // register onchange event
	    aceEditor.on('change', this._onChange.bind(this));
	  }
	  else {
	    // load a plain text textarea
	    var textarea = document.createElement('textarea');
	    textarea.className = 'jsoneditor-text';
	    textarea.spellcheck = false;
	    this.content.appendChild(textarea);
	    this.textarea = textarea;

	    // register onchange event
	    if (this.textarea.oninput === null) {
	      this.textarea.oninput = this._onChange.bind(this);
	    }
	    else {
	      // oninput is undefined. For IE8-
	      this.textarea.onchange = this._onChange.bind(this);
	    }
	  }

	  this.setSchema(this.options.schema);
	};

	/**
	 * Handle a change:
	 * - Validate JSON schema
	 * - Send a callback to the onChange listener if provided
	 * @private
	 */
	textmode._onChange = function () {
	  // validate JSON schema (if configured)
	  this._debouncedValidate();

	  // trigger the onChange callback
	  if (this.options.onChange) {
	    try {
	      this.options.onChange();
	    }
	    catch (err) {
	      console.error('Error in onChange callback: ', err);
	    }
	  }
	};

	/**
	 * Event handler for keydown. Handles shortcut keys
	 * @param {Event} event
	 * @private
	 */
	textmode._onKeyDown = function (event) {
	  var keynum = event.which || event.keyCode;
	  var handled = false;

	  if (keynum == 220 && event.ctrlKey) {
	    if (event.shiftKey) { // Ctrl+Shift+\
	      this.compact();
	      this._onChange();
	    }
	    else { // Ctrl+\
	      this.format();
	      this._onChange();
	    }
	    handled = true;
	  }

	  if (handled) {
	    event.preventDefault();
	    event.stopPropagation();
	  }
	};

	/**
	 * Destroy the editor. Clean up DOM, event listeners, and web workers.
	 */
	textmode.destroy = function () {
	  // remove old ace editor
	  if (this.aceEditor) {
	    this.aceEditor.destroy();
	    this.aceEditor = null;
	  }

	  if (this.frame && this.container && this.frame.parentNode == this.container) {
	    this.container.removeChild(this.frame);
	  }

	  if (this.modeSwitcher) {
	    this.modeSwitcher.destroy();
	    this.modeSwitcher = null;
	  }

	  this.textarea = null;
	  
	  this._debouncedValidate = null;
	};

	/**
	 * Compact the code in the formatter
	 */
	textmode.compact = function () {
	  var json = this.get();
	  var text = JSON.stringify(json);
	  this.setText(text);
	};

	/**
	 * Format the code in the formatter
	 */
	textmode.format = function () {
	  var json = this.get();
	  var text = JSON.stringify(json, null, this.indentation);
	  this.setText(text);
	};

	/**
	 * Set focus to the formatter
	 */
	textmode.focus = function () {
	  if (this.textarea) {
	    this.textarea.focus();
	  }
	  if (this.aceEditor) {
	    this.aceEditor.focus();
	  }
	};

	/**
	 * Resize the formatter
	 */
	textmode.resize = function () {
	  if (this.aceEditor) {
	    var force = false;
	    this.aceEditor.resize(force);
	  }
	};

	/**
	 * Set json data in the formatter
	 * @param {Object} json
	 */
	textmode.set = function(json) {
	  this.setText(JSON.stringify(json, null, this.indentation));
	};

	/**
	 * Get json data from the formatter
	 * @return {Object} json
	 */
	textmode.get = function() {
	  var text = this.getText();
	  var json;

	  try {
	    json = util.parse(text); // this can throw an error
	  }
	  catch (err) {
	    // try to sanitize json, replace JavaScript notation with JSON notation
	    text = util.sanitize(text);

	    // try to parse again
	    json = util.parse(text); // this can throw an error
	  }

	  return json;
	};

	/**
	 * Get the text contents of the editor
	 * @return {String} jsonText
	 */
	textmode.getText = function() {
	  if (this.textarea) {
	    return this.textarea.value;
	  }
	  if (this.aceEditor) {
	    return this.aceEditor.getValue();
	  }
	  return '';
	};

	/**
	 * Set the text contents of the editor
	 * @param {String} jsonText
	 */
	textmode.setText = function(jsonText) {
	  var text;

	  if (this.options.escapeUnicode === true) {
	    text = util.escapeUnicodeChars(jsonText);
	  }
	  else {
	    text = jsonText;
	  }

	  if (this.textarea) {
	    this.textarea.value = text;
	  }
	  if (this.aceEditor) {
	    // prevent emitting onChange events while setting new text
	    var originalOnChange = this.options.onChange;
	    this.options.onChange = null;

	    this.aceEditor.setValue(text, -1);

	    this.options.onChange = originalOnChange;
	  }

	  // validate JSON schema
	  this.validate();
	};

	/**
	 * Validate current JSON object against the configured JSON schema
	 * Throws an exception when no JSON schema is configured
	 */
	textmode.validate = function () {
	  // clear all current errors
	  if (this.dom.validationErrors) {
	    this.dom.validationErrors.parentNode.removeChild(this.dom.validationErrors);
	    this.dom.validationErrors = null;

	    this.content.style.marginBottom = '';
	    this.content.style.paddingBottom = '';
	  }

	  var doValidate = false;
	  var errors = [];
	  var json;
	  try {
	    json = this.get(); // this can fail when there is no valid json
	    doValidate = true;
	  }
	  catch (err) {
	    // no valid JSON, don't validate
	  }

	  // only validate the JSON when parsing the JSON succeeded
	  if (doValidate && this.validateSchema) {
	    var valid = this.validateSchema(json);
	    if (!valid) {
	      errors = this.validateSchema.errors.map(function (error) {
	        return util.improveSchemaError(error);
	      });
	    }
	  }

	  if (errors.length > 0) {
	    // limit the number of displayed errors
	    var limit = errors.length > MAX_ERRORS;
	    if (limit) {
	      errors = errors.slice(0, MAX_ERRORS);
	      var hidden = this.validateSchema.errors.length - MAX_ERRORS;
	      errors.push('(' + hidden + ' more errors...)')
	    }

	    var validationErrors = document.createElement('div');
	    validationErrors.innerHTML = '<table class="jsoneditor-text-errors">' +
	        '<tbody>' +
	        errors.map(function (error) {
	          var message;
	          if (typeof error === 'string') {
	            message = '<td colspan="2"><pre>' + error + '</pre></td>';
	          }
	          else {
	            message = '<td>' + error.dataPath + '</td>' +
	                '<td>' + error.message + '</td>';
	          }

	          return '<tr><td><button class="jsoneditor-schema-error"></button></td>' + message + '</tr>'
	        }).join('') +
	        '</tbody>' +
	        '</table>';

	    this.dom.validationErrors = validationErrors;
	    this.frame.appendChild(validationErrors);

	    var height = validationErrors.clientHeight;
	    this.content.style.marginBottom = (-height) + 'px';
	    this.content.style.paddingBottom = height + 'px';
	  }

	  // update the height of the ace editor
	  if (this.aceEditor) {
	    var force = false;
	    this.aceEditor.resize(force);
	  }
	};

	// define modes
	module.exports = [
	  {
	    mode: 'text',
	    mixin: textmode,
	    data: 'text',
	    load: textmode.format
	  },
	  {
	    mode: 'code',
	    mixin: textmode,
	    data: 'text',
	    load: textmode.format
	  }
	];


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// load brace
	var ace = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"brace\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	// load required ace modules
	__webpack_require__(14);
	__webpack_require__(16);

	module.exports = ace;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	ace.define("ace/mode/json_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(acequire, exports, module) {
	"use strict";

	var oop = acequire("../lib/oop");
	var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;

	var JsonHighlightRules = function() {
	    this.$rules = {
	        "start" : [
	            {
	                token : "variable", // single line
	                regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]\\s*(?=:)'
	            }, {
	                token : "string", // single line
	                regex : '"',
	                next  : "string"
	            }, {
	                token : "constant.numeric", // hex
	                regex : "0[xX][0-9a-fA-F]+\\b"
	            }, {
	                token : "constant.numeric", // float
	                regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
	            }, {
	                token : "constant.language.boolean",
	                regex : "(?:true|false)\\b"
	            }, {
	                token : "invalid.illegal", // single quoted strings are not allowed
	                regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
	            }, {
	                token : "invalid.illegal", // comments are not allowed
	                regex : "\\/\\/.*$"
	            }, {
	                token : "paren.lparen",
	                regex : "[[({]"
	            }, {
	                token : "paren.rparen",
	                regex : "[\\])}]"
	            }, {
	                token : "text",
	                regex : "\\s+"
	            }
	        ],
	        "string" : [
	            {
	                token : "constant.language.escape",
	                regex : /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/bfnrt])/
	            }, {
	                token : "string",
	                regex : '[^"\\\\]+'
	            }, {
	                token : "string",
	                regex : '"',
	                next  : "start"
	            }, {
	                token : "string",
	                regex : "",
	                next  : "start"
	            }
	        ]
	    };
	    
	};

	oop.inherits(JsonHighlightRules, TextHighlightRules);

	exports.JsonHighlightRules = JsonHighlightRules;
	});

	ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"], function(acequire, exports, module) {
	"use strict";

	var Range = acequire("../range").Range;

	var MatchingBraceOutdent = function() {};

	(function() {

	    this.checkOutdent = function(line, input) {
	        if (! /^\s+$/.test(line))
	            return false;

	        return /^\s*\}/.test(input);
	    };

	    this.autoOutdent = function(doc, row) {
	        var line = doc.getLine(row);
	        var match = line.match(/^(\s*\})/);

	        if (!match) return 0;

	        var column = match[1].length;
	        var openBracePos = doc.findMatchingBracket({row: row, column: column});

	        if (!openBracePos || openBracePos.row == row) return 0;

	        var indent = this.$getIndent(doc.getLine(openBracePos.row));
	        doc.replace(new Range(row, 0, row, column-1), indent);
	    };

	    this.$getIndent = function(line) {
	        return line.match(/^\s*/)[0];
	    };

	}).call(MatchingBraceOutdent.prototype);

	exports.MatchingBraceOutdent = MatchingBraceOutdent;
	});

	ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"], function(acequire, exports, module) {
	"use strict";

	var oop = acequire("../../lib/oop");
	var Behaviour = acequire("../behaviour").Behaviour;
	var TokenIterator = acequire("../../token_iterator").TokenIterator;
	var lang = acequire("../../lib/lang");

	var SAFE_INSERT_IN_TOKENS =
	    ["text", "paren.rparen", "punctuation.operator"];
	var SAFE_INSERT_BEFORE_TOKENS =
	    ["text", "paren.rparen", "punctuation.operator", "comment"];

	var context;
	var contextCache = {};
	var initContext = function(editor) {
	    var id = -1;
	    if (editor.multiSelect) {
	        id = editor.selection.index;
	        if (contextCache.rangeCount != editor.multiSelect.rangeCount)
	            contextCache = {rangeCount: editor.multiSelect.rangeCount};
	    }
	    if (contextCache[id])
	        return context = contextCache[id];
	    context = contextCache[id] = {
	        autoInsertedBrackets: 0,
	        autoInsertedRow: -1,
	        autoInsertedLineEnd: "",
	        maybeInsertedBrackets: 0,
	        maybeInsertedRow: -1,
	        maybeInsertedLineStart: "",
	        maybeInsertedLineEnd: ""
	    };
	};

	var getWrapped = function(selection, selected, opening, closing) {
	    var rowDiff = selection.end.row - selection.start.row;
	    return {
	        text: opening + selected + closing,
	        selection: [
	                0,
	                selection.start.column + 1,
	                rowDiff,
	                selection.end.column + (rowDiff ? 0 : 1)
	            ]
	    };
	};

	var CstyleBehaviour = function() {
	    this.add("braces", "insertion", function(state, action, editor, session, text) {
	        var cursor = editor.getCursorPosition();
	        var line = session.doc.getLine(cursor.row);
	        if (text == '{') {
	            initContext(editor);
	            var selection = editor.getSelectionRange();
	            var selected = session.doc.getTextRange(selection);
	            if (selected !== "" && selected !== "{" && editor.getWrapBehavioursEnabled()) {
	                return getWrapped(selection, selected, '{', '}');
	            } else if (CstyleBehaviour.isSaneInsertion(editor, session)) {
	                if (/[\]\}\)]/.test(line[cursor.column]) || editor.inMultiSelectMode) {
	                    CstyleBehaviour.recordAutoInsert(editor, session, "}");
	                    return {
	                        text: '{}',
	                        selection: [1, 1]
	                    };
	                } else {
	                    CstyleBehaviour.recordMaybeInsert(editor, session, "{");
	                    return {
	                        text: '{',
	                        selection: [1, 1]
	                    };
	                }
	            }
	        } else if (text == '}') {
	            initContext(editor);
	            var rightChar = line.substring(cursor.column, cursor.column + 1);
	            if (rightChar == '}') {
	                var matching = session.$findOpeningBracket('}', {column: cursor.column + 1, row: cursor.row});
	                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) {
	                    CstyleBehaviour.popAutoInsertedClosing();
	                    return {
	                        text: '',
	                        selection: [1, 1]
	                    };
	                }
	            }
	        } else if (text == "\n" || text == "\r\n") {
	            initContext(editor);
	            var closing = "";
	            if (CstyleBehaviour.isMaybeInsertedClosing(cursor, line)) {
	                closing = lang.stringRepeat("}", context.maybeInsertedBrackets);
	                CstyleBehaviour.clearMaybeInsertedClosing();
	            }
	            var rightChar = line.substring(cursor.column, cursor.column + 1);
	            if (rightChar === '}') {
	                var openBracePos = session.findMatchingBracket({row: cursor.row, column: cursor.column+1}, '}');
	                if (!openBracePos)
	                     return null;
	                var next_indent = this.$getIndent(session.getLine(openBracePos.row));
	            } else if (closing) {
	                var next_indent = this.$getIndent(line);
	            } else {
	                CstyleBehaviour.clearMaybeInsertedClosing();
	                return;
	            }
	            var indent = next_indent + session.getTabString();

	            return {
	                text: '\n' + indent + '\n' + next_indent + closing,
	                selection: [1, indent.length, 1, indent.length]
	            };
	        } else {
	            CstyleBehaviour.clearMaybeInsertedClosing();
	        }
	    });

	    this.add("braces", "deletion", function(state, action, editor, session, range) {
	        var selected = session.doc.getTextRange(range);
	        if (!range.isMultiLine() && selected == '{') {
	            initContext(editor);
	            var line = session.doc.getLine(range.start.row);
	            var rightChar = line.substring(range.end.column, range.end.column + 1);
	            if (rightChar == '}') {
	                range.end.column++;
	                return range;
	            } else {
	                context.maybeInsertedBrackets--;
	            }
	        }
	    });

	    this.add("parens", "insertion", function(state, action, editor, session, text) {
	        if (text == '(') {
	            initContext(editor);
	            var selection = editor.getSelectionRange();
	            var selected = session.doc.getTextRange(selection);
	            if (selected !== "" && editor.getWrapBehavioursEnabled()) {
	                return getWrapped(selection, selected, '(', ')');
	            } else if (CstyleBehaviour.isSaneInsertion(editor, session)) {
	                CstyleBehaviour.recordAutoInsert(editor, session, ")");
	                return {
	                    text: '()',
	                    selection: [1, 1]
	                };
	            }
	        } else if (text == ')') {
	            initContext(editor);
	            var cursor = editor.getCursorPosition();
	            var line = session.doc.getLine(cursor.row);
	            var rightChar = line.substring(cursor.column, cursor.column + 1);
	            if (rightChar == ')') {
	                var matching = session.$findOpeningBracket(')', {column: cursor.column + 1, row: cursor.row});
	                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) {
	                    CstyleBehaviour.popAutoInsertedClosing();
	                    return {
	                        text: '',
	                        selection: [1, 1]
	                    };
	                }
	            }
	        }
	    });

	    this.add("parens", "deletion", function(state, action, editor, session, range) {
	        var selected = session.doc.getTextRange(range);
	        if (!range.isMultiLine() && selected == '(') {
	            initContext(editor);
	            var line = session.doc.getLine(range.start.row);
	            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
	            if (rightChar == ')') {
	                range.end.column++;
	                return range;
	            }
	        }
	    });

	    this.add("brackets", "insertion", function(state, action, editor, session, text) {
	        if (text == '[') {
	            initContext(editor);
	            var selection = editor.getSelectionRange();
	            var selected = session.doc.getTextRange(selection);
	            if (selected !== "" && editor.getWrapBehavioursEnabled()) {
	                return getWrapped(selection, selected, '[', ']');
	            } else if (CstyleBehaviour.isSaneInsertion(editor, session)) {
	                CstyleBehaviour.recordAutoInsert(editor, session, "]");
	                return {
	                    text: '[]',
	                    selection: [1, 1]
	                };
	            }
	        } else if (text == ']') {
	            initContext(editor);
	            var cursor = editor.getCursorPosition();
	            var line = session.doc.getLine(cursor.row);
	            var rightChar = line.substring(cursor.column, cursor.column + 1);
	            if (rightChar == ']') {
	                var matching = session.$findOpeningBracket(']', {column: cursor.column + 1, row: cursor.row});
	                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) {
	                    CstyleBehaviour.popAutoInsertedClosing();
	                    return {
	                        text: '',
	                        selection: [1, 1]
	                    };
	                }
	            }
	        }
	    });

	    this.add("brackets", "deletion", function(state, action, editor, session, range) {
	        var selected = session.doc.getTextRange(range);
	        if (!range.isMultiLine() && selected == '[') {
	            initContext(editor);
	            var line = session.doc.getLine(range.start.row);
	            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
	            if (rightChar == ']') {
	                range.end.column++;
	                return range;
	            }
	        }
	    });

	    this.add("string_dquotes", "insertion", function(state, action, editor, session, text) {
	        if (text == '"' || text == "'") {
	            initContext(editor);
	            var quote = text;
	            var selection = editor.getSelectionRange();
	            var selected = session.doc.getTextRange(selection);
	            if (selected !== "" && selected !== "'" && selected != '"' && editor.getWrapBehavioursEnabled()) {
	                return getWrapped(selection, selected, quote, quote);
	            } else if (!selected) {
	                var cursor = editor.getCursorPosition();
	                var line = session.doc.getLine(cursor.row);
	                var leftChar = line.substring(cursor.column-1, cursor.column);
	                var rightChar = line.substring(cursor.column, cursor.column + 1);
	                
	                var token = session.getTokenAt(cursor.row, cursor.column);
	                var rightToken = session.getTokenAt(cursor.row, cursor.column + 1);
	                if (leftChar == "\\" && token && /escape/.test(token.type))
	                    return null;
	                
	                var stringBefore = token && /string|escape/.test(token.type);
	                var stringAfter = !rightToken || /string|escape/.test(rightToken.type);
	                
	                var pair;
	                if (rightChar == quote) {
	                    pair = stringBefore !== stringAfter;
	                } else {
	                    if (stringBefore && !stringAfter)
	                        return null; // wrap string with different quote
	                    if (stringBefore && stringAfter)
	                        return null; // do not pair quotes inside strings
	                    var wordRe = session.$mode.tokenRe;
	                    wordRe.lastIndex = 0;
	                    var isWordBefore = wordRe.test(leftChar);
	                    wordRe.lastIndex = 0;
	                    var isWordAfter = wordRe.test(leftChar);
	                    if (isWordBefore || isWordAfter)
	                        return null; // before or after alphanumeric
	                    if (rightChar && !/[\s;,.})\]\\]/.test(rightChar))
	                        return null; // there is rightChar and it isn't closing
	                    pair = true;
	                }
	                return {
	                    text: pair ? quote + quote : "",
	                    selection: [1,1]
	                };
	            }
	        }
	    });

	    this.add("string_dquotes", "deletion", function(state, action, editor, session, range) {
	        var selected = session.doc.getTextRange(range);
	        if (!range.isMultiLine() && (selected == '"' || selected == "'")) {
	            initContext(editor);
	            var line = session.doc.getLine(range.start.row);
	            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
	            if (rightChar == selected) {
	                range.end.column++;
	                return range;
	            }
	        }
	    });

	};

	    
	CstyleBehaviour.isSaneInsertion = function(editor, session) {
	    var cursor = editor.getCursorPosition();
	    var iterator = new TokenIterator(session, cursor.row, cursor.column);
	    if (!this.$matchTokenType(iterator.getCurrentToken() || "text", SAFE_INSERT_IN_TOKENS)) {
	        var iterator2 = new TokenIterator(session, cursor.row, cursor.column + 1);
	        if (!this.$matchTokenType(iterator2.getCurrentToken() || "text", SAFE_INSERT_IN_TOKENS))
	            return false;
	    }
	    iterator.stepForward();
	    return iterator.getCurrentTokenRow() !== cursor.row ||
	        this.$matchTokenType(iterator.getCurrentToken() || "text", SAFE_INSERT_BEFORE_TOKENS);
	};

	CstyleBehaviour.$matchTokenType = function(token, types) {
	    return types.indexOf(token.type || token) > -1;
	};

	CstyleBehaviour.recordAutoInsert = function(editor, session, bracket) {
	    var cursor = editor.getCursorPosition();
	    var line = session.doc.getLine(cursor.row);
	    if (!this.isAutoInsertedClosing(cursor, line, context.autoInsertedLineEnd[0]))
	        context.autoInsertedBrackets = 0;
	    context.autoInsertedRow = cursor.row;
	    context.autoInsertedLineEnd = bracket + line.substr(cursor.column);
	    context.autoInsertedBrackets++;
	};

	CstyleBehaviour.recordMaybeInsert = function(editor, session, bracket) {
	    var cursor = editor.getCursorPosition();
	    var line = session.doc.getLine(cursor.row);
	    if (!this.isMaybeInsertedClosing(cursor, line))
	        context.maybeInsertedBrackets = 0;
	    context.maybeInsertedRow = cursor.row;
	    context.maybeInsertedLineStart = line.substr(0, cursor.column) + bracket;
	    context.maybeInsertedLineEnd = line.substr(cursor.column);
	    context.maybeInsertedBrackets++;
	};

	CstyleBehaviour.isAutoInsertedClosing = function(cursor, line, bracket) {
	    return context.autoInsertedBrackets > 0 &&
	        cursor.row === context.autoInsertedRow &&
	        bracket === context.autoInsertedLineEnd[0] &&
	        line.substr(cursor.column) === context.autoInsertedLineEnd;
	};

	CstyleBehaviour.isMaybeInsertedClosing = function(cursor, line) {
	    return context.maybeInsertedBrackets > 0 &&
	        cursor.row === context.maybeInsertedRow &&
	        line.substr(cursor.column) === context.maybeInsertedLineEnd &&
	        line.substr(0, cursor.column) == context.maybeInsertedLineStart;
	};

	CstyleBehaviour.popAutoInsertedClosing = function() {
	    context.autoInsertedLineEnd = context.autoInsertedLineEnd.substr(1);
	    context.autoInsertedBrackets--;
	};

	CstyleBehaviour.clearMaybeInsertedClosing = function() {
	    if (context) {
	        context.maybeInsertedBrackets = 0;
	        context.maybeInsertedRow = -1;
	    }
	};



	oop.inherits(CstyleBehaviour, Behaviour);

	exports.CstyleBehaviour = CstyleBehaviour;
	});

	ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"], function(acequire, exports, module) {
	"use strict";

	var oop = acequire("../../lib/oop");
	var Range = acequire("../../range").Range;
	var BaseFoldMode = acequire("./fold_mode").FoldMode;

	var FoldMode = exports.FoldMode = function(commentRegex) {
	    if (commentRegex) {
	        this.foldingStartMarker = new RegExp(
	            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
	        );
	        this.foldingStopMarker = new RegExp(
	            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
	        );
	    }
	};
	oop.inherits(FoldMode, BaseFoldMode);

	(function() {
	    
	    this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
	    this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
	    this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
	    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
	    this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
	    this._getFoldWidgetBase = this.getFoldWidget;
	    this.getFoldWidget = function(session, foldStyle, row) {
	        var line = session.getLine(row);
	    
	        if (this.singleLineBlockCommentRe.test(line)) {
	            if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
	                return "";
	        }
	    
	        var fw = this._getFoldWidgetBase(session, foldStyle, row);
	    
	        if (!fw && this.startRegionRe.test(line))
	            return "start"; // lineCommentRegionStart
	    
	        return fw;
	    };

	    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
	        var line = session.getLine(row);
	        
	        if (this.startRegionRe.test(line))
	            return this.getCommentRegionBlock(session, line, row);
	        
	        var match = line.match(this.foldingStartMarker);
	        if (match) {
	            var i = match.index;

	            if (match[1])
	                return this.openingBracketBlock(session, match[1], row, i);
	                
	            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
	            
	            if (range && !range.isMultiLine()) {
	                if (forceMultiline) {
	                    range = this.getSectionRange(session, row);
	                } else if (foldStyle != "all")
	                    range = null;
	            }
	            
	            return range;
	        }

	        if (foldStyle === "markbegin")
	            return;

	        var match = line.match(this.foldingStopMarker);
	        if (match) {
	            var i = match.index + match[0].length;

	            if (match[1])
	                return this.closingBracketBlock(session, match[1], row, i);

	            return session.getCommentFoldRange(row, i, -1);
	        }
	    };
	    
	    this.getSectionRange = function(session, row) {
	        var line = session.getLine(row);
	        var startIndent = line.search(/\S/);
	        var startRow = row;
	        var startColumn = line.length;
	        row = row + 1;
	        var endRow = row;
	        var maxRow = session.getLength();
	        while (++row < maxRow) {
	            line = session.getLine(row);
	            var indent = line.search(/\S/);
	            if (indent === -1)
	                continue;
	            if  (startIndent > indent)
	                break;
	            var subRange = this.getFoldWidgetRange(session, "all", row);
	            
	            if (subRange) {
	                if (subRange.start.row <= startRow) {
	                    break;
	                } else if (subRange.isMultiLine()) {
	                    row = subRange.end.row;
	                } else if (startIndent == indent) {
	                    break;
	                }
	            }
	            endRow = row;
	        }
	        
	        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
	    };
	    this.getCommentRegionBlock = function(session, line, row) {
	        var startColumn = line.search(/\s*$/);
	        var maxRow = session.getLength();
	        var startRow = row;
	        
	        var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
	        var depth = 1;
	        while (++row < maxRow) {
	            line = session.getLine(row);
	            var m = re.exec(line);
	            if (!m) continue;
	            if (m[1]) depth--;
	            else depth++;

	            if (!depth) break;
	        }

	        var endRow = row;
	        if (endRow > startRow) {
	            return new Range(startRow, startColumn, endRow, line.length);
	        }
	    };

	}).call(FoldMode.prototype);

	});

	ace.define("ace/mode/json",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/json_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle","ace/worker/worker_client"], function(acequire, exports, module) {
	"use strict";

	var oop = acequire("../lib/oop");
	var TextMode = acequire("./text").Mode;
	var HighlightRules = acequire("./json_highlight_rules").JsonHighlightRules;
	var MatchingBraceOutdent = acequire("./matching_brace_outdent").MatchingBraceOutdent;
	var CstyleBehaviour = acequire("./behaviour/cstyle").CstyleBehaviour;
	var CStyleFoldMode = acequire("./folding/cstyle").FoldMode;
	var WorkerClient = acequire("../worker/worker_client").WorkerClient;

	var Mode = function() {
	    this.HighlightRules = HighlightRules;
	    this.$outdent = new MatchingBraceOutdent();
	    this.$behaviour = new CstyleBehaviour();
	    this.foldingRules = new CStyleFoldMode();
	};
	oop.inherits(Mode, TextMode);

	(function() {

	    this.getNextLineIndent = function(state, line, tab) {
	        var indent = this.$getIndent(line);

	        if (state == "start") {
	            var match = line.match(/^.*[\{\(\[]\s*$/);
	            if (match) {
	                indent += tab;
	            }
	        }

	        return indent;
	    };

	    this.checkOutdent = function(state, line, input) {
	        return this.$outdent.checkOutdent(line, input);
	    };

	    this.autoOutdent = function(state, doc, row) {
	        this.$outdent.autoOutdent(doc, row);
	    };

	    this.createWorker = function(session) {
	        var worker = new WorkerClient(["ace"], __webpack_require__(15), "JsonWorker");
	        worker.attachToDocument(session.getDocument());

	        worker.on("annotate", function(e) {
	            session.setAnnotations(e.data);
	        });

	        worker.on("terminate", function() {
	            session.clearAnnotations();
	        });

	        return worker;
	    };


	    this.$id = "ace/mode/json";
	}).call(Mode.prototype);

	exports.Mode = Mode;
	});


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports.id = 'ace/mode/json_worker';
	module.exports.src = "\"no use strict\";(function(window){function resolveModuleId(id,paths){for(var testPath=id,tail=\"\";testPath;){var alias=paths[testPath];if(\"string\"==typeof alias)return alias+tail;if(alias)return alias.location.replace(/\\/*$/,\"/\")+(tail||alias.main||alias.name);if(alias===!1)return\"\";var i=testPath.lastIndexOf(\"/\");if(-1===i)break;tail=testPath.substr(i)+tail,testPath=testPath.slice(0,i)}return id}if(!(void 0!==window.window&&window.document||window.acequire&&window.define)){window.console||(window.console=function(){var msgs=Array.prototype.slice.call(arguments,0);postMessage({type:\"log\",data:msgs})},window.console.error=window.console.warn=window.console.log=window.console.trace=window.console),window.window=window,window.ace=window,window.onerror=function(message,file,line,col,err){postMessage({type:\"error\",data:{message:message,data:err.data,file:file,line:line,col:col,stack:err.stack}})},window.normalizeModule=function(parentId,moduleName){if(-1!==moduleName.indexOf(\"!\")){var chunks=moduleName.split(\"!\");return window.normalizeModule(parentId,chunks[0])+\"!\"+window.normalizeModule(parentId,chunks[1])}if(\".\"==moduleName.charAt(0)){var base=parentId.split(\"/\").slice(0,-1).join(\"/\");for(moduleName=(base?base+\"/\":\"\")+moduleName;-1!==moduleName.indexOf(\".\")&&previous!=moduleName;){var previous=moduleName;moduleName=moduleName.replace(/^\\.\\//,\"\").replace(/\\/\\.\\//,\"/\").replace(/[^\\/]+\\/\\.\\.\\//,\"\")}}return moduleName},window.acequire=function acequire(parentId,id){if(id||(id=parentId,parentId=null),!id.charAt)throw Error(\"worker.js acequire() accepts only (parentId, id) as arguments\");id=window.normalizeModule(parentId,id);var module=window.acequire.modules[id];if(module)return module.initialized||(module.initialized=!0,module.exports=module.factory().exports),module.exports;if(!window.acequire.tlns)return console.log(\"unable to load \"+id);var path=resolveModuleId(id,window.acequire.tlns);return\".js\"!=path.slice(-3)&&(path+=\".js\"),window.acequire.id=id,window.acequire.modules[id]={},importScripts(path),window.acequire(parentId,id)},window.acequire.modules={},window.acequire.tlns={},window.define=function(id,deps,factory){if(2==arguments.length?(factory=deps,\"string\"!=typeof id&&(deps=id,id=window.acequire.id)):1==arguments.length&&(factory=id,deps=[],id=window.acequire.id),\"function\"!=typeof factory)return window.acequire.modules[id]={exports:factory,initialized:!0},void 0;deps.length||(deps=[\"require\",\"exports\",\"module\"]);var req=function(childId){return window.acequire(id,childId)};window.acequire.modules[id]={exports:{},factory:function(){var module=this,returnExports=factory.apply(this,deps.map(function(dep){switch(dep){case\"require\":return req;case\"exports\":return module.exports;case\"module\":return module;default:return req(dep)}}));return returnExports&&(module.exports=returnExports),module}}},window.define.amd={},acequire.tlns={},window.initBaseUrls=function(topLevelNamespaces){for(var i in topLevelNamespaces)acequire.tlns[i]=topLevelNamespaces[i]},window.initSender=function(){var EventEmitter=window.acequire(\"ace/lib/event_emitter\").EventEmitter,oop=window.acequire(\"ace/lib/oop\"),Sender=function(){};return function(){oop.implement(this,EventEmitter),this.callback=function(data,callbackId){postMessage({type:\"call\",id:callbackId,data:data})},this.emit=function(name,data){postMessage({type:\"event\",name:name,data:data})}}.call(Sender.prototype),new Sender};var main=window.main=null,sender=window.sender=null;window.onmessage=function(e){var msg=e.data;if(msg.event&&sender)sender._signal(msg.event,msg.data);else if(msg.command)if(main[msg.command])main[msg.command].apply(main,msg.args);else{if(!window[msg.command])throw Error(\"Unknown command:\"+msg.command);window[msg.command].apply(window,msg.args)}else if(msg.init){window.initBaseUrls(msg.tlns),acequire(\"ace/lib/es5-shim\"),sender=window.sender=window.initSender();var clazz=acequire(msg.module)[msg.classname];main=window.main=new clazz(sender)}}}})(this),ace.define(\"ace/lib/oop\",[\"require\",\"exports\",\"module\"],function(acequire,exports){\"use strict\";exports.inherits=function(ctor,superCtor){ctor.super_=superCtor,ctor.prototype=Object.create(superCtor.prototype,{constructor:{value:ctor,enumerable:!1,writable:!0,configurable:!0}})},exports.mixin=function(obj,mixin){for(var key in mixin)obj[key]=mixin[key];return obj},exports.implement=function(proto,mixin){exports.mixin(proto,mixin)}}),ace.define(\"ace/range\",[\"require\",\"exports\",\"module\"],function(acequire,exports){\"use strict\";var comparePoints=function(p1,p2){return p1.row-p2.row||p1.column-p2.column},Range=function(startRow,startColumn,endRow,endColumn){this.start={row:startRow,column:startColumn},this.end={row:endRow,column:endColumn}};(function(){this.isEqual=function(range){return this.start.row===range.start.row&&this.end.row===range.end.row&&this.start.column===range.start.column&&this.end.column===range.end.column},this.toString=function(){return\"Range: [\"+this.start.row+\"/\"+this.start.column+\"] -> [\"+this.end.row+\"/\"+this.end.column+\"]\"},this.contains=function(row,column){return 0==this.compare(row,column)},this.compareRange=function(range){var cmp,end=range.end,start=range.start;return cmp=this.compare(end.row,end.column),1==cmp?(cmp=this.compare(start.row,start.column),1==cmp?2:0==cmp?1:0):-1==cmp?-2:(cmp=this.compare(start.row,start.column),-1==cmp?-1:1==cmp?42:0)},this.comparePoint=function(p){return this.compare(p.row,p.column)},this.containsRange=function(range){return 0==this.comparePoint(range.start)&&0==this.comparePoint(range.end)},this.intersects=function(range){var cmp=this.compareRange(range);return-1==cmp||0==cmp||1==cmp},this.isEnd=function(row,column){return this.end.row==row&&this.end.column==column},this.isStart=function(row,column){return this.start.row==row&&this.start.column==column},this.setStart=function(row,column){\"object\"==typeof row?(this.start.column=row.column,this.start.row=row.row):(this.start.row=row,this.start.column=column)},this.setEnd=function(row,column){\"object\"==typeof row?(this.end.column=row.column,this.end.row=row.row):(this.end.row=row,this.end.column=column)},this.inside=function(row,column){return 0==this.compare(row,column)?this.isEnd(row,column)||this.isStart(row,column)?!1:!0:!1},this.insideStart=function(row,column){return 0==this.compare(row,column)?this.isEnd(row,column)?!1:!0:!1},this.insideEnd=function(row,column){return 0==this.compare(row,column)?this.isStart(row,column)?!1:!0:!1},this.compare=function(row,column){return this.isMultiLine()||row!==this.start.row?this.start.row>row?-1:row>this.end.row?1:this.start.row===row?column>=this.start.column?0:-1:this.end.row===row?this.end.column>=column?0:1:0:this.start.column>column?-1:column>this.end.column?1:0},this.compareStart=function(row,column){return this.start.row==row&&this.start.column==column?-1:this.compare(row,column)},this.compareEnd=function(row,column){return this.end.row==row&&this.end.column==column?1:this.compare(row,column)},this.compareInside=function(row,column){return this.end.row==row&&this.end.column==column?1:this.start.row==row&&this.start.column==column?-1:this.compare(row,column)},this.clipRows=function(firstRow,lastRow){if(this.end.row>lastRow)var end={row:lastRow+1,column:0};else if(firstRow>this.end.row)var end={row:firstRow,column:0};if(this.start.row>lastRow)var start={row:lastRow+1,column:0};else if(firstRow>this.start.row)var start={row:firstRow,column:0};return Range.fromPoints(start||this.start,end||this.end)},this.extend=function(row,column){var cmp=this.compare(row,column);if(0==cmp)return this;if(-1==cmp)var start={row:row,column:column};else var end={row:row,column:column};return Range.fromPoints(start||this.start,end||this.end)},this.isEmpty=function(){return this.start.row===this.end.row&&this.start.column===this.end.column},this.isMultiLine=function(){return this.start.row!==this.end.row},this.clone=function(){return Range.fromPoints(this.start,this.end)},this.collapseRows=function(){return 0==this.end.column?new Range(this.start.row,0,Math.max(this.start.row,this.end.row-1),0):new Range(this.start.row,0,this.end.row,0)},this.toScreenRange=function(session){var screenPosStart=session.documentToScreenPosition(this.start),screenPosEnd=session.documentToScreenPosition(this.end);return new Range(screenPosStart.row,screenPosStart.column,screenPosEnd.row,screenPosEnd.column)},this.moveBy=function(row,column){this.start.row+=row,this.start.column+=column,this.end.row+=row,this.end.column+=column}}).call(Range.prototype),Range.fromPoints=function(start,end){return new Range(start.row,start.column,end.row,end.column)},Range.comparePoints=comparePoints,Range.comparePoints=function(p1,p2){return p1.row-p2.row||p1.column-p2.column},exports.Range=Range}),ace.define(\"ace/apply_delta\",[\"require\",\"exports\",\"module\"],function(acequire,exports){\"use strict\";exports.applyDelta=function(docLines,delta){var row=delta.start.row,startColumn=delta.start.column,line=docLines[row]||\"\";switch(delta.action){case\"insert\":var lines=delta.lines;if(1===lines.length)docLines[row]=line.substring(0,startColumn)+delta.lines[0]+line.substring(startColumn);else{var args=[row,1].concat(delta.lines);docLines.splice.apply(docLines,args),docLines[row]=line.substring(0,startColumn)+docLines[row],docLines[row+delta.lines.length-1]+=line.substring(startColumn)}break;case\"remove\":var endColumn=delta.end.column,endRow=delta.end.row;row===endRow?docLines[row]=line.substring(0,startColumn)+line.substring(endColumn):docLines.splice(row,endRow-row+1,line.substring(0,startColumn)+docLines[endRow].substring(endColumn))}}}),ace.define(\"ace/lib/event_emitter\",[\"require\",\"exports\",\"module\"],function(acequire,exports){\"use strict\";var EventEmitter={},stopPropagation=function(){this.propagationStopped=!0},preventDefault=function(){this.defaultPrevented=!0};EventEmitter._emit=EventEmitter._dispatchEvent=function(eventName,e){this._eventRegistry||(this._eventRegistry={}),this._defaultHandlers||(this._defaultHandlers={});var listeners=this._eventRegistry[eventName]||[],defaultHandler=this._defaultHandlers[eventName];if(listeners.length||defaultHandler){\"object\"==typeof e&&e||(e={}),e.type||(e.type=eventName),e.stopPropagation||(e.stopPropagation=stopPropagation),e.preventDefault||(e.preventDefault=preventDefault),listeners=listeners.slice();for(var i=0;listeners.length>i&&(listeners[i](e,this),!e.propagationStopped);i++);return defaultHandler&&!e.defaultPrevented?defaultHandler(e,this):void 0}},EventEmitter._signal=function(eventName,e){var listeners=(this._eventRegistry||{})[eventName];if(listeners){listeners=listeners.slice();for(var i=0;listeners.length>i;i++)listeners[i](e,this)}},EventEmitter.once=function(eventName,callback){var _self=this;callback&&this.addEventListener(eventName,function newCallback(){_self.removeEventListener(eventName,newCallback),callback.apply(null,arguments)})},EventEmitter.setDefaultHandler=function(eventName,callback){var handlers=this._defaultHandlers;if(handlers||(handlers=this._defaultHandlers={_disabled_:{}}),handlers[eventName]){var old=handlers[eventName],disabled=handlers._disabled_[eventName];disabled||(handlers._disabled_[eventName]=disabled=[]),disabled.push(old);var i=disabled.indexOf(callback);-1!=i&&disabled.splice(i,1)}handlers[eventName]=callback},EventEmitter.removeDefaultHandler=function(eventName,callback){var handlers=this._defaultHandlers;if(handlers){var disabled=handlers._disabled_[eventName];if(handlers[eventName]==callback)handlers[eventName],disabled&&this.setDefaultHandler(eventName,disabled.pop());else if(disabled){var i=disabled.indexOf(callback);-1!=i&&disabled.splice(i,1)}}},EventEmitter.on=EventEmitter.addEventListener=function(eventName,callback,capturing){this._eventRegistry=this._eventRegistry||{};var listeners=this._eventRegistry[eventName];return listeners||(listeners=this._eventRegistry[eventName]=[]),-1==listeners.indexOf(callback)&&listeners[capturing?\"unshift\":\"push\"](callback),callback},EventEmitter.off=EventEmitter.removeListener=EventEmitter.removeEventListener=function(eventName,callback){this._eventRegistry=this._eventRegistry||{};var listeners=this._eventRegistry[eventName];if(listeners){var index=listeners.indexOf(callback);-1!==index&&listeners.splice(index,1)}},EventEmitter.removeAllListeners=function(eventName){this._eventRegistry&&(this._eventRegistry[eventName]=[])},exports.EventEmitter=EventEmitter}),ace.define(\"ace/anchor\",[\"require\",\"exports\",\"module\",\"ace/lib/oop\",\"ace/lib/event_emitter\"],function(acequire,exports){\"use strict\";var oop=acequire(\"./lib/oop\"),EventEmitter=acequire(\"./lib/event_emitter\").EventEmitter,Anchor=exports.Anchor=function(doc,row,column){this.$onChange=this.onChange.bind(this),this.attach(doc),column===void 0?this.setPosition(row.row,row.column):this.setPosition(row,column)};(function(){function $pointsInOrder(point1,point2,equalPointsInOrder){var bColIsAfter=equalPointsInOrder?point1.column<=point2.column:point1.column<point2.column;return point1.row<point2.row||point1.row==point2.row&&bColIsAfter}function $getTransformedPoint(delta,point,moveIfEqual){var deltaIsInsert=\"insert\"==delta.action,deltaRowShift=(deltaIsInsert?1:-1)*(delta.end.row-delta.start.row),deltaColShift=(deltaIsInsert?1:-1)*(delta.end.column-delta.start.column),deltaStart=delta.start,deltaEnd=deltaIsInsert?deltaStart:delta.end;return $pointsInOrder(point,deltaStart,moveIfEqual)?{row:point.row,column:point.column}:$pointsInOrder(deltaEnd,point,!moveIfEqual)?{row:point.row+deltaRowShift,column:point.column+(point.row==deltaEnd.row?deltaColShift:0)}:{row:deltaStart.row,column:deltaStart.column}}oop.implement(this,EventEmitter),this.getPosition=function(){return this.$clipPositionToDocument(this.row,this.column)},this.getDocument=function(){return this.document},this.$insertRight=!1,this.onChange=function(delta){if(!(delta.start.row==delta.end.row&&delta.start.row!=this.row||delta.start.row>this.row)){var point=$getTransformedPoint(delta,{row:this.row,column:this.column},this.$insertRight);this.setPosition(point.row,point.column,!0)}},this.setPosition=function(row,column,noClip){var pos;if(pos=noClip?{row:row,column:column}:this.$clipPositionToDocument(row,column),this.row!=pos.row||this.column!=pos.column){var old={row:this.row,column:this.column};this.row=pos.row,this.column=pos.column,this._signal(\"change\",{old:old,value:pos})}},this.detach=function(){this.document.removeEventListener(\"change\",this.$onChange)},this.attach=function(doc){this.document=doc||this.document,this.document.on(\"change\",this.$onChange)},this.$clipPositionToDocument=function(row,column){var pos={};return row>=this.document.getLength()?(pos.row=Math.max(0,this.document.getLength()-1),pos.column=this.document.getLine(pos.row).length):0>row?(pos.row=0,pos.column=0):(pos.row=row,pos.column=Math.min(this.document.getLine(pos.row).length,Math.max(0,column))),0>column&&(pos.column=0),pos}}).call(Anchor.prototype)}),ace.define(\"ace/document\",[\"require\",\"exports\",\"module\",\"ace/lib/oop\",\"ace/apply_delta\",\"ace/lib/event_emitter\",\"ace/range\",\"ace/anchor\"],function(acequire,exports){\"use strict\";var oop=acequire(\"./lib/oop\"),applyDelta=acequire(\"./apply_delta\").applyDelta,EventEmitter=acequire(\"./lib/event_emitter\").EventEmitter,Range=acequire(\"./range\").Range,Anchor=acequire(\"./anchor\").Anchor,Document=function(textOrLines){this.$lines=[\"\"],0===textOrLines.length?this.$lines=[\"\"]:Array.isArray(textOrLines)?this.insertMergedLines({row:0,column:0},textOrLines):this.insert({row:0,column:0},textOrLines)};(function(){oop.implement(this,EventEmitter),this.setValue=function(text){var len=this.getLength()-1;this.remove(new Range(0,0,len,this.getLine(len).length)),this.insert({row:0,column:0},text)},this.getValue=function(){return this.getAllLines().join(this.getNewLineCharacter())},this.createAnchor=function(row,column){return new Anchor(this,row,column)},this.$split=0===\"aaa\".split(/a/).length?function(text){return text.replace(/\\r\\n|\\r/g,\"\\n\").split(\"\\n\")}:function(text){return text.split(/\\r\\n|\\r|\\n/)},this.$detectNewLine=function(text){var match=text.match(/^.*?(\\r\\n|\\r|\\n)/m);this.$autoNewLine=match?match[1]:\"\\n\",this._signal(\"changeNewLineMode\")},this.getNewLineCharacter=function(){switch(this.$newLineMode){case\"windows\":return\"\\r\\n\";case\"unix\":return\"\\n\";default:return this.$autoNewLine||\"\\n\"}},this.$autoNewLine=\"\",this.$newLineMode=\"auto\",this.setNewLineMode=function(newLineMode){this.$newLineMode!==newLineMode&&(this.$newLineMode=newLineMode,this._signal(\"changeNewLineMode\"))},this.getNewLineMode=function(){return this.$newLineMode},this.isNewLine=function(text){return\"\\r\\n\"==text||\"\\r\"==text||\"\\n\"==text},this.getLine=function(row){return this.$lines[row]||\"\"},this.getLines=function(firstRow,lastRow){return this.$lines.slice(firstRow,lastRow+1)},this.getAllLines=function(){return this.getLines(0,this.getLength())},this.getLength=function(){return this.$lines.length},this.getTextRange=function(range){return this.getLinesForRange(range).join(this.getNewLineCharacter())},this.getLinesForRange=function(range){var lines;if(range.start.row===range.end.row)lines=[this.getLine(range.start.row).substring(range.start.column,range.end.column)];else{lines=this.getLines(range.start.row,range.end.row),lines[0]=(lines[0]||\"\").substring(range.start.column);var l=lines.length-1;range.end.row-range.start.row==l&&(lines[l]=lines[l].substring(0,range.end.column))}return lines},this.insertLines=function(row,lines){return console.warn(\"Use of document.insertLines is deprecated. Use the insertFullLines method instead.\"),this.insertFullLines(row,lines)},this.removeLines=function(firstRow,lastRow){return console.warn(\"Use of document.removeLines is deprecated. Use the removeFullLines method instead.\"),this.removeFullLines(firstRow,lastRow)},this.insertNewLine=function(position){return console.warn(\"Use of document.insertNewLine is deprecated. Use insertMergedLines(position, ['', '']) instead.\"),this.insertMergedLines(position,[\"\",\"\"])},this.insert=function(position,text){return 1>=this.getLength()&&this.$detectNewLine(text),this.insertMergedLines(position,this.$split(text))},this.insertInLine=function(position,text){var start=this.clippedPos(position.row,position.column),end=this.pos(position.row,position.column+text.length);return this.applyDelta({start:start,end:end,action:\"insert\",lines:[text]},!0),this.clonePos(end)},this.clippedPos=function(row,column){var length=this.getLength();void 0===row?row=length:0>row?row=0:row>=length&&(row=length-1,column=void 0);var line=this.getLine(row);return void 0==column&&(column=line.length),column=Math.min(Math.max(column,0),line.length),{row:row,column:column}},this.clonePos=function(pos){return{row:pos.row,column:pos.column}},this.pos=function(row,column){return{row:row,column:column}},this.$clipPosition=function(position){var length=this.getLength();return position.row>=length?(position.row=Math.max(0,length-1),position.column=this.getLine(length-1).length):(position.row=Math.max(0,position.row),position.column=Math.min(Math.max(position.column,0),this.getLine(position.row).length)),position},this.insertFullLines=function(row,lines){row=Math.min(Math.max(row,0),this.getLength());var column=0;this.getLength()>row?(lines=lines.concat([\"\"]),column=0):(lines=[\"\"].concat(lines),row--,column=this.$lines[row].length),this.insertMergedLines({row:row,column:column},lines)},this.insertMergedLines=function(position,lines){var start=this.clippedPos(position.row,position.column),end={row:start.row+lines.length-1,column:(1==lines.length?start.column:0)+lines[lines.length-1].length};return this.applyDelta({start:start,end:end,action:\"insert\",lines:lines}),this.clonePos(end)},this.remove=function(range){var start=this.clippedPos(range.start.row,range.start.column),end=this.clippedPos(range.end.row,range.end.column);return this.applyDelta({start:start,end:end,action:\"remove\",lines:this.getLinesForRange({start:start,end:end})}),this.clonePos(start)},this.removeInLine=function(row,startColumn,endColumn){var start=this.clippedPos(row,startColumn),end=this.clippedPos(row,endColumn);return this.applyDelta({start:start,end:end,action:\"remove\",lines:this.getLinesForRange({start:start,end:end})},!0),this.clonePos(start)},this.removeFullLines=function(firstRow,lastRow){firstRow=Math.min(Math.max(0,firstRow),this.getLength()-1),lastRow=Math.min(Math.max(0,lastRow),this.getLength()-1);var deleteFirstNewLine=lastRow==this.getLength()-1&&firstRow>0,deleteLastNewLine=this.getLength()-1>lastRow,startRow=deleteFirstNewLine?firstRow-1:firstRow,startCol=deleteFirstNewLine?this.getLine(startRow).length:0,endRow=deleteLastNewLine?lastRow+1:lastRow,endCol=deleteLastNewLine?0:this.getLine(endRow).length,range=new Range(startRow,startCol,endRow,endCol),deletedLines=this.$lines.slice(firstRow,lastRow+1);return this.applyDelta({start:range.start,end:range.end,action:\"remove\",lines:this.getLinesForRange(range)}),deletedLines},this.removeNewLine=function(row){this.getLength()-1>row&&row>=0&&this.applyDelta({start:this.pos(row,this.getLine(row).length),end:this.pos(row+1,0),action:\"remove\",lines:[\"\",\"\"]})},this.replace=function(range,text){if(range instanceof Range||(range=Range.fromPoints(range.start,range.end)),0===text.length&&range.isEmpty())return range.start;if(text==this.getTextRange(range))return range.end;this.remove(range);var end;return end=text?this.insert(range.start,text):range.start},this.applyDeltas=function(deltas){for(var i=0;deltas.length>i;i++)this.applyDelta(deltas[i])},this.revertDeltas=function(deltas){for(var i=deltas.length-1;i>=0;i--)this.revertDelta(deltas[i])},this.applyDelta=function(delta,doNotValidate){var isInsert=\"insert\"==delta.action;(isInsert?1>=delta.lines.length&&!delta.lines[0]:!Range.comparePoints(delta.start,delta.end))||(isInsert&&delta.lines.length>2e4&&this.$splitAndapplyLargeDelta(delta,2e4),applyDelta(this.$lines,delta,doNotValidate),this._signal(\"change\",delta))},this.$splitAndapplyLargeDelta=function(delta,MAX){for(var lines=delta.lines,l=lines.length,row=delta.start.row,column=delta.start.column,from=0,to=0;;){from=to,to+=MAX-1;var chunk=lines.slice(from,to);if(to>l){delta.lines=chunk,delta.start.row=row+from,delta.start.column=column;break}chunk.push(\"\"),this.applyDelta({start:this.pos(row+from,column),end:this.pos(row+to,column=0),action:delta.action,lines:chunk},!0)}},this.revertDelta=function(delta){this.applyDelta({start:this.clonePos(delta.start),end:this.clonePos(delta.end),action:\"insert\"==delta.action?\"remove\":\"insert\",lines:delta.lines.slice()})},this.indexToPosition=function(index,startRow){for(var lines=this.$lines||this.getAllLines(),newlineLength=this.getNewLineCharacter().length,i=startRow||0,l=lines.length;l>i;i++)if(index-=lines[i].length+newlineLength,0>index)return{row:i,column:index+lines[i].length+newlineLength};return{row:l-1,column:lines[l-1].length}},this.positionToIndex=function(pos,startRow){for(var lines=this.$lines||this.getAllLines(),newlineLength=this.getNewLineCharacter().length,index=0,row=Math.min(pos.row,lines.length),i=startRow||0;row>i;++i)index+=lines[i].length+newlineLength;return index+pos.column}}).call(Document.prototype),exports.Document=Document}),ace.define(\"ace/lib/lang\",[\"require\",\"exports\",\"module\"],function(acequire,exports){\"use strict\";exports.last=function(a){return a[a.length-1]},exports.stringReverse=function(string){return string.split(\"\").reverse().join(\"\")},exports.stringRepeat=function(string,count){for(var result=\"\";count>0;)1&count&&(result+=string),(count>>=1)&&(string+=string);return result};var trimBeginRegexp=/^\\s\\s*/,trimEndRegexp=/\\s\\s*$/;exports.stringTrimLeft=function(string){return string.replace(trimBeginRegexp,\"\")},exports.stringTrimRight=function(string){return string.replace(trimEndRegexp,\"\")},exports.copyObject=function(obj){var copy={};for(var key in obj)copy[key]=obj[key];return copy},exports.copyArray=function(array){for(var copy=[],i=0,l=array.length;l>i;i++)copy[i]=array[i]&&\"object\"==typeof array[i]?this.copyObject(array[i]):array[i];return copy},exports.deepCopy=function deepCopy(obj){if(\"object\"!=typeof obj||!obj)return obj;var copy;if(Array.isArray(obj)){copy=[];for(var key=0;obj.length>key;key++)copy[key]=deepCopy(obj[key]);return copy}var cons=obj.constructor;if(cons===RegExp)return obj;copy=cons();for(var key in obj)copy[key]=deepCopy(obj[key]);return copy},exports.arrayToMap=function(arr){for(var map={},i=0;arr.length>i;i++)map[arr[i]]=1;return map},exports.createMap=function(props){var map=Object.create(null);for(var i in props)map[i]=props[i];return map},exports.arrayRemove=function(array,value){for(var i=0;array.length>=i;i++)value===array[i]&&array.splice(i,1)},exports.escapeRegExp=function(str){return str.replace(/([.*+?^${}()|[\\]\\/\\\\])/g,\"\\\\$1\")},exports.escapeHTML=function(str){return str.replace(/&/g,\"&#38;\").replace(/\"/g,\"&#34;\").replace(/'/g,\"&#39;\").replace(/</g,\"&#60;\")},exports.getMatchOffsets=function(string,regExp){var matches=[];return string.replace(regExp,function(str){matches.push({offset:arguments[arguments.length-2],length:str.length})}),matches},exports.deferredCall=function(fcn){var timer=null,callback=function(){timer=null,fcn()},deferred=function(timeout){return deferred.cancel(),timer=setTimeout(callback,timeout||0),deferred};return deferred.schedule=deferred,deferred.call=function(){return this.cancel(),fcn(),deferred},deferred.cancel=function(){return clearTimeout(timer),timer=null,deferred},deferred.isPending=function(){return timer},deferred},exports.delayedCall=function(fcn,defaultTimeout){var timer=null,callback=function(){timer=null,fcn()},_self=function(timeout){null==timer&&(timer=setTimeout(callback,timeout||defaultTimeout))};return _self.delay=function(timeout){timer&&clearTimeout(timer),timer=setTimeout(callback,timeout||defaultTimeout)},_self.schedule=_self,_self.call=function(){this.cancel(),fcn()},_self.cancel=function(){timer&&clearTimeout(timer),timer=null},_self.isPending=function(){return timer},_self}}),ace.define(\"ace/worker/mirror\",[\"require\",\"exports\",\"module\",\"ace/range\",\"ace/document\",\"ace/lib/lang\"],function(acequire,exports){\"use strict\";acequire(\"../range\").Range;var Document=acequire(\"../document\").Document,lang=acequire(\"../lib/lang\"),Mirror=exports.Mirror=function(sender){this.sender=sender;var doc=this.doc=new Document(\"\"),deferredUpdate=this.deferredUpdate=lang.delayedCall(this.onUpdate.bind(this)),_self=this;sender.on(\"change\",function(e){var data=e.data;if(data[0].start)doc.applyDeltas(data);else for(var i=0;data.length>i;i+=2){if(Array.isArray(data[i+1]))var d={action:\"insert\",start:data[i],lines:data[i+1]};else var d={action:\"remove\",start:data[i],end:data[i+1]};doc.applyDelta(d,!0)}return _self.$timeout?deferredUpdate.schedule(_self.$timeout):(_self.onUpdate(),void 0)})};(function(){this.$timeout=500,this.setTimeout=function(timeout){this.$timeout=timeout},this.setValue=function(value){this.doc.setValue(value),this.deferredUpdate.schedule(this.$timeout)},this.getValue=function(callbackId){this.sender.callback(this.doc.getValue(),callbackId)},this.onUpdate=function(){},this.isPending=function(){return this.deferredUpdate.isPending()}}).call(Mirror.prototype)}),ace.define(\"ace/mode/json/json_parse\",[\"require\",\"exports\",\"module\"],function(){\"use strict\";var at,ch,text,value,escapee={'\"':'\"',\"\\\\\":\"\\\\\",\"/\":\"/\",b:\"\\b\",f:\"\\f\",n:\"\\n\",r:\"\\r\",t:\"\t\"},error=function(m){throw{name:\"SyntaxError\",message:m,at:at,text:text}},next=function(c){return c&&c!==ch&&error(\"Expected '\"+c+\"' instead of '\"+ch+\"'\"),ch=text.charAt(at),at+=1,ch},number=function(){var number,string=\"\";for(\"-\"===ch&&(string=\"-\",next(\"-\"));ch>=\"0\"&&\"9\">=ch;)string+=ch,next();if(\".\"===ch)for(string+=\".\";next()&&ch>=\"0\"&&\"9\">=ch;)string+=ch;if(\"e\"===ch||\"E\"===ch)for(string+=ch,next(),(\"-\"===ch||\"+\"===ch)&&(string+=ch,next());ch>=\"0\"&&\"9\">=ch;)string+=ch,next();return number=+string,isNaN(number)?(error(\"Bad number\"),void 0):number},string=function(){var hex,i,uffff,string=\"\";if('\"'===ch)for(;next();){if('\"'===ch)return next(),string;if(\"\\\\\"===ch)if(next(),\"u\"===ch){for(uffff=0,i=0;4>i&&(hex=parseInt(next(),16),isFinite(hex));i+=1)uffff=16*uffff+hex;string+=String.fromCharCode(uffff)}else{if(\"string\"!=typeof escapee[ch])break;string+=escapee[ch]}else string+=ch}error(\"Bad string\")},white=function(){for(;ch&&\" \">=ch;)next()},word=function(){switch(ch){case\"t\":return next(\"t\"),next(\"r\"),next(\"u\"),next(\"e\"),!0;case\"f\":return next(\"f\"),next(\"a\"),next(\"l\"),next(\"s\"),next(\"e\"),!1;case\"n\":return next(\"n\"),next(\"u\"),next(\"l\"),next(\"l\"),null}error(\"Unexpected '\"+ch+\"'\")},array=function(){var array=[];if(\"[\"===ch){if(next(\"[\"),white(),\"]\"===ch)return next(\"]\"),array;for(;ch;){if(array.push(value()),white(),\"]\"===ch)return next(\"]\"),array;next(\",\"),white()}}error(\"Bad array\")},object=function(){var key,object={};if(\"{\"===ch){if(next(\"{\"),white(),\"}\"===ch)return next(\"}\"),object;for(;ch;){if(key=string(),white(),next(\":\"),Object.hasOwnProperty.call(object,key)&&error('Duplicate key \"'+key+'\"'),object[key]=value(),white(),\"}\"===ch)return next(\"}\"),object;next(\",\"),white()}}error(\"Bad object\")};return value=function(){switch(white(),ch){case\"{\":return object();case\"[\":return array();case'\"':return string();case\"-\":return number();default:return ch>=\"0\"&&\"9\">=ch?number():word()}},function(source,reviver){var result;return text=source,at=0,ch=\" \",result=value(),white(),ch&&error(\"Syntax error\"),\"function\"==typeof reviver?function walk(holder,key){var k,v,value=holder[key];if(value&&\"object\"==typeof value)for(k in value)Object.hasOwnProperty.call(value,k)&&(v=walk(value,k),void 0!==v?value[k]=v:delete value[k]);return reviver.call(holder,key,value)}({\"\":result},\"\"):result}}),ace.define(\"ace/mode/json_worker\",[\"require\",\"exports\",\"module\",\"ace/lib/oop\",\"ace/worker/mirror\",\"ace/mode/json/json_parse\"],function(acequire,exports){\"use strict\";var oop=acequire(\"../lib/oop\"),Mirror=acequire(\"../worker/mirror\").Mirror,parse=acequire(\"./json/json_parse\"),JsonWorker=exports.JsonWorker=function(sender){Mirror.call(this,sender),this.setTimeout(200)};oop.inherits(JsonWorker,Mirror),function(){this.onUpdate=function(){var value=this.doc.getValue(),errors=[];try{value&&parse(value)}catch(e){var pos=this.doc.indexToPosition(e.at-1);errors.push({row:pos.row,column:pos.column,text:e.message,type:\"error\"})}this.sender.emit(\"annotate\",errors)}}.call(JsonWorker.prototype)}),ace.define(\"ace/lib/es5-shim\",[\"require\",\"exports\",\"module\"],function(){function Empty(){}function doesDefinePropertyWork(object){try{return Object.defineProperty(object,\"sentinel\",{}),\"sentinel\"in object}catch(exception){}}function toInteger(n){return n=+n,n!==n?n=0:0!==n&&n!==1/0&&n!==-(1/0)&&(n=(n>0||-1)*Math.floor(Math.abs(n))),n}Function.prototype.bind||(Function.prototype.bind=function(that){var target=this;if(\"function\"!=typeof target)throw new TypeError(\"Function.prototype.bind called on incompatible \"+target);var args=slice.call(arguments,1),bound=function(){if(this instanceof bound){var result=target.apply(this,args.concat(slice.call(arguments)));return Object(result)===result?result:this}return target.apply(that,args.concat(slice.call(arguments)))};return target.prototype&&(Empty.prototype=target.prototype,bound.prototype=new Empty,Empty.prototype=null),bound});var defineGetter,defineSetter,lookupGetter,lookupSetter,supportsAccessors,call=Function.prototype.call,prototypeOfArray=Array.prototype,prototypeOfObject=Object.prototype,slice=prototypeOfArray.slice,_toString=call.bind(prototypeOfObject.toString),owns=call.bind(prototypeOfObject.hasOwnProperty);if((supportsAccessors=owns(prototypeOfObject,\"__defineGetter__\"))&&(defineGetter=call.bind(prototypeOfObject.__defineGetter__),defineSetter=call.bind(prototypeOfObject.__defineSetter__),lookupGetter=call.bind(prototypeOfObject.__lookupGetter__),lookupSetter=call.bind(prototypeOfObject.__lookupSetter__)),2!=[1,2].splice(0).length)if(function(){function makeArray(l){var a=Array(l+2);return a[0]=a[1]=0,a}var lengthBefore,array=[];return array.splice.apply(array,makeArray(20)),array.splice.apply(array,makeArray(26)),lengthBefore=array.length,array.splice(5,0,\"XXX\"),lengthBefore+1==array.length,lengthBefore+1==array.length?!0:void 0\n}()){var array_splice=Array.prototype.splice;Array.prototype.splice=function(start,deleteCount){return arguments.length?array_splice.apply(this,[void 0===start?0:start,void 0===deleteCount?this.length-start:deleteCount].concat(slice.call(arguments,2))):[]}}else Array.prototype.splice=function(pos,removeCount){var length=this.length;pos>0?pos>length&&(pos=length):void 0==pos?pos=0:0>pos&&(pos=Math.max(length+pos,0)),length>pos+removeCount||(removeCount=length-pos);var removed=this.slice(pos,pos+removeCount),insert=slice.call(arguments,2),add=insert.length;if(pos===length)add&&this.push.apply(this,insert);else{var remove=Math.min(removeCount,length-pos),tailOldPos=pos+remove,tailNewPos=tailOldPos+add-remove,tailCount=length-tailOldPos,lengthAfterRemove=length-remove;if(tailOldPos>tailNewPos)for(var i=0;tailCount>i;++i)this[tailNewPos+i]=this[tailOldPos+i];else if(tailNewPos>tailOldPos)for(i=tailCount;i--;)this[tailNewPos+i]=this[tailOldPos+i];if(add&&pos===lengthAfterRemove)this.length=lengthAfterRemove,this.push.apply(this,insert);else for(this.length=lengthAfterRemove+add,i=0;add>i;++i)this[pos+i]=insert[i]}return removed};Array.isArray||(Array.isArray=function(obj){return\"[object Array]\"==_toString(obj)});var boxedString=Object(\"a\"),splitString=\"a\"!=boxedString[0]||!(0 in boxedString);if(Array.prototype.forEach||(Array.prototype.forEach=function(fun){var object=toObject(this),self=splitString&&\"[object String]\"==_toString(this)?this.split(\"\"):object,thisp=arguments[1],i=-1,length=self.length>>>0;if(\"[object Function]\"!=_toString(fun))throw new TypeError;for(;length>++i;)i in self&&fun.call(thisp,self[i],i,object)}),Array.prototype.map||(Array.prototype.map=function(fun){var object=toObject(this),self=splitString&&\"[object String]\"==_toString(this)?this.split(\"\"):object,length=self.length>>>0,result=Array(length),thisp=arguments[1];if(\"[object Function]\"!=_toString(fun))throw new TypeError(fun+\" is not a function\");for(var i=0;length>i;i++)i in self&&(result[i]=fun.call(thisp,self[i],i,object));return result}),Array.prototype.filter||(Array.prototype.filter=function(fun){var value,object=toObject(this),self=splitString&&\"[object String]\"==_toString(this)?this.split(\"\"):object,length=self.length>>>0,result=[],thisp=arguments[1];if(\"[object Function]\"!=_toString(fun))throw new TypeError(fun+\" is not a function\");for(var i=0;length>i;i++)i in self&&(value=self[i],fun.call(thisp,value,i,object)&&result.push(value));return result}),Array.prototype.every||(Array.prototype.every=function(fun){var object=toObject(this),self=splitString&&\"[object String]\"==_toString(this)?this.split(\"\"):object,length=self.length>>>0,thisp=arguments[1];if(\"[object Function]\"!=_toString(fun))throw new TypeError(fun+\" is not a function\");for(var i=0;length>i;i++)if(i in self&&!fun.call(thisp,self[i],i,object))return!1;return!0}),Array.prototype.some||(Array.prototype.some=function(fun){var object=toObject(this),self=splitString&&\"[object String]\"==_toString(this)?this.split(\"\"):object,length=self.length>>>0,thisp=arguments[1];if(\"[object Function]\"!=_toString(fun))throw new TypeError(fun+\" is not a function\");for(var i=0;length>i;i++)if(i in self&&fun.call(thisp,self[i],i,object))return!0;return!1}),Array.prototype.reduce||(Array.prototype.reduce=function(fun){var object=toObject(this),self=splitString&&\"[object String]\"==_toString(this)?this.split(\"\"):object,length=self.length>>>0;if(\"[object Function]\"!=_toString(fun))throw new TypeError(fun+\" is not a function\");if(!length&&1==arguments.length)throw new TypeError(\"reduce of empty array with no initial value\");var result,i=0;if(arguments.length>=2)result=arguments[1];else for(;;){if(i in self){result=self[i++];break}if(++i>=length)throw new TypeError(\"reduce of empty array with no initial value\")}for(;length>i;i++)i in self&&(result=fun.call(void 0,result,self[i],i,object));return result}),Array.prototype.reduceRight||(Array.prototype.reduceRight=function(fun){var object=toObject(this),self=splitString&&\"[object String]\"==_toString(this)?this.split(\"\"):object,length=self.length>>>0;if(\"[object Function]\"!=_toString(fun))throw new TypeError(fun+\" is not a function\");if(!length&&1==arguments.length)throw new TypeError(\"reduceRight of empty array with no initial value\");var result,i=length-1;if(arguments.length>=2)result=arguments[1];else for(;;){if(i in self){result=self[i--];break}if(0>--i)throw new TypeError(\"reduceRight of empty array with no initial value\")}do i in this&&(result=fun.call(void 0,result,self[i],i,object));while(i--);return result}),Array.prototype.indexOf&&-1==[0,1].indexOf(1,2)||(Array.prototype.indexOf=function(sought){var self=splitString&&\"[object String]\"==_toString(this)?this.split(\"\"):toObject(this),length=self.length>>>0;if(!length)return-1;var i=0;for(arguments.length>1&&(i=toInteger(arguments[1])),i=i>=0?i:Math.max(0,length+i);length>i;i++)if(i in self&&self[i]===sought)return i;return-1}),Array.prototype.lastIndexOf&&-1==[0,1].lastIndexOf(0,-3)||(Array.prototype.lastIndexOf=function(sought){var self=splitString&&\"[object String]\"==_toString(this)?this.split(\"\"):toObject(this),length=self.length>>>0;if(!length)return-1;var i=length-1;for(arguments.length>1&&(i=Math.min(i,toInteger(arguments[1]))),i=i>=0?i:length-Math.abs(i);i>=0;i--)if(i in self&&sought===self[i])return i;return-1}),Object.getPrototypeOf||(Object.getPrototypeOf=function(object){return object.__proto__||(object.constructor?object.constructor.prototype:prototypeOfObject)}),!Object.getOwnPropertyDescriptor){var ERR_NON_OBJECT=\"Object.getOwnPropertyDescriptor called on a non-object: \";Object.getOwnPropertyDescriptor=function(object,property){if(\"object\"!=typeof object&&\"function\"!=typeof object||null===object)throw new TypeError(ERR_NON_OBJECT+object);if(owns(object,property)){var descriptor,getter,setter;if(descriptor={enumerable:!0,configurable:!0},supportsAccessors){var prototype=object.__proto__;object.__proto__=prototypeOfObject;var getter=lookupGetter(object,property),setter=lookupSetter(object,property);if(object.__proto__=prototype,getter||setter)return getter&&(descriptor.get=getter),setter&&(descriptor.set=setter),descriptor}return descriptor.value=object[property],descriptor}}}if(Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(object){return Object.keys(object)}),!Object.create){var createEmpty;createEmpty=null===Object.prototype.__proto__?function(){return{__proto__:null}}:function(){var empty={};for(var i in empty)empty[i]=null;return empty.constructor=empty.hasOwnProperty=empty.propertyIsEnumerable=empty.isPrototypeOf=empty.toLocaleString=empty.toString=empty.valueOf=empty.__proto__=null,empty},Object.create=function(prototype,properties){var object;if(null===prototype)object=createEmpty();else{if(\"object\"!=typeof prototype)throw new TypeError(\"typeof prototype[\"+typeof prototype+\"] != 'object'\");var Type=function(){};Type.prototype=prototype,object=new Type,object.__proto__=prototype}return void 0!==properties&&Object.defineProperties(object,properties),object}}if(Object.defineProperty){var definePropertyWorksOnObject=doesDefinePropertyWork({}),definePropertyWorksOnDom=\"undefined\"==typeof document||doesDefinePropertyWork(document.createElement(\"div\"));if(!definePropertyWorksOnObject||!definePropertyWorksOnDom)var definePropertyFallback=Object.defineProperty}if(!Object.defineProperty||definePropertyFallback){var ERR_NON_OBJECT_DESCRIPTOR=\"Property description must be an object: \",ERR_NON_OBJECT_TARGET=\"Object.defineProperty called on non-object: \",ERR_ACCESSORS_NOT_SUPPORTED=\"getters & setters can not be defined on this javascript engine\";Object.defineProperty=function(object,property,descriptor){if(\"object\"!=typeof object&&\"function\"!=typeof object||null===object)throw new TypeError(ERR_NON_OBJECT_TARGET+object);if(\"object\"!=typeof descriptor&&\"function\"!=typeof descriptor||null===descriptor)throw new TypeError(ERR_NON_OBJECT_DESCRIPTOR+descriptor);if(definePropertyFallback)try{return definePropertyFallback.call(Object,object,property,descriptor)}catch(exception){}if(owns(descriptor,\"value\"))if(supportsAccessors&&(lookupGetter(object,property)||lookupSetter(object,property))){var prototype=object.__proto__;object.__proto__=prototypeOfObject,delete object[property],object[property]=descriptor.value,object.__proto__=prototype}else object[property]=descriptor.value;else{if(!supportsAccessors)throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);owns(descriptor,\"get\")&&defineGetter(object,property,descriptor.get),owns(descriptor,\"set\")&&defineSetter(object,property,descriptor.set)}return object}}Object.defineProperties||(Object.defineProperties=function(object,properties){for(var property in properties)owns(properties,property)&&Object.defineProperty(object,property,properties[property]);return object}),Object.seal||(Object.seal=function(object){return object}),Object.freeze||(Object.freeze=function(object){return object});try{Object.freeze(function(){})}catch(exception){Object.freeze=function(freezeObject){return function(object){return\"function\"==typeof object?object:freezeObject(object)}}(Object.freeze)}if(Object.preventExtensions||(Object.preventExtensions=function(object){return object}),Object.isSealed||(Object.isSealed=function(){return!1}),Object.isFrozen||(Object.isFrozen=function(){return!1}),Object.isExtensible||(Object.isExtensible=function(object){if(Object(object)===object)throw new TypeError;for(var name=\"\";owns(object,name);)name+=\"?\";object[name]=!0;var returnValue=owns(object,name);return delete object[name],returnValue}),!Object.keys){var hasDontEnumBug=!0,dontEnums=[\"toString\",\"toLocaleString\",\"valueOf\",\"hasOwnProperty\",\"isPrototypeOf\",\"propertyIsEnumerable\",\"constructor\"],dontEnumsLength=dontEnums.length;for(var key in{toString:null})hasDontEnumBug=!1;Object.keys=function(object){if(\"object\"!=typeof object&&\"function\"!=typeof object||null===object)throw new TypeError(\"Object.keys called on a non-object\");var keys=[];for(var name in object)owns(object,name)&&keys.push(name);if(hasDontEnumBug)for(var i=0,ii=dontEnumsLength;ii>i;i++){var dontEnum=dontEnums[i];owns(object,dontEnum)&&keys.push(dontEnum)}return keys}}Date.now||(Date.now=function(){return(new Date).getTime()});var ws=\"\t\\n\u000b\\f\\r   ᠎             　\\u2028\\u2029﻿\";if(!String.prototype.trim||ws.trim()){ws=\"[\"+ws+\"]\";var trimBeginRegexp=RegExp(\"^\"+ws+ws+\"*\"),trimEndRegexp=RegExp(ws+ws+\"*$\");String.prototype.trim=function(){return(this+\"\").replace(trimBeginRegexp,\"\").replace(trimEndRegexp,\"\")}}var toObject=function(o){if(null==o)throw new TypeError(\"can't convert \"+o+\" to object\");return Object(o)}});";

/***/ },
/* 16 */
/***/ function(module, exports) {

	ace.define("ace/ext/searchbox",["require","exports","module","ace/lib/dom","ace/lib/lang","ace/lib/event","ace/keyboard/hash_handler","ace/lib/keys"], function(acequire, exports, module) {
	"use strict";

	var dom = acequire("../lib/dom");
	var lang = acequire("../lib/lang");
	var event = acequire("../lib/event");
	var searchboxCss = "\
	.ace_search {\
	background-color: #ddd;\
	border: 1px solid #cbcbcb;\
	border-top: 0 none;\
	max-width: 325px;\
	overflow: hidden;\
	margin: 0;\
	padding: 4px;\
	padding-right: 6px;\
	padding-bottom: 0;\
	position: absolute;\
	top: 0px;\
	z-index: 99;\
	white-space: normal;\
	}\
	.ace_search.left {\
	border-left: 0 none;\
	border-radius: 0px 0px 5px 0px;\
	left: 0;\
	}\
	.ace_search.right {\
	border-radius: 0px 0px 0px 5px;\
	border-right: 0 none;\
	right: 0;\
	}\
	.ace_search_form, .ace_replace_form {\
	border-radius: 3px;\
	border: 1px solid #cbcbcb;\
	float: left;\
	margin-bottom: 4px;\
	overflow: hidden;\
	}\
	.ace_search_form.ace_nomatch {\
	outline: 1px solid red;\
	}\
	.ace_search_field {\
	background-color: white;\
	border-right: 1px solid #cbcbcb;\
	border: 0 none;\
	-webkit-box-sizing: border-box;\
	-moz-box-sizing: border-box;\
	box-sizing: border-box;\
	float: left;\
	height: 22px;\
	outline: 0;\
	padding: 0 7px;\
	width: 214px;\
	margin: 0;\
	}\
	.ace_searchbtn,\
	.ace_replacebtn {\
	background: #fff;\
	border: 0 none;\
	border-left: 1px solid #dcdcdc;\
	cursor: pointer;\
	float: left;\
	height: 22px;\
	margin: 0;\
	position: relative;\
	}\
	.ace_searchbtn:last-child,\
	.ace_replacebtn:last-child {\
	border-top-right-radius: 3px;\
	border-bottom-right-radius: 3px;\
	}\
	.ace_searchbtn:disabled {\
	background: none;\
	cursor: default;\
	}\
	.ace_searchbtn {\
	background-position: 50% 50%;\
	background-repeat: no-repeat;\
	width: 27px;\
	}\
	.ace_searchbtn.prev {\
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADFJREFUeNpiSU1NZUAC/6E0I0yACYskCpsJiySKIiY0SUZk40FyTEgCjGgKwTRAgAEAQJUIPCE+qfkAAAAASUVORK5CYII=);    \
	}\
	.ace_searchbtn.next {\
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADRJREFUeNpiTE1NZQCC/0DMyIAKwGJMUAYDEo3M/s+EpvM/mkKwCQxYjIeLMaELoLMBAgwAU7UJObTKsvAAAAAASUVORK5CYII=);    \
	}\
	.ace_searchbtn_close {\
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAcCAYAAABRVo5BAAAAZ0lEQVR42u2SUQrAMAhDvazn8OjZBilCkYVVxiis8H4CT0VrAJb4WHT3C5xU2a2IQZXJjiQIRMdkEoJ5Q2yMqpfDIo+XY4k6h+YXOyKqTIj5REaxloNAd0xiKmAtsTHqW8sR2W5f7gCu5nWFUpVjZwAAAABJRU5ErkJggg==) no-repeat 50% 0;\
	border-radius: 50%;\
	border: 0 none;\
	color: #656565;\
	cursor: pointer;\
	float: right;\
	font: 16px/16px Arial;\
	height: 14px;\
	margin: 5px 1px 9px 5px;\
	padding: 0;\
	text-align: center;\
	width: 14px;\
	}\
	.ace_searchbtn_close:hover {\
	background-color: #656565;\
	background-position: 50% 100%;\
	color: white;\
	}\
	.ace_replacebtn.prev {\
	width: 54px\
	}\
	.ace_replacebtn.next {\
	width: 27px\
	}\
	.ace_button {\
	margin-left: 2px;\
	cursor: pointer;\
	-webkit-user-select: none;\
	-moz-user-select: none;\
	-o-user-select: none;\
	-ms-user-select: none;\
	user-select: none;\
	overflow: hidden;\
	opacity: 0.7;\
	border: 1px solid rgba(100,100,100,0.23);\
	padding: 1px;\
	-moz-box-sizing: border-box;\
	box-sizing:    border-box;\
	color: black;\
	}\
	.ace_button:hover {\
	background-color: #eee;\
	opacity:1;\
	}\
	.ace_button:active {\
	background-color: #ddd;\
	}\
	.ace_button.checked {\
	border-color: #3399ff;\
	opacity:1;\
	}\
	.ace_search_options{\
	margin-bottom: 3px;\
	text-align: right;\
	-webkit-user-select: none;\
	-moz-user-select: none;\
	-o-user-select: none;\
	-ms-user-select: none;\
	user-select: none;\
	}";
	var HashHandler = acequire("../keyboard/hash_handler").HashHandler;
	var keyUtil = acequire("../lib/keys");

	dom.importCssString(searchboxCss, "ace_searchbox");

	var html = '<div class="ace_search right">\
	    <button type="button" action="hide" class="ace_searchbtn_close"></button>\
	    <div class="ace_search_form">\
	        <input class="ace_search_field" placeholder="Search for" spellcheck="false"></input>\
	        <button type="button" action="findNext" class="ace_searchbtn next"></button>\
	        <button type="button" action="findPrev" class="ace_searchbtn prev"></button>\
	        <button type="button" action="findAll" class="ace_searchbtn" title="Alt-Enter">All</button>\
	    </div>\
	    <div class="ace_replace_form">\
	        <input class="ace_search_field" placeholder="Replace with" spellcheck="false"></input>\
	        <button type="button" action="replaceAndFindNext" class="ace_replacebtn">Replace</button>\
	        <button type="button" action="replaceAll" class="ace_replacebtn">All</button>\
	    </div>\
	    <div class="ace_search_options">\
	        <span action="toggleRegexpMode" class="ace_button" title="RegExp Search">.*</span>\
	        <span action="toggleCaseSensitive" class="ace_button" title="CaseSensitive Search">Aa</span>\
	        <span action="toggleWholeWords" class="ace_button" title="Whole Word Search">\\b</span>\
	    </div>\
	</div>'.replace(/>\s+/g, ">");

	var SearchBox = function(editor, range, showReplaceForm) {
	    var div = dom.createElement("div");
	    div.innerHTML = html;
	    this.element = div.firstChild;

	    this.$init();
	    this.setEditor(editor);
	};

	(function() {
	    this.setEditor = function(editor) {
	        editor.searchBox = this;
	        editor.container.appendChild(this.element);
	        this.editor = editor;
	    };

	    this.$initElements = function(sb) {
	        this.searchBox = sb.querySelector(".ace_search_form");
	        this.replaceBox = sb.querySelector(".ace_replace_form");
	        this.searchOptions = sb.querySelector(".ace_search_options");
	        this.regExpOption = sb.querySelector("[action=toggleRegexpMode]");
	        this.caseSensitiveOption = sb.querySelector("[action=toggleCaseSensitive]");
	        this.wholeWordOption = sb.querySelector("[action=toggleWholeWords]");
	        this.searchInput = this.searchBox.querySelector(".ace_search_field");
	        this.replaceInput = this.replaceBox.querySelector(".ace_search_field");
	    };
	    
	    this.$init = function() {
	        var sb = this.element;
	        
	        this.$initElements(sb);
	        
	        var _this = this;
	        event.addListener(sb, "mousedown", function(e) {
	            setTimeout(function(){
	                _this.activeInput.focus();
	            }, 0);
	            event.stopPropagation(e);
	        });
	        event.addListener(sb, "click", function(e) {
	            var t = e.target || e.srcElement;
	            var action = t.getAttribute("action");
	            if (action && _this[action])
	                _this[action]();
	            else if (_this.$searchBarKb.commands[action])
	                _this.$searchBarKb.commands[action].exec(_this);
	            event.stopPropagation(e);
	        });

	        event.addCommandKeyListener(sb, function(e, hashId, keyCode) {
	            var keyString = keyUtil.keyCodeToString(keyCode);
	            var command = _this.$searchBarKb.findKeyCommand(hashId, keyString);
	            if (command && command.exec) {
	                command.exec(_this);
	                event.stopEvent(e);
	            }
	        });

	        this.$onChange = lang.delayedCall(function() {
	            _this.find(false, false);
	        });

	        event.addListener(this.searchInput, "input", function() {
	            _this.$onChange.schedule(20);
	        });
	        event.addListener(this.searchInput, "focus", function() {
	            _this.activeInput = _this.searchInput;
	            _this.searchInput.value && _this.highlight();
	        });
	        event.addListener(this.replaceInput, "focus", function() {
	            _this.activeInput = _this.replaceInput;
	            _this.searchInput.value && _this.highlight();
	        });
	    };
	    this.$closeSearchBarKb = new HashHandler([{
	        bindKey: "Esc",
	        name: "closeSearchBar",
	        exec: function(editor) {
	            editor.searchBox.hide();
	        }
	    }]);
	    this.$searchBarKb = new HashHandler();
	    this.$searchBarKb.bindKeys({
	        "Ctrl-f|Command-f": function(sb) {
	            var isReplace = sb.isReplace = !sb.isReplace;
	            sb.replaceBox.style.display = isReplace ? "" : "none";
	            sb.searchInput.focus();
	        },
	        "Ctrl-H|Command-Option-F": function(sb) {
	            sb.replaceBox.style.display = "";
	            sb.replaceInput.focus();
	        },
	        "Ctrl-G|Command-G": function(sb) {
	            sb.findNext();
	        },
	        "Ctrl-Shift-G|Command-Shift-G": function(sb) {
	            sb.findPrev();
	        },
	        "esc": function(sb) {
	            setTimeout(function() { sb.hide();});
	        },
	        "Return": function(sb) {
	            if (sb.activeInput == sb.replaceInput)
	                sb.replace();
	            sb.findNext();
	        },
	        "Shift-Return": function(sb) {
	            if (sb.activeInput == sb.replaceInput)
	                sb.replace();
	            sb.findPrev();
	        },
	        "Alt-Return": function(sb) {
	            if (sb.activeInput == sb.replaceInput)
	                sb.replaceAll();
	            sb.findAll();
	        },
	        "Tab": function(sb) {
	            (sb.activeInput == sb.replaceInput ? sb.searchInput : sb.replaceInput).focus();
	        }
	    });

	    this.$searchBarKb.addCommands([{
	        name: "toggleRegexpMode",
	        bindKey: {win: "Alt-R|Alt-/", mac: "Ctrl-Alt-R|Ctrl-Alt-/"},
	        exec: function(sb) {
	            sb.regExpOption.checked = !sb.regExpOption.checked;
	            sb.$syncOptions();
	        }
	    }, {
	        name: "toggleCaseSensitive",
	        bindKey: {win: "Alt-C|Alt-I", mac: "Ctrl-Alt-R|Ctrl-Alt-I"},
	        exec: function(sb) {
	            sb.caseSensitiveOption.checked = !sb.caseSensitiveOption.checked;
	            sb.$syncOptions();
	        }
	    }, {
	        name: "toggleWholeWords",
	        bindKey: {win: "Alt-B|Alt-W", mac: "Ctrl-Alt-B|Ctrl-Alt-W"},
	        exec: function(sb) {
	            sb.wholeWordOption.checked = !sb.wholeWordOption.checked;
	            sb.$syncOptions();
	        }
	    }]);

	    this.$syncOptions = function() {
	        dom.setCssClass(this.regExpOption, "checked", this.regExpOption.checked);
	        dom.setCssClass(this.wholeWordOption, "checked", this.wholeWordOption.checked);
	        dom.setCssClass(this.caseSensitiveOption, "checked", this.caseSensitiveOption.checked);
	        this.find(false, false);
	    };

	    this.highlight = function(re) {
	        this.editor.session.highlight(re || this.editor.$search.$options.re);
	        this.editor.renderer.updateBackMarkers()
	    };
	    this.find = function(skipCurrent, backwards, preventScroll) {
	        var range = this.editor.find(this.searchInput.value, {
	            skipCurrent: skipCurrent,
	            backwards: backwards,
	            wrap: true,
	            regExp: this.regExpOption.checked,
	            caseSensitive: this.caseSensitiveOption.checked,
	            wholeWord: this.wholeWordOption.checked,
	            preventScroll: preventScroll
	        });
	        var noMatch = !range && this.searchInput.value;
	        dom.setCssClass(this.searchBox, "ace_nomatch", noMatch);
	        this.editor._emit("findSearchBox", { match: !noMatch });
	        this.highlight();
	    };
	    this.findNext = function() {
	        this.find(true, false);
	    };
	    this.findPrev = function() {
	        this.find(true, true);
	    };
	    this.findAll = function(){
	        var range = this.editor.findAll(this.searchInput.value, {            
	            regExp: this.regExpOption.checked,
	            caseSensitive: this.caseSensitiveOption.checked,
	            wholeWord: this.wholeWordOption.checked
	        });
	        var noMatch = !range && this.searchInput.value;
	        dom.setCssClass(this.searchBox, "ace_nomatch", noMatch);
	        this.editor._emit("findSearchBox", { match: !noMatch });
	        this.highlight();
	        this.hide();
	    };
	    this.replace = function() {
	        if (!this.editor.getReadOnly())
	            this.editor.replace(this.replaceInput.value);
	    };    
	    this.replaceAndFindNext = function() {
	        if (!this.editor.getReadOnly()) {
	            this.editor.replace(this.replaceInput.value);
	            this.findNext()
	        }
	    };
	    this.replaceAll = function() {
	        if (!this.editor.getReadOnly())
	            this.editor.replaceAll(this.replaceInput.value);
	    };

	    this.hide = function() {
	        this.element.style.display = "none";
	        this.editor.keyBinding.removeKeyboardHandler(this.$closeSearchBarKb);
	        this.editor.focus();
	    };
	    this.show = function(value, isReplace) {
	        this.element.style.display = "";
	        this.replaceBox.style.display = isReplace ? "" : "none";

	        this.isReplace = isReplace;

	        if (value)
	            this.searchInput.value = value;
	        
	        this.find(false, false, true);
	        
	        this.searchInput.focus();
	        this.searchInput.select();

	        this.editor.keyBinding.addKeyboardHandler(this.$closeSearchBarKb);
	    };

	    this.isFocused = function() {
	        var el = document.activeElement;
	        return el == this.searchInput || el == this.replaceInput;
	    }
	}).call(SearchBox.prototype);

	exports.SearchBox = SearchBox;

	exports.Search = function(editor, isReplace) {
	    var sb = editor.searchBox || new SearchBox(editor);
	    sb.show(editor.session.getTextRange(), isReplace);
	};

	});
	                (function() {
	                    ace.acequire(["ace/ext/searchbox"], function() {});
	                })();
	            

/***/ },
/* 17 */
/***/ function(module, exports) {

	/* ***** BEGIN LICENSE BLOCK *****
	 * Distributed under the BSD license:
	 *
	 * Copyright (c) 2010, Ajax.org B.V.
	 * All rights reserved.
	 * 
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions are met:
	 *     * Redistributions of source code must retain the above copyright
	 *       notice, this list of conditions and the following disclaimer.
	 *     * Redistributions in binary form must reproduce the above copyright
	 *       notice, this list of conditions and the following disclaimer in the
	 *       documentation and/or other materials provided with the distribution.
	 *     * Neither the name of Ajax.org B.V. nor the
	 *       names of its contributors may be used to endorse or promote products
	 *       derived from this software without specific prior written permission.
	 * 
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
	 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
	 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
	 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 *
	 * ***** END LICENSE BLOCK ***** */

	ace.define('ace/theme/jsoneditor', ['require', 'exports', 'module', 'ace/lib/dom'], function(acequire, exports, module) {

	exports.isDark = false;
	exports.cssClass = "ace-jsoneditor";
	exports.cssText = ".ace-jsoneditor .ace_gutter {\
	background: #ebebeb;\
	color: #333\
	}\
	\
	.ace-jsoneditor.ace_editor {\
	font-family: droid sans mono, consolas, monospace, courier new, courier, sans-serif;\
	line-height: 1.3;\
	}\
	.ace-jsoneditor .ace_print-margin {\
	width: 1px;\
	background: #e8e8e8\
	}\
	.ace-jsoneditor .ace_scroller {\
	background-color: #FFFFFF\
	}\
	.ace-jsoneditor .ace_text-layer {\
	color: gray\
	}\
	.ace-jsoneditor .ace_variable {\
	color: #1a1a1a\
	}\
	.ace-jsoneditor .ace_cursor {\
	border-left: 2px solid #000000\
	}\
	.ace-jsoneditor .ace_overwrite-cursors .ace_cursor {\
	border-left: 0px;\
	border-bottom: 1px solid #000000\
	}\
	.ace-jsoneditor .ace_marker-layer .ace_selection {\
	background: lightgray\
	}\
	.ace-jsoneditor.ace_multiselect .ace_selection.ace_start {\
	box-shadow: 0 0 3px 0px #FFFFFF;\
	border-radius: 2px\
	}\
	.ace-jsoneditor .ace_marker-layer .ace_step {\
	background: rgb(255, 255, 0)\
	}\
	.ace-jsoneditor .ace_marker-layer .ace_bracket {\
	margin: -1px 0 0 -1px;\
	border: 1px solid #BFBFBF\
	}\
	.ace-jsoneditor .ace_marker-layer .ace_active-line {\
	background: #FFFBD1\
	}\
	.ace-jsoneditor .ace_gutter-active-line {\
	background-color : #dcdcdc\
	}\
	.ace-jsoneditor .ace_marker-layer .ace_selected-word {\
	border: 1px solid lightgray\
	}\
	.ace-jsoneditor .ace_invisible {\
	color: #BFBFBF\
	}\
	.ace-jsoneditor .ace_keyword,\
	.ace-jsoneditor .ace_meta,\
	.ace-jsoneditor .ace_support.ace_constant.ace_property-value {\
	color: #AF956F\
	}\
	.ace-jsoneditor .ace_keyword.ace_operator {\
	color: #484848\
	}\
	.ace-jsoneditor .ace_keyword.ace_other.ace_unit {\
	color: #96DC5F\
	}\
	.ace-jsoneditor .ace_constant.ace_language {\
	color: darkorange\
	}\
	.ace-jsoneditor .ace_constant.ace_numeric {\
	color: red\
	}\
	.ace-jsoneditor .ace_constant.ace_character.ace_entity {\
	color: #BF78CC\
	}\
	.ace-jsoneditor .ace_invalid {\
	color: #FFFFFF;\
	background-color: #FF002A;\
	}\
	.ace-jsoneditor .ace_fold {\
	background-color: #AF956F;\
	border-color: #000000\
	}\
	.ace-jsoneditor .ace_storage,\
	.ace-jsoneditor .ace_support.ace_class,\
	.ace-jsoneditor .ace_support.ace_function,\
	.ace-jsoneditor .ace_support.ace_other,\
	.ace-jsoneditor .ace_support.ace_type {\
	color: #C52727\
	}\
	.ace-jsoneditor .ace_string {\
	color: green\
	}\
	.ace-jsoneditor .ace_comment {\
	color: #BCC8BA\
	}\
	.ace-jsoneditor .ace_entity.ace_name.ace_tag,\
	.ace-jsoneditor .ace_entity.ace_other.ace_attribute-name {\
	color: #606060\
	}\
	.ace-jsoneditor .ace_markup.ace_underline {\
	text-decoration: underline\
	}\
	.ace-jsoneditor .ace_indent-guide {\
	background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y\
	}";

	var dom = acequire("../lib/dom");
	dom.importCssString(exports.cssText, exports.cssClass);
	});


/***/ }
/******/ ])
});
;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(5)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(3),
  /* template */
  __webpack_require__(4),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/adam/workspace/vue2-jsoneditor/src/components/JsonEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] JsonEditor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a9983da8", Component.options)
  } else {
    hotAPI.reload("data-v-a9983da8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(18)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(14),
  /* template */
  __webpack_require__(17),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/adam/workspace/vue2-jsoneditor/src/App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] App.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-101181ff", Component.options)
  } else {
    hotAPI.reload("data-v-101181ff", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * Vue.js v2.2.6
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

/**
 * Convert a value to a string that is actually rendered.
 */
function _toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';
function isPlainObject (obj) {
  return toString.call(obj) === OBJECT_STRING
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 */
function noop () {}

/**
 * Always return false.
 */
var no = function () { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn();
    }
  }
}

/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * List of asset types that a component can own.
   */
  _assetTypes: [
    'component',
    'directive',
    'filter'
  ],

  /**
   * List of lifecycle hooks.
   */
  _lifecycleHooks: [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated'
  ],

  /**
   * Max circular updates allowed in a scheduler flush cycle.
   */
  _maxUpdateCount: 100
};

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) { cb.call(ctx); }
      if (_resolve) { _resolve(ctx); }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

var warn = noop;
var tip = noop;
var formatComponentName;

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error("[Vue warn]: " + msg + " " + (
        vm ? formatLocation(formatComponentName(vm)) : ''
      ));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + " " + (
        vm ? formatLocation(formatComponentName(vm)) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var name = typeof vm === 'string'
      ? vm
      : typeof vm === 'function' && vm.options
        ? vm.options.name
        : vm._isVue
          ? vm.$options.name || vm.$options._componentTag
          : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var formatLocation = function (str) {
    if (str === "<Anonymous>") {
      str += " - use the \"name\" option for better debugging messages.";
    }
    return ("\n(found in " + str + ")")
  };
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = (target ).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.splice(key, 1);
    return
  }
  var ob = (target ).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

config._lifecycleHooks.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

config._assetTypes.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }
  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = typeof extendsFrom === 'function'
      ? mergeOptions(parent, extendsFrom.options, vm)
      : mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      var mixin = child.mixins[i];
      if (mixin.prototype instanceof Vue$3) {
        mixin = mixin.options;
      }
      parent = mergeOptions(parent, mixin, vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (process.env.NODE_ENV !== 'production') {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

/**
 * Assert the type of a value
 */
function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (expectedType === 'String') {
    valid = typeof value === (expectedType = 'string');
  } else if (expectedType === 'Number') {
    valid = typeof value === (expectedType = 'number');
  } else if (expectedType === 'Boolean') {
    valid = typeof value === (expectedType = 'boolean');
  } else if (expectedType === 'Function') {
    valid = typeof value === (expectedType = 'function');
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match && match[1]
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Error in " + info + ":"), vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function () {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      for (var i = 0; i < fns.length; i++) {
        fns[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (!cur) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (!old) {
      if (!cur.fns) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (!on[name]) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (!oldHook) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (oldHook.fns && oldHook.merged) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (c == null || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (last && last.text) {
        last.text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (c.text && last && last.text) {
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (c.tag && c.key == null && nestedIndex != null) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function getFirstComponentChild (children) {
  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
}

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  var name, child;
  for (var i = 0, l = children.length; i < l; i++) {
    child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
        child.data && (name = child.data.slot)) {
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns
) {
  var res = {};
  for (var i = 0; i < fns.length; i++) {
    res[fns[i][0]] = fns[i][1];
  }
  return res
}

/*  */

var activeInstance = null;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // remove reference to DOM nodes (prevents leak)
    vm.$options._parentElm = vm.$options._refElm = null;
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    if (process.env.NODE_ENV !== 'production') {
      observerState.isSettingProps = true;
    }
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    if (process.env.NODE_ENV !== 'production') {
      observerState.isSettingProps = false;
    }
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive == null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var queue = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  queue.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id, vm;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > config._maxUpdateCount) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // reset scheduler before updated hook called
  var oldQueue = queue.slice();
  resetSchedulerState();

  // call updated hooks
  index = oldQueue.length;
  while (index--) {
    watcher = oldQueue[index];
    vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i >= 0 && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  if (this.user) {
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    }
  } else {
    value = this.getter.call(vm, vm);
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch) { initWatch(vm, opts.watch); }
}

var isReservedProp = { key: 1, ref: 1, slot: 1 };

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      if (isReservedProp[key]) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !observerState.isSettingProps) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(keys[i])) {
      proxy(vm, "_data", keys[i]);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production') {
      if (getter === undefined) {
        warn(
          ("No getter function has been defined for computed property \"" + key + "\"."),
          vm
        );
        getter = noop;
      }
    }
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    }
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          "method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
    }
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    if (!vnode.componentInstance._isMounted) {
      vnode.componentInstance._isMounted = true;
      callHook(vnode.componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      activateChildComponent(vnode.componentInstance, true /* direct */);
    }
  },

  destroy: function destroy (vnode) {
    if (!vnode.componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        vnode.componentInstance.$destroy();
      } else {
        deactivateChildComponent(vnode.componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (!Ctor) {
    return
  }

  var baseCtor = context.$options._base;
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (!Ctor.cid) {
    if (Ctor.resolved) {
      Ctor = Ctor.resolved;
    } else {
      Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
        // it's ok to queue this on every render because
        // $forceUpdate is buffered by the scheduler.
        context.$forceUpdate();
      });
      if (!Ctor) {
        // return nothing if this is indeed an async component
        // wait for the callback to trigger parent update.
        return
      }
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // transform component v-model data into props & events
  if (data.model) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractProps(data, Ctor, tag);

  // functional component
  if (Ctor.options.functional) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (Ctor.options.abstract) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
  );
  return vnode
}

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (propOptions) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData);
    }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    props: props,
    data: data,
    parent: context,
    children: children,
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (inlineTemplate) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  cb
) {
  if (factory.requested) {
    // pool callbacks
    factory.pendingCallbacks.push(cb);
  } else {
    factory.requested = true;
    var cbs = factory.pendingCallbacks = [cb];
    var sync = true;

    var resolve = function (res) {
      if (isObject(res)) {
        res = baseCtor.extend(res);
      }
      // cache resolved
      factory.resolved = res;
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        for (var i = 0, l = cbs.length; i < l; i++) {
          cbs[i](res);
        }
      }
    };

    var reject = function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
    };

    var res = factory(resolve, reject);

    // handle promise
    if (res && typeof res.then === 'function' && !factory.resolved) {
      res.then(resolve, reject);
    }

    sync = false;
    // return in case resolved synchronously
    return factory.resolved
  }
}

function extractProps (data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (!propOptions) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  var domProps = data.domProps;
  if (attrs || props || domProps) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && attrs.hasOwnProperty(keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey) ||
      checkProp(res, domProps, key, altKey);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (hash) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (on[event]) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (alwaysNormalize) { normalizationType = ALWAYS_NORMALIZE; }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (data && data.__ob__) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
      typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (vnode) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (vnode.children) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (child.tag && !child.ns) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      extend(props, bindObject);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && process.env.NODE_ENV !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      for (var key in value) {
        if (key === 'class' || key === 'style') {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];
        }
      }
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function initRender (vm) {
  vm.$vnode = null; // the placeholder node in parent tree
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$options._parentVnode;
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode;
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = _toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var inject = vm.$options.inject;
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    // isArray here
    var isArray = Array.isArray(inject);
    var keys = isArray
      ? inject
      : hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    var loop = function ( i ) {
      var key = keys[i];
      var provideKey = isArray ? key : inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          /* istanbul ignore else */
          if (process.env.NODE_ENV !== 'production') {
            defineReactive$$1(vm, key, source._provided[provideKey], function () {
              warn(
                "Avoid mutating an injected value directly since the changes will be " +
                "overwritten whenever the provided component re-renders. " +
                "injection being mutated: \"" + key + "\"",
                vm
              );
            });
          } else {
            defineReactive$$1(vm, key, source._provided[provideKey]);
          }
          break
        }
        source = source.$parent;
      }
    };

    for (var i = 0; i < keys.length; i++) loop( i );
  }
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-init:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(((vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    for (var i = 0; i < latest.length; i++) {
      if (sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue$3)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production') {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    config._assetTypes.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  config._assetTypes.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (pattern instanceof RegExp) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cachedNode);
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    if (!vnode.componentInstance._inactive) {
      callHook(vnode.componentInstance, 'deactivated');
    }
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  config._assetTypes.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Vue$3.version = '2.2.6';

/*  */

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (childNode.componentInstance) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: child.class
      ? [child.class, parent.class]
      : parent.class
  }
}

function genClassFromData (data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (staticClass || dynamicClass) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  var res = '';
  if (!value) {
    return res
  }
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (value[i]) {
        if ((stringified = stringifyClass(value[i]))) {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1)
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) { res += key + ' '; }
    }
    return res.slice(0, -1)
  }
  /* istanbul ignore next */
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function sameVnode (a, b) {
  return (
    a.key === b.key &&
    a.tag === b.tag &&
    a.isComment === b.isComment &&
    isDef(a.data) === isDef(b.data) &&
    sameInputType(a, b)
  )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref) {
    if (isDef(parent)) {
      if (isDef(ref)) {
        nodeOps.insertBefore(parent, elm, ref);
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
        i !== vnode.context &&
        isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
        isTrue(oldVnode.isStatic) &&
        vnode.key === oldVnode.key &&
        (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }
    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (isDef(vnode.tag)) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
            oldVnode.removeAttribute('server-rendered');
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  if (!oldVnode.data.attrs && !vnode.data.attrs) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (attrs.__ob__) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (attrs[key] == null) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (!data.staticClass && !data.class &&
      (!oldData || (!oldData.staticClass && !oldData.class))) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (transitionClass) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important
) {
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

function getAndRemoveAttr (el, name) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var modelRs = parseModel(value);
  if (modelRs.idx === null) {
    return (value + "=" + assignment)
  } else {
    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
      "if (!Array.isArray($$exp)){" +
        value + "=" + assignment + "}" +
      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
  }
}

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;

function parseModel (val) {
  str = val;
  len = str.length;
  index$1 = expressionPos = expressionEndPos = 0;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    return {
      exp: val,
      idx: null
    }
  }

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.substring(0, expressionPos),
    idx: val.substring(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (process.env.NODE_ENV !== 'production') {
    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (tag === 'input' && dynamicType) {
      warn$1(
        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
        "v-model does not support dynamic input types. Use v-if branches instead."
      );
    }
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (process.env.NODE_ENV !== 'production') {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
  );
  addHandler(el, CHECKBOX_RADIO_TOKEN,
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + value + "=$$c}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number || type === 'number') {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  var event;
  /* istanbul ignore if */
  if (on[RANGE_TOKEN]) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (on[CHECKBOX_RADIO_TOKEN]) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1 (
  event,
  handler,
  once,
  capture
) {
  if (once) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(event, handler, capture);
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (!oldVnode.data.on && !vnode.data.on) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (!oldVnode.data.domProps && !vnode.data.domProps) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (props.__ob__) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (props[key] == null) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = cur == null ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if ((modifiers && modifiers.number) || elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal)
  }
  if (modifiers && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    el.style[normalize(name)] = val;
  }
};

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in testEl.style)) {
    return prop
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (!data.staticStyle && !data.style &&
      !oldData.staticStyle && !oldData.style) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldVnode.data.staticStyle;
  var oldStyleBinding = oldVnode.data.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  vnode.data.style = style.__ob__ ? extend({}, style) : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (newStyle[name] == null) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (el._leaveCb) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return
  }

  /* istanbul ignore if */
  if (el._enterCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
          pendingNode.tag === vnode.tag &&
          pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (el._enterCb) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return rm()
  }

  /* istanbul ignore if */
  if (el._leaveCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitLeaveDuration != null) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (!fn) { return false }
  var invokerFns = fn.fns;
  if (invokerFns) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (!vnode.data.show) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (!vnode.data.show) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || el.type === 'text' || el.type === 'password') {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  return /\d-keep-alive$/.test(rawChild.tag)
    ? h('keep-alive')
    : null
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag; });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
        mode && mode !== 'in-out' && mode !== 'out-in') {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      if (this._hasMove != null) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if (process.env.NODE_ENV !== 'production' &&
      config.productionTip !== false &&
      inBrowser && typeof console !== 'undefined') {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

// check whether current browser encodes a char inside attribute values
function shouldDecode (content, encoded) {
  var div = document.createElement('div');
  div.innerHTML = "<div a=\"" + content + "\">";
  return div.innerHTML.indexOf(encoded) > 0
}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/*  */

var decoder;

function decode (html) {
  decoder = decoder || document.createElement('div');
  decoder.innerHTML = html;
  return decoder.textContent
}

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var singleAttrIdentifier = /([^\s"'<>/=]+)/;
var singleAttrAssign = /(?:=)/;
var singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
];
var attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
);

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          continue
        }
      }

      var text = (void 0), rest$1 = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest$1 = html.slice(textEnd);
        while (
          !endTag.test(rest$1) &&
          !startTagOpen.test(rest$1) &&
          !comment.test(rest$1) &&
          !conditionalComment.test(rest$1)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest$1.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest$1 = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var endTagLength = 0;
      var rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest.length;
      html = rest;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(
          value,
          options.shouldDecodeNewlines
        )
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (process.env.NODE_ENV !== 'production' &&
            (i > pos || !tagName) &&
            options.warn) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;
  platformGetTagNamespace = options.getTagNamespace || no;
  platformMustUseProp = options.mustUseProp || no;
  platformIsPreTag = options.isPreTag || no;
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  transforms = pluckModuleFunction(options.modules, 'transformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function endPre (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = {
        type: 1,
        tag: tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      };
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        process.env.NODE_ENV !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        preTransforms[i](element, options);
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else {
        processFor(element);
        processIf(element);
        processOnce(element);
        processKey(element);

        // determine whether this is a plain element after
        // removing structural attributes
        element.plain = !element.key && !attrs.length;

        processRef(element);
        processSlot(element);
        processComponent(element);
        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
          transforms[i$1](element, options);
        }
        processAttrs(element);
      }

      function checkRootConstraints (el) {
        if (process.env.NODE_ENV !== 'production') {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (process.env.NODE_ENV !== 'production') {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
        postTransforms[i$2](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (process.env.NODE_ENV !== 'production') {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
          currentParent.tag === 'textarea' &&
          currentParent.attrsMap.placeholder === text) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (process.env.NODE_ENV !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      process.env.NODE_ENV !== 'production' && warn$2(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (process.env.NODE_ENV !== 'production') {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (process.env.NODE_ENV !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (process.env.NODE_ENV !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    }
    if (el.tag === 'template') {
      el.slotScope = getAndRemoveAttr(el, 'scope');
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
        }
        if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if (process.env.NODE_ENV !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (process.env.NODE_ENV !== 'production') {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (process.env.NODE_ENV !== 'production' && map[attrs[i].name] && !isIE) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      walkThroughConditionsBlocks(node.ifConditions, isInFor);
    }
  }
}

function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
    markStaticRoots(conditionBlocks[i].block, isInFor);
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (events, native) {
  var res = native ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression
      ? handler.value
      : ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var alias = keyCodes[key];
  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  bind: bind$1,
  cloak: noop
};

/*  */

// configurable state
var warn$3;
var transforms$1;
var dataGenFns;
var platformDirectives$1;
var isPlatformReservedTag$1;
var staticRenderFns;
var onceCount;
var currentOptions;

function generate (
  ast,
  options
) {
  // save previous staticRenderFns so generate calls can be nested
  var prevStaticRenderFns = staticRenderFns;
  var currentStaticRenderFns = staticRenderFns = [];
  var prevOnceCount = onceCount;
  onceCount = 0;
  currentOptions = options;
  warn$3 = options.warn || baseWarn;
  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
  dataGenFns = pluckModuleFunction(options.modules, 'genData');
  platformDirectives$1 = options.directives || {};
  isPlatformReservedTag$1 = options.isReservedTag || no;
  var code = ast ? genElement(ast) : '_c("div")';
  staticRenderFns = prevStaticRenderFns;
  onceCount = prevOnceCount;
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: currentStaticRenderFns
  }
}

function genElement (el) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el)
  } else if (el.for && !el.forProcessed) {
    return genFor(el)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el);
    } else {
      var data = el.plain ? undefined : genData(el);

      var children = el.inlineTemplate ? null : genChildren(el, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < transforms$1.length; i++) {
      code = transforms$1[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el) {
  el.staticProcessed = true;
  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      process.env.NODE_ENV !== 'production' && warn$3(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el)
    }
    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
  } else {
    return genStatic(el)
  }
}

function genIf (el) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice())
}

function genIfConditions (conditions) {
  if (!conditions.length) {
    return '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return el.once ? genOnce(el) : genElement(el)
  }
}

function genFor (el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (
    process.env.NODE_ENV !== 'production' &&
    maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key
  ) {
    warn$3(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genElement(el)) +
    '})'
}

function genData (el) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < dataGenFns.length; i++) {
    data += dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true)) + ",";
  }
  // slot target
  if (el.slotTarget) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  return data
}

function genDirectives (el) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, warn$3);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el) {
  var ast = el.children[0];
  if (process.env.NODE_ENV !== 'production' && (
    el.children.length > 1 || ast.type !== 1
  )) {
    warn$3('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, currentOptions);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (slots) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "])")
}

function genScopedSlot (key, el) {
  return "[" + key + ",function(" + (String(el.attrsMap.scope)) + "){" +
    "return " + (el.tag === 'template'
      ? genChildren(el) || 'void 0'
      : genElement(el)) + "}]"
}

function genChildren (el, checkSkip) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
        el$1.for &&
        el$1.tag !== 'template' &&
        el$1.tag !== 'slot') {
      return genElement(el$1)
    }
    var normalizationType = checkSkip ? getNormalizationType(children) : 0;
    return ("[" + (children.map(genNode).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (children) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function maybeComponent (el) {
  return !isPlatformReservedTag$1(el.tag)
}

function genNode (node) {
  if (node.type === 1) {
    return genElement(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genSlot (el) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (componentName, el) {
  var children = el.inlineTemplate ? null : genChildren(el, true);
  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var keywordMatch = exp.replace(stripStringRE, '').match(unaryOperatorsRE);
  if (keywordMatch) {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
      );
    } else {
      errors.push(("invalid expression: " + (text.trim())));
    }
  }
}

/*  */

function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
}

function makeFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompiler (baseOptions) {
  var functionCompileCache = Object.create(null);

  function compile (
    template,
    options
  ) {
    var finalOptions = Object.create(baseOptions);
    var errors = [];
    var tips = [];
    finalOptions.warn = function (msg, tip$$1) {
      (tip$$1 ? tips : errors).push(msg);
    };

    if (options) {
      // merge custom modules
      if (options.modules) {
        finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
      }
      // merge custom directives
      if (options.directives) {
        finalOptions.directives = extend(
          Object.create(baseOptions.directives),
          options.directives
        );
      }
      // copy other options
      for (var key in options) {
        if (key !== 'modules' && key !== 'directives') {
          finalOptions[key] = options[key];
        }
      }
    }

    var compiled = baseCompile(template, finalOptions);
    if (process.env.NODE_ENV !== 'production') {
      errors.push.apply(errors, detectErrors(compiled.ast));
    }
    compiled.errors = errors;
    compiled.tips = tips;
    return compiled
  }

  function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = options || {};

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (functionCompileCache[key]) {
      return functionCompileCache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (process.env.NODE_ENV !== 'production') {
      if (compiled.errors && compiled.errors.length) {
        warn(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = makeFunction(compiled.render, fnGenErrors);
    var l = compiled.staticRenderFns.length;
    res.staticRenderFns = new Array(l);
    for (var i = 0; i < l; i++) {
      res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i], fnGenErrors);
    }

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (functionCompileCache[key] = res)
  }

  return {
    compile: compile,
    compileToFunctions: compileToFunctions
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (process.env.NODE_ENV !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData$1
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$2 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$2
};

var modules$1 = [
  klass$1,
  style$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        delimiters: options.delimiters
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(((this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

/* harmony default export */ __webpack_exports__["a"] = (Vue$3);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(16), __webpack_require__(19)))

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);




__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_JsonEditor__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_JsonEditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_JsonEditor__);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app',
  data: function data() {
    return {
      json: {
        'integer': 42,
        'float': 1.24,
        'string': 'foo',
        'array': ['one', 2, 'three'],
        'object': {
          'foo': 'bar'
        }
      }
    };
  },

  components: {
    JsonEditor: __WEBPACK_IMPORTED_MODULE_0__components_JsonEditor___default.a
  }
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('json-editor', {
    attrs: {
      "json": _vm.json
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-101181ff", module.exports)
  }
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("119c3de1", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-101181ff\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-101181ff\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 19 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);