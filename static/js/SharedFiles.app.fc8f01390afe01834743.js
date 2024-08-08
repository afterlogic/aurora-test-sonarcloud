"use strict";
(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[45],{

/***/ "r0YQ":
/*!*******************************************!*\
  !*** ./modules/SharedFiles/js/manager.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



module.exports = function (appData) {
	const
		App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
		ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd")
	;

	if (ModulesManager.isModuleAvailable('FilesWebclient') && App.isUserNormalOrTenant()) {
		return {
			start: function (ModulesManager) {
				const buttonsView = __webpack_require__(/*! modules/SharedFiles/js/views/ButtonsView.js */ "O57n");
				ModulesManager.run('FilesWebclient', 'registerToolbarButtons', [buttonsView]);
			},

			getFilesSharePopup: function () {
				return __webpack_require__(/*! modules/SharedFiles/js/popups/FilesSharePopup.js */ "NCqZ");
			}
		};
	}

	return null;
};


/***/ }),

/***/ "h/zN":
/*!******************************************************!*\
  !*** ./modules/SharedFiles/js/models/CShareModel.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	ko = __webpack_require__(/*! knockout */ "p09A"),

	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L")
;

/**
 * @constructor
 * @param {object} oData
 */
function CShareModel(oData)
{
	this.publicId = Types.pString(oData.PublicId);
	this.groupId = Types.pInt(oData.GroupId);
	this.isAllUsersGroup = Types.pBool(oData.IsAll);
	this.isNew = Types.pBool(oData.New);
	this.contactUUID = Types.pString(oData.ContactUUID);

	this.access = ko.observable(Types.pInt(oData.Access));
	this.accessText = ko.computed(function () {
		switch (this.access()) {
			case Enums.SharedFileAccess.Reshare: return TextUtils.i18n('SHAREDFILES/LABEL_RESHARE_ACCESS');
			case Enums.SharedFileAccess.Write: return TextUtils.i18n('SHAREDFILES/LABEL_WRITE_ACCESS');
			case Enums.SharedFileAccess.Read: return TextUtils.i18n('SHAREDFILES/LABEL_READ_ACCESS');
			default: return TextUtils.i18n('SHAREDFILES/LABEL_NOSHARE_ACCESS');
		}
	}, this);
}

module.exports = CShareModel;


/***/ }),

/***/ "NCqZ":
/*!**********************************************************!*\
  !*** ./modules/SharedFiles/js/popups/FilesSharePopup.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "M4cL");


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),

	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),

	Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
	AlertPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/AlertPopup.js */ "hT1I"),
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
	ConfirmPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/ConfirmPopup.js */ "XeMN"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),

	CShareModel = __webpack_require__(/*! modules/SharedFiles/js/models/CShareModel.js */ "h/zN"),

	ShowHistoryPopup = ModulesManager.run('ActivityHistory', 'getShowHistoryPopup')
;

/**
 * @constructor
 */
function CFilesSharePopup()
{
	CAbstractPopup.call(this);

	this.fileItem = null;
	this.isFileEncrypted = false;
	this.hintText = ko.observable('');
	this.accessList = ko.computed(function () {
		return [
			{ value: Enums.SharedFileAccess.Read, label: TextUtils.i18n('SHAREDFILES/LABEL_READ_ACCESS') },
			{ value: Enums.SharedFileAccess.Write, label: TextUtils.i18n('SHAREDFILES/LABEL_WRITE_ACCESS') },
			{ value: Enums.SharedFileAccess.Reshare, label: TextUtils.i18n('SHAREDFILES/LABEL_RESHARE_ACCESS') },
			{ value: Enums.SharedFileAccess.NoAccess, label: TextUtils.i18n('SHAREDFILES/LABEL_NOSHARE_ACCESS') }
		];
	}, this);

	this.shares = ko.observableArray([]);
	this.sharesScrollAreaDom = ko.observable(null);

	this.selectedTeammateDom = ko.observable(null);
	this.selectedTeammateDom.subscribe(function () {
		this.selectedTeammateDom().on('click', function() {
			if (this.selectedTeammateEmail() !== '') {
				if (!$(this.selectedTeammateDom().autocomplete('widget')).is(':visible')) {
					this.selectedTeammateDom().autocomplete('search');
				}
			}
		}.bind(this));
	}, this);
	this.selectedTeammateEmail = ko.observable('');
	this.selectedTeammateData = ko.observable(null);
	this.selectedTeammateData.subscribe(function () {
		if (this.selectedTeammateData()) {
			this.selectedTeammateEmail(this.selectedTeammateData().email);
		}
	}, this);

	this.selectAccessDom = ko.observable(null);
	this.lastRecievedSuggestList = [];

	this.isSaving = ko.observable(false);
	this.loadingFileShares = ko.observable(false);

	this.bAllowShowHistory = !!ShowHistoryPopup;
}

