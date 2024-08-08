(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[7],{

/***/ "Cox/":
/*!*******************************************************!*\
  !*** ./modules/CoreWebclient/js/vendors/FileSaver.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.2
 * 2016-06-16 18:25:19
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs || (function(view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function(node) {
			var event = new MouseEvent("click");
			node.dispatchEvent(event);
		}
		, is_safari = /constructor/i.test(view.HTMLElement) || view.safari
		, is_chrome_ios =/CriOS\/[\d]+/.test(navigator.userAgent)
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
		, arbitrary_revoke_timeout = 1000 * 40 // in ms
		, revoke = function(file) {
			var revoker = function() {
				if (typeof file === "string") { // file is an object URL
					get_URL().revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			};
			setTimeout(revoker, arbitrary_revoke_timeout);
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, auto_bom = function(blob) {
			// prepend BOM for UTF-8 XML and text/* types (including HTML)
			// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
				return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
			}
			return blob;
		}
		, FileSaver = function(blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, force = type === force_saveable_type
				, object_url
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
						// Safari doesn't allow downloading of blob urls
						var reader = new FileReader();
						reader.onloadend = function() {
							var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
							var popup = view.open(url, '_blank');
							if(!popup) view.location.href = url;
							url=undefined; // release reference before dispatching
							filesaver.readyState = filesaver.DONE;
							dispatch_all();
						};
						reader.readAsDataURL(blob);
						filesaver.readyState = filesaver.INIT;
						return;
					}
					// don't create more object URLs than needed
					if (!object_url) {
						object_url = get_URL().createObjectURL(blob);
					}
					if (force) {
						view.location.href = object_url;
					} else {
						var opened = view.open(object_url, "_blank");
						if (!opened) {
							// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
							view.location.href = object_url;
						}
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					revoke(object_url);
				}
			;
			filesaver.readyState = filesaver.INIT;

			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				setTimeout(function() {
					save_link.href = object_url;
					save_link.download = name;
					click(save_link);
					dispatch_all();
					revoke(object_url);
					filesaver.readyState = filesaver.DONE;
				});
				return;
			}

			fs_error();
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name, no_auto_bom) {
			return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
		}
	;
	// IE 10+ (native saveAs)
	if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
		return function(blob, name, no_auto_bom) {
			name = name || blob.name || "download";

			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			return navigator.msSaveOrOpenBlob(blob, name);
		};
	}

	FS_proto.abort = function(){};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if ( true && module.exports) {
  module.exports.saveAs = saveAs;
} else if (( true && __webpack_require__.amdD !== null) && (__webpack_require__.amdO !== null)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
    return saveAs;
  }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}


/***/ }),

/***/ "/dxK":
/*!*********************************************************************!*\
  !*** ./modules/CoreParanoidEncryptionWebclientPlugin/js/CCrypto.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var $ = __webpack_require__(/*! jquery */ "M4cL"),
  _ = __webpack_require__(/*! underscore */ "C3HO"),
  ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  FileSaver = __webpack_require__(/*! modules/CoreWebclient/js/vendors/FileSaver.js */ "Cox/"),
  JscryptoKey = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/JscryptoKey.js */ "0+zD"),
  Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
  HexUtils = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/utils/Hex.js */ "Zukw"),
  Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
  OutdatedEncryptionMethodPopup = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/popups/OutdatedEncryptionMethodPopup.js */ "A2fR"),
  GetTemporaryKeyPopup = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/popups/GetTemporaryKeyPopup.js */ "PnO4"),
  Settings = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/Settings.js */ "AgXX"),
  OpenPgpEncryptor = ModulesManager.run('OpenPgpWebclient', 'getOpenPgpEncryptor');

/**
 * @constructor
 */
