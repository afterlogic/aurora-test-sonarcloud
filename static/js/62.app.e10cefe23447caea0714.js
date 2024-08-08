(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[62],{

/***/ "A3in":
/*!****************************************************!*\
  !*** ./modules/CoreWebclient/js/utils/Calendar.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	moment = __webpack_require__(/*! moment */ "sdEb"),

	CalendarUtils = {}
;

/**
 * Generates a list of time to display in calendar settings.
 * 
 * @param {string} sLabelFormat
 * @param {string} sValueFormat
 * @returns {Array}
 */
CalendarUtils.getTimeListStepHour = function (sLabelFormat, sValueFormat)
{
	var 
		aTimeList = [
			'00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00',
			'10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
			'20:00', '21:00', '22:00', '23:00'
		],
		sLabelFormat = sLabelFormat || 'HH:mm'
		sValueFormat = sValueFormat || 'k'
	;
	
	return _.map(aTimeList, function (sTime) {
		var
			oMoment = moment(sTime, 'HH:mm'),
			sText = oMoment.format(sLabelFormat),
			sValue = oMoment.format(sValueFormat)
		;
		return {text: sText, value: sValue};
	});
};

/**
 * Generates a list of time to display in create/edit event popup.
 * 
 * @param {string} sTimeFormatMoment
 * @returns {Array}
 */
CalendarUtils.getTimeListStepHalfHour = function (sTimeFormatMoment)
{
	var aTimeList = [
		'00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30',
		'05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
		'10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
		'15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
		'20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
	];
	
	return _.map(aTimeList, function (sTime) {
		var
			oMoment = moment(sTime, 'HH:mm'),
			sText = oMoment.format(sTimeFormatMoment)
		;
		return {text: sText, value: sText};
	});
};

/**
 * @param {string} dateFormat
 * 
 * @return string
 */
CalendarUtils.getDateFormatForDatePicker = function (dateFormat)
{
	//'MM/DD/YYYY' -> 'mm/dd/yy'
	//'DD/MM/YYYY' -> 'dd/mm/yy'
	//'DD Month YYYY' -> 'dd MM yy'
	return dateFormat.replace('MM', 'mm').replace('DD', 'dd').replace('YYYY', 'yy').replace('Month', 'MM');
};

module.exports = CalendarUtils;


/***/ }),

/***/ "injE":
/*!************************************************!*\
  !*** ./modules/CoreWebclient/js/utils/Date.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
			
	DateUtils = {}
;

DateUtils.getMonthNamesArray = function ()
{
	var
		aMonthes = TextUtils.i18n('COREWEBCLIENT/LIST_MONTH_NAMES').split(' '),
		iLen = 12,
		iIndex = aMonthes.length
	;
	
	for (; iIndex < iLen; iIndex++)
	{
		aMonthes[iIndex] = '';
	}
	
	return aMonthes;
};

/**
 * @param {number} iMonth
 * @param {number} iYear
 * 
 * @return {number}
 */
DateUtils.daysInMonth = function (iMonth, iYear)
{
	if (0 < iMonth && 13 > iMonth && 0 < iYear)
	{
		return new Date(iYear, iMonth, 0).getDate();
	}

	return 31;
};

module.exports = DateUtils;


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


/***/ }),

/***/ "yKBN":
/*!*************************************************************!*\
  !*** ./modules/CoreWebclient/js/views/CPageSwitcherView.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
	
	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp")
;

/**
 * @constructor
 * @param {number} iCount
 * @param {number} iPerPage
 */
function CPageSwitcherView(iCount, iPerPage)
{
	this.bShown = false;
	
	this.currentPage = ko.observable(1);
	this.count = ko.observable(iCount);
	this.perPage = ko.observable(iPerPage);
	this.firstPage = ko.observable(1);
	this.lastPage = ko.observable(1);

	this.pagesCount = ko.computed(function () {
		var iCount = this.perPage() > 0 ? Math.ceil(this.count() / this.perPage()) : 0;
		return (iCount > 0) ? iCount : 1;
	}, this);

	ko.computed(function () {

		var
			iAllLimit = 20,
			iLimit = 4,
			iPagesCount = this.pagesCount(),
			iCurrentPage = this.currentPage(),
			iStart = iCurrentPage,
			iEnd = iCurrentPage
		;

		if (iPagesCount > 1)
		{
			while (true)
			{
				iAllLimit--;
				
				if (1 < iStart)
				{
					iStart--;
					iLimit--;
				}

				if (0 === iLimit)
				{
					break;
				}

				if (iPagesCount > iEnd)
				{
					iEnd++;
					iLimit--;
				}

				if (0 === iLimit)
				{
					break;
				}

				if (0 === iAllLimit)
				{
					break;
				}
			}
		}

		this.firstPage(iStart);
		this.lastPage(iEnd);
		
	}, this);

	this.visibleFirst = ko.computed(function () {
		return (this.firstPage() > 1);
	}, this);

	this.visibleLast = ko.computed(function () {
		return (this.lastPage() < this.pagesCount());
	}, this);

	this.clickPage = _.bind(this.clickPage, this);

	this.pages = ko.computed(function () {
		var
			iIndex = this.firstPage(),
			aPages = []
		;

		if (this.firstPage() < this.lastPage())
		{
			for (; iIndex <= this.lastPage(); iIndex++)
			{
				aPages.push({
					number: iIndex,
					current: (iIndex === this.currentPage()),
					clickFunc: this.clickPage
				});
			}
		}

		return aPages;
	}, this);
	
	if (!App.isMobile())
	{
		this.hotKeysBind();
	}
}

CPageSwitcherView.prototype.ViewTemplate = 'CoreWebclient_PageSwitcherView';

CPageSwitcherView.prototype.hotKeysBind = function ()
{
	$(document).on('keydown', $.proxy(function(ev) {
		if (this.bShown && !Utils.isTextFieldFocused())
		{
			var sKey = ev.keyCode;
			if (ev.ctrlKey && sKey === Enums.Key.Left)
			{
				this.clickPreviousPage();
			}
			else if (ev.ctrlKey && sKey === Enums.Key.Right)
			{
				this.clickNextPage();
			}
		}
	},this));
};

CPageSwitcherView.prototype.hide = function ()
{
	this.bShown = false;
};

CPageSwitcherView.prototype.show = function ()
{
	this.bShown = true;
};

CPageSwitcherView.prototype.clear = function ()
{
	this.currentPage(1);
	this.count(0);
};

/**
 * @param {number} iCount
 */
CPageSwitcherView.prototype.setCount = function (iCount)
{
	this.count(iCount);
	if (this.currentPage() > this.pagesCount())
	{
		this.currentPage(this.pagesCount());
	}
};

/**
 * @param {number} iPage
 * @param {number} iPerPage
 */
CPageSwitcherView.prototype.setPage = function (iPage, iPerPage)
{
	this.perPage(iPerPage);
	if (iPage > this.pagesCount())
	{
		this.currentPage(this.pagesCount());
	}
	else
	{
		this.currentPage(iPage);
	}
};

/**
 * @param {Object} oPage
 */
CPageSwitcherView.prototype.clickPage = function (oPage)
{
	var iPage = oPage.number;
	if (iPage < 1)
	{
		iPage = 1;
	}
	if (iPage > this.pagesCount())
	{
		iPage = this.pagesCount();
	}
	this.currentPage(iPage);
};

CPageSwitcherView.prototype.clickFirstPage = function ()
{
	this.currentPage(1);
};

CPageSwitcherView.prototype.clickPreviousPage = function ()
{
	var iPrevPage = this.currentPage() - 1;
	if (iPrevPage < 1)
	{
		iPrevPage = 1;
	}
	this.currentPage(iPrevPage);
};

CPageSwitcherView.prototype.clickNextPage = function ()
{
	var iNextPage = this.currentPage() + 1;
	if (iNextPage > this.pagesCount())
	{
		iNextPage = this.pagesCount();
	}
	this.currentPage(iNextPage);
};

CPageSwitcherView.prototype.clickLastPage = function ()
{
	this.currentPage(this.pagesCount());
};

module.exports = CPageSwitcherView;


/***/ }),

/***/ "T+dd":
/*!*******************************************!*\
  !*** ./modules/MailWebclient/js/enums.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	Enums = {}
;

/**
 * @enum {string}
 */
Enums.FolderFilter = {
	'Flagged': 'flagged',
	'Unseen': 'unseen'
};

/**
 * @enum {number}
 */
Enums.FolderTypes = {
	'Inbox': 1,
	'Sent': 2,
	'Drafts': 3,
	'Spam': 4,
	'Trash': 5,
	'Virus': 6,
	'Starred': 7,
	'Template': 8,
	'System': 9,
	'User': 10,
	'AllInboxes': 11
};

Enums.SearchFoldersMode = {
	Current: '',
	Sub: 'sub',
	All: 'all'
};

/**
 * @enum {number}
 */
Enums.Importance = {
	'Low': 5,
	'Normal': 3,
	'High': 1
};

/**
 * @enum {number}
 */
Enums.Sensitivity = {
	'Nothing': 0,
	'Confidential': 1,
	'Private': 2,
	'Personal': 3
};

/**
 * @enum {string}
 */
Enums.AnotherMessageComposedAnswer = {
	'Discard': 'Discard',
	'SaveAsDraft': 'SaveAsDraft',
	'Cancel': 'Cancel'
};

/**
 * @enum {string}
 */
Enums.ReplyType = {
	'Reply': 'reply',
	'ReplyAll': 'reply-all',
	'Resend': 'resend',
	'Forward': 'forward',
	'ForwardAsAttach': 'eml'
};

Enums.UseSignature = {
	'Off': '0',
	'On': '1'
};

Enums.MailErrors = {
	'CannotMoveMessageQuota': 4008
};

/**
 * @enum {string}
 */
Enums.ServerOwnerType = {
	'Account': 'account',
	'Tenant': 'tenant',
	'SuperAdmin': 'superadmin'
};

/**
 * @enum {string}
 */
Enums.StarredMessagesSource = {
	InboxOnly: 'inbox_only',
	AllFolders: 'all_folders'
};

if (typeof window.Enums === 'undefined')
{
	window.Enums = {};
}

_.extendOwn(window.Enums, Enums);


/***/ }),

/***/ "UJpV":
/*!************************************************!*\
  !*** ./modules/MailWebclient/js/koBindings.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	ComposeMessageToAddressesFunc = ModulesManager.run('MailWebclient', 'getComposeMessageToAddresses')
;

if (_.isFunction(ComposeMessageToAddressesFunc))
{
	ko.bindingHandlers.makeLinkComposeMailTo = {
		'update': function (oElement, fValueAccessor, fAllBindingsAccessor, oViewModel, bindingContext) {
			var
				$Element = $(oElement),
				sFullEmail = fValueAccessor()
			;

			$Element.show();
			if (!$Element.hasClass('button'))
			{
				$Element.addClass('link');
			}
			$Element.click(function () {
				ComposeMessageToAddressesFunc(sFullEmail);
			});
		}
	};
}

ko.bindingHandlers.moveToFolderFilter = {

	'init': function (oElement, fValueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var
			jqElement = $(oElement),
			oCommand = fValueAccessor(),
			jqContainer = $(oElement).find(oCommand['container']),
			aOptions = _.isArray(oCommand['options']) ? oCommand['options'] : oCommand['options'](),
			sFolderName = oCommand['value'] ? oCommand['value']() : '',
			oFolderOption = _.find(aOptions, function (oOption) {
				return oOption[oCommand['optionsValue']] === sFolderName;
			})
		;

		if (!oFolderOption)
		{
			sFolderName = '';
			oCommand['value']('');
		}

		jqElement.removeClass('expand');
		
		jqContainer.empty();

		_.each(aOptions, function (oOption) {
			var jqOption = $('<span class="item"></span>')
				.text(oOption[oCommand['optionsText']])
				.data('value', oOption[oCommand['optionsValue']]);

			if (sFolderName === oOption[oCommand['optionsValue']])
			{
				jqOption.addClass('selected');
			}
			
			oOption['jq'] = jqOption;
			
			jqContainer.append(jqOption);
		});
		
		jqContainer.on('click', '.item', function () {
			var sFolderName = $(this).data('value');
			oCommand['value'](sFolderName);
		});

		jqElement.click(function () {
			jqElement.toggleClass('expand');

			if (jqElement.hasClass('expand'))
			{
				_.defer(function () {
					$(document).one('click', function () {
						jqElement.removeClass('expand');
					});
				});
			}
		});
	},
	'update': function (oElement, fValueAccessor) {
		var
			jqElement = $(oElement),
			oCommand = fValueAccessor(),
			aOptions = _.isArray(oCommand['options']) ? oCommand['options'] : oCommand['options'](),
			sFolderName = oCommand['value'] ? oCommand['value']() : '',
			oFolderOption = _.find(aOptions, function (oOption) {
				return oOption[oCommand['optionsValue']] === sFolderName;
			}),
			jqText = jqElement.find('.link')
		;
		
		_.each(aOptions, function (oOption) {
			if (oOption['jq'])
			{
				oOption['jq'].toggleClass('selected', sFolderName === oOption[oCommand['optionsValue']]);
			}
		});
		
		if (oFolderOption)
		{
			jqText.text($.trim(oFolderOption[oCommand['optionsText']]));
		}
	}
};


/***/ }),

/***/ "WBAn":
/*!**************************************************************!*\
  !*** ./modules/MailWebclient/js/popups/CreateFolderPopup.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
	
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	
	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
	
	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	Ajax = __webpack_require__(/*! modules/MailWebclient/js/Ajax.js */ "QaEg"),
	MailCache = __webpack_require__(/*! modules/MailWebclient/js/Cache.js */ "F0Fd")
;

/**
 * @constructor
 */
function CCreateFolderPopup()
{
	CAbstractPopup.call(this);
	
	this.isCreating = ko.observable(false);
	MailCache.folderListLoading.subscribe(function () {
		var bListLoading = MailCache.folderListLoading.indexOf(MailCache.editedFolderList().iAccountId) !== -1;
		if (!bListLoading && this.isCreating())
		{
			if (_.isFunction(this.fCallback))
			{
				this.fCallback(this.folderName(), this.parentFolder());
			}
			this.isCreating(false);
			this.closePopup();
		}
	}, this);

	this.options = ko.observableArray([]);

	this.parentFolder = ko.observable('');
	this.folderName = ko.observable('');
	this.folderNameFocus = ko.observable(false);
	
	this.fCallback = null;

	this.defaultOptionsAfterRender = Utils.defaultOptionsAfterRender;
}

_.extendOwn(CCreateFolderPopup.prototype, CAbstractPopup.prototype);

CCreateFolderPopup.prototype.PopupTemplate = 'MailWebclient_Settings_CreateFolderPopup';

/**
 * @param {Function} fCallback
 */
CCreateFolderPopup.prototype.onOpen = function (fCallback)
{
	this.options(MailCache.editedFolderList().getOptions(TextUtils.i18n('MAILWEBCLIENT/LABEL_NO_PARENT_FOLDER'), true, false, true));
	
	this.fCallback = fCallback;
	this.folderName('');
	this.folderNameFocus(true);
};

CCreateFolderPopup.prototype.create = function ()
{
	var
		sParentFolder = (this.parentFolder() === '' ? MailCache.editedFolderList().sNamespaceFolder : this.parentFolder()),
		oParameters = {
			'AccountID': AccountList.editedId(),
			'FolderNameInUtf8': this.folderName(),
			'FolderParentFullNameRaw': sParentFolder,
			'Delimiter': MailCache.editedFolderList().sDelimiter
		}
	;

	this.folderNameFocus(false);
	this.isCreating(true);

	Ajax.send('CreateFolder', oParameters, this.onCreateFolderResponse, this);
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CCreateFolderPopup.prototype.onCreateFolderResponse = function (oResponse, oRequest)
{
	if (!oResponse.Result)
	{
		this.isCreating(false);
		Api.showErrorByCode(oResponse, TextUtils.i18n('MAILWEBCLIENT/ERROR_CREATE_FOLDER'));
	}
	else
	{
		MailCache.getFolderList(AccountList.editedId());
	}
};

CCreateFolderPopup.prototype.cancelPopup = function ()
{
	if (!this.isCreating())
	{
		if (_.isFunction(this.fCallback))
		{
			this.fCallback('', '');
		}
		this.closePopup();
	}
};

module.exports = new CCreateFolderPopup();


/***/ }),

/***/ "7+7L":
/*!************************************************!*\
  !*** ./modules/MailWebclient/js/utils/Date.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
	UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV"),
	moment = __webpack_require__(/*! moment */ "sdEb"),
	DateUtils = {},
	dateFormatForBackEnd  = 'YYYY.MM.DD'
;

