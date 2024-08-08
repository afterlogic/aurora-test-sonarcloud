"use strict";
(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[18],{

/***/ "171C":
/*!******************************************************!*\
  !*** ./modules/CoreWebclient/js/utils/Validation.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



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

/***/ "TsEX":
/*!************************************************************************!*\
  !*** ./modules/MailChangePasswordPoppassdExtendedPlugin/js/manager.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "M4cL");


module.exports = function (oAppData) {
	var
		_ = __webpack_require__(/*! underscore */ "C3HO"),
		
		TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
		
		App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
		Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
		
		AlertPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/AlertPopup.js */ "hT1I"),
		ConfirmPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/ConfirmPopup.js */ "XeMN"),
		ChangePasswordPopup = __webpack_require__(/*! modules/MailChangePasswordPoppassdExtendedPlugin/js/popups/ChangePasswordPopup.js */ "1/+a")
	;
	
	return {
		start: function (ModulesManager) {
			App.subscribeEvent('StandardLoginFormWebclient::ConstructView::after', function (oParams) {
				var
					oLoginScreenView = oParams.View
				;
				if (oLoginScreenView)
				{
					// Do not completely replace previous onSystemLoginResponse, because it might be already changed by another plugin
					var fOldOnSystemLoginResponse = oLoginScreenView.onSystemLoginResponse.bind(oLoginScreenView);
					if (!_.isFunction(fOldOnSystemLoginResponse))
					{
						fOldOnSystemLoginResponse = oLoginScreenView.onSystemLoginResponseBase.bind(oLoginScreenView);
					}
					if (!_.isFunction(fOldOnSystemLoginResponse))
					{
						fOldOnSystemLoginResponse = function () {};
					}
					oLoginScreenView.onSystemLoginResponse = function (oResponse, oRequest) {
						if (oResponse && oResponse.SubscriptionsResult && oResponse.SubscriptionsResult['MailChangePasswordPoppassdExtendedPlugin::onBeforeLogin'])
						{
							this.loading(false);
							var oResult = oResponse.SubscriptionsResult['MailChangePasswordPoppassdExtendedPlugin::onBeforeLogin'];
							if (oResult.CallHelpdesk)
							{
								Popups.showPopup(AlertPopup, [TextUtils.i18n('MAILCHANGEPASSWORDPOPPASSDEXTENDEDPLUGIN/INFO_PASSWORD_EXPIRED'), function () {}, TextUtils.i18n('MAILCHANGEPASSWORDPOPPASSDEXTENDEDPLUGIN/HEADING_PASSWORD_EXPIRED')]);
							}
							else if (oResult.ChangePassword)
							{
								if (oResult.DaysBeforeExpire >= 0)
								{
									var sConfirm = TextUtils.i18n('MAILCHANGEPASSWORDPOPPASSDEXTENDEDPLUGIN/INFO_PASSWORD_ABOUT_EXPIRE_PLURAL', {'COUNT': oResult.DaysBeforeExpire}, null, oResult.DaysBeforeExpire);
									if (oResult.DaysBeforeExpire === 0)
									{
										sConfirm = TextUtils.i18n('MAILCHANGEPASSWORDPOPPASSDEXTENDEDPLUGIN/INFO_PASSWORD_EXPIRES_TODAY');
									}
									sConfirm += ' ' + TextUtils.i18n('MAILCHANGEPASSWORDPOPPASSDEXTENDEDPLUGIN/INFO_CHANGE_PASSWOD_BEFORE_EXPIRING');
									Popups.showPopup(ConfirmPopup, [sConfirm, function (bChangePassword) {
										if (bChangePassword)
										{
											App.setAuthToken(oResponse.Result.AuthToken);
											Popups.showPopup(ChangePasswordPopup, [TextUtils.i18n('MAILCHANGEPASSWORDPOPPASSDEXTENDEDPLUGIN/HEADING_PASSWORD_CHANGE'), function () {
												$.removeCookie('AuthToken');
											}]);
										}
										else
										{
											fOldOnSystemLoginResponse(oResponse, oRequest);
										}
									}.bind(this), TextUtils.i18n('MAILCHANGEPASSWORDPOPPASSDEXTENDEDPLUGIN/HEADING_PASSWORD_ABOUT_EXPIRE'), TextUtils.i18n('MAILCHANGEPASSWORDPOPPASSDEXTENDEDPLUGIN/ACTION_CHANGE'), TextUtils.i18n('MAILCHANGEPASSWORDPOPPASSDEXTENDEDPLUGIN/ACTION_LATER')]);
								}
								else
								{
									App.setAuthToken(oResponse.Result.AuthToken);
									Popups.showPopup(ChangePasswordPopup, [TextUtils.i18n('MAILCHANGEPASSWORDPOPPASSDEXTENDEDPLUGIN/HEADING_PASSWORD_EXPIRED_NEED_CHANGING'), function () {
										$.removeCookie('AuthToken');
									}]);
								}
							}
							else
							{
								fOldOnSystemLoginResponse(oResponse, oRequest);
							}
						}
						else
						{
							fOldOnSystemLoginResponse(oResponse, oRequest);
						}
					};
				}
			});
		}
	};
};