function CCrypto() {
  this.iChunkNumber = 0;
  this.iChunkSize = Settings.ChunkSizeMb * 1024 * 1024;
  this.iCurrChunk = 0;
  this.oChunk = null;
  this.iv = null;
  // Queue of files awaiting upload
  this.oChunkQueue = {
    isProcessed: false,
    privateKeyPassword: '',
    aFiles: []
  };
  this.aStopList = [];
  this.fOnUploadCancelCallback = null;
  this.oKey = null;
}
CCrypto.prototype.start = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(oFileInfo) {
    var ParanoidKey,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          ParanoidKey = _args.length > 1 && _args[1] !== undefined ? _args[1] : '';
          this.oFileInfo = oFileInfo;
          this.oFile = oFileInfo.File;
          this.iChunkNumber = Math.ceil(oFileInfo.File.size / this.iChunkSize);
          this.iCurrChunk = 0;
          this.oChunk = null;
          this.iv = window.crypto.getRandomValues(new Uint8Array(16));
          this.oFileInfo.Hidden = {
            'RangeType': 1,
            'Overwrite': true
          };
          this.oFileInfo.Hidden.ExtendedProps = {
            'InitializationVector': HexUtils.Array2HexString(new Uint8Array(this.iv))
          };
          if (ParanoidKey) {
            this.oFileInfo.Hidden.ExtendedProps.ParanoidKey = ParanoidKey;
          }
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
CCrypto.prototype.startUpload = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(oFileInfo, sUid, fOnChunkEncryptCallback, fCancelCallback) {
    var sKeyData, oCurrentUserPrivateKey, CurrentUserPublicKey, sEncryptedKey;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          this.oChunkQueue.isProcessed = true;
          _context2.next = 3;
          return JscryptoKey.generateKey();
        case 3:
          this.oKey = _context2.sent;
          _context2.next = 6;
          return JscryptoKey.convertKeyToString(this.oKey);
        case 6:
          sKeyData = _context2.sent;
          _context2.next = 9;
          return OpenPgpEncryptor.getCurrentUserPrivateKey();
        case 9:
          oCurrentUserPrivateKey = _context2.sent;
          if (!(oCurrentUserPrivateKey && sKeyData)) {
            _context2.next = 30;
            break;
          }
          _context2.next = 13;
          return OpenPgpEncryptor.getCurrentUserPublicKey();
        case 13:
          CurrentUserPublicKey = _context2.sent;
          if (!CurrentUserPublicKey) {
            _context2.next = 27;
            break;
          }
          _context2.next = 17;
          return this.encryptParanoidKey(sKeyData, [CurrentUserPublicKey]);
        case 17:
          sEncryptedKey = _context2.sent;
          if (!sEncryptedKey) {
            _context2.next = 24;
            break;
          }
          _context2.next = 21;
          return this.start(oFileInfo, sEncryptedKey);
        case 21:
          this.readChunk(sUid, fOnChunkEncryptCallback);
          _context2.next = 25;
          break;
        case 24:
          if (_.isFunction(fCancelCallback)) {
            fCancelCallback();
          }
        case 25:
          _context2.next = 28;
          break;
        case 27:
          if (_.isFunction(fCancelCallback)) {
            fCancelCallback();
          }
        case 28:
          _context2.next = 31;
          break;
        case 30:
          if (_.isFunction(fCancelCallback)) {
            fCancelCallback();
          }
        case 31:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this);
  }));
  return function (_x2, _x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
CCrypto.prototype.readChunk = function (sUid, fOnChunkEncryptCallback) {
  var iStart = this.iChunkSize * this.iCurrChunk,
    iEnd = this.iCurrChunk < this.iChunkNumber - 1 ? this.iChunkSize * (this.iCurrChunk + 1) : this.oFile.size,
    oReader = new FileReader(),
    oBlob = null;
  if (this.aStopList.indexOf(sUid) !== -1) {
    // if user canceled uploading file with uid = sUid
    this.aStopList.splice(this.aStopList.indexOf(sUid), 1);
    this.checkQueue();
    return;
  } else {
    // Get file chunk
    if (this.oFile.slice) {
      oBlob = this.oFile.slice(iStart, iEnd);
    } else if (this.oFile.webkitSlice) {
      oBlob = this.oFile.webkitSlice(iStart, iEnd);
    } else if (this.oFile.mozSlice) {
      oBlob = this.oFile.mozSlice(iStart, iEnd);
    }
    if (oBlob) {
      try {
        //Encrypt file chunk
        oReader.onloadend = _.bind(function (evt) {
          if (evt.target.readyState === FileReader.DONE) {
            this.oChunk = evt.target.result;
            this.iCurrChunk++;
            this.encryptChunk(sUid, fOnChunkEncryptCallback);
          }
        }, this);
        oReader.readAsArrayBuffer(oBlob);
      } catch (err) {
        Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_ENCRYPTION'));
      }
    }
  }
};
CCrypto.prototype.encryptChunk = function (sUid, fOnChunkEncryptCallback) {
  crypto.subtle.encrypt({
    name: 'AES-CBC',
    iv: this.iv
  }, this.oKey, this.oChunk).then(_.bind(function (oEncryptedContent) {
    //delete padding for all chunks except last one
    oEncryptedContent = this.iChunkNumber > 1 && this.iCurrChunk !== this.iChunkNumber ? oEncryptedContent.slice(0, oEncryptedContent.byteLength - 16) : oEncryptedContent;
    var oEncryptedFile = new Blob([oEncryptedContent], {
        type: "text/plain",
        lastModified: new Date()
      }),
      //fProcessNextChunkCallback runs after previous chunk uploading
      fProcessNextChunkCallback = _.bind(function (sUid, fOnChunkEncryptCallback) {
        if (this.iCurrChunk < this.iChunkNumber) {
          // if it was not last chunk - read another chunk
          this.readChunk(sUid, fOnChunkEncryptCallback);
        } else {
          // if it was last chunk - check Queue for files awaiting upload
          this.oChunkQueue.isProcessed = false;
          this.checkQueue();
        }
      }, this);
    this.oFileInfo.File = oEncryptedFile;
    //use last 16 byte of current chunk as initial vector for next chunk
    this.iv = new Uint8Array(oEncryptedContent.slice(oEncryptedContent.byteLength - 16));
    if (this.iCurrChunk === 1) {
      // for first chunk enable 'FirstChunk' attribute. This is necessary to solve the problem of simultaneous loading of files with the same name
      this.oFileInfo.Hidden.ExtendedProps.FirstChunk = true;
    } else {
      this.oFileInfo.Hidden.ExtendedProps.FirstChunk = null;
    }
    if (this.iCurrChunk == this.iChunkNumber) {
      // unmark file as loading
      this.oFileInfo.Hidden.ExtendedProps.Loading = null;
    } else {
      // mark file as loading until upload doesn't finish
      this.oFileInfo.Hidden.ExtendedProps.Loading = true;
    }
    // call upload of encrypted chunk
    fOnChunkEncryptCallback(sUid, this.oFileInfo, fProcessNextChunkCallback, this.iCurrChunk, this.iChunkNumber, (this.iCurrChunk - 1) * this.iChunkSize);
  }, this))["catch"](function (err) {
    Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_ENCRYPTION'));
  });
};
CCrypto.prototype.downloadDividedFile = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(oFile, iv, fProcessBlobCallback, fProcessBlobErrorCallback) {
    var sParanoidEncryptedKey,
      sKey,
      _args3 = arguments;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          sParanoidEncryptedKey = _args3.length > 4 && _args3[4] !== undefined ? _args3[4] : '';
          oFile.startDownloading();
          _context3.next = 4;
          return this.prepareKey(oFile, sParanoidEncryptedKey);
        case 4:
          sKey = _context3.sent;
          if (sKey !== false) {
            new CDownloadFile(oFile, iv, this.iChunkSize, fProcessBlobCallback, fProcessBlobErrorCallback, sKey);
          } else {
            oFile.stopDownloading();
          }
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3, this);
  }));
  return function (_x6, _x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
CCrypto.prototype.prepareKey = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(oFile) {
    var sParanoidEncryptedKey,
      sKey,
      bContinue,
      _args4 = arguments;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          sParanoidEncryptedKey = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : '';
          sKey = '';
          if (!sParanoidEncryptedKey) {
            _context4.next = 10;
            break;
          }
          _context4.next = 5;
          return this.decryptParanoidKey(sParanoidEncryptedKey);
        case 5:
          sKey = _context4.sent;
          if (sKey) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", false);
        case 8:
          _context4.next = 22;
          break;
        case 10:
          if (Settings.DontRemindMe()) {
            _context4.next = 16;
            break;
          }
          _context4.next = 13;
          return this.showOutdatedEncryptionMethodPopup(oFile.fileName());
        case 13:
          bContinue = _context4.sent;
          if (bContinue) {
            _context4.next = 16;
            break;
          }
          return _context4.abrupt("return", false);
        case 16:
          if (this.isKeyInStorage()) {
            _context4.next = 22;
            break;
          }
          _context4.next = 19;
          return this.getTemporaryKeyAsString();
        case 19:
          sKey = _context4.sent;
          if (sKey) {
            _context4.next = 22;
            break;
          }
          return _context4.abrupt("return", false);
        case 22:
          return _context4.abrupt("return", sKey);
        case 23:
        case "end":
          return _context4.stop();
      }
    }, _callee4, this);
  }));
  return function (_x10) {
    return _ref4.apply(this, arguments);
  };
}();
CCrypto.prototype.getTemporaryKeyAsString = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
  var oPromiseGetKey, sKey;
  return _regeneratorRuntime().wrap(function _callee5$(_context5) {
    while (1) switch (_context5.prev = _context5.next) {
      case 0:
        oPromiseGetKey = new Promise(function (resolve, reject) {
          var fOnKeyEnterCallback = function fOnKeyEnterCallback(sKey) {
            resolve(sKey);
          };
          var fOnCancellCallback = function fOnCancellCallback() {
            resolve(false);
          };
          //showing popup
          Popups.showPopup(GetTemporaryKeyPopup, [fOnKeyEnterCallback, fOnCancellCallback]);
        });
        _context5.next = 3;
        return oPromiseGetKey;
      case 3:
        sKey = _context5.sent;
        return _context5.abrupt("return", sKey);
      case 5:
      case "end":
        return _context5.stop();
    }
  }, _callee5);
}));
CCrypto.prototype.showOutdatedEncryptionMethodPopup = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(sFileName) {
    var oPromiseShowPopup, bResult;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          oPromiseShowPopup = new Promise(function (resolve, reject) {
            var fContinueCallback = function fContinueCallback() {
              resolve(true);
            };
            var fCancellCallback = function fCancellCallback() {
              resolve(false);
            };
            //showing popup
            Popups.showPopup(OutdatedEncryptionMethodPopup, [sFileName, fContinueCallback, fCancellCallback]);
          });
          _context6.next = 3;
          return oPromiseShowPopup;
        case 3:
          bResult = _context6.sent;
          return _context6.abrupt("return", bResult);
        case 5:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x11) {
    return _ref6.apply(this, arguments);
  };
}();
CCrypto.prototype.encryptParanoidKey = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(sParanoidKey, aPublicKeys) {
    var sPassword,
      sEncryptedKey,
      oPrivateKey,
      oPGPEncryptionResult,
      _oPGPEncryptionResult,
      data,
      passphrase,
      _args7 = arguments;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          sPassword = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : '';
          if (sPassword === '') {
            sPassword = this.oChunkQueue.privateKeyPassword;
          }
          sEncryptedKey = '';
          _context7.next = 5;
          return OpenPgpEncryptor.getCurrentUserPrivateKey();
        case 5:
          oPrivateKey = _context7.sent;
          if (!oPrivateKey) {
            _context7.next = 11;
            break;
          }
          _context7.next = 9;
          return OpenPgpEncryptor.encryptData(sParanoidKey, aPublicKeys, [oPrivateKey], false, /*bPasswordBasedEncryption*/
          true, /*bSign*/
          sPassword);
        case 9:
          oPGPEncryptionResult = _context7.sent;
          if (oPGPEncryptionResult.result) {
            _oPGPEncryptionResult = oPGPEncryptionResult.result, data = _oPGPEncryptionResult.data, passphrase = _oPGPEncryptionResult.passphrase;
            this.oChunkQueue.privateKeyPassword = passphrase;
            sEncryptedKey = data;
          } else if (oPGPEncryptionResult.hasErrors() || oPGPEncryptionResult.hasNotices()) {
            OpenPgpEncryptor.showPgpErrorByCode(oPGPEncryptionResult, '', TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_LOAD_KEY'));
          }
        case 11:
          return _context7.abrupt("return", sEncryptedKey);
        case 12:
        case "end":
          return _context7.stop();
      }
    }, _callee7, this);
  }));
  return function (_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();
CCrypto.prototype.decryptParanoidKey = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(sParanoidEncryptedKey) {
    var sPassword,
      sKey,
      oPGPDecryptionResult,
      oCurrentUserPrivateKey,
      sReport,
      aErrors,
      aNotices,
      _args8 = arguments;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          sPassword = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : '';
          sKey = '';
          _context8.next = 4;
          return OpenPgpEncryptor.decryptData(sParanoidEncryptedKey, sPassword);
        case 4:
          oPGPDecryptionResult = _context8.sent;
          if (!oPGPDecryptionResult.result) {
            _context8.next = 17;
            break;
          }
          sKey = oPGPDecryptionResult.result;
          if (!(oPGPDecryptionResult.validKeyNames && oPGPDecryptionResult.validKeyNames.length)) {
            _context8.next = 14;
            break;
          }
          _context8.next = 10;
          return OpenPgpEncryptor.getCurrentUserPrivateKey();
        case 10:
          oCurrentUserPrivateKey = _context8.sent;
          if (!oCurrentUserPrivateKey || !oPGPDecryptionResult.validKeyNames.includes(oCurrentUserPrivateKey.getUser())) {
            //Paranoid-key was signed with a foreign key
            sReport = TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/REPORT_SUCCESSFULL_SIGNATURE_VERIFICATION') + oPGPDecryptionResult.validKeyNames.join(', ').replace(/</g, "&lt;").replace(/>/g, "&gt;");
            Screens.showReport(sReport);
          }
          _context8.next = 15;
          break;
        case 14:
          if (oPGPDecryptionResult.notices && _.indexOf(oPGPDecryptionResult.notices, Enums.OpenPgpErrors.VerifyErrorNotice) !== -1) {
            Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_SIGNATURE_NOT_VERIFIED'));
          }
        case 15:
          _context8.next = 18;
          break;
        case 17:
          if (oPGPDecryptionResult.hasErrors() || oPGPDecryptionResult.hasNotices()) {
            //if errors or notices contains PrivateKeyNotFoundError
            aErrors = oPGPDecryptionResult.errors ? oPGPDecryptionResult.errors : [];
            aNotices = oPGPDecryptionResult.notices ? oPGPDecryptionResult.notices : [];
            if ([].concat(_toConsumableArray(aErrors), _toConsumableArray(aNotices)).some(function (error) {
              return error.length && error[0] === Enums.OpenPgpErrors.PrivateKeyNotFoundError;
            })) {
              //show error message customised for files
              Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_NO_PRIVATE_KEY_FOUND_FOR_DECRYPT'));
            } else {
              OpenPgpEncryptor.showPgpErrorByCode(oPGPDecryptionResult, '', TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_LOAD_KEY'));
            }
          }
        case 18:
          return _context8.abrupt("return", sKey);
        case 19:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function (_x14) {
    return _ref8.apply(this, arguments);
  };
}();

/**
* Checking Queue for files awaiting upload
*/
CCrypto.prototype.checkQueue = function () {
  var aNode = null;
  if (this.oChunkQueue.aFiles.length > 0) {
    aNode = this.oChunkQueue.aFiles.shift();
    aNode.fStartUploadCallback.apply(aNode.fStartUploadCallback, [aNode.oFileInfo, aNode.sUid, aNode.fOnChunkEncryptCallback]);
  } else {
    this.oChunkQueue.privateKeyPassword = '';
  }
};
/**
* Stop file uploading
*
* @param {String} sUid
* @param {Function} fOnUploadCancelCallback
*/
CCrypto.prototype.stopUploading = function (sUid, fOnUploadCancelCallback, sFileName) {
  var bFileInQueue = false;
  // If file await to be uploaded - delete it from queue
  this.oChunkQueue.aFiles.forEach(function (oData, index, array) {
    if (oData.sUid === sUid) {
      fOnUploadCancelCallback(sUid, oData.oFileInfo.FileName);
      array.splice(index, 1);
      bFileInQueue = true;
    }
  });
  if (!bFileInQueue) {
    this.aStopList.push(sUid);
    this.oChunkQueue.isProcessed = false;
    fOnUploadCancelCallback(sUid, sFileName);
    this.oKey = null;
    //		this.checkQueue();
  }
};
CCrypto.prototype.viewEncryptedImage = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(oFile, iv) {
    var sParanoidEncryptedKey,
      sKey,
      _args9 = arguments;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          sParanoidEncryptedKey = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : '';
          oFile.startDownloading();
          _context9.next = 4;
          return this.prepareKey(oFile, sParanoidEncryptedKey);
        case 4:
          sKey = _context9.sent;
          if (sKey !== false) {
            new CViewImage(oFile, iv, this.iChunkSize, sKey);
          } else {
            oFile.stopDownloading();
          }
        case 6:
        case "end":
          return _context9.stop();
      }
    }, _callee9, this);
  }));
  return function (_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();
CCrypto.prototype.isKeyInStorage = function () {
  return !!JscryptoKey.loadKeyFromStorage();
};
function CDownloadFile(oFile, iv, iChunkSize, fProcessBlobCallback, fProcessBlobErrorCallback) {
  var sKey = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
  this.oWriter = new CWriter(oFile.fileName(), fProcessBlobCallback);
  this.init(oFile, iv, iChunkSize, fProcessBlobErrorCallback, sKey);
}
CDownloadFile.prototype.init = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(oFile, iv, iChunkSize, fProcessBlobErrorCallback, sKey) {
    var _this = this;
    var fCancelCallback, oKey;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          this.sHash = Utils.getRandomHash();
          this.oFile = oFile;
          this.sFileName = oFile.fileName();
          this.iFileSize = oFile.size();
          this.sDownloadLink = oFile.getActionUrl('download');
          this.iCurrChunk = 0;
          this.iv = new Uint8Array(HexUtils.HexString2Array(iv));
          this.key = null;
          this.iChunkNumber = Math.ceil(this.iFileSize / iChunkSize);
          this.iChunkSize = iChunkSize;
          this.fProcessBlobErrorCallback = fProcessBlobErrorCallback;
          //clear parameters after & if DownloadLink contains any
          if (this.sDownloadLink.indexOf('&') > 0) {
            this.sDownloadLink = this.sDownloadLink.substring(0, this.sDownloadLink.indexOf('&'));
          }
          fCancelCallback = function fCancelCallback() {
            if (_.isFunction(_this.fProcessBlobErrorCallback)) {
              _this.fProcessBlobErrorCallback();
            }
            _this.stopDownloading();
          };
          if (!sKey) {
            _context10.next = 20;
            break;
          }
          _context10.next = 16;
          return JscryptoKey.getKeyFromString(sKey);
        case 16:
          oKey = _context10.sent;
          if (oKey) {
            this.key = oKey;
            this.decryptChunk();
          } else {
            fCancelCallback();
          }
          _context10.next = 21;
          break;
        case 20:
          //read the key from local storage
          JscryptoKey.getKey(function (oKey) {
            _this.key = oKey;
            _this.decryptChunk();
          }, fCancelCallback);
        case 21:
        case "end":
          return _context10.stop();
      }
    }, _callee10, this);
  }));
  return function (_x17, _x18, _x19, _x20, _x21) {
    return _ref10.apply(this, arguments);
  };
}();
CDownloadFile.prototype.writeChunk = function (oDecryptedUint8Array) {
  if (this.oFile.downloading() !== true) {
    // if download was canceled
    return;
  } else {
    this.oWriter.write(oDecryptedUint8Array); //write decrypted chunk
    if (this.iCurrChunk < this.iChunkNumber) {
      //if it was not last chunk - decrypting another chunk
      this.decryptChunk();
    } else {
      this.stopDownloading();
      this.oWriter.close();
    }
  }
};
CDownloadFile.prototype.decryptChunk = function () {
  var oReq = new XMLHttpRequest();
  oReq.open("GET", this.getChunkLink(), true);
  oReq.responseType = 'arraybuffer';
  oReq.onprogress = _.bind(function (oEvent) {
    if (this.isDownloading()) {
      this.oFile.onDownloadProgress(oEvent.loaded + (this.iCurrChunk - 1) * this.iChunkSize, this.iFileSize);
    } else {
      oReq.abort();
    }
  }, this);
  oReq.onload = _.bind(function (oEvent) {
    var oArrayBuffer = oReq.response,
      oDataWithPadding = {};
    if (oReq.status === 200 && oArrayBuffer) {
      oDataWithPadding = new Uint8Array(oArrayBuffer.byteLength + 16);
      oDataWithPadding.set(new Uint8Array(oArrayBuffer), 0);
      if (this.iCurrChunk !== this.iChunkNumber) {
        // for all chunk except last - add padding
        crypto.subtle.encrypt({
          name: 'AES-CBC',
          iv: new Uint8Array(oArrayBuffer.slice(oArrayBuffer.byteLength - 16))
        }, this.key, new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16]).buffer // generate padding for chunk
        ).then(_.bind(function (oEncryptedContent) {
          // add generated padding to data
          // oEncryptedContent.slice(0, 16) - use only first 16 bytes of generated padding, other data is padding for our padding
          oDataWithPadding.set(new Uint8Array(new Uint8Array(oEncryptedContent.slice(0, 16))), oArrayBuffer.byteLength);
          // decrypt data
          crypto.subtle.decrypt({
            name: 'AES-CBC',
            iv: this.iv
          }, this.key, oDataWithPadding.buffer).then(_.bind(function (oDecryptedArrayBuffer) {
            var oDecryptedUint8Array = new Uint8Array(oDecryptedArrayBuffer);
            // use last 16 byte of current chunk as initial vector for next chunk
            this.iv = new Uint8Array(oArrayBuffer.slice(oArrayBuffer.byteLength - 16));
            this.writeChunk(oDecryptedUint8Array);
          }, this))["catch"](_.bind(function (err) {
            this.stopDownloading();
            if (_.isFunction(this.fProcessBlobErrorCallback)) {
              this.fProcessBlobErrorCallback();
            }
            Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_DECRYPTION'));
          }, this));
        }, this));
      } else {
        //for last chunk just decrypt data
        crypto.subtle.decrypt({
          name: 'AES-CBC',
          iv: this.iv
        }, this.key, oArrayBuffer).then(_.bind(function (oDecryptedArrayBuffer) {
          var oDecryptedUint8Array = new Uint8Array(oDecryptedArrayBuffer);
          // use last 16 byte of current chunk as initial vector for next chunk
          this.iv = new Uint8Array(oArrayBuffer.slice(oArrayBuffer.byteLength - 16));
          this.writeChunk(oDecryptedUint8Array);
        }, this))["catch"](_.bind(function (err) {
          this.stopDownloading();
          if (_.isFunction(this.fProcessBlobErrorCallback)) {
            this.fProcessBlobErrorCallback();
          }
          Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_DECRYPTION'));
        }, this));
      }
    }
  }, this);
  oReq.send(null);
};
CDownloadFile.prototype.stopDownloading = function () {
  this.oFile.stopDownloading();
};

