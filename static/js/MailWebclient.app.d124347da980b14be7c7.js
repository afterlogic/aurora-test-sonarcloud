(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[29],{

/***/ "171C":
/*!******************************************************!*\
  !*** ./modules/CoreWebclient/js/utils/Validation.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
	
	ValidationUtils = {}
;

ValidationUtils.checkIfFieldsEmpty = function (aRequiredFields, sErrorText)
{
	var koFirstEmptyField = _.find(aRequiredFields, function (koField) {
		return koField() === '';
	});
	
	if (koFirstEmptyField)
	{
		if (sErrorText)
		{
			Screens.showError(sErrorText);
		}
		koFirstEmptyField.focused(true);
		return false;
	}
	
	return true;
};

ValidationUtils.checkPassword = function (sNewPass, sConfirmPassword)
{
	var
		TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
		Settings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV"),
		bPasswordValid = false
	;
	
	if (sConfirmPassword !== sNewPass)
	{
		Screens.showError(TextUtils.i18n('COREWEBCLIENT/ERROR_PASSWORDS_DO_NOT_MATCH'));
	}
	else if (Settings.PasswordMinLength > 0 && sNewPass.length < Settings.PasswordMinLength) 
	{ 
		Screens.showError(TextUtils.i18n('COREWEBCLIENT/ERROR_PASSWORD_TOO_SHORT').replace('%N%', Settings.PasswordMinLength));
	}
	else if (Settings.PasswordMustBeComplex && (!sNewPass.match(/([0-9])/) || !sNewPass.match(/([!,%,&,@,#,$,^,*,?,_,~])/)))
	{
		Screens.showError(TextUtils.i18n('COREWEBCLIENT/ERROR_PASSWORD_TOO_SIMPLE'));
	}
	else
	{
		bPasswordValid = true;
	}
	
	return bPasswordValid;
};

module.exports = ValidationUtils;


/***/ }),

/***/ "ZVZ+":
/*!****************************************************************!*\
  !*** ./modules/MailWebclient/js/koBindingSearchHighlighter.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	ko = __webpack_require__(/*! knockout */ "p09A")
;

function getCaretOffset(oElement)
{
    var
        oSel = null,
        oRange = {},
        oPreSelectionRange = {},
        iStart = 0
    ;

    if (window.getSelection && document.createRange)
    {
        oSel = window.getSelection();
        if (oSel.rangeCount > 0)
        {
            oRange = oSel.getRangeAt(0);
            oPreSelectionRange = oRange.cloneRange();
            oPreSelectionRange.selectNodeContents(oElement);
            oPreSelectionRange.setEnd(oRange.startContainer, oRange.startOffset);
            iStart = oPreSelectionRange.toString().length;
			if ($(oElement).html().length < iStart)
			{
				iStart = 0;
			}
        }
    }
    else if (document.selection && document.body.createTextRange)
    {
        oRange = document.selection.createRange();
        oPreSelectionRange = document.body.createTextRange();
        oPreSelectionRange.moveToElementText(oElement);
        if (typeof(oPreSelectionRange.setEndPoint) === 'function')
        {
            oPreSelectionRange.setEndPoint('EndToStart', oRange);
        }
        iStart = oPreSelectionRange.text.length;
    }

    return iStart;
}

function setCursor(oElement, iCaretPos)
{
	var
		range,
		selection,
		textRange
	;
	
	if (!oElement)
	{
		return false;
	}
	else if(document.createRange)
	{
		range = document.createRange();
		range.selectNodeContents(oElement);
		range.setStart(oElement, iCaretPos);
		range.setEnd(oElement, iCaretPos);
		selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
	}
	else if(oElement.createTextRange)
	{
		textRange = oElement.createTextRange();
		textRange.collapse(true);
		textRange.moveEnd(iCaretPos);
		textRange.moveStart(iCaretPos);
		textRange.select();
		return true;
	}
	else if(oElement.setSelectionRange)
	{
		oElement.setSelectionRange(iCaretPos, iCaretPos);
		return true;
	}
	return false;
}


ko.bindingHandlers.highlighter = {
	'init': function (oElement, fValueAccessor, fAllBindingsAccessor, oViewModel, bindingContext) {

		var
			jqEl = $(oElement),
			oOptions = fValueAccessor(),
			oValueObserver = oOptions.valueObserver ? oOptions.valueObserver : null,
			oHighlighterValueObserver = oOptions.highlighterValueObserver ? oOptions.highlighterValueObserver : null,
			oHighlightTrigger = oOptions.highlightTrigger ? oOptions.highlightTrigger : null,
			aHighlightWords = ['from:', 'to:', 'subject:', 'text:', 'email:', 'has:', 'date:', 'text:', 'body:', 'folders:'],
			rPattern = (function () {
				var sPatt = '';
				$.each(aHighlightWords, function(i, oEl) {
					sPatt = (!i) ? (sPatt + '\\b' + oEl) : (sPatt + '|\\b' + oEl);
				});

				return new RegExp('(' + sPatt + ')', 'g');
			}()),
			fClear = function (sStr) {
				return sStr.replace(/\xC2\xA0/g, ' ').replace(/\xA0/g, ' ').replace(/[\s]+/g, ' ');
			},
			iPrevKeyCode = -1,
			sUserLanguage = window.navigator.language || window.navigator.userLanguage,
			aTabooLang = ['zh', 'zh-TW', 'zh-CN', 'zh-HK', 'zh-SG', 'zh-MO', 'ja', 'ja-JP', 'ko', 'ko-KR', 'vi', 'vi-VN', 'th', 'th-TH'],// , 'ru', 'ru-RU'
			bHighlight = !_.include(aTabooLang, sUserLanguage)
		;

		$(oElement)
			.on('keydown', function (oEvent) {
				return oEvent.keyCode !== Enums.Key.Enter;
			})
			.on('keyup', function (oEvent) {
				var
					aMoveKeys = [Enums.Key.Left, Enums.Key.Right, Enums.Key.Home, Enums.Key.End],
					bMoveKeys = -1 !== $.inArray(oEvent.keyCode, aMoveKeys)
				;
				
				if (!(
						oEvent.keyCode === Enums.Key.Shift					||
						oEvent.keyCode === Enums.Key.Alt					||
						oEvent.keyCode === Enums.Key.Ctrl					||
						// for international english -------------------------
						oEvent.keyCode === Enums.Key.Dash					||
						oEvent.keyCode === Enums.Key.Apostrophe				||
						oEvent.keyCode === Enums.Key.Six && oEvent.shiftKey	||
						// ---------------------------------------------------
						bMoveKeys											||
						((oEvent.ctrlKey || iPrevKeyCode === Enums.Key.Ctrl) && oEvent.keyCode === Enums.Key.a)
					))
				{
					oValueObserver(fClear(jqEl.text()));
					highlight(false);
				}
				iPrevKeyCode = oEvent.keyCode;
				return true;
			})
			.on('paste', function (oEvent) {
				
				if (document.queryCommandSupported('insertText'))
				{
					// cancel paste
					oEvent.preventDefault();

					// get text representation of clipboard
					var sText = '';
					if (oEvent.clipboardData || oEvent.originalEvent.clipboardData)
					{
						sText = (oEvent.originalEvent || oEvent).clipboardData.getData('text/plain');
					}
					else if (window.clipboardData)
					{
						sText = window.clipboardData.getData('Text');
					}
					
					// insert text manually
					document.execCommand('insertText', false, sText);
					
					// insertText command doesn't work in IE
					// paste command causes looping in IE
					// so there is no clearing text in IE for now
				}
				
				setTimeout(function () {
					oValueObserver(fClear(jqEl.text()));
					highlight(false);
				}, 0);
			});

		// highlight on init
		setTimeout(function () {
			highlight(true);
		}, 0);

		function highlight(bNotRestoreSel) {
			if(bHighlight)
			{
				var
					iCaretPos = 0,
					sContent = jqEl.text(),
					aContent = sContent.split(rPattern),
					aDividedContent = [],
					sReplaceWith = '<span class="search_highlight"' + '>$&</span>'
				;
				_.each(aContent, function (sEl) {
					var aEl = sEl.split('');
					if (_.any(aHighlightWords, function (oAnyEl) {return oAnyEl === sEl;}))
					{
						_.each(aEl, function (sElem) {
							aDividedContent.push($(sElem.replace(/(.)/, sReplaceWith)));
						});
					}
					else
					{
						_.each(aEl, function(sElem) {
							if(sElem === ' ')
							{
								// space fix for firefox
								aDividedContent.push(document.createTextNode('\u00A0'));
							}
							else
							{
								aDividedContent.push(document.createTextNode(sElem));
							}
						});
					}
				});
				
				if (!jqEl.is(':focus'))
				{
					// Don't set focus if the field wasn't focused before.
					// It may affect on viewing messages in the list using the up and down buttons.
					jqEl.empty().append(aDividedContent);
				}
				else
				{
					iCaretPos = getCaretOffset(oElement);
					jqEl.empty().append(aDividedContent);
					setCursor(oElement, iCaretPos);
				}
			}
		}

		oHighlightTrigger.notifySubscribers();

		oHighlightTrigger.subscribe(function (bNotRestoreSel) {
			setTimeout(function () {
				highlight(!!bNotRestoreSel);
			}, 0);
		}, this);

		oHighlighterValueObserver.subscribe(function () {
			var
				sElemText = jqEl.text(),
				sValue = oValueObserver()
			;
			if (sElemText.replace('\u00A0', ' ') !== sValue.replace('\u00A0', ' '))
			{
				jqEl.text(sValue);
			}
		}, this);
	}
};



/***/ }),

/***/ "+Dc/":
/*!*********************************************!*\
  !*** ./modules/MailWebclient/js/manager.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = function (oAppData) {
	__webpack_require__(/*! modules/MailWebclient/js/enums.js */ "T+dd");

	var
		_ = __webpack_require__(/*! underscore */ "C3HO"),
		ko = __webpack_require__(/*! knockout */ "p09A"),

		App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
		ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),

		Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy"),

		AccountList = null,
		ComposeView = null,

		HeaderItemView = null
	;

	Settings.init(oAppData);

	if (!ModulesManager.isModuleAvailable(Settings.ServerModuleName))
	{
		return null;
	}

	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn");

	if (App.isUserNormalOrTenant())
	{
		var Cache = __webpack_require__(/*! modules/MailWebclient/js/Cache.js */ "F0Fd");
		Cache.init();

		if (App.isNewTab())
		{
			var GetComposeView = function() {
				if (ComposeView === null)
				{
					var CComposeView = __webpack_require__(/*! modules/MailWebclient/js/views/CComposeView.js */ "aB/g");
					ComposeView = new CComposeView();
				}
				return ComposeView;
			};

			return {
				start: function () {
					__webpack_require__(/*! modules/MailWebclient/js/koBindings.js */ "UJpV");
				},
				getScreens: function () {
					var oScreens = {};
					oScreens[Settings.HashModuleName + '-view'] = function () {
						return __webpack_require__(/*! modules/MailWebclient/js/views/MessagePaneView.js */ "kb14");
					};
					oScreens[Settings.HashModuleName + '-compose'] = function () {
						return GetComposeView();
					};
					return oScreens;
				},
				registerComposeToolbarController: function (oController) {
					var ComposeView = GetComposeView();
					ComposeView.registerToolbarController(oController);
				},
				registerComposeMessageRowController: function (oController) {
					var ComposeView = GetComposeView();
					ComposeView.registerMessageRowController(oController);
				},
				registerComposeUploadAttachmentsController: function (controller) {
					const ComposeView = GetComposeView();
					ComposeView.registerUploadAttachmentsController(controller);
				},
				getComposeMessageWithData: function () {
					var
						bAllowSendMail = true,
						ComposeUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Compose.js */ "B5X4")
					;
					return bAllowSendMail ? ComposeUtils.composeMessageWithData : false;
				},
				getComposeMessageToAddresses: function () {
					var
						bAllowSendMail = true,
						ComposeUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Compose.js */ "B5X4")
					;
					return bAllowSendMail ? ComposeUtils.composeMessageToAddresses : false;
				},
				getComposeMessageWithAttachments: function () {
					var
						bAllowSendMail = true,
						ComposeUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Compose.js */ "B5X4")
					;
					return bAllowSendMail ? ComposeUtils.composeMessageWithAttachments : false;
				},
				getSearchMessagesInCurrentFolder: function () {
					var MainTab = window.opener && window.opener.MainTabMailMethods;
					return MainTab ? _.bind(MainTab.searchMessagesInCurrentFolder, MainTab) : false;
				},
				getCurrentMessage: function () {
					return Cache.currentMessage();
				},
				getCurrentFolderList: function () {
					return Cache.folderList();
				},
				syncFolders: function () {
					return Cache.getFolderList(Cache.currentAccountId());
				},
				removeMessageFromCurrentList: function (iAccountId, sFolder, sUid) {
					return Cache.removeMessageFromCurrentList(iAccountId, sFolder, sUid);
				}
			};
		}
		else
		{
			var oMethods = {
				enableModule: ko.observable(Settings.AllowAddAccounts || AccountList.hasAccount() ),
				getComposeMessageToAddresses: function () {
					var
						bAllowSendMail = true,
						ComposeUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Compose.js */ "B5X4")
					;
					return bAllowSendMail ? ComposeUtils.composeMessageToAddresses : false;
				},
				getComposeMessageWithData: function () {
					var
						bAllowSendMail = true,
						ComposeUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Compose.js */ "B5X4")
					;
					return bAllowSendMail ? ComposeUtils.composeMessageWithData : false;
				},
				getComposeMessageWithAttachments: function () {
					var
						bAllowSendMail = true,
						ComposeUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Compose.js */ "B5X4")
					;
					return bAllowSendMail ? ComposeUtils.composeMessageWithAttachments : false;
				},
				getPrefetcher: function () {
					return __webpack_require__(/*! modules/MailWebclient/js/Prefetcher.js */ "uC+w");
				},
				registerComposeToolbarController: function (oController) {
					var ComposePopup = __webpack_require__(/*! modules/MailWebclient/js/popups/ComposePopup.js */ "/N4H");
					ComposePopup.registerToolbarController(oController);
				},
				registerComposeMessageRowController: function (oController) {
					var ComposePopup = __webpack_require__(/*! modules/MailWebclient/js/popups/ComposePopup.js */ "/N4H");
					ComposePopup.registerMessageRowController(oController);
				},
				registerComposeUploadAttachmentsController: function (controller) {
					const ComposePopup = __webpack_require__(/*! modules/MailWebclient/js/popups/ComposePopup.js */ "/N4H");
					ComposePopup.registerUploadAttachmentsController(controller);
				},
				getSearchMessagesInInbox: function () {
					return _.bind(Cache.searchMessagesInInbox, Cache);
				},
				getFolderHash: function (sFolder) {
					return Cache.getFolderHash(sFolder);
				},
				getSearchMessagesInCurrentFolder: function () {
					return _.bind(Cache.searchMessagesInCurrentFolder, Cache);
				},
				getMessage: function (sFullName, sUid, fResponseHandler) {
					return Cache.getMessage(Cache.currentAccountId(), sFullName, sUid, fResponseHandler, Cache);
				},
				getCurrentMessage: function () {
					return Cache.currentMessage();
				},
				getCurrentFolderList: function () {
					return Cache.folderList();
				},
				syncFolders: function () {
					return Cache.getFolderList(Cache.currentAccountId());
				},
				removeMessageFromCurrentList: function (iAccountId, sFolder, sUid) {
					return Cache.removeMessageFromCurrentList(iAccountId, sFolder, sUid);
				},
				deleteMessages: function (iAccountId, sFolderFullName, aUids) {
					var oFolder = Cache.getFolderByFullName(iAccountId, sFolderFullName);
					Cache.deleteMessagesFromFolder(oFolder, aUids);
				},
				getAllAccountsFullEmails: function () {
					return AccountList.getAllFullEmails();
				},
				getAccountList: function () {
					return AccountList;
				},
				getMailCache: function () {
					return Cache;
				},
				setCustomRouting: function (sFolder, iPage, sUid, sSearch, sFilters, sCustom) {
					var
						Routing = __webpack_require__(/*! modules/CoreWebclient/js/Routing.js */ "W66n"),
						LinksUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Links.js */ "CPab")
					;
					Routing.setHash(LinksUtils.getMailbox(sFolder, iPage, sUid, sSearch, sFilters, Settings.MessagesSortBy.DefaultSortBy, Settings.MessagesSortBy.DefaultSortOrder, sCustom));
				}
			};

			if (!App.isMobile())
			{
				oMethods = _.extend(oMethods, {
					start: function (ModulesManager) {
						var
							TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
							Browser = __webpack_require__(/*! modules/CoreWebclient/js/Browser.js */ "dfnr"),
							MailUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Mail.js */ "WOsA")
						;

						__webpack_require__(/*! modules/MailWebclient/js/koBindings.js */ "UJpV");
						__webpack_require__(/*! modules/MailWebclient/js/koBindingSearchHighlighter.js */ "ZVZ+");

						if (Settings.AllowAppRegisterMailto)
						{
							MailUtils.registerMailto(Browser.firefox);
						}

						if (Settings.AllowAddAccounts || AccountList.hasAccount())
						{
							ModulesManager.run('SettingsWebclient', 'registerSettingsTab', [
								function () {
									return __webpack_require__(/*! modules/MailWebclient/js/views/settings/MailSettingsFormView.js */ "SpBH");
								},
								Settings.HashModuleName,
								TextUtils.i18n('MAILWEBCLIENT/LABEL_SETTINGS_TAB')
							]);

							var sTabName = Settings.AllowMultiAccounts ? TextUtils.i18n('MAILWEBCLIENT/LABEL_ACCOUNTS_SETTINGS_TAB') : TextUtils.i18n('MAILWEBCLIENT/LABEL_ACCOUNT_SETTINGS_TAB');
							ModulesManager.run('SettingsWebclient', 'registerSettingsTab', [
								function () {
									return __webpack_require__(/*! modules/MailWebclient/js/views/settings/AccountsSettingsPaneView.js */ "r9cz");
								},
								Settings.HashModuleName + '-accounts',
								sTabName
							]);
						}

						ko.computed(function () {
							var
								aAuthAcconts = _.filter(AccountList.collection(), function (oAccount) {
									return oAccount.useToAuthorize();
								}),
								aAuthAccountsEmails = _.map(aAuthAcconts, function (oAccount) {
									return oAccount.email();
								})
							;
							Settings.userMailAccountsCount(aAuthAcconts.length);
							Settings.mailAccountsEmails(aAuthAccountsEmails);
						}, this);
					},
					getScreens: function () {
						var oScreens = {};
						oScreens[Settings.HashModuleName] = function () {
							var CMailView = __webpack_require__(/*! modules/MailWebclient/js/views/CMailView.js */ "fveu");
							return new CMailView();
						};
						return oScreens;
					},
					getHeaderItem: function () {
						if (HeaderItemView === null && Settings.AllowOtherModulesToReplaceTabsbarHeader) {
							let params = {};
							App.broadcastEvent('MailWebclient::GetHeaderItemView', params);
							HeaderItemView = params.HeaderItemView || null;
						}

						if (HeaderItemView === null) {
							HeaderItemView = __webpack_require__(/*! modules/MailWebclient/js/views/HeaderItemView.js */ "Uzkn");
						}

						return {
							item: HeaderItemView,
							name: Settings.HashModuleName
						};
					},
					getMobileSyncSettingsView: function () {
						return __webpack_require__(/*! modules/MailWebclient/js/views/DefaultAccountHostsSettingsView.js */ "fSBA");
					}
				});
			}

			return oMethods;
		}
	}

	return null;
};


/***/ }),

/***/ "9BUb":
/*!****************************************************************!*\
  !*** ./modules/MailWebclient/js/models/CAutoresponderModel.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	moment = __webpack_require__(/*! moment */ "sdEb");
;

/**
 * @constructor
 */
function CAutoresponderModel()
{
	this.iAccountId = 0;

	this.enable = false;
	this.subject = '';
	this.message = '';
	this.scheduled = false;
	this.start = null;
	this.end = null;
}

/**
 * @param {number} iAccountId
 * @param {Object} oData
 */
CAutoresponderModel.prototype.parse = function (iAccountId, oData)
{
	this.iAccountId = iAccountId;

	this.enable = !!oData.Enable;
	this.subject = Types.pString(oData.Subject);
	this.message = Types.pString(oData.Message);
	
	this.scheduled = !!oData.Scheduled;
	// this.start = moment.unix(oData.Start);
	// if (oData.End != null) {
	// 	this.end = moment.unix(oData.End);
	// }
	if (oData.Start) {
		this.start = Types.pInt(oData.Start);
	}
	if (oData.End) {
		this.end = Types.pInt(oData.End);
	}
};

module.exports = CAutoresponderModel;

/***/ }),

/***/ "lHET":
/*!**********************************************************!*\
  !*** ./modules/MailWebclient/js/models/CForwardModel.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L")
;

/**
 * @constructor
 */
function CForwardModel()
{
	this.iAccountId = 0;

	this.enable = false;
	this.keepcopy = false;
	this.email = '';
}

/**
 * @param {number} iAccountId
 * @param {Object} oData
 */
CForwardModel.prototype.parse = function (iAccountId, oData)
{
	this.iAccountId = iAccountId;

	this.enable = !!oData.Enable;
	this.keepcopy = !!oData.KeepMessageCopy;
	this.email = Types.pString(oData.Email);
};

module.exports = CForwardModel;

/***/ }),

/***/ "mJTN":
/*!***************************************************************!*\
  !*** ./modules/MailWebclient/js/popups/CreateAccountPopup.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	ValidationUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Validation.js */ "171C"),
	
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
	
	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	Ajax = __webpack_require__(/*! modules/MailWebclient/js/Ajax.js */ "QaEg"),
	CAccountModel = __webpack_require__(/*! modules/MailWebclient/js/models/CAccountModel.js */ "FSu3"),
	
	CServerPairPropertiesView = __webpack_require__(/*! modules/MailWebclient/js/views/settings/CServerPairPropertiesView.js */ "Z8ia")
;

/**
 * @constructor
 */
function CCreateAccountPopup()
{
	CAbstractPopup.call(this);
	
	this.loading = ko.observable(false);

	this.friendlyName = ko.observable('');
	this.email = ko.observable('');
	this.email.focused = ko.observable(false);
	this.incomingLogin = ko.observable('');
	this.incomingLogin.focused = ko.observable(false);
	this.incomingPassword = ko.observable('');
	this.incomingPassword.focused = ko.observable(false);
	
	this.oServerPairPropertiesView = new CServerPairPropertiesView('acc_create');
	
	this.email.focused.subscribe(function () {
		if (!this.email.focused() && $.trim(this.incomingLogin()) === '')
		{
			this.incomingLogin(this.email());
		}
	}, this);
	
	this.aRequiredFields = [this.email, this.incomingLogin, this.incomingPassword].concat(this.oServerPairPropertiesView.aRequiredFields);
}

_.extendOwn(CCreateAccountPopup.prototype, CAbstractPopup.prototype);

CCreateAccountPopup.prototype.PopupTemplate = 'MailWebclient_Settings_CreateAccountPopup';

CCreateAccountPopup.prototype.init = function ()
{
	this.friendlyName('');
	this.email('');
	this.incomingLogin('');
	this.incomingLogin.focused(false);
	this.incomingPassword('');

	this.oServerPairPropertiesView.fullInit();
};

/**
 * @param {Function=} fCallback
 */
CCreateAccountPopup.prototype.onOpen = function (fCallback, sFriendlyName, sEmail, sIncomingPassword)
{
	this.fCallback = fCallback;
	
	this.init();
	this.friendlyName(sFriendlyName);
	this.email(sEmail);
	this.incomingLogin(sEmail);
	this.incomingPassword(sIncomingPassword);
	this.focusFieldToEdit();
};