DateUtils.formattedDateSearchHighlightedInput = function(inputString) 
{
	const userDateFormatMoment = Utils.getDateFormatForMoment(UserSettings.dateFormat());

	const dateRegex = /date:([^/]*)(\/([^/]*))?/;
	const match = inputString.match(dateRegex);

	let dateStart = '';
	let dateEnd = '';

	if (match) {
		const dateStartMoment = moment(match[1], dateFormatForBackEnd);
		dateStart = dateStartMoment.isValid() ? dateStartMoment.format(userDateFormatMoment) : match[1];

		const dateEndMoment = moment(match[3], dateFormatForBackEnd);
		dateEnd = dateEndMoment.isValid() ? dateEndMoment.format(userDateFormatMoment) : match[3];
	}

	if (!dateStart && !dateEnd) return inputString;

	const regex = /(\w+):(\S+)/g;
	const matches = inputString.match(regex);
	const inputStringSplit = [];

	if (matches) {
		matches.forEach((match) => {
			const parts = match.split(':');
			const secondPart = parts[0] === 'date' ? dateStart + ' - ' + dateEnd : parts[1];
			inputStringSplit.push(parts[0] + ':' + secondPart);
		});
	}

	return inputStringSplit.join(' ');
}

DateUtils.changeDateStartAndDateEndformatForSend = function (dateStartClientFormat, dateEndClientFormat) 
{
	const dateStartMoment = moment(dateStartClientFormat?.trim(), Utils.getDateFormatForMoment(UserSettings.dateFormat()));
	const dateEndMoment = moment(dateEndClientFormat?.trim(), Utils.getDateFormatForMoment(UserSettings.dateFormat()));

	const dateStartServerFormat = dateStartMoment.isValid() && dateStartMoment.format(dateFormatForBackEnd) || '';
	const dateEndServerFormat = dateEndMoment.isValid() && dateEndMoment.format(dateFormatForBackEnd) || '';

	return [dateStartServerFormat, dateEndServerFormat];
}

module.exports = DateUtils;


/***/ }),

/***/ "zwBT":
/*!***********************************************************!*\
  !*** ./modules/MailWebclient/js/views/CFolderListView.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),

	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),

	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	Routing = __webpack_require__(/*! modules/CoreWebclient/js/Routing.js */ "W66n"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
	UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV"),

	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
	CreateFolderPopup = __webpack_require__(/*! modules/MailWebclient/js/popups/CreateFolderPopup.js */ "WBAn"),

	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	MailCache = __webpack_require__(/*! modules/MailWebclient/js/Cache.js */ "F0Fd"),
	Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy")
;

/**
 * @constructor
 */
function CFolderListView()
{
	this.folderList = MailCache.folderList;

	this.folderFullName = ko.computed(function () {
		var oFolder = MailCache.getCurrentFolder();
		return oFolder ? oFolder.fullName() : '';
	}, this);
	this.unifiedInboxAllowed = AccountList.unifiedInboxAllowed;
	this.oUnifiedInbox = MailCache.oUnifiedInbox;

	this.manageFoldersHash = ko.computed(function () {
		if (ModulesManager.isModuleEnabled('SettingsWebclient'))
		{
			var
				oCurrentAccount = AccountList.getCurrent()
			;
			if (oCurrentAccount && oCurrentAccount.allowManageFolders())
			{
				return Routing.buildHashFromArray(['settings', 'mail-accounts', 'account', oCurrentAccount.hash(), 'folders']);
			}
		}
		return '#';
	}, this);

	this.quotaProc = ko.observable(-1);
	this.quotaDesc = ko.observable('');
	this.bShowQuotaBarTextAsTooltip = UserSettings.ShowQuotaBarTextAsTooltip;

	if (UserSettings.ShowQuotaBar)
	{
		ko.computed(function () {

			MailCache.quotaChangeTrigger();

			var
				oAccount = AccountList.getCurrent(),
				iQuota = oAccount ? oAccount.quota() : 0,
				iUsed = oAccount ? oAccount.usedSpace() : 0,
				iProc = 0 < iQuota ? Math.ceil((iUsed / iQuota) * 100) : -1
			;

			iProc = 100 < iProc ? 100 : iProc;

			this.quotaProc(iProc);
			this.quotaDesc(-1 < iProc ?
				TextUtils.i18n('COREWEBCLIENT/INFO_QUOTA', {
					'PROC': iProc,
					'QUOTA': TextUtils.getFriendlySize(iQuota * 1024)
				}) : '');

			if (UserSettings.QuotaWarningPerc > 0 && iProc !== -1 && UserSettings.QuotaWarningPerc > (100 - iProc))
			{
				Screens.showError(TextUtils.i18n('COREWEBCLIENT/WARNING_QUOTA_ALMOST_REACHED'), true);
			}

			return true;

		}, this);
	}

	this.visibleNewFolderButton = ko.computed(function () {
		return Settings.AllowAddNewFolderOnMainScreen && this.folderList().collection().length > 0;
	}, this);

	this.underNewMessageButtonControllers = ko.observableArray([]);
	this.underInboxFolderControllers = ko.observableArray([]);
	this.folderListControllers = ko.computed(function () {
		return this.underNewMessageButtonControllers().concat(this.underInboxFolderControllers());
	}, this);
	App.broadcastEvent('MailWebclient::RegisterFolderListController', _.bind(function (controller, place) {
		this.registerController(controller, place);
	}, this));
}

CFolderListView.prototype.ViewTemplate = 'MailWebclient_FoldersView';

CFolderListView.prototype.onShow = function ()
{
	this.folderListControllers().forEach(controller => {
		if (_.isFunction(controller.onShow)) {
			controller.onShow();
		}
	});
};

CFolderListView.prototype.onRoute = function (aParams)
{
	this.folderListControllers().forEach(controller => {
		if (_.isFunction(controller.onRoute)) {
			controller.onRoute(aParams);
		}
	});
};

CFolderListView.prototype.addNewFolder = function ()
{
	Popups.showPopup(CreateFolderPopup);
};

/**
 * @param {Object} controller
 * @param {string} place
 */
CFolderListView.prototype.registerController = function (controller, place) {
	switch (place) {
		case 'UnderNewMessageButton':
			this.underNewMessageButtonControllers.push(controller);
			break;
		case 'UnderInboxFolder':
			this.underInboxFolderControllers.push(controller);
			break;
	}
};

module.exports = CFolderListView;


/***/ }),

/***/ "fveu":
/*!*****************************************************!*\
  !*** ./modules/MailWebclient/js/views/CMailView.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	ko = __webpack_require__(/*! knockout */ "p09A"),

	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),

	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	Routing = __webpack_require__(/*! modules/CoreWebclient/js/Routing.js */ "W66n"),
	WindowOpener = __webpack_require__(/*! modules/CoreWebclient/js/WindowOpener.js */ "mGms"),

	CAbstractScreenView = __webpack_require__(/*! modules/CoreWebclient/js/views/CAbstractScreenView.js */ "doeu"),

	ComposeUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Compose.js */ "B5X4"),
	LinksUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Links.js */ "CPab"),

	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	MailCache = __webpack_require__(/*! modules/MailWebclient/js/Cache.js */ "F0Fd"),
	Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy"),

	CFolderListView = __webpack_require__(/*! modules/MailWebclient/js/views/CFolderListView.js */ "zwBT"),
	CMessageListView = __webpack_require__(/*! modules/MailWebclient/js/views/CMessageListView.js */ "q9v7"),
	MessagePaneView = __webpack_require__(/*! modules/MailWebclient/js/views/MessagePaneView.js */ "kb14")
;

/**
 * @constructor
 */
function CMailView()
{
	CAbstractScreenView.call(this, 'MailWebclient');

	App.broadcastEvent('MailWebclient::ConstructView::before', {'Name': this.ViewConstructorName, 'View': this, 'MailCache': MailCache});

	this.browserTitle = ko.computed(function () {
		return AccountList.getEmail() + ' - ' + TextUtils.i18n('MAILWEBCLIENT/HEADING_BROWSER_TAB');
	});

	this.folderList = MailCache.folderList;
	this.domFoldersMoveTo = ko.observable(null);

	this.openMessageInNewWindowBound = _.bind(this.openMessageInNewWindow, this);

	this.oFolderList = new CFolderListView();
	this.isUnifiedFolderCurrent = MailCache.oUnifiedInbox.selected;
	this.oBaseMessageList = new CMessageListView(this.openMessageInNewWindowBound);
	this.messageList = ko.observable(this.oBaseMessageList);
	this.isSearchMultiFolders = ko.computed(function () {
		return this.messageList().searchFoldersMode() === Enums.SearchFoldersMode.Sub || this.messageList().searchFoldersMode() === Enums.SearchFoldersMode.All;
	}, this);

	this.oBaseMessagePaneView = MessagePaneView;
	this.messagePane = ko.observable(this.oBaseMessagePaneView);
	this.messagePane().openMessageInNewWindowBound = this.openMessageInNewWindowBound;
	this.messagePane.subscribe(function () {
		this.bindMessagePane();
		this.messagePane().expandMessagePaneWidth = this.expandMessagePaneWidth;
	}, this);
	
	this.expandListPaneWidth = ko.observable(false);
	this.expandMessagePaneWidth = ko.observable(false);
	this.messagePane().expandMessagePaneWidth = this.expandMessagePaneWidth;
	MailCache.currentMessage.subscribe(function () {
		if (!MailCache.currentMessage()) {
			this.expandMessagePaneWidth(false);
		}
	}, this);

	this.isEnableGroupOperations = ko.computed(() => {
		return this.messageList().isEnableGroupOperations();
	});

	this.sCustomBigButtonModule = '';
	this.fCustomBigButtonHandler = null;
	this.customBigButtonText = ko.observable('');
	this.bigButtonCommand = Utils.createCommand(this, function () {
		if (_.isFunction(this.fCustomBigButtonHandler))
		{
			this.fCustomBigButtonHandler();
		}
		else
		{
			this.executeCompose();
		}
	});
	this.bigButtonText = ko.computed(function () {
		if (this.customBigButtonText() !== '')
		{
			return this.customBigButtonText();
		}
		return TextUtils.i18n('MAILWEBCLIENT/ACTION_NEW_MESSAGE');
	}, this);

	this.isTemplateFolder = ko.computed(function () {
		return MailCache.isTemplateFolder(MailCache.getCurrentFolderFullname());
	}, this);

	this.checkMailCommand = Utils.createCommand(this, this.executeCheckMail);
	this.checkMailIndicator = ko.observable(true).extend({ throttle: 50 });
	ko.computed(function () {
		this.checkMailIndicator(MailCache.checkMailStarted() || MailCache.messagesLoading());
	}, this);
	this.customModulesDisabledMark = ko.observableArray([]);
	this.visibleMarkTool = ko.computed(function () {
		return !this.isTemplateFolder() && !Types.isNonEmptyArray(this.customModulesDisabledMark());
	}, this);
	this.markAsReadCommand = Utils.createCommand(this.messageList(), () => {
		this.messageList().executeMarkAsRead();
	}, this.isEnableGroupOperations);
	this.markAsUnreadCommand = Utils.createCommand(this.messageList(), () => {
		this.messageList().executeMarkAsUnread();
	}, this.isEnableGroupOperations);
	this.markAllReadCommand = Utils.createCommand(this.messageList(), () => {
		this.messageList().executeMarkAllRead();
	});
	this.customModulesDisabledMove = ko.observableArray([]);
	this.visibleMoveTool = ko.computed(function () {
		return !MailCache.oUnifiedInbox.selected() && !Types.isNonEmptyArray(this.customModulesDisabledMove());
	}, this);

	this.needToCopyDraggedItems = ko.observable(false);

	this.moveToFolderTemplate = 'MailWebclient_Messages_MoveButtonView'; // can be override by other modules
	this.moveToFolderCommand = Utils.createCommand(this, function () {}, this.isEnableGroupOperations);

	this.deleteCommand = Utils.createCommand(this.messageList(), () => {
		this.messageList().executeDelete();
	}, this.isEnableGroupOperations);
	this.selectedCount = ko.computed(function () {
		return this.messageList().checkedUids().length;
	}, this);
	this.emptyTrashCommand = Utils.createCommand(MailCache, MailCache.executeEmptyTrash, () => this.messageList().isNotEmptyList());
	this.emptySpamCommand = Utils.createCommand(MailCache, MailCache.executeEmptySpam, () => this.messageList().isNotEmptyList());
	this.spamCommand = Utils.createCommand(this.messageList(), () => {
		this.messageList().executeSpam();
	}, this.isEnableGroupOperations);
	this.notSpamCommand = Utils.createCommand(this.messageList(), () => {
		this.messageList().executeNotSpam();
	}, this.isEnableGroupOperations);

	this.isSpamFolder = ko.computed(function () {
		return MailCache.getCurrentFolderType() === Enums.FolderTypes.Spam;
	}, this);

	this.customModulesDisabledSpam = ko.observableArray([]);
	this.allowedSpamAction = ko.computed(function () {
		return Settings.AllowSpamFolder && this.folderList().spamFolder() &&
				!this.isSpamFolder() && !this.isTemplateFolder() &&
				!Types.isNonEmptyArray(this.customModulesDisabledSpam());
	}, this);

	this.allowedNotSpamAction = ko.computed(function () {
		return Settings.AllowSpamFolder && this.isSpamFolder() && !this.isTemplateFolder();
	}, this);

	this.isTrashFolder = ko.computed(function () {
		return MailCache.getCurrentFolderType() === Enums.FolderTypes.Trash;
	}, this);

	if (Settings.HorizontalLayout)
	{
		$('html').addClass('layout-horiz-split');
	}

	App.subscribeEvent('CoreWebclient::GetDebugInfo', _.bind(function (oParams) {
		oParams.Info.push('checkMailStarted: ' + MailCache.checkMailStarted() + ', messagesLoading: ' + MailCache.messagesLoading());
	}, this));

	App.broadcastEvent('MailWebclient::ConstructView::after', {'Name': this.ViewConstructorName, 'View': this});
}

_.extendOwn(CMailView.prototype, CAbstractScreenView.prototype);

CMailView.prototype.ViewTemplate = Settings.HorizontalLayout ? 'MailWebclient_MailHorizontalLayoutView' : 'MailWebclient_MailView';
CMailView.prototype.ViewConstructorName = 'CMailView';

/**
 * Checks if there are changes in Mail screen.
 * @returns {Boolean}
 */
CMailView.prototype.hasUnsavedChanges = function ()
{
	return this.messagePane() && _.isFunction(this.messagePane().hasUnsavedChanges) && this.messagePane().hasUnsavedChanges();
};

/**
 * Discards changes in Mail screen.
 */
CMailView.prototype.discardChanges = function ()
{
	if (this.messagePane() && _.isFunction(this.messagePane().discardChanges))
	{
		this.messagePane().discardChanges();
	}
};

CMailView.prototype.setCustomPreviewPane = function (sModuleName, oPreviewPane)
{
	if (this.messagePane().__customModuleName !== sModuleName)
	{
		if (_.isFunction(this.messagePane().onHide))
		{
			this.messagePane().onHide();
		}

		oPreviewPane.__customModuleName = sModuleName;
		this.messagePane(oPreviewPane);

		if (_.isFunction(this.messagePane().onShow))
		{
			this.messagePane().onShow();
		}
	}
};

CMailView.prototype.removeCustomPreviewPane = function (sModuleName)
{
	if (this.messagePane().__customModuleName === sModuleName)
	{
		if (_.isFunction(this.messagePane().onHide))
		{
			this.messagePane().onHide();
		}

		this.messagePane(this.oBaseMessagePaneView);

		if (_.isFunction(this.messagePane().onShow))
		{
			this.messagePane().onShow();
		}
	}
};

CMailView.prototype.setCustomMessageList = function (customModuleName, customMessageList)
{
	if (this.messageList().__customModuleName !== customModuleName) {
		customMessageList.__customModuleName = customModuleName;
		this.changeMessageList(customMessageList);
	}
};

CMailView.prototype.removeCustomMessageList = function (customModuleName)
{
	if (this.messageList().__customModuleName === customModuleName) {
		this.changeMessageList(this.oBaseMessageList);
	}
};

CMailView.prototype.changeMessageList = function (newMessageList)
{
	if (_.isFunction(this.messageList().onHide)) {
		this.messageList().onHide();
	}
	if (_.isFunction(this.messageList().unbind)) {
		this.messageList().unbind();
	}

	this.messageList(newMessageList);

	if (_.isFunction(this.messageList().onBind)) {
		this.messageList().onBind(this.$viewDom);
	}

	if (_.isFunction(this.messageList().onShow)) {
		this.messageList().onShow();
	}
};

CMailView.prototype.setCustomBigButton = function (sModuleName, fHandler, sText)
{
	this.sCustomBigButtonModule = sModuleName;
	this.fCustomBigButtonHandler = fHandler;
	this.customBigButtonText(sText);
};

CMailView.prototype.removeCustomBigButton = function (sModuleName)
{
	if (this.sCustomBigButtonModule === sModuleName)
	{
		this.sCustomBigButtonModule = '';
		this.fCustomBigButtonHandler = null;
		this.customBigButtonText('');
	}
};

