(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[40],{

/***/ "H2Cq":
/*!***********************************************************!*\
  !*** ./modules/CoreWebclient/js/utils/Contenteditable.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const _ = __webpack_require__(/*! underscore */ "C3HO")

const ContenteditableUtils = {}

ContenteditableUtils.setCursorAtTheEnd = function (contentEditableElement) {
  if (document.createRange) {
    const range = document.createRange()
    range.selectNodeContents(contentEditableElement)
    range.collapse(false)
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
    contentEditableElement.focus()
    range.detach()
  }
}

ContenteditableUtils.getSelectionRanges = function () {
  const ranges = []
  if (window.getSelection) {
    const selection = window.getSelection(),
      count = selection.rangeCount
    for (let index = 0; index < count; index++) {
      ranges.push(selection.getRangeAt(index))
    }
  }
  return ranges
}

ContenteditableUtils.setSelectionRanges = function (ranges, collapse = false) {
  let rangeText = ''
  if (window.getSelection && _.isArray(ranges)) {
    const count = ranges.length,
      selection = window.getSelection()
    selection.removeAllRanges()
    for (let index = 0; index < count; index++) {
      const range = ranges[index]
      if (range) {
        selection.addRange(range)
        rangeText += range
        if (collapse) {
          range.collapse(false)
        }
      }
    }
  }
  return rangeText
}

module.exports = ContenteditableUtils


/***/ }),

/***/ "C5H3":
/*!***********************************************************!*\
  !*** ./modules/CoreWebclient/js/views/CHeaderItemView.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	Routing = __webpack_require__(/*! modules/CoreWebclient/js/Routing.js */ "W66n")
;

function CHeaderItemView(sLinkText)
{
	this.sName = '';
	
	this.visible = ko.observable(true);
	this.baseHash = ko.observable('');
	this.hash = ko.observable('');
	this.linkText = ko.observable(sLinkText);
	this.isCurrent = ko.observable(false);
	
	this.recivedAnim = ko.observable(false).extend({'autoResetToFalse': 500});
	this.unseenCount = ko.observable(0);
	
	this.allowChangeTitle = ko.observable(false); // allows to change favicon and browser title when browser is inactive
	this.inactiveTitle = ko.observable('');
	
	this.excludedHashes = ko.observableArray([]);
}

CHeaderItemView.prototype.ViewTemplate = 'CoreWebclient_HeaderItemView';

CHeaderItemView.prototype.setName = function (sName)
{
	this.sName = sName.toLowerCase();
	if (this.baseHash() === '')
	{
		this.hash(Routing.buildHashFromArray([sName.toLowerCase()]));
		this.baseHash(this.hash());
	}
	else
	{
		this.hash(this.baseHash());
	}
};

module.exports = CHeaderItemView;


/***/ }),

/***/ "atfJ":
/*!************************************************!*\
  !*** ./modules/RocketChatWebclient/js/Ajax.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
	
	Settings = __webpack_require__(/*! modules/RocketChatWebclient/js/Settings.js */ "XaJJ")
;

module.exports = {
	send: function (sMethod, oParameters, fResponseHandler, oContext, sServerModuleName) {
		Ajax.send(
			sServerModuleName ? sServerModuleName : Settings.ServerModuleName,
			sMethod,
			oParameters,
			fResponseHandler,
			oContext
		);
	}
};


/***/ }),

/***/ "XaJJ":
/*!****************************************************!*\
  !*** ./modules/RocketChatWebclient/js/Settings.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L")
;

module.exports = {
	ServerModuleName: 'RocketChatWebclient',
	HashModuleName: 'chat',

	ChatUrl: '',
	AllowAddMeetingLinkToEvent: false,
	MeetingLinkUrl: '',

	/**
	 * Initializes settings from AppData object sections.
	 * 
	 * @param {Object} oAppData Object contained modules settings.
	 */
	init: function (oAppData)
	{
		var oAppDataSection = oAppData['RocketChatWebclient'];
		
		if (!_.isEmpty(oAppDataSection))
		{
			this.ChatUrl = Types.pString(oAppDataSection.ChatUrl);
			this.AllowAddMeetingLinkToEvent = Types.pBool(oAppDataSection.AllowAddMeetingLinkToEvent);
			this.MeetingLinkUrl = Types.pString(oAppDataSection.MeetingLinkUrl);
		}
	}
};