CCreateAccountPopup.prototype.focusFieldToEdit = function ()
{
	var koFirstEmptyField = _.find(this.aRequiredFields, function (koField) {
		return koField() === '';
	});
	
	if (koFirstEmptyField)
	{
		koFirstEmptyField.focused(true);
	}
	else if (this.aRequiredFields.length > 0)
	{
		this.aRequiredFields[0].focused(true);
	}
};

CCreateAccountPopup.prototype.onClose = function ()
{
	this.init();
};

CCreateAccountPopup.prototype.save = function ()
{
	if (ValidationUtils.checkIfFieldsEmpty(this.aRequiredFields, TextUtils.i18n('COREWEBCLIENT/ERROR_REQUIRED_FIELDS_EMPTY')))
	{
		var
			oParameters = {
				'FriendlyName': this.friendlyName(),
				'Email': $.trim(this.email()),
				'IncomingLogin': $.trim(this.incomingLogin()),
				'IncomingPassword': $.trim(this.incomingPassword()),
				'Server': this.oServerPairPropertiesView.getParametersForSave()
			}
		;

		this.loading(true);

		Ajax.send('CreateAccount', oParameters, this.onAccountCreateResponse, this);
	}
	else
	{
		this.loading(false);
	}
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CCreateAccountPopup.prototype.onAccountCreateResponse = function (oResponse, oRequest)
{
	this.loading(false);

	if (!oResponse.Result)
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('MAILWEBCLIENT/ERROR_CREATE_ACCOUNT'));
	}
	else
	{
		var
			iAccountId = Types.pInt(oResponse.Result.AccountID),
			oAccount = new CAccountModel(oResponse.Result)
		;
		
		AccountList.addAccount(oAccount);
		AccountList.populateIdentities();
		AccountList.changeEditedAccount(iAccountId);
		if (AccountList.collection().length === 1)
		{
			AccountList.changeCurrentAccount(iAccountId);
		}
		
		if (this.fCallback)
		{
			this.fCallback(iAccountId);
		}
		
		this.closePopup();
	}
};

module.exports = new CCreateAccountPopup();


/***/ }),

/***/ "/nhf":
/*!************************************************************************!*\
  !*** ./modules/MailWebclient/js/popups/CreateAccountShortFormPopup.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	ko = __webpack_require__(/*! knockout */ "p09A"),

	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	ValidationUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Validation.js */ "171C"),
	UrlUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Url.js */ "Tt1R"),

	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
	CoreAjax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
	CreateAccountPopup = __webpack_require__(/*! modules/MailWebclient/js/popups/CreateAccountPopup.js */ "mJTN"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	WindowOpener = __webpack_require__(/*! modules/CoreWebclient/js/WindowOpener.js */ "mGms"),

	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	Ajax = __webpack_require__(/*! modules/MailWebclient/js/Ajax.js */ "QaEg"),
	CAccountModel = __webpack_require__(/*! modules/MailWebclient/js/models/CAccountModel.js */ "FSu3"),
	CServerModel = __webpack_require__(/*! modules/MailWebclient/js/models/CServerModel.js */ "Oh7n")
;

/**
 * @constructor
 */
function CreateAccountShortFormPopup()
{
	CAbstractPopup.call(this);

	this.oauthOptions = ko.observableArray([]);
	this.oauthOptionsVisible = ko.observable(false);
	this.bOAuthCallbackExecuted = false;

	this.loading = ko.observable(false);

	this.friendlyName = ko.observable('');
	this.email = ko.observable('');
	this.email.focused = ko.observable(false);
	this.password = ko.observable('');
	this.password.focused = ko.observable(false);
	this.aRequiredFields = [this.email, this.password];
}

_.extendOwn(CreateAccountShortFormPopup.prototype, CAbstractPopup.prototype);

CreateAccountShortFormPopup.prototype.PopupTemplate = 'MailWebclient_Settings_CreateAccountShortFormPopup';

CreateAccountShortFormPopup.prototype.init = function ()
{
	this.friendlyName('');
	this.email('');
	this.password('');
};

/**
 * @param {Function=} fCallback
 */
CreateAccountShortFormPopup.prototype.onOpen = function (aOAuthOptions, fCallback)
{
	this.oauthOptions(aOAuthOptions);
	this.oauthOptionsVisible(this.oauthOptions().length > 0);
	this.fCallback = fCallback;

	this.init();
	
	this.focusFieldToEdit();
};

CreateAccountShortFormPopup.prototype.selectAuthOption = function (sType)
{
	if (sType === '')
	{
		this.oauthOptionsVisible(false);
	}
	else
	{
		this.getOAuthData(sType);
	}
};

CreateAccountShortFormPopup.prototype.focusFieldToEdit = function ()
{
	var koFirstEmptyField = _.find(this.aRequiredFields, function (koField) {
		return koField() === '';
	});
	
	if (koFirstEmptyField)
	{
		koFirstEmptyField.focused(true);
	}
	else if (this.aRequiredFields.length > 0)
	{
		this.aRequiredFields[0].focused(true);
	}
};

CreateAccountShortFormPopup.prototype.onClose = function ()
{
	this.init();
};

CreateAccountShortFormPopup.prototype.getOAuthData = function (sType)
{
	var
		sScopes = $.cookie('oauth-scopes'),
		aScopes = !_.isUndefined(sScopes) ? sScopes.split('|') : []
	;
	aScopes.push('mail');
	aScopes = _.unique(aScopes);
	$.removeCookie('oauth-scopes');
	$.cookie('oauth-scopes', aScopes.join('|'));

	this.bOAuthCallbackExecuted = false;
	window.gmailConnectCallback = function (oResult, sErrorCode, sModule) {
		this.bOAuthCallbackExecuted = true;
		if (!oResult)
		{
			Api.showErrorByCode({'ErrorCode': Types.pInt(sErrorCode), 'Module': sModule}, '', true);
		}
		else
		{
			CoreAjax.send('OAuthIntegratorWebclient', 'CreateMailAccount', { 'OAuthAccountData': oResult }, this.onAccountCreateResponse, this);
		}
	}.bind(this);

	var
		oWin = WindowOpener.open(UrlUtils.getAppPath() + '?oauth=' + sType + '-connect', 'OAuth'),
		iIntervalId = setInterval(function() {
			if (oWin.closed)
			{
				clearInterval(iIntervalId);
				if (!this.bOAuthCallbackExecuted)
				{
					window.location.reload();
				}
			}
		}.bind(this), 1000)
	;
};

CreateAccountShortFormPopup.prototype.save = function ()
{
	if (ValidationUtils.checkIfFieldsEmpty(this.aRequiredFields, TextUtils.i18n('COREWEBCLIENT/ERROR_REQUIRED_FIELDS_EMPTY')))
	{
		var
			oParameters = {
				'Domain': $.trim(this.email()).split('@')[1],
				'AllowWildcardDomain': true
			}
		;

		this.loading(true);

		Ajax.send('GetMailServerByDomain', oParameters, this.onGetMailServerByDomain, this);
	}
	else
	{
		this.loading(false);
	}
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CreateAccountShortFormPopup.prototype.onGetMailServerByDomain = function (oResponse, oRequest)
{
	var oServer = null;

	if (oResponse.Result
		&& typeof oResponse.Result.Server !== 'undefined'
		&& typeof oResponse.Result.FoundWithWildcard !== 'undefined'
	)
	{
		if (oResponse.Result.FoundWithWildcard)
		{
			var
				sNewAccountDomain = $.trim(this.email()).split('@')[1],
				sMainAccountEmail = AccountList.getDefault() ? AccountList.getDefault().email() : '',
				sMainAccountDomain = $.trim(sMainAccountEmail).split('@')[1],
				bDomainsMatches = sNewAccountDomain === sMainAccountDomain
			;

			if (bDomainsMatches)
			{
				oServer = new CServerModel(oResponse.Result.Server);
			}
		}
		else
		{
			oServer = new CServerModel(oResponse.Result.Server);
		}
	}

	if (oServer)
	{
		var
			oParameters = {
				'FriendlyName': this.friendlyName(),
				'Email': $.trim(this.email()),
				'IncomingLogin': $.trim(this.email()),
				'IncomingPassword': $.trim(this.password()),
				'Server': {
					'ServerId': oServer.iId
				}
			}
		;

		Ajax.send('CreateAccount', oParameters, this.onAccountCreateResponse, this);
	}
	else
	{
		//second stage
		this.loading(false);
		Popups.showPopup(CreateAccountPopup, [
			_.bind(function (iAccountId) {
				var oAccount = AccountList.getAccount(iAccountId);
				if (oAccount)
				{
					this.editAccount(oAccount.hash());
				}
			}, this),
			this.friendlyName(),
			$.trim(this.email()),
			$.trim(this.password())
		]);
		this.closePopup();
	}
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CreateAccountShortFormPopup.prototype.onAccountCreateResponse = function (oResponse, oRequest)
{
	this.loading(false);

	if (!oResponse.Result)
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('MAILWEBCLIENT/ERROR_CREATE_ACCOUNT'));
	}
	else
	{
		var
			iAccountId = Types.pInt(oResponse.Result.AccountID),
			oAccount = new CAccountModel(oResponse.Result)
		;
		
		AccountList.addAccount(oAccount);
		AccountList.populateIdentities();
		AccountList.changeEditedAccount(iAccountId);
		if (AccountList.collection().length === 1)
		{
			AccountList.changeCurrentAccount(iAccountId);
		}
		
		if (this.fCallback)
		{
			this.fCallback(iAccountId);
		}
		
		this.closePopup();
	}
};

/**
 * @param {string} sHash
 */
CreateAccountShortFormPopup.prototype.editAccount = function (sHash)
{
	ModulesManager.run('SettingsWebclient', 'setAddHash', [['account', sHash]]);
};

module.exports = new CreateAccountShortFormPopup();


/***/ }),

/***/ "KmL1":
/*!*************************************************************!*\
  !*** ./modules/MailWebclient/js/popups/CreateAliasPopup.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),

	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),

	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy"),
	Ajax = __webpack_require__(/*! modules/MailWebclient/js/Ajax.js */ "QaEg"),
	CoreAjax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx")
;

/**
 * @constructor
 */
function CreateAliasPopup()
{
	CAbstractPopup.call(this);

	this.iAccountId = 0;
	this.aliasName = ko.observable('');
	this.loading = ko.observable(false);
	this.selectedDomain = ko.observable(null);
	this.domainList = ko.observableArray([]);
}

_.extendOwn(CreateAliasPopup.prototype, CAbstractPopup.prototype);

CreateAliasPopup.prototype.PopupTemplate = 'MailWebclient_Settings_CreateAliasPopup';

/**
 * @param {number} iAccountId
 */
CreateAliasPopup.prototype.onOpen = function (iAccountId)
{
	this.iAccountId = iAccountId;
	this.getDomainList();
};

CreateAliasPopup.prototype.onClose = function ()
{
	this.aliasName('');
};

CreateAliasPopup.prototype.save = function ()
{
	if (this.aliasName() === '')
	{
		Screens.showError(TextUtils.i18n('COREWEBCLIENT/ERROR_REQUIRED_FIELDS_EMPTY'));
	}
	else
	{
		var
			oParameters = {
				'AliasName': this.aliasName(),
				'AliasDomain': this.selectedDomain()
			}
		;

		this.loading(true);
		CoreAjax.send(Settings.AliasesServerModuleName, 'AddNewAlias', oParameters, this.onCreateAliasResponse, this);
	}
};

CreateAliasPopup.prototype.getDomainList = function ()
{
	var
		iServerId = AccountList.getCurrent().serverId(),
		iTenantId = _.isFunction(App.getTenantId) ? App.getTenantId() : 0
	;

	Ajax.send('GetServerDomains',
		{
			ServerId: iServerId, 
			TenantId: iTenantId
		},
		this.onGetDomainListResponse,
		this
	);
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CreateAliasPopup.prototype.onGetDomainListResponse = function (oResponse, oRequest)
{
	if (oResponse.Result)
	{
		this.domainList(oResponse.Result);
	}
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CreateAliasPopup.prototype.onCreateAliasResponse = function (oResponse, oRequest)
{
	this.loading(false);
	if (oResponse.Result)
	{
		AccountList.populateAliases(function () {
			var
				oCurrAccount = AccountList.getCurrent(),
				aCurrAliases = oCurrAccount.aliases(),
				oCreatedAlias = _.find(aCurrAliases, function (oAlias) {
					return oAlias.id() === oResponse.Result;
				})
			;
			if (oCreatedAlias)
			{
				ModulesManager.run('SettingsWebclient', 'setAddHash', [['alias', oCreatedAlias.hash()]]);
			}
		});
		this.closePopup();
	}
	else
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('COREWEBCLIENT/ERROR_UNKNOWN'));
	}
};

module.exports = new CreateAliasPopup();


/***/ }),

/***/ "hXOA":
/*!***************************************************************!*\
  !*** ./modules/MailWebclient/js/popups/CreateFetcherPopup.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
	
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
	CoreAjax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
	
	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
	CreateFolderPopup = __webpack_require__(/*! modules/MailWebclient/js/popups/CreateFolderPopup.js */ "WBAn"),
	
	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	MailCache = __webpack_require__(/*! modules/MailWebclient/js/Cache.js */ "F0Fd"),
	Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy"),
	
	CServerPropertiesView = __webpack_require__(/*! modules/MailWebclient/js/views/CServerPropertiesView.js */ "DBk0")
;

/**
 * @constructor
 */
function CCreateFetcherPopup()
{
	CAbstractPopup.call(this);
	
	this.iAccountId = 0;
	
	this.loading = ko.observable(false);
	this.newFolderCreating = ko.observable(false);

	this.incomingLogin = ko.observable('');
	this.incomingPassword = ko.observable('');
	this.oIncoming = new CServerPropertiesView(110, 995, 'fectcher_add_incoming', TextUtils.i18n('MAILWEBCLIENT/LABEL_POP3_SERVER'));

	this.folder = ko.observable('');
	this.options = ko.observableArray([]);
	MailCache.folderList.subscribe(function () {
		this.populateOptions();
	}, this);

	this.addNewFolderCommand = Utils.createCommand(this, this.onAddNewFolderClick);

	this.leaveMessagesOnServer = ko.observable(false);

	this.loginIsSelected = ko.observable(false);
	this.passwordIsSelected = ko.observable(false);

	this.defaultOptionsAfterRender = Utils.defaultOptionsAfterRender;
}

_.extendOwn(CCreateFetcherPopup.prototype, CAbstractPopup.prototype);

CCreateFetcherPopup.prototype.PopupTemplate = 'MailWebclient_Settings_CreateFetcherPopup';

CCreateFetcherPopup.prototype.onOpen = function (iAccountId)
{
	this.iAccountId = iAccountId;
	this.bShown = true;
	this.populateOptions();
	
	this.incomingLogin('');
	this.incomingPassword('');
	this.oIncoming.clear();

	this.folder('');

	this.leaveMessagesOnServer(true);
};

CCreateFetcherPopup.prototype.populateOptions = function ()
{
	if (this.bShown)
	{
		this.options(MailCache.folderList().getOptions('', true, false, false));
	}
};

CCreateFetcherPopup.prototype.onClose = function ()
{
	this.bShown = false;
};

CCreateFetcherPopup.prototype.save = function ()
{
	if (this.isEmptyRequiredFields())
	{
		Screens.showError(TextUtils.i18n('COREWEBCLIENT/ERROR_REQUIRED_FIELDS_EMPTY'));
	}
	else
	{
		var
			oParameters = {
				'AccountId': this.iAccountId,
				'Folder': this.folder(),
				'IncomingServer': this.oIncoming.server(),
				'IncomingPort': this.oIncoming.getIntPort(),
				'IncomingUseSsl': this.oIncoming.ssl(),
				'IncomingLogin': $.trim(this.incomingLogin()),
				'IncomingPassword': $.trim(this.incomingPassword()),
				'LeaveMessagesOnServer': this.leaveMessagesOnServer()
			}
		;

		this.loading(true);
		
		CoreAjax.send(Settings.FetchersServerModuleName, 'CreateFetcher', oParameters, this.onCreateFetcherResponse, this);
	}
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CCreateFetcherPopup.prototype.onCreateFetcherResponse = function (oResponse, oRequest)
{
	this.loading(false);

	if (!oResponse.Result)
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('COREWEBCLIENT/ERROR_UNKNOWN'));
	}
	else
	{
		AccountList.populateFetchers();
		this.closePopup();
	}
};

CCreateFetcherPopup.prototype.cancelPopup = function ()
{
	if (!this.newFolderCreating())
	{
		this.closePopup();
	}
};

CCreateFetcherPopup.prototype.isEmptyRequiredFields = function ()
{
	switch ('')
	{
		case this.oIncoming.server():
			this.oIncoming.server.focused(true);
			return true;
		case $.trim(this.incomingLogin()):
			this.loginIsSelected(true);
			return true;
		case $.trim(this.incomingPassword()):
			this.passwordIsSelected(true);
			return true;
		default: return false;
	}
};

CCreateFetcherPopup.prototype.onAddNewFolderClick = function ()
{
	this.newFolderCreating(true);
	Popups.showPopup(CreateFolderPopup, [_.bind(this.chooseFolderInList, this)]);
};

/**
 * @param {string} sFolderName
 * @param {string} sParentFullName
 */
CCreateFetcherPopup.prototype.chooseFolderInList = function (sFolderName, sParentFullName)
{
	var
		sDelimiter = MailCache.folderList().sDelimiter,
		aFolder = []
	;
	
	if (sFolderName !== '' && sParentFullName !== '')
	{
		this.options(MailCache.folderList().getOptions('', true, false, false));
		
		_.each(this.options(), _.bind(function (oOption) {
			if (sFolderName === oOption.name)
			{
				aFolder = oOption.fullName.split(sDelimiter);
				aFolder.pop();
				if (sParentFullName === aFolder.join(sDelimiter))
				{
					this.folder(oOption.fullName);
				}
			}
		}, this));
	}
	
	this.newFolderCreating(false);
};

module.exports = new CCreateFetcherPopup();


/***/ }),

/***/ "exVY":
/*!****************************************************************!*\
  !*** ./modules/MailWebclient/js/popups/CreateIdentityPopup.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
			
	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
	
	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	
	CIdentityModel = __webpack_require__(/*! modules/MailWebclient/js/models/CIdentityModel.js */ "ce4k"),
	CIdentitySettingsFormView = __webpack_require__(/*! modules/MailWebclient/js/views/settings/CIdentitySettingsFormView.js */ "ZS9T")
;

/**
 * @constructor
 */
function CCreateIdentityPopup()
{
	CAbstractPopup.call(this);
	
	this.oIdentitySettingsFormView = new CIdentitySettingsFormView(this, true);
}

_.extendOwn(CCreateIdentityPopup.prototype, CAbstractPopup.prototype);

CCreateIdentityPopup.prototype.PopupTemplate = 'MailWebclient_Settings_CreateIdentityPopup';

/**
 * @param {number} iAccountId
 */
CCreateIdentityPopup.prototype.onOpen = function (iAccountId)
{
	var
		oAccount = AccountList.getAccount(iAccountId),
		oIdentity = new CIdentityModel()
	;
	
	oIdentity.accountId(iAccountId);
	oIdentity.email(oAccount.email());
	this.oIdentitySettingsFormView.onShow(oIdentity);
	this.oIdentitySettingsFormView.populate();
	this.oIdentitySettingsFormView.friendlyNameHasFocus(true);
};

module.exports = new CCreateIdentityPopup();


/***/ }),

/***/ "frS4":
/*!******************************************************************!*\
  !*** ./modules/MailWebclient/js/popups/SetSystemFoldersPopup.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
	
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	
	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
	
	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	Ajax = __webpack_require__(/*! modules/MailWebclient/js/Ajax.js */ "QaEg"),
	MailCache = __webpack_require__(/*! modules/MailWebclient/js/Cache.js */ "F0Fd"),
	Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy")
;

/**
 * @constructor
 */
function CSetSystemFoldersPopup()
{
	CAbstractPopup.call(this);
	
	this.folders = MailCache.editedFolderList;
	
	this.sentFolderFullName = ko.observable('');
	this.draftsFolderFullName = ko.observable('');
	this.spamFolderFullName = ko.observable('');
	this.trashFolderFullName = ko.observable('');
	
	this.options = ko.observableArray([]);
	
	this.defaultOptionsAfterRender = Utils.defaultOptionsAfterRender;
	
	this.bAllowSpamFolderEditing = Settings.AllowSpamFolder;
}

_.extendOwn(CSetSystemFoldersPopup.prototype, CAbstractPopup.prototype);

CSetSystemFoldersPopup.prototype.PopupTemplate = 'MailWebclient_Settings_SetSystemFoldersPopup';

CSetSystemFoldersPopup.prototype.onOpen = function ()
{
	var oFolderList = MailCache.editedFolderList();
	
	this.options(oFolderList.getOptions(TextUtils.i18n('MAILWEBCLIENT/LABEL_NO_FOLDER_USAGE_ASSIGNED'), false, false, false));

	this.sentFolderFullName(oFolderList.sentFolderFullName());
	this.draftsFolderFullName(oFolderList.draftsFolderFullName());
	if (Settings.AllowSpamFolder)
	{
		this.spamFolderFullName(oFolderList.spamFolderFullName());
	}
	this.trashFolderFullName(oFolderList.trashFolderFullName());
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CSetSystemFoldersPopup.prototype.onResponseFoldersSetupSystem = function (oResponse, oRequest)
{
	if (oResponse.Result === false)
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('MAILWEBCLIENT/ERROR_SETUP_SPECIAL_FOLDERS'));
		MailCache.getFolderList(AccountList.editedId());
	}
};

CSetSystemFoldersPopup.prototype.apply = function ()
{
	var
		oFolderList = MailCache.editedFolderList(),
		bHasChanges = false,
		oParameters = null
	;
	
	if (this.sentFolderFullName() !== oFolderList.sentFolderFullName())
	{
		oFolderList.sentFolderFullName(this.sentFolderFullName());
		bHasChanges = true;
	}
	if (this.draftsFolderFullName() !== oFolderList.draftsFolderFullName())
	{
		oFolderList.draftsFolderFullName(this.draftsFolderFullName());
		bHasChanges = true;
	}
	if (Settings.AllowSpamFolder && this.spamFolderFullName() !== oFolderList.spamFolderFullName())
	{
		oFolderList.spamFolderFullName(this.spamFolderFullName());
		bHasChanges = true;
	}
	if (this.trashFolderFullName() !== oFolderList.trashFolderFullName())
	{
		oFolderList.trashFolderFullName(this.trashFolderFullName());
		bHasChanges = true;
	}
	
	if (bHasChanges)
	{
		oParameters = {
			'AccountID': AccountList.editedId(),
			'Sent': oFolderList.sentFolderFullName(),
			'Drafts': oFolderList.draftsFolderFullName(),
			'Trash': oFolderList.trashFolderFullName(),
			'Spam': oFolderList.spamFolderFullName()
		};
		Ajax.send('SetupSystemFolders', oParameters, this.onResponseFoldersSetupSystem, this);
	}
	
	this.closePopup();
};

module.exports = new CSetSystemFoldersPopup();


/***/ }),

