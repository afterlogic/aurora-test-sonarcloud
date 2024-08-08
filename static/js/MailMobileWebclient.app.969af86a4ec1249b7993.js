"use strict";
(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[21],{

/***/ "k/M8":
/*!***************************************************!*\
  !*** ./modules/MailMobileWebclient/js/manager.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



module.exports = function (oAppData) {
	__webpack_require__(/*! modules/MailWebclient/js/enums.js */ "T+dd");
	
	var
		_ = __webpack_require__(/*! underscore */ "C3HO"),
		ko = __webpack_require__(/*! knockout */ "p09A"),
		$ = __webpack_require__(/*! jquery */ "M4cL"),
		
		App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
		ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
		
		MailSettings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy")
	;
	
	MailSettings.init(oAppData);
	
	if (!ModulesManager.isModuleAvailable('CoreMobileWebclient'))
	{
		return null;
	}
	
//	require('node_modules/framework7/dist/css/framework7.css');
	__webpack_require__(/*! ../../../../../node_modules/framework7/dist/css/framework7.material.css */ "XmPF");
//	require('node_modules/framework7/dist/css/framework7.material.colors.css');
//	require('node_modules/framework7/dist/css/framework7.ios.css');
//	require('node_modules/framework7/dist/css/framework7.ios.colors.css');
	
	$('html').addClass("md");
	
	if (App.isUserNormalOrTenant())
	{
		if (App.isMobile())
		{
			var Cache = __webpack_require__(/*! modules/MailWebclient/js/Cache.js */ "F0Fd");
			Cache.init();
			var AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn");

			return {
				enableModule: ko.observable(MailSettings.AllowAddAccounts || AccountList.hasAccount() ),
				start: function (ModulesManager) {
					var
						Browser = __webpack_require__(/*! modules/CoreWebclient/js/Browser.js */ "dfnr"),
						MailUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Mail.js */ "WOsA")
					;

					__webpack_require__(/*! modules/MailWebclient/js/koBindings.js */ "UJpV");

					if (MailSettings.AllowAppRegisterMailto)
					{
						MailUtils.registerMailto(Browser.firefox);
					}

					ko.computed(function () {
						var aAuthAcconts = _.filter(AccountList.collection(), function (oAccount) {
							return oAccount.useToAuthorize();
						});

						MailSettings.userMailAccountsCount(aAuthAcconts.length);
					}, this);
				},
				getScreens: function () {
					var oScreens = {};
					oScreens[MailSettings.HashModuleName] = function () {
						return __webpack_require__(/*! modules/MailMobileWebclient/js/views/MailView.js */ "3tGC");
					};
					oScreens[MailSettings.HashModuleName + '-compose'] = function () {
						return __webpack_require__(/*! modules/MailMobileWebclient/js/views/ComposeView.js */ "dolo");
					};
					return oScreens;
				},
				getHeaderItem: function () {
					return {
						item: __webpack_require__(/*! modules/MailMobileWebclient/js/views/HeaderItemView.js */ "fUtQ"),
						name: MailSettings.HashModuleName
					};
				},
				registerComposeToolbarController: function (oController) {
					var ComposeView = __webpack_require__(/*! modules/MailMobileWebclient/js/views/ComposeView.js */ "dolo");
					ComposeView.registerToolbarController(oController);
				}
			};
		}
	}
	
	return null;
};


/***/ }),

/***/ "E6m7":
/*!*****************************************************************!*\
  !*** ./modules/MailMobileWebclient/js/views/CFolderListView.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
	UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV"),
	
	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	MailCache = __webpack_require__(/*! modules/MailWebclient/js/Cache.js */ "F0Fd"),
	Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy")
;

/**
 * @constructor
 */
