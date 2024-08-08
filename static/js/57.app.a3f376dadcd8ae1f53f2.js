"use strict";
(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[57],{

/***/ "0+zD":
/*!*************************************************************************!*\
  !*** ./modules/CoreParanoidEncryptionWebclientPlugin/js/JscryptoKey.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  Storage = __webpack_require__(/*! modules/CoreWebclient/js/Storage.js */ "HCAJ"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
  UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV"),
  HexUtils = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/utils/Hex.js */ "Zukw"),
  Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
  DecryptKeyPasswordPopup = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/popups/DecryptKeyPasswordPopup.js */ "EHQ6"),
  EncryptKeyPasswordPopup = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/popups/EncryptKeyPasswordPopup.js */ "yO4T");

/**
 * @constructor
 */
function CJscryptoKey() {
  this.key = ko.observable();
  this.keyName = ko.observable();
}
CJscryptoKey.prototype.key = null;

/**
 * Asynchronously read key from storage, decrypt and generate key-object
 *
 * @param {Function} fOnGenerateKeyCallback - starts after the key is successfully generated
 * @param {Function} fOnErrorCallback - starts if error occurred during key generation process
 * @param {string} sPassword - encrypt key with given password, "password dialog" wouldn't show
 * @param {boolean} bForcedKeyLoading - forced key loading and decryption
 */
CJscryptoKey.prototype.getKey = function (fOnGenerateKeyCallback, fOnErrorCallback, sPassword, bForcedKeyLoading) {
  var sEncryptedKeyData = this.loadKeyFromStorage(),
    oPromise = new Promise(function (resolve, reject) {
      var fDecryptKeyCallback = _.bind(function (sPassword) {
        //Decrypt key with user password
        this.decryptKeyData(sEncryptedKeyData, sPassword).then(_.bind(function (aKeyData) {
          //generate key object from encrypted data
          this.generateKeyFromArray(aKeyData).then(function (oKey) {
            //return key object
            resolve(oKey);
          })["catch"](function (e) {
            reject(new Error(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_LOAD_KEY')));
          });
        }, this))["catch"](function (e) {
          reject(new Error(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_LOAD_KEY')));
        });
      }, this);
      if (!sEncryptedKeyData) {
        reject(new Error(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/INFO_EMPTY_JSCRYPTO_KEY')));
      } else {
        if (!this.key() || bForcedKeyLoading) {
          //if key not available or loading is forced - encrypt key data
          if (!sPassword) {
            //if password is unknown - request password
            Popups.showPopup(DecryptKeyPasswordPopup, [fDecryptKeyCallback, function () {
              if (_.isFunction(fOnErrorCallback)) {
                fOnErrorCallback();
              }
            }]);
          } else {
            //if password is known - decrypt key with this password
            fDecryptKeyCallback(sPassword);
          }
        } else {
          //if key already available - return key
          resolve(this.key());
        }
      }
    }.bind(this));
  this.loadKeyNameFromStorage();
  oPromise.then(_.bind(function (oKey) {
    this.onKeyGenerateSuccess(oKey);
    if (_.isFunction(fOnGenerateKeyCallback)) {
      fOnGenerateKeyCallback(oKey);
    }
  }, this))["catch"](_.bind(function (oError) {
    if (_.isFunction(fOnErrorCallback)) {
      fOnErrorCallback();
    }
    this.onKeyGenerateError(oError);
  }, this));
};

/**
 * Read key name from local storage
 */
CJscryptoKey.prototype.loadKeyNameFromStorage = function () {
  if (Storage.hasData(this.getStorageName())) {
    this.keyName(Storage.getData(this.getStorageName()).keyname);
  }
};

/**
 *  read key data from local storage
 *
 *  @returns {string}
 */
CJscryptoKey.prototype.loadKeyFromStorage = function () {
  var sKey = '';
  if (Storage.hasData(this.getStorageName())) {
    sKey = Storage.getData(this.getStorageName()).keydata;
  }
  return sKey;
};

/**
 * Asynchronously generate key object from array data
 *
 * @param {ArrayBuffer} aKey
 * @returns {Promise}
 */
CJscryptoKey.prototype.generateKeyFromArray = function (aKey) {
  var keyPromise = window.crypto.subtle.importKey("raw", aKey, {
    name: "AES-CBC"
  }, true, ["encrypt", "decrypt"]);
  return keyPromise;
};

/**
 * Write key-object to knockout variable
 *
 * @param {Object} oKey
 */
CJscryptoKey.prototype.onKeyGenerateSuccess = function (oKey) {
  this.key(oKey);
};

/**
 * Show error message
 *
 * @param {Object} oError
 */
CJscryptoKey.prototype.onKeyGenerateError = function (oError) {
  if (oError && oError.message) {
    Screens.showError(oError.message);
  }
};

/**
 * Asynchronously generate new key
 */
CJscryptoKey.prototype.generateKey = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var oKey;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        oKey = false;
        _context.prev = 1;
        _context.next = 4;
        return window.crypto.subtle.generateKey({
          name: "AES-CBC",
          length: 256
        }, true, ["encrypt", "decrypt"]);
      case 4:
        oKey = _context.sent;
        _context.next = 10;
        break;
      case 7:
        _context.prev = 7;
        _context.t0 = _context["catch"](1);
        Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_GENERATE_KEY'));
      case 10:
        return _context.abrupt("return", oKey);
      case 11:
      case "end":
        return _context.stop();
    }
  }, _callee, null, [[1, 7]]);
}));
CJscryptoKey.prototype.convertKeyToString = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(oKey) {
    var sKeyData, aKeyData;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          sKeyData = '';
          if (!oKey) {
            _context2.next = 12;
            break;
          }
          _context2.prev = 2;
          _context2.next = 5;
          return window.crypto.subtle.exportKey("raw", oKey);
        case 5:
          aKeyData = _context2.sent;
          sKeyData = HexUtils.Array2HexString(new Uint8Array(aKeyData));
          _context2.next = 12;
          break;
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](2);
          Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_EXPORT_KEY'));
        case 12:
          return _context2.abrupt("return", sKeyData);
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[2, 9]]);
  }));
  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Asynchronously generate and export new key
 *
 * @param {Function} fOnGenerateCallback - starts after the key is successfully generated
 * @param {string} sKeyName
 */