/***/ "66Za":
/*!***************************************************************!*\
  !*** ./modules/MailWebclient/js/vendors/knockout-sortable.js ***!
  \***************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Attention: draggable and droppable are commented out because they conflict with our draggable and droppable
// knockout-sortable 1.2.0 | (c) 2019 Ryan Niemeyer |  http://www.opensource.org/licenses/mit-license
;(function(factory) {
    if (true) {
        // AMD anonymous module
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! knockout */ "p09A"), __webpack_require__(/*! jquery */ "M4cL"), __webpack_require__(/*! jquery-ui/ui/widgets/sortable */ "Hg/X"), __webpack_require__(/*! jquery-ui/ui/widgets/draggable */ "6gxe"), __webpack_require__(/*! jquery-ui/ui/widgets/droppable */ "O/kJ")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else { var ko, jQuery; }
})(function(ko, $) {
    var ITEMKEY = "ko_sortItem",
        INDEXKEY = "ko_sourceIndex",
        LISTKEY = "ko_sortList",
        PARENTKEY = "ko_parentList",
        DRAGKEY = "ko_dragItem",
        unwrap = ko.utils.unwrapObservable,
        dataGet = ko.utils.domData.get,
        dataSet = ko.utils.domData.set,
        version = $.ui && $.ui.version,
        //1.8.24 included a fix for how events were triggered in nested sortables. indexOf checks will fail if version starts with that value (0 vs. -1)
        hasNestedSortableFix = version && version.indexOf("1.6.") && version.indexOf("1.7.") && (version.indexOf("1.8.") || version === "1.8.24");

    //internal afterRender that adds meta-data to children
    var addMetaDataAfterRender = function(elements, data) {
        ko.utils.arrayForEach(elements, function(element) {
            if (element.nodeType === 1) {
                dataSet(element, ITEMKEY, data);
                dataSet(element, PARENTKEY, dataGet(element.parentNode, LISTKEY));
            }
        });
    };

    //prepare the proper options for the template binding
    var prepareTemplateOptions = function(valueAccessor, dataName) {
        var result = {},
            options = {},
            actualAfterRender;

        //build our options to pass to the template engine
        if (ko.utils.peekObservable(valueAccessor()).data) {
            options = unwrap(valueAccessor() || {});
            result[dataName] = options.data;
            if (options.hasOwnProperty("template")) {
                result.name = options.template;
            }
        } else {
            result[dataName] = valueAccessor();
        }

        ko.utils.arrayForEach(["afterAdd", "afterRender", "as", "beforeRemove", "includeDestroyed", "templateEngine", "templateOptions", "nodes"], function (option) {
            if (options.hasOwnProperty(option)) {
                result[option] = options[option];
            } else if (ko.bindingHandlers.sortable.hasOwnProperty(option)) {
                result[option] = ko.bindingHandlers.sortable[option];
            }
        });

        //use an afterRender function to add meta-data
        if (dataName === "foreach") {
            if (result.afterRender) {
                //wrap the existing function, if it was passed
                actualAfterRender = result.afterRender;
                result.afterRender = function(element, data) {
                    addMetaDataAfterRender.call(data, element, data);
                    actualAfterRender.call(data, element, data);
                };
            } else {
                result.afterRender = addMetaDataAfterRender;
            }
        }

        //return options to pass to the template binding
        return result;
    };

    var updateIndexFromDestroyedItems = function(index, items) {
        var unwrapped = unwrap(items);

        if (unwrapped) {
            for (var i = 0; i <= index; i++) {
                //add one for every destroyed item we find before the targetIndex in the target array
                if (unwrapped[i] && unwrap(unwrapped[i]._destroy)) {
                    index++;
                }
            }
        }

        return index;
    };

    //remove problematic leading/trailing whitespace from templates
    var stripTemplateWhitespace = function(element, name) {
        var templateSource,
            templateElement;

        //process named templates
        if (name) {
            templateElement = document.getElementById(name);
            if (templateElement) {
                templateSource = new ko.templateSources.domElement(templateElement);
                templateSource.text($.trim(templateSource.text()));
            }
        }
        else {
            //remove leading/trailing non-elements from anonymous templates
            $(element).contents().each(function() {
                if (this && this.nodeType !== 1) {
                    element.removeChild(this);
                }
            });
        }
    };

    //connect items with observableArrays
    ko.bindingHandlers.sortable = {
        init: function(element, valueAccessor, allBindingsAccessor, data, context) {
            var $element = $(element),
                value = unwrap(valueAccessor()) || {},
                templateOptions = prepareTemplateOptions(valueAccessor, "foreach"),
                sortable = {},
                startActual, updateActual;

            stripTemplateWhitespace(element, templateOptions.name);

            //build a new object that has the global options with overrides from the binding
            $.extend(true, sortable, ko.bindingHandlers.sortable);
            if (value.options && sortable.options) {
                ko.utils.extend(sortable.options, value.options);
                delete value.options;
            }
            ko.utils.extend(sortable, value);

            //if allowDrop is an observable or a function, then execute it in a computed observable
            if (sortable.connectClass && (ko.isObservable(sortable.allowDrop) || typeof sortable.allowDrop == "function")) {
                ko.computed({
                    read: function() {
                        var value = unwrap(sortable.allowDrop),
                            shouldAdd = typeof value == "function" ? value.call(this, templateOptions.foreach) : value;
                        ko.utils.toggleDomNodeCssClass(element, sortable.connectClass, shouldAdd);
                    },
                    disposeWhenNodeIsRemoved: element
                }, this);
            } else {
                ko.utils.toggleDomNodeCssClass(element, sortable.connectClass, sortable.allowDrop);
            }

            //wrap the template binding
            ko.bindingHandlers.template.init(element, function() { return templateOptions; }, allBindingsAccessor, data, context);

            //keep a reference to start/update functions that might have been passed in
            startActual = sortable.options.start;
            updateActual = sortable.options.update;

            //ensure draggable table row cells maintain their width while dragging (unless a helper is provided)
            if ( !sortable.options.helper ) {
                sortable.options.helper = function(e, ui) {
                    if (ui.is("tr")) {
                        ui.children().each(function() {
                            $(this).width($(this).width());
                        });
                    }
                    return ui;
                };
            }

            //initialize sortable binding after template binding has rendered in update function
            var createTimeout = setTimeout(function() {
                var dragItem;
                var originalReceive = sortable.options.receive;

                $element.sortable(ko.utils.extend(sortable.options, {
                    start: function(event, ui) {
                        //track original index
                        var el = ui.item[0];
                        dataSet(el, INDEXKEY, ko.utils.arrayIndexOf(ui.item.parent().children(), el));

                        //make sure that fields have a chance to update model
                        ui.item.find("input:focus").change();
                        if (startActual) {
                            startActual.apply(this, arguments);
                        }
                    },
                    receive: function(event, ui) {
                        //optionally apply an existing receive handler
                        if (typeof originalReceive === "function") {
                            originalReceive.call(this, event, ui);
                        }

                        dragItem = dataGet(ui.item[0], DRAGKEY);
                        if (dragItem) {
                            //copy the model item, if a clone option is provided
                            if (dragItem.clone) {
                                dragItem = dragItem.clone();
                            }

                            //configure a handler to potentially manipulate item before drop
                            if (sortable.dragged) {
                                dragItem = sortable.dragged.call(this, dragItem, event, ui) || dragItem;
                            }
                        }
                    },
                    update: function(event, ui) {
                        var sourceParent, targetParent, sourceIndex, targetIndex, arg,
                            el = ui.item[0],
                            parentEl = ui.item.parent()[0],
                            item = dataGet(el, ITEMKEY) || dragItem;

                        if (!item) {
                            $(el).remove();
                        }
                        dragItem = null;

                        //make sure that moves only run once, as update fires on multiple containers
                        if (item && (this === parentEl) || (!hasNestedSortableFix && $.contains(this, parentEl))) {
                            //identify parents
                            sourceParent = dataGet(el, PARENTKEY);
                            sourceIndex = dataGet(el, INDEXKEY);
                            targetParent = dataGet(el.parentNode, LISTKEY);
                            targetIndex = ko.utils.arrayIndexOf(ui.item.parent().children(), el);

                            //take destroyed items into consideration
                            if (!templateOptions.includeDestroyed) {
                                sourceIndex = updateIndexFromDestroyedItems(sourceIndex, sourceParent);
                                targetIndex = updateIndexFromDestroyedItems(targetIndex, targetParent);
                            }

                            //build up args for the callbacks
                            if (sortable.beforeMove || sortable.afterMove) {
                                arg = {
                                    item: item,
                                    sourceParent: sourceParent,
                                    sourceParentNode: sourceParent && ui.sender || el.parentNode,
                                    sourceIndex: sourceIndex,
                                    targetParent: targetParent,
                                    targetIndex: targetIndex,
                                    cancelDrop: false
                                };

                                //execute the configured callback prior to actually moving items
                                if (sortable.beforeMove) {
                                    sortable.beforeMove.call(this, arg, event, ui);
                                }
                            }

                            //call cancel on the correct list, so KO can take care of DOM manipulation
                            if (sourceParent) {
                                $(sourceParent === targetParent ? this : ui.sender || this).sortable("cancel");
                            }
                            //for a draggable item just remove the element
                            else {
                                $(el).remove();
                            }

                            //if beforeMove told us to cancel, then we are done
                            if (arg && arg.cancelDrop) {
                                return;
                            }

                            //if the strategy option is unset or false, employ the order strategy involving removal and insertion of items
                            if (!sortable.hasOwnProperty("strategyMove") || sortable.strategyMove === false) {
                                //do the actual move
                                if (targetIndex >= 0) {
                                    if (sourceParent) {
                                        sourceParent.splice(sourceIndex, 1);

                                        //if using deferred updates plugin, force updates
                                        if (ko.processAllDeferredBindingUpdates) {
                                            ko.processAllDeferredBindingUpdates();
                                        }

                                        //if using deferred updates on knockout 3.4, force updates
                                        if (ko.options && ko.options.deferUpdates) {
                                            ko.tasks.runEarly();
                                        }
                                    }

                                    targetParent.splice(targetIndex, 0, item);
                                }

                                //rendering is handled by manipulating the observableArray; ignore dropped element
                                dataSet(el, ITEMKEY, null);
                            }
                            else { //employ the strategy of moving items
                                if (targetIndex >= 0) {
                                    if (sourceParent) {
                                        if (sourceParent !== targetParent) {
                                            // moving from one list to another

                                            sourceParent.splice(sourceIndex, 1);
                                            targetParent.splice(targetIndex, 0, item);

                                            //rendering is handled by manipulating the observableArray; ignore dropped element
                                            dataSet(el, ITEMKEY, null);
                                            ui.item.remove();
                                        }
                                        else {
                                            // moving within same list
                                            var underlyingList = unwrap(sourceParent);

                                            // notify 'beforeChange' subscribers
                                            if (sourceParent.valueWillMutate) {
                                                sourceParent.valueWillMutate();
                                            }

                                            // move from source index ...
                                            underlyingList.splice(sourceIndex, 1);
                                            // ... to target index
                                            underlyingList.splice(targetIndex, 0, item);

                                            // notify subscribers
                                            if (sourceParent.valueHasMutated) {
                                                sourceParent.valueHasMutated();
                                            }
                                        }
                                    }
                                    else {
                                        // drop new element from outside
                                        targetParent.splice(targetIndex, 0, item);

                                        //rendering is handled by manipulating the observableArray; ignore dropped element
                                        dataSet(el, ITEMKEY, null);
                                        ui.item.remove();
                                    }
                                }
                            }

                            //if using deferred updates plugin, force updates
                            if (ko.processAllDeferredBindingUpdates) {
                                ko.processAllDeferredBindingUpdates();
                            }

                            //allow binding to accept a function to execute after moving the item
                            if (sortable.afterMove) {
                                sortable.afterMove.call(this, arg, event, ui);
                            }
                        }

                        if (updateActual) {
                            updateActual.apply(this, arguments);
                        }
                    },
                    connectWith: sortable.connectClass ? "." + sortable.connectClass : false
                }));

                //handle enabling/disabling sorting
                if (sortable.isEnabled !== undefined) {
                    ko.computed({
                        read: function() {
                            $element.sortable(unwrap(sortable.isEnabled) ? "enable" : "disable");
                        },
                        disposeWhenNodeIsRemoved: element
                    });
                }
            }, 0);

            //handle disposal
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                //only call destroy if sortable has been created
                if ($element.data("ui-sortable") || $element.data("sortable")) {
                    $element.sortable("destroy");
                }

                ko.utils.toggleDomNodeCssClass(element, sortable.connectClass, false);

                //do not create the sortable if the element has been removed from DOM
                clearTimeout(createTimeout);
            });

            return { 'controlsDescendantBindings': true };
        },
        update: function(element, valueAccessor, allBindingsAccessor, data, context) {
            var templateOptions = prepareTemplateOptions(valueAccessor, "foreach");

            //attach meta-data
            dataSet(element, LISTKEY, templateOptions.foreach);

            //call template binding's update with correct options
            ko.bindingHandlers.template.update(element, function() { return templateOptions; }, allBindingsAccessor, data, context);
        },
        connectClass: 'ko_container',
        allowDrop: true,
        afterMove: null,
        beforeMove: null,
        options: {}
    };

    //create a draggable that is appropriate for dropping into a sortable
    // ko.bindingHandlers.draggable = {
    //     init: function(element, valueAccessor, allBindingsAccessor, data, context) {
    //         var value = unwrap(valueAccessor()) || {},
    //             options = value.options || {},
    //             draggableOptions = ko.utils.extend({}, ko.bindingHandlers.draggable.options),
    //             templateOptions = prepareTemplateOptions(valueAccessor, "data"),
    //             connectClass = value.connectClass || ko.bindingHandlers.draggable.connectClass,
    //             isEnabled = value.isEnabled !== undefined ? value.isEnabled : ko.bindingHandlers.draggable.isEnabled;

    //         value = "data" in value ? value.data : value;

    //         //set meta-data
    //         dataSet(element, DRAGKEY, value);

    //         //override global options with override options passed in
    //         ko.utils.extend(draggableOptions, options);

    //         //setup connection to a sortable
    //         draggableOptions.connectToSortable = connectClass ? "." + connectClass : false;

    //         //initialize draggable
    //         $(element).draggable(draggableOptions);

    //         //handle enabling/disabling sorting
    //         if (isEnabled !== undefined) {
    //             ko.computed({
    //                 read: function() {
    //                     $(element).draggable(unwrap(isEnabled) ? "enable" : "disable");
    //                 },
    //                 disposeWhenNodeIsRemoved: element
    //             });
    //         }

    //         //handle disposal
    //         ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
    //             $(element).draggable("destroy");
    //         });

    //         return ko.bindingHandlers.template.init(element, function() { return templateOptions; }, allBindingsAccessor, data, context);
    //     },
    //     update: function(element, valueAccessor, allBindingsAccessor, data, context) {
    //         var templateOptions = prepareTemplateOptions(valueAccessor, "data");

    //         return ko.bindingHandlers.template.update(element, function() { return templateOptions; }, allBindingsAccessor, data, context);
    //     },
    //     connectClass: ko.bindingHandlers.sortable.connectClass,
    //     options: {
    //         helper: "clone"
    //     }
    // };

    // // Simple Droppable Implementation
    // // binding that updates (function or observable)
    // ko.bindingHandlers.droppable = {
    //     init: function(element, valueAccessor, allBindingsAccessor, data, context) {
    //         var value = unwrap(valueAccessor()) || {},
    //             options = value.options || {},
    //             droppableOptions = ko.utils.extend({}, ko.bindingHandlers.droppable.options),
    //             isEnabled = value.isEnabled !== undefined ? value.isEnabled : ko.bindingHandlers.droppable.isEnabled;

    //         //override global options with override options passed in
    //         ko.utils.extend(droppableOptions, options);

    //         //get reference to drop method
    //         value = "data" in value ? value.data : valueAccessor();

    //         //set drop method
    //         droppableOptions.drop = function(event, ui) {
    //             var droppedItem = dataGet(ui.draggable[0], DRAGKEY) || dataGet(ui.draggable[0], ITEMKEY);
    //             value(droppedItem);
    //         };

    //         //initialize droppable
    //         $(element).droppable(droppableOptions);

    //         //handle enabling/disabling droppable
    //         if (isEnabled !== undefined) {
    //             ko.computed({
    //                 read: function() {
    //                     $(element).droppable(unwrap(isEnabled) ? "enable": "disable");
    //                 },
    //                 disposeWhenNodeIsRemoved: element
    //             });
    //         }

    //         //handle disposal
    //         ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
    //             $(element).droppable("destroy");
    //         });
    //     },
    //     options: {
    //         accept: "*"
    //     }
    // };
});


/***/ }),

/***/ "DBk0":
/*!*****************************************************************!*\
  !*** ./modules/MailWebclient/js/views/CServerPropertiesView.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L")
;

/**
 * @constructor
 * 
 * @param {number} iDefaultPort
 * @param {number} iDefaultSslPort
 * @param {string} sId
 * @param {string} sLabel
 * @param {function} koDefaultServerValue
 */
function CServerPropertiesView(iDefaultPort, iDefaultSslPort, sId, sLabel, koDefaultServerValue)
{
	this.server = ko.observable('');
	this.server.focused = ko.observable(false);
	this.label = sLabel;
	this.defaultPort = ko.observable(iDefaultPort);
	this.defaultSslPort = ko.observable(iDefaultSslPort);
	this.port = ko.observable(iDefaultPort);
	this.port.focused = ko.observable(false);
	this.ssl = ko.observable(false);
	this.isEnabled = ko.observable(true);
	this.id = sId;

	if (_.isFunction(koDefaultServerValue))
	{
		koDefaultServerValue.focused.subscribe(function () {
			if (!koDefaultServerValue.focused() && this.server() === '')
			{
				this.server(koDefaultServerValue());
			}
		}, this);
	}
	
	this.ssl.subscribe(function () {
		var iPort = Types.pInt(this.port());
		if (this.ssl())
		{
			if (iPort === this.defaultPort())
			{
				this.port(this.defaultSslPort());
			}
		}
		else
		{
			if (iPort === this.defaultSslPort())
			{
				this.port(this.defaultPort());
			}
		}
	}, this);
}

/**
 * @param {string} sServer
 * @param {number} iPort
 * @param {boolean} bSsl
 */
CServerPropertiesView.prototype.set = function (sServer, iPort, bSsl)
{
	this.server(sServer);
	this.ssl(bSsl);
	this.port(iPort);
};

CServerPropertiesView.prototype.clear = function ()
{
	this.server('');
	this.ssl(false);
	this.port(this.defaultPort());
};

CServerPropertiesView.prototype.getIntPort = function ()
{
	return Types.pInt(this.port());
};

CServerPropertiesView.prototype.parentSave = function (koCurrentField, aParents)
{
	if (koCurrentField.focused)
	{
		koCurrentField.focused(false);
	}
	
	var oParent = _.find(aParents, function (oTmpParent) {
		return _.isFunction(oTmpParent.save);
	});
	
	if (oParent)
	{
		oParent.save();
	}
};

module.exports = CServerPropertiesView;


/***/ }),

/***/ "fSBA":
/*!***************************************************************************!*\
  !*** ./modules/MailWebclient/js/views/DefaultAccountHostsSettingsView.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	ko = __webpack_require__(/*! knockout */ "p09A"),

	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV"),

	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn");
;

/**
 * @constructor
 */
function CDefaultAccountHostsSettingsView()
{
	this.defaultAccount = AccountList.getDefault();
	this.visible = ko.observable(!!this.defaultAccount && this.defaultAccount.oServer.bSetExternalAccessServers);
	this.externalAccessImapServer = ko.observable(this.visible() ? this.defaultAccount.oServer.sExternalAccessImapServer : '');
	this.externalAccessImapPort = ko.observable(this.visible() ? this.defaultAccount.oServer.iExternalAccessImapPort : 143);
	this.externalAccessImapAlterPort = ko.observable((this.visible() && this.defaultAccount.oServer.iExternalAccessImapAlterPort > 0) ? this.defaultAccount.oServer.iExternalAccessImapAlterPort : '');
	this.externalAccessImapUseSsl = ko.observable(this.visible() ? this.defaultAccount.oServer.bExternalAccessImapUseSsl : false);
	this.externalAccessPop3Server = ko.observable(this.visible() ? this.defaultAccount.oServer.sExternalAccessPop3Server : '');
	this.externalAccessPop3Port = ko.observable(this.visible() ? this.defaultAccount.oServer.iExternalAccessPop3Port : 110);
	this.externalAccessPop3AlterPort = ko.observable((this.visible() && this.defaultAccount.oServer.iExternalAccessPop3AlterPort > 0) ? this.defaultAccount.oServer.iExternalAccessPop3AlterPort : '');
	this.externalAccessPop3UseSsl = ko.observable(this.visible() ? this.defaultAccount.oServer.bExternalAccessImapUseSsl : false);
	this.externalAccessSmtpServer = ko.observable(this.visible() ? this.defaultAccount.oServer.sExternalAccessSmtpServer : '');
	this.externalAccessSmtpPort = ko.observable(this.visible() ? this.defaultAccount.oServer.iExternalAccessSmtpPort : 25);
	this.externalAccessSmtpAlterPort = ko.observable((this.visible() && this.defaultAccount.oServer.iExternalAccessSmtpAlterPort > 0) ? this.defaultAccount.oServer.iExternalAccessSmtpAlterPort : '');
	this.externalAccessSmtpUseSsl = ko.observable(this.visible() ? this.defaultAccount.oServer.bExternalAccessSmtpUseSsl : false);
	this.credentialsHintText = App.mobileCredentialsHintText;
	this.bDemo = UserSettings.IsDemo;
}

CDefaultAccountHostsSettingsView.prototype.ViewTemplate = 'MailWebclient_DefaultAccountHostsSettingsView';

module.exports = new CDefaultAccountHostsSettingsView();


/***/ }),

/***/ "Uzkn":
/*!**********************************************************!*\
  !*** ./modules/MailWebclient/js/views/HeaderItemView.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	
	Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy"),
	
	CAbstractHeaderItemView = __webpack_require__(/*! modules/CoreWebclient/js/views/CHeaderItemView.js */ "C5H3"),
			
	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	Cache = __webpack_require__(/*! modules/MailWebclient/js/Cache.js */ "F0Fd")
;

function CHeaderItemView()
{
	CAbstractHeaderItemView.call(this, TextUtils.i18n('MAILWEBCLIENT/ACTION_SHOW_MAIL'));
	
	this.unseenCount = Cache.newMessagesCount;
	
	this.inactiveTitle = ko.computed(function () {
		return TextUtils.i18n('MAILWEBCLIENT/HEADING_UNREAD_MESSAGES_BROWSER_TAB_PLURAL', {'COUNT': this.unseenCount()}, null, this.unseenCount()) + ' - ' + AccountList.getEmail();
	}, this);
	
	this.accounts = ko.computed(function () {
		return _.map(AccountList.collection(), function (oAccount) {
			return {
				bCurrent: oAccount.isCurrent(),
				sText: Settings.UserLoginPartInAccountDropdown ? oAccount.email().split('@')[0] : oAccount.email(),
				changeAccount: oAccount.changeAccount.bind(oAccount)
			};
		})
	}, this);
	
	if (Settings.ShowEmailAsTabName)
	{
		this.linkText = ko.computed(function () {
			var oCurrent = _.find(this.accounts(), function (oAccountData) {
				return oAccountData.bCurrent;
			})
			return oCurrent ? oCurrent.sText : TextUtils.i18n('MAILWEBCLIENT/HEADING_BROWSER_TAB');
		}, this);
	}
	
	this.mainHref = ko.computed(function () {
		if (this.isCurrent())
		{
			return 'javascript: void(0);';
		}
		return this.hash();
	}, this);
}

_.extendOwn(CHeaderItemView.prototype, CAbstractHeaderItemView.prototype);

CHeaderItemView.prototype.ViewTemplate = 'MailWebclient_HeaderItemView';

var HeaderItemView = new CHeaderItemView();

HeaderItemView.allowChangeTitle(true);

module.exports = HeaderItemView;


/***/ }),

/***/ "exJb":
/*!*******************************************************************************************!*\
  !*** ./modules/MailWebclient/js/views/settings/AccountAllowBlockListsSettingsFormView.js ***!
  \*******************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),

	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),

	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),

	CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),

	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	Ajax = __webpack_require__(/*! modules/MailWebclient/js/Ajax.js */ "QaEg")
;

/**
 * @constructor
 */ 