function CFolderListView()
{
	this.accounts = AccountList.collection;
	
	this.folderList = MailCache.folderList;

	this.unifiedInboxAllowed = AccountList.unifiedInboxAllowed;
	this.oUnifiedInbox = MailCache.oUnifiedInbox;

	this.quotaProc = ko.observable(-1);
	this.quotaDesc = ko.observable('');
	this.bShowQuotaBarTextAsTooltip = UserSettings.ShowQuotaBarTextAsTooltip;

	if (UserSettings.ShowQuotaBar)
	{
		ko.computed(function () {

			MailCache.quotaChangeTrigger();

			var
				oAccount = AccountList.getCurrent(),
				iQuota = oAccount ? oAccount.quota() : 0,
				iUsed = oAccount ? oAccount.usedSpace() : 0,
				iProc = 0 < iQuota ? Math.ceil((iUsed / iQuota) * 100) : -1
			;

			iProc = 100 < iProc ? 100 : iProc;

			this.quotaProc(iProc);
			this.quotaDesc(-1 < iProc ?
				TextUtils.i18n('COREWEBCLIENT/INFO_QUOTA', {
					'PROC': iProc,
					'QUOTA': TextUtils.getFriendlySize(iQuota * 1024)
				}) : '');

		
			if (UserSettings.QuotaWarningPerc > 0 && iProc !== -1 && UserSettings.QuotaWarningPerc > (100 - iProc))
			{
				Screens.showError(TextUtils.i18n('COREWEBCLIENT/WARNING_QUOTA_ALMOST_REACHED'), true);
			}

			return true;

		}, this);
	}
}

CFolderListView.prototype.ViewTemplate = 'MailMobileWebclient_FoldersView';

module.exports = CFolderListView;


/***/ }),

/***/ "dolo":
/*!*************************************************************!*\
  !*** ./modules/MailMobileWebclient/js/views/ComposeView.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "M4cL");


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	
	CComposeView = __webpack_require__(/*! modules/MailWebclient/js/views/CComposeView.js */ "aB/g"),
	ComposeView = null
;

CComposeView.prototype.registerOwnToolbarControllers = function () {
	this.registerToolbarController({
		ViewTemplate: 'MailMobileWebclient_Compose_SendButtonView',
		sId: 'send',
		bAllowMobile: true,
		sendCommand: this.sendCommand
	});
	this.registerToolbarController({
		ViewTemplate: 'MailMobileWebclient_Compose_SaveButtonView',
		sId: 'save',
		bAllowMobile: true,
		saveCommand: this.saveCommand
	});
	this.registerToolbarController({
		ViewTemplate: 'MailWebclient_Compose_ImportanceDropdownView',
		sId: 'importance',
		selectedImportance: this.selectedImportance
	});
	this.registerToolbarController({
		ViewTemplate: 'MailWebclient_Compose_ConfirmationCheckboxView',
		sId: 'confirmation',
		sendReadingConfirmation: this.sendReadingConfirmation
	});
};

ComposeView = new CComposeView();
ComposeView.ViewTemplate = 'MailMobileWebclient_ComposeView';
ComposeView.oHtmlEditor.ViewTemplate = 'MailMobileWebclient_HtmlEditorView';
ComposeView.executeBackToList = function ()
{
	if (App.isNewTab())
	{
		window.close();
	}
	else if (!!this.shown && this.shown())
	{
		var
			HeaderItemView = __webpack_require__(/*! modules/MailMobileWebclient/js/views/HeaderItemView.js */ "fUtQ"),
			Routing = __webpack_require__(/*! modules/CoreWebclient/js/Routing.js */ "W66n")
		;
		HeaderItemView.hash(HeaderItemView.baseHash());
		Routing.setPreviousHash();
	}
	this.backToListOnSendOrSave(false);
};

ComposeView.showMore = ko.observable(false);
ComposeView.showMore.subscribe(function () {
	if (ComposeView.showMore())
	{
		setTimeout(function () {
			$('body').one('click', function () {
				ComposeView.showMore(false);
			});
		});
	}
});
ComposeView.toolbarMobileControllers = ko.computed(function () {
	return _.filter(this.toolbarControllers(), function (oController) {
		return oController.bAllowMobile;
	});
}, ComposeView);
ComposeView.toolbarFirstMobileControllers = ko.computed(function () {
	return this.toolbarMobileControllers().length > 2 ? _.first(this.toolbarMobileControllers(), 1) : this.toolbarMobileControllers();
}, ComposeView);
ComposeView.toolbarNextMobileControllers = ko.computed(function () {
	return this.toolbarMobileControllers().length > 2 ? _.rest(this.toolbarMobileControllers(), 1) : [];
}, ComposeView);

module.exports = ComposeView;


/***/ }),

/***/ "fUtQ":
/*!****************************************************************!*\
  !*** ./modules/MailMobileWebclient/js/views/HeaderItemView.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	
	CAbstractHeaderItemView = __webpack_require__(/*! modules/CoreWebclient/js/views/CHeaderItemView.js */ "C5H3"),
			
	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn")
;

function CHeaderItemView()
{
	CAbstractHeaderItemView.call(this, TextUtils.i18n('MAILMOBILEWEBCLIENT/ACTION_SHOW_MAIL'));
	
	this.accounts = AccountList.collection;
}

