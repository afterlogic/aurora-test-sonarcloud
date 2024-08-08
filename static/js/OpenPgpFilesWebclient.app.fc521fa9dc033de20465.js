(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[36],{

/***/ "jNBr":
/*!*******************************************************!*\
  !*** ./modules/CoreWebclient/js/models/CDateModel.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	moment = __webpack_require__(/*! moment */ "sdEb"),
			
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
	
	UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV")
;

/**
 * @constructor
 */
function CDateModel()
{
	this.iTimeStampInUTC = 0;
	this.oMoment = null;
}

/**
 * @param {number} iTimeStampInUTC
 */
CDateModel.prototype.parse = function (iTimeStampInUTC)
{
	this.iTimeStampInUTC = iTimeStampInUTC;
	this.oMoment = moment.unix(this.iTimeStampInUTC);
};

/**
 * @param {number} iYear
 * @param {number} iMonth
 * @param {number} iDay
 */
CDateModel.prototype.setDate = function (iYear, iMonth, iDay)
{
	this.oMoment = moment([iYear, iMonth, iDay]);
};

/**
 * @return {string}
 */
CDateModel.prototype.getTimeFormat = function ()
{
	return (UserSettings.timeFormat() === window.Enums.TimeFormat.F24) ? 'HH:mm' : 'hh:mm A';
};

/**
 * @return {string}
 */
CDateModel.prototype.getFullDate = function ()
{
	return this.getDate() + ' ' + this.getTime();	
};

/**
 * @return {string}
 */
CDateModel.prototype.getMidDate = function ()
{
	return this.getShortDate(true);
};

/**
 * @param {boolean=} bTime = false
 * 
 * @return {string}
 */
CDateModel.prototype.getShortDate = function (bTime)
{
	var
		sResult = '',
		oMomentNow = null
	;

	if (this.oMoment)
	{
		oMomentNow = moment();

		if (oMomentNow.format('L') === this.oMoment.format('L'))
		{
			sResult = this.oMoment.format(this.getTimeFormat());
		}
		else
		{
			if (oMomentNow.clone().subtract(1, 'days').format('L') === this.oMoment.format('L'))
			{
				sResult = TextUtils.i18n('COREWEBCLIENT/LABEL_YESTERDAY');
			}
			else
			{
				if (UserSettings.UserSelectsDateFormat)
				{
					sResult = this.oMoment.format(Utils.getDateFormatForMoment(UserSettings.dateFormat()));
				}
				else
				{
					if (oMomentNow.year() === this.oMoment.year())
					{
						sResult = this.oMoment.format('MMM D');
					}
					else
					{
						sResult = this.oMoment.format('MMM D, YYYY');
					}
				}
			}

			if (!!bTime)
			{
				sResult += ', ' + this.oMoment.format(this.getTimeFormat());
			}
		}
	}

	return sResult;
};

/**
 * @return {string}
 */
CDateModel.prototype.getDate = function ()
{
	var sFormat = 'ddd, MMM D, YYYY';
	
	if (UserSettings.UserSelectsDateFormat)
	{
		sFormat = 'ddd, ' + Utils.getDateFormatForMoment(UserSettings.dateFormat());
	}
	
	return (this.oMoment) ? this.oMoment.format(sFormat) : '';
};

/**
 * @return {string}
 */
CDateModel.prototype.getTime = function ()
{
	return (this.oMoment) ? this.oMoment.format(this.getTimeFormat()): '';
};

/**
 * @return {number}
 */
CDateModel.prototype.getTimeStampInUTC = function ()
{
	return this.iTimeStampInUTC;
};

module.exports = CDateModel;


/***/ }),

/***/ "nDo9":
/*!***************************************************!*\
  !*** ./modules/OpenPgpFilesWebclient/js/Enums.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _ = __webpack_require__(/*! underscore */ "C3HO"),
  Enums = {};

/**
 * @enum {number}
 */
Enums.OpenPgpErrors = {
  'UnknownError': 0,
  'UnknownNotice': 1,
  'InvalidArgumentError': 2,
  'GenerateKeyError': 10,
  'ImportKeyError': 20,
  'ImportNoKeysFoundError': 21,
  'PrivateKeyNotFoundError': 30,
  'PublicKeyNotFoundError': 31,
  'KeyIsNotDecodedError': 32,
  'SignError': 40,
  'VerifyError': 41,
  'EncryptError': 42,
  'DecryptError': 43,
  'SignAndEncryptError': 44,
  'VerifyAndDecryptError': 45,
  'PasswordDecryptError': 46,
  'CanNotReadMessage': 50,
  'CanNotReadKey': 51,
  'DeleteError': 60,
  'PublicKeyNotFoundNotice': 70,
  'PrivateKeyNotFoundNotice': 71,
  'VerifyErrorNotice': 72,
  'NoSignDataNotice': 73
};

/**
 * @enum {string}
 */
Enums.PgpAction = {
  'Import': 'import',
  'Generate': 'generate',
  'Encrypt': 'encrypt',
  'Sign': 'sign',
  'EncryptSign': 'encrypt-sign',
  'Verify': 'ferify',
  'DecryptVerify': 'decrypt-ferify'
};

/**
 * @enum {string}
 */
Enums.EncryptionBasedOn = {
  'Password': 'password',
  'Key': 'key'
};
if (typeof window.Enums === 'undefined') {
  window.Enums = {};
}
_.extendOwn(window.Enums, Enums);

/***/ }),

/***/ "1CV1":
/*!******************************************************************!*\
  !*** ./modules/OpenPgpFilesWebclient/js/OpenPgpFileProcessor.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
  Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
  Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
  ErrorsUtils = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/utils/Errors.js */ "w0+v"),
  JscryptoKey = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/JscryptoKey.js */ "0+zD"),
  HexUtils = __webpack_require__(/*! modules/CoreParanoidEncryptionWebclientPlugin/js/utils/Hex.js */ "Zukw"),
  OpenPgpEncryptor = ModulesManager.run('OpenPgpWebclient', 'getOpenPgpEncryptor');
var OpenPgpFileProcessor = {};
OpenPgpFileProcessor.processFileEncryption = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(oFile, oFilesView, sRecipientEmail, contactUUID, bIsPasswordMode, bSign) {
    var iLifetimeHrs,
      sPath,
      sStorageType,
      oResultData,
      extendedProps,
      encryptedParanoidKey,
      sPassphrase,
      oPGPDecryptionResult,
      sKey,
      aPublicKeys,
      oPrivateKey,
      oPGPEncryptionResult,
      _oPGPEncryptionResult,
      sEncryptedKey,
      sPassword,
      bUpdateExtendedProps,
      oPublicLinkResult,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          iLifetimeHrs = _args.length > 6 && _args[6] !== undefined ? _args[6] : 0;
          sPath = oFilesView.currentPath(), sStorageType = oFilesView.storageType(), oResultData = {
            result: false
          }, extendedProps = oFile && oFile.oExtendedProps, encryptedParanoidKey = extendedProps && (oFile.sharedWithMe() ? extendedProps.ParanoidKeyShared : extendedProps.ParanoidKey);
          if (!encryptedParanoidKey) {
            _context.next = 51;
            break;
          }
          sPassphrase = ''; //decrypt key
          _context.next = 6;
          return OpenPgpEncryptor.decryptData(encryptedParanoidKey, sPassphrase);
        case 6:
          oPGPDecryptionResult = _context.sent;
          if (oPGPDecryptionResult.passphrase) {
            // saving passphrase so that it won't be asked again until encrypt popup is closed
            sPassphrase = oPGPDecryptionResult.passphrase;
            oResultData.passphrase = sPassphrase;
          }
          if (!oPGPDecryptionResult.result) {
            _context.next = 48;
            break;
          }
          sKey = oPGPDecryptionResult.result; //encrypt Paranoid key
          if (!(sRecipientEmail && !bIsPasswordMode)) {
            _context.next = 16;
            break;
          }
          _context.next = 13;
          return OpenPgpEncryptor.getPublicKeysByContactsAndEmails([contactUUID], [sRecipientEmail]);
        case 13:
          _context.t0 = _context.sent;
          _context.next = 17;
          break;
        case 16:
          _context.t0 = [];
        case 17:
          aPublicKeys = _context.t0;
          if (!bSign) {
            _context.next = 24;
            break;
          }
          _context.next = 21;
          return OpenPgpEncryptor.getCurrentUserPrivateKey();
        case 21:
          _context.t1 = _context.sent;
          _context.next = 25;
          break;
        case 24:
          _context.t1 = null;
        case 25:
          oPrivateKey = _context.t1;
          _context.next = 28;
          return OpenPgpEncryptor.encryptData(sKey, aPublicKeys, [oPrivateKey], bIsPasswordMode, bSign, sPassphrase);
        case 28:
          oPGPEncryptionResult = _context.sent;
          if (!(!oPGPEncryptionResult.result || oPGPEncryptionResult.hasErrors() || oPGPEncryptionResult.hasNotices())) {
            _context.next = 33;
            break;
          }
          ErrorsUtils.showPgpErrorByCode(oPGPEncryptionResult, Enums.PgpAction.Encrypt);
          _context.next = 46;
          break;
        case 33:
          _oPGPEncryptionResult = oPGPEncryptionResult.result, sEncryptedKey = _oPGPEncryptionResult.data, sPassword = _oPGPEncryptionResult.password;
          if (!sEncryptedKey) {
            _context.next = 46;
            break;
          }
          _context.next = 37;
          return this.updateFileExtendedProps(oFile, {
            ParanoidKeyPublic: sEncryptedKey
          });
        case 37:
          bUpdateExtendedProps = _context.sent;
          if (!bUpdateExtendedProps) {
            _context.next = 45;
            break;
          }
          _context.next = 41;
          return this.createPublicLink(oFile.storageType(), oFile.path(), oFile.fileName(), oFile.size(), false, sRecipientEmail, bIsPasswordMode ? Enums.EncryptionBasedOn.Password : Enums.EncryptionBasedOn.Key, iLifetimeHrs);
        case 41:
          oPublicLinkResult = _context.sent;
          if (oPublicLinkResult.result) {
            oFilesView.refresh();
            oResultData.result = true;
            oResultData.password = sPassword;
            oResultData.link = oPublicLinkResult.link;
          } else {
            Screens.showError(oPublicLinkResult.errorMessage || TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_CREATE_PUBLIC_LINK'));
          }
          _context.next = 46;
          break;
        case 45:
          Screens.showError(TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_UPDATING_KEY'));
        case 46:
          _context.next = 49;
          break;
        case 48:
          ErrorsUtils.showPgpErrorByCode(oPGPDecryptionResult, Enums.PgpAction.DecryptVerify);
        case 49:
          _context.next = 52;
          break;
        case 51:
          Screens.showError('OPENPGPFILESWEBCLIENT/ERROR_READING_KEY');
        case 52:
          return _context.abrupt("return", oResultData);
        case 53:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return function (_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();
OpenPgpFileProcessor.decryptFile = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(oBlob, sRecipientEmail, sPassword, bPasswordBasedEncryption, sParanoidKeyPublic, sInitializationVector) {
    var oResult, oPGPDecryptionResult, oCurrentUserPrivateKey, sReport, sKey, oDecryptedFileData, oResBlob;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          oResult = {
            result: false
          };
          _context2.prev = 1;
          _context2.next = 4;
          return OpenPgpEncryptor.decryptData(sParanoidKeyPublic, sPassword, bPasswordBasedEncryption);
        case 4:
          oPGPDecryptionResult = _context2.sent;
          if (oPGPDecryptionResult.result) {
            _context2.next = 9;
            break;
          }
          ErrorsUtils.showPgpErrorByCode(oPGPDecryptionResult, Enums.PgpAction.DecryptVerify);
          _context2.next = 22;
          break;
        case 9:
          if (!(oPGPDecryptionResult.validKeyNames && oPGPDecryptionResult.validKeyNames.length)) {
            _context2.next = 16;
            break;
          }
          _context2.next = 12;
          return OpenPgpEncryptor.getCurrentUserPrivateKey();
        case 12:
          oCurrentUserPrivateKey = _context2.sent;
          if (!oCurrentUserPrivateKey || !oPGPDecryptionResult.validKeyNames.includes(oCurrentUserPrivateKey.getUser())) {
            //Paranoid-key was signed with a foreign key
            sReport = TextUtils.i18n('OPENPGPFILESWEBCLIENT/REPORT_SUCCESSFULL_SIGNATURE_VERIFICATION') + oPGPDecryptionResult.validKeyNames.join(', ').replace(/</g, "&lt;").replace(/>/g, "&gt;");
            Screens.showReport(sReport);
          }
          _context2.next = 17;
          break;
        case 16:
          if (oPGPDecryptionResult.notices && _.indexOf(oPGPDecryptionResult.notices, Enums.OpenPgpErrors.VerifyErrorNotice) !== -1) {
            Screens.showError(TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_SIGNATURE_NOT_VERIFIED'));
          }
        case 17:
          //file decryption
          sKey = oPGPDecryptionResult.result;
          _context2.next = 20;
          return this.decryptAsSingleChunk(oBlob, sKey, sInitializationVector);
        case 20:
          oDecryptedFileData = _context2.sent;
          //save decrypted file
          if (oDecryptedFileData) {
            oResBlob = new Blob([oDecryptedFileData], {
              type: "octet/stream",
              lastModified: new Date()
            });
            oResult.result = true;
            oResult.blob = oResBlob;
          }
        case 22:
          return _context2.abrupt("return", oResult);
        case 25:
          _context2.prev = 25;
          _context2.t0 = _context2["catch"](1);
          return _context2.abrupt("return", oResult);
        case 28:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this, [[1, 25]]);
  }));
  return function (_x7, _x8, _x9, _x10, _x11, _x12) {
    return _ref2.apply(this, arguments);
  };
}();
OpenPgpFileProcessor.createPublicLink = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(sType, sPath, sFileName, iSize) {
    var _this = this;
    var bEncryptLink,
      sRecipientEmail,
      sPgpEncryptionMode,
      iLifetimeHrs,
      bIsFolder,
      sLink,
      oResult,
      sPassword,
      oPromiseCreatePublicLink,
      oLinkData,
      _args3 = arguments;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          bEncryptLink = _args3.length > 4 && _args3[4] !== undefined ? _args3[4] : false;
          sRecipientEmail = _args3.length > 5 && _args3[5] !== undefined ? _args3[5] : '';
          sPgpEncryptionMode = _args3.length > 6 && _args3[6] !== undefined ? _args3[6] : '';
          iLifetimeHrs = _args3.length > 7 && _args3[7] !== undefined ? _args3[7] : 0;
          bIsFolder = _args3.length > 8 && _args3[8] !== undefined ? _args3[8] : false;
          sLink = '';
          oResult = {
            result: false
          };
          sPassword = bEncryptLink || sPgpEncryptionMode === Enums.EncryptionBasedOn.Password ? OpenPgpEncryptor.generatePassword() : '';
          oPromiseCreatePublicLink = new Promise(function (resolve, reject) {
            var fResponseCallback = function fResponseCallback(response, request) {
              if (response.Result && response.Result.link) {
                resolve(response.Result);
              }
              var errorText = Api.getErrorByCode(response, TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_PUBLIC_LINK_CREATION'));
              reject(new Error(errorText));
            };
            var oParams = {
              'Type': sType,
              'Path': sPath,
              'Name': sFileName,
              'Size': iSize,
              'IsFolder': bIsFolder,
              'RecipientEmail': sRecipientEmail,
              'PgpEncryptionMode': sPgpEncryptionMode,
              'LifetimeHrs': iLifetimeHrs
            };
            if (bEncryptLink) {
              oParams.Password = sPassword;
            }
            Ajax.send('OpenPgpFilesWebclient', 'CreatePublicLink', oParams, fResponseCallback, _this);
          });
          _context3.prev = 9;
          _context3.next = 12;
          return oPromiseCreatePublicLink;
        case 12:
          oLinkData = _context3.sent;
          oResult.result = true;
          oResult.link = (oLinkData === null || oLinkData === void 0 ? void 0 : oLinkData.link) || '';
          oResult.password = (oLinkData === null || oLinkData === void 0 ? void 0 : oLinkData.password) || sPassword;
          _context3.next = 21;
          break;
        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](9);
          if (_context3.t0 && _context3.t0.message) {
            oResult.errorMessage = _context3.t0.message;
          }
        case 21:
          return _context3.abrupt("return", oResult);
        case 22:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[9, 18]]);
  }));
  return function (_x13, _x14, _x15, _x16) {
    return _ref3.apply(this, arguments);
  };
}();
OpenPgpFileProcessor.getFileContentByUrl = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(sDownloadUrl, onDownloadProgressCallback) {
    var response, reader, iReceivedLength, aChunks, _yield$reader$read, done, value;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return fetch(sDownloadUrl);
        case 2:
          response = _context4.sent;
          if (!response.ok) {
            _context4.next = 23;
            break;
          }
          reader = response.body.getReader();
          iReceivedLength = 0;
          aChunks = [];
        case 7:
          if (false) {}
          _context4.next = 10;
          return reader.read();
        case 10:
          _yield$reader$read = _context4.sent;
          done = _yield$reader$read.done;
          value = _yield$reader$read.value;
          if (!done) {
            _context4.next = 15;
            break;
          }
          return _context4.abrupt("break", 20);
        case 15:
          iReceivedLength += value.length;
          aChunks.push(value);
          if (_.isFunction(onDownloadProgressCallback)) {
            onDownloadProgressCallback(iReceivedLength);
          }
          _context4.next = 7;
          break;
        case 20:
          return _context4.abrupt("return", new Blob(aChunks));
        case 23:
          return _context4.abrupt("return", false);
        case 24:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x17, _x18) {
    return _ref4.apply(this, arguments);
  };
}();
OpenPgpFileProcessor.saveBlob = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(oBlob, sFileName) {
    var blobUrl, link;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (!(window.navigator && window.navigator.msSaveOrOpenBlob)) {
            _context5.next = 3;
            break;
          }
          window.navigator.msSaveOrOpenBlob(oBlob, sFileName);
          return _context5.abrupt("return");
        case 3:
          blobUrl = window.URL.createObjectURL(oBlob);
          link = document.createElement("a");
          link.href = blobUrl;
          link.download = sFileName;
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(blobUrl);
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x19, _x20) {
    return _ref5.apply(this, arguments);
  };
}();
OpenPgpFileProcessor.processFileDecryption = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(sFileName, sDownloadUrl, sRecipientEmail, sPassword, sEncryptionMode, sParanoidKeyPublic, sInitializationVector) {
    var oBlob, oDecryptionResult;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return this.getFileContentByUrl(sDownloadUrl);
        case 2:
          oBlob = _context6.sent;
          if (!(oBlob instanceof Blob)) {
            _context6.next = 10;
            break;
          }
          _context6.next = 6;
          return this.decryptFile(oBlob, sRecipientEmail, sPassword, sEncryptionMode === Enums.EncryptionBasedOn.Password, sParanoidKeyPublic, sInitializationVector);
        case 6:
          oDecryptionResult = _context6.sent;
          if (oDecryptionResult.result) {
            this.saveBlob(oDecryptionResult.blob, sFileName);
          } else {
            // Error with details is already shown in decryptFile method
            // Screens.showError(TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_ON_DOWNLOAD'));
          }
          _context6.next = 11;
          break;
        case 10:
          Screens.showError(TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_ON_DOWNLOAD'));
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, this);
  }));
  return function (_x21, _x22, _x23, _x24, _x25, _x26, _x27) {
    return _ref6.apply(this, arguments);
  };
}();
OpenPgpFileProcessor.getFileNameForDownload = function (sFileName, sRecipientEmail) {
  var sFileNameWithoutExtension = Utils.getFileNameWithoutExtension(sFileName);
  var sDelimiter = '_' + sRecipientEmail;
  var aNameParts = sFileNameWithoutExtension.split(sDelimiter);
  var sNewName = '';
  if (aNameParts.length <= 2) {
    sNewName = aNameParts.join('');
  } else {
    //If the files name contains more than one entry of a recipient email, only the last entry is removed
    for (var i = 0; i < aNameParts.length; i++) {
      sNewName += aNameParts[i];
      sNewName += i < aNameParts.length - 2 ? sDelimiter : '';
    }
  }
  return sNewName;
};
OpenPgpFileProcessor.updateFileExtendedProps = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(oFile, oExtendedProps) {
    var _this2 = this;
    var oPromiseUpdateExtendedProps;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          //Update file extended props
          oPromiseUpdateExtendedProps = new Promise(function (resolve, reject) {
            Ajax.send('Files', 'UpdateExtendedProps', {
              Type: oFile.storageType(),
              Path: oFile.path(),
              Name: oFile.fileName(),
              ExtendedProps: oExtendedProps
            }, function (oResponse) {
              if (oResponse.Result === true) {
                resolve(true);
              }
              resolve(false);
            }, _this2);
          });
          _context7.next = 3;
          return oPromiseUpdateExtendedProps;
        case 3:
          return _context7.abrupt("return", _context7.sent);
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function (_x28, _x29) {
    return _ref7.apply(this, arguments);
  };
}();
OpenPgpFileProcessor.decryptAsSingleChunk = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(oBlob, sKey, sInitializationVector) {
    var oKey, aEncryptedData, oDecryptedArrayBuffer;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return JscryptoKey.getKeyFromString(sKey);
        case 2:
          oKey = _context8.sent;
          _context8.next = 5;
          return new Response(oBlob).arrayBuffer();
        case 5:
          aEncryptedData = _context8.sent;
          _context8.next = 8;
          return crypto.subtle.decrypt({
            name: 'AES-CBC',
            iv: new Uint8Array(HexUtils.HexString2Array(sInitializationVector))
          }, oKey, aEncryptedData);
        case 8:
          oDecryptedArrayBuffer = _context8.sent;
          return _context8.abrupt("return", new Uint8Array(oDecryptedArrayBuffer));
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function (_x30, _x31, _x32) {
    return _ref8.apply(this, arguments);
  };
}();
module.exports = OpenPgpFileProcessor;