_.extendOwn(CFilesSharePopup.prototype, CAbstractPopup.prototype);

CFilesSharePopup.prototype.PopupTemplate = 'SharedFiles_FilesSharePopup';

/**
 * @param {object} fileItem
 * @param {function} expungeFileItems
 */
CFilesSharePopup.prototype.onOpen = function (fileItem = null, expungeFileItems = null)
{
	if (fileItem === null) {
		this.closePopup();
		return;
	}

	this.fileItem = fileItem;
	const extendedProps = fileItem && fileItem.oExtendedProps;
	this.isFileEncrypted = !!(fileItem.oExtendedProps && fileItem.oExtendedProps.InitializationVector);
	this.expungeFileItems = expungeFileItems;

	this.hintText('');
	this.selectedTeammateEmail('');
	this.selectedTeammateData(null);

	App.broadcastEvent(
		'SharedFiles::OpenFilesSharePopup',
		{
			'DialogHintText': this.hintText,
			'IsDir': !fileItem.IS_FILE
		}
	);

	this.fillUpShares();
	this.requestFileShares(function (sharedWithMeAccess, shares) {
		this.updateFileShares(sharedWithMeAccess, shares);
		this.fillUpShares();
	}.bind(this));
};

CFilesSharePopup.prototype.fillUpShares = function ()
{
	const
		extendedProps = this.fileItem && this.fileItem.oExtendedProps,
		sharesData = Types.pArray(extendedProps && extendedProps.Shares)
	;
	this.shares(_.map(sharesData, function (shareData) {
		return new CShareModel(shareData);
	}));
};

CFilesSharePopup.prototype.requestFileShares = function (callback)
{
	const fileItem = this.fileItem;
	const parameters = {
		'Type': fileItem.storageType(),
		'Path': fileItem.path(),
		'Name': fileItem.fileName()
	};
	this.loadingFileShares(true);
	Ajax.send(
		'Files',
		'GetExtendedProps',
		parameters,
		function (response, request) {
			this.loadingFileShares(false);
			if (response && response.Result && response.Result.Shares) {
				const sharedWithMeAccess = Types.pEnum(response.Result.SharedWithMeAccess,
						Enums.SharedFileAccess, Enums.SharedFileAccess.NoAccess);
				callback(sharedWithMeAccess, response.Result.Shares);
			} else {
				callback(Enums.SharedFileAccess.NoAccess, []);
			}
		}.bind(this)
	);
};

CFilesSharePopup.prototype.updateFileShares = function (newSharedWithMeAccess, newShares)
{
	if (!this.fileItem) {
		return;
	}

	//Update shares list in oFile object
	const
		extendedProps = this.fileItem.oExtendedProps,
		oldSharedWithMeAccess = Types.pInt(extendedProps && extendedProps.SharedWithMeAccess)
	;
	if (oldSharedWithMeAccess !== newSharedWithMeAccess) {
		if (this.fileItem.sharedWithMe() && newSharedWithMeAccess === Enums.SharedFileAccess.NoAccess) {
			this.fileItem.deleted(true);
			if (_.isFunction(this.expungeFileItems)) {
				this.expungeFileItems();
			}
			this.closePopup();
			return;
		}
	}
	this.fileItem.updateExtendedProps({
		'SharedWithMeAccess': newSharedWithMeAccess,
		'Shares': Types.pArray(newShares)
	});
	if (this.fileItem.sharedWithMe() && !this.fileItem.sharedWithMeAccessReshare()) {
		this.closePopup();
	}
};