CMailView.prototype.resetDisabledTools = function (sModuleName, aDisabledTools)
{
	if ($.inArray('spam', aDisabledTools) !== -1)
	{
		this.customModulesDisabledSpam(_.union(this.customModulesDisabledSpam(), [sModuleName]));
	}
	else
	{
		this.customModulesDisabledSpam(_.without(this.customModulesDisabledSpam(), sModuleName));
	}
	if ($.inArray('move', aDisabledTools) !== -1)
	{
		this.customModulesDisabledMove(_.union(this.customModulesDisabledMove(), [sModuleName]));
	}
	else
	{
		this.customModulesDisabledMove(_.without(this.customModulesDisabledMove(), sModuleName));
	}
	if ($.inArray('mark', aDisabledTools) !== -1)
	{
		this.customModulesDisabledMark(_.union(this.customModulesDisabledMark(), [sModuleName]));
	}
	else
	{
		this.customModulesDisabledMark(_.without(this.customModulesDisabledMark(), sModuleName));
	}
};

CMailView.prototype.executeCompose = function ()
{
	ComposeUtils.composeMessage();
};

CMailView.prototype.executeCheckMail = function ()
{
	MailCache.checkMessageFlags();
	MailCache.executeCheckMail(true);
};

/**
 * @param {object} oMessage
 */
CMailView.prototype.openMessageInNewWindow = function (oMessage)
{
	if (oMessage && oMessage.longUid)
	{
		var
			iAccountId = oMessage.accountId(),
			sFolder = oMessage.folder(),
			sUid = oMessage.longUid(),
			oFolder = this.folderList().getFolderByFullName(sFolder),
			bDraftFolder = (oFolder?.type() === Enums.FolderTypes.Drafts),
			sHash = ''
		;

		if (this.isUnifiedFolderCurrent()) {
			sFolder = MailCache.oUnifiedInbox.fullName()
			bDraftFolder = false
		}
		if (bDraftFolder)
		{
			sHash = Routing.buildHashFromArray(LinksUtils.getComposeFromMessage('drafts', iAccountId, sFolder, sUid));
		}
		else
		{
			sHash = Routing.buildHashFromArray(LinksUtils.getViewMessage(iAccountId, sFolder, sUid));
			if (_.isFunction(this.messagePane().passReplyDataToNewTab))
			{
				this.messagePane().passReplyDataToNewTab(oMessage.longUid());
			}
		}

		WindowOpener.openTab('?message-newtab' + sHash);
	}
};

/**
 * @param {Object} oData
 * @param {Object} oEvent
 */
CMailView.prototype.resizeDblClick = function (oData, oEvent)
{
	Utils.calmEvent(oEvent);
	Utils.removeSelection();
	this.expandListPaneWidth(!this.expandListPaneWidth());
};

/**
 * @param {Array} aParams
 */
CMailView.prototype.onRoute = function (aParams)
{
	if (!AccountList.hasAccount())
	{
		Routing.replaceHash(['settings', 'mail-accounts', 'account', 'create']);
		return;
	}

	var oParams = LinksUtils.parseMailbox(aParams);

	AccountList.changeCurrentAccountByHash(oParams.AccountHash);

	if (_.isFunction(this.oFolderList.onRoute)) {
		this.oFolderList.onRoute(aParams);
	}
	this.messageList().onRoute(aParams);
	if (_.isFunction(this.messagePane().onRoute))
	{
		this.messagePane().onRoute(aParams, oParams);
	}

	if (oParams.MailtoCompose)
	{
		if (App.isMobile())
		{
			var aParams = LinksUtils.getComposeWithToField(aParams[2]);
			Routing.replaceHash(aParams);
			setTimeout(function () {
				Routing.clearPreviousHash();
			}, 0);
		}
		else
		{
			ComposeUtils.composeMessageToAddresses(aParams[2]);
			Routing.replaceHash(LinksUtils.getMailbox());
		}
	}
};

CMailView.prototype.onShow = function ()
{
	if (_.isFunction(this.oFolderList.onShow)) {
		this.oFolderList.onShow();
	}
	this.messageList().onShow();
	if (_.isFunction(this.messagePane().onShow))
	{
		this.messagePane().onShow();
	}
};

CMailView.prototype.onHide = function ()
{
	this.messageList().onHide();
	if (_.isFunction(this.messagePane().onHide))
	{
		this.messagePane().onHide();
	}
};

CMailView.prototype.bindMessagePane = function ()
{
	if (_.isFunction(this.messagePane().onBind))
	{
		this.messagePane().onBind(this.$viewDom);
		this.messagePane().__bound = true;
	}
};

CMailView.prototype.onBind = function ()
{
	var oMessageList = this.messageList();

	oMessageList.onBind(this.$viewDom);
	this.bindMessagePane();

	$(this.domFoldersMoveTo()).on('click', 'span.folder', function (oEvent) {
		var sClickedFolder = $(this).data('folder');
		if (MailCache.getCurrentFolderFullname() !== sClickedFolder)
		{
			if (oEvent.ctrlKey)
			{
				oMessageList.executeCopyToFolder(sClickedFolder);
			}
			else
			{
				oMessageList.executeMoveToFolder(sClickedFolder);
			}
		}
	});

	if (!App.isMobile())
	{
		this.hotKeysBind();
	}
};

CMailView.prototype.hotKeysBind = function ()
{
	$(document).on('keydown', $.proxy(function(ev) {
		var
			sKey = ev.keyCode,
			bComputed = ev && !ev.ctrlKey && !ev.altKey && !ev.shiftKey && !Utils.isTextFieldFocused() && this.shown(),
			oList = this.messageList(),
			oFirstMessage = oList.collection()[0],
			bGotoSearch = oFirstMessage && MailCache.currentMessage() && oFirstMessage.longUid() === MailCache.currentMessage().longUid()
		;

		if (bComputed && sKey === Enums.Key.s || bComputed && bGotoSearch && sKey === Enums.Key.Up)
		{
			ev.preventDefault();
			this.searchFocus();
		}
		else if (oList.isFocused() && ev && sKey === Enums.Key.Down && oFirstMessage)
		{
			ev.preventDefault();
			oList.isFocused(false);
			oList.routeForMessage(oFirstMessage);
		}
		else if (bComputed && sKey === Enums.Key.n)
		{
			this.executeCompose();
			ev.preventDefault();
		}
	},this));
};

/**
 * Method is used from Notes module
 * @param {string} sFolderName
 * @param {number} iUid
 */
CMailView.prototype.routeMessageView = function (sFolderName, iUid)
{
	Routing.setHash(LinksUtils.getMailbox(sFolderName, this.messageList().oPageSwitcher.currentPage(), iUid));
};

/**
 * @param {Object} oMessage
 * @param {boolean} ctrlOrCmdUsed
 */
CMailView.prototype.dragAndDropHelper = function (oMessage, ctrlOrCmdUsed)
{
	if (oMessage)
	{
		oMessage.checked(true);
	}

	var
		oHelper = Utils.draggableItems(),
		aUids = this.messageList().checkedOrSelectedUids(),
		iCount = aUids.length
	;

	oHelper.data('p7-message-list-folder', MailCache.getCurrentFolderFullname());
	oHelper.data('p7-message-list-uids', aUids);

	this.needToCopyDraggedItems(ctrlOrCmdUsed);
	$('.count-text', oHelper).text(TextUtils.i18n('MAILWEBCLIENT/LABEL_DRAG_MESSAGES_PLURAL', {
		'COUNT': ctrlOrCmdUsed ? '+ ' + iCount : iCount
	}, null, iCount));

	return oHelper;
};

/**
 * @param {Object} oToFolder
 * @param {Object} oEvent
 * @param {Object} oUi
 */
CMailView.prototype.messagesDrop = function (oToFolder, oEvent, oUi)
{
	if (oToFolder)
	{
		var
			oHelper = oUi && oUi.helper ? oUi.helper : null,
			sFolder = oHelper ? oHelper.data('p7-message-list-folder') : '',
			aUids = oHelper ? oHelper.data('p7-message-list-uids') : null
		;

		if (sFolder && aUids)
		{
			Utils.uiDropHelperAnim(oEvent, oUi);
			if(this.needToCopyDraggedItems())
			{
				this.messageList().executeCopyToFolder(oToFolder.fullName());
			}
			else
			{
				this.messageList().executeMoveToFolder(oToFolder.fullName());
			}

			this.uncheckMessages();
		}
	}
};

CMailView.prototype.searchFocus = function ()
{
	if (this.messageList().selector.useKeyboardKeys() && !Utils.isTextFieldFocused())
	{
		this.messageList().isFocused(true);
	}
};

CMailView.prototype.onVolumerClick = function (oVm, oEv)
{
	oEv.stopPropagation();
};

CMailView.prototype.uncheckMessages = function ()
{
	_.each(MailCache.messages(), function(oMessage) {
		oMessage.checked(false);
	});
};

module.exports = CMailView;


/***/ }),

/***/ "q9v7":
/*!************************************************************!*\
  !*** ./modules/MailWebclient/js/views/CMessageListView.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	moment = __webpack_require__(/*! moment */ "sdEb"),
	
	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
	CoreDateUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Date.js */ "injE"),
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	Browser = __webpack_require__(/*! modules/CoreWebclient/js/Browser.js */ "dfnr"),
	CJua = __webpack_require__(/*! modules/CoreWebclient/js/CJua.js */ "qBBW"),
	CSelector = __webpack_require__(/*! modules/CoreWebclient/js/CSelector.js */ "vdUg"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	Routing = __webpack_require__(/*! modules/CoreWebclient/js/Routing.js */ "W66n"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
	UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV"),
	CDateModel = __webpack_require__(/*! modules/CoreWebclient/js/models/CDateModel.js */ "jNBr"),
	
	CPageSwitcherView = __webpack_require__(/*! modules/CoreWebclient/js/views/CPageSwitcherView.js */ "yKBN"),
	
	ComposeUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Compose.js */ "B5X4"),
	LinksUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Links.js */ "CPab"),
	MailUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Mail.js */ "WOsA"),
	DateUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Date.js */ "7+7L"),
	
	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	MailCache  = __webpack_require__(/*! modules/MailWebclient/js/Cache.js */ "F0Fd"),
	Settings  = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy"),

	CalendarUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Calendar.js */ "A3in")
;

__webpack_require__(/*! jquery-ui/ui/widgets/datepicker */ "okSt");

/**
 * @constructor
 * 
 * @param {Function} fOpenMessageInNewWindowBound
 */