/***/ }),

/***/ "A/GJ":
/*!******************************************************!*\
  !*** ./modules/OpenPgpFilesWebclient/js/Settings.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _ = __webpack_require__(/*! underscore */ "C3HO"),
  Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L");
module.exports = {
  ServerModuleName: 'OpenPgpFilesWebclient',
  HashModuleName: 'openpgp-files',
  SelfDestructMessageHash: 'self-destruct',
  ProductName: '',
  EnableSelfDestructingMessages: true,
  EnablePublicLinkLifetime: true,
  PublicFileData: {},
  /**
   * Initializes settings from AppData object sections.
   * 
   * @param {Object} oAppData Object contained modules settings.
   */
  init: function init(oAppData) {
    var oAppDataOpenPgpFilesSection = oAppData[this.ServerModuleName],
      oAppDataCoreSection = oAppData['Core'];
    if (!_.isEmpty(oAppDataOpenPgpFilesSection)) {
      this.EnableSelfDestructingMessages = Types.pBool(oAppDataOpenPgpFilesSection.EnableSelfDestructingMessages, this.EnableSelfDestructingMessages);
      this.EnablePublicLinkLifetime = Types.pBool(oAppDataOpenPgpFilesSection.EnablePublicLinkLifetime, this.EnablePublicLinkLifetime);
      this.PublicFileData = Types.pObject(oAppDataOpenPgpFilesSection.PublicFileData, this.PublicFileData);
    }
    if (!_.isEmpty(oAppDataCoreSection)) {
      this.ProductName = Types.pString(oAppDataCoreSection.ProductName, this.ProductName);
    }
  }
};

/***/ }),

/***/ "y5Ia":
/*!*****************************************************!*\
  !*** ./modules/OpenPgpFilesWebclient/js/manager.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


__webpack_require__(/*! modules/OpenPgpFilesWebclient/js/Enums.js */ "nDo9");
function IsPgpSupported() {
  return !!(window.crypto && window.crypto.getRandomValues);
}
module.exports = function (oAppData) {
  if (!IsPgpSupported()) {
    return null;
  }
  var App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
    Settings = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/Settings.js */ "A/GJ"),
    Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
    CFileModel = __webpack_require__(/*! modules/FilesWebclient/js/models/CFileModel.js */ "CsgX"),
    oButtonsView = null;
  Settings.init(oAppData);
  function getButtonView() {
    if (!oButtonsView) {
      oButtonsView = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/views/ButtonsView.js */ "UYq5");
    }
    return oButtonsView;
  }
  if (App.isMobile() && App.isPublic()) {
    __webpack_require__(/*! ../../../../../node_modules/framework7/dist/css/framework7.material.css */ "XmPF");
  }
  if (App.isPublic()) {
    return {
      getScreens: function getScreens() {
        var oScreens = {};
        oScreens[Settings.HashModuleName] = function () {
          var CFileView = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/views/CFileView.js */ "eJd0");
          return new CFileView();
        };
        if (Settings.EnableSelfDestructingMessages) {
          oScreens[Settings.SelfDestructMessageHash] = function () {
            var CSelfDestructingEncryptedMessageView = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/views/CSelfDestructingEncryptedMessageView.js */ "iwNQ");
            return new CSelfDestructingEncryptedMessageView();
          };
        }
        return oScreens;
      }
    };
  } else if (App.isUserNormalOrTenant()) {
    return {
      start: function start(ModulesManager) {
        var SharePopup = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/popups/SharePopup.js */ "DoP0");
        ModulesManager.run('FilesWebclient', 'registerToolbarButtons', [getButtonView()]);
        if (Settings.EnableSelfDestructingMessages) {
          ModulesManager.run('MailWebclient', 'registerComposeToolbarController', [__webpack_require__(/*! modules/OpenPgpFilesWebclient/js/views/ComposeButtonsView.js */ "YGt6")]);
        }
        App.subscribeEvent('FilesWebclient::ConstructView::after', function (oParams) {
          var fParentHandler = oParams.View.onShareIconClick;
          oParams.View.onShareIconClick = function (oItem) {
            // Conditions for button activity:
            // Personal: one file or one folder
            // Corporate: one file or one folder
            // Encrypted: one file only
            // Shared: nothing
            if (oItem && (oParams.View.storageType() === Enums.FileStorageType.Personal || oParams.View.storageType() === Enums.FileStorageType.Corporate || oParams.View.storageType() === Enums.FileStorageType.Encrypted && oItem.IS_FILE)) {
              Popups.showPopup(SharePopup, [oItem]);
            } else {
              fParentHandler(oItem);
            }
          };
        });
      }
    };
  }
  return null;
};

/***/ }),

/***/ "2bZ9":
/*!**************************************************************************!*\
  !*** ./modules/OpenPgpFilesWebclient/js/popups/CreatePublicLinkPopup.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
  Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
  SharePopup = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/popups/SharePopup.js */ "DoP0"),
  OpenPgpFileProcessor = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/OpenPgpFileProcessor.js */ "1CV1"),
  Settings = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/Settings.js */ "A/GJ");

/**
 * @constructor
 */
function CCreatePublicLinkPopup() {
  CAbstractPopup.call(this);
  this.oItem = null;
  this.isFolder = ko.observable(false);
  this.oFilesView = null;
  this.encryptPublicLink = ko.observable(false);
  this.allowLifetime = Settings.EnablePublicLinkLifetime;
  this.isCreatingPublicLink = ko.observable(false);
  this.selectedLifetimeHrs = ko.observable(null);
  this.lifetime = ko.observableArray([{
    label: TextUtils.i18n('OPENPGPFILESWEBCLIENT/OPTION_LIFE_TIME_ETERNAL'),
    value: 0
  }, {
    label: "24 " + TextUtils.i18n('OPENPGPFILESWEBCLIENT/OPTION_LIFE_TIME_HOURS'),
    value: 24
  }, {
    label: "72 " + TextUtils.i18n('OPENPGPFILESWEBCLIENT/OPTION_LIFE_TIME_HOURS'),
    value: 72
  }, {
    label: "7 " + TextUtils.i18n('OPENPGPFILESWEBCLIENT/OPTION_LIFE_TIME_DAYS'),
    value: 7 * 24
  }]);
}
_.extendOwn(CCreatePublicLinkPopup.prototype, CAbstractPopup.prototype);
CCreatePublicLinkPopup.prototype.PopupTemplate = 'OpenPgpFilesWebclient_CreatePublicLinkPopup';
CCreatePublicLinkPopup.prototype.onOpen = function (oItem, oFilesView) {
  this.oItem = oItem;
  this.oFilesView = oFilesView;
  this.selectedLifetimeHrs(0);
  this.isFolder(this.oItem && !this.oItem.IS_FILE);
};
CCreatePublicLinkPopup.prototype.cancelPopup = function () {
  this.clearPopup();
  this.closePopup();
};
CCreatePublicLinkPopup.prototype.clearPopup = function () {
  this.oItem = null;
  this.oFilesView = null;
  this.encryptPublicLink(false);
};
CCreatePublicLinkPopup.prototype.createPublicLink = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var oPublicLinkResult;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        this.isCreatingPublicLink(true);
        _context.next = 3;
        return OpenPgpFileProcessor.createPublicLink(this.oItem.storageType(), this.oItem.path(), this.oItem.fileName(), this.oItem.IS_FILE ? this.oItem.size() : 0, this.encryptPublicLink(), '', '', this.selectedLifetimeHrs(), !this.oItem.IS_FILE);
      case 3:
        oPublicLinkResult = _context.sent;
        this.isCreatingPublicLink(false);
        if (oPublicLinkResult.result && oPublicLinkResult.link) {
          this.oItem.published(true);
          this.oItem.oExtendedProps.PublicLink = oPublicLinkResult.link;
          if (oPublicLinkResult.password) {
            this.oItem.oExtendedProps.PasswordForSharing = oPublicLinkResult.password;
          }
          Popups.showPopup(SharePopup, [this.oItem]);
          this.cancelPopup();
        } else {
          Screens.showError(oPublicLinkResult.errorMessage || TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_CREATE_PUBLIC_LINK'));
        }
      case 6:
      case "end":
        return _context.stop();
    }
  }, _callee, this);
}));
module.exports = new CCreatePublicLinkPopup();

/***/ }),

/***/ "I9JQ":
/*!*********************************************************************!*\
  !*** ./modules/OpenPgpFilesWebclient/js/popups/EncryptFilePopup.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
  ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  UrlUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Url.js */ "Tt1R"),
  CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
  ErrorsUtils = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/utils/Errors.js */ "w0+v"),
  OpenPgpFileProcessor = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/OpenPgpFileProcessor.js */ "1CV1"),
  Settings = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/Settings.js */ "A/GJ"),
  OpenPgpEncryptor = ModulesManager.run('OpenPgpWebclient', 'getOpenPgpEncryptor');
/**
 * @constructor
 */