function CAccountAllowBlockListsSettingsFormView()
{
	CAbstractSettingsFormView.call(this, 'MailWebclient');

	this.spamScore = ko.observable('');
	this.allowList = ko.observable('');
	this.blockList = ko.observable('');
}

_.extendOwn(CAccountAllowBlockListsSettingsFormView.prototype, CAbstractSettingsFormView.prototype);

CAccountAllowBlockListsSettingsFormView.prototype.ViewTemplate = 'MailWebclient_Settings_AccountAllowBlockListsSettingsFormView';

CAccountAllowBlockListsSettingsFormView.prototype.getCurrentValues = function ()
{
	return [
		this.spamScore(),
		this.allowList(),
		this.blockList()
	];
};

CAccountAllowBlockListsSettingsFormView.prototype.onShow = function ()
{
	this.populate();
};

CAccountAllowBlockListsSettingsFormView.prototype.getParametersForSave = function ()
{
	return {
		'AccountID': AccountList.editedId(),
		'SpamScore': Types.pInt(this.spamScore()),
		'AllowList': this.allowList() !== '' ? this.allowList().split('\n') : [],
		'BlockList': this.blockList() !== '' ? this.blockList().split('\n') : []
	};
};

CAccountAllowBlockListsSettingsFormView.prototype.save = function ()
{
	this.isSaving(true);

	this.updateSavedState();

	Ajax.send('SetAccountSpamSettings', this.getParametersForSave(), this.onResponse, this);
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CAccountAllowBlockListsSettingsFormView.prototype.onResponse = function (oResponse, oRequest)
{
	this.isSaving(false);

	if (oResponse.Result === false)
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('COREWEBCLIENT/ERROR_SAVING_SETTINGS_FAILED'));
	}
	else
	{
		Screens.showReport(TextUtils.i18n('COREWEBCLIENT/REPORT_SETTINGS_UPDATE_SUCCESS'));
	}
};

CAccountAllowBlockListsSettingsFormView.prototype.populate = function()
{
	var oAccount = AccountList.getEdited();
	
	if (oAccount)
	{
		Ajax.send('GetAccountSpamSettings', {'AccountID': oAccount.id()}, this.onGetAllowBlockListsResponse, this);
	}
	
	this.updateSavedState();
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CAccountAllowBlockListsSettingsFormView.prototype.onGetAllowBlockListsResponse = function (oResponse, oRequest)
{
	var oResult = oResponse && oResponse.Result;
	if (oResult)
	{
		var
			iSpamScore = Types.pInt(oResult.SpamScore),
			aAllowList = Types.pArray(oResult.AllowList),
			aBlockList = Types.pArray(oResult.BlockList)
		;

		this.spamScore(iSpamScore);
		this.allowList(aAllowList.join('\n'));
		this.blockList(aBlockList.join('\n'));

		this.updateSavedState();
	}
};

module.exports = new CAccountAllowBlockListsSettingsFormView();


/***/ }),

/***/ "JTYw":
/*!*****************************************************************************************!*\
  !*** ./modules/MailWebclient/js/views/settings/AccountAutoresponderSettingsFormView.js ***!
  \*****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "M4cL");


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	moment = __webpack_require__(/*! moment */ "sdEb"),
	
	DateUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Date.js */ "injE"),
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	CalendarUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Calendar.js */ "A3in"),
	CommonUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
	
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
	
	CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),
	
	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	Ajax = __webpack_require__(/*! modules/MailWebclient/js/Ajax.js */ "QaEg"),
	Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy"),
	UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV"),
	
	CAutoresponderModel = __webpack_require__(/*! modules/MailWebclient/js/models/CAutoresponderModel.js */ "9BUb")
;

__webpack_require__(/*! jquery-ui/ui/widgets/datepicker */ "okSt");

/**
 * @constructor
 */ 
function CAccountAutoresponderSettingsFormView()
{
	CAbstractSettingsFormView.call(this, Settings.ServerModuleName);
	
	this.enable = ko.observable(false);
	this.subject = ko.observable('');
	this.message = ko.observable('');

	this.scheduled = ko.observable(false);
	this.dateFormatMoment = ko.computed(function () {
		return CommonUtils.getDateFormatForMoment(UserSettings.dateFormat());
	}, this)

	this.startDateDom = ko.observable(null);
	this.startTimestamp = ko.observable(null);

	this.endDateDom = ko.observable(null);
	this.endTimestamp = ko.observable(null);

	this.startTimestamp.subscribe(function (v) {
		const momentStart = moment.unix(v);
		this.startDateDom().datepicker('setDate', momentStart.format(this.dateFormatMoment()));

		const momentEnd = this.endTimestamp() ? moment.unix(this.endTimestamp()) : moment();
		if (momentStart.diff(momentEnd, 'days') >= 0 && this.endDateDom()) {
			const newMomentEnd = momentStart.add(6, 'days');
			this.endTimestamp(newMomentEnd.unix());
		}
	}, this);
	
	this.endTimestamp.subscribe(function (v) {
		const momentEnd = moment.unix(v);
		this.endDateDom().datepicker('setDate', momentEnd.format(this.dateFormatMoment()));

		const momentStart = this.startTimestamp() ? moment.unix(this.startTimestamp()) : moment();
		if (momentStart.diff(momentEnd, 'days') >= 0 && this.startDateDom()) {
			const newMomentStart = momentEnd.subtract(6, 'days');
			this.startTimestamp(newMomentStart.unix());
		}
	}, this);

	AccountList.editedId.subscribe(function () {
		if (this.bShown) {
			this.populate();
		}
	}, this);

	this.startDateDom.subscribe(function (v) {
		if (!this.startTimestamp()) {
			this.startTimestamp(moment().unix());
		}
		this.createDatePickerObject(v, this.startTimestamp);
	}, this);

	this.endDateDom.subscribe(function (v) {
		if (!this.endTimestamp()) {
			this.endTimestamp(moment().add(6, 'days').unix());
		}
		this.createDatePickerObject(v, this.endTimestamp);
	}, this);

	this.allowScheduledAutoresponder = Settings.AllowScheduledAutoresponder;
}

_.extendOwn(CAccountAutoresponderSettingsFormView.prototype, CAbstractSettingsFormView.prototype);

CAccountAutoresponderSettingsFormView.prototype.ViewTemplate = 'MailWebclient_Settings_AccountAutoresponderSettingsFormView';

CAccountAutoresponderSettingsFormView.prototype.getCurrentValues = function ()
{
	return [
		this.enable(),
		this.subject(),
		this.message(),
		this.scheduled(),
		this.startTimestamp(),
		this.endTimestamp(),
	];
};

CAccountAutoresponderSettingsFormView.prototype.onShow = function ()
{
	this.populate();
};

CAccountAutoresponderSettingsFormView.prototype.revert = function ()
{
	this.populate();
};

CAccountAutoresponderSettingsFormView.prototype.getParametersForSave = function ()
{
	const oParams = {
		'AccountID': AccountList.editedId(),
		'Enable': this.enable(),
		'Subject': this.subject(),
		'Message': this.message(),
		'Scheduled': this.scheduled(),
	};	
	
	if (this.scheduled()) {
		oParams['Start'] = this.startTimestamp();
		oParams['End'] = this.endTimestamp();
	}

	return oParams;
};

CAccountAutoresponderSettingsFormView.prototype.applySavedValues = function (oParameters)
{
	var
		oAccount = AccountList.getEdited(),
		oAutoresponder = oAccount.autoresponder()
	;

	if (oAutoresponder)
	{
		oAutoresponder.enable = oParameters.Enable;
		oAutoresponder.subject = oParameters.Subject;
		oAutoresponder.message = oParameters.Message;

		oAutoresponder.scheduled = oParameters.Scheduled
		oAutoresponder.start = oParameters.Start;
		oAutoresponder.end = oParameters.End;
	}
};

CAccountAutoresponderSettingsFormView.prototype.save = function ()
{
	this.isSaving(true);
	
	this.updateSavedState();
	
	Ajax.send('UpdateAutoresponder', this.getParametersForSave(), this.onResponse, this);
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CAccountAutoresponderSettingsFormView.prototype.onResponse = function (oResponse, oRequest)
{
	this.isSaving(false);

	if (oResponse.Result === false)
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('COREWEBCLIENT/ERROR_SAVING_SETTINGS_FAILED'));
	}
	else
	{
		var oParameters = oRequest.Parameters;
		
		this.applySavedValues(oParameters);
		
		Screens.showReport(TextUtils.i18n('MAILWEBCLIENT/REPORT_AUTORESPONDER_UPDATE_SUCCESS'));
	}
};

CAccountAutoresponderSettingsFormView.prototype.populate = function()
{
	const oAccount = AccountList.getEdited();
	
	if (oAccount)
	{
		const oAutoresponder = oAccount.autoresponder();
		if (oAutoresponder !== null)
		{
			this.enable(oAutoresponder.enable);
			this.subject(oAutoresponder.subject);
			this.message(oAutoresponder.message);
			
			this.scheduled(oAutoresponder.scheduled);
			
			if (oAutoresponder.start !== null) {
				this.startTimestamp(oAutoresponder.start);
			}
				
			if (oAutoresponder.end !== null) {
				this.endTimestamp(oAutoresponder.end);
			}
		}
		else
		{
			Ajax.send('GetAutoresponder', {'AccountID': oAccount.id()}, this.onGetAutoresponderResponse, this);
		}
	}
	
	this.updateSavedState();
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CAccountAutoresponderSettingsFormView.prototype.onGetAutoresponderResponse = function (oResponse, oRequest)
{
	if (oResponse && oResponse.Result)
	{
		var
			oParameters = oRequest.Parameters,
			iAccountId = Types.pInt(oParameters.AccountID),
			oAccount = AccountList.getAccount(iAccountId),
			oAutoresponder = new CAutoresponderModel()
		;

		if (oAccount)
		{
			oAutoresponder.parse(iAccountId, oResponse.Result);
			oAccount.autoresponder(oAutoresponder);

			if (iAccountId === AccountList.editedId())
			{
				this.populate();
			}
		}
	}
};

CAccountAutoresponderSettingsFormView.prototype.createDatePickerObject = function (oElement, value)
{
	$(oElement).datepicker({
		showOtherMonths: true,
		selectOtherMonths: true,
		monthNames: DateUtils.getMonthNamesArray(),
		dayNamesMin: TextUtils.i18n('COREWEBCLIENT/LIST_DAY_NAMES_MIN').split(' '),
		nextText: '',
		prevText: '',
		firstDay: Types.pInt(ModulesManager.run('CalendarWebclient', 'getWeekStartsOn')),
		showOn: 'focus',
		dateFormat: CalendarUtils.getDateFormatForDatePicker(UserSettings.dateFormat()),
		onClose: (sValue) => {
			if (ko.isObservable(value)) {
				value(moment(sValue, this.dateFormatMoment()).unix());
			}
		}
	});

	$(oElement).datepicker('setDate', moment.unix(value()).format(this.dateFormatMoment()));

	$(oElement).on('mousedown', function() {
		$('#ui-datepicker-div').toggle();
	});
};

module.exports = new CAccountAutoresponderSettingsFormView();


/***/ }),

/***/ "4Jr3":
/*!***********************************************************************************!*\
  !*** ./modules/MailWebclient/js/views/settings/AccountFiltersSettingsFormView.js ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	
	CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),
	
	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	Ajax = __webpack_require__(/*! modules/MailWebclient/js/Ajax.js */ "QaEg"),
	MailCache = __webpack_require__(/*! modules/MailWebclient/js/Cache.js */ "F0Fd"),
	Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy"),
	
	CFilterModel = __webpack_require__(/*! modules/MailWebclient/js/models/CFilterModel.js */ "a/2+"),
	CFiltersModel = __webpack_require__(/*! modules/MailWebclient/js/models/CFiltersModel.js */ "uDMB")
;

/**
 * @constructor
 */
function CAccountFiltersSettingsFormView()
{
	CAbstractSettingsFormView.call(this, Settings.ServerModuleName);
	
	this.bShown = false;
	
	this.foldersOptions = ko.observableArray([]);
	
	MailCache.editedFolderList.subscribe(function () {
		if (this.bShown)
		{
			this.populate();
		}
	}, this);
	
	this.loading = ko.observable(true);
	this.collection = ko.observableArray([]);

	this.fieldOptions = [
		{'text': TextUtils.i18n('MAILWEBCLIENT/LABEL_FROM'), 'value': 0},
		{'text': TextUtils.i18n('MAILWEBCLIENT/LABEL_TO'), 'value': 1},
		{'text': TextUtils.i18n('MAILWEBCLIENT/LABEL_SUBJECT'), 'value': 2}
	];

	this.conditionOptions = [
		{'text': TextUtils.i18n('MAILWEBCLIENT/LABEL_CONTAINING'), 'value': 0},
		{'text': TextUtils.i18n('MAILWEBCLIENT/LABEL_EQUAL_TO'), 'value': 1},
		{'text': TextUtils.i18n('MAILWEBCLIENT/LABEL_NOT_CONTAINING'), 'value': 2}
	];

	this.actionOptions = [
		{'text': TextUtils.i18n('MAILWEBCLIENT/LABEL_MOVE_FILTER_ACTION'), 'value': 3},
		{'text': TextUtils.i18n('MAILWEBCLIENT/LABEL_REDIRECT_FILTER_ACTION'), 'value': 7},
		{'text': TextUtils.i18n('MAILWEBCLIENT/LABEL_DELETE_FILTER_ACTION'), 'value': 1}
	];
	
	this.phaseArray = [''];
	
	_.each(TextUtils.i18n('MAILWEBCLIENT/INFO_FILTER').split(/,{0,1}\s/), function (sItem) {
		var iIndex = this.phaseArray.length - 1;
		if (sItem.substr(0,1) === '%' || this.phaseArray[iIndex].substr(-1,1) === '%')
		{
			this.phaseArray.push(sItem);
		}
		else
		{
			this.phaseArray[iIndex] += ' ' + sItem;
		}
	}, this);
	this.firstState = null;
}

_.extendOwn(CAccountFiltersSettingsFormView.prototype, CAbstractSettingsFormView.prototype);

CAccountFiltersSettingsFormView.prototype.ViewTemplate = 'MailWebclient_Settings_AccountFiltersSettingsFormView';

CAccountFiltersSettingsFormView.prototype.onShow = function ()
{
	this.populate();
};

CAccountFiltersSettingsFormView.prototype.onHide = function ()
{
	this.bShown = false;
};

CAccountFiltersSettingsFormView.prototype.populate = function ()
{
	var
		oFolderList = MailCache.editedFolderList(),
		aOptionList = []
	;

	if (oFolderList.iAccountId === AccountList.editedId())
	{
		aOptionList = oFolderList.getOptions(TextUtils.i18n('MAILWEBCLIENT/LABEL_FOLDER_NOT_SELECTED'), true, true, false, true);
		this.foldersOptions(aOptionList);
		this.populateFilters();
	}
	else
	{
		this.loading(true);
		this.collection([]);
	}
};

CAccountFiltersSettingsFormView.prototype.revert = function ()
{
	var account = AccountList.getEdited();
	if (account && account.filters() !== null) {
		this.collection([...account.filters().collection()]);
	} else {
		this.collection([]);
	}
	this.updateSavedState();
};

CAccountFiltersSettingsFormView.prototype.commit = function ()
{
	_.each(this.collection(), function (oFilter) {
		oFilter.commit();
	});
};

CAccountFiltersSettingsFormView.prototype.getCurrentValues = function ()
{
	return _.map(this.collection(), function (oFilter) {
		return oFilter.toString();
	}, this);
};

CAccountFiltersSettingsFormView.prototype.getParametersForSave = function ()
{
	var
		aFilters =_.map(this.collection(), function (oItem) {
			return {
				'Enable': oItem.enable() ? '1' : '0',
				'Field': oItem.field(),
				'Filter': oItem.filter(),
				'Condition': oItem.condition(),
				'Action': oItem.action(),
				'FolderFullName': oItem.folder(),
				'Email': oItem.email()
			};
		})
	;
	
	return {
		'AccountID': AccountList.editedId(),
		'Filters': aFilters
	};
};

CAccountFiltersSettingsFormView.prototype.save = function ()
{
	var bCantSave =_.some(this.collection(), function (oFilter) {
		return oFilter.filter() === '' || (Types.pString(oFilter.action()) === '3' /* Move */ && oFilter.folder() === '');
	});

	if (bCantSave)
	{
		Screens.showError(TextUtils.i18n('MAILWEBCLIENT/ERROR_FILTER_FIELDS_EMPTY'));
	}
	else
	{
		this.isSaving(true);
		this.commit();
		this.updateSavedState();
		Ajax.send('UpdateFilters', this.getParametersForSave(), this.onAccountSieveFiltersUpdateResponse, this);
	}
};

CAccountFiltersSettingsFormView.prototype.populateFilters = function ()
{
	var oAccount = AccountList.getEdited();
	
	if (oAccount)
	{
		if (oAccount.filters() !== null)
		{
			this.loading(false);
			this.collection([...oAccount.filters().collection()]);
			this.updateSavedState();
		}
		else
		{
			this.loading(true);
			this.collection([]);
			Ajax.send('GetFilters', { 'AccountID': oAccount.id() }, this.onGetFiltersResponse, this);
		}
	}
};

/**
 * @param {Object} oFilterToDelete
 */
CAccountFiltersSettingsFormView.prototype.deleteFilter = function (oFilterToDelete)
{
	this.collection.remove(oFilterToDelete);
};

CAccountFiltersSettingsFormView.prototype.addFilter = function ()
{
	var oSieveFilter =  new CFilterModel(AccountList.editedId());
	this.collection.push(oSieveFilter);
};

/**
 * @param {string} sPart
 * @param {string} sPrefix
 * 
 * @return {string}
 */
CAccountFiltersSettingsFormView.prototype.displayFilterPart = function (sPart, sPrefix)
{
	var sTemplate = '';
	if (sPart === '%FIELD%')
	{
		sTemplate = 'Field';
	}
	else if (sPart === '%CONDITION%')
	{
		sTemplate = 'Condition';
	}
	else if (sPart === '%STRING%')
	{
		sTemplate = 'String';
	}
	else if (sPart === '%ACTION%')
	{
		sTemplate = 'Action';
	}
	else if (sPart === '%FOLDER%')
	{
		sTemplate = 'Folder';
	}
	else if (sPart === '%EMAIL%')
	{
		sTemplate = 'Email';
	}
	else if (sPart.substr(0, 9) === '%DEPENDED')
	{
		sTemplate = 'DependedText';
	}
	else
	{
		sTemplate = 'Text';
	}

	return sPrefix + sTemplate;
};

/**
 * @param {string} sText
 */
CAccountFiltersSettingsFormView.prototype.getDependedText = function (sText)
{	
	sText = Types.pString(sText);
	
	if (sText)
	{
		sText = sText.replace(/%/g, '').split('=')[1] || '';
	}
	
	return sText;
};

/**
 * @param {string} sText
 * @param {Object} oParent
 */
CAccountFiltersSettingsFormView.prototype.getDependedField = function (sText, oParent)
{	
	sText = Types.pString(sText);
	
	if (sText)
	{
		sText = sText.replace(/[=](.*)/g, '').split('-')[1] || '';
		sText = sText.toLowerCase();
	}

	return oParent[sText] ? oParent[sText]() : false;
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CAccountFiltersSettingsFormView.prototype.onGetFiltersResponse = function (oResponse, oRequest)
{
	var
		oParameters = oRequest.Parameters,
		iAccountId = Types.pInt(oParameters.AccountID),
		oAccount = AccountList.getAccount(iAccountId),
		oSieveFilters = new CFiltersModel()
	;
	
	this.loading(false);

	if (oResponse && oResponse.Result && oAccount)
	{
		oSieveFilters.parse(iAccountId, oResponse.Result);
		oAccount.filters(oSieveFilters);

		if (iAccountId === AccountList.editedId())
		{
			this.populateFilters();
		}
	}
	else
	{
		Screens.showError(TextUtils.i18n('COREWEBCLIENT/ERROR_UNKNOWN'));
	}
};

/**
 * @param {Object} response
 * @param {Object} request
 */
CAccountFiltersSettingsFormView.prototype.onAccountSieveFiltersUpdateResponse = function (response, request)
{
	this.isSaving(false);

	const account = AccountList.getEdited();
	if (response && response.Result) {
		Screens.showReport(TextUtils.i18n('MAILWEBCLIENT/REPORT_FILTERS_UPDATE_SUCCESS'));
		if (account) {
			account.filters().collection([...this.collection()]);
		}
	} else {
		Api.showErrorByCode(response, TextUtils.i18n('COREWEBCLIENT/ERROR_SAVING_SETTINGS_FAILED'));
	}
};

module.exports = new CAccountFiltersSettingsFormView();


/***/ }),

/***/ "DXx+":
/*!***************************************************************************!*\
  !*** ./modules/MailWebclient/js/views/settings/AccountFoldersPaneView.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
	
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	
	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
	CreateFolderPopup = __webpack_require__(/*! modules/MailWebclient/js/popups/CreateFolderPopup.js */ "WBAn"),
	SetSystemFoldersPopup = __webpack_require__(/*! modules/MailWebclient/js/popups/SetSystemFoldersPopup.js */ "frS4"),
	ImportExportPopup = ModulesManager.run('ImportExportMailPlugin', 'getImportExportPopup'),
	
	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	Ajax = __webpack_require__(/*! modules/MailWebclient/js/Ajax.js */ "QaEg"),
	MailCache = __webpack_require__(/*! modules/MailWebclient/js/Cache.js */ "F0Fd"),
	Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy")
;

__webpack_require__(/*! modules/MailWebclient/js/vendors/knockout-sortable.js */ "66Za");

/**
 * @constructor
 */ 
function CAccountFoldersPaneView()
{
	this.bAllowTemplateFolders = Settings.AllowTemplateFolders;
	
	this.highlighted = ko.observable(false).extend({'autoResetToFalse': 500});

	this.collection = ko.observableArray(MailCache.editedFolderList().collection());
	this.oCollSubscription = MailCache.editedFolderList().collection.subscribe(function (koCollection) {
		this.collection(koCollection);
	}, this);
	this.totalMessageCount = ko.observable(0);
	
	this.enableButtons = ko.computed(function () {
		return MailCache.editedFolderList().initialized();
	}, this);
	
	MailCache.editedFolderList.subscribe(function(oFolderList) {
		this.collection(oFolderList.collection());
		this.setTotalMessageCount();
		this.oCollSubscription.dispose();
		this.oCollSubscription = oFolderList.collection.subscribe(function (koCollection) {
			this.collection(koCollection);
		}, this);
	}, this);
	
	this.addNewFolderCommand = Utils.createCommand(this, this.addNewFolder, this.enableButtons);
	this.setSystemFoldersCommand = Utils.createCommand(this, this.setSystemFolders, this.enableButtons);
	
	this.showMovedWithMouseItem = ko.computed(function () {
		return !App.isMobile();
	}, this);
	this.allowImportExport = ko.observable(ModulesManager.isModuleEnabled('ImportExportMailPlugin'));
	App.subscribeEvent('MailWebclient::AttemptDeleteNonemptyFolder', _.bind(function () {
		this.highlighted(true);
	}, this));

	this.manageFolderButtons = ko.observableArray([]);
	App.broadcastEvent('MailWebclient::RegisterManageFolderButton', function (buttonData) {
		this.manageFolderButtons.push(_.extend({
			tooltip: folder => '',
			cssClasses: folder => '',
			handler: folder => {}
		}, buttonData));
	}.bind(this));

	App.broadcastEvent('MailWebclient::ConstructView::after', {'Name': this.ViewConstructorName, 'View': this});
	
	this.afterMove = _.debounce(_.bind(this.folderListOrderUpdate, this), 3000);
}

CAccountFoldersPaneView.prototype.ViewTemplate = 'MailWebclient_Settings_AccountFoldersPaneView';
CAccountFoldersPaneView.prototype.ViewConstructorName = 'CAccountFoldersPaneView'