/**
 * Generate link for downloading current chunk
 */
CDownloadFile.prototype.getChunkLink = function () {
  return this.sDownloadLink + '/download/' + this.iCurrChunk++ + '/' + this.iChunkSize + '&' + this.sHash;
};
CDownloadFile.prototype.isDownloading = function () {
  return this.oFile.downloading();
};
function CViewImage(oFile, iv, iChunkSize) {
  var sParanoidEncryptedKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  this.oWriter = null;
  this.init(oFile, iv, iChunkSize, /*fProcessBlobErrorCallback*/null, sParanoidEncryptedKey);
}
CViewImage.prototype = Object.create(CDownloadFile.prototype);
CViewImage.prototype.constructor = CViewImage;
CViewImage.prototype.writeChunk = function (oDecryptedUint8Array) {
  this.oWriter = this.oWriter === null ? new CBlobViewer(this.sFileName) : this.oWriter;
  this.oWriter.write(oDecryptedUint8Array); //write decrypted chunk
  if (this.iCurrChunk < this.iChunkNumber) {
    //if it was not last chunk - decrypting another chunk
    this.decryptChunk();
  } else {
    this.stopDownloading();
    this.oWriter.close();
  }
};

/**
* Writing chunks in file
*
* @constructor
* @param {String} sFileName
* @param {Function} fProcessBlobCallback
*/
function CWriter(sFileName, fProcessBlobCallback) {
  this.sName = sFileName;
  this.aBuffer = [];
  if (_.isFunction(fProcessBlobCallback)) {
    this.fProcessBlobCallback = fProcessBlobCallback;
  }
}
CWriter.prototype.write = function (oDecryptedUint8Array) {
  this.aBuffer.push(oDecryptedUint8Array);
};
CWriter.prototype.close = function () {
  var file = new Blob(this.aBuffer);
  if (typeof this.fProcessBlobCallback !== 'undefined') {
    this.fProcessBlobCallback(file);
  } else {
    FileSaver.saveAs(file, this.sName);
  }
  file = null;
};