/***/ }),

/***/ "W0SK":
/*!***************************************************!*\
  !*** ./modules/RocketChatWebclient/js/manager.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "M4cL");


module.exports = function (oAppData) {
	var
		ko = __webpack_require__(/*! knockout */ "p09A"),

		App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
		TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
		Settings = __webpack_require__(/*! modules/RocketChatWebclient/js/Settings.js */ "XaJJ"),	
		WindowOpener = __webpack_require__(/*! modules/CoreWebclient/js/WindowOpener.js */ "mGms"),
		
		oOpenedWindows = [],
		HeaderItemView = null
	;
	
	Settings.init(oAppData);
	
	var sAppHash = Settings.AppName ? TextUtils.getUrlFriendlyName(Settings.AppName) : Settings.HashModuleName; 
	
	if (App.isUserNormalOrTenant())
	{
		var result = {
			/**
			 * Returns list of functions that are return module screens.
			 * 
			 * @returns {Object}
			 */
			getScreens: function ()
			{
				var oScreens = {};

				oScreens[Settings.HashModuleName] = function () {
					return __webpack_require__(/*! modules/RocketChatWebclient/js/views/MainView.js */ "tW/3");
				};
				
				return oScreens;
			}
		};

		if (!App.isNewTab())
		{
			App.subscribeEvent('CalendarWebclient::RegisterEditEventController', function ({register, view}) {
				const controller = __webpack_require__(/*! modules/RocketChatWebclient/js/views/AddMeetingLinkToEventView.js */ "CSAE");
				controller.init(view);
				register(controller, 'AdditionalButton');
			});
			result.start = function (ModulesManager) {
				// init screen so the module could interact with chat in iframe
				var Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT");
				Screens.initHiddenView(Settings.HashModuleName);

				if (Settings.ChatUrl !== '') {
					ModulesManager.run('SettingsWebclient', 'registerSettingsTab', [function () { return __webpack_require__(/*! modules/RocketChatWebclient/js/views/RocketChatSettingsPaneView.js */ "/f+x"); }, Settings.HashModuleName, TextUtils.i18n('ROCKETCHATWEBCLIENT/LABEL_SETTINGS_TAB')]);
				}
				
				App.subscribeEvent('Logout', function () {
					$.removeCookie('RocketChatAuthToken');
					$.removeCookie('RocketChatUserId');
					if ($('#rocketchat_iframe')) {
						$('#rocketchat_iframe').hide();
						$('#rocketchat_iframe').get(0).contentWindow.postMessage({
							externalCommand: 'logout'
						}, '*');
					}
				});

				if (Settings.ChatUrl !== '') {
					App.subscribeEvent('ContactsWebclient::AddCustomCommand', function (oParams) {
						oParams.Callback({
							'Text': TextUtils.i18n('ROCKETCHATWEBCLIENT/ACTION_CHAT_WITH_CONTACT'),
							'CssClass': 'chat',
							'Handler': function () {
								var oWin = oOpenedWindows[this.uuid()];
								if (oWin && !oWin.closed) {
									oWin.focus();
								} else {
									var
										iScreenWidth = window.screen.width,
										iWidth = 360,
										iLeft = Math.ceil((iScreenWidth - iWidth) / 2),

										iScreenHeight = window.screen.height,
										iHeight = 600,
										iTop = Math.ceil((iScreenHeight - iHeight) / 2),

										sUrl = '?chat-direct=' + this.uuid() + '&' + new Date().getTime(),
										sName = 'Chat',
										sSize = ',width=' + iWidth + ',height=' + iHeight + ',top=' + iTop + ',left=' + iLeft
									;
									oWin = WindowOpener.open(sUrl, sName, false, sSize);
									if (oWin) {
										oOpenedWindows[this.uuid()] = oWin;
									}
								}
							},
							'Visible': ko.computed(function () { 
								return oParams.Contact.team() && !oParams.Contact.itsMe();
							})
						});
					});
				}
			};

			/**
			 * Returns object of header item view of the module.
			 * 
			 * @returns {Object}
			 */
			result.getHeaderItem = function () {
				if (HeaderItemView === null) {
					HeaderItemView = __webpack_require__(/*! modules/RocketChatWebclient/js/views/HeaderItemView.js */ "pRXq");
				}
				if (Settings.ChatUrl !== '') {
					return {
						item: HeaderItemView,
						name: sAppHash
					};
				}
			};
		}

		return result;
	}
	
	return null;
};


