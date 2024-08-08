"use strict";
(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[34],{

/***/ "ypQf":
/*!****************************************************!*\
  !*** ./modules/OfficeDocumentEditor/js/manager.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



module.exports = function (oAppData) {
	var
		_ = __webpack_require__(/*! underscore */ "C3HO"),
		$ = __webpack_require__(/*! jquery */ "M4cL"),

		TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
		Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),

		App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),

		CAbstractFileModel = __webpack_require__(/*! modules/CoreWebclient/js/models/CAbstractFileModel.js */ "17yT"),

		FilesActions = __webpack_require__(/*! modules/OfficeDocumentEditor/js/utils/FilesActions.js */ "2EIT")
	;

	if (App.isUserNormalOrTenant())
	{
		return {
			start: function (ModulesManager) {
				var aExtensionsToView = oAppData['OfficeDocumentEditor'] ? oAppData['OfficeDocumentEditor']['ExtensionsToView'] : [];
				aExtensionsToView = aExtensionsToView.map((item) => { return Types.pString(item).toLowerCase() });
				CAbstractFileModel.addViewExtensions(aExtensionsToView);

				App.subscribeEvent('FilesWebclient::ConstructView::after', function (oParams) {
					if (oParams.Name === 'CFilesView') {
						var oView = oParams.View;
						if (oView && _.isFunction(oView.registerCreateButtonsController))
						{
							var CAddFileButtonView = __webpack_require__(/*! modules/OfficeDocumentEditor/js/views/CAddFileButtonView.js */ "LP6e");
							oView.registerCreateButtonsController(new CAddFileButtonView(oView.storageType, oView.currentPath));
						}
					}
				});
				App.subscribeEvent('FilesWebclient::ParseFile::after', function (aParams) {
					var
						oFile = aParams[0],
						oRawData = aParams[1],
						sFileExtension = Types.pString(oFile.extension()).toLowerCase()
					;

					if (oFile.hasAction('view') && oFile.oActionsData['view'] && -1 !== $.inArray(sFileExtension, aExtensionsToView))
					{
						delete oFile.oActionsData['view'].HandlerName;
						oFile.oActionsData['view'].Handler = FilesActions.view.bind(oFile);
					}
					if (oFile.hasAction('convert')) {
						oFile.removeAction('convert');
						if (oFile.oActionsData['convert']) {
							oFile.actions.unshift('convert');
							oFile.oActionsData['convert'].Text = TextUtils.i18n('OFFICEDOCUMENTEDITOR/ACTION_EDIT_FILE');
							oFile.oActionsData['convert'].Handler = FilesActions.convert.bind(oFile);
						}
						if (oFile.hasAction('view'))
						{
							oFile.removeAction('view');
							oFile.actions.push('view');
						}
					}
					if (oFile.hasAction('edit'))
					{
						oFile.removeAction('edit');
						if (oFile.oActionsData['edit'])
						{
							oFile.actions.unshift('edit');
							oFile.oActionsData['edit'].Text = TextUtils.i18n('OFFICEDOCUMENTEDITOR/ACTION_EDIT_FILE');
							oFile.oActionsData['edit'].Handler = FilesActions.edit.bind(oFile);
						}
						if (oFile.hasAction('view'))
						{
							oFile.removeAction('view');
							oFile.actions.push('view');
						}
					}
				});
			}
		};
	}

	return null;
};


/***/ }),

/***/ "qIqR":
/*!****************************************************************!*\
  !*** ./modules/OfficeDocumentEditor/js/popups/ConvertPopup.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),

	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX")
;

/**
 * @constructor
 */
function CConvertPopup()
{
	CAbstractPopup.call(this);

	this.convertInProgress = ko.observable(false);

	this.fConvertCallback = null;
	this.fViewCallback = null;
}

_.extendOwn(CConvertPopup.prototype, CAbstractPopup.prototype);

CConvertPopup.prototype.PopupTemplate = 'OfficeDocumentEditor_ConvertPopup';

/**
 * @param {Function} fConvertCallback
 * @param {Function} fViewCallback
 */
CConvertPopup.prototype.onOpen = function (fConvertCallback, fViewCallback)
{
	this.convertInProgress(false);

	this.fConvertCallback = fConvertCallback;
	this.fViewCallback = fViewCallback;
};

CConvertPopup.prototype.convert = function ()
{
	if (_.isFunction(this.fConvertCallback))
	{
		this.convertInProgress(true);
		this.fConvertCallback(this.closePopup.bind(this), this.convertInProgress);
	}
};

