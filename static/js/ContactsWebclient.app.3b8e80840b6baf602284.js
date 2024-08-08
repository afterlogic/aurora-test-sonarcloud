(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[5],{

/***/ "Cjfl":
/*!*****************************************************!*\
  !*** ./modules/ContactsWebclient/js/ContactCard.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	CustomTooltip = __webpack_require__(/*! modules/CoreWebclient/js/CustomTooltip.js */ "rhHV"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
	
	ComposeMessageToAddressesFunc = ModulesManager.run('MailWebclient', 'getComposeMessageToAddresses'),
	SearchMessagesInCurrentFolderFunc = ModulesManager.run('MailWebclient', 'getSearchMessagesInCurrentFolder'),
	
	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
	CreateContactPopup = __webpack_require__(/*! modules/ContactsWebclient/js/popups/CreateContactPopup.js */ "muMM"),
	
	ContactsCache = __webpack_require__(/*! modules/ContactsWebclient/js/Cache.js */ "hW2p"),
	
	oContactCardsView = {
		contacts: ko.observableArray([]),
		ViewTemplate: 'ContactsWebclient_ContactCardsView',
		bAllowComposeMessageToAddresses: _.isFunction(ComposeMessageToAddressesFunc),
		searchMessagesInCurrentFolder: SearchMessagesInCurrentFolderFunc || function () {},
		bAllowSearchMessagesInCurrentFolder: _.isFunction(SearchMessagesInCurrentFolderFunc),
		add: function (aContacts) {
			var aDiffContacts = _.filter(this.contacts(), function (oContact) {
				return -1 === $.inArray(oContact.email(), _.keys(aContacts));
			});
			this.contacts(aDiffContacts.concat(_.compact(_.values(aContacts))));
		}
	}
;

Screens.showAnyView(oContactCardsView);

/**
 * @param {Object} $Element
 * @param {String} sAddress
 */
function BindContactCard($Element, sAddress)
{
	var
		$Popup = $('div.item_viewer[data-email=\'' + sAddress + '\']'),
		bPopupOpened = false,
		iCloseTimeoutId = 0,
		fOpenPopup = function () {
			if ($Popup && $Element)
			{
				bPopupOpened = true;
				clearTimeout(iCloseTimeoutId);
				setTimeout(function () {
					var
						oOffset = $Element.offset(),
						iLeft, iTop, iFitToScreenOffset
					;
					if (bPopupOpened && oOffset.left + oOffset.top !== 0)
					{
						iLeft = oOffset.left + 10;
						iTop = oOffset.top + $Element.height() + 6;
						iFitToScreenOffset = $(window).width() - (iLeft + 396); //396 - popup outer width

						if (iFitToScreenOffset > 0)
						{
							iFitToScreenOffset = 0;
						}
						$Popup.addClass('expand').offset({'top': iTop, 'left': iLeft + iFitToScreenOffset});
					}
				}, 180);
			}
		},
		fClosePopup = function () {
			if (bPopupOpened && $Popup && $Element)
			{
				bPopupOpened = false;
				iCloseTimeoutId = setTimeout(function () {
					if (!bPopupOpened)
					{
						$Popup.removeClass('expand');
					}
				}, 200);
			}
		}
	;

	if ($Popup.length > 0)
	{
		$Element
			.off()
			.on('mouseover', function () {
				$Popup
					.off()
					.on('mouseenter', fOpenPopup)
					.on('mouseleave', fClosePopup)
					.find('.link, .button')
					.off('.links')
					.on('click.links', function () {
						bPopupOpened = false;
						$Popup.removeClass('expand');
					})
				;

				setTimeout(function () {
					$Popup
						.find('.link, .button')
						.off('click.links')
						.on('click.links', function () {
							bPopupOpened = false;
							$Popup.removeClass('expand');
						});
				}.bind(this), 100);

				fOpenPopup();
			})
			.on('mouseout', fClosePopup)
		;

		bPopupOpened = false;
		$Popup.removeClass('expand');
	}
	else
	{
		$Element.off();
	}
}

function ClearElement($Element)
{
	if ($Element.next().hasClass('add_contact'))
	{
		$Element.next().remove();
	}
	$Element.removeClass('found');
	$Element.parent().removeClass('found_contact');
	$Element.off();
}

/**
 * @param {Array} aElements
 * @param {Array} aContacts
 */
function OnContactResponse(aElements, aContacts)
{
	_.each(aElements, function ($Element) {
		var
			sEmail = $Element.attr('data-email'), // $Element.data('email') returns wrong values if data-email was changed by knockoutjs
			oContact = aContacts[sEmail]
		;
		
		if (oContact !== undefined)
		{
			ClearElement($Element);
			
			if (oContact === null)
			{
				var $add = $('<span class="add_contact"></span>');
				$Element.after($add);
				CustomTooltip.init($add, 'CONTACTSWEBCLIENT/ACTION_ADD_TO_CONTACTS');
				$add.on('click', function () {
					Popups.showPopup(CreateContactPopup, [$Element.attr('data-name'), sEmail, function (aContacts) {
						_.each(aElements, function ($El) {
							if ($El.attr('data-email') === sEmail)
							{
								ClearElement($El);
								$El.addClass('found');
								$El.parent().addClass('found_contact');
								oContactCardsView.add(aContacts);
								BindContactCard($El, sEmail);
							}
						});
					}]);
				});
			}
			else
			{
				$Element.addClass('found');
				$Element.parent().addClass('found_contact');
				oContactCardsView.add(aContacts);
				BindContactCard($Element, sEmail);
			}
		}
	});
}

module.exports = {
	applyTo: function ($Addresses) {
		var
			aElements = _.map($Addresses, function (oElement) {
				return $(oElement);
			}),
			iMaxEmailCount = 100, // interface freezes if message in preview pane has too many highlighted recipients
			aEmails = _.uniq(_.map(aElements, function ($Element) {
				return $Element && $Element.attr('data-email');
			})).slice(0, iMaxEmailCount)
		;
		
		ContactsCache.getContactsByEmails(aEmails, _.bind(OnContactResponse, {}, aElements));
	}
};


/***/ }),

