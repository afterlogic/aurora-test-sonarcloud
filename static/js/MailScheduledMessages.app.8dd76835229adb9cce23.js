"use strict";
(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[25],{

/***/ "A3in":
/*!****************************************************!*\
  !*** ./modules/CoreWebclient/js/utils/Calendar.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



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

/***/ "vjMU":
/*!******************************************************!*\
  !*** ./modules/MailScheduledMessages/js/Settings.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	_ = __webpack_require__(/*! underscore */ "C3HO"),

	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L")
;

module.exports = {
	ScheduledFolderName: '',
	PredefinedSchedule: [],

	CurrentScheduledFolderName: '',

	/**
	 * Initializes settings from AppData object sections.
	 *
	 * @param {Object} oAppData Object contains modules settings.
	 */
	init: function (oAppData) {
		var oAppDataSection = oAppData['MailScheduledMessages'];

		if (!_.isEmpty(oAppDataSection)) {
			this.ScheduledFolderName = Types.pString(oAppDataSection.ScheduledFolderName, this.ScheduledFolderName);
			this.PredefinedSchedule = Types.pArray(oAppDataSection.PredefinedSchedule, this.PredefinedSchedule);
		}
	},

	setCurrentScheduledFolder: function (sCurrentScheduledFolderName) {
		this.CurrentScheduledFolderName = sCurrentScheduledFolderName;
	}
};


/***/ }),

/***/ "ChcL":
/*!*****************************************************!*\
  !*** ./modules/MailScheduledMessages/js/manager.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



module.exports = function (oAppData) {
	var
		ko = __webpack_require__(/*! knockout */ "p09A"),

		TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),

		App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),

		Settings = __webpack_require__(/*! modules/MailScheduledMessages/js/Settings.js */ "vjMU")
	;

	__webpack_require__(/*! jquery-ui/ui/widgets/datepicker */ "okSt");

	Settings.init(oAppData);

	var
		sScheduledName = Settings.ScheduledFolderName,
		sScheduledFullName = Settings.ScheduledFolderName
	;

	function SetScheduledFolder(koFolderList) {
		var
			sNameSpace = koFolderList().sNamespaceFolder,
			sDelimiter = koFolderList().sDelimiter
		;
		if (sNameSpace !== '') {
			sScheduledFullName = sNameSpace + sDelimiter + sScheduledName;
		} else {
			sScheduledFullName = sScheduledName;
		}

		var oScheduledFolder = koFolderList().getFolderByFullName(sScheduledFullName);
		if (oScheduledFolder) {
			Settings.setCurrentScheduledFolder(sScheduledFullName);
			oScheduledFolder.displayName = ko.observable(TextUtils.i18n('MAILSCHEDULEDMESSAGES/LABEL_FOLDER_SCHEDULED'));
			oScheduledFolder.usedAs = ko.observable(TextUtils.i18n('MAILSCHEDULEDMESSAGES/LABEL_USED_AS_SCHEDULED'));
			oScheduledFolder.setDisableMoveTo(true);
			oScheduledFolder.setDisableMoveFrom(true);
			oScheduledFolder.setShowTotalInsteadUnseenCount(true);
		} else {
			Settings.setCurrentScheduledFolder('');
		}
	}

	if (App.isUserNormalOrTenant()) {
		return {
			start: function (ModulesManager) {
				if (ModulesManager.isModuleEnabled('MailWebclient')) {

					ModulesManager.run('MailWebclient', 'registerComposeToolbarController', [__webpack_require__(/*! modules/MailScheduledMessages/js/views/ComposeSendButtonView.js */ "6Z3g")]);

					App.subscribeEvent('MailWebclient::ConstructView::before', function (oParams) {
						if (oParams.Name === 'CMailView') {
							var
								koFolderList = oParams.MailCache.folderList,
								koCurrentFolder = ko.computed(function () {
									return oParams.MailCache.folderList().currentFolder();
								})
							;
							SetScheduledFolder(koFolderList);
							koFolderList.subscribe(function () {
								SetScheduledFolder(koFolderList);
							});
							koCurrentFolder.subscribe(function () {
								var sFullName = koCurrentFolder() ? koCurrentFolder().fullName() : '';
								if (sFullName === sScheduledFullName) {
									oParams.View.resetDisabledTools('MailScheduledMessages', ['spam', 'move']);
								} else {
									oParams.View.resetDisabledTools('MailScheduledMessages', []);
								}
							});
						}
					});

					App.subscribeEvent('MailWebclient::RegisterMessagePaneController', function (fRegisterMessagePaneController) {
						fRegisterMessagePaneController(__webpack_require__(/*! modules/MailScheduledMessages/js/views/ScheduledInfoView.js */ "Wmfn"), 'BeforeMessageBody');
					});
				}
			}
		};
	}

	return null;
};