CAccountFoldersPaneView.prototype.folderListOrderUpdate = function ()
{
	var
		aLinedCollection = MailCache.editedFolderList().repopulateLinedCollection(),
		oParameters = {
			'AccountID': AccountList.editedId(),
			'FolderList': _.compact(_.map(aLinedCollection, function (oFolder) {
				if (!oFolder.bVirtual)
				{
					return oFolder.fullName();
				}
			}))
		}
	;
	
	Ajax.send('UpdateFoldersOrder', oParameters, function (oResponse) {
		if (!oResponse.Result)
		{
			Api.showErrorByCode(oResponse, TextUtils.i18n('MAILWEBCLIENT/ERROR_CHANGE_FOLDERS_ORDER'));
			MailCache.getFolderList(AccountList.editedId());
		}
	}, this);
};

CAccountFoldersPaneView.prototype.hide = function (fAfterHideHandler)
{
	var iAccountId = AccountList.editedId();
	_.delay(function () {
		MailCache.getFolderList(iAccountId);
	}, 3000);
	
	if (_.isFunction(fAfterHideHandler))
	{
		fAfterHideHandler();
	}
};

CAccountFoldersPaneView.prototype.show = function ()
{
	this.setTotalMessageCount();
};

CAccountFoldersPaneView.prototype.setTotalMessageCount = function ()
{
	var oFolderList = MailCache.editedFolderList();
	if (oFolderList.iAccountId === 0)
	{
		this.totalMessageCount(0);
	}
	else
	{
		this.totalMessageCount(oFolderList.getTotalMessageCount());
		if (!oFolderList.countsCompletelyFilled())
		{
			if (oFolderList.countsCompletelyFilledSubscribtion)
			{
				oFolderList.countsCompletelyFilledSubscribtion.dispose();
				oFolderList.countsCompletelyFilledSubscribtion = null;
			}
			oFolderList.countsCompletelyFilledSubscribtion = oFolderList.countsCompletelyFilled.subscribe(function () {
				if (oFolderList.countsCompletelyFilled())
				{
					this.totalMessageCount(oFolderList.getTotalMessageCount());
					oFolderList.countsCompletelyFilledSubscribtion.dispose();
					oFolderList.countsCompletelyFilledSubscribtion = null;
				}
			}, this);
		}
	}
};

CAccountFoldersPaneView.prototype.addNewFolder = function ()
{
	Popups.showPopup(CreateFolderPopup);
};

CAccountFoldersPaneView.prototype.setSystemFolders = function ()
{
	Popups.showPopup(SetSystemFoldersPopup);
};

CAccountFoldersPaneView.prototype.importExport = function ()
{
	if (this.allowImportExport())
	{
		Popups.showPopup(ImportExportPopup, [{
		}]);
	}
};

module.exports = new CAccountFoldersPaneView();


/***/ }),

/***/ "dFFs":
/*!***********************************************************************************!*\
  !*** ./modules/MailWebclient/js/views/settings/AccountForwardSettingsFormView.js ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	AddressUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Address.js */ "kG5I"),
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
	
	CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),
	
	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
	AlertPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/AlertPopup.js */ "hT1I"),
	
	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	Ajax = __webpack_require__(/*! modules/MailWebclient/js/Ajax.js */ "QaEg"),
	Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy"),
	
	CForwardModel = __webpack_require__(/*! modules/MailWebclient/js/models/CForwardModel.js */ "lHET")
;

/**
 * @constructor
 */
function CAccountForwardSettingsFormView()
{
	CAbstractSettingsFormView.call(this, Settings.ServerModuleName);
	
	this.enable = ko.observable(false);
	this.keepcopy = ko.observable(true);
	this.email = ko.observable('');
	this.email.focused = ko.observable(false);

	AccountList.editedId.subscribe(function () {
		if (this.bShown)
		{
			this.populate();
		}
	}, this);
}

_.extendOwn(CAccountForwardSettingsFormView.prototype, CAbstractSettingsFormView.prototype);

CAccountForwardSettingsFormView.prototype.ViewTemplate = 'MailWebclient_Settings_AccountForwardSettingsFormView';

CAccountForwardSettingsFormView.prototype.getCurrentValues = function ()
{
	return [
		this.enable(),
		this.keepcopy(),
		this.email(),
	];
};

CAccountForwardSettingsFormView.prototype.revert = function ()
{
	this.populate();
};

CAccountForwardSettingsFormView.prototype.getParametersForSave = function ()
{
	var oAccount = AccountList.getEdited();
	return {
		'AccountID': oAccount.id(),
		'Enable': this.enable(),
		'Email': TextUtils.trim(this.email()),
		'KeepMessageCopy': this.keepcopy(),
	};
};

CAccountForwardSettingsFormView.prototype.applySavedValues = function (oParameters)
{
	var
		oAccount = AccountList.getEdited(),
		oForward = oAccount.forward()
	;
	
	if (oForward)
	{
		oForward.enable = oParameters.Enable;
		oForward.email = oParameters.Email;
		oForward.keepcopy = oParameters.KeepMessageCopy;
	}
};

CAccountForwardSettingsFormView.prototype.save = function ()
{
	var
		fSaveData = function() {
			this.isSaving(true);
			this.updateSavedState();
			Ajax.send('UpdateForward', this.getParametersForSave(), this.onResponse, this);
		}.bind(this),
		sEmail = TextUtils.trim(this.email())
	;

	if (this.enable() && sEmail === '')
	{
		this.email.focused(true);
	}
	else if (this.enable() && sEmail !== '')
	{
		if (!AddressUtils.isCorrectEmail(sEmail))
		{
			Popups.showPopup(AlertPopup, [TextUtils.i18n('MAILWEBCLIENT/ERROR_INPUT_CORRECT_EMAILS') + ' ' + sEmail]);
		}
		else
		{
			fSaveData();
		}
	}
	else
	{
		fSaveData();
	}
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CAccountForwardSettingsFormView.prototype.onResponse = function (oResponse, oRequest)
{
	this.isSaving(false);

	if (oResponse.Result === false)
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('COREWEBCLIENT/ERROR_SAVING_SETTINGS_FAILED'));
	}
	else
	{
		var oParameters = oRequest.Parameters;
		
		this.applySavedValues(oParameters);
		
		Screens.showReport(TextUtils.i18n('MAILWEBCLIENT/REPORT_FORWARD_UPDATE_SUCCESS'));
	}
};

CAccountForwardSettingsFormView.prototype.populate = function ()
{
	var 
		oAccount = AccountList.getEdited(),
		oForward = oAccount.forward() ? oAccount.forward() : null
	;
	
	if (oForward !== null)
	{
		this.enable(oForward.enable);
		this.keepcopy(oForward.keepcopy);
		this.email(oForward.email);
	}
	else
	{
		Ajax.send('GetForward', {'AccountID': oAccount.id()}, this.onGetForwardResponse, this);
	}
	
	this.updateSavedState();
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CAccountForwardSettingsFormView.prototype.onGetForwardResponse = function (oResponse, oRequest)
{
	if (oResponse && oResponse.Result)
	{
		var
			oParameters = oRequest.Parameters,
			iAccountId = Types.pInt(oParameters.AccountID),
			oAccount = AccountList.getAccount(iAccountId),
			oForward = new CForwardModel()
		;

		if (oAccount)
		{
			oForward.parse(iAccountId, oResponse.Result);
			oAccount.forward(oForward);

			if (iAccountId === AccountList.editedId())
			{
				this.populate();
			}
		}
	}
};

module.exports = new CAccountForwardSettingsFormView();


/***/ }),

/***/ "0mCI":
/*!****************************************************************************!*\
  !*** ./modules/MailWebclient/js/views/settings/AccountSettingsFormView.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	
	CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),
	
	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
	ChangePasswordPopup = ModulesManager.run('ChangePasswordWebclient', 'getChangePasswordPopup'),
	
	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	Ajax = __webpack_require__(/*! modules/MailWebclient/js/Ajax.js */ "QaEg"),
	Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy"),
	
	CServerPairPropertiesView = __webpack_require__(/*! modules/MailWebclient/js/views/settings/CServerPairPropertiesView.js */ "Z8ia")
;

/**
 * @constructor
 */ 
function CAccountSettingsFormView()
{
	CAbstractSettingsFormView.call(this, Settings.ServerModuleName);
	
	this.sFakePass = 'xxxxxxxx'; // fake password uses to display something in password input while account editing
	
	this.bAllowIdentities = Settings.AllowIdentities;
	
	this.useToAuthorize = ko.observable(false);
	this.canBeUsedToAuthorize = ko.observable(false);
	this.isDefaultAccount = ko.observable(false);
	this.isServerOwner = ko.observable(false);
	this.friendlyName = ko.observable('');
	this.email = ko.observable('');
	this.incomingLogin = ko.observable('');
	this.incomingPassword = ko.observable('');
	this.allowSpecifyPassword = ko.observable(false);
	this.useThreading = ko.observable(false);
	this.saveRepliesToCurrFolder = ko.observable(false);

	this.oServerPairPropertiesView = new CServerPairPropertiesView('acc_edit');
	this.enableThreading = this.oServerPairPropertiesView.enableThreading;
	this.enableThreading.subscribe(function () {
		if (!this.enableThreading())
		{
			this.useThreading(false);
		}
	}, this);

	this.allowChangePassword = ko.observable(false);
	
	this.incLoginFocused = ko.observable(false);
	this.incLoginFocused.subscribe(function () {
		if (this.incLoginFocused() && this.incomingLogin() === '')
		{
			this.incomingLogin(this.email());
		}
	}, this);

	AccountList.editedId.subscribe(function () {
		if (this.bShown)
		{
			this.populate();
		}
	}, this);
	this.updateSavedState();
	this.oServerPairPropertiesView.currentValues.subscribe(function () {
		this.updateSavedState();
	}, this);
	
	this.visibleTab = ko.observable(true);
	ko.computed(function () {
		var oAccount = AccountList.getEdited();
		if (oAccount)
		{
			this.allowChangePassword(ModulesManager.run('ChangePasswordWebclient', 'isChangePasswordButtonAllowed', [AccountList.collection().length, oAccount]));
			this.isDefaultAccount(oAccount.bDefault);
			this.isServerOwner(oAccount.oServer.sOwnerType === Enums.ServerOwnerType.Account);
		}
		else
		{
			this.allowChangePassword(false);
			this.isDefaultAccount(false);
		}
	}, this);
	this.isDisableAuthorize = ko.observable(App.userAccountsCount() <= 1);
	
	this.oDefaultAccountHostsSettingsView = __webpack_require__(/*! modules/MailWebclient/js/views/DefaultAccountHostsSettingsView.js */ "fSBA");
}

_.extendOwn(CAccountSettingsFormView.prototype, CAbstractSettingsFormView.prototype);

CAccountSettingsFormView.prototype.ViewTemplate = 'MailWebclient_Settings_AccountSettingsFormView';

CAccountSettingsFormView.prototype.onShow = function ()
{
	this.oServerPairPropertiesView.fullInit();
	this.populate();
};

CAccountSettingsFormView.prototype.getCurrentValues = function ()
{
	var
		aMain = [
			this.useToAuthorize(),
			this.friendlyName(),
			this.email(),
			this.incomingLogin(),
			this.incomingPassword(),
			this.useThreading(),
			this.saveRepliesToCurrFolder()
		],
		aServers = this.oServerPairPropertiesView.currentValues()
	;
	
	return aMain.concat(aServers);
};

CAccountSettingsFormView.prototype.getParametersForSave = function ()
{
	var
		oAccount = AccountList.getEdited(),
		sIncomingPassword = $.trim(this.incomingPassword())
	;
	return {
		'AccountID': oAccount.id(),
		'UseToAuthorize': this.useToAuthorize(),
		'FriendlyName': this.friendlyName(),
		'Email': $.trim(this.email()),
		'IncomingLogin': $.trim(this.incomingLogin()),
		'IncomingPassword': sIncomingPassword === this.sFakePass ? '' : sIncomingPassword,
		'Server': this.oServerPairPropertiesView.getParametersForSave(),
		'UseThreading': this.useThreading(),
		'SaveRepliesToCurrFolder': this.saveRepliesToCurrFolder()
	};
};

CAccountSettingsFormView.prototype.revert = function ()
{
	this.populate();
};

CAccountSettingsFormView.prototype.populate = function ()
{
	var oAccount = AccountList.getEdited();
	
	if (this.passwordMightBeIncorrectSubscribtion)
	{
		this.passwordMightBeIncorrectSubscribtion.dispose();
		this.passwordMightBeIncorrectSubscribtion = null;
	}
	
	if (oAccount)
	{	
		this.friendlyName(oAccount.friendlyName());
		this.email(oAccount.email());
		this.incomingLogin(oAccount.incomingLogin());
		this.incomingPassword(this.sFakePass);
		this.allowSpecifyPassword(oAccount.passwordMightBeIncorrect());
		if (!oAccount.passwordMightBeIncorrect())
		{
			this.passwordMightBeIncorrectSubscribtion = oAccount.passwordMightBeIncorrect.subscribe(function () {
				this.allowSpecifyPassword(oAccount.passwordMightBeIncorrect());
				this.passwordMightBeIncorrectSubscribtion.dispose();
				this.passwordMightBeIncorrectSubscribtion = null;
			}.bind(this));
		}
		this.oServerPairPropertiesView.setServer(oAccount.oServer);
		
		this.useToAuthorize(oAccount.useToAuthorize());
		this.canBeUsedToAuthorize(oAccount.canBeUsedToAuthorize());
		this.useThreading(oAccount.useThreading());
		this.saveRepliesToCurrFolder(oAccount.bSaveRepliesToCurrFolder);
		
		this.isDisableAuthorize(this.useToAuthorize() ? App.userAccountsCount() <= 1 : false);
	}
	else
	{
		this.friendlyName('');
		this.email('');
		this.incomingLogin('');
		this.incomingPassword('');
		this.allowSpecifyPassword(false);
		
		this.oServerPairPropertiesView.clear();
		
		this.useToAuthorize(true);
		this.canBeUsedToAuthorize(false);
		this.useThreading(false);
		
		this.isDisableAuthorize(true);
	}
	
	this.updateSavedState();
};

CAccountSettingsFormView.prototype.remove = function ()
{
	if (this.isDisableAuthorize())
	{
		Screens.showError(TextUtils.i18n('COREWEBCLIENT/ERROR_ACCOUNT_DELETING_DISABLE'), true);
	}
	else
	{
		var oAccount = AccountList.getEdited();

		if (oAccount)
		{
			oAccount.remove();
		}
	}
};

CAccountSettingsFormView.prototype.save = function ()
{
	this.isSaving(true);
	
	this.updateSavedState();
	
	Ajax.send('UpdateAccount', this.getParametersForSave(), this.onResponse, this);
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CAccountSettingsFormView.prototype.onResponse = function (oResponse, oRequest)
{
	this.isSaving(false);

	if (!oResponse.Result)
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('COREWEBCLIENT/ERROR_SAVING_SETTINGS_FAILED'));
	}
	else
	{
		var
			oParameters = oRequest.Parameters,
			iAccountId = Types.pInt(oParameters.AccountID),
			oAccount = AccountList.getAccount(iAccountId)
		;

		if (oAccount)
		{
			if (Types.isNonEmptyString(oParameters.IncomingPassword) && oParameters.IncomingPassword !== this.sFakePass)
			{
				oAccount.passwordMightBeIncorrect(false);
			}
			oAccount.updateFromServer(oResponse.Result);
			this.populate();
			Screens.showReport(TextUtils.i18n('COREWEBCLIENT/REPORT_SETTINGS_UPDATE_SUCCESS'));
		}
	}
};

CAccountSettingsFormView.prototype.changePassword = function ()
{
	if (this.allowChangePassword())
	{
		Popups.showPopup(ChangePasswordPopup, [{
			iAccountId: AccountList.editedId(),
			sModule: Settings.ServerModuleName,
			bHasOldPassword: true
		}]);
	}
};

module.exports = new CAccountSettingsFormView();


/***/ }),

/***/ "uo1V":
/*!**********************************************************************************!*\
  !*** ./modules/MailWebclient/js/views/settings/AccountUnifiedMailboxFormView.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	ko = __webpack_require__(/*! knockout */ "p09A"),

	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),

	CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),
	
	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	Ajax = __webpack_require__(/*! modules/MailWebclient/js/Ajax.js */ "QaEg"),
	Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy")
;

/**
 * @constructor
 */ 
function CAccountUnifiedMailboxFormView()
{
	CAbstractSettingsFormView.call(this, Settings.ServerModuleName);

	this.visibleTab = ko.computed(function () {
		return Settings.AllowUnifiedInbox && (Settings.AllowMultiAccounts && Settings.AllowAddAccounts || AccountList.collection().length > 1);
	}, this);
	
	this.includeInUnifiedMailbox = ko.observable(false);
	this.showUnifiedMailboxLabel = ko.observable(false);
	this.showUnifiedMailboxLabel.subscribe(function () {
		if (this.showUnifiedMailboxLabel())
		{
			if (this.unifiedMailboxLabelText() === '')
			{
				var oEditedAccount = AccountList.getEdited();
				this.unifiedMailboxLabelText(oEditedAccount.email());
			}
			if (this.unifiedMailboxLabelColor() === '')
			{
				this.unifiedMailboxLabelColor('#f09650');
			}
		}
	}, this);
	this.unifiedMailboxLabelText = ko.observable('');
	this.unifiedMailboxLabelColor = ko.observable('');

	AccountList.unifiedMailboxAccounts.subscribe(function () {
		var
			MailCache = __webpack_require__(/*! modules/MailWebclient/js/Cache.js */ "F0Fd"),
			HeaderItemView = __webpack_require__(/*! modules/MailWebclient/js/views/HeaderItemView.js */ "Uzkn")
		;
		MailCache.oUnifiedInbox.hasChanges(true);
		MailCache.oUnifiedInbox.removeAllMessageListsFromCacheIfHasChanges();
		if (AccountList.unifiedMailboxAccounts().length > 1) {
			MailCache.executeCheckMail();
		} else {
			HeaderItemView.hash(HeaderItemView.baseHash());
		}
	});

	this.aColors = [
		'#f09650',
		'#f68987',
		'#6fd0ce',
		'#8fbce2',
		'#b9a4f5',
		'#f68dcf',
		'#d88adc',
		'#4afdb4',
		'#9da1ff',
		'#5cc9c9',
		'#77ca71',
		'#aec9c9'
	];
}

_.extendOwn(CAccountUnifiedMailboxFormView.prototype, CAbstractSettingsFormView.prototype);

CAccountUnifiedMailboxFormView.prototype.ViewTemplate = 'MailWebclient_Settings_AccountUnifiedMailboxFormView';

CAccountUnifiedMailboxFormView.prototype.getCurrentValues = function ()
{
	return [
		this.includeInUnifiedMailbox(),
		this.showUnifiedMailboxLabel(),
		this.unifiedMailboxLabelText(),
		this.unifiedMailboxLabelColor()
	];
};

CAccountUnifiedMailboxFormView.prototype.getParametersForSave = function ()
{
	return {
		'AccountID': AccountList.editedId(),
		'IncludeInUnifiedMailbox': this.includeInUnifiedMailbox(),
		'ShowUnifiedMailboxLabel': this.showUnifiedMailboxLabel(),
		'UnifiedMailboxLabelText': $.trim(this.unifiedMailboxLabelText()),
		'UnifiedMailboxLabelColor': $.trim(this.unifiedMailboxLabelColor())
	};
};

CAccountUnifiedMailboxFormView.prototype.revert = function ()
{
	this.populate();
};

CAccountUnifiedMailboxFormView.prototype.populate = function ()
{
	var oAccount = AccountList.getEdited();
	
	if (oAccount)
	{
		this.includeInUnifiedMailbox(oAccount.includeInUnifiedMailbox());
		this.showUnifiedMailboxLabel(oAccount.showUnifiedMailboxLabel());
		this.unifiedMailboxLabelText(oAccount.unifiedMailboxLabelText());
		this.unifiedMailboxLabelColor(oAccount.unifiedMailboxLabelColor());
	}
	else
	{
		this.includeInUnifiedMailbox(false);
		this.showUnifiedMailboxLabel(false);
		this.unifiedMailboxLabelText('');
		this.unifiedMailboxLabelColor('');
	}
	
	this.updateSavedState();
};

CAccountUnifiedMailboxFormView.prototype.save = function ()
{
	this.isSaving(true);

	this.updateSavedState();

	Ajax.send('UpdateAccountUnifiedMailbox', this.getParametersForSave(), this.onResponse, this);
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CAccountUnifiedMailboxFormView.prototype.onResponse = function (oResponse, oRequest)
{
	this.isSaving(false);

	if (!oResponse.Result)
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('COREWEBCLIENT/ERROR_SAVING_SETTINGS_FAILED'));
	}
	else
	{
		var
			oParameters = oRequest.Parameters,
			iAccountId = Types.pInt(oParameters.AccountID),
			oAccount = AccountList.getAccount(iAccountId)
		;

		if (oAccount)
		{
			oAccount.updateFromServer(oResponse.Result);
			this.populate();
			Screens.showReport(TextUtils.i18n('COREWEBCLIENT/REPORT_SETTINGS_UPDATE_SUCCESS'));
		}
	}
};

CAccountUnifiedMailboxFormView.prototype.setColor = function (sColor) {
	this.unifiedMailboxLabelColor(sColor);
};

module.exports = new CAccountUnifiedMailboxFormView();


/***/ }),

/***/ "r9cz":
/*!*****************************************************************************!*\
  !*** ./modules/MailWebclient/js/views/settings/AccountsSettingsPaneView.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),

	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),

	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	Routing = __webpack_require__(/*! modules/CoreWebclient/js/Routing.js */ "W66n"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),

	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
	CreateAccountShortFormPopup = __webpack_require__(/*! modules/MailWebclient/js/popups/CreateAccountShortFormPopup.js */ "/nhf"),
	CreateIdentityPopup = __webpack_require__(/*! modules/MailWebclient/js/popups/CreateIdentityPopup.js */ "exVY"),
	CreateFetcherPopup = __webpack_require__(/*! modules/MailWebclient/js/popups/CreateFetcherPopup.js */ "hXOA"),
	CreateAliasPopup = __webpack_require__(/*! modules/MailWebclient/js/popups/CreateAliasPopup.js */ "KmL1"),

	Ajax = __webpack_require__(/*! modules/MailWebclient/js/Ajax.js */ "QaEg"),
	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	CServerModel = __webpack_require__(/*! modules/MailWebclient/js/models/CServerModel.js */ "Oh7n"),
	Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy"),

	AccountAutoresponderSettingsFormView = __webpack_require__(/*! modules/MailWebclient/js/views/settings/AccountAutoresponderSettingsFormView.js */ "JTYw"),
	AccountAllowBlockListsSettingsFormView = __webpack_require__(/*! modules/MailWebclient/js/views/settings/AccountAllowBlockListsSettingsFormView.js */ "exJb"),
	AccountFiltersSettingsFormView = __webpack_require__(/*! modules/MailWebclient/js/views/settings/AccountFiltersSettingsFormView.js */ "4Jr3"),
	AccountFoldersPaneView = __webpack_require__(/*! modules/MailWebclient/js/views/settings/AccountFoldersPaneView.js */ "DXx+"),
	AccountForwardSettingsFormView = __webpack_require__(/*! modules/MailWebclient/js/views/settings/AccountForwardSettingsFormView.js */ "dFFs"),
	AccountSettingsFormView = __webpack_require__(/*! modules/MailWebclient/js/views/settings/AccountSettingsFormView.js */ "0mCI"),
	AccountUnifiedMailboxFormView = __webpack_require__(/*! modules/MailWebclient/js/views/settings/AccountUnifiedMailboxFormView.js */ "uo1V"),
	CIdentitySettingsFormView = __webpack_require__(/*! modules/MailWebclient/js/views/settings/CIdentitySettingsFormView.js */ "ZS9T"),
	CFetcherIncomingSettingsFormView = __webpack_require__(/*! modules/MailWebclient/js/views/settings/CFetcherIncomingSettingsFormView.js */ "63Nt"),
	CAliasSettingsFormView = __webpack_require__(/*! modules/MailWebclient/js/views/settings/CAliasSettingsFormView.js */ "j60I"),
	FetcherOutgoingSettingsFormView = __webpack_require__(/*! modules/MailWebclient/js/views/settings/FetcherOutgoingSettingsFormView.js */ "6U3T"),
	SignatureSettingsFormView = __webpack_require__(/*! modules/MailWebclient/js/views/settings/SignatureSettingsFormView.js */ "N2aM")