_.extendOwn(CHeaderItemView.prototype, CAbstractHeaderItemView.prototype);

CHeaderItemView.prototype.ViewTemplate = 'MailMobileWebclient_HeaderItemView';

var HeaderItemView = new CHeaderItemView();

HeaderItemView.allowChangeTitle(true);

module.exports = HeaderItemView;


/***/ }),

/***/ "3tGC":
/*!**********************************************************!*\
  !*** ./modules/MailMobileWebclient/js/views/MailView.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	
	Routing = __webpack_require__(/*! modules/CoreWebclient/js/Routing.js */ "W66n"),
	MailCache = __webpack_require__(/*! modules/MailWebclient/js/Cache.js */ "F0Fd"),
	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	
	CFolderListView = __webpack_require__(/*! modules/MailMobileWebclient/js/views/CFolderListView.js */ "E6m7"),
	CMailView = __webpack_require__(/*! modules/MailWebclient/js/views/CMailView.js */ "fveu")
;

/**
 * @constructor
 */
function CMailMobileView()
{
	CMailView.call(this);
	
	this.oFolderList = new CFolderListView();
	this.messageList().ViewTemplate = 'MailMobileWebclient_MessagesView';
	this.messageList().oPageSwitcher.ViewTemplate = 'CoreMobileWebclient_PageSwitcherView'
	this.oBaseMessagePaneView.ViewTemplate = 'MailMobileWebclient_MessagePaneView';
	
	this.selectedPanel = ko.observable(Enums.MobilePanel.Items);
	MailCache.currentMessage.subscribe(function () {
		this.gotoMessagePane();
	}, this);
	
	this.appsDom = null;
	this.showApps = ko.observable(false);
	
	this.init();
	
	MailCache.currentAccountId.subscribe(function () {
		this.selectedPanel(Enums.MobilePanel.Items);
	}, this);

	App.broadcastEvent('MailMobileWebclient::ConstructView::after', {'Name': this.ViewConstructorName, 'View': this});
}

_.extendOwn(CMailMobileView.prototype, CMailView.prototype);

CMailMobileView.prototype.ViewTemplate = 'MailMobileWebclient_MailView';
CMailMobileView.prototype.ViewConstructorName = 'CMailMobileView';

CMailMobileView.prototype.init = function ()
{
	this.selectedPanel.subscribe(function (value) {
		var bOpen = value === Enums.MobilePanel.Groups;

		$('body').toggleClass('with-panel-left-reveal', bOpen).toggleClass('panel-closing', !bOpen);
	});
	
	var self = this;
	this.appsDom = $('#apps-list');
	this.appsDom.on('click', function () {
		self.showApps(false);
	});
	
	this.showApps.subscribe(function (value) {
		$('body').toggleClass('with-panel-right-cover', value);
	}, this);
};

CMailMobileView.prototype.togleFolderList = function (oData, oEvent, bValue)
{
	var 
		bValue = bValue || this.selectedPanel() !== Enums.MobilePanel.Groups,
		newPanel = bValue ? Enums.MobilePanel.Groups : Enums.MobilePanel.Items
	;
	this.changeSelectedPanel(newPanel);
};

CMailMobileView.prototype.gotoFolderList = function ()
{
	this.changeSelectedPanel(Enums.MobilePanel.Groups);
};

CMailMobileView.prototype.gotoMessageList = function ()
{
	this.changeSelectedPanel(Enums.MobilePanel.Items);
	
	if (MailCache.currentMessage())
	{
		Routing.replaceHashWithoutMessageUid(MailCache.currentMessage().longUid());
	}
	
	return true;
};

CMailMobileView.prototype.gotoMessagePane = function ()
{
	if (MailCache.currentMessage())
	{
		this.changeSelectedPanel(Enums.MobilePanel.View);
	}
	else
	{
		this.gotoMessageList();
	}
};

/**
 * @param {number} iPanel
 */
CMailMobileView.prototype.changeSelectedPanel = function (iPanel)
{
	this.selectedPanel(iPanel);
};

module.exports = new CMailMobileView();


/***/ }),

