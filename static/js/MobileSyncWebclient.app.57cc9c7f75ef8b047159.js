"use strict";
(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[32],{

/***/ "qt+3":
/*!****************************************************!*\
  !*** ./modules/MobileSyncWebclient/js/Settings.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L")
;

module.exports = {
	ServerModuleName: 'MobileSync',
	HashModuleName: 'mobilesync',
	ServerDavModuleName: 'Dav',
	
	ExternalHostNameOfDAVServer: '',
	
	/**
	 * Initializes settings from AppData object sections.
	 *
	 * @param {Object} oAppData Object contained modules settings.
	 */
	init: function (oAppData)
	{
		var oAppDataSection = oAppData[this.ServerDavModuleName];
		
		if (!_.isEmpty(oAppDataSection))
		{
			this.ExternalHostNameOfDAVServer = Types.pString(oAppDataSection.ExternalHostNameOfDAVServer, this.ExternalHostNameOfDAVServer);
		}
	},
	
	/**
	 * Updates new settings values after saving on server.
	 *
	 * @param {string} sExternalHostNameOfDAVServer
	 */
	update: function (sExternalHostNameOfDAVServer)
	{
		this.ExternalHostNameOfDAVServer = sExternalHostNameOfDAVServer;
	}
};


/***/ }),

/***/ "meG9":
/*!***************************************************!*\
  !*** ./modules/MobileSyncWebclient/js/manager.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



module.exports = function (oAppData) {
	var
		TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
		
		App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
		ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),

		Settings = __webpack_require__(/*! modules/MobileSyncWebclient/js/Settings.js */ "qt+3")
	;
	
	Settings.init(oAppData);

	if (!ModulesManager.isModuleAvailable(Settings.ServerModuleName))
	{
		return null;
	}
	
	if (App.isUserNormalOrTenant())
	{
		return {
			start: function (ModulesManager) {
				ModulesManager.run('SettingsWebclient', 'registerSettingsTab', [function () { return __webpack_require__(/*! modules/MobileSyncWebclient/js/views/MobileSyncSettingsPaneView.js */ "Xp7f"); }, Settings.HashModuleName, TextUtils.i18n('MOBILESYNCWEBCLIENT/LABEL_SETTINGS_TAB')]);
			}
		};
	}
	
	return null;
};


/***/ }),

/***/ "Xp7f":
/*!****************************************************************************!*\
  !*** ./modules/MobileSyncWebclient/js/views/MobileSyncSettingsPaneView.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	UrlUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Url.js */ "Tt1R"),
	
	Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	Browser = __webpack_require__(/*! modules/CoreWebclient/js/Browser.js */ "dfnr"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV"),
	
	Settings = __webpack_require__(/*! modules/MobileSyncWebclient/js/Settings.js */ "qt+3")
;

/**
 * @constructor
 */
function CMobileSyncSettingsPaneView()
{
	this.oMailMobileSyncSettingsView = ModulesManager.run('MailWebclient', 'getMobileSyncSettingsView');
	this.oFilesMobileSyncSettingsView = ModulesManager.run('FilesWebclient', 'getMobileSyncSettingsView');
	this.oCalendarMobileSyncSettingsView = ModulesManager.run('CalendarWebclient', 'getMobileSyncSettingsView');
	this.oContactsMobileSyncSettingsView = ModulesManager.run('ContactsWebclient', 'getMobileSyncSettingsView');
	
	this.oCreateLoginPasswordView = ModulesManager.run('OAuthIntegratorWebclient', 'getCreateLoginPasswordView');
	
	this.enableDav = ko.observable(false);
	
	this.showSyncViaUrlSection = ko.computed(function () {
		return this.enableDav() && (ModulesManager.isModuleEnabled('CalendarWebclient') || ModulesManager.isModuleEnabled('ContactsWebclient'));
	}, this);
	
	this.sSyncViaUrlSectionInfo = this.getSyncViaUrlSectionInfo();
	this.sSyncViaUrlIOSDeviceSectionInfo = TextUtils.i18n('MOBILESYNCWEBCLIENT/INFO_DAVSYNC_IOS_DEVICE', {
		'WEBMAIL_URL': UrlUtils.getAppPath()
	});
	
	this.davServer = ko.observable('');
	
	this.bIosDevice = Browser.iosDevice;
	this.bDemo = UserSettings.IsDemo;
	
	this.visibleDavViaUrls = ko.computed(function () {
		return !!this.oCalendarMobileSyncSettingsView && this.oCalendarMobileSyncSettingsView.visible() || !!this.oContactsMobileSyncSettingsView;
	}, this);
	
	this.credentialsHintText = App.mobileCredentialsHintText;
}

CMobileSyncSettingsPaneView.prototype.ViewTemplate = 'MobileSyncWebclient_MobileSyncSettingsPaneView';

CMobileSyncSettingsPaneView.prototype.showTab = function ()
{
	Ajax.send(Settings.ServerModuleName, 'GetInfo', null, this.onGetInfoResponse, this);
};

/**
 * Returns info text for "Sync via URL" section
 * 
 * @returns {String}
 */
CMobileSyncSettingsPaneView.prototype.getSyncViaUrlSectionInfo = function ()
{
	var
		bAllowCalendar = ModulesManager.isModuleEnabled('CalendarWebclient'),
		bAllowContacts = ModulesManager.isModuleEnabled('ContactsWebclient')
	;
	
	if (bAllowCalendar && bAllowContacts)
	{
		return TextUtils.i18n('MOBILESYNCWEBCLIENT/INFO_DAVSYNC');
	}
	if (bAllowCalendar)
	{
		return TextUtils.i18n('MOBILESYNCWEBCLIENT/INFO_DAVSYNC_CALENDAR_ONLY');
	}
	if (bAllowContacts)
	{
		return TextUtils.i18n('MOBILESYNCWEBCLIENT/INFO_DAVSYNC_CONTACTS_ONLY');
	}
	return '';
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CMobileSyncSettingsPaneView.prototype.onGetInfoResponse = function (oResponse, oRequest)
{
	var
		oResult = oResponse.Result,
		oDav = !!oResult.EnableDav ? oResult.Dav : null
	;
	
	if (!oResult)
	{
		Api.showErrorByCode(oResponse);
	}
	else
	{
		this.enableDav(!!oResult.EnableDav);

		if (this.enableDav() && oDav)
		{
			this.davServer(oDav.Server);
			if (this.oFilesMobileSyncSettingsView && _.isFunction(this.oFilesMobileSyncSettingsView.populate))
			{
				this.oFilesMobileSyncSettingsView.populate(oDav);
			}
			if (this.oCalendarMobileSyncSettingsView && _.isFunction(this.oCalendarMobileSyncSettingsView.populate))
			{
				this.oCalendarMobileSyncSettingsView.populate(oDav);
			}
			if (this.oContactsMobileSyncSettingsView && _.isFunction(this.oContactsMobileSyncSettingsView.populate))
			{
				this.oContactsMobileSyncSettingsView.populate(oDav);
			}
		}
	}
};

module.exports = new CMobileSyncSettingsPaneView();


/***/ })

}]);