;

/**
 * @constructor
 */
function CAccountsSettingsPaneView()
{
	this.bAllowAddAccounts = Settings.AllowAddAccounts;
	this.bAllowMultiAccounts = Settings.AllowMultiAccounts;
	this.bAllowIdentities = !!Settings.AllowIdentities;
	this.bAllowFetchers = !!Settings.AllowFetchers;
	this.bAllowAliases = !!Settings.AllowAliases;

	this.accounts = AccountList.collection;

	this.editedAccountId = AccountList.editedId;
	this.editedFetcher = ko.observable(null);
	this.editedFetcherId = ko.computed(function () {
		return this.editedFetcher() ? this.editedFetcher().id() : null;
	}, this);
	this.editedIdentity = ko.observable(null);
	this.editedIdentityHash = ko.computed(function () {
		return this.editedIdentity() ? this.editedIdentity().hash() : null;
	}, this);
	this.editedAlias = ko.observable(null);
	this.editedAliasId = ko.computed(function () {
		return this.editedAlias() ? this.editedAlias().id() : null;
	}, this);

	this.allowFolders = ko.observable(false);
	this.allowForward = ko.observable(false);
	this.allowAutoresponder = ko.observable(false);
	this.allowFilters = ko.observable(false);
	this.allowSignature = ko.observable(false);
	this.visibleAllowBlockLists = ko.observable(false);

	this.aAccountTabs = [
		{
			name: 'properties',
			title: TextUtils.i18n('MAILWEBCLIENT/LABEL_PROPERTIES_TAB'),
			view: AccountSettingsFormView,
			visible: AccountSettingsFormView.visibleTab
		},
		{
			name: 'unified',
			title: TextUtils.i18n('MAILWEBCLIENT/LABEL_UNIFIED_MAILBOX_TAB'),
			view: AccountUnifiedMailboxFormView,
			visible: AccountUnifiedMailboxFormView.visibleTab
		},
		{
			name: 'folders',
			title: TextUtils.i18n('MAILWEBCLIENT/LABEL_MANAGE_FOLDERS_TAB'),
			view: AccountFoldersPaneView,
			visible: this.allowFolders
		},
		{
			name: 'forward',
			title: TextUtils.i18n('MAILWEBCLIENT/LABEL_FORWARD_TAB'),
			view: AccountForwardSettingsFormView,
			visible: this.allowForward
		},
		{
			name: 'autoresponder',
			title: TextUtils.i18n('MAILWEBCLIENT/LABEL_AUTORESPONDER_TAB'),
			view: AccountAutoresponderSettingsFormView,
			visible: this.allowAutoresponder
		},
		{
			name: 'filters',
			title: TextUtils.i18n('MAILWEBCLIENT/LABEL_FILTERS_TAB'),
			view: AccountFiltersSettingsFormView,
			visible: this.allowFilters
		},
		{
			name: 'signature',
			title: TextUtils.i18n('MAILWEBCLIENT/LABEL_SIGNATURE_TAB'),
			view: SignatureSettingsFormView,
			visible: this.allowSignature
		},
		{
			name: 'allow-block-lists',
			title: TextUtils.i18n('MAILWEBCLIENT/LABEL_ACCOUNT_SPAM_TAB'),
			view: AccountAllowBlockListsSettingsFormView,
			visible: this.visibleAllowBlockLists
		}
	];

	this.aIdentityTabs = [
		{
			name: 'properties',
			title: TextUtils.i18n('MAILWEBCLIENT/LABEL_PROPERTIES_TAB'),
			view: new CIdentitySettingsFormView(this),
			visible: ko.observable(true)
		},
		{
			name: 'signature',
			title: TextUtils.i18n('MAILWEBCLIENT/LABEL_SIGNATURE_TAB'),
			view: SignatureSettingsFormView,
			visible: ko.observable(true)
		}
	];

	this.aFetcherTabs = [
		{
			name: 'incoming',
			title: TextUtils.i18n('MAILWEBCLIENT/LABEL_POP3_SETTINGS_TAB'),
			view: new CFetcherIncomingSettingsFormView(this),
			visible: ko.observable(true)
		},
		{
			name: 'outgoing',
			title: TextUtils.i18n('MAILWEBCLIENT/LABEL_SMTP_SETTINGS_TAB'),
			view: FetcherOutgoingSettingsFormView,
			visible: ko.observable(true)
		},
		{
			name: 'signature',
			title: TextUtils.i18n('MAILWEBCLIENT/LABEL_SIGNATURE_TAB'),
			view: SignatureSettingsFormView,
			visible: ko.observable(true)
		}
	];

	this.aAliasTabs = [
		{
			name: 'properties',
			title: TextUtils.i18n('MAILWEBCLIENT/LABEL_PROPERTIES_TAB'),
			view: new CAliasSettingsFormView(this, this.bAllowAliases),
			visible: ko.observable(true)
		},
		{
			name: 'signature',
			title: TextUtils.i18n('MAILWEBCLIENT/LABEL_SIGNATURE_TAB'),
			view: SignatureSettingsFormView,
			visible: ko.observable(true)
		}
	];

	this.currentTab = ko.observable(null);
	this.tabs = ko.computed(function () {
		if (this.editedIdentity())
		{
			return this.aIdentityTabs;
		}
		if (this.editedFetcher())
		{
			return this.aFetcherTabs;
		}
		if (this.editedAlias())
		{
			return this.aAliasTabs;
		}
		return this.aAccountTabs;
	}, this);

	AccountList.editedId.subscribe(function () {
		this.populate();
	}, this);

	App.broadcastEvent('MailWebclient::ConstructView::after', { Name: this.ViewConstructorName, View: this })
}

CAccountsSettingsPaneView.prototype.ViewTemplate = 'MailWebclient_Settings_AccountsSettingsPaneView';
CAccountsSettingsPaneView.prototype.ViewConstructorName = 'CAccountsSettingsPaneView'

/**
 * Checks if there are changes in accounts settings pane.
 * @returns {Boolean}
 */
CAccountsSettingsPaneView.prototype.hasUnsavedChanges = function ()
{
	var oCurrentTab = this.currentTab();
	return oCurrentTab && oCurrentTab.view && _.isFunction(oCurrentTab.view.hasUnsavedChanges) && oCurrentTab.view.hasUnsavedChanges();
};

/**
 * Reverts all changes in accounts settings pane.
 */
CAccountsSettingsPaneView.prototype.revert = function ()
{
	var oCurrentTab = this.currentTab();
	if (oCurrentTab && oCurrentTab.view && _.isFunction(oCurrentTab.view.revert))
	{
		oCurrentTab.view.revert();
	}
};

/**
 * @param {Function} fAfterHideHandler
 * @param {Function} fRevertRouting
 */
CAccountsSettingsPaneView.prototype.hide = function (fAfterHideHandler, fRevertRouting)
{
	if (this.currentTab() && _.isFunction(this.currentTab().view.hide))
	{
		this.currentTab().view.hide(fAfterHideHandler, fRevertRouting);
	}
	else
	{
		fAfterHideHandler();
	}
};

/**
 * @param {Array} aParams
 */
CAccountsSettingsPaneView.prototype.showTab = function (aParams)
{
	var
		sType = aParams.length > 0 ? aParams[0] : 'account',
		oEditedAccount = AccountList.getEdited(),
		sHash = aParams.length > 1 ? aParams[1] : (oEditedAccount ? oEditedAccount.hash() : ''),
		sTab = aParams.length > 2 ? aParams[2] : ''
	;

	this.editedIdentity(sType === 'identity' ? (AccountList.getIdentityByHash(sHash) || null) : null);
	this.editedFetcher(sType === 'fetcher' ? (AccountList.getFetcherByHash(sHash) || null) : null);
	this.editedAlias(sType === 'alias' ? (AccountList.getAliasByHash(sHash) || null) : null);

	if (sType === 'account')
	{
		if (aParams[1] === 'create' && !AccountList.hasAccount())
		{
			this.addAccount();
			Screens.showError(TextUtils.i18n('MAILWEBCLIENT/INFO_SPECIFY_CREDENTIALS'));
			Routing.replaceHashDirectly(['settings', 'mail-accounts']);
		}
		else if (sHash !== '')
		{
			if (oEditedAccount && oEditedAccount.hash() === sHash)
			{
				this.populate();
			}
			else
			{
				if (_.find(AccountList.collection(), function (oAccount) {
					return oAccount.hash() === sHash;
				}))
				{
					AccountList.changeEditedAccountByHash(sHash);
				}
				else
				{
					Routing.replaceHash(['settings', 'mail-accounts']);
				}
			}
		}
	}

	this.changeTab(sTab || this.getAutoselectedTab().name);
};

CAccountsSettingsPaneView.prototype.getAutoselectedTab = function ()
{
	var oCurrentTab = _.find(this.tabs(), function (oTab) {
		return oTab.visible();
	});

	if (!oCurrentTab)
	{
		oCurrentTab = this.tabs()[0];
	}

	return oCurrentTab;
};

CAccountsSettingsPaneView.prototype.addAccount = function ()
{
	var iTenantId = _.isFunction(App.getTenantId) ? App.getTenantId() : null;
	if (iTenantId !== null)
	{
		Ajax.send('GetServers', {
			'TenantId': iTenantId
		}, function (oResponse) {
			var aOAuthOptions = [];
			if (_.isArray(oResponse && oResponse.Result && oResponse.Result.Items))
			{
				_.each(oResponse.Result.Items, function (oServerData) {
					var oServer = new CServerModel(oServerData);
					if (oServer.bOauthEnable)
					{
						aOAuthOptions.push({
							'Name': oServer.sOauthName,
							'Type': oServer.sOauthType,
							'IconUrl': oServer.sOauthIconUrl
						});
					}
				});

				if (aOAuthOptions.length > 0)
				{
					aOAuthOptions.push({
						'Name': 'Other',
						'Type': '',
						'IconUrl': 'static/styles/images/modules/MailWebclient/logo_other.png'
					});
				}
			}
			this.openCreateAccountShortFormPopup(aOAuthOptions);
		}, this);
	}
	else
	{
		this.openCreateAccountShortFormPopup([]);
	}
};

CAccountsSettingsPaneView.prototype.openCreateAccountShortFormPopup = function (aOAuthOptions)
{
	Popups.showPopup(CreateAccountShortFormPopup, [aOAuthOptions, _.bind(function (iAccountId) {
		var oAccount = AccountList.getAccount(iAccountId);
		if (oAccount)
		{
			this.editAccount(oAccount.hash());
		}
	}, this)]);
};

/**
 * @param {string} sHash
 */
CAccountsSettingsPaneView.prototype.editAccount = function (sHash)
{
	ModulesManager.run('SettingsWebclient', 'setAddHash', [['account', sHash]]);
};

/**
 * @param {number} iAccountId
 * @param {Object} oEv
 */
CAccountsSettingsPaneView.prototype.addIdentity = function (iAccountId, oEv)
{
	oEv.stopPropagation();
	Popups.showPopup(CreateIdentityPopup, [iAccountId]);
};

/**
 * @param {string} sHash
 */
CAccountsSettingsPaneView.prototype.editIdentity = function (sHash)
{
	ModulesManager.run('SettingsWebclient', 'setAddHash', [['identity', sHash]]);
};

/**
 * @param {number} iAccountId
 * @param {Object} oEv
 */
CAccountsSettingsPaneView.prototype.addFetcher = function (iAccountId, oEv)
{
	oEv.stopPropagation();
	Popups.showPopup(CreateFetcherPopup, [iAccountId]);
};

/**
 * @param {string} sHash
 */
CAccountsSettingsPaneView.prototype.editFetcher = function (sHash)
{
	ModulesManager.run('SettingsWebclient', 'setAddHash', [['fetcher', sHash]]);
};

/**
 * @param {number} iAccountId
 * @param {Object} oEv
 */
CAccountsSettingsPaneView.prototype.addAlias = function (iAccountId, oEv)
{
	oEv.stopPropagation();
	Popups.showPopup(CreateAliasPopup, [iAccountId]);
};

/**
 * @param {string} sHash
 */
CAccountsSettingsPaneView.prototype.editAlias = function (sHash)
{
	ModulesManager.run('SettingsWebclient', 'setAddHash', [['alias', sHash]]);
};

/**
 * @param {string} sTabName
 */
CAccountsSettingsPaneView.prototype.changeRoute = function (sTabName)
{
	var
		oEditedAccount = AccountList.getEdited(),
		aAddHash = ['account', oEditedAccount ? oEditedAccount.hash() : '', sTabName]
	;
	if (this.editedIdentity())
	{
		aAddHash = ['identity', this.editedIdentity().hash(), sTabName];
	}
	else if (this.editedFetcher())
	{
		aAddHash = ['fetcher', this.editedFetcher().hash(), sTabName];
	}
	else if (this.editedAlias())
	{
		aAddHash = ['alias', this.editedAlias().hash(), sTabName];
	}
	ModulesManager.run('SettingsWebclient', 'setAddHash', [aAddHash]);
};

/**
 * @param {string} sName
 */
CAccountsSettingsPaneView.prototype.changeTab = function (sName)
{
	var
		oCurrentTab = this.currentTab(),
		oNewTab = _.find(this.tabs(), function (oTab) {
			return oTab.visible() && oTab.name === sName;
		}),
		fShowNewTab = function () {
			if (oNewTab)
			{
				if (_.isFunction(oNewTab.view.showTab))
				{
					oNewTab.view.showTab(this.editedIdentity() || this.editedFetcher() || this.editedAlias());
				}
				this.currentTab(oNewTab);
			}
		}.bind(this),
		bShow = true
	;

	if (oNewTab)
	{
		if (oCurrentTab && _.isFunction(oCurrentTab.view.hide))
		{
			oCurrentTab.view.hide(fShowNewTab, _.bind(function () {
				if (_.isFunction(Routing.stopListening) && _.isFunction(Routing.startListening))
				{
					Routing.stopListening();
				}
				this.changeRoute(oCurrentTab.name);
				if (_.isFunction(Routing.startListening))
				{
					Routing.startListening();
				}
			}, this));
			bShow = false;
		}
	}
	else if (!oCurrentTab)
	{
		oNewTab = this.getAutoselectedTab();
	}

	if (!oCurrentTab)
	{
		_.delay(_.bind(function () {
			this.changeRoute(oNewTab.name);
		}, this));
	}

	if (bShow)
	{
		fShowNewTab();
	}
};

CAccountsSettingsPaneView.prototype.populate = function ()
{
	var oAccount = AccountList.getEdited();

	if (oAccount)
	{
		this.allowFolders(oAccount.allowManageFolders());
		this.allowForward(oAccount.allowForward());
		this.allowAutoresponder(oAccount.allowAutoresponder());
		this.allowFilters(oAccount.allowFilters());
		this.allowSignature(!Settings.AllowIdentities);
		this.visibleAllowBlockLists(oAccount.enableAllowBlockLists());

		if (!this.currentTab() || !this.currentTab().visible())
		{
			this.currentTab(this.getAutoselectedTab());
		}
	}
};

CAccountsSettingsPaneView.prototype.onRemoveIdentity = function ()
{
	this.editedIdentity(null);
	this.changeTab(this.currentTab() ? this.currentTab().name : '');
};

CAccountsSettingsPaneView.prototype.onRemoveFetcher = function ()
{
	this.editedFetcher(null);
	this.changeRoute('');
};

CAccountsSettingsPaneView.prototype.onRemoveAlias = function ()
{
	this.editedAlias(null);
	this.changeRoute('');
};

module.exports = new CAccountsSettingsPaneView();


/***/ }),

/***/ "j60I":
/*!***************************************************************************!*\
  !*** ./modules/MailWebclient/js/views/settings/CAliasSettingsFormView.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),

	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
	CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),
	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	CoreAjax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
	Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy"),
	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
	ConfirmPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/ConfirmPopup.js */ "XeMN")
;

/**
 * @constructor
 * 
 * @param {Object} oParent
 * @param {boolean} bAllowAliases
 */
function CAliasSettingsFormView(oParent, bAllowAliases)
{
	CAbstractSettingsFormView.call(this, Settings.ServerModuleName);

	this.alias = ko.observable(null);
	this.oParent = oParent;
	this.disableRemoveAlias = ko.observable(!bAllowAliases);
	this.friendlyName = ko.observable('');
	this.friendlyNameHasFocus = ko.observable(false);
}

_.extendOwn(CAliasSettingsFormView.prototype, CAbstractSettingsFormView.prototype);

CAliasSettingsFormView.prototype.ViewTemplate = 'MailWebclient_Settings_AliasSettingsFormView';
CAliasSettingsFormView.prototype.ViewConstructorName = 'CAliasSettingsFormView';

/**
 * @param {Object} oAlias
 */
CAliasSettingsFormView.prototype.onShow = function (oAlias)
{
	this.alias(oAlias && oAlias.ALIAS ? oAlias : null);
	this.populate();
};

CAliasSettingsFormView.prototype.getCurrentValues = function ()
{
	return [
		this.friendlyName()
	];
};

CAliasSettingsFormView.prototype.getParametersForSave = function ()
{
	if (this.alias())
	{
		var
			oParameters = {
				'AccountID': this.alias().accountId(),
				'FriendlyName': this.friendlyName(),
				'EntityId': this.alias().id()
			}
		;

		return oParameters;
	}

	return {};
};

CAliasSettingsFormView.prototype.save = function ()
{
	this.isSaving(true);
	this.updateSavedState();
	CoreAjax.send(Settings.AliasesServerModuleName, 'UpdateAlias', this.getParametersForSave(), this.onResponse, this);
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CAliasSettingsFormView.prototype.onResponse = function (oResponse, oRequest)
{
	this.isSaving(false);

	if (!oResponse.Result)
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('MAILWEBCLIENT/ERROR_ALIAS_ADDING'));
	}
	else
	{
		AccountList.populateAliases(function () {
			var
				oCurrAccount = AccountList.getCurrent(),
				aCurrAliases = oCurrAccount.aliases(),
				oCreatedAlias = _.find(aCurrAliases, function (oAlias) {
					return oAlias.id() === oResponse.Result;
				})
			;
			if (oCreatedAlias)
			{
				ModulesManager.run('SettingsWebclient', 'setAddHash', [['alias', oCreatedAlias.hash()]]);
			}
		});

		Screens.showReport(TextUtils.i18n('COREWEBCLIENT/REPORT_SETTINGS_UPDATE_SUCCESS'));
	}
};

CAliasSettingsFormView.prototype.populate = function ()
{
	var oAlias = this.alias();

	if (oAlias)
	{
		this.friendlyName(oAlias.friendlyName());

		setTimeout(function () {
			this.updateSavedState();
		}.bind(this), 1);
	}
};

CAliasSettingsFormView.prototype.remove = function ()
{
	if (this.alias())
	{
		Popups.showPopup(
			ConfirmPopup, 
			[
				TextUtils.i18n('MAILWEBCLIENT/CONFIRM_DELETE_ALIAS'),
				_.bind(function (bRemove) {
					if (bRemove)
					{
						var oParameters = {
							'AccountID': this.alias().accountId(),
							'Aliases': [this.alias().email()]
						};

						CoreAjax.send(Settings.AliasesServerModuleName, 'DeleteAliases', oParameters, this.onAccountAliasDeleteResponse, this);
						if (_.isFunction(this.oParent.onRemoveAlias))
						{
							this.oParent.onRemoveAlias();
						}
					}
				},
				this)
			]
		);
	}
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CAliasSettingsFormView.prototype.onAccountAliasDeleteResponse = function (oResponse, oRequest)
{
	if (!oResponse.Result)
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('MAILWEBCLIENT/ERROR_ALIAS_DELETING'));
	}
	AccountList.populateAliases();
};

CAliasSettingsFormView.prototype.cancel = function ()
{
	if (_.isFunction(this.oParent.cancelPopup))
	{
		this.oParent.cancelPopup();
	}
};

module.exports = CAliasSettingsFormView;


/***/ }),

/***/ "63Nt":
/*!*************************************************************************************!*\
  !*** ./modules/MailWebclient/js/views/settings/CFetcherIncomingSettingsFormView.js ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
	
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
	CoreAjax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
	
	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
	ConfirmPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/ConfirmPopup.js */ "XeMN"),
	
	CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),
	
	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	MailCache = __webpack_require__(/*! modules/MailWebclient/js/Cache.js */ "F0Fd"),
	Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy"),
	
	CServerPropertiesView = __webpack_require__(/*! modules/MailWebclient/js/views/CServerPropertiesView.js */ "DBk0")
;

/**
 * @constructor
 * @param {object} oParent
 */
function CFetcherIncomingSettingsFormView(oParent)
{
	CAbstractSettingsFormView.call(this, Settings.ServerModuleName);
	
	this.oParent = oParent;
	
	this.bShown = false;
	
	this.fetcher = ko.observable(null);
	this.idFetcher = ko.observable(null);

	this.isEnabled = ko.observable(true);

	this.incomingLogin = ko.observable('');
	this.sFakePass = '******';
	this.incomingPassword = ko.observable(this.sFakePass);
	this.oIncoming = new CServerPropertiesView(110, 995, 'fetcher_edit_incoming', TextUtils.i18n('MAILWEBCLIENT/LABEL_POP3_SERVER'));

	this.sFetcherFolder = '';
	this.folder = ko.observable('');
	this.options = ko.observableArray([]);
	MailCache.folderList.subscribe(function () {
		this.populateOptions();
	}, this);

	this.leaveMessagesOnServer = ko.observable(false);

	this.passwordIsSelected = ko.observable(false);

	this.defaultOptionsAfterRender = Utils.defaultOptionsAfterRender;
	
	this.fetcherIntervalHint = ko.computed(function () {
		var iCheckIntervalMinutes = this.fetcher() ? this.fetcher().iCheckIntervalMinutes : 0;
		if (iCheckIntervalMinutes !== 0)
		{
			return TextUtils.i18n('MAILWEBCLIENT/INFO_POP3_FETCHER_PLURAL', {'INTERVAL': iCheckIntervalMinutes}, null, iCheckIntervalMinutes);
		}
		return '';
	}, this);
}

_.extendOwn(CFetcherIncomingSettingsFormView.prototype, CAbstractSettingsFormView.prototype);

CFetcherIncomingSettingsFormView.prototype.ViewTemplate = 'MailWebclient_Settings_FetcherIncomingSettingsFormView';

/**
 * @param {Object} oFetcher
 */
CFetcherIncomingSettingsFormView.prototype.onShow = function (oFetcher)
{
	this.fetcher(oFetcher && oFetcher.FETCHER ? oFetcher : null);
	this.populateOptions();
	this.populate();
};

/**
 * @param {Function} fShowNewTab
 */
CFetcherIncomingSettingsFormView.prototype.hide = function (fShowNewTab)
{
	this.bShown = false;
	fShowNewTab();
};

CFetcherIncomingSettingsFormView.prototype.populateOptions = function ()
{
	if (this.bShown)
	{
		this.options(MailCache.folderList().getOptions('', true, false, false));
		if (this.sFetcherFolder !== this.folder())
		{
			this.folder(this.sFetcherFolder);
			this.updateSavedState();
		}
	}
};