/**
* Writing chunks in blob for viewing
*
* @constructor
* @param {String} sFileName
*/
function CBlobViewer(sFileName) {
  this.sName = sFileName;
  this.aBuffer = [];
  this.imgWindow = window.open("", "_blank", "height=auto, width=auto,toolbar=no,scrollbars=no,resizable=yes");
}
CBlobViewer.prototype = Object.create(CWriter.prototype);
CBlobViewer.prototype.constructor = CBlobViewer;
CBlobViewer.prototype.close = function () {
  try {
    var file = new Blob(this.aBuffer),
      link = window.URL.createObjectURL(file),
      img = null;
    this.imgWindow.document.write("<head><title>" + this.sName + '</title></head><body><img src="' + link + '" /></body>');
    img = $(this.imgWindow.document.body).find('img');
    img.on('load', function () {
      //remove blob after showing image
      window.URL.revokeObjectURL(link);
    });
  } catch (err) {
    Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_POPUP_WINDOWS'));
  }
};
module.exports = new CCrypto();

/***/ }),

/***/ "AgXX":
/*!**********************************************************************!*\
  !*** ./modules/CoreParanoidEncryptionWebclientPlugin/js/Settings.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var ko = __webpack_require__(/*! knockout */ "p09A"),
  _ = __webpack_require__(/*! underscore */ "C3HO"),
  Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L");
module.exports = {
  ServerModuleName: 'CoreParanoidEncryptionWebclientPlugin',
  HashModuleName: 'paranoid-encryption',
  EncryptionAllowedModules: ['Files'],
  EncryptionAllowedStorages: ['personal'],
  enableJscrypto: ko.observable(true),
  EnableInPersonalStorage: false,
  ChunkSizeMb: 5,
  AllowMultiChunkUpload: true,
  AllowChangeSettings: false,
  DontRemindMe: ko.observable(false),
  /**
   * Initializes settings from AppData object sections.
   *
   * @param {Object} oAppData Object contained modules settings.
   */
  init: function init(oAppData) {
    var oAppDataSection = _.extend({}, oAppData[this.ServerModuleName] || {}, oAppData['CoreParanoidEncryptionWebclientPlugin'] || {});
    if (!_.isEmpty(oAppDataSection)) {
      this.enableJscrypto(Types.pBool(oAppDataSection.EnableModule, this.enableJscrypto()));
      this.DontRemindMe(Types.pBool(oAppDataSection.DontRemindMe, this.DontRemindMe()));
      this.EnableInPersonalStorage = Types.pBool(oAppDataSection.EnableInPersonalStorage, this.EnableInPersonalStorage);
      this.ChunkSizeMb = Types.pInt(oAppDataSection.ChunkSizeMb, this.ChunkSizeMb);
      this.AllowMultiChunkUpload = Types.pBool(oAppDataSection.AllowMultiChunkUpload, this.AllowMultiChunkUpload);
      this.AllowChangeSettings = Types.pBool(oAppDataSection.AllowChangeSettings, this.AllowChangeSettings);
    }
  },
  /**
   * Updates new settings values after saving on server.
   *
   * @param {boolean} bEnableJscrypto
   * @param {number} bEnableInPersonalStorage
   */
  update: function update(bEnableJscrypto, bEnableInPersonalStorage) {
    this.enableJscrypto(bEnableJscrypto);
    this.EnableInPersonalStorage = bEnableInPersonalStorage;
  }
};

/***/ }),

/***/ "sJkT":
/*!*********************************************************************!*\
  !*** ./modules/CoreParanoidEncryptionWebclientPlugin/js/manager.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _ = __webpack_require__(/*! underscore */ "C3HO"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
  Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
  App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
  Browser = __webpack_require__(/*! modules/CoreWebclient/js/Browser.js */ "dfnr"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
  Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
  ConfirmPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/ConfirmPopup.js */ "XeMN"),
  ConfirmEncryptionPopup = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/popups/ConfirmEncryptionPopup.js */ "/ktp"),
  ConfirmUploadPopup = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/popups/ConfirmUploadPopup.js */ "gE/T"),
  InitializationVectorPopup = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/popups/InitializationVectorPopup.js */ "mwH5"),
  Settings = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/Settings.js */ "AgXX"),
  Crypto = null,
  OpenPgpEncryptor = null,
  AwaitConfirmationQueue = [],
  //List of files waiting for the user to decide on encryption
  isConfirmPopupShown = false,
  FilesView = null;