function EncryptFilePopup() {
  var _this = this;
  CAbstractPopup.call(this);
  this.oFile = null;
  this.oFilesView = null;
  this.recipientAutocompleteItem = ko.observable(null);
  this.recipientAutocomplete = ko.observable('');
  this.keyBasedEncryptionDisabled = ko.observable(true);
  this.isSuccessfullyEncryptedAndUploaded = ko.observable(false);
  this.encryptionBasedMode = ko.observable(Enums.EncryptionBasedOn.Password);
  this.recipientHintText = ko.observable(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_ONLY_PASSWORD_BASED'));
  this.encryptionModeHintText = ko.observable('');
  this.isEncrypting = ko.observable(false);
  this.encryptedFileLink = ko.observable('');
  this.encryptedFilePassword = ko.observable('');
  this.sendButtonText = ko.observable('');
  this.hintUnderEncryptionInfo = ko.observable('');
  this.sign = ko.observable(false);
  this.isSigningAvailable = ko.observable(false);
  this.isPrivateKeyAvailable = ko.observable(false);
  this.passphrase = ko.observable('');
  this.composeMessageWithData = ModulesManager.run('MailWebclient', 'getComposeMessageWithData');
  this.sUserEmail = '';
  this.cancelButtonText = ko.computed(function () {
    return _this.isSuccessfullyEncryptedAndUploaded() ? TextUtils.i18n('COREWEBCLIENT/ACTION_CLOSE') : TextUtils.i18n('COREWEBCLIENT/ACTION_CANCEL');
  });
  this.recipientAutocomplete.subscribe(function (sItem) {
    if (sItem === '') {
      _this.recipientAutocompleteItem(null);
    }
  }, this);
  this.recipientAutocompleteItem.subscribe(function (oItem) {
    if (oItem) {
      _this.recipientAutocomplete(oItem.value);
      _this.encryptionBasedMode(Enums.EncryptionBasedOn.Password);
      if (oItem.hasKey) {
        //key-based encryption available if we have recipients public key
        _this.keyBasedEncryptionDisabled(false);
        _this.recipientHintText(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_KEY_RECIPIENT'));
      } else {
        _this.keyBasedEncryptionDisabled(true);
        _this.recipientHintText(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_NO_KEY_RECIPIENT'));
      }
    } else {
      _this.keyBasedEncryptionDisabled(true);
      _this.encryptionBasedMode(Enums.EncryptionBasedOn.Password);
      _this.recipientHintText(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_ONLY_PASSWORD_BASED'));
    }
  }, this);
  this.encryptionBasedMode.subscribe(function (oItem) {
    switch (oItem) {
      case Enums.EncryptionBasedOn.Password:
        _this.encryptionModeHintText(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_PASSWORD_BASED_ENCRYPTION'));
        //Signing is unavailable for file encrypted with password
        _this.isSigningAvailable(false);
        _this.sign(false);
        break;
      case Enums.EncryptionBasedOn.Key:
        _this.encryptionModeHintText(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_KEY_BASED_ENCRYPTION'));
        if (_this.isPrivateKeyAvailable()) {
          //Signing is available for file encrypted with key and with available Private Key
          _this.isSigningAvailable(true);
          _this.sign(true);
        }
        break;
      default:
        _this.encryptionModeHintText('');
        _this.isSigningAvailable(false);
        _this.sign(true);
    }
  });
  this.signEmailHintText = ko.computed(function () {
    if (this.sign()) {
      return TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_SIGN_EMAIL');
    }
    return TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_NOT_SIGN_EMAIL');
  }, this);
  this.signFileHintText = ko.computed(function () {
    if (this.sign()) {
      return TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_SIGN_FILE');
    }
    if (this.encryptionBasedMode() !== Enums.EncryptionBasedOn.Key) {
      return TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_NOT_SIGN_FILE_REQUIRES_KEYBASED_ENCRYPTION');
    }
    if (!this.isSigningAvailable()) {
      return TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_NOT_SIGN_FILE_REQUIRES_PRIVATE_KEY');
    }
    return TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_NOT_SIGN_FILE');
  }, this);
  this.addButtons = ko.observableArray([]);
  this.allowLifetime = Settings.EnablePublicLinkLifetime;
  this.selectedLifetimeHrs = ko.observable(null);
  this.lifetime = ko.observableArray([{
    label: TextUtils.i18n('OPENPGPFILESWEBCLIENT/OPTION_LIFE_TIME_ETERNAL'),
    value: 0
  }, {
    label: "24 " + TextUtils.i18n('OPENPGPFILESWEBCLIENT/OPTION_LIFE_TIME_HOURS'),
    value: 24
  }, {
    label: "72 " + TextUtils.i18n('OPENPGPFILESWEBCLIENT/OPTION_LIFE_TIME_HOURS'),
    value: 72
  }, {
    label: "7 " + TextUtils.i18n('OPENPGPFILESWEBCLIENT/OPTION_LIFE_TIME_DAYS'),
    value: 7 * 24
  }]);
}
_.extendOwn(EncryptFilePopup.prototype, CAbstractPopup.prototype);
EncryptFilePopup.prototype.PopupTemplate = 'OpenPgpFilesWebclient_EncryptFilePopup';
EncryptFilePopup.prototype.onOpen = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(oFile, oFilesView) {
    var aPrivateKeys;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          this.addButtons([]);
          this.oFile = oFile;
          this.oFilesView = oFilesView;
          _context.next = 5;
          return OpenPgpEncryptor.oPromiseInitialised;
        case 5:
          this.sUserEmail = App.currentAccountEmail ? App.currentAccountEmail() : '';
          aPrivateKeys = OpenPgpEncryptor.findKeysByEmails([this.sUserEmail], false);
          if (aPrivateKeys.length > 0) {
            this.isPrivateKeyAvailable(true);
          } else {
            this.isPrivateKeyAvailable(false);
          }
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
EncryptFilePopup.prototype.cancelPopup = function () {
  this.clearPopup();
  this.closePopup();
};
EncryptFilePopup.prototype.clearPopup = function () {
  this.oFile = null;
  this.oFilesView = null;
  this.recipientAutocompleteItem(null);
  this.recipientAutocomplete('');
  this.isSuccessfullyEncryptedAndUploaded(false);
  this.encryptedFileLink('');
  this.encryptedFilePassword('');
  this.passphrase('');
  this.sign(false);
  this.sUserEmail = '';
  this.selectedLifetimeHrs(null);
};
EncryptFilePopup.prototype.encrypt = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
  var oResult;
  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        this.isEncrypting(true);
        _context2.next = 3;
        return OpenPgpFileProcessor.processFileEncryption(this.oFile, this.oFilesView, this.recipientAutocompleteItem() ? this.recipientAutocompleteItem().email : '', this.recipientAutocompleteItem() ? this.recipientAutocompleteItem().uuid : '', this.encryptionBasedMode() === Enums.EncryptionBasedOn.Password, this.sign(), this.selectedLifetimeHrs());
      case 3:
        oResult = _context2.sent;
        this.isEncrypting(false);
        if (this.sign() && oResult.result && oResult.passphrase) {
          // saving passphrase so that it won't be asked again until encrypt popup is closed
          this.passphrase(oResult.passphrase);
        }
        this.showResults(oResult);
      case 7:
      case "end":
        return _context2.stop();
    }
  }, _callee2, this);
}));

/**
 * @param {object} oRequest
 * @param {function} fResponse
 */
EncryptFilePopup.prototype.autocompleteCallback = function (oRequest, fResponse) {
  if (!this.oFile) {
    fResponse([]);
    return;
  }
  var suggestParameters = {
      storage: 'all',
      addContactGroups: false,
      addUserGroups: false,
      exceptEmail: this.oFile.sOwnerName
    },
    autocompleteCallback = ModulesManager.run('ContactsWebclient', 'getSuggestionsAutocompleteCallback', [suggestParameters]);
  if (_.isFunction(autocompleteCallback)) {
    this.recipientAutocompleteItem(null);
    autocompleteCallback(oRequest, fResponse);
  }
};
EncryptFilePopup.prototype.showResults = function (oData) {
  var result = oData.result,
    password = oData.password,
    link = oData.link;
  if (result) {
    if (this.recipientAutocompleteItem() && this.recipientAutocompleteItem().hasKey) {
      this.sendButtonText(TextUtils.i18n('OPENPGPFILESWEBCLIENT/ACTION_SEND_ENCRYPTED_EMAIL'));
      if (this.encryptionBasedMode() === Enums.EncryptionBasedOn.Password) {
        this.hintUnderEncryptionInfo(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_STORE_PASSWORD'));
      } else {
        var sUserName = this.recipientAutocompleteItem().name ? this.recipientAutocompleteItem().name : this.recipientAutocompleteItem().email;
        if (this.sign()) {
          this.hintUnderEncryptionInfo(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_ENCRYPTED_SIGNED_EMAIL', {
            'USER': sUserName
          }));
        } else {
          this.hintUnderEncryptionInfo(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_ENCRYPTED_EMAIL', {
            'USER': sUserName
          }));
        }
      }
    } else {
      this.sendButtonText(TextUtils.i18n('OPENPGPFILESWEBCLIENT/ACTION_SEND_EMAIL'));
      this.hintUnderEncryptionInfo(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_EMAIL'));
    }
    this.isSuccessfullyEncryptedAndUploaded(true);
    this.encryptedFileLink(UrlUtils.getAppPath() + link);
    this.encryptedFilePassword(password);
    var oParams = {
      AddButtons: [],
      EncryptionBasedMode: this.encryptionBasedMode(),
      EncryptedFileLink: this.encryptedFileLink()
    };
    App.broadcastEvent('OpenPgpFilesWebclient::ShareEncryptedFile::after', oParams);
    this.addButtons(oParams.AddButtons);
  }
  this.isEncrypting(false);
};
EncryptFilePopup.prototype.sendEmail = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
  var sSubject, sBody, contactEmail, contactUUID, encryptResult, sEncryptedBody, _sBody;
  return _regeneratorRuntime().wrap(function _callee3$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        sSubject = TextUtils.i18n('OPENPGPFILESWEBCLIENT/MESSAGE_SUBJECT', {
          'FILENAME': this.oFile.fileName()
        });
        if (!this.recipientAutocompleteItem().hasKey) {
          _context3.next = 12;
          break;
        }
        //message is encrypted
        sBody = '';
        if (this.encryptionBasedMode() === Enums.EncryptionBasedOn.Password) {
          sBody = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ENCRYPTED_WITH_PASSWORD_MESSAGE_BODY', {
            'URL': this.encryptedFileLink(),
            'PASSWORD': this.encryptedFilePassword(),
            'BR': '\r\n'
          });
        } else {
          sBody = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ENCRYPTED_WITH_KEY_MESSAGE_BODY', {
            'URL': this.encryptedFileLink(),
            'USER': this.recipientAutocompleteItem().email,
            'BR': '\r\n',
            'SYSNAME': Settings.ProductName
          });
        }
        contactEmail = this.recipientAutocompleteItem().email;
        contactUUID = this.recipientAutocompleteItem().uuid;
        _context3.next = 8;
        return OpenPgpEncryptor.encryptMessage(sBody, contactEmail, this.sign(), this.passphrase(), this.sUserEmail, contactUUID);
      case 8:
        encryptResult = _context3.sent;
        if (encryptResult && encryptResult.result) {
          sEncryptedBody = encryptResult.result;
          this.composeMessageWithData({
            to: this.recipientAutocompleteItem().value,
            subject: sSubject,
            body: sEncryptedBody,
            isHtml: false
          });
          this.clearPopup();
          this.closePopup();
        } else {
          ErrorsUtils.showPgpErrorByCode(encryptResult, Enums.PgpAction.Encrypt);
        }
        _context3.next = 16;
        break;
      case 12:
        //message is not encrypted
        _sBody = TextUtils.i18n('OPENPGPFILESWEBCLIENT/MESSAGE_BODY', {
          'URL': this.encryptedFileLink()
        });
        this.composeMessageWithData({
          to: this.recipientAutocompleteItem().value,
          subject: sSubject,
          body: _sBody,
          isHtml: true
        });
        this.clearPopup();
        this.closePopup();
      case 16:
      case "end":
        return _context3.stop();
    }
  }, _callee3, this);
}));
module.exports = new EncryptFilePopup();

/***/ }),

/***/ "3mMn":
/*!*****************************************************************************************!*\
  !*** ./modules/OpenPgpFilesWebclient/js/popups/SelfDestructingEncryptedMessagePopup.js ***!
  \*****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  moment = __webpack_require__(/*! moment */ "sdEb"),
  App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
  ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  UrlUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Url.js */ "Tt1R"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
  CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
  ErrorsUtils = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/utils/Errors.js */ "w0+v"),
  Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
  Settings = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/Settings.js */ "A/GJ"),
  UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV"),
  OpenPgpEncryptor = ModulesManager.run('OpenPgpWebclient', 'getOpenPgpEncryptor');
/**
 * @constructor
 */
function SelfDestructingEncryptedMessagePopup() {
  var _this = this;
  CAbstractPopup.call(this);
  this.sSubject = null;
  this.sPlainText = null;
  this.sRecipientEmail = null;
  this.sFromEmail = null;
  this.sSelectedSenderId = null;
  this.recipientAutocompleteItem = ko.observable(null);
  this.recipientAutocomplete = ko.observable('');
  this.keyBasedEncryptionDisabled = ko.observable(true);
  this.passwordBasedEncryptionDisabled = ko.observable(true);
  this.encryptionAvailable = ko.observable(false);
  this.isSuccessfullyEncryptedAndUploaded = ko.observable(false);
  this.encryptionBasedMode = ko.observable('');
  this.recipientHintText = ko.observable(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_SELECT_RECIPIENT'));
  this.encryptionModeHintText = ko.observable('');
  this.isEncrypting = ko.observable(false);
  this.encryptedFileLink = ko.observable('');
  this.encryptedFilePassword = ko.observable('');
  this.sendButtonText = ko.observable('');
  this.hintUnderEncryptionInfo = ko.observable('');
  this.sign = ko.observable(false);
  this.isSigningAvailable = ko.observable(false);
  this.isPrivateKeyAvailable = ko.observable(false);
  this.passphrase = ko.observable('');
  this.password = ko.observable('');
  this.selectedLifetimeHrs = ko.observable(null);
  this.lifetime = ko.observableArray([{
    label: "24 " + TextUtils.i18n('OPENPGPFILESWEBCLIENT/OPTION_LIFE_TIME_HOURS'),
    value: 24
  }, {
    label: "72 " + TextUtils.i18n('OPENPGPFILESWEBCLIENT/OPTION_LIFE_TIME_HOURS'),
    value: 72
  }, {
    label: "7 " + TextUtils.i18n('OPENPGPFILESWEBCLIENT/OPTION_LIFE_TIME_DAYS'),
    value: 7 * 24
  }]);
  this.composeMessageWithData = ModulesManager.run('MailWebclient', 'getComposeMessageWithData');
  this.cancelButtonText = ko.computed(function () {
    return _this.isSuccessfullyEncryptedAndUploaded() ? TextUtils.i18n('COREWEBCLIENT/ACTION_CLOSE') : TextUtils.i18n('COREWEBCLIENT/ACTION_CANCEL');
  });
  this.recipientAutocomplete.subscribe(function (sItem) {
    if (sItem === '') {
      _this.recipientAutocompleteItem(null);
    }
  }, this);
  this.recipientAutocompleteItem.subscribe(function (oItem) {
    if (oItem) {
      //password-based encryption is available after selecting the recipient
      _this.passwordBasedEncryptionDisabled(false);
      _this.encryptionBasedMode(Enums.EncryptionBasedOn.Password);
      _this.encryptionAvailable(true);
      if (oItem.hasKey) {
        //key-based encryption available if we have recipients public key
        _this.keyBasedEncryptionDisabled(false);
        _this.recipientHintText(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_SELF_DESTRUCT_LINK_KEY_RECIPIENT'));
      } else {
        _this.keyBasedEncryptionDisabled(true);
        _this.recipientHintText(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_NO_KEY_RECIPIENT'));
      }
    } else {
      _this.keyBasedEncryptionDisabled(true);
      _this.passwordBasedEncryptionDisabled(true);
      _this.encryptionAvailable(false);
      _this.encryptionBasedMode('');
      _this.recipientHintText(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_SELECT_RECIPIENT'));
    }
  }, this);
  this.encryptionBasedMode.subscribe(function (oItem) {
    switch (oItem) {
      case Enums.EncryptionBasedOn.Password:
        _this.encryptionModeHintText(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_PASSWORD_BASED_ENCRYPTION'));
        //Signing is unavailable for file encrypted with password
        _this.isSigningAvailable(false);
        _this.sign(false);
        break;
      case Enums.EncryptionBasedOn.Key:
        _this.encryptionModeHintText(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_KEY_BASED_ENCRYPTION'));
        if (_this.isPrivateKeyAvailable()) {
          //Signing is available for file encrypted with key and with available Private Key
          _this.isSigningAvailable(true);
          _this.sign(true);
        }
        break;
      default:
        _this.encryptionModeHintText('');
        _this.isSigningAvailable(false);
        _this.sign(true);
    }
  });
  this.signEmailHintText = ko.computed(function () {
    if (this.sign()) {
      return TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_SIGN_EMAIL');
    }
    return TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_NOT_SIGN_EMAIL');
  }, this);
  this.signFileHintText = ko.computed(function () {
    if (this.sign()) {
      return TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_SIGN_FILE');
    }
    if (this.encryptionBasedMode() !== Enums.EncryptionBasedOn.Key) {
      return TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_NOT_SIGN_FILE_REQUIRES_KEYBASED_ENCRYPTION');
    }
    if (!this.isSigningAvailable()) {
      return TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_NOT_SIGN_FILE_REQUIRES_PRIVATE_KEY');
    }
    return TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_NOT_SIGN_FILE');
  }, this);
  this.isEncrypting.subscribe(function (bEncrypting) {
    //UI elements become disabled when encryption started
    if (bEncrypting) {
      _this.keyBasedEncryptionDisabled(true);
      _this.passwordBasedEncryptionDisabled(true);
    } else {
      _this.keyBasedEncryptionDisabled(false);
      _this.passwordBasedEncryptionDisabled(false);
    }
  });
}
_.extendOwn(SelfDestructingEncryptedMessagePopup.prototype, CAbstractPopup.prototype);
SelfDestructingEncryptedMessagePopup.prototype.PopupTemplate = 'OpenPgpFilesWebclient_SelfDestructingEncryptedMessagePopup';
SelfDestructingEncryptedMessagePopup.prototype.onOpen = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(sSubject, sPlainText, recipientInfo, sFromEmail, sSelectedSenderId) {
    var aPrivateKeys;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          this.sSubject = sSubject;
          this.sPlainText = sPlainText;
          this.sRecipientEmail = '';
          this.sFromEmail = sFromEmail;
          this.sSelectedSenderId = sSelectedSenderId;
          if (recipientInfo) {
            this.sRecipientEmail = recipientInfo.email;
            this.recipientAutocompleteItem(recipientInfo);
            this.recipientAutocomplete(recipientInfo.value);
          }
          _context.next = 8;
          return OpenPgpEncryptor.oPromiseInitialised;
        case 8:
          aPrivateKeys = OpenPgpEncryptor.findKeysByEmails([this.sFromEmail], false);
          if (aPrivateKeys.length > 0) {
            this.isPrivateKeyAvailable(true);
          } else {
            this.isPrivateKeyAvailable(false);
          }
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return function (_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
SelfDestructingEncryptedMessagePopup.prototype.cancelPopup = function () {
  this.clearPopup();
  this.closePopup();
};
SelfDestructingEncryptedMessagePopup.prototype.clearPopup = function () {
  this.sPlainText = null;
  this.sRecipientEmail = null;
  this.sFromEmail = null;
  this.recipientAutocompleteItem(null);
  this.recipientAutocomplete('');
  this.isSuccessfullyEncryptedAndUploaded(false);
  this.encryptedFileLink('');
  this.encryptedFilePassword('');
  this.passphrase('');
  this.sign(false);
  this.password('');
};
SelfDestructingEncryptedMessagePopup.prototype.encrypt = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
  var aEmailForEncrypt, contactsUUIDs, aPublicKeys, aPrivateKeys, isPasswordBasedEncryption, OpenPgpResult, _OpenPgpResult$result, data, password, oCreateLinkResult, sFullLink, sSubject, sBody, sBrowserTimezone, sServerTimezone, sCurrentTime, sMessage, oOptions, contactEmail, contactUUID, encryptResult, sEncryptedBody;
  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        this.isEncrypting(true);
        aEmailForEncrypt = OpenPgpEncryptor.findKeysByEmails([this.sFromEmail], true).length > 0 ? [this.recipientAutocompleteItem().email, this.sFromEmail] : [this.recipientAutocompleteItem().email];
        contactsUUIDs = [this.recipientAutocompleteItem().uuid];
        _context2.next = 5;
        return OpenPgpEncryptor.getPublicKeysByContactsAndEmails(contactsUUIDs, aEmailForEncrypt);
      case 5:
        aPublicKeys = _context2.sent;
        aPrivateKeys = OpenPgpEncryptor.findKeysByEmails([this.sFromEmail], false);
        isPasswordBasedEncryption = this.encryptionBasedMode() === Enums.EncryptionBasedOn.Password;
        _context2.next = 10;
        return OpenPgpEncryptor.encryptData(this.sPlainText, aPublicKeys, aPrivateKeys, isPasswordBasedEncryption, this.sign());
      case 10:
        OpenPgpResult = _context2.sent;
        if (OpenPgpResult.passphrase) {
          // saving passphrase so that it won't be asked again until "self-destructing secure email" popup is closed
          this.passphrase(OpenPgpResult.passphrase);
        }
        if (!(OpenPgpResult && OpenPgpResult.result && !OpenPgpResult.hasErrors())) {
          _context2.next = 43;
          break;
        }
        _OpenPgpResult$result = OpenPgpResult.result, data = _OpenPgpResult$result.data, password = _OpenPgpResult$result.password; //create link
        _context2.next = 16;
        return this.createSelfDestrucPublicLink(this.sSubject, data, this.recipientAutocompleteItem().email, this.encryptionBasedMode(), this.selectedLifetimeHrs());
      case 16:
        oCreateLinkResult = _context2.sent;
        if (!(oCreateLinkResult.result && oCreateLinkResult.link)) {
          _context2.next = 40;
          break;
        }
        sFullLink = UrlUtils.getAppPath() + oCreateLinkResult.link + '#' + Settings.SelfDestructMessageHash; //compose message
        sSubject = TextUtils.i18n('OPENPGPFILESWEBCLIENT/SELF_DESTRUCT_LINK_MESSAGE_SUBJECT');
        sBody = "";
        sBrowserTimezone = moment.tz.guess();
        sServerTimezone = UserSettings.timezone();
        sCurrentTime = moment.tz(new Date(), sBrowserTimezone || sServerTimezone).format('MMM D, YYYY HH:mm [GMT] ZZ');
        if (!this.recipientAutocompleteItem().hasKey) {
          _context2.next = 37;
          break;
        }
        //encrypt message with key
        sMessage = password ? 'OPENPGPFILESWEBCLIENT/SELF_DESTRUCT_LINK_MESSAGE_BODY_WITH_PASSWORD' : 'OPENPGPFILESWEBCLIENT/SELF_DESTRUCT_LINK_MESSAGE_BODY';
        oOptions = {
          'URL': sFullLink,
          'BR': '\r\n',
          'EMAIL': App.currentAccountEmail ? App.currentAccountEmail() : '',
          'HOURS': this.selectedLifetimeHrs(),
          'CREATING_TIME_GMT': sCurrentTime
        };
        if (password) {
          oOptions.PASSWORD = password;
        }
        sBody = TextUtils.i18n(sMessage, oOptions);
        contactEmail = this.recipientAutocompleteItem().email;
        contactUUID = this.recipientAutocompleteItem().uuid;
        _context2.next = 33;
        return OpenPgpEncryptor.encryptMessage(sBody, contactEmail, this.sign(), this.passphrase(), this.sFromEmail, contactUUID);
      case 33:
        encryptResult = _context2.sent;
        if (encryptResult && encryptResult.result && !encryptResult.hasErrors()) {
          sEncryptedBody = encryptResult.result;
          this.composeMessageWithData({
            to: this.recipientAutocompleteItem().value,
            subject: sSubject,
            body: sEncryptedBody,
            isHtml: false,
            selectedSenderId: this.sSelectedSenderId
          });
          this.cancelPopup();
        } else {
          ErrorsUtils.showPgpErrorByCode(encryptResult, Enums.PgpAction.Encrypt);
        }
        _context2.next = 38;
        break;
      case 37:
        //send not encrypted message
        //if the recipient does not have a key, the message can only be encrypted with a password
        if (password) {
          sBody = TextUtils.i18n('OPENPGPFILESWEBCLIENT/SELF_DESTRUCT_LINK_MESSAGE_BODY_NOT_ENCRYPTED', {
            'URL': sFullLink,
            'EMAIL': App.currentAccountEmail ? App.currentAccountEmail() : '',
            'BR': '<br>',
            'HOURS': this.selectedLifetimeHrs(),
            'CREATING_TIME_GMT': sCurrentTime
          });
          this.password(password);
          this.composeMessageWithData({
            to: this.recipientAutocompleteItem().value,
            subject: sSubject,
            body: sBody,
            isHtml: true,
            selectedSenderId: this.sSelectedSenderId
          });
        } else {
          Screens.showError(TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_CREATE_PUBLIC_LINK'));
        }
      case 38:
        _context2.next = 41;
        break;
      case 40:
        Screens.showError(TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_CREATE_PUBLIC_LINK'));
      case 41:
        _context2.next = 44;
        break;
      case 43:
        if (!OpenPgpResult || !OpenPgpResult.userCanceled) {
          ErrorsUtils.showPgpErrorByCode(OpenPgpResult, Enums.PgpAction.Encrypt);
        }
      case 44:
        this.isEncrypting(false);
      case 45:
      case "end":
        return _context2.stop();
    }
  }, _callee2, this);
}));

/**
 * @param {object} oRequest
 * @param {function} fResponse
 */
SelfDestructingEncryptedMessagePopup.prototype.autocompleteCallback = function (oRequest, fResponse) {
  var suggestParameters = {
      storage: 'all',
      addContactGroups: false,
      addUserGroups: false,
      exceptEmail: App.getUserPublicId()
    },
    autocompleteCallback = ModulesManager.run('ContactsWebclient', 'getSuggestionsAutocompleteCallback', [suggestParameters]);
  if (_.isFunction(autocompleteCallback)) {
    this.recipientAutocompleteItem(null);
    autocompleteCallback(oRequest, fResponse);
  }
};
SelfDestructingEncryptedMessagePopup.prototype.createSelfDestrucPublicLink = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(sSubject, sData, sRecipientEmail, sEncryptionBasedMode, iLifetimeHrs) {
    var _this2 = this;
    var sLink, oResult, oPromiseCreateSelfDestrucPublicLink;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          sLink = '';
          oResult = {
            result: false
          };
          oPromiseCreateSelfDestrucPublicLink = new Promise(function (resolve, reject) {
            var fResponseCallback = function fResponseCallback(oResponse, oRequest) {
              if (oResponse.Result && oResponse.Result.link) {
                resolve(oResponse.Result.link);
              }
              reject(new Error(TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_PUBLIC_LINK_CREATION')));
            };
            var oParams = {
              'Subject': sSubject,
              'Data': sData,
              'RecipientEmail': sRecipientEmail,
              'PgpEncryptionMode': sEncryptionBasedMode,
              'LifetimeHrs': iLifetimeHrs
            };
            Ajax.send('OpenPgpFilesWebclient', 'CreateSelfDestrucPublicLink', oParams, fResponseCallback, _this2);
          });
          _context3.prev = 3;
          _context3.next = 6;
          return oPromiseCreateSelfDestrucPublicLink;
        case 6:
          sLink = _context3.sent;
          oResult.result = true;
          oResult.link = sLink;
          _context3.next = 14;
          break;
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](3);
          if (_context3.t0 && _context3.t0.message) {
            Screens.showError(_context3.t0.message);
          }
        case 14:
          return _context3.abrupt("return", oResult);
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 11]]);
  }));
  return function (_x6, _x7, _x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();
module.exports = new SelfDestructingEncryptedMessagePopup();

/***/ }),