CJscryptoKey.prototype.generateAndExportKey = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(fOnGenerateCallback, sKeyName) {
    var _this = this;
    var oKey, sKeyData;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return this.generateKey();
        case 2:
          oKey = _context4.sent;
          _context4.next = 5;
          return this.convertKeyToString(oKey);
        case 5:
          sKeyData = _context4.sent;
          Popups.showPopup(EncryptKeyPasswordPopup, [( /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(sPassword) {
              var sKeyDataEncrypted;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.prev = 0;
                    _context3.next = 3;
                    return _this.encryptKeyData(sKeyData, sPassword);
                  case 3:
                    sKeyDataEncrypted = _context3.sent;
                    Storage.setData(_this.getStorageName(), {
                      keyname: sKeyName,
                      keydata: sKeyDataEncrypted
                    });
                    _this.loadKeyNameFromStorage();
                    _this.onKeyGenerateSuccess(oKey);
                    if (_.isFunction(fOnGenerateCallback)) {
                      fOnGenerateCallback();
                    }
                    _context3.next = 13;
                    break;
                  case 10:
                    _context3.prev = 10;
                    _context3.t0 = _context3["catch"](0);
                    Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_LOAD_KEY'));
                  case 13:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3, null, [[0, 10]]);
            }));
            return function (_x4) {
              return _ref4.apply(this, arguments);
            };
          }()), function () {}]);
        case 7:
        case "end":
          return _context4.stop();
      }
    }, _callee4, this);
  }));
  return function (_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();
CJscryptoKey.prototype.getKeyFromString = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(sParanoidKey) {
    var oKey, aKeyData;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          oKey = null;
          aKeyData = HexUtils.HexString2Array(sParanoidKey);
          if (aKeyData.length > 0) {
            aKeyData = new Uint8Array(aKeyData);
          } else {
            Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_LOAD_KEY'));
          }
          _context5.prev = 3;
          _context5.next = 6;
          return this.generateKeyFromArray(aKeyData);
        case 6:
          oKey = _context5.sent;
          _context5.next = 12;
          break;
        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](3);
          Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_LOAD_KEY'));
        case 12:
          return _context5.abrupt("return", oKey);
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5, this, [[3, 9]]);
  }));
  return function (_x5) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Asynchronously generate key-object from string key-data
 *
 * @param {string} sKeyName
 * @param {string} sKeyData
 * @param {Function} fOnImportKeyCallback - starts after the key is successfully imported
 * @param {Function} fOnErrorCallback - starts if an error occurs during the key import process
 */
