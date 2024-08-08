"use strict";
(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[44],{

/***/ "8jKl":
/*!**********************************************!*\
  !*** ./modules/SharedContacts/js/manager.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "M4cL");


module.exports = function (appData) {
	const App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp");

	if (App.isUserNormalOrTenant()) {
		return {
			start: function () {
				$('html').addClass('shared-addressbooks');
			},
			getShareAddressbookControlView: function () {
				return __webpack_require__(/*! modules/SharedContacts/js/views/ShareAddressbookControlView.js */ "5cRz");
			}
		};
	}

	return null;
};


/***/ }),

/***/ "dxpi":
/*!********************************************************************!*\
  !*** ./modules/SharedContacts/js/models/CAddressbookShareModel.js ***!
  \********************************************************************/
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
function CAddressbookShareModel(oData)
{
	this.publicId = Types.pString(oData.PublicId);
	this.groupId = Types.pInt(oData.GroupId);
	this.isAllUsersGroup = Types.pBool(oData.IsAll);

	this.access = ko.observable(Types.pInt(oData.Access));
	this.accessText = ko.computed(function () {
		switch (this.access()) {
			case Enums.SharedAddressbookAccess.Write: return TextUtils.i18n('SHAREDCONTACTS/LABEL_WRITE_ACCESS');
			case Enums.SharedAddressbookAccess.Read: return TextUtils.i18n('SHAREDCONTACTS/LABEL_READ_ACCESS');
			case Enums.SharedAddressbookAccess.NoAccess: return TextUtils.i18n('SHAREDCONTACTS/LABEL_NOSHARE_ACCESS');
		}
	}, this);
}

module.exports = CAddressbookShareModel;


/***/ }),

/***/ "7EGo":
/*!*******************************************************************!*\
  !*** ./modules/SharedContacts/js/popups/AddressbookSharePopup.js ***!
  \*******************************************************************/
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

	CAddressbookShareModel = __webpack_require__(/*! modules/SharedContacts/js/models/CAddressbookShareModel.js */ "dxpi")
;

/**
 * @constructor
 */
function CAddressbookSharePopup()
{
	CAbstractPopup.call(this);

	this.addressbook = null;
	this.accessList = ko.computed(function () {
		return [
			{ value: Enums.SharedAddressbookAccess.Read, label: TextUtils.i18n('SHAREDCONTACTS/LABEL_READ_ACCESS') },
			{ value: Enums.SharedAddressbookAccess.Write, label: TextUtils.i18n('SHAREDCONTACTS/LABEL_WRITE_ACCESS') },
			{ value: Enums.SharedAddressbookAccess.NoAccess, label: TextUtils.i18n('SHAREDCONTACTS/LABEL_NOSHARE_ACCESS') }
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
	this.loadingAddressbookShares = ko.observable(false);
}

_.extendOwn(CAddressbookSharePopup.prototype, CAbstractPopup.prototype);

CAddressbookSharePopup.prototype.PopupTemplate = 'SharedContacts_AddressbookSharePopup';

/**
 * @param {object} addressbook
 */
CAddressbookSharePopup.prototype.onOpen = function (addressbook = null)
{
	if (addressbook === null) {
		this.closePopup();
		return;
	}

	this.addressbook = addressbook;

	this.selectedTeammateEmail('');
	this.selectedTeammateData(null);

	this.fillUpShares();
	this.requestAddressbookShares(function (shares) {
		this.updateAddressbookShares(shares);
		this.fillUpShares();
	}.bind(this));
};

CAddressbookSharePopup.prototype.fillUpShares = function ()
{
	const sharesData = Types.pArray(this.addressbook && this.addressbook.Shares);
	this.shares(_.map(sharesData, function (shareData) {
		return new CAddressbookShareModel(shareData);
	}));
};

CAddressbookSharePopup.prototype.requestAddressbookShares = function (callback)
{
	const addressbook = this.addressbook;
	const parameters = {
		'Id': addressbook.Id
	};
	this.loadingAddressbookShares(true);
	Ajax.send(
		'SharedContacts',
		'GetSharesForAddressbook',
		parameters,
		function (response, request) {
			this.loadingAddressbookShares(false);
			const shares = response && response.Result;
			if (shares) {
				callback(shares);
			} else {
				callback([]);
			}
		}.bind(this)
	);
};

CAddressbookSharePopup.prototype.updateAddressbookShares = function (newShares)
{
	if (!this.addressbook) {
		return;
	}
	this.addressbook.Shares = Types.pArray(newShares);
};

CAddressbookSharePopup.prototype.getCurrentShares = function ()
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
			return state;
		}
	}, this);
};