/***/ "lDT7":
/*!***********************************************************!*\
  !*** ./modules/ContactsWebclient/js/MainTabExtMethods.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	ContactsCache = __webpack_require__(/*! modules/ContactsWebclient/js/Cache.js */ "hW2p"),
	MainTabContactsMethods = {
		markVcardsExistentByFile: function (sFile) {
			ContactsCache.markVcardsExistentByFile(sFile);
		},
		updateVcardUid: function (sFile, sUid) {
			ContactsCache.updateVcardUid(sFile, sUid);
		}
	}
;

window.MainTabContactsMethods = MainTabContactsMethods;

module.exports = {};

/***/ }),

/***/ "Rq3T":
/*!*****************************************************************!*\
  !*** ./modules/ContactsWebclient/js/SuggestionsAutocomplete.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	
	AddressUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Address.js */ "kG5I"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	
	Ajax = __webpack_require__(/*! modules/ContactsWebclient/js/Ajax.js */ "xGhG")
;

/**
 * 
 * @param {object} oRequest
 * @param {function} fResponse
 * @param {string} storage
 * @param {boolean} addContactGroups
 * @param {boolean} addUserGroups
 * @param {string} exceptEmail
 * @param {boolean} addEmailsToGroups
 * @returns {undefined}
 */
function Callback(oRequest, fResponse, {storage = 'all', addContactGroups = false,
					addUserGroups = false, exceptEmail = '', addEmailsToGroups = false, useEmailAsValues = false})
{
	var
		sTerm = oRequest.term,
		oParameters = {
			'Search': sTerm,
			'Storage': storage,
			'SortField': Enums.ContactSortField.Frequency,
			'SortOrder': 1,
			'WithGroups': addContactGroups,
			'WithUserGroups': addUserGroups,
			'WithoutTeamContactsDuplicates': true
		}
	;

	Ajax.send('GetContactSuggestions', oParameters, function (oResponse) {
		var aList = [];
		if (oResponse && oResponse.Result && oResponse.Result.List)
		{
			aList = _.map(oResponse.Result.List, function (oItem) {
				if (oItem.IsGroup && oItem.Name) {
					if (!oItem.Emails) {
						return null;
					}
					return {
						label: addEmailsToGroups ? `${oItem.Name} (${oItem.Emails})` : oItem.Name,
						value: addEmailsToGroups ? oItem.Emails : oItem.Name,
						name: oItem.Name,
						email: addEmailsToGroups ? oItem.Emails : oItem.Name,
						groupId: oItem.Id,
						isUserGroup: true,
						isAllUsersGroup: oItem.IsAll
					};
				}
				var
					sValue = oItem.ViewEmail,
					sLabel = ''
				;
				if (!useEmailAsValues && oItem.FullName && 0 < $.trim(oItem.FullName).length)
				{
					if (oItem.ForSharedToAll)
					{
						sValue = oItem.FullName;
					}
					else if (oItem.IsGroup)
					{
						sLabel = `${oItem.FullName} (${oItem.ViewEmail})`;
						sValue = oItem.ViewEmail;
					}
					else
					{
						sValue = ('"' + oItem.FullName + '" <' + oItem.ViewEmail + '>');
					}
				}
				if (oItem && oItem.ViewEmail && oItem.ViewEmail !== exceptEmail) {
					return {
						label: sLabel ? sLabel : sValue,
						value: sValue,
						name: oItem.FullName,
						email: oItem.ViewEmail,
						frequency: oItem.Frequency,
						id: oItem.UUID,
						storage: oItem.Storage,
						uuid: oItem.UUID,
						team: oItem.Storage === 'team',
						sharedToAll: oItem.Storage === 'shared',
						hasKey: oItem.HasPgpPublicKey,
						encryptMessage: oItem.PgpEncryptMessages,
						signMessage: oItem.PgpSignMessages,
						isContactGroup: oItem.IsGroup
					};
				}
				return null;
			});

			aList = aList.filter(item => item && item.email);
			aList = _.sortBy(_.compact(aList), function(oItem){
				return -oItem.frequency;
			});
		}

		fResponse(aList);

	});
}

