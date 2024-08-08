"use strict";
(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[54],{

/***/ "+vjt":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "4jxT":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "Hf+z":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "NPdP":
/*!********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/framework7/dist/css/framework7.material.css ***!
  \********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../css-loader/dist/runtime/noSourceMaps.js */ "Hf+z");
/* harmony import */ var _css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../css-loader/dist/runtime/api.js */ "+vjt");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../css-loader/dist/runtime/getUrl.js */ "4jxT");
/* harmony import */ var _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23FFFFFF%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M15.5%2014h-.79l-.28-.27C15.41%2012.59%2016%2011.11%2016%209.5%2016%205.91%2013.09%203%209.5%203S3%205.91%203%209.5%205.91%2016%209.5%2016c1.61%200%203.09-.59%204.23-1.57l.27.28v.79l5%204.99L20.49%2019l-4.99-5zm-6%200C7.01%2014%205%2011.99%205%209.5S7.01%205%209.5%205%2014%207.01%2014%209.5%2011.99%2014%209.5%2014z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E */ "3xWu"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23fff%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E */ "plMv"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M20%2011H7.83l5.59-5.59L12%204l-8%208%208%208%201.41-1.41L7.83%2013H20v-2z%27%20fill%3D%27%23ffffff%27%2F%3E%3C%2Fsvg%3E */ "IgaC"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M12%204l-1.41%201.41L16.17%2011H4v2h12.17l-5.58%205.59L12%2020l8-8z%27%20fill%3D%27%23ffffff%27%2F%3E%3C%2Fsvg%3E */ "qm6x"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M3%2018h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z%27%20fill%3D%27%23ffffff%27%2F%3E%3C%2Fsvg%3E */ "+g/t"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23333%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Ccircle%20cx%3D%2712%27%20cy%3D%2712%27%20r%3D%273.2%27%2F%3E%3Cpath%20d%3D%27M9%202L7.17%204H4c-1.1%200-2%20.9-2%202v12c0%201.1.9%202%202%202h16c1.1%200%202-.9%202-2V6c0-1.1-.9-2-2-2h-3.17L15%202H9zm3%2015c-2.76%200-5-2.24-5-5s2.24-5%205-5%205%202.24%205%205-2.24%205-5%205z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E */ "PzTA"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(/*! ../img/i-f7-material.png */ "JizQ"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_7___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27%23ffffff%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M10%206L8.59%207.41%2013.17%2012l-4.58%204.59L10%2018l6-6z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E */ "psbF"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_8___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27%23ffffff%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M15.41%207.41L14%206l-6%206%206%206%201.41-1.41L10.83%2012z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E */ "J4mH"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_9___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23FFFFFF%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M19%2013h-6v6h-2v-6H5v-2h6V5h2v6h6v2z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E */ "neWK"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_10___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23FFFFFF%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E */ "tQub"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_11___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23000%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M12%202C6.47%202%202%206.47%202%2012s4.47%2010%2010%2010%2010-4.47%2010-10S17.53%202%2012%202zm5%2013.59L15.59%2017%2012%2013.41%208.41%2017%207%2015.59%2010.59%2012%207%208.41%208.41%207%2012%2010.59%2015.59%207%2017%208.41%2013.41%2012%2017%2015.59z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E */ "gqwj"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_12___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%270%200%2060%20120%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27m60%2061.5-38.25%2038.25-9.75-9.75%2029.25-28.5-29.25-28.5%209.75-9.75z%27%20fill%3D%27%23c7c7cc%27%2F%3E%3C%2Fsvg%3E */ "SSgV"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_13___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2018%2012%27%20fill%3D%27%23c7c7cc%27%3E%3Cpath%20d%3D%27M0%2C2V0h22v2H0z%27%2F%3E%3Cpath%20d%3D%27M0%2C7V5h22v2H0z%27%2F%3E%3Cpath%20d%3D%27M0%2C12v-2h22v2H0z%27%2F%3E%3C%2Fsvg%3E */ "Qp7Q"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_14___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27%23ffffff%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M9%2016.17L4.83%2012l-1.42%201.41L9%2019%2021%207l-1.41-1.41z%27%2F%3E%3C%2Fsvg%3E */ "oAr8"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_15___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%270%200%2060%20120%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27m60%2061.5-38.25%2038.25-9.75-9.75%2029.25-28.5-29.25-28.5%209.75-9.75z%27%20transform%3D%27translate%28115%2C%2030%29%20rotate%2890%29%27%20fill%3D%27%23c7c7cc%27%2F%3E%3C%2Fsvg%3E */ "rtTF"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_16___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%27-80%204%2024%2024%27%3E%3Cpath%20d%3D%27M-69%2C8v12.2l-5.6-5.6L-76%2C16l8%2C8l8-8l-1.4-1.4l-5.6%2C5.6V8H-69z%27%20fill%3D%27%238c8c8c%27%2F%3E%3C%2Fsvg%3E */ "zoZ3"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_17___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2027%2044%27%3E%3Cpath%20d%3D%27M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z%27%20fill%3D%27%23007aff%27%2F%3E%3C%2Fsvg%3E */ "8j/K"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_18___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2027%2044%27%3E%3Cpath%20d%3D%27M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z%27%20fill%3D%27%23007aff%27%2F%3E%3C%2Fsvg%3E */ "X9V4"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_19___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23000000%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M0%200h24v24H0V0z%27%20fill%3D%27none%27%2F%3E%3Cpath%20d%3D%27M20%2012l-1.41-1.41L13%2016.17V4h-2v12.17l-5.58-5.59L4%2012l8%208%208-8z%27%20fill%3D%27%23000000%27%2F%3E%3C%2Fsvg%3E */ "dg60"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_7___);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_8___);
var ___CSS_LOADER_URL_REPLACEMENT_9___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_9___);
var ___CSS_LOADER_URL_REPLACEMENT_10___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_10___);
var ___CSS_LOADER_URL_REPLACEMENT_11___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_11___);
var ___CSS_LOADER_URL_REPLACEMENT_12___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_12___);
var ___CSS_LOADER_URL_REPLACEMENT_13___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_13___);
var ___CSS_LOADER_URL_REPLACEMENT_14___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_14___);
var ___CSS_LOADER_URL_REPLACEMENT_15___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_15___);
var ___CSS_LOADER_URL_REPLACEMENT_16___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_16___);
var ___CSS_LOADER_URL_REPLACEMENT_17___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_17___);
var ___CSS_LOADER_URL_REPLACEMENT_18___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_18___);
var ___CSS_LOADER_URL_REPLACEMENT_19___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_19___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/**
 * Framework7 1.7.1
 * Full featured mobile HTML framework for building iOS & Android apps
 * 
 * Google Material Theme
 *
 * http://framework7.io/
 * 
 * Copyright 2018, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: April 7, 2018
 */
