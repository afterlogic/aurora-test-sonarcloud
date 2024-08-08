(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[6],{

/***/ "GfzX":
/*!***************************************************!*\
  !*** ./modules/CoreMobileWebclient/js/manager.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = function (oAppData) {
	var App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp");
	
	if (App.isMobile())
	{
		return {
			start: function (ModulesManager) {
				var
					InformationView = __webpack_require__(/*! modules/CoreWebclient/js/views/InformationView.js */ "XmZn"),
					HeaderView = __webpack_require__(/*! modules/CoreWebclient/js/views/HeaderView.js */ "b3rV"),
					CHeaderItemView = __webpack_require__(/*! modules/CoreWebclient/js/views/CHeaderItemView.js */ "C5H3")
				;
				InformationView.ViewTemplate = 'CoreMobileWebclient_InformationView';
				HeaderView.ViewTemplate = 'CoreMobileWebclient_HeaderView';
				CHeaderItemView.prototype.ViewTemplate = 'CoreMobileWebclient_HeaderItemView';
				
				if (ModulesManager.isModuleAvailable('SettingsWebclient') && (App.isUserNormalOrTenant()))
				{
					var CommonSettingsFormView = __webpack_require__(/*! modules/CoreWebclient/js/views/CommonSettingsFormView.js */ "p1Rv");
					CommonSettingsFormView.ViewTemplate = 'CoreMobileWebclient_CommonSettingsFormView';
				}
			}
		};
	}
	
	return null;
};


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


/***/ })

}]);