/**
 * @param {Object} oContact
 */
function DeleteHandler(oContact)
{
	Ajax.send('UpdateContact', { 'Contact': { 'UUID': oContact.id, 'Frequency': -1, 'Storage': oContact.storage } });
}

module.exports = {
	callback: Callback,
	deleteHandler: DeleteHandler
};


/***/ }),

/***/ "8qea":
/*!***********************************************!*\
  !*** ./modules/ContactsWebclient/js/enums.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),

	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),

	Enums = {}
;

/**
 * @enum {number}
 */
Enums.SharedAddressbookAccess = {
	'NoAccess': 0,
	'Write': 1,
	'Read': 2
};

if (typeof window.Enums === 'undefined')
{
	window.Enums = {};
}

_.extendOwn(window.Enums, Enums);

module.exports = {
	init(appData, serverModuleName) {
		const appDataSection = appData[serverModuleName];
		window.Enums.ContactsPrimaryEmail = Types.pObject(appDataSection && appDataSection.PrimaryEmail);
		window.Enums.ContactsPrimaryPhone = Types.pObject(appDataSection && appDataSection.PrimaryPhone);
		window.Enums.ContactsPrimaryAddress = Types.pObject(appDataSection && appDataSection.PrimaryAddress);
		window.Enums.ContactSortField = Types.pObject(appDataSection && appDataSection.SortField);
	}
};


/***/ }),