function IsHttpsEnable() {
  return window.location.protocol === "https:";
}
function ShowUploadPopup(sUid, oFileInfo, fUpload, fCancel, sErrorText) {
  if (isConfirmPopupShown) {
    AwaitConfirmationQueue.push({
      sUid: sUid,
      oFileInfo: oFileInfo
    });
  } else {
    setTimeout(function () {
      Popups.showPopup(ConfirmUploadPopup, [fUpload, fCancel, AwaitConfirmationQueue.length, _.map(AwaitConfirmationQueue, function (element) {
        return element.oFileInfo.FileName;
      }), sErrorText]);
    }, 10);
    isConfirmPopupShown = true;
    AwaitConfirmationQueue.push({
      sUid: sUid,
      oFileInfo: oFileInfo
    });
  }
}
function StartModule(ModulesManager) {
  ModulesManager.run('SettingsWebclient', 'registerSettingsTab', [function () {
    return __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/views/ParanoidEncryptionSettingsFormView.js */ "No2m");
  }, Settings.HashModuleName, TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/LABEL_SETTINGS_TAB')]);
  App.subscribeEvent('AbstractFileModel::FileDownload::before', function (oParams) {
    if (!oParams.File || !oParams.File.IS_FILE) {
      // it might be attachment, Paranoid doesn't work with them
      return;
    }
    var oFile = oParams.File,
      oExtendedProps = (oFile === null || oFile === void 0 ? void 0 : oFile.oExtendedProps) || false,
      iv = (oExtendedProps === null || oExtendedProps === void 0 ? void 0 : oExtendedProps.InitializationVector) || false,
      sParanoidEncryptedKey = (oExtendedProps === null || oExtendedProps === void 0 ? void 0 : oExtendedProps.ParanoidKey) || false,
      sParanoidEncryptedKeyShared = (oExtendedProps === null || oExtendedProps === void 0 ? void 0 : oExtendedProps.ParanoidKeyShared) || false,
      bIsOwnFile = oFile.sOwnerName === App.getUserPublicId(),
      bSharedWithMe = oFile.sharedWithMe();
    //User can decrypt only own or shared files
    if (!Settings.enableJscrypto() || !iv || !(bIsOwnFile || bSharedWithMe)) {
      //regular upload will start in Jua in this case
    } else if (!IsHttpsEnable()) {
      Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_HTTPS_NEEDED'));
      oParams.CancelDownload = true;
    } else {
      oParams.CustomDownloadHandler = function () {
        Crypto.downloadDividedFile(oFile, iv, null, null, bSharedWithMe && sParanoidEncryptedKeyShared ? sParanoidEncryptedKeyShared : sParanoidEncryptedKey);
      };
    }
  });
  App.subscribeEvent('Jua::FileUpload::before', function (oParams) {
    var sUid = oParams.sUid,
      sModuleName = oParams.sModuleName,
      oFileInfo = oParams.oFileInfo,
      fOnChunkEncryptCallback = oParams.fOnChunkReadyCallback,
      fRegularUploadFileCallback = oParams.fRegularUploadFileCallback,
      fCancelFunction = oParams.fCancelFunction,
      fStartUploadCallback = function fStartUploadCallback(oFileInfo, sUid, fOnChunkEncryptCallback) {
        if (!Settings.AllowMultiChunkUpload && oFileInfo.File.size > Crypto.iChunkSize) {
          Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_FILE_SIZE_LIMIT', {
            'VALUE': Settings.ChunkSizeMb
          }));
          fCancelFunction(sUid);
          Crypto.oChunkQueue.isProcessed = false;
          Crypto.checkQueue();
        } else {
          // Starts upload an encrypted file
          Crypto.startUpload(oFileInfo, sUid, fOnChunkEncryptCallback, _.bind(function () {
            fCancelFunction(sUid);
            Crypto.oChunkQueue.isProcessed = false;
            Crypto.checkQueue();
          }, this));
        }
      },
      fUpload = _.bind(function () {
        AwaitConfirmationQueue.forEach(function (element) {
          fRegularUploadFileCallback(element.sUid, element.oFileInfo);
        });
        AwaitConfirmationQueue = [];
        isConfirmPopupShown = false;
      }, this),
      fEncrypt = _.bind(function () {
        AwaitConfirmationQueue.forEach(function (element) {
          // if another file is being uploaded now - add a file to the queue
          Crypto.oChunkQueue.aFiles.push({
            fStartUploadCallback: fStartUploadCallback,
            oFileInfo: element.oFileInfo,
            sUid: element.sUid,
            fOnChunkEncryptCallback: fOnChunkEncryptCallback
          });
        });
        AwaitConfirmationQueue = [];
        isConfirmPopupShown = false;
        if (!Crypto.oChunkQueue.isProcessed) {
          Crypto.oChunkQueue.isProcessed = true;
          Crypto.checkQueue();
        }
      }),
      fCancel = _.bind(function () {
        AwaitConfirmationQueue.forEach(function (element) {
          fCancelFunction(element.sUid);
        });
        AwaitConfirmationQueue = [];
        isConfirmPopupShown = false;
      });
    if (Settings.enableJscrypto() && Settings.EncryptionAllowedModules && Settings.EncryptionAllowedModules.length > 0 && Settings.EncryptionAllowedModules.includes(sModuleName) && (oParams.sStorageType === 'encrypted' || oParams.sStorageType === 'personal' && Settings.EnableInPersonalStorage)) {
      if (!IsHttpsEnable()) {
        if (oParams.sStorageType === 'personal' && Settings.EnableInPersonalStorage) {
          //for AskMe encryption mode show dialog with warning and regular upload button
          ShowUploadPopup(sUid, oFileInfo, fUpload, fCancel, TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_HTTPS_NEEDED'));
        } else {
          //for Always encryption mode show error
          Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_HTTPS_NEEDED'));
          fCancelFunction(sUid);
        }
      } else if (!oFileInfo.EncryptWithoutConfirm && oParams.sStorageType === 'personal' && Settings.EnableInPersonalStorage) {
        if (isConfirmPopupShown) {
          AwaitConfirmationQueue.push({
            sUid: sUid,
            oFileInfo: oFileInfo
          });
        } else {
          setTimeout(function () {
            Popups.showPopup(ConfirmEncryptionPopup, [fEncrypt, fUpload, fCancel, AwaitConfirmationQueue.length, _.map(AwaitConfirmationQueue, function (element) {
              return element.oFileInfo.FileName;
            })]);
          }, 10);
          isConfirmPopupShown = true;
          AwaitConfirmationQueue.push({
            sUid: sUid,
            oFileInfo: oFileInfo
          });
        }
      } else {
        if (Crypto.oChunkQueue.isProcessed === true) {
          // if another file is being uploaded now - add a file to the queue
          Crypto.oChunkQueue.aFiles.push({
            fStartUploadCallback: fStartUploadCallback,
            oFileInfo: oFileInfo,
            sUid: sUid,
            fOnChunkEncryptCallback: fOnChunkEncryptCallback
          });
        } else {
          // If the queue is not busy - start uploading
          fStartUploadCallback(oFileInfo, sUid, fOnChunkEncryptCallback);
        }
      }
    } else {
      fRegularUploadFileCallback(sUid, oFileInfo);
    }
  });
  App.subscribeEvent('CFilesView::FileDownloadCancel', function (oParams) {
    if (Settings.enableJscrypto() && IsHttpsEnable()) {
      oParams.oFile.stopDownloading();
    }
  });
  App.subscribeEvent('CFilesView::FileUploadCancel', function (oParams) {
    if (Settings.enableJscrypto() && IsHttpsEnable()) {
      //clear queue
      Crypto.oChunkQueue.aFiles.forEach(function (oData, index, array) {
        oParams.fOnUploadCancelCallback(oData.sUid, oData.oFileInfo.FileName);
      });
      Crypto.oChunkQueue.aFiles = [];
      Crypto.stopUploading(oParams.sFileUploadUid, oParams.fOnUploadCancelCallback, oParams.sFileUploadName);
    } else if (_.isFunction(oParams.fOnUploadCancelCallback)) {
      oParams.fOnUploadCancelCallback(oParams.sFileUploadUid, oParams.sFileUploadName);
    }
  });
  App.subscribeEvent('Jua::FileUploadingError', function () {
    if (Settings.enableJscrypto() && IsHttpsEnable()) {
      Crypto.oChunkQueue.isProcessed = false;
      Crypto.checkQueue();
    }
  });
  App.subscribeEvent('FilesWebclient::ParseFile::after', function (aParams) {
    var oFile = aParams[0],
      oExtendedProps = (oFile === null || oFile === void 0 ? void 0 : oFile.oExtendedProps) || false,
      iv = (oExtendedProps === null || oExtendedProps === void 0 ? void 0 : oExtendedProps.InitializationVector) || false,
      bIsEncrypted = !!iv,
      sParanoidEncryptedKey = (oExtendedProps === null || oExtendedProps === void 0 ? void 0 : oExtendedProps.ParanoidKey) || false,
      sParanoidEncryptedKeyShared = (oExtendedProps === null || oExtendedProps === void 0 ? void 0 : oExtendedProps.ParanoidKeyShared) || false,
      bIsImage = /\.(png|jpe?g|gif)$/.test(oFile.fileName().toLowerCase()),
      bIsOwnFile = oFile.sOwnerName === App.getUserPublicId(),
      bSharedWithMe = oFile.sharedWithMe();
    if (bIsEncrypted) {
      oFile.thumbnailSrc('');
      if ((bIsOwnFile || bSharedWithMe) && bIsImage && Settings.enableJscrypto()) {
        // change view action for images
        oFile.oActionsData.view.Handler = function () {
          Crypto.viewEncryptedImage(oFile, iv, bSharedWithMe && sParanoidEncryptedKeyShared ? sParanoidEncryptedKeyShared : sParanoidEncryptedKey);
        };
      } else {
        // remove view action for non-images
        oFile.removeAction('view');
      }
      oFile.removeAction('list');
      oFile.bIsSecure(true);
      oFile.onSecureIconClick = function (oItem) {
        Popups.showPopup(InitializationVectorPopup, [oFile, iv]);
      };
    }
  });
  App.subscribeEvent('FileViewerWebclientPlugin::FilesCollection::after', function (oParams) {
    oParams.aFilesCollection(_.filter(oParams.aFilesCollection(), function (oArg) {
      return !(typeof oArg.oExtendedProps !== 'undefined' && typeof oArg.oExtendedProps.InitializationVector !== 'undefined');
    }));
  });
  Settings.enableJscrypto.subscribe(function (newValue) {
    if (FilesView !== null) {
      FilesView.requestStorages();
    }
  });
  App.subscribeEvent('FilesWebclient::ConstructView::after', function (oParams) {
    if ('CFilesView' === oParams.Name) {
      FilesView = oParams.View;
      var ComposeMessageWithAttachments = ModulesManager.run('MailWebclient', 'getComposeMessageWithAttachments');
      if (_.isFunction(ComposeMessageWithAttachments)) {
        FilesView.executeSend = function () {
          var aItems = this.selector.listCheckedAndSelected(),
            aFileItems = _.filter(aItems, function (oItem) {
              return oItem && oItem.IS_FILE;
            }, this),
            bHasEncrypted = false,
            aFilesData = _.map(aFileItems, function (oItem) {
              var bItemEncrypted = !!(oItem.oExtendedProps && oItem.oExtendedProps.InitializationVector);
              bHasEncrypted = bHasEncrypted || bItemEncrypted;
              return {
                'Storage': oItem.storageType(),
                'Path': oItem.path(),
                'Name': oItem.id() || oItem.fileName(),
                'IsEncrypted': bItemEncrypted
              };
            });
          if (this.bAllowSendEmails && aFileItems.length > 0) {
            if (bHasEncrypted) {
              Popups.showPopup(ConfirmPopup, [TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ALERT_SEND_ENCRYPTED_FILES'), function (bSendAnyway) {
                if (bSendAnyway) {
                  Ajax.send('Files', 'SaveFilesAsTempFiles', {
                    'Files': aFilesData
                  }, function (oResponse) {
                    if (oResponse.Result) {
                      ComposeMessageWithAttachments(oResponse.Result);
                    }
                  }, this);
                }
              }.bind(this)]);
            } else {
              Ajax.send('Files', 'SaveFilesAsTempFiles', {
                'Files': aFilesData
              }, function (oResponse) {
                if (oResponse.Result) {
                  ComposeMessageWithAttachments(oResponse.Result);
                }
              }, this);
            }
          }
        };
        FilesView.sendCommand = Utils.createCommand(FilesView, FilesView.executeSend, function () {
          if (!this.isZipFolder() && this.allSelectedFilesReady()) {
            var aItems = this.selector.listCheckedAndSelected(),
              aFileItems = _.filter(aItems, function (oItem) {
                return oItem && oItem.IS_FILE;
              }, this);
            return aFileItems.length > 0;
          }
          return false;
        });
      }
    }
  });
  var PrepareShares = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/utils/PrepareShares.js */ "0Oow");
  App.subscribeEvent('SharedFiles::UpdateShare::before', PrepareShares.onBeforeUpdateShare);
  App.subscribeEvent('SharedFiles::OpenFilesSharePopup', function (oParams) {
    if (oParams.IsDir) {
      oParams.DialogHintText(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/INFO_SHARING_FOLDER'));
    }
  });
}
module.exports = function (oAppData) {
  Settings.init(oAppData);
  return {
    /**
     * Runs before application start. Subscribes to the event before post displaying.
     *
     * @param {Object} ModulesManager
     */
    start: function start(ModulesManager) {
      Crypto = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/CCrypto.js */ "/dxK");
      OpenPgpEncryptor = ModulesManager.run('OpenPgpWebclient', 'getOpenPgpEncryptor');
      var bBlobSavingEnable = window.Blob && window.URL && _.isFunction(window.URL.createObjectURL);
      // Module can't work without saving blob and shouldn't be initialized.
      if (bBlobSavingEnable) {
        if (Browser.chrome && !IsHttpsEnable()) {
          // Module can't work without https.0
          // Module should be initialized to display message about https enabling.
          StartModule(ModulesManager);
        } else if (window.crypto && window.crypto.subtle) {
          if (!Browser.edge) {
            StartModule(ModulesManager);
          }
          // var sPassword = window.crypto.getRandomValues(new Uint8Array(16));
          // // window.crypto can't work with PBKDF2 in Edge.
          // // Checks if it works (in case if it will work in Edge one day) and then inizializes module.
          // window.crypto.subtle.importKey('raw', sPassword, {name: 'PBKDF2'}, false, ['deriveBits', 'deriveKey'])
          // 	.then(function () {
          // 		StartModule(ModulesManager);
          // 	});
        }
      }
    },
    getConfirmEncryptionPopup: function getConfirmEncryptionPopup() {
      return Settings.EnableInPersonalStorage ? ConfirmEncryptionPopup : false;
    },
    isEnabled: function isEnabled() {
      return Settings.enableJscrypto() && IsHttpsEnable();
    }
  };
};

