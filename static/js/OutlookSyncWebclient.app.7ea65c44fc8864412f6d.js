"use strict";
(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[38],{

/***/ "JnfT":
/*!*****************************************************!*\
  !*** ./modules/OutlookSyncWebclient/js/Settings.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L")
;

module.exports = {
	ServerModuleName: 'MobileSync',
	HashModuleName: 'outlooksync',
	
	PluginDownloadLink: '',
	PluginReadMoreLink: '',
	
	/**
	 * Initializes settings from AppData object sections.
	 * 
	 * @param {Object} oAppData Object contained modules settings.
	 */
	init: function (oAppData)
	{
		var oAppDataSection = oAppData['OutlookSyncWebclient'];
		
		if (!_.isEmpty(oAppDataSection))
		{
			this.PluginDownloadLink = Types.pString(oAppDataSection.PluginDownloadLink, this.PluginDownloadLink);
			this.PluginReadMoreLink = Types.pString(oAppDataSection.PluginReadMoreLink, this.PluginReadMoreLink);
		}
	}
};


/***/ }),

/***/ "1Ou0":
/*!****************************************************!*\
  !*** ./modules/OutlookSyncWebclient/js/manager.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



module.exports = function (oAppData) {
	var App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp");
	
	if (App.isUserNormalOrTenant())
	{
		var
			TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),

			Settings = __webpack_require__(/*! modules/OutlookSyncWebclient/js/Settings.js */ "JnfT")
		;

		Settings.init(oAppData);

		return {
			start: function (ModulesManager) {
				ModulesManager.run('SettingsWebclient', 'registerSettingsTab', [function () { return __webpack_require__(/*! modules/OutlookSyncWebclient/js/views/OutlookSyncSettingsPaneView.js */ "98hw"); }, Settings.HashModuleName, TextUtils.i18n('OUTLOOKSYNCWEBCLIENT/LABEL_SETTINGS_TAB')]);
			}
		};
	}
	
	return null;
};


/***/ }),

/***/ "98hw":
/*!******************************************************************************!*\
  !*** ./modules/OutlookSyncWebclient/js/views/OutlookSyncSettingsPaneView.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV"),
	
	Settings = __webpack_require__(/*! modules/OutlookSyncWebclient/js/Settings.js */ "JnfT")
;

/**
 * @constructor
 */
function COutlookSyncSettingsPaneView()
{
	this.oCreateLoginPasswordView = ModulesManager.run('OAuthIntegratorWebclient', 'getCreateLoginPasswordView');
	
	this.server = ko.observable('');
	
	this.bDemo = UserSettings.IsDemo;

	this.sPluginDownloadLink = Settings.PluginDownloadLink;
	this.sPluginReadMoreLink = Settings.PluginReadMoreLink;

	this.credentialsHintText = App.mobileCredentialsHintText;
}

COutlookSyncSettingsPaneView.prototype.ViewTemplate = 'OutlookSyncWebclient_OutlookSyncSettingsPaneView';

COutlookSyncSettingsPaneView.prototype.showTab = function ()
{
	Ajax.send(Settings.ServerModuleName, 'GetInfo', null, this.onGetInfoResponse, this);
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
COutlookSyncSettingsPaneView.prototype.onGetInfoResponse = function (oResponse, oRequest)
{
	var oResult = oResponse.Result;
	
	if (!oResult || !oResult.Dav)
	{
		Api.showErrorByCode(oResponse);
	}
	else
	{
		this.server(oResult.Dav.Server);
	}
};

module.exports = new COutlookSyncSettingsPaneView();


/***/ })

}]);