CFilesSharePopup.prototype.getCurrentShares = function ()
{
	return _.map(this.shares(), function (share) {
		const access = share.access();
		if (share.groupId) {
			return {
				PublicId: share.publicId,
				Access: access,
				IsAll: share.isAllUsersGroup,
				IsGroup: true,
				GroupId: share.groupId
			};
		} else {
			const state = {
				PublicId: share.publicId,
				Access: access
			};
			if (this.isFileEncrypted && share.isNew) {
				state.New = true;
				state.ContactUUID = share.contactUUID;
			}
			return state;
		}
	}, this);
};

CFilesSharePopup.prototype.hasChanges = function ()
{
	var
		fileItem = this.fileItem,
		savedShares = Types.pArray(fileItem && fileItem.oExtendedProps && fileItem.oExtendedProps.Shares),
		currentShares = this.getCurrentShares()
	;
	savedShares = _.sortBy(savedShares, 'PublicId');
	currentShares = _.sortBy(currentShares, 'PublicId');
	return fileItem && (!_.isEqual(savedShares, currentShares) || this.selectedTeammateEmail());
};

CFilesSharePopup.prototype.onEscHandler = function ()
{
	this.cancelPopup();
};

CFilesSharePopup.prototype.cancelPopup = function ()
{
	if (this.isSaving()) {
		return;
	}

	if (this.hasChanges()) {
		Popups.showPopup(ConfirmPopup, [TextUtils.i18n('COREWEBCLIENT/CONFIRM_DISCARD_CHANGES'), function (discardConfirmed) {
			if (discardConfirmed) {
				this.closePopup();
			}
		}.bind(this)]);
	} else {
		this.closePopup();
	}
};

CFilesSharePopup.prototype.autocompleteCallback = function (request, response)
{
	const fileItem = this.fileItem;
	if (!this.fileItem) {
		fResponse([]);
		return;
	}

	const
		suggestParameters = {
			storage: 'team',
			addContactGroups: false,
			addUserGroups: !this.isFileEncrypted,
			exceptEmail: this.fileItem.sOwnerName
		},
		autocompleteCallback = ModulesManager.run(
			'ContactsWebclient', 'getSuggestionsAutocompleteCallback', [suggestParameters]
		),
		markRecipientsWithKeyCallback = function (recipientList) {
			const ownerLowerCase = fileItem.sOwnerName.toLowerCase();
			let filteredList = this.isFileEncrypted
				? recipientList.filter(suggestion => suggestion.hasKey)
				: recipientList;
			filteredList = filteredList.filter(suggestion => {
				const emailLowerCase = suggestion.email.toLowerCase();
				return ownerLowerCase !== emailLowerCase &&
						!this.shares().find(share => share.publicId.toLowerCase() === emailLowerCase);
			});
			this.lastRecievedSuggestList = filteredList;

			if (filteredList.length > 0) {
				response(filteredList);
			} else {
				const langConst = this.isFileEncrypted
					? 'INFO_NO_SUGGESTED_CONTACTS_WITH_PGPKEY'
					: 'INFO_NO_SUGGESTED_CONTACTS';
				response([{label: TextUtils.i18n(`SHAREDFILES/${langConst}`), disabled: true}]);
			}
		}.bind(this)
	;
	if (_.isFunction(autocompleteCallback)) {
		this.selectedTeammateData(null);
		autocompleteCallback(request, markRecipientsWithKeyCallback);
	}
};