/***/ }),

/***/ "CSAE":
/*!***************************************************************************!*\
  !*** ./modules/RocketChatWebclient/js/views/AddMeetingLinkToEventView.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const
	ko = __webpack_require__(/*! knockout */ "p09A"),

	ContenteditableUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Contenteditable.js */ "H2Cq"),
	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),

	Settings = __webpack_require__(/*! modules/RocketChatWebclient/js/Settings.js */ "XaJJ")
;

function CAddMeetingLinkToEventView()
{
	this.meetingLinkUrl = Settings.MeetingLinkUrl.replace(/[^\/]$/, '$&/'); //adding '/' at the end if it's missing
	this.allowAddMeetingLink = Settings.AllowAddMeetingLinkToEvent && Settings.MeetingLinkUrl.length !== 0;
	this.focusedDom = ko.observable(null);
}

CAddMeetingLinkToEventView.prototype.ViewTemplate = 'RocketChatWebclient_AddMeetingLinkToEventView';

CAddMeetingLinkToEventView.prototype.init = function (view)
{
	this.isEditable = view.descriptionView.isEditable;

	this.descriptionDom = view.descriptionView.dataDom;
	this.descriptionHtml = view.descriptionView.dataHtml;
	this.descriptionFocus = view.descriptionView.dataFocus;
	this.descriptionFocus.subscribe(function () {
		if (this.descriptionFocus()) {
			this.focusedDom(this.descriptionDom());
		} else {
			this.savedRanges = ContenteditableUtils.getSelectionRanges();
			setTimeout(function () {
				if (!this.descriptionFocus() && !this.locationFocus()) {
					this.focusedDom(null);
				}
			}.bind(this), 100);
		}
	}, this);

	this.locationDom = view.locationView.dataDom;
	this.locationHtml = view.locationView.dataHtml;
	this.locationFocus = view.locationView.dataFocus;
	this.locationFocus.subscribe(function () {
		if (this.locationFocus()) {
			this.focusedDom(this.locationDom());
		} else {
			setTimeout(function () {
				if (!this.descriptionFocus() && !this.locationFocus()) {
					this.focusedDom(null);
				}
			}.bind(this), 100);
		}
	}, this);
};

CAddMeetingLinkToEventView.prototype.addMeetingLink = function ()
{
	const
		meetingLinkUrl = this.meetingLinkUrl,
		meetingId = Utils.getRandomHash(32),
		url = `${meetingLinkUrl}${meetingId}`,
		html = `<a href="${url}">${url}</a>`
	;
	if (this.focusedDom()) {
		// insert where the cursor is
		ContenteditableUtils.setSelectionRanges(this.savedRanges, true);
		this.focusedDom().focus();
		window.document.execCommand('insertHTML', false, html);
	} else {
		// insert at the end
		ContenteditableUtils.setCursorAtTheEnd(this.locationDom()[0]);
		window.document.execCommand('insertHTML', false, html);
	}
	if (this.descriptionFocus()) {
		this.descriptionHtml(this.descriptionDom().html());
	} else if (this.locationFocus()) {
		this.locationHtml(this.locationDom().html());
	}
//	if (this.descriptionDom && document.createRange && window.getSelection) {
//		console.log('this.descriptionDom', this.descriptionDom());
//		const
//			range = document.createRange(),
//			selection = window.getSelection()
//		;
//
//		range.selectNodeContents(this.descriptionDom());
//		selection.removeAllRanges();
//		selection.addRange(range);
//
//		window.document.execCommand('unlink');
//		this.currLink = null;
//		this.hideLinkPopup();
//	}
};

