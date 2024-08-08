(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[13],{

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

/***/ "C+Tx":
/*!********************************************!*\
  !*** ./modules/FilesWebclient/js/enums.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	Enums = {}
;

/**
 * @enum {number}
 */
Enums.FileStorageType = {
	'Personal': 'personal',
	'Corporate': 'corporate',
	'Shared': 'shared',
	'GoogleDrive': 'google',
	'Dropbox': 'dropbox',
	'Encrypted': 'encrypted'
};

/**
 * @enum {number}
 */
Enums.FileStorageLinkType = {
	'Unknown': 0,
	'GoogleDrive': 1,
	'Dropbox': 2,
	'YouTube': 3,
	'Vimeo': 4,
	'SoundCloud': 5
};

/**
 * @enum {number}
 */
Enums.SharedFileAccess = {
	'NoAccess': 0,
	'Write': 1,
	'Read': 2,
	'Reshare': 3
};

/**
 * @enum {number}
 */
Enums.FilesSortField = {
	'Filename': 0,
	'Size': 1,
	'Modified': 2
};


if (typeof window.Enums === 'undefined')
{
	window.Enums = {};
}

_.extendOwn(window.Enums, Enums);

/***/ }),

/***/ "Gf7l":
/*!**********************************************!*\
  !*** ./modules/FilesWebclient/js/manager.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = function (oAppData) {
	__webpack_require__(/*! modules/FilesWebclient/js/enums.js */ "C+Tx");

	var
		App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
		ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),

		TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),

		Settings = __webpack_require__(/*! modules/FilesWebclient/js/Settings.js */ "U1j7"),

		HeaderItemView = null,
		
		aToolbarButtons = [],
		oFilesView = null
	;
	
	Settings.init(oAppData);

	if (!ModulesManager.isModuleAvailable(Settings.ServerModuleName) || !App.isPublic() && Settings.Storages.length === 0)
	{
		return null;
	}
	
	if (App.isPublic())
	{
		return {
			getScreens: function () {
				var oScreens = {};
				oScreens[Settings.HashModuleName] = function () {
					var CFilesView = __webpack_require__(/*! modules/FilesWebclient/js/views/CFilesView.js */ "hkZk");
					return new CFilesView();
				};
				return oScreens;
			}
		};
	}
	else if (App.isUserNormalOrTenant())
	{
		if (App.isNewTab())
		{
			return {
				getSelectFilesPopup: function () {
					return __webpack_require__(/*! modules/FilesWebclient/js/popups/SelectFilesPopup.js */ "GoCd");
				}
			};
		}
		else
		{
			return {
				start: function (ModulesManager) {
					if (Settings.ShowCommonSettings || Settings.ShowFilesApps)
					{
						ModulesManager.run('SettingsWebclient', 'registerSettingsTab', [
							function () { return __webpack_require__(/*! modules/FilesWebclient/js/views/FilesSettingsFormView.js */ "s57n"); },
							Settings.HashModuleName,
							TextUtils.i18n('FILESWEBCLIENT/LABEL_SETTINGS_TAB')
						]);
					}
				},
				getScreens: function () {
					var oScreens = {};
					oScreens[Settings.HashModuleName] = function () {
						var CFilesView = __webpack_require__(/*! modules/FilesWebclient/js/views/CFilesView.js */ "hkZk");
						oFilesView = new CFilesView();
						oFilesView.registerToolbarButtons(aToolbarButtons);
						aToolbarButtons = [];
						return oFilesView;
					};
					return oScreens;
				},
				getHeaderItem: function () {
					if (HeaderItemView === null)
					{
						var
							CHeaderItemView = __webpack_require__(/*! modules/CoreWebclient/js/views/CHeaderItemView.js */ "C5H3"),
							sTabTitle = Settings.CustomTabTitle !== '' ? Settings.CustomTabTitle : TextUtils.i18n('FILESWEBCLIENT/ACTION_SHOW_FILES')
						;

						HeaderItemView = new CHeaderItemView(sTabTitle);
					}

					return {
						item: HeaderItemView,
						name: Settings.HashModuleName
					};
				},
				getSelectFilesPopup: function () {
					return __webpack_require__(/*! modules/FilesWebclient/js/popups/SelectFilesPopup.js */ "GoCd");
				},
				getMobileSyncSettingsView: function () {
					return __webpack_require__(/*! modules/FilesWebclient/js/views/MobileSyncSettingsView.js */ "SP8f");
				},
				getFileConstructor: function (oFile) {
					return __webpack_require__(/*! modules/FilesWebclient/js/models/CFileModel.js */ "CsgX");
				},
				addFileToCurrentFolder: function (oFile) {
					if (oFilesView)
					{
						oFilesView.addFileToCurrentFolder(oFile);
					}
				},
				refresh: function () {
					if (oFilesView)
					{
						oFilesView.refresh();
					}
				},
				registerToolbarButtons: function (oToolbarButtons) {
					if (oFilesView)
					{
						oFilesView.registerToolbarButtons([oToolbarButtons]);
					}
					else
					{
						aToolbarButtons.push(oToolbarButtons);
					}
				}
			};
		}
	}
	
	return null;
};