function CMessageListView(fOpenMessageInNewWindowBound)
{
	this.disableMoveMessages = ko.computed(function () {
		var oFolder = MailCache.getCurrentFolder();
		return oFolder ? oFolder.disableMoveFrom() : true;
	}, this);
	this.bVisibleSortByTool = Settings.MessagesSortBy.Allow && Settings.MessagesSortBy.List.length > 0;
	this.sSortBy = Settings.MessagesSortBy.DefaultSortBy;
	this.iSortOrder = Settings.MessagesSortBy.DefaultSortOrder;
	this.sortBy = ko.observable(Settings.MessagesSortBy.DefaultSortBy);
	this.sortOrder = ko.observable(Settings.MessagesSortBy.DefaultSortOrder);
	this.aSortList = [];
	_.each(Settings.MessagesSortBy.List, function (oItem) {
		this.aSortList.push({
			sText: TextUtils.i18n('MAILWEBCLIENT/' + oItem.LangConst),
			sSortBy: oItem.SortBy
		});
	}.bind(this));

	this.uploaderArea = ko.observable(null);
	this.bDragActive = ko.observable(false);
	this.bDragActiveComp = ko.computed(function () {
		return this.bDragActive();
	}, this);

	this.openMessageInNewWindowBound = fOpenMessageInNewWindowBound;
	
	this.isFocused = ko.observable(false);

	this.messagesContainer = ko.observable(null);

	this.currentMessage = MailCache.currentMessage;
	this.currentMessage.subscribe(function () {
		this.isFocused(false);
		this.selector.itemSelected(this.currentMessage());
	}, this);

	this.folderList = MailCache.folderList;
	this.folderList.subscribe(function () {
		setTimeout(this.onFolderListSubscribe.bind(this));
	}, this);
	this.folderFullName = ko.observable('');
	this.folderType = ko.observable(Enums.FolderTypes.User);
	this.filters = ko.observable('');
	this.isStarredFolder = ko.computed(() => {
		return this.filters() === Enums.FolderFilter.Flagged;
	});
	this.isStarredInAllFolders = ko.computed(() => {
		return this.isStarredFolder()
			&& Settings.AllowChangeStarredMessagesSource
			&& Settings.StarredMessagesSource === Enums.StarredMessagesSource.AllFolders;
	});
	this.isStarredFolder.subscribe(() => {
		if (this.isStarredFolder()) {
			this.selectedSearchFoldersMode(this.isStarredInAllFolders() ? 'all' : '');
		}
	});

	this.allowAdvancedSearch = ko.computed(function () {
		return !ModulesManager.isModuleIncluded('MailNotesPlugin') || this.folderFullName() !== 'Notes';
	}, this);
	this.searchHighlightedInputFormatted = ko.observable('');
	this.searchHighlightedInput = ko.observable('');
	this.searchHighlightedInput.subscribe(() => {
		this.searchHighlightedInputFormatted(DateUtils.formattedDateSearchHighlightedInput(this.searchHighlightedInput()))
	})
	this.searchInput = ko.computed({
		read: () => {
			if (this.isStarredInAllFolders()) {
				return `${this.searchHighlightedInputFormatted()} folders:all`;
			}
			return this.searchHighlightedInputFormatted();
		},
		write: (value) => {
			if (this.isStarredInAllFolders()) {
				this.searchHighlightedInput(value.replace('folders:all', ''));
			} else {
				this.searchHighlightedInput(value);
			}
		}
	});
	this.searchInputFrom = ko.observable('');
	this.searchInputTo = ko.observable('');
	this.searchInputSubject = ko.observable('');
	this.searchInputText = ko.observable('');
	this.searchSpan = ko.observable('');
	this.highlightTrigger = ko.observable('');
	this.selectedSearchFoldersMode = ko.observable('');
	this.selectedSearchFoldersModeText = ko.computed(function () {
		if (this.selectedSearchFoldersMode() === Enums.SearchFoldersMode.Sub) {
			return TextUtils.i18n('MAILWEBCLIENT/LABEL_SEARCH_CURRENT_FOLDER_AND_SUBFOLDERS');
		}
		if (this.selectedSearchFoldersMode() === Enums.SearchFoldersMode.All) {
			return TextUtils.i18n('MAILWEBCLIENT/LABEL_SEARCH_ALL_FOLDERS');
		}
		return TextUtils.i18n('MAILWEBCLIENT/LABEL_SEARCH_CURRENT_FOLDER');
	}, this);

	this.uidList = MailCache.uidList;
	this.uidList.subscribe(function () {
		if (this.uidList().searchCountSubscription)
		{
			this.uidList().searchCountSubscription.dispose();
			this.uidList().searchCountSubscription = undefined;
		}
		this.uidList().searchCountSubscription = this.uidList().resultCount.subscribe(function () {
			if (this.uidList().resultCount() >= 0)
			{
				this.oPageSwitcher.setCount(this.uidList().resultCount());
			}
		}, this);
		
		if (this.uidList().resultCount() >= 0)
		{
			this.oPageSwitcher.setCount(this.uidList().resultCount());
		}
	}, this);

	this.useThreading = ko.computed(function () {
		var
			oAccount = AccountList.getCurrent(),
			oFolder = MailCache.getCurrentFolder(),
			bFolderWithoutThreads = oFolder && oFolder.withoutThreads(),
			bNotSearchOrFilters = this.uidList().search() === '' && this.uidList().filters() === ''
		;
		
		return oAccount && oAccount.threadingIsAvailable() && !bFolderWithoutThreads && bNotSearchOrFilters;
	}, this);

	this.collection = MailCache.messages;
	
	this._search = ko.observable('');
	this.search = ko.computed({
		'read': function () {
			return $.trim(this._search());
		},
		'write': this._search,
		'owner': this
	});
	this.searchFoldersMode = ko.observable('');
	
	this.messageListParamsChanged = ko.observable(false).extend({'autoResetToFalse': 100});

	this.isEmptyList = ko.computed(function () {
		return this.collection().length === 0;
	}, this);

	this.isNotEmptyList = ko.computed(function () {
		return this.collection().length !== 0;
	}, this);

	this.isSearch = ko.computed(function () {
		return this.search().length > 0;
	}, this);

	this.isUnseenFilter = ko.computed(function () {
		return this.filters() === Enums.FolderFilter.Unseen;
	}, this);

	this.isLoading = MailCache.messagesLoading;

	this.isError = MailCache.messagesLoadingError;

	this.visibleInfoLoading = ko.computed(function () {
		return !this.isSearch() && this.isLoading();
	}, this);
	this.visibleInfoSearchLoading = ko.computed(function () {
		return this.isSearch() && this.isLoading();
	}, this);
	this.visibleInfoSearchList = ko.computed(function () {
		return this.isSearch() && !this.isUnseenFilter() && !this.isLoading() && !this.isEmptyList();
	}, this);
	this.visibleInfoMessageListEmpty = ko.computed(function () {
		return !this.isLoading() && !this.isSearch() && (this.filters() === '') && this.isEmptyList() && !this.isError();
	}, this);
	this.visibleInfoStarredFolderEmpty = ko.computed(function () {
		return !this.isLoading() && !this.isSearch() && this.isStarredFolder() && this.isEmptyList() && !this.isError();
	}, this);
	this.visibleInfoSearchEmpty = ko.computed(function () {
		return this.isSearch() && !this.isUnseenFilter() && this.isEmptyList() && !this.isError() && !this.isLoading();
	}, this);
	this.visibleInfoMessageListError = ko.computed(function () {
		return !this.isSearch() && this.isError();
	}, this);
	this.visibleInfoSearchError = ko.computed(function () {
		return this.isSearch() && this.isError();
	}, this);
	this.visibleInfoUnseenFilterList = ko.computed(function () {
		return this.isUnseenFilter() && (this.isLoading() || !this.isEmptyList());
	}, this);
	this.visibleInfoUnseenFilterEmpty = ko.computed(function () {
		return this.isUnseenFilter() && this.isEmptyList() && !this.isError() && !this.isLoading();
	}, this);

	this.allowClearSearch = ko.observable(true);
	this.searchText = ko.computed(function () {
		const
			textOptions = {
				'SEARCH': this.calculateSearchStringForDescription(),
				'FOLDER': MailCache.getCurrentFolder() ? TextUtils.encodeHtml(MailCache.getCurrentFolder().displayName()) : ''
			}
		;
		this.allowClearSearch(true);
		if (this.searchFoldersMode() === Enums.SearchFoldersMode.Sub) {
			if (MailCache.oUnifiedInbox.selected()) {
				return TextUtils.i18n('MAILWEBCLIENT/INFO_SEARCH_UNIFIED_SUBFOLDERS_RESULT', textOptions);
			}
			if ($.trim(this.search()) === 'folders:sub') {
				return TextUtils.i18n('MAILWEBCLIENT/INFO_MESSAGES_FROM_SUBFOLDERS', textOptions);
			}
			return TextUtils.i18n('MAILWEBCLIENT/INFO_SEARCH_SUBFOLDERS_RESULT', textOptions);
		}
		if (this.searchFoldersMode() === Enums.SearchFoldersMode.All) {
			if (MailCache.oUnifiedInbox.selected()) {
				return TextUtils.i18n('MAILWEBCLIENT/INFO_SEARCH_UNIFIED_ALL_FOLDERS_RESULT', textOptions);
			}
			if ($.trim(this.search()) === 'folders:all') {
				if (this.isStarredFolder()) {
					this.allowClearSearch(false);
				}
				return TextUtils.i18n('MAILWEBCLIENT/INFO_MESSAGES_FROM_ALL_FOLDERS', textOptions);
			}
			return TextUtils.i18n('MAILWEBCLIENT/INFO_SEARCH_ALL_FOLDERS_RESULT', textOptions);
		}
		return TextUtils.i18n('MAILWEBCLIENT/INFO_SEARCH_RESULT', textOptions);
	}, this);

	this.unseenFilterText = ko.computed(function () {
		if (this.search() === '')
		{
			return TextUtils.i18n('MAILWEBCLIENT/INFO_UNREAD_MESSAGES', {
				'FOLDER': MailCache.getCurrentFolder() ? TextUtils.encodeHtml(MailCache.getCurrentFolder().displayName()) : ''
			});
		}
		else
		{
			return TextUtils.i18n('MAILWEBCLIENT/INFO_UNREAD_MESSAGES_SEARCH_RESULT', {
				'SEARCH': this.calculateSearchStringForDescription(),
				'FOLDER': MailCache.getCurrentFolder() ? TextUtils.encodeHtml(MailCache.getCurrentFolder().displayName()) : ''
			});
		}
	}, this);

	this.unseenFilterEmptyText = ko.computed(function () {

		if (this.search() === '')
		{
			return TextUtils.i18n('MAILWEBCLIENT/INFO_NO_UNREAD_MESSAGES');
		}
		else
		{
			return TextUtils.i18n('MAILWEBCLIENT/INFO_NO_UNREAD_MESSAGES_FOUND');
		}
		
	}, this);

	this.isEnableGroupOperations = ko.observable(false).extend({'throttle': 250});

	this.selector = new CSelector(
		this.collection,
		_.bind(this.routeForMessage, this),
		_.bind(this.onDeletePress, this),
		_.bind(this.onMessageDblClick, this),
		_.bind(this.onEnterPress, this),
		null,
		false,
		false,
		false,
		false,
		false // don't select new item before routing executed
	);

	this.checkedUids = ko.computed(function () {
		var
			aChecked = this.selector.listChecked(),
			aCheckedUids = _.map(aChecked, function (oMessage) {
				return oMessage.longUid();
			}),
			oFolder = MailCache.getCurrentFolder(),
			aThreadCheckedUids = oFolder ? oFolder.getThreadCheckedUidsFromList(aChecked) : [],
			aUids = _.union(aCheckedUids, aThreadCheckedUids)
		;

		return aUids;
	}, this);
	
	this.checkedOrSelectedUids = ko.computed(function () {
		var aChecked = this.checkedUids();
		if (aChecked.length === 0 && MailCache.currentMessage() && _.isFunction(MailCache.currentMessage().deleted) && !MailCache.currentMessage().deleted())
		{
			aChecked = [MailCache.currentMessage().longUid()];
		}
		return aChecked;
	}, this);

	ko.computed(function () {
		this.isEnableGroupOperations(0 < this.selector.listCheckedOrSelected().length);
	}, this);

	this.checkAll = this.selector.koCheckAll();
	this.checkAllIncomplite = this.selector.koCheckAllIncomplete();

	this.pageSwitcherLocked = ko.observable(false);
	this.oPageSwitcher = new CPageSwitcherView(0, Settings.MailsPerPage);
	this.oPageSwitcher.currentPage.subscribe(function (iPage) {
		var
			sFolder = MailCache.getCurrentFolderFullname(),
			sUid = !App.isMobile() && this.currentMessage() ? this.currentMessage().longUid() : '',
			sSearch = this.search()
		;
		
		if (!this.pageSwitcherLocked())
		{
			this.changeRoutingForMessageList(sFolder, iPage, sUid, sSearch, this.filters(), this.sortBy(), this.sortOrder());
		}
	}, this);
	this.currentPage = ko.observable(0);
	
	// to the message list does not twitch
	if (Browser.firefox || Browser.ie)
	{
		this.listChangedThrottle = ko.observable(false).extend({'throttle': 10});
	}
	else
	{
		this.listChangedThrottle = ko.observable(false);
	}
	
	this.firstCompleteCollection = ko.observable(true);
	this.collection.subscribe(function () {
		if (this.collection().length > 0)
		{
			if (Types.isNonEmptyArray(this.aRouteParams))
			{
				this.onRoute(this.aRouteParams);
				this.aRouteParams = [];
			}
			else
			{
				this.firstCompleteCollection(false);
			}
		}
	}, this);
	this.listChanged = ko.computed(function () {
		return [
			this.firstCompleteCollection(),
			MailCache.currentAccountId(),
			this.folderFullName(),
			this.filters(),
			this.search(),
			this.oPageSwitcher.currentPage()
		];
	}, this);
	
	this.listChanged.subscribe(function() {
		this.listChangedThrottle(!this.listChangedThrottle());
	}, this);

	this.bAdvancedSearch = ko.observable(false);
	this.searchAttachmentsCheckbox = ko.observable(false);
	this.searchAttachments = ko.observable('');
	this.searchAttachments.subscribe(function(sText) {
		this.searchAttachmentsCheckbox(!!sText);
	}, this);
	
	this.searchAttachmentsFocus = ko.observable(false);
	this.searchFromFocus = ko.observable(false);
	this.searchSubjectFocus = ko.observable(false);
	this.searchToFocus = ko.observable(false);
	this.searchTextFocus = ko.observable(false);
	this.searchTrigger = ko.observable(null);
	this.searchDateStartFocus = ko.observable(false);
	this.searchDateEndFocus = ko.observable(false);
	this.searchDateStartDom = ko.observable(null);
	this.searchDateStartTimestamp = ko.observable('');
	this.searchDateStart = ko.observable('');
	this.searchDateStart.subscribe((v) => {
		if (v) {
			this.searchDateStartTimestamp(moment(v, Utils.getDateFormatForMoment(UserSettings.dateFormat())).toDate().getTime() / 1000)
		}
	})
	this.searchDateEndDom = ko.observable(null);
	this.searchDateEndTimestamp = ko.observable('');
	this.searchDateEnd = ko.observable('');
	this.searchDateEnd.subscribe((v) => {
		if (v) {
			this.searchDateEndTimestamp(moment(v, Utils.getDateFormatForMoment(UserSettings.dateFormat())).toDate().getTime() / 1000)
		}
	})
	this.dateFormatDatePicker = ko.computed(() => CalendarUtils.getDateFormatForDatePicker(UserSettings.dateFormat()));
	UserSettings.dateFormat.subscribe(() => {
		const dateModelStart = new CDateModel()
		const dateModelEnd = new CDateModel()

		if (this.searchDateStartTimestamp()) {
			dateModelStart.parse(this.searchDateStartTimestamp())
			this.searchDateStart(dateModelStart.getShortDate())
		}
		if (this.searchDateEndTimestamp()) {
			dateModelEnd.parse(this.searchDateEndTimestamp())
			this.searchDateEnd(dateModelEnd.getShortDate())
		}

		this.createDatePickerObject(this.searchDateStartDom(), this.searchDateStart);
		this.createDatePickerObject(this.searchDateEndDom(), this.searchDateEnd);

		this.searchHighlightedInputFormatted(DateUtils.formattedDateSearchHighlightedInput(this.searchHighlightedInput()))
	});

	this.attachmentsPlaceholder = ko.computed(function () {
		return TextUtils.i18n('MAILWEBCLIENT/LABEL_HAS_ATTACHMENTS');
	}, this);
	
	this.customMessageItemViewTemplate = ko.observable('');;
	
	App.broadcastEvent('MailWebclient::ConstructView::after', {'Name': this.ViewConstructorName, 'View': this, 'MailCache': MailCache});
}

CMessageListView.prototype.ViewTemplate = 'MailWebclient_MessagesView';
CMessageListView.prototype.ViewConstructorName = 'CMessageListView';

CMessageListView.prototype.addNewAccount = function ()
{
	App.Api.createMailAccount(AccountList.getEmail());
};

CMessageListView.prototype.createDatePickerObject = function (oElement, value)
{
	$(oElement).datepicker("destroy");
	$(oElement).datepicker({
		showOtherMonths: true,
		selectOtherMonths: true,
		monthNames: CoreDateUtils.getMonthNamesArray(),
		dayNamesMin: TextUtils.i18n('COREWEBCLIENT/LIST_DAY_NAMES_MIN').split(' '),
		nextText: '',
		prevText: '',
		firstDay: Types.pInt(ModulesManager.run('CalendarWebclient', 'getWeekStartsOn')),
		showOn: 'focus',
		dateFormat: this.dateFormatDatePicker(),
		onClose: function (sValue) {
			if (ko.isObservable(value)) {
				value(sValue);
			}
		}
	});

	$(oElement).mousedown(function() {
		$('#ui-datepicker-div').toggle();
	});
};

/**
 * @param {string} sFolder
 * @param {number} iPage
 * @param {string} sUid
 * @param {string} sSearch
 * @param {string} sFilters
 * @param {string} sSortBy
 * @param {number} iSortOrder
 */
CMessageListView.prototype.changeRoutingForMessageList = function (sFolder, iPage, sUid, sSearch, sFilters, sSortBy, iSortOrder)
{
	var bSame = Routing.setHash(LinksUtils.getMailbox(sFolder, iPage, sUid, sSearch, sFilters, sSortBy, iSortOrder));
	
	if (bSame && sSearch.length > 0 && this.search() === sSearch)
	{
		this.listChangedThrottle(!this.listChangedThrottle());
	}
};

/**
 * @param {CMessageModel} oMessage
 */
CMessageListView.prototype.onEnterPress = function (oMessage)
{
	if (oMessage.threadNextLoadingVisible())
	{
		oMessage.loadNextMessages();
	}
	else
	{
		oMessage.openThread();
	}
};

/**
 * @param {CMessageModel} oMessage
 */
CMessageListView.prototype.onMessageDblClick = function (oMessage)
{
	if (!this.isSavingDraft(oMessage))
	{
		var
			oFolder = this.folderList().getFolderByFullName(oMessage.folder()),
			oParams = { Message: oMessage, Cancel: false }
		;
		
		App.broadcastEvent('MailWebclient::MessageDblClick::before', oParams);

		if (!oParams.Cancel)
		{
			if (oFolder.type() === Enums.FolderTypes.Drafts || MailCache.isTemplateFolder(oMessage.folder()))
			{
				ComposeUtils.composeMessageFromDrafts(oMessage.accountId(), oMessage.folder(), oMessage.longUid());
			}
			else
			{
				this.openMessageInNewWindowBound(oMessage);
			}
		}
	}
};

CMessageListView.prototype.onFolderListSubscribe = function ()
{
	this.setCurrentFolder();
	this.requestMessageList();
};

/**
 * @param {Array} aParams
 */
CMessageListView.prototype.onShow = function (aParams)
{
	this.selector.useKeyboardKeys(true);
	this.oPageSwitcher.show();

	if (this.oJua)
	{
		this.oJua.setDragAndDropEnabledStatus(true);
	}
};

/**
 * @param {Array} aParams
 */
CMessageListView.prototype.onHide = function (aParams)
{
	this.selector.useKeyboardKeys(false);
	this.oPageSwitcher.hide();

	if (this.oJua)
	{
		this.oJua.setDragAndDropEnabledStatus(false);
	}
};

function correctSearchFromParams(filtersFromParams, searchFromParams) {
	if (filtersFromParams === Enums.FolderFilter.Flagged && Settings.AllowChangeStarredMessagesSource) {
		if ((/(^|\s)folders:all(\s|$)/).test(searchFromParams)) {
			if (Settings.StarredMessagesSource === Enums.StarredMessagesSource.InboxOnly) {
				return searchFromParams.replace('folders:all', '');
			}
		} else {
			if (Settings.StarredMessagesSource === Enums.StarredMessagesSource.AllFolders) {
				return `${searchFromParams} folders:all`;
			}
		}
	}
	return searchFromParams;
};

/**
 * @param {Array} aParams
 */
CMessageListView.prototype.onRoute = function (aParams)
{
	var
		oParams = LinksUtils.parseMailbox(aParams),
		sCurrentFolder = this.folderFullName() || this.folderList().inboxFolderFullName(),
		searchFromParams = correctSearchFromParams(oParams.Filters, oParams.Search),
		bRouteChanged = this.currentPage() !== oParams.Page ||
			sCurrentFolder !== oParams.Folder ||
			this.filters() !== oParams.Filters || (oParams.Filters === Enums.FolderFilter.Unseen && MailCache.waitForUnseenMessages()) ||
			this.search() !== searchFromParams || this.sSortBy !== oParams.SortBy || this.iSortOrder !== oParams.SortOrder,
		bMailsPerPageChanged = Settings.MailsPerPage !== this.oPageSwitcher.perPage()
	;
	
	this.pageSwitcherLocked(true);
	if (sCurrentFolder !== oParams.Folder || this.search() !== searchFromParams || this.filters() !== oParams.Filters)
	{
		this.oPageSwitcher.clear();
	}
	else
	{
		this.oPageSwitcher.setPage(oParams.Page, Settings.MailsPerPage);
	}
	this.pageSwitcherLocked(false);

	if (searchFromParams !== oParams.Search) {
		Routing.replaceHash(LinksUtils.getMailbox(oParams.Folder, this.oPageSwitcher.currentPage(), oParams.Uid, searchFromParams, oParams.Filters));
	} else if (oParams.Page !== this.oPageSwitcher.currentPage()) {
		if (this.folderList().iAccountId === 0)
		{
			this.aRouteParams = aParams;
		}
		else
		{
			Routing.replaceHash(LinksUtils.getMailbox(oParams.Folder, this.oPageSwitcher.currentPage(), oParams.Uid, searchFromParams, oParams.Filters));
		}
	}

	this.currentPage(this.oPageSwitcher.currentPage());
	this.folderFullName(oParams.Folder);
	this.filters(oParams.Filters);
	this.search(searchFromParams);
	this.searchInput(this.search());
	this.setSearchFolderMode();
	this.searchSpan.notifySubscribers();
	this.sSortBy = oParams.SortBy;
	this.iSortOrder = oParams.SortOrder;
	this.sortBy(oParams.SortBy);
	this.sortOrder(oParams.SortOrder);

	this.setCurrentFolder();
	
	if (bRouteChanged || bMailsPerPageChanged || this.collection().length === 0)
	{
		if (oParams.Filters === Enums.FolderFilter.Unseen)
		{
			MailCache.waitForUnseenMessages(true);
		}
		this.requestMessageList();
		this.messageListParamsChanged(true);
	}

	this.highlightTrigger.notifySubscribers(true);
};