/***/ "xGtF":
/*!*************************************************!*\
  !*** ./modules/ContactsWebclient/js/manager.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = function (oAppData) {
	var
		_ = __webpack_require__(/*! underscore */ "C3HO"),
		
		TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
		
		App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
		ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
		
		ContactsCache = __webpack_require__(/*! modules/ContactsWebclient/js/Cache.js */ "hW2p"),
		EnumsDeclarator = __webpack_require__(/*! modules/ContactsWebclient/js/enums.js */ "8qea"),
		Settings = __webpack_require__(/*! modules/ContactsWebclient/js/Settings.js */ "Y40+"),
		Utils = __webpack_require__(/*! modules/ContactsWebclient/js/utils/Links.js */ "rHGs"),
		
		SuggestionsAutocomplete = __webpack_require__(/*! modules/ContactsWebclient/js/SuggestionsAutocomplete.js */ "Rq3T"),
		SuggestionsMethods = {
			getSuggestionsAutocompleteCallback: function (suggestParameters) {
				var
					fSuggestionsAutocompleteCallback = function (oRequest, fResponse) {
						SuggestionsAutocomplete.callback(oRequest, fResponse, suggestParameters);
					},
					//TODO: Remove this wrapper after adding PGP-keys to team storage
					fSuggestionsAutocompleteFilteredCallback = ModulesManager.run(
						'OpenPgpWebclient',
						'getSuggestionsAutocompleteFilteredCallback',
						[fSuggestionsAutocompleteCallback]
					)
				;
				return fSuggestionsAutocompleteFilteredCallback ?
					fSuggestionsAutocompleteFilteredCallback
					:
					fSuggestionsAutocompleteCallback;
			},
			getSuggestionsAutocompleteDeleteHandler: function () {
				return SuggestionsAutocomplete.deleteHandler;
			},
			getContactsByEmails: function (aEmails, fCallBack) {
				ContactsCache.getContactsByEmails(aEmails, fCallBack);
			}
		},
				
		fRegisterMessagePaneControllerOnStart = function () {
			App.subscribeEvent('MailWebclient::RegisterMessagePaneController', function (fRegisterMessagePaneController) {
				fRegisterMessagePaneController(__webpack_require__(/*! modules/ContactsWebclient/js/views/VcardAttachmentView.js */ "MYHY"), 'BeforeMessageBody');
			});
		},

		ContactsCardsMethods = {
			applyContactsCards: function ($Addresses) {
				var ContactCard = __webpack_require__(/*! modules/ContactsWebclient/js/ContactCard.js */ "Cjfl");
				ContactCard.applyTo($Addresses);
			}
		}
	;

	EnumsDeclarator.init(oAppData, Settings.ServerModuleName);
	Settings.init(oAppData);

	if (!ModulesManager.isModuleAvailable(Settings.ServerModuleName))
	{
		return null;
	}

	if (App.isUserNormalOrTenant())
	{
		if (App.isMobile())
		{
			return _.extend({
				start: fRegisterMessagePaneControllerOnStart,
				getSettings: function () {
					return Settings;
				},
				getHeaderItemView: function () {
					return __webpack_require__(/*! modules/ContactsWebclient/js/views/HeaderItemView.js */ "zXiY");
				}
			}, SuggestionsMethods);
		}
		else if (App.isNewTab())
		{
			return _.extend({
				start: fRegisterMessagePaneControllerOnStart
			}, SuggestionsMethods, ContactsCardsMethods);
		}
		else
		{
			__webpack_require__(/*! modules/ContactsWebclient/js/MainTabExtMethods.js */ "lDT7");
			
			return _.extend({
				start: function (ModulesManager) {
					ModulesManager.run('SettingsWebclient', 'registerSettingsTab', [
						function () { return __webpack_require__(/*! modules/ContactsWebclient/js/views/ContactsSettingsFormView.js */ "Ub4N"); }, 
						Settings.HashModuleName, 
						TextUtils.i18n('CONTACTSWEBCLIENT/LABEL_SETTINGS_TAB')
					]);
					if (Settings.AllowAddressBooksManagement) {
						ModulesManager.run('SettingsWebclient', 'registerSettingsTab', [
							function () { return __webpack_require__(/*! modules/ContactsWebclient/js/views/AddressBooksSettingsFormView.js */ "h9EH"); }, 
							'manage-addressbooks', 
							TextUtils.i18n('CONTACTSWEBCLIENT/LABEL_MANAGE_ADDRESSBOOK_SETTINGS_TAB')
						]);
					}
					fRegisterMessagePaneControllerOnStart();
				},
				getScreens: function () {
					var oScreens = {};
					oScreens[Settings.HashModuleName] = function () {
						var CContactsView = __webpack_require__(/*! modules/ContactsWebclient/js/views/CContactsView.js */ "iiou");
						return new CContactsView();
					};
					return oScreens;
				},
				getHeaderItem: function () {
					return {
						item: __webpack_require__(/*! modules/ContactsWebclient/js/views/HeaderItemView.js */ "zXiY"),
						name: Settings.HashModuleName
					};
				},
				isTeamContactsAllowed: function () {
					return Utils.checkStorageExists('team');
				},
				getMobileSyncSettingsView: function () {
					return __webpack_require__(/*! modules/ContactsWebclient/js/views/MobileSyncSettingsView.js */ "gBUy");
				}
			}, SuggestionsMethods, ContactsCardsMethods);
		}
	}
	
	return null;
};


/***/ }),