CFetcherIncomingSettingsFormView.prototype.getCurrentValues = function ()
{
	return [
		this.isEnabled(),
		this.oIncoming.server(),
		this.oIncoming.port(),
		this.oIncoming.ssl(),
		this.incomingPassword(),
		this.folder(),
		this.leaveMessagesOnServer()
	];
};

CFetcherIncomingSettingsFormView.prototype.getParametersForSave = function ()
{
	if (this.fetcher())
	{
		var
			sIncomingPassword = $.trim(this.incomingPassword()),
			oParameters = {
				'FetcherId': this.idFetcher(),
				'IsEnabled': this.isEnabled(),
				'Folder': this.folder(),
				'IncomingServer': this.oIncoming.server(),
				'IncomingPort': this.oIncoming.getIntPort(),
				'IncomingUseSsl': this.oIncoming.ssl(),
				'LeaveMessagesOnServer': this.leaveMessagesOnServer()
			}
		;
		if (sIncomingPassword !== '' && sIncomingPassword !== this.sFakePass)
		{
			oParameters['IncomingPassword'] = sIncomingPassword;
		}
		return oParameters;
	}
	
	return {};
};

CFetcherIncomingSettingsFormView.prototype.save = function ()
{
	if (this.isEmptyRequiredFields())
	{
		Screens.showError(TextUtils.i18n('COREWEBCLIENT/ERROR_REQUIRED_FIELDS_EMPTY'));
	}
	else
	{
		this.isSaving(true);

		this.updateSavedState();

		CoreAjax.send(Settings.FetchersServerModuleName, 'UpdateFetcher', this.getParametersForSave(), this.onResponse, this);
	}
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CFetcherIncomingSettingsFormView.prototype.onResponse = function (oResponse, oRequest)
{
	this.isSaving(false);

	if (!oResponse.Result)
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('COREWEBCLIENT/ERROR_UNKNOWN'));
	}
	else
	{
		AccountList.populateFetchers();
		
		Screens.showReport(TextUtils.i18n('MAILWEBCLIENT/REPORT_SUCCESSFULLY_SAVED'));
	}
};

CFetcherIncomingSettingsFormView.prototype.populate = function ()
{
	var oFetcher = this.fetcher();
	
	if (oFetcher)
	{
		this.sFetcherFolder = oFetcher.folder();

		this.idFetcher(oFetcher.id());

		this.isEnabled(oFetcher.isEnabled());

		this.folder(oFetcher.folder());
		this.oIncoming.set(oFetcher.incomingServer(), oFetcher.incomingPort(), oFetcher.incomingUseSsl());
		this.incomingLogin(oFetcher.incomingLogin());
		this.incomingPassword(this.sFakePass);
		this.leaveMessagesOnServer(oFetcher.leaveMessagesOnServer());

		this.updateSavedState();
	}
};
CFetcherIncomingSettingsFormView.prototype.isEmptyRequiredFields = function ()
{
	if (this.oIncoming.server() === '')
	{
		this.oIncoming.server.focused(true);
		return true;
	}
	
	if ($.trim(this.incomingPassword()) === '')
	{
		this.passwordIsSelected(true);
		return true;
	}
	
	return false;
};

CFetcherIncomingSettingsFormView.prototype.remove = function ()
{
	var
		oFetcher = this.fetcher(),
		fCallBack = function (bOkAnswer) {
			if (bOkAnswer)
			{
				var oParameters = {
					'FetcherId': oFetcher.id()
				};

				CoreAjax.send(Settings.FetchersServerModuleName, 'DeleteFetcher', oParameters, this.onAccountDeleteFetcherResponse, this);

				if (this.oParent && _.isFunction(this.oParent.onRemoveFetcher))
				{
					this.oParent.onRemoveFetcher();
				}
			}
		}.bind(this)
	;
	
	if (oFetcher)
	{
		Popups.showPopup(ConfirmPopup, [TextUtils.i18n('MAILWEBCLIENT/CONFIRM_REMOVE_FETCHER'), fCallBack, oFetcher.incomingLogin()]);
	}
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CFetcherIncomingSettingsFormView.prototype.onAccountDeleteFetcherResponse = function (oResponse, oRequest)
{
	if (!oResponse.Result)
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('MAILWEBCLIENT/ERROR_FETCHER_DELETING'));
	}
	AccountList.populateFetchers();
};

module.exports = CFetcherIncomingSettingsFormView;


/***/ }),

/***/ "ZS9T":
/*!******************************************************************************!*\
  !*** ./modules/MailWebclient/js/views/settings/CIdentitySettingsFormView.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
	
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
	
	CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),
	
	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	Ajax = __webpack_require__(/*! modules/MailWebclient/js/Ajax.js */ "QaEg"),
	Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy")
;

/**
 * @constructor
 * 
 * @param {Object} oParent
 * @param {boolean} bCreate
 */
function CIdentitySettingsFormView(oParent, bCreate)
{
	CAbstractSettingsFormView.call(this, Settings.ServerModuleName);
	
	this.identity = ko.observable(null);
	
	this.oParent = oParent;
	this.bCreate = bCreate;

	this.disableCheckbox = ko.observable(false);

	this.isDefault = ko.observable(false);
	this.email = ko.observable('');
	this.emailList = ko.observableArray([]);
	this.selectedEmail = ko.observable('');
	this.disableEditEmail = ko.observable(Settings.OnlyUserEmailsInIdentities);
	this.disableRemoveIdentity = ko.observable(bCreate);
	this.friendlyName = ko.observable('');
	this.friendlyNameHasFocus = ko.observable(false);
}

_.extendOwn(CIdentitySettingsFormView.prototype, CAbstractSettingsFormView.prototype);

CIdentitySettingsFormView.prototype.ViewTemplate = 'MailWebclient_Settings_IdentitySettingsFormView';
CIdentitySettingsFormView.prototype.ViewConstructorName = 'CIdentitySettingsFormView';

/**
 * @param {Object} oIdentity
 */
CIdentitySettingsFormView.prototype.onShow = function (oIdentity)
{
	this.identity(oIdentity && !oIdentity.FETCHER ? oIdentity : null);
	this.populate();
};

CIdentitySettingsFormView.prototype.getCurrentValues = function ()
{
	return [
		this.friendlyName(),
		this.email()
	];
};

CIdentitySettingsFormView.prototype.getParametersForSave = function ()
{
	if (this.identity())
	{
		var
			oParameters = {
				'AccountID': this.identity().accountId(),
				'Default': this.isDefault(),
				'FriendlyName': this.friendlyName(),
				'AccountPart': this.identity().bAccountPart
			}
		;

		if (!this.identity().bAccountPart)
		{
			_.extendOwn(oParameters, {
				'Email': this.emailList().length > 0 ? $.trim(this.selectedEmail()) : $.trim(this.email())
			});

			if (!this.bCreate)
			{
				oParameters.EntityId = this.identity().id();
			}
		}

		return oParameters;
	}
	
	return {};
};

CIdentitySettingsFormView.prototype.save = function ()
{
	if ($.trim(this.email()) === '')
	{
		Screens.showError(Utils.i18n('MAILWEBCLIENT/ERROR_IDENTITY_FIELDS_BLANK'));
	}
	else
	{
		this.isSaving(true);

		this.updateSavedState();

		Ajax.send(this.bCreate ? 'CreateIdentity' : 'UpdateIdentity', this.getParametersForSave(), this.onResponse, this);
	}
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CIdentitySettingsFormView.prototype.onResponse = function (oResponse, oRequest)
{
	this.isSaving(false);

	if (!oResponse.Result)
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('MAILWEBCLIENT/ERROR_IDENTITY_ADDING'));
	}
	else
	{
		var
			oParameters = oRequest.Parameters,
			iAccountId = Types.pInt(oParameters.AccountID),
			oAccount = 0 < iAccountId ? AccountList.getAccount(iAccountId) : null
		;
		
		AccountList.populateIdentities(function () {
			var
				oCurrAccount = AccountList.getCurrent(),
				aCurrIdentities = oCurrAccount.identities(),
				oCreatedIdentity = _.find(aCurrIdentities, function (oIdentity) {
					return oIdentity.id() === oResponse.Result;
				})
			;
			if (oCreatedIdentity) {
				ModulesManager.run('SettingsWebclient', 'setAddHash', [['identity', oCreatedIdentity.hash()]]);
			}
		});
		
		if (this.bCreate && _.isFunction(this.oParent.closePopup))
		{
			this.oParent.closePopup();
		}

		if (oParameters.AccountPart && oAccount)
		{
			oAccount.updateFriendlyName(oParameters.FriendlyName);
		}

		this.disableCheckbox(this.isDefault());
		
		Screens.showReport(TextUtils.i18n('COREWEBCLIENT/REPORT_SETTINGS_UPDATE_SUCCESS'));
	}
};

CIdentitySettingsFormView.prototype.populate = function ()
{
	var oIdentity = this.identity();
	
	if (oIdentity)
	{
		this.isDefault(oIdentity.isDefault());
		this.email(oIdentity.email());
		this.disableEditEmail(Settings.OnlyUserEmailsInIdentities || oIdentity.bAccountPart);
		this.disableRemoveIdentity(this.bCreate || oIdentity.bAccountPart);
		
		this.emailList([]);
		if (Settings.OnlyUserEmailsInIdentities && !oIdentity.bAccountPart)
		{
			var aAliases = [];
			var oAccount = AccountList.getAccount(oIdentity.accountId());
			if (oAccount)
			{
				aAliases = oAccount.aExtend.Aliases;
			}
			if (Types.isNonEmptyArray(aAliases))
			{
				this.emailList(_.clone(aAliases));
				this.emailList.unshift(oIdentity.email());
				this.selectedEmail(oIdentity.email());
			}
		}
		
		this.friendlyName(oIdentity.friendlyName());

		this.disableCheckbox(oIdentity.isDefault());

		setTimeout(function () {
			this.updateSavedState();
		}.bind(this), 1);
	}
};

CIdentitySettingsFormView.prototype.remove = function ()
{
	if (this.identity() && !this.identity().bAccountPart)
	{
		var oParameters = {
			'AccountID': this.identity().accountId(),
			'EntityId': this.identity().id()
		};

		Ajax.send('DeleteIdentity', oParameters, this.onAccountIdentityDeleteResponse, this);

		if (!this.bCreate && _.isFunction(this.oParent.onRemoveIdentity))
		{
			this.oParent.onRemoveIdentity();
		}
	}
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CIdentitySettingsFormView.prototype.onAccountIdentityDeleteResponse = function (oResponse, oRequest)
{
	if (!oResponse.Result)
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('MAILWEBCLIENT/ERROR_IDENTITY_DELETING'));
	}
	AccountList.populateIdentities();
};

CIdentitySettingsFormView.prototype.cancel = function ()
{
	if (_.isFunction(this.oParent.cancelPopup))
	{
		this.oParent.cancelPopup();
	}
};

module.exports = CIdentitySettingsFormView;


/***/ }),

/***/ "Z8ia":
/*!******************************************************************************!*\
  !*** ./modules/MailWebclient/js/views/settings/CServerPairPropertiesView.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	ko = __webpack_require__(/*! knockout */ "p09A"),

	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	ValidationUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Validation.js */ "171C"),

	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),

	Ajax = __webpack_require__(/*! modules/MailWebclient/js/Ajax.js */ "QaEg"),
	Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy"),

	CServerModel = __webpack_require__(/*! modules/MailWebclient/js/models/CServerModel.js */ "Oh7n"),
	CServerPropertiesView = __webpack_require__(/*! modules/MailWebclient/js/views/CServerPropertiesView.js */ "DBk0")
;

/**
 * @constructor
 * @param {string} sPairId
 * @param {boolean} bAdminEdit
 * @param {int} iServersPerPage
 */
function CServerPairPropertiesView(sPairId, bAdminEdit, iServersPerPage)
{
	var oParams = {
		aOauthConnectorsData: []
	};
	App.broadcastEvent('MailWebclient::GetOauthConnectorsData', oParams);
	this.bVisibleOauthSettings =  bAdminEdit && Types.isNonEmptyArray(oParams.aOauthConnectorsData);
	this.aOauthConnectorsData = Types.pArray(oParams.aOauthConnectorsData);
	this.oauthSelectedConnector = ko.observable('');


	this.iServersPerPage = Types.pInt(iServersPerPage, 0);
	this.totalServersCount = ko.observable(0);
	this.servers = ko.observableArray([]);
	this.serversRetrieved = ko.observable(false);
	this.serverOptions = ko.observableArray([{ 'Name': TextUtils.i18n('MAILWEBCLIENT/LABEL_CONFIGURE_SERVER_MANUALLY'), 'Id': 0 }]);
	this.selectedServerId = ko.observable(0);
	this.oLastEditableServer = new CServerModel();
	this.iEditedServerId = 0;
	this.selectedServerId.subscribe(function () {
		var
			iSelectedServerId = this.selectedServerId(),
			oSelectedServer = _.find(this.servers(), function (oServer) {
				return oServer.iId === iSelectedServerId;
			})
		;

		if (oSelectedServer)
		{
			if (this.oIncoming.isEnabled())
			{
				this.oLastEditableServer = new CServerModel(this.getParametersForSave());
			}
			this.setExternalAccessServers(oSelectedServer.bSetExternalAccessServers);
			this.externalAccessImapServer(oSelectedServer.sExternalAccessImapServer);
			this.externalAccessImapPort(oSelectedServer.iExternalAccessImapPort);
			this.externalAccessImapAlterPort(oSelectedServer.iExternalAccessImapAlterPort > 0 ? oSelectedServer.iExternalAccessImapAlterPort : '');
			this.externalAccessImapUseSsl(oSelectedServer.bExternalAccessImapUseSsl);
			this.externalAccessPop3Server(oSelectedServer.sExternalAccessPop3Server);
			this.externalAccessPop3Port(oSelectedServer.iExternalAccessPop3Port);
			this.externalAccessPop3AlterPort(oSelectedServer.iExternalAccessPop3AlterPort > 0 ? oSelectedServer.iExternalAccessPop3AlterPort : '');
			this.externalAccessPop3UseSsl(oSelectedServer.bExternalAccessPop3UseSsl);
			this.externalAccessSmtpServer(oSelectedServer.sExternalAccessSmtpServer);
			this.externalAccessSmtpPort(oSelectedServer.iExternalAccessSmtpPort);
			this.externalAccessSmtpAlterPort(oSelectedServer.iExternalAccessSmtpAlterPort > 0 ? oSelectedServer.iExternalAccessSmtpAlterPort : '');
			this.externalAccessSmtpUseSsl(oSelectedServer.bExternalAccessSmtpUseSsl);

			this.oauthSelectedConnector(oSelectedServer.bOauthEnable ? oSelectedServer.sOauthType : '');

			this.tenantId(oSelectedServer.iTenantId);
			this.name(oSelectedServer.sName);
			this.oIncoming.set(oSelectedServer.sIncomingServer, oSelectedServer.iIncomingPort, oSelectedServer.bIncomingUseSsl);
			this.oIncoming.isEnabled(this.bAdminEdit);
			this.oOutgoing.set(oSelectedServer.sOutgoingServer, oSelectedServer.iOutgoingPort, oSelectedServer.bOutgoingUseSsl);
			this.oOutgoing.isEnabled(this.bAdminEdit);
			this.outgoingUseAuth(oSelectedServer.sSmtpAuthType === window.Enums.SmtpAuthType.UseUserCredentials);
			this.outgoingUseAuth.enable(this.bAdminEdit);
			this.domains(oSelectedServer.sDomains);
			this.smtpAuthType(oSelectedServer.sSmtpAuthType);
			this.smtpLogin(oSelectedServer.sSmtpLogin);
			this.smtpPassword(oSelectedServer.sSmtpPassword);
			this.enableSieve(oSelectedServer.bEnableSieve);
			this.sievePort(oSelectedServer.iSievePort);
			this.enableThreading(oSelectedServer.bEnableThreading);
			this.useFullEmailAddressAsLogin(oSelectedServer.bUseFullEmailAddressAsLogin);
		}
		else
		{
			this.setExternalAccessServers(this.oLastEditableServer.bSetExternalAccessServers);
			this.externalAccessImapServer(this.oLastEditableServer.sExternalAccessImapServer);
			this.externalAccessImapPort(this.oLastEditableServer.iExternalAccessImapPort);
			this.externalAccessImapAlterPort(this.oLastEditableServer.iExternalAccessImapAlterPort > 0 ? this.oLastEditableServer.iExternalAccessImapAlterPort : '');
			this.externalAccessImapUseSsl(this.oLastEditableServer.bExternalAccessImapUseSsl);
			this.externalAccessPop3Server(this.oLastEditableServer.sExternalAccessPop3Server);
			this.externalAccessPop3Port(this.oLastEditableServer.iExternalAccessPop3Port);
			this.externalAccessPop3AlterPort(this.oLastEditableServer.iExternalAccessPop3AlterPort > 0 ? this.oLastEditableServer.iExternalAccessPop3AlterPort : '');
			this.externalAccessPop3UseSsl(this.oLastEditableServer.bExternalAccessPop3UseSsl);
			this.externalAccessSmtpServer(this.oLastEditableServer.sExternalAccessSmtpServer);
			this.externalAccessSmtpPort(this.oLastEditableServer.iExternalAccessSmtpPort);
			this.externalAccessSmtpAlterPort(this.oLastEditableServer.iExternalAccessSmtpAlterPort > 0 ? this.oLastEditableServer.iExternalAccessSmtpAlterPort : '');
			this.externalAccessSmtpUseSsl(this.oLastEditableServer.bExternalAccessSmtpUseSsl);

			this.oauthSelectedConnector(this.oLastEditableServer.bOauthEnable ? this.oLastEditableServer.sOauthType : '');

			this.tenantId(0);
			this.name(this.oLastEditableServer.sName);
			this.oIncoming.set(this.oLastEditableServer.sIncomingServer, this.oLastEditableServer.iIncomingPort, this.oLastEditableServer.bIncomingUseSsl);
			this.oIncoming.isEnabled(true);
			this.oOutgoing.set(this.oLastEditableServer.sOutgoingServer, this.oLastEditableServer.iOutgoingPort, this.oLastEditableServer.bOutgoingUseSsl);
			this.oOutgoing.isEnabled(true);
			this.outgoingUseAuth(this.oLastEditableServer.sSmtpAuthType === window.Enums.SmtpAuthType.UseUserCredentials);
			this.outgoingUseAuth.enable(true);
			this.domains('');
			this.smtpAuthType(window.Enums.SmtpAuthType.UseUserCredentials);
			this.smtpLogin('');
			this.smtpPassword('');
			this.enableSieve(false);
			this.sievePort(4190);
			this.enableThreading(true);
			this.useFullEmailAddressAsLogin(true);
		}

		this.setCurrentValues();
	}, this);

	this.tenantId = ko.observable(0);
	this.name = ko.observable('');
	this.name.focused = ko.observable(false);
	this.bAdminEdit = bAdminEdit;
	this.oIncoming = new CServerPropertiesView(143, 993, sPairId + '_incoming', TextUtils.i18n('MAILWEBCLIENT/LABEL_IMAP_SERVER'), null);
	this.oOutgoing = new CServerPropertiesView(25, 465, sPairId + '_outgoing', TextUtils.i18n('MAILWEBCLIENT/LABEL_SMTP_SERVER'), this.oIncoming.server);
	this.outgoingUseAuth = ko.observable(true);
	this.outgoingUseAuth.enable = ko.observable(true);
	this.domains = ko.observable('');
	this.bAllowEditDomains = Settings.AllowEditDomainsInServer;
//	this.name.focused.subscribe(function () {
//		if (this.bAllowEditDomains && !this.name.focused() && this.domains() === '')
//		{
//			this.domains(this.name());
//		}
//	}, this);
	this.smtpAuthType = ko.observable(window.Enums.SmtpAuthType.UseUserCredentials);
	this.smtpLogin = ko.observable('');
	this.smtpPassword = ko.observable('');
	this.enableSieve = ko.observable(false);
	this.sievePort = ko.observable(4190);
	this.enableThreading = ko.observable(true);
	this.useFullEmailAddressAsLogin = ko.observable(true);

	this.currentValues = ko.observable('');

	this.aRequiredFields = [this.oIncoming.server, this.oIncoming.port, this.oOutgoing.server, this.oOutgoing.port];
	if (bAdminEdit)
	{
		this.aRequiredFields.unshift(this.name);
	}

	this.setExternalAccessServers = ko.observable(false);
	this.externalAccessImapServer = ko.observable(this.oIncoming.server());
	this.externalAccessImapPort = ko.observable(this.oIncoming.port());
	this.externalAccessImapAlterPort = ko.observable('');
	this.externalAccessImapUseSsl = ko.observable(false);
	this.externalAccessPop3Server = ko.observable('');
	this.externalAccessPop3Port = ko.observable(110);
	this.externalAccessPop3AlterPort = ko.observable('');
	this.externalAccessPop3UseSsl = ko.observable(false);
	this.externalAccessSmtpServer = ko.observable(this.oOutgoing.server());
	this.externalAccessSmtpPort = ko.observable(this.oOutgoing.port());
	this.externalAccessSmtpAlterPort = ko.observable('');
	this.externalAccessSmtpUseSsl = ko.observable(false);
	ko.computed(function () {
		if (!this.setExternalAccessServers())
		{
			this.externalAccessImapServer(this.oIncoming.server());
			this.externalAccessImapPort(this.oIncoming.port());
			this.externalAccessImapAlterPort('');
			this.externalAccessImapUseSsl(this.oIncoming.ssl());
			this.externalAccessPop3Server('');
			this.externalAccessPop3Port(110);
			this.externalAccessPop3AlterPort('');
			this.externalAccessPop3UseSsl(false);
			this.externalAccessSmtpServer(this.oOutgoing.server());
			this.externalAccessSmtpPort(this.oOutgoing.port());
			this.externalAccessSmtpAlterPort('');
			this.externalAccessSmtpUseSsl(this.oOutgoing.ssl());
		}
	}, this);
}

CServerPairPropertiesView.prototype.ViewTemplate = 'MailWebclient_Settings_ServerPairPropertiesView';

CServerPairPropertiesView.prototype.serverInit = function (bEmptyServerToEdit)
{
	this.setServer(bEmptyServerToEdit ? new CServerModel() : this.oLastEditableServer);
};

CServerPairPropertiesView.prototype.fullInit = function ()
{
	this.setServer(this.oLastEditableServer);
	if (!this.serversRetrieved())
	{
		this.requestServers();
	}
};

CServerPairPropertiesView.prototype.setServer = function (oServer)
{
	this.oLastEditableServer = oServer;
	this.setServerId(oServer.iId);
};

CServerPairPropertiesView.prototype.setServerId = function (iServerId)
{
	if (this.serversRetrieved() || iServerId === 0)
	{
		var bEmptyServerNow = this.selectedServerId() === 0;
		this.selectedServerId(0); // If server with identifier iServerId doesn't exist in the list selectedServerId will be reset to previous value that will be 0
		this.selectedServerId(iServerId);
		if (bEmptyServerNow && iServerId === 0)
		{
			this.selectedServerId.valueHasMutated();
		}
	}
	else
	{
		this.iEditedServerId = iServerId;
	}
};

CServerPairPropertiesView.prototype.requestServers = function (iOffset, sSearch)
{
	var iTenantId = _.isFunction(App.getTenantId) ? App.getTenantId() : 0;
	this.serversRetrieved(false);
	Ajax.send('GetServers', {
			'TenantId': iTenantId,
			'Offset': Types.pInt(iOffset, 0),
			'Limit': this.iServersPerPage,
			'Search': Types.pString(sSearch, '')
		}, function (oResponse) {
			if (_.isArray(oResponse && oResponse.Result && oResponse.Result.Items))
			{
				var aServerOptions = [{ 'Name': TextUtils.i18n('MAILWEBCLIENT/LABEL_CONFIGURE_SERVER_MANUALLY'), 'Id': 0 }];

				_.each(oResponse.Result.Items, function (oServer) {
					aServerOptions.push({ 'Name': oServer.Name, 'Id': Types.pInt(oServer.EntityId) });
				});

				this.servers(_.map(oResponse.Result.Items, function (oServerData) {
					return new CServerModel(oServerData);
				}));
				this.totalServersCount(oResponse.Result.Count);
				this.serverOptions(aServerOptions);
				this.serversRetrieved(true);
				if (this.iEditedServerId)
				{
					this.setServerId(this.iEditedServerId);
					this.iEditedServerId = 0;
				}
			}
			else
			{
				Api.showErrorByCode(oResponse);
			}
		}, this);
};