CConvertPopup.prototype.view = function ()
{
	if (_.isFunction(this.fViewCallback))
	{
		this.fViewCallback();
	}

	this.closePopup();
};

CConvertPopup.prototype.cancelPopup = function ()
{
	this.closePopup();
};

module.exports = new CConvertPopup();


/***/ }),

/***/ "0Foh":
/*!***********************************************************************!*\
  !*** ./modules/OfficeDocumentEditor/js/popups/CreateDocumentPopup.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),

	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX")
;

/**
 * @constructor
 */
function CCreateDocumentPopup()
{
	CAbstractPopup.call(this);
	
	this.fCallback = null;
	this.filename = ko.observable('');
	this.filename.focus = ko.observable(false);
	this.filename.error = ko.observable('');
	this.sExtension = '';

	this.filename.subscribe(function () {
		this.filename.error('');
	}, this);
}

_.extendOwn(CCreateDocumentPopup.prototype, CAbstractPopup.prototype);

CCreateDocumentPopup.prototype.PopupTemplate = 'OfficeDocumentEditor_CreateDocumentPopup';

/**
 * @param {Function} fCallback
 */
CCreateDocumentPopup.prototype.onOpen = function (sBlankName, sExtension, fCallback)
{
	this.filename(sBlankName);
	this.filename.focus(true);
	this.filename.error('');
	this.sExtension = sExtension;
	this.fCallback = fCallback;
};

CCreateDocumentPopup.prototype.create = function ()
{
	this.filename.error('');

	if (_.isFunction(this.fCallback))
	{
		var sError = this.fCallback(this.filename(), this.sExtension);
		if (sError)
		{
			this.filename.error('' + sError);
		}
		else
		{
			this.closePopup();
		}
	}
	else
	{
		this.closePopup();
	}
};

module.exports = new CCreateDocumentPopup();


/***/ }),

/***/ "2EIT":
/*!***************************************************************!*\
  !*** ./modules/OfficeDocumentEditor/js/utils/FilesActions.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	moment = __webpack_require__(/*! moment */ "sdEb"),

	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	UrlUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Url.js */ "Tt1R"),

	Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
	WindowOpener = __webpack_require__(/*! modules/CoreWebclient/js/WindowOpener.js */ "mGms"),

	CFileModel = ModulesManager.run('FilesWebclient', 'getFileConstructor'),

	ConvertPopup = __webpack_require__(/*! modules/OfficeDocumentEditor/js/popups/ConvertPopup.js */ "qIqR"),

	oOpenedWindows = {},
	oSyncStartedMoments = {},
	iCheckWindowsInterval = 0,

	FilesActions = {}
;

function checkOpenedWindows()
{
	_.each(oOpenedWindows, function (oData, sFullPath) {
		var oWin = oData['Win'];
		if (oWin.closed)
		{
			oSyncStartedMoments[sFullPath] = moment();
			delete oOpenedWindows[sFullPath];
		}
	});
	if (_.isEmpty(oOpenedWindows))
	{
		clearInterval(iCheckWindowsInterval);
	}
}

function addOpenedWindow(oFile, oWin)
{
	var sFullPath = oFile.fullPath();
	oOpenedWindows[sFullPath] = {
		'Win': oWin,
		'File': oFile
	};
	clearInterval(iCheckWindowsInterval);
	iCheckWindowsInterval = setInterval(function () {
		checkOpenedWindows();
	}, 500);
}

FilesActions.view = function () {
	var
		oWin = null,
		sUrl = UrlUtils.getAppPath() + this.getActionUrl('view') + '/' + moment().unix()
	;
	if (Types.isNonEmptyString(sUrl) && sUrl !== '#')
	{
		oWin = WindowOpener.open(sUrl, sUrl, false);
		if (oWin)
		{
			oWin.focus();
		}
	}
};

FilesActions.edit = function () {
	if (oOpenedWindows[this.fullPath()] && !oOpenedWindows[this.fullPath()].Win.closed) {
		oOpenedWindows[this.fullPath()].Win.focus();
	} else {
		var
			oWin = null,
			sUrl = this.getActionUrl('edit')
		;
		if (Types.isNonEmptyString(sUrl) && sUrl !== '#') {
			if (sUrl === 'convert') {

			} else {
				sUrl = UrlUtils.getAppPath() + sUrl + '/' + moment().unix()
				oWin = WindowOpener.open(sUrl, sUrl, false);
				if (oWin) {
					addOpenedWindow(this, oWin)
					oWin.focus();
				}
			}
		}
	}
};