/***/ "CUTT":
/*!***********************************************************!*\
  !*** ./modules/ContactsWebclient/js/models/VcardModel.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	Ajax = __webpack_require__(/*! modules/ContactsWebclient/js/Ajax.js */ "xGhG"),
	
	ContactsCache = __webpack_require__(/*! modules/ContactsWebclient/js/Cache.js */ "hW2p"),
	HeaderItemView = !App.isNewTab() ? __webpack_require__(/*! modules/ContactsWebclient/js/views/HeaderItemView.js */ "zXiY") : null,
	MainTab = (App.isNewTab() && window.opener) ? window.opener.MainTabContactsMethods : null
;

/**
 * @constructor
 */
function CVcardModel()
{
	this.uid = ko.observable('');
	this.file = ko.observable('');
	this.name = ko.observable('');
	this.email = ko.observable('');
	this.exists = ko.observable(false);
	this.isJustSaved = ko.observable(false);
}

/**
 * @param {AjaxVCardResponse} oData
 */
CVcardModel.prototype.parse = function (oData)
{
	if (oData && oData['@Object'] === 'Object/Aurora\\Modules\\Mail\\Classes\\Vcard')
	{
		this.uid(Types.pString(oData.Uid));
		this.file(Types.pString(oData.File));
		this.name(Types.pString(oData.Name));
		this.email(Types.pString(oData.Email));
		this.exists(!!oData.Exists);
		
		ContactsCache.addVcard(this);
	}
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CVcardModel.prototype.onContactsSaveVcfResponse = function (oResponse, oRequest)
{
	if (!oResponse.Result)
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('CONTACTSWEBCLIENT/ERROR_CREATE_CONTACT'));
		this.exists(false);
	}
	else
	{
		if (_.isArray(oResponse.Result.ImportedUids) && oResponse.Result.ImportedUids.length === 1)
		{
			this.uid(oResponse.Result.ImportedUids[0]);
			if (MainTab)
			{
				MainTab.updateVcardUid(this.file(), this.uid());
			}
		}
	}
};

CVcardModel.prototype.addContact = function ()
{
	Ajax.send('AddContactsFromFile', {'File': this.file()}, this.onContactsSaveVcfResponse, this);
	
	this.isJustSaved(true);
	this.exists(true);
	
	setTimeout(_.bind(function () {
		this.isJustSaved(false);
	}, this), 20000);
	
	if (HeaderItemView)
	{
		HeaderItemView.recivedAnim(true);
	}
	else if (MainTab)
	{
		MainTab.markVcardsExistentByFile(this.file());
	}
};

module.exports = CVcardModel;


/***/ }),

/***/ "muMM":
/*!*******************************************************************!*\
  !*** ./modules/ContactsWebclient/js/popups/CreateContactPopup.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	Routing = __webpack_require__(/*! modules/CoreWebclient/js/Routing.js */ "W66n"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
	
	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
	
	LinksUtils = __webpack_require__(/*! modules/ContactsWebclient/js/utils/Links.js */ "rHGs"),
	
	Ajax = __webpack_require__(/*! modules/ContactsWebclient/js/Ajax.js */ "xGhG"),
	ContactsCache = __webpack_require__(/*! modules/ContactsWebclient/js/Cache.js */ "hW2p"),
	
	HeaderItemView = __webpack_require__(/*! modules/ContactsWebclient/js/views/HeaderItemView.js */ "zXiY")
;

/**
 * @constructor
 */
function CCreateContactPopup()
{
	CAbstractPopup.call(this);
	
	this.displayName = ko.observable('');
	this.email = ko.observable('');
	this.phone = ko.observable('');
	this.address = ko.observable('');
	this.skype = ko.observable('');
	this.facebook = ko.observable('');

	this.focusDisplayName = ko.observable(false);

	this.loading = ko.observable(false);

	this.fCallback = function () {};
}

_.extendOwn(CCreateContactPopup.prototype, CAbstractPopup.prototype);

CCreateContactPopup.prototype.PopupTemplate = 'ContactsWebclient_CreateContactPopup';

/**
 * @param {string} sName
 * @param {string} sEmail
 * @param {Function} fCallback
 */
CCreateContactPopup.prototype.onOpen = function (sName, sEmail, fCallback)
{
	if (this.displayName() !== sName || this.email() !== sEmail)
	{
		this.displayName(sName);
		this.email(sEmail);
		this.phone('');
		this.address('');
		this.skype('');
		this.facebook('');
	}

	this.fCallback = _.isFunction(fCallback) ? fCallback : function () {};
};

