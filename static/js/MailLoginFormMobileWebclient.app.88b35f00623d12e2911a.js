"use strict";
(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[19],{

/***/ "HFQ5":
/*!************************************************************!*\
  !*** ./modules/MailLoginFormMobileWebclient/js/manager.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



module.exports = function (oAppData) {
	var
		Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),

		App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
		ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),

		bAnonimUser = App.getUserRole() === Enums.UserRole.Anonymous
	;

	if (!ModulesManager.isModuleAvailable('CoreMobileWebclient'))
	{
		return null;
	}

	if (!App.isPublic() && bAnonimUser)
	{
		return {
			/**
			 * Returns login view screen.
			 */
			getScreens: function () {
				var
					oScreens = {},
					ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
					sHashModuleName = ModulesManager.run('MailLoginFormWebclient', 'getHashModuleName')
				;

				if (Types.isNonEmptyString(sHashModuleName))
				{
					oScreens[sHashModuleName] = function () {
						var oLoginScreenView = ModulesManager.run('MailLoginFormWebclient', 'getLoginScreenView');
						if (oLoginScreenView)
						{
							oLoginScreenView.ViewTemplate = 'MailLoginFormMobileWebclient_LoginView';
						}
						return oLoginScreenView;
					};
				}

				return oScreens;
			}
		};
	}

	return null;
};


/***/ })

}]);