/***/ }),

/***/ "0I4a":
/*!***************************************************************************************!*\
  !*** ./modules/MailScheduledMessages/js/popups/ConfirmAnotherMessageComposedPopup.js ***!
  \***************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	
	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX")
;

/**
 * @constructor
 */
function CConfirmAnotherMessageComposedPopup()
{
	CAbstractPopup.call(this);
	
	this.fConfirmCallback = null;
	this.shown = false;
}

_.extendOwn(CConfirmAnotherMessageComposedPopup.prototype, CAbstractPopup.prototype);

CConfirmAnotherMessageComposedPopup.prototype.PopupTemplate = 'MailScheduledMessages_ConfirmAnotherMessageComposedPopup';

/**
 * @param {Function} fConfirmCallback
 */
CConfirmAnotherMessageComposedPopup.prototype.onOpen = function (fConfirmCallback)
{
	this.fConfirmCallback = _.isFunction(fConfirmCallback) ? fConfirmCallback : null;
	this.shown = true;
};

CConfirmAnotherMessageComposedPopup.prototype.onClose = function ()
{
	this.shown = false;
};

CConfirmAnotherMessageComposedPopup.prototype.onDiscardClick = function ()
{
	if (this.shown && this.fConfirmCallback)
	{
		this.fConfirmCallback(Enums.AnotherMessageComposedAnswer.Discard);
	}

	this.closePopup();
};

CConfirmAnotherMessageComposedPopup.prototype.onSaveAsDraftClick = function ()
{
	if (this.shown && this.fConfirmCallback)
	{
		this.fConfirmCallback(Enums.AnotherMessageComposedAnswer.SaveAsDraft);
	}

	this.closePopup();
};

CConfirmAnotherMessageComposedPopup.prototype.cancelPopup = function ()
{
	if (this.fConfirmCallback)
	{
		this.fConfirmCallback(Enums.AnotherMessageComposedAnswer.Cancel);
	}

	this.closePopup();
};

CConfirmAnotherMessageComposedPopup.prototype.onEnterHandler = function ()
{
	this.onSaveAsDraftClick();
};

module.exports = new CConfirmAnotherMessageComposedPopup();

/***/ }),

/***/ "VANH":
/*!*************************************************************************!*\
  !*** ./modules/MailScheduledMessages/js/popups/ScheduleSendingPopup.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "M4cL");


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	moment = __webpack_require__(/*! moment */ "sdEb"),

	CalendarUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Calendar.js */ "A3in"),
	DateUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Date.js */ "injE"),
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),

	Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
	UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV"),

	ScheduleUtils = __webpack_require__(/*! modules/MailScheduledMessages/js/utils/Schedule.js */ "MYnu"),

	Settings = __webpack_require__(/*! modules/MailScheduledMessages/js/Settings.js */ "vjMU")
;

/**
 * @constructor
 */