/***/ }),

/***/ "/ktp":
/*!*******************************************************************************************!*\
  !*** ./modules/CoreParanoidEncryptionWebclientPlugin/js/popups/ConfirmEncryptionPopup.js ***!
  \*******************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX");

/**
 * @constructor
 */
function CConfirmEncryptionPopup() {
  CAbstractPopup.call(this);
  this.fEncrypt = null;
  this.fUpload = null;
  this.fCancel = null;
  this.message = ko.observable('');
  this.filesConfirmText = ko.observable('');
}
_.extendOwn(CConfirmEncryptionPopup.prototype, CAbstractPopup.prototype);
CConfirmEncryptionPopup.prototype.PopupTemplate = 'CoreParanoidEncryptionWebclientPlugin_ConfirmEncryptionPopup';
CConfirmEncryptionPopup.prototype.onOpen = function (fEncrypt, fUpload, fCancel, iFilesCount, aFileList) {
  var aEncodedFiles = _.map(aFileList, function (sFileName) {
    return TextUtils.encodeHtml(sFileName);
  });
  this.filesConfirmText('');
  this.fEncrypt = fEncrypt;
  this.fUpload = fUpload;
  this.fCancel = fCancel;
  this.message(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/CONFIRM_ENCRYPT_PLURAL', {
    'VALUE': iFilesCount > 1 ? iFilesCount : '"' + aFileList[0] + '"'
  }, null, iFilesCount));
  if (iFilesCount > 1) {
    this.filesConfirmText(aEncodedFiles.join('<br />'));
  }
};
CConfirmEncryptionPopup.prototype.cancelUpload = function () {
  this.fCancel();
  this.closePopup();
};
CConfirmEncryptionPopup.prototype.encrypt = function () {
  this.fEncrypt();
  this.closePopup();
};
CConfirmEncryptionPopup.prototype.upload = function () {
  this.fUpload();
  this.closePopup();
};
module.exports = new CConfirmEncryptionPopup();

/***/ }),

/***/ "gE/T":
/*!***************************************************************************************!*\
  !*** ./modules/CoreParanoidEncryptionWebclientPlugin/js/popups/ConfirmUploadPopup.js ***!
  \***************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX");

/**
 * @constructor
 */
function CConfirmUploadPopup() {
  CAbstractPopup.call(this);
  this.fUpload = null;
  this.fCancel = null;
  this.message = ko.observable('');
  this.filesConfirmText = ko.observable('');
  this.sErrorText = ko.observable('');
}
_.extendOwn(CConfirmUploadPopup.prototype, CAbstractPopup.prototype);
CConfirmUploadPopup.prototype.PopupTemplate = 'CoreParanoidEncryptionWebclientPlugin_ConfirmUploadPopup';
CConfirmUploadPopup.prototype.onOpen = function (fUpload, fCancel, iFilesCount, aFileList, sErrorText) {
  var aEncodedFiles = _.map(aFileList, function (sFileName) {
    return TextUtils.encodeHtml(sFileName);
  });
  this.filesConfirmText('');
  this.fUpload = fUpload;
  this.fCancel = fCancel;
  this.message(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/CONFIRM_UPLOAD_PLURAL', {
    'VALUE': iFilesCount > 1 ? iFilesCount : '"' + aFileList[0] + '"'
  }, null, iFilesCount));
  if (iFilesCount > 1) {
    this.filesConfirmText(aEncodedFiles.join('<br />'));
  }
  this.sErrorText(sErrorText);
};
CConfirmUploadPopup.prototype.cancelUpload = function () {
  this.fCancel();
  this.closePopup();
};
CConfirmUploadPopup.prototype.upload = function () {
  this.fUpload();
  this.closePopup();
};
module.exports = new CConfirmUploadPopup();

/***/ }),

/***/ "3ud5":
/*!***********************************************************************************!*\
  !*** ./modules/CoreParanoidEncryptionWebclientPlugin/js/popups/DeleteKeyPopup.js ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
  Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
  ConfirmPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/ConfirmPopup.js */ "XeMN");

/**
 * @constructor
 */
function CDeleteKeyPopup() {
  CAbstractPopup.call(this);
  this.fExportKeyCallback = null;
  this.keyName = ko.observable('');
  this.fDelete = null;
  this.fDeleteCallback = null;
}
_.extendOwn(CDeleteKeyPopup.prototype, CAbstractPopup.prototype);
CDeleteKeyPopup.prototype.PopupTemplate = 'CoreParanoidEncryptionWebclientPlugin_DeleteKeyPopup';
CDeleteKeyPopup.prototype.onOpen = function (fExportKeyCallback, sKeyName, fDelete) {
  if (_.isFunction(fExportKeyCallback)) {
    this.fExportKeyCallback = _.bind(function () {
      this.closePopup();
      fExportKeyCallback();
    }, this);
  }
  this.keyName(sKeyName);
  this.fDeleteCallback = _.bind(function (bRemove) {
    fDelete.call(this, bRemove);
    if (bRemove) {
      this.closePopup();
    } else {
      this.showPopup();
    }
  }, this);
};
CDeleteKeyPopup.prototype.deleteKey = function () {
  this.hidePopup();
  Popups.showPopup(ConfirmPopup, [TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/CONFIRM_DELETE_KEY'), this.fDeleteCallback]);
};
module.exports = new CDeleteKeyPopup();

/***/ }),

/***/ "7/WE":
/*!*******************************************************************************************!*\
  !*** ./modules/CoreParanoidEncryptionWebclientPlugin/js/popups/ExportInformationPopup.js ***!
  \*******************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX");

/**
 * @constructor
 */
function CExportInformationPopup() {
  CAbstractPopup.call(this);
  this.fExportKeyCallback = null;
  this.keyName = ko.observable('');
}
_.extendOwn(CExportInformationPopup.prototype, CAbstractPopup.prototype);
CExportInformationPopup.prototype.PopupTemplate = 'CoreParanoidEncryptionWebclientPlugin_ExportInformationPopup';
CExportInformationPopup.prototype.onOpen = function (fExportKeyCallback, sKeyName) {
  if (_.isFunction(fExportKeyCallback)) {
    this.fExportKeyCallback = _.bind(function () {
      this.closePopup();
      fExportKeyCallback();
    }, this);
  }
  this.keyName(sKeyName);
};
module.exports = new CExportInformationPopup();

/***/ }),

/***/ "mXd/":
/*!*************************************************************************************!*\
  !*** ./modules/CoreParanoidEncryptionWebclientPlugin/js/popups/GenerateKeyPopup.js ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
  CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
  JscryptoKey = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/JscryptoKey.js */ "0+zD");

/**
 * @constructor
 */
function CGenerateKeyPopup() {
  CAbstractPopup.call(this);
  this.keyName = ko.observable(App.getUserPublicId());
  this.fOnGenerateCallback = null;
}
_.extendOwn(CGenerateKeyPopup.prototype, CAbstractPopup.prototype);
CGenerateKeyPopup.prototype.PopupTemplate = 'CoreParanoidEncryptionWebclientPlugin_GenerateKeyPopup';
CGenerateKeyPopup.prototype.onOpen = function (fOnGenerateCallback) {
  this.fOnGenerateCallback = fOnGenerateCallback;
};
CGenerateKeyPopup.prototype.generateKey = function () {
  JscryptoKey.generateAndExportKey(_.bind(function () {
    this.fOnGenerateCallback();
  }, this), this.keyName());
  this.closePopup();
};
module.exports = new CGenerateKeyPopup();

/***/ }),

/***/ "PnO4":
/*!*****************************************************************************************!*\
  !*** ./modules/CoreParanoidEncryptionWebclientPlugin/js/popups/GetTemporaryKeyPopup.js ***!
  \*****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT");

/**
 * @constructor
 */
function GetTemporaryKeyPopup() {
  CAbstractPopup.call(this);
  this.key = ko.observable('');
  this.fOnKeyEnterCallback = null;
  this.fOnCancellCallback = null;
}
_.extendOwn(GetTemporaryKeyPopup.prototype, CAbstractPopup.prototype);
GetTemporaryKeyPopup.prototype.PopupTemplate = 'CoreParanoidEncryptionWebclientPlugin_GetTemporaryKeyPopup';
GetTemporaryKeyPopup.prototype.onOpen = function (fOnKeyEnterCallback, fOnCancellCallback) {
  this.key('');
  this.fOnKeyEnterCallback = fOnKeyEnterCallback;
  this.fOnCancellCallback = fOnCancellCallback;
};
GetTemporaryKeyPopup.prototype.cancel = function () {
  this.fOnCancellCallback();
  this.closePopup();
};
GetTemporaryKeyPopup.prototype.enterKey = function () {
  if (this.key() === '') {
    Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_KEY_CANT_BE_BLANK'));
  } else {
    this.fOnKeyEnterCallback(this.key());
    this.closePopup();
  }
};
module.exports = new GetTemporaryKeyPopup();

/***/ }),