CFilesSharePopup.prototype.selectAccess = function (hasExpandClass, control)
{
	var hasExpandClass = this.selectAccessDom().hasClass('expand');
	if (hasExpandClass) {
		this.selectAccessDom().removeClass('expand');
	} else {
		if (this.selectedTeammateData() === null) {
			var
				enteredTeammate = this.selectedTeammateEmail(),
				enteredTeammateLower = enteredTeammate.toLowerCase()
			;
			if (enteredTeammate === '') {
				var
					alertText = TextUtils.i18n('SHAREDFILES/WARNING_SELECT_TEAMMATE'),
					alertCallback = function () {
						this.selectedTeammateDom().focus();
						this.selectedTeammateDom().autocomplete('option', 'minLength', 0); //for triggering search on empty field
						this.selectedTeammateDom().autocomplete('search');
						this.selectedTeammateDom().autocomplete('option', 'minLength', 1);
					}.bind(this)
				;
				Popups.showPopup(AlertPopup, [alertText, alertCallback]);
			} else {
				var teammateData = _.find(this.lastRecievedSuggestList, function (data) {
					return data.value.toLowerCase() === enteredTeammateLower
							|| data.email.toLowerCase() === enteredTeammateLower
							|| data.name.toLowerCase() === enteredTeammateLower;
				}.bind(this));
				if (teammateData) {
					this.selectedTeammateData(teammateData);
				} else {
					teammateData = _.find(this.lastRecievedSuggestList, function (data) {
						return data.value.toLowerCase().indexOf(enteredTeammateLower) !== -1;
					}.bind(this));
					if (teammateData) {
						var
							confirmText = TextUtils.i18n('SHAREDFILES/CONFIRM_ADD_TEAMMATE', {'EMAIL': teammateData.email}),
							confirmCallback = function (addConfirmed) {
								if (addConfirmed) {
									this.selectedTeammateEmail(teammateData.email);
									this.selectedTeammateData(teammateData);
									this.selectAccessDom().addClass('expand');
								} else {
									this.selectedTeammateDom().focus();
									this.selectedTeammateDom().autocomplete('search');
								}
							}.bind(this),
							yesButtonText = TextUtils.i18n('SHAREDFILES/ACTION_YES'),
							noButtonText = TextUtils.i18n('SHAREDFILES/ACTION_NO')
						;
						Popups.showPopup(ConfirmPopup, [confirmText, confirmCallback, '', yesButtonText, noButtonText]);
					} else {
						var
							alertText = TextUtils.i18n('SHAREDFILES/WARNING_NO_TEAMMATE_SELECTED', {'EMAIL': enteredTeammate}),
							alertCallback = function () {
								this.selectedTeammateDom().focus();
								this.selectedTeammateDom().autocomplete('search');
							}.bind(this)
						;
						Popups.showPopup(AlertPopup, [alertText, alertCallback]);
					}
				}
			}
		}
		if (this.selectedTeammateData() !== null) {
			this.selectAccessDom().addClass('expand');
		}
	}
};

CFilesSharePopup.prototype.addNewShare = function (access)
{
	if (!this.selectedTeammateData()) {
		this.selectedTeammateDom().focus();
		this.selectedTeammateDom().autocomplete('search');
		return;
	}

	this.shares.push(new CShareModel({
		PublicId: this.selectedTeammateData().email,
		GroupId: this.selectedTeammateData().groupId,
		IsAll: this.selectedTeammateData().isAllUsersGroup,
		ContactUUID: this.selectedTeammateData().uuid,
		Access: access,
		New: true
	}));

	this.selectedTeammateData(null);
	this.selectedTeammateEmail('');
	var
		scrollArea = this.sharesScrollAreaDom(),
		listArea = scrollArea !== null ? scrollArea.find('.shares_list') : null
	;
	if (listArea !== null) {
		scrollArea.scrollTop(listArea.height() - scrollArea.height());
	}
};

CFilesSharePopup.prototype.deleteShare = function (publicId, groupId)
{
	if (groupId) {
		this.shares(_.filter(this.shares(), function (share) {
			return share.groupId !== groupId;
		}));
	} else {
		this.shares(_.filter(this.shares(), function (share) {
			return share.publicId !== publicId;
		}));
	}
};