CMessageListView.prototype.setSearchFolderMode = function () {
	if ((/(^|\s)folders:all(\s|$)/).test(this.search()))
	{
		this.searchFoldersMode(Enums.SearchFoldersMode.All);
	}
	else if ((/(^|\s)folders:sub(\s|$)/).test(this.search()))
	{
		this.searchFoldersMode(Enums.SearchFoldersMode.Sub);
	}
	else
	{
		this.searchFoldersMode(Enums.SearchFoldersMode.Current);
	}
};

CMessageListView.prototype.setCurrentFolder = function ()
{
	MailCache.setCurrentFolder(this.folderFullName(), this.filters());
	this.folderType(MailCache.getCurrentFolderType());
};

CMessageListView.prototype.requestMessageList = function ()
{
	var
		sFullName = MailCache.getCurrentFolderFullname(),
		iPage = this.oPageSwitcher.currentPage()
	;
	
	if (sFullName.length > 0)
	{
		MailCache.changeCurrentMessageList(sFullName, iPage, this.search(), this.filters(), this.sortBy(), this.sortOrder());
	}
	else
	{
		MailCache.checkCurrentFolderList();
	}
};

CMessageListView.prototype.calculateSearchStringFromAdvancedForm  = function ()
{
	var
		sFrom = this.searchInputFrom(),
		sTo = this.searchInputTo(),
		sSubject = this.searchInputSubject(),
		sText = this.searchInputText(),
		bAttachmentsCheckbox = this.searchAttachmentsCheckbox(),
		[dateStartServerFormat, dateEndServerFormat] = DateUtils.changeDateStartAndDateEndformatForSend(this.searchDateStart(), this.searchDateEnd()),
		aOutput = [],
		fEsc = function (sText) {

			sText = $.trim(sText).replace(/"/g, '\\"');
			
			if (-1 < sText.indexOf(' ') || -1 < sText.indexOf('"'))
			{
				sText = '"' + sText + '"';
			}
			
			return sText;
		}
	;

	if (sFrom !== '')
	{
		aOutput.push('from:' + fEsc(sFrom));
	}

	if (sTo !== '')
	{
		aOutput.push('to:' + fEsc(sTo));
	}

	if (sSubject !== '')
	{
		aOutput.push('subject:' + fEsc(sSubject));
	}
	
	if (sText !== '')
	{
		aOutput.push('text:' + fEsc(sText));
	}

	if (bAttachmentsCheckbox)
	{
		aOutput.push('has:attachments');
	}

	if (dateStartServerFormat !== '' || dateEndServerFormat !== '')
	{	
		aOutput.push('date:' + fEsc(dateStartServerFormat) + '/' + fEsc(dateEndServerFormat));
	}

	if (this.selectedSearchFoldersMode() === Enums.SearchFoldersMode.Sub || this.selectedSearchFoldersMode() === Enums.SearchFoldersMode.All)
	{
		aOutput.push('folders:' + this.selectedSearchFoldersMode());
	}

	return aOutput.join(' ');
};

CMessageListView.prototype.manualChangeSearchString = function (searchInput) {
	const searchKeywords = ['date:', 'subject:', 'text:', 'from:', 'to:', 'has:', 'folders:'];
	const regex = new RegExp('\\s(' + searchKeywords.join('|') + ')', 'g');
	const searchInputArr = (' ' + searchInput).split(regex);
	let newSearchInput = '';

	if (searchInputArr.length > 1) { //there are keywords in the search string
		for (let i = 1; i < searchInputArr.length; i = i + 2) {
			const keyword = searchInputArr[i];
			const value = searchInputArr[i + 1];

			if (keyword === searchKeywords[0]) {
				const [dateStartClientFormat, dateEndClientFormat] = value.split(' - ');
				const [dateStartServerFormat, dateEndServerFormat] = DateUtils.changeDateStartAndDateEndformatForSend(dateStartClientFormat, dateEndClientFormat);
	
				if (dateStartServerFormat || dateEndServerFormat) {
					newSearchInput += keyword + dateStartServerFormat + '/' + dateEndServerFormat + ' ';
				}
			} else {
				newSearchInput += keyword + value + ' ';
			}
		}
	} else {
		newSearchInput = searchInput; //search string is just a text an has no any keywords
	}

	return newSearchInput;
};

CMessageListView.prototype.onSearchClick = function ()
{
	var
		sFolder = MailCache.getCurrentFolderFullname(),
		iPage = 1,
		searchInput = this.searchInput()
	;
	
	if (this.allowAdvancedSearch() && this.bAdvancedSearch()) {
		searchInput = this.calculateSearchStringFromAdvancedForm();
		this.bAdvancedSearch(false);
	} else {
		searchInput = this.manualChangeSearchString(searchInput)
	}

	this.changeRoutingForMessageList(sFolder, iPage, '', searchInput, this.filters());
};

CMessageListView.prototype.onRetryClick = function ()
{
	this.requestMessageList();
};

CMessageListView.prototype.onClearSearchClick = function ()
{
	var
		sFolder = MailCache.getCurrentFolderFullname(),
		sUid = this.currentMessage() ? this.currentMessage().longUid() : '',
		sSearch = '',
		iPage = 1
	;

	this.clearAdvancedSearch();
	this.changeRoutingForMessageList(sFolder, iPage, sUid, sSearch, this.filters(), this.sortBy(), this.sortOrder());
};

CMessageListView.prototype.onClearFilterClick = function ()
{
	var
		sFolder = MailCache.getCurrentFolderFullname(),
		sUid = this.currentMessage() ? this.currentMessage().longUid() : '',
		sSearch = '',
		iPage = 1,
		sFilters = ''
	;

	this.clearAdvancedSearch();
	this.changeRoutingForMessageList(sFolder, iPage, sUid, sSearch, sFilters, this.sortBy(), this.sortOrder());
};

CMessageListView.prototype.onStopSearchClick = function ()
{
	this.onClearSearchClick();
};

/**
 * @param {Object} oMessage
 */
CMessageListView.prototype.isSavingDraft = function (oMessage)
{
	var oFolder = MailCache.getCurrentFolder();
	
	return (oFolder.type() === Enums.FolderTypes.Drafts) && (oMessage.longUid() === MailCache.savingDraftUid());
};

/**
 * @param {Object} oMessage
 */
CMessageListView.prototype.routeForMessage = function (oMessage)
{
	if (oMessage && oMessage.longUid && !this.isSavingDraft(oMessage))
	{
		var
			oFolder = MailCache.getCurrentFolder(),
			sFolder = MailCache.getCurrentFolderFullname(),
			iPage = this.oPageSwitcher.currentPage(),
			sUid = oMessage.longUid(),
			sCurrentUid = this.currentMessage() ? this.currentMessage().longUid() : '',
			sSearch = this.search()
		;

		if (sUid !== '' && sUid !== sCurrentUid)
		{
			if (App.isMobile() && oFolder.type() === Enums.FolderTypes.Drafts)
			{
				Routing.setHash(LinksUtils.getComposeFromMessage('drafts', oMessage.accountId(), oMessage.folder(), oMessage.longUid()));
			}
			else
			{
				this.changeRoutingForMessageList(sFolder, iPage, sUid, sSearch, this.filters(), this.sortBy(), this.sortOrder());
				if (App.isMobile() && MailCache.currentMessage() && sUid === MailCache.currentMessage().longUid())
				{
					MailCache.currentMessage.valueHasMutated();
				}
			}
		}
	}
};

CMessageListView.prototype.unbind = function ()
{
	this.selector.unbind();
};

/**
 * @param {Object} $viewDom
 */
CMessageListView.prototype.onBind = function ($viewDom)
{
	var
		self = this,
		fStopPopagation = _.bind(function (oEvent) {
			if (oEvent && oEvent.stopPropagation)
			{
				oEvent.stopPropagation();
			}
		}, this)
	;

	$('.message_list', $viewDom)
		.on('click', function ()
		{
			self.isFocused(false);
		})
		.on('click', '.message_sub_list .item .flag', function (oEvent)
		{
			self.onFlagClick(ko.dataFor(this));
			if (oEvent && oEvent.stopPropagation)
			{
				oEvent.stopPropagation();
			}
		})
		.on('dblclick', '.message_sub_list .item .flag', fStopPopagation)
		.on('click', '.message_sub_list .item .thread-pin', fStopPopagation)
		.on('dblclick', '.message_sub_list .item .thread-pin', fStopPopagation)
	;

	this.selector.initOnApplyBindings(
		'.message_sub_list .item',
		'.message_sub_list .item.selected',
		'.message_sub_list .item .custom_checkbox',
		$('.message_list', $viewDom),
		$('.message_list_scroll.scroll-inner', $viewDom)
	);

	_.delay(_.bind(function(){
		this.createDatePickerObject(this.searchDateStartDom(), this.searchDateStart);
		this.createDatePickerObject(this.searchDateEndDom(), this.searchDateEnd);
	}, this), 1000);

	this.initUploader();
};

/**
 * Puts / removes the message flag by clicking on it.
 *
 * @param {Object} oMessage
 */
CMessageListView.prototype.onFlagClick = function (oMessage)
{
	if (!this.isSavingDraft(oMessage))
	{
		MailCache.executeGroupOperation('SetMessageFlagged', [oMessage.longUid()], 'flagged', !oMessage.flagged());
	}
};

/**
 * Marks the selected messages read.
 */
CMessageListView.prototype.executeMarkAsRead = function ()
{
	MailCache.executeGroupOperation('SetMessagesSeen', this.checkedOrSelectedUids(), 'seen', true);
};

/**
 * Marks the selected messages unread.
 */
CMessageListView.prototype.executeMarkAsUnread = function ()
{
	MailCache.executeGroupOperation('SetMessagesSeen', this.checkedOrSelectedUids(), 'seen', false);
};

/**
 * Marks Read all messages in a folder.
 */
CMessageListView.prototype.executeMarkAllRead = function ()
{
	MailCache.executeGroupOperation('SetAllMessagesSeen', [], 'seen', true);
};

/**
 * Moves the selected messages in the current folder in the specified.
 * 
 * @param {string} sToFolder
 */
CMessageListView.prototype.executeMoveToFolder = function (sToFolder)
{
	var
		oToFolder = MailCache.getFolderByFullName(MailCache.currentAccountId(), sToFolder),
		aLongUids = this.checkedOrSelectedUids(),
		oUidsByFolders = MailCache.getUidsSeparatedByFolders(aLongUids)
	;

	if (oToFolder)
	{
		_.each(oUidsByFolders, function (oData) {
			if (MailCache.currentAccountId() === oData.iAccountId)
			{
				var oFromFolder = MailCache.getFolderByFullName(MailCache.currentAccountId(), oData.sFolder);
				if (oFromFolder)
				{
					MailCache.moveMessagesToFolder(oFromFolder, oToFolder, oData.aUids);
				}
			}
		});
	}
};

CMessageListView.prototype.executeCopyToFolder = function (toFolderName)
{
	var
		toFolder = MailCache.getFolderByFullName(MailCache.currentAccountId(), toFolderName),
		longUids = this.checkedOrSelectedUids(),
		uidsByFolders = MailCache.getUidsSeparatedByFolders(longUids)
	;

	if (toFolder) {
		_.each(uidsByFolders, function (data) {
			if (MailCache.currentAccountId() === data.iAccountId) {
				var fromFolder = MailCache.getFolderByFullName(MailCache.currentAccountId(), data.sFolder);
				if (fromFolder) {
					MailCache.copyMessagesToFolder(fromFolder, toFolder, data.aUids);
				}
			}
		});
	}
};

/**
 * Calls for the selected messages delete operation. Called from the keyboard.
 * 
 * @param {Array} aMessages
 */
CMessageListView.prototype.onDeletePress = function (aMessages)
{
	var aUids = _.map(aMessages, function (oMessage) { return oMessage.longUid(); });

	if (aUids.length > 0)
	{
		this.deleteMessages(aUids);
	}
};

/**
 * Calls for the selected messages delete operation. Called by the mouse click on the delete button.
 */
CMessageListView.prototype.executeDelete = function ()
{
	this.deleteMessages(this.checkedOrSelectedUids());
};

/**
 * @param {Array} aUids
 */
CMessageListView.prototype.deleteMessages = function (aUids)
{
	var
		sUidToOpenAfter = '',
		oMessageToOpenAfter = null
	;

	if (MailCache.uidList().filters() !== Enums.FolderFilter.Unseen
			&& aUids.length === 1 && MailCache.currentMessage()
			&& aUids[0] === MailCache.currentMessage().longUid())
	{
		sUidToOpenAfter = MailCache.prevMessageUid();
		if (sUidToOpenAfter === '')
		{
			sUidToOpenAfter = MailCache.nextMessageUid();
		}
	}
	
	if (aUids.length > 0)
	{
		MailUtils.deleteMessages(aUids, function () {
			if (sUidToOpenAfter !== '')
			{
				oMessageToOpenAfter = _.find(this.collection(), function (oMessage) {
					return oMessage && _.isFunction(oMessage.longUid) && (oMessage.longUid() === sUidToOpenAfter || oMessage.uid() === sUidToOpenAfter);
				});
				if (oMessageToOpenAfter)
				{
					this.routeForMessage(oMessageToOpenAfter);
				}
			}
		}.bind(this));
	}
};

/**
 * Moves the selected messages from the current folder to the folder Spam.
 */
CMessageListView.prototype.executeSpam = function ()
{
	var
		aLongUids = this.checkedOrSelectedUids(),
		oUidsByFolders = MailCache.getUidsSeparatedByFolders(aLongUids)
	;

	_.each(oUidsByFolders, function (oData) {
		var
			oFolderList = MailCache.oFolderListItems[oData.iAccountId],
			oAccSpam = oFolderList ? oFolderList.spamFolder() : null,
			oAccFolder = oFolderList ? oFolderList.getFolderByFullName(oData.sFolder) : null;
		;
		if (oAccFolder && oAccSpam && oAccFolder.fullName() !== oAccSpam.fullName())
		{
			MailCache.moveMessagesToFolder(oAccFolder, oAccSpam, oData.aUids);
		}
	});
};

/**
 * Moves the selected messages from the Spam folder to folder Inbox.
 */
CMessageListView.prototype.executeNotSpam = function ()
{
	var
		oCurrentFolder = MailCache.getCurrentFolder(),
		oInbox = this.folderList().inboxFolder(),
		aLongUids = this.checkedOrSelectedUids(),
		oUidsByFolders = MailCache.getUidsSeparatedByFolders(aLongUids)
	;

	if (oInbox && oCurrentFolder && oCurrentFolder.fullName() !== oInbox.fullName())
	{
		_.each(oUidsByFolders, function (oData) {
			if (oCurrentFolder.iAccountId === oData.iAccountId && oCurrentFolder.fullName() === oData.sFolder)
			{
				MailCache.moveMessagesToFolder(oCurrentFolder, oInbox, oData.aUids);
			}
		});
	}
};

CMessageListView.prototype.executeSort = function (sSortBy)
{
	const sCurrentSort = this.sortBy();
	this.sortBy(sSortBy);

	if (sCurrentSort === sSortBy) {
		this.sortOrder(this.sortOrder() === Enums.SortOrder.Asc ? Enums.SortOrder.Desc : Enums.SortOrder.Asc); // Asc: 0, Desc: 1
	} else {
		this.sortOrder(Settings.MessagesSortBy.DefaultSortOrder);
	}

	const
		sFolder = MailCache.getCurrentFolderFullname(),
		iPage = this.oPageSwitcher.currentPage(),
		sUid = ''
	;

	this.changeRoutingForMessageList(sFolder, iPage, sUid, this.search(), this.filters(), this.sortBy(), this.sortOrder());
};

CMessageListView.prototype.clearAdvancedSearch = function ()
{
	this.searchInputFrom('');
	this.searchInputTo('');
	this.searchInputSubject('');
	this.searchInputText('');
	this.bAdvancedSearch(false);
	this.searchAttachmentsCheckbox(false);
	this.searchAttachments('');
	this.searchDateStart('');
	this.searchDateEnd('');
	this.selectedSearchFoldersMode(this.isStarredInAllFolders() ? 'all' : '');
};

CMessageListView.prototype.onAdvancedSearchClick = function ()
{
	this.bAdvancedSearch(!this.bAdvancedSearch());
};

CMessageListView.prototype.calculateSearchStringForDescription = function ()
{
	return TextUtils.encodeHtml(this.searchHighlightedInputFormatted().replace(/(^|\s)folders:(all|sub)(\s|$)/, ''));
};

CMessageListView.prototype.initUploader = function ()
{
	var self = this;

	if (this.uploaderArea())
	{
		this.oJua = new CJua({
			'action': '?/Api/',
			'name': 'jua-uploader',
			'queueSize': 2,
			'dragAndDropElement': this.uploaderArea(),
			'disableAjaxUpload': false,
			'disableFolderDragAndDrop': false,
			'disableDragAndDrop': false,
			'hidden': _.extendOwn({
				'Module': Settings.ServerModuleName,
				'Method': 'UploadMessage',
				'Parameters':  function () {
					return JSON.stringify({
						'AccountID': MailCache.currentAccountId(),
						'Folder': self.folderFullName()
					});
				}
			}, App.getCommonRequestParameters())
		});

		this.oJua
			.on('onDrop', _.bind(this.onFileDrop, this))
			.on('onComplete', _.bind(this.onFileUploadComplete, this))
			.on('onBodyDragEnter', _.bind(this.bDragActive, this, true))
			.on('onBodyDragLeave', _.bind(this.bDragActive, this, false))
		;
	}
};

CMessageListView.prototype.onFileDrop = function (oData)
{
	if (!(oData && oData.File && oData.File.type && oData.File.type.indexOf('message/') === 0))
	{
		Screens.showError(TextUtils.i18n('MAILWEBCLIENT/ERROR_FILE_NOT_EML'));
	}
};

CMessageListView.prototype.onFileUploadComplete = function (sFileUid, bResponseReceived, oResponse)
{
	var bSuccess = bResponseReceived && oResponse && !oResponse.ErrorCode;

	if (bSuccess)
	{
		MailCache.executeCheckMail(true);
	}
	else
	{
		Api.showErrorByCode(oResponse || {}, TextUtils.i18n('COREWEBCLIENT/ERROR_UPLOAD_FILE'));
	}
};

CMessageListView.prototype.selectFolderSearch = function (sSearchFoldersMode)
{
	this.selectedSearchFoldersMode(sSearchFoldersMode);
};

module.exports = CMessageListView;


/***/ }),