CJscryptoKey.prototype.importKeyFromString = function (sKeyName, sKeyData, fOnImportKeyCallback, fOnErrorCallback) {
  try {
    Popups.showPopup(EncryptKeyPasswordPopup, [_.bind(function (sPassword) {
      // Encrypt imported Key with User password
      this.encryptKeyData(sKeyData, sPassword).then(_.bind(function (sKeyDataEncrypted) {
        // Store encrypted key in local storage
        Storage.setData(this.getStorageName(), {
          keyname: sKeyName,
          keydata: sKeyDataEncrypted
        });
        this.getKey(fOnImportKeyCallback, fOnErrorCallback, sPassword);
      }, this))["catch"](function () {
        Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_LOAD_KEY'));
        if (_.isFunction(fOnErrorCallback)) {
          fOnErrorCallback();
        }
      });
    }, this), function () {
      // Cancel callback
      if (_.isFunction(fOnErrorCallback)) {
        fOnErrorCallback();
      }
    }]);
  } catch (e) {
    Screens.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_IMPORT_KEY'));
    if (_.isFunction(fOnErrorCallback)) {
      fOnErrorCallback();
    }
  }
};

/**
 * Asynchronously export key
 *
 * @returns {Promise}
 */
CJscryptoKey.prototype.exportKey = function () {
  return window.crypto.subtle.exportKey("raw", this.key());
};

/**
 * Remove key-object and clear key-data in local storage
 *
 * @returns {Object}
 */
CJscryptoKey.prototype.deleteKey = function () {
  try {
    this.key(null);
    this.keyName(null);
    Storage.removeData(this.getStorageName());
  } catch (e) {
    return {
      error: e
    };
  }
  return {
    status: 'ok'
  };
};

/**
 * Asynchronously decrypt key with user password
 *
 * @param {string} sEncryptedKeyData
 * @param {string} sPassword
 * @returns {Promise}
 */