CFilesSharePopup.prototype.checkAndSaveShares = function ()
{
	if (this.isSaving()) {
		return;
	}

	this.isSaving(true);
	this.requestFileShares(function (sharedWithMeAccessFromServer, sharesFromServer) {
		this.isSaving(false);
		const fileItem = this.fileItem;
		let
			extendedProps = fileItem && fileItem.oExtendedProps,
			savedShares = Types.pArray(extendedProps && extendedProps.Shares),
			sharedWithMeAccess = Types.pInt(extendedProps && extendedProps.SharedWithMeAccess)
		;
		sharesFromServer = _.sortBy(sharesFromServer, 'PublicId');
		savedShares = _.sortBy(savedShares, 'PublicId');
		if (_.isEqual(savedShares, sharesFromServer) && sharedWithMeAccessFromServer === sharedWithMeAccess) {
			this.saveShares();
		} else {
			const
				alertText = TextUtils.i18n('SHAREDFILES/WARNING_SHARES_CHANGED_BY_OTHER_USER'),
				alertCallback = function () {
					this.updateFileShares(sharedWithMeAccessFromServer, sharesFromServer);
					this.fillUpShares();
				}.bind(this)
			;
			Popups.showPopup(AlertPopup, [alertText, alertCallback]);
		}
	}.bind(this));
};

CFilesSharePopup.prototype.saveShares = function ()
{
	if (this.isSaving()) {
		return;
	}

	if (this.selectedTeammateEmail()) {
		var
			confirmText = TextUtils.i18n('SHAREDFILES/CONFIRM_SAVE_SHARES_WITHOUT_LAST_EMAIL', { 'EMAIL': this.selectedTeammateEmail() }),
			confirmCallback = function (saveConfirmed) {
				if (saveConfirmed) {
					this.confirmedSaveShares();
				} else {
					setTimeout(this.selectAccess.bind(this));
				}
			}.bind(this)
		;
		Popups.showPopup(ConfirmPopup, [confirmText, confirmCallback]);
	} else {
		this.confirmedSaveShares();
	}

};

CFilesSharePopup.prototype.confirmedSaveShares = function ()
{
	if (this.isSaving()) {
		return;
	}

	var
		shares = this.getCurrentShares(),
		parameters = {
			'Storage': this.fileItem.storageType(),
			'Path': this.fileItem.path(),
			'Id': this.fileItem.id(),
			'Shares': shares,
			'IsDir': !this.fileItem.IS_FILE
		},
		fOnSuccessCallback = _.bind(function () {
			Ajax.send(
				'SharedFiles',
				'UpdateShare',
				parameters,
				_.bind(this.onUpdateShareResponse, this)
			);
		}, this),
		fOnErrorCallback = _.bind(function () {
			this.isSaving(false);
		}, this)
	;

	this.isSaving(true);
	var hasSubscriber = App.broadcastEvent(
		'SharedFiles::UpdateShare::before',
		{
			FileItem: this.fileItem,
			Shares: shares,
			OnSuccessCallback: fOnSuccessCallback,
			OnErrorCallback: fOnErrorCallback
		}
	);

	if (hasSubscriber === false) {
		fOnSuccessCallback();
	}
};

CFilesSharePopup.prototype.onUpdateShareResponse = function (response, request)
{
	this.isSaving(false);
	if (response.Result) {
		this.requestFileShares(function (sharedWithMeAccess, shares) {
			this.updateFileShares(sharedWithMeAccess, shares);
			Screens.showReport(TextUtils.i18n('SHAREDFILES/INFO_SHARING_STATUS_UPDATED'));
			this.fileItem = null;
			this.closePopup();
		}.bind(this));
	} else {
		Api.showErrorByCode(response, TextUtils.i18n('SHAREDFILES/ERROR_UNKNOWN_ERROR'));
	}
};

CFilesSharePopup.prototype.showHistory = function () {
	if (this.bAllowShowHistory) {
		Popups.showPopup(ShowHistoryPopup, [TextUtils.i18n('SHAREDFILES/HEADING_HISTORY_POPUP'), this.fileItem]);
	}
};

module.exports = new CFilesSharePopup();


/***/ }),