function convertFile (fClosePopup, koConvertInProgress) {
	Ajax.send('OfficeDocumentEditor', 'ConvertDocument', {
		'Type': this.storageType(),
		'Path': this.path(),
		'FileName': this.fileName()
	}, function (oResponse) {
		if (_.isFunction(koConvertInProgress))
		{
			koConvertInProgress(false);
		}
		if (oResponse && oResponse.Result)
		{
			var oFile = new CFileModel(oResponse.Result);
			ModulesManager.run('FilesWebclient', 'refresh');
			oFile.executeAction('edit');
			if (_.isFunction(fClosePopup))
			{
				fClosePopup();
			}
		}
		else
		{
			Api.showErrorByCode(oResponse);
		}
	}, this);
};

FilesActions.convert = function () {
	Popups.showPopup(ConvertPopup, [convertFile.bind(this), FilesActions.view.bind(this)]);
};

module.exports = FilesActions;


/***/ }),

/***/ "LP6e":
/*!*********************************************************************!*\
  !*** ./modules/OfficeDocumentEditor/js/views/CAddFileButtonView.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "M4cL");


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),

	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),

	Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),

	CFileModel = ModulesManager.run('FilesWebclient', 'getFileConstructor'),

	CreateDocumentPopup = __webpack_require__(/*! modules/OfficeDocumentEditor/js/popups/CreateDocumentPopup.js */ "0Foh")
;

/**
 * @constructor
 */
function CAddFileButtonView(koStorageType, koCurrentPath)
{
	this.storageType = _.isFunction(koStorageType) ? koStorageType : ko.observable('');
	this.currentPath = _.isFunction(koCurrentPath) ? koCurrentPath : ko.observable('');

	this.allowCreateItems = ko.computed(function () {
		return	this.storageType() !== Enums.FileStorageType.Encrypted && this.storageType() !== Enums.FileStorageType.Shared;
	}, this);
	this.createDocumentCommand = Utils.createCommand(this, this.createDocument, this.allowCreateItems);
	this.createSpreadSheetCommand = Utils.createCommand(this, this.createSpreadSheet, this.allowCreateItems);
	this.createPresentationCommand = Utils.createCommand(this, this.createPresentation, this.allowCreateItems);
}

CAddFileButtonView.prototype.ViewTemplate = 'OfficeDocumentEditor_AddFileButtonView';

CAddFileButtonView.prototype.createDocument = function ()
{
	Popups.showPopup(CreateDocumentPopup,
		[TextUtils.i18n('OFFICEDOCUMENTEDITOR/LABEL_BLANK_DOCUMENT_NAME'), 'docx', this.createDocumentWithName.bind(this)]);
};

CAddFileButtonView.prototype.createDocumentWithName = function (sBlankName, sExtension)
{
	sBlankName = $.trim(sBlankName);
	if (!Utils.validateFileOrFolderName(sBlankName))
	{
		return TextUtils.i18n('FILESWEBCLIENT/ERROR_INVALID_FILE_NAME');
	}
	else
	{
		Ajax.send('OfficeDocumentEditor', 'CreateBlankDocument', {
			'Type': this.storageType(),
			'Path': this.currentPath(),
			'FileName': sBlankName + '.' + sExtension
		}, this.onCreateBlankDocumentResponse, this);
	}

	return '';
};

CAddFileButtonView.prototype.onCreateBlankDocumentResponse = function (oResponse)
{
	if (oResponse && oResponse.Result)
	{
		var
			oFile = new CFileModel(oResponse.Result)
		;
		if (oFile.path() === this.currentPath() && oFile.storageType() === this.storageType())
		{
			ModulesManager.run('FilesWebclient', 'addFileToCurrentFolder', [oFile]);
		}
		ModulesManager.run('FilesWebclient', 'refresh');
		oFile.executeAction('edit');
	}
	else
	{
		Api.showErrorByCode(oResponse);
	}
};

CAddFileButtonView.prototype.createSpreadSheet = function ()
{
	Popups.showPopup(CreateDocumentPopup,
		[TextUtils.i18n('OFFICEDOCUMENTEDITOR/LABEL_BLANK_SPREADSHEET_NAME'), 'xlsx', this.createDocumentWithName.bind(this)]);
};

CAddFileButtonView.prototype.createPresentation = function ()
{
	Popups.showPopup(CreateDocumentPopup,
		[TextUtils.i18n('OFFICEDOCUMENTEDITOR/LABEL_BLANK_PRESENTATION_NAME'), 'pptx', this.createDocumentWithName.bind(this)]);
};

module.exports = CAddFileButtonView;


/***/ })

}]);