CCreateContactPopup.prototype.onSaveClick = function ()
{
	if (!this.canBeSave())
	{
		Screens.showError(TextUtils.i18n('CONTACTSWEBCLIENT/ERROR_EMAIL_OR_NAME_BLANK'));
	}
	else if (!this.loading())
	{
		var
			oParameters = {
				'PrimaryEmail': Enums.ContactsPrimaryEmail.Personal,
				'FullName': this.displayName(),
				'PersonalEmail': this.email(),
				'PersonalPhone': this.phone(),
				'PersonalAddress': this.address(),
				'Skype': this.skype(),
				'Facebook': this.facebook(),
				'Storage': 'personal'
			}
		;

		this.loading(true);
		Ajax.send('CreateContact', { 'Contact': oParameters }, this.onCreateContactResponse, this);
	}
};


CCreateContactPopup.prototype.cancelPopup = function ()
{
	this.loading(false);
	this.closePopup();
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CCreateContactPopup.prototype.onCreateContactResponse = function (oResponse, oRequest)
{
	var oParameters = oRequest.Parameters;
	
	this.loading(false);

	if (!oResponse.Result)
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('CONTACTSWEBCLIENT/ERROR_CREATE_CONTACT'));
	}
	else
	{
		Screens.showReport(TextUtils.i18n('CONTACTSWEBCLIENT/REPORT_CONTACT_SUCCESSFULLY_ADDED'));
		ContactsCache.clearInfoAboutEmail(oParameters.Contact.PersonalEmail);
		ContactsCache.getContactsByEmails([oParameters.Contact.PersonalEmail], this.fCallback);
		this.closePopup();
		
		if (!HeaderItemView.isCurrent())
		{
			HeaderItemView.recivedAnim(true);
		}
	}
};

CCreateContactPopup.prototype.canBeSave = function ()
{
	return this.displayName() !== '' || this.email() !== '';
};

CCreateContactPopup.prototype.goToContacts = function ()
{
	ContactsCache.saveNewContactParams({
		displayName: this.displayName(),
		email: this.email(),
		phone: this.phone(),
		address: this.address(),
		skype: this.skype(),
		facebook: this.facebook()
	});
	this.closePopup();
	Routing.replaceHash(LinksUtils.getContacts('personal', '', '', 1, '', 'create-contact'));
};

module.exports = new CCreateContactPopup();


/***/ }),

/***/ "QgF7":
/*!*********************************************************************!*\
  !*** ./modules/ContactsWebclient/js/popups/EditAddressBookPopup.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	
	Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT")	
;

/**
 * @constructor
 */
function CEditAddressBookPopup()
{
	CAbstractPopup.call(this);
	
	this.createMode = ko.observable(false);
	this.saving = ko.observable(false);

	this.addressBookName = ko.observable('');
	this.addressBookNameFocus = ko.observable(false);
	
	this.fCallback = null;
}

_.extendOwn(CEditAddressBookPopup.prototype, CAbstractPopup.prototype);

CEditAddressBookPopup.prototype.PopupTemplate = 'ContactsWebclient_EditAddressBookPopup';

/**
 * @param {Function} fCallback
 */
CEditAddressBookPopup.prototype.onOpen = function (fCallback, iEntityId, sDisplayName)
{
	this.fCallback = fCallback;
	this.iEntityId = iEntityId;
	this.createMode(!this.iEntityId);
	this.addressBookName(sDisplayName || '');
	this.addressBookNameFocus(true);
};