html,
body,
.framework7-root {
  position: relative;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
body {
  font-family: Roboto, Noto, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  color: #212121;
  font-size: 14px;
  line-height: 1.5;
  width: 100%;
  -webkit-text-size-adjust: 100%;
  background: #fff;
  overflow: hidden;
}
.framework7-root {
  overflow: hidden;
}
* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-touch-callout: none;
}
a,
input,
textarea,
select {
  outline: 0;
}
a {
  text-decoration: none;
  color: #2196f3;
}
p {
  margin: 1em 0;
}
/* === Grid === */
.row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-lines: multiple;
  -moz-box-lines: multiple;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: start;
  -ms-flex-align: start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
}
.row > [class*="col-"] {
  box-sizing: border-box;
}
.row .col-auto {
  width: 100%;
}
.row .col-100 {
  width: 100%;
  width: -webkit-calc((100% - 16px*0) / 1);
  width: calc((100% - 16px*0) / 1);
}
.row.no-gutter .col-100 {
  width: 100%;
}
.row .col-95 {
  width: 95%;
  width: -webkit-calc((100% - 16px*0.05263157894736836) / 1.0526315789473684);
  width: calc((100% - 16px*0.05263157894736836) / 1.0526315789473684);
}
.row.no-gutter .col-95 {
  width: 95%;
}
.row .col-90 {
  width: 90%;
  width: -webkit-calc((100% - 16px*0.11111111111111116) / 1.1111111111111112);
  width: calc((100% - 16px*0.11111111111111116) / 1.1111111111111112);
}
.row.no-gutter .col-90 {
  width: 90%;
}
.row .col-85 {
  width: 85%;
  width: -webkit-calc((100% - 16px*0.17647058823529416) / 1.1764705882352942);
  width: calc((100% - 16px*0.17647058823529416) / 1.1764705882352942);
}
.row.no-gutter .col-85 {
  width: 85%;
}
.row .col-80 {
  width: 80%;
  width: -webkit-calc((100% - 16px*0.25) / 1.25);
  width: calc((100% - 16px*0.25) / 1.25);
}
.row.no-gutter .col-80 {
  width: 80%;
}
.row .col-75 {
  width: 75%;
  width: -webkit-calc((100% - 16px*0.33333333333333326) / 1.3333333333333333);
  width: calc((100% - 16px*0.33333333333333326) / 1.3333333333333333);
}
.row.no-gutter .col-75 {
  width: 75%;
}
.row .col-70 {
  width: 70%;
  width: -webkit-calc((100% - 16px*0.4285714285714286) / 1.4285714285714286);
  width: calc((100% - 16px*0.4285714285714286) / 1.4285714285714286);
}
.row.no-gutter .col-70 {
  width: 70%;
}
.row .col-66 {
  width: 66.66666666666666%;
  width: -webkit-calc((100% - 16px*0.5000000000000002) / 1.5000000000000002);
  width: calc((100% - 16px*0.5000000000000002) / 1.5000000000000002);
}
.row.no-gutter .col-66 {
  width: 66.66666666666666%;
}
.row .col-65 {
  width: 65%;
  width: -webkit-calc((100% - 16px*0.5384615384615385) / 1.5384615384615385);
  width: calc((100% - 16px*0.5384615384615385) / 1.5384615384615385);
}
.row.no-gutter .col-65 {
  width: 65%;
}
.row .col-60 {
  width: 60%;
  width: -webkit-calc((100% - 16px*0.6666666666666667) / 1.6666666666666667);
  width: calc((100% - 16px*0.6666666666666667) / 1.6666666666666667);
}
.row.no-gutter .col-60 {
  width: 60%;
}
.row .col-55 {
  width: 55%;
  width: -webkit-calc((100% - 16px*0.8181818181818181) / 1.8181818181818181);
  width: calc((100% - 16px*0.8181818181818181) / 1.8181818181818181);
}
.row.no-gutter .col-55 {
  width: 55%;
}
.row .col-50 {
  width: 50%;
  width: -webkit-calc((100% - 16px*1) / 2);
  width: calc((100% - 16px*1) / 2);
}
.row.no-gutter .col-50 {
  width: 50%;
}
.row .col-45 {
  width: 45%;
  width: -webkit-calc((100% - 16px*1.2222222222222223) / 2.2222222222222223);
  width: calc((100% - 16px*1.2222222222222223) / 2.2222222222222223);
}
.row.no-gutter .col-45 {
  width: 45%;
}
.row .col-40 {
  width: 40%;
  width: -webkit-calc((100% - 16px*1.5) / 2.5);
  width: calc((100% - 16px*1.5) / 2.5);
}
.row.no-gutter .col-40 {
  width: 40%;
}
.row .col-35 {
  width: 35%;
  width: -webkit-calc((100% - 16px*1.8571428571428572) / 2.857142857142857);
  width: calc((100% - 16px*1.8571428571428572) / 2.857142857142857);
}
.row.no-gutter .col-35 {
  width: 35%;
}
.row .col-33 {
  width: 33.333333333333336%;
  width: -webkit-calc((100% - 16px*2) / 3);
  width: calc((100% - 16px*2) / 3);
}
.row.no-gutter .col-33 {
  width: 33.333333333333336%;
}
.row .col-30 {
  width: 30%;
  width: -webkit-calc((100% - 16px*2.3333333333333335) / 3.3333333333333335);
  width: calc((100% - 16px*2.3333333333333335) / 3.3333333333333335);
}
.row.no-gutter .col-30 {
  width: 30%;
}
.row .col-25 {
  width: 25%;
  width: -webkit-calc((100% - 16px*3) / 4);
  width: calc((100% - 16px*3) / 4);
}
.row.no-gutter .col-25 {
  width: 25%;
}
.row .col-20 {
  width: 20%;
  width: -webkit-calc((100% - 16px*4) / 5);
  width: calc((100% - 16px*4) / 5);
}
.row.no-gutter .col-20 {
  width: 20%;
}
.row .col-15 {
  width: 15%;
  width: -webkit-calc((100% - 16px*5.666666666666667) / 6.666666666666667);
  width: calc((100% - 16px*5.666666666666667) / 6.666666666666667);
}
.row.no-gutter .col-15 {
  width: 15%;
}
.row .col-10 {
  width: 10%;
  width: -webkit-calc((100% - 16px*9) / 10);
  width: calc((100% - 16px*9) / 10);
}
.row.no-gutter .col-10 {
  width: 10%;
}
.row .col-5 {
  width: 5%;
  width: -webkit-calc((100% - 16px*19) / 20);
  width: calc((100% - 16px*19) / 20);
}
.row.no-gutter .col-5 {
  width: 5%;
}
.row .col-auto:nth-last-child(1),
.row .col-auto:nth-last-child(1) ~ .col-auto {
  width: 100%;
  width: -webkit-calc((100% - 16px*0) / 1);
  width: calc((100% - 16px*0) / 1);
}
.row.no-gutter .col-auto:nth-last-child(1),
.row.no-gutter .col-auto:nth-last-child(1) ~ .col-auto {
  width: 100%;
}
.row .col-auto:nth-last-child(2),
.row .col-auto:nth-last-child(2) ~ .col-auto {
  width: 50%;
  width: -webkit-calc((100% - 16px*1) / 2);
  width: calc((100% - 16px*1) / 2);
}
.row.no-gutter .col-auto:nth-last-child(2),
.row.no-gutter .col-auto:nth-last-child(2) ~ .col-auto {
  width: 50%;
}
.row .col-auto:nth-last-child(3),
.row .col-auto:nth-last-child(3) ~ .col-auto {
  width: 33.33333333%;
  width: -webkit-calc((100% - 16px*2) / 3);
  width: calc((100% - 16px*2) / 3);
}
.row.no-gutter .col-auto:nth-last-child(3),
.row.no-gutter .col-auto:nth-last-child(3) ~ .col-auto {
  width: 33.33333333%;
}
.row .col-auto:nth-last-child(4),
.row .col-auto:nth-last-child(4) ~ .col-auto {
  width: 25%;
  width: -webkit-calc((100% - 16px*3) / 4);
  width: calc((100% - 16px*3) / 4);
}
.row.no-gutter .col-auto:nth-last-child(4),
.row.no-gutter .col-auto:nth-last-child(4) ~ .col-auto {
  width: 25%;
}
.row .col-auto:nth-last-child(5),
.row .col-auto:nth-last-child(5) ~ .col-auto {
  width: 20%;
  width: -webkit-calc((100% - 16px*4) / 5);
  width: calc((100% - 16px*4) / 5);
}
.row.no-gutter .col-auto:nth-last-child(5),
.row.no-gutter .col-auto:nth-last-child(5) ~ .col-auto {
  width: 20%;
}
.row .col-auto:nth-last-child(6),
.row .col-auto:nth-last-child(6) ~ .col-auto {
  width: 16.66666667%;
  width: -webkit-calc((100% - 16px*5) / 6);
  width: calc((100% - 16px*5) / 6);
}
.row.no-gutter .col-auto:nth-last-child(6),
.row.no-gutter .col-auto:nth-last-child(6) ~ .col-auto {
  width: 16.66666667%;
}
.row .col-auto:nth-last-child(7),
.row .col-auto:nth-last-child(7) ~ .col-auto {
  width: 14.28571429%;
  width: -webkit-calc((100% - 16px*6) / 7);
  width: calc((100% - 16px*6) / 7);
}
.row.no-gutter .col-auto:nth-last-child(7),
.row.no-gutter .col-auto:nth-last-child(7) ~ .col-auto {
  width: 14.28571429%;
}
.row .col-auto:nth-last-child(8),
.row .col-auto:nth-last-child(8) ~ .col-auto {
  width: 12.5%;
  width: -webkit-calc((100% - 16px*7) / 8);
  width: calc((100% - 16px*7) / 8);
}
.row.no-gutter .col-auto:nth-last-child(8),
.row.no-gutter .col-auto:nth-last-child(8) ~ .col-auto {
  width: 12.5%;
}
.row .col-auto:nth-last-child(9),
.row .col-auto:nth-last-child(9) ~ .col-auto {
  width: 11.11111111%;
  width: -webkit-calc((100% - 16px*8) / 9);
  width: calc((100% - 16px*8) / 9);
}
.row.no-gutter .col-auto:nth-last-child(9),
.row.no-gutter .col-auto:nth-last-child(9) ~ .col-auto {
  width: 11.11111111%;
}
.row .col-auto:nth-last-child(10),
.row .col-auto:nth-last-child(10) ~ .col-auto {
  width: 10%;
  width: -webkit-calc((100% - 16px*9) / 10);
  width: calc((100% - 16px*9) / 10);
}
.row.no-gutter .col-auto:nth-last-child(10),
.row.no-gutter .col-auto:nth-last-child(10) ~ .col-auto {
  width: 10%;
}
.row .col-auto:nth-last-child(11),
.row .col-auto:nth-last-child(11) ~ .col-auto {
  width: 9.09090909%;
  width: -webkit-calc((100% - 16px*10) / 11);
  width: calc((100% - 16px*10) / 11);
}
.row.no-gutter .col-auto:nth-last-child(11),
.row.no-gutter .col-auto:nth-last-child(11) ~ .col-auto {
  width: 9.09090909%;
}
.row .col-auto:nth-last-child(12),
.row .col-auto:nth-last-child(12) ~ .col-auto {
  width: 8.33333333%;
  width: -webkit-calc((100% - 16px*11) / 12);
  width: calc((100% - 16px*11) / 12);
}
.row.no-gutter .col-auto:nth-last-child(12),
.row.no-gutter .col-auto:nth-last-child(12) ~ .col-auto {
  width: 8.33333333%;
}
.row .col-auto:nth-last-child(13),
.row .col-auto:nth-last-child(13) ~ .col-auto {
  width: 7.69230769%;
  width: -webkit-calc((100% - 16px*12) / 13);
  width: calc((100% - 16px*12) / 13);
}
.row.no-gutter .col-auto:nth-last-child(13),
.row.no-gutter .col-auto:nth-last-child(13) ~ .col-auto {
  width: 7.69230769%;
}
.row .col-auto:nth-last-child(14),
.row .col-auto:nth-last-child(14) ~ .col-auto {
  width: 7.14285714%;
  width: -webkit-calc((100% - 16px*13) / 14);
  width: calc((100% - 16px*13) / 14);
}
.row.no-gutter .col-auto:nth-last-child(14),
.row.no-gutter .col-auto:nth-last-child(14) ~ .col-auto {
  width: 7.14285714%;
}
.row .col-auto:nth-last-child(15),
.row .col-auto:nth-last-child(15) ~ .col-auto {
  width: 6.66666667%;
  width: -webkit-calc((100% - 16px*14) / 15);
  width: calc((100% - 16px*14) / 15);
}
.row.no-gutter .col-auto:nth-last-child(15),
.row.no-gutter .col-auto:nth-last-child(15) ~ .col-auto {
  width: 6.66666667%;
}
.row .col-auto:nth-last-child(16),
.row .col-auto:nth-last-child(16) ~ .col-auto {
  width: 6.25%;
  width: -webkit-calc((100% - 16px*15) / 16);
  width: calc((100% - 16px*15) / 16);
}
.row.no-gutter .col-auto:nth-last-child(16),
.row.no-gutter .col-auto:nth-last-child(16) ~ .col-auto {
  width: 6.25%;
}
.row .col-auto:nth-last-child(17),
.row .col-auto:nth-last-child(17) ~ .col-auto {
  width: 5.88235294%;
  width: -webkit-calc((100% - 16px*16) / 17);
  width: calc((100% - 16px*16) / 17);
}
.row.no-gutter .col-auto:nth-last-child(17),
.row.no-gutter .col-auto:nth-last-child(17) ~ .col-auto {
  width: 5.88235294%;
}
.row .col-auto:nth-last-child(18),
.row .col-auto:nth-last-child(18) ~ .col-auto {
  width: 5.55555556%;
  width: -webkit-calc((100% - 16px*17) / 18);
  width: calc((100% - 16px*17) / 18);
}
.row.no-gutter .col-auto:nth-last-child(18),
.row.no-gutter .col-auto:nth-last-child(18) ~ .col-auto {
  width: 5.55555556%;
}
.row .col-auto:nth-last-child(19),
.row .col-auto:nth-last-child(19) ~ .col-auto {
  width: 5.26315789%;
  width: -webkit-calc((100% - 16px*18) / 19);
  width: calc((100% - 16px*18) / 19);
}
.row.no-gutter .col-auto:nth-last-child(19),
.row.no-gutter .col-auto:nth-last-child(19) ~ .col-auto {
  width: 5.26315789%;
}
.row .col-auto:nth-last-child(20),
.row .col-auto:nth-last-child(20) ~ .col-auto {
  width: 5%;
  width: -webkit-calc((100% - 16px*19) / 20);
  width: calc((100% - 16px*19) / 20);
}
.row.no-gutter .col-auto:nth-last-child(20),
.row.no-gutter .col-auto:nth-last-child(20) ~ .col-auto {
  width: 5%;
}
.row .col-auto:nth-last-child(21),
.row .col-auto:nth-last-child(21) ~ .col-auto {
  width: 4.76190476%;
  width: -webkit-calc((100% - 16px*20) / 21);
  width: calc((100% - 16px*20) / 21);
}
.row.no-gutter .col-auto:nth-last-child(21),
.row.no-gutter .col-auto:nth-last-child(21) ~ .col-auto {
  width: 4.76190476%;
}
@media all and (min-width: 768px) {
  .row .tablet-100 {
    width: 100%;
    width: -webkit-calc((100% - 16px*0) / 1);
    width: calc((100% - 16px*0) / 1);
  }
  .row.no-gutter .tablet-100 {
    width: 100%;
  }
  .row .tablet-95 {
    width: 95%;
    width: -webkit-calc((100% - 16px*0.05263157894736836) / 1.0526315789473684);
    width: calc((100% - 16px*0.05263157894736836) / 1.0526315789473684);
  }
  .row.no-gutter .tablet-95 {
    width: 95%;
  }
  .row .tablet-90 {
    width: 90%;
    width: -webkit-calc((100% - 16px*0.11111111111111116) / 1.1111111111111112);
    width: calc((100% - 16px*0.11111111111111116) / 1.1111111111111112);
  }
  .row.no-gutter .tablet-90 {
    width: 90%;
  }
  .row .tablet-85 {
    width: 85%;
    width: -webkit-calc((100% - 16px*0.17647058823529416) / 1.1764705882352942);
    width: calc((100% - 16px*0.17647058823529416) / 1.1764705882352942);
  }
  .row.no-gutter .tablet-85 {
    width: 85%;
  }
  .row .tablet-80 {
    width: 80%;
    width: -webkit-calc((100% - 16px*0.25) / 1.25);
    width: calc((100% - 16px*0.25) / 1.25);
  }
  .row.no-gutter .tablet-80 {
    width: 80%;
  }
  .row .tablet-75 {
    width: 75%;
    width: -webkit-calc((100% - 16px*0.33333333333333326) / 1.3333333333333333);
    width: calc((100% - 16px*0.33333333333333326) / 1.3333333333333333);
  }
  .row.no-gutter .tablet-75 {
    width: 75%;
  }
  .row .tablet-70 {
    width: 70%;
    width: -webkit-calc((100% - 16px*0.4285714285714286) / 1.4285714285714286);
    width: calc((100% - 16px*0.4285714285714286) / 1.4285714285714286);
  }
  .row.no-gutter .tablet-70 {
    width: 70%;
  }
  .row .tablet-66 {
    width: 66.66666666666666%;
    width: -webkit-calc((100% - 16px*0.5000000000000002) / 1.5000000000000002);
    width: calc((100% - 16px*0.5000000000000002) / 1.5000000000000002);
  }
  .row.no-gutter .tablet-66 {
    width: 66.66666666666666%;
  }
  .row .tablet-65 {
    width: 65%;
    width: -webkit-calc((100% - 16px*0.5384615384615385) / 1.5384615384615385);
    width: calc((100% - 16px*0.5384615384615385) / 1.5384615384615385);
  }
  .row.no-gutter .tablet-65 {
    width: 65%;
  }
  .row .tablet-60 {
    width: 60%;
    width: -webkit-calc((100% - 16px*0.6666666666666667) / 1.6666666666666667);
    width: calc((100% - 16px*0.6666666666666667) / 1.6666666666666667);
  }
  .row.no-gutter .tablet-60 {
    width: 60%;
  }
  .row .tablet-55 {
    width: 55%;
    width: -webkit-calc((100% - 16px*0.8181818181818181) / 1.8181818181818181);
    width: calc((100% - 16px*0.8181818181818181) / 1.8181818181818181);
  }
  .row.no-gutter .tablet-55 {
    width: 55%;
  }
  .row .tablet-50 {
    width: 50%;
    width: -webkit-calc((100% - 16px*1) / 2);
    width: calc((100% - 16px*1) / 2);
  }
  .row.no-gutter .tablet-50 {
    width: 50%;
  }
  .row .tablet-45 {
    width: 45%;
    width: -webkit-calc((100% - 16px*1.2222222222222223) / 2.2222222222222223);
    width: calc((100% - 16px*1.2222222222222223) / 2.2222222222222223);
  }
  .row.no-gutter .tablet-45 {
    width: 45%;
  }
  .row .tablet-40 {
    width: 40%;
    width: -webkit-calc((100% - 16px*1.5) / 2.5);
    width: calc((100% - 16px*1.5) / 2.5);
  }
  .row.no-gutter .tablet-40 {
    width: 40%;
  }
  .row .tablet-35 {
    width: 35%;
    width: -webkit-calc((100% - 16px*1.8571428571428572) / 2.857142857142857);
    width: calc((100% - 16px*1.8571428571428572) / 2.857142857142857);
  }
  .row.no-gutter .tablet-35 {
    width: 35%;
  }
  .row .tablet-33 {
    width: 33.333333333333336%;
    width: -webkit-calc((100% - 16px*2) / 3);
    width: calc((100% - 16px*2) / 3);
  }
  .row.no-gutter .tablet-33 {
    width: 33.333333333333336%;
  }
  .row .tablet-30 {
    width: 30%;
    width: -webkit-calc((100% - 16px*2.3333333333333335) / 3.3333333333333335);
    width: calc((100% - 16px*2.3333333333333335) / 3.3333333333333335);
  }
  .row.no-gutter .tablet-30 {
    width: 30%;
  }
  .row .tablet-25 {
    width: 25%;
    width: -webkit-calc((100% - 16px*3) / 4);
    width: calc((100% - 16px*3) / 4);
  }
  .row.no-gutter .tablet-25 {
    width: 25%;
  }
  .row .tablet-20 {
    width: 20%;
    width: -webkit-calc((100% - 16px*4) / 5);
    width: calc((100% - 16px*4) / 5);
  }
  .row.no-gutter .tablet-20 {
    width: 20%;
  }
  .row .tablet-15 {
    width: 15%;
    width: -webkit-calc((100% - 16px*5.666666666666667) / 6.666666666666667);
    width: calc((100% - 16px*5.666666666666667) / 6.666666666666667);
  }
  .row.no-gutter .tablet-15 {
    width: 15%;
  }
  .row .tablet-10 {
    width: 10%;
    width: -webkit-calc((100% - 16px*9) / 10);
    width: calc((100% - 16px*9) / 10);
  }
  .row.no-gutter .tablet-10 {
    width: 10%;
  }
  .row .tablet-5 {
    width: 5%;
    width: -webkit-calc((100% - 16px*19) / 20);
    width: calc((100% - 16px*19) / 20);
  }
  .row.no-gutter .tablet-5 {
    width: 5%;
  }
  .row .tablet-auto:nth-last-child(1),
  .row .tablet-auto:nth-last-child(1) ~ .col-auto {
    width: 100%;
    width: -webkit-calc((100% - 16px*0) / 1);
    width: calc((100% - 16px*0) / 1);
  }
  .row.no-gutter .tablet-auto:nth-last-child(1),
  .row.no-gutter .tablet-auto:nth-last-child(1) ~ .tablet-auto {
    width: 100%;
  }
  .row .tablet-auto:nth-last-child(2),
  .row .tablet-auto:nth-last-child(2) ~ .col-auto {
    width: 50%;
    width: -webkit-calc((100% - 16px*1) / 2);
    width: calc((100% - 16px*1) / 2);
  }
  .row.no-gutter .tablet-auto:nth-last-child(2),
  .row.no-gutter .tablet-auto:nth-last-child(2) ~ .tablet-auto {
    width: 50%;
  }
  .row .tablet-auto:nth-last-child(3),
  .row .tablet-auto:nth-last-child(3) ~ .col-auto {
    width: 33.33333333%;
    width: -webkit-calc((100% - 16px*2) / 3);
    width: calc((100% - 16px*2) / 3);
  }
  .row.no-gutter .tablet-auto:nth-last-child(3),
  .row.no-gutter .tablet-auto:nth-last-child(3) ~ .tablet-auto {
    width: 33.33333333%;
  }
  .row .tablet-auto:nth-last-child(4),
  .row .tablet-auto:nth-last-child(4) ~ .col-auto {
    width: 25%;
    width: -webkit-calc((100% - 16px*3) / 4);
    width: calc((100% - 16px*3) / 4);
  }
  .row.no-gutter .tablet-auto:nth-last-child(4),
  .row.no-gutter .tablet-auto:nth-last-child(4) ~ .tablet-auto {
    width: 25%;
  }
  .row .tablet-auto:nth-last-child(5),
  .row .tablet-auto:nth-last-child(5) ~ .col-auto {
    width: 20%;
    width: -webkit-calc((100% - 16px*4) / 5);
    width: calc((100% - 16px*4) / 5);
  }
  .row.no-gutter .tablet-auto:nth-last-child(5),
  .row.no-gutter .tablet-auto:nth-last-child(5) ~ .tablet-auto {
    width: 20%;
  }
  .row .tablet-auto:nth-last-child(6),
  .row .tablet-auto:nth-last-child(6) ~ .col-auto {
    width: 16.66666667%;
    width: -webkit-calc((100% - 16px*5) / 6);
    width: calc((100% - 16px*5) / 6);
  }
  .row.no-gutter .tablet-auto:nth-last-child(6),
  .row.no-gutter .tablet-auto:nth-last-child(6) ~ .tablet-auto {
    width: 16.66666667%;
  }
  .row .tablet-auto:nth-last-child(7),
  .row .tablet-auto:nth-last-child(7) ~ .col-auto {
    width: 14.28571429%;
    width: -webkit-calc((100% - 16px*6) / 7);
    width: calc((100% - 16px*6) / 7);
  }
  .row.no-gutter .tablet-auto:nth-last-child(7),
  .row.no-gutter .tablet-auto:nth-last-child(7) ~ .tablet-auto {
    width: 14.28571429%;
  }
  .row .tablet-auto:nth-last-child(8),
  .row .tablet-auto:nth-last-child(8) ~ .col-auto {
    width: 12.5%;
    width: -webkit-calc((100% - 16px*7) / 8);
    width: calc((100% - 16px*7) / 8);
  }
  .row.no-gutter .tablet-auto:nth-last-child(8),
  .row.no-gutter .tablet-auto:nth-last-child(8) ~ .tablet-auto {
    width: 12.5%;
  }
  .row .tablet-auto:nth-last-child(9),
  .row .tablet-auto:nth-last-child(9) ~ .col-auto {
    width: 11.11111111%;
    width: -webkit-calc((100% - 16px*8) / 9);
    width: calc((100% - 16px*8) / 9);
  }
  .row.no-gutter .tablet-auto:nth-last-child(9),
  .row.no-gutter .tablet-auto:nth-last-child(9) ~ .tablet-auto {
    width: 11.11111111%;
  }
  .row .tablet-auto:nth-last-child(10),
  .row .tablet-auto:nth-last-child(10) ~ .col-auto {
    width: 10%;
    width: -webkit-calc((100% - 16px*9) / 10);
    width: calc((100% - 16px*9) / 10);
  }
  .row.no-gutter .tablet-auto:nth-last-child(10),
  .row.no-gutter .tablet-auto:nth-last-child(10) ~ .tablet-auto {
    width: 10%;
  }
  .row .tablet-auto:nth-last-child(11),
  .row .tablet-auto:nth-last-child(11) ~ .col-auto {
    width: 9.09090909%;
    width: -webkit-calc((100% - 16px*10) / 11);
    width: calc((100% - 16px*10) / 11);
  }
  .row.no-gutter .tablet-auto:nth-last-child(11),
  .row.no-gutter .tablet-auto:nth-last-child(11) ~ .tablet-auto {
    width: 9.09090909%;
  }
  .row .tablet-auto:nth-last-child(12),
  .row .tablet-auto:nth-last-child(12) ~ .col-auto {
    width: 8.33333333%;
    width: -webkit-calc((100% - 16px*11) / 12);
    width: calc((100% - 16px*11) / 12);
  }
  .row.no-gutter .tablet-auto:nth-last-child(12),
  .row.no-gutter .tablet-auto:nth-last-child(12) ~ .tablet-auto {
    width: 8.33333333%;
  }
  .row .tablet-auto:nth-last-child(13),
  .row .tablet-auto:nth-last-child(13) ~ .col-auto {
    width: 7.69230769%;
    width: -webkit-calc((100% - 16px*12) / 13);
    width: calc((100% - 16px*12) / 13);
  }
  .row.no-gutter .tablet-auto:nth-last-child(13),
  .row.no-gutter .tablet-auto:nth-last-child(13) ~ .tablet-auto {
    width: 7.69230769%;
  }
  .row .tablet-auto:nth-last-child(14),
  .row .tablet-auto:nth-last-child(14) ~ .col-auto {
    width: 7.14285714%;
    width: -webkit-calc((100% - 16px*13) / 14);
    width: calc((100% - 16px*13) / 14);
  }
  .row.no-gutter .tablet-auto:nth-last-child(14),
  .row.no-gutter .tablet-auto:nth-last-child(14) ~ .tablet-auto {
    width: 7.14285714%;
  }
  .row .tablet-auto:nth-last-child(15),
  .row .tablet-auto:nth-last-child(15) ~ .col-auto {
    width: 6.66666667%;
    width: -webkit-calc((100% - 16px*14) / 15);
    width: calc((100% - 16px*14) / 15);
  }
  .row.no-gutter .tablet-auto:nth-last-child(15),
  .row.no-gutter .tablet-auto:nth-last-child(15) ~ .tablet-auto {
    width: 6.66666667%;
  }
  .row .tablet-auto:nth-last-child(16),
  .row .tablet-auto:nth-last-child(16) ~ .col-auto {
    width: 6.25%;
    width: -webkit-calc((100% - 16px*15) / 16);
    width: calc((100% - 16px*15) / 16);
  }
  .row.no-gutter .tablet-auto:nth-last-child(16),
  .row.no-gutter .tablet-auto:nth-last-child(16) ~ .tablet-auto {
    width: 6.25%;
  }
  .row .tablet-auto:nth-last-child(17),
  .row .tablet-auto:nth-last-child(17) ~ .col-auto {
    width: 5.88235294%;
    width: -webkit-calc((100% - 16px*16) / 17);
    width: calc((100% - 16px*16) / 17);
  }
  .row.no-gutter .tablet-auto:nth-last-child(17),
  .row.no-gutter .tablet-auto:nth-last-child(17) ~ .tablet-auto {
    width: 5.88235294%;
  }
  .row .tablet-auto:nth-last-child(18),
  .row .tablet-auto:nth-last-child(18) ~ .col-auto {
    width: 5.55555556%;
    width: -webkit-calc((100% - 16px*17) / 18);
    width: calc((100% - 16px*17) / 18);
  }
  .row.no-gutter .tablet-auto:nth-last-child(18),
  .row.no-gutter .tablet-auto:nth-last-child(18) ~ .tablet-auto {
    width: 5.55555556%;
  }
  .row .tablet-auto:nth-last-child(19),
  .row .tablet-auto:nth-last-child(19) ~ .col-auto {
    width: 5.26315789%;
    width: -webkit-calc((100% - 16px*18) / 19);
    width: calc((100% - 16px*18) / 19);
  }
  .row.no-gutter .tablet-auto:nth-last-child(19),
  .row.no-gutter .tablet-auto:nth-last-child(19) ~ .tablet-auto {
    width: 5.26315789%;
  }
  .row .tablet-auto:nth-last-child(20),
  .row .tablet-auto:nth-last-child(20) ~ .col-auto {
    width: 5%;
    width: -webkit-calc((100% - 16px*19) / 20);
    width: calc((100% - 16px*19) / 20);
  }
  .row.no-gutter .tablet-auto:nth-last-child(20),
  .row.no-gutter .tablet-auto:nth-last-child(20) ~ .tablet-auto {
    width: 5%;
  }
  .row .tablet-auto:nth-last-child(21),
  .row .tablet-auto:nth-last-child(21) ~ .col-auto {
    width: 4.76190476%;
    width: -webkit-calc((100% - 16px*20) / 21);
    width: calc((100% - 16px*20) / 21);
  }
  .row.no-gutter .tablet-auto:nth-last-child(21),
  .row.no-gutter .tablet-auto:nth-last-child(21) ~ .tablet-auto {
    width: 4.76190476%;
  }
}
/* === Views === */
.views,
.view {
  position: relative;
  height: 100%;
  z-index: 5000;
}
.views {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.view {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
/* === Pages === */
.pages {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.page {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.page.cached {
  display: none;
}
.page-on-left {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.page-on-right {
  opacity: 0;
  pointer-events: none;
  -webkit-transform: translate3d(0, 56px, 0);
  transform: translate3d(0, 56px, 0);
}
.page-content {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  height: 100%;
  position: relative;
  z-index: 1;
}
.page-transitioning {
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.page-from-right-to-center {
  pointer-events: none;
  -webkit-animation: pageFromRightToCenter 300ms forwards;
  animation: pageFromRightToCenter 300ms forwards;
}
.page-from-center-to-right {
  pointer-events: none;
  -webkit-animation: pageFromCenterToRight 300ms forwards;
  animation: pageFromCenterToRight 300ms forwards;
}
@-webkit-keyframes pageFromRightToCenter {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 56px, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
  }
}
@keyframes pageFromRightToCenter {
  from {
    opacity: 0;
    transform: translate3d(0, 56px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@-webkit-keyframes pageFromCenterToRight {
  from {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
  }
  to {
    opacity: 0;
    -webkit-transform: translate3d(0, 56px, 0);
  }
}
@keyframes pageFromCenterToRight {
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, 56px, 0);
  }
}
.page-from-center-to-left {
  -webkit-animation: pageFromCenterToLeft 300ms forwards;
  animation: pageFromCenterToLeft 300ms forwards;
}
.page-from-left-to-center {
  -webkit-animation: pageFromLeftToCenter 300ms forwards;
  animation: pageFromLeftToCenter 300ms forwards;
}
@-webkit-keyframes pageFromCenterToLeft {
  from {
    opacity: 1;
  }
  to {
    opacity: 1;
  }
}
@keyframes pageFromCenterToLeft {
  from {
    opacity: 1;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes pageFromLeftToCenter {
  from {
    opacity: 1;
  }
  to {
    opacity: 1;
  }
}
@keyframes pageFromLeftToCenter {
  from {
    opacity: 1;
  }
  to {
    opacity: 1;
  }
}
/* === Toolbars === */
.navbar-inner,
.toolbar-inner {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.navbar-inner {
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
}
.toolbar-inner {
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.navbar-inner.cached {
  display: none;
}
.navbar,
.toolbar {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  margin: 0;
  z-index: 500;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  color: #fff;
}
.navbar b,
.toolbar b {
  font-weight: 500;
}
.navbar ~ .toolbar {
  z-index: 499;
}
.navbar,
.toolbar,
.subnavbar {
  background: #2196f3;
}
.navbar a.link,
.toolbar a.link,
.subnavbar a.link {
  text-decoration: none;
  position: relative;
  color: #fff;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 0 16px;
  min-width: 48px;
}
.navbar a.link:before,
.toolbar a.link:before,
.subnavbar a.link:before {
  content: '';
  width: 152%;
  height: 152%;
  position: absolute;
  left: -26%;
  top: -26%;
  background-image: -webkit-radial-gradient(center, circle cover, rgba(255, 255, 255, 0.15) 66%, rgba(255, 255, 255, 0) 66%);
  background-image: radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 66%, rgba(255, 255, 255, 0) 66%);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  opacity: 0;
  pointer-events: none;
  -webkit-transition-duration: 600ms;
  transition-duration: 600ms;
}
html:not(.watch-active-state) .navbar a.link:active:before,
html:not(.watch-active-state) .toolbar a.link:active:before,
html:not(.watch-active-state) .subnavbar a.link:active:before,
.navbar a.link.active-state:before,
.toolbar a.link.active-state:before,
.subnavbar a.link.active-state:before {
  opacity: 1;
  -webkit-transition-duration: 150ms;
  transition-duration: 150ms;
}
.navbar a.link i + span,
.toolbar a.link i + span,
.subnavbar a.link i + span,
.navbar a.link i + i,
.toolbar a.link i + i,
.subnavbar a.link i + i,
.navbar a.link span + i,
.toolbar a.link span + i,
.subnavbar a.link span + i,
.navbar a.link span + span,
.toolbar a.link span + span,
.subnavbar a.link span + span {
  margin-left: 8px;
}
.navbar a.icon-only,
.toolbar a.icon-only,
.subnavbar a.icon-only {
  min-width: 0;
  -webkit-box-flex: 0;
  -webkit-flex-shrink: 0;
  -ms-flex: 0 0 auto;
  flex-shrink: 0;
}
.navbar i.icon,
.toolbar i.icon,
.subnavbar i.icon {
  display: block;
}
.navbar .center,
.subnavbar .center {
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  margin: 0 16px;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 56px;
  display: inline-block;
  text-align: left;
}
.navbar .left,
.subnavbar .left,
.navbar .right,
.subnavbar .right {
  -webkit-box-flex: 0;
  -webkit-flex-shrink: 0;
  -ms-flex: 0 0 auto;
  flex-shrink: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.navbar .right,
.subnavbar .right {
  margin-left: auto;
}
.navbar .right:first-child,
.subnavbar .right:first-child {
  position: absolute;
  right: 16px;
  height: 100%;
}
.navbar {
  left: 0;
  top: 0;
  height: 56px;
  font-size: 20px;
}
.navbar a.link {
  line-height: 56px;
  height: 56px;
}
.popup .navbar {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.subnavbar {
  height: 48px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 100%;
  z-index: 20;
  box-sizing: border-box;
  padding: 0 16px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  overflow: hidden;
}
.subnavbar a.link {
  line-height: 48px;
  height: 48px;
}
.subnavbar .center {
  line-height: 48px;
}
.subnavbar .center:first-child {
  margin-left: 56px;
}
.navbar.no-border .subnavbar {
  margin-top: 0;
}
.navbar-on-left .subnavbar,
.navbar-on-right .subnavbar {
  pointer-events: none;
}
.navbar .subnavbar,
.page .subnavbar {
  position: absolute;
}
.page > .subnavbar {
  top: 0;
  margin-top: 0;
}
.subnavbar > .buttons-row {
  width: 100%;
}
.subnavbar .searchbar,
.subnavbar.searchbar {
  position: absolute;
}
.subnavbar.searchbar,
.subnavbar .searchbar {
  position: absolute;
}
.subnavbar .searchbar {
  left: 0;
  top: 0;
}
.toolbar {
  left: 0;
  bottom: 0;
  height: 48px;
  font-size: 14px;
}
.toolbar a.link {
  line-height: 48px;
  height: 48px;
}
.toolbar a {
  -webkit-box-flex: 1;
  -webkit-flex-shrink: 1;
  -ms-flex: 0 1 auto;
  flex-shrink: 1;
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tabbar {
  z-index: 5001;
  overflow: hidden;
  bottom: auto;
  top: 0;
}
.tabbar .toolbar-inner {
  padding-left: 0;
  padding-right: 0;
}
.tabbar a.link {
  line-height: 1.4;
}
.tabbar a.tab-link,
.tabbar a.link {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding-left: 0;
  padding-right: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -ms-flex: 1;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
  font-size: 14px;
  text-transform: uppercase;
}
.tabbar i.icon {
  height: 24px;
}
.tabbar a.tab-link {
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.7);
  position: relative;
}
.tabbar a.tab-link.active,
html:not(.watch-active-state) .tabbar a.tab-link:active,
.tabbar a.tab-link.active-state {
  color: #ffffff;
}
.tabbar .tab-link-highlight {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  background: #0a6ebd;
  background: rgba(255, 255, 255, 0.5);
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.tabbar-labels {
  height: 72px;
}
.tabbar-labels a.tab-link,
.tabbar-labels a.link {
  padding-top: 12px;
  padding-bottom: 12px;
  height: 100%;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.tabbar-labels span.tabbar-label {
  line-height: 1;
  display: block;
  margin: 0;
  margin-top: 10px;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
}
.tabbar-labels.toolbar-bottom span.tabbar-label {
  text-transform: none;
}
.tabbar-scrollable .toolbar-inner {
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
  overflow: auto;
}
.tabbar-scrollable .toolbar-inner::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  opacity: 0 !important;
}
.tabbar-scrollable a.tab-link,
.tabbar-scrollable a.link {
  width: auto;
  -webkit-box-flex: 0;
  -webkit-flex-shrink: 0;
  -ms-flex: 0 0 auto;
  flex-shrink: 0;
  -ms-flex: 0;
  padding: 0 16px;
}
.toolbar-bottom {
  bottom: 0;
  top: auto;
}
.toolbar-bottom .tab-link-highlight {
  bottom: auto;
  top: 0;
}
.subnavbar input[type="text"],
.navbar input[type="text"],
.subnavbar input[type="password"],
.navbar input[type="password"],
.subnavbar input[type="search"],
.navbar input[type="search"],
.subnavbar input[type="email"],
.navbar input[type="email"],
.subnavbar input[type="tel"],
.navbar input[type="tel"],
.subnavbar input[type="url"],
.navbar input[type="url"] {
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  display: block;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  border-radius: 0;
  font-family: inherit;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  background-color: transparent;
  padding: 0;
  border-bottom: 1px solid #fff;
}
.subnavbar input[type="text"]::-webkit-input-placeholder,
.navbar input[type="text"]::-webkit-input-placeholder,
.subnavbar input[type="password"]::-webkit-input-placeholder,
.navbar input[type="password"]::-webkit-input-placeholder,
.subnavbar input[type="search"]::-webkit-input-placeholder,
.navbar input[type="search"]::-webkit-input-placeholder,
.subnavbar input[type="email"]::-webkit-input-placeholder,
.navbar input[type="email"]::-webkit-input-placeholder,
.subnavbar input[type="tel"]::-webkit-input-placeholder,
.navbar input[type="tel"]::-webkit-input-placeholder,
.subnavbar input[type="url"]::-webkit-input-placeholder,
.navbar input[type="url"]::-webkit-input-placeholder {
  color: #ffffff;
  opacity: 1;
}
/* === Relation between toolbar/navbar types and pages === */
.page > .navbar,
.view > .navbar,
.views > .navbar,
.page > .toolbar,
.view > .toolbar,
.views > .toolbar {
  position: absolute;
}
.subnavbar ~ .page-content {
  padding-top: 48px;
}
.toolbar-fixed .page-content,
.tabbar-fixed .page-content {
  padding-top: 48px;
}
.tabbar-labels-fixed .page-content {
  padding-top: 72px;
}
.toolbar ~ .page-content {
  padding-top: 48px;
}
.tabbar-labels ~ .page-content {
  padding-top: 72px;
}
.toolbar-bottom ~ .page-content,
.messagebar ~ .page-content,
.toolbar-bottom ~ .pages .page-content,
.messagebar ~ .pages .page-content,
.toolbar-bottom ~ .view .page-content,
.messagebar ~ .view .page-content {
  padding-top: 0;
  padding-bottom: 48px;
}
.tabbar-labels.toolbar-bottom ~ .page-content,
.tabbar-labels.toolbar-bottom ~ .pages .page-content,
.tabbar-labels.toolbar-bottom ~ .page .page-content,
.tabbar-labels.toolbar-bottom ~ .view .page-content {
  padding-bottom: 72px;
}
.navbar-fixed .page-content,
.navbar-through .page-content,
.navbar-fixed.pages .page-content,
.navbar-through.pages .page-content,
.navbar-fixed.view .page-content,
.navbar-through.view .page-content {
  padding-top: 56px;
}
.navbar-fixed.toolbar-fixed .page-content,
.navbar-through.toolbar-fixed .page-content,
.navbar-fixed.tabbar-fixed .page-content,
.navbar-through.tabbar-fixed .page-content,
.navbar-fixed .toolbar-fixed .page-content,
.navbar-through .toolbar-fixed .page-content,
.navbar-fixed .tabbar-fixed .page-content,
.navbar-through .tabbar-fixed .page-content,
.toolbar-fixed .navbar-fixed .page-content,
.toolbar-fixed .navbar-through .page-content,
.tabbar-fixed .navbar-fixed .page-content,
.tabbar-fixed .navbar-through .page-content {
  padding-top: 104px;
}
.navbar-fixed.toolbar-fixed .toolbar-bottom ~ .pages .page-content,
.navbar-through.toolbar-fixed .toolbar-bottom ~ .pages .page-content,
.navbar-fixed.tabbar-fixed .toolbar-bottom ~ .pages .page-content,
.navbar-through.tabbar-fixed .toolbar-bottom ~ .pages .page-content,
.navbar-fixed .toolbar-fixed .toolbar-bottom ~ .pages .page-content,
.navbar-through .toolbar-fixed .toolbar-bottom ~ .pages .page-content,
.navbar-fixed .tabbar-fixed .toolbar-bottom ~ .pages .page-content,
.navbar-through .tabbar-fixed .toolbar-bottom ~ .pages .page-content,
.toolbar-fixed .navbar-fixed .toolbar-bottom ~ .pages .page-content,
.toolbar-fixed .navbar-through .toolbar-bottom ~ .pages .page-content,
.tabbar-fixed .navbar-fixed .toolbar-bottom ~ .pages .page-content,
.tabbar-fixed .navbar-through .toolbar-bottom ~ .pages .page-content,
.navbar-fixed.toolbar-fixed .toolbar-bottom ~ .view .page-content,
.navbar-through.toolbar-fixed .toolbar-bottom ~ .view .page-content,
.navbar-fixed.tabbar-fixed .toolbar-bottom ~ .view .page-content,
.navbar-through.tabbar-fixed .toolbar-bottom ~ .view .page-content,
.navbar-fixed .toolbar-fixed .toolbar-bottom ~ .view .page-content,
.navbar-through .toolbar-fixed .toolbar-bottom ~ .view .page-content,
.navbar-fixed .tabbar-fixed .toolbar-bottom ~ .view .page-content,
.navbar-through .tabbar-fixed .toolbar-bottom ~ .view .page-content,
.toolbar-fixed .navbar-fixed .toolbar-bottom ~ .view .page-content,
.toolbar-fixed .navbar-through .toolbar-bottom ~ .view .page-content,
.tabbar-fixed .navbar-fixed .toolbar-bottom ~ .view .page-content,
.tabbar-fixed .navbar-through .toolbar-bottom ~ .view .page-content {
  padding-top: 56px;
}
.navbar-fixed.tabbar-labels-fixed .page-content,
.navbar-through.tabbar-labels-fixed .page-content,
.navbar-fixed .tabbar-labels-fixed .page-content,
.navbar-through .tabbar-labels-fixed .page-content,
.tabbar-labels-fixed .navbar-fixed .page-content,
.tabbar-labels-fixed .navbar-through .page-content {
  padding-top: 128px;
}
.navbar-fixed.tabbar-labels-fixed .toolbar-bottom ~ .pages .page-content,
.navbar-through.tabbar-labels-fixed .toolbar-bottom ~ .pages .page-content,
.navbar-fixed .tabbar-labels-fixed .toolbar-bottom ~ .pages .page-content,
.navbar-through .tabbar-labels-fixed .toolbar-bottom ~ .pages .page-content,
.tabbar-labels-fixed .navbar-fixed .toolbar-bottom ~ .pages .page-content,
.tabbar-labels-fixed .navbar-through .toolbar-bottom ~ .pages .page-content,
.navbar-fixed.tabbar-labels-fixed .toolbar-bottom ~ .view .page-content,
.navbar-through.tabbar-labels-fixed .toolbar-bottom ~ .view .page-content,
.navbar-fixed .tabbar-labels-fixed .toolbar-bottom ~ .view .page-content,
.navbar-through .tabbar-labels-fixed .toolbar-bottom ~ .view .page-content,
.tabbar-labels-fixed .navbar-fixed .toolbar-bottom ~ .view .page-content,
.tabbar-labels-fixed .navbar-through .toolbar-bottom ~ .view .page-content {
  padding-top: 56px;
}
.navbar-fixed .toolbar ~ .page-content,
.navbar-through .toolbar ~ .page-content {
  padding-top: 104px;
}
.navbar-fixed .messagebar ~ .page-content,
.navbar-through .messagebar ~ .page-content,
.navbar-fixed .toolbar-bottom ~ .page-content,
.navbar-through .toolbar-bottom ~ .page-content {
  padding-top: 56px;
}
.navbar-fixed .tabbar-labels ~ .page-content,
.navbar-through .tabbar-labels ~ .page-content {
  padding-top: 128px;
}
.navbar-fixed .tabbar-labels.toolbar-bottom ~ .page-content,
.navbar-through .tabbar-labels.toolbar-bottom ~ .page-content {
  padding-top: 56px;
}
.navbar-fixed .with-subnavbar .page-content,
.navbar-through .with-subnavbar .page-content,
.navbar-fixed .page-content.with-subnavbar,
.navbar-through .page-content.with-subnavbar,
.navbar-fixed .subnavbar ~ .page-content,
.navbar-through .subnavbar ~ .page-content {
  padding-top: 104px;
}
.navbar-fixed .page .subnavbar,
.navbar-through .page .subnavbar,
.navbar-fixed.page .subnavbar,
.navbar-through.page .subnavbar {
  top: 56px;
}
.navbar-fixed .toolbar,
.navbar-through .toolbar {
  top: 56px;
}
.navbar-fixed .messagebar,
.navbar-through .messagebar,
.navbar-fixed .toolbar-bottom,
.navbar-through .toolbar-bottom {
  top: auto;
}
.navbar.navbar-hiding {
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.navbar.navbar-hiding ~ .page-content .list-group-title,
.navbar.navbar-hiding ~ .pages .list-group-title,
.navbar.navbar-hiding ~ .page .list-group-title {
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
}
.navbar.navbar-hiding ~ .page-content .subnavbar,
.navbar.navbar-hiding ~ .pages .subnavbar,
.navbar.navbar-hiding ~ .page .subnavbar {
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
}
.navbar.navbar-hiding ~ .subnavbar,
.navbar.navbar-hiding ~ .toolbar {
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
}
.navbar.navbar-hidden {
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
  -webkit-transform: translate3d(0, -100%, 0);
  transform: translate3d(0, -100%, 0);
}
.navbar.navbar-hidden ~ .page-content .list-group-title,
.navbar.navbar-hidden ~ .pages .list-group-title,
.navbar.navbar-hidden ~ .page .list-group-title {
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
  top: -56px;
}
.navbar.navbar-hidden ~ .page-content .subnavbar,
.navbar.navbar-hidden ~ .pages .subnavbar,
.navbar.navbar-hidden ~ .page .subnavbar {
  -webkit-transform: translate3d(0, -56px, 0);
  transform: translate3d(0, -56px, 0);
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
}
.navbar.navbar-hidden ~ .subnavbar,
.navbar.navbar-hidden ~ .toolbar:not(.messagebar):not(.toolbar-bottom) {
  -webkit-transform: translate3d(0, -56px, 0);
  transform: translate3d(0, -56px, 0);
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
}
.navbar.not-animated {
  -webkit-transition-duration: 0ms;
  transition-duration: 0ms;
}
.page.no-navbar .page-content {
  padding-top: 0;
}
.page.no-navbar.with-subnavbar .page-content,
.with-subnavbar .page.no-navbar .page-content,
.page.no-navbar .page-content.with-subnavbar {
  padding-top: 48px;
}
.toolbar.toolbar-hiding,
.tabbar.toolbar-hiding,
.toolbar.tabbar-hiding,
.tabbar.tabbar-hiding {
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.toolbar.toolbar-hidden,
.tabbar.toolbar-hidden,
.toolbar.tabbar-hidden,
.tabbar.tabbar-hidden {
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
}
.toolbar.not-animated,
.tabbar.not-animated {
  -webkit-transition-duration: 0ms;
  transition-duration: 0ms;
}
.toolbar.toolbar-hidden,
.tabbar.toolbar-hidden,
.toolbar.tabbar-hidden,
.tabbar.tabbar-hidden {
  -webkit-transform: translate3d(0, -100%, 0);
  transform: translate3d(0, -100%, 0);
}
.navbar ~ .toolbar.toolbar-hidden:not(.messagebar):not(.toolbar-bottom),
.navbar ~ .tabbar.toolbar-hidden:not(.messagebar):not(.toolbar-bottom),
.navbar ~ .toolbar.tabbar-hidden,
.navbar ~ .tabbar.tabbar-hidden {
  -webkit-transform: translate3d(0, -104px, 0);
  transform: translate3d(0, -104px, 0);
}
.navbar ~ .toolbar.tabbar-labels.toolbar-hidden,
.navbar ~ .tabbar.tabbar-labels.toolbar-hidden {
  -webkit-transform: translate3d(0, -128px, 0);
  transform: translate3d(0, -128px, 0);
}
.toolbar.toolbar-hidden.messagebar,
.tabbar.toolbar-hidden.messagebar,
.toolbar.toolbar-hidden.toolbar-bottom,
.tabbar.toolbar-hidden.toolbar-bottom {
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}
.page.no-toolbar .page-content,
.page.no-tabbar .page-content {
  padding-bottom: 0;
}
.navbar.no-shadow,
.toolbar.no-shadow {
  box-shadow: none !important;
}
.navbar-fixed .subnavbar,
.navbar-through .subnavbar {
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2), 0px 4px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 1px 0px rgba(0, 0, 0, 0.12);
}
.navbar-fixed .navbar,
.navbar-through .navbar {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
.navbar-fixed .navbar.navbar-hidden,
.navbar-through .navbar.navbar-hidden {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0), 0px 4px 5px 0px rgba(0, 0, 0, 0), 0px 1px 10px 0px rgba(0, 0, 0, 0) !important;
}
.toolbar-fixed .toolbar,
.tabbar-fixed .toolbar,
.tabbar-labels-fixed .toolbar {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
.toolbar-fixed .toolbar.toolbar-hidden,
.tabbar-fixed .toolbar.toolbar-hidden,
.tabbar-labels-fixed .toolbar.toolbar-hidden {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0), 0px 4px 5px 0px rgba(0, 0, 0, 0), 0px 1px 10px 0px rgba(0, 0, 0, 0) !important;
}
.toolbar-fixed .toolbar-bottom,
.tabbar-fixed .toolbar-bottom,
.tabbar-labels-fixed .toolbar-bottom,
.toolbar-bottom {
  box-shadow: 0px -2px 4px -1px rgba(0, 0, 0, 0.2), 0px -4px 5px 0px rgba(0, 0, 0, 0.14), 0px -1px 10px 0px rgba(0, 0, 0, 0.12);
}
.toolbar-bottom.toolbar-hidden {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0), 0px 4px 5px 0px rgba(0, 0, 0, 0), 0px 1px 10px 0px rgba(0, 0, 0, 0) !important;
}
.navbar-fixed.toolbar-fixed .navbar,
.navbar-through.toolbar-fixed .navbar,
.navbar-fixed .toolbar-fixed .navbar,
.navbar-through .toolbar-fixed .navbar,
.navbar-fixed.tabbar-fixed .navbar,
.navbar-through.tabbar-fixed .navbar,
.navbar-fixed .tabbar-fixed .navbar,
.navbar-through .tabbar-fixed .navbar,
.navbar-fixed.tabbar-labels-fixed .navbar,
.navbar-through.tabbar-labels-fixed .navbar,
.navbar-fixed .tabbar-labels-fixed .navbar,
.navbar-through .tabbar-labels-fixed .navbar {
  box-shadow: none;
}
/* === Search Bar === */
.searchbar {
  height: 48px;
  width: 100%;
  background: #2196f3;
  box-sizing: border-box;
  padding: 0 16px;
  overflow: hidden;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  color: #fff;
}
.searchbar.no-shadow {
  box-shadow: none;
}
.searchbar a {
  position: relative;
  color: #fff;
}
.searchbar a:before {
  content: '';
  width: 152%;
  height: 152%;
  position: absolute;
  left: -26%;
  top: -26%;
  background-image: -webkit-radial-gradient(center, circle cover, rgba(255, 255, 255, 0.15) 66%, rgba(255, 255, 255, 0) 66%);
  background-image: radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 66%, rgba(255, 255, 255, 0) 66%);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  opacity: 0;
  pointer-events: none;
  -webkit-transition-duration: 600ms;
  transition-duration: 600ms;
}
html:not(.watch-active-state) .searchbar a:active:before,
.searchbar a.active-state:before {
  opacity: 1;
  -webkit-transition-duration: 150ms;
  transition-duration: 150ms;
}
.searchbar .searchbar-input {
  width: 100%;
  height: 32px;
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex-shrink: 1;
  -ms-flex: 0 1 auto;
  flex-shrink: 1;
}
.searchbar input[type="search"] {
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  display: block;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  border-radius: 0;
  font-family: inherit;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  padding: 0;
  border-bottom: 1px solid #fff;
  height: 100%;
  padding: 0 36px 0 24px;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: 0 center;
  opacity: 0.6;
  -webkit-background-size: 24px 24px;
  background-size: 24px 24px;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
}
.searchbar input[type="search"]::-webkit-input-placeholder {
  color: #ffffff;
  opacity: 1;
}
.searchbar input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
}
.searchbar .searchbar-clear {
  position: absolute;
  width: 56px;
  height: 100%;
  right: -16px;
  top: 0;
  opacity: 0;
  pointer-events: none;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_1___});
  -webkit-background-size: 24px 24px;
  background-size: 24px 24px;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  cursor: pointer;
}
.searchbar .searchbar-cancel {
  display: none;
}
.searchbar.searchbar-active input[type="search"] {
  opacity: 1;
}
.searchbar.searchbar-active .searchbar-clear {
  pointer-events: auto;
  opacity: 1;
}
.searchbar.searchbar-not-empty .searchbar-clear {
  pointer-events: auto;
  opacity: 1;
}
.searchbar-overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  opacity: 0;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.25);
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.searchbar-overlay.searchbar-overlay-active {
  opacity: 1;
  pointer-events: auto;
}
.searchbar-not-found {
  display: none;
}
.hidden-by-searchbar,
.list-block .hidden-by-searchbar,
.list-block li.hidden-by-searchbar {
  display: none;
}
.page > .searchbar {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 200;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
.page > .searchbar ~ .page-content {
  padding-top: 48px;
}
.page > .searchbar.no-shadow {
  box-shadow: none;
}
.navbar-fixed .page > .searchbar,
.navbar-through .page > .searchbar,
.navbar-fixed > .searchbar,
.navbar-through > .searchbar {
  top: 56px;
}
.navbar-fixed .page > .searchbar ~ .page-content,
.navbar-through .page > .searchbar ~ .page-content,
.navbar-fixed > .searchbar ~ .page-content,
.navbar-through > .searchbar ~ .page-content {
  padding-top: 104px;
}
/* === Message Bar === */
.toolbar.messagebar {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  background: #fff;
  height: 48px;
  top: auto;
  bottom: 0;
  font-size: 16px;
  overflow: hidden;
}
.toolbar.messagebar:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: auto;
  right: auto;
  height: 1px;
  width: 100%;
  background-color: #d1d1d1;
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 0%;
  transform-origin: 50% 0%;
}
html.pixel-ratio-2 .toolbar.messagebar:before {
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
html.pixel-ratio-3 .toolbar.messagebar:before {
  -webkit-transform: scaleY(0.33);
  transform: scaleY(0.33);
}
.toolbar.messagebar textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: none;
  background: none;
  border-radius: 0;
  box-shadow: none;
  display: block;
  padding: 3px 8px 3px;
  margin: 0;
  width: 100%;
  height: 28px;
  color: #333;
  font-size: 16px;
  line-height: 22px;
  font-family: inherit;
  resize: none;
  -webkit-box-flex: 1;
  -webkit-flex-shrink: 1;
  -ms-flex: 0 1 auto;
  flex-shrink: 1;
}
.toolbar.messagebar a.link {
  color: #333;
  -ms-flex-item-align: flex-end;
  -webkit-align-self: flex-end;
  align-self: flex-end;
  height: 48px;
  line-height: 48px;
}
.toolbar.messagebar a.link:before {
  background-image: -webkit-radial-gradient(center, circle cover, rgba(0, 0, 0, 0.1) 66%, rgba(0, 0, 0, 0) 66%);
  background-image: radial-gradient(circle at center, rgba(0, 0, 0, 0.1) 66%, rgba(0, 0, 0, 0) 66%);
}
.toolbar.messagebar .link {
  -webkit-box-flex: 0;
  -webkit-flex-shrink: 0;
  -ms-flex: 0 0 auto;
  flex-shrink: 0;
}
.toolbar.messagebar ~ .page-content {
  padding-bottom: 48px;
}
.page.no-toolbar .toolbar.messagebar ~ .page-content,
.page.no-tabbar .toolbar.messagebar ~ .page-content {
  padding-bottom: 48px;
}
.hidden-toolbar .toolbar.messagebar {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-transition-duration: 0ms;
  transition-duration: 0ms;
}
/* === Icons === */
i.icon {
  display: inline-block;
  vertical-align: middle;
  background-size: 100% auto;
  background-position: center;
  background-repeat: no-repeat;
  font-style: normal;
  position: relative;
  /* Material Icons http://google.github.io/material-design-icons/ */
}
i.icon.icon-back {
  width: 24px;
  height: 24px;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_2___});
}
i.icon.icon-forward {
  width: 24px;
  height: 24px;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_3___});
}
i.icon.icon-bars {
  width: 24px;
  height: 24px;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_4___});
}
i.icon.icon-camera {
  width: 24px;
  height: 24px;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_5___});
}
i.icon.icon-f7 {
  width: 24px;
  height: 24px;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_6___});
  border-radius: 3px;
}
i.icon.icon-next,
i.icon.icon-prev {
  width: 24px;
  height: 24px;
}
i.icon.icon-next {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_7___});
}
i.icon.icon-prev {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_8___});
}
i.icon.icon-plus {
  width: 24px;
  height: 24px;
  font-size: 0;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_9___});
}
i.icon.icon-close {
  width: 24px;
  height: 24px;
  font-size: 0;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_10___});
}
.badge {
  font-size: 10px;
  display: inline-block;
  color: #fff;
  background: #8e8e93;
  border-radius: 3px;
  padding: 1px 6px;
  box-sizing: border-box;
  vertical-align: middle;
}
.icon .badge,
.f7-icons .badge,
.material-icons .badge,
.framework7-icons .badge {
  position: absolute;
  left: 100%;
  margin-left: -10px;
  top: -2px;
  font-size: 10px;
  line-height: 1.4;
  padding: 1px 5px;
  font-family: Roboto, Noto, Helvetica, Arial, sans-serif;
}
/* === Chips === */
.chip {
  font-size: 13px;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.87);
  background: rgba(0, 0, 0, 0.12);
  display: inline-block;
  height: 32px;
  line-height: 32px;
  border-radius: 16px;
  padding: 0 12px;
  box-sizing: border-box;
  vertical-align: middle;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: -webkit-inline-flex;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  margin: 2px 0;
}
.chip-media {
  width: 32px;
  height: 32px;
  margin-left: -12px;
  vertical-align: top;
  border-radius: 50%;
  text-align: center;
  line-height: 32px;
  color: #fff;
  -webkit-box-flex: 0;
  -webkit-flex-shrink: 0;
  -ms-flex: 0 0 auto;
  flex-shrink: 0;
  font-size: 16px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
.chip-media img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  border-radius: 50%;
  display: block;
}
.chip-media + .chip-label {
  margin-left: 8px;
}
.chip-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex-shrink: 1;
  -ms-flex: 0 1 auto;
  flex-shrink: 1;
  min-width: 0;
}
.chip-label + .chip-delete {
  margin-left: 4px;
}
.chip-delete {
  margin-right: -8px;
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  cursor: pointer;
  -webkit-box-flex: 0;
  -webkit-flex-shrink: 0;
  -ms-flex: 0 0 auto;
  flex-shrink: 0;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_11___});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20px 20px;
  opacity: 0.54;
}
html:not(.watch-active-state) .chip-delete:active,
.chip-delete.active-state {
  opacity: 1;
}
/* === Content Block === */
.content-block {
  margin: 32px 0;
  padding: 0 16px;
  box-sizing: border-box;
}
.content-block.no-hairlines:before,
.content-block.no-hairlines ul:before,
.content-block.no-hairlines .content-block-inner:before {
  display: none;
}
.content-block.no-hairlines:after,
.content-block.no-hairlines ul:after,
.content-block.no-hairlines .content-block-inner:after {
  display: none;
}
.content-block-title {
  position: relative;
  overflow: hidden;
  margin: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 1;
  margin: 16px 16px 16px;
  padding-top: 16px;
  line-height: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.54);
}
.content-block-title + .list-block,
.content-block-title + .content-block,
.content-block-title + .card,
.content-block-title + .timeline {
  margin-top: 0px;
}
.content-block-inner {
  padding: 16px 16px;
  margin-left: -16px;
  width: 100%;
  position: relative;
}
.content-block-inner:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: auto;
  right: auto;
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.12);
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 0%;
  transform-origin: 50% 0%;
}
html.pixel-ratio-2 .content-block-inner:before {
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
html.pixel-ratio-3 .content-block-inner:before {
  -webkit-transform: scaleY(0.33);
  transform: scaleY(0.33);
}
.content-block-inner:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  right: auto;
  top: auto;
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.12);
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
}
html.pixel-ratio-2 .content-block-inner:after {
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
html.pixel-ratio-3 .content-block-inner:after {
  -webkit-transform: scaleY(0.33);
  transform: scaleY(0.33);
}
.content-block-inner > p:first-child {
  margin-top: 0;
}
.content-block-inner > p:last-child {
  margin-bottom: 0;
}
.content-block.inset {
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 7px;
}
.content-block.inset .content-block-inner {
  border-radius: 4px;
}
.content-block.inset .content-block-inner:before {
  display: none;
}
.content-block.inset .content-block-inner:after {
  display: none;
}
@media all and (min-width: 768px) {
  .content-block.tablet-inset {
    margin-left: 16px;
    margin-right: 16px;
    border-radius: 4px;
  }
  .content-block.tablet-inset .content-block-inner {
    border-radius: 4px;
  }
  .content-block.tablet-inset .content-block-inner:before {
    display: none;
  }
  .content-block.tablet-inset .content-block-inner:after {
    display: none;
  }
}
/* === Lists === */
.list-block {
  margin: 32px 0;
  font-size: 16px;
}
.list-block ul {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
}
.list-block ul:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: auto;
  right: auto;
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.12);
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 0%;
  transform-origin: 50% 0%;
}
html.pixel-ratio-2 .list-block ul:before {
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
html.pixel-ratio-3 .list-block ul:before {
  -webkit-transform: scaleY(0.33);
  transform: scaleY(0.33);
}
.list-block ul:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  right: auto;
  top: auto;
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.12);
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
}
html.pixel-ratio-2 .list-block ul:after {
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
html.pixel-ratio-3 .list-block ul:after {
  -webkit-transform: scaleY(0.33);
  transform: scaleY(0.33);
}
.list-block ul ul {
  padding-left: 56px;
}
.list-block ul ul:before {
  display: none;
}
.list-block ul ul:after {
  display: none;
}
.list-block .align-top,
.list-block .align-top .item-content,
.list-block .align-top .item-inner {
  -webkit-box-align: start;
  -ms-flex-align: start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
}
.list-block.inset {
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 4px;
}
.list-block.inset .content-block-title {
  margin-left: 0;
  margin-right: 0;
}
.list-block.inset ul {
  border-radius: 4px;
}
.list-block.inset ul:before {
  display: none;
}
.list-block.inset ul:after {
  display: none;
}
.list-block.inset li:first-child > a {
  border-radius: 4px 4px 0 0;
}
.list-block.inset li:last-child > a {
  border-radius: 0 0 4px 4px;
}
.list-block.inset li:first-child:last-child > a {
  border-radius: 4px;
}
@media all and (min-width: 768px) {
  .list-block.tablet-inset {
    margin-left: 16px;
    margin-right: 16px;
    border-radius: 4px;
  }
  .list-block.tablet-inset .content-block-title {
    margin-left: 0;
    margin-right: 0;
  }
  .list-block.tablet-inset ul {
    border-radius: 4px;
  }
  .list-block.tablet-inset ul:before {
    display: none;
  }
  .list-block.tablet-inset ul:after {
    display: none;
  }
  .list-block.tablet-inset li:first-child > a {
    border-radius: 4px 4px 0 0;
  }
  .list-block.tablet-inset li:last-child > a {
    border-radius: 0 0 4px 4px;
  }
  .list-block.tablet-inset li:first-child:last-child > a {
    border-radius: 4px;
  }
  .list-block.tablet-inset .content-block-title {
    margin-left: 0;
    margin-right: 0;
  }
  .list-block.tablet-inset ul {
    border-radius: 4px;
  }
  .list-block.tablet-inset ul:before {
    display: none;
  }
  .list-block.tablet-inset ul:after {
    display: none;
  }
  .list-block.tablet-inset li:first-child > a {
    border-radius: 4px 4px 0 0;
  }
  .list-block.tablet-inset li:last-child > a {
    border-radius: 0 0 4px 4px;
  }
  .list-block.tablet-inset li:first-child:last-child > a {
    border-radius: 4px;
  }
}
.list-block li {
  box-sizing: border-box;
  position: relative;
}
.list-block .item-media {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-flex: 0;
  -webkit-flex-shrink: 0;
  -ms-flex: 0 0 auto;
  flex-shrink: 0;
  -webkit-box-lines: single;
  -moz-box-lines: single;
  -webkit-flex-wrap: nowrap;
  -ms-flex-wrap: none;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  box-sizing: border-box;
  padding-top: 8px;
  padding-bottom: 8px;
  min-width: 40px;
}
.list-block .item-media i + i {
  margin-left: 8px;
}
.list-block .item-media i + img {
  margin-left: 8px;
}
.list-block .item-media + .item-inner {
  margin-left: 16px;
}
.list-block .item-inner {
  padding-right: 16px;
  position: relative;
  width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
  min-height: 48px;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  min-width: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -ms-flex-item-align: stretch;
  -webkit-align-self: stretch;
  align-self: stretch;
}
.list-block .item-inner:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  right: auto;
  top: auto;
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.12);
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
}
html.pixel-ratio-2 .list-block .item-inner:after {
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
html.pixel-ratio-3 .list-block .item-inner:after {
  -webkit-transform: scaleY(0.33);
  transform: scaleY(0.33);
}
.list-block .item-title {
  min-width: 0;
  -webkit-box-flex: 1;
  -webkit-flex-shrink: 1;
  -ms-flex: 0 1 auto;
  flex-shrink: 1;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.list-block .item-after {
  white-space: nowrap;
  color: #757575;
  -webkit-box-flex: 0;
  -webkit-flex-shrink: 0;
  -ms-flex: 0 0 auto;
  flex-shrink: 0;
  margin-left: auto;
  padding-left: 8px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  max-height: 28px;
  font-size: 14px;
}
.list-block .smart-select .item-after,
.list-block .autocomplete-opener .item-after {
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  display: block;
}
.list-block .item-actions {
  margin-left: auto;
  padding-left: 8px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.list-block .item-actions a {
  min-width: 24px;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
.list-block .item-actions a + a {
  margin-left: 8px;
}
.list-block .item-after + .item-actions {
  margin-left: 0;
}
.list-block .item-link,
.list-block .list-button {
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  display: block;
  color: inherit;
  position: relative;
  overflow: hidden;
  z-index: 0;
}
.list-block .item-link .item-inner,
.list-block .list-button .item-inner {
  padding-right: 42px;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_12___});
  background-size: 10px 20px;
  background-repeat: no-repeat;
  background-position: 95% center;
  background-position: -webkit-calc(100% - 16px) center;
  background-position: calc(100% - 16px) center;
}
html:not(.watch-active-state) .list-block .item-link:active,
html:not(.watch-active-state) .list-block .list-button:active,
.list-block .item-link.active-state,
.list-block .list-button.active-state {
  background-color: rgba(0, 0, 0, 0.1);
}
.list-block .list-button {
  padding: 0 16px;
  font-size: 16px;
  display: block;
  line-height: 48px;
}
.list-block .item-content {
  box-sizing: border-box;
  padding-left: 16px;
  min-height: 48px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.list-block .list-block-label {
  margin: 10px 0 35px;
  padding: 0 16px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
}
.list-block .swipeout {
  overflow: hidden;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
.list-block .swipeout.deleting {
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.list-block .swipeout.deleting .swipeout-content {
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
}
.list-block .swipeout.transitioning .swipeout-content,
.list-block .swipeout.transitioning .swipeout-actions-right a,
.list-block .swipeout.transitioning .swipeout-actions-left a,
.list-block .swipeout.transitioning .swipeout-overswipe {
  -webkit-transition: 300ms;
  transition: 300ms;
}
.list-block .swipeout-content {
  position: relative;
  z-index: 10;
}
.list-block .swipeout-overswipe {
  -webkit-transition: 200ms left;
  transition: 200ms left;
}
.list-block .swipeout-actions-left,
.list-block .swipeout-actions-right {
  position: absolute;
  top: 0;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}
.list-block .swipeout-actions-left a,
.list-block .swipeout-actions-right a {
  padding: 0 24px;
  color: #fff;
  background: #c7c7cc;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  position: relative;
  left: 0;
}
.list-block .swipeout-actions-left a:after,
.list-block .swipeout-actions-right a:after {
  content: '';
  position: absolute;
  top: 0;
  width: 600%;
  height: 100%;
  background: inherit;
  z-index: -1;
}
.list-block .swipeout-actions-left a.swipeout-delete,
.list-block .swipeout-actions-right a.swipeout-delete {
  background: #f44336;
}
.list-block .swipeout-actions-right {
  right: 0%;
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}
.list-block .swipeout-actions-right a:after {
  left: 100%;
  margin-left: -1px;
}
.list-block .swipeout-actions-left {
  left: 0%;
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
}
.list-block .swipeout-actions-left a:after {
  right: 100%;
  margin-right: -1px;
}
.list-block .item-subtitle {
  font-size: 14px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
  text-overflow: ellipsis;
}
.list-block .item-text {
  font-size: 14px;
  color: #757575;
  line-height: 20px;
  position: relative;
  overflow: hidden;
  max-height: 40px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}
.list-block.media-list .item-inner,
.list-block li.media-item .item-inner {
  display: block;
  padding-top: 14px;
  padding-bottom: 14px;
  -ms-flex-item-align: stretch;
  -webkit-align-self: stretch;
  align-self: stretch;
}
.list-block.media-list .item-link .item-inner,
.list-block li.media-item .item-link .item-inner {
  background: none;
  padding-right: 16px;
}
.list-block.media-list .item-link .item-title-row,
.list-block li.media-item .item-link .item-title-row {
  padding-right: 26px;
  background: no-repeat right top;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_12___});
  background-size: 10px 20px;
}
.list-block.media-list .item-media,
.list-block li.media-item .item-media {
  padding-top: 14px;
  padding-bottom: 14px;
  -ms-flex-item-align: flex-start;
  -webkit-align-self: flex-start;
  align-self: flex-start;
}
.list-block.media-list .item-media img,
.list-block li.media-item .item-media img {
  display: block;
}
.list-block.media-list .item-title-row,
.list-block li.media-item .item-title-row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.list-block.media-list .item-content > .item-after,
.list-block li.media-item .item-content > .item-after {
  padding-top: 14px;
  padding-bottom: 14px;
  -ms-flex-item-align: flex-start;
  -webkit-align-self: flex-start;
  align-self: flex-start;
}
.list-block .list-group ul:after,
.list-block .list-group ul:before {
  z-index: 11;
}
.list-block .list-group + .list-group ul:before {
  display: none;
}
.list-block .item-divider,
.list-block .list-group-title {
  background: #f4f4f4;
  padding: 0px 16px;
  white-space: nowrap;
  position: relative;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.54);
  height: 48px;
  box-sizing: border-box;
  line-height: 48px;
  font-size: 14px;
}
.list-block .item-divider:before,
.list-block .list-group-title:before {
  display: none;
}
.list-block .list-group-title {
  position: relative;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 0px;
  z-index: 10;
  margin-top: 0;
}
.list-block .sortable-handler {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 1px;
  z-index: 10;
  background-repeat: no-repeat;
  background-size: 18px 12px;
  background-position: center;
  width: 50px;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_13___});
  opacity: 0;
  visibility: hidden;
  cursor: pointer;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.list-block.sortable .item-inner {
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.list-block.sortable-opened .sortable-handler {
  visibility: visible;
  opacity: 1;
}
.list-block.sortable-opened .item-inner,
.list-block.sortable-opened .item-link .item-inner {
  padding-right: 50px;
}
.list-block.sortable-opened .item-link .item-inner,
.list-block.sortable-opened .item-link .item-title-row {
  background-image: none;
}
.list-block.sortable-sorting li {
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.list-block li.sorting {
  z-index: 50;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  -webkit-transition-duration: 0ms;
  transition-duration: 0ms;
}
.list-block li.sorting .item-inner:after {
  display: none;
}
.list-block li:last-child .list-button:after {
  display: none;
}
.list-block li:last-child .item-inner:after,
.list-block li:last-child li:last-child .item-inner:after {
  display: none;
}
.list-block li li:last-child .item-inner:after,
.list-block li:last-child li .item-inner:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  right: auto;
  top: auto;
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.12);
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
}
html.pixel-ratio-2 .list-block li li:last-child .item-inner:after,
html.pixel-ratio-2 .list-block li:last-child li .item-inner:after {
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
html.pixel-ratio-3 .list-block li li:last-child .item-inner:after,
html.pixel-ratio-3 .list-block li:last-child li .item-inner:after {
  -webkit-transform: scaleY(0.33);
  transform: scaleY(0.33);
}
.list-block.no-hairlines:before,
.list-block.no-hairlines ul:before,
.list-block.no-hairlines .content-block-inner:before {
  display: none;
}
.list-block.no-hairlines:after,
.list-block.no-hairlines ul:after,
.list-block.no-hairlines .content-block-inner:after {
  display: none;
}
.list-block.no-hairlines-between .item-inner:after,
.list-block.no-hairlines-between .list-button:after,
.list-block.no-hairlines-between .item-divider:after,
.list-block.no-hairlines-between .list-group-title:after,
.list-block.no-hairlines-between .list-group-title:after {
  display: none;
}
/* === Contacts === */
.contacts-block {
  margin: 0;
}
.contacts-block .list-group-title {
  padding: 0 16px;
  pointer-events: none;
  background: none;
  color: #888888;
  line-height: 48px;
  height: 48px;
  font-size: 20px;
  font-weight: 500;
  overflow: visible;
  width: 56px;
  top: 0;
}
.contacts-block .list-group-title + li {
  margin-top: -48px;
}
.contacts-block .list-group:first-child ul:before {
  display: none;
}
.contacts-block .list-group:last-child ul:after {
  display: none;
}
.contacts-block li:not(.list-group-title) {
  padding-left: 56px;
}
/* === Forms === */
.list-block input[type="text"],
.list-block input[type="password"],
.list-block input[type="search"],
.list-block input[type="email"],
.list-block input[type="tel"],
.list-block input[type="url"],
.list-block input[type="date"],
.list-block input[type="datetime-local"],
.list-block input[type="time"],
.list-block input[type="number"],
.list-block select,
.list-block textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  box-sizing: border-box;
  border: none;
  background: none;
  border-radius: 0 0 0 0;
  box-shadow: none;
  display: block;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 36px;
  color: #212121;
  font-size: 16px;
  font-family: inherit;
}
.list-block input[type="text"]::-webkit-input-placeholder,
.list-block input[type="password"]::-webkit-input-placeholder,
.list-block input[type="search"]::-webkit-input-placeholder,
.list-block input[type="email"]::-webkit-input-placeholder,
.list-block input[type="tel"]::-webkit-input-placeholder,
.list-block input[type="url"]::-webkit-input-placeholder,
.list-block input[type="date"]::-webkit-input-placeholder,
.list-block input[type="datetime-local"]::-webkit-input-placeholder,
.list-block input[type="time"]::-webkit-input-placeholder,
.list-block input[type="number"]::-webkit-input-placeholder,
.list-block select::-webkit-input-placeholder,
.list-block textarea::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.35);
}
.list-block .label,
.list-block .floating-label {
  vertical-align: top;
  color: rgba(0, 0, 0, 0.65);
  -webkit-transition-duration: 200ms;
  transition-duration: 200ms;
  width: 35%;
  -webkit-box-flex: 0;
  -webkit-flex-shrink: 0;
  -ms-flex: 0 0 auto;
  flex-shrink: 0;
}
.list-block input[type="date"],
.list-block input[type="datetime-local"] {
  line-height: 44px;
}
.list-block select {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
}
.list-block textarea {
  resize: none;
  line-height: 1.4;
  padding-top: 8px;
  padding-bottom: 7px;
  height: 100px;
}
.list-block textarea.resizable {
  height: 36px;
}
.list-block .item-input {
  width: 100%;
  -ms-flex: 1;
  -webkit-box-flex: 1;
  -webkit-flex-shrink: 1;
  -ms-flex: 0 1 auto;
  flex-shrink: 1;
  font-size: 0;
  position: relative;
  margin-bottom: 4px;
  min-height: 36px;
}
.list-block .input-item ul:after,
.list-block.inputs-list ul:after {
  display: none;
}
.list-block .input-item .item-media,
.list-block.inputs-list .item-media {
  -ms-flex-item-align: flex-end;
  -webkit-align-self: flex-end;
  align-self: flex-end;
  min-height: 36px;
  margin-bottom: 8px;
  padding: 0;
}
.list-block .input-item .item-inner,
.list-block.inputs-list .item-inner {
  display: block;
  margin-bottom: 4px;
  padding-bottom: 0;
}
.list-block .input-item .item-inner:after,
.list-block.inputs-list .item-inner:after {
  display: none;
}
.list-block .input-item .label,
.list-block.inputs-list .label,
.list-block .input-item .floating-label,
.list-block.inputs-list .floating-label {
  width: 100%;
  font-size: 12px;
}
.list-block .input-item .floating-label,
.list-block.inputs-list .floating-label {
  -webkit-transform-origin: left;
  transform-origin: left;
  -webkit-transform: scale(1.33333333) translateY(21px);
  transform: scale(1.33333333) translateY(21px);
  color: rgba(0, 0, 0, 0.35);
  width: auto;
  max-width: 75%;
}
.list-block .input-item .floating-label ~ .item-input input::-webkit-input-placeholder,
.list-block.inputs-list .floating-label ~ .item-input input::-webkit-input-placeholder {
  color: transparent;
}
.list-block .focus-state .floating-label,
.list-block .not-empty-state .floating-label {
  color: rgba(0, 0, 0, 0.65);
  -webkit-transform: scale(1) translateY(0);
  transform: scale(1) translateY(0);
}
.list-block .focus-state.item-inner .label {
  color: #2196f3;
}
.list-block .focus-state.input-field:after,
.list-block .focus-state .item-input-field:after {
  background: #2196f3;
}
.list-block .focus-state .label,
.list-block .focus-state .floating-label {
  color: #2196f3;
}
.list-block .not-empty-state.item-inner .label {
  color: rgba(0, 0, 0, 0.65);
}
.list-block .not-empty-state.input-field:after,
.list-block .not-empty-state .item-input-field:after {
  background: rgba(0, 0, 0, 0.12);
  transform: none !important;
}
.item-input-field,
.input-field {
  position: relative;
}
.item-input-field:after,
.input-field:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  right: auto;
  top: auto;
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.12);
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
}
html.pixel-ratio-2 .item-input-field:after,
html.pixel-ratio-2 .input-field:after {
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
html.pixel-ratio-3 .item-input-field:after,
html.pixel-ratio-3 .input-field:after {
  -webkit-transform: scaleY(0.33);
  transform: scaleY(0.33);
}
.item-input-field:after,
.input-field:after {
  -webkit-transition-duration: 200ms;
  transition-duration: 200ms;
}
.item-input-field.focus-state:after,
.input-field.focus-state:after,
.item-input-field.not-empty-state:after,
.input-field.not-empty-state:after,
.focus-state .item-input-field:after,
.focus-state .input-field:after,
.not-empty-state .item-input-field:after,
.not-empty-state .input-field:after {
  background: #2196f3;
  -webkit-transform: scaleY(2) !important;
  transform: scaleY(2) !important;
}
textarea.resizable {
  overflow: hidden;
}
.label-switch {
  display: inline-block;
  vertical-align: middle;
  width: 36px;
  height: 14px;
  position: relative;
  cursor: pointer;
  -ms-flex-item-align: center;
  -webkit-align-self: center;
  align-self: center;
}
.label-switch .checkbox {
  width: 36px;
  border-radius: 36px;
  box-sizing: border-box;
  height: 14px;
  background: #b0afaf;
  z-index: 0;
  margin: 0;
  padding: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  border: none;
  cursor: pointer;
  position: relative;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.label-switch .checkbox:after {
  content: ' ';
  height: 20px;
  width: 20px;
  border-radius: 20px;
  background: #fff;
  position: absolute;
  z-index: 2;
  top: -3px;
  left: 0px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  -webkit-transform: translateX(0px);
  transform: translateX(0px);
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.label-switch input[type="checkbox"] {
  display: none;
}
.label-switch input[type="checkbox"]:checked + .checkbox {
  background: rgba(33, 150, 243, 0.5);
}
.label-switch input[type="checkbox"]:checked + .checkbox:after {
  -webkit-transform: translateX(16px);
  transform: translateX(16px);
  background: #2196f3;
}
.item-input .label-switch {
  top: 11px;
}
.button {
  color: #2196f3;
  text-decoration: none;
  text-align: center;
  display: block;
  border-radius: 2px;
  line-height: 36px;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  background: none;
  padding: 0 10px;
  margin: 0;
  height: 36px;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  text-transform: uppercase;
  font-family: inherit;
  cursor: pointer;
  min-width: 64px;
  padding: 0 8px;
  position: relative;
  overflow: hidden;
  outline: 0;
  border: none;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
input[type="submit"].button,
input[type="button"].button {
  width: 100%;
}
html:not(.watch-active-state) .button:active,
.button.active-state {
  background: rgba(0, 0, 0, 0.1);
}
.button.button-fill {
  background-color: #2196f3;
  color: #fff;
}
html:not(.watch-active-state) .button.button-fill:active,
.button.button-fill.active-state {
  background: #0c82df;
}
.button.button-big {
  height: 48px;
  line-height: 48px;
  border-radius: 3px;
}
.button i.icon + span,
.button span:not(.ripple-wave) + span,
.button span:not(.ripple-wave) + i.icon,
.button i.icon + i.icon {
  margin-left: 8px;
}
.navbar .button:not(.button-fill),
.toolbar .button:not(.button-fill),
.subnavbar .button:not(.button-fill),
.notifications .button:not(.button-fill) {
  color: #fff;
}
html:not(.watch-active-state) .navbar .button:not(.button-fill):active,
html:not(.watch-active-state) .toolbar .button:not(.button-fill):active,
html:not(.watch-active-state) .subnavbar .button:not(.button-fill):active,
html:not(.watch-active-state) .notifications .button:not(.button-fill):active,
.navbar .button:not(.button-fill).active-state,
.toolbar .button:not(.button-fill).active-state,
.subnavbar .button:not(.button-fill).active-state,
.notifications .button:not(.button-fill).active-state {
  background: rgba(255, 255, 255, 0.15);
}
.button-raised {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
html:not(.watch-active-state) .button-raised:active,
.button-raised.active-state {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.buttons-row {
  -ms-flex-item-align: center;
  -webkit-align-self: center;
  align-self: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-lines: single;
  -moz-box-lines: single;
  -webkit-flex-wrap: nowrap;
  -ms-flex-wrap: none;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
}
.buttons-row .button {
  margin-left: 16px;
  width: 100%;
  -webkit-box-flex: 1;
  -ms-flex: 1;
}
.buttons-row .button:first-child {
  margin-left: 0;
}
.range-slider {
  width: 100%;
  position: relative;
  overflow: hidden;
  -ms-flex-item-align: center;
  -webkit-align-self: center;
  align-self: center;
}
.range-slider input[type="range"] {
  position: relative;
  height: 20px;
  width: 100%;
  margin: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  background: -webkit-gradient(linear, 50% 0, 50% 100%, color-stop(0, #b9b9b9), color-stop(100%, #b9b9b9));
  background: linear-gradient(to right, #b9b9b9 0, #b9b9b9 100%);
  background-position: center;
  background-size: 100% 2px;
  background-repeat: no-repeat;
  outline: 0;
  -ms-background-position-y: 500px;
}
.range-slider input[type="range"]:focus,
.range-slider input[type="range"]:active {
  border: 0;
  outline: 0 none;
}
.range-slider input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  border: none;
  outline: 0;
  height: 20px;
  width: 20px;
  position: relative;
  background: #2196f3;
  border-radius: 20px;
}
.range-slider input[type="range"]::-webkit-slider-thumb:before {
  position: absolute;
  top: 50%;
  right: 100%;
  width: 2000px;
  height: 2px;
  margin-top: -1px;
  z-index: 1;
  background: #2196f3;
  content: ' ';
}
.range-slider input[type="range"]::-moz-range-track {
  width: 100%;
  height: 2px;
  background: #b7b8b7;
  border: none;
  outline: 0;
}
.range-slider input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  border: none;
  outline: 0;
  height: 20px;
  width: 20px;
  position: relative;
  background: #2196f3;
  border-radius: 20px;
}
.range-slider input[type="range"]::-ms-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
.range-slider input[type="range"]::-ms-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  border: none;
  outline: 0;
  height: 20px;
  width: 20px;
  position: relative;
  background: #2196f3;
  border-radius: 20px;
}
.range-slider input[type="range"]::-ms-fill-lower {
  background: #2196f3;
}
.range-slider input[type="range"]::-ms-fill-upper {
  background: #b7b8b7;
}
.item-input .range-slider {
  top: 8px;
}
.form-checkbox {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
label.label-checkbox,
.form-checkbox {
  cursor: pointer;
}
label.label-checkbox input[type="checkbox"],
.form-checkbox input[type="checkbox"],
label.label-checkbox input[type="radio"],
.form-checkbox input[type="radio"] {
  display: none;
}
label.label-checkbox i.icon-form-checkbox,
.form-checkbox i {
  width: 18px;
  height: 18px;
  position: relative;
  border-radius: 2px;
  border: 2px solid #6d6d6d;
  box-sizing: border-box;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  background: transparent;
  display: block;
}
label.label-checkbox i.icon-form-checkbox:after,
.form-checkbox i:after {
  content: ' ';
  position: absolute;
  width: 18px;
  height: 18px;
  left: -2px;
  top: -2px;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  opacity: 0;
  background: no-repeat center;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_14___});
  -webkit-background-size: 100% auto;
  background-size: 100% auto;
}
label.label-checkbox input[type="checkbox"]:checked + .item-media i.icon-form-checkbox,
label.label-checkbox input[type="checkbox"]:checked ~ .item-after i.icon-form-checkbox,
label.label-checkbox input[type="checkbox"]:checked ~ .item-inner i.icon-form-checkbox,
label.label-checkbox input[type="radio"]:checked + .item-media i.icon-form-checkbox,
label.label-checkbox input[type="radio"]:checked ~ .item-after i.icon-form-checkbox,
label.label-checkbox input[type="radio"]:checked ~ .item-inner i.icon-form-checkbox,
.form-checkbox input[type="checkbox"]:checked ~ i {
  border-color: #2196f3;
  background-color: #2196f3;
}
label.label-checkbox input[type="checkbox"]:checked + .item-media i.icon-form-checkbox:after,
label.label-checkbox input[type="checkbox"]:checked ~ .item-after i.icon-form-checkbox:after,
label.label-checkbox input[type="checkbox"]:checked ~ .item-inner i.icon-form-checkbox:after,
label.label-checkbox input[type="radio"]:checked + .item-media i.icon-form-checkbox:after,
label.label-checkbox input[type="radio"]:checked ~ .item-after i.icon-form-checkbox:after,
label.label-checkbox input[type="radio"]:checked ~ .item-inner i.icon-form-checkbox:after,
.form-checkbox input[type="checkbox"]:checked ~ i:after {
  opacity: 1;
}
.form-radio {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
label.label-radio,
.form-radio {
  cursor: pointer;
}
label.label-radio input[type="checkbox"],
.form-radio input[type="checkbox"],
label.label-radio input[type="radio"],
.form-radio input[type="radio"] {
  display: none;
}
label.label-radio i.icon-form-radio,
.form-radio i {
  width: 20px;
  height: 20px;
  position: relative;
  border-radius: 20px;
  border: 2px solid #6d6d6d;
  box-sizing: border-box;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  display: block;
}
label.label-radio i.icon-form-radio:after,
.form-radio i:after {
  content: ' ';
  position: absolute;
  width: 10px;
  height: 10px;
  left: 50%;
  top: 50%;
  margin-left: -5px;
  margin-top: -5px;
  background-color: #2196f3;
  border-radius: 100%;
  -webkit-transform: scale(0);
  transform: scale(0);
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
label.label-radio input[type="checkbox"]:checked + .item-media i.icon-form-radio,
label.label-radio input[type="checkbox"]:checked ~ .item-after i.icon-form-radio,
label.label-radio input[type="checkbox"]:checked ~ .item-inner i.icon-form-radio,
label.label-radio input[type="radio"]:checked + .item-media i.icon-form-radio,
label.label-radio input[type="radio"]:checked ~ .item-after i.icon-form-radio,
label.label-radio input[type="radio"]:checked ~ .item-inner i.icon-form-radio,
.form-radio input[type="radio"]:checked ~ i {
  border-color: #2196f3;
}
label.label-radio input[type="checkbox"]:checked + .item-media i.icon-form-radio:after,
label.label-radio input[type="checkbox"]:checked ~ .item-after i.icon-form-radio:after,
label.label-radio input[type="checkbox"]:checked ~ .item-inner i.icon-form-radio:after,
label.label-radio input[type="radio"]:checked + .item-media i.icon-form-radio:after,
label.label-radio input[type="radio"]:checked ~ .item-after i.icon-form-radio:after,
label.label-radio input[type="radio"]:checked ~ .item-inner i.icon-form-radio:after,
.form-radio input[type="radio"]:checked ~ i:after {
  background-color: #2196f3;
  -webkit-transform: scale(1);
  transform: scale(1);
}
label.label-checkbox,
label.label-radio {
  position: relative;
  overflow: hidden;
  z-index: 0;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
label.label-checkbox .item-after i.icon-form-checkbox,
label.label-radio .item-after i.icon-form-checkbox,
label.label-checkbox .item-after i.icon-form-radio,
label.label-radio .item-after i.icon-form-radio {
  margin-left: 8px;
  margin-right: 16px;
}
.media-list label.label-checkbox .item-media i.icon-form-checkbox,
.media-list label.label-radio .item-media i.icon-form-checkbox,
.media-item label.label-checkbox .item-media i.icon-form-checkbox,
.media-item label.label-radio .item-media i.icon-form-checkbox,
.media-list label.label-checkbox .item-media i.icon-form-radio,
.media-list label.label-radio .item-media i.icon-form-radio,
.media-item label.label-checkbox .item-media i.icon-form-radio,
.media-item label.label-radio .item-media i.icon-form-radio {
  margin-top: 4px;
}
html:not(.watch-active-state) label.label-checkbox:active,
html:not(.watch-active-state) label.label-radio:active,
label.label-checkbox.active-state,
label.label-radio.active-state {
  background-color: rgba(0, 0, 0, 0.1);
}
html:not(.watch-active-state) label.label-checkbox:active .item-inner:after,
html:not(.watch-active-state) label.label-radio:active .item-inner:after,
label.label-checkbox.active-state .item-inner:after,
label.label-radio.active-state .item-inner:after {
  background-color: transparent;
}
.smart-select select {
  display: none;
}
/* === Floating Action Button === */
.floating-button {
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  z-index: 1500;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  background-color: #2196f3;
  color: #fff;
  overflow: hidden;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
html:not(.watch-active-state) .floating-button:active,
.floating-button.active-state {
  background: #0c82df;
}
.floating-button-toolbar,
.speed-dial {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 1500;
}
.floating-button-toolbar .floating-button,
.speed-dial .floating-button {
  right: 0;
  bottom: 0;
  position: relative;
}
.speed-dial .floating-button i {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate3d(-50%, -50%, 0) rotate(0deg) scale(1);
  transform: translate3d(-50%, -50%, 0) rotate(0deg) scale(1);
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.speed-dial .floating-button i + i {
  -webkit-transform: translate3d(-50%, -50%, 0) rotate(-90deg) scale(0.5);
  transform: translate3d(-50%, -50%, 0) rotate(-90deg) scale(0.5);
  opacity: 0;
}
.speed-dial.speed-dial-opened .floating-button i {
  -webkit-transform: translate3d(-50%, -50%, 0) rotate(90deg) scale(0.5);
  transform: translate3d(-50%, -50%, 0) rotate(90deg) scale(0.5);
  opacity: 0;
}
.speed-dial.speed-dial-opened .floating-button i + i {
  -webkit-transform: translate3d(-50%, -50%, 0) rotate(0deg) scale(1);
  transform: translate3d(-50%, -50%, 0) rotate(0deg) scale(1);
  opacity: 1;
}
.speed-dial-buttons {
  position: absolute;
  width: 40px;
  left: 50%;
  margin-left: -20px;
  bottom: 100%;
  margin-bottom: 16px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: reverse;
  -moz-box-orient: vertical;
  -moz-box-direction: reverse;
  -ms-flex-direction: column-reverse;
  -webkit-flex-direction: column-reverse;
  flex-direction: column-reverse;
  visibility: hidden;
  pointer-events: none;
}
.speed-dial-buttons a {
  width: 40px;
  height: 40px;
  opacity: 0;
  color: #fff;
  border-radius: 50%;
  position: relative;
  z-index: 1;
  overflow: hidden;
  background-color: #2196f3;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-transform: translate3d(0, 8px, 0) scale(0.3);
  transform: translate3d(0, 8px, 0) scale(0.3);
  -webkit-transform-origin: center bottom;
  transform-origin: center bottom;
}
html:not(.watch-active-state) .speed-dial-buttons a:active,
.speed-dial-buttons a.active-state {
  background: #0c82df;
}
.speed-dial-buttons a + a {
  margin-bottom: 16px;
}
.speed-dial-opened .speed-dial-buttons {
  visibility: visible;
  pointer-events: auto;
}
.speed-dial-opened .speed-dial-buttons a {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0) scaleY(1);
  transform: translate3d(0, 0, 0) scaleY(1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.speed-dial-opened .speed-dial-buttons a:nth-child(2) {
  -webkit-transition-delay: 50ms;
  transition-delay: 50ms;
}
.speed-dial-opened .speed-dial-buttons a:nth-child(3) {
  -webkit-transition-delay: 100ms;
  transition-delay: 100ms;
}
.speed-dial-opened .speed-dial-buttons a:nth-child(4) {
  -webkit-transition-delay: 150ms;
  transition-delay: 150ms;
}
.speed-dial-opened .speed-dial-buttons a:nth-child(5) {
  -webkit-transition-delay: 200ms;
  transition-delay: 200ms;
}
.speed-dial-opened .speed-dial-buttons a:nth-child(6) {
  -webkit-transition-delay: 250ms;
  transition-delay: 250ms;
}
.floating-button-to-popover.floating-button-to-popover {
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.floating-button-to-popover.floating-button-to-popover-in {
  -webkit-transition-duration: 100ms;
  transition-duration: 100ms;
}
.floating-button-to-popover.floating-button-to-popover-in i {
  opacity: 0;
  -webkit-transition-duration: 100ms;
  transition-duration: 100ms;
}
.floating-button-to-popover.floating-button-to-popover-scale {
  border-radius: 0;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  box-shadow: none;
}
.floating-button-to-popover.floating-button-to-popover-out {
  -webkit-transition-delay: 0ms;
  transition-delay: 0ms;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.floating-button-to-popover.floating-button-to-popover-out i {
  opacity: 1;
  -webkit-transition-duration: 100ms;
  transition-duration: 100ms;
  -webkit-transition-delay: 200ms;
  transition-delay: 200ms;
}
/* === Accordion === */
.list-block .accordion-item-toggle {
  cursor: pointer;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.list-block .accordion-item-toggle .item-inner {
  padding-right: 42px;
  background: no-repeat -webkit-calc(100% - 15px) center;
  background: no-repeat calc(100% - 15px) center;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_12___});
  background-size: 10px 20px;
}
html:not(.watch-active-state) .list-block .accordion-item-toggle:active,
.list-block .accordion-item-toggle.active-state {
  -webkit-transition-duration: 0ms;
  transition-duration: 0ms;
  background-color: #d9d9d9;
}
html:not(.watch-active-state) .list-block .accordion-item-toggle:active > .item-inner:after,
.list-block .accordion-item-toggle.active-state > .item-inner:after {
  background-color: transparent;
}
.list-block .accordion-item-toggle .item-inner,
.list-block .accordion-item > .item-link .item-inner {
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  -webkit-transition-property: background-color;
  transition-property: background-color;
}
.list-block .accordion-item-toggle .item-inner:after,
.list-block .accordion-item > .item-link .item-inner:after {
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.list-block:not(.media-list) .accordion-item-expanded:not(.media-item) .accordion-item-toggle .item-inner,
.list-block:not(.media-list) .accordion-item-expanded:not(.media-item) > .item-link .item-inner,
.list-block.media-list .accordion-item-expanded .accordion-item-toggle .item-title-row,
.list-block.media-list .accordion-item-expanded > .item-link .item-title-row,
.list-block .accordion-item-expanded.media-item .accordion-item-toggle .item-title-row,
.list-block .accordion-item-expanded.media-item > .item-link .item-title-row {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_15___});
  background-size: 20px 20px;
}
.list-block .accordion-item-expanded .accordion-item-toggle .item-inner:after,
.list-block .accordion-item-expanded > .item-link .item-inner:after {
  background-color: transparent;
}
.list-block .accordion-item .content-block,
.list-block .accordion-item .list-block {
  margin-top: 0;
  margin-bottom: 0;
}
.list-block .accordion-item ul {
  padding-left: 0;
}
.accordion-item-content {
  position: relative;
  overflow: hidden;
  height: 0;
  font-size: 14px;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.accordion-item-expanded > .accordion-item-content {
  height: auto;
}
html.android-4 .accordion-item-content {
  -webkit-transform: none;
  transform: none;
}
/* === Cards === */
.cards-list ul,
.card .list-block ul {
  background: none;
}
.cards-list > ul:before,
.card .list-block > ul:before {
  display: none;
}
.cards-list > ul:after,
.card .list-block > ul:after {
  display: none;
}
.card {
  background: #fff;
  margin: 8px;
  position: relative;
  border-radius: 2px;
  font-size: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.card .list-block,
.card .content-block {
  margin: 0;
}
.row:not(.no-gutter) .col > .card {
  margin-left: 0;
  margin-right: 0;
}
.page-content > .card:last-child {
  margin-bottom: 32px;
}
.card-content {
  position: relative;
}
.card-content-inner {
  padding: 16px;
  position: relative;
}
.card-content-inner > p:first-child {
  margin-top: 0;
}
.card-content-inner > p:last-child {
  margin-bottom: 0;
}
.card-content-inner > .list-block,
.card-content-inner > .content-block {
  margin: -15px;
}
.card-header,
.card-footer {
  min-height: 48px;
  position: relative;
  padding: 4px 16px;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.card-header[valign="top"],
.card-footer[valign="top"] {
  -webkit-box-align: start;
  -ms-flex-align: start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
}
.card-header[valign="bottom"],
.card-footer[valign="bottom"] {
  -webkit-box-align: end;
  -ms-flex-align: end;
  -webkit-align-items: flex-end;
  align-items: flex-end;
}
.card-header a.link,
.card-footer a.link {
  color: #2196f3;
  text-decoration: none;
  text-align: center;
  display: block;
  border-radius: 2px;
  line-height: 36px;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  background: none;
  padding: 0 10px;
  margin: 0;
  height: 36px;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  text-transform: uppercase;
  font-family: inherit;
  cursor: pointer;
  min-width: 64px;
  padding: 0 8px;
  position: relative;
  overflow: hidden;
  outline: 0;
  border: none;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-user-select: none;
  user-select: none;
}
input[type="submit"].card-header a.link,
input[type="submit"].card-footer a.link,
input[type="button"].card-header a.link,
input[type="button"].card-footer a.link {
  width: 100%;
}
html:not(.watch-active-state) .card-header a.link:active,
html:not(.watch-active-state) .card-footer a.link:active,
.card-header a.link.active-state,
.card-footer a.link.active-state {
  background: rgba(0, 0, 0, 0.1);
}
.card-header a.link.button-fill,
.card-footer a.link.button-fill {
  background-color: #2196f3;
  color: #fff;
}
html:not(.watch-active-state) .card-header a.link.button-fill:active,
html:not(.watch-active-state) .card-footer a.link.button-fill:active,
.card-header a.link.button-fill.active-state,
.card-footer a.link.button-fill.active-state {
  background: #0c82df;
}
.card-header a.link.button-big,
.card-footer a.link.button-big {
  height: 48px;
  line-height: 48px;
  border-radius: 3px;
}
.card-header a.link i.icon + span,
.card-footer a.link i.icon + span,
.card-header a.link span:not(.ripple-wave) + span,
.card-footer a.link span:not(.ripple-wave) + span,
.card-header a.link span:not(.ripple-wave) + i.icon,
.card-footer a.link span:not(.ripple-wave) + i.icon,
.card-header a.link i.icon + i.icon,
.card-footer a.link i.icon + i.icon {
  margin-left: 8px;
}
.navbar .card-header a.link:not(.button-fill),
.navbar .card-footer a.link:not(.button-fill),
.toolbar .card-header a.link:not(.button-fill),
.toolbar .card-footer a.link:not(.button-fill),
.subnavbar .card-header a.link:not(.button-fill),
.subnavbar .card-footer a.link:not(.button-fill),
.notifications .card-header a.link:not(.button-fill),
.notifications .card-footer a.link:not(.button-fill) {
  color: #fff;
}
html:not(.watch-active-state) .navbar .card-header a.link:not(.button-fill):active,
html:not(.watch-active-state) .navbar .card-footer a.link:not(.button-fill):active,
html:not(.watch-active-state) .toolbar .card-header a.link:not(.button-fill):active,
html:not(.watch-active-state) .toolbar .card-footer a.link:not(.button-fill):active,
html:not(.watch-active-state) .subnavbar .card-header a.link:not(.button-fill):active,
html:not(.watch-active-state) .subnavbar .card-footer a.link:not(.button-fill):active,
html:not(.watch-active-state) .notifications .card-header a.link:not(.button-fill):active,
html:not(.watch-active-state) .notifications .card-footer a.link:not(.button-fill):active,
.navbar .card-header a.link:not(.button-fill).active-state,
.navbar .card-footer a.link:not(.button-fill).active-state,
.toolbar .card-header a.link:not(.button-fill).active-state,
.toolbar .card-footer a.link:not(.button-fill).active-state,
.subnavbar .card-header a.link:not(.button-fill).active-state,
.subnavbar .card-footer a.link:not(.button-fill).active-state,
.notifications .card-header a.link:not(.button-fill).active-state,
.notifications .card-footer a.link:not(.button-fill).active-state {
  background: rgba(255, 255, 255, 0.15);
}
.card-header a.link i + span,
.card-footer a.link i + span,
.card-header a.link i + i,
.card-footer a.link i + i,
.card-header a.link span + i,
.card-footer a.link span + i,
.card-header a.link span + span,
.card-footer a.link span + span {
  margin-left: 7px;
}
.card-header a.link i.icon,
.card-footer a.link i.icon {
  display: block;
}
.card-header a.icon-only,
.card-footer a.icon-only {
  min-width: 48px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  margin: 0;
}
.card-header {
  border-radius: 2px 2px 0 0;
  font-size: 16px;
}
.card-header:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  right: auto;
  top: auto;
  height: 1px;
  width: 100%;
  background-color: #e1e1e1;
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
}
html.pixel-ratio-2 .card-header:after {
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
html.pixel-ratio-3 .card-header:after {
  -webkit-transform: scaleY(0.33);
  transform: scaleY(0.33);
}
.card-header.no-border:after {
  display: none;
}
.card-footer {
  border-radius: 0 0 2px 2px;
  color: #757575;
}
.card-footer:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: auto;
  right: auto;
  height: 1px;
  width: 100%;
  background-color: #e1e1e1;
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 0%;
  transform-origin: 50% 0%;
}
html.pixel-ratio-2 .card-footer:before {
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
html.pixel-ratio-3 .card-footer:before {
  -webkit-transform: scaleY(0.33);
  transform: scaleY(0.33);
}
.card-footer.no-border:before {
  display: none;
}
/* === Modals === */
.modal-overlay,
.preloader-indicator-overlay,
.popup-overlay,
.picker-modal-overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 13000;
  visibility: hidden;
  opacity: 0;
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
}
.modal-overlay.not-animated,
.preloader-indicator-overlay.not-animated,
.popup-overlay.not-animated,
.picker-modal-overlay.not-animated {
  -webkit-transition-duration: 0ms;
  transition-duration: 0ms;
}
.modal-overlay.modal-overlay-visible,
.preloader-indicator-overlay.modal-overlay-visible,
.popup-overlay.modal-overlay-visible,
.picker-modal-overlay.modal-overlay-visible {
  visibility: visible;
  opacity: 1;
}
.popup-overlay {
  z-index: 10500;
}
.picker-modal-overlay {
  z-index: 12000;
}
.modal {
  width: 280px;
  position: absolute;
  z-index: 13500;
  left: 50%;
  margin-left: -140px;
  margin-top: 0;
  top: 50%;
  border-radius: 3px;
  opacity: 0;
  -webkit-transform: translate3d(0, 0, 0) scale(1.185);
  transform: translate3d(0, 0, 0) scale(1.185);
  -webkit-transition-property: -webkit-transform, opacity;
  -moz-transition-property: -moz-transform, opacity;
  -ms-transition-property: -ms-transform, opacity;
  -o-transition-property: -o-transform, opacity;
  transition-property: transform, opacity;
  color: #757575;
  display: none;
  background: #fff;
  font-size: 16px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
}
.modal.modal-in {
  opacity: 1;
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
  -webkit-transform: translate3d(0, 0, 0) scale(1);
  transform: translate3d(0, 0, 0) scale(1);
}
.modal.modal-out {
  opacity: 0;
  z-index: 13499;
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
  -webkit-transform: translate3d(0, 0, 0) scale(0.815);
  transform: translate3d(0, 0, 0) scale(0.815);
}
.modal-inner {
  padding: 24px 24px 20px;
  position: relative;
}
.modal-title {
  font-weight: 500;
  font-size: 20px;
  color: #212121;
  line-height: 1.3;
}
.modal-title + .modal-text {
  margin-top: 20px;
}
.modal-text {
  line-height: 1.5;
}
.modal-buttons {
  height: 48px;
  padding: 6px 8px;
  overflow: hidden;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
}
.modal-buttons.modal-buttons-vertical {
  display: block;
  height: auto;
  padding: 0 0 8px 0;
}
.modal-buttons.modal-buttons-vertical .modal-button {
  margin-left: 0;
  text-align: right;
  height: 48px;
  line-height: 48px;
  border-radius: 0;
  padding-left: 16px;
  padding-right: 16px;
}
.modal-button,
.modal-buttons .button {
  color: #2196f3;
  text-decoration: none;
  text-align: center;
  display: block;
  border-radius: 2px;
  line-height: 36px;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  background: none;
  padding: 0 10px;
  margin: 0;
  height: 36px;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  text-transform: uppercase;
  font-family: inherit;
  cursor: pointer;
  min-width: 64px;
  padding: 0 8px;
  position: relative;
  overflow: hidden;
  outline: 0;
  border: none;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-user-select: none;
  user-select: none;
}
input[type="submit"].modal-button,
input[type="submit"].modal-buttons .button,
input[type="button"].modal-button,
input[type="button"].modal-buttons .button {
  width: 100%;
}
html:not(.watch-active-state) .modal-button:active,
html:not(.watch-active-state) .modal-buttons .button:active,
.modal-button.active-state,
.modal-buttons .button.active-state {
  background: rgba(0, 0, 0, 0.1);
}
.modal-button.button-fill,
.modal-buttons .button.button-fill {
  background-color: #2196f3;
  color: #fff;
}
html:not(.watch-active-state) .modal-button.button-fill:active,
html:not(.watch-active-state) .modal-buttons .button.button-fill:active,
.modal-button.button-fill.active-state,
.modal-buttons .button.button-fill.active-state {
  background: #0c82df;
}
.modal-button.button-big,
.modal-buttons .button.button-big {
  height: 48px;
  line-height: 48px;
  border-radius: 3px;
}
.modal-button i.icon + span,
.modal-buttons .button i.icon + span,
.modal-button span:not(.ripple-wave) + span,
.modal-buttons .button span:not(.ripple-wave) + span,
.modal-button span:not(.ripple-wave) + i.icon,
.modal-buttons .button span:not(.ripple-wave) + i.icon,
.modal-button i.icon + i.icon,
.modal-buttons .button i.icon + i.icon {
  margin-left: 8px;
}
.navbar .modal-button:not(.button-fill),
.navbar .modal-buttons .button:not(.button-fill),
.toolbar .modal-button:not(.button-fill),
.toolbar .modal-buttons .button:not(.button-fill),
.subnavbar .modal-button:not(.button-fill),
.subnavbar .modal-buttons .button:not(.button-fill),
.notifications .modal-button:not(.button-fill),
.notifications .modal-buttons .button:not(.button-fill) {
  color: #fff;
}
html:not(.watch-active-state) .navbar .modal-button:not(.button-fill):active,
html:not(.watch-active-state) .navbar .modal-buttons .button:not(.button-fill):active,
html:not(.watch-active-state) .toolbar .modal-button:not(.button-fill):active,
html:not(.watch-active-state) .toolbar .modal-buttons .button:not(.button-fill):active,
html:not(.watch-active-state) .subnavbar .modal-button:not(.button-fill):active,
html:not(.watch-active-state) .subnavbar .modal-buttons .button:not(.button-fill):active,
html:not(.watch-active-state) .notifications .modal-button:not(.button-fill):active,
html:not(.watch-active-state) .notifications .modal-buttons .button:not(.button-fill):active,
.navbar .modal-button:not(.button-fill).active-state,
.navbar .modal-buttons .button:not(.button-fill).active-state,
.toolbar .modal-button:not(.button-fill).active-state,
.toolbar .modal-buttons .button:not(.button-fill).active-state,
.subnavbar .modal-button:not(.button-fill).active-state,
.subnavbar .modal-buttons .button:not(.button-fill).active-state,
.notifications .modal-button:not(.button-fill).active-state,
.notifications .modal-buttons .button:not(.button-fill).active-state {
  background: rgba(255, 255, 255, 0.15);
}
.modal-button.modal-button-bold,
.modal-buttons .button.modal-button-bold {
  font-weight: 700;
}
.modal-button + .modal-button,
.modal-buttons .button + .modal-button {
  margin-left: 4px;
}
.modal-no-buttons .modal-buttons {
  display: none;
}
.actions-modal {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 13500;
  width: 100%;
  background: #fff;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
  max-height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.actions-modal.modal-in,
.actions-modal.modal-out {
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.actions-modal.modal-in.not-animated,
.actions-modal.modal-out.not-animated {
  -webkit-transition-duration: 0ms;
  transition-duration: 0ms;
}
.actions-modal.modal-in {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.actions-modal.modal-out {
  z-index: 13499;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}
.actions-modal-group {
  position: relative;
}
.actions-modal-group:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  right: auto;
  top: auto;
  height: 1px;
  width: 100%;
  background-color: #d2d2d6;
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
}
html.pixel-ratio-2 .actions-modal-group:after {
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
html.pixel-ratio-3 .actions-modal-group:after {
  -webkit-transform: scaleY(0.33);
  transform: scaleY(0.33);
}
.actions-modal-group:last-child:after {
  display: none;
}
.actions-modal-button,
.actions-modal-label {
  width: 100%;
  font-weight: normal;
  margin: 0;
  box-sizing: border-box;
  display: block;
  position: relative;
  padding: 0 16px;
}
.actions-modal-button a,
.actions-modal-label a {
  text-decoration: none;
  color: inherit;
  display: block;
}
.actions-modal-button b,
.actions-modal-label b {
  font-weight: 500;
}
.actions-modal-button.actions-modal-button-bold,
.actions-modal-label.actions-modal-button-bold {
  font-weight: 500;
}
.actions-modal-button.actions-modal-button-red,
.actions-modal-label.actions-modal-button-red {
  color: #f44336;
}
.actions-modal-button.disabled,
.actions-modal-label.disabled {
  opacity: 0.95;
  color: #9e9e9e;
}
.actions-modal-button {
  cursor: pointer;
  line-height: 48px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87);
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.actions-modal-button a,
.actions-modal-button {
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
html:not(.watch-active-state) .actions-modal-button:active,
.actions-modal-button.active-state {
  background: rgba(0, 0, 0, 0.1);
}
.actions-modal-label {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.54);
  min-height: 56px;
  line-height: 1.3;
  padding-top: 12px;
  padding-bottom: 12px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
input.modal-text-input {
  box-sizing: border-box;
  height: 36px;
  background: #fff;
  margin: 0;
  margin-top: 15px;
  padding: 0;
  border: none;
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  display: block;
  box-shadow: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  -webkit-transition-duration: 200ms;
  transition-duration: 200ms;
}
input.modal-text-input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.35);
}
input.modal-text-input + input.modal-text-input {
  margin-top: 16px;
}
.popover {
  width: 320px;
  background: #fff;
  z-index: 13500;
  margin: 0;
  top: 0;
  opacity: 0;
  left: 0;
  border-radius: 3px;
  position: absolute;
  display: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  -webkit-transform: scale(0.85, 0.6);
  transform: scale(0.85, 0.6);
  -webkit-transition-property: opacity, -webkit-transform, border-radius;
  -moz-transition-property: opacity, -moz-transform, border-radius;
  transition-property: opacity, transform, border-radius;
}
.popover.popover-on-top {
  -webkit-transform-origin: center bottom;
  transform-origin: center bottom;
}
.popover.popover-on-bottom {
  -webkit-transform-origin: center top;
  transform-origin: center top;
}
.popover.modal-in,
.popover.modal-out {
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.popover.modal-in.not-animated,
.popover.modal-out.not-animated {
  -webkit-transition-duration: 0ms;
  transition-duration: 0ms;
}
.popover.modal-in {
  -webkit-transform: scale(1);
  transform: scale(1);
  opacity: 1;
}
.popover.modal-out {
  -webkit-transform: scale(1);
  transform: scale(1);
  opacity: 0;
}
.popover .list-block {
  margin: 0;
}
.popover .list-block:first-child:last-child ul:before {
  display: none;
}
.popover .list-block:first-child:last-child ul:after {
  display: none;
}
.popover .list-block ul {
  background: none;
}
.popover .list-block ul:before {
  display: none;
}
.popover .list-block:first-child ul {
  border-radius: 3px 3px 0 0;
}
.popover .list-block:first-child li:first-child a {
  border-radius: 3px 3px 0 0;
}
.popover .list-block:last-child ul {
  border-radius: 0 0 3px 3px;
}
.popover .list-block:last-child ul:after {
  display: none;
}
.popover .list-block:last-child li:last-child a {
  border-radius: 0 0 3px 3px;
}
.popover .list-block:first-child:last-child li:first-child:last-child a,
.popover .list-block:first-child:last-child ul:first-child:last-child {
  border-radius: 3px;
}
.popover.popover-floating-button {
  -webkit-transform-origin: center center;
  transform-origin: center center;
  -webkit-transform: scale(0.7);
  transform: scale(0.7);
  border-radius: 50%;
  box-shadow: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.popover.popover-floating-button.modal-in {
  border-radius: 0%;
  -webkit-transform: scale(1);
  transform: scale(1);
  -webkit-transition-delay: 200ms;
  transition-delay: 200ms;
  -webkit-transition-duration: 200ms;
  transition-duration: 200ms;
}
.popover.popover-floating-button.modal-out {
  border-radius: 50%;
  -webkit-transform: scale(0.7);
  transform: scale(0.7);
  -webkit-transition-delay: 0ms;
  transition-delay: 0ms;
  -webkit-transition-duration: 100ms;
  transition-duration: 100ms;
}
.popover.popover-floating-button .list-block {
  margin: 0;
}
.popover.popover-floating-button .list-block:first-child ul {
  border-radius: 0;
}
.popover.popover-floating-button .list-block:first-child li:first-child a {
  border-radius: 0;
}
.popover.popover-floating-button .list-block:last-child ul {
  border-radius: 0;
}
.popover.popover-floating-button .list-block:last-child li:last-child a {
  border-radius: 0;
}
.popover.popover-floating-button .list-block:first-child:last-child li:first-child:last-child a,
.popover.popover-floating-button .list-block:first-child:last-child ul:first-child:last-child {
  border-radius: 0;
}
.popover-inner {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.actions-popover .list-block {
  margin: 0;
}
.actions-popover-label {
  padding: 8px 16px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 16px;
  line-height: 1.3;
  padding-top: 12px;
  padding-bottom: 12px;
  position: relative;
}
.actions-popover-label:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  right: auto;
  top: auto;
  height: 1px;
  width: 100%;
  background-color: #d2d2d6;
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
}
html.pixel-ratio-2 .actions-popover-label:after {
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
html.pixel-ratio-3 .actions-popover-label:after {
  -webkit-transform: scaleY(0.33);
  transform: scaleY(0.33);
}
.actions-popover-label:last-child:after {
  display: none;
}
.popup,
.login-screen {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 11000;
  background: #fff;
  box-sizing: border-box;
  display: none;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  -webkit-transition-property: -webkit-transform;
  -moz-transition-property: -moz-transform;
  -ms-transition-property: -ms-transform;
  -o-transition-property: -o-transform;
  transition-property: transform;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}
.popup.modal-in,
.login-screen.modal-in,
.popup.modal-out,
.login-screen.modal-out {
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
}
.popup.modal-in.not-animated,
.login-screen.modal-in.not-animated,
.popup.modal-out.not-animated,
.login-screen.modal-out.not-animated {
  -webkit-transition-duration: 0ms;
  transition-duration: 0ms;
}
.popup.modal-in,
.login-screen.modal-in {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.popup.modal-out,
.login-screen.modal-out {
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}
.login-screen.modal-in,
.login-screen.modal-out {
  display: block;
}
@media all and (min-width: 630px) and (min-height: 630px) {
  .popup:not(.tablet-fullscreen) {
    width: 630px;
    height: 630px;
    left: 50%;
    top: 50%;
    margin-left: -315px;
    margin-top: -315px;
    box-shadow: 0px 20px 44px rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    -webkit-transform: translate3d(0, 1024px, 0);
    transform: translate3d(0, 1024px, 0);
  }
  .popup:not(.tablet-fullscreen).modal-in {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  .popup:not(.tablet-fullscreen).modal-out {
    -webkit-transform: translate3d(0, 1024px, 0);
    transform: translate3d(0, 1024px, 0);
  }
}
@media all and (max-width: 629px), (max-height: 629px) {
  html.with-statusbar-overlay .popup {
    height: -webkit-calc(100% - 24px);
    height: calc(100% - 24px);
    top: 24px;
  }
  html.with-statusbar-overlay .popup-overlay {
    z-index: 9500;
  }
  html.with-statusbar-overlay.ios .popup {
    height: -webkit-calc(100% - 20px);
    height: calc(100% - 20px);
    top: 20px;
  }
}
html.with-statusbar-overlay .login-screen,
html.with-statusbar-overlay .popup.tablet-fullscreen {
  height: -webkit-calc(100% - 24px);
  height: calc(100% - 24px);
  top: 24px;
}
html.with-statusbar-overlay.ios .login-screen,
html.with-statusbar-overlay.ios .popup.tablet-fullscreen {
  height: -webkit-calc(100% - 20px);
  height: calc(100% - 20px);
  top: 20px;
}
.modal-preloader .modal-title,
.modal-preloader .modal-inner {
  text-align: center;
}
.preloader-indicator-overlay {
  visibility: visible;
  opacity: 0;
  background: none;
}
.preloader-indicator-modal {
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 8px;
  margin-left: -24px;
  margin-top: -24px;
  background: rgba(0, 0, 0, 0.8);
  z-index: 13500;
  border-radius: 4px;
}
.preloader-indicator-modal .preloader {
  display: block;
}
.picker-modal {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 260px;
  z-index: 12000;
  display: none;
  -webkit-transition-property: -webkit-transform;
  -moz-transition-property: -moz-transform;
  -ms-transition-property: -ms-transform;
  -o-transition-property: -o-transform;
  transition-property: transform;
  background: #fff;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}
.picker-modal.modal-in,
.picker-modal.modal-out {
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
}
.picker-modal.modal-in.not-animated,
.picker-modal.modal-out.not-animated {
  -webkit-transition-duration: 0ms;
  transition-duration: 0ms;
}
.picker-modal.modal-in {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.picker-modal.modal-out {
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}
.picker-modal .picker-modal-inner {
  height: 100%;
  position: relative;
}
.picker-modal .toolbar {
  position: relative;
  width: 100%;
  top: 0;
}
.picker-modal .toolbar + .picker-modal-inner {
  height: -webkit-calc(100% - 48px);
  height: -moz-calc(100% - 48px);
  height: calc(100% - 48px);
}
.picker-modal .toolbar a.link {
  -webkit-box-flex: 0;
  -webkit-flex-shrink: 0;
  -ms-flex: 0 0 auto;
  flex-shrink: 0;
}
.picker-modal .picker-header,
.picker-modal .picker-footer {
  height: 48px;
}
.picker-modal .picker-header {
  background: #2196f3;
}
.picker-modal .picker-header + .toolbar .toolbar-inner {
  overflow: visible;
}
.picker-modal .picker-header + .picker-footer + .toolbar + .picker-modal-inner {
  height: -webkit-calc(100% - 48px * 3);
  height: -moz-calc(100% - 48px * 3);
  height: calc(100% - 48px * 3);
}
.picker-modal .picker-footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 48px;
  padding: 6px 8px;
  overflow: hidden;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
}
.picker-modal .picker-footer.modal-buttons-vertical {
  display: block;
  height: auto;
  padding: 0 0 8px 0;
}
.picker-modal .picker-footer.modal-buttons-vertical .modal-button {
  margin-left: 0;
  text-align: right;
  height: 48px;
  line-height: 48px;
  border-radius: 0;
  padding-left: 16px;
  padding-right: 16px;
}
.picker-modal .picker-header + .picker-modal-inner,
.picker-modal .picker-footer + .picker-modal-inner {
  height: -webkit-calc(100% - 48px);
  height: -moz-calc(100% - 48px);
  height: calc(100% - 48px);
}
.picker-modal .picker-header + .toolbar + .picker-modal-inner,
.picker-modal .picker-footer + .toolbar + .picker-modal-inner {
  height: -webkit-calc(100% - 48px * 2);
  height: -moz-calc(100% - 48px * 2);
  height: calc(100% - 48px * 2);
}
.picker-modal.picker-modal-inline,
.popover .picker-modal {
  display: block;
  position: relative;
  background: none;
  z-index: inherit;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.picker-modal.picker-modal-inline .toolbar,
.popover .picker-modal .toolbar {
  top: 0;
}
.popover .picker-modal {
  width: auto;
}
.popover .picker-modal .toolbar:first-child,
.popover .picker-modal .picker-header:first-child {
  border-radius: 2px 2px 0 0;
}
.picker-modal.smart-select-picker .list-block {
  margin: 0;
}
.picker-modal.smart-select-picker .list-block ul:before {
  display: none;
}
.picker-modal.smart-select-picker .list-block ul:after {
  display: none;
}
/* === Panels === */
.panel-overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  opacity: 0;
  z-index: 5999;
  display: none;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.panel-overlay.not-animated {
  -webkit-transition-duration: 0ms;
  transition-duration: 0ms;
}
.panel {
  z-index: 1000;
  display: none;
  background: #fff;
  box-sizing: border-box;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  width: 260px;
  top: 0;
  height: 100%;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.panel.not-animated {
  -webkit-transition-duration: 0ms;
  transition-duration: 0ms;
}
.panel.panel-visible {
  display: block;
}
.panel.panel-left {
  left: 0;
}
.panel.panel-left.panel-cover {
  z-index: 6000;
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
}
.panel.panel-right {
  right: 0;
}
.panel.panel-right.panel-cover {
  z-index: 6000;
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
}
.panel.panel-visible-by-breakpoint {
  display: block;
  -webkit-transform: translate3d(0, 0, 0) !important;
  transform: translate3d(0, 0, 0) !important;
  box-shadow: none !important;
}
.panel.panel-visible-by-breakpoint.panel-cover {
  z-index: 5900;
}
body.with-panel-left-cover .panel,
body.with-panel-right-cover .panel {
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
}
body.with-panel-left-cover .views,
body.with-panel-right-cover .views {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
body.with-panel-left-cover .panel-overlay,
body.with-panel-right-cover .panel-overlay {
  display: block;
  opacity: 1;
}
body.with-panel-left-reveal .views,
body.with-panel-right-reveal .views {
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  -webkit-transition-property: -webkit-transform, box-shadow;
  -moz-transition-property: -moz-transform, box-shadow;
  transition-property: transform, box-shadow;
}
body.with-panel-left-reveal .panel.not-animated ~ .views,
body.with-panel-right-reveal .panel.not-animated ~ .views {
  -webkit-transition-duration: 0ms;
  transition-duration: 0ms;
}
body.with-panel-left-reveal .panel-overlay,
body.with-panel-right-reveal .panel-overlay {
  background: rgba(0, 0, 0, 0);
  display: block;
  opacity: 0;
}
body.with-panel-left-reveal .views {
  -webkit-transform: translate3d(260px, 0, 0);
  transform: translate3d(260px, 0, 0);
}
body.with-panel-left-reveal .panel-overlay {
  -webkit-transform: translate3d(260px, 0, 0);
  transform: translate3d(260px, 0, 0);
}
body.with-panel-left-cover .panel.panel-left {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
body.with-panel-right-reveal .views {
  -webkit-transform: translate3d(-260px, 0, 0);
  transform: translate3d(-260px, 0, 0);
}
body.with-panel-right-reveal .panel-overlay {
  -webkit-transform: translate3d(-260px, 0, 0);
  transform: translate3d(-260px, 0, 0);
}
body.with-panel-right-cover .panel.panel-right {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
body.panel-closing .panel-overlay {
  display: block;
}
body.panel-closing .views {
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  -webkit-transition-property: -webkit-transform, box-shadow;
  -moz-transition-property: -moz-transform, box-shadow;
  transition-property: transform, box-shadow;
}
body.panel-closing .panel.not-animated ~ .views {
  -webkit-transition-duration: 0ms;
  transition-duration: 0ms;
}
/* === Images Lazy Loading === */
.lazy-loaded.lazy-fadeIn {
  -webkit-animation: lazyFadeIn 600ms;
  animation: lazyFadeIn 600ms;
}
@-webkit-keyframes lazyFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes lazyFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/* === Tabs === */
.tabs .tab {
  display: none;
}
.tabs .tab.active {
  display: block;
}
.tabs-animated-wrap {
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 100%;
}
.tabs-animated-wrap > .tabs {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  height: 100%;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.tabs-animated-wrap > .tabs > .tab {
  width: 100%;
  display: block;
  -webkit-box-flex: 0;
  -webkit-flex-shrink: 0;
  -ms-flex: 0 0 auto;
  flex-shrink: 0;
}
.tabs-animated-wrap.not-animated > .tabs {
  -webkit-transition-duration: 0ms;
  transition-duration: 0ms;
}
.tabs-swipeable-wrap {
  height: 100%;
}
.tabs-swipeable-wrap > .tabs > .tab {
  display: block;
}
/* === Messages === */
.messages-content {
  background: #eee;
}
.messages {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
}
.messages-date {
  text-align: center;
  font-weight: 500;
  font-size: 12px;
  line-height: 1;
  margin: 10px 15px;
}
.messages-date span {
  font-weight: 400;
}
.message {
  box-sizing: border-box;
  margin: 0px 8px 8px 8px;
  max-width: 80%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
}
.message:first-child {
  margin-top: 8px;
}
.message.message-pic img {
  display: block;
}
.message-name,
.message-label,
.message-date,
.messages-date {
  color: rgba(0, 0, 0, 0.51);
}
.message-name {
  font-size: 12px;
  line-height: 1;
  margin-bottom: 2px;
  margin-top: 7px;
}
.message-hide-name .message-name {
  display: none;
}
.message-label {
  font-size: 12px;
  line-height: 1;
  margin-top: 4px;
}
.message-hide-label .message-label {
  display: none;
}
.message-avatar {
  width: 48px;
  height: 48px;
  border-radius: 100%;
  margin-top: -48px;
  position: relative;
  top: 1px;
  background-size: cover;
  opacity: 1;
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
}
.message-hide-avatar .message-avatar {
  opacity: 0;
}
.message-text {
  box-sizing: border-box;
  border-radius: 2px;
  padding: 6px 8px;
  min-width: 48px;
  font-size: 16px;
  line-height: 1.2;
  word-break: break-word;
  color: #333;
  min-height: 48px;
  position: relative;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.message-text img {
  max-width: 100%;
  height: auto;
}
.message-pic .message-text {
  padding: 8px;
}
.message-date {
  font-size: 12px;
  margin-top: 4px;
}
.message-pic img + .message-date {
  margin-top: 8px;
}
.message-sent {
  -ms-flex-item-align: end;
  -webkit-align-self: flex-end;
  align-self: flex-end;
  -webkit-box-align: end;
  -ms-flex-align: end;
  -webkit-align-items: flex-end;
  align-items: flex-end;
}
.message-sent .message-name,
.message-sent .message-label {
  margin-right: 8px;
}
.message-sent .message-text {
  background-color: #C8E6C9;
  margin-left: auto;
  border-radius: 2px 2px 0 2px;
  margin-right: 8px;
}
.message-sent .message-text:before {
  position: absolute;
  content: '';
  border-left: 0px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #C8E6C9;
  left: 100%;
  bottom: 0;
  width: 0;
  height: 0;
}
.message-sent.message-with-avatar .message-text,
.message-sent.message-with-avatar .message-name,
.message-sent.message-with-avatar .message-label {
  margin-right: 56px;
}
.message-received {
  -ms-flex-item-align: start;
  -webkit-align-self: flex-start;
  align-self: flex-start;
  -webkit-box-align: start;
  -ms-flex-align: start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
}
.message-received .message-text {
  background-color: #fff;
  border-radius: 2px 2px 2px 0px;
  margin-left: 8px;
}
.message-received .message-text:before {
  position: absolute;
  content: '';
  border-left: 8px solid transparent;
  border-right: 0px solid transparent;
  border-bottom: 8px solid #fff;
  right: 100%;
  bottom: 0;
  width: 0;
  height: 0;
}
.message-received .message-name,
.message-received .message-label {
  margin-left: 8px;
}
.message-received.message-with-avatar .message-text,
.message-received.message-with-avatar .message-name,
.message-received.message-with-avatar .message-label {
  margin-left: 56px;
}
.message-appear-from-bottom {
  -webkit-animation: messageAppearFromBottom 400ms;
  animation: messageAppearFromBottom 400ms;
}
.message-appear-from-top {
  -webkit-animation: messageAppearFromTop 400ms;
  animation: messageAppearFromTop 400ms;
}
@-webkit-keyframes messageAppearFromBottom {
  from {
    -webkit-transform: translate3d(0, 100%, 0);
  }
  to {
    -webkit-transform: translate3d(0, 0, 0);
  }
}
@keyframes messageAppearFromBottom {
  from {
    transform: translate3d(0, 100%, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@-webkit-keyframes messageAppearFromTop {
  from {
    -webkit-transform: translate3d(0, -100%, 0);
  }
  to {
    -webkit-transform: translate3d(0, 0, 0);
  }
}
@keyframes messageAppearFromTop {
  from {
    transform: translate3d(0, -100%, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
/* === Statusbar overlay === */
html.with-statusbar-overlay .framework7-root {
  padding-top: 24px;
  box-sizing: border-box;
}
html.with-statusbar-overlay .framework7-root .statusbar-overlay {
  display: block;
}
html.with-statusbar-overlay .framework7-root .panel {
  padding-top: 24px;
}
.statusbar-overlay {
  background: #0D47A1;
  z-index: 10000;
  position: absolute;
  left: 0;
  top: 0;
  height: 24px;
  width: 100%;
  display: none;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
html.with-statusbar-overlay.ios .framework7-root {
  padding-top: 20px;
}
html.with-statusbar-overlay.ios .framework7-root .panel {
  padding-top: 20px;
}
html.ios .statusbar-overlay {
  height: 20px;
}
/* ===
    Preloader
    By Rudi Theunissen (https://github.com/rtheunissen/md-preloader)
=== */
.preloader {
  font-size: 0;
  display: inline-block;
  width: 32px;
  height: 32px;
  -webkit-animation: preloader-outer 3300ms linear infinite;
  animation: preloader-outer 3300ms linear infinite;
}
.preloader svg {
  width: 100%;
  height: 100%;
  -webkit-animation: preloader-inner 1320ms linear infinite;
  animation: preloader-inner 1320ms linear infinite;
}
.preloader svg circle {
  fill: none;
  stroke: #757575;
  stroke-linecap: square;
  -webkit-animation: preloader-arc 1320ms cubic-bezier(0.8, 0, 0.4, 0.8) infinite;
  animation: preloader-arc 1320ms cubic-bezier(0.8, 0, 0.4, 0.8) infinite;
}
@-webkit-keyframes preloader-outer {
  0% {
    -webkit-transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes preloader-outer {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes preloader-inner {
  0% {
    -webkit-transform: rotate(-100.8deg);
  }
  100% {
    -webkit-transform: rotate(0);
  }
}
@keyframes preloader-inner {
  0% {
    transform: rotate(-100.8deg);
  }
  100% {
    transform: rotate(0);
  }
}
@-webkit-keyframes preloader-arc {
  0% {
    stroke-dasharray: 1 210.48670779px;
    stroke-dashoffset: 0;
  }
  40% {
    stroke-dasharray: 151.55042961px, 210.48670779px;
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dasharray: 1 210.48670779px;
    stroke-dashoffset: -151.55042961px;
  }
}
@keyframes preloader-arc {
  0% {
    stroke-dasharray: 1 210.48670779px;
    stroke-dashoffset: 0;
  }
  40% {
    stroke-dasharray: 151.55042961px, 210.48670779px;
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dasharray: 1 210.48670779px;
    stroke-dashoffset: -151.55042961px;
  }
}
.preloader-inner {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  -webkit-animation: preloader-inner-rotate 5.25s cubic-bezier(0.35, 0, 0.25, 1) infinite;
  animation: preloader-inner-rotate 5.25s cubic-bezier(0.35, 0, 0.25, 1) infinite;
}
.preloader-inner .preloader-inner-gap {
  position: absolute;
  width: 2px;
  left: 50%;
  margin-left: -1px;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  border-top: 4px solid #757575;
}
.preloader-inner .preloader-inner-left,
.preloader-inner .preloader-inner-right {
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  overflow: hidden;
}
.preloader-inner .preloader-inner-half-circle {
  position: absolute;
  top: 0;
  height: 100%;
  width: 200%;
  box-sizing: border-box;
  border: 4px solid #757575;
  border-bottom-color: transparent !important;
  border-radius: 50%;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-duration: 1.3125s;
  -webkit-animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
  animation-iteration-count: infinite;
  animation-duration: 1.3125s;
  animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
}
.preloader-white .preloader-inner .preloader-inner-gap,
.preloader-white .preloader-inner .preloader-inner-half-circle {
  border-color: #fff;
}
.preloader-inner .preloader-inner-left {
  left: 0;
}
.preloader-inner .preloader-inner-left .preloader-inner-half-circle {
  left: 0;
  border-right-color: transparent !important;
  -webkit-animation-name: preloader-left-rotate;
  animation-name: preloader-left-rotate;
}
.preloader-inner .preloader-inner-right {
  right: 0;
}
.preloader-inner .preloader-inner-right .preloader-inner-half-circle {
  right: 0;
  border-left-color: transparent !important;
  -webkit-animation-name: preloader-right-rotate;
  animation-name: preloader-right-rotate;
}
.color-multi .preloader-inner .preloader-inner-left .preloader-inner-half-circle {
  -webkit-animation-name: preloader-left-rotate-multicolor;
  animation-name: preloader-left-rotate-multicolor;
}
.color-multi .preloader-inner .preloader-inner-right .preloader-inner-half-circle {
  -webkit-animation-name: preloader-right-rotate-multicolor;
  animation-name: preloader-right-rotate-multicolor;
}
@-webkit-keyframes preloader-left-rotate {
  0%,
  100% {
    -webkit-transform: rotate(130deg);
  }
  50% {
    -webkit-transform: rotate(-5deg);
  }
}
@keyframes preloader-left-rotate {
  0%,
  100% {
    transform: rotate(130deg);
  }
  50% {
    transform: rotate(-5deg);
  }
}
@-webkit-keyframes preloader-right-rotate {
  0%,
  100% {
    -webkit-transform: rotate(-130deg);
  }
  50% {
    -webkit-transform: rotate(5deg);
  }
}
@keyframes preloader-right-rotate {
  0%,
  100% {
    transform: rotate(-130deg);
  }
  50% {
    transform: rotate(5deg);
  }
}
@-webkit-keyframes preloader-inner-rotate {
  12.5% {
    -webkit-transform: rotate(135deg);
  }
  25% {
    -webkit-transform: rotate(270deg);
  }
  37.5% {
    -webkit-transform: rotate(405deg);
  }
  50% {
    -webkit-transform: rotate(540deg);
  }
  62.5% {
    -webkit-transform: rotate(675deg);
  }
  75% {
    -webkit-transform: rotate(810deg);
  }
  87.5% {
    -webkit-transform: rotate(945deg);
  }
  100% {
    -webkit-transform: rotate(1080deg);
  }
}
@keyframes preloader-inner-rotate {
  12.5% {
    transform: rotate(135deg);
  }
  25% {
    transform: rotate(270deg);
  }
  37.5% {
    transform: rotate(405deg);
  }
  50% {
    transform: rotate(540deg);
  }
  62.5% {
    transform: rotate(675deg);
  }
  75% {
    transform: rotate(810deg);
  }
  87.5% {
    transform: rotate(945deg);
  }
  100% {
    transform: rotate(1080deg);
  }
}
@-webkit-keyframes preloader-left-rotate-multicolor {
  0%,
  100% {
    border-left-color: #4285F4;
    -webkit-transform: rotate(130deg);
  }
  75% {
    border-left-color: #1B9A59;
    border-top-color: #1B9A59;
  }
  50% {
    border-left-color: #F7C223;
    border-top-color: #F7C223;
    -webkit-transform: rotate(-5deg);
  }
  25% {
    border-left-color: #DE3E35;
    border-top-color: #DE3E35;
  }
}
@keyframes preloader-left-rotate-multicolor {
  0%,
  100% {
    border-left-color: #4285F4;
    transform: rotate(130deg);
  }
  75% {
    border-left-color: #1B9A59;
    border-top-color: #1B9A59;
  }
  50% {
    border-left-color: #F7C223;
    border-top-color: #F7C223;
    transform: rotate(-5deg);
  }
  25% {
    border-left-color: #DE3E35;
    border-top-color: #DE3E35;
  }
}
@-webkit-keyframes preloader-right-rotate-multicolor {
  0%,
  100% {
    border-right-color: #4285F4;
    -webkit-transform: rotate(-130deg);
  }
  75% {
    border-right-color: #1B9A59;
    border-top-color: #1B9A59;
  }
  50% {
    border-right-color: #F7C223;
    border-top-color: #F7C223;
    -webkit-transform: rotate(5deg);
  }
  25% {
    border-top-color: #DE3E35;
    border-right-color: #DE3E35;
  }
}
@keyframes preloader-right-rotate-multicolor {
  0%,
  100% {
    border-right-color: #4285F4;
    transform: rotate(-130deg);
  }
  75% {
    border-right-color: #1B9A59;
    border-top-color: #1B9A59;
  }
  50% {
    border-right-color: #F7C223;
    border-top-color: #F7C223;
    transform: rotate(5deg);
  }
  25% {
    border-top-color: #DE3E35;
    border-right-color: #DE3E35;
  }
}
/* === Progress Bar === */
.progressbar,
.progressbar-infinite {
  height: 4px;
  width: 100%;
  overflow: hidden;
  display: block;
  position: relative;
  -webkit-transform-origin: center bottom;
  transform-origin: center bottom;
  background: rgba(33, 150, 243, 0.5);
}
.progressbar {
  display: block;
  vertical-align: middle;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
.progressbar span {
  content: '';
  width: 100%;
  background: #2196f3;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
  -webkit-transition-duration: 150ms;
  transition-duration: 150ms;
}
.progressbar-infinite {
  z-index: 15000;
}
.progressbar-infinite:before,
.progressbar-infinite:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #2196f3;
  -webkit-transform-origin: left center;
  transform-origin: left center;
}
.progressbar-infinite:before {
  -webkit-animation: progressbar-infinite-1 2s linear infinite;
  animation: progressbar-infinite-1 2s linear infinite;
}
.progressbar-infinite:after {
  -webkit-animation: progressbar-infinite-2 2s linear infinite;
  animation: progressbar-infinite-2 2s linear infinite;
}
html.with-statusbar-overlay body > .progressbar-infinite,
html.with-statusbar-overlay .framework7-root > .progressbar-infinite {
  top: 24px;
}
html.with-statusbar-overlay.ios body > .progressbar-infinite,
html.with-statusbar-overlay.ios .framework7-root > .progressbar-infinite {
  top: 20px;
}
.progressbar-infinite.color-multi {
  background: none !important;
}
.progressbar-infinite.color-multi:before,
.progressbar-infinite.color-multi:after {
  width: 100%;
  animation: none;
}
.progressbar-infinite.color-multi:before {
  background: none;
  -webkit-animation: progressbar-infinite-multicolor-bg 3s step-end infinite;
  animation: progressbar-infinite-multicolor-bg 3s step-end infinite;
}
.progressbar-infinite.color-multi:after {
  background: none;
  -webkit-animation: progressbar-infinite-multicolor-fill 3s linear infinite;
  animation: progressbar-infinite-multicolor-fill 3s linear infinite;
  -webkit-transform-origin: center center;
  transform-origin: center center;
}
body > .progressbar,
.view > .progressbar,
.views > .progressbar,
.page > .progressbar,
.panel > .progressbar,
.popup > .progressbar,
.framework7-root > .progressbar,
body > .progressbar-infinite,
.view > .progressbar-infinite,
.views > .progressbar-infinite,
.page > .progressbar-infinite,
.panel > .progressbar-infinite,
.popup > .progressbar-infinite,
.framework7-root > .progressbar-infinite {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 15000;
  -webkit-transform-origin: center top;
  transform-origin: center top;
}
.progressbar-in {
  -webkit-animation: progressbar-in 300ms forwards;
  animation: progressbar-in 300ms forwards;
}
.progressbar-out {
  -webkit-animation: progressbar-out 300ms forwards;
  animation: progressbar-out 300ms forwards;
}
html.with-statusbar-overlay body > .progressbar,
html.with-statusbar-overlay .framework7-root > .progressbar {
  top: 24px;
}
html.with-statusbar-overlay.ios body > .progressbar,
html.with-statusbar-overlay.ios .framework7-root > .progressbar {
  top: 20px;
}
@-webkit-keyframes progressbar-in {
  from {
    opacity: 0;
    -webkit-transform: scaleY(0);
  }
  to {
    opacity: 1;
    -webkit-transform: scaleY(1);
  }
}
@keyframes progressbar-in {
  from {
    opacity: 0;
    transform: scaleY(0);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
}
@-webkit-keyframes progressbar-out {
  from {
    opacity: 1;
    -webkit-transform: scaleY(1);
  }
  to {
    opacity: 0;
    -webkit-transform: scaleY(0);
  }
}
@keyframes progressbar-out {
  from {
    opacity: 1;
    transform: scaleY(1);
  }
  to {
    opacity: 0;
    transform: scaleY(0);
  }
}
@-webkit-keyframes progressbar-infinite-1 {
  0% {
    -webkit-transform: translateX(-10%) scaleX(0.1);
  }
  25% {
    -webkit-transform: translateX(30%) scaleX(0.6);
  }
  50% {
    -webkit-transform: translateX(100%) scaleX(1);
  }
  100% {
    -webkit-transform: translateX(100%) scaleX(1);
  }
}
@keyframes progressbar-infinite-1 {
  0% {
    transform: translateX(-10%) scaleX(0.1);
  }
  25% {
    transform: translateX(30%) scaleX(0.6);
  }
  50% {
    transform: translateX(100%) scaleX(1);
  }
  100% {
    transform: translateX(100%) scaleX(1);
  }
}
@-webkit-keyframes progressbar-infinite-2 {
  0% {
    -webkit-transform: translateX(-100%) scaleX(1);
  }
  40% {
    -webkit-transform: translateX(-100%) scaleX(1);
  }
  75% {
    -webkit-transform: translateX(60%) scaleX(0.35);
  }
  90% {
    -webkit-transform: translateX(100%) scaleX(0.1);
  }
  100% {
    -webkit-transform: translateX(100%) scaleX(0.1);
  }
}
@keyframes progressbar-infinite-2 {
  0% {
    transform: translateX(-100%) scaleX(1);
  }
  40% {
    transform: translateX(-100%) scaleX(1);
  }
  75% {
    transform: translateX(60%) scaleX(0.35);
  }
  90% {
    transform: translateX(100%) scaleX(0.1);
  }
  100% {
    transform: translateX(100%) scaleX(0.1);
  }
}
@-webkit-keyframes progressbar-infinite-multicolor-bg {
  0% {
    background-color: #4caf50;
  }
  25% {
    background-color: #f44336;
  }
  50% {
    background-color: #2196f3;
  }
  75% {
    background-color: #ffeb3b;
  }
}
@keyframes progressbar-infinite-multicolor-bg {
  0% {
    background-color: #4caf50;
  }
  25% {
    background-color: #f44336;
  }
  50% {
    background-color: #2196f3;
  }
  75% {
    background-color: #ffeb3b;
  }
}
@-webkit-keyframes progressbar-infinite-multicolor-fill {
  0% {
    -webkit-transform: scaleX(0);
    background-color: #f44336;
  }
  24.9% {
    -webkit-transform: scaleX(1);
    background-color: #f44336;
  }
  25% {
    -webkit-transform: scaleX(0);
    background-color: #2196f3;
  }
  49.9% {
    -webkit-transform: scaleX(1);
    background-color: #2196f3;
  }
  50% {
    -webkit-transform: scaleX(0);
    background-color: #ffeb3b;
  }
  74.9% {
    -webkit-transform: scaleX(1);
    background-color: #ffeb3b;
  }
  75% {
    -webkit-transform: scaleX(0);
    background-color: #4caf50;
  }
  100% {
    -webkit-transform: scaleX(1);
    background-color: #4caf50;
  }
}
@keyframes progressbar-infinite-multicolor-fill {
  0% {
    transform: scaleX(0);
    background-color: #f44336;
  }
  24.9% {
    transform: scaleX(1);
    background-color: #f44336;
  }
  25% {
    transform: scaleX(0);
    background-color: #2196f3;
  }
  49.9% {
    transform: scaleX(1);
    background-color: #2196f3;
  }
  50% {
    transform: scaleX(0);
    background-color: #ffeb3b;
  }
  74.9% {
    transform: scaleX(1);
    background-color: #ffeb3b;
  }
  75% {
    transform: scaleX(0);
    background-color: #4caf50;
  }
  100% {
    transform: scaleX(1);
    background-color: #4caf50;
  }
}
/* === Pull To Refresh === */
.pull-to-refresh-layer {
  position: relative;
  margin-top: -48px;
  left: 0;
  top: 0;
  width: 100%;
  height: 48px;
}
.pull-to-refresh-layer .preloader {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -16px;
  margin-top: -16px;
  visibility: hidden;
}
.pull-to-refresh-layer .pull-to-refresh-arrow {
  width: 24px;
  height: 24px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -12px;
  margin-top: -12px;
  background: no-repeat center;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_16___});
  z-index: 10;
  -webkit-transform: rotate(0deg) translate3d(0, 0, 0);
  transform: rotate(0deg) translate3d(0, 0, 0);
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.pull-to-refresh-content.pull-to-refresh-no-navbar {
  margin-top: -48px;
  height: -webkit-calc(100% + 48px);
  height: -moz-calc(100% + 48px);
  height: calc(100% + 48px);
}
.pull-to-refresh-content.pull-to-refresh-no-navbar .pull-to-refresh-layer {
  margin-top: 0;
}
.pull-to-refresh-content.transitioning,
.pull-to-refresh-content.refreshing {
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
}
.pull-to-refresh-content:not(.refreshing) .pull-to-refresh-layer .preloader {
  -webkit-animation: none;
  animation: none;
}
.pull-to-refresh-content.refreshing {
  -webkit-transform: translate3d(0, 48px, 0);
  transform: translate3d(0, 48px, 0);
}
.pull-to-refresh-content.refreshing .pull-to-refresh-arrow {
  visibility: hidden;
  -webkit-transition-duration: 0ms;
  transition-duration: 0ms;
}
.pull-to-refresh-content.refreshing .preloader {
  visibility: visible;
}
.pull-to-refresh-content.pull-up .pull-to-refresh-arrow {
  -webkit-transform: rotate(180deg) translate3d(0, 0, 0);
  transform: rotate(180deg) translate3d(0, 0, 0);
}
/* === Infinite Scroll Preloader === */
.infinite-scroll-preloader {
  text-align: center;
  padding: 8px 0;
}
/* === Autocomplete === */
.autocomplete-page .autocomplete-found {
  display: block;
}
.autocomplete-page .autocomplete-not-found {
  display: none;
}
.autocomplete-page .autocomplete-values {
  display: block;
}
.autocomplete-page .list-block ul:empty {
  display: none;
}
.autocomplete-page .navbar .autocomplete-preloader {
  margin-right: 16px;
}
.autocomplete-preloader:not(.autocomplete-preloader-visible) {
  -webkit-animation: none;
  animation: none;
  visibility: hidden;
}
.autocomplete-dropdown {
  background: #fff;
  box-sizing: border-box;
  position: absolute;
  z-index: 500;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  width: 100%;
  left: 0;
}
.autocomplete-dropdown .autocomplete-dropdown-inner {
  position: relative;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  z-index: 1;
}
.autocomplete-dropdown .autocomplete-preloader {
  display: none;
  position: absolute;
  right: 16px;
  bottom: 100%;
  margin-bottom: 8px;
  width: 20px;
  height: 20px;
}
.autocomplete-dropdown .autocomplete-preloader .preloader-inner-gap,
.autocomplete-dropdown .autocomplete-preloader .preloader-inner-half-circle {
  border-width: 3px;
}
.autocomplete-dropdown .autocomplete-preloader-visible {
  display: block;
}
.autocomplete-dropdown .autocomplete-dropdown-placeholder {
  color: #a9a9a9;
}
.autocomplete-dropdown .list-block {
  margin: 0;
  color: rgba(0, 0, 0, 0.54);
}
.autocomplete-dropdown .list-block ul {
  background: none !important;
}
.autocomplete-dropdown .list-block ul:before {
  display: none;
}
.autocomplete-dropdown .list-block ul:after {
  display: none;
}
.autocomplete-dropdown .list-block b {
  font-weight: normal;
  color: #212121;
}
/* === Timeline === */
.timeline {
  margin: 32px 0;
  padding: 0 16px;
  box-sizing: border-box;
}
.content-block-inner .timeline {
  padding: 0;
  margin: 0;
}
.timeline-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  padding: 2px 0px 16px;
  box-sizing: border-box;
  position: relative;
}
.timeline-item:last-child {
  padding-bottom: 2px;
}
.timeline-item-date {
  -webkit-box-flex: 0;
  -webkit-flex-shrink: 0;
  -ms-flex: 0 0 auto;
  flex-shrink: 0;
  width: 50px;
  text-align: right;
  box-sizing: border-box;
}
.timeline-item-date small {
  font-size: 10px;
}
.timeline-item-content {
  margin: 2px;
  min-width: 0;
  position: relative;
  -webkit-box-flex: 10;
  -webkit-flex-shrink: 10;
  -ms-flex: 0 10 auto;
  flex-shrink: 10;
}
.timeline-item-content p:first-child,
.timeline-item-content ul:first-child,
.timeline-item-content ol:first-child,
.timeline-item-content h1:first-child,
.timeline-item-content h2:first-child,
.timeline-item-content h3:first-child,
.timeline-item-content h4:first-child {
  margin-top: 0;
}
.timeline-item-content p:last-child,
.timeline-item-content ul:last-child,
.timeline-item-content ol:last-child,
.timeline-item-content h1:last-child,
.timeline-item-content h2:last-child,
.timeline-item-content h3:last-child,
.timeline-item-content h4:last-child {
  margin-bottom: 0;
}
.timeline-item-content .card,
.timeline-item-content.card,
.timeline-item-content .list-block,
.timeline-item-content.list-block,
.timeline-item-content .content-block,
.timeline-item-content.content-block {
  margin: 0;
  width: 100%;
}
.timeline-item-content .card + .card,
.timeline-item-content .list-block + .card,
.timeline-item-content .content-block + .card,
.timeline-item-content .card + .list-block,
.timeline-item-content .list-block + .list-block,
.timeline-item-content .content-block + .list-block,
.timeline-item-content .card + .content-block,
.timeline-item-content .list-block + .content-block,
.timeline-item-content .content-block + .content-block {
  margin: 16px 0 0;
}
.timeline-item-inner {
  border-radius: 2px;
  padding: 8px 16px;
  background: #fff;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.timeline-item-inner .content-block {
  padding: 0;
  color: inherit;
}
.timeline-item-inner .content-block-inner {
  padding-left: 0;
  padding-right: 0;
  margin: 0;
}
.timeline-item-inner .content-block-inner:before {
  display: none;
}
.timeline-item-inner .content-block-inner:after {
  display: none;
}
.timeline-item-inner .list-block ul:before {
  display: none;
}
.timeline-item-inner .list-block ul:after {
  display: none;
}
.timeline-item-inner + .timeline-item-inner {
  margin-top: 16px;
}
.timeline-item-divider {
  width: 1px;
  margin: 0 16px;
  position: relative;
  width: 10px;
  height: 10px;
  background: #bbb;
  border-radius: 50%;
  margin-top: 3px;
  -webkit-box-flex: 0;
  -webkit-flex-shrink: 0;
  -ms-flex: 0 0 auto;
  flex-shrink: 0;
}
.timeline-item-divider:after,
.timeline-item-divider:before {
  content: ' ';
  width: 1px;
  height: 100vh;
  position: absolute;
  left: 50%;
  background: inherit;
  -webkit-transform: translate3d(-50%, 0, 0);
  transform: translate3d(-50%, 0, 0);
}
.timeline-item-divider:after {
  top: 100%;
}
.timeline-item-divider:before {
  bottom: 100%;
}
.timeline-item:last-child .timeline-item-divider:after {
  display: none;
}
.timeline-item:first-child .timeline-item-divider:before {
  display: none;
}
.timeline-item-time {
  color: rgba(0, 0, 0, 0.54);
  margin-top: 16px;
  font-size: 13px;
}
.timeline-item-time:first-child {
  margin-top: 0;
}
.timeline-item-title + .timeline-item-time {
  margin-top: 0;
}
.timeline-item-title {
  font-size: 16px;
}
.timeline-sides .timeline-item {
  margin-left: -moz-calc(50% - (32px + 10px) / 2 - 50px);
  margin-left: -webkit-calc(50% - (32px + 10px) / 2 - 50px);
  margin-left: calc(50% - (32px + 10px) / 2 - 50px);
  margin-right: 0;
}
.timeline-sides .timeline-item .timeline-item-date {
  text-align: right;
}
.timeline-sides .timeline-item:not(.timeline-item-right):nth-child(2n) {
  -webkit-box-direction: reverse;
  -moz-box-direction: reverse;
  -ms-flex-direction: row-reverse;
  -webkit-flex-direction: row-reverse;
  flex-direction: row-reverse;
  margin-right: -moz-calc(50% - (32px + 10px) / 2 - 50px);
  margin-right: -webkit-calc(50% - (32px + 10px) / 2 - 50px);
  margin-right: calc(50% - (32px + 10px) / 2 - 50px);
  margin-left: 0;
}
.timeline-sides .timeline-item:not(.timeline-item-right):nth-child(2n) .timeline-item-date {
  text-align: left;
}
.timeline-sides .timeline-item-left {
  -webkit-box-direction: reverse;
  -moz-box-direction: reverse;
  -ms-flex-direction: row-reverse;
  -webkit-flex-direction: row-reverse;
  flex-direction: row-reverse;
  margin-right: -moz-calc(50% - (32px + 10px) / 2 - 50px);
  margin-right: -webkit-calc(50% - (32px + 10px) / 2 - 50px);
  margin-right: calc(50% - (32px + 10px) / 2 - 50px);
  margin-left: 0;
}
.timeline-sides .timeline-item-left .timeline-item-date {
  text-align: left;
}
.timeline-sides .timeline-item-right {
  margin-left: -moz-calc(50% - (32px + 10px) / 2 - 50px);
  margin-left: -webkit-calc(50% - (32px + 10px) / 2 - 50px);
  margin-left: calc(50% - (32px + 10px) / 2 - 50px);
  margin-right: 0;
}
.timeline-sides .timeline-item-right .timeline-item-date {
  text-align: right;
}
@media (min-width: 768px) {
  .tablet-sides .timeline-item {
    margin-left: -moz-calc(50% - (32px + 10px) / 2 - 50px);
    margin-left: -webkit-calc(50% - (32px + 10px) / 2 - 50px);
    margin-left: calc(50% - (32px + 10px) / 2 - 50px);
    margin-right: 0;
  }
  .tablet-sides .timeline-item .timeline-item-date {
    text-align: right;
  }
  .tablet-sides .timeline-item:not(.timeline-item-right):nth-child(2n) {
    -webkit-box-direction: reverse;
    -moz-box-direction: reverse;
    -ms-flex-direction: row-reverse;
    -webkit-flex-direction: row-reverse;
    flex-direction: row-reverse;
    margin-right: -moz-calc(50% - (32px + 10px) / 2 - 50px);
    margin-right: -webkit-calc(50% - (32px + 10px) / 2 - 50px);
    margin-right: calc(50% - (32px + 10px) / 2 - 50px);
    margin-left: 0;
  }
  .tablet-sides .timeline-item:not(.timeline-item-right):nth-child(2n) .timeline-item-date {
    text-align: left;
  }
  .tablet-sides .timeline-item-left {
    -webkit-box-direction: reverse;
    -moz-box-direction: reverse;
    -ms-flex-direction: row-reverse;
    -webkit-flex-direction: row-reverse;
    flex-direction: row-reverse;
    margin-right: -moz-calc(50% - (32px + 10px) / 2 - 50px);
    margin-right: -webkit-calc(50% - (32px + 10px) / 2 - 50px);
    margin-right: calc(50% - (32px + 10px) / 2 - 50px);
    margin-left: 0;
  }
  .tablet-sides .timeline-item-left .timeline-item-date {
    text-align: left;
  }
  .tablet-sides .timeline-item-right {
    margin-left: -moz-calc(50% - (32px + 10px) / 2 - 50px);
    margin-left: -webkit-calc(50% - (32px + 10px) / 2 - 50px);
    margin-left: calc(50% - (32px + 10px) / 2 - 50px);
    margin-right: 0;
  }
  .tablet-sides .timeline-item-right .timeline-item-date {
    text-align: right;
  }
}
.timeline-horizontal {
  padding: 0;
  margin: 0;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  position: relative;
}
.timeline-horizontal .timeline-item {
  display: block;
  width: 33.33333333vw;
  margin: 0;
  padding: 0;
  -webkit-box-flex: 0;
  -webkit-flex-shrink: 0;
  -ms-flex: 0 0 auto;
  flex-shrink: 0;
  padding-top: 34px;
  padding-bottom: 12px;
  position: relative;
  height: 100%;
}
.timeline-horizontal .timeline-item:after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  left: auto;
  bottom: auto;
  width: 1px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.12);
  display: block;
  z-index: 15;
  -webkit-transform-origin: 100% 50%;
  transform-origin: 100% 50%;
}
html.pixel-ratio-2 .timeline-horizontal .timeline-item:after {
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
}
html.pixel-ratio-3 .timeline-horizontal .timeline-item:after {
  -webkit-transform: scaleX(0.33);
  transform: scaleX(0.33);
}
.timeline-horizontal .timeline-item:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: auto;
  right: auto;
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.12);
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 0%;
  transform-origin: 50% 0%;
}
html.pixel-ratio-2 .timeline-horizontal .timeline-item:before {
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
html.pixel-ratio-3 .timeline-horizontal .timeline-item:before {
  -webkit-transform: scaleY(0.33);
  transform: scaleY(0.33);
}
.timeline-horizontal .timeline-item-date {
  background: #2196f3;
  width: auto;
  text-align: left;
  padding: 0px 12px;
  line-height: 34px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 34px;
  color: #fff;
}
.timeline-horizontal .timeline-item-date:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  right: auto;
  top: auto;
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.12);
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
}
html.pixel-ratio-2 .timeline-horizontal .timeline-item-date:after {
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
html.pixel-ratio-3 .timeline-horizontal .timeline-item-date:after {
  -webkit-transform: scaleY(0.33);
  transform: scaleY(0.33);
}
.timeline-horizontal .timeline-item-content {
  padding: 12px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  margin: 0;
  height: -webkit-calc(100% - 12px);
  height: -moz-calc(100% - 12px);
  height: calc(100% - 12px);
}
.timeline-horizontal .timeline-item-divider {
  display: none;
}
.timeline-horizontal.col-100 .timeline-item {
  width: 100vw;
}
.timeline-horizontal.col-95 .timeline-item {
  width: 95vw;
}
.timeline-horizontal.col-90 .timeline-item {
  width: 90vw;
}
.timeline-horizontal.col-85 .timeline-item {
  width: 85vw;
}
.timeline-horizontal.col-80 .timeline-item {
  width: 80vw;
}
.timeline-horizontal.col-75 .timeline-item {
  width: 75vw;
}
.timeline-horizontal.col-70 .timeline-item {
  width: 70vw;
}
.timeline-horizontal.col-66 .timeline-item {
  width: 66.66666666666666vw;
}
.timeline-horizontal.col-65 .timeline-item {
  width: 65vw;
}
.timeline-horizontal.col-60 .timeline-item {
  width: 60vw;
}
.timeline-horizontal.col-55 .timeline-item {
  width: 55vw;
}
.timeline-horizontal.col-50 .timeline-item {
  width: 50vw;
}
.timeline-horizontal.col-45 .timeline-item {
  width: 45vw;
}
.timeline-horizontal.col-40 .timeline-item {
  width: 40vw;
}
.timeline-horizontal.col-35 .timeline-item {
  width: 35vw;
}
.timeline-horizontal.col-33 .timeline-item {
  width: 33.333333333333336vw;
}
.timeline-horizontal.col-30 .timeline-item {
  width: 30vw;
}
.timeline-horizontal.col-25 .timeline-item {
  width: 25vw;
}
.timeline-horizontal.col-20 .timeline-item {
  width: 20vw;
}
.timeline-horizontal.col-15 .timeline-item {
  width: 15vw;
}
.timeline-horizontal.col-10 .timeline-item {
  width: 10vw;
}
.timeline-horizontal.col-5 .timeline-item {
  width: 5vw;
}
@media all and (min-width: 768px) {
  .timeline-horizontal.tablet-100 .timeline-item {
    width: 100vw;
  }
  .timeline-horizontal.tablet-95 .timeline-item {
    width: 95vw;
  }
  .timeline-horizontal.tablet-90 .timeline-item {
    width: 90vw;
  }
  .timeline-horizontal.tablet-85 .timeline-item {
    width: 85vw;
  }
  .timeline-horizontal.tablet-80 .timeline-item {
    width: 80vw;
  }
  .timeline-horizontal.tablet-75 .timeline-item {
    width: 75vw;
  }
  .timeline-horizontal.tablet-70 .timeline-item {
    width: 70vw;
  }
  .timeline-horizontal.tablet-66 .timeline-item {
    width: 66.66666666666666vw;
  }
  .timeline-horizontal.tablet-65 .timeline-item {
    width: 65vw;
  }
  .timeline-horizontal.tablet-60 .timeline-item {
    width: 60vw;
  }
  .timeline-horizontal.tablet-55 .timeline-item {
    width: 55vw;
  }
  .timeline-horizontal.tablet-50 .timeline-item {
    width: 50vw;
  }
  .timeline-horizontal.tablet-45 .timeline-item {
    width: 45vw;
  }
  .timeline-horizontal.tablet-40 .timeline-item {
    width: 40vw;
  }
  .timeline-horizontal.tablet-35 .timeline-item {
    width: 35vw;
  }
  .timeline-horizontal.tablet-33 .timeline-item {
    width: 33.333333333333336vw;
  }
  .timeline-horizontal.tablet-30 .timeline-item {
    width: 30vw;
  }
  .timeline-horizontal.tablet-25 .timeline-item {
    width: 25vw;
  }
  .timeline-horizontal.tablet-20 .timeline-item {
    width: 20vw;
  }
  .timeline-horizontal.tablet-15 .timeline-item {
    width: 15vw;
  }
  .timeline-horizontal.tablet-10 .timeline-item {
    width: 10vw;
  }
  .timeline-horizontal.tablet-5 .timeline-item {
    width: 5vw;
  }
}
.timeline-year,
.timeline-month {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-flex: 0;
  -webkit-flex-shrink: 0;
  -ms-flex: 0 0 auto;
  flex-shrink: 0;
  padding-top: 24px;
  position: relative;
  box-sizing: border-box;
  height: 100%;
}
.timeline-year-title,
.timeline-month-title {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  line-height: 24px;
  height: 24px;
  padding: 0 12px;
  box-sizing: border-box;
  background: #2196f3;
  color: #fff;
}
.timeline-year-title span,
.timeline-month-title span {
  display: inline-block;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  left: 12px;
}
.timeline-year-title {
  font-size: 16px;
}
.timeline-year-title span {
  margin-top: 2px;
}
.timeline-month-title span {
  margin-top: -2px;
}
/* === Swiper === */
.swiper-container {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  /* Fix of Webkit flickering */
  z-index: 1;
}
.swiper-container-no-flexbox .swiper-slide {
  float: left;
}
.swiper-container-vertical > .swiper-wrapper {
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
}
.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-transition-property: -webkit-transform;
  -moz-transition-property: -moz-transform;
  -o-transition-property: -o-transform;
  -ms-transition-property: -ms-transform;
  transition-property: transform;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}
.swiper-container-android .swiper-slide,
.swiper-wrapper {
  -webkit-transform: translate3d(0px, 0, 0);
  -moz-transform: translate3d(0px, 0, 0);
  -o-transform: translate(0px, 0px);
  -ms-transform: translate3d(0px, 0, 0);
  transform: translate3d(0px, 0, 0);
}
.swiper-container-multirow > .swiper-wrapper {
  -webkit-box-lines: multiple;
  -moz-box-lines: multiple;
  -ms-flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}
.swiper-container-free-mode > .swiper-wrapper {
  -webkit-transition-timing-function: ease-out;
  -moz-transition-timing-function: ease-out;
  -ms-transition-timing-function: ease-out;
  -o-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
  margin: 0 auto;
}
.swiper-slide {
  -webkit-flex-shrink: 0;
  -ms-flex: 0 0 auto;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
}
/* Auto Height */
.swiper-container-autoheight,
.swiper-container-autoheight .swiper-slide {
  height: auto;
}
.swiper-container-autoheight .swiper-wrapper {
  -webkit-box-align: start;
  -ms-flex-align: start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
  -webkit-transition-property: -webkit-transform, height;
  -moz-transition-property: -moz-transform;
  -o-transition-property: -o-transform;
  -ms-transition-property: -ms-transform;
  transition-property: transform, height;
}
/* a11y */
.swiper-container .swiper-notification {
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  opacity: 0;
  z-index: -1000;
}
/* IE10 Windows Phone 8 Fixes */
.swiper-wp8-horizontal {
  -ms-touch-action: pan-y;
  touch-action: pan-y;
}
.swiper-wp8-vertical {
  -ms-touch-action: pan-x;
  touch-action: pan-x;
}
/* Arrows */
.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  width: 27px;
  height: 44px;
  margin-top: -22px;
  z-index: 10;
  cursor: pointer;
  -moz-background-size: 27px 44px;
  -webkit-background-size: 27px 44px;
  background-size: 27px 44px;
  background-position: center;
  background-repeat: no-repeat;
}
.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
  opacity: 0.35;
  cursor: auto;
  pointer-events: none;
}
.swiper-button-prev,
.swiper-container-rtl .swiper-button-next {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_17___});
  left: 10px;
  right: auto;
}
.swiper-button-next,
.swiper-container-rtl .swiper-button-prev {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_18___});
  right: 10px;
  left: auto;
}
/* Pagination Styles */
.swiper-pagination {
  position: absolute;
  text-align: center;
  -webkit-transition: 300ms;
  -moz-transition: 300ms;
  -o-transition: 300ms;
  transition: 300ms;
  -webkit-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  z-index: 10;
}
.swiper-pagination.swiper-pagination-hidden {
  opacity: 0;
}
/* Common Styles */
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 10px;
  left: 0;
  width: 100%;
}
/* Bullets */
.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 100%;
  background: #000;
  opacity: 0.2;
}
button.swiper-pagination-bullet {
  border: none;
  margin: 0;
  padding: 0;
  box-shadow: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -webkit-appearance: none;
  appearance: none;
}
.swiper-pagination-clickable .swiper-pagination-bullet {
  cursor: pointer;
}
.swiper-pagination-bullet-active {
  opacity: 1;
  background: #007aff;
}
.swiper-container-vertical > .swiper-pagination-bullets {
  right: 10px;
  top: 50%;
  -webkit-transform: translate3d(0px, -50%, 0);
  -moz-transform: translate3d(0px, -50%, 0);
  -o-transform: translate(0px, -50%);
  -ms-transform: translate3d(0px, -50%, 0);
  transform: translate3d(0px, -50%, 0);
}
.swiper-container-vertical > .swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 5px 0;
  display: block;
}
.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 0 5px;
}
/* Progress */
.swiper-pagination-progress {
  background: rgba(0, 0, 0, 0.25);
  position: absolute;
}
.swiper-pagination-progress .swiper-pagination-progressbar {
  background: #007aff;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  -o-transform: scale(0);
  transform: scale(0);
  -webkit-transform-origin: left top;
  -moz-transform-origin: left top;
  -ms-transform-origin: left top;
  -o-transform-origin: left top;
  transform-origin: left top;
}
.swiper-container-rtl .swiper-pagination-progress .swiper-pagination-progressbar {
  -webkit-transform-origin: right top;
  -moz-transform-origin: right top;
  -ms-transform-origin: right top;
  -o-transform-origin: right top;
  transform-origin: right top;
}
.swiper-container-horizontal > .swiper-pagination-progress {
  width: 100%;
  height: 4px;
  left: 0;
  top: 0;
}
.swiper-container-vertical > .swiper-pagination-progress {
  width: 4px;
  height: 100%;
  left: 0;
  top: 0;
}
/* 3D Container */
.swiper-container-3d {
  -webkit-perspective: 1200px;
  -moz-perspective: 1200px;
  -o-perspective: 1200px;
  perspective: 1200px;
}
.swiper-container-3d .swiper-wrapper,
.swiper-container-3d .swiper-slide,
.swiper-container-3d .swiper-slide-shadow-left,
.swiper-container-3d .swiper-slide-shadow-right,
.swiper-container-3d .swiper-slide-shadow-top,
.swiper-container-3d .swiper-slide-shadow-bottom,
.swiper-container-3d .swiper-cube-shadow {
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
.swiper-container-3d .swiper-slide-shadow-left,
.swiper-container-3d .swiper-slide-shadow-right,
.swiper-container-3d .swiper-slide-shadow-top,
.swiper-container-3d .swiper-slide-shadow-bottom {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}
.swiper-container-3d .swiper-slide-shadow-left {
  background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));
  /* Safari 4+, Chrome */
  background-image: -webkit-linear-gradient(right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  /* Chrome 10+, Safari 5.1+, iOS 5+ */
  background-image: -moz-linear-gradient(right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  /* Firefox 3.6-15 */
  background-image: -o-linear-gradient(right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  /* Opera 11.10-12.00 */
  background-image: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  /* Firefox 16+, IE10, Opera 12.50+ */
}
.swiper-container-3d .swiper-slide-shadow-right {
  background-image: -webkit-gradient(linear, right top, left top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));
  /* Safari 4+, Chrome */
  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  /* Chrome 10+, Safari 5.1+, iOS 5+ */
  background-image: -moz-linear-gradient(left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  /* Firefox 3.6-15 */
  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  /* Opera 11.10-12.00 */
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  /* Firefox 16+, IE10, Opera 12.50+ */
}
.swiper-container-3d .swiper-slide-shadow-top {
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));
  /* Safari 4+, Chrome */
  background-image: -webkit-linear-gradient(bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  /* Chrome 10+, Safari 5.1+, iOS 5+ */
  background-image: -moz-linear-gradient(bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  /* Firefox 3.6-15 */
  background-image: -o-linear-gradient(bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  /* Opera 11.10-12.00 */
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  /* Firefox 16+, IE10, Opera 12.50+ */
}
.swiper-container-3d .swiper-slide-shadow-bottom {
  background-image: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));
  /* Safari 4+, Chrome */
  background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  /* Chrome 10+, Safari 5.1+, iOS 5+ */
  background-image: -moz-linear-gradient(top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  /* Firefox 3.6-15 */
  background-image: -o-linear-gradient(top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  /* Opera 11.10-12.00 */
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  /* Firefox 16+, IE10, Opera 12.50+ */
}
/* Coverflow */
.swiper-container-coverflow .swiper-wrapper,
.swiper-container-flip .swiper-wrapper {
  /* Windows 8 IE 10 fix */
  -ms-perspective: 1200px;
}
/* Cube + Flip */
.swiper-container-cube,
.swiper-container-flip {
  overflow: visible;
}
.swiper-container-cube .swiper-slide,
.swiper-container-flip .swiper-slide {
  pointer-events: none;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
  z-index: 1;
}
.swiper-container-cube .swiper-slide .swiper-slide,
.swiper-container-flip .swiper-slide .swiper-slide {
  pointer-events: none;
}
.swiper-container-cube .swiper-slide-active,
.swiper-container-flip .swiper-slide-active,
.swiper-container-cube .swiper-slide-active .swiper-slide-active,
.swiper-container-flip .swiper-slide-active .swiper-slide-active {
  pointer-events: auto;
}
.swiper-container-cube .swiper-slide-shadow-top,
.swiper-container-flip .swiper-slide-shadow-top,
.swiper-container-cube .swiper-slide-shadow-bottom,
.swiper-container-flip .swiper-slide-shadow-bottom,
.swiper-container-cube .swiper-slide-shadow-left,
.swiper-container-flip .swiper-slide-shadow-left,
.swiper-container-cube .swiper-slide-shadow-right,
.swiper-container-flip .swiper-slide-shadow-right {
  z-index: 0;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
}
/* Cube */
.swiper-container-cube .swiper-slide {
  visibility: hidden;
  -webkit-transform-origin: 0 0;
  -moz-transform-origin: 0 0;
  -ms-transform-origin: 0 0;
  transform-origin: 0 0;
  width: 100%;
  height: 100%;
}
.swiper-container-cube.swiper-container-rtl .swiper-slide {
  -webkit-transform-origin: 100% 0;
  -moz-transform-origin: 100% 0;
  -ms-transform-origin: 100% 0;
  transform-origin: 100% 0;
}
.swiper-container-cube .swiper-slide-active,
.swiper-container-cube .swiper-slide-next,
.swiper-container-cube .swiper-slide-prev,
.swiper-container-cube .swiper-slide-next + .swiper-slide {
  pointer-events: auto;
  visibility: visible;
}
.swiper-container-cube .swiper-cube-shadow {
  position: absolute;
  left: 0;
  bottom: 0px;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.6;
  -webkit-filter: blur(50px);
  filter: blur(50px);
  z-index: 0;
}
/* Fade */
.swiper-container-fade.swiper-container-free-mode .swiper-slide {
  -webkit-transition-timing-function: ease-out;
  -moz-transition-timing-function: ease-out;
  -ms-transition-timing-function: ease-out;
  -o-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.swiper-container-fade .swiper-slide {
  pointer-events: none;
  -webkit-transition-property: opacity;
  -moz-transition-property: opacity;
  -o-transition-property: opacity;
  transition-property: opacity;
}
.swiper-container-fade .swiper-slide .swiper-slide {
  pointer-events: none;
}
.swiper-container-fade .swiper-slide-active,
.swiper-container-fade .swiper-slide-active .swiper-slide-active {
  pointer-events: auto;
}
.swiper-zoom-container {
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  text-align: center;
}
.swiper-zoom-container > img,
.swiper-zoom-container > svg,
.swiper-zoom-container > canvas {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
/* Scrollbar */
.swiper-scrollbar {
  border-radius: 10px;
  position: relative;
  -ms-touch-action: none;
  background: rgba(0, 0, 0, 0.1);
}
.swiper-container-horizontal > .swiper-scrollbar {
  position: absolute;
  left: 1%;
  bottom: 3px;
  z-index: 50;
  height: 5px;
  width: 98%;
}
.swiper-container-vertical > .swiper-scrollbar {
  position: absolute;
  right: 3px;
  top: 1%;
  z-index: 50;
  width: 5px;
  height: 98%;
}
.swiper-scrollbar-drag {
  height: 100%;
  width: 100%;
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  left: 0;
  top: 0;
}
.swiper-scrollbar-cursor-drag {
  cursor: move;
}
/* Preloader */
.swiper-slide .preloader {
  width: 42px;
  height: 42px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -21px;
  margin-top: -21px;
  z-index: 10;
}
/* === Photo Browser === */
.photo-browser {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 11500;
}
body > .photo-browser,
.framework7-root > .photo-browser {
  opacity: 0;
  display: none;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
body > .photo-browser.photo-browser-in,
.framework7-root > .photo-browser.photo-browser-in {
  display: block;
  -webkit-animation: photoBrowserIn 400ms forwards;
  animation: photoBrowserIn 400ms forwards;
}
body > .photo-browser.photo-browser-out,
.framework7-root > .photo-browser.photo-browser-out {
  display: block;
  -webkit-animation: photoBrowserOut 400ms forwards;
  animation: photoBrowserOut 400ms forwards;
}
html.with-statusbar-overlay body > .photo-browser,
html.with-statusbar-overlay .framework7-root > .photo-browser {
  height: -webkit-calc(100% - 24px);
  height: calc(100% - 24px);
  top: 24px;
}
html.with-statusbar-overlay.ios body > .photo-browser,
html.with-statusbar-overlay.ios .framework7-root > .photo-browser {
  height: -webkit-calc(100% - 20px);
  height: calc(100% - 20px);
  top: 20px;
}
.popup > .photo-browser .navbar,
body > .photo-browser .navbar,
.framework7-root > .photo-browser .navbar,
.popup > .photo-browser .toolbar,
body > .photo-browser .toolbar,
.framework7-root > .photo-browser .toolbar {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.photo-browser .page[data-page="photo-browser-slides"] {
  background: none;
}
.photo-browser-popup {
  background: none;
}
.photo-browser .navbar,
.views .view[data-page="photo-browser-slides"] .navbar,
.photo-browser .toolbar,
.views .view[data-page="photo-browser-slides"] .toolbar {
  background: rgba(33, 150, 243, 0.95);
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
}
.view[data-page="photo-browser-slides"] .page[data-page="photo-browser-slides"] .navbar,
.view[data-page="photo-browser-slides"] .page[data-page="photo-browser-slides"] .toolbar {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.view[data-page="photo-browser-slides"] .page[data-page="photo-browser-slides"] .toolbar,
.photo-browser .page[data-page="photo-browser-slides"] .toolbar {
  bottom: 0;
  top: auto;
}
.photo-browser-exposed .navbar,
.photo-browser-exposed .toolbar {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.photo-browser-exposed .photo-browser-swiper-container {
  background: #000;
}
.photo-browser-of {
  margin: 0 5px;
}
.photo-browser-captions {
  pointer-events: none;
  position: absolute;
  left: 0;
  width: 100%;
  bottom: 0;
  z-index: 10;
  opacity: 1;
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
}
.photo-browser-captions.photo-browser-captions-exposed {
  opacity: 0;
}
.toolbar ~ .photo-browser-captions {
  bottom: 48px;
  -webkit-transform: translate3d(0, 0px, 0);
  transform: translate3d(0, 0px, 0);
}
.photo-browser-exposed .toolbar ~ .photo-browser-captions {
  -webkit-transform: translate3d(0, 48px, 0);
  transform: translate3d(0, 48px, 0);
}
.toolbar ~ .photo-browser-captions.photo-browser-captions-exposed {
  -webkit-transform: translate3d(0, 0px, 0);
  transform: translate3d(0, 0px, 0);
}
.photo-browser-caption {
  box-sizing: border-box;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0;
  padding: 4px 5px;
  width: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.8);
}
.photo-browser-caption:empty {
  display: none;
}
.photo-browser-caption.photo-browser-caption-active {
  opacity: 1;
}
.photo-browser-captions-light .photo-browser-caption {
  background: rgba(255, 255, 255, 0.8);
}
.photo-browser-captions-dark .photo-browser-caption {
  color: #fff;
}
.photo-browser-exposed .photo-browser-caption {
  color: #fff;
  background: rgba(0, 0, 0, 0.8);
}
.photo-browser-swiper-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
}
.photo-browser-swiper-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}
.photo-browser-link-inactive {
  opacity: 0.3;
}
.photo-browser-slide {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-flex: 0;
  -webkit-flex-shrink: 0;
  -ms-flex: 0 0 auto;
  flex-shrink: 0;
  box-sizing: border-box;
}
.photo-browser-slide.transitioning {
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
}
.photo-browser-slide span.swiper-zoom-container {
  display: none;
}
.photo-browser-slide img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  display: none;
}
.photo-browser-slide.swiper-slide-active span.swiper-zoom-container,
.photo-browser-slide.swiper-slide-next span.swiper-zoom-container,
.photo-browser-slide.swiper-slide-prev span.swiper-zoom-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}
.photo-browser-slide.swiper-slide-active img,
.photo-browser-slide.swiper-slide-next img,
.photo-browser-slide.swiper-slide-prev img {
  display: inline;
}
.photo-browser-slide.swiper-slide-active.photo-browser-slide-lazy .preloader,
.photo-browser-slide.swiper-slide-next.photo-browser-slide-lazy .preloader,
.photo-browser-slide.swiper-slide-prev.photo-browser-slide-lazy .preloader {
  display: block;
}
.photo-browser-slide iframe {
  width: 100%;
  height: 100%;
}
.photo-browser-slide .preloader {
  display: none;
  position: absolute;
  width: 42px;
  height: 42px;
  margin-left: -21px;
  margin-top: -21px;
  left: 50%;
  top: 50%;
}
.photo-browser.photo-browser-dark .navbar,
.photo-browser.photo-browser-dark .toolbar {
  background: rgba(30, 30, 30, 0.8);
  color: #fff;
}
.photo-browser.photo-browser-dark .navbar:before,
.photo-browser.photo-browser-dark .toolbar:before {
  display: none;
}
.photo-browser.photo-browser-dark .navbar:after,
.photo-browser.photo-browser-dark .toolbar:after {
  display: none;
}
.photo-browser.photo-browser-dark .navbar a,
.photo-browser.photo-browser-dark .toolbar a {
  color: #fff;
}
.photo-browser.photo-browser-dark .photo-browser-swiper-container {
  background: #000;
}
@-webkit-keyframes photoBrowserIn {
  0% {
    -webkit-transform: translate3d(0, 0, 0) scale(0.5);
    opacity: 0;
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }
}
@keyframes photoBrowserIn {
  0% {
    transform: translate3d(0, 0, 0) scale(0.5);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }
}
@-webkit-keyframes photoBrowserOut {
  0% {
    -webkit-transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0) scale(0.5);
    opacity: 0;
  }
}
@keyframes photoBrowserOut {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, 0, 0) scale(0.5);
    opacity: 0;
  }
}
/* === Columns Picker === */
.picker-columns {
  width: 100%;
  height: 260px;
  z-index: 11500;
}
.picker-columns.picker-modal-inline {
  height: 200px;
}
@media (orientation: landscape) and (max-height: 415px) {
  .picker-columns:not(.picker-modal-inline) {
    height: 200px;
  }
}
.popover.popover-picker-columns {
  width: 280px;
}
.popover.popover-picker-columns .toolbar {
  border-radius: 2px 2px 0 0;
}
.picker-items {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  padding: 0;
  text-align: right;
  font-size: 20px;
  -webkit-mask-box-image: -webkit-linear-gradient(bottom, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent);
  -webkit-mask-box-image: linear-gradient(to top, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent);
}
.picker-items-col {
  overflow: hidden;
  position: relative;
  max-height: 100%;
}
.picker-items-col.picker-items-col-left {
  text-align: left;
}
.picker-items-col.picker-items-col-center {
  text-align: center;
}
.picker-items-col.picker-items-col-right {
  text-align: right;
}
.picker-items-col.picker-items-col-divider {
  color: rgba(0, 0, 0, 0.87);
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.picker-items-col-wrapper {
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.picker-item {
  height: 36px;
  line-height: 36px;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(0, 0, 0, 0.54);
  left: 0;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.picker-item span {
  padding: 0 10px;
}
.picker-items-col-absolute .picker-item {
  position: absolute;
}
.picker-item.picker-item-far {
  pointer-events: none;
}
.picker-item.picker-selected {
  color: rgba(0, 0, 0, 0.87);
  -webkit-transform: translate3d(0, 0, 0) rotateX(0deg);
  transform: translate3d(0, 0, 0) rotateX(0deg);
}
.picker-center-highlight {
  height: 36px;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  width: 100%;
  top: 50%;
  margin-top: -18px;
  pointer-events: none;
}
.picker-center-highlight:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: auto;
  right: auto;
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 0%;
  transform-origin: 50% 0%;
}
html.pixel-ratio-2 .picker-center-highlight:before {
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
html.pixel-ratio-3 .picker-center-highlight:before {
  -webkit-transform: scaleY(0.33);
  transform: scaleY(0.33);
}
.picker-center-highlight:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  right: auto;
  top: auto;
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
}
html.pixel-ratio-2 .picker-center-highlight:after {
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
html.pixel-ratio-3 .picker-center-highlight:after {
  -webkit-transform: scaleY(0.33);
  transform: scaleY(0.33);
}
.picker-3d .picker-items {
  overflow: hidden;
  -webkit-perspective: 1200px;
  perspective: 1200px;
}
.picker-3d .picker-items-col,
.picker-3d .picker-items-col-wrapper,
.picker-3d .picker-item {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
.picker-3d .picker-items-col {
  overflow: visible;
}
.picker-3d .picker-item {
  -webkit-transform-origin: center center -110px;
  transform-origin: center center -110px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
/* === Calendar === */
.picker-calendar {
  background: #fff;
  height: 420px;
  overflow: hidden;
  bottom: auto;
  width: 90%;
  left: 50%;
  top: 50%;
  min-width: 300px;
  max-width: 380px;
  -webkit-transform: translate3d(-50%, 100%, 0);
  transform: translate3d(-50%, 100%, 0);
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
}
@media (orientation: landscape) and (max-height: 460px) {
  .picker-calendar:not(.picker-modal-inline) {
    height: -webkit-calc(100% - 40px);
    height: calc(100% - 40px);
  }
}
.popover-picker-calendar .picker-calendar {
  height: 420px;
}
.picker-calendar .picker-modal-inner {
  overflow: hidden;
}
.picker-calendar.modal-in {
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
}
.picker-calendar.modal-out {
  -webkit-transform: translate3d(-50%, 100%, 0);
  transform: translate3d(-50%, 100%, 0);
}
.picker-calendar.picker-modal-inline {
  height: 300px;
}
.picker-calendar.picker-modal-inline,
.popover-picker-calendar .picker-calendar {
  -webkit-transform: translate3d(0%, 0%, 0);
  transform: translate3d(0%, 0%, 0);
  width: auto;
  max-width: none;
  left: 0;
  top: 0;
  box-shadow: none;
}
.picker-calendar.picker-modal {
  z-index: 12500;
}
.popover.popover-picker-calendar {
  width: 320px;
}
.picker-calendar-selected-date {
  line-height: 48px;
  color: #fff;
  padding: 0 24px;
  font-size: 20px;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.picker-calendar-week-days {
  height: 14.28571429%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  font-size: 12px;
  box-sizing: border-box;
  position: relative;
  color: rgba(0, 0, 0, 0.54);
}
.picker-calendar-week-days .picker-calendar-week-day {
  -webkit-box-flex: 1;
  -webkit-flex-shrink: 1;
  -ms-flex: 0 1 auto;
  flex-shrink: 1;
  width: 14.28571429%;
  width: -webkit-calc(100% / 7);
  width: -moz-calc(100% / 7);
  width: calc(100% / 7);
  text-align: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.picker-calendar-week-days + .picker-calendar-months {
  height: -webkit-calc(100% - 100% / 7);
  height: -moz-calc(100% - 100% / 7);
  height: calc(100% - 100% / 7);
}
.picker-calendar-months {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.picker-calendar-months-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.picker-calendar-month {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.picker-calendar-row {
  height: 16.66666667%;
  height: -webkit-calc(100% / 6);
  height: -moz-calc(100% / 6);
  height: calc(100% / 6);
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-flex: 1;
  -webkit-flex-shrink: 1;
  -ms-flex: 0 1 auto;
  flex-shrink: 1;
  width: 100%;
  position: relative;
}
.picker-calendar-day {
  -webkit-box-flex: 1;
  -webkit-flex-shrink: 1;
  -ms-flex: 0 1 auto;
  flex-shrink: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  box-sizing: border-box;
  width: 14.28571429%;
  width: -webkit-calc(100% / 7);
  width: -moz-calc(100% / 7);
  width: calc(100% / 7);
  text-align: center;
  font-size: 12px;
  cursor: pointer;
}
.picker-calendar-day.picker-calendar-day-prev,
.picker-calendar-day.picker-calendar-day-next {
  color: #b8b8b8;
}
.picker-calendar-day.picker-calendar-day-disabled {
  color: #d4d4d4;
  cursor: auto;
}
.picker-calendar-day.picker-calendar-day-today span {
  color: #2196f3;
}
.picker-calendar-day.picker-calendar-day-selected span {
  background: #2196f3;
  color: #fff;
}
.picker-calendar-range .picker-calendar-day.picker-calendar-day-selected span {
  border-radius: 0;
  width: 100%;
}
.picker-calendar-day.picker-calendar-day-has-events span:after {
  content: '';
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #2196f3;
  position: absolute;
  margin-left: -2px;
  left: 50%;
  bottom: 2px;
}
.picker-calendar-day.picker-calendar-day-has-events.picker-calendar-day-selected span:after {
  display: none;
}
.picker-calendar-day span {
  display: inline-block;
  border-radius: 100%;
  width: 36px;
  height: 36px;
  line-height: 36px;
  position: relative;
}
.picker-calendar-month-picker,
.picker-calendar-year-picker {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  width: 50%;
  max-width: 200px;
  -webkit-box-flex: 10;
  -webkit-flex-shrink: 10;
  -ms-flex: 0 10 auto;
  flex-shrink: 10;
}
.picker-calendar-month-picker span,
.picker-calendar-year-picker span {
  -webkit-box-flex: 1;
  -webkit-flex-shrink: 1;
  -ms-flex: 0 1 auto;
  flex-shrink: 1;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: center;
}
/* === Notifications === */
.notifications {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 20000;
  color: #fff;
  font-size: 14px;
  margin: 0;
  border: none;
  display: none;
  box-sizing: border-box;
  max-height: 100%;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  -webkit-transition-duration: 450ms;
  transition-duration: 450ms;
  -webkit-perspective: 1200px;
  perspective: 1200px;
}
.notifications.list-block > ul {
  max-width: 568px;
  background: #323232;
  margin: 0 auto;
}
.notifications.list-block > ul:before {
  display: none;
}
.notifications.list-block > ul:after {
  display: none;
}
.notifications .item-content {
  -webkit-box-align: start;
  -ms-flex-align: start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
  padding-left: 24px;
}
.notifications .item-title {
  font-size: 14px;
  font-weight: normal;
  white-space: normal;
  padding-top: 14px;
  padding-bottom: 14px;
}
.notifications .item-inner {
  padding-right: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.notifications .item-inner:after {
  display: none;
}
.notifications .item-after {
  max-height: none;
  margin-left: 16px;
}
.notifications .button.close-notification {
  color: #48aeff;
}
.notifications .notification-item {
  margin: 0 auto;
  -webkit-transition-duration: 450ms;
  transition-duration: 450ms;
  -webkit-transition-delay: 100ms;
  transition-delay: 100ms;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
.notifications .notification-hidden {
  opacity: 0;
  -webkit-transition-delay: 0ms;
  transition-delay: 0ms;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.notifications .notification-item-removing {
  -webkit-transition-delay: 0ms;
  transition-delay: 0ms;
}
@media (min-width: 569px) {
  .notifications.list-block > ul {
    border-radius: 2px;
    width: auto;
    min-width: 288px;
  }
}
/* === Login screen === */
.login-screen-content {
  background: #fff;
}
.login-screen-content .login-screen-title,
.login-screen-content .list-block,
.login-screen-content .content-block,
.login-screen-content .list-block-label {
  max-width: 480px;
  margin: 24px auto;
}
.login-screen-content .list-block ul {
  background: none;
}
.login-screen-content .list-block ul:before {
  display: none;
}
.login-screen-content .list-block ul:after {
  display: none;
}
.login-screen-content .list-block-label {
  text-align: center;
}
.navbar-fixed .page .login-screen-content {
  padding-top: 0;
}
.login-screen-title {
  text-align: center;
  font-size: 34px;
}
/* === Touch ripple === */
.ripple,
a.floating-button,
.floating-button > a,
a.link,
a.item-link,
.button,
.modal-button,
.tab-link,
.label-radio,
.label-checkbox,
.actions-modal-button,
.speed-dial-buttons a {
  -webkit-user-select: none;
  user-select: none;
}
.ripple-wave {
  left: 0;
  top: 0;
  position: absolute !important;
  border-radius: 50%;
  pointer-events: none;
  z-index: -1;
  background: rgba(0, 0, 0, 0.1);
  padding: 0;
  margin: 0;
  font-size: 0;
  -webkit-transform: translate3d(0px, 0px, 0) scale(0);
  transform: translate3d(0px, 0px, 0) scale(0);
  -webkit-transition-duration: 1400ms;
  transition-duration: 1400ms;
}
.ripple-wave.ripple-wave-fill {
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  opacity: 0.35;
}
.ripple-wave.ripple-wave-out {
  -webkit-transition-duration: 600ms;
  transition-duration: 600ms;
  opacity: 0;
}
.button-fill .ripple-wave,
.picker-calendar-day .ripple-wave {
  z-index: 1;
}
.button-fill .ripple-wave,
.navbar .ripple-wave,
.toolbar .ripple-wave,
.subnavbar .ripple-wave,
.searchbar .ripple-wave,
.notifications .ripple-wave,
.floating-button .ripple-wave,
.speed-dial-buttons a .ripple-wave {
  background: rgba(255, 255, 255, 0.3);
}
.messagebar .ripple-wave {
  background: rgba(0, 0, 0, 0.1);
}
.data-table .sortable-cell .ripple-wave {
  z-index: 0;
}
.form-checkbox .ripple-wave,
.form-radio .ripple-wave {
  background: rgba(33, 150, 243, 0.5);
  z-index: 0;
}
/* === Disabled elements === */
.disabled,
[disabled] {
  opacity: 0.55;
  pointer-events: none;
}
.disabled .disabled,
.disabled [disabled],
[disabled] .disabled,
[disabled] [disabled] {
  opacity: 1;
}
.data-table {
  overflow-x: auto;
}
.data-table table {
  width: 100%;
  border: none;
  padding: 0;
  margin: 0;
  border-collapse: collapse;
  text-align: left;
}
.data-table thead {
  font-size: 12px;
}
.data-table thead th,
.data-table thead td {
  font-weight: 500;
  height: 56px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 16px;
}
.data-table thead th:not(.sortable-active),
.data-table thead td:not(.sortable-active) {
  color: rgba(0, 0, 0, 0.54);
}
.data-table thead i.icon,
.data-table thead i.material-icons {
  font-size: 16px;
  width: 16px;
  height: 16px;
  vertical-align: top;
}
.data-table tbody {
  font-size: 13px;
}
.data-table tbody tr.data-table-row-selected {
  background: #f5f5f5;
}
.data-table tbody td {
  height: 48px;
}
.data-table tbody td:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: auto;
  right: auto;
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.12);
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 0%;
  transform-origin: 50% 0%;
}
html.pixel-ratio-2 .data-table tbody td:before {
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
html.pixel-ratio-3 .data-table tbody td:before {
  -webkit-transform: scaleY(0.33);
  transform: scaleY(0.33);
}
html:not(.ios):not(.android) .data-table tbody tr:hover {
  background: #f5f5f5;
}
.data-table th,
.data-table td {
  padding: 0;
  position: relative;
  padding-left: 28px;
  padding-right: 28px;
}
.data-table th.label-cell,
.data-table td.label-cell {
  padding-left: 24px;
  padding-right: 24px;
}
.data-table th:first-child,
.data-table td:first-child {
  padding-left: 24px;
}
.data-table th:last-child,
.data-table td:last-child {
  padding-right: 24px;
}
.data-table th.numeric-cell,
.data-table td.numeric-cell {
  text-align: right;
}
.data-table th.checkbox-cell,
.data-table td.checkbox-cell {
  padding-left: 24px;
  padding-right: 12px;
  width: 18px;
  overflow: visible;
}
.data-table th.checkbox-cell + td,
.data-table td.checkbox-cell + td,
.data-table th.checkbox-cell + th,
.data-table td.checkbox-cell + th {
  padding-left: 12px;
}
.data-table th.checkbox-cell label + span,
.data-table td.checkbox-cell label + span {
  padding-left: 8px;
}
.data-table th.actions-cell,
.data-table td.actions-cell {
  text-align: right;
  white-space: nowrap;
}
.data-table th.actions-cell a.link,
.data-table td.actions-cell a.link {
  color: rgba(0, 0, 0, 0.54);
  position: relative;
  z-index: 1;
  cursor: pointer;
}
.data-table th.actions-cell a.link + a.link,
.data-table td.actions-cell a.link + a.link {
  margin-left: 24px;
}
.data-table th.actions-cell a.icon-only,
.data-table td.actions-cell a.icon-only {
  width: 24px;
  height: 24px;
  display: inline-block;
  vertical-align: middle;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  font-size: 0;
}
.data-table th.actions-cell a.icon-only i,
.data-table td.actions-cell a.icon-only i {
  font-size: 18px;
  vertical-align: middle;
}
.data-table .sortable-cell {
  cursor: pointer;
  position: relative;
}
.data-table .sortable-cell:not(.numeric-cell):after,
.data-table .sortable-cell.numeric-cell:before {
  content: '';
  display: inline-block;
  vertical-align: top;
  width: 16px;
  height: 16px;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_19___});
  background-size: 100% auto;
  background-position: center;
  background-repeat: no-repeat;
  font-size: 0;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  -webkit-transform: rotate(0);
  transform: rotate(0);
  opacity: 0;
}
html:not(.ios):not(.android) .data-table .sortable-cell:not(.sortable-active):hover:after,
html:not(.ios):not(.android) .data-table .sortable-cell:not(.sortable-active):hover:before {
  opacity: 0.54;
}
.data-table .sortable-cell.sortable-active:after,
.data-table .sortable-cell.sortable-active:before {
  opacity: 0.87;
}
.data-table .sortable-cell.sortable-desc:after,
.data-table .sortable-cell.sortable-desc:before {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
.data-table .sortable-cell:not(.numeric-cell):after {
  margin-left: 8px;
}
.data-table .sortable-cell.numeric-cell:before {
  margin-right: 8px;
}
.data-table.card .card-header,
.card .data-table .card-header,
.data-table.card .card-footer,
.card .data-table .card-footer {
  padding-left: 24px;
  padding-right: 14px;
}
.data-table.card .card-header,
.card .data-table .card-header {
  height: 64px;
}
.data-table.card .card-footer,
.card .data-table .card-footer {
  height: 56px;
}
.data-table.card .card-content,
.card .data-table .card-content {
  overflow-x: auto;
}
.data-table .data-table-title {
  font-size: 20px;
}
.data-table .data-table-links,
.data-table .data-table-actions {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.data-table .data-table-links a.link,
.data-table .data-table-actions a.link {
  cursor: pointer;
}
.data-table .data-table-links a.link + a.link,
.data-table .data-table-actions a.link + a.link {
  margin-left: 24px;
}
.data-table .data-table-actions {
  margin-left: auto;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.data-table .data-table-actions a.link {
  cursor: pointer;
  min-width: 0;
  color: rgba(0, 0, 0, 0.54);
}
.data-table .data-table-actions a.link.icon-only {
  width: 24px;
  height: 24px;
  line-height: 1;
  overflow: visible;
}
.data-table .data-table-actions a.link.icon-only.active-state,
html:not(.watch-active-state) .data-table .data-table-actions a.link.icon-only:active {
  background: none;
}
.data-table .data-table-header,
.data-table .data-table-header-selected {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  width: 100%;
}
.data-table .card-header > .data-table-header,
.data-table .card-header > .data-table-header-selected {
  padding-left: 24px;
  padding-right: 14px;
  margin-left: -24px;
  margin-right: -14px;
  height: 100%;
  padding-top: 4px;
  padding-bottom: 4px;
}
.data-table .data-table-header-selected {
  display: none;
  background: rgba(33, 150, 243, 0.1);
}
.data-table.data-table-has-checked .data-table-header {
  display: none;
}
.data-table.data-table-has-checked .data-table-header-selected {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}
.data-table .data-table-title-selected {
  color: #2196f3;
  font-size: 14px;
}
@media (max-width: 480px) and (orientation: portrait) {
  .data-table.data-table-collapsible thead {
    display: none;
  }
  .data-table.data-table-collapsible tbody,
  .data-table.data-table-collapsible tr,
  .data-table.data-table-collapsible td {
    display: block;
  }
  .data-table.data-table-collapsible tr {
    position: relative;
  }
  .data-table.data-table-collapsible tr:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: auto;
    right: auto;
    height: 1px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.12);
    display: block;
    z-index: 15;
    -webkit-transform-origin: 50% 0%;
    transform-origin: 50% 0%;
  }
  html.pixel-ratio-2 .data-table.data-table-collapsible tr:before {
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  html.pixel-ratio-3 .data-table.data-table-collapsible tr:before {
    -webkit-transform: scaleY(0.33);
    transform: scaleY(0.33);
  }
  .data-table.data-table-collapsible tr:hover {
    background-color: inherit;
  }
  .data-table.data-table-collapsible td {
    text-align: left;
    padding-left: 16px;
    padding-right: 16px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -ms-flex-line-pack: center;
    -webkit-align-content: center;
    align-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
  }
  .data-table.data-table-collapsible td:before {
    display: none;
  }
  .data-table.data-table-collapsible td:not(.checkbox-cell) {
    font-size: 16px;
  }
  .data-table.data-table-collapsible td:not(.checkbox-cell):before {
    width: 40%;
    display: block;
    content: attr(data-collapsible-title);
    position: relative;
    height: auto;
    background: none;
    -webkit-transform: none !important;
    transform: none !important;
    color: rgba(0, 0, 0, 0.54);
    font-weight: 500;
    font-size: 12px;
    margin-right: 16px;
    line-height: 16px;
    -webkit-box-flex: 0;
    -webkit-flex-shrink: 0;
    -ms-flex: 0 0 auto;
    flex-shrink: 0;
  }
  .data-table.data-table-collapsible td.checkbox-cell {
    position: absolute;
    left: 0;
    top: 0;
  }
  .data-table.data-table-collapsible td.checkbox-cell + td {
    padding-left: 16px;
  }
  .data-table.data-table-collapsible td.checkbox-cell ~ td {
    margin-left: 32px;
  }
}
.data-table .tablet-only,
.data-table .tablet-landscape-only {
  display: none;
}
@media (min-width: 768px) {
  .data-table .tablet-only {
    display: table-cell;
  }
}
@media (min-width: 768px) and (orientation: landscape) {
  .data-table .tablet-landscape-only {
    display: table-cell;
  }
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "XmPF":
/*!******************************************************************!*\
  !*** ./node_modules/framework7/dist/css/framework7.material.css ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "LboF");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../style-loader/dist/runtime/styleDomAPI.js */ "5Hnr");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../style-loader/dist/runtime/insertBySelector.js */ "shRe");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "3c4z");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../style-loader/dist/runtime/insertStyleElement.js */ "3mzb");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../style-loader/dist/runtime/styleTagTransform.js */ "Hd6Y");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_framework7_material_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../css-loader/dist/cjs.js!./framework7.material.css */ "NPdP");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_framework7_material_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_framework7_material_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_framework7_material_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_framework7_material_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "LboF":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "shRe":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "3mzb":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "3c4z":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "5Hnr":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "Hd6Y":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "JizQ":
/*!************************************************************!*\
  !*** ./node_modules/framework7/dist/img/i-f7-material.png ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "6de6a9ac34becea40558.png";

/***/ })

}]);