/***/ "kb14":
/*!***********************************************************!*\
  !*** ./modules/MailWebclient/js/views/MessagePaneView.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const _ = __webpack_require__(/*! underscore */ "C3HO"),
  $ = __webpack_require__(/*! jquery */ "M4cL"),
  ko = __webpack_require__(/*! knockout */ "p09A")

const TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
  UrlUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Url.js */ "Tt1R"),
  Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
  App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
  ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
  Pulse = __webpack_require__(/*! modules/CoreWebclient/js/Pulse.js */ "fDmo"),
  Routing = __webpack_require__(/*! modules/CoreWebclient/js/Routing.js */ "W66n"),
  Storage = __webpack_require__(/*! modules/CoreWebclient/js/Storage.js */ "HCAJ"),
  UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV"),
  WindowOpener = __webpack_require__(/*! modules/CoreWebclient/js/WindowOpener.js */ "mGms"),
  CAbstractScreenView = __webpack_require__(/*! modules/CoreWebclient/js/views/CAbstractScreenView.js */ "doeu")

const ComposeUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Compose.js */ "B5X4"),
  LinksUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Links.js */ "CPab"),
  MailUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Mail.js */ "WOsA"),
  SendingUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Sending.js */ "F0/K"),
  AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
  Ajax = __webpack_require__(/*! modules/MailWebclient/js/Ajax.js */ "QaEg"),
  MailCache = __webpack_require__(/*! modules/MailWebclient/js/Cache.js */ "F0Fd"),
  MainTabExtMethods = __webpack_require__(/*! modules/MailWebclient/js/MainTabExtMethods.js */ "cL06"),
  MessagePaneSpamButtonsController = __webpack_require__(/*! modules/MailWebclient/js/views/message/SpamButtonsView.js */ "ixCM"),
  Settings = __webpack_require__(/*! modules/MailWebclient/js/Settings.js */ "oFXy"),
  CAttachmentModel = __webpack_require__(/*! modules/MailWebclient/js/models/CAttachmentModel.js */ "TGY0")

const MainTab = App.isNewTab() && window.opener && window.opener.MainTabMailMethods

/**
 * @constructor
 */
function CMessagePaneView() {
  CAbstractScreenView.call(this, 'MailWebclient')

  this.bNewTab = App.isNewTab()
  this.isLoading = ko.observable(false)

  this.bAllowSearchMessagesBySubject = Settings.AllowSearchMessagesBySubject

  MailCache.folderList.subscribe(this.onFolderListSubscribe, this)
  this.messages = MailCache.messages
  this.messages.subscribe(this.onMessagesSubscribe, this)
  this.currentMessage = MailCache.currentMessage
  this.currentMessage.subscribe(this.onCurrentMessageSubscribe, this)
  UserSettings.timeFormat.subscribe(this.onCurrentMessageSubscribe, this)
  UserSettings.dateFormat.subscribe(this.onCurrentMessageSubscribe, this)
  this.displayedMessageUid = ko.observable('')

  this.browserTitle = ko.computed(function () {
    var oMessage = this.currentMessage(),
      sSubject = oMessage ? oMessage.subject() : '',
      sPrefix = sSubject ? sSubject + ' - ' : ''
    return sPrefix + AccountList.getEmail() + ' - ' + TextUtils.i18n('MAILWEBCLIENT/HEADING_MESSAGE_BROWSER_TAB')
  }, this)

  this.isCurrentMessage = ko.computed(function () {
    return !!this.currentMessage()
  }, this)

  this.isCurrentMessageLoaded = ko.computed(function () {
    return this.isCurrentMessage() && !this.isLoading()
  }, this)

  this.visibleNoMessageSelectedText = ko.computed(function () {
    return this.messages().length > 0 && !this.isCurrentMessage()
  }, this)

  this.prevMessageUid = MailCache.prevMessageUid
  this.nextMessageUid = MailCache.nextMessageUid

  this.isEnablePrevMessage = ko.computed(function () {
    return App.isNewTab() && Types.isNonEmptyString(this.prevMessageUid())
  }, this)
  this.isEnableNextMessage = ko.computed(function () {
    return App.isNewTab() && Types.isNonEmptyString(this.nextMessageUid())
  }, this)

  this.isEnableDelete = this.isCurrentMessage
  this.isEnableReply = this.isCurrentMessageLoaded
  this.isEnableReplyAll = this.isCurrentMessageLoaded
  this.isEnableResend = this.isCurrentMessageLoaded
  this.isEnableForward = this.isCurrentMessageLoaded
  this.isEnablePrint = this.isCurrentMessageLoaded
  this.isEnableSave = function () {
    return this.isCurrentMessage() && this.currentMessage().sDownloadAsEmlUrl !== ''
  }

  this.deleteCommand = Utils.createCommand(this, this.executeDeleteMessage, this.isEnableDelete)
  this.prevMessageCommand = Utils.createCommand(this, this.executePrevMessage, this.isEnablePrevMessage)
  this.nextMessageCommand = Utils.createCommand(this, this.executeNextMessage, this.isEnableNextMessage)
  this.replyCommand = Utils.createCommand(this, this.executeReply, this.isEnableReply)
  this.replyAllCommand = Utils.createCommand(this, this.executeReplyAll, this.isEnableReplyAll)
  this.resendCommand = Utils.createCommand(this, this.executeResend, this.isEnableResend)
  this.forwardCommand = Utils.createCommand(this, this.executeForward, this.isEnableForward)
  this.printCommand = Utils.createCommand(this, this.executePrint, this.isEnablePrint)
  this.saveCommand = Utils.createCommand(this, this.executeSave, this.isEnableSave)
  this.forwardAsAttachment = Utils.createCommand(this, this.executeForwardAsAttachment, this.isCurrentMessageLoaded)
  this.messageToolbarControllers = ko.observableArray([])
  this.registerController(MessagePaneSpamButtonsController, 'OnMessageToolbar')

  this.moreCommand = Utils.createCommand(this, null, this.isCurrentMessageLoaded)
  this.moreSectionCommands = ko.observableArray([])
  App.broadcastEvent(
    'MailWebclient::AddMoreSectionCommand',
    _.bind(function (oCommand) {
      var oNewCommand = _.extend(
        {
          Text: '',
          CssClass: '',
          Handler: function () {},
          Visible: true,
        },
        oCommand
      )
      oNewCommand.Command = Utils.createCommand(this, oNewCommand.Handler, this.isCurrentMessageLoaded)
      this.moreSectionCommands.push(oNewCommand)
    }, this)
  )
  ;(this.oUnsubscribeButtonView = __webpack_require__(/*! modules/MailWebclient/js/views/message-pane/UnsubscribeButtonView.js */ "nWzW")),
    (this.visiblePicturesControl = ko.observable(false))
  this.visibleShowPicturesLink = ko.observable(false)

  this.visibleConfirmationControl = ko.computed(function () {
    return (
      this.currentMessage() &&
      this.currentMessage().readingConfirmationAddressee() !== '' &&
      this.currentMessage() &&
      this.currentMessage().readingConfirmationAddressee() !== AccountList.getEmail()
    )
  }, this)

  this.isCurrentNotDraftOrSent = ko.computed(function () {
    var oCurrFolder = MailCache.getCurrentFolder()
    return (
      oCurrFolder &&
      oCurrFolder.fullName().length > 0 &&
      oCurrFolder.type() !== Enums.FolderTypes.Drafts &&
      oCurrFolder.type() !== Enums.FolderTypes.Sent
    )
  }, this)

  this.isCurrentSentFolder = ko.computed(function () {
    var oCurrFolder = MailCache.getCurrentFolder()
    return !!oCurrFolder && oCurrFolder.fullName().length > 0 && oCurrFolder.type() === Enums.FolderTypes.Sent
  }, this)

  this.isCurrentNotDraftFolder = ko.computed(function () {
    var oCurrFolder = MailCache.getCurrentFolder()
    return !!oCurrFolder && oCurrFolder.fullName().length > 0 && oCurrFolder.type() !== Enums.FolderTypes.Drafts
  }, this)

  this.isCurrentTemplateFolder = ko.computed(function () {
    return MailCache.isTemplateFolder(MailCache.getCurrentFolderFullname())
  }, this)

  this.topControllers = ko.observableArray()
  this.bodyControllers = ko.observableArray()
  this.bottomControllers = ko.observableArray()
  this.controllers = ko.computed(function () {
    return _.union(
      this.topControllers(),
      this.bodyControllers(),
      this.bottomControllers(),
      this.messageToolbarControllers()
    )
  }, this)

  this.disableAllSendTools = ko.computed(function () {
    var bDisable = false
    _.each(this.controllers(), function (oController) {
      if (_.isFunction(oController.disableAllSendTools) && oController.disableAllSendTools()) {
        bDisable = true
      }
    })
    return bDisable
  }, this)
  this.isVisibleReplyTool = ko.computed(function () {
    return !this.disableAllSendTools() && this.isCurrentNotDraftOrSent() && !this.isCurrentTemplateFolder()
  }, this)
  this.isVisibleResendTool = ko.computed(function () {
    return !this.disableAllSendTools() && this.isCurrentSentFolder() && !this.isCurrentTemplateFolder()
  }, this)
  this.isVisibleForwardTool = ko.computed(function () {
    return !this.disableAllSendTools() && this.isCurrentNotDraftFolder() && !this.isCurrentTemplateFolder()
  }, this)

  this.accountId = ko.observable(0)
  this.folder = ko.observable('')
  this.uid = ko.observable('')
  this.subject = ko.observable('')
  this.emptySubject = ko.computed(function () {
    return $.trim(this.subject()) === ''
  }, this)
  this.subjectForDisplay = ko.computed(function () {
    return this.emptySubject() ? TextUtils.i18n('MAILWEBCLIENT/LABEL_NO_SUBJECT') : this.subject()
  }, this)
  this.importance = ko.observable(Enums.Importance.Normal)
  this.oFromAddr = ko.observable(null)
  this.from = ko.observable('')
  this.fromEmail = ko.observable('')
  this.fullFrom = ko.observable('')
  this.to = ko.observable('')
  this.aToAddr = ko.observableArray([])
  this.cc = ko.observable('')
  this.aCcAddr = ko.observableArray([])
  this.bcc = ko.observable('')
  this.aBccAddr = ko.observableArray([])
  this.allRecipients = ko.observableArray([])
  this.currentAccountEmail = ko.observable()
  this.sMeSender = Settings.UseMeRecipientForMessages ? TextUtils.i18n('MAILWEBCLIENT/LABEL_ME_SENDER') : null
  this.sMeRecipient = Settings.UseMeRecipientForMessages ? TextUtils.i18n('MAILWEBCLIENT/LABEL_ME_RECIPIENT') : null

  this.fullDate = ko.observable('')
  this.midDate = ko.observable('')

  this.textBody = ko.observable('')
  this.textBodyForNewWindow = ko.observable('')
  this.domTextBody = ko.observable(null)
  this.rtlMessage = ko.observable(false)

  this.contentHasFocus = ko.observable(false)

  App.broadcastEvent(
    'MailWebclient::RegisterMessagePaneController',
    _.bind(function (oController, sPlace) {
      this.registerController(oController, sPlace)
    }, this)
  )

  this.fakeHeader = ko.computed(function () {
    var topControllersVisible = !!_.find(this.topControllers(), function (oController) {
      return !!oController.visible && oController.visible()
    })
    return !(this.visiblePicturesControl() || this.visibleConfirmationControl() || topControllersVisible)
  }, this)

  this.sAttachmentsSwitcherViewTemplate = App.isMobile() ? 'MailWebclient_Message_AttachmentsSwitcherView' : ''
  this.sQuickReplyViewTemplate =
    App.isMobile() || !Settings.AllowQuickReply ? '' : 'MailWebclient_Message_QuickReplyView'

  this.attachments = ko.observableArray([])
  this.notInlineAttachments = ko.computed(function () {
    return _.filter(this.attachments(), function (oAttach) {
      return !oAttach.linked()
    })
  }, this)
  this.notInlineAttachmentsInString = ko.computed(function () {
    return _.map(
      this.notInlineAttachments(),
      function (oAttachment) {
        return oAttachment.fileName()
      },
      this
    ).join(', ')
  }, this)

  this.allAttachmentsDownloadMethods = ko.observableArray([])
  this.visibleDownloadAllAttachmentsSeparately = ko.computed(function () {
    return this.notInlineAttachments().length > 1
  }, this)
  this.visibleExtendedDownload = ko.computed(function () {
    return this.visibleDownloadAllAttachmentsSeparately() || this.allAttachmentsDownloadMethods().length > 0
  }, this)
  App.broadcastEvent(
    'MailWebclient::AddAllAttachmentsDownloadMethod',
    _.bind(function (oMethod) {
      this.allAttachmentsDownloadMethods.push(oMethod)
    }, this)
  )

  this.detailsVisible = ko.observable(Storage.getData('aurora_mail_is-message-details-visible'))
  this.detailsTooltip = ko.computed(function () {
    return this.detailsVisible()
      ? TextUtils.i18n('COREWEBCLIENT/ACTION_HIDE_DETAILS')
      : TextUtils.i18n('COREWEBCLIENT/ACTION_SHOW_DETAILS')
  }, this)

  this.hasNotInlineAttachments = ko.computed(function () {
    return this.notInlineAttachments().length > 0
  }, this)

  this.hasBodyText = ko.computed(function () {
    return this.textBody().length > 0
  }, this)

  this.visibleAddMenu = ko.observable(false)

  // Quick Reply Part

  this.replyText = ko.observable('')
  this.replyTextFocus = ko.observable(false)
  this.replyPaneVisible = ko.computed(function () {
    return this.currentMessage() && this.currentMessage().completelyFilled()
  }, this)
  this.replySendingStarted = ko.observable(false)
  this.replySavingStarted = ko.observable(false)
  this.replyAutoSavingStarted = ko.observable(false)
  this.requiresPostponedSending = ko.observable(false)
  this.replyAutoSavingStarted.subscribe(function () {
    if (!this.replyAutoSavingStarted() && this.requiresPostponedSending()) {
      SendingUtils.sendPostponedMail(this.replyDraftUid())
      this.requiresPostponedSending(false)
    }
  }, this)
  this.hasReplyAllCcAddrs = ko.observable(false)
  this.placeholderText = ko.computed(function () {
    return this.hasReplyAllCcAddrs()
      ? TextUtils.i18n('MAILWEBCLIENT/LABEL_QUICK_REPLY_ALL')
      : TextUtils.i18n('MAILWEBCLIENT/LABEL_QUICK_REPLY')
  }, this)
  this.sendButtonText = ko.computed(function () {
    return this.hasReplyAllCcAddrs()
      ? TextUtils.i18n('MAILWEBCLIENT/ACTION_SEND_ALL')
      : TextUtils.i18n('MAILWEBCLIENT/ACTION_SEND')
  }, this)

  ko.computed(function () {
    if (
      !this.replyTextFocus() ||
      this.replyAutoSavingStarted() ||
      this.replySavingStarted() ||
      this.replySendingStarted()
    ) {
      this.stopAutosaveTimer()
    }
    if (
      this.replyTextFocus() &&
      !this.replyAutoSavingStarted() &&
      !this.replySavingStarted() &&
      !this.replySendingStarted()
    ) {
      this.startAutosaveTimer()
    }
  }, this)

  this.saveButtonText = ko.computed(function () {
    return this.replyAutoSavingStarted()
      ? TextUtils.i18n('MAILWEBCLIENT/ACTION_SAVE_IN_PROGRESS')
      : TextUtils.i18n('MAILWEBCLIENT/ACTION_SAVE')
  }, this)
  this.replyDraftUid = ko.observable('')
  this.replyLoadingText = ko.computed(function () {
    if (this.replySendingStarted()) {
      return TextUtils.i18n('COREWEBCLIENT/INFO_SENDING')
    } else if (this.replySavingStarted()) {
      return TextUtils.i18n('MAILWEBCLIENT/INFO_SAVING')
    }
    return ''
  }, this)

  this.isEnableSendQuickReply = ko.computed(function () {
    return this.isCurrentMessageLoaded() && this.replyText() !== '' && !this.replySendingStarted()
  }, this)
  this.isEnableSaveQuickReply = ko.computed(function () {
    return this.isEnableSendQuickReply() && !this.replySavingStarted() && !this.replyAutoSavingStarted()
  }, this)

  this.saveQuickReplyCommand = Utils.createCommand(this, this.executeSaveQuickReply, this.isEnableSaveQuickReply)
  this.sendQuickReplyCommand = Utils.createCommand(this, this.executeSendQuickReply, this.isEnableSendQuickReply)

  this.domMessageHeader = ko.observable(null)
  this.domQuickReply = ko.observable(null)

  this.domMessageForPrint = ko.observable(null)

  // to have time to take action "Open full reply form" before the animation starts
  this.replyTextFocusThrottled = ko.observable(false).extend({ throttle: 50 })

  this.replyTextFocus.subscribe(function () {
    this.replyTextFocusThrottled(this.replyTextFocus())
  }, this)

  this.isQuickReplyActive = ko.computed(function () {
    return this.replyText().length > 0 || this.replyTextFocusThrottled()
  }, this)

  //*** Quick Reply Part

  this.visibleAttachments = ko.observable(false)
  this.showMessage = function () {
    this.visibleAttachments(false)
  }
  this.showAttachments = function () {
    this.visibleAttachments(true)
  }

  this.sDefaultFontName = Settings.DefaultFontName

  Pulse.registerDayOfMonthFunction(_.bind(this.updateMomentDate, this))

  App.broadcastEvent('MailWebclient::ConstructView::after', { Name: 'CMessagePaneView', View: this })
}