/***/ "DoP0":
/*!***************************************************************!*\
  !*** ./modules/OpenPgpFilesWebclient/js/popups/SharePopup.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  UrlUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Url.js */ "Tt1R"),
  Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
  App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
  CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
  ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
  Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
  ErrorsUtils = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/utils/Errors.js */ "w0+v"),
  ShowHistoryPopup = ModulesManager.run('ActivityHistory', 'getShowHistoryPopup'),
  OpenPgpEncryptor = ModulesManager.run('OpenPgpWebclient', 'getOpenPgpEncryptor');

/**
 * @constructor
 */
function CSharePopup() {
  var _this = this;
  CAbstractPopup.call(this);
  this.item = null;
  this.publicLink = ko.observable('');
  this.password = ko.observable('');
  this.publicLinkFocus = ko.observable(false);
  this.isRemovingPublicLink = ko.observable(false);
  this.recipientAutocomplete = ko.observable('');
  this.recipientAutocompleteItem = ko.observable(null);
  this.isEmailEncryptionAvailable = ko.observable(false);
  this.sendLinkHintText = ko.observable('');
  this.linkLabel = ko.computed(function () {
    if (this.password()) {
      return TextUtils.i18n('OPENPGPFILESWEBCLIENT/LABEL_PROTECTED_PUBLIC_LINK');
    }
    return TextUtils.i18n('OPENPGPFILESWEBCLIENT/LABEL_PUBLIC_LINK');
  }, this);
  this.signEmailHintText = ko.observable(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_NOT_SIGN_EMAIL'));
  this.sign = ko.observable(false);
  this.isPrivateKeyAvailable = ko.observable(false);
  this.isSigningAvailable = ko.observable(false);
  this.sUserEmail = '';
  this.recipientAutocompleteItem.subscribe(function (oItem) {
    if (oItem) {
      var sHint = TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_SEND_LINK');
      if (oItem.hasKey) {
        if (_this.password()) {
          sHint = TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_SEND_LINK_AND_PASSWORD');
          _this.isEmailEncryptionAvailable(true);
        } else {
          _this.isEmailEncryptionAvailable(false);
        }
        if (_this.isPrivateKeyAvailable() && _this.isEmailEncryptionAvailable()) {
          sHint = TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_SEND_LINK_AND_PASSWORD_SIGNED');
          _this.isSigningAvailable(true);
          _this.sign(true);
        }
      } else {
        _this.isEmailEncryptionAvailable(false);
        if (_this.password()) {
          sHint = TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_SEND_DIFFERENT_CHANNEL');
        }
        _this.isSigningAvailable(false);
        _this.sign(false);
      }
      _this.sendLinkHintText(sHint);
    } else {
      _this.isSigningAvailable(false);
      _this.sign(false);
    }
  });
  this.sign.subscribe(function (bSign) {
    if (bSign) {
      _this.signEmailHintText(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_SIGN_EMAIL'));
      _this.sendLinkHintText(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_SEND_LINK_AND_PASSWORD_SIGNED'));
    } else {
      _this.signEmailHintText(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_NOT_SIGN_EMAIL'));
      _this.sendLinkHintText(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_SEND_LINK_AND_PASSWORD'));
    }
  });
  this.composeMessageWithData = ModulesManager.run('MailWebclient', 'getComposeMessageWithData');
  this.bAllowSendMessage = !!this.composeMessageWithData;
  this.bAllowShowHistory = !!ShowHistoryPopup;
  this.addButtons = ko.observableArray([]);
}
_.extendOwn(CSharePopup.prototype, CAbstractPopup.prototype);
CSharePopup.prototype.PopupTemplate = 'OpenPgpFilesWebclient_SharePopup';

/**
 * @param {Object} oItem
 */
CSharePopup.prototype.onOpen = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(oItem) {
    var aPrivateKeys, oParams;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          this.item = oItem;
          this.publicLink('');
          this.password('');
          if (!(this.item.published() && this.item.oExtendedProps && this.item.oExtendedProps.PublicLink)) {
            _context.next = 17;
            break;
          }
          this.publicLink(UrlUtils.getAppPath() + this.item.oExtendedProps.PublicLink);
          this.publicLinkFocus(true);
          this.password(this.item.oExtendedProps.PasswordForSharing ? this.item.oExtendedProps.PasswordForSharing : '');
          _context.next = 9;
          return OpenPgpEncryptor.oPromiseInitialised;
        case 9:
          this.sUserEmail = App.currentAccountEmail ? App.currentAccountEmail() : '';
          aPrivateKeys = OpenPgpEncryptor.findKeysByEmails([this.sUserEmail], false);
          if (aPrivateKeys.length > 0) {
            this.isPrivateKeyAvailable(true);
          } else {
            this.isPrivateKeyAvailable(false);
          }
          oParams = {
            AddButtons: [],
            Item: oItem
          };
          App.broadcastEvent('OpenPgpFilesWebclient::OpenSharePopup::after', oParams);
          this.addButtons(oParams.AddButtons);
          _context.next = 18;
          break;
        case 17:
          Screens.showError(TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_GET_PUBLIC_LINK'));
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
CSharePopup.prototype.cancelPopup = function () {
  this.clearPopup();
  this.closePopup();
};
CSharePopup.prototype.clearPopup = function () {
  this.recipientAutocompleteItem(null);
  this.recipientAutocomplete('');
  this.sign(false);
  this.isEmailEncryptionAvailable(false);
  this.sUserEmail = '';
};
CSharePopup.prototype.onCancelSharingClick = function () {
  if (this.item) {
    this.isRemovingPublicLink(true);
    Ajax.send('Files', 'DeletePublicLink', {
      'Type': this.item.storageType(),
      'Path': this.item.path(),
      'Name': this.item.fileName()
    }, this.onCancelSharingResponse, this);
  }
};
CSharePopup.prototype.onCancelSharingResponse = function (oResponse, oRequest) {
  this.isRemovingPublicLink(false);
  if (oResponse.Result) {
    this.item.published(false);
    this.item.oExtendedProps.PublicLink = null;
    if (this.item.oExtendedProps.PasswordForSharing) {
      this.item.oExtendedProps.PasswordForSharing = null;
    }
    this.cancelPopup();
  } else {
    Screens.showError(TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_DELETE_PUBLIC_LINK'));
  }
};

/**
 * @param {object} oRequest
 * @param {function} fResponse
 */
CSharePopup.prototype.autocompleteCallback = function (oRequest, fResponse) {
  if (!this.item) {
    fResponse([]);
    return;
  }
  var suggestParameters = {
      storage: 'all',
      addContactGroups: false,
      addUserGroups: false,
      exceptEmail: this.item.sOwnerName
    },
    autocompleteCallback = ModulesManager.run('ContactsWebclient', 'getSuggestionsAutocompleteCallback', [suggestParameters]);
  if (_.isFunction(autocompleteCallback)) {
    this.recipientAutocompleteItem(null);
    autocompleteCallback(oRequest, fResponse);
  }
};
CSharePopup.prototype.sendEmail = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
  var sSubject, sBody, contactEmail, contactUUID, encryptResult, sEncryptedBody, _sBody;
  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        sSubject = TextUtils.i18n('OPENPGPFILESWEBCLIENT/PUBLIC_LINK_MESSAGE_SUBJECT', {
          'FILENAME': this.item.fileName()
        });
        if (!(this.recipientAutocompleteItem().hasKey && this.isEmailEncryptionAvailable())) {
          _context2.next = 12;
          break;
        }
        //message is encrypted
        sBody = '';
        if (this.password()) {
          sBody = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ENCRYPTED_LINK_MESSAGE_BODY_WITH_PASSWORD', {
            'URL': this.publicLink(),
            'BR': '\r\n',
            'PASSWORD': this.password()
          });
        } else {
          sBody = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ENCRYPTED_LINK_MESSAGE_BODY', {
            'URL': this.publicLink(),
            'BR': '\r\n'
          });
        }
        contactEmail = this.recipientAutocompleteItem().email;
        contactUUID = this.recipientAutocompleteItem().uuid;
        _context2.next = 8;
        return OpenPgpEncryptor.encryptMessage(sBody, contactEmail, this.sign(), '', this.sUserEmail, contactUUID);
      case 8:
        encryptResult = _context2.sent;
        if (encryptResult && encryptResult.result) {
          sEncryptedBody = encryptResult.result;
          this.composeMessageWithData({
            to: this.recipientAutocompleteItem().value,
            subject: sSubject,
            body: sEncryptedBody,
            isHtml: false
          });
          this.cancelPopup();
        } else if (!encryptResult || !encryptResult.userCanceled) {
          ErrorsUtils.showPgpErrorByCode(encryptResult, Enums.PgpAction.Encrypt);
        }
        _context2.next = 15;
        break;
      case 12:
        //message is not encrypted
        _sBody = TextUtils.i18n('OPENPGPFILESWEBCLIENT/LINK_MESSAGE_BODY', {
          'URL': this.publicLink()
        });
        this.composeMessageWithData({
          to: this.recipientAutocompleteItem().value,
          subject: sSubject,
          body: _sBody,
          isHtml: true
        });
        this.cancelPopup();
      case 15:
      case "end":
        return _context2.stop();
    }
  }, _callee2, this);
}));
CSharePopup.prototype.showHistory = function () {
  if (this.bAllowShowHistory) {
    Popups.showPopup(ShowHistoryPopup, [TextUtils.i18n('OPENPGPFILESWEBCLIENT/HEADING_HISTORY_POPUP'), this.item]);
  }
};
module.exports = new CSharePopup();

/***/ }),

/***/ "w0+v":
/*!**********************************************************!*\
  !*** ./modules/OpenPgpFilesWebclient/js/utils/Errors.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _ = __webpack_require__(/*! underscore */ "C3HO"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
  ErrorsUtils = {};

/**
 * @param {Object} oRes
 * @param {string} sPgpAction
 * @param {string=} sDefaultError
 */
ErrorsUtils.showPgpErrorByCode = function (oRes, sPgpAction, sDefaultError) {
  var aErrors = _.isArray(oRes.errors) ? oRes.errors : [],
    aNotices = _.isArray(oRes.notices) ? oRes.notices : [],
    aEmailsWithoutPublicKey = [],
    aEmailsWithoutPrivateKey = [],
    sError = '',
    bNoSignDataNotice = false,
    bNotice = true;
  _.each(_.union(aErrors, aNotices), function (aError) {
    if (aError.length === 2) {
      switch (aError[0]) {
        case Enums.OpenPgpErrors.GenerateKeyError:
          sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_GENERATE_KEY');
          break;
        case Enums.OpenPgpErrors.ImportKeyError:
          sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_IMPORT_KEY');
          break;
        case Enums.OpenPgpErrors.ImportNoKeysFoundError:
          sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_IMPORT_NO_KEY_FOUND');
          break;
        case Enums.OpenPgpErrors.PrivateKeyNotFoundError:
        case Enums.OpenPgpErrors.PrivateKeyNotFoundNotice:
          aEmailsWithoutPrivateKey.push(aError[1]);
          break;
        case Enums.OpenPgpErrors.PublicKeyNotFoundError:
          bNotice = false;
          aEmailsWithoutPublicKey.push(aError[1]);
          break;
        case Enums.OpenPgpErrors.PublicKeyNotFoundNotice:
          aEmailsWithoutPublicKey.push(aError[1]);
          break;
        case Enums.OpenPgpErrors.KeyIsNotDecodedError:
          if (sPgpAction === Enums.PgpAction.DecryptVerify) {
            sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_DECRYPT') + ' ' + TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_KEY_NOT_DECODED', {
              'USER': aError[1]
            });
          } else if (sPgpAction === Enums.PgpAction.Sign || sPgpAction === Enums.PgpAction.EncryptSign) {
            sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_SIGN') + ' ' + TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_KEY_NOT_DECODED', {
              'USER': aError[1]
            });
          } else {
            sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_KEY_NOT_DECODED', {
              'USER': aError[1]
            });
          }
          break;
        case Enums.OpenPgpErrors.SignError:
          sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_SIGN');
          break;
        case Enums.OpenPgpErrors.VerifyError:
          sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_VERIFY');
          break;
        case Enums.OpenPgpErrors.EncryptError:
          sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_ENCRYPT');
          break;
        case Enums.OpenPgpErrors.DecryptError:
          sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_DECRYPT');
          break;
        case Enums.OpenPgpErrors.PasswordDecryptError:
          sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_PASSWORD_DECRYPT');
          break;
        case Enums.OpenPgpErrors.SignAndEncryptError:
          sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_ENCRYPT_OR_SIGN');
          break;
        case Enums.OpenPgpErrors.VerifyAndDecryptError:
          sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_DECRYPT_OR_VERIFY');
          break;
        case Enums.OpenPgpErrors.DeleteError:
          sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_DELETE_KEY');
          break;
        case Enums.OpenPgpErrors.VerifyErrorNotice:
          sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_VERIFY');
          break;
        case Enums.OpenPgpErrors.NoSignDataNotice:
          bNoSignDataNotice = true;
          break;
        case Enums.OpenPgpErrors.CanNotReadMessage:
          sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_CAN_NOT_READ_MESSAGE');
          break;
        default:
          sError = TextUtils.i18n('COREWEBCLIENT/ERROR_UNKNOWN');
      }
    }
  });
  if (aEmailsWithoutPublicKey.length > 0) {
    aEmailsWithoutPublicKey = _.without(aEmailsWithoutPublicKey, '');
    if (aEmailsWithoutPublicKey.length > 0) {
      sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_NO_PUBLIC_KEYS_FOR_USERS_PLURAL', {
        'USERS': aEmailsWithoutPublicKey.join(', ')
      }, null, aEmailsWithoutPublicKey.length);
    } else if (sPgpAction === Enums.PgpAction.Verify) {
      sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_NO_PUBLIC_KEY_FOUND_FOR_VERIFY');
    }
    if (bNotice && sError !== '') {
      sError += ' ' + TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_MESSAGE_WAS_NOT_VERIFIED');
    }
  } else if (aEmailsWithoutPrivateKey.length > 0) {
    aEmailsWithoutPrivateKey = _.without(aEmailsWithoutPrivateKey, '');
    if (aEmailsWithoutPrivateKey.length > 0) {
      sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_NO_PRIVATE_KEYS_FOR_USERS_PLURAL', {
        'USERS': aEmailsWithoutPrivateKey.join(', ')
      }, null, aEmailsWithoutPrivateKey.length);
    } else if (sPgpAction === Enums.PgpAction.DecryptVerify) {
      sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_NO_PRIVATE_KEY_FOUND_FOR_DECRYPT');
    }
  }
  if (sError === '' && !bNoSignDataNotice) {
    switch (sPgpAction) {
      case Enums.PgpAction.Generate:
        sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_GENERATE_KEY');
        break;
      case Enums.PgpAction.Import:
        sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_IMPORT_KEY');
        break;
      case Enums.PgpAction.DecryptVerify:
        sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_DECRYPT');
        break;
      case Enums.PgpAction.Verify:
        sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_VERIFY');
        break;
      case Enums.PgpAction.Encrypt:
        sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_ENCRYPT');
        break;
      case Enums.PgpAction.EncryptSign:
        sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_ENCRYPT_OR_SIGN');
        break;
      case Enums.PgpAction.Sign:
        sError = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_SIGN');
        break;
    }
  }
  if (sError === '' && sDefaultError) {
    sError = sDefaultError;
  }
  if (sError === '') {
    sError = TextUtils.i18n('COREWEBCLIENT/ERROR_UNKNOWN');
  }
  if (sError !== '') {
    Screens.showError(sError);
  }
  return bNoSignDataNotice;
};
module.exports = ErrorsUtils;