CJscryptoKey.prototype.decryptKeyData = function (sEncryptedKeyData, sPassword) {
  var aVector = new Uint8Array(16) //defaults to zero
  ;
  return new Promise(function (resolve, reject) {
    if (!sEncryptedKeyData) {
      reject(new Error(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_LOAD_KEY')));
    } else {
      //get password-key
      this.deriveKeyFromPasswordPromise(sPassword, _.bind(function (oDerivedKey) {
        crypto.subtle.decrypt({
          name: 'AES-CBC',
          iv: aVector
        }, oDerivedKey, new Uint8Array(HexUtils.HexString2Array(sEncryptedKeyData))).then(_.bind(function (aDecryptedKeyData) {
          resolve(new Uint8Array(aDecryptedKeyData));
        }, this))["catch"](function () {
          reject(new Error(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_LOAD_KEY')));
        });
      }, this), function () {
        reject(new Error(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_LOAD_KEY')));
      });
    }
  }.bind(this));
};

/**
 * Asynchronously encrypt key with user password
 *
 * @param {string} sUserKeyData
 * @param {string} sPassword
 * @returns {Promise}
 */
CJscryptoKey.prototype.encryptKeyData = function (sUserKeyData, sPassword) {
  var aKeyData = null,
    sEncryptedKeyData = null,
    aVector = new Uint8Array(16) //defaults to zero
  ;
  return new Promise(function (resolve, reject) {
    if (!sUserKeyData) {
      reject(new Error(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_LOAD_KEY')));
    } else {
      aKeyData = HexUtils.HexString2Array(sUserKeyData);
      if (aKeyData.length > 0) {
        aKeyData = new Uint8Array(aKeyData);
      } else {
        reject(new Error(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_LOAD_KEY')));
      }
      //get password-key
      this.deriveKeyFromPasswordPromise(sPassword, _.bind(function (oDerivedKey) {
        //encrypt user-key with password-key
        crypto.subtle.encrypt({
          name: 'AES-CBC',
          iv: aVector
        }, oDerivedKey, aKeyData).then(_.bind(function (aEncryptedKeyData) {
          sEncryptedKeyData = HexUtils.Array2HexString(new Uint8Array(aEncryptedKeyData));
          resolve(sEncryptedKeyData);
        }, this))["catch"](function () {
          reject(new Error(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_LOAD_KEY')));
        });
      }, this), function () {
        reject(new Error(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_LOAD_KEY')));
      });
    }
  }.bind(this));
};

/**
 * Asynchronously generate special key from user password. This key used in process of encryption/decryption user key.
 *
 * @param {string} sPassword
 * @param {Function} fOnGetDerivedKeyCallback - starts after the key is successfully generated
 * @param {Function} fOnErrorCallback - starts if an error occurs during the key generation process
 */
CJscryptoKey.prototype.deriveKeyFromPasswordPromise = function (sPassword, fOnGetDerivedKeyCallback, fOnErrorCallback) {
  var sSalt = "the salt is this string",
    convertStringToArrayBuffer = function convertStringToArrayBuffer(sData) {
      if (window.TextEncoder) {
        return new TextEncoder('utf-8').encode(sData);
      }
      var sUtf8 = unescape(encodeURIComponent(sData)),
        sResult = new Uint8Array(sUtf8.length);
      for (var i = 0; i < sUtf8.length; i++) {
        sResult[i] = sUtf8.charCodeAt(i);
      }
      return sResult;
    };
  window.crypto.subtle.importKey("raw", convertStringToArrayBuffer(sPassword), {
    "name": "PBKDF2"
  }, false, ["deriveKey"]).then(_.bind(function (oPasswordKey) {
    window.crypto.subtle.deriveKey({
      "name": "PBKDF2",
      "salt": convertStringToArrayBuffer(sSalt),
      "iterations": 100000,
      "hash": "SHA-256"
    }, oPasswordKey, {
      "name": "AES-CBC",
      "length": 256
    }, true, ["encrypt", "decrypt"]).then(function (oDerivedKey) {
      if (_.isFunction(fOnGetDerivedKeyCallback)) {
        fOnGetDerivedKeyCallback(oDerivedKey);
      }
    })["catch"](function () {
      if (_.isFunction(fOnErrorCallback)) {
        fOnErrorCallback();
      }
    });
  }, this))["catch"](function () {
    if (_.isFunction(fOnErrorCallback)) {
      fOnErrorCallback();
    }
  });
};
CJscryptoKey.prototype.getStorageName = function () {
  var userId = UserSettings.UserId || 0;
  return "aurora_paranoid_user_".concat(userId, "_encrypted-crypto-key");
};
module.exports = new CJscryptoKey();

/***/ }),

/***/ "EHQ6":
/*!********************************************************************************************!*\
  !*** ./modules/CoreParanoidEncryptionWebclientPlugin/js/popups/DecryptKeyPasswordPopup.js ***!
  \********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX");

/**
 * @constructor
 */
function CDecryptKeyPasswordPopup() {
  CAbstractPopup.call(this);
  this.keyPassword = ko.observable('');
  this.fOnPasswordEnterCallback = null;
  this.fOnCancellCallback = null;
}
_.extendOwn(CDecryptKeyPasswordPopup.prototype, CAbstractPopup.prototype);
CDecryptKeyPasswordPopup.prototype.PopupTemplate = 'CoreParanoidEncryptionWebclientPlugin_DecryptKeyPasswordPopup';
CDecryptKeyPasswordPopup.prototype.onOpen = function (fOnPasswordEnterCallback, fOnCancellCallback) {
  this.fOnPasswordEnterCallback = fOnPasswordEnterCallback;
  this.fOnCancellCallback = fOnCancellCallback;
};
CDecryptKeyPasswordPopup.prototype.decryptKey = function () {
  if (_.isFunction(this.fOnPasswordEnterCallback)) {
    this.fOnPasswordEnterCallback(this.keyPassword());
  }
  this.closePopup();
};
CDecryptKeyPasswordPopup.prototype.cancelPopup = function () {
  if (_.isFunction(this.fOnCancellCallback)) {
    this.fOnCancellCallback();
  }
  this.closePopup();
};
CDecryptKeyPasswordPopup.prototype.onShow = function () {
  this.keyPassword('');
};
module.exports = new CDecryptKeyPasswordPopup();

/***/ }),

/***/ "yO4T":
/*!********************************************************************************************!*\
  !*** ./modules/CoreParanoidEncryptionWebclientPlugin/js/popups/EncryptKeyPasswordPopup.js ***!
  \********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "M4cL");


var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT");

/**
 * @constructor
 */
function CEncryptKeyPasswordPopup() {
  CAbstractPopup.call(this);
  this.keyPassword = ko.observable('');
  this.keyPasswordConfirm = ko.observable('');
  this.fOnPasswordEnterCallback = null;
  this.fOnWrongPasswordCallback = null;
  this.fOnCancellCallback = null;
}
_.extendOwn(CEncryptKeyPasswordPopup.prototype, CAbstractPopup.prototype);
CEncryptKeyPasswordPopup.prototype.PopupTemplate = 'CoreParanoidEncryptionWebclientPlugin_EncryptKeyPasswordPopup';
CEncryptKeyPasswordPopup.prototype.onOpen = function (fOnPasswordEnterCallback, fOnCancellCallback) {
  this.fOnPasswordEnterCallback = fOnPasswordEnterCallback;
  this.fOnCancellCallback = fOnCancellCallback;
};
CEncryptKeyPasswordPopup.prototype.encryptKey = function () {
  if ($.trim(this.keyPassword()) === '') {
    this.showError(TextUtils.i18n('COREPARANOIDENCRYPTIONWEBCLIENTPLUGIN/ERROR_PASSWORD_CANT_BE_BLANK'));
  } else if ($.trim(this.keyPassword()) !== $.trim(this.keyPasswordConfirm())) {
    this.showError(TextUtils.i18n('COREWEBCLIENT/ERROR_PASSWORDS_DO_NOT_MATCH'));
  } else {
    if (_.isFunction(this.fOnPasswordEnterCallback)) {
      this.fOnPasswordEnterCallback($.trim(this.keyPassword()));
    }
    this.closePopup();
  }
};
CEncryptKeyPasswordPopup.prototype.cancelPopup = function () {
  if (_.isFunction(this.fOnCancellCallback)) {
    this.fOnCancellCallback();
  }
  this.closePopup();
};
CEncryptKeyPasswordPopup.prototype.onShow = function () {
  this.keyPassword('');
  this.keyPasswordConfirm('');
};
CEncryptKeyPasswordPopup.prototype.showError = function (sMessage) {
  Screens.showError(sMessage);
};
module.exports = new CEncryptKeyPasswordPopup();

/***/ }),

/***/ "Zukw":
/*!***********************************************************************!*\
  !*** ./modules/CoreParanoidEncryptionWebclientPlugin/js/utils/Hex.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var _ = __webpack_require__(/*! underscore */ "C3HO"),
  HexUtils = {};
HexUtils.Array2HexString = function (aInput) {
  var sHexAB = '';
  _.each(aInput, function (element) {
    var sHex = element.toString(16);
    sHexAB += (sHex.length === 1 ? '0' : '') + sHex;
  });
  return sHexAB;
};
HexUtils.HexString2Array = function (sHex) {
  var aResult = [];
  if (sHex.length === 0 || sHex.length % 2 !== 0) {
    return aResult;
  }
  for (var i = 0; i < sHex.length; i += 2) {
    aResult.push(parseInt(sHex.substr(i, 2), 16));
  }
  return aResult;
};
module.exports = HexUtils;

/***/ })

}]);