function CScheduleSendingPopup() {
	CAbstractPopup.call(this);

	this.oCompose = null;
	this.fOnClose = null;

	this.aOptions = ScheduleUtils.getPredefinedOptions();
	this.scheduledTime = ko.observable(0);

	this.timeFormatMoment = 'HH:mm';
	this.dateFormatMoment = 'MM/DD/YYYY';
	this.dateFormatDatePicker = 'mm/dd/yy';
	this.dateDom = ko.observable(null);
	this.timeOptions = ko.observableArray(CalendarUtils.getTimeListStepHalfHour((UserSettings.timeFormat() !== Enums.TimeFormat.F24) ? 'hh:mm A' : 'HH:mm'));
	UserSettings.timeFormat.subscribe(function () {
		this.timeOptions(CalendarUtils.getTimeListStepHalfHour((UserSettings.timeFormat() !== Enums.TimeFormat.F24) ? 'hh:mm A' : 'HH:mm'));
	}, this);
	this.selectedDate = ko.observable('');
	this.selectedTime = ko.observable('');
	this.selectedTime.subscribe(function () {
		if (this.selectedTime() !== '')
		{
			this.selectDatetime();
		}
	}, this);
	this.lockSelectStartEndDate = ko.observable(false);
	this.initializeDatePickers();

	this.scheduleInProcess = ko.observable(false);
	this.scheduleCommand = Utils.createCommand(this, this.schedule, function () {
		return this.scheduledTime() !== 0 && !this.scheduleInProcess();
	}.bind(this));
}

_.extendOwn(CScheduleSendingPopup.prototype, CAbstractPopup.prototype);

CScheduleSendingPopup.prototype.PopupTemplate = 'MailScheduledMessages_ScheduleSendingPopup';

CScheduleSendingPopup.prototype.onOpen = function (oCompose, fOnClose) {
	this.oCompose = oCompose;
	this.fOnClose = fOnClose;
	this.timeFormatMoment = (UserSettings.timeFormat() === Enums.TimeFormat.F24) ? 'HH:mm' : 'hh:mm A';
	this.dateFormatMoment = Utils.getDateFormatForMoment(UserSettings.dateFormat());
	this.dateFormatDatePicker = CalendarUtils.getDateFormatForDatePicker(UserSettings.dateFormat());
	this.selectedDate('');
	this.selectedTime('');
	this.scheduledTime(0);
	this.initializeDatePickers();
};

CScheduleSendingPopup.prototype.initializeDatePickers = function () {
	if (this.dateDom()) {
		this.createDatePickerObject(this.dateDom(), this.selectDatetime.bind(this));
		this.dateDom().datepicker('option', 'dateFormat', this.dateFormatDatePicker);
	}
};

CScheduleSendingPopup.prototype.createDatePickerObject = function (oElement, fSelect) {
	$(oElement).datepicker({
		showOtherMonths: true,
		selectOtherMonths: true,
		monthNames: DateUtils.getMonthNamesArray(),
		dayNamesMin: TextUtils.i18n('COREWEBCLIENT/LIST_DAY_NAMES_MIN').split(' '),
		nextText: '',
		prevText: '',
		firstDay: ModulesManager.run('CalendarWebclient', 'getWeekStartsOn', []),
		showOn: 'both',
		buttonText: ' ',
		dateFormat: this.dateFormatDatePicker,
		onSelect: fSelect
	});

	$(oElement).mousedown(function () {
		$('#ui-datepicker-div').toggle();
	});
};

CScheduleSendingPopup.prototype.selectDatetime = function () {
	if (!this.lockSelectStartEndDate()) {
		this.lockSelectStartEndDate(true);

		var
			oSelectedDate = this.getDateTime(this.dateDom(), this.selectedTime()),
			oSelectedMoment = moment(oSelectedDate)
		;

		this.selectedDate(this.getDateWithoutYearIfMonthWord($(this.dateDom()).val()));
		this.selectedTime(oSelectedMoment.isValid() ? oSelectedMoment.format(this.timeFormatMoment) : '');
		this.scheduledTime(oSelectedMoment.isValid() ? oSelectedMoment.unix() : 0);

		this.lockSelectStartEndDate(false);
	}
};

CScheduleSendingPopup.prototype.getDateTime = function (oInput, sTime) {
	sTime = sTime ? moment(sTime, this.timeFormatMoment).format('HH:mm') : '';

	var
		oDate = oInput.datepicker('getDate'),
		aTime = sTime ? sTime.split(':') : []
	;

	//in some cases aTime is a current time (it happens only once after page loading), in this case oDate is null, so code falls.
	// the checking if oDate is not null is necessary
	if (aTime.length === 2 && oDate !== null) {
		oDate.setHours(aTime[0]);
		oDate.setMinutes(aTime[1]);
	} else if (oDate !== null) {
		oDate.setHours(8);
		oDate.setMinutes(0);
	}

	return oDate;
};