_.extendOwn(CMessagePaneView.prototype, CAbstractScreenView.prototype)

CMessagePaneView.prototype.ViewTemplate = App.isNewTab()
  ? 'MailWebclient_MessagePaneScreenView'
  : 'MailWebclient_MessagePaneView'
CMessagePaneView.prototype.ViewConstructorName = 'CMessagePaneView'

/**
 * @param {object} oData
 * @param {object} oEvent
 */
CMessagePaneView.prototype.resizeDblClick = function (oData, oEvent) {
  if (
    oEvent.target.className !== '' &&
    !!oEvent.target.className.search(/add_contact|icon|link|title|subject|link|date|from/)
  ) {
    Utils.calmEvent(oEvent)
    Utils.removeSelection()
    if (this.expandMessagePaneWidth) {
      this.expandMessagePaneWidth(!this.expandMessagePaneWidth())
    }
  }
}

CMessagePaneView.prototype.notifySender = function () {
  if (this.currentMessage() && this.currentMessage().readingConfirmationAddressee() !== '') {
    var sText = TextUtils.i18n('MAILWEBCLIENT/LABEL_RETURN_RECEIPT_MAIL_TEXT', {
      EMAIL: AccountList.getEmail(),
      SUBJECT: this.subject(),
    }).replace(/\\r\\n/g, '\n')
    Ajax.send('SendMessage', {
      To: this.currentMessage().readingConfirmationAddressee(),
      Subject: TextUtils.i18n('MAILWEBCLIENT/LABEL_RETURN_RECEIPT_MAIL_SUBJECT'),
      Text: sText,
      ConfirmFolder: this.currentMessage().folder(),
      ConfirmUid: this.currentMessage().longUid(),
    })
    this.currentMessage().readingConfirmationAddressee('')
  }
}

CMessagePaneView.prototype.onFolderListSubscribe = function () {
  if (App.isNewTab()) {
    this.onMessagesSubscribe()
  }
}

CMessagePaneView.prototype.onMessagesSubscribe = function () {
  if (!this.currentMessage() && this.uid() && this.uid().length > 0) {
    MailCache.setCurrentMessage(this.accountId(), this.folder(), this.uid())
  }
}

/**
 * @param {string} sUid
 */
CMessagePaneView.prototype.passReplyDataToNewTab = function (sUid) {
  if (this.currentMessage() && this.currentMessage().longUid() === sUid && this.replyText() !== '') {
    MainTabExtMethods.passReplyData(sUid, {
      ReplyText: this.replyText(),
      ReplyDraftUid: this.replyDraftUid(),
    })

    this.replyText('')
    this.replyDraftUid('')
  }
}

CMessagePaneView.prototype.onCurrentMessageSubscribe = function () {
  var oMessage = this.currentMessage(),
    oAccount = oMessage ? AccountList.getAccount(oMessage.accountId()) : null,
    oReplyData = null
  if (MainTab && oMessage) {
    oReplyData = MainTab.getReplyData(oMessage.longUid())
    if (oReplyData) {
      this.replyText(oReplyData.ReplyText)
      this.replyDraftUid(oReplyData.ReplyDraftUid)
    }
  } else if (!oMessage || oMessage.longUid() !== this.displayedMessageUid()) {
    this.replyText('')
    this.replyDraftUid('')
  }

  if (oMessage && this.uid() === oMessage.uid()) {
    this.hasReplyAllCcAddrs(SendingUtils.hasReplyAllCcAddrs(oMessage))

    this.subject(oMessage.subject())
    this.importance(oMessage.importance())
    this.from(oMessage.oFrom.getDisplay())
    this.fromEmail(oMessage.oFrom.getFirstEmail())

    this.fullFrom(oMessage.oFrom.getFull())
    if (oMessage.oFrom.aCollection.length > 0) {
      this.oFromAddr(oMessage.oFrom.aCollection[0])
    } else {
      this.oFromAddr(null)
    }

    this.to(oMessage.oTo.getFull())
    this.aToAddr(oMessage.oTo.aCollection)
    this.cc(oMessage.oCc.getFull())
    this.aCcAddr(oMessage.oCc.aCollection)
    this.bcc(oMessage.oBcc.getFull())
    this.aBccAddr(oMessage.oBcc.aCollection)

    this.currentAccountEmail(oAccount.email())
    this.allRecipients(_.uniq(_.union(this.aToAddr(), this.aCcAddr(), this.aBccAddr())))

    this.midDate(oMessage.oDateModel.getMidDate())
    this.fullDate(oMessage.oDateModel.getFullDate())

    this.isLoading(oMessage.longUid() !== '' && !oMessage.completelyFilled())

    this.setMessageBody()

    if (!Settings.DisableRtlRendering) {
      this.rtlMessage(oMessage.rtl())
    }

    if (App.isNewTab()) {
      /*jshint onevar: false*/
      var aAtachments = []
      /*jshint onevar: true*/

      _.each(
        oMessage.attachments(),
        _.bind(function (oAttach) {
          var oCopy = new CAttachmentModel(oAttach.iAccountId)
          oCopy.copyProperties(oAttach)
          aAtachments.push(oCopy)
        }, this)
      )

      this.attachments(aAtachments)
    } else {
      this.attachments(oMessage.attachments())
    }

    if (!oMessage.completelyFilled() || oMessage.truncated()) {
      /*jshint onevar: false*/
      var oSubscribedField = !oMessage.completelyFilled() ? oMessage.completelyFilled : oMessage.truncated
      /*jshint onevar: true*/
      if (App.isNewTab()) {
        oMessage.completelyFilledNewTabSubscription = oSubscribedField.subscribe(this.onCurrentMessageSubscribe, this)
      } else {
        oMessage.completelyFilledSubscription = oSubscribedField.subscribe(this.onCurrentMessageSubscribe, this)
      }
    } else if (oMessage.completelyFilledSubscription) {
      oMessage.completelyFilledSubscription.dispose()
      oMessage.completelyFilledSubscription = undefined
    } else if (oMessage.completelyFilledNewTabSubscription) {
      oMessage.completelyFilledNewTabSubscription.dispose()
      oMessage.completelyFilledNewTabSubscription = undefined
    }
  } else {
    this.hasReplyAllCcAddrs(false)

    this.isLoading(false)
    $(this.domTextBody()).empty().data('displayed-message-uid', '')
    this.displayedMessageUid('')
    this.rtlMessage(false)

    // cannot use removeAll, because the attachments of messages are passed by reference
    // and the call to removeAll removes attachments from message in the cache too.
    this.attachments([])
    this.visiblePicturesControl(false)
    this.visibleShowPicturesLink(false)
  }

  this.doAfterPopulatingMessage()
}

CMessagePaneView.prototype.updateMomentDate = function () {
  var oMessage = this.currentMessage()
  if (oMessage && oMessage.oDateModel) {
    this.midDate(oMessage.oDateModel.getMidDate())
    this.fullDate(oMessage.oDateModel.getFullDate())
  }
}

CMessagePaneView.prototype.setMessageBody = function () {
  if (this.currentMessage()) {
    var oMessage = this.currentMessage(),
      sText = oMessage.text(),
      $body = $(this.domTextBody()),
      oDom = null,
      sHtml = '',
      sLen = sText.length,
      sMaxLen = 5000000,
      aCollapsedStatuses = []
    this.textBody(sText)

    if ($body.data('displayed-message-uid') === oMessage.longUid()) {
      aCollapsedStatuses = this.getBlockquotesStatus()
    }

    $body.empty()

    if (oMessage.isPlain() || sLen > sMaxLen) {
      $body.html(sText)

      this.visiblePicturesControl(false)
    } else {
      oDom = oMessage.getDomText()
      sHtml = oDom.length > 0 ? oDom.html() : ''

      $body.append(sHtml)

      this.visiblePicturesControl(oMessage.hasExternals() && !oMessage.isExternalsAlwaysShown())
      this.visibleShowPicturesLink(!oMessage.isExternalsShown())

      if (!TextUtils.htmlStartsWithBlockquote(sHtml)) {
        this.doHidingBlockquotes(aCollapsedStatuses)
      }
    }

    $body.data('displayed-message-uid', oMessage.longUid())
    this.displayedMessageUid(oMessage.longUid())
  }
}

CMessagePaneView.prototype.getBlockquotesStatus = function () {
  var aCollapsedStatuses = []

  $($('blockquote', $(this.domTextBody())).get()).each(function () {
    var $blockquote = $(this)

    if ($blockquote.hasClass('blockquote_before_toggle')) {
      aCollapsedStatuses.push($blockquote.hasClass('collapsed'))
    }
  })

  return aCollapsedStatuses
}

/**
 * @param {Array} aCollapsedStatuses
 */
CMessagePaneView.prototype.doHidingBlockquotes = function (aCollapsedStatuses) {
  var iMinHeightForHide = 120,
    iHiddenHeight = 80,
    iStatusIndex = 0
  $($('blockquote', $(this.domTextBody())).get()).each(function () {
    var $blockquote = $(this),
      $parentBlockquotes = $blockquote.parents('blockquote'),
      $switchButton = $('<span class="blockquote_toggle"></span>').html(
        TextUtils.i18n('MAILWEBCLIENT/ACTION_SHOW_QUOTED_TEXT')
      ),
      bHidden = true
    if ($parentBlockquotes.length === 0) {
      if ($blockquote.height() > iMinHeightForHide) {
        $blockquote
          .addClass('blockquote_before_toggle')
          .after($switchButton)
          .wrapInner('<div class="blockquote_content"></div>')
        $switchButton.bind('click', function () {
          if (bHidden) {
            $blockquote.height('auto')
            $switchButton.html(TextUtils.i18n('MAILWEBCLIENT/ACTION_HIDE_QUOTED_TEXT'))
            bHidden = false
          } else {
            $blockquote.height(iHiddenHeight)
            $switchButton.html(TextUtils.i18n('MAILWEBCLIENT/ACTION_SHOW_QUOTED_TEXT'))
            bHidden = true
          }

          $blockquote.toggleClass('collapsed', bHidden)
        })
        if (iStatusIndex < aCollapsedStatuses.length) {
          bHidden = aCollapsedStatuses[iStatusIndex]
          iStatusIndex++
        }
        $blockquote.height(bHidden ? iHiddenHeight : 'auto').toggleClass('collapsed', bHidden)
      }
    }
  })
}

/**
 * @param {Array} aParams
 */
CMessagePaneView.prototype.onRoute = function (aParams) {
  var oParams = LinksUtils.parseMailbox(aParams),
    sFolder = oParams.Folder,
    sUid = oParams.Uid,
    oIdentifiers = MailCache.getMessageActualIdentifiers(MailCache.currentAccountId(), sFolder, sUid)
  AccountList.changeCurrentAccountByHash(oParams.AccountHash)

  if (this.replyText() !== '' && this.uid() !== oIdentifiers.sUid) {
    this.saveReplyMessage(false)
  }

  this.accountId(oIdentifiers.iAccountId)
  this.uid(oIdentifiers.sUid)
  this.folder(oIdentifiers.sFolder)
  MailCache.setCurrentMessage(oIdentifiers.iAccountId, oIdentifiers.sFolder, oIdentifiers.sUid)

  if (App.isNewTab) {
    MailCache.setCurrentFolder(oParams.Folder, oParams.Filters)
  }
  this.contentHasFocus(true)
}

CMessagePaneView.prototype.showPictures = function () {
  MailCache.showExternalPictures(false)
  this.visibleShowPicturesLink(false)
  this.setMessageBody()
}

CMessagePaneView.prototype.alwaysShowPictures = function () {
  var sEmail = this.currentMessage() ? this.currentMessage().oFrom.getFirstEmail() : ''

  if (sEmail.length > 0) {
    Ajax.send('SetEmailSafety', { Email: sEmail })
  }

  MailCache.showExternalPictures(true)
  this.visiblePicturesControl(false)
  this.setMessageBody()
}

CMessagePaneView.prototype.openInNewWindow = function () {
  this.openMessageInNewWindowBound(this.currentMessage())
}

CMessagePaneView.prototype.getReplyHtmlText = function () {
  return (
    '<div style="font-family: ' +
    this.sDefaultFontName +
    '; font-size: 16px">' +
    SendingUtils.getHtmlFromText(this.replyText()) +
    '</div>'
  )
}

/**
 * @param {string} sReplyType
 */
CMessagePaneView.prototype.executeReplyOrForward = function (sReplyType) {
  if (this.currentMessage()) {
    SendingUtils.setReplyData(this.getReplyHtmlText(), this.replyDraftUid())

    this.replyText('')
    this.replyDraftUid('')

    ComposeUtils.composeMessageAsReplyOrForward(
      sReplyType,
      this.currentMessage().accountId(),
      this.currentMessage().folder(),
      this.currentMessage().longUid()
    )
  }
}

CMessagePaneView.prototype.executeDeleteMessage = function () {
  if (this.currentMessage()) {
    if (MainTab) {
      MainTab.deleteMessage(this.currentMessage().longUid(), function () {
        window.close()
      })
    } else if (App.isMobile()) {
      MailUtils.deleteMessages([this.currentMessage().longUid()], App)
    }
  }
}

CMessagePaneView.prototype.executePrevMessage = function () {
  if (this.isEnablePrevMessage()) {
    Routing.setHash(
      LinksUtils.getViewMessage(
        MailCache.currentAccountId(),
        MailCache.getCurrentFolderFullname(),
        this.prevMessageUid()
      )
    )
  }
}

CMessagePaneView.prototype.executeNextMessage = function () {
  if (this.isEnableNextMessage()) {
    Routing.setHash(
      LinksUtils.getViewMessage(
        MailCache.currentAccountId(),
        MailCache.getCurrentFolderFullname(),
        this.nextMessageUid()
      )
    )
  }
}

CMessagePaneView.prototype.executeReply = function () {
  this.executeReplyOrForward(Enums.ReplyType.Reply)
}

CMessagePaneView.prototype.executeReplyAll = function () {
  this.executeReplyOrForward(Enums.ReplyType.ReplyAll)
}

CMessagePaneView.prototype.executeResend = function () {
  this.executeReplyOrForward(Enums.ReplyType.Resend)
}

CMessagePaneView.prototype.executeForward = function () {
  this.executeReplyOrForward(Enums.ReplyType.Forward)
}

CMessagePaneView.prototype.executePrint = function () {
  var oMessage = this.currentMessage(),
    oWin = oMessage ? WindowOpener.open('', this.subject() + '-print') : null,
    sHtml = ''
  if (oMessage && oWin) {
    this.textBodyForNewWindow(oMessage.getConvertedHtml(UrlUtils.getAppPath(), true))
    sHtml = $(this.domMessageForPrint()).html()

    oWin.document.title = this.subject()
    $(oWin.document.body).html(sHtml)
    oWin.print()
  }
}