CAddressbookSharePopup.prototype.hasChanges = function ()
{
	var
		addressbook = this.addressbook,
		savedShares = Types.pArray(addressbook && addressbook.Shares),
		currentShares = this.getCurrentShares()
	;
	savedShares = _.sortBy(savedShares, 'PublicId');
	currentShares = _.sortBy(currentShares, 'PublicId');
	return addressbook && (!_.isEqual(savedShares, currentShares) || this.selectedTeammateEmail());
};

CAddressbookSharePopup.prototype.onEscHandler = function ()
{
	this.cancelPopup();
};

CAddressbookSharePopup.prototype.cancelPopup = function ()
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

CAddressbookSharePopup.prototype.autocompleteCallback = function (request, response)
{
	const addressbook = this.addressbook;
	if (!this.addressbook) {
		fResponse([]);
		return;
	}

	const
		owner = App.getUserPublicId(),
		suggestParameters = {
			storage: 'team',
			addContactGroups: false,
			addUserGroups: true,
			exceptEmail: owner
		},
		autocompleteCallback = ModulesManager.run(
			'ContactsWebclient', 'getSuggestionsAutocompleteCallback', [suggestParameters]
		),
		markRecipientsWithKeyCallback = function (recipientList) {
			const ownerLowerCase = owner.toLowerCase();
			const filteredList = recipientList.filter(suggestion => {
				const emailLowerCase = suggestion.email.toLowerCase();
				return ownerLowerCase !== emailLowerCase &&
						!this.shares().find(share => share.publicId.toLowerCase() === emailLowerCase);
			});
			this.lastRecievedSuggestList = filteredList;

			if (filteredList.length > 0) {
				response(filteredList);
			} else {
				response([{label: TextUtils.i18n('SHAREDCONTACTS/INFO_NO_SUGGESTED_CONTACTS'), disabled: true}]);
			}
		}.bind(this)
	;
	if (_.isFunction(autocompleteCallback)) {
		this.selectedTeammateData(null);
		autocompleteCallback(request, markRecipientsWithKeyCallback);
	}
};