/***/ }),

/***/ "UYq5":
/*!***************************************************************!*\
  !*** ./modules/OpenPgpFilesWebclient/js/views/ButtonsView.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var ko = __webpack_require__(/*! knockout */ "p09A"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
  Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
  AlertPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/AlertPopup.js */ "hT1I"),
  EncryptFilePopup = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/popups/EncryptFilePopup.js */ "I9JQ"),
  SharePopup = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/popups/SharePopup.js */ "DoP0"),
  CreatePublicLinkPopup = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/popups/CreatePublicLinkPopup.js */ "2bZ9");

/**
 * @constructor
 */
function CButtonsView() {}
CButtonsView.prototype.ViewTemplate = 'OpenPgpFilesWebclient_ButtonsView';
CButtonsView.prototype.useFilesViewData = function (oFilesView) {
  this.isCreateSecureLinkAllowed = ko.computed(function () {
    var items = this.selector.listCheckedAndSelected(),
      selectedItem = items.length === 1 ? items[0] : null;
    return !this.isZipFolder() && (!this.sharedParentFolder() || this.sharedParentFolder().sharedWithMeAccessReshare()) && this.allSelectedFilesReady() && selectedItem && !selectedItem.bIsLink && (!selectedItem.sharedWithMe() || selectedItem.sharedWithMeAccessReshare());
  }, oFilesView);
  this.createSecureLinkCommand = Utils.createCommand(oFilesView, this.createSecureLink, this.isCreateSecureLinkAllowed);
};
CButtonsView.prototype.createSecureLink = function () {
  // !!! this = oFilesView
  var oSelectedItem = this.selector.itemSelected(),
    oExtendedProps = oSelectedItem && oSelectedItem.oExtendedProps || {};
  if (oSelectedItem.published()) {
    Popups.showPopup(SharePopup, [oSelectedItem]);
  } else if (oSelectedItem.IS_FILE && oSelectedItem.bIsSecure() && !oExtendedProps.ParanoidKey) {
    Popups.showPopup(AlertPopup, [TextUtils.i18n('OPENPGPFILESWEBCLIENT/INFO_SHARING_NOT_SUPPORTED'), null, TextUtils.i18n('OPENPGPFILESWEBCLIENT/HEADING_SEND_ENCRYPTED_FILE')]);
  } else if (oExtendedProps.InitializationVector) {
    Popups.showPopup(EncryptFilePopup, [oSelectedItem, this // oFilesView
    ]);
  } else {
    Popups.showPopup(CreatePublicLinkPopup, [oSelectedItem, this // oFilesView
    ]);
  }
};
module.exports = new CButtonsView();

/***/ }),

/***/ "eJd0":
/*!*************************************************************!*\
  !*** ./modules/OpenPgpFilesWebclient/js/views/CFileView.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  moment = __webpack_require__(/*! moment */ "sdEb"),
  videojs = (__webpack_require__(/*! video.js */ "3huN")["default"]),
  ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  UrlUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Url.js */ "Tt1R"),
  Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
  Settings = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/Settings.js */ "A/GJ"),
  Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
  CAbstractScreenView = __webpack_require__(/*! modules/CoreWebclient/js/views/CAbstractScreenView.js */ "doeu"),
  OpenPgpFileProcessor = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/OpenPgpFileProcessor.js */ "1CV1"),
  OpenPgpEncryptor = ModulesManager.run('OpenPgpWebclient', 'getOpenPgpEncryptor');
__webpack_require__(/*! modules/OpenPgpFilesWebclient/styles/vendors/video-js.css */ "mgW8");
/**
* @constructor
*/
function CFileView() {
  CAbstractScreenView.call(this, 'OpenPgpFilesWebclient');
  this.aSupportedVideoExt = ['mp4', 'url'];
  this.aSupportedAudioExt = ['mp3'];
  this.ExpireDate = Settings.PublicFileData.ExpireDate ? moment.unix(Settings.PublicFileData.ExpireDate).format("YYYY-MM-DD HH:mm:ss") : '';
  this.ExpireDateMessage = Settings.PublicFileData.ExpireDate ? TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_MESSAGE_LIFETIME', {
    'DATETIME': this.ExpireDate
  }) : null;
  this.password = ko.observable('');
  this.isDecryptionAvailable = ko.observable(false);
  this.isDownloadingAndDecrypting = ko.observable(false);
  this.browserTitle = ko.observable(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HEADING_BROWSER_TAB'));
  this.hash = Settings.PublicFileData.Hash ? Settings.PublicFileData.Hash : '';
  this.fileName = Settings.PublicFileData.Name ? Settings.PublicFileData.Name : '';
  this.fileSize = Settings.PublicFileData.Size ? Settings.PublicFileData.Size : '';
  this.fileUrl = Settings.PublicFileData.Url ? Settings.PublicFileData.Url : '';
  this.encryptionMode = Settings.PublicFileData.PgpEncryptionMode ? Settings.PublicFileData.PgpEncryptionMode : '';
  this.recipientEmail = Settings.PublicFileData.PgpEncryptionRecipientEmail ? Settings.PublicFileData.PgpEncryptionRecipientEmail : '';
  this.bSecuredLink = !!Settings.PublicFileData.IsSecuredLink;
  this.isUrlFile = Settings.PublicFileData.IsUrlFile ? Settings.PublicFileData.IsUrlFile : false;
  this.sParanoidKeyPublic = Settings.PublicFileData.ParanoidKeyPublic ? Settings.PublicFileData.ParanoidKeyPublic : '';
  this.sInitializationVector = Settings.PublicFileData.InitializationVector ? Settings.PublicFileData.InitializationVector : '';
  this.bShowPlayButton = ko.observable(false);
  this.bShowVideoPlayer = ko.observable(false);
  this.bShowAudioPlayer = ko.observable(false);
  this.koShowPassword = ko.computed(function () {
    return (this.isDecryptionAvailable() || this.bSecuredLink) && !this.bShowVideoPlayer() && !this.bShowAudioPlayer();
  }, this);
  this.isMedia = ko.observable(false);
  if (this.bSecuredLink) {
    this.passwordLabel = TextUtils.i18n('OPENPGPFILESWEBCLIENT/LABEL_ENTER_PASSWORD');
  } else {
    switch (this.encryptionMode) {
      case Enums.EncryptionBasedOn.Key:
        this.passwordLabel = TextUtils.i18n('OPENPGPFILESWEBCLIENT/LABEL_ENTER_PASSPHRASE', {
          'KEY': this.recipientEmail
        });
        this.isDecryptionAvailable(true);
        break;
      case Enums.EncryptionBasedOn.Password:
        this.passwordLabel = TextUtils.i18n('OPENPGPFILESWEBCLIENT/LABEL_ENTER_PASSWORD');
        this.isDecryptionAvailable(true);
        break;
      default:
        //Encryption mode not defined
        this.passwordLabel = "";
    }
  }
}
_.extendOwn(CFileView.prototype, CAbstractScreenView.prototype);
CFileView.prototype.ViewTemplate = 'OpenPgpFilesWebclient_FileView';
CFileView.prototype.ViewConstructorName = 'CFileView';
CFileView.prototype.onShow = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var isVideo, isAudio, sSrc;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        isVideo = this.isFileVideo(this.fileName);
        isAudio = this.isFileAudio(this.fileName);
        this.isMedia(isVideo || isAudio || this.isUrlFile);
        this.bShowPlayButton(this.bSecuredLink && this.isMedia());
        if (!this.bSecuredLink) {
          sSrc = this.fileUrl;
          if (!this.isUrlFile) {
            sSrc = UrlUtils.getAppPath() + sSrc;
          }
          if (this.isUrlFile) {
            this.showVideoStreamPlayer(sSrc);
          } else if (isVideo) {
            this.showVideoPlayer(sSrc);
          } else if (isAudio) {
            this.showAudioPlayer(sSrc);
          }
        }
        if (!(this.encryptionMode === Enums.EncryptionBasedOn.Key)) {
          _context.next = 9;
          break;
        }
        _context.next = 8;
        return OpenPgpEncryptor.oPromiseInitialised;
      case 8:
        this.isDecryptionAvailable(!OpenPgpEncryptor.findKeysByEmails([this.recipientEmail], false).length <= 0);
      case 9:
      case "end":
        return _context.stop();
    }
  }, _callee, this);
}));
CFileView.prototype.downloadAndDecryptFile = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        if (!(this.encryptionMode === Enums.EncryptionBasedOn.Password && this.password() === '')) {
          _context2.next = 4;
          break;
        }
        Screens.showError(TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_EMPTY_PASSWORD'));
        _context2.next = 8;
        break;
      case 4:
        this.isDownloadingAndDecrypting(true);
        _context2.next = 7;
        return OpenPgpFileProcessor.processFileDecryption(this.fileName, this.fileUrl, this.recipientEmail, this.password(), this.encryptionMode, this.sParanoidKeyPublic, this.sInitializationVector);
      case 7:
        this.isDownloadingAndDecrypting(false);
      case 8:
      case "end":
        return _context2.stop();
    }
  }, _callee2, this);
}));
CFileView.prototype.securedLinkDownload = function () {
  if (this.password() === '') {
    Screens.showError(TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_EMPTY_PASSWORD'));
  } else {
    if (this.isUrlFile) {
      window.location.href = this.fileUrl;
    } else {
      window.location.href = this.fileUrl + '/download/secure/' + encodeURIComponent(this.password());
    }
  }
};
CFileView.prototype.play = function () {
  var _this = this;
  if (this.password() === '') {
    Screens.showError(TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_EMPTY_PASSWORD'));
  } else {
    Ajax.send('OpenPgpFilesWebclient', 'ValidatePublicLinkPassword', {
      'Hash': this.hash,
      'Password': this.password()
    }, function (oResponse) {
      if (oResponse.Result === true) {
        var sSrc = UrlUtils.getAppPath() + _this.fileUrl + '/download/secure/' + encodeURIComponent(_this.password());
        if (_this.isFileVideo(_this.fileName)) {
          _this.showVideoPlayer(sSrc);
        } else if (_this.isFileAudio(_this.fileName)) {
          _this.showAudioPlayer(sSrc);
        } else if (_this.isUrlFile) {
          _this.showVideoStreamPlayer(_this.fileUrl);
        }
      } else if (oResponse.Result === false) {
        Screens.showError(TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_PASSWORD_INCORRECT'));
      } else {
        Screens.showError(TextUtils.i18n('COREWEBCLIENT/ERROR_UNKNOWN'));
      }
    }, this);
  }
};
CFileView.prototype.isFileVideo = function (sFileName) {
  var sExt = Utils.getFileExtension(sFileName);
  return -1 !== _.indexOf(this.aSupportedVideoExt, sExt.toLowerCase());
};
CFileView.prototype.isFileAudio = function (sFileName) {
  var sExt = Utils.getFileExtension(sFileName);
  return -1 !== _.indexOf(this.aSupportedAudioExt, sExt.toLowerCase());
};
CFileView.prototype.showVideoStreamPlayer = function (sSrc) {
  var sType = 'application/x-mpegURL';
  this.oPlayer = videojs('video-player');
  this.oPlayer.src({
    type: sType,
    src: sSrc
  });
  this.bShowVideoPlayer(true);
};
CFileView.prototype.showVideoPlayer = function (sSrc) {
  var _this2 = this;
  var sType = 'video/' + Utils.getFileExtension(this.fileName).toLowerCase();
  this.oPlayer = videojs('video-player');
  if (ModulesManager.isModuleAvailable('ActivityHistory')) {
    // play event is fired to many times
    this.oPlayer.on('loadeddata', function () {
      Ajax.send('ActivityHistory', 'CreateFromHash', {
        'Hash': _this2.hash,
        'EventName': 'play'
      });
    });
    this.oPlayer.on('ended', function () {
      Ajax.send('ActivityHistory', 'CreateFromHash', {
        'Hash': _this2.hash,
        'EventName': 'play-finish'
      });
    });
  }
  this.oPlayer.src({
    type: sType,
    src: sSrc
  });
  this.bShowVideoPlayer(true);
};
CFileView.prototype.showAudioPlayer = function (sSrc) {
  var _this3 = this;
  var sType = 'audio/' + Utils.getFileExtension(this.fileName).toLowerCase();
  this.oPlayer = videojs('audio-player');
  if (ModulesManager.isModuleAvailable('ActivityHistory')) {
    // play event is fired to many times
    this.oPlayer.on('loadeddata', function () {
      Ajax.send('ActivityHistory', 'CreateFromHash', {
        'Hash': _this3.hash,
        'EventName': 'play'
      });
    });
    this.oPlayer.on('ended', function () {
      Ajax.send('ActivityHistory', 'CreateFromHash', {
        'Hash': _this3.hash,
        'EventName': 'play-finish'
      });
    });
  }
  this.oPlayer.src({
    type: sType,
    src: sSrc
  });
  this.bShowAudioPlayer(true);
};
module.exports = CFileView;

/***/ }),

/***/ "iwNQ":
/*!****************************************************************************************!*\
  !*** ./modules/OpenPgpFilesWebclient/js/views/CSelfDestructingEncryptedMessageView.js ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  moment = __webpack_require__(/*! moment */ "sdEb"),
  ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  ErrorsUtils = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/utils/Errors.js */ "w0+v"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
  Settings = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/Settings.js */ "A/GJ"),
  CAbstractScreenView = __webpack_require__(/*! modules/CoreWebclient/js/views/CAbstractScreenView.js */ "doeu"),
  OpenPgpEncryptor = ModulesManager.run('OpenPgpWebclient', 'getOpenPgpEncryptor');

/**
* @constructor
*/
function CSelfDestructingEncryptedMessageView() {
  CAbstractScreenView.call(this, 'OpenPgpFilesWebclient');
  this.enteredPassword = ko.observable('');
  this.isDecryptionAvailable = ko.observable(false);
  this.isDecrypting = ko.observable(false);
  this.browserTitle = ko.observable(TextUtils.i18n('OPENPGPFILESWEBCLIENT/HEADING_BROWSER_TAB'));
  this.subject = Settings.PublicFileData.Subject ? Settings.PublicFileData.Subject : '';
  this.message = ko.observable('');
  this.data = Settings.PublicFileData.Data ? Settings.PublicFileData.Data : '';
  this.encryptionMode = Settings.PublicFileData.PgpEncryptionMode ? Settings.PublicFileData.PgpEncryptionMode : '';
  this.recipientEmail = Settings.PublicFileData.RecipientEmail ? Settings.PublicFileData.RecipientEmail : '';
  this.ExpireDate = Settings.PublicFileData.ExpireDate ? moment.unix(Settings.PublicFileData.ExpireDate).format("YYYY-MM-DD HH:mm:ss") : '';
  this.ExpireDateMessage = TextUtils.i18n('OPENPGPFILESWEBCLIENT/HINT_MESSAGE_LIFETIME', {
    'DATETIME': this.ExpireDate
  });
  this.EerrorNoKeyMessage = TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_NO_KEY', {
    'SYSNAME': Settings.ProductName
  });
  this.isDecryptedSuccessfully = ko.observable(false);
  this.isShowNoKeyErrorMessage = ko.observable(false);
  switch (this.encryptionMode) {
    case Enums.EncryptionBasedOn.Key:
      this.passwordLabel = TextUtils.i18n('OPENPGPFILESWEBCLIENT/LABEL_ENTER_PASSPHRASE', {
        'KEY': this.recipientEmail
      });
      this.isDecryptionAvailable(true);
      break;
    case Enums.EncryptionBasedOn.Password:
      this.passwordLabel = TextUtils.i18n('OPENPGPFILESWEBCLIENT/LABEL_ENTER_PASSWORD');
      this.isDecryptionAvailable(true);
      break;
    default:
      //Encryption mode not defined
      this.passwordLabel = "";
  }
}
_.extendOwn(CSelfDestructingEncryptedMessageView.prototype, CAbstractScreenView.prototype);
CSelfDestructingEncryptedMessageView.prototype.ViewTemplate = 'OpenPgpFilesWebclient_SelfDestructingEncryptedMessageView';
CSelfDestructingEncryptedMessageView.prototype.ViewConstructorName = 'CSelfDestructingEncryptedMessageView';
CSelfDestructingEncryptedMessageView.prototype.onShow = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        if (!(this.encryptionMode === Enums.EncryptionBasedOn.Key)) {
          _context.next = 5;
          break;
        }
        _context.next = 3;
        return OpenPgpEncryptor.oPromiseInitialised;
      case 3:
        this.isDecryptionAvailable(!OpenPgpEncryptor.findKeysByEmails([this.recipientEmail], false).length <= 0);
        //show error message if user has no key
        this.isShowNoKeyErrorMessage(!this.isDecryptionAvailable());
      case 5:
      case "end":
        return _context.stop();
    }
  }, _callee, this);
}));
CSelfDestructingEncryptedMessageView.prototype.decryptMessage = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
  var oDecryptionResult;
  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        if (!(this.encryptionMode === Enums.EncryptionBasedOn.Password && this.enteredPassword() === '')) {
          _context2.next = 4;
          break;
        }
        Screens.showError(TextUtils.i18n('OPENPGPFILESWEBCLIENT/ERROR_EMPTY_PASSWORD'));
        _context2.next = 10;
        break;
      case 4:
        this.isDecrypting(true);
        _context2.next = 7;
        return OpenPgpEncryptor.decryptData(this.data, this.enteredPassword(), this.encryptionMode === Enums.EncryptionBasedOn.Password);
      case 7:
        oDecryptionResult = _context2.sent;
        this.isDecrypting(false);
        if (!oDecryptionResult.result || oDecryptionResult.hasErrors()) {
          ErrorsUtils.showPgpErrorByCode(oDecryptionResult, Enums.PgpAction.DecryptVerify);
        } else {
          if (oDecryptionResult.hasNotices()) {
            ErrorsUtils.showPgpErrorByCode(oDecryptionResult, Enums.PgpAction.DecryptVerify);
          }
          this.message(oDecryptionResult.result);
          this.isDecryptedSuccessfully(true);
        }
      case 10:
      case "end":
        return _context2.stop();
    }
  }, _callee2, this);
}));
module.exports = CSelfDestructingEncryptedMessageView;