CMessagePaneView.prototype.executeSave = function () {
  if (this.isEnableSave() && this.currentMessage()) {
    UrlUtils.downloadByUrl(this.currentMessage().sDownloadAsEmlUrl, true)
  }
}

CMessagePaneView.prototype.executeForwardAsAttachment = function () {
  if (this.currentMessage()) {
    ComposeUtils.composeMessageWithEml(this.currentMessage())
  }
}

CMessagePaneView.prototype.changeAddMenuVisibility = function () {
  var bVisibility = !this.visibleAddMenu()
  this.visibleAddMenu(bVisibility)
}

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CMessagePaneView.prototype.onSendOrSaveMessageResponse = function (oResponse, oRequest) {
  var oResData = SendingUtils.onSendOrSaveMessageResponse(oResponse, oRequest, this.requiresPostponedSending())
  switch (oResData.Method) {
    case 'SendMessage':
      this.replySendingStarted(false)
      if (oResData.Result) {
        this.replyText('')
      }
      break
    case 'SaveMessage':
      if (oResData.Result) {
        this.replyDraftUid(oResData.NewUid)
      }
      this.replySavingStarted(false)
      this.replyAutoSavingStarted(false)
      break
  }
}

CMessagePaneView.prototype.executeSendQuickReply = function () {
  if (this.isEnableSendQuickReply()) {
    this.replySendingStarted(true)
    this.requiresPostponedSending(this.replyAutoSavingStarted())
    SendingUtils.sendReplyMessage(
      'SendMessage',
      this.getReplyHtmlText(),
      this.replyDraftUid(),
      this.onSendOrSaveMessageResponse,
      this,
      this.requiresPostponedSending()
    )

    this.replyTextFocus(false)
  }
}

CMessagePaneView.prototype.executeSaveQuickReply = function () {
  this.saveReplyMessage(false)
}

/**
 * @param {Boolean} bAutosave
 */
CMessagePaneView.prototype.saveReplyMessage = function (bAutosave) {
  if (this.isEnableSaveQuickReply()) {
    if (bAutosave) {
      this.replyAutoSavingStarted(true)
    } else {
      this.replySavingStarted(true)
    }
    SendingUtils.sendReplyMessage(
      'SaveMessage',
      this.getReplyHtmlText(),
      this.replyDraftUid(),
      this.onSendOrSaveMessageResponse,
      this
    )
  }
}

/**
 * Stops autosave.
 */
CMessagePaneView.prototype.stopAutosaveTimer = function () {
  window.clearTimeout(this.autoSaveTimer)
}

/**
 * Starts autosave.
 */
CMessagePaneView.prototype.startAutosaveTimer = function () {
  if (this.isEnableSaveQuickReply()) {
    var fSave = _.bind(this.saveReplyMessage, this, true)
    this.stopAutosaveTimer()
    if (Settings.AllowAutosaveInDrafts) {
      this.autoSaveTimer = window.setTimeout(fSave, Settings.AutoSaveIntervalSeconds * 1000)
    }
  }
}

CMessagePaneView.prototype.executeAllAttachmentsDownloadMethod = function (fHandler) {
  const message = this.currentMessage()
  if (message) {
    const notInlineAttachments = message.notInlineAttachments(),
      hashes = notInlineAttachments.map((attach) => attach.hash())
    fHandler(message.accountId(), hashes, notInlineAttachments)
  }
}

CMessagePaneView.prototype.downloadAllAttachmentsSeparately = function () {
  if (this.currentMessage()) {
    this.currentMessage().downloadAllAttachmentsSeparately()
  }
}

CMessagePaneView.prototype.onShow = function () {
  this.bShown = true
}

CMessagePaneView.prototype.onHide = function () {
  this.bShown = false
  this.accountId(0)
  this.folder('')
  this.uid('')
  _.each(
    this.controllers(),
    _.bind(function (oController) {
      if (_.isFunction(oController.onHide)) {
        oController.onHide()
      }
    }, this)
  )
}

/**
 * @param {Object} $MailViewDom
 */
CMessagePaneView.prototype.onBind = function ($MailViewDom) {
  ModulesManager.run('SessionTimeoutWeblient', 'registerFunction', [
    _.bind(function () {
      if (this.replyText() !== '') {
        this.saveReplyMessage(false)
      }
    }, this),
  ])

  this.$MailViewDom = _.isUndefined($MailViewDom) ? this.$viewDom : $MailViewDom

  this.$MailViewDom.on('mousedown', 'a', function (oEvent) {
    if (oEvent && 3 !== oEvent['which']) {
      var sHref = $(this).attr('href')
      if (sHref && 'mailto:' === sHref.toString().toLowerCase().substr(0, 7)) {
        ComposeUtils.composeMessageToAddresses(sHref.toString())
        return false
      }
    }

    return true
  })

  if (!App.isMobile()) {
    this.hotKeysBind()
  }
}

CMessagePaneView.prototype.hotKeysBind = function () {
  $(document).on(
    'keydown',
    $.proxy(function (ev) {
      const allowReply =
        this.bShown &&
        ev &&
        !(ev.ctrlKey || ev.metaKey) &&
        !ev.shiftKey &&
        !Utils.isTextFieldFocused() &&
        this.isEnableReply()

      if (allowReply && ev.keyCode === Enums.Key.q) {
        ev.preventDefault()
        this.replyTextFocus(true)
      } else if (allowReply && ev.keyCode === Enums.Key.r) {
        ev.preventDefault()
        this.executeReply()
      }
    }, this)
  )
}

CMessagePaneView.prototype.showSourceHeaders = function () {
  var oMessage = this.currentMessage(),
    oWin = oMessage && oMessage.completelyFilled() ? WindowOpener.open('', this.subject() + '-headers') : null
  if (oWin) {
    $(oWin.document.body).html('<pre>' + TextUtils.encodeHtml(oMessage.sourceHeaders()) + '</pre>')
  }
}

CMessagePaneView.prototype.switchDetailsVisibility = function () {
  this.detailsVisible(!this.detailsVisible())
  Storage.setData('aurora_mail_is-message-details-visible', this.detailsVisible())
}

/**
 * @param {Object} oController
 * @param {string} sPlace
 */
CMessagePaneView.prototype.registerController = function (oController, sPlace) {
  switch (sPlace) {
    case 'OnMessageToolbar':
      this.messageToolbarControllers.push(oController)
      break
    case 'BeforeMessageHeaders':
      this.topControllers.push(oController)
      break
    case 'BeforeMessageBody':
      this.bodyControllers.push(oController)
      break
    case 'AfterMessageBody':
      this.bottomControllers.push(oController)
      break
  }

  if (_.isFunction(oController.assignMessagePaneExtInterface)) {
    oController.assignMessagePaneExtInterface(this.getExtInterface())
  }
}

/**
 * @returns {Object}
 */
CMessagePaneView.prototype.getExtInterface = function () {
  return {
    changeText: _.bind(function (sText) {
      var oMessage = this.currentMessage()
      if (oMessage && this.isCurrentMessageLoaded()) {
        oMessage.changeText(sText)
        this.setMessageBody()
      }
    }, this),
  }
}

CMessagePaneView.prototype.doAfterPopulatingMessage = function () {
  var oMessage = this.currentMessage(),
    bLoaded = oMessage && !this.isLoading(),
    oMessageProps = bLoaded
      ? {
          iAccountId: oMessage.accountId(),
          sFolderFullName: oMessage.folder(),
          sMessageUid: oMessage.uid(),
          aToEmails: oMessage.oTo.getEmails(),
          bPlain: oMessage.isPlain(),
          sRawText: oMessage.textRaw(),
          sText: oMessage.text(),
          sAccountEmail: AccountList.getEmail(oMessage.accountId()),
          sFromEmail: oMessage.oFrom.getFirstEmail(),
          iSensitivity: oMessage.sensitivity(),
          aExtend: oMessage.aExtend,
        }
      : null
  _.each(
    this.controllers(),
    _.bind(function (oController) {
      if (_.isFunction(oController.doAfterPopulatingMessage)) {
        oController.doAfterPopulatingMessage(oMessageProps)
      }
    }, this)
  )

  ModulesManager.run('ContactsWebclient', 'applyContactsCards', [this.$MailViewDom.find('span.address')])
}

CMessagePaneView.prototype.searchBySubject = function () {
  if (Settings.AllowSearchMessagesBySubject && this.currentMessage()) {
    var sFolder = this.currentMessage().folder(),
      iPage = 1,
      sUid = this.currentMessage().longUid(),
      sSearch = '',
      sFilters = '',
      sSubject = this.currentMessage().subject(),
      aSubject = sSubject.split(':'),
      aPrefixes = Settings.PrefixesToRemoveBeforeSearchMessagesBySubject,
      aSearch = []
    if (aPrefixes.length === 0) {
      sSearch = aSubject
    } else {
      _.each(aSubject, function (sSubjPart) {
        if (aSearch.length > 0) {
          aSearch.push(sSubjPart)
        } else {
          var hasPrefix = false
          var sTrimSubjPart = $.trim(sSubjPart)
          _.each(aPrefixes, function (sPref) {
            var re = new RegExp('^' + sPref + '(\\[\\d*\\]){0,1}$', 'i')
            hasPrefix = hasPrefix || re.test(sTrimSubjPart)
          })
          if (!hasPrefix) {
            aSearch.push(sSubjPart)
          }
        }
      })
      sSearch = $.trim(aSearch.join(':'))
    }

    Routing.setHash(LinksUtils.getMailbox(sFolder, iPage, sUid, sSearch, sFilters))
  }
}

module.exports = new CMessagePaneView()


/***/ }),

/***/ "nWzW":
/*!******************************************************************************!*\
  !*** ./modules/MailWebclient/js/views/message-pane/UnsubscribeButtonView.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),

	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),

	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	ConfirmPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/ConfirmPopup.js */ "XeMN"),
	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),

	LinksUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Links.js */ "CPab"),

	Ajax = __webpack_require__(/*! modules/MailWebclient/js/Ajax.js */ "QaEg"),
	MailCache  = __webpack_require__(/*! modules/MailWebclient/js/Cache.js */ "F0Fd")
;

/**
 * @constructor
 */
function CUnsubscribeButtonView()
{
	this.unsubscribeOneClick = ko.observable(false);
	this.unsubscribeUrl = ko.observable('');
	this.unsubscribeEmail = ko.observable('');
	this.allowUnsubscribe = ko.observable(false);
	ko.computed(function () {
		const message = MailCache.currentMessage();
		if (message && message.completelyFilled()) {
			this.unsubscribeOneClick(Types.pBool(message.unsubscribe.OneClick));
			this.unsubscribeUrl(Types.pString(message.unsubscribe.Url));
			this.unsubscribeEmail(Types.pString(message.unsubscribe.Email));
			this.allowUnsubscribe(this.unsubscribeOneClick() || this.unsubscribeUrl() !== '' || this.unsubscribeEmail() !== '');
		}
	}, this).extend({ rateLimit: 100 });
}

CUnsubscribeButtonView.prototype.ViewTemplate = 'MailWebclient_Message_UnsubscribeButtonView';

CUnsubscribeButtonView.prototype.unsubscribe = function ()
{
	const currentMessage = MailCache.currentMessage();
	if (currentMessage) {
		if (this.unsubscribeOneClick()) {
			const parameters = {
				'AccountID': currentMessage.accountId(),
				'Folder': currentMessage.folder(),
				'Uid': currentMessage.uid()
			};
			Ajax.send('Unsubscribe', parameters, this.onUnsubscribeResponse, this);
		} else if (this.unsubscribeEmail()) {
			this.unsubscribeWithEmail();
		} else if (this.unsubscribeUrl()) {
			window.open(this.unsubscribeUrl(), '_blank');
		}
	}
};

CUnsubscribeButtonView.prototype.onUnsubscribeResponse = function (response, request)
{
	if (response && response.Result) {
		Screens.showReport(TextUtils.i18n('MAILWEBCLIENT/REPORT_UNSUBSCRIBE_MESSAGE_SUCCESS'));
	} else {
		Api.showErrorByCode(response, TextUtils.i18n('MAILWEBCLIENT/ERROR_UNSUBSCRIBE_MESSAGE_FAIL'));
	}
};

CUnsubscribeButtonView.prototype.unsubscribeWithEmail = function ()
{
	const
		parts = LinksUtils.parseToAddr(this.unsubscribeEmail()),
		recipients = _.compact([parts.to, parts.cc, parts.bcc]),
		confirmParams = {RECIPIENT: recipients.join(', '), SUBJECT: parts.subject},
		confirmText = parts.subject
			? TextUtils.i18n('MAILWEBCLIENT/CONFIRM_UNSUBSCRIBE_WITH_EMAIL_AND_SUBJECT', confirmParams)
			: TextUtils.i18n('MAILWEBCLIENT/CONFIRM_UNSUBSCRIBE_WITH_EMAIL', confirmParams),
		sendButtonText = TextUtils.i18n('MAILWEBCLIENT/ACTION_SEND'),
		confirmCallback = (isConfirmed) => {
			if (isConfirmed) {
				this.sendUnsubscribeEmail(parts);
			}
		}
	;
	Popups.showPopup(ConfirmPopup, [confirmText, confirmCallback, '', sendButtonText]);
};

CUnsubscribeButtonView.prototype.sendUnsubscribeEmail = function (parts)
{
	const parameters = {
		'To': parts.to,
		'Cc': parts.cc,
		'Bcc': parts.bcc,
		'Subject': parts.subject,
		'Text': parts.body
	};
	Ajax.send('SendMessage', parameters, this.onUnsubscribeResponse, this);
};

module.exports = new CUnsubscribeButtonView();


/***/ }),

/***/ "ixCM":
/*!*******************************************************************!*\
  !*** ./modules/MailWebclient/js/views/message/SpamButtonsView.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const
	ko = __webpack_require__(/*! knockout */ "p09A"),

	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),

	Ajax = __webpack_require__(/*! modules/MailWebclient/js/Ajax.js */ "QaEg"),
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),

	AccountList = __webpack_require__(/*! modules/MailWebclient/js/AccountList.js */ "7xgn"),
	MailCache = __webpack_require__(/*! modules/MailWebclient/js/Cache.js */ "F0Fd")
;

/**
 * @constructor
 */
function SpamButtonsView()
{
	this.allowSpamButtons = ko.observable(false);

	this.isCurrentMessageLoaded = ko.observable(false);

	this.neverSpamCommand = Utils.createCommand(this, this.neverSpam, this.isCurrentMessageLoaded);
	this.alwaysSpamCommand = Utils.createCommand(this, this.alwaysSpam, this.isCurrentMessageLoaded);
}

SpamButtonsView.prototype.ViewTemplate = 'MailWebclient_Message_SpamButtonsView';

/**
 * @param {Object} parameters
 */
SpamButtonsView.prototype.doAfterPopulatingMessage = function (parameters)
{
	const
		message = MailCache.currentMessage(),
		account = message ? AccountList.getAccount(message.accountId()) : AccountList.getCurrent(),
		enableAllowBlockLists = account ? account.enableAllowBlockLists() : false,
		isTemplateFolder = MailCache.isTemplateFolder(message && message.folder());
	;
	this.allowSpamButtons(enableAllowBlockLists && !isTemplateFolder);

	this.isCurrentMessageLoaded(!!parameters);
};

SpamButtonsView.prototype.neverSpam = function ()
{
	const
		message = MailCache.currentMessage(),
		email = message.oFrom.getFirstEmail(),
		parameters = {
			'AccountID': AccountList.editedId(),
			'Email': email
		}
	;
	Ajax.send('AddEmailToAllowList', parameters, function (response) {
		if (response && response.Result) {
			Screens.showReport(TextUtils.i18n('MAILWEBCLIENT/REPORT_ADD_EMAIL_TO_ALLOWLIST_SUCCESS', {'EMAIL': email}));
		} else {
			Api.showErrorByCode(response, TextUtils.i18n('MAILWEBCLIENT/ERROR_ADD_EMAIL_TO_ALLOWLIST', {'EMAIL': email}));
		}
	}, this);
};

SpamButtonsView.prototype.alwaysSpam = function ()
{
	var
		message = MailCache.currentMessage(),
		email = message.oFrom.getFirstEmail(),
		parameters = {
			'AccountID': AccountList.editedId(),
			'Email': email
		}
	;
	Ajax.send('AddEmailToBlockList', parameters, function (response) {
		if (response && response.Result) {
			Screens.showReport(TextUtils.i18n('MAILWEBCLIENT/REPORT_ADD_EMAIL_TO_BLOCKLIST_SUCCESS', {'EMAIL': email}));
		} else {
			Api.showErrorByCode(response, TextUtils.i18n('MAILWEBCLIENT/ERROR_ADD_EMAIL_TO_BLOCKLIST', {'EMAIL': email}));
		}
	}, this);
};

module.exports = new SpamButtonsView();


/***/ })

}]);