module.exports = new CAddMeetingLinkToEventView();


/***/ }),

/***/ "pRXq":
/*!****************************************************************!*\
  !*** ./modules/RocketChatWebclient/js/views/HeaderItemView.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),

	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),

	Ajax = __webpack_require__(/*! modules/RocketChatWebclient/js/Ajax.js */ "atfJ"),
	CAbstractHeaderItemView = __webpack_require__(/*! modules/CoreWebclient/js/views/CHeaderItemView.js */ "C5H3"),
	WindowOpener = __webpack_require__(/*! modules/CoreWebclient/js/WindowOpener.js */ "mGms")
;

function CHeaderItemView()
{
	CAbstractHeaderItemView.call(this, TextUtils.i18n('ROCKETCHATWEBCLIENT/ACTION_SHOW_CHAT'));

	this.iAutoCheckMailTimer = -1;
	this.unseenCount = ko.observable(0);

	this.mainHref = ko.computed(function () {
		return this.hash();
	}, this);

	this.getUnreadCounter();
}

CHeaderItemView.prototype.getUnreadCounter = function () {
	Ajax.send('GetUnreadCounter', {}, function (oResponse) {
		this.unseenCount(Types.pInt(oResponse.Result));
	}, this);
};

CHeaderItemView.prototype.onChatClick = function (data, event)
{
	WindowOpener.open('?chat', 'Chat');
};

_.extendOwn(CHeaderItemView.prototype, CAbstractHeaderItemView.prototype);

CHeaderItemView.prototype.ViewTemplate = 'RocketChatWebclient_HeaderItemView';

var HeaderItemView = new CHeaderItemView();

HeaderItemView.allowChangeTitle(true);

module.exports = HeaderItemView;


/***/ }),

/***/ "tW/3":
/*!**********************************************************!*\
  !*** ./modules/RocketChatWebclient/js/views/MainView.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),

	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
	Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),

	CAbstractScreenView = __webpack_require__(/*! modules/CoreWebclient/js/views/CAbstractScreenView.js */ "doeu"),
	Routing = __webpack_require__(/*! modules/CoreWebclient/js/Routing.js */ "W66n"),
	UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV"),

	Settings = __webpack_require__(/*! modules/RocketChatWebclient/js/Settings.js */ "XaJJ")
;

/**
 * View that is used as screen of the module. Inherits from CAbstractScreenView that has showing and hiding methods.
 * 
 * @constructor
 */
function CMainView()
{
	CAbstractScreenView.call(this, 'RocketChatWebclient')
	
	this.bInitialized = false
	this.sChatUrl = Settings.ChatUrl
	this.iframeDom = ko.observable(null)
	this.iframeLoaded = ko.observable(false)
	this.chatToken = ko.observable('')

	ko.computed(function () {
		if (this.iframeDom() && this.iframeLoaded() && this.chatToken()) {
			this.init(this.chatToken())
		}
	}, this)

	Ajax.send(Settings.ServerModuleName,'InitChat', {}, function(oResponse) {
		if(oResponse.Result && oResponse.Result['authToken']) {
			this.chatToken(oResponse.Result['authToken'])
		}
	}, this);
}

_.extendOwn(CMainView.prototype, CAbstractScreenView.prototype)

CMainView.prototype.ViewTemplate = 'RocketChatWebclient_MainView'
CMainView.prototype.ViewConstructorName = 'CMainView'

CMainView.prototype.onFrameLoad = function () {
	this.iframeLoaded(true)
}