/***/ }),

/***/ "1/+a":
/*!*******************************************************************************************!*\
  !*** ./modules/MailChangePasswordPoppassdExtendedPlugin/js/popups/ChangePasswordPopup.js ***!
  \*******************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	ValidationUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Validation.js */ "171C"),
	
	Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
	
	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX")
;

/**
 * @constructor
 */
function CChangePasswordPopup()
{
	CAbstractPopup.call(this);
	
	this.currentPassword = ko.observable('');
	this.newPassword = ko.observable('');
	this.confirmPassword = ko.observable('');
	
	this.heading = ko.observable('');
	this.fOnPopupClose = null;
}

_.extendOwn(CChangePasswordPopup.prototype, CAbstractPopup.prototype);

CChangePasswordPopup.prototype.PopupTemplate = 'MailChangePasswordPoppassdExtendedPlugin_ChangePasswordPopup';

/**
 * @param {string} sHeading
 * @param {Function} fOnPopupClose
 */
CChangePasswordPopup.prototype.onOpen = function (sHeading, fOnPopupClose)
{
	this.currentPassword('');
	this.newPassword('');
	this.confirmPassword('');
	
	this.heading(sHeading);
	this.fOnPopupClose = fOnPopupClose;
};

CChangePasswordPopup.prototype.onClose = function ()
{
	if (_.isFunction(this.fOnPopupClose))
	{
		this.fOnPopupClose();
	}
};

CChangePasswordPopup.prototype.change = function ()
{
	var
		sNewPass = $.trim(this.newPassword()),
		sConfirmPassword = $.trim(this.confirmPassword())
	;
	
	if (ValidationUtils.checkPassword(sNewPass, sConfirmPassword))
	{
		this.sendChangeRequest();
	}
};

CChangePasswordPopup.prototype.sendChangeRequest = function ()
{
	var
		oParameters = {
			'CurrentPassword': $.trim(this.currentPassword()),
			'NewPassword': $.trim(this.newPassword())
		}
	;
	
	Ajax.send('Mail', 'ChangePassword', oParameters, this.onUpdatePasswordResponse, this);
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CChangePasswordPopup.prototype.onUpdatePasswordResponse = function (oResponse, oRequest)
{
	if (oResponse.Result === false)
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('MAILCHANGEPASSWORDPOPPASSDEXTENDEDPLUGIN/ERROR_PASSWORD_NOT_SAVED'));
	}
	else
	{
		Screens.showReport(TextUtils.i18n('MAILCHANGEPASSWORDPOPPASSDEXTENDEDPLUGIN/REPORT_PASSWORD_CHANGED'));
		this.closePopup();
	}
};

module.exports = new CChangePasswordPopup();


/***/ })

}]);