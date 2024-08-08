"use strict";
(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[17],{

/***/ "Rjov":
/*!************************************!*\
  !*** ./modules/Ios/js/Settings.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	
	AppData = window.auroraAppData
;

var Settings = {
	AllowIosProfile: false,
	SyncIosAfterLogin: false,
	
	/**
	 * Initializes settings from AppData object sections.
	 * 
	 * @param {Object} oAppData Object contained modules settings.
	 */
	init: function (oAppData)
	{
		var
			oAppDataIosSection = oAppData['Ios']
		;
		
		if (!_.isEmpty(oAppDataIosSection))
		{
			this.AllowIosProfile = Types.pBool(oAppDataIosSection.AllowIosProfile, this.AllowIosProfile);
			this.SyncIosAfterLogin = Types.pBool(oAppDataIosSection.SyncIosAfterLogin, this.SyncIosAfterLogin);
		}
	}
};

Settings.init(AppData);

module.exports = Settings;


/***/ }),

/***/ "HwXE":
/*!***********************************!*\
  !*** ./modules/Ios/js/manager.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "M4cL");


__webpack_require__(/*! modules/CoreWebclient/js/enums.js */ "p/cB");

module.exports = function (oAppData) {
	var
		App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
		Settings = __webpack_require__(/*! modules/Ios/js/Settings.js */ "Rjov"),
		Browser = __webpack_require__(/*! modules/CoreWebclient/js/Browser.js */ "dfnr"),
		iUserRole = App.getUserRole()
	;
	
	Settings.init(oAppData);
	
	return {
		routeToIos: function () {
			if (Browser.iosDevice && iUserRole !== Enums.UserRole.Anonymous && Settings.SyncIosAfterLogin && Settings.AllowIosProfile && $.cookie('skip-ios') !== '1')
			{
				$.cookie('skip-ios', '1');
				window.location.href = '?ios';
			}
		}
	};
};


/***/ })

}]);