CScheduleSendingPopup.prototype.getDateWithoutYearIfMonthWord = function (sDate) {
	var
		aDate = sDate.split(' '),
		oNowMoment = moment(),
		oNowYear = oNowMoment.format('YYYY')
	;

	if (aDate.length === 3 && oNowYear === aDate[2]) {
		return aDate[0] + ' ' + aDate[1];
	}
	return sDate;
};

CScheduleSendingPopup.prototype.selectScheduledTime = function (iUnix) {
	this.dateDom().val('');
	this.selectedDate('');
	this.selectedTime('');
	if (this.scheduledTime() === iUnix) {
		this.scheduledTime(0);
	} else {
		this.scheduledTime(iUnix);
	}
};

CScheduleSendingPopup.prototype.schedule = function () {
	if (_.isFunction(this.oCompose && this.oCompose.koAllAttachmentsUploaded)) {
		if (this.oCompose.koAllAttachmentsUploaded()) {
			this.scheduleAfterAllUploaded();
		} else {
			var oSubscription = this.oCompose.koAllAttachmentsUploaded.subscribe(function () {
				if (this.oCompose.koAllAttachmentsUploaded()) {
					this.scheduleAfterAllUploaded();
				}
				oSubscription.dispose();
			}, this);
		}
	} else {
		this.scheduleAfterAllUploaded();
	}
};

CScheduleSendingPopup.prototype.scheduleAfterAllUploaded = function () {
	if (_.isFunction(this.oCompose && this.oCompose.getSendSaveParameters)) {
		if (this.scheduledTime() < moment().unix()) {
			Screens.showError(TextUtils.i18n('MAILSCHEDULEDMESSAGES/ERROR_LATER_SCHEDULED_TIME'));
			return;
		}

		var oParameters = this.oCompose.getSendSaveParameters();
		if (oParameters.DraftUid && _.isFunction(this.oCompose && this.oCompose.getDraftFolderFullName)) {
			oParameters.DraftFolder = this.oCompose.getDraftFolderFullName(oParameters.AccountID);
		}
		oParameters.ScheduleDateTime = this.scheduledTime();
		this.scheduleInProcess(true);
		Ajax.send('MailScheduledMessages', 'SaveScheduledMessage', oParameters, function (oResponse) {
			this.scheduleInProcess(false);
			if (oResponse && oResponse.Result) {
				Screens.showReport(TextUtils.i18n('MAILSCHEDULEDMESSAGES/REPORT_SENDING_SCHEDULED'));
				this.closePopup();
				ModulesManager.run('MailWebclient', 'removeMessageFromCurrentList', [oParameters.AccountID, oParameters.DraftFolder, oParameters.DraftUid]);
				if (this.oCompose) {
					if (_.isFunction(this.oCompose.commitAndClose)) {
						this.oCompose.commitAndClose();
					}
					if (_.isFunction(this.oCompose.clearFolderCache)) {
						if (oParameters.DraftFolder) {
							this.oCompose.clearFolderCache(oParameters.AccountID, oParameters.DraftFolder);
						}
						if (Settings.CurrentScheduledFolderName) {
							this.oCompose.clearFolderCache(oParameters.AccountID, Settings.CurrentScheduledFolderName);
						}
					}
				}
			} else {
				Api.showErrorByCode(oResponse);
			}
		}, this);
	}
};

CScheduleSendingPopup.prototype.cancelPopup = function () {
	if (!this.scheduleInProcess()) {
		this.closePopup();
	}
};

CScheduleSendingPopup.prototype.onClose = function () {
	if (_.isFunction(this.fOnClose)) {
		this.fOnClose();
	}
};

module.exports = new CScheduleSendingPopup();


/***/ }),

/***/ "MYnu":
/*!************************************************************!*\
  !*** ./modules/MailScheduledMessages/js/utils/Schedule.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	moment = __webpack_require__(/*! moment */ "sdEb"),

	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),

	CDateModel = __webpack_require__(/*! modules/CoreWebclient/js/models/CDateModel.js */ "jNBr"),

	Settings = __webpack_require__(/*! modules/MailScheduledMessages/js/Settings.js */ "vjMU"),

	ScheduleUtils = {}
;