CEditAddressBookPopup.prototype.save = function ()
{
	if (_.isEmpty(this.addressBookName())) {
		Screens.showError(TextUtils.i18n('CONTACTSWEBCLIENT/ERROR_ADDRESSBOOK_NAME_EMPTY'));
		this.addressBookNameFocus(true);
		return;
	}

	var
		sMethod = this.createMode() ? 'CreateAddressBook' : 'UpdateAddressBook',
		oParameters = { 'AddressBookName': this.addressBookName() }
	;
	if (!this.createMode()) {
		oParameters.EntityId = this.iEntityId;
	}
	this.addressBookNameFocus(false);
	this.saving(true);
	Ajax.send('Contacts', sMethod, oParameters, this.onSaveAddressBookResponse, this);
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CEditAddressBookPopup.prototype.onSaveAddressBookResponse = function (oResponse, oRequest)
{
	this.saving(false);
	if (!oResponse || !oResponse.Result)
	{
		var sError = this.createMode()
				? TextUtils.i18n('CONTACTSWEBCLIENT/ERROR_CREATE_ADDRESSBOOK')
				: TextUtils.i18n('CONTACTSWEBCLIENT/ERROR_UPDATE_ADDRESSBOOK');
		Api.showErrorByCode(oResponse, sError);
	}
	else
	{
		var sReport = this.createMode()
				? TextUtils.i18n('CONTACTSWEBCLIENT/REPORT_CREATE_ADDRESSBOOK')
				: TextUtils.i18n('CONTACTSWEBCLIENT/REPORT_UPDATE_ADDRESSBOOK');
		Screens.showReport(sReport);
		if (_.isFunction(this.fCallback)) {
			this.fCallback();
		}
		this.closePopup();
	}
};

CEditAddressBookPopup.prototype.cancelPopup = function ()
{
	if (!this.saving())
	{
		this.closePopup();
	}
};

module.exports = new CEditAddressBookPopup();


/***/ }),

/***/ "h9EH":
/*!****************************************************************************!*\
  !*** ./modules/ContactsWebclient/js/views/AddressBooksSettingsFormView.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	
	Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	ConfirmPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/ConfirmPopup.js */ "XeMN"),
	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),

	CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),

	EditAddressBookPopup = __webpack_require__(/*! modules/ContactsWebclient/js/popups/EditAddressBookPopup.js */ "QgF7")
;

/**
 * @constructor
 */
function CAddressBooksSettingsFormView()
{
	CAbstractSettingsFormView.call(this);
	
	this.addressBooks = ko.observableArray([]);
	this.loading = ko.observable(false);
}

_.extendOwn(CAddressBooksSettingsFormView.prototype, CAbstractSettingsFormView.prototype);

CAddressBooksSettingsFormView.prototype.ViewTemplate = 'ContactsWebclient_AddressBooksSettingsFormView';

CAddressBooksSettingsFormView.prototype.onShow = function ()
{
	this.populate();
};

CAddressBooksSettingsFormView.prototype.populate = function ()
{
	this.loading(true);
	Ajax.send('Contacts', 'GetStorages', {}, function (oResponse) {
		this.loading(false);
		if (_.isArray(oResponse && oResponse.Result)) {
			const userPublicId = App.getUserPublicId();
			this.addressBooks(oResponse.Result.filter(addressbook => {
				return addressbook?.Display && addressbook?.Owner === userPublicId && addressbook.Id !== 'personal';
			}));
		} else {
			Api.showErrorByCode(oResponse);
		}
	}, this);
};

CAddressBooksSettingsFormView.prototype.addAddressBook = function ()
{
	Popups.showPopup(EditAddressBookPopup, [this.populate.bind(this)]);
};

CAddressBooksSettingsFormView.prototype.editAddressBook = function (iEntityId, sDisplayName)
{
	Popups.showPopup(EditAddressBookPopup, [this.populate.bind(this), iEntityId, sDisplayName]);
};

CAddressBooksSettingsFormView.prototype.deleteAddressBook = function (iEntityId, sDisplayName)
{
	var
		sConfirm = TextUtils.i18n('CONTACTSWEBCLIENT/CONFIRM_DELETE_ADDRESSBOOK', { 'NAME': sDisplayName }),
		fOnConfirm = _.bind(function (bOk) {
			if (bOk)
			{
				Ajax.send('Contacts', 'DeleteAddressBook', {'EntityId': iEntityId}, function (oResponse) {
					if (!oResponse || !oResponse.Result) {
						Api.showErrorByCode(oResponse);
					}
					this.populate();
				}, this);
			}
		}, this)
	;

	Popups.showPopup(ConfirmPopup, [sConfirm, fOnConfirm]);
};

module.exports = new CAddressBooksSettingsFormView();


/***/ }),

/***/ "Ub4N":
/*!************************************************************************!*\
  !*** ./modules/ContactsWebclient/js/views/ContactsSettingsFormView.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),
	
	Settings = __webpack_require__(/*! modules/ContactsWebclient/js/Settings.js */ "Y40+")
;

/**
 * @constructor
 */