/***/ "LAX2":
/*!*****************************************************************************************!*\
  !*** ./modules/CoreParanoidEncryptionWebclientPlugin/js/popups/ImportKeyStringPopup.js ***!
  \*****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
  CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
  JscryptoKey = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/JscryptoKey.js */ "0+zD");

/**
 * @constructor
 */
function CImportKeyStringPopup() {
  CAbstractPopup.call(this);
  this.keyName = ko.observable(App.getUserPublicId());
  this.newKey = ko.observable('');
}
_.extendOwn(CImportKeyStringPopup.prototype, CAbstractPopup.prototype);
CImportKeyStringPopup.prototype.PopupTemplate = 'CoreParanoidEncryptionWebclientPlugin_ImportKeyStringPopup';
CImportKeyStringPopup.prototype.onOpen = function () {
  this.newKey('');
};
CImportKeyStringPopup.prototype.importKey = function () {
  JscryptoKey.importKeyFromString(this.keyName(), this.newKey());
  this.closePopup();
};
module.exports = new CImportKeyStringPopup();

/***/ }),

/***/ "mwH5":
/*!**********************************************************************************************!*\
  !*** ./modules/CoreParanoidEncryptionWebclientPlugin/js/popups/InitializationVectorPopup.js ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
  CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
  Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
  AlertPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/AlertPopup.js */ "hT1I");

/**
 * @constructor
 */
function CInitializationVectorPopup() {
  CAbstractPopup.call(this);
  this.fileName = ko.observable('');
  this.iv = ko.observable('');
  this.oldEncryptionMode = ko.observable(false);
  this.encryptedParanoidKey = '';
}
_.extendOwn(CInitializationVectorPopup.prototype, CAbstractPopup.prototype);
CInitializationVectorPopup.prototype.PopupTemplate = 'CoreParanoidEncryptionWebclientPlugin_InitializationVectorPopup';
CInitializationVectorPopup.prototype.onOpen = function (oFile, sIv) {
  this.oFile = oFile;
  this.fileName(oFile.fileName());
  this.iv(sIv);
  var extendedProps = oFile && oFile.oExtendedProps,
    encryptedParanoidKey = extendedProps && (oFile.sharedWithMe() ? extendedProps.ParanoidKeyShared : extendedProps.ParanoidKey);
  this.encryptedParanoidKey = encryptedParanoidKey;
  this.oldEncryptionMode(!encryptedParanoidKey);
};
CInitializationVectorPopup.prototype.downloadEncrypted = function () {
  var _this$oFile;
  if (_.isFunction((_this$oFile = this.oFile) === null || _this$oFile === void 0 ? void 0 : _this$oFile.downloadFile)) {
    this.oFile.downloadFile(true);
  }
};
CInitializationVectorPopup.prototype.getAesKey = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var Crypto, sKey;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        Crypto = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/CCrypto.js */ "/dxK");
        _context.next = 3;
        return Crypto.decryptParanoidKey(this.encryptedParanoidKey);
      case 3:
        sKey = _context.sent;
        if (Types.isNonEmptyString(sKey)) {
          Popups.showPopup(AlertPopup, [sKey, null, TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/HEADING_IV_AES_KEY')]);
        }
      case 5:
      case "end":
        return _context.stop();
    }
  }, _callee, this);
}));
module.exports = new CInitializationVectorPopup();

/***/ }),

/***/ "A2fR":
/*!**************************************************************************************************!*\
  !*** ./modules/CoreParanoidEncryptionWebclientPlugin/js/popups/OutdatedEncryptionMethodPopup.js ***!
  \**************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
  Settings = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/Settings.js */ "AgXX"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX");

/**
 * @constructor
 */
function OutdatedEncryptionMethodPopup() {
  CAbstractPopup.call(this);
  this.message = ko.observable('');
  this.dontRemindMe = ko.observable(false);
  this.fContinueCallback = null;
  this.fCancelCallback = null;
}
_.extendOwn(OutdatedEncryptionMethodPopup.prototype, CAbstractPopup.prototype);
OutdatedEncryptionMethodPopup.prototype.PopupTemplate = 'CoreParanoidEncryptionWebclientPlugin_OutdatedEncryptionMethodPopup';
OutdatedEncryptionMethodPopup.prototype.onOpen = function (sFileName, fContinueCallback, fCancelCallback) {
  this.message(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/MESSAGE_OUTDATED_ENCRYPTION_METHOD', {
    'FILENAME': sFileName
  }));
  this.fContinueCallback = fContinueCallback;
  this.fCancelCallback = fCancelCallback;
};
OutdatedEncryptionMethodPopup.prototype.cancel = function () {
  this.fCancelCallback();
  this.closePopup();
};
OutdatedEncryptionMethodPopup.prototype.continueDownload = function () {
  if (this.dontRemindMe()) {
    Ajax.send('CoreParanoidEncryptionWebclientPlugin', 'DontRemindMe', {}, function (oResponse) {
      if (oResponse.Result === true) {
        Settings.DontRemindMe(true);
      }
    }, this);
  }
  this.fContinueCallback();
  this.closePopup();
};
module.exports = new OutdatedEncryptionMethodPopup();

/***/ }),

/***/ "0Oow":
/*!*********************************************************************************!*\
  !*** ./modules/CoreParanoidEncryptionWebclientPlugin/js/utils/PrepareShares.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _ = __webpack_require__(/*! underscore */ "C3HO"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
  Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
  ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
  OpenPgpEncryptor = ModulesManager.run('OpenPgpWebclient', 'getOpenPgpEncryptor'),
  Crypto = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/CCrypto.js */ "/dxK");
function getPublicOpenPgpKeys(_x) {
  return _getPublicOpenPgpKeys.apply(this, arguments);
}
function _getPublicOpenPgpKeys() {
  _getPublicOpenPgpKeys = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(shares) {
    var contactUUIDs, emails, allPublicKeys, emailsFromKeys, diffEmails, errorText;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          //get OpenPGP public keys for users who should have access
          contactUUIDs = shares.map(function (share) {
            return share.ContactUUID;
          }).filter(function (uuid) {
            return uuid;
          }), emails = shares.map(function (oShare) {
            return oShare.PublicId;
          });
          _context.next = 3;
          return OpenPgpEncryptor.getPublicKeysByContactsAndEmails(contactUUIDs, emails);
        case 3:
          allPublicKeys = _context.sent;
          if (allPublicKeys.length < emails.length) {
            //if not for all users the keys were found - show an error
            emailsFromKeys = allPublicKeys.map(function (key) {
              return key.getEmail();
            }), diffEmails = emails.filter(function (email) {
              return !emailsFromKeys.includes(email);
            }), errorText = TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_NO_PUBLIC_KEYS_FOR_USERS_PLURAL', {
              'USERS': diffEmails.join(', ')
            }, null, diffEmails.length);
            Screens.showError(errorText);
            allPublicKeys = false;
          }
          return _context.abrupt("return", allPublicKeys);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getPublicOpenPgpKeys.apply(this, arguments);
}
function getDecryptedParanoidKey(_x2) {
  return _getDecryptedParanoidKey.apply(this, arguments);
}
function _getDecryptedParanoidKey() {
  _getDecryptedParanoidKey = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(encryptedParanoidKey) {
    var privateKey, password, decryptedParanoidKey;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return OpenPgpEncryptor.getCurrentUserPrivateKey();
        case 2:
          privateKey = _context2.sent;
          if (privateKey) {
            _context2.next = 5;
            break;
          }
          return _context2.abrupt("return", false);
        case 5:
          _context2.next = 7;
          return OpenPgpEncryptor.askForKeyPassword(privateKey.getUser());
        case 7:
          password = _context2.sent;
          if (password) {
            _context2.next = 10;
            break;
          }
          return _context2.abrupt("return", false);
        case 10:
          _context2.next = 12;
          return Crypto.decryptParanoidKey(encryptedParanoidKey, password);
        case 12:
          decryptedParanoidKey = _context2.sent;
          return _context2.abrupt("return", {
            decryptedParanoidKey: decryptedParanoidKey,
            password: password
          });
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _getDecryptedParanoidKey.apply(this, arguments);
}
function onBeforeUpdateShare(_x3) {
  return _onBeforeUpdateShare.apply(this, arguments);
}
function _onBeforeUpdateShare() {
  _onBeforeUpdateShare = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(params) {
    var fileItem, extendedProps, encryptedParanoidKey, newShares, publicOpenPgpKeys, _yield$getDecryptedPa, decryptedParanoidKey, password, _iterator, _step, _loop;
    return _regeneratorRuntime().wrap(function _callee3$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!(!_.isFunction(params.OnSuccessCallback) || !_.isFunction(params.OnErrorCallback))) {
            _context4.next = 2;
            break;
          }
          return _context4.abrupt("return");
        case 2:
          fileItem = params.FileItem, extendedProps = fileItem && fileItem.oExtendedProps, encryptedParanoidKey = extendedProps && (fileItem.sharedWithMe() ? extendedProps.ParanoidKeyShared : extendedProps.ParanoidKey);
          if (!(!fileItem || !fileItem.IS_FILE || !encryptedParanoidKey || !_.isArray(params.Shares))) {
            _context4.next = 6;
            break;
          }
          // The item is not a file or not encrypted
          params.OnSuccessCallback();
          return _context4.abrupt("return");
        case 6:
          newShares = params.Shares.filter(function (share) {
            return share.New;
          });
          if (!(newShares.length === 0)) {
            _context4.next = 10;
            break;
          }
          // There are no new shares so no need to encrypt the key
          params.OnSuccessCallback();
          return _context4.abrupt("return");
        case 10:
          _context4.next = 12;
          return getPublicOpenPgpKeys(newShares);
        case 12:
          publicOpenPgpKeys = _context4.sent;
          if (publicOpenPgpKeys) {
            _context4.next = 16;
            break;
          }
          params.OnErrorCallback();
          return _context4.abrupt("return");
        case 16:
          _context4.next = 18;
          return getDecryptedParanoidKey(encryptedParanoidKey);
        case 18:
          _yield$getDecryptedPa = _context4.sent;
          decryptedParanoidKey = _yield$getDecryptedPa.decryptedParanoidKey;
          password = _yield$getDecryptedPa.password;
          if (decryptedParanoidKey) {
            _context4.next = 24;
            break;
          }
          params.OnErrorCallback();
          return _context4.abrupt("return");
        case 24:
          // Encrypt paranoid key with public OpenPGP keys
          _iterator = _createForOfIteratorHelper(params.Shares);
          _context4.prev = 25;
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var share, publicOpenPgpKey, encryptedParanoidKeyShared;
            return _regeneratorRuntime().wrap(function _loop$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  share = _step.value;
                  publicOpenPgpKey = publicOpenPgpKeys.find(function (openPgpKey) {
                    return openPgpKey.emailParts.email === share.PublicId;
                  });
                  if (!publicOpenPgpKey) {
                    _context3.next = 8;
                    break;
                  }
                  _context3.next = 5;
                  return Crypto.encryptParanoidKey(decryptedParanoidKey, [publicOpenPgpKey], password);
                case 5:
                  encryptedParanoidKeyShared = _context3.sent;
                  if (encryptedParanoidKeyShared) {
                    share.ParanoidKeyShared = encryptedParanoidKeyShared;
                  }
                  delete share.New;
                case 8:
                case "end":
                  return _context3.stop();
              }
            }, _loop);
          });
          _iterator.s();
        case 28:
          if ((_step = _iterator.n()).done) {
            _context4.next = 32;
            break;
          }
          return _context4.delegateYield(_loop(), "t0", 30);
        case 30:
          _context4.next = 28;
          break;
        case 32:
          _context4.next = 37;
          break;
        case 34:
          _context4.prev = 34;
          _context4.t1 = _context4["catch"](25);
          _iterator.e(_context4.t1);
        case 37:
          _context4.prev = 37;
          _iterator.f();
          return _context4.finish(37);
        case 40:
          //continue sharing
          params.OnSuccessCallback();
        case 41:
        case "end":
          return _context4.stop();
      }
    }, _callee3, null, [[25, 34, 37, 40]]);
  }));
  return _onBeforeUpdateShare.apply(this, arguments);
}
module.exports = {
  onBeforeUpdateShare: onBeforeUpdateShare
};