function getPredefinedHour(oScheduleItem) {
	var iHour = Types.pInt(oScheduleItem.Hour);
	if (iHour <= 12 && Types.isString(oScheduleItem.Hour) && oScheduleItem.Hour.toLowerCase().indexOf('pm') !== -1) {
		iHour += 12;
	}
	return iHour;
}

function getPredefinedMoment(oScheduleItem, iHour) {
	var oMoment = moment();
	if (oScheduleItem.DayOfWeek.toLowerCase() === 'today') {
		oMoment.set('hour', iHour).set('minute', 0).set('second', 0);
	} else if (oScheduleItem.DayOfWeek.toLowerCase() === 'tomorrow') {
		oMoment.add(1, 'd').set('hour', iHour).set('minute', 0).set('second', 0);
	} else {
		var
			oDays = {
				'sunday': 0,
				'monday': 1,
				'tuesday': 2,
				'wednesday': 3,
				'thursday': 4,
				'friday': 5,
				'saturday': 6
			},
			iDay = Types.pInt(oDays[oScheduleItem.DayOfWeek.toLowerCase()], 1)
		;
		if (iDay <= oMoment.day()) {
			iDay += 7;
		}
		oMoment.set('hour', iHour).set('minute', 0).set('second', 0).day(iDay);
	}
	return oMoment;
}

function getWhenLabel(oMoment, iHour) {
	var
		sWhenLabel = '',
		oDaysTexts = {
			0: TextUtils.i18n('MAILSCHEDULEDMESSAGES/LABEL_WHEN_SUNDAY'),
			1: TextUtils.i18n('MAILSCHEDULEDMESSAGES/LABEL_WHEN_MONDAY'),
			2: TextUtils.i18n('MAILSCHEDULEDMESSAGES/LABEL_WHEN_TUESDAY'),
			3: TextUtils.i18n('MAILSCHEDULEDMESSAGES/LABEL_WHEN_WEDNESDAY'),
			4: TextUtils.i18n('MAILSCHEDULEDMESSAGES/LABEL_WHEN_THURSDAY'),
			5: TextUtils.i18n('MAILSCHEDULEDMESSAGES/LABEL_WHEN_FRIDAY'),
			6: TextUtils.i18n('MAILSCHEDULEDMESSAGES/LABEL_WHEN_SATURDAY')
		},
		oNowMoment = moment()
	;

	if (oNowMoment.date() === oMoment.date()) {
		sWhenLabel = TextUtils.i18n('MAILSCHEDULEDMESSAGES/LABEL_WHEN_TODAY');
	} else if (oNowMoment.add(1, 'd').date() === oMoment.date()) {
		sWhenLabel = TextUtils.i18n('MAILSCHEDULEDMESSAGES/LABEL_WHEN_TOMORROW');
	} else {
		sWhenLabel = oDaysTexts[oMoment.day()];
	}

	if (iHour >= 0 && iHour <= 3) {
		sWhenLabel += ' ' + TextUtils.i18n('MAILSCHEDULEDMESSAGES/LABEL_WHEN_NIGHT');
	} else if (iHour >= 4 && iHour <= 11) {
		sWhenLabel += ' ' + TextUtils.i18n('MAILSCHEDULEDMESSAGES/LABEL_WHEN_MORNING');
	} else if (iHour >= 12 && iHour <= 16) {
		sWhenLabel += ' ' + TextUtils.i18n('MAILSCHEDULEDMESSAGES/LABEL_WHEN_AFTERNOON');
	} else if (iHour >= 16 && iHour <= 23) {
		sWhenLabel += ' ' + TextUtils.i18n('MAILSCHEDULEDMESSAGES/LABEL_WHEN_EVENING');
	}

	return sWhenLabel;
}