CMainView.prototype.init = function (sChatAuthToken) {
	if (!this.bInitialized) {
		var iframe = this.iframeDom()[0];
		function _login() {
			iframe.contentWindow.postMessage({
				externalCommand: 'login-with-token',
				token: sChatAuthToken
			}, '*')
		}
		window.addEventListener('message', function(oEvent) {
			if (oEvent && oEvent.data) {
				console.log('iframe message:', oEvent.data.eventName)

				if (oEvent.data.eventName === 'startup') {
					setTimeout(_login, 500)
				}

				if(oEvent.data.eventName === 'notification') {
					this.showNotification(oEvent.data.data.notification)
				}

				if (oEvent.data.eventName === 'unread-changed') {
					const HeaderItemView = __webpack_require__(/*! modules/RocketChatWebclient/js/views/HeaderItemView.js */ "pRXq")
					HeaderItemView.unseenCount(Types.pInt(oEvent.data.data))
				}
			}
		}.bind(this))
		
		this.setAuroraThemeToRocketChat(iframe)
		
		this.bInitialized = true
	}
}

CMainView.prototype.setAuroraThemeToRocketChat = function (oIframe) {
	function _setTheme() {
		oIframe.contentWindow.postMessage({
			externalCommand: 'set-aurora-theme',
			theme: UserSettings.Theme
		}, '*');
	}
	setTimeout(_setTheme, 500) // to apply the theme more immediate if possible
	setTimeout(_setTheme, 1000) // this will most likely work first
	setTimeout(_setTheme, 2000) // to be sure the theme will be applied
}

CMainView.prototype.showNotification = function (oNotification) {
	const
		oParameters = {
			action: 'show',
			icon: this.sChatUrl + 'avatar/' + oNotification.payload.sender.username + '?size=50&format=png',
			title: oNotification.title,
			body: oNotification.text,
			callback: function () {
				window.focus();
				if (!this.shown()) {
					Routing.setHash([Settings.HashModuleName]);
				}
				var sPath = '';
				switch (oNotification.payload.type) {
					case 'c':
						sPath = '/channel/' + oNotification.payload.name;
						break;
					case 'd':
						sPath = '/direct/' + oNotification.payload.rid;
						break;
					case 'p':
						sPath = '/group/' + oNotification.payload.name;
						break;
				}
				if (sPath) {
					this.iframeDom()[0].contentWindow.postMessage({
						externalCommand: 'go',
						path: sPath
					}, '*');
				}
			}.bind(this)
		}
	;

	Utils.desktopNotify(oParameters)
}

module.exports = new CMainView()


/***/ }),

/***/ "/f+x":
/*!****************************************************************************!*\
  !*** ./modules/RocketChatWebclient/js/views/RocketChatSettingsPaneView.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	Ajax = __webpack_require__(/*! modules/RocketChatWebclient/js/Ajax.js */ "atfJ"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	
	Settings = __webpack_require__(/*! modules/RocketChatWebclient/js/Settings.js */ "XaJJ"),
	UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV")	
;

/**
 * @constructor
 */
function CRocketChatSettingsPaneView()
{
	this.sAppName = Settings.AppName || TextUtils.i18n('ROCKETCHATWEBCLIENT/LABEL_SETTINGS_TAB');

	this.server = Settings.ChatUrl;
	
	this.bDemo = UserSettings.IsDemo;

	this.sDownloadLink = 'https://www.rocket.chat/download-apps';

	// this.sLogin = ko.observable('');
	// this.getLoginForCurrentUser();
	// this.credentialsHintText = ko.computed(function () {
	// 	return TextUtils.i18n('ROCKETCHATWEBCLIENT/INFO_CREDENTIALS', {'LOGIN': this.sLogin()});
	// }, this);

	this.credentialsHintText = App.mobileCredentialsHintText;
}

CRocketChatSettingsPaneView.prototype.getLoginForCurrentUser = function () {
	Ajax.send('GetLoginForCurrentUser', {}, function(oResponse) {
		this.sLogin(oResponse.Result);
	}, this);
}

/**
 * Name of template that will be bound to this JS-object.
 */
CRocketChatSettingsPaneView.prototype.ViewTemplate = 'RocketChatWebclient_RocketChatSettingsPaneView';

module.exports = new CRocketChatSettingsPaneView();


/***/ })

}]);