/***/ }),

/***/ "No2m":
/*!******************************************************************************************************!*\
  !*** ./modules/CoreParanoidEncryptionWebclientPlugin/js/views/ParanoidEncryptionSettingsFormView.js ***!
  \******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _ = __webpack_require__(/*! underscore */ "C3HO"),
  $ = __webpack_require__(/*! jquery */ "M4cL"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
  ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
  CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),
  Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
  JscryptoKey = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/JscryptoKey.js */ "0+zD"),
  Settings = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/Settings.js */ "AgXX"),
  ImportKeyStringPopup = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/popups/ImportKeyStringPopup.js */ "LAX2"),
  GenerateKeyPopup = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/popups/GenerateKeyPopup.js */ "mXd/"),
  ExportInformationPopup = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/popups/ExportInformationPopup.js */ "7/WE"),
  DeleteKeyPopup = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/popups/DeleteKeyPopup.js */ "3ud5"),
  HexUtils = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/utils/Hex.js */ "Zukw"),
  OpenPgpEncryptor = ModulesManager.run('OpenPgpWebclient', 'getOpenPgpEncryptor');

/**
 * @constructor
 */
function CParanoidEncryptionSettingsFormView() {
  CAbstractSettingsFormView.call(this, Settings.ServerModuleName);
  this.enableJscrypto = ko.observable(Settings.enableJscrypto());
  this.enableInPersonalStorage = ko.observable(Settings.EnableInPersonalStorage);
  this.keyName = ko.observable('');
  this.bIsHttpsEnable = window.location.protocol === "https:";
  this.allowChangeSettings = ko.observable(Settings.AllowChangeSettings);
  this.isImporting = ko.observable(false);
  this.exportKeyBound = _.bind(this.exportKey, this);
  this.isPGPKeysAvailable = ko.observable(true);
  if (ko.isObservable(JscryptoKey.keyName)) {
    JscryptoKey.keyName.subscribe(function () {
      this.keyName(JscryptoKey.keyName());
    }, this);
  }
  this.allowKeysManagement = ko.observable(!!this.keyName());
  this.keyName.subscribe(function () {
    if (!!this.keyName()) {
      this.allowKeysManagement(true);
    }
  }, this);
}
_.extendOwn(CParanoidEncryptionSettingsFormView.prototype, CAbstractSettingsFormView.prototype);
CParanoidEncryptionSettingsFormView.prototype.ViewTemplate = 'CoreParanoidEncryptionWebclientPlugin_ParanoidEncryptionSettingsFormView';
CParanoidEncryptionSettingsFormView.prototype.enableBackwardCompatibility = function () {
  this.allowKeysManagement(true);
};
CParanoidEncryptionSettingsFormView.prototype.importFileKey = function () {
  $("#import-key-file").click();
};
CParanoidEncryptionSettingsFormView.prototype.importStringKey = function () {
  Popups.showPopup(ImportKeyStringPopup);
};
CParanoidEncryptionSettingsFormView.prototype.readKeyFromFile = function () {
  var input = document.getElementById('import-key-file'),
    file = input.files[0],
    reader = new FileReader(),
    sContents = '',
    aFileNameParts = input.files[0].name.split('.'),
    sKeyName = '',
    fOnGenerateCallback = _.bind(function () {
      this.isImporting(false);
    }, this),
    fOnErrorCallback = _.bind(function () {
      this.isImporting(false);
    }, this);
  aFileNameParts.splice(aFileNameParts.length - 1, 1);
  sKeyName = aFileNameParts.join('');
  if (!file) {
    Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_IMPORT_KEY'));
    return;
  }
  this.isImporting(true);
  reader.onload = function (e) {
    sContents = e.target.result;
    JscryptoKey.importKeyFromString(sKeyName, sContents, fOnGenerateCallback, fOnErrorCallback);
  };
  try {
    reader.readAsText(file);
  } catch (e) {
    Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_IMPORT_KEY'));
  }
};
CParanoidEncryptionSettingsFormView.prototype.generateNewKey = function () {
  Popups.showPopup(GenerateKeyPopup, [_.bind(function () {
    //After generating new key show "export key" dialog
    Popups.showPopup(ExportInformationPopup, [this.exportKeyBound, this.keyName()]);
  }, this)]);
};
CParanoidEncryptionSettingsFormView.prototype.removeJscryptoKey = function () {
  var fRemove = _.bind(function (bRemove) {
    if (bRemove) {
      var oResult = JscryptoKey.deleteKey();
      if (oResult.error) {
        Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_DELETE_KEY'));
      }
    }
  }, this);
  Popups.showPopup(DeleteKeyPopup, [this.exportKeyBound, this.keyName(), fRemove]);
};
CParanoidEncryptionSettingsFormView.prototype.getCurrentValues = function () {
  return [this.enableJscrypto(), this.enableInPersonalStorage()];
};
CParanoidEncryptionSettingsFormView.prototype.revertGlobalValues = function () {
  this.enableJscrypto(Settings.enableJscrypto());
  this.enableInPersonalStorage(Settings.EnableInPersonalStorage);
};
CParanoidEncryptionSettingsFormView.prototype.getParametersForSave = function () {
  return {
    'EnableModule': this.enableJscrypto(),
    'EnableInPersonalStorage': this.enableInPersonalStorage()
  };
};
CParanoidEncryptionSettingsFormView.prototype.applySavedValues = function () {
  Settings.update(this.enableJscrypto(), this.enableInPersonalStorage());
};
CParanoidEncryptionSettingsFormView.prototype.onShow = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var bIsPrivateKeyAvailable;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        JscryptoKey.loadKeyNameFromStorage();
        _context.next = 3;
        return OpenPgpEncryptor.isPrivateKeyAvailable();
      case 3:
        bIsPrivateKeyAvailable = _context.sent;
        this.isPGPKeysAvailable(bIsPrivateKeyAvailable);
        this.allowKeysManagement(!!this.keyName());
      case 6:
      case "end":
        return _context.stop();
    }
  }, _callee, this);
}));
CParanoidEncryptionSettingsFormView.prototype.exportKey = function () {
  var oBlob = null,
    downloadLinkHref = null,
    oDownloadLink = document.createElement("a");
  JscryptoKey.getKey( /*fOnGenerateKeyCallback*/_.bind(function (oKey) {
    if (oKey) {
      JscryptoKey.exportKey().then(_.bind(function (keydata) {
        oBlob = new Blob([HexUtils.Array2HexString(new Uint8Array(keydata))], {
          type: 'text/plain'
        });
        downloadLinkHref = window.URL.createObjectURL(oBlob);
        document.body.appendChild(oDownloadLink);
        oDownloadLink.style = "display: none";
        oDownloadLink.href = downloadLinkHref;
        oDownloadLink.download = this.keyName();
        oDownloadLink.click();
        window.URL.revokeObjectURL(downloadLinkHref);
      }, this))["catch"](function () {
        Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_LOAD_KEY'));
      });
    } else {
      Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_LOAD_KEY'));
    }
  }, this), /*fOnErrorCallback*/false, /*sPassword*/false, /*bForcedKeyLoading*/true);
};
module.exports = new CParanoidEncryptionSettingsFormView();

/***/ })

}]);