function CContactsSettingsFormView()
{
	CAbstractSettingsFormView.call(this, Settings.ServerModuleName);
	
	this.contactsPerPageValues = ko.observableArray(Types.getAdaptedPerPageList(Settings.ContactsPerPage));
	
	this.contactsPerPage = ko.observable(Settings.ContactsPerPage);
}

_.extendOwn(CContactsSettingsFormView.prototype, CAbstractSettingsFormView.prototype);

CContactsSettingsFormView.prototype.ViewTemplate = 'ContactsWebclient_ContactsSettingsFormView';

CContactsSettingsFormView.prototype.getCurrentValues = function ()
{
	return [
		this.contactsPerPage()
	];
};

CContactsSettingsFormView.prototype.revertTeamValues = function ()
{
	this.contactsPerPage(Settings.ContactsPerPage);
};

CContactsSettingsFormView.prototype.getParametersForSave = function ()
{
	return {
		'ContactsPerPage': this.contactsPerPage()
	};
};

CContactsSettingsFormView.prototype.applySavedValues = function (oParameters)
{
	Settings.update(oParameters.ContactsPerPage);
};

module.exports = new CContactsSettingsFormView();


/***/ }),

/***/ "zXiY":
/*!**************************************************************!*\
  !*** ./modules/ContactsWebclient/js/views/HeaderItemView.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	
	CHeaderItemView = __webpack_require__(/*! modules/CoreWebclient/js/views/CHeaderItemView.js */ "C5H3")
;

module.exports = new CHeaderItemView(TextUtils.i18n('CONTACTSWEBCLIENT/ACTION_SHOW_CONTACTS'));


/***/ }),

/***/ "gBUy":
/*!**********************************************************************!*\
  !*** ./modules/ContactsWebclient/js/views/MobileSyncSettingsView.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	ko = __webpack_require__(/*! knockout */ "p09A"),

	Settings = __webpack_require__(/*! modules/ContactsWebclient/js/Settings.js */ "Y40+")
;

/**
 * @constructor
 */
function CMobileSyncSettingsView()
{
	this.AddressBooks = ko.observableArray([]);
}

CMobileSyncSettingsView.prototype.ViewTemplate = 'ContactsWebclient_MobileSyncSettingsView';

/**
 * @param {Object} oDav
 */
CMobileSyncSettingsView.prototype.populate = function (oDav)
{
	if (Array.isArray(oDav.Contacts)) {
		const aAddressBooks = oDav.Contacts.map((oItem) => {
			return {
				'DisplayName': oItem.Name,
				'DavUrl': oItem.Url
			};
		})

		this.AddressBooks(aAddressBooks);
	}
};

module.exports = new CMobileSyncSettingsView();


/***/ }),

/***/ "MYHY":
/*!*******************************************************************!*\
  !*** ./modules/ContactsWebclient/js/views/VcardAttachmentView.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	
	ContactsCache = __webpack_require__(/*! modules/ContactsWebclient/js/Cache.js */ "hW2p"),
	CVcardModel = __webpack_require__(/*! modules/ContactsWebclient/js/models/VcardModel.js */ "CUTT")
;

function CVcardAttachmentView()
{
	this.vcard = ko.observable(null);
}

CVcardAttachmentView.prototype.ViewTemplate = 'ContactsWebclient_VcardAttachmentView';

/**
 * Receives properties of the message that is displaying in the message pane. 
 * It is called every time the message is changing in the message pane.
 * Receives null if there is no message in the pane.
 * 
 * @param {Object|null} oMessageProps Information about message in message pane.
 * @param {Object} oMessageProps.oVcard
 */
CVcardAttachmentView.prototype.doAfterPopulatingMessage = function (oMessageProps)
{
	var
		aExtend = (oMessageProps && Types.isNonEmptyArray(oMessageProps.aExtend)) ? oMessageProps.aExtend : [],
		oFoundRawVcard = _.find(aExtend, function (oRawVcard) {
			return oRawVcard['@Object'] === 'Object/Aurora\\Modules\\Mail\\Classes\\Vcard';
		})
	;
	if (oFoundRawVcard)
	{
		var oVcard = ContactsCache.getVcard(oFoundRawVcard.File);
		if (!oVcard)
		{
			oVcard = new CVcardModel();
			oVcard.parse(oFoundRawVcard);
		}
		this.vcard(oVcard);
	}
	else
	{
		this.vcard(null);
	}
};

module.exports = new CVcardAttachmentView();


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