/***/ }),

/***/ "YGt6":
/*!**********************************************************************!*\
  !*** ./modules/OpenPgpFilesWebclient/js/views/ComposeButtonsView.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var ko = __webpack_require__(/*! knockout */ "p09A"),
  Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
  SelfDestructingEncryptedMessagePopup = __webpack_require__(/*! modules/OpenPgpFilesWebclient/js/popups/SelfDestructingEncryptedMessagePopup.js */ "3mMn");

/**
 * @constructor for object that display buttons "PGP Sign/Encrypt" and "Undo PGP"
 */
function CComposeButtonsView() {
  this.bSendButton = true;
  this.pgpSecured = ko.observable(false);
}
CComposeButtonsView.prototype.ViewTemplate = 'OpenPgpFilesWebclient_ComposeButtonsView';

/**
 * Assigns compose external interface.
 *
 * @param {Object} oCompose Compose external interface object.
 * @param {Function} oCompose.isHtml Returns **true** if html mode is switched on in html editor.
 * @param {Function} oCompose.hasAttachments Returns **true** if some files were attached to message.
 * @param {Function} oCompose.getPlainText Returns plain text from html editor. If html mode is switched on html text will be converted to plain and returned.
 * @param {Function} oCompose.getFromEmail Returns message sender email.
 * @param {Function} oCompose.getRecipientEmails Returns array of message recipients.
 * @param {Function} oCompose.saveSilently Saves message silently (without buttons disabling and any info messages).
 * @param {Function} oCompose.setPlainTextMode Sets plain text mode switched on.
 * @param {Function} oCompose.setPlainText Sets plain text to html editor.
 * @param {Function} oCompose.setHtmlTextMode Sets html text mode switched on.
 * @param {Function} oCompose.setHtmlText Sets html text to html editor.
 * @param {Function} oCompose.undoHtml Undo last changes in html editor.
 *
 * @param oCompose.koTextChange Triggered on changing text in compose
 *
 */
CComposeButtonsView.prototype.assignComposeExtInterface = function (oCompose) {
  this.oCompose = oCompose;
  this.oCompose.koTextChange.subscribe(function () {
    var sPlainText = oCompose.getPlainText();
    if (!oCompose.isHtml()) {
      this.pgpSecured(sPlainText.indexOf('-----BEGIN PGP MESSAGE-----') !== -1);
    }
  }, this);
};

/**
 * @param {Object} oParameters
 */
CComposeButtonsView.prototype.doAfterApplyingMainTabParameters = function (oParameters) {
  if (oParameters.OpenPgp) {
    this.pgpSecured(oParameters.OpenPgp.Secured);
  }
};

/**
 * @param {Object} oParameters
 */
CComposeButtonsView.prototype.doAfterPreparingMainTabParameters = function (oParameters) {
  oParameters.OpenPgp = {
    Secured: this.pgpSecured()
  };
};

/**
 * Receives message properties that are displayed when opening the compose popup.
 *
 * @param {Object} oMessageProps Receiving message properties.
 * @param {Boolean} oMessageProps.bDraft **true** if message was opened from drafts folder.
 * @param {Boolean} oMessageProps.bPlain **true** if opened for compose message if plain.
 * @param {String} oMessageProps.sRawText Raw plain text of opened for compose message.
 */
CComposeButtonsView.prototype.doAfterPopulatingMessage = function (oMessageProps) {
  if (oMessageProps.bPlain) {
    this.pgpSecured(oMessageProps.sRawText.indexOf('-----BEGIN PGP MESSAGE-----') !== -1);
  } else {
    this.pgpSecured(false);
  }
};
CComposeButtonsView.prototype.send = function () {
  if (!this.oCompose) {
    return;
  }
  var recipientsInfo = this.oCompose.getRecipientsInfo(),
    firstRecipientInfo = recipientsInfo.length > 0 ? recipientsInfo[0] : null;
  Popups.showPopup(SelfDestructingEncryptedMessagePopup, [this.oCompose.getSubject(), this.oCompose.getPlainText(), firstRecipientInfo, this.oCompose.getFromEmail(), this.oCompose.getSelectedSender()]);
};

/**
 * Determines if sending a message is allowed.
 */
CComposeButtonsView.prototype.isEnableSending = function () {
  return this.oCompose && !this.pgpSecured();
};
module.exports = new CComposeButtonsView();

/***/ }),

/***/ "KAUg":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./modules/OpenPgpFilesWebclient/styles/vendors/video-js.css ***!
  \*********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "Hf+z");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "+vjt");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "4jxT");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! data:application/font-woff;charset=utf-8;base64,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 */ "NYW5"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@charset "UTF-8";
.vjs-modal-dialog .vjs-modal-dialog-content, .video-js .vjs-modal-dialog, .vjs-button > .vjs-icon-placeholder:before, .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.vjs-button > .vjs-icon-placeholder:before, .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  text-align: center;
}

@font-face {
  font-family: VideoJS;
  src: url(${___CSS_LOADER_URL_REPLACEMENT_0___}) format("woff");
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-play, .video-js .vjs-play-control .vjs-icon-placeholder, .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-play:before, .video-js .vjs-play-control .vjs-icon-placeholder:before, .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  content: "\\f101";
}