/***/ "O57n":
/*!*****************************************************!*\
  !*** ./modules/SharedFiles/js/views/ButtonsView.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
	
	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
	AlertPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/AlertPopup.js */ "hT1I"),
	ConfirmPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/ConfirmPopup.js */ "XeMN"),
	
	FilesSharePopup = __webpack_require__(/*! modules/SharedFiles/js/popups/FilesSharePopup.js */ "NCqZ")
;

/**
 * @constructor
 */
function CButtonsView()
{
}

CButtonsView.prototype.ViewTemplate = 'SharedFiles_ButtonsView';

CButtonsView.prototype.useFilesViewData = function (oFilesView)
{
	this.isShareVisible = ko.computed(function () {
		return !oFilesView.isCorporateStorage();
	});

	this.shareCommand = Utils.createCommand(this, this.executeShare.bind(this, oFilesView), oFilesView.isShareAllowed);

	this.selectedSharedItems = ko.computed(function () {
		return _.filter(oFilesView.selector.listCheckedAndSelected(), function(item) {
			return item.sharedWithMe();
		});
	}, this);
	this.selectedSharedCount = ko.computed(function () {
		return this.selectedSharedItems().length;
	}, this);
	this.isLeaveShareAllowed = ko.computed(function () {
		return	!oFilesView.isZipFolder()
				&& !oFilesView.sharedParentFolder() && this.selectedSharedCount() > 0
				&& oFilesView.allSelectedFilesReady();
	}, this);
	this.leaveShareCommand = Utils.createCommand(this, this.executeLeaveShare.bind(this, oFilesView), this.isLeaveShareAllowed);
};

CButtonsView.prototype.executeShare = function (oFilesView)
{
	var oSelectedItem = oFilesView.selector.itemSelected();
	if (oSelectedItem.IS_FILE && oSelectedItem.bIsSecure() && oSelectedItem.oExtendedProps && !oSelectedItem.oExtendedProps.ParanoidKey) {
		Popups.showPopup(AlertPopup, [TextUtils.i18n('SHAREDFILES/INFO_SHARING_NOT_SUPPORTED'), null, TextUtils.i18n('SHAREDFILES/TITLE_SHARE_FILE')]);
	} else {
		Popups.showPopup(FilesSharePopup, [oSelectedItem]);
	}
};

CButtonsView.prototype.executeLeaveShare = function (oFilesView)
{
	var
		items = oFilesView.selector.listCheckedAndSelected() || [],
		sharedItems = this.selectedSharedItems(),
		sharedItemsCount = this.selectedSharedCount()
	;
	
	if (!oFilesView.bPublic || sharedItemsCount > 0) {
		var
			hasOwnItems = items.length !== sharedItemsCount,
			hasFolder = !!_.find(sharedItems, function (item) { return !item.IS_FILE; }),
			hasFile = !!_.find(sharedItems, function (item) { return item.IS_FILE; }),
			confirmText = ''
		;

		if (hasOwnItems) {
			confirmText = TextUtils.i18n('SHAREDFILES/CONFIRM_NOT_ALL_ITEMS_SHARED');
		} else if (hasFolder && hasFile) {
			confirmText = TextUtils.i18n('SHAREDFILES/CONFIRM_LEAVE_ITEMS_SHARE');
		} else if (hasFolder) {
			confirmText = TextUtils.i18n('SHAREDFILES/CONFIRM_LEAVE_FOLDERS_SHARE_PLURAL', {'NAME': sharedItems[0].fileName()}, null, sharedItemsCount);
		} else {
			confirmText = TextUtils.i18n('SHAREDFILES/CONFIRM_LEAVE_FILES_SHARE_PLURAL', {'NAME': sharedItems[0].fileName()}, null, sharedItemsCount);
		}

		oFilesView.selector.useKeyboardKeys(false);
		Popups.showPopup(ConfirmPopup, [confirmText, function (confirmedLeaveShare) {
			if (confirmedLeaveShare) {
				oFilesView.deleteItems(sharedItems, true, 'LeaveShare');
			}
		}, '', TextUtils.i18n('SHAREDFILES/ACTION_LEAVE_SHARE')]);
	}
};

module.exports = new CButtonsView();


/***/ })

}]);