/***/ "gqwj":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23000%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M12%202C6.47%202%202%206.47%202%2012s4.47%2010%2010%2010%2010-4.47%2010-10S17.53%202%2012%202zm5%2013.59L15.59%2017%2012%2013.41%208.41%2017%207%2015.59%2010.59%2012%207%208.41%208.41%207%2012%2010.59%2015.59%207%2017%208.41%2013.41%2012%2017%2015.59z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23000%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M12%202C6.47%202%202%206.47%202%2012s4.47%2010%2010%2010%2010-4.47%2010-10S17.53%202%2012%202zm5%2013.59L15.59%2017%2012%2013.41%208.41%2017%207%2015.59%2010.59%2012%207%208.41%208.41%207%2012%2010.59%2015.59%207%2017%208.41%2013.41%2012%2017%2015.59z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "dg60":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23000000%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M0%200h24v24H0V0z%27%20fill%3D%27none%27%2F%3E%3Cpath%20d%3D%27M20%2012l-1.41-1.41L13%2016.17V4h-2v12.17l-5.58-5.59L4%2012l8%208%208-8z%27%20fill%3D%27%23000000%27%2F%3E%3C%2Fsvg%3E ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23000000%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M0%200h24v24H0V0z%27%20fill%3D%27none%27%2F%3E%3Cpath%20d%3D%27M20%2012l-1.41-1.41L13%2016.17V4h-2v12.17l-5.58-5.59L4%2012l8%208%208-8z%27%20fill%3D%27%23000000%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "PzTA":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23333%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Ccircle%20cx%3D%2712%27%20cy%3D%2712%27%20r%3D%273.2%27%2F%3E%3Cpath%20d%3D%27M9%202L7.17%204H4c-1.1%200-2%20.9-2%202v12c0%201.1.9%202%202%202h16c1.1%200%202-.9%202-2V6c0-1.1-.9-2-2-2h-3.17L15%202H9zm3%2015c-2.76%200-5-2.24-5-5s2.24-5%205-5%205%202.24%205%205-2.24%205-5%205z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23333%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Ccircle%20cx%3D%2712%27%20cy%3D%2712%27%20r%3D%273.2%27%2F%3E%3Cpath%20d%3D%27M9%202L7.17%204H4c-1.1%200-2%20.9-2%202v12c0%201.1.9%202%202%202h16c1.1%200%202-.9%202-2V6c0-1.1-.9-2-2-2h-3.17L15%202H9zm3%2015c-2.76%200-5-2.24-5-5s2.24-5%205-5%205%202.24%205%205-2.24%205-5%205z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "3xWu":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23FFFFFF%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M15.5%2014h-.79l-.28-.27C15.41%2012.59%2016%2011.11%2016%209.5%2016%205.91%2013.09%203%209.5%203S3%205.91%203%209.5%205.91%2016%209.5%2016c1.61%200%203.09-.59%204.23-1.57l.27.28v.79l5%204.99L20.49%2019l-4.99-5zm-6%200C7.01%2014%205%2011.99%205%209.5S7.01%205%209.5%205%2014%207.01%2014%209.5%2011.99%2014%209.5%2014z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23FFFFFF%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M15.5%2014h-.79l-.28-.27C15.41%2012.59%2016%2011.11%2016%209.5%2016%205.91%2013.09%203%209.5%203S3%205.91%203%209.5%205.91%2016%209.5%2016c1.61%200%203.09-.59%204.23-1.57l.27.28v.79l5%204.99L20.49%2019l-4.99-5zm-6%200C7.01%2014%205%2011.99%205%209.5S7.01%205%209.5%205%2014%207.01%2014%209.5%2011.99%2014%209.5%2014z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "neWK":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23FFFFFF%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M19%2013h-6v6h-2v-6H5v-2h6V5h2v6h6v2z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23FFFFFF%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M19%2013h-6v6h-2v-6H5v-2h6V5h2v6h6v2z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "tQub":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23FFFFFF%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23FFFFFF%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "plMv":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23fff%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%27%23fff%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20width%3D%2724%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "SSgV":
/*!********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%270%200%2060%20120%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27m60%2061.5-38.25%2038.25-9.75-9.75%2029.25-28.5-29.25-28.5%209.75-9.75z%27%20fill%3D%27%23c7c7cc%27%2F%3E%3C%2Fsvg%3E ***!
  \********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%270%200%2060%20120%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27m60%2061.5-38.25%2038.25-9.75-9.75%2029.25-28.5-29.25-28.5%209.75-9.75z%27%20fill%3D%27%23c7c7cc%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "rtTF":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%270%200%2060%20120%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27m60%2061.5-38.25%2038.25-9.75-9.75%2029.25-28.5-29.25-28.5%209.75-9.75z%27%20transform%3D%27translate%28115%2C%2030%29%20rotate%2890%29%27%20fill%3D%27%23c7c7cc%27%2F%3E%3C%2Fsvg%3E ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%270%200%2060%20120%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27m60%2061.5-38.25%2038.25-9.75-9.75%2029.25-28.5-29.25-28.5%209.75-9.75z%27%20transform%3D%27translate%28115%2C%2030%29%20rotate%2890%29%27%20fill%3D%27%23c7c7cc%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "psbF":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27%23ffffff%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M10%206L8.59%207.41%2013.17%2012l-4.58%204.59L10%2018l6-6z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27%23ffffff%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M10%206L8.59%207.41%2013.17%2012l-4.58%204.59L10%2018l6-6z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "J4mH":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27%23ffffff%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M15.41%207.41L14%206l-6%206%206%206%201.41-1.41L10.83%2012z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27%23ffffff%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M15.41%207.41L14%206l-6%206%206%206%201.41-1.41L10.83%2012z%27%2F%3E%3Cpath%20d%3D%27M0%200h24v24H0z%27%20fill%3D%27none%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "oAr8":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27%23ffffff%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M9%2016.17L4.83%2012l-1.42%201.41L9%2019%2021%207l-1.41-1.41z%27%2F%3E%3C%2Fsvg%3E ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27%23ffffff%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M9%2016.17L4.83%2012l-1.42%201.41L9%2019%2021%207l-1.41-1.41z%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "zoZ3":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%27-80%204%2024%2024%27%3E%3Cpath%20d%3D%27M-69%2C8v12.2l-5.6-5.6L-76%2C16l8%2C8l8-8l-1.4-1.4l-5.6%2C5.6V8H-69z%27%20fill%3D%27%238c8c8c%27%2F%3E%3C%2Fsvg%3E ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%27-80%204%2024%2024%27%3E%3Cpath%20d%3D%27M-69%2C8v12.2l-5.6-5.6L-76%2C16l8%2C8l8-8l-1.4-1.4l-5.6%2C5.6V8H-69z%27%20fill%3D%27%238c8c8c%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "Qp7Q":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2018%2012%27%20fill%3D%27%23c7c7cc%27%3E%3Cpath%20d%3D%27M0%2C2V0h22v2H0z%27%2F%3E%3Cpath%20d%3D%27M0%2C7V5h22v2H0z%27%2F%3E%3Cpath%20d%3D%27M0%2C12v-2h22v2H0z%27%2F%3E%3C%2Fsvg%3E ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2018%2012%27%20fill%3D%27%23c7c7cc%27%3E%3Cpath%20d%3D%27M0%2C2V0h22v2H0z%27%2F%3E%3Cpath%20d%3D%27M0%2C7V5h22v2H0z%27%2F%3E%3Cpath%20d%3D%27M0%2C12v-2h22v2H0z%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "8j/K":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2027%2044%27%3E%3Cpath%20d%3D%27M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z%27%20fill%3D%27%23007aff%27%2F%3E%3C%2Fsvg%3E ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2027%2044%27%3E%3Cpath%20d%3D%27M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z%27%20fill%3D%27%23007aff%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "X9V4":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2027%2044%27%3E%3Cpath%20d%3D%27M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z%27%20fill%3D%27%23007aff%27%2F%3E%3C%2Fsvg%3E ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2027%2044%27%3E%3Cpath%20d%3D%27M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z%27%20fill%3D%27%23007aff%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "qm6x":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M12%204l-1.41%201.41L16.17%2011H4v2h12.17l-5.58%205.59L12%2020l8-8z%27%20fill%3D%27%23ffffff%27%2F%3E%3C%2Fsvg%3E ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M12%204l-1.41%201.41L16.17%2011H4v2h12.17l-5.58%205.59L12%2020l8-8z%27%20fill%3D%27%23ffffff%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "IgaC":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M20%2011H7.83l5.59-5.59L12%204l-8%208%208%208%201.41-1.41L7.83%2013H20v-2z%27%20fill%3D%27%23ffffff%27%2F%3E%3C%2Fsvg%3E ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M20%2011H7.83l5.59-5.59L12%204l-8%208%208%208%201.41-1.41L7.83%2013H20v-2z%27%20fill%3D%27%23ffffff%27%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "+g/t":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M3%2018h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z%27%20fill%3D%27%23ffffff%27%2F%3E%3C%2Fsvg%3E ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M3%2018h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z%27%20fill%3D%27%23ffffff%27%2F%3E%3C%2Fsvg%3E";

/***/ })

}]);