ScheduleUtils.getPredefinedOptions = function () {
	var aOptions = [];
	if (_.isArray(Settings.PredefinedSchedule)) {
		_.each(Settings.PredefinedSchedule, function (oScheduleItem) {
			var
				iHour = getPredefinedHour(oScheduleItem),
				oMoment = getPredefinedMoment(oScheduleItem, iHour)
			;

			aOptions.push({
				LeftLabel: getWhenLabel(oMoment, iHour),
				RightLabel: oMoment.format('D MMM, ' + CDateModel.prototype.getTimeFormat()),
				Unix: oMoment.unix()
			});
		});
	}
	aOptions.sort(function (left, right) {
		return left.Unix === right.Unix ? 0 : (left.Unix < right.Unix ? -1 : 1);
	});

	var aResultOptions = [];
	_.each(aOptions, function (oOption) {
		if (oOption.Unix > moment().unix() && !_.find(aResultOptions, function (oResOption) {
			return oOption.Unix === oResOption.Unix
		})) {
			aResultOptions.push(oOption);
		}
	});
	return _.uniq(aResultOptions);
};

ScheduleUtils.getScheduledAtText = function (iUnix) {
	var oMoment = moment.unix(iUnix);
	return TextUtils.i18n('MAILSCHEDULEDMESSAGES/INFO_SENDING_SCHEDULED_FOR', {
		'DATA': oMoment.format('D MMM, ' + CDateModel.prototype.getTimeFormat())
	});
};

module.exports = ScheduleUtils;


/***/ }),

/***/ "6Z3g":
/*!*************************************************************************!*\
  !*** ./modules/MailScheduledMessages/js/views/ComposeSendButtonView.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),

	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),

	AlertPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/AlertPopup.js */ "hT1I"),
	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),

	ScheduleSendingPopup = __webpack_require__(/*! modules/MailScheduledMessages/js/popups/ScheduleSendingPopup.js */ "VANH")
;

/**
 * @constructor for object that display Sensitivity button on Compose
 */
function CComposeSendButtonView() {
	this.bSendButton = true;
	this.oCompose = null;
	this.disableAutosave = ko.observable(false);
}

CComposeSendButtonView.prototype.ViewTemplate = 'MailScheduledMessages_ComposeSendButtonView';

CComposeSendButtonView.prototype.assignComposeExtInterface = function (oCompose)
{
	this.oCompose = oCompose;
	this.scheduleCommand = Utils.createCommand(this, this.scheduleSending, function () {
		return this.oCompose ? this.oCompose.isEnableSending() && this.oCompose.isEnableSaving() : false;
	}.bind(this));
};

CComposeSendButtonView.prototype.scheduleSending = function () {
	if (_.isFunction(this.oCompose && this.oCompose.getAutoEncryptSignMessage) && this.oCompose.getAutoEncryptSignMessage()) {
		Popups.showPopup(AlertPopup, [TextUtils.i18n('MAILSCHEDULEDMESSAGES/ERROR_AUTOMATIC_ENCRYPTION')]);
	} else if (_.isFunction(this.oCompose && this.oCompose.getRecipientsEmpty) && this.oCompose.getRecipientsEmpty()) {
		Popups.showPopup(AlertPopup, [TextUtils.i18n('MAILSCHEDULEDMESSAGES/ERROR_RECIPIENTS_EMPTY')]);
	} else {
		this.disableAutosave(true);
		Popups.showPopup(ScheduleSendingPopup, [this.oCompose, function () {
			this.disableAutosave(false);
		}.bind(this)]);
	}
};

module.exports = new CComposeSendButtonView();


/***/ }),

/***/ "Wmfn":
/*!*********************************************************************!*\
  !*** ./modules/MailScheduledMessages/js/views/ScheduledInfoView.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),

	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),

	AlertPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/AlertPopup.js */ "hT1I"),
	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),

	ComposeUtils = __webpack_require__(/*! modules/MailWebclient/js/utils/Compose.js */ "B5X4"),

	ConfirmAnotherMessageComposedPopup = __webpack_require__(/*! modules/MailScheduledMessages/js/popups/ConfirmAnotherMessageComposedPopup.js */ "0I4a"),
	Schedule = __webpack_require__(/*! modules/MailScheduledMessages/js/utils/Schedule.js */ "MYnu"),

	Settings = __webpack_require__(/*! modules/MailScheduledMessages/js/Settings.js */ "vjMU")
;

