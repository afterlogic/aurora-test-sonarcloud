(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[64],{

/***/ "K4vF":
/*!***********************************************************!*\
  !*** ./modules/CoreWebclient/js/popups/EmbedHtmlPopup.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX")
;

/**
 * @constructor
 */
function CEmbedHtmlPopup()
{
	CAbstractPopup.call(this);
	
	this.htmlEmbed = ko.observable('');
}

_.extendOwn(CEmbedHtmlPopup.prototype, CAbstractPopup.prototype);

CEmbedHtmlPopup.prototype.PopupTemplate = 'CoreWebclient_EmbedHtmlPopup';

CEmbedHtmlPopup.prototype.onOpen = function (sHtmlEmbed)
{
	this.htmlEmbed(sHtmlEmbed);
};

CEmbedHtmlPopup.prototype.close = function ()
{
	this.closePopup();
	this.htmlEmbed('');
};

module.exports = new CEmbedHtmlPopup();

/***/ }),

/***/ "CsgX":
/*!********************************************************!*\
  !*** ./modules/FilesWebclient/js/models/CFileModel.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	moment = __webpack_require__(/*! moment */ "sdEb"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
	
	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	WindowOpener = __webpack_require__(/*! modules/CoreWebclient/js/WindowOpener.js */ "mGms"),
	
	CAbstractFileModel = __webpack_require__(/*! modules/CoreWebclient/js/models/CAbstractFileModel.js */ "17yT"),
	CDateModel = __webpack_require__(/*! modules/CoreWebclient/js/models/CDateModel.js */ "jNBr"),
	
	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
	EmbedHtmlPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/EmbedHtmlPopup.js */ "K4vF"),

	ExtendedPropsPrototype = __webpack_require__(/*! modules/FilesWebclient/js/models/ExtendedPropsPrototype.js */ "FyTm"),

	Enums = window.Enums
;

/**
 * @constructor
 * @param {Object} oData
 * @param {bool} oParent
 * @extends CAbstractFileModel
 */