.vjs-icon-play-circle {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-play-circle:before {
  content: "\\f102";
}

.vjs-icon-pause, .video-js .vjs-play-control.vjs-playing .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-pause:before, .video-js .vjs-play-control.vjs-playing .vjs-icon-placeholder:before {
  content: "\\f103";
}

.vjs-icon-volume-mute, .video-js .vjs-mute-control.vjs-vol-0 .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-volume-mute:before, .video-js .vjs-mute-control.vjs-vol-0 .vjs-icon-placeholder:before {
  content: "\\f104";
}

.vjs-icon-volume-low, .video-js .vjs-mute-control.vjs-vol-1 .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-volume-low:before, .video-js .vjs-mute-control.vjs-vol-1 .vjs-icon-placeholder:before {
  content: "\\f105";
}

.vjs-icon-volume-mid, .video-js .vjs-mute-control.vjs-vol-2 .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-volume-mid:before, .video-js .vjs-mute-control.vjs-vol-2 .vjs-icon-placeholder:before {
  content: "\\f106";
}

.vjs-icon-volume-high, .video-js .vjs-mute-control .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-volume-high:before, .video-js .vjs-mute-control .vjs-icon-placeholder:before {
  content: "\\f107";
}

.vjs-icon-fullscreen-enter, .video-js .vjs-fullscreen-control .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-fullscreen-enter:before, .video-js .vjs-fullscreen-control .vjs-icon-placeholder:before {
  content: "\\f108";
}

.vjs-icon-fullscreen-exit, .video-js.vjs-fullscreen .vjs-fullscreen-control .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-fullscreen-exit:before, .video-js.vjs-fullscreen .vjs-fullscreen-control .vjs-icon-placeholder:before {
  content: "\\f109";
}

.vjs-icon-square {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-square:before {
  content: "\\f10a";
}

.vjs-icon-spinner {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-spinner:before {
  content: "\\f10b";
}

.vjs-icon-subtitles, .video-js .vjs-subs-caps-button .vjs-icon-placeholder,
.video-js.video-js:lang(en-GB) .vjs-subs-caps-button .vjs-icon-placeholder,
.video-js.video-js:lang(en-IE) .vjs-subs-caps-button .vjs-icon-placeholder,
.video-js.video-js:lang(en-AU) .vjs-subs-caps-button .vjs-icon-placeholder,
.video-js.video-js:lang(en-NZ) .vjs-subs-caps-button .vjs-icon-placeholder, .video-js .vjs-subtitles-button .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-subtitles:before, .video-js .vjs-subs-caps-button .vjs-icon-placeholder:before,
.video-js.video-js:lang(en-GB) .vjs-subs-caps-button .vjs-icon-placeholder:before,
.video-js.video-js:lang(en-IE) .vjs-subs-caps-button .vjs-icon-placeholder:before,
.video-js.video-js:lang(en-AU) .vjs-subs-caps-button .vjs-icon-placeholder:before,
.video-js.video-js:lang(en-NZ) .vjs-subs-caps-button .vjs-icon-placeholder:before, .video-js .vjs-subtitles-button .vjs-icon-placeholder:before {
  content: "\\f10c";
}

.vjs-icon-captions, .video-js:lang(en) .vjs-subs-caps-button .vjs-icon-placeholder,
.video-js:lang(fr-CA) .vjs-subs-caps-button .vjs-icon-placeholder, .video-js .vjs-captions-button .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-captions:before, .video-js:lang(en) .vjs-subs-caps-button .vjs-icon-placeholder:before,
.video-js:lang(fr-CA) .vjs-subs-caps-button .vjs-icon-placeholder:before, .video-js .vjs-captions-button .vjs-icon-placeholder:before {
  content: "\\f10d";
}

.vjs-icon-chapters, .video-js .vjs-chapters-button .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-chapters:before, .video-js .vjs-chapters-button .vjs-icon-placeholder:before {
  content: "\\f10e";
}

.vjs-icon-share {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-share:before {
  content: "\\f10f";
}

.vjs-icon-cog {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-cog:before {
  content: "\\f110";
}

.vjs-icon-circle, .vjs-seek-to-live-control .vjs-icon-placeholder, .video-js .vjs-volume-level, .video-js .vjs-play-progress {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-circle:before, .vjs-seek-to-live-control .vjs-icon-placeholder:before, .video-js .vjs-volume-level:before, .video-js .vjs-play-progress:before {
  content: "\\f111";
}

.vjs-icon-circle-outline {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-circle-outline:before {
  content: "\\f112";
}

.vjs-icon-circle-inner-circle {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-circle-inner-circle:before {
  content: "\\f113";
}

.vjs-icon-hd {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-hd:before {
  content: "\\f114";
}

.vjs-icon-cancel, .video-js .vjs-control.vjs-close-button .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-cancel:before, .video-js .vjs-control.vjs-close-button .vjs-icon-placeholder:before {
  content: "\\f115";
}

.vjs-icon-replay, .video-js .vjs-play-control.vjs-ended .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-replay:before, .video-js .vjs-play-control.vjs-ended .vjs-icon-placeholder:before {
  content: "\\f116";
}

.vjs-icon-facebook {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-facebook:before {
  content: "\\f117";
}

.vjs-icon-gplus {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-gplus:before {
  content: "\\f118";
}

.vjs-icon-linkedin {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-linkedin:before {
  content: "\\f119";
}

.vjs-icon-twitter {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-twitter:before {
  content: "\\f11a";
}

.vjs-icon-tumblr {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-tumblr:before {
  content: "\\f11b";
}

.vjs-icon-pinterest {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-pinterest:before {
  content: "\\f11c";
}

.vjs-icon-audio-description, .video-js .vjs-descriptions-button .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-audio-description:before, .video-js .vjs-descriptions-button .vjs-icon-placeholder:before {
  content: "\\f11d";
}

.vjs-icon-audio, .video-js .vjs-audio-button .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-audio:before, .video-js .vjs-audio-button .vjs-icon-placeholder:before {
  content: "\\f11e";
}

.vjs-icon-next-item {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-next-item:before {
  content: "\\f11f";
}

.vjs-icon-previous-item {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-previous-item:before {
  content: "\\f120";
}

.vjs-icon-picture-in-picture-enter, .video-js .vjs-picture-in-picture-control .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-picture-in-picture-enter:before, .video-js .vjs-picture-in-picture-control .vjs-icon-placeholder:before {
  content: "\\f121";
}

.vjs-icon-picture-in-picture-exit, .video-js.vjs-picture-in-picture .vjs-picture-in-picture-control .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-picture-in-picture-exit:before, .video-js.vjs-picture-in-picture .vjs-picture-in-picture-control .vjs-icon-placeholder:before {
  content: "\\f122";
}

.video-js {
  display: block;
  vertical-align: top;
  box-sizing: border-box;
  color: #fff;
  background-color: #000;
  position: relative;
  padding: 0;
  font-size: 10px;
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  font-family: Arial, Helvetica, sans-serif;
  word-break: initial;
}
.video-js:-moz-full-screen {
  position: absolute;
}
.video-js:-webkit-full-screen {
  width: 100% !important;
  height: 100% !important;
}

.video-js[tabindex="-1"] {
  outline: none;
}

.video-js *,
.video-js *:before,
.video-js *:after {
  box-sizing: inherit;
}

.video-js ul {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  list-style-position: outside;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.video-js.vjs-fluid,
.video-js.vjs-16-9,
.video-js.vjs-4-3 {
  width: 100%;
  max-width: 100%;
  height: 0;
}

.video-js.vjs-16-9 {
  padding-top: 56.25%;
}

.video-js.vjs-4-3 {
  padding-top: 75%;
}

.video-js.vjs-fill {
  width: 100%;
  height: 100%;
}

.video-js .vjs-tech {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

body.vjs-full-window {
  padding: 0;
  margin: 0;
  height: 100%;
}

.vjs-full-window .video-js.vjs-fullscreen {
  position: fixed;
  overflow: hidden;
  z-index: 1000;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}

.video-js.vjs-fullscreen {
  width: 100% !important;
  height: 100% !important;
  padding-top: 0 !important;
}

.video-js.vjs-fullscreen.vjs-user-inactive {
  cursor: none;
}

.vjs-hidden {
  display: none !important;
}

.vjs-disabled {
  opacity: 0.5;
  cursor: default;
}

.video-js .vjs-offscreen {
  height: 1px;
  left: -9999px;
  position: absolute;
  top: 0;
  width: 1px;
}

.vjs-lock-showing {
  display: block !important;
  opacity: 1;
  visibility: visible;
}

.vjs-no-js {
  padding: 20px;
  color: #fff;
  background-color: #000;
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  width: 300px;
  height: 150px;
  margin: 0px auto;
}

.vjs-no-js a,
.vjs-no-js a:visited {
  color: #66A8CC;
}

.video-js .vjs-big-play-button {
  font-size: 3em;
  line-height: 1.5em;
  height: 1.63332em;
  width: 3em;
  display: block;
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 0;
  cursor: pointer;
  opacity: 1;
  border: 0.06666em solid #fff;
  background-color: #2B333F;
  background-color: rgba(43, 51, 63, 0.7);
  border-radius: 0.3em;
  transition: all 0.4s;
}
.vjs-big-play-centered .vjs-big-play-button {
  top: 50%;
  left: 50%;
  margin-top: -0.81666em;
  margin-left: -1.5em;
}

.video-js:hover .vjs-big-play-button,
.video-js .vjs-big-play-button:focus {
  border-color: #fff;
  background-color: #73859f;
  background-color: rgba(115, 133, 159, 0.5);
  transition: all 0s;
}

.vjs-controls-disabled .vjs-big-play-button,
.vjs-has-started .vjs-big-play-button,
.vjs-using-native-controls .vjs-big-play-button,
.vjs-error .vjs-big-play-button {
  display: none;
}

.vjs-has-started.vjs-paused.vjs-show-big-play-button-on-pause .vjs-big-play-button {
  display: block;
}

.video-js button {
  background: none;
  border: none;
  color: inherit;
  display: inline-block;
  font-size: inherit;
  line-height: inherit;
  text-transform: none;
  text-decoration: none;
  transition: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.vjs-control .vjs-button {
  width: 100%;
  height: 100%;
}

.video-js .vjs-control.vjs-close-button {
  cursor: pointer;
  height: 3em;
  position: absolute;
  right: 0;
  top: 0.5em;
  z-index: 2;
}
.video-js .vjs-modal-dialog {
  background: rgba(0, 0, 0, 0.8);
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0));
  overflow: auto;
}

.video-js .vjs-modal-dialog > * {
  box-sizing: border-box;
}

.vjs-modal-dialog .vjs-modal-dialog-content {
  font-size: 1.2em;
  line-height: 1.5;
  padding: 20px 24px;
  z-index: 1;
}

.vjs-menu-button {
  cursor: pointer;
}

.vjs-menu-button.vjs-disabled {
  cursor: default;
}

.vjs-workinghover .vjs-menu-button.vjs-disabled:hover .vjs-menu {
  display: none;
}

.vjs-menu .vjs-menu-content {
  display: block;
  padding: 0;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  overflow: auto;
}

.vjs-menu .vjs-menu-content > * {
  box-sizing: border-box;
}

.vjs-scrubbing .vjs-control.vjs-menu-button:hover .vjs-menu {
  display: none;
}

.vjs-menu li {
  list-style: none;
  margin: 0;
  padding: 0.2em 0;
  line-height: 1.4em;
  font-size: 1.2em;
  text-align: center;
  text-transform: lowercase;
}

.vjs-menu li.vjs-menu-item:focus,
.vjs-menu li.vjs-menu-item:hover,
.js-focus-visible .vjs-menu li.vjs-menu-item:hover {
  background-color: #73859f;
  background-color: rgba(115, 133, 159, 0.5);
}

.vjs-menu li.vjs-selected,
.vjs-menu li.vjs-selected:focus,
.vjs-menu li.vjs-selected:hover,
.js-focus-visible .vjs-menu li.vjs-selected:hover {
  background-color: #fff;
  color: #2B333F;
}

.vjs-menu li.vjs-menu-title {
  text-align: center;
  text-transform: uppercase;
  font-size: 1em;
  line-height: 2em;
  padding: 0;
  margin: 0 0 0.3em 0;
  font-weight: bold;
  cursor: default;
}

.vjs-menu-button-popup .vjs-menu {
  display: none;
  position: absolute;
  bottom: 0;
  width: 10em;
  left: -3em;
  height: 0em;
  margin-bottom: 1.5em;
  border-top-color: rgba(43, 51, 63, 0.7);
}

.vjs-menu-button-popup .vjs-menu .vjs-menu-content {
  background-color: #2B333F;
  background-color: rgba(43, 51, 63, 0.7);
  position: absolute;
  width: 100%;
  bottom: 1.5em;
  max-height: 15em;
}

.vjs-layout-tiny .vjs-menu-button-popup .vjs-menu .vjs-menu-content,
.vjs-layout-x-small .vjs-menu-button-popup .vjs-menu .vjs-menu-content {
  max-height: 5em;
}

.vjs-layout-small .vjs-menu-button-popup .vjs-menu .vjs-menu-content {
  max-height: 10em;
}

.vjs-layout-medium .vjs-menu-button-popup .vjs-menu .vjs-menu-content {
  max-height: 14em;
}

.vjs-layout-large .vjs-menu-button-popup .vjs-menu .vjs-menu-content,
.vjs-layout-x-large .vjs-menu-button-popup .vjs-menu .vjs-menu-content,
.vjs-layout-huge .vjs-menu-button-popup .vjs-menu .vjs-menu-content {
  max-height: 25em;
}

.vjs-workinghover .vjs-menu-button-popup.vjs-hover .vjs-menu,
.vjs-menu-button-popup .vjs-menu.vjs-lock-showing {
  display: block;
}

.video-js .vjs-menu-button-inline {
  transition: all 0.4s;
  overflow: hidden;
}

.video-js .vjs-menu-button-inline:before {
  width: 2.222222222em;
}

.video-js .vjs-menu-button-inline:hover,
.video-js .vjs-menu-button-inline:focus,
.video-js .vjs-menu-button-inline.vjs-slider-active,
.video-js.vjs-no-flex .vjs-menu-button-inline {
  width: 12em;
}

.vjs-menu-button-inline .vjs-menu {
  opacity: 0;
  height: 100%;
  width: auto;
  position: absolute;
  left: 4em;
  top: 0;
  padding: 0;
  margin: 0;
  transition: all 0.4s;
}

.vjs-menu-button-inline:hover .vjs-menu,
.vjs-menu-button-inline:focus .vjs-menu,
.vjs-menu-button-inline.vjs-slider-active .vjs-menu {
  display: block;
  opacity: 1;
}

.vjs-no-flex .vjs-menu-button-inline .vjs-menu {
  display: block;
  opacity: 1;
  position: relative;
  width: auto;
}

.vjs-no-flex .vjs-menu-button-inline:hover .vjs-menu,
.vjs-no-flex .vjs-menu-button-inline:focus .vjs-menu,
.vjs-no-flex .vjs-menu-button-inline.vjs-slider-active .vjs-menu {
  width: auto;
}

.vjs-menu-button-inline .vjs-menu-content {
  width: auto;
  height: 100%;
  margin: 0;
  overflow: hidden;
}

.video-js .vjs-control-bar {
  display: none;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3em;
  background-color: #2B333F;
  background-color: rgba(43, 51, 63, 0.7);
}

.vjs-has-started .vjs-control-bar {
  display: flex;
  visibility: visible;
  opacity: 1;
  transition: visibility 0.1s, opacity 0.1s;
}

.vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar {
  visibility: visible;
  opacity: 0;
  transition: visibility 1s, opacity 1s;
}

.vjs-controls-disabled .vjs-control-bar,
.vjs-using-native-controls .vjs-control-bar,
.vjs-error .vjs-control-bar {
  display: none !important;
}

.vjs-audio.vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar {
  opacity: 1;
  visibility: visible;
}

.vjs-has-started.vjs-no-flex .vjs-control-bar {
  display: table;
}

.video-js .vjs-control {
  position: relative;
  text-align: center;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 4em;
  flex: none;
}

.vjs-button > .vjs-icon-placeholder:before {
  font-size: 1.8em;
  line-height: 1.67;
}

.video-js .vjs-control:focus:before,
.video-js .vjs-control:hover:before,
.video-js .vjs-control:focus {
  text-shadow: 0em 0em 1em white;
}

.video-js .vjs-control-text {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.vjs-no-flex .vjs-control {
  display: table-cell;
  vertical-align: middle;
}

.video-js .vjs-custom-control-spacer {
  display: none;
}

.video-js .vjs-progress-control {
  cursor: pointer;
  flex: auto;
  display: flex;
  align-items: center;
  min-width: 4em;
  touch-action: none;
}

.video-js .vjs-progress-control.disabled {
  cursor: default;
}

.vjs-live .vjs-progress-control {
  display: none;
}

.vjs-liveui .vjs-progress-control {
  display: flex;
  align-items: center;
}

.vjs-no-flex .vjs-progress-control {
  width: auto;
}

.video-js .vjs-progress-holder {
  flex: auto;
  transition: all 0.2s;
  height: 0.3em;
}

.video-js .vjs-progress-control .vjs-progress-holder {
  margin: 0 10px;
}

.video-js .vjs-progress-control:hover .vjs-progress-holder {
  font-size: 1.6666666667em;
}

.video-js .vjs-progress-control:hover .vjs-progress-holder.disabled {
  font-size: 1em;
}

.video-js .vjs-progress-holder .vjs-play-progress,
.video-js .vjs-progress-holder .vjs-load-progress,
.video-js .vjs-progress-holder .vjs-load-progress div {
  position: absolute;
  display: block;
  height: 100%;
  margin: 0;
  padding: 0;
  width: 0;
}

.video-js .vjs-play-progress {
  background-color: #fff;
}
.video-js .vjs-play-progress:before {
  font-size: 0.9em;
  position: absolute;
  right: -0.5em;
  top: -0.3333333333em;
  z-index: 1;
}

.video-js .vjs-load-progress {
  background: rgba(115, 133, 159, 0.5);
}

.video-js .vjs-load-progress div {
  background: rgba(115, 133, 159, 0.75);
}

.video-js .vjs-time-tooltip {
  background-color: #fff;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.3em;
  color: #000;
  float: right;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  padding: 6px 8px 8px 8px;
  pointer-events: none;
  position: absolute;
  top: -3.4em;
  visibility: hidden;
  z-index: 1;
}

.video-js .vjs-progress-holder:focus .vjs-time-tooltip {
  display: none;
}

.video-js .vjs-progress-control:hover .vjs-time-tooltip,
.video-js .vjs-progress-control:hover .vjs-progress-holder:focus .vjs-time-tooltip {
  display: block;
  font-size: 0.6em;
  visibility: visible;
}

.video-js .vjs-progress-control.disabled:hover .vjs-time-tooltip {
  font-size: 1em;
}

.video-js .vjs-progress-control .vjs-mouse-display {
  display: none;
  position: absolute;
  width: 1px;
  height: 100%;
  background-color: #000;
  z-index: 1;
}

.vjs-no-flex .vjs-progress-control .vjs-mouse-display {
  z-index: 0;
}

.video-js .vjs-progress-control:hover .vjs-mouse-display {
  display: block;
}

.video-js.vjs-user-inactive .vjs-progress-control .vjs-mouse-display {
  visibility: hidden;
  opacity: 0;
  transition: visibility 1s, opacity 1s;
}

.video-js.vjs-user-inactive.vjs-no-flex .vjs-progress-control .vjs-mouse-display {
  display: none;
}

.vjs-mouse-display .vjs-time-tooltip {
  color: #fff;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.8);
}

.video-js .vjs-slider {
  position: relative;
  cursor: pointer;
  padding: 0;
  margin: 0 0.45em 0 0.45em;
  /* iOS Safari */
  -webkit-touch-callout: none;
  /* Safari */
  -webkit-user-select: none;
  /* Konqueror HTML */
  /* Firefox */
  -moz-user-select: none;
  /* Internet Explorer/Edge */
  -ms-user-select: none;
  /* Non-prefixed version, currently supported by Chrome and Opera */
  user-select: none;
  background-color: #73859f;
  background-color: rgba(115, 133, 159, 0.5);
}

.video-js .vjs-slider.disabled {
  cursor: default;
}

.video-js .vjs-slider:focus {
  text-shadow: 0em 0em 1em white;
  box-shadow: 0 0 1em #fff;
}

.video-js .vjs-mute-control {
  cursor: pointer;
  flex: none;
}
.video-js .vjs-volume-control {
  cursor: pointer;
  margin-right: 1em;
  display: flex;
}

.video-js .vjs-volume-control.vjs-volume-horizontal {
  width: 5em;
}

.video-js .vjs-volume-panel .vjs-volume-control {
  visibility: visible;
  opacity: 0;
  width: 1px;
  height: 1px;
  margin-left: -1px;
}

.video-js .vjs-volume-panel {
  transition: width 1s;
}
.video-js .vjs-volume-panel.vjs-hover .vjs-volume-control, .video-js .vjs-volume-panel:active .vjs-volume-control, .video-js .vjs-volume-panel:focus .vjs-volume-control, .video-js .vjs-volume-panel .vjs-volume-control:active, .video-js .vjs-volume-panel.vjs-hover .vjs-mute-control ~ .vjs-volume-control, .video-js .vjs-volume-panel .vjs-volume-control.vjs-slider-active {
  visibility: visible;
  opacity: 1;
  position: relative;
  transition: visibility 0.1s, opacity 0.1s, height 0.1s, width 0.1s, left 0s, top 0s;
}
.video-js .vjs-volume-panel.vjs-hover .vjs-volume-control.vjs-volume-horizontal, .video-js .vjs-volume-panel:active .vjs-volume-control.vjs-volume-horizontal, .video-js .vjs-volume-panel:focus .vjs-volume-control.vjs-volume-horizontal, .video-js .vjs-volume-panel .vjs-volume-control:active.vjs-volume-horizontal, .video-js .vjs-volume-panel.vjs-hover .vjs-mute-control ~ .vjs-volume-control.vjs-volume-horizontal, .video-js .vjs-volume-panel .vjs-volume-control.vjs-slider-active.vjs-volume-horizontal {
  width: 5em;
  height: 3em;
  margin-right: 0;
}
.video-js .vjs-volume-panel.vjs-hover .vjs-volume-control.vjs-volume-vertical, .video-js .vjs-volume-panel:active .vjs-volume-control.vjs-volume-vertical, .video-js .vjs-volume-panel:focus .vjs-volume-control.vjs-volume-vertical, .video-js .vjs-volume-panel .vjs-volume-control:active.vjs-volume-vertical, .video-js .vjs-volume-panel.vjs-hover .vjs-mute-control ~ .vjs-volume-control.vjs-volume-vertical, .video-js .vjs-volume-panel .vjs-volume-control.vjs-slider-active.vjs-volume-vertical {
  left: -3.5em;
  transition: left 0s;
}
.video-js .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-hover, .video-js .vjs-volume-panel.vjs-volume-panel-horizontal:active, .video-js .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active {
  width: 10em;
  transition: width 0.1s;
}
.video-js .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-mute-toggle-only {
  width: 4em;
}

.video-js .vjs-volume-panel .vjs-volume-control.vjs-volume-vertical {
  height: 8em;
  width: 3em;
  left: -3000em;
  transition: visibility 1s, opacity 1s, height 1s 1s, width 1s 1s, left 1s 1s, top 1s 1s;
}

.video-js .vjs-volume-panel .vjs-volume-control.vjs-volume-horizontal {
  transition: visibility 1s, opacity 1s, height 1s 1s, width 1s, left 1s 1s, top 1s 1s;
}

.video-js.vjs-no-flex .vjs-volume-panel .vjs-volume-control.vjs-volume-horizontal {
  width: 5em;
  height: 3em;
  visibility: visible;
  opacity: 1;
  position: relative;
  transition: none;
}

.video-js.vjs-no-flex .vjs-volume-control.vjs-volume-vertical,
.video-js.vjs-no-flex .vjs-volume-panel .vjs-volume-control.vjs-volume-vertical {
  position: absolute;
  bottom: 3em;
  left: 0.5em;
}

.video-js .vjs-volume-panel {
  display: flex;
}

.video-js .vjs-volume-bar {
  margin: 1.35em 0.45em;
}

.vjs-volume-bar.vjs-slider-horizontal {
  width: 5em;
  height: 0.3em;
}

.vjs-volume-bar.vjs-slider-vertical {
  width: 0.3em;
  height: 5em;
  margin: 1.35em auto;
}

.video-js .vjs-volume-level {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
}
.video-js .vjs-volume-level:before {
  position: absolute;
  font-size: 0.9em;
}

.vjs-slider-vertical .vjs-volume-level {
  width: 0.3em;
}
.vjs-slider-vertical .vjs-volume-level:before {
  top: -0.5em;
  left: -0.3em;
}

.vjs-slider-horizontal .vjs-volume-level {
  height: 0.3em;
}
.vjs-slider-horizontal .vjs-volume-level:before {
  top: -0.3em;
  right: -0.5em;
}

.video-js .vjs-volume-panel.vjs-volume-panel-vertical {
  width: 4em;
}

.vjs-volume-bar.vjs-slider-vertical .vjs-volume-level {
  height: 100%;
}

.vjs-volume-bar.vjs-slider-horizontal .vjs-volume-level {
  width: 100%;
}

.video-js .vjs-volume-vertical {
  width: 3em;
  height: 8em;
  bottom: 8em;
  background-color: #2B333F;
  background-color: rgba(43, 51, 63, 0.7);
}

.video-js .vjs-volume-horizontal .vjs-menu {
  left: -2em;
}

.vjs-poster {
  display: inline-block;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: contain;
  background-color: #000000;
  cursor: pointer;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
}

.vjs-has-started .vjs-poster {
  display: none;
}

.vjs-audio.vjs-has-started .vjs-poster {
  display: block;
}

.vjs-using-native-controls .vjs-poster {
  display: none;
}

.video-js .vjs-live-control {
  display: flex;
  align-items: flex-start;
  flex: auto;
  font-size: 1em;
  line-height: 3em;
}

.vjs-no-flex .vjs-live-control {
  display: table-cell;
  width: auto;
  text-align: left;
}

.video-js:not(.vjs-live) .vjs-live-control,
.video-js.vjs-liveui .vjs-live-control {
  display: none;
}

.video-js .vjs-seek-to-live-control {
  cursor: pointer;
  flex: none;
  display: inline-flex;
  height: 100%;
  padding-left: 0.5em;
  padding-right: 0.5em;
  font-size: 1em;
  line-height: 3em;
  width: auto;
  min-width: 4em;
}

.vjs-no-flex .vjs-seek-to-live-control {
  display: table-cell;
  width: auto;
  text-align: left;
}

.video-js.vjs-live:not(.vjs-liveui) .vjs-seek-to-live-control,
.video-js:not(.vjs-live) .vjs-seek-to-live-control {
  display: none;
}

.vjs-seek-to-live-control.vjs-control.vjs-at-live-edge {
  cursor: auto;
}

.vjs-seek-to-live-control .vjs-icon-placeholder {
  margin-right: 0.5em;
  color: #888;
}

.vjs-seek-to-live-control.vjs-control.vjs-at-live-edge .vjs-icon-placeholder {
  color: red;
}

.video-js .vjs-time-control {
  flex: none;
  font-size: 1em;
  line-height: 3em;
  min-width: 2em;
  width: auto;
  padding-left: 1em;
  padding-right: 1em;
}

.vjs-live .vjs-time-control {
  display: none;
}

.video-js .vjs-current-time,
.vjs-no-flex .vjs-current-time {
  display: none;
}

.video-js .vjs-duration,
.vjs-no-flex .vjs-duration {
  display: none;
}

.vjs-time-divider {
  display: none;
  line-height: 3em;
}

.vjs-live .vjs-time-divider {
  display: none;
}

.video-js .vjs-play-control {
  cursor: pointer;
}

.video-js .vjs-play-control .vjs-icon-placeholder {
  flex: none;
}

.vjs-text-track-display {
  position: absolute;
  bottom: 3em;
  left: 0;
  right: 0;
  top: 0;
  pointer-events: none;
}

.video-js.vjs-user-inactive.vjs-playing .vjs-text-track-display {
  bottom: 1em;
}

.video-js .vjs-text-track {
  font-size: 1.4em;
  text-align: center;
  margin-bottom: 0.1em;
}

.vjs-subtitles {
  color: #fff;
}

.vjs-captions {
  color: #fc6;
}

.vjs-tt-cue {
  display: block;
}

video::-webkit-media-text-track-display {
  transform: translateY(-3em);
}

.video-js.vjs-user-inactive.vjs-playing video::-webkit-media-text-track-display {
  transform: translateY(-1.5em);
}

.video-js .vjs-picture-in-picture-control {
  cursor: pointer;
  flex: none;
}
.video-js .vjs-fullscreen-control {
  cursor: pointer;
  flex: none;
}
.vjs-playback-rate > .vjs-menu-button,
.vjs-playback-rate .vjs-playback-rate-value {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.vjs-playback-rate .vjs-playback-rate-value {
  pointer-events: none;
  font-size: 1.5em;
  line-height: 2;
  text-align: center;
}

.vjs-playback-rate .vjs-menu {
  width: 4em;
  left: 0em;
}

.vjs-error .vjs-error-display .vjs-modal-dialog-content {
  font-size: 1.4em;
  text-align: center;
}

.vjs-error .vjs-error-display:before {
  color: #fff;
  content: "X";
  font-family: Arial, Helvetica, sans-serif;
  font-size: 4em;
  left: 0;
  line-height: 1;
  margin-top: -0.5em;
  position: absolute;
  text-shadow: 0.05em 0.05em 0.1em #000;
  text-align: center;
  top: 50%;
  vertical-align: middle;
  width: 100%;
}

.vjs-loading-spinner {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  opacity: 0.85;
  text-align: left;
  border: 6px solid rgba(43, 51, 63, 0.7);
  box-sizing: border-box;
  background-clip: padding-box;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  visibility: hidden;
}

.vjs-seeking .vjs-loading-spinner,
.vjs-waiting .vjs-loading-spinner {
  display: block;
  -webkit-animation: vjs-spinner-show 0s linear 0.3s forwards;
          animation: vjs-spinner-show 0s linear 0.3s forwards;
}

.vjs-loading-spinner:before,
.vjs-loading-spinner:after {
  content: "";
  position: absolute;
  margin: -6px;
  box-sizing: inherit;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  opacity: 1;
  border: inherit;
  border-color: transparent;
  border-top-color: white;
}

.vjs-seeking .vjs-loading-spinner:before,
.vjs-seeking .vjs-loading-spinner:after,
.vjs-waiting .vjs-loading-spinner:before,
.vjs-waiting .vjs-loading-spinner:after {
  -webkit-animation: vjs-spinner-spin 1.1s cubic-bezier(0.6, 0.2, 0, 0.8) infinite, vjs-spinner-fade 1.1s linear infinite;
  animation: vjs-spinner-spin 1.1s cubic-bezier(0.6, 0.2, 0, 0.8) infinite, vjs-spinner-fade 1.1s linear infinite;
}

.vjs-seeking .vjs-loading-spinner:before,
.vjs-waiting .vjs-loading-spinner:before {
  border-top-color: white;
}

.vjs-seeking .vjs-loading-spinner:after,
.vjs-waiting .vjs-loading-spinner:after {
  border-top-color: white;
  -webkit-animation-delay: 0.44s;
  animation-delay: 0.44s;
}

@keyframes vjs-spinner-show {
  to {
    visibility: visible;
  }
}
@-webkit-keyframes vjs-spinner-show {
  to {
    visibility: visible;
  }
}
@keyframes vjs-spinner-spin {
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes vjs-spinner-spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes vjs-spinner-fade {
  0% {
    border-top-color: #73859f;
  }
  20% {
    border-top-color: #73859f;
  }
  35% {
    border-top-color: white;
  }
  60% {
    border-top-color: #73859f;
  }
  100% {
    border-top-color: #73859f;
  }
}
@-webkit-keyframes vjs-spinner-fade {
  0% {
    border-top-color: #73859f;
  }
  20% {
    border-top-color: #73859f;
  }
  35% {
    border-top-color: white;
  }
  60% {
    border-top-color: #73859f;
  }
  100% {
    border-top-color: #73859f;
  }
}
.vjs-chapters-button .vjs-menu ul {
  width: 24em;
}

.video-js .vjs-subs-caps-button + .vjs-menu .vjs-captions-menu-item .vjs-menu-item-text .vjs-icon-placeholder {
  vertical-align: middle;
  display: inline-block;
  margin-bottom: -0.1em;
}

.video-js .vjs-subs-caps-button + .vjs-menu .vjs-captions-menu-item .vjs-menu-item-text .vjs-icon-placeholder:before {
  font-family: VideoJS;
  content: "";
  font-size: 1.5em;
  line-height: inherit;
}

.video-js .vjs-audio-button + .vjs-menu .vjs-main-desc-menu-item .vjs-menu-item-text .vjs-icon-placeholder {
  vertical-align: middle;
  display: inline-block;
  margin-bottom: -0.1em;
}

.video-js .vjs-audio-button + .vjs-menu .vjs-main-desc-menu-item .vjs-menu-item-text .vjs-icon-placeholder:before {
  font-family: VideoJS;
  content: " ";
  font-size: 1.5em;
  line-height: inherit;
}

.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-current-time,
.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-time-divider,
.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-duration,
.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-remaining-time,
.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-playback-rate,
.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-chapters-button,
.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-descriptions-button,
.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-captions-button,
.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-subtitles-button,
.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-audio-button,
.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-volume-control, .video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-current-time,
.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-time-divider,
.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-duration,
.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-remaining-time,
.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-playback-rate,
.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-chapters-button,
.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-descriptions-button,
.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-captions-button,
.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-subtitles-button,
.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-audio-button,
.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-volume-control, .video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-current-time,
.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-time-divider,
.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-duration,
.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-remaining-time,
.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-playback-rate,
.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-chapters-button,
.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-descriptions-button,
.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-captions-button,
.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-subtitles-button,
.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-audio-button,
.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-volume-control {
  display: none;
}
.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-volume-panel.vjs-volume-panel-horizontal:hover,
.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-volume-panel.vjs-volume-panel-horizontal:active,
.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active, .video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-volume-panel.vjs-volume-panel-horizontal:hover,
.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-volume-panel.vjs-volume-panel-horizontal:active,
.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active, .video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-volume-panel.vjs-volume-panel-horizontal:hover,
.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-volume-panel.vjs-volume-panel-horizontal:active,
.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active {
  width: auto;
  width: initial;
}
.video-js:not(.vjs-fullscreen).vjs-layout-x-small:not(.vjs-liveui) .vjs-subs-caps-button, .video-js:not(.vjs-fullscreen).vjs-layout-x-small:not(.vjs-live) .vjs-subs-caps-button, .video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-subs-caps-button {
  display: none;
}
.video-js:not(.vjs-fullscreen).vjs-layout-x-small.vjs-liveui .vjs-custom-control-spacer, .video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-custom-control-spacer {
  flex: auto;
  display: block;
}
.video-js:not(.vjs-fullscreen).vjs-layout-x-small.vjs-liveui.vjs-no-flex .vjs-custom-control-spacer, .video-js:not(.vjs-fullscreen).vjs-layout-tiny.vjs-no-flex .vjs-custom-control-spacer {
  width: auto;
}
.video-js:not(.vjs-fullscreen).vjs-layout-x-small.vjs-liveui .vjs-progress-control, .video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-progress-control {
  display: none;
}

.vjs-modal-dialog.vjs-text-track-settings {
  background-color: #2B333F;
  background-color: rgba(43, 51, 63, 0.75);
  color: #fff;
  height: 70%;
}

.vjs-text-track-settings .vjs-modal-dialog-content {
  display: table;
}

.vjs-text-track-settings .vjs-track-settings-colors,
.vjs-text-track-settings .vjs-track-settings-font,
.vjs-text-track-settings .vjs-track-settings-controls {
  display: table-cell;
}

.vjs-text-track-settings .vjs-track-settings-controls {
  text-align: right;
  vertical-align: bottom;
}

@supports (display: grid) {
  .vjs-text-track-settings .vjs-modal-dialog-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    padding: 20px 24px 0px 24px;
  }

  .vjs-track-settings-controls .vjs-default-button {
    margin-bottom: 20px;
  }

  .vjs-text-track-settings .vjs-track-settings-controls {
    grid-column: 1/-1;
  }

  .vjs-layout-small .vjs-text-track-settings .vjs-modal-dialog-content,
.vjs-layout-x-small .vjs-text-track-settings .vjs-modal-dialog-content,
.vjs-layout-tiny .vjs-text-track-settings .vjs-modal-dialog-content {
    grid-template-columns: 1fr;
  }
}
.vjs-track-setting > select {
  margin-right: 1em;
  margin-bottom: 0.5em;
}

.vjs-text-track-settings fieldset {
  margin: 5px;
  padding: 3px;
  border: none;
}

.vjs-text-track-settings fieldset span {
  display: inline-block;
}

.vjs-text-track-settings fieldset span > select {
  max-width: 7.3em;
}

.vjs-text-track-settings legend {
  color: #fff;
  margin: 0 0 5px 0;
}

.vjs-text-track-settings .vjs-label {
  position: absolute;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  display: block;
  margin: 0 0 5px 0;
  padding: 0;
  border: 0;
  height: 1px;
  width: 1px;
  overflow: hidden;
}

.vjs-track-settings-controls button:focus,
.vjs-track-settings-controls button:active {
  outline-style: solid;
  outline-width: medium;
  background-image: linear-gradient(0deg, #fff 88%, #73859f 100%);
}

.vjs-track-settings-controls button:hover {
  color: rgba(43, 51, 63, 0.75);
}

.vjs-track-settings-controls button {
  background-color: #fff;
  background-image: linear-gradient(-180deg, #fff 88%, #73859f 100%);
  color: #2B333F;
  cursor: pointer;
  border-radius: 2px;
}

.vjs-track-settings-controls .vjs-default-button {
  margin-right: 1em;
}

@media print {
  .video-js > *:not(.vjs-tech):not(.vjs-poster) {
    visibility: hidden;
  }
}
.vjs-resize-manager {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  z-index: -1000;
}

.js-focus-visible .video-js *:focus:not(.focus-visible) {
  outline: none;
  background: none;
}

.video-js *:focus:not(:focus-visible),
.video-js .vjs-menu *:focus:not(:focus-visible) {
  outline: none;
  background: none;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "mgW8":
/*!*******************************************************************!*\
  !*** ./modules/OpenPgpFilesWebclient/styles/vendors/video-js.css ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "LboF");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "5Hnr");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "shRe");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "3c4z");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "3mzb");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "Hd6Y");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_video_js_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!./video-js.css */ "KAUg");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_video_js_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_video_js_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_video_js_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_video_js_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "NYW5":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:application/font-woff;charset=utf-8;base64,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 ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:application/font-woff;charset=utf-8;base64,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";

/***/ }),

/***/ "gqwj":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23000%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M12%202C6.47%202%202%206.47%202%2012s4.47%2010%2010%2010%2010-4.47%2010-10S17.53%202%2012%202zm5%2013.59L15.59%2017%2012%2013.41%208.41%2017%207%2015.59%2010.59%2012%207%208.41%208.41%207%2012%2010.59%2015.59%207%2017%208.41%2013.41%2012%2017%2015.59z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23000%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M12%202C6.47%202%202%206.47%202%2012s4.47%2010%2010%2010%2010-4.47%2010-10S17.53%202%2012%202zm5%2013.59L15.59%2017%2012%2013.41%208.41%2017%207%2015.59%2010.59%2012%207%208.41%208.41%207%2012%2010.59%2015.59%207%2017%208.41%2013.41%2012%2017%2015.59z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "dg60":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23000000%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M0%200h24v24H0V0z%27%20fill%3D%27none%27%2F%3E%3Cpath%20d%3D%27M20%2012l-1.41-1.41L13%2016.17V4h-2v12.17l-5.58-5.59L4%2012l8%208%208-8z%27%20fill%3D%27%23000000%27%2F%3E%3C%2Fsvg%3E ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23000000%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M0%200h24v24H0V0z%27%20fill%3D%27none%27%2F%3E%3Cpath%20d%3D%27M20%2012l-1.41-1.41L13%2016.17V4h-2v12.17l-5.58-5.59L4%2012l8%208%208-8z%27%20fill%3D%27%23000000%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "PzTA":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23333%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Ccircle%20cx%3D%2712%27%20cy%3D%2712%27%20r%3D%273.2%27%2F%3E%3Cpath%20d%3D%27M9%202L7.17%204H4c-1.1%200-2%20.9-2%202v12c0%201.1.9%202%202%202h16c1.1%200%202-.9%202-2V6c0-1.1-.9-2-2-2h-3.17L15%202H9zm3%2015c-2.76%200-5-2.24-5-5s2.24-5%205-5%205%202.24%205%205-2.24%205-5%205z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23333%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Ccircle%20cx%3D%2712%27%20cy%3D%2712%27%20r%3D%273.2%27%2F%3E%3Cpath%20d%3D%27M9%202L7.17%204H4c-1.1%200-2%20.9-2%202v12c0%201.1.9%202%202%202h16c1.1%200%202-.9%202-2V6c0-1.1-.9-2-2-2h-3.17L15%202H9zm3%2015c-2.76%200-5-2.24-5-5s2.24-5%205-5%205%202.24%205%205-2.24%205-5%205z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "3xWu":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23FFFFFF%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M15.5%2014h-.79l-.28-.27C15.41%2012.59%2016%2011.11%2016%209.5%2016%205.91%2013.09%203%209.5%203S3%205.91%203%209.5%205.91%2016%209.5%2016c1.61%200%203.09-.59%204.23-1.57l.27.28v.79l5%204.99L20.49%2019l-4.99-5zm-6%200C7.01%2014%205%2011.99%205%209.5S7.01%205%209.5%205%2014%207.01%2014%209.5%2011.99%2014%209.5%2014z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23FFFFFF%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M15.5%2014h-.79l-.28-.27C15.41%2012.59%2016%2011.11%2016%209.5%2016%205.91%2013.09%203%209.5%203S3%205.91%203%209.5%205.91%2016%209.5%2016c1.61%200%203.09-.59%204.23-1.57l.27.28v.79l5%204.99L20.49%2019l-4.99-5zm-6%200C7.01%2014%205%2011.99%205%209.5S7.01%205%209.5%205%2014%207.01%2014%209.5%2011.99%2014%209.5%2014z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "neWK":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23FFFFFF%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M19%2013h-6v6h-2v-6H5v-2h6V5h2v6h6v2z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23FFFFFF%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M19%2013h-6v6h-2v-6H5v-2h6V5h2v6h6v2z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "tQub":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23FFFFFF%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23FFFFFF%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "plMv":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23fff%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23fff%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "SSgV":
/*!********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%270%200%2060%20120%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27m60%2061.5-38.25%2038.25-9.75-9.75%2029.25-28.5-29.25-28.5%209.75-9.75z%27%20fill%3D%27%23c7c7cc%27%2F%3E%3C%2Fsvg%3E ***!
  \********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%270%200%2060%20120%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27m60%2061.5-38.25%2038.25-9.75-9.75%2029.25-28.5-29.25-28.5%209.75-9.75z%27%20fill%3D%27%23c7c7cc%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "rtTF":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%270%200%2060%20120%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27m60%2061.5-38.25%2038.25-9.75-9.75%2029.25-28.5-29.25-28.5%209.75-9.75z%27%20transform%3D%27translate%28115%2C%2030%29%20rotate%2890%29%27%20fill%3D%27%23c7c7cc%27%2F%3E%3C%2Fsvg%3E ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%270%200%2060%20120%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27m60%2061.5-38.25%2038.25-9.75-9.75%2029.25-28.5-29.25-28.5%209.75-9.75z%27%20transform%3D%27translate%28115%2C%2030%29%20rotate%2890%29%27%20fill%3D%27%23c7c7cc%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "psbF":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27%23ffffff%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M10%206L8.59%207.41%2013.17%2012l-4.58%204.59L10%2018l6-6z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27%23ffffff%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M10%206L8.59%207.41%2013.17%2012l-4.58%204.59L10%2018l6-6z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "J4mH":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27%23ffffff%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M15.41%207.41L14%206l-6%206%206%206%201.41-1.41L10.83%2012z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27%23ffffff%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M15.41%207.41L14%206l-6%206%206%206%201.41-1.41L10.83%2012z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "oAr8":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27%23ffffff%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M9%2016.17L4.83%2012l-1.42%201.41L9%2019%2021%207l-1.41-1.41z%27%2F%3E%3C%2Fsvg%3E ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27%23ffffff%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M9%2016.17L4.83%2012l-1.42%201.41L9%2019%2021%207l-1.41-1.41z%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "zoZ3":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%27-80%204%2024%2024%27%3E%3Cpath%20d%3D%27M-69%2C8v12.2l-5.6-5.6L-76%2C16l8%2C8l8-8l-1.4-1.4l-5.6%2C5.6V8H-69z%27%20fill%3D%27%238c8c8c%27%2F%3E%3C%2Fsvg%3E ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%27-80%204%2024%2024%27%3E%3Cpath%20d%3D%27M-69%2C8v12.2l-5.6-5.6L-76%2C16l8%2C8l8-8l-1.4-1.4l-5.6%2C5.6V8H-69z%27%20fill%3D%27%238c8c8c%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "Qp7Q":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2018%2012%27%20fill%3D%27%23c7c7cc%27%3E%3Cpath%20d%3D%27M0%2C2V0h22v2H0z%27%2F%3E%3Cpath%20d%3D%27M0%2C7V5h22v2H0z%27%2F%3E%3Cpath%20d%3D%27M0%2C12v-2h22v2H0z%27%2F%3E%3C%2Fsvg%3E ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2018%2012%27%20fill%3D%27%23c7c7cc%27%3E%3Cpath%20d%3D%27M0%2C2V0h22v2H0z%27%2F%3E%3Cpath%20d%3D%27M0%2C7V5h22v2H0z%27%2F%3E%3Cpath%20d%3D%27M0%2C12v-2h22v2H0z%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "8j/K":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2027%2044%27%3E%3Cpath%20d%3D%27M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z%27%20fill%3D%27%23007aff%27%2F%3E%3C%2Fsvg%3E ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2027%2044%27%3E%3Cpath%20d%3D%27M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z%27%20fill%3D%27%23007aff%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "X9V4":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2027%2044%27%3E%3Cpath%20d%3D%27M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z%27%20fill%3D%27%23007aff%27%2F%3E%3C%2Fsvg%3E ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2027%2044%27%3E%3Cpath%20d%3D%27M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z%27%20fill%3D%27%23007aff%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "qm6x":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M12%204l-1.41%201.41L16.17%2011H4v2h12.17l-5.58%205.59L12%2020l8-8z%27%20fill%3D%27%23ffffff%27%2F%3E%3C%2Fsvg%3E ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M12%204l-1.41%201.41L16.17%2011H4v2h12.17l-5.58%205.59L12%2020l8-8z%27%20fill%3D%27%23ffffff%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "IgaC":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M20%2011H7.83l5.59-5.59L12%204l-8%208%208%208%201.41-1.41L7.83%2013H20v-2z%27%20fill%3D%27%23ffffff%27%2F%3E%3C%2Fsvg%3E ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M20%2011H7.83l5.59-5.59L12%204l-8%208%208%208%201.41-1.41L7.83%2013H20v-2z%27%20fill%3D%27%23ffffff%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "+g/t":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M3%2018h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z%27%20fill%3D%27%23ffffff%27%2F%3E%3C%2Fsvg%3E ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M3%2018h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z%27%20fill%3D%27%23ffffff%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "NKqy":
/*!******************************!*\
  !*** min-document (ignored) ***!
  \******************************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);