/***/ }),

/***/ "GoCd":
/*!**************************************************************!*\
  !*** ./modules/FilesWebclient/js/popups/SelectFilesPopup.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const
	_ = __webpack_require__(/*! underscore */ "C3HO"),

	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),

	CFilesView = __webpack_require__(/*! modules/FilesWebclient/js/views/CFilesView.js */ "hkZk")
;

/**
 * @constructor
 */
function CSelectFilesPopup()
{
	CAbstractPopup.call(this);

	this.callbackHandler = () => {};

	this.filesView = new CFilesView(true);
	this.filesView.onSelectClickPopupBound = _.bind(this.selectFiles, this);
}

_.extendOwn(CSelectFilesPopup.prototype, CAbstractPopup.prototype);

CSelectFilesPopup.prototype.PopupTemplate = 'FilesWebclient_SelectFilesPopup';

/**
 * @param {Function} callbackHandler
 */
CSelectFilesPopup.prototype.onOpen = function (callbackHandler)
{
	this.callbackHandler = _.isFunction(callbackHandler) ? callbackHandler : () => {};

	this.filesView.onShow();
};

CSelectFilesPopup.prototype.onBind = function ()
{
	this.filesView.onBind(this.$popupDom);
};

CSelectFilesPopup.prototype.selectFiles = function ()
{
	const
		selectedItems = this.filesView.selector.listCheckedAndSelected(),
		selectedFiles = selectedItems.filter(item => item.IS_FILE)
	;
	this.callbackHandler(selectedFiles);
	this.closePopup();
};

module.exports = new CSelectFilesPopup();


/***/ }),

/***/ "s57n":
/*!******************************************************************!*\
  !*** ./modules/FilesWebclient/js/views/FilesSettingsFormView.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	UrlUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Url.js */ "Tt1R"),
	CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),
	
	Settings = __webpack_require__(/*! modules/FilesWebclient/js/Settings.js */ "U1j7")
;

/**
 * @constructor
 */
function CFilesSettingsFormView()
{
	CAbstractSettingsFormView.call(this, 'FilesWebclient');

	this.bShowFilesApps = Settings.ShowFilesApps;

	this.sAppPath = UrlUtils.getAppPath();
}

_.extendOwn(CFilesSettingsFormView.prototype, CAbstractSettingsFormView.prototype);

CFilesSettingsFormView.prototype.ViewTemplate = 'FilesWebclient_FilesSettingsFormView';

module.exports = new CFilesSettingsFormView();


/***/ }),

/***/ "SP8f":
/*!*******************************************************************!*\
  !*** ./modules/FilesWebclient/js/views/MobileSyncSettingsView.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV")
;

/**
 * @constructor
 */
function CMobileSyncSettingsView()
{
	this.davServer = ko.observable('');
	this.credentialsHintText = App.mobileCredentialsHintText;
	this.bDemo = UserSettings.IsDemo;
}

CMobileSyncSettingsView.prototype.ViewTemplate = 'FilesWebclient_MobileSyncSettingsView';

/**
 * @param {Object} oDav
 */
CMobileSyncSettingsView.prototype.populate = function (oDav)
{
	this.davServer(oDav.Server);
};

module.exports = new CMobileSyncSettingsView();


/***/ })

}]);