function CFileModel(oData, oParent)
{
	this.oParent = Types.pObject(oParent);
	// the constant is used instead of constructor.name because constructor.name can not be used in minified JS
	this.IS_FILE = true;
	
	this.storageType = ko.observable(Types.pString(oData.Type));
	this.sLastModified = CFileModel.parseLastModified(oData.LastModified);
	this.iLastModified = Types.pInt(oData.LastModified);

	this.path = ko.observable(Types.pString(oData.Path));
	this.fullPath = ko.observable(Types.pString(oData.FullPath));
	
	this.selected = ko.observable(false);
	this.checked = ko.observable(false);
	
	this.bIsLink = !!oData.IsLink;
	this.sLinkType = this.bIsLink ? Types.pString(oData.LinkType) : '';
	this.sLinkUrl = this.bIsLink ? Types.pString(oData.LinkUrl) : '';
	this.sThumbnailExternalLink = this.bIsLink ? Types.pString(oData.ThumbnailUrl) : '';

	this.deleted = ko.observable(false); // temporary removal until it was confirmed from the server
	this.recivedAnim = ko.observable(false).extend({'autoResetToFalse': 500});
	this.published = ko.observable(false);
	this.sOwnerName = Types.pString(oData.Owner);
	this.sInitiator = Types.pString(oData.Initiator, this.sOwnerName);

	CAbstractFileModel.call(this);

	this.oExtendedProps = Types.pObject(oData.ExtendedProps);
	this.sharedWithMeAccessReshare = ko.observable(false);
	this.sharedWithMeAccessWrite = ko.observable(false);
	this.sharedWithMe = ko.observable(false);
	this.sharedWithOthers = ko.observable(false); // can be changed by other modules
	this.parseExtendedProps();

	this.displayName = ko.computed(function () {
		if (this.storageType() === Enums.FileStorageType.Shared && !!this.oParent.sharedParentFolder && !this.oParent.sharedParentFolder()) {
			return this.fullPath().replace(/^\//, '');
		}
		return this.fileName();
	}, this);
	
	this.content = ko.observable('');
	
	this.thumbUrlInQueueSubscribtion.dispose();
	this.thumbUrlInQueue.subscribe(function () {
		if (this.sThumbnailExternalLink !== '')
		{
			this.thumbnailSrc(this.sThumbnailExternalLink);
		}
		else if (!this.bIsLink)
		{
			this.getInThumbQueue();
		}
	}, this);
	
	this.visibleCancelButton = ko.computed(function () {
		return this.visibleProgress() && this.progressPercent() !== 100;
	}, this);

	this.progressText = ko.computed(function () {
		return TextUtils.i18n('COREWEBCLIENT/LABEL_UPLOADING_PERCENT', {
			'PERCENT': this.progressPercent()
		});
	}, this);

	this.oActionsData['list'] = {
		'Text': TextUtils.i18n('COREWEBCLIENT/ACTION_VIEW_FILE'),
		'Handler': _.bind(function () { App.broadcastEvent('Files::ShowList', {'Item': this}); }, this)
	};
	this.oActionsData['open'] = {
		'Text': TextUtils.i18n('COREWEBCLIENT/ACTION_OPEN_LINK'),
		'Handler': _.bind(this.openLink, this)
	};

	this.iconAction('');
	
	this.sHeaderText = _.bind(function () {
		if (this.sharedWithMe() && this.sInitiator) {
			return TextUtils.i18n('FILESWEBCLIENT/INFO_SHARED_BY', {
				'OWNER': this.sInitiator
			});
		} else if (this.sLastModified) {
			var sLangConstName = this.sOwnerName !== '' ? 'FILESWEBCLIENT/INFO_OWNER_AND_DATA' : 'FILESWEBCLIENT/INFO_DATA';
			return TextUtils.i18n(sLangConstName, {
				'OWNER': this.sOwnerName,
				'LASTMODIFIED': this.sLastModified
			});
		}
		return '';
	}, this)();
	
	this.type = this.storageType;

	this.canShare = ko.computed(function () {
		return (this.storageType() === Enums.FileStorageType.Personal || this.storageType() === Enums.FileStorageType.Corporate);
	}, this);
	
	this.sHtmlEmbed = Types.pString(oData.OembedHtml);
	
	this.commonParseActions(oData);
	
	this.cssClasses = ko.computed(function () {
		var aClasses = this.getCommonClasses();
		
		if (this.allowDrag())
		{
			aClasses.push('dragHandle');
		}
		if (this.selected())
		{
			aClasses.push('selected');
		}
		if (this.checked())
		{
			aClasses.push('checked');
		}
		if (this.deleted())
		{
			aClasses.push('deleted');
		}
		if (this.allowPublicLink() && this.published())
		{
			aClasses.push('published');
		}
		if (this.bIsLink)
		{
			aClasses.push('aslink');
		}

		return aClasses.join(' ');
	}, this);
	
	this.parse(oData, !!this.oParent.bInPopup);
}

_.extendOwn(CFileModel.prototype, CAbstractFileModel.prototype);
_.extendOwn(CFileModel.prototype, ExtendedPropsPrototype);

/**
 * Parses date of last file modification.
 * @param {number} iLastModified Date in unix fomat
 * @returns {String}
 */
CFileModel.parseLastModified = function (iLastModified)
{
	var oDateModel = new CDateModel();
	if (iLastModified)
	{
		oDateModel.parse(iLastModified);
		return oDateModel.getShortDate();
	}
	return '';
};

/**
 * Prepares data of link for its further parsing.
 * @param {Object} oData Data received from the server after URL checking.
 * @param {string} sLinkUrl Link URL.
 * @returns {Object}
 */
CFileModel.prepareLinkData = function (oData, sLinkUrl)
{
	return {
		IsLink: true,
		LinkType: oData.LinkType,
		LinkUrl: sLinkUrl,
		Name: oData.Name,
		Size: oData.Size,
		ThumbnailUrl: oData.Thumb
	};
};

/**
 * Parses data from server.
 * @param {object} oData
 * @param {boolean} bPopup
 */
CFileModel.prototype.parse = function (oData, bPopup)
{
	this.uploaded(true);
	this.allowDrag(!bPopup && !App.isPublic());
	this.allowUpload(true);
	this.allowPublicLink(true);
	this.allowActions(!bPopup && this.fullPath() !== '');
		
	this.fileName(Types.pString(oData.Name));
	this.content(Types.pString(oData.Content));
	this.id(Types.pString(oData.Id));
	this.published(!!oData.Published);

	this.size(Types.pInt(oData.Size));
	this.hash(Types.pString(oData.Hash));
	
	this.thumbUrlInQueue(Types.pString(oData.ThumbnailUrl) !== '' ? Types.pString(oData.ThumbnailUrl) + '/' + Math.random() : '');
	
	this.mimeType(Types.pString(oData.ContentType));

	this.bHasHtmlEmbed = !bPopup && this.fullPath() !== '' && this.sLinkType === 'oembeded';
	if (this.bHasHtmlEmbed)
	{
		this.iconAction('view');
	}
	if (!this.isViewSupported() && !this.bHasHtmlEmbed)
	{
		this.actions(_.without(this.actions(), 'view'));
	}

	App.broadcastEvent('FilesWebclient::ParseFile::after', [this, oData]);
};

/**
 * Prepares data of upload file for its further parsing.
 * @param {Object} oFileData
 * @param {string} sPath
 * @param {string} sStorageType
 * @param {Function} fGetFileByName
 * @returns {Object}
 */
CFileModel.prepareUploadFileData = function (oFileData, sPath, sStorageType, fGetFileByName)
{
	var
		sFileName = oFileData.FileName,
		sFileNameExt = Utils.getFileExtension(sFileName),
		sFileNameWoExt = Utils.getFileNameWithoutExtension(sFileName),
		iIndex = 0
	;
	
	if (sFileNameExt !== '')
	{
		sFileNameExt = '.' + sFileNameExt;
	}
	
	while (fGetFileByName(sFileName))
	{
		sFileName = sFileNameWoExt + ' (' + iIndex + ')' + sFileNameExt;
		iIndex++;
	}
	
	oFileData.FileName = sFileName;
	
	return {
		Name: sFileName,
		LastModified: moment().unix(),
		Owner: App.getUserPublicId(),
		Path: sPath,
		FullPath: sPath + '/' + sFileName,
		Type: sStorageType,
		ContentType: oFileData.Type,
		Size: oFileData.Size
	};
};

/**
 * Opens file viewing via post to iframe.
 * @param {Object} oFileModel
 * @param {Object} oEvent
 */
CFileModel.prototype.viewFile = function (oFileModel, oEvent)
{
	if (!oEvent || !oEvent.ctrlKey && !oEvent.shiftKey)
	{
		if (this.sHtmlEmbed !== '')
		{
			Popups.showPopup(EmbedHtmlPopup, [this.sHtmlEmbed]);
		}
		else if (this.bIsLink)
		{
			this.viewCommonFile(this.sLinkUrl);
		}
		else
		{
			this.viewCommonFile();
		}
	}
};

/**
 * Opens link URL in the new tab.
 */
CFileModel.prototype.openLink = function ()
{
	if (this.bIsLink)
	{
		WindowOpener.openTab(this.sLinkUrl);
	}
};

CFileModel.prototype.commonParseActions = function (oData)
{
	_.each (oData.Actions, function (oData, sAction) {
		if (!this.oActionsData[sAction])
		{
			this.oActionsData[sAction] = {};
		}
		var sHash = '';
		if (sAction === 'download' || sAction === 'view')
		{
			sHash = '&' + Utils.getRandomHash();
		}
		this.oActionsData[sAction].Url = Types.pString(oData.url) + sHash;
		this.actions.push(sAction);
	}, this);
};

module.exports = CFileModel;


/***/ }),

/***/ "FyTm":
/*!********************************************************************!*\
  !*** ./modules/FilesWebclient/js/models/ExtendedPropsPrototype.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L");

const ExtendedPropsPrototype = {
	updateExtendedProps: function (data = {})
	{
		if (!this.oExtendedProps) {
			this.oExtendedProps = {};
		}
		for (const key in data) {
			this.oExtendedProps[key] = data[key];
		}
		this.parseExtendedProps();
	},

	parseExtendedProps: function ()
	{
		const
			sharedWithMeAccess = this.oExtendedProps.SharedWithMeAccess,
			shares = Types.pArray(this.oExtendedProps.Shares)
		;
		this.sharedWithMeAccessReshare(sharedWithMeAccess === Enums.SharedFileAccess.Reshare);
		this.sharedWithMeAccessWrite(this.sharedWithMeAccessReshare() || sharedWithMeAccess === Enums.SharedFileAccess.Write);
		this.sharedWithMe(this.sharedWithMeAccessWrite() || sharedWithMeAccess === Enums.SharedFileAccess.Read);
		this.sharedWithOthers(shares.length > 0);
	}
};

module.exports = ExtendedPropsPrototype;


/***/ })

}]);