CServerPairPropertiesView.prototype.clear = function ()
{
	this.oIncoming.clear();
	this.oOutgoing.clear();
	this.outgoingUseAuth(true);
};

CServerPairPropertiesView.prototype.setCurrentValues = function ()
{
	var
		aNamePart = this.bAdminEdit ? [ this.selectedServerId(), this.name() ] : [],
		aServerPart = [
			this.oIncoming.port(),
			this.oIncoming.server(),
			this.oIncoming.ssl(),
			this.oOutgoing.port(),
			this.oOutgoing.server(),
			this.oOutgoing.ssl(),
			this.outgoingUseAuth(),
			this.domains(),
			this.smtpAuthType(),
			this.smtpLogin(),
			this.smtpPassword(),
			this.enableSieve(),
			this.sievePort(),
			this.enableThreading(),
			this.useFullEmailAddressAsLogin(),
			this.setExternalAccessServers(),
			this.externalAccessImapServer(),
			this.externalAccessImapPort(),
			this.externalAccessImapAlterPort(),
			this.externalAccessImapUseSsl(),
			this.externalAccessPop3Server(),
			this.externalAccessPop3Port(),
			this.externalAccessPop3AlterPort(),
			this.externalAccessPop3UseSsl(),
			this.externalAccessSmtpServer(),
			this.externalAccessSmtpPort(),
			this.externalAccessSmtpAlterPort(),
			this.externalAccessSmtpUseSsl(),
			this.oauthSelectedConnector()
		]
	;

	this.currentValues((aNamePart.concat(aServerPart)).join(':'));
};

CServerPairPropertiesView.prototype.getCurrentValues = function ()
{
	this.setCurrentValues();
	return [this.currentValues()];
};

CServerPairPropertiesView.prototype.getSmtpAuthType = function ()
{
	if (this.bAdminEdit || this.smtpAuthType() === window.Enums.SmtpAuthType.UseSpecifiedCredentials)
	{
		return this.smtpAuthType();
	}
	else
	{
		return this.outgoingUseAuth() ? window.Enums.SmtpAuthType.UseUserCredentials : window.Enums.SmtpAuthType.NoAuthentication;
	}
};

CServerPairPropertiesView.prototype.getParametersForSave = function ()
{
	var
		iServerId = this.selectedServerId(),
		iLastEditableServerId = this.oLastEditableServer.iId,
		sSmtpAuthType = this.getSmtpAuthType(),
		oParameters = {}
	;
	if (iServerId === 0 && !_.find(this.servers(), function (oServer) { return iLastEditableServerId === oServer.iId; }))
	{
		iServerId = iLastEditableServerId;
	}
	oParameters = {
		'ServerId': iServerId,
		'Name': this.bAdminEdit ? this.name() : this.oIncoming.server(),
		'IncomingServer': this.oIncoming.server(),
		'IncomingPort': this.oIncoming.getIntPort(),
		'IncomingUseSsl': this.oIncoming.ssl(),
		'OutgoingServer': this.oOutgoing.server(),
		'OutgoingPort': this.oOutgoing.getIntPort(),
		'OutgoingUseSsl': this.oOutgoing.ssl(),
		'Domains': this.domains(),
		'SmtpAuthType': sSmtpAuthType,
		'SmtpLogin': sSmtpAuthType === window.Enums.SmtpAuthType.UseSpecifiedCredentials ? $.trim(this.smtpLogin()) : '',
		'SmtpPassword': sSmtpAuthType === window.Enums.SmtpAuthType.UseSpecifiedCredentials ? $.trim(this.smtpPassword()) : '',
		'EnableSieve': this.enableSieve(),
		'SievePort': this.sievePort(),
		'EnableThreading': this.enableThreading(),
		'UseFullEmailAddressAsLogin': this.useFullEmailAddressAsLogin(),
		'SetExternalAccessServers': this.setExternalAccessServers()
	};
	if (this.setExternalAccessServers())
	{
		oParameters['ExternalAccessImapServer'] = this.externalAccessImapServer();
		oParameters['ExternalAccessImapPort'] = this.externalAccessImapPort();
		oParameters['ExternalAccessImapAlterPort'] = Types.pInt(this.externalAccessImapAlterPort(), 0);
		oParameters['ExternalAccessImapUseSsl'] = this.externalAccessImapUseSsl();
		oParameters['ExternalAccessPop3Server'] = this.externalAccessPop3Server();
		oParameters['ExternalAccessPop3Port'] = this.externalAccessPop3Port();
		oParameters['ExternalAccessPop3AlterPort'] = Types.pInt(this.externalAccessPop3AlterPort(), 0);
		oParameters['ExternalAccessPop3UseSsl'] = this.externalAccessPop3UseSsl();
		oParameters['ExternalAccessSmtpServer'] = this.externalAccessSmtpServer();
		oParameters['ExternalAccessSmtpPort'] = this.externalAccessSmtpPort();
		oParameters['ExternalAccessSmtpAlterPort'] = Types.pInt(this.externalAccessSmtpAlterPort(), 0);
		oParameters['ExternalAccessSmtpUseSsl'] = this.externalAccessSmtpUseSsl();
	}

	var oOAuthConnector = _.find(this.aOauthConnectorsData, function (oConnectorData) {
		return oConnectorData.Type === this.oauthSelectedConnector();
	}, this);
	oParameters['OAuthEnable'] = !!oOAuthConnector;
	if (oOAuthConnector)
	{
		oParameters['OAuthName'] = oOAuthConnector.Name;
		oParameters['OAuthType'] = oOAuthConnector.Type;
		oParameters['OAuthIconUrl'] = oOAuthConnector.IconUrl;
	}

	return oParameters;
};

/**
 * Validates if required fields are empty or not.
 * @returns {Boolean}
 */
CServerPairPropertiesView.prototype.validateBeforeSave = function ()
{
	return ValidationUtils.checkIfFieldsEmpty(this.aRequiredFields, TextUtils.i18n('COREWEBCLIENT/ERROR_REQUIRED_FIELDS_EMPTY'));
};

CServerPairPropertiesView.prototype.onDomainsClick = function ()
{
	if (!this.bAllowEditDomains)
	{
		$('.tabsbar .item.admin.domain').removeClass('recivedAnim');
		setTimeout(function () {
			$('.tabsbar .item.admin.domain').addClass('recivedAnim');
		});
	}
};

module.exports = CServerPairPropertiesView;


/***/ }),

/***/ "6U3T":
/*!************************************************************************************!*\
  !*** ./modules/MailWebclient/js/views/settings/FetcherOutgoingSettingsFormView.js ***!
  \************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
	CoreAjax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
	
	CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),
	
	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy"),
	
	CServerPropertiesView = __webpack_require__(/*! modules/MailWebclient/js/views/CServerPropertiesView.js */ "DBk0")
;

/**
 * @constructor
 */
function CFetcherOutgoingSettingsFormView()
{
	CAbstractSettingsFormView.call(this, Settings.ServerModuleName);
	
	this.fetcher = ko.observable(null);

	this.idFetcher = ko.observable(null);

	this.isEnabled = ko.observable(true);

	this.email = ko.observable('');
	this.userName = ko.observable('');
	this.isOutgoingEnabled = ko.observable(false);

	this.focusEmail = ko.observable(false);

	this.oOutgoing = new CServerPropertiesView(25, 465, 'fetcher_edit_outgoing', TextUtils.i18n('MAILWEBCLIENT/LABEL_SMTP_SERVER'));
	this.outgoingUseAuth = ko.observable(false);

	this.isAllEnabled = ko.computed(function () {
		return this.isEnabled() && this.isOutgoingEnabled();
	}, this);
	this.isAllEnabled.subscribe(function () {
		this.oOutgoing.isEnabled(this.isAllEnabled());
	}, this);
	this.oOutgoing.isEnabled(this.isAllEnabled());
	
	this.firstState = null;
}

_.extendOwn(CFetcherOutgoingSettingsFormView.prototype, CAbstractSettingsFormView.prototype);

CFetcherOutgoingSettingsFormView.prototype.ViewTemplate = 'MailWebclient_Settings_FetcherOutgoingSettingsFormView';

/**
 * @param {Object} oFetcher
 */
CFetcherOutgoingSettingsFormView.prototype.onShow = function (oFetcher)
{
	this.fetcher(oFetcher && oFetcher.FETCHER ? oFetcher : null);
	this.populate();
};

CFetcherOutgoingSettingsFormView.prototype.getCurrentValues = function ()
{
	return [
		this.isOutgoingEnabled(),
		this.oOutgoing.server(),
		this.oOutgoing.port(),
		this.oOutgoing.ssl(),
		this.outgoingUseAuth(),
		this.userName(),
		this.email()
	];
};

CFetcherOutgoingSettingsFormView.prototype.getParametersForSave = function ()
{
	if (this.fetcher())
	{
		return {
			'FetcherId': this.idFetcher(),
			'IsOutgoingEnabled': this.isOutgoingEnabled(),
			'Email': $.trim(this.email()),
			'Name': this.userName(),
			'OutgoingServer': this.oOutgoing.server(),
			'OutgoingPort': this.oOutgoing.getIntPort(),
			'OutgoingUseSsl': this.oOutgoing.ssl(),
			'OutgoingUseAuth': this.outgoingUseAuth()
		};
	}
	
	return {};
};

CFetcherOutgoingSettingsFormView.prototype.save = function ()
{
	if (this.isEnabled())
	{
		if (this.isEmptyRequiredFields())
		{
			Screens.showError(TextUtils.i18n('COREWEBCLIENT/ERROR_REQUIRED_FIELDS_EMPTY'));
		}
		else
		{
			this.isSaving(true);

			this.updateSavedState();

			CoreAjax.send(Settings.FetchersServerModuleName, 'UpdateFetcherSmtpSettings', this.getParametersForSave(), this.onResponse, this);
		}
	}
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CFetcherOutgoingSettingsFormView.prototype.onResponse = function (oResponse, oRequest)
{
	this.isSaving(false);

	if (!oResponse.Result)
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('COREWEBCLIENT/ERROR_UNKNOWN'));
	}
	else
	{
		AccountList.populateFetchers();
		
		Screens.showReport(TextUtils.i18n('MAILWEBCLIENT/REPORT_SUCCESSFULLY_SAVED'));
	}
};

CFetcherOutgoingSettingsFormView.prototype.populate = function ()
{
	var oFetcher = this.fetcher();
	
	if (oFetcher)
	{
		this.fetcher(oFetcher);

		this.idFetcher(oFetcher.id());

		this.isEnabled(oFetcher.isEnabled());

		this.email(oFetcher.email());
		this.userName(oFetcher.userName());
		this.isOutgoingEnabled(oFetcher.isOutgoingEnabled());

		this.oOutgoing.set(oFetcher.outgoingServer(), oFetcher.outgoingPort(), oFetcher.outgoingUseSsl());
		this.outgoingUseAuth(oFetcher.outgoingUseAuth());

		this.updateSavedState();
	}
};
CFetcherOutgoingSettingsFormView.prototype.isEmptyRequiredFields = function ()
{
	if (this.isOutgoingEnabled())
	{
		if (this.outgoingUseAuth() && this.isOutgoingEnabled() && '' === this.oOutgoing.server())
		{
			this.oOutgoing.server.focused(true);
			return true;
		}

		if (this.outgoingUseAuth() && '' === $.trim(this.email()))
		{
			this.focusEmail(true);
			return true;
		}
	}

	return false;
};

module.exports = new CFetcherOutgoingSettingsFormView();


/***/ }),

/***/ "SpBH":
/*!*************************************************************************!*\
  !*** ./modules/MailWebclient/js/views/settings/MailSettingsFormView.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	
	Browser = __webpack_require__(/*! modules/CoreWebclient/js/Browser.js */ "dfnr"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV"),
	CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),
	
	MailUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Mail.js */ "WOsA"),
	Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy")
;

/**
 * @constructor
 */
function CMailSettingsFormView()
{
	CAbstractSettingsFormView.call(this, Settings.ServerModuleName);

	this.bRtl = UserSettings.IsRTL;
	this.bAllowChangeStarredMessagesSource = Settings.AllowChangeStarredMessagesSource;
	this.bAllowMailto = Settings.AllowAppRegisterMailto && MailUtils.isAvailableRegisterMailto();
	this.bAllowShowMessagesCountInFolderList = Settings.AllowShowMessagesCountInFolderList;
	this.bAllowHorizontalLayout = Settings.AllowHorizontalLayout;
	
	this.mailsPerPageValues = ko.observableArray(Types.getAdaptedPerPageList(Settings.MailsPerPage));
	this.starredMessagesSourceValues = [
		{
			text: TextUtils.i18n('MAILWEBCLIENT/LABEL_STARRED_MESSAGES_SOURCE_INBOX'),
			value: Enums.StarredMessagesSource.InboxOnly
		},
		{
			text: TextUtils.i18n('MAILWEBCLIENT/LABEL_STARRED_MESSAGES_SOURCE_ALL_FOLDERS'),
			value: Enums.StarredMessagesSource.AllFolders
		}
	];
	this.aLayoutValues = [
		{ text: TextUtils.i18n('MAILWEBCLIENT/LABEL_VERT_SPLIT_LAYOUT'), value: false },
		{ text: TextUtils.i18n('MAILWEBCLIENT/LABEL_HORIZ_SPLIT_LAYOUT'), value: true }
	];
	
	this.mailsPerPage = ko.observable(Settings.MailsPerPage);
	this.starredMessagesSource = ko.observable(Settings.StarredMessagesSource);
	this.allowAutosaveInDrafts = ko.observable(Settings.AllowAutosaveInDrafts);
	this.allowChangeInputDirection = ko.observable(Settings.AllowChangeInputDirection);
	this.showMessagesCountInFolderList = ko.observable(Settings.showMessagesCountInFolderList());
	this.horizontalLayout = ko.observable(Settings.HorizontalLayout);
}

_.extendOwn(CMailSettingsFormView.prototype, CAbstractSettingsFormView.prototype);

CMailSettingsFormView.prototype.ViewTemplate = 'MailWebclient_Settings_MailSettingsFormView';

CMailSettingsFormView.prototype.registerMailto = function ()
{
	MailUtils.registerMailto();
};

CMailSettingsFormView.prototype.getCurrentValues = function ()
{
	return [
		this.mailsPerPage(),
		this.allowAutosaveInDrafts(),
		this.allowChangeInputDirection(),
		this.showMessagesCountInFolderList(),
		this.horizontalLayout()
	];
};

CMailSettingsFormView.prototype.revertGlobalValues = function ()
{
	this.mailsPerPage(Settings.MailsPerPage);
	this.starredMessagesSource(Settings.StarredMessagesSource);
	this.allowAutosaveInDrafts(Settings.AllowAutosaveInDrafts);
	this.allowChangeInputDirection(Settings.AllowChangeInputDirection);
	this.showMessagesCountInFolderList(Settings.showMessagesCountInFolderList());
	this.horizontalLayout(Settings.HorizontalLayout);
};

CMailSettingsFormView.prototype.getParametersForSave = function ()
{
	return {
		'MailsPerPage': this.mailsPerPage(),
		'StarredMessagesSource': this.starredMessagesSource(),
		'AllowAutosaveInDrafts': this.allowAutosaveInDrafts(),
		'AllowChangeInputDirection': this.allowChangeInputDirection(),
		'ShowMessagesCountInFolderList': this.showMessagesCountInFolderList(),
		'HorizontalLayout': this.horizontalLayout()
	};
};

CMailSettingsFormView.prototype.applySavedValues = function (parameters)
{
	if (parameters.HorizontalLayout !== Settings.HorizontalLayout) {
		window.location.reload();
	}
	Settings.update(parameters);
};

CMailSettingsFormView.prototype.setAccessLevel = function (sEntityType, iEntityId)
{
	this.visible(sEntityType === '');
};

module.exports = new CMailSettingsFormView();


/***/ }),

/***/ "N2aM":
/*!******************************************************************************!*\
  !*** ./modules/MailWebclient/js/views/settings/SignatureSettingsFormView.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
	
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	Browser = __webpack_require__(/*! modules/CoreWebclient/js/Browser.js */ "dfnr"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
	CoreAjax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
	
	CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),
	
	EditorUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Editor.js */ "kR20"),

	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	Ajax = __webpack_require__(/*! modules/MailWebclient/js/Ajax.js */ "QaEg"),
	Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy"),
	
	CHtmlEditorView = EditorUtils.getCHtmlEditorView()
;

/**
 * @constructor
 */ 
function CSignatureSettingsFormView()
{
	CAbstractSettingsFormView.call(this, Settings.ServerModuleName);
	
	this.fetcherOrIdentity = ko.observable(null);
	
	this.useSignatureRadio = ko.observable(Enums.UseSignature.Off);
	this.signature = ko.observable('');

	this.oHtmlEditor = new CHtmlEditorView(true, false);
	this.oHtmlEditor.textFocused.subscribe(function () {
		if (this.oHtmlEditor.textFocused())
		{
			this.useSignatureRadio(Enums.UseSignature.On);
		}
	}, this);
	this.enableImageDragNDrop = ko.observable(false);

	this.allowEditSignature = ko.observable(true);

	ko.computed(function () {
		this.oHtmlEditor.setInactive(!this.allowEditSignature() || this.useSignatureRadio() === Enums.UseSignature.Off);
	}, this);

	this.saveCommand = Utils.createCommand(this, this.save, this.allowEditSignature);
}

_.extendOwn(CSignatureSettingsFormView.prototype, CAbstractSettingsFormView.prototype);

CSignatureSettingsFormView.prototype.ViewTemplate = 'MailWebclient_Settings_SignatureSettingsFormView';
CSignatureSettingsFormView.prototype.ViewConstructorName = 'CSignatureSettingsFormView';

/**
 * @param {Object} oFetcherOrIdentity
 */
CSignatureSettingsFormView.prototype.onShow = function (oFetcherOrIdentity)
{
	this.fetcherOrIdentity(oFetcherOrIdentity || null);
	this.populate();
	_.defer(_.bind(this.init, this));
};

CSignatureSettingsFormView.prototype.init = function ()
{
	this.oHtmlEditor.setDisableEdit(false);
	this.oHtmlEditor.init(this.signature(), false, '', TextUtils.i18n('MAILWEBCLIENT/LABEL_ENTER_SIGNATURE_HERE'));
	this.enableImageDragNDrop(this.oHtmlEditor.isDragAndDropSupported() && !Browser.ie10AndAbove);
	this.oHtmlEditor.setDisableEdit(!this.allowEditSignature());
	this.updateSavedState();
};

CSignatureSettingsFormView.prototype.getCurrentValues = function ()
{
	if (this.oHtmlEditor.isInitialized())
	{
		this.signature(this.oHtmlEditor.getText());
	}
	return [
		this.useSignatureRadio(),
		this.signature()
	];
};

CSignatureSettingsFormView.prototype.revert = function ()
{
	this.populate();
};

CSignatureSettingsFormView.prototype.getParametersForSave = function ()
{
	this.signature(this.oHtmlEditor.getText());
	
	var
		oEditAccount = AccountList.getEdited(),
		iAccountId = this.fetcherOrIdentity() ? this.fetcherOrIdentity().accountId() : (oEditAccount ? oEditAccount.id() : 0),
		oParameters = {
			'AccountID': iAccountId,
			'UseSignature': this.useSignatureRadio() === Enums.UseSignature.On,
			'Signature': this.signature()
		}
	;
	
	if (this.fetcherOrIdentity())
	{
		if (this.fetcherOrIdentity().FETCHER)
		{
			_.extendOwn(oParameters, { 'FetcherId': this.fetcherOrIdentity().id() });
		}
		else if (this.fetcherOrIdentity().ALIAS)
		{
			_.extendOwn(oParameters, { 'AliasId': this.fetcherOrIdentity().id() });
		}
		else if (!this.fetcherOrIdentity().bAccountPart)
		{
			_.extendOwn(oParameters, { 'IdentityId': this.fetcherOrIdentity().id() });
		}
	}
	
	return oParameters;
};

/**
 * @param {Object} oParameters
 */
CSignatureSettingsFormView.prototype.applySavedValues = function (oParameters)
{
	if (oParameters.FetcherId)
	{
		AccountList.populateFetchers();
	}
	else if (oParameters.AliasId)
	{
		AccountList.populateAliases();
	}
	else if (oParameters.IdentityId)
	{
		AccountList.populateIdentities();
	} 
	else if (oParameters.AccountID) 
	{
		this.populateAccountSignature(oParameters.AccountID);
	}
};

/**
 * @param {int} AccountId
 */
CSignatureSettingsFormView.prototype.populateAccountSignature = function (AccountId)
{
	Ajax.send('GetAccount', {'AccountId': AccountId}, function (oResponse) {
		if (oResponse.Result) {
			var oAccount = AccountList.getAccount(AccountId);
			if (oAccount) {
				oAccount.useSignature(!!oResponse.Result.UseSignature);
				oAccount.signature(oResponse.Result.Signature);
			}
		}
	});
}

CSignatureSettingsFormView.prototype.populate = function ()
{
	var
		accountId = this.fetcherOrIdentity() ? this.fetcherOrIdentity().accountId() : AccountList.editedId(),
		identityIsAccountPart = this.fetcherOrIdentity() ? this.fetcherOrIdentity().bAccountPart : false,
		account = AccountList.getAccount(accountId),
		objWithSignature = this.fetcherOrIdentity() || account
	;

	if (objWithSignature)
	{
		this.useSignatureRadio(objWithSignature.useSignature() ? Enums.UseSignature.On : Enums.UseSignature.Off);
		this.signature(objWithSignature.signature());
		this.oHtmlEditor.setDisableEdit(false);
		this.oHtmlEditor.setText(this.signature());
		this.allowEditSignature(account && account.bAllowEditSignature || !identityIsAccountPart);
		this.oHtmlEditor.setDisableEdit(!this.allowEditSignature());
	}
	
	this.updateSavedState();
};

CSignatureSettingsFormView.prototype.save = function ()
{
	this.isSaving(true);
	
	this.updateSavedState();
	
	if (this.fetcherOrIdentity() && this.fetcherOrIdentity().FETCHER)
	{
		CoreAjax.send(Settings.FetchersServerModuleName, 'UpdateSignature', this.getParametersForSave(), this.onResponse, this);
	}
	else if (this.fetcherOrIdentity() && this.fetcherOrIdentity().ALIAS)
	{
		CoreAjax.send(Settings.AliasesServerModuleName, 'UpdateSignature', this.getParametersForSave(), this.onResponse, this);
	}
	else
	{
		Ajax.send('UpdateSignature', this.getParametersForSave(), this.onResponse, this);
	}
};

/**
 * Parses the response from the server. If the settings are normally stored, then updates them. 
 * Otherwise an error message.
 * 
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CSignatureSettingsFormView.prototype.onResponse = function (oResponse, oRequest)
{
	this.isSaving(false);
	
	if (oResponse.Result)
	{
		this.applySavedValues(oRequest.Parameters);
		Screens.showReport(TextUtils.i18n('COREWEBCLIENT/REPORT_SETTINGS_UPDATE_SUCCESS'));
	}
	else
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('COREWEBCLIENT/ERROR_SAVING_SETTINGS_FAILED'));
	}
};

module.exports = new CSignatureSettingsFormView();


/***/ })

}]);