function CScheduledInfoView() {
	this.iAccountId = 0;
	this.sFolderFullName = '';
	this.sMessageUid = '';

	this.scheduledText = ko.observable('');
	this.visible = ko.observable(false);
	this.disableAllSendTools = ko.computed(function () {
		return this.visible();
	}, this);

	this.oMessagePane = null;

	this.bWaitDraftSaving = false;
	App.subscribeEvent('MailWebclient::ComposeMessageLoaded', function (aParams) {
		if (this.iAccountId === aParams.AccountId && this.sFolderFullName === aParams.FolderFullName && this.sMessageUid === aParams.MessageUid) {
			this.bWaitDraftSaving = true;
			aParams.Compose.executeSaveCommand();
		}
	}.bind(this));
	App.subscribeEvent('ReceiveAjaxResponse::after', function (oParams) {
		if (this.bWaitDraftSaving && oParams.Request.Module === 'Mail' && oParams.Request.Method === 'SaveMessage')
		{
			this.bWaitDraftSaving = false;
			ModulesManager.run('MailWebclient', 'deleteMessages', [this.iAccountId, this.sFolderFullName, [this.sMessageUid]]);
			Screens.showReport(TextUtils.i18n('MAILSCHEDULEDMESSAGES/REPORT_SENDING_CANCELED'));
		}
	}.bind(this));
}

CScheduledInfoView.prototype.ViewTemplate = 'MailScheduledMessages_ScheduledInfoView';

/**
 * Receives properties of the message that is displayed in the message pane.
 * It is called every time the message is changing in the message pane.
 * Receives null if there is no message in the pane.
 *
 * @param {Object|null} oMessageProps Information about message in message pane.
 * @param {string} oMessageProps.sFolderFullName
 * @param {array} oMessageProps.aExtend
 * @param {number} oMessageProps.aExtend[].ScheduleTimestamp
 */
CScheduledInfoView.prototype.doAfterPopulatingMessage = function (oMessageProps) {
	this.bWaitDraftSaving = false;
	this.iAccountId = 0;
	this.sFolderFullName = '';
	this.sMessageUid = '';
	this.scheduledText('');
	this.visible(false);
	if (oMessageProps && oMessageProps.sFolderFullName === Settings.CurrentScheduledFolderName) {
		var
			aExtend = Types.pArray(oMessageProps.aExtend),
			oSchedule = _.find(aExtend, function (oExtend) {
				return Types.isPositiveNumber(oExtend.ScheduleTimestamp);
			})
		;
		if (oSchedule) {
			this.iAccountId = oMessageProps.iAccountId;
			this.sFolderFullName = oMessageProps.sFolderFullName;
			this.sMessageUid = oMessageProps.sMessageUid;
			this.scheduledText(Schedule.getScheduledAtText(oSchedule.ScheduleTimestamp));
			this.visible(true);
		}
	}
};

CScheduledInfoView.prototype.cancelSending = function () {
	if (this.iAccountId !== 0) {
		var oCompose = Popups.getOpenedMinimizedPopup('MailWebclient_ComposePopup');
		if (oCompose && oCompose.hasUnsavedChanges())
		{
			oCompose.maximize();
			oCompose.disableAutosave(true);
			Popups.showPopup(ConfirmAnotherMessageComposedPopup, [function (sAnswer) {
				switch (sAnswer)
				{
					case Enums.AnotherMessageComposedAnswer.Discard:
						oCompose.commit();
						ComposeUtils.composeMessageFromDrafts(this.iAccountId, this.sFolderFullName, this.sMessageUid);
						break;
					case Enums.AnotherMessageComposedAnswer.SaveAsDraft:
						if (oCompose.hasUnsavedChanges())
						{
							oCompose.executeSave(true, false);
						}
						ComposeUtils.composeMessageFromDrafts(this.iAccountId, this.sFolderFullName, this.sMessageUid);
						break;
					case Enums.AnotherMessageComposedAnswer.Cancel:
						Screens.showLoading(TextUtils.i18n('MAILSCHEDULEDMESSAGES/ERROR_SENDING_CANCELED'));
						setTimeout(function () {
							Screens.hideLoading();
						}, 10000);
						break;
				}
				oCompose.disableAutosave(false);
			}.bind(this)]);
		} else {
			ComposeUtils.composeMessageFromDrafts(this.iAccountId, this.sFolderFullName, this.sMessageUid);
		}
	}
};

module.exports = new CScheduledInfoView();


/***/ })

}]);