CAddressbookSharePopup.prototype.selectAccess = function (hasExpandClass, control)
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
					alertText = TextUtils.i18n('SHAREDCONTACTS/WARNING_SELECT_TEAMMATE'),
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
							confirmText = TextUtils.i18n('SHAREDCONTACTS/CONFIRM_ADD_TEAMMATE', {'EMAIL': teammateData.email}),
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
							yesButtonText = TextUtils.i18n('SHAREDCONTACTS/ACTION_YES'),
							noButtonText = TextUtils.i18n('SHAREDCONTACTS/ACTION_NO')
						;
						Popups.showPopup(ConfirmPopup, [confirmText, confirmCallback, '', yesButtonText, noButtonText]);
					} else {
						var
							alertText = TextUtils.i18n('SHAREDCONTACTS/WARNING_NO_TEAMMATE_SELECTED', {'EMAIL': enteredTeammate}),
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

CAddressbookSharePopup.prototype.addNewShare = function (access)
{
	if (!this.selectedTeammateData()) {
		this.selectedTeammateDom().focus();
		this.selectedTeammateDom().autocomplete('search');
		return;
	}

	this.shares.push(new CAddressbookShareModel({
		PublicId: this.selectedTeammateData().email,
		GroupId: this.selectedTeammateData().groupId,
		IsAll: this.selectedTeammateData().isAllUsersGroup,
		Access: access
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

CAddressbookSharePopup.prototype.deleteShare = function (publicId, groupId)
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

CAddressbookSharePopup.prototype.checkAndSaveShares = function ()
{
	if (this.isSaving()) {
		return;
	}

	this.isSaving(true);
	this.requestAddressbookShares(function (sharesFromServer) {
		this.isSaving(false);
		const addressbook = this.addressbook;
		let savedShares = Types.pArray(addressbook && addressbook.Shares);
		sharesFromServer = _.sortBy(sharesFromServer, 'PublicId');
		savedShares = _.sortBy(savedShares, 'PublicId');
		if (_.isEqual(savedShares, sharesFromServer)) {
			this.saveShares();
		} else {
			const
				alertText = TextUtils.i18n('SHAREDCONTACTS/WARNING_SHARES_CHANGED_BY_OTHER_USER'),
				alertCallback = function () {
					this.updateAddressbookShares(sharesFromServer);
					this.fillUpShares();
				}.bind(this)
			;
			Popups.showPopup(AlertPopup, [alertText, alertCallback]);
		}
	}.bind(this));
};

CAddressbookSharePopup.prototype.saveShares = function ()
{
	if (this.isSaving()) {
		return;
	}

	if (this.selectedTeammateEmail()) {
		var
			confirmText = TextUtils.i18n('SHAREDCONTACTS/CONFIRM_SAVE_SHARES_WITHOUT_LAST_EMAIL', { 'EMAIL': this.selectedTeammateEmail() }),
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

CAddressbookSharePopup.prototype.confirmedSaveShares = function ()
{
	if (this.isSaving()) {
		return;
	}

	const
		shares = this.getCurrentShares(),
		parameters = {
			'Id': this.addressbook.Id,
			'Shares': shares
		}
	;

	this.isSaving(true);
	Ajax.send(
		'SharedContacts',
		'UpdateAddressbookShare',
		parameters,
		_.bind(this.onUpdateShareResponse, this)
	);
};

CAddressbookSharePopup.prototype.onUpdateShareResponse = function (response, request)
{
	this.isSaving(false);
	if (response.Result) {
		this.requestAddressbookShares(function (shares) {
			this.updateAddressbookShares(shares);
			Screens.showReport(TextUtils.i18n('SHAREDCONTACTS/INFO_SHARING_STATUS_UPDATED'));
			this.addressbook = null;
			this.closePopup();
		}.bind(this));
	} else {
		Api.showErrorByCode(response);
	}
};

module.exports = new CAddressbookSharePopup();


/***/ }),

/***/ "5cRz":
/*!************************************************************************!*\
  !*** ./modules/SharedContacts/js/views/ShareAddressbookControlView.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),

	Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	ConfirmPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/ConfirmPopup.js */ "XeMN"),
	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),

	AddressbookSharePopup = __webpack_require__(/*! modules/SharedContacts/js/popups/AddressbookSharePopup.js */ "7EGo")
;

function CShareAddressbookControlView()
{
	
}

CShareAddressbookControlView.prototype.ViewTemplate = 'SharedContacts_ShareAddressbookControlView';

CShareAddressbookControlView.prototype.openAddressbookSharePopup = function (addressbook)
{
	if (AddressbookSharePopup && addressbook) {
		Popups.showPopup(AddressbookSharePopup, [addressbook]);
	}
};

CShareAddressbookControlView.prototype.leaveAddressbookShare = function (addressbook)
{
	const
		addressbookName = addressbook.DisplayName || '',
		confirm = TextUtils.i18n('SHAREDCONTACTS/CONFIRM_LEAVE_SHARE', {'NAME': addressbookName}),
		confirmedLeaveShare = this.confirmedLeaveShare.bind(this, addressbook),
		okButtonText = TextUtils.i18n('SHAREDCONTACTS/ACTION_LEAVE_SHARE')
	;
	Popups.showPopup(ConfirmPopup, [confirm, confirmedLeaveShare, '', okButtonText]);
};

CShareAddressbookControlView.prototype.confirmedLeaveShare = function (addressbook, confirmed)
{
	if (confirmed) {
		const parameters = {
			'Id': addressbook.Id
		};
		Ajax.send('SharedContacts', 'LeaveShare', parameters, this.onLeaveShareResponse, this);
	}
};

CShareAddressbookControlView.prototype.onLeaveShareResponse = function (response, request)
{
	if (response && response.Result) {
		Ajax.send('Contacts', 'GetStorages');
	} else {
		Api.showErrorByCode(response);
	}
};

module.exports = new CShareAddressbookControlView();


/***/ })

}]);