(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[2],{

/***/ "4bvu":
/*!***********************************************************!*\
  !*** ./modules/CalendarWebclient/js/MainTabExtMethods.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	CalendarCache = __webpack_require__(/*! modules/CalendarWebclient/js/Cache.js */ "exyt"),
	MainTabCalendarMethods = {
		markIcalTypeByFile: function (sFile, sType, sCancelDecision, sReplyDecision, sCalendarId, sSelectedCalendar) {
			CalendarCache.markIcalTypeByFile(sFile, sType, sCancelDecision, sReplyDecision, sCalendarId, sSelectedCalendar);
		},
		markCalendarChanged: function ()
		{
			CalendarCache.calendarChanged(true);
		}
	}
;

window.MainTabCalendarMethods = MainTabCalendarMethods;

module.exports = {};

/***/ }),

/***/ "7+zk":
/*!***********************************************!*\
  !*** ./modules/CalendarWebclient/js/enums.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	Enums = {}
;

/**
 * @enum {number}
 */
Enums.CalendarAccess = {
	'Full': 0,
	'Write': 1,
	'Read': 2
};

/**
 * @enum {number}
 */
Enums.CalendarEditRecurrenceEvent = {
	'None': 0,
	'OnlyThisInstance': 1,
	'AllEvents': 2
};

/**
 * @enum {number}
 */
Enums.CalendarRepeatPeriod = {
	'None': 0,
	'Daily': 1,
	'Weekly': 2,
	'Monthly': 3,
	'Yearly': 4
};

/**
 * @enum {number}
 */
Enums.CalendarAlways = {
	'Disable': 0,
	'Enable': 1
};

/**
 * @enum {number}
 */
Enums.CalendarDefaultTab = {
	'Day': '1',
	'Week': '2',
	'Month': '3',
	'List': '4'
};

/**
 * @enum {string}
 */
Enums.IcalType = {
	Request: 'REQUEST',
	Reply: 'REPLY',
	Cancel: 'CANCEL',
	Save: 'SAVE'
};

/**
 * @enum {string}
 */
Enums.IcalConfig = {
	Accepted: 'ACCEPTED',
	Declined: 'DECLINED',
	Tentative: 'TENTATIVE',
	NeedsAction: 'NEEDS-ACTION'
};

/**
 * @enum {number}
 */
Enums.IcalConfigInt = {
	Accepted: 1,
	Declined: 2,
	Tentative: 3,
	NeedsAction: 0
};

if (typeof window.Enums === 'undefined')
{
	window.Enums = {};
}

_.extendOwn(window.Enums, Enums);


/***/ }),

/***/ "EmfW":
/*!****************************************************!*\
  !*** ./modules/CalendarWebclient/js/koBindings.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	
	Browser = __webpack_require__(/*! modules/CoreWebclient/js/Browser.js */ "dfnr"),
	UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV")
;

ko.bindingHandlers.autosize = {
	'init': function (oElement, fValueAccessor, fAllBindingsAccessor, oViewModel, bindingContext) {
		var
			jqEl = $(oElement),
			oOptions = fValueAccessor(),
			iHeight = jqEl.height(),
			iOuterHeight = jqEl.outerHeight(),
			iInnerHeight = jqEl.innerHeight(),
			iBorder = iOuterHeight - iInnerHeight,
			iPaddingTB = iInnerHeight - iHeight,
			iMinHeight = oOptions.minHeight ? oOptions.minHeight : 0,
			iMaxHeight = oOptions.maxHeight ? oOptions.maxHeight : 0,
			iScrollableHeight = oOptions.scrollableHeight ? oOptions.scrollableHeight : 1000,// max-height of .scrollable_field
			oAutosizeTrigger = oOptions.autosizeTrigger ? oOptions.autosizeTrigger : null,
				
			/**
			 * @param {boolean=} bIgnoreScrollableHeight
			 */
			fResize = function (bIgnoreScrollableHeight) {
				var iPadding = 0;

				if (Browser.firefox)
				{
					iPadding = Types.pInt(jqEl.css('padding-top')) * 2;
				}

				if (iMaxHeight)
				{
					/* 0-timeout to get the already changed text */
					setTimeout(function () {
						if (jqEl.prop('scrollHeight') < iMaxHeight)
						{
							jqEl.height(iMinHeight - iPaddingTB - iBorder);
							jqEl.height(jqEl.prop('scrollHeight') + iPadding - iPaddingTB);
						}
						else
						{
							jqEl.height(iMaxHeight - iPaddingTB - iBorder);
						}
					}, 100);
				}
				else if (bIgnoreScrollableHeight || jqEl.prop('scrollHeight') < iScrollableHeight)
				{
					setTimeout(function () {
						jqEl.height(iMinHeight - iPaddingTB - iBorder);
						jqEl.height(jqEl.prop('scrollHeight') + iPadding - iPaddingTB);
					}, 100);
				}
			}
		;

		jqEl.on('keydown', function(oEvent, oData) {
			fResize();
		});
		jqEl.on('paste', function(oEvent, oData) {
			fResize();
		});

		if (oAutosizeTrigger)
		{
			oAutosizeTrigger.subscribe(function (arg) {
				fResize(arg);
			}, this);
		}

		fResize();
	}
};

ko.bindingHandlers.fade = {
	'init': function (oElement, fValueAccessor, fAllBindingsAccessor, oViewModel, bindingContext) {
		var jqEl = $(oElement),
			jqElFaded = $('<span class="faded"></span>'),
			oOptions = _.defaults(
				fValueAccessor(), {
					'color': null,
					'css': 'fadeout'
				}
			),
			oColor = oOptions.color,
			sCss = oOptions.css,
			updateColor = function (sColor)
			{
				if (sColor === '')
				{
					return;
				}

				var
					oHex2Rgb = hex2Rgb(sColor),
					sRGBColor = "rgba(" + oHex2Rgb.r + "," + oHex2Rgb.g + "," + oHex2Rgb.b
				;

				colorIt(sColor, sRGBColor);
			},
			hex2Rgb = function (sHex) {
				// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
				var
					shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
					result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(sHex)
				;
				sHex = sHex.replace(shorthandRegex, function(m, r, g, b) {
					return r + r + g + g + b + b;
				});

				return result ? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16)
				} : null;
			},
			colorIt = function (hex, rgb) {
				if (UserSettings.IsRTL)
				{
					jqElFaded
						.css("filter", "progid:DXImageTransform.Microsoft.gradient(startColorstr='" + hex + "', endColorstr='" + hex + "',GradientType=1 )")
						.css("background-image", "-webkit-gradient(linear, left top, right top, color-stop(0%," + rgb + ",1)" + "), color-stop(100%," + rgb + ",0)" + "))")
						.css("background-image", "-moz-linear-gradient(left, " + rgb + ",1)" + "0%, " + rgb + ",0)" + "100%)")
						.css("background-image", "-webkit-linear-gradient(left, " + rgb + "1)" + "0%," + rgb + ",0)" + "100%)")
						.css("background-image", "-o-linear-gradient(left, " + rgb + ",1)" + "0%," + rgb + ",0)" + "100%)")
						.css("background-image", "-ms-linear-gradient(left, " + rgb + ",1)" + "0%," + rgb + ",0)" + "100%)")
						.css("background-image", "linear-gradient(left, " + rgb + ",1)" + "0%," + rgb + ",0)" + "100%)");
				}
				else
				{
					jqElFaded
						.css("filter", "progid:DXImageTransform.Microsoft.gradient(startColorstr='" + hex + "', endColorstr='" + hex + "',GradientType=1 )")
						.css("background-image", "-webkit-gradient(linear, left top, right top, color-stop(0%," + rgb + ",0)" + "), color-stop(100%," + rgb + ",1)" + "))")
						.css("background-image", "-moz-linear-gradient(left, " + rgb + ",0)" + "0%, " + rgb + ",1)" + "100%)")
						.css("background-image", "-webkit-linear-gradient(left, " + rgb + ",0)" + "0%," + rgb + ",1)" + "100%)")
						.css("background-image", "-o-linear-gradient(left, " + rgb + ",0)" + "0%," + rgb + ",1)" + "100%)")
						.css("background-image", "-ms-linear-gradient(left, " + rgb + ",0)" + "0%," + rgb + ",1)" + "100%)")
						.css("background-image", "linear-gradient(left, " + rgb + ",0)" + "0%," + rgb + ",1)" + "100%)");
				}
			}
		;

		jqEl.parent().addClass(sCss);
		jqEl.after(jqElFaded);

		if (oOptions.color.subscribe !== undefined)
		{
			updateColor(oColor());
			oColor.subscribe(function (sColor) {
				updateColor(sColor);
			}, this);
		}
	}
};

module.exports = {};


/***/ }),

/***/ "OCzL":
/*!*************************************************!*\
  !*** ./modules/CalendarWebclient/js/manager.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = function (oAppData) {
	var
		TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
		
		App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
		ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
		
		Settings = __webpack_require__(/*! modules/CalendarWebclient/js/Settings.js */ "KvAJ")
	;
	
	Settings.init(oAppData);
	
	if (!ModulesManager.isModuleAvailable(Settings.ServerModuleName))
	{
		return null;
	}
	
	__webpack_require__(/*! modules/CalendarWebclient/js/enums.js */ "7+zk");
	__webpack_require__(/*! modules/CalendarWebclient/js/vendors/fullcalendar/fullcalendar.css */ "DIlQ");
	__webpack_require__(/*! modules/CalendarWebclient/js/vendors/fullcalendar/fullcalendar.js */ "o6Ie");

	if (App.isPublic())
	{
		return {
			getScreens: function () {
				var oScreens = {};
				oScreens[Settings.HashModuleName] = function () {
					return __webpack_require__(/*! modules/CalendarWebclient/js/views/CalendarView.js */ "tenK");
				};
				return oScreens;
			},
			getHeaderItem: function () {
				return {
					item: __webpack_require__(/*! modules/CalendarWebclient/js/views/PublicHeaderItem.js */ "lPkD"),
					name: Settings.HashModuleName
				};
			}
		};
	}
	else if (App.isUserNormalOrTenant())
	{
		if (App.isNewTab())
		{
			return {
				start: function (ModulesManager) {
					if (Settings.AllowAppointments)
					{
						App.subscribeEvent('MailWebclient::RegisterMessagePaneController', function (fRegisterMessagePaneController) {
							fRegisterMessagePaneController(__webpack_require__(/*! modules/CalendarWebclient/js/views/IcalAttachmentView.js */ "NCZ9"), 'BeforeMessageBody');
						});
					}
				}
			};
		}
		else
		{
			__webpack_require__(/*! modules/CalendarWebclient/js/koBindings.js */ "EmfW");
			__webpack_require__(/*! modules/CalendarWebclient/js/MainTabExtMethods.js */ "4bvu");

			return {
				start: function (ModulesManager) {
					if (Settings.AllowAppointments)
					{
						App.subscribeEvent('MailWebclient::RegisterMessagePaneController', function (fRegisterMessagePaneController) {
							fRegisterMessagePaneController(__webpack_require__(/*! modules/CalendarWebclient/js/views/IcalAttachmentView.js */ "NCZ9"), 'BeforeMessageBody');
						});
					}
					ModulesManager.run('SettingsWebclient', 'registerSettingsTab', [function () { return __webpack_require__(/*! modules/CalendarWebclient/js/views/CalendarSettingsFormView.js */ "Ttfz"); }, Settings.HashModuleName, TextUtils.i18n('CALENDARWEBCLIENT/LABEL_SETTINGS_TAB')]);
				},
				getScreens: function () {
					var oScreens = {};
					oScreens[Settings.HashModuleName] = function () {
						return __webpack_require__(/*! modules/CalendarWebclient/js/views/CalendarView.js */ "tenK");
					};
					return oScreens;
				},
				getHeaderItem: function () {
					return {
						item: __webpack_require__(/*! modules/CalendarWebclient/js/views/HeaderItemView.js */ "U208"),
						name: Settings.HashModuleName
					};
				},
				getWeekStartsOn: function () {
					return Settings.WeekStartsOn;
				},
				getMobileSyncSettingsView: function () {
					return __webpack_require__(/*! modules/CalendarWebclient/js/views/MobileSyncSettingsView.js */ "X8Jg");
				}
			};
		}
	}
	
	return null;
};


/***/ }),

/***/ "2zlO":
/*!***********************************************************!*\
  !*** ./modules/CalendarWebclient/js/models/CIcalModel.js ***!
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

	DataFromServer = __webpack_require__(/*! modules/CalendarWebclient/js/utils/DataFromServer.js */ "W5ZY"),

	Ajax = __webpack_require__(/*! modules/CalendarWebclient/js/Ajax.js */ "M0Qh"),
	CalendarCache = __webpack_require__(/*! modules/CalendarWebclient/js/Cache.js */ "exyt"),

	HeaderItemView = (!App.isNewTab() && !App.isMobile()) ? __webpack_require__(/*! modules/CalendarWebclient/js/views/HeaderItemView.js */ "U208") : null,

	MainTab = App.isNewTab() && window.opener ? window.opener.MainTabCalendarMethods : null
;

/**
 * @constructor
 * @param {Object} oRawIcal
 * @param {string} sAttendee
 */
function CIcalModel(oRawIcal, sAttendee)
{
	this.oRawIcal = oRawIcal;

	this.uid = ko.observable(Types.pString(oRawIcal.Uid));
	this.lastModification = ko.observable(true);
	this.sSequence = Types.pInt(oRawIcal.Sequence);
	this.file = ko.observable(Types.pString(oRawIcal.File));
	this.attendee = ko.observable(Types.pString(oRawIcal.Attendee));
	this.attendeeText = ko.observable('');
	this.organizer = ko.observable(Types.pString(oRawIcal.Organizer.Email));
	this.organizerText = ko.observable(oRawIcal.Organizer.DisplayName ? Types.pString(oRawIcal.Organizer.DisplayName) + " <" + this.organizer() + ">" : this.organizer());
	this.attendeeList = ko.observable(Types.pArray(oRawIcal.AttendeeList).map(function(value,index) { return value['Email']; }));
	this.attendeeListText = ko.computed(function () {
		if (this.oRawIcal.AttendeeList.length === 1 && this.oRawIcal.AttendeeList[0]['Email'] === this.attendee()) {
			this.attendeeText = (this.oRawIcal.AttendeeList[0]['DisplayName']) ? this.oRawIcal.AttendeeList[0]['DisplayName'] + " <" + this.oRawIcal.AttendeeList[0]['Email'] + ">" : this.oRawIcal.AttendeeList[0]['Email']
			return '';
		}

		return Types.pArray(oRawIcal.AttendeeList).map(function(value,index) { 
			return (value['DisplayName']) ? value['DisplayName'] + " <" + value['Email'] + ">" : value['Email']; 
		}).join(', ');
	}, this);
	this.summary = ko.observable(Types.pString(oRawIcal.Summary));
	this.type = ko.observable(Types.pString(oRawIcal.Type));
	this.location = ko.observable(DataFromServer.parseDescriptionLocation(oRawIcal.Location));
	this.description = ko.observable(DataFromServer.parseDescriptionLocation(oRawIcal.Description));
	this.when = ko.computed(function() {
		return DataFromServer.formatDate(oRawIcal.When)
	});
	this.calendarId = ko.observable(Types.pString(oRawIcal.CalendarId));
	this.calendarId.subscribe(function () {
		// change oRawIcal so that the calendarId will be correct in a new tab
		this.oRawIcal.CalendarId = this.calendarId();
	}, this);

	CalendarCache.addIcal(this);

	this.icalType = ko.observable('');
	this.icalConfig = ko.observable('');
	this.type.subscribe(function () {
		// change oRawIcal so that the type will be correct in a new tab
		this.oRawIcal.Type = this.type();
		this.parseType();
	}, this);
	this.icalType.subscribe(function () {
		if (this.attendee() === '' && this.icalType() !== Enums.IcalType.Reply) {
			this.attendee(sAttendee);
		}
	}, this);
	this.isAppointmentActionInProgress = ko.observable(false);

	this.isRequestType = ko.computed(function () {
		return this.icalType() === Enums.IcalType.Request;
	}, this);
	this.isCancelType = ko.computed(function () {
		return this.icalType() === Enums.IcalType.Cancel;
	}, this);
	this.cancelDecision = ko.observable('');
	this.isReplyType = ko.computed(function () {
		return this.icalType() === Enums.IcalType.Reply;
	}, this);
	this.replyDecision = ko.observable('');
	this.isSaveType = ko.computed(function () {
		return this.icalType() === Enums.IcalType.Save;
	}, this);
	this.isJustSaved = ko.observable(false);

	this.isAccepted = ko.computed(function () {
		return this.icalConfig() === Enums.IcalConfig.Accepted;
	}, this);
	this.isDeclined = ko.computed(function () {
		return this.icalConfig() === Enums.IcalConfig.Declined;
	}, this);
	this.isTentative = ko.computed(function () {
		return this.icalConfig() === Enums.IcalConfig.Tentative;
	}, this);

	this.getCalendars = function () {
		return _.filter(CalendarCache.calendars(), function (oCalendar) {
			return !oCalendar.readonly;
		});
	};

	this.calendars = ko.observableArray(this.getCalendars());

	if (this.calendars().length === 0) {
		var fCalSubscription = CalendarCache.calendars.subscribe(function (val) {
			this.calendars(this.getCalendars());
			this.selectedCalendarId(Types.pString(oRawIcal.CalendarId));
			fCalSubscription.dispose();
		}, this);
	}

	this.selectedCalendarId = ko.observable(Types.pString(oRawIcal.CalendarId));

	this.chosenCalendarName = ko.computed(function () {
		var oFoundCal = null;

		if (this.calendarId() !== '')
		{
			oFoundCal = _.find(this.calendars(), function (oCal) {
				return oCal.id === this.calendarId();
			}, this);
		}

		return oFoundCal ? oFoundCal.name : '';
	}, this);

	this.calendarIsChosen = ko.computed(function () {
		return this.chosenCalendarName() !== '';
	}, this);

	this.visibleCalendarDropdown = ko.computed(function () {
		return !this.calendarIsChosen() && this.calendars().length > 1 && (this.isRequestType() || this.isSaveType());
	}, this);

	this.visibleCalendarName = ko.computed(function () {
		return this.calendarIsChosen();
	}, this);

	this.firstCalendarName = ko.computed(function () {
		return this.calendars()[0] ? this.calendars()[0].name : '';
	}, this);

	this.visibleFirstCalendarName = ko.computed(function () {
		return this.calendars().length === 1 && !this.calendarIsChosen();
	}, this);

	this.visibleCalendarRow = ko.computed(function () {
		return this.attendee() !== '' && (this.visibleCalendarDropdown() || this.visibleCalendarName() || this.visibleFirstCalendarName());
	}, this);

	this.visibleRequestButtons = ko.computed(function () {
		return this.isRequestType() && this.attendee() !== '';
	}, this);

	// animation of buttons turns on with delay
	// so it does not trigger when placing initial values
	this.animation = ko.observable(false);

	this.parseType();
}

CIcalModel.prototype.parseType = function ()
{
	var
		aTypeParts = this.type().split('-'),
		sType = aTypeParts.shift(),
		sFoundType = _.find(Enums.IcalType, function (sIcalType) {
			return sType === sIcalType;
		}, this),
		sConfig = aTypeParts.join('-'),
		sFoundConfig = _.find(Enums.IcalConfig, function (sIcalConfig) {
			return sConfig === sIcalConfig;
		}, this)
	;

	if (sType !== sFoundType)
	{
		sType = Enums.IcalType.Save;
	}
	this.icalType(sType);

	if (sConfig !== sFoundConfig)
	{
		sConfig = Enums.IcalConfig.NeedsAction;
	}
	this.icalConfig(sConfig);

	this.fillDecisions();
};

CIcalModel.prototype.fillDecisions = function ()
{
	this.cancelDecision(TextUtils.i18n('CALENDARWEBCLIENT/INFO_CANCELED_APPOINTMENT', {'SENDER': App.currentAccountEmail()}));

	if (this.attendee() === '') {
		this.replyDecision('');
	} else {
		const textReplacer = {
			'ATTENDEE': this.attendee()
		};
		switch (this.icalConfig()) {
			case Enums.IcalConfig.Accepted:
				this.replyDecision(TextUtils.i18n('CALENDARWEBCLIENT/INFO_ACCEPTED_APPOINTMENT', textReplacer));
				break;
			case Enums.IcalConfig.Declined:
				this.replyDecision(TextUtils.i18n('CALENDARWEBCLIENT/INFO_DECLINED_APPOINTMENT', textReplacer));
				break;
			case Enums.IcalConfig.Tentative:
				this.replyDecision(TextUtils.i18n('CALENDARWEBCLIENT/INFO_TENTATIVELY_ACCEPTED_APPOINTMENT', textReplacer));
				break;
		}
	}
};

CIcalModel.prototype.acceptAppointment = function ()
{
	if (!this.isAppointmentActionInProgress()) {
		this.calendarId(this.selectedCalendarId());
		this.changeAndSaveConfig(Enums.IcalConfig.Accepted);
	}
};

CIcalModel.prototype.tentativeAppointment = function ()
{
	if (!this.isAppointmentActionInProgress()) {
		this.calendarId(this.selectedCalendarId());
		this.changeAndSaveConfig(Enums.IcalConfig.Tentative);
	}
};

CIcalModel.prototype.declineAppointment = function ()
{
	if (!this.isAppointmentActionInProgress()) {
		this.calendarId('');
		this.selectedCalendarId('');
		this.changeAndSaveConfig(Enums.IcalConfig.Declined);
	}
};

/**
 * @param {string} sConfig
 */
CIcalModel.prototype.changeAndSaveConfig = function (sConfig)
{
	if (this.icalConfig() !== sConfig)
	{
		if (sConfig !== Enums.IcalConfig.Declined || this.icalConfig() !== Enums.IcalConfig.NeedsAction)
		{
			this.showChanges();
		}

		this.changeConfig(sConfig);
		this.setAppointmentAction();
	}
};

/**
 * @param {string} sConfig
 */
CIcalModel.prototype.changeConfig = function (sConfig)
{
	this.type(this.icalType() + '-' + sConfig);
	if (MainTab)
	{
		MainTab.markIcalTypeByFile(this.file(), this.type(), this.cancelDecision(),
									this.replyDecision(), this.calendarId(), this.selectedCalendarId());
	}
	else
	{
		CalendarCache.markIcalTypeByFile(this.file(), this.type(), this.cancelDecision(),
									this.replyDecision(), this.calendarId(), this.selectedCalendarId());
	}
};

CIcalModel.prototype.markNeededAction = function ()
{
	this.calendarId('');
	this.selectedCalendarId('');
	this.changeConfig(Enums.IcalConfig.NeedsAction);
};

CIcalModel.prototype.markNotSaved = function ()
{
	this.calendarId('');
	this.selectedCalendarId('');
};

CIcalModel.prototype.markTentative = function ()
{
	this.changeConfig(Enums.IcalConfig.Tentative);
};

CIcalModel.prototype.markAccepted = function ()
{
	this.changeConfig(Enums.IcalConfig.Accepted);
};

CIcalModel.prototype.setAppointmentAction = function ()
{
	this.isAppointmentActionInProgress(true);
	Ajax.send(
		'SetAppointmentAction',
		{
			'AppointmentAction': this.icalConfig(),
			'CalendarId': this.selectedCalendarId(),
			'File': this.file(),
			'Attendee': this.attendee()
		},
		this.onSetAppointmentActionResponse,
		this,
		'CalendarMeetingsPlugin'
	);
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CIcalModel.prototype.onSetAppointmentActionResponse = function (oResponse, oRequest)
{
	this.isAppointmentActionInProgress(false);
	if (!oResponse.Result)
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('COREWEBCLIENT/ERROR_UNKNOWN'));
	}
	else
	{
		this.markChanges();
	}
};

CIcalModel.prototype.addEvents = function ()
{
	Ajax.send('AddEventsFromFile', {
		'CalendarId': this.selectedCalendarId(),
		'File': this.file()
	}, this.onAddEventsFromFileResponse, this);

	this.isJustSaved(true);
	this.calendarId(this.selectedCalendarId());

	setTimeout(_.bind(function () {
		this.isJustSaved(false);
	}, this), 20000);

	this.showChanges();
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CIcalModel.prototype.onAddEventsFromFileResponse = function (oResponse, oRequest)
{
	if (!oResponse.Result)
	{
		this.isJustSaved(false);
		this.calendarId('');
		Api.showErrorByCode(oResponse);
	}
	else
	{
		if (_.isArray(oResponse.Result) && oResponse.Result.length > 0)
		{
			this.uid(oResponse.Result[0]);
		}
		this.markChanges();
	}
};

/**
 * @param {string} sEmail
 */
CIcalModel.prototype.updateAttendeeStatus = function (sEmail)
{
	if (this.icalType() === Enums.IcalType.Cancel || this.icalType() === Enums.IcalType.Reply)
	{
		Ajax.send('UpdateAttendeeStatus',
			{
				'File': this.file(),
				'FromEmail': sEmail
			},
			this.onUpdateAttendeeStatusResponse,
			this,
			'CalendarMeetingsPlugin'
		);
	}
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CIcalModel.prototype.onUpdateAttendeeStatusResponse = function (oResponse, oRequest)
{
	if (oResponse.Result)
	{
		if (typeof oResponse.Result === 'string') {
			this.type(oResponse.Result);
		}
		this.showChanges();
		this.markChanges();
	}
};

CIcalModel.prototype.showChanges = function ()
{
	if (HeaderItemView)
	{
		HeaderItemView.recivedAnim(true);
	}
};

CIcalModel.prototype.markChanges = function ()
{
	if (MainTab)
	{
		MainTab.markCalendarChanged();
	}
	else
	{
		CalendarCache.calendarChanged(true);
	}
};

module.exports = CIcalModel;


/***/ }),

/***/ "axPU":
/*!*******************************************************************!*\
  !*** ./modules/CalendarWebclient/js/popups/CalendarSharePopup.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	AddressUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Address.js */ "kG5I"),
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	
	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT")
;

/**
 * @constructor
 */
function CCalendarSharePopup()
{
	CAbstractPopup.call(this);
	
	this.guestsDom = ko.observable();
	this.ownersDom = ko.observable();

	this.guestsLock = ko.observable(false);
	this.guests = ko.observable('').extend({'reversible': true});
	this.guests.subscribe(function () {
		if (!this.guestsLock())
		{
			$(this.guestsDom()).val(this.guests());
			$(this.guestsDom()).inputosaurus('refresh');
		}
	}, this);
	this.ownersLock = ko.observable(false);
	this.owners = ko.observable('').extend({'reversible': true});
	this.owners.subscribe(function () {
		if (!this.ownersLock())
		{
			$(this.ownersDom()).val(this.owners());
			$(this.ownersDom()).inputosaurus('refresh');
		}
	}, this);

	this.fCallback = null;

	this.calendarId = ko.observable(null);
	this.selectedColor = ko.observable('');
	this.calendarUrl = ko.observable('');
	this.exportUrl = ko.observable('');
	this.icsLink = ko.observable('');
	this.isPublic = ko.observable(false);
	this.shares = ko.observableArray([]);
	this.owner = ko.observable('');
	
	ko.computed(function () {
		if (this.owner() && this.guestsDom()) {
			this.initInputosaurus(this.guestsDom, this.guests, this.guestsLock);
		}
	}, this);

	ko.computed(function () {
		if (this.owner() && this.guestsDom()) {
			this.initInputosaurus(this.ownersDom, this.owners, this.ownersLock);
		}
	}, this);

	this.recivedAnim = ko.observable(false).extend({'autoResetToFalse': 500});
	this.whomAnimate = ko.observable('');

	this.newShare = ko.observable('');
	this.newShareFocus = ko.observable(false);
	this.newShareAccess = ko.observable(Enums.CalendarAccess.Read);
	this.sharedToAll = ko.observable(false);
	this.sharedToAllAccess = ko.observable(Enums.CalendarAccess.Read);
	this.canAdd = ko.observable(false);
	this.aAccess = [
		{'value': Enums.CalendarAccess.Read, 'display': TextUtils.i18n('CALENDARWEBCLIENT/LABEL_READ_ACCESS')},
		{'value': Enums.CalendarAccess.Write, 'display': TextUtils.i18n('CALENDARWEBCLIENT/LABEL_WRITE_ACCESS')}
	];
}

_.extendOwn(CCalendarSharePopup.prototype, CAbstractPopup.prototype);

CCalendarSharePopup.prototype.PopupTemplate = 'CalendarWebclient_CalendarSharePopup';

/**
 * @param {Function} fCallback
 * @param {Object} oCalendar
 */
CCalendarSharePopup.prototype.onOpen = function (fCallback, oCalendar)
{
	if (_.isFunction(fCallback))
	{
		this.fCallback = fCallback;
	}
	if (!_.isUndefined(oCalendar))
	{
		this.selectedColor(oCalendar.color());
		this.calendarId(oCalendar.id);
		this.calendarUrl(oCalendar.davUrl() + oCalendar.url());
		this.exportUrl(oCalendar.exportUrl());
		this.icsLink(oCalendar.davUrl() + oCalendar.url() + '?export');
		this.isPublic(oCalendar.isPublic());
		this.owner(oCalendar.owner());

		this.populateShares(oCalendar.shares());
		this.sharedToAll(oCalendar.isSharedToAll());
		this.sharedToAllAccess(oCalendar.sharedToAllAccess);
	}
};

CCalendarSharePopup.prototype.onSaveClick = function ()
{
	var
		aOwners = AddressUtils.getArrayRecipients(this.owners(), false),
		aGuests = AddressUtils.getArrayRecipients(this.guests(), false)
	;

	if (this.isValidShares(aOwners, aGuests))
	{
		if (this.fCallback)
		{
			this.fCallback(this.calendarId(), this.isPublic(), this.getShares(aOwners, aGuests), this.sharedToAll(), this.sharedToAllAccess());
		}
		this.closePopup();
	}
};

CCalendarSharePopup.prototype.onClose = function ()
{
	this.cleanAll();
};

CCalendarSharePopup.prototype.cleanAll = function ()
{
	this.newShare('');
	this.newShareAccess(Enums.CalendarAccess.Read);
	this.shareToAllAccess = ko.observable(Enums.CalendarAccess.Read);
	//this.shareAutocompleteItem(null);
	this.canAdd(false);
};

/**
 * @param {string} sEmail
 */
CCalendarSharePopup.prototype.itsMe = function (sEmail)
{
	return (sEmail === App.getUserPublicId());
};

CCalendarSharePopup.prototype.initInputosaurus = function (koDom, koAddr, koLockAddr)
{
	if (koDom() && $(koDom()).length > 0)
	{
		const
			suggestParameters = {
				storage: 'team',
				addContactGroups: false,
				addUserGroups: false,
				exceptEmail: this.owner()
			},
			autoCompleteSource = ModulesManager.run(
				'ContactsWebclient', 'getSuggestionsAutocompleteCallback', [suggestParameters]
			)
		;
		$(koDom()).inputosaurus({
			width: 'auto',
			parseOnBlur: true,
			autoCompleteSource: _.isFunction(autoCompleteSource) ? autoCompleteSource : function () {},
			change : _.bind(function (ev) {
				koLockAddr(true);
				this.setRecipient(koAddr, ev.target.value);
				koLockAddr(false);
			}, this),
			copy: _.bind(function (sVal) {
				this.inputosaurusBuffer = sVal;
			}, this),
			paste: _.bind(function () {
				var sInputosaurusBuffer = this.inputosaurusBuffer || '';
				this.inputosaurusBuffer = '';
				return sInputosaurusBuffer;
			}, this),
			mobileDevice: App.isMobile()
		});
	}
};

CCalendarSharePopup.prototype.setRecipient = function (koRecipient, sRecipient)
{
	if (koRecipient() === sRecipient)
	{
		koRecipient.valueHasMutated();
	}
	else
	{
		koRecipient(sRecipient);
	}
};

CCalendarSharePopup.prototype.isValidShares = function (aOwners, aGuests)
{
	var aConflictEmails = [];
	_.each(aOwners, function (oOwnerAddress) {
		_.each(aGuests, function (oGuestAddress) {
			if (oOwnerAddress.email === oGuestAddress.email) {
				aConflictEmails.push(oOwnerAddress.fullEmail);
			}
		});
	});
	if (aConflictEmails.length > 0)
	{
		var
			sConflictEmails = TextUtils.encodeHtml(aConflictEmails.join(', ')),
			iConflictCount = aConflictEmails.length
		;
		Screens.showError(TextUtils.i18n('CALENDARWEBCLIENT/ERROR_SHARE_CONFLICT_EMAILS', {'CONFLICT_EMAILS': sConflictEmails}, null, iConflictCount));
		return false;
	}
	return true;
};

CCalendarSharePopup.prototype.getShares = function (aOwners, aGuests)
{
	return $.merge(_.map(aGuests, function(oGuest){
			return {
				name: oGuest.name,
				email: oGuest.email,
				access: Enums.CalendarAccess.Read
			};
		}),
		_.map(aOwners, function(oOwner){
			return {
				name: oOwner.name,
				email: oOwner.email,
				access: Enums.CalendarAccess.Write
			};
		}));
};

CCalendarSharePopup.prototype.populateShares = function (aShares)
{
	var
		sGuests = '',
		sOwners = ''
	;

	_.each(aShares, function (oShare) {
		if (oShare.access === Enums.CalendarAccess.Read)
		{
			sGuests = oShare.name !== '' && oShare.name !== oShare.email ? 
						sGuests + '"' + oShare.name + '" <' + oShare.email + '>,' : 
						sGuests + oShare.email + ', ';
		}
		else if (oShare.access === Enums.CalendarAccess.Write)
		{
			sOwners = oShare.name !== '' && oShare.name !== oShare.email ? 
						sOwners + '"' + oShare.name + '" <' + oShare.email + '>,' : 
						sOwners + oShare.email + ', ';
		}
	}, this);

	this.setRecipient (this.guests, sGuests);
	this.setRecipient (this.owners, sOwners);
};

module.exports = new CCalendarSharePopup();


/***/ }),

/***/ "b9Gz":
/*!******************************************************************!*\
  !*** ./modules/CalendarWebclient/js/popups/EditCalendarPopup.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	
	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
	AlertPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/AlertPopup.js */ "hT1I"),
	Settings = __webpack_require__(/*! modules/CalendarWebclient/js/Settings.js */ "KvAJ"),
	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	Ajax = __webpack_require__(/*! modules/CalendarWebclient/js/Ajax.js */ "M0Qh"),
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ")
;
const { applyCalendarSettings } = __webpack_require__(/*! ../views/CalendarView */ "tenK");

/**
 * @constructor
 */
function CEditCalendarPopup()
{
	CAbstractPopup.call(this);
	
	this.fCallback = null;
	
	this.calendarId = ko.observable(null);
	this.calendarName = ko.observable('');
	this.calendarDescription = ko.observable('');
	
	this.calendarNameFocus = ko.observable(false);
	this.calendarDescriptionFocus = ko.observable(false);
	
	this.colors = ko.observableArray([]);
	this.selectedColor = ko.observable(this.colors()[0]);
	
	this.popupHeading = ko.observable('');

	this.allowSubscribedCalendars = ko.observable(Settings.AllowSubscribedCalendars);
	this.calendarSubscribed = ko.observable(false);
	this.calendarSource = ko.observable('');
	this.calendarSourceFocus = ko.observable(false);
}

_.extendOwn(CEditCalendarPopup.prototype, CAbstractPopup.prototype);

CEditCalendarPopup.prototype.PopupTemplate = 'CalendarWebclient_EditCalendarPopup';

/**
 * @param {Function} fCallback
 * @param {Array} aColors
 * @param {Object} oCalendar
 */
CEditCalendarPopup.prototype.onOpen = function (fCallback, aColors, oCalendar)
{
	this.fCallback = fCallback;
	
	if (Types.isNonEmptyArray(aColors))
	{
		this.colors(aColors);
		this.selectedColor(aColors[0]);		
	}
	
	if (oCalendar)
	{
		this.popupHeading(oCalendar.name() ? TextUtils.i18n('CALENDARWEBCLIENT/HEADING_EDIT_CALENDAR') : TextUtils.i18n('CALENDARWEBCLIENT/HEADING_CREATE_CALENDAR'));
		this.calendarName(oCalendar.name ? oCalendar.name() : '');
		this.calendarDescription(oCalendar.description ? oCalendar.description() : '');
		this.selectedColor(oCalendar.color ? oCalendar.color() : '');
		this.calendarId(oCalendar.id ? oCalendar.id : null);
		this.calendarSubscribed(oCalendar.subscribed ? oCalendar.subscribed() : false);
		this.calendarSource(oCalendar.source ? oCalendar.source() : '');
	}
	else
	{
		this.popupHeading(TextUtils.i18n('CALENDARWEBCLIENT/HEADING_CREATE_CALENDAR'));
	}
};

CEditCalendarPopup.prototype.onClose = function ()
{
	this.calendarName('');
	this.calendarDescription('');
	this.selectedColor(this.colors[0]);
	this.calendarId(null);
	this.calendarSubscribed(false);
	this.calendarSource('');
};

CEditCalendarPopup.prototype.save = function ()
{
	if (this.calendarName() === '')
	{
		Popups.showPopup(AlertPopup, [TextUtils.i18n('CALENDARWEBCLIENT/ERROR_CALENDAR_NAME_BLANK')]);
	}
	else
	{
		if (!App.isPublic()) {
			if (this.calendarId() !== null) { // update calendar
				if (!this.calendarSubscribed()) {
					Ajax.send('UpdateCalendar', {
							'Name': this.calendarName(),
							'Description': this.calendarDescription(),
							'Color': this.selectedColor(),
							'Id': this.calendarId()
						}, this.onUpdateCalendarResponse, this
					);
				} else {
					Ajax.send('UpdateSubscribedCalendar', {
							'Name': this.calendarName(),
							'Source': this.calendarSource(),
							'Color': this.selectedColor(),
							'Id': this.calendarId()
						}, this.onUpdateCalendarResponse, this
					);
				}
			} else { // create calendar
				if (this.calendarSubscribed()) {
					Ajax.send('CreateSubscribedCalendar', {
							'Name': this.calendarName(),
							'Source': this.calendarSource(),
							'Color': this.selectedColor()
						}, this.onCreateCalendarResponse, this
					);
				} else {
					Ajax.send('CreateCalendar', {
							'Name': this.calendarName(),
							'Description': this.calendarDescription(),
							'Color': this.selectedColor()
						}, this.onCreateCalendarResponse, this
					);
				}
			}
		}
	}
};

/**
* @param {Object} oResponse
* @param {Object} oRequest
*/
CEditCalendarPopup.prototype.onCreateCalendarResponse = function (oResponse, oRequest)
{
	if (oResponse.Result)
	{
		if (_.isFunction(this.fCallback)) {
			this.fCallback(oResponse.Result);
			this.closePopup();
		}
	} else {
		Api.showErrorByCode(oResponse);
	}
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
 CEditCalendarPopup.prototype.onUpdateCalendarResponse = function (oResponse, oRequest)
 {
	 if (oResponse.Result)
	 {
		if (_.isFunction(this.fCallback)) {
			this.fCallback(oRequest.Parameters);
			this.closePopup();
		}
	 } else {
		 Api.showErrorByCode(oResponse);
	 }
 };

module.exports = new CEditCalendarPopup();


/***/ }),

/***/ "+yZ/":
/*!*********************************************************************!*\
  !*** ./modules/CalendarWebclient/js/popups/GetCalendarLinkPopup.js ***!
  \*********************************************************************/
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
function CGetCalendarLinkPopup()
{
	CAbstractPopup.call(this);
	
	this.fCallback = null;

	this.calendarId = ko.observable(null);
	this.selectedColor = ko.observable('');
	this.calendarUrl = ko.observable('');
	this.exportUrl = ko.observable('');
	this.icsLink = ko.observable('');
	this.isPublicSourceValue = ko.observable(false);
	this.isPublic = ko.observable(false);
	this.isPublicChanged = ko.computed(function () {
		return this.isPublicSourceValue() !== this.isPublic();
	}, this);
	this.pubUrl = ko.observable('');
	this.canShare = ko.observable(false);
}

_.extendOwn(CGetCalendarLinkPopup.prototype, CAbstractPopup.prototype);

CGetCalendarLinkPopup.prototype.PopupTemplate = 'CalendarWebclient_GetCalendarLinkPopup';

/**
 * @param {Function} fCallback
 * @param {Object} oCalendar
 */
CGetCalendarLinkPopup.prototype.onOpen = function (fCallback, oCalendar)
{
	if (_.isFunction(fCallback))
	{
		this.fCallback = fCallback;
	}
	if (oCalendar)
	{
		this.selectedColor(oCalendar.color());
		this.calendarId(oCalendar.id);
		this.calendarUrl(oCalendar.davUrl() + oCalendar.url());
		this.exportUrl(oCalendar.exportUrl());
		this.icsLink(oCalendar.davUrl() + oCalendar.url() + '?export');
		this.isPublicSourceValue(oCalendar.isPublic());
		this.isPublic(oCalendar.isPublic());
		this.pubUrl(oCalendar.pubUrl());
		this.exportUrl(oCalendar.exportUrl());
		this.canShare(oCalendar.canShare());
	}
};

CGetCalendarLinkPopup.prototype.cancelPopup = function ()
{
	if (this.fCallback)
	{
		this.fCallback(this.calendarId(), this.isPublic());
	}
	this.closePopup();
};

module.exports = new CGetCalendarLinkPopup();

/***/ }),

/***/ "QN/U":
/*!********************************************************************!*\
  !*** ./modules/CalendarWebclient/js/popups/ImportCalendarPopup.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	
	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	CJua = __webpack_require__(/*! modules/CoreWebclient/js/CJua.js */ "qBBW"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
	UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV"),
	
	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
	
	Settings = __webpack_require__(/*! modules/CalendarWebclient/js/Settings.js */ "KvAJ")
;

/**
 * @constructor
 */
function CImportCalendarPopup()
{
	CAbstractPopup.call(this);
	
	this.fCallback = null;
	
	this.oJua = null;
	this.allowDragNDrop = ko.observable(false);
	
	this.importing = ko.observable(false);

	this.color	= ko.observable('');
	this.calendarId	= ko.observable('');
	
	this.importButtonDom	= ko.observable(null);
}

_.extendOwn(CImportCalendarPopup.prototype, CAbstractPopup.prototype);

CImportCalendarPopup.prototype.PopupTemplate = 'CalendarWebclient_ImportCalendarPopup';

/**
 * @param {Function} fCallback
 * @param {Object} oCalendar
 */
CImportCalendarPopup.prototype.onOpen = function (fCallback, oCalendar)
{
	if (_.isFunction(fCallback))
	{
		this.fCallback = fCallback;
	}
	if (oCalendar)
	{
		this.color(oCalendar.color ? oCalendar.color() : '');
		this.calendarId(oCalendar.id ? oCalendar.id : '');
	}
};

/**
 * @param {Object} $oViewModel
 */
CImportCalendarPopup.prototype.onBind = function ($oViewModel)
{
	var self = this;
	this.oJua = new CJua({
		'action': '?/Api/',
		'name': 'jua-uploader',
		'queueSize': 1,
		'clickElement': this.importButtonDom(),
		'hiddenElementsPosition': UserSettings.IsRTL ? 'right' : 'left',
		'disableAjaxUpload': false,
		'disableDragAndDrop': true,
		'disableMultiple': true,
		'hidden': _.extendOwn({
			'Module': Settings.ServerModuleName,
			'Method': 'UploadCalendar',
			'Parameters':  function () {
				return JSON.stringify({
					'CalendarID': self.calendarId()
				});
			}
		}, App.getCommonRequestParameters())
	});

	this.oJua
		.on('onStart', _.bind(this.onFileUploadStart, this))
		.on('onComplete', _.bind(this.onFileUploadComplete, this))
	;
	
	this.allowDragNDrop(this.oJua.isDragAndDropSupported());
};

CImportCalendarPopup.prototype.onFileUploadStart = function ()
{
	this.importing(true);
};

/**
 * @param {string} sFileUid
 * @param {boolean} bResponseReceived
 * @param {Object} oResponse
 */
CImportCalendarPopup.prototype.onFileUploadComplete = function (sFileUid, bResponseReceived, oResponse)
{
	var bError = !bResponseReceived || !oResponse || !oResponse.Result;

	this.importing(false);
	
	if (!bError)
	{
		this.fCallback();
		this.closePopup();
	}
	else
	{
		if (oResponse && oResponse.ErrorCode && oResponse.ErrorCode === Enums.Errors.IncorrectFileExtension)
		{
			Screens.showError(TextUtils.i18n('CALENDARWEBCLIENT/ERROR_FILE_NOT_ICS'));
		}
		else
		{
			Screens.showError(TextUtils.i18n('COREWEBCLIENT/ERROR_UPLOAD_FILE'));
		}
	}
};

module.exports = new CImportCalendarPopup();


/***/ }),

/***/ "lRUe":
/*!********************************************************************!*\
  !*** ./modules/CalendarWebclient/js/popups/SelectCalendarPopup.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX")
;

/**
 * @constructor
 */
function CSelectCalendarPopup()
{
	CAbstractPopup.call(this);
	
	this.fCallback = null;
	this.fProceedUploading = null;

	this.calendars = null;
	this.calendarsList = ko.observableArray([]);
	this.calendarColor = ko.observable('');
	this.selectedCalendarName = ko.observable('');
	this.selectedCalendarId = ko.observable('');
	this.selectedCalendarId.subscribe(function (sValue) {
		if (sValue)
		{
			var oCalendar = this.calendars.getCalendarById(sValue);

			this.selectedCalendarName(oCalendar.name());
			this.selectedCalendarIsEditable(oCalendar.isEditable());
			this.changeCalendarColor(sValue);
		}
	}, this);
	this.selectedCalendarIsEditable = ko.observable(false);
}

_.extendOwn(CSelectCalendarPopup.prototype, CAbstractPopup.prototype);

CSelectCalendarPopup.prototype.PopupTemplate = 'CalendarWebclient_SelectCalendarPopup';

/**
 * @param {Object} oParameters
 */
CSelectCalendarPopup.prototype.onOpen = function (oParameters)
{
	this.fCallback = oParameters.CallbackSave;
	this.fProceedUploading = oParameters.ProceedUploading;
	this.calendars = oParameters.Calendars;
	this.calendarsList(oParameters.EditableCalendars);
	this.selectedCalendarId(oParameters.DefaultCalendarId);
	this.changeCalendarColor(this.selectedCalendarId());
};

CSelectCalendarPopup.prototype.onSaveClick = function ()
{
	if (this.fCallback)
	{
		this.fCallback(this.selectedCalendarId(), this.fProceedUploading);
	}
	this.closePopup();
};

/**
 * @param {string} sId
 */
CSelectCalendarPopup.prototype.changeCalendarColor = function (sId)
{
	if (_.isFunction(this.calendars.getCalendarById))
	{
		var oCalendar = this.calendars.getCalendarById(sId);
		if (oCalendar)
		{
			this.calendarColor('');
			this.calendarColor(oCalendar.color());
		}
	}
};

module.exports = new CSelectCalendarPopup();

/***/ }),

/***/ "Qb2c":
/*!************************************************************!*\
  !*** ./modules/CalendarWebclient/js/utils/FullCalendar.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "M4cL");


let currentDate = new Date();

module.exports = {
	recreateIfDateChanged(calendarGrid, recreateFullCalendar) {
		const nowDate = new Date();
		const isDateChanged = currentDate.getFullYear() !== nowDate.getFullYear()
				|| currentDate.getMonth() !== nowDate.getMonth()
				|| currentDate.getDate() !== nowDate.getDate();
		if (isDateChanged) {
			currentDate = nowDate;
			const todayDate = calendarGrid.fullCalendar('getDate').toDate();
			const viewName = calendarGrid.fullCalendar('getView').name;
			recreateFullCalendar(viewName);
			calendarGrid.fullCalendar('gotoDate', todayDate);
		}
	},

	setTimeline() {
		// find timeline
		const parentDiv = $('.fc-slats:visible').parent();
		let timeline = parentDiv.children('.timeline');

		// if timeline isn't there, add it
		if (timeline.length === 0) {
			timeline = $('<hr>').addClass('timeline');
			parentDiv.prepend(timeline);
		}

		timeline.css('left', $('td .fc-axis').width() + 10);
		timeline.show();

		const now = new Date();
		const curSeconds = (now.getHours() * 60 * 60) + (now.getMinutes() * 60) + now.getSeconds();
		const percentOfDay = curSeconds / 86400; //24 * 60 * 60 = 86400, % of seconds in a day
		const topLoc = Math.floor(parentDiv.height() * percentOfDay);

		timeline.css('top', `${topLoc}px`);
	}
};


/***/ }),

/***/ "o6Ie":
/*!***************************************************************************!*\
  !*** ./modules/CalendarWebclient/js/vendors/fullcalendar/fullcalendar.js ***!
  \***************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
 * FullCalendar v3.10.2
 * Docs & License: https://fullcalendar.io/
 * (c) 2019 Adam Shaw
 */

var TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a");
!function(t,e){ true?module.exports=e(__webpack_require__(/*! moment */ "sdEb"),__webpack_require__(/*! jquery */ "M4cL")):0}("undefined"!=typeof self?self:this,function(t,e){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=256)}([function(e,n){e.exports=t},,function(t,e){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};e.__extends=function(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}},function(t,n){t.exports=e},function(t,e,n){function r(t,e){e.left&&t.css({"border-left-width":1,"margin-left":e.left-1}),e.right&&t.css({"border-right-width":1,"margin-right":e.right-1})}function i(t){t.css({"margin-left":"","margin-right":"","border-left-width":"","border-right-width":""})}function o(){ht("body").addClass("fc-not-allowed")}function s(){ht("body").removeClass("fc-not-allowed")}function a(t,e,n){var r=Math.floor(e/t.length),i=Math.floor(e-r*(t.length-1)),o=[],s=[],a=[],u=0;l(t),t.each(function(e,n){var l=e===t.length-1?i:r,d=ht(n).outerHeight(!0);d<l?(o.push(n),s.push(d),a.push(ht(n).height())):u+=d}),n&&(e-=u,r=Math.floor(e/o.length),i=Math.floor(e-r*(o.length-1))),ht(o).each(function(t,e){var n=t===o.length-1?i:r,l=s[t],u=a[t],d=n-(l-u);l<n&&ht(e).height(d)})}function l(t){t.height("")}function u(t){var e=0;return t.find("> *").each(function(t,n){var r=ht(n).outerWidth();r>e&&(e=r)}),e++,t.width(e),e}function d(t,e){var n,r=t.add(e);return r.css({position:"relative",left:-1}),n=t.outerHeight()-e.outerHeight(),r.css({position:"",left:""}),n}function c(t){var e=t.css("position"),n=t.parents().filter(function(){var t=ht(this);return/(auto|scroll)/.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return"fixed"!==e&&n.length?n:ht(t[0].ownerDocument||document)}function p(t,e){var n=t.offset(),r=n.left-(e?e.left:0),i=n.top-(e?e.top:0);return{left:r,right:r+t.outerWidth(),top:i,bottom:i+t.outerHeight()}}function h(t,e){var n=t.offset(),r=g(t),i=n.left+b(t,"border-left-width")+r.left-(e?e.left:0),o=n.top+b(t,"border-top-width")+r.top-(e?e.top:0);return{left:i,right:i+t[0].clientWidth,top:o,bottom:o+t[0].clientHeight}}function f(t,e){var n=t.offset(),r=n.left+b(t,"border-left-width")+b(t,"padding-left")-(e?e.left:0),i=n.top+b(t,"border-top-width")+b(t,"padding-top")-(e?e.top:0);return{left:r,right:r+t.width(),top:i,bottom:i+t.height()}}function g(t){var e,n=t[0].offsetWidth-t[0].clientWidth,r=t[0].offsetHeight-t[0].clientHeight;return n=v(n),r=v(r),e={left:0,right:0,top:0,bottom:r},y()&&"rtl"===t.css("direction")?e.left=n:e.right=n,e}function v(t){return t=Math.max(0,t),t=Math.round(t)}function y(){return null===ft&&(ft=m()),ft}function m(){var t=ht("<div><div></div></div>").css({position:"absolute",top:-1e3,left:0,border:0,padding:0,overflow:"scroll",direction:"rtl"}).appendTo("body"),e=t.children(),n=e.offset().left>t.offset().left;return t.remove(),n}function b(t,e){return parseFloat(t.css(e))||0}function w(t){return 1===t.which&&!t.ctrlKey}function D(t){var e=t.originalEvent.touches;return e&&e.length?e[0].pageX:t.pageX}function E(t){var e=t.originalEvent.touches;return e&&e.length?e[0].pageY:t.pageY}function S(t){return/^touch/.test(t.type)}function C(t){t.addClass("fc-unselectable").on("selectstart",T)}function R(t){t.removeClass("fc-unselectable").off("selectstart",T)}function T(t){t.preventDefault()}function M(t,e){var n={left:Math.max(t.left,e.left),right:Math.min(t.right,e.right),top:Math.max(t.top,e.top),bottom:Math.min(t.bottom,e.bottom)};return n.left<n.right&&n.top<n.bottom&&n}function I(t,e){return{left:Math.min(Math.max(t.left,e.left),e.right),top:Math.min(Math.max(t.top,e.top),e.bottom)}}function H(t){return{left:(t.left+t.right)/2,top:(t.top+t.bottom)/2}}function P(t,e){return{left:t.left-e.left,top:t.top-e.top}}function _(t){var e,n,r=[],i=[];for("string"==typeof t?i=t.split(/\s*,\s*/):"function"==typeof t?i=[t]:ht.isArray(t)&&(i=t),e=0;e<i.length;e++)n=i[e],"string"==typeof n?r.push("-"===n.charAt(0)?{field:n.substring(1),order:-1}:{field:n,order:1}):"function"==typeof n&&r.push({func:n});return r}function x(t,e,n,r,i){var o,s;for(o=0;o<n.length;o++)if(s=O(t,e,n[o],r,i))return s;return 0}function O(t,e,n,r,i){if(n.func)return n.func(t,e);var o=t[n.field],s=e[n.field];return null==o&&r&&(o=r[n.field]),null==s&&i&&(s=i[n.field]),F(o,s)*(n.order||1)}function F(t,e){return t||e?null==e?-1:null==t?1:"string"===ht.type(t)||"string"===ht.type(e)?String(t).localeCompare(String(e)):t-e:0}function z(t,e){return pt.duration({days:t.clone().stripTime().diff(e.clone().stripTime(),"days"),ms:t.time()-e.time()})}function B(t,e){return pt.duration({days:t.clone().stripTime().diff(e.clone().stripTime(),"days")})}function A(t,e,n){return pt.duration(Math.round(t.diff(e,n,!0)),n)}function k(t,n){var r,i,o;for(r=0;r<e.unitsDesc.length&&(i=e.unitsDesc[r],!((o=V(i,t,n))>=1&&ut(o)));r++);return i}function L(t,e){var n=k(t);return"week"===n&&"object"==typeof e&&e.days&&(n="day"),n}function V(t,e,n){return null!=n?n.diff(e,t,!0):pt.isDuration(e)?e.as(t):e.end.diff(e.start,t,!0)}function G(t,e,n){var r;return U(n)?(e-t)/n:(r=n.asMonths(),Math.abs(r)>=1&&ut(r)?e.diff(t,"months",!0)/r:e.diff(t,"days",!0)/n.asDays())}function N(t,e){var n,r;return U(t)||U(e)?t/e:(n=t.asMonths(),r=e.asMonths(),Math.abs(n)>=1&&ut(n)&&Math.abs(r)>=1&&ut(r)?n/r:t.asDays()/e.asDays())}function j(t,e){var n;return U(t)?pt.duration(t*e):(n=t.asMonths(),Math.abs(n)>=1&&ut(n)?pt.duration({months:n*e}):pt.duration({days:t.asDays()*e}))}function U(t){return Boolean(t.hours()||t.minutes()||t.seconds()||t.milliseconds())}function W(t){return"[object Date]"===Object.prototype.toString.call(t)||t instanceof Date}function q(t){return"string"==typeof t&&/^\d+\:\d+(?:\:\d+\.?(?:\d{3})?)?$/.test(t)}function Y(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n=window.console;if(n&&n.log)return n.log.apply(n,t)}function Z(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n=window.console;return n&&n.warn?n.warn.apply(n,t):Y.apply(null,t)}function X(t,e){var n,r,i,o,s,a,l={};if(e)for(n=0;n<e.length;n++){for(r=e[n],i=[],o=t.length-1;o>=0;o--)if("object"==typeof(s=t[o][r]))i.unshift(s);else if(void 0!==s){l[r]=s;break}i.length&&(l[r]=X(i))}for(n=t.length-1;n>=0;n--){a=t[n];for(r in a)r in l||(l[r]=a[r])}return l}function Q(t,e){for(var n in t)$(t,n)&&(e[n]=t[n])}function $(t,e){return gt.call(t,e)}function K(t,e,n){if(ht.isFunction(t)&&(t=[t]),t){var r=void 0,i=void 0;for(r=0;r<t.length;r++)i=t[r].apply(e,n)||i;return i}}function J(t,e){for(var n=0,r=0;r<t.length;)e(t[r])?(t.splice(r,1),n++):r++;return n}function tt(t,e){for(var n=0,r=0;r<t.length;)t[r]===e?(t.splice(r,1),n++):r++;return n}function et(t,e){var n,r=t.length;if(null==r||r!==e.length)return!1;for(n=0;n<r;n++)if(t[n]!==e[n])return!1;return!0}function nt(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var n=0;n<t.length;n++)if(void 0!==t[n])return t[n]}function rt(t){return(t+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#039;").replace(/"/g,"&quot;").replace(/\n/g,"<br>")}function it(t){return t.replace(/&.*?;/g,"")}function ot(t){var e=[];return ht.each(t,function(t,n){null!=n&&e.push(t+":"+n)}),e.join(";")}function st(t){var e=[];return ht.each(t,function(t,n){null!=n&&e.push(t+'="'+rt(n)+'"')}),e.join(" ")}function at(t){return t.charAt(0).toUpperCase()+t.slice(1)}function lt(t,e){return t-e}function ut(t){return t%1==0}function dt(t,e){var n=t[e];return function(){return n.apply(t,arguments)}}function ct(t,e,n){void 0===n&&(n=!1);var r,i,o,s,a,l=function(){var u=+new Date-s;u<e?r=setTimeout(l,e-u):(r=null,n||(a=t.apply(o,i),o=i=null))};return function(){o=this,i=arguments,s=+new Date;var u=n&&!r;return r||(r=setTimeout(l,e)),u&&(a=t.apply(o,i),o=i=null),a}}Object.defineProperty(e,"__esModule",{value:!0});var pt=n(0),ht=n(3);e.compensateScroll=r,e.uncompensateScroll=i,e.disableCursor=o,e.enableCursor=s,e.distributeHeight=a,e.undistributeHeight=l,e.matchCellWidths=u,e.subtractInnerElHeight=d,e.getScrollParent=c,e.getOuterRect=p,e.getClientRect=h,e.getContentRect=f,e.getScrollbarWidths=g;var ft=null;e.isPrimaryMouseButton=w,e.getEvX=D,e.getEvY=E,e.getEvIsTouch=S,e.preventSelection=C,e.allowSelection=R,e.preventDefault=T,e.intersectRects=M,e.constrainPoint=I,e.getRectCenter=H,e.diffPoints=P,e.parseFieldSpecs=_,e.compareByFieldSpecs=x,e.compareByFieldSpec=O,e.flexibleCompare=F,e.dayIDs=["sun","mon","tue","wed","thu","fri","sat"],e.unitsDesc=["year","month","week","day","hour","minute","second","millisecond"],e.diffDayTime=z,e.diffDay=B,e.diffByUnit=A,e.computeGreatestUnit=k,e.computeDurationGreatestUnit=L,e.divideRangeByDuration=G,e.divideDurationByDuration=N,e.multiplyDuration=j,e.durationHasTime=U,e.isNativeDate=W,e.isTimeString=q,e.log=Y,e.warn=Z;var gt={}.hasOwnProperty;e.mergeProps=X,e.copyOwnProps=Q,e.hasOwnProp=$,e.applyAll=K,e.removeMatching=J,e.removeExact=tt,e.isArraysEqual=et,e.firstDefined=nt,e.htmlEscape=rt,e.stripHtmlEntities=it,e.cssToStr=ot,e.attrsToStr=st,e.capitaliseFirstLetter=at,e.compareNumbers=lt,e.isInt=ut,e.proxy=dt,e.debounce=ct},function(t,e,n){function r(t,e){return t.startMs-e.startMs}Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),o=n(11),s=function(){function t(t,e){this.isStart=!0,this.isEnd=!0,i.isMoment(t)&&(t=t.clone().stripZone()),i.isMoment(e)&&(e=e.clone().stripZone()),t&&(this.startMs=t.valueOf()),e&&(this.endMs=e.valueOf())}return t.invertRanges=function(e,n){var i,o,s=[],a=n.startMs;for(e.sort(r),i=0;i<e.length;i++)o=e[i],o.startMs>a&&s.push(new t(a,o.startMs)),o.endMs>a&&(a=o.endMs);return a<n.endMs&&s.push(new t(a,n.endMs)),s},t.prototype.intersect=function(e){var n=this.startMs,r=this.endMs,i=null;return null!=e.startMs&&(n=null==n?e.startMs:Math.max(n,e.startMs)),null!=e.endMs&&(r=null==r?e.endMs:Math.min(r,e.endMs)),(null==n||null==r||n<r)&&(i=new t(n,r),i.isStart=this.isStart&&n===this.startMs,i.isEnd=this.isEnd&&r===this.endMs),i},t.prototype.intersectsWith=function(t){return(null==this.endMs||null==t.startMs||this.endMs>t.startMs)&&(null==this.startMs||null==t.endMs||this.startMs<t.endMs)},t.prototype.containsRange=function(t){return(null==this.startMs||null!=t.startMs&&t.startMs>=this.startMs)&&(null==this.endMs||null!=t.endMs&&t.endMs<=this.endMs)},t.prototype.containsDate=function(t){var e=t.valueOf();return(null==this.startMs||e>=this.startMs)&&(null==this.endMs||e<this.endMs)},t.prototype.constrainDate=function(t){var e=t.valueOf();return null!=this.startMs&&e<this.startMs&&(e=this.startMs),null!=this.endMs&&e>=this.endMs&&(e=this.endMs-1),e},t.prototype.equals=function(t){return this.startMs===t.startMs&&this.endMs===t.endMs},t.prototype.clone=function(){var e=new t(this.startMs,this.endMs);return e.isStart=this.isStart,e.isEnd=this.isEnd,e},t.prototype.getStart=function(){return null!=this.startMs?o.default.utc(this.startMs).stripZone():null},t.prototype.getEnd=function(){return null!=this.endMs?o.default.utc(this.endMs).stripZone():null},t.prototype.as=function(t){return i.utc(this.endMs).diff(i.utc(this.startMs),t,!0)},t}();e.default=s},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(3),o=n(52),s=n(35),a=n(36),l=function(t){function e(n){var r=t.call(this)||this;return r.calendar=n,r.className=[],r.uid=String(e.uuid++),r}return r.__extends(e,t),e.parse=function(t,e){var n=new this(e);return!("object"!=typeof t||!n.applyProps(t))&&n},e.normalizeId=function(t){return t?String(t):null},e.prototype.fetch=function(t,e,n){},e.prototype.removeEventDefsById=function(t){},e.prototype.removeAllEventDefs=function(){},e.prototype.getPrimitive=function(t){},e.prototype.parseEventDefs=function(t){var e,n,r=[];for(e=0;e<t.length;e++)(n=this.parseEventDef(t[e]))&&r.push(n);return r},e.prototype.parseEventDef=function(t){var e=this.calendar.opt("eventDataTransform"),n=this.eventDataTransform;return e&&(t=e(t,this.calendar)),n&&(t=n(t,this.calendar)),a.default.parse(t,this)},e.prototype.applyManualStandardProps=function(t){return null!=t.id&&(this.id=e.normalizeId(t.id)),i.isArray(t.className)?this.className=t.className:"string"==typeof t.className&&(this.className=t.className.split(/\s+/)),!0},e.uuid=0,e.defineStandardProps=o.default.defineStandardProps,e.copyVerbatimStandardProps=o.default.copyVerbatimStandardProps,e}(s.default);e.default=l,o.default.mixInto(l),l.defineStandardProps({id:!1,className:!1,color:!0,backgroundColor:!0,borderColor:!0,textColor:!0,editable:!0,startEditable:!0,durationEditable:!0,rendering:!0,overlap:!0,constraint:!0,allDayDefault:!0,eventDataTransform:!0})},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(3),o=n(15),s=0,a=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e.prototype.listenTo=function(t,e,n){if("object"==typeof e)for(var r in e)e.hasOwnProperty(r)&&this.listenTo(t,r,e[r]);else"string"==typeof e&&t.on(e+"."+this.getListenerNamespace(),i.proxy(n,this))},e.prototype.stopListeningTo=function(t,e){t.off((e||"")+"."+this.getListenerNamespace())},e.prototype.getListenerNamespace=function(){return null==this.listenerId&&(this.listenerId=s++),"_listener"+this.listenerId},e}(o.default);e.default=a},,function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(37),o=n(53),s=n(16),a=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e.prototype.buildInstances=function(){return[this.buildInstance()]},e.prototype.buildInstance=function(){return new o.default(this,this.dateProfile)},e.prototype.isAllDay=function(){return this.dateProfile.isAllDay()},e.prototype.clone=function(){var e=t.prototype.clone.call(this);return e.dateProfile=this.dateProfile,e},e.prototype.rezone=function(){var t=this.source.calendar,e=this.dateProfile;this.dateProfile=new s.default(t.moment(e.start),e.end?t.moment(e.end):null,t)},e.prototype.applyManualStandardProps=function(e){var n=t.prototype.applyManualStandardProps.call(this,e),r=s.default.parse(e,this.source);return!!r&&(this.dateProfile=r,null!=e.date&&(this.miscProps.date=e.date),n)},e}(i.default);e.default=a,a.defineStandardProps({start:!1,date:!1,end:!1,allDay:!1})},,function(t,e,n){function r(t,e){return c.format.call(t,e)}function i(t,e,n){void 0===e&&(e=!1),void 0===n&&(n=!1);var r,i,d,c,p=t[0],h=1===t.length&&"string"==typeof p;return o.isMoment(p)||a.isNativeDate(p)||void 0===p?c=o.apply(null,t):(r=!1,i=!1,h?l.test(p)?(p+="-01",t=[p],r=!0,i=!0):(d=u.exec(p))&&(r=!d[5],i=!0):s.isArray(p)&&(i=!0),c=e||r?o.utc.apply(o,t):o.apply(null,t),r?(c._ambigTime=!0,c._ambigZone=!0):n&&(i?c._ambigZone=!0:h&&c.utcOffset(p))),c._fullCalendar=!0,c}Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(3),a=n(4),l=/^\s*\d{4}-\d\d$/,u=/^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?)?$/,d=o.fn;e.newMomentProto=d;var c=s.extend({},d);e.oldMomentProto=c;var p=o.momentProperties;p.push("_fullCalendar"),p.push("_ambigTime"),p.push("_ambigZone"),e.oldMomentFormat=r;var h=function(){return i(arguments)};e.default=h,h.utc=function(){var t=i(arguments,!0);return t.hasTime()&&t.utc(),t},h.parseZone=function(){return i(arguments,!0,!0)},d.week=d.weeks=function(t){var e=this._locale._fullCalendar_weekCalc;return null==t&&"function"==typeof e?e(this):"ISO"===e?c.isoWeek.apply(this,arguments):c.week.apply(this,arguments)},d.time=function(t){if(!this._fullCalendar)return c.time.apply(this,arguments);if(null==t)return o.duration({hours:this.hours(),minutes:this.minutes(),seconds:this.seconds(),milliseconds:this.milliseconds()});this._ambigTime=!1,o.isDuration(t)||o.isMoment(t)||(t=o.duration(t));var e=0;return o.isDuration(t)&&(e=24*Math.floor(t.asDays())),this.hours(e+t.hours()).minutes(t.minutes()).seconds(t.seconds()).milliseconds(t.milliseconds())},d.stripTime=function(){return this._ambigTime||(this.utc(!0),this.set({hours:0,minutes:0,seconds:0,ms:0}),this._ambigTime=!0,this._ambigZone=!0),this},d.hasTime=function(){return!this._ambigTime},d.stripZone=function(){var t;return this._ambigZone||(t=this._ambigTime,this.utc(!0),this._ambigTime=t||!1,this._ambigZone=!0),this},d.hasZone=function(){return!this._ambigZone},d.local=function(t){return c.local.call(this,this._ambigZone||t),this._ambigTime=!1,this._ambigZone=!1,this},d.utc=function(t){return c.utc.call(this,t),this._ambigTime=!1,this._ambigZone=!1,this},d.utcOffset=function(t){return null!=t&&(this._ambigTime=!1,this._ambigZone=!1),c.utcOffset.apply(this,arguments)}},function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){this.isAllDay=!1,this.unzonedRange=t,this.isAllDay=e}return t.prototype.toLegacy=function(t){return{start:t.msToMoment(this.unzonedRange.startMs,this.isAllDay),end:t.msToMoment(this.unzonedRange.endMs,this.isAllDay)}},t}();e.default=n},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(3),o=n(15),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e.prototype.on=function(t,e){return i(this).on(t,this._prepareIntercept(e)),this},e.prototype.one=function(t,e){return i(this).one(t,this._prepareIntercept(e)),this},e.prototype._prepareIntercept=function(t){var e=function(e,n){return t.apply(n.context||this,n.args||[])};return t.guid||(t.guid=i.guid++),e.guid=t.guid,e},e.prototype.off=function(t,e){return i(this).off(t,e),this},e.prototype.trigger=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];return i(this).triggerHandler(t,{args:e}),this},e.prototype.triggerWith=function(t,e,n){return i(this).triggerHandler(t,{context:e,args:n}),this},e.prototype.hasHandlers=function(t){var e=i._data(this,"events");return e&&e[t]&&e[t].length>0},e}(o.default);e.default=s},function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t){this.view=t._getView(),this.component=t}return t.prototype.opt=function(t){return this.view.opt(t)},t.prototype.end=function(){},t}();e.default=n},function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(){}return t.mixInto=function(t){var e=this;Object.getOwnPropertyNames(this.prototype).forEach(function(n){t.prototype[n]||(t.prototype[n]=e.prototype[n])})},t.mixOver=function(t){var e=this;Object.getOwnPropertyNames(this.prototype).forEach(function(n){t.prototype[n]=e.prototype[n]})},t}();e.default=n},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(5),i=function(){function t(t,e,n){this.start=t,this.end=e||null,this.unzonedRange=this.buildUnzonedRange(n)}return t.parse=function(e,n){var r=e.start||e.date,i=e.end;if(!r)return!1;var o=n.calendar,s=o.moment(r),a=i?o.moment(i):null,l=e.allDay,u=o.opt("forceEventDuration");return!!s.isValid()&&(null==l&&null==(l=n.allDayDefault)&&(l=o.opt("allDayDefault")),!0===l?(s.stripTime(),a&&a.stripTime()):!1===l&&(s.hasTime()||s.time(0),a&&!a.hasTime()&&a.time(0)),!a||a.isValid()&&a.isAfter(s)||(a=null),!a&&u&&(a=o.getDefaultEventEnd(!s.hasTime(),s)),new t(s,a,o))},t.isStandardProp=function(t){return"start"===t||"date"===t||"end"===t||"allDay"===t},t.prototype.isAllDay=function(){return!(this.start.hasTime()||this.end&&this.end.hasTime())},t.prototype.buildUnzonedRange=function(t){var e=this.start.clone().stripZone().valueOf(),n=this.getEnd(t).stripZone().valueOf();return new r.default(e,n)},t.prototype.getEnd=function(t){return this.end?this.end.clone():t.getDefaultEventEnd(this.isAllDay(),this.start)},t}();e.default=i},function(t,e,n){function r(t,e){return!t&&!e||!(!t||!e)&&(t.component===e.component&&i(t,e)&&i(e,t))}function i(t,e){for(var n in t)if(!/^(component|left|right|top|bottom)$/.test(n)&&t[n]!==e[n])return!1;return!0}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),s=n(4),a=n(59),l=function(t){function e(e,n){var r=t.call(this,n)||this;return r.component=e,r}return o.__extends(e,t),e.prototype.handleInteractionStart=function(e){var n,r,i,o=this.subjectEl;this.component.hitsNeeded(),this.computeScrollBounds(),e?(r={left:s.getEvX(e),top:s.getEvY(e)},i=r,o&&(n=s.getOuterRect(o),i=s.constrainPoint(i,n)),this.origHit=this.queryHit(i.left,i.top),o&&this.options.subjectCenter&&(this.origHit&&(n=s.intersectRects(this.origHit,n)||n),i=s.getRectCenter(n)),this.coordAdjust=s.diffPoints(i,r)):(this.origHit=null,this.coordAdjust=null),t.prototype.handleInteractionStart.call(this,e)},e.prototype.handleDragStart=function(e){var n;t.prototype.handleDragStart.call(this,e),(n=this.queryHit(s.getEvX(e),s.getEvY(e)))&&this.handleHitOver(n)},e.prototype.handleDrag=function(e,n,i){var o;t.prototype.handleDrag.call(this,e,n,i),o=this.queryHit(s.getEvX(i),s.getEvY(i)),r(o,this.hit)||(this.hit&&this.handleHitOut(),o&&this.handleHitOver(o))},e.prototype.handleDragEnd=function(e){this.handleHitDone(),t.prototype.handleDragEnd.call(this,e)},e.prototype.handleHitOver=function(t){var e=r(t,this.origHit);this.hit=t,this.trigger("hitOver",this.hit,e,this.origHit)},e.prototype.handleHitOut=function(){this.hit&&(this.trigger("hitOut",this.hit),this.handleHitDone(),this.hit=null)},e.prototype.handleHitDone=function(){this.hit&&this.trigger("hitDone",this.hit)},e.prototype.handleInteractionEnd=function(e,n){t.prototype.handleInteractionEnd.call(this,e,n),this.origHit=null,this.hit=null,this.component.hitsNotNeeded()},e.prototype.handleScrollEnd=function(){t.prototype.handleScrollEnd.call(this),this.isDragging&&(this.component.releaseHits(),this.component.prepareHits())},e.prototype.queryHit=function(t,e){return this.coordAdjust&&(t+=this.coordAdjust.left,e+=this.coordAdjust.top),this.component.queryHit(t,e)},e}(a.default);e.default=l},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0}),e.version="3.10.2",e.internalApiVersion=12;var r=n(4);e.applyAll=r.applyAll,e.debounce=r.debounce,e.isInt=r.isInt,e.htmlEscape=r.htmlEscape,e.cssToStr=r.cssToStr,e.proxy=r.proxy,e.capitaliseFirstLetter=r.capitaliseFirstLetter,e.getOuterRect=r.getOuterRect,e.getClientRect=r.getClientRect,e.getContentRect=r.getContentRect,e.getScrollbarWidths=r.getScrollbarWidths,e.preventDefault=r.preventDefault,e.parseFieldSpecs=r.parseFieldSpecs,e.compareByFieldSpecs=r.compareByFieldSpecs,e.compareByFieldSpec=r.compareByFieldSpec,e.flexibleCompare=r.flexibleCompare,e.computeGreatestUnit=r.computeGreatestUnit,e.divideRangeByDuration=r.divideRangeByDuration,e.divideDurationByDuration=r.divideDurationByDuration,e.multiplyDuration=r.multiplyDuration,e.durationHasTime=r.durationHasTime,e.log=r.log,e.warn=r.warn,e.removeExact=r.removeExact,e.intersectRects=r.intersectRects,e.allowSelection=r.allowSelection,e.attrsToStr=r.attrsToStr,e.compareNumbers=r.compareNumbers,e.compensateScroll=r.compensateScroll,e.computeDurationGreatestUnit=r.computeDurationGreatestUnit,e.constrainPoint=r.constrainPoint,e.copyOwnProps=r.copyOwnProps,e.diffByUnit=r.diffByUnit,e.diffDay=r.diffDay,e.diffDayTime=r.diffDayTime,e.diffPoints=r.diffPoints,e.disableCursor=r.disableCursor,e.distributeHeight=r.distributeHeight,e.enableCursor=r.enableCursor,e.firstDefined=r.firstDefined,e.getEvIsTouch=r.getEvIsTouch,e.getEvX=r.getEvX,e.getEvY=r.getEvY,e.getRectCenter=r.getRectCenter,e.getScrollParent=r.getScrollParent,e.hasOwnProp=r.hasOwnProp,e.isArraysEqual=r.isArraysEqual,e.isNativeDate=r.isNativeDate,e.isPrimaryMouseButton=r.isPrimaryMouseButton,e.isTimeString=r.isTimeString,e.matchCellWidths=r.matchCellWidths,e.mergeProps=r.mergeProps,e.preventSelection=r.preventSelection,e.removeMatching=r.removeMatching,e.stripHtmlEntities=r.stripHtmlEntities,e.subtractInnerElHeight=r.subtractInnerElHeight,e.uncompensateScroll=r.uncompensateScroll,e.undistributeHeight=r.undistributeHeight,e.dayIDs=r.dayIDs,e.unitsDesc=r.unitsDesc;var i=n(49);e.formatDate=i.formatDate,e.formatRange=i.formatRange,e.queryMostGranularFormatUnit=i.queryMostGranularFormatUnit;var o=n(32);e.datepickerLocale=o.datepickerLocale,e.locale=o.locale,e.getMomentLocaleData=o.getMomentLocaleData,e.populateInstanceComputableOptions=o.populateInstanceComputableOptions;var s=n(19);e.eventDefsToEventInstances=s.eventDefsToEventInstances,e.eventFootprintToComponentFootprint=s.eventFootprintToComponentFootprint,e.eventInstanceToEventRange=s.eventInstanceToEventRange,e.eventInstanceToUnzonedRange=s.eventInstanceToUnzonedRange,e.eventRangeToEventFootprint=s.eventRangeToEventFootprint;var a=n(11);e.moment=a.default;var l=n(13);e.EmitterMixin=l.default;var u=n(7);e.ListenerMixin=u.default;var d=n(51);e.Model=d.default;var c=n(217);e.Constraints=c.default;var p=n(55);e.DateProfileGenerator=p.default;var h=n(5);e.UnzonedRange=h.default;var f=n(12);e.ComponentFootprint=f.default;var g=n(218);e.BusinessHourGenerator=g.default;var v=n(219);e.EventPeriod=v.default;var y=n(220);e.EventManager=y.default;var m=n(37);e.EventDef=m.default;var b=n(39);e.EventDefMutation=b.default;var w=n(36);e.EventDefParser=w.default;var D=n(53);e.EventInstance=D.default;var E=n(50);e.EventRange=E.default;var S=n(54);e.RecurringEventDef=S.default;var C=n(9);e.SingleEventDef=C.default;var R=n(40);e.EventDefDateMutation=R.default;var T=n(16);e.EventDateProfile=T.default;var M=n(38);e.EventSourceParser=M.default;var I=n(6);e.EventSource=I.default;var H=n(57);e.defineThemeSystem=H.defineThemeSystem,e.getThemeSystemClass=H.getThemeSystemClass;var P=n(20);e.EventInstanceGroup=P.default;var _=n(56);e.ArrayEventSource=_.default;var x=n(223);e.FuncEventSource=x.default;var O=n(224);e.JsonFeedEventSource=O.default;var F=n(34);e.EventFootprint=F.default;var z=n(35);e.Class=z.default;var B=n(15);e.Mixin=B.default;var A=n(58);e.CoordCache=A.default;var k=n(225);e.Iterator=k.default;var L=n(59);e.DragListener=L.default;var V=n(17);e.HitDragListener=V.default;var G=n(226);e.MouseFollower=G.default;var N=n(52);e.ParsableModelMixin=N.default;var j=n(227);e.Popover=j.default;var U=n(21);e.Promise=U.default;var W=n(228);e.TaskQueue=W.default;var q=n(229);e.RenderQueue=q.default;var Y=n(41);e.Scroller=Y.default;var Z=n(22);e.Theme=Z.default;var X=n(230);e.Component=X.default;var Q=n(231);e.DateComponent=Q.default;var $=n(42);e.InteractiveDateComponent=$.default;var K=n(232);e.Calendar=K.default;var J=n(43);e.View=J.default;var tt=n(24);e.defineView=tt.defineView,e.getViewConfig=tt.getViewConfig;var et=n(60);e.DayTableMixin=et.default;var nt=n(61);e.BusinessHourRenderer=nt.default;var rt=n(44);e.EventRenderer=rt.default;var it=n(62);e.FillRenderer=it.default;var ot=n(63);e.HelperRenderer=ot.default;var st=n(233);e.ExternalDropping=st.default;var at=n(234);e.EventResizing=at.default;var lt=n(64);e.EventPointing=lt.default;var ut=n(235);e.EventDragging=ut.default;var dt=n(236);e.DateSelecting=dt.default;var ct=n(237);e.DateClicking=ct.default;var pt=n(14);e.Interaction=pt.default;var ht=n(65);e.StandardInteractionsMixin=ht.default;var ft=n(238);e.AgendaView=ft.default;var gt=n(239);e.TimeGrid=gt.default;var vt=n(240);e.TimeGridEventRenderer=vt.default;var yt=n(242);e.TimeGridFillRenderer=yt.default;var mt=n(241);e.TimeGridHelperRenderer=mt.default;var bt=n(66);e.DayGrid=bt.default;var wt=n(243);e.DayGridEventRenderer=wt.default;var Dt=n(245);e.DayGridFillRenderer=Dt.default;var Et=n(244);e.DayGridHelperRenderer=Et.default;var St=n(67);e.BasicView=St.default;var Ct=n(68);e.BasicViewDateProfileGenerator=Ct.default;var Rt=n(246);e.MonthView=Rt.default;var Tt=n(247);e.MonthViewDateProfileGenerator=Tt.default;var Mt=n(248);e.ListView=Mt.default;var It=n(250);e.ListEventPointing=It.default;var Ht=n(249);e.ListEventRenderer=Ht.default},function(t,e,n){function r(t,e){var n,r=[];for(n=0;n<t.length;n++)r.push.apply(r,t[n].buildInstances(e));return r}function i(t){return new l.default(t.dateProfile.unzonedRange,t.def,t)}function o(t){return new u.default(new d.default(t.unzonedRange,t.eventDef.isAllDay()),t.eventDef,t.eventInstance)}function s(t){return t.dateProfile.unzonedRange}function a(t){return t.componentFootprint}Object.defineProperty(e,"__esModule",{value:!0});var l=n(50),u=n(34),d=n(12);e.eventDefsToEventInstances=r,e.eventInstanceToEventRange=i,e.eventRangeToEventFootprint=o,e.eventInstanceToUnzonedRange=s,e.eventFootprintToComponentFootprint=a},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(5),i=n(19),o=n(50),s=function(){function t(t){this.eventInstances=t||[]}return t.prototype.getAllEventRanges=function(t){return t?this.sliceNormalRenderRanges(t):this.eventInstances.map(i.eventInstanceToEventRange)},t.prototype.sliceRenderRanges=function(t){return this.isInverse()?this.sliceInverseRenderRanges(t):this.sliceNormalRenderRanges(t)},t.prototype.sliceNormalRenderRanges=function(t){var e,n,r,i=this.eventInstances,s=[];for(e=0;e<i.length;e++)n=i[e],(r=n.dateProfile.unzonedRange.intersect(t))&&s.push(new o.default(r,n.def,n));return s},t.prototype.sliceInverseRenderRanges=function(t){var e=this.eventInstances.map(i.eventInstanceToUnzonedRange),n=this.getEventDef();return e=r.default.invertRanges(e,t),e.map(function(t){return new o.default(t,n)})},t.prototype.isInverse=function(){return this.getEventDef().hasInverseRendering()},t.prototype.getEventDef=function(){return this.explicitEventDef||this.eventInstances[0].def},t}();e.default=s},function(t,e,n){function r(t,e){t.then=function(n){return"function"==typeof n?s.resolve(n(e)):t}}function i(t){t.then=function(e,n){return"function"==typeof n&&n(),t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),s={construct:function(t){var e=o.Deferred(),n=e.promise();return"function"==typeof t&&t(function(t){e.resolve(t),r(n,t)},function(){e.reject(),i(n)}),n},resolve:function(t){var e=o.Deferred().resolve(t),n=e.promise();return r(n,t),n},reject:function(){var t=o.Deferred().reject(),e=t.promise();return i(e),e}};e.default=s},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(3),i=function(){function t(t){this.optionsManager=t,this.processIconOverride()}return t.prototype.processIconOverride=function(){this.iconOverrideOption&&this.setIconOverride(this.optionsManager.get(this.iconOverrideOption))},t.prototype.setIconOverride=function(t){var e,n;if(r.isPlainObject(t)){e=r.extend({},this.iconClasses);for(n in t)e[n]=this.applyIconOverridePrefix(t[n]);this.iconClasses=e}else!1===t&&(this.iconClasses={})},t.prototype.applyIconOverridePrefix=function(t){var e=this.iconOverridePrefix;return e&&0!==t.indexOf(e)&&(t=e+t),t},t.prototype.getClass=function(t){return this.classes[t]||""},t.prototype.getIconClass=function(t){var e=this.iconClasses[t];return e?this.baseIconClass+" "+e:""},t.prototype.getCustomButtonIconClass=function(t){var e;return this.iconOverrideCustomButtonOption&&(e=t[this.iconOverrideCustomButtonOption])?this.baseIconClass+" "+this.applyIconOverridePrefix(e):""},t}();e.default=i,i.prototype.classes={},i.prototype.iconClasses={},i.prototype.baseIconClass="",i.prototype.iconOverridePrefix=""},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(3),i=n(18),o=n(13),s=n(7);i.touchMouseIgnoreWait=500;var a=null,l=0,u=function(){function t(){this.isTouching=!1,this.mouseIgnoreDepth=0}return t.get=function(){return a||(a=new t,a.bind()),a},t.needed=function(){t.get(),l++},t.unneeded=function(){--l||(a.unbind(),a=null)},t.prototype.bind=function(){var t=this;this.listenTo(r(document),{touchstart:this.handleTouchStart,
touchcancel:this.handleTouchCancel,touchend:this.handleTouchEnd,mousedown:this.handleMouseDown,mousemove:this.handleMouseMove,mouseup:this.handleMouseUp,click:this.handleClick,selectstart:this.handleSelectStart,contextmenu:this.handleContextMenu}),window.addEventListener("touchmove",this.handleTouchMoveProxy=function(e){t.handleTouchMove(r.Event(e))},{passive:!1}),window.addEventListener("scroll",this.handleScrollProxy=function(e){t.handleScroll(r.Event(e))},!0)},t.prototype.unbind=function(){this.stopListeningTo(r(document)),window.removeEventListener("touchmove",this.handleTouchMoveProxy,{passive:!1}),window.removeEventListener("scroll",this.handleScrollProxy,!0)},t.prototype.handleTouchStart=function(t){this.stopTouch(t,!0),this.isTouching=!0,this.trigger("touchstart",t)},t.prototype.handleTouchMove=function(t){this.isTouching&&this.trigger("touchmove",t)},t.prototype.handleTouchCancel=function(t){this.isTouching&&(this.trigger("touchcancel",t),this.stopTouch(t))},t.prototype.handleTouchEnd=function(t){this.stopTouch(t)},t.prototype.handleMouseDown=function(t){this.shouldIgnoreMouse()||this.trigger("mousedown",t)},t.prototype.handleMouseMove=function(t){this.shouldIgnoreMouse()||this.trigger("mousemove",t)},t.prototype.handleMouseUp=function(t){this.shouldIgnoreMouse()||this.trigger("mouseup",t)},t.prototype.handleClick=function(t){this.shouldIgnoreMouse()||this.trigger("click",t)},t.prototype.handleSelectStart=function(t){this.trigger("selectstart",t)},t.prototype.handleContextMenu=function(t){this.trigger("contextmenu",t)},t.prototype.handleScroll=function(t){this.trigger("scroll",t)},t.prototype.stopTouch=function(t,e){void 0===e&&(e=!1),this.isTouching&&(this.isTouching=!1,this.trigger("touchend",t),e||this.startTouchMouseIgnore())},t.prototype.startTouchMouseIgnore=function(){var t=this,e=i.touchMouseIgnoreWait;e&&(this.mouseIgnoreDepth++,setTimeout(function(){t.mouseIgnoreDepth--},e))},t.prototype.shouldIgnoreMouse=function(){return this.isTouching||Boolean(this.mouseIgnoreDepth)},t}();e.default=u,s.default.mixInto(u),o.default.mixInto(u)},function(t,e,n){function r(t,n){e.viewHash[t]=n}function i(t){return e.viewHash[t]}Object.defineProperty(e,"__esModule",{value:!0});var o=n(18);e.viewHash={},o.views=e.viewHash,e.defineView=r,e.getViewConfig=i},,,,,,,,function(t,e,n){function r(t){a.each(f,function(e,n){null==t[e]&&(t[e]=n(t))})}function i(t,n,r){var i=e.localeOptionHash[t]||(e.localeOptionHash[t]={});i.isRTL=r.isRTL,i.weekNumberTitle=r.weekHeader,a.each(p,function(t,e){i[t]=e(r)});var o=a.datepicker;o&&(o.regional[n]=o.regional[t]=r,o.regional.en=o.regional[""],o.setDefaults(r))}function o(t,n){var r,i;r=e.localeOptionHash[t]||(e.localeOptionHash[t]={}),n&&(r=e.localeOptionHash[t]=d.mergeOptions([r,n])),i=s(t),a.each(h,function(t,e){null==r[t]&&(r[t]=e(i,r))}),d.globalDefaults.locale=t}function s(t){return l.localeData(t)||l.localeData("en")}Object.defineProperty(e,"__esModule",{value:!0});var a=n(3),l=n(0),u=n(18),d=n(33),c=n(4);e.localeOptionHash={},u.locales=e.localeOptionHash;var p={buttonText:function(t){return{prev:c.stripHtmlEntities(t.prevText),next:c.stripHtmlEntities(t.nextText),today:c.stripHtmlEntities(t.currentText)}},monthYearFormat:function(t){return t.showMonthAfterYear?"YYYY["+t.yearSuffix+"] MMMM":"MMMM YYYY["+t.yearSuffix+"]"}},h={dayOfMonthFormat:function(t,e){var n=t.longDateFormat("l");return n=n.replace(/^Y+[^\w\s]*|[^\w\s]*Y+$/g,""),e.isRTL?n+=" ddd":n="ddd "+n,n},mediumTimeFormat:function(t){return t.longDateFormat("LT").replace(/\s*a$/i,"a")},smallTimeFormat:function(t){return t.longDateFormat("LT").replace(":mm","(:mm)").replace(/(\Wmm)$/,"($1)").replace(/\s*a$/i,"a")},extraSmallTimeFormat:function(t){return t.longDateFormat("LT").replace(":mm","(:mm)").replace(/(\Wmm)$/,"($1)").replace(/\s*a$/i,"t")},hourFormat:function(t){return t.longDateFormat("LT").replace(":mm","").replace(/(\Wmm)$/,"").replace(/\s*a$/i,"a")},noMeridiemTimeFormat:function(t){return t.longDateFormat("LT").replace(/\s*a$/i,"")}},f={smallDayDateFormat:function(t){return t.isRTL?"D dd":"dd D"},weekFormat:function(t){return t.isRTL?"w[ "+t.weekNumberTitle+"]":"["+t.weekNumberTitle+" ]w"},smallWeekFormat:function(t){return t.isRTL?"w["+t.weekNumberTitle+"]":"["+t.weekNumberTitle+"]w"}};e.populateInstanceComputableOptions=r,e.datepickerLocale=i,e.locale=o,e.getMomentLocaleData=s,o("en",d.englishDefaults)},function(t,e,n){function r(t){return i.mergeProps(t,o)}Object.defineProperty(e,"__esModule",{value:!0});var i=n(4);e.globalDefaults={titleRangeSeparator:" – ",monthYearFormat:"MMMM YYYY",defaultTimedEventDuration:"02:00:00",defaultAllDayEventDuration:{days:1},forceEventDuration:!1,nextDayThreshold:"09:00:00",columnHeader:!0,defaultView:"month",aspectRatio:1.35,header:{left:"title",center:"",right:"today prev,next"},weekends:!0,weekNumbers:!1,weekNumberTitle:"W",weekNumberCalculation:"local",scrollTime:"06:00:00",minTime:"00:00:00",maxTime:"24:00:00",showNonCurrentDates:!0,lazyFetching:!0,startParam:"start",endParam:"end",timezoneParam:"timezone",timezone:!1,locale:null,isRTL:!1,buttonText:{prev:"prev",next:"next",prevYear:"prev year",nextYear:"next year",year:"year",today:"today",month:"month",week:"week",day:"day"},allDayText:"all-day",agendaEventMinHeight:0,theme:!1,dragOpacity:.75,dragRevertDuration:500,dragScroll:!0,unselectAuto:!0,dropAccept:"*",eventOrder:"title",eventLimit:!1,eventLimitText:"more",eventLimitClick:"popover",dayPopoverFormat:"LL",handleWindowResize:!0,windowResizeDelay:100,longPressDelay:1e3},e.englishDefaults={dayPopoverFormat:"dddd, MMMM D"},e.rtlDefaults={header:{left:"next,prev today",center:"",right:"title"},buttonIcons:{prev:"right-single-arrow",next:"left-single-arrow",prevYear:"right-double-arrow",nextYear:"left-double-arrow"},themeButtonIcons:{prev:"circle-triangle-e",next:"circle-triangle-w",nextYear:"seek-prev",prevYear:"seek-next"}};var o=["header","footer","buttonText","buttonIcons","themeButtonIcons"];e.mergeOptions=r},function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e,n){this.componentFootprint=t,this.eventDef=e,n&&(this.eventInstance=n)}return t.prototype.getEventLegacy=function(){return(this.eventInstance||this.eventDef).toLegacy()},t}();e.default=n},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(4),o=function(){function t(){}return t.extend=function(t){var e=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e}(this);return i.copyOwnProps(t,e.prototype),e},t.mixin=function(t){i.copyOwnProps(t,this.prototype)},t}();e.default=o},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),i=n(4),o=n(9),s=n(54);e.default={parse:function(t,e){return i.isTimeString(t.start)||r.isDuration(t.start)||i.isTimeString(t.end)||r.isDuration(t.end)?s.default.parse(t,e):o.default.parse(t,e)}}},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(3),i=n(52),o=function(){function t(t){this.source=t,this.className=[],this.miscProps={}}return t.parse=function(t,e){var n=new this(e);return!!n.applyProps(t)&&n},t.normalizeId=function(t){return String(t)},t.generateId=function(){return"_fc"+t.uuid++},t.prototype.clone=function(){var e=new this.constructor(this.source);return e.id=this.id,e.rawId=this.rawId,e.uid=this.uid,t.copyVerbatimStandardProps(this,e),e.className=this.className.slice(),e.miscProps=r.extend({},this.miscProps),e},t.prototype.hasInverseRendering=function(){return"inverse-background"===this.getRendering()},t.prototype.hasBgRendering=function(){var t=this.getRendering();return"inverse-background"===t||"background"===t},t.prototype.getRendering=function(){return null!=this.rendering?this.rendering:this.source.rendering},t.prototype.getConstraint=function(){return null!=this.constraint?this.constraint:null!=this.source.constraint?this.source.constraint:this.source.calendar.opt("eventConstraint")},t.prototype.getOverlap=function(){return null!=this.overlap?this.overlap:null!=this.source.overlap?this.source.overlap:this.source.calendar.opt("eventOverlap")},t.prototype.isStartExplicitlyEditable=function(){return null!=this.startEditable?this.startEditable:this.source.startEditable},t.prototype.isDurationExplicitlyEditable=function(){return null!=this.durationEditable?this.durationEditable:this.source.durationEditable},t.prototype.isExplicitlyEditable=function(){return null!=this.editable?this.editable:this.source.editable},t.prototype.toLegacy=function(){var e=r.extend({},this.miscProps);return e._id=this.uid,e.source=this.source,e.className=this.className.slice(),e.allDay=this.isAllDay(),null!=this.rawId&&(e.id=this.rawId),t.copyVerbatimStandardProps(this,e),e},t.prototype.applyManualStandardProps=function(e){return null!=e.id?this.id=t.normalizeId(this.rawId=e.id):this.id=t.generateId(),null!=e._id?this.uid=String(e._id):this.uid=t.generateId(),r.isArray(e.className)&&(this.className=e.className),"string"==typeof e.className&&(this.className=e.className.split(/\s+/)),!0},t.prototype.applyMiscProps=function(t){r.extend(this.miscProps,t)},t.uuid=0,t.defineStandardProps=i.default.defineStandardProps,t.copyVerbatimStandardProps=i.default.copyVerbatimStandardProps,t}();e.default=o,i.default.mixInto(o),o.defineStandardProps({_id:!1,id:!1,className:!1,source:!1,title:!0,url:!0,rendering:!0,constraint:!0,overlap:!0,editable:!0,startEditable:!0,durationEditable:!0,color:!0,backgroundColor:!0,borderColor:!0,textColor:!0})},function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={sourceClasses:[],registerClass:function(t){this.sourceClasses.unshift(t)},parse:function(t,e){var n,r,i=this.sourceClasses;for(n=0;n<i.length;n++)if(r=i[n].parse(t,e))return r}}},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(4),i=n(16),o=n(37),s=n(40),a=n(9),l=function(){function t(){}return t.createFromRawProps=function(e,n,a){var l,u,d,c,p=e.def,h={},f={},g={},v={},y=null,m=null;for(l in n)i.default.isStandardProp(l)?h[l]=n[l]:p.isStandardProp(l)?f[l]=n[l]:p.miscProps[l]!==n[l]&&(g[l]=n[l]);return u=i.default.parse(h,p.source),u&&(d=s.default.createFromDiff(e.dateProfile,u,a)),f.id!==p.id&&(y=f.id),r.isArraysEqual(f.className,p.className)||(m=f.className),o.default.copyVerbatimStandardProps(f,v),c=new t,c.eventDefId=y,c.className=m,c.verbatimStandardProps=v,c.miscProps=g,d&&(c.dateMutation=d),c},t.prototype.mutateSingle=function(t){var e;return this.dateMutation&&(e=t.dateProfile,t.dateProfile=this.dateMutation.buildNewDateProfile(e,t.source.calendar)),null!=this.eventDefId&&(t.id=o.default.normalizeId(t.rawId=this.eventDefId)),this.className&&(t.className=this.className),this.verbatimStandardProps&&a.default.copyVerbatimStandardProps(this.verbatimStandardProps,t),this.miscProps&&t.applyMiscProps(this.miscProps),e?function(){t.dateProfile=e}:function(){}},t.prototype.setDateMutation=function(t){t&&!t.isEmpty()?this.dateMutation=t:this.dateMutation=null},t.prototype.isEmpty=function(){return!this.dateMutation},t}();e.default=l},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(4),i=n(16),o=function(){function t(){this.clearEnd=!1,this.forceTimed=!1,this.forceAllDay=!1}return t.createFromDiff=function(e,n,i){function o(t,e){return i?r.diffByUnit(t,e,i):n.isAllDay()?r.diffDay(t,e):r.diffDayTime(t,e)}var s,a,l,u,d=e.end&&!n.end,c=e.isAllDay()&&!n.isAllDay(),p=!e.isAllDay()&&n.isAllDay();return s=o(n.start,e.start),n.end&&(a=o(n.unzonedRange.getEnd(),e.unzonedRange.getEnd()),l=a.subtract(s)),u=new t,u.clearEnd=d,u.forceTimed=c,u.forceAllDay=p,u.setDateDelta(s),u.setEndDelta(l),u},t.prototype.buildNewDateProfile=function(t,e){var n=t.start.clone(),r=null,o=!1;return t.end&&!this.clearEnd?r=t.end.clone():this.endDelta&&!r&&(r=e.getDefaultEventEnd(t.isAllDay(),n)),this.forceTimed?(o=!0,n.hasTime()||n.time(0),r&&!r.hasTime()&&r.time(0)):this.forceAllDay&&(n.hasTime()&&n.stripTime(),r&&r.hasTime()&&r.stripTime()),this.dateDelta&&(o=!0,n.add(this.dateDelta),r&&r.add(this.dateDelta)),this.endDelta&&(o=!0,r.add(this.endDelta)),this.startDelta&&(o=!0,n.add(this.startDelta)),o&&(n=e.applyTimezone(n),r&&(r=e.applyTimezone(r))),!r&&e.opt("forceEventDuration")&&(r=e.getDefaultEventEnd(t.isAllDay(),n)),new i.default(n,r,e)},t.prototype.setDateDelta=function(t){t&&t.valueOf()?this.dateDelta=t:this.dateDelta=null},t.prototype.setStartDelta=function(t){t&&t.valueOf()?this.startDelta=t:this.startDelta=null},t.prototype.setEndDelta=function(t){t&&t.valueOf()?this.endDelta=t:this.endDelta=null},t.prototype.isEmpty=function(){return!(this.clearEnd||this.forceTimed||this.forceAllDay||this.dateDelta||this.startDelta||this.endDelta)},t}();e.default=o},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(3),o=n(4),s=n(35),a=function(t){function e(e){var n=t.call(this)||this;return e=e||{},n.overflowX=e.overflowX||e.overflow||"auto",n.overflowY=e.overflowY||e.overflow||"auto",n}return r.__extends(e,t),e.prototype.render=function(){this.el=this.renderEl(),this.applyOverflow()},e.prototype.renderEl=function(){return this.scrollEl=i('<div class="fc-scroller"></div>')},e.prototype.clear=function(){this.setHeight("auto"),this.applyOverflow()},e.prototype.destroy=function(){this.el.remove()},e.prototype.applyOverflow=function(){this.scrollEl.css({"overflow-x":this.overflowX,"overflow-y":this.overflowY})},e.prototype.lockOverflow=function(t){var e=this.overflowX,n=this.overflowY;t=t||this.getScrollbarWidths(),"auto"===e&&(e=t.top||t.bottom||this.scrollEl[0].scrollWidth-1>this.scrollEl[0].clientWidth?"scroll":"hidden"),"auto"===n&&(n=t.left||t.right||this.scrollEl[0].scrollHeight-1>this.scrollEl[0].clientHeight?"scroll":"hidden"),this.scrollEl.css({"overflow-x":e,"overflow-y":n})},e.prototype.setHeight=function(t){this.scrollEl.height(t)},e.prototype.getScrollTop=function(){return this.scrollEl.scrollTop()},e.prototype.setScrollTop=function(t){this.scrollEl.scrollTop(t)},e.prototype.getClientWidth=function(){return this.scrollEl[0].clientWidth},e.prototype.getClientHeight=function(){return this.scrollEl[0].clientHeight},e.prototype.getScrollbarWidths=function(){return o.getScrollbarWidths(this.scrollEl)},e}(s.default);e.default=a},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(3),o=n(4),s=n(231),a=n(23),l=function(t){function e(e,n){var r=t.call(this,e,n)||this;return r.segSelector=".fc-event-container > *",r.dateSelectingClass&&(r.dateClicking=new r.dateClickingClass(r)),r.dateSelectingClass&&(r.dateSelecting=new r.dateSelectingClass(r)),r.eventPointingClass&&(r.eventPointing=new r.eventPointingClass(r)),r.eventDraggingClass&&r.eventPointing&&(r.eventDragging=new r.eventDraggingClass(r,r.eventPointing)),r.eventResizingClass&&r.eventPointing&&(r.eventResizing=new r.eventResizingClass(r,r.eventPointing)),r.externalDroppingClass&&(r.externalDropping=new r.externalDroppingClass(r)),r}return r.__extends(e,t),e.prototype.setElement=function(e){t.prototype.setElement.call(this,e),this.dateClicking&&this.dateClicking.bindToEl(e),this.dateSelecting&&this.dateSelecting.bindToEl(e),this.bindAllSegHandlersToEl(e)},e.prototype.removeElement=function(){this.endInteractions(),t.prototype.removeElement.call(this)},e.prototype.executeEventUnrender=function(){this.endInteractions(),t.prototype.executeEventUnrender.call(this)},e.prototype.bindGlobalHandlers=function(){t.prototype.bindGlobalHandlers.call(this),this.externalDropping&&this.externalDropping.bindToDocument()},e.prototype.unbindGlobalHandlers=function(){t.prototype.unbindGlobalHandlers.call(this),this.externalDropping&&this.externalDropping.unbindFromDocument()},e.prototype.bindDateHandlerToEl=function(t,e,n){var r=this;this.el.on(e,function(t){if(!i(t.target).is(r.segSelector+":not(.fc-helper),"+r.segSelector+":not(.fc-helper) *,.fc-more,a[data-goto]"))return n.call(r,t)})},e.prototype.bindAllSegHandlersToEl=function(t){[this.eventPointing,this.eventDragging,this.eventResizing].forEach(function(e){e&&e.bindToEl(t)})},e.prototype.bindSegHandlerToEl=function(t,e,n){var r=this;t.on(e,this.segSelector,function(t){var e=i(t.currentTarget);if(!e.is(".fc-helper")){var o=e.data("fc-seg");if(o&&!r.shouldIgnoreEventPointing())return n.call(r,o,t)}})},e.prototype.shouldIgnoreMouse=function(){return a.default.get().shouldIgnoreMouse()},e.prototype.shouldIgnoreTouch=function(){var t=this._getView();return t.isSelected||t.selectedEvent},e.prototype.shouldIgnoreEventPointing=function(){return this.eventDragging&&this.eventDragging.isDragging||this.eventResizing&&this.eventResizing.isResizing},e.prototype.canStartSelection=function(t,e){return o.getEvIsTouch(e)&&!this.canStartResize(t,e)&&(this.isEventDefDraggable(t.footprint.eventDef)||this.isEventDefResizable(t.footprint.eventDef))},e.prototype.canStartDrag=function(t,e){return!this.canStartResize(t,e)&&this.isEventDefDraggable(t.footprint.eventDef)},e.prototype.canStartResize=function(t,e){var n=this._getView(),r=t.footprint.eventDef;return(!o.getEvIsTouch(e)||n.isEventDefSelected(r))&&this.isEventDefResizable(r)&&i(e.target).is(".fc-resizer")},e.prototype.endInteractions=function(){[this.dateClicking,this.dateSelecting,this.eventPointing,this.eventDragging,this.eventResizing].forEach(function(t){t&&t.end()})},e.prototype.isEventDefDraggable=function(t){return this.isEventDefStartEditable(t)},e.prototype.isEventDefStartEditable=function(t){var e=t.isStartExplicitlyEditable();return null==e&&null==(e=this.opt("eventStartEditable"))&&(e=this.isEventDefGenerallyEditable(t)),e},e.prototype.isEventDefGenerallyEditable=function(t){var e=t.isExplicitlyEditable();return null==e&&(e=this.opt("editable")),e},e.prototype.isEventDefResizableFromStart=function(t){return this.opt("eventResizableFromStart")&&this.isEventDefResizable(t)},e.prototype.isEventDefResizableFromEnd=function(t){return this.isEventDefResizable(t)},e.prototype.isEventDefResizable=function(t){var e=t.isDurationExplicitlyEditable();return null==e&&null==(e=this.opt("eventDurationEditable"))&&(e=this.isEventDefGenerallyEditable(t)),e},e.prototype.diffDates=function(t,e){return this.largeUnit?o.diffByUnit(t,e,this.largeUnit):o.diffDayTime(t,e)},e.prototype.isEventInstanceGroupAllowed=function(t){var e,n=this._getView(),r=this.dateProfile,i=this.eventRangesToEventFootprints(t.getAllEventRanges());for(e=0;e<i.length;e++)if(!r.validUnzonedRange.containsRange(i[e].componentFootprint.unzonedRange))return!1;return n.calendar.constraints.isEventInstanceGroupAllowed(t)},e.prototype.isExternalInstanceGroupAllowed=function(t){var e,n=this._getView(),r=this.dateProfile,i=this.eventRangesToEventFootprints(t.getAllEventRanges());for(e=0;e<i.length;e++)if(!r.validUnzonedRange.containsRange(i[e].componentFootprint.unzonedRange))return!1;for(e=0;e<i.length;e++)if(!n.calendar.constraints.isSelectionFootprintAllowed(i[e].componentFootprint))return!1;return!0},e}(s.default);e.default=l},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(3),o=n(0),s=n(4),a=n(229),l=n(55),u=n(42),d=n(23),c=n(5),p=function(t){function e(e,n){var r=t.call(this,null,n.options)||this;return r.batchRenderDepth=0,r.isSelected=!1,r.calendar=e,r.viewSpec=n,r.type=n.type,r.name=r.type,r.initRenderQueue(),r.initHiddenDays(),r.dateProfileGenerator=new r.dateProfileGeneratorClass(r),r.bindBaseRenderHandlers(),r.eventOrderSpecs=s.parseFieldSpecs(r.opt("eventOrder")),r.initialize&&r.initialize(),r}return r.__extends(e,t),e.prototype._getView=function(){return this},e.prototype.opt=function(t){return this.options[t]},e.prototype.initRenderQueue=function(){this.renderQueue=new a.default({event:this.opt("eventRenderWait")}),this.renderQueue.on("start",this.onRenderQueueStart.bind(this)),this.renderQueue.on("stop",this.onRenderQueueStop.bind(this)),this.on("before:change",this.startBatchRender),this.on("change",this.stopBatchRender)},e.prototype.onRenderQueueStart=function(){this.calendar.freezeContentHeight(),this.addScroll(this.queryScroll())},e.prototype.onRenderQueueStop=function(){this.calendar.updateViewSize()&&this.popScroll(),this.calendar.thawContentHeight()},e.prototype.startBatchRender=function(){this.batchRenderDepth++||this.renderQueue.pause()},e.prototype.stopBatchRender=function(){--this.batchRenderDepth||this.renderQueue.resume()},e.prototype.requestRender=function(t,e,n){this.renderQueue.queue(t,e,n)},e.prototype.whenSizeUpdated=function(t){this.renderQueue.isRunning?this.renderQueue.one("stop",t.bind(this)):t.call(this)},e.prototype.computeTitle=function(t){var e;return e=/^(year|month)$/.test(t.currentRangeUnit)?t.currentUnzonedRange:t.activeUnzonedRange,this.formatRange({start:this.calendar.msToMoment(e.startMs,t.isRangeAllDay),end:this.calendar.msToMoment(e.endMs,t.isRangeAllDay)},t.isRangeAllDay,this.opt("titleFormat")||this.computeTitleFormat(t),this.opt("titleRangeSeparator"))},e.prototype.computeTitleFormat=function(t){var e=t.currentRangeUnit;return"year"===e?"YYYY":"month"===e?this.opt("monthYearFormat"):t.currentUnzonedRange.as("days")>1?"ll":"LL"},e.prototype.setDate=function(t){var e=this.get("dateProfile"),n=this.dateProfileGenerator.build(t,void 0,!0);e&&e.activeUnzonedRange.equals(n.activeUnzonedRange)||this.set("dateProfile",n)},e.prototype.unsetDate=function(){this.unset("dateProfile")},e.prototype.fetchInitialEvents=function(t){var e=this.calendar,n=t.isRangeAllDay&&!this.usesMinMaxTime;return e.requestEvents(e.msToMoment(t.activeUnzonedRange.startMs,n),e.msToMoment(t.activeUnzonedRange.endMs,n))},e.prototype.bindEventChanges=function(){this.listenTo(this.calendar,"eventsReset",this.resetEvents)},e.prototype.unbindEventChanges=function(){this.stopListeningTo(this.calendar,"eventsReset")},e.prototype.setEvents=function(t){this.set("currentEvents",t),this.set("hasEvents",!0)},e.prototype.unsetEvents=function(){this.unset("currentEvents"),this.unset("hasEvents")},e.prototype.resetEvents=function(t){this.startBatchRender(),this.unsetEvents(),this.setEvents(t),this.stopBatchRender()},e.prototype.requestDateRender=function(t){var e=this;this.requestRender(function(){e.executeDateRender(t)},"date","init")},e.prototype.requestDateUnrender=function(){var t=this;this.requestRender(function(){t.executeDateUnrender()},"date","destroy")},e.prototype.executeDateRender=function(e){t.prototype.executeDateRender.call(this,e),this.render&&this.render(),this.trigger("datesRendered"),this.addScroll({isDateInit:!0}),this.startNowIndicator()},e.prototype.executeDateUnrender=function(){this.unselect(),this.stopNowIndicator(),this.trigger("before:datesUnrendered"),this.destroy&&this.destroy(),t.prototype.executeDateUnrender.call(this)},e.prototype.bindBaseRenderHandlers=function(){var t=this;this.on("datesRendered",function(){t.whenSizeUpdated(t.triggerViewRender)}),this.on("before:datesUnrendered",function(){t.triggerViewDestroy()})},e.prototype.triggerViewRender=function(){this.publiclyTrigger("viewRender",{context:this,args:[this,this.el]})},e.prototype.triggerViewDestroy=function(){this.publiclyTrigger("viewDestroy",{context:this,args:[this,this.el]})},e.prototype.requestEventsRender=function(t){var e=this;this.requestRender(function(){e.executeEventRender(t),e.whenSizeUpdated(e.triggerAfterEventsRendered)},"event","init")},e.prototype.requestEventsUnrender=function(){var t=this;this.requestRender(function(){t.triggerBeforeEventsDestroyed(),t.executeEventUnrender()},"event","destroy")},e.prototype.requestBusinessHoursRender=function(t){var e=this;this.requestRender(function(){e.renderBusinessHours(t)},"businessHours","init")},e.prototype.requestBusinessHoursUnrender=function(){var t=this;this.requestRender(function(){t.unrenderBusinessHours()},"businessHours","destroy")},e.prototype.bindGlobalHandlers=function(){t.prototype.bindGlobalHandlers.call(this),this.listenTo(d.default.get(),{touchstart:this.processUnselect,mousedown:this.handleDocumentMousedown})},e.prototype.unbindGlobalHandlers=function(){t.prototype.unbindGlobalHandlers.call(this),this.stopListeningTo(d.default.get())},e.prototype.startNowIndicator=function(){var t,e,n,r=this;this.opt("nowIndicator")&&(t=this.getNowIndicatorUnit())&&(e=s.proxy(this,"updateNowIndicator"),this.initialNowDate=this.calendar.getNow(),this.initialNowQueriedMs=(new Date).valueOf(),n=this.initialNowDate.clone().startOf(t).add(1,t).valueOf()-this.initialNowDate.valueOf(),this.nowIndicatorTimeoutID=setTimeout(function(){r.nowIndicatorTimeoutID=null,e(),n=+o.duration(1,t),n=Math.max(100,n),r.nowIndicatorIntervalID=setInterval(e,n)},n))},e.prototype.updateNowIndicator=function(){this.isDatesRendered&&this.initialNowDate&&(this.unrenderNowIndicator(),this.renderNowIndicator(this.initialNowDate.clone().add((new Date).valueOf()-this.initialNowQueriedMs)),this.isNowIndicatorRendered=!0)},e.prototype.stopNowIndicator=function(){this.isNowIndicatorRendered&&(this.nowIndicatorTimeoutID&&(clearTimeout(this.nowIndicatorTimeoutID),this.nowIndicatorTimeoutID=null),this.nowIndicatorIntervalID&&(clearInterval(this.nowIndicatorIntervalID),this.nowIndicatorIntervalID=null),this.unrenderNowIndicator(),this.isNowIndicatorRendered=!1)},e.prototype.updateSize=function(e,n,r){this.setHeight?this.setHeight(e,n):t.prototype.updateSize.call(this,e,n,r),this.updateNowIndicator()},e.prototype.addScroll=function(t){var e=this.queuedScroll||(this.queuedScroll={});i.extend(e,t)},e.prototype.popScroll=function(){this.applyQueuedScroll(),this.queuedScroll=null},e.prototype.applyQueuedScroll=function(){this.queuedScroll&&this.applyScroll(this.queuedScroll)},e.prototype.queryScroll=function(){var t={};return this.isDatesRendered&&i.extend(t,this.queryDateScroll()),t},e.prototype.applyScroll=function(t){t.isDateInit&&this.isDatesRendered&&i.extend(t,this.computeInitialDateScroll()),this.isDatesRendered&&this.applyDateScroll(t)},e.prototype.computeInitialDateScroll=function(){return{}},e.prototype.queryDateScroll=function(){return{}},e.prototype.applyDateScroll=function(t){},e.prototype.reportEventDrop=function(t,e,n,r){var i=this.calendar.eventManager,s=i.mutateEventsWithId(t.def.id,e),a=e.dateMutation;a&&(t.dateProfile=a.buildNewDateProfile(t.dateProfile,this.calendar)),this.triggerEventDrop(t,a&&a.dateDelta||o.duration(),s,n,r)},e.prototype.triggerEventDrop=function(t,e,n,r,i){this.publiclyTrigger("eventDrop",{context:r[0],args:[t.toLegacy(),e,n,i,{},this]})},e.prototype.reportExternalDrop=function(t,e,n,r,i,o){e&&this.calendar.eventManager.addEventDef(t,n),this.triggerExternalDrop(t,e,r,i,o)},e.prototype.triggerExternalDrop=function(t,e,n,r,i){this.publiclyTrigger("drop",{context:n[0],args:[t.dateProfile.start.clone(),r,i,this]}),e&&this.publiclyTrigger("eventReceive",{context:this,args:[t.buildInstance().toLegacy(),this]})},e.prototype.reportEventResize=function(t,e,n,r){var i=this.calendar.eventManager,o=i.mutateEventsWithId(t.def.id,e);t.dateProfile=e.dateMutation.buildNewDateProfile(t.dateProfile,this.calendar);var s=e.dateMutation.endDelta||e.dateMutation.startDelta;this.triggerEventResize(t,s,o,n,r)},e.prototype.triggerEventResize=function(t,e,n,r,i){this.publiclyTrigger("eventResize",{context:r[0],args:[t.toLegacy(),e,n,i,{},this]})},e.prototype.select=function(t,e){this.unselect(e),this.renderSelectionFootprint(t),this.reportSelection(t,e)},e.prototype.renderSelectionFootprint=function(e){this.renderSelection?this.renderSelection(e.toLegacy(this.calendar)):t.prototype.renderSelectionFootprint.call(this,e)},e.prototype.reportSelection=function(t,e){this.isSelected=!0,this.triggerSelect(t,e)},e.prototype.triggerSelect=function(t,e){var n=this.calendar.footprintToDateProfile(t);this.publiclyTrigger("select",{context:this,args:[n.start,n.end,e,this]})},e.prototype.unselect=function(t){this.isSelected&&(this.isSelected=!1,this.destroySelection&&this.destroySelection(),this.unrenderSelection(),this.publiclyTrigger("unselect",{context:this,args:[t,this]}))},e.prototype.selectEventInstance=function(t){this.selectedEventInstance&&this.selectedEventInstance===t||(this.unselectEventInstance(),this.getEventSegs().forEach(function(e){e.footprint.eventInstance===t&&e.el&&e.el.addClass("fc-selected")}),this.selectedEventInstance=t)},e.prototype.unselectEventInstance=function(){this.selectedEventInstance&&(this.getEventSegs().forEach(function(t){t.el&&t.el.removeClass("fc-selected")}),this.selectedEventInstance=null)},e.prototype.isEventDefSelected=function(t){return this.selectedEventInstance&&this.selectedEventInstance.def.id===t.id},e.prototype.handleDocumentMousedown=function(t){s.isPrimaryMouseButton(t)&&this.processUnselect(t)},e.prototype.processUnselect=function(t){this.processRangeUnselect(t),this.processEventUnselect(t)},e.prototype.processRangeUnselect=function(t){var e;this.isSelected&&this.opt("unselectAuto")&&((e=this.opt("unselectCancel"))&&i(t.target).closest(e).length||this.unselect(t))},e.prototype.processEventUnselect=function(t){this.selectedEventInstance&&(i(t.target).closest(".fc-selected").length||this.unselectEventInstance())},e.prototype.triggerBaseRendered=function(){this.publiclyTrigger("viewRender",{context:this,args:[this,this.el]})},e.prototype.triggerBaseUnrendered=function(){this.publiclyTrigger("viewDestroy",{context:this,args:[this,this.el]})},e.prototype.triggerDayClick=function(t,e,n){var r=this.calendar.footprintToDateProfile(t);this.publiclyTrigger("dayClick",{context:e,args:[r.start,n,this]})},e.prototype.isDateInOtherMonth=function(t,e){return!1},e.prototype.getUnzonedRangeOption=function(t){var e=this.opt(t);if("function"==typeof e&&(e=e.apply(null,Array.prototype.slice.call(arguments,1))),e)return this.calendar.parseUnzonedRange(e)},e.prototype.initHiddenDays=function(){var t,e=this.opt("hiddenDays")||[],n=[],r=0;for(!1===this.opt("weekends")&&e.push(0,6),t=0;t<7;t++)(n[t]=-1!==i.inArray(t,e))||r++;if(!r)throw new Error("invalid hiddenDays");this.isHiddenDayHash=n},e.prototype.trimHiddenDays=function(t){var e=t.getStart(),n=t.getEnd();return e&&(e=this.skipHiddenDays(e)),n&&(n=this.skipHiddenDays(n,-1,!0)),null===e||null===n||e<n?new c.default(e,n):null},e.prototype.isHiddenDay=function(t){return o.isMoment(t)&&(t=t.day()),this.isHiddenDayHash[t]},e.prototype.skipHiddenDays=function(t,e,n){void 0===e&&(e=1),void 0===n&&(n=!1);for(var r=t.clone();this.isHiddenDayHash[(r.day()+(n?e:0)+7)%7];)r.add(e,"days");return r},e}(u.default);e.default=p,p.prototype.usesMinMaxTime=!1,p.prototype.dateProfileGeneratorClass=l.default,p.watch("displayingDates",["isInDom","dateProfile"],function(t){this.requestDateRender(t.dateProfile)},function(){this.requestDateUnrender()}),p.watch("displayingBusinessHours",["displayingDates","businessHourGenerator"],function(t){this.requestBusinessHoursRender(t.businessHourGenerator)},function(){this.requestBusinessHoursUnrender()}),p.watch("initialEvents",["dateProfile"],function(t){return this.fetchInitialEvents(t.dateProfile)}),p.watch("bindingEvents",["initialEvents"],function(t){this.setEvents(t.initialEvents),this.bindEventChanges()},function(){this.unbindEventChanges(),this.unsetEvents()}),p.watch("displayingEvents",["displayingDates","hasEvents"],function(){this.requestEventsRender(this.get("currentEvents"))},function(){this.requestEventsUnrender()}),p.watch("title",["dateProfile"],function(t){return this.title=this.computeTitle(t.dateProfile)}),p.watch("legacyDateProps",["dateProfile"],function(t){var e=this.calendar,n=t.dateProfile;this.start=e.msToMoment(n.activeUnzonedRange.startMs,n.isRangeAllDay),this.end=e.msToMoment(n.activeUnzonedRange.endMs,n.isRangeAllDay),this.intervalStart=e.msToMoment(n.currentUnzonedRange.startMs,n.isRangeAllDay),this.intervalEnd=e.msToMoment(n.currentUnzonedRange.endMs,n.isRangeAllDay)})},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(3),i=n(4),o=function(){function t(t,e){this.view=t._getView(),this.component=t,this.fillRenderer=e}return t.prototype.opt=function(t){return this.view.opt(t)},t.prototype.rangeUpdated=function(){var t,e
;this.eventTimeFormat=this.opt("eventTimeFormat")||this.opt("timeFormat")||this.computeEventTimeFormat(),t=this.opt("displayEventTime"),null==t&&(t=this.computeDisplayEventTime()),e=this.opt("displayEventEnd"),null==e&&(e=this.computeDisplayEventEnd()),this.displayEventTime=t,this.displayEventEnd=e},t.prototype.render=function(t){var e,n,r,i=this.component._getDateProfile(),o=[],s=[];for(e in t)n=t[e],r=n.sliceRenderRanges(i.activeUnzonedRange),n.getEventDef().hasBgRendering()?o.push.apply(o,r):s.push.apply(s,r);this.renderBgRanges(o),this.renderFgRanges(s)},t.prototype.unrender=function(){this.unrenderBgRanges(),this.unrenderFgRanges()},t.prototype.renderFgRanges=function(t){var e=this.component.eventRangesToEventFootprints(t),n=this.component.eventFootprintsToSegs(e);n=this.renderFgSegEls(n),!1!==this.renderFgSegs(n)&&(this.fgSegs=n)},t.prototype.unrenderFgRanges=function(){this.unrenderFgSegs(this.fgSegs||[]),this.fgSegs=null},t.prototype.renderBgRanges=function(t){var e=this.component.eventRangesToEventFootprints(t),n=this.component.eventFootprintsToSegs(e);!1!==this.renderBgSegs(n)&&(this.bgSegs=n)},t.prototype.unrenderBgRanges=function(){this.unrenderBgSegs(),this.bgSegs=null},t.prototype.getSegs=function(){return(this.bgSegs||[]).concat(this.fgSegs||[])},t.prototype.renderFgSegs=function(t){return!1},t.prototype.unrenderFgSegs=function(t){},t.prototype.renderBgSegs=function(t){var e=this;if(!this.fillRenderer)return!1;this.fillRenderer.renderSegs("bgEvent",t,{getClasses:function(t){return e.getBgClasses(t.footprint.eventDef)},getCss:function(t){return{"background-color":e.getBgColor(t.footprint.eventDef)}},filterEl:function(t,n){return e.filterEventRenderEl(t.footprint,n)}})},t.prototype.unrenderBgSegs=function(){this.fillRenderer&&this.fillRenderer.unrender("bgEvent")},t.prototype.renderFgSegEls=function(t,e){var n=this;void 0===e&&(e=!1);var i,o=this.view.hasPublicHandlers("eventRender"),s="",a=[];if(t.length){for(i=0;i<t.length;i++)this.beforeFgSegHtml(t[i]),s+=this.fgSegHtml(t[i],e);r(s).each(function(e,i){var s=t[e],l=r(i);o&&(l=n.filterEventRenderEl(s.footprint,l)),l&&(l.data("fc-seg",s),s.el=l,a.push(s))})}return a},t.prototype.beforeFgSegHtml=function(t){},t.prototype.fgSegHtml=function(t,e){},t.prototype.getSegClasses=function(t,e,n){var r=["fc-event",t.isStart?"fc-start":"fc-not-start",t.isEnd?"fc-end":"fc-not-end"].concat(this.getClasses(t.footprint.eventDef));return e&&r.push("fc-draggable"),n&&r.push("fc-resizable"),this.view.isEventDefSelected(t.footprint.eventDef)&&r.push("fc-selected"),r},t.prototype.filterEventRenderEl=function(t,e){var n=t.getEventLegacy(),i=this.view.publiclyTrigger("eventRender",{context:n,args:[n,e,this.view]});return!1===i?e=null:i&&!0!==i&&(e=r(i)),e},t.prototype.getTimeText=function(t,e,n){return this._getTimeText(t.eventInstance.dateProfile.start,t.eventInstance.dateProfile.end,t.componentFootprint.isAllDay,e,n)},t.prototype._getTimeText=function(t,e,n,r,i){return null==r&&(r=this.eventTimeFormat),null==i&&(i=this.displayEventEnd),this.displayEventTime&&!n?i&&e?this.view.formatRange({start:t,end:e},!1,r):t.format(r):""},t.prototype.computeEventTimeFormat=function(){return this.opt("smallTimeFormat")},t.prototype.computeDisplayEventTime=function(){return!0},t.prototype.computeDisplayEventEnd=function(){return!0},t.prototype.getBgClasses=function(t){var e=this.getClasses(t);return e.push("fc-bgevent"),e},t.prototype.getClasses=function(t){var e,n=this.getStylingObjs(t),r=[];for(e=0;e<n.length;e++)r.push.apply(r,n[e].eventClassName||n[e].className||[]);return r},t.prototype.getSkinCss=function(t){return{"background-color":this.getBgColor(t),"border-color":this.getBorderColor(t),color:this.getTextColor(t)}},t.prototype.getBgColor=function(t){var e,n,r=this.getStylingObjs(t);for(e=0;e<r.length&&!n;e++)n=r[e].eventBackgroundColor||r[e].eventColor||r[e].backgroundColor||r[e].color;return n||(n=this.opt("eventBackgroundColor")||this.opt("eventColor")),n},t.prototype.getBorderColor=function(t){var e,n,r=this.getStylingObjs(t);for(e=0;e<r.length&&!n;e++)n=r[e].eventBorderColor||r[e].eventColor||r[e].borderColor||r[e].color;return n||(n=this.opt("eventBorderColor")||this.opt("eventColor")),n},t.prototype.getTextColor=function(t){var e,n,r=this.getStylingObjs(t);for(e=0;e<r.length&&!n;e++)n=r[e].eventTextColor||r[e].textColor;return n||(n=this.opt("eventTextColor")),n},t.prototype.getStylingObjs=function(t){var e=this.getFallbackStylingObjs(t);return e.unshift(t),e},t.prototype.getFallbackStylingObjs=function(t){return[t.source]},t.prototype.sortEventSegs=function(t){t.sort(i.proxy(this,"compareEventSegs"))},t.prototype.compareEventSegs=function(t,e){var n=t.footprint,r=e.footprint,o=n.componentFootprint,s=r.componentFootprint,a=o.unzonedRange,l=s.unzonedRange;return a.startMs-l.startMs||l.endMs-l.startMs-(a.endMs-a.startMs)||s.isAllDay-o.isAllDay||i.compareByFieldSpecs(n.eventDef,r.eventDef,this.view.eventOrderSpecs,n.eventDef.miscProps,r.eventDef.miscProps)},t}();e.default=o},,,,,function(t,e,n){function r(t){return"en"!==t.locale()?t.clone().locale("en"):t}function i(t,e){return h(a(e).fakeFormatString,t)}function o(t,e,n,r,i){var o;return t=y.default.parseZone(t),e=y.default.parseZone(e),o=t.localeData(),n=o.longDateFormat(n)||n,s(a(n),t,e,r||" - ",i)}function s(t,e,n,r,i){var o,s,a,l=t.sameUnits,u=e.clone().stripZone(),d=n.clone().stripZone(),c=f(t.fakeFormatString,e),p=f(t.fakeFormatString,n),h="",v="",y="",m="",b="";for(o=0;o<l.length&&(!l[o]||u.isSame(d,l[o]));o++)h+=c[o];for(s=l.length-1;s>o&&(!l[s]||u.isSame(d,l[s]))&&(s-1!==o||"."!==c[s]);s--)v=c[s]+v;for(a=o;a<=s;a++)y+=c[a],m+=p[a];return(y||m)&&(b=i?m+r+y:y+r+m),g(h+b+v)}function a(t){return C[t]||(C[t]=l(t))}function l(t){var e=u(t);return{fakeFormatString:c(e),sameUnits:p(e)}}function u(t){for(var e,n=[],r=/\[([^\]]*)\]|\(([^\)]*)\)|(LTS|LT|(\w)\4*o?)|([^\w\[\(]+)/g;e=r.exec(t);)e[1]?n.push.apply(n,d(e[1])):e[2]?n.push({maybe:u(e[2])}):e[3]?n.push({token:e[3]}):e[5]&&n.push.apply(n,d(e[5]));return n}function d(t){return". "===t?["."," "]:[t]}function c(t){var e,n,r=[];for(e=0;e<t.length;e++)n=t[e],"string"==typeof n?r.push("["+n+"]"):n.token?n.token in E?r.push(b+"["+n.token+"]"):r.push(n.token):n.maybe&&r.push(w+c(n.maybe)+w);return r.join(m)}function p(t){var e,n,r,i=[];for(e=0;e<t.length;e++)n=t[e],n.token?(r=S[n.token.charAt(0)],i.push(r?r.unit:"second")):n.maybe?i.push.apply(i,p(n.maybe)):i.push(null);return i}function h(t,e){return g(f(t,e).join(""))}function f(t,e){var n,r,i=[],o=y.oldMomentFormat(e,t),s=o.split(m);for(n=0;n<s.length;n++)r=s[n],r.charAt(0)===b?i.push(E[r.substring(1)](e)):i.push(r);return i}function g(t){return t.replace(D,function(t,e){return e.match(/[1-9]/)?e:""})}function v(t){var e,n,r,i,o=u(t);for(e=0;e<o.length;e++)n=o[e],n.token&&(r=S[n.token.charAt(0)])&&(!i||r.value>i.value)&&(i=r);return i?i.unit:null}Object.defineProperty(e,"__esModule",{value:!0});var y=n(11);y.newMomentProto.format=function(){return this._fullCalendar&&arguments[0]?i(this,arguments[0]):this._ambigTime?y.oldMomentFormat(r(this),"YYYY-MM-DD"):this._ambigZone?y.oldMomentFormat(r(this),"YYYY-MM-DD[T]HH:mm:ss"):this._fullCalendar?y.oldMomentFormat(r(this)):y.oldMomentProto.format.apply(this,arguments)},y.newMomentProto.toISOString=function(){return this._ambigTime?y.oldMomentFormat(r(this),"YYYY-MM-DD"):this._ambigZone?y.oldMomentFormat(r(this),"YYYY-MM-DD[T]HH:mm:ss"):this._fullCalendar?y.oldMomentProto.toISOString.apply(r(this),arguments):y.oldMomentProto.toISOString.apply(this,arguments)};var m="\v",b="",w="",D=new RegExp(w+"([^"+w+"]*)"+w,"g"),E={t:function(t){return y.oldMomentFormat(t,"a").charAt(0)},T:function(t){return y.oldMomentFormat(t,"A").charAt(0)}},S={Y:{value:1,unit:"year"},M:{value:2,unit:"month"},W:{value:3,unit:"week"},w:{value:3,unit:"week"},D:{value:4,unit:"day"},d:{value:4,unit:"day"}};e.formatDate=i,e.formatRange=o;var C={};e.queryMostGranularFormatUnit=v},function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e,n){this.unzonedRange=t,this.eventDef=e,n&&(this.eventInstance=n)}return t}();e.default=n},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(35),o=n(13),s=n(7),a=function(t){function e(){var e=t.call(this)||this;return e._watchers={},e._props={},e.applyGlobalWatchers(),e.constructed(),e}return r.__extends(e,t),e.watch=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];this.prototype.hasOwnProperty("_globalWatchArgs")||(this.prototype._globalWatchArgs=Object.create(this.prototype._globalWatchArgs)),this.prototype._globalWatchArgs[t]=e},e.prototype.constructed=function(){},e.prototype.applyGlobalWatchers=function(){var t,e=this._globalWatchArgs;for(t in e)this.watch.apply(this,[t].concat(e[t]))},e.prototype.has=function(t){return t in this._props},e.prototype.get=function(t){return void 0===t?this._props:this._props[t]},e.prototype.set=function(t,e){var n;"string"==typeof t?(n={},n[t]=void 0===e?null:e):n=t,this.setProps(n)},e.prototype.reset=function(t){var e,n=this._props,r={};for(e in n)r[e]=void 0;for(e in t)r[e]=t[e];this.setProps(r)},e.prototype.unset=function(t){var e,n,r={};for(e="string"==typeof t?[t]:t,n=0;n<e.length;n++)r[e[n]]=void 0;this.setProps(r)},e.prototype.setProps=function(t){var e,n,r={},i=0;for(e in t)"object"!=typeof(n=t[e])&&n===this._props[e]||(r[e]=n,i++);if(i){this.trigger("before:batchChange",r);for(e in r)n=r[e],this.trigger("before:change",e,n),this.trigger("before:change:"+e,n);for(e in r)n=r[e],void 0===n?delete this._props[e]:this._props[e]=n,this.trigger("change:"+e,n),this.trigger("change",e,n);this.trigger("batchChange",r)}},e.prototype.watch=function(t,e,n,r){var i=this;this.unwatch(t),this._watchers[t]=this._watchDeps(e,function(e){var r=n.call(i,e);r&&r.then?(i.unset(t),r.then(function(e){i.set(t,e)})):i.set(t,r)},function(e){i.unset(t),r&&r.call(i,e)})},e.prototype.unwatch=function(t){var e=this._watchers[t];e&&(delete this._watchers[t],e.teardown())},e.prototype._watchDeps=function(t,e,n){var r=this,i=0,o=t.length,s=0,a={},l=[],u=!1,d=function(t,e,r){1===++i&&s===o&&(u=!0,n(a),u=!1)},c=function(t,n,r){void 0===n?(r||void 0===a[t]||s--,delete a[t]):(r||void 0!==a[t]||s++,a[t]=n),--i||s===o&&(u||e(a))},p=function(t,e){r.on(t,e),l.push([t,e])};return t.forEach(function(t){var e=!1;"?"===t.charAt(0)&&(t=t.substring(1),e=!0),p("before:change:"+t,function(t){d()}),p("change:"+t,function(n){c(t,n,e)})}),t.forEach(function(t){var e=!1;"?"===t.charAt(0)&&(t=t.substring(1),e=!0),r.has(t)?(a[t]=r.get(t),s++):e&&s++}),s===o&&e(a),{teardown:function(){for(var t=0;t<l.length;t++)r.off(l[t][0],l[t][1]);l=null,s===o&&n()},flash:function(){s===o&&(n(),e(a))}}},e.prototype.flash=function(t){var e=this._watchers[t];e&&e.flash()},e}(i.default);e.default=a,a.prototype._globalWatchArgs={},o.default.mixInto(a),s.default.mixInto(a)},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(4),o=n(15),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e.defineStandardProps=function(t){var e=this.prototype;e.hasOwnProperty("standardPropMap")||(e.standardPropMap=Object.create(e.standardPropMap)),i.copyOwnProps(t,e.standardPropMap)},e.copyVerbatimStandardProps=function(t,e){var n,r=this.prototype.standardPropMap;for(n in r)null!=t[n]&&!0===r[n]&&(e[n]=t[n])},e.prototype.applyProps=function(t){var e,n=this.standardPropMap,r={},i={};for(e in t)!0===n[e]?this[e]=t[e]:!1===n[e]?r[e]=t[e]:i[e]=t[e];return this.applyMiscProps(i),this.applyManualStandardProps(r)},e.prototype.applyManualStandardProps=function(t){return!0},e.prototype.applyMiscProps=function(t){},e.prototype.isStandardProp=function(t){return t in this.standardPropMap},e}(o.default);e.default=s,s.prototype.standardPropMap={}},function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){this.def=t,this.dateProfile=e}return t.prototype.toLegacy=function(){var t=this.dateProfile,e=this.def.toLegacy();return e.start=t.start.clone(),e.end=t.end?t.end.clone():null,e},t}();e.default=n},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(3),o=n(0),s=n(37),a=n(53),l=n(16),u=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e.prototype.isAllDay=function(){return!this.startTime&&!this.endTime},e.prototype.buildInstances=function(t){for(var e,n,r,i=this.source.calendar,o=t.getStart(),s=t.getEnd(),u=[];o.isBefore(s);)this.dowHash&&!this.dowHash[o.day()]||(e=i.applyTimezone(o),n=e.clone(),r=null,this.startTime?n.time(this.startTime):n.stripTime(),this.endTime&&(r=e.clone().time(this.endTime)),u.push(new a.default(this,new l.default(n,r,i)))),o.add(1,"days");return u},e.prototype.setDow=function(t){this.dowHash||(this.dowHash={});for(var e=0;e<t.length;e++)this.dowHash[t[e]]=!0},e.prototype.clone=function(){var e=t.prototype.clone.call(this);return e.startTime&&(e.startTime=o.duration(this.startTime)),e.endTime&&(e.endTime=o.duration(this.endTime)),this.dowHash&&(e.dowHash=i.extend({},this.dowHash)),e},e}(s.default);e.default=u,u.prototype.applyProps=function(t){var e=s.default.prototype.applyProps.call(this,t);return t.start&&(this.startTime=o.duration(t.start)),t.end&&(this.endTime=o.duration(t.end)),t.dow&&this.setDow(t.dow),e},u.defineStandardProps({start:!1,end:!1,dow:!1})},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),i=n(4),o=n(5),s=function(){function t(t){this._view=t}return t.prototype.opt=function(t){return this._view.opt(t)},t.prototype.trimHiddenDays=function(t){return this._view.trimHiddenDays(t)},t.prototype.msToUtcMoment=function(t,e){return this._view.calendar.msToUtcMoment(t,e)},t.prototype.buildPrev=function(t){var e=t.date.clone().startOf(t.currentRangeUnit).subtract(t.dateIncrement);return this.build(e,-1)},t.prototype.buildNext=function(t){var e=t.date.clone().startOf(t.currentRangeUnit).add(t.dateIncrement);return this.build(e,1)},t.prototype.build=function(t,e,n){void 0===n&&(n=!1);var i,o,s,a,l,u,d=!t.hasTime(),c=null,p=null;return i=this.buildValidRange(),i=this.trimHiddenDays(i),n&&(t=this.msToUtcMoment(i.constrainDate(t),d)),o=this.buildCurrentRangeInfo(t,e),s=/^(year|month|week|day)$/.test(o.unit),a=this.buildRenderRange(this.trimHiddenDays(o.unzonedRange),o.unit,s),a=this.trimHiddenDays(a),l=a.clone(),this.opt("showNonCurrentDates")||(l=l.intersect(o.unzonedRange)),c=r.duration(this.opt("minTime")),p=r.duration(this.opt("maxTime")),l=this.adjustActiveRange(l,c,p),l=l.intersect(i),l&&(t=this.msToUtcMoment(l.constrainDate(t),d)),u=o.unzonedRange.intersectsWith(i),{validUnzonedRange:i,currentUnzonedRange:o.unzonedRange,currentRangeUnit:o.unit,isRangeAllDay:s,activeUnzonedRange:l,renderUnzonedRange:a,minTime:c,maxTime:p,isValid:u,date:t,dateIncrement:this.buildDateIncrement(o.duration)}},t.prototype.buildValidRange=function(){return this._view.getUnzonedRangeOption("validRange",this._view.calendar.getNow())||new o.default},t.prototype.buildCurrentRangeInfo=function(t,e){var n,r=this._view.viewSpec,o=null,s=null,a=null;return r.duration?(o=r.duration,s=r.durationUnit,a=this.buildRangeFromDuration(t,e,o,s)):(n=this.opt("dayCount"))?(s="day",a=this.buildRangeFromDayCount(t,e,n)):(a=this.buildCustomVisibleRange(t))?s=i.computeGreatestUnit(a.getStart(),a.getEnd()):(o=this.getFallbackDuration(),s=i.computeGreatestUnit(o),a=this.buildRangeFromDuration(t,e,o,s)),{duration:o,unit:s,unzonedRange:a}},t.prototype.getFallbackDuration=function(){return r.duration({days:1})},t.prototype.adjustActiveRange=function(t,e,n){var r=t.getStart(),i=t.getEnd();return this._view.usesMinMaxTime&&(e<0&&r.time(0).add(e),n>864e5&&i.time(n-864e5)),new o.default(r,i)},t.prototype.buildRangeFromDuration=function(t,e,n,s){function a(){d=t.clone().startOf(h),c=d.clone().add(n),p=new o.default(d,c)}var l,u,d,c,p,h=this.opt("dateAlignment");return h||(l=this.opt("dateIncrement"),l?(u=r.duration(l),h=u<n?i.computeDurationGreatestUnit(u,l):s):h=s),n.as("days")<=1&&this._view.isHiddenDay(d)&&(d=this._view.skipHiddenDays(d,e),d.startOf("day")),a(),this.trimHiddenDays(p)||(t=this._view.skipHiddenDays(t,e),a()),p},t.prototype.buildRangeFromDayCount=function(t,e,n){var r,i,s=this.opt("dateAlignment"),a=0;if(s||-1!==e){r=t.clone(),s&&r.startOf(s),r.startOf("day"),r=this._view.skipHiddenDays(r),i=r.clone();do{i.add(1,"day"),this._view.isHiddenDay(i)||a++}while(a<n)}else{i=t.clone().startOf("day").add(1,"day"),i=this._view.skipHiddenDays(i,-1,!0),r=i.clone();do{r.add(-1,"day"),this._view.isHiddenDay(r)||a++}while(a<n)}return new o.default(r,i)},t.prototype.buildCustomVisibleRange=function(t){var e=this._view.getUnzonedRangeOption("visibleRange",this._view.calendar.applyTimezone(t));return!e||null!=e.startMs&&null!=e.endMs?e:null},t.prototype.buildRenderRange=function(t,e,n){return t.clone()},t.prototype.buildDateIncrement=function(t){var e,n=this.opt("dateIncrement");return n?r.duration(n):(e=this.opt("dateAlignment"))?r.duration(1,e):t||r.duration({days:1})},t}();e.default=s},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(3),o=n(4),s=n(21),a=n(6),l=n(9),u=function(t){function e(e){var n=t.call(this,e)||this;return n.eventDefs=[],n}return r.__extends(e,t),e.parse=function(t,e){var n;return i.isArray(t.events)?n=t:i.isArray(t)&&(n={events:t}),!!n&&a.default.parse.call(this,n,e)},e.prototype.setRawEventDefs=function(t){this.rawEventDefs=t,this.eventDefs=this.parseEventDefs(t)},e.prototype.fetch=function(t,e,n){var r,i=this.eventDefs;if(null!=this.currentTimezone&&this.currentTimezone!==n)for(r=0;r<i.length;r++)i[r]instanceof l.default&&i[r].rezone();return this.currentTimezone=n,s.default.resolve(i)},e.prototype.addEventDef=function(t){this.eventDefs.push(t)},e.prototype.removeEventDefsById=function(t){return o.removeMatching(this.eventDefs,function(e){return e.id===t})},e.prototype.removeAllEventDefs=function(){this.eventDefs=[]},e.prototype.getPrimitive=function(){return this.rawEventDefs},e.prototype.applyManualStandardProps=function(e){var n=t.prototype.applyManualStandardProps.call(this,e);return this.setRawEventDefs(e.events),n},e}(a.default);e.default=u,u.defineStandardProps({events:!1})},function(t,e,n){function r(t,e){a[t]=e}function i(t){return t?!0===t?s.default:a[t]:o.default}Object.defineProperty(e,"__esModule",{value:!0});var o=n(221),s=n(222),a={};e.defineThemeSystem=r,e.getThemeSystemClass=i},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(3),i=n(4),o=function(){function t(t){this.isHorizontal=!1,this.isVertical=!1,this.els=r(t.els),this.isHorizontal=t.isHorizontal,this.isVertical=t.isVertical,this.forcedOffsetParentEl=t.offsetParent?r(t.offsetParent):null}return t.prototype.build=function(){var t=this.forcedOffsetParentEl;!t&&this.els.length>0&&(t=this.els.eq(0).offsetParent()),this.origin=t?t.offset():null,this.boundingRect=this.queryBoundingRect(),this.isHorizontal&&this.buildElHorizontals(),this.isVertical&&this.buildElVerticals()},t.prototype.clear=function(){this.origin=null,this.boundingRect=null,this.lefts=null,this.rights=null,this.tops=null,this.bottoms=null},t.prototype.ensureBuilt=function(){this.origin||this.build()},t.prototype.buildElHorizontals=function(){var t=[],e=[];this.els.each(function(n,i){var o=r(i),s=o.offset().left,a=o.outerWidth();t.push(s),e.push(s+a)}),this.lefts=t,this.rights=e},t.prototype.buildElVerticals=function(){var t=[],e=[];this.els.each(function(n,i){var o=r(i),s=o.offset().top,a=o.outerHeight();t.push(s),e.push(s+a)}),this.tops=t,this.bottoms=e},t.prototype.getHorizontalIndex=function(t){this.ensureBuilt();var e,n=this.lefts,r=this.rights,i=n.length;for(e=0;e<i;e++)if(t>=n[e]&&t<r[e])return e},t.prototype.getVerticalIndex=function(t){this.ensureBuilt();var e,n=this.tops,r=this.bottoms,i=n.length;for(e=0;e<i;e++)if(t>=n[e]&&t<r[e])return e},t.prototype.getLeftOffset=function(t){return this.ensureBuilt(),this.lefts[t]},t.prototype.getLeftPosition=function(t){return this.ensureBuilt(),this.lefts[t]-this.origin.left},t.prototype.getRightOffset=function(t){return this.ensureBuilt(),this.rights[t]},t.prototype.getRightPosition=function(t){return this.ensureBuilt(),this.rights[t]-this.origin.left},t.prototype.getWidth=function(t){return this.ensureBuilt(),this.rights[t]-this.lefts[t]},t.prototype.getTopOffset=function(t){return this.ensureBuilt(),this.tops[t]},t.prototype.getTopPosition=function(t){return this.ensureBuilt(),this.tops[t]-this.origin.top},t.prototype.getBottomOffset=function(t){return this.ensureBuilt(),this.bottoms[t]},t.prototype.getBottomPosition=function(t){return this.ensureBuilt(),this.bottoms[t]-this.origin.top},t.prototype.getHeight=function(t){return this.ensureBuilt(),this.bottoms[t]-this.tops[t]},t.prototype.queryBoundingRect=function(){var t;return this.els.length>0&&(t=i.getScrollParent(this.els.eq(0)),!t.is(document)&&!t.is("html,body"))?i.getClientRect(t):null},t.prototype.isPointInBounds=function(t,e){return this.isLeftInBounds(t)&&this.isTopInBounds(e)},t.prototype.isLeftInBounds=function(t){return!this.boundingRect||t>=this.boundingRect.left&&t<this.boundingRect.right},t.prototype.isTopInBounds=function(t){return!this.boundingRect||t>=this.boundingRect.top&&t<this.boundingRect.bottom},t}();e.default=o},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(3),i=n(4),o=n(7),s=n(23),a=function(){function t(t){this.isInteracting=!1,this.isDistanceSurpassed=!1,this.isDelayEnded=!1,this.isDragging=!1,this.isTouch=!1,this.isGeneric=!1,this.shouldCancelTouchScroll=!0,this.scrollAlwaysKills=!1,this.isAutoScroll=!1,this.scrollSensitivity=30,this.scrollSpeed=200,this.scrollIntervalMs=50,this.options=t||{}}return t.prototype.startInteraction=function(t,e){if(void 0===e&&(e={}),"mousedown"===t.type){if(s.default.get().shouldIgnoreMouse())return;if(!i.isPrimaryMouseButton(t))return;t.preventDefault()}this.isInteracting||(this.delay=i.firstDefined(e.delay,this.options.delay,0),this.minDistance=i.firstDefined(e.distance,this.options.distance,0),this.subjectEl=this.options.subjectEl,i.preventSelection(r("body")),this.isInteracting=!0,this.isTouch=i.getEvIsTouch(t),this.isGeneric="dragstart"===t.type,this.isDelayEnded=!1,this.isDistanceSurpassed=!1,this.originX=i.getEvX(t),this.originY=i.getEvY(t),this.scrollEl=i.getScrollParent(r(t.target)),this.bindHandlers(),this.initAutoScroll(),this.handleInteractionStart(t),this.startDelay(t),this.minDistance||this.handleDistanceSurpassed(t))},t.prototype.handleInteractionStart=function(t){this.trigger("interactionStart",t)},t.prototype.endInteraction=function(t,e){this.isInteracting&&(this.endDrag(t),this.delayTimeoutId&&(clearTimeout(this.delayTimeoutId),this.delayTimeoutId=null),this.destroyAutoScroll(),this.unbindHandlers(),this.isInteracting=!1,this.handleInteractionEnd(t,e),i.allowSelection(r("body")))},t.prototype.handleInteractionEnd=function(t,e){this.trigger("interactionEnd",t,e||!1)},t.prototype.bindHandlers=function(){var t=s.default.get();this.isGeneric?this.listenTo(r(document),{drag:this.handleMove,dragstop:this.endInteraction}):this.isTouch?this.listenTo(t,{touchmove:this.handleTouchMove,touchend:this.endInteraction,scroll:this.handleTouchScroll}):this.listenTo(t,{mousemove:this.handleMouseMove,mouseup:this.endInteraction}),this.listenTo(t,{selectstart:i.preventDefault,contextmenu:i.preventDefault})},t.prototype.unbindHandlers=function(){this.stopListeningTo(s.default.get()),this.stopListeningTo(r(document))},t.prototype.startDrag=function(t,e){this.startInteraction(t,e),this.isDragging||(this.isDragging=!0,this.handleDragStart(t))},t.prototype.handleDragStart=function(t){this.trigger("dragStart",t)},t.prototype.handleMove=function(t){var e=i.getEvX(t)-this.originX,n=i.getEvY(t)-this.originY,r=this.minDistance;this.isDistanceSurpassed||e*e+n*n>=r*r&&this.handleDistanceSurpassed(t),this.isDragging&&this.handleDrag(e,n,t)},t.prototype.handleDrag=function(t,e,n){this.trigger("drag",t,e,n),this.updateAutoScroll(n)},t.prototype.endDrag=function(t){this.isDragging&&(this.isDragging=!1,this.handleDragEnd(t))},t.prototype.handleDragEnd=function(t){this.trigger("dragEnd",t)},t.prototype.startDelay=function(t){var e=this;this.delay?this.delayTimeoutId=setTimeout(function(){e.handleDelayEnd(t)},this.delay):this.handleDelayEnd(t)},t.prototype.handleDelayEnd=function(t){this.isDelayEnded=!0,this.isDistanceSurpassed&&this.startDrag(t)},t.prototype.handleDistanceSurpassed=function(t){this.isDistanceSurpassed=!0,this.isDelayEnded&&this.startDrag(t)},t.prototype.handleTouchMove=function(t){this.isDragging&&this.shouldCancelTouchScroll&&t.preventDefault(),this.handleMove(t)},t.prototype.handleMouseMove=function(t){this.handleMove(t)},t.prototype.handleTouchScroll=function(t){this.isDragging&&!this.scrollAlwaysKills||this.endInteraction(t,!0)},t.prototype.trigger=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];this.options[t]&&this.options[t].apply(this,e),this["_"+t]&&this["_"+t].apply(this,e)},t.prototype.initAutoScroll=function(){var t=this.scrollEl;this.isAutoScroll=this.options.scroll&&t&&!t.is(window)&&!t.is(document),this.isAutoScroll&&this.listenTo(t,"scroll",i.debounce(this.handleDebouncedScroll,100))},t.prototype.destroyAutoScroll=function(){this.endAutoScroll(),this.isAutoScroll&&this.stopListeningTo(this.scrollEl,"scroll")},t.prototype.computeScrollBounds=function(){this.isAutoScroll&&(this.scrollBounds=i.getOuterRect(this.scrollEl))},t.prototype.updateAutoScroll=function(t){var e,n,r,o,s=this.scrollSensitivity,a=this.scrollBounds,l=0,u=0;a&&(e=(s-(i.getEvY(t)-a.top))/s,n=(s-(a.bottom-i.getEvY(t)))/s,r=(s-(i.getEvX(t)-a.left))/s,o=(s-(a.right-i.getEvX(t)))/s,e>=0&&e<=1?l=e*this.scrollSpeed*-1:n>=0&&n<=1&&(l=n*this.scrollSpeed),r>=0&&r<=1?u=r*this.scrollSpeed*-1:o>=0&&o<=1&&(u=o*this.scrollSpeed)),this.setScrollVel(l,u)},t.prototype.setScrollVel=function(t,e){this.scrollTopVel=t,this.scrollLeftVel=e,this.constrainScrollVel(),!this.scrollTopVel&&!this.scrollLeftVel||this.scrollIntervalId||(this.scrollIntervalId=setInterval(i.proxy(this,"scrollIntervalFunc"),this.scrollIntervalMs))},t.prototype.constrainScrollVel=function(){var t=this.scrollEl;this.scrollTopVel<0?t.scrollTop()<=0&&(this.scrollTopVel=0):this.scrollTopVel>0&&t.scrollTop()+t[0].clientHeight>=t[0].scrollHeight&&(this.scrollTopVel=0),this.scrollLeftVel<0?t.scrollLeft()<=0&&(this.scrollLeftVel=0):this.scrollLeftVel>0&&t.scrollLeft()+t[0].clientWidth>=t[0].scrollWidth&&(this.scrollLeftVel=0)},t.prototype.scrollIntervalFunc=function(){var t=this.scrollEl,e=this.scrollIntervalMs/1e3;this.scrollTopVel&&t.scrollTop(t.scrollTop()+this.scrollTopVel*e),this.scrollLeftVel&&t.scrollLeft(t.scrollLeft()+this.scrollLeftVel*e),this.constrainScrollVel(),this.scrollTopVel||this.scrollLeftVel||this.endAutoScroll()},t.prototype.endAutoScroll=function(){this.scrollIntervalId&&(clearInterval(this.scrollIntervalId),this.scrollIntervalId=null,this.handleScrollEnd())},t.prototype.handleDebouncedScroll=function(){this.scrollIntervalId||this.handleScrollEnd()},t.prototype.handleScrollEnd=function(){},t}();e.default=a,o.default.mixInto(a)},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(4),o=n(15),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e.prototype.updateDayTable=function(){for(var t,e,n,r=this,i=r.view,o=i.calendar,s=o.msToUtcMoment(r.dateProfile.renderUnzonedRange.startMs,!0),a=o.msToUtcMoment(r.dateProfile.renderUnzonedRange.endMs,!0),l=-1,u=[],d=[];s.isBefore(a);)i.isHiddenDay(s)?u.push(l+.5):(l++,u.push(l),d.push(s.clone())),s.add(1,"days");if(this.breakOnWeeks){for(e=d[0].day(),t=1;t<d.length&&d[t].day()!==e;t++);n=Math.ceil(d.length/t)}else n=1,t=d.length;this.dayDates=d,this.dayIndices=u,this.daysPerRow=t,this.rowCnt=n,this.updateDayTableCols()},e.prototype.updateDayTableCols=function(){this.colCnt=this.computeColCnt(),this.colHeadFormat=this.opt("columnHeaderFormat")||this.opt("columnFormat")||this.computeColHeadFormat()},e.prototype.computeColCnt=function(){return this.daysPerRow},e.prototype.getCellDate=function(t,e){return this.dayDates[this.getCellDayIndex(t,e)].clone()},e.prototype.getCellRange=function(t,e){var n=this.getCellDate(t,e);return{start:n,end:n.clone().add(1,"days")}},e.prototype.getCellDayIndex=function(t,e){return t*this.daysPerRow+this.getColDayIndex(e)},e.prototype.getColDayIndex=function(t){return this.isRTL?this.colCnt-1-t:t},e.prototype.getDateDayIndex=function(t){var e=this.dayIndices,n=t.diff(this.dayDates[0],"days");return n<0?e[0]-1:n>=e.length?e[e.length-1]+1:e[n]},e.prototype.computeColHeadFormat=function(){return this.rowCnt>1||this.colCnt>10?"ddd":this.colCnt>1?this.opt("dayOfMonthFormat"):"dddd"},e.prototype.sliceRangeByRow=function(t){var e,n,r,i,o,s=this.daysPerRow,a=this.view.computeDayRange(t),l=this.getDateDayIndex(a.start),u=this.getDateDayIndex(a.end.clone().subtract(1,"days")),d=[];for(e=0;e<this.rowCnt;e++)n=e*s,r=n+s-1,i=Math.max(l,n),o=Math.min(u,r),i=Math.ceil(i),o=Math.floor(o),i<=o&&d.push({row:e,firstRowDayIndex:i-n,lastRowDayIndex:o-n,isStart:i===l,isEnd:o===u});return d},e.prototype.sliceRangeByDay=function(t){var e,n,r,i,o,s,a=this.daysPerRow,l=this.view.computeDayRange(t),u=this.getDateDayIndex(l.start),d=this.getDateDayIndex(l.end.clone().subtract(1,"days")),c=[];for(e=0;e<this.rowCnt;e++)for(n=e*a,r=n+a-1,i=n;i<=r;i++)o=Math.max(u,i),s=Math.min(d,i),o=Math.ceil(o),s=Math.floor(s),o<=s&&c.push({row:e,firstRowDayIndex:o-n,lastRowDayIndex:s-n,isStart:o===u,isEnd:s===d});return c},e.prototype.renderHeadHtml=function(){var t=this.view.calendar.theme;return'<div class="fc-row '+t.getClass("headerRow")+'"><table class="'+t.getClass("tableGrid")+'"><thead>'+this.renderHeadTrHtml()+"</thead></table></div>"},e.prototype.renderHeadIntroHtml=function(){return this.renderIntroHtml()},e.prototype.renderHeadTrHtml=function(){return"<tr>"+(this.isRTL?"":this.renderHeadIntroHtml())+this.renderHeadDateCellsHtml()+(this.isRTL?this.renderHeadIntroHtml():"")+"</tr>"},e.prototype.renderHeadDateCellsHtml=function(){var t,e,n=[];for(t=0;t<this.colCnt;t++)e=this.getCellDate(0,t),n.push(this.renderHeadDateCellHtml(e));return n.join("")},e.prototype.renderHeadDateCellHtml=function(t,e,n){var r,o=this,s=o.view,a=o.dateProfile.activeUnzonedRange.containsDate(t),l=["fc-day-header",s.calendar.theme.getClass("widgetHeader")];return r="function"==typeof o.opt("columnHeaderHtml")?o.opt("columnHeaderHtml")(t):"function"==typeof o.opt("columnHeaderText")?i.htmlEscape(o.opt("columnHeaderText")(t)):i.htmlEscape(t.format(o.colHeadFormat)),1===o.rowCnt?l=l.concat(o.getDayClasses(t,!0)):l.push("fc-"+i.dayIDs[t.day()]),'<th class="'+l.join(" ")+'"'+(1===(a&&o.rowCnt)?' data-date="'+t.format("YYYY-MM-DD")+'"':"")+(e>1?' colspan="'+e+'"':"")+(n?" "+n:"")+">"+(a?s.buildGotoAnchorHtml({date:t,forceOff:o.rowCnt>1||1===o.colCnt},r):r)+"</th>"},e.prototype.renderBgTrHtml=function(t){return"<tr>"+(this.isRTL?"":this.renderBgIntroHtml(t))+this.renderBgCellsHtml(t)+(this.isRTL?this.renderBgIntroHtml(t):"")+"</tr>"},e.prototype.renderBgIntroHtml=function(t){return this.renderIntroHtml()},e.prototype.renderBgCellsHtml=function(t){var e,n,r=[];for(e=0;e<this.colCnt;e++)n=this.getCellDate(t,e),r.push(this.renderBgCellHtml(n));return r.join("")},e.prototype.renderBgCellHtml=function(t,e){var n=this,r=n.view,i=n.dateProfile.activeUnzonedRange.containsDate(t),o=n.getDayClasses(t);return o.unshift("fc-day",r.calendar.theme.getClass("widgetContent")),'<td class="'+o.join(" ")+'"'+(i?' data-date="'+t.format("YYYY-MM-DD")+'"':"")+(e?" "+e:"")+"></td>"},e.prototype.renderIntroHtml=function(){},e.prototype.bookendCells=function(t){var e=this.renderIntroHtml();e&&(this.isRTL?t.append(e):t.prepend(e))},e}(o.default);e.default=s},function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){this.component=t,this.fillRenderer=e}
return t.prototype.render=function(t){var e=this.component,n=e._getDateProfile().activeUnzonedRange,r=t.buildEventInstanceGroup(e.hasAllDayBusinessHours,n),i=r?e.eventRangesToEventFootprints(r.sliceRenderRanges(n)):[];this.renderEventFootprints(i)},t.prototype.renderEventFootprints=function(t){var e=this.component.eventFootprintsToSegs(t);this.renderSegs(e),this.segs=e},t.prototype.renderSegs=function(t){this.fillRenderer&&this.fillRenderer.renderSegs("businessHours",t,{getClasses:function(t){return["fc-nonbusiness","fc-bgevent"]}})},t.prototype.unrender=function(){this.fillRenderer&&this.fillRenderer.unrender("businessHours"),this.segs=null},t.prototype.getSegs=function(){return this.segs||[]},t}();e.default=n},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(3),i=n(4),o=function(){function t(t){this.fillSegTag="div",this.component=t,this.elsByFill={}}return t.prototype.renderFootprint=function(t,e,n){this.renderSegs(t,this.component.componentFootprintToSegs(e),n)},t.prototype.renderSegs=function(t,e,n){var r;return e=this.buildSegEls(t,e,n),r=this.attachSegEls(t,e),r&&this.reportEls(t,r),e},t.prototype.unrender=function(t){var e=this.elsByFill[t];e&&(e.remove(),delete this.elsByFill[t])},t.prototype.buildSegEls=function(t,e,n){var i,o=this,s="",a=[];if(e.length){for(i=0;i<e.length;i++)s+=this.buildSegHtml(t,e[i],n);r(s).each(function(t,i){var s=e[t],l=r(i);n.filterEl&&(l=n.filterEl(s,l)),l&&(l=r(l),l.is(o.fillSegTag)&&(s.el=l,a.push(s)))})}return a},t.prototype.buildSegHtml=function(t,e,n){var r=n.getClasses?n.getClasses(e):[],o=i.cssToStr(n.getCss?n.getCss(e):{});return"<"+this.fillSegTag+(r.length?' class="'+r.join(" ")+'"':"")+(o?' style="'+o+'"':"")+"></"+this.fillSegTag+">"},t.prototype.attachSegEls=function(t,e){},t.prototype.reportEls=function(t,e){this.elsByFill[t]?this.elsByFill[t]=this.elsByFill[t].add(e):this.elsByFill[t]=r(e)},t}();e.default=o},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(9),i=n(34),o=n(6),s=function(){function t(t,e){this.view=t._getView(),this.component=t,this.eventRenderer=e}return t.prototype.renderComponentFootprint=function(t){this.renderEventFootprints([this.fabricateEventFootprint(t)])},t.prototype.renderEventDraggingFootprints=function(t,e,n){this.renderEventFootprints(t,e,"fc-dragging",n?null:this.view.opt("dragOpacity"))},t.prototype.renderEventResizingFootprints=function(t,e,n){this.renderEventFootprints(t,e,"fc-resizing")},t.prototype.renderEventFootprints=function(t,e,n,r){var i,o=this.component.eventFootprintsToSegs(t),s="fc-helper "+(n||"");for(o=this.eventRenderer.renderFgSegEls(o),i=0;i<o.length;i++)o[i].el.addClass(s);if(null!=r)for(i=0;i<o.length;i++)o[i].el.css("opacity",r);this.helperEls=this.renderSegs(o,e)},t.prototype.renderSegs=function(t,e){},t.prototype.unrender=function(){this.helperEls&&(this.helperEls.remove(),this.helperEls=null)},t.prototype.fabricateEventFootprint=function(t){var e,n=this.view.calendar,s=n.footprintToDateProfile(t),a=new r.default(new o.default(n));return a.dateProfile=s,e=a.buildInstance(),new i.default(t,a,e)},t}();e.default=s},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(23),o=n(14),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e.prototype.bindToEl=function(t){var e=this.component;e.bindSegHandlerToEl(t,"click",this.handleClick.bind(this)),e.bindSegHandlerToEl(t,"mouseenter",this.handleMouseover.bind(this)),e.bindSegHandlerToEl(t,"mouseleave",this.handleMouseout.bind(this))},e.prototype.handleClick=function(t,e){!1===this.component.publiclyTrigger("eventClick",{context:t.el[0],args:[t.footprint.getEventLegacy(),e,this.view]})&&e.preventDefault()},e.prototype.handleMouseover=function(t,e){i.default.get().shouldIgnoreMouse()||this.mousedOverSeg||(this.mousedOverSeg=t,this.view.isEventDefResizable(t.footprint.eventDef)&&t.el.addClass("fc-allow-mouse-resize"),this.component.publiclyTrigger("eventMouseover",{context:t.el[0],args:[t.footprint.getEventLegacy(),e,this.view]}))},e.prototype.handleMouseout=function(t,e){this.mousedOverSeg&&(this.mousedOverSeg=null,this.view.isEventDefResizable(t.footprint.eventDef)&&t.el.removeClass("fc-allow-mouse-resize"),this.component.publiclyTrigger("eventMouseout",{context:t.el[0],args:[t.footprint.getEventLegacy(),e||{},this.view]}))},e.prototype.end=function(){this.mousedOverSeg&&this.handleMouseout(this.mousedOverSeg)},e}(o.default);e.default=s},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(15),o=n(237),s=n(236),a=n(64),l=n(235),u=n(234),d=n(233),c=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e}(i.default);e.default=c,c.prototype.dateClickingClass=o.default,c.prototype.dateSelectingClass=s.default,c.prototype.eventPointingClass=a.default,c.prototype.eventDraggingClass=l.default,c.prototype.eventResizingClass=u.default,c.prototype.externalDroppingClass=d.default},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(3),o=n(4),s=n(58),a=n(227),l=n(5),u=n(12),d=n(34),c=n(61),p=n(65),h=n(42),f=n(60),g=n(243),v=n(244),y=n(245),m=function(t){function e(e){var n=t.call(this,e)||this;return n.cellWeekNumbersVisible=!1,n.bottomCoordPadding=0,n.isRigid=!1,n.hasAllDayBusinessHours=!0,n}return r.__extends(e,t),e.prototype.componentFootprintToSegs=function(t){var e,n,r=this.sliceRangeByRow(t.unzonedRange);for(e=0;e<r.length;e++)n=r[e],this.isRTL?(n.leftCol=this.daysPerRow-1-n.lastRowDayIndex,n.rightCol=this.daysPerRow-1-n.firstRowDayIndex):(n.leftCol=n.firstRowDayIndex,n.rightCol=n.lastRowDayIndex);return r},e.prototype.renderDates=function(t){this.dateProfile=t,this.updateDayTable(),this.renderGrid()},e.prototype.unrenderDates=function(){this.removeSegPopover()},e.prototype.renderGrid=function(){var t,e,n=this.view,r=this.rowCnt,i=this.colCnt,o="";for(this.headContainerEl&&this.headContainerEl.html(this.renderHeadHtml()),t=0;t<r;t++)o+=this.renderDayRowHtml(t,this.isRigid);for(this.el.html(o),this.rowEls=this.el.find(".fc-row"),this.cellEls=this.el.find(".fc-day, .fc-disabled-day"),this.rowCoordCache=new s.default({els:this.rowEls,isVertical:!0}),this.colCoordCache=new s.default({els:this.cellEls.slice(0,this.colCnt),isHorizontal:!0}),t=0;t<r;t++)for(e=0;e<i;e++)this.publiclyTrigger("dayRender",{context:n,args:[this.getCellDate(t,e),this.getCellEl(t,e),n]})},e.prototype.renderDayRowHtml=function(t,e){var n=this.view.calendar.theme,r=["fc-row","fc-week",n.getClass("dayRow")];return e&&r.push("fc-rigid"),'<div class="'+r.join(" ")+'"><div class="fc-bg"><table class="'+n.getClass("tableGrid")+'">'+this.renderBgTrHtml(t)+'</table></div><div class="fc-content-skeleton"><table>'+(this.getIsNumbersVisible()?"<thead>"+this.renderNumberTrHtml(t)+"</thead>":"")+"</table></div></div>"},e.prototype.getIsNumbersVisible=function(){return this.getIsDayNumbersVisible()||this.cellWeekNumbersVisible},e.prototype.getIsDayNumbersVisible=function(){return this.rowCnt>1},e.prototype.renderNumberTrHtml=function(t){return"<tr>"+(this.isRTL?"":this.renderNumberIntroHtml(t))+this.renderNumberCellsHtml(t)+(this.isRTL?this.renderNumberIntroHtml(t):"")+"</tr>"},e.prototype.renderNumberIntroHtml=function(t){return this.renderIntroHtml()},e.prototype.renderNumberCellsHtml=function(t){var e,n,r=[];for(e=0;e<this.colCnt;e++)n=this.getCellDate(t,e),r.push(this.renderNumberCellHtml(n));return r.join("")},e.prototype.renderNumberCellHtml=function(t){var e,n,r=this.view,i="",o=this.dateProfile.activeUnzonedRange.containsDate(t),s=this.getIsDayNumbersVisible()&&o;return s||this.cellWeekNumbersVisible?(e=this.getDayClasses(t),e.unshift("fc-day-top"),this.cellWeekNumbersVisible&&(n="ISO"===t._locale._fullCalendar_weekCalc?1:t._locale.firstDayOfWeek()),i+='<td class="'+e.join(" ")+'"'+(o?' data-date="'+t.format()+'"':"")+">",this.cellWeekNumbersVisible&&t.day()===n&&(i+=r.buildGotoAnchorHtml({date:t,type:"week"},{class:"fc-week-number"},t.format("w"))),s&&(i+=r.buildGotoAnchorHtml(t,{class:"fc-day-number"},t.format("D"))),i+="</td>"):"<td></td>"},e.prototype.prepareHits=function(){this.colCoordCache.build(),this.rowCoordCache.build(),this.rowCoordCache.bottoms[this.rowCnt-1]+=this.bottomCoordPadding},e.prototype.releaseHits=function(){this.colCoordCache.clear(),this.rowCoordCache.clear()},e.prototype.queryHit=function(t,e){if(this.colCoordCache.isLeftInBounds(t)&&this.rowCoordCache.isTopInBounds(e)){var n=this.colCoordCache.getHorizontalIndex(t),r=this.rowCoordCache.getVerticalIndex(e);if(null!=r&&null!=n)return this.getCellHit(r,n)}},e.prototype.getHitFootprint=function(t){var e=this.getCellRange(t.row,t.col);return new u.default(new l.default(e.start,e.end),!0)},e.prototype.getHitEl=function(t){return this.getCellEl(t.row,t.col)},e.prototype.getCellHit=function(t,e){return{row:t,col:e,component:this,left:this.colCoordCache.getLeftOffset(e),right:this.colCoordCache.getRightOffset(e),top:this.rowCoordCache.getTopOffset(t),bottom:this.rowCoordCache.getBottomOffset(t)}},e.prototype.getCellEl=function(t,e){return this.cellEls.eq(t*this.colCnt+e)},e.prototype.executeEventUnrender=function(){this.removeSegPopover(),t.prototype.executeEventUnrender.call(this)},e.prototype.getOwnEventSegs=function(){return t.prototype.getOwnEventSegs.call(this).concat(this.popoverSegs||[])},e.prototype.renderDrag=function(t,e,n){var r;for(r=0;r<t.length;r++)this.renderHighlight(t[r].componentFootprint);if(t.length&&e&&e.component!==this)return this.helperRenderer.renderEventDraggingFootprints(t,e,n),!0},e.prototype.unrenderDrag=function(){this.unrenderHighlight(),this.helperRenderer.unrender()},e.prototype.renderEventResize=function(t,e,n){var r;for(r=0;r<t.length;r++)this.renderHighlight(t[r].componentFootprint);this.helperRenderer.renderEventResizingFootprints(t,e,n)},e.prototype.unrenderEventResize=function(){this.unrenderHighlight(),this.helperRenderer.unrender()},e.prototype.removeSegPopover=function(){this.segPopover&&this.segPopover.hide()},e.prototype.limitRows=function(t){var e,n,r=this.eventRenderer.rowStructs||[];for(e=0;e<r.length;e++)this.unlimitRow(e),!1!==(n=!!t&&("number"==typeof t?t:this.computeRowLevelLimit(e)))&&this.limitRow(e,n)},e.prototype.computeRowLevelLimit=function(t){function e(t,e){o=Math.max(o,i(e).outerHeight())}var n,r,o,s=this.rowEls.eq(t),a=s.height(),l=this.eventRenderer.rowStructs[t].tbodyEl.children();for(n=0;n<l.length;n++)if(r=l.eq(n).removeClass("fc-limited"),o=0,r.find("> td > :first-child").each(e),r.position().top+o>a)return n;return!1},e.prototype.limitRow=function(t,e){var n,r,o,s,a,l,u,d,c,p,h,f,g,v,y,m=this,b=this.eventRenderer.rowStructs[t],w=[],D=0,E=function(n){for(;D<n;)l=m.getCellSegs(t,D,e),l.length&&(c=r[e-1][D],y=m.renderMoreLink(t,D,l),v=i("<div>").append(y),c.append(v),w.push(v[0])),D++};if(e&&e<b.segLevels.length){for(n=b.segLevels[e-1],r=b.cellMatrix,o=b.tbodyEl.children().slice(e).addClass("fc-limited").get(),s=0;s<n.length;s++){for(a=n[s],E(a.leftCol),d=[],u=0;D<=a.rightCol;)l=this.getCellSegs(t,D,e),d.push(l),u+=l.length,D++;if(u){for(c=r[e-1][a.leftCol],p=c.attr("rowspan")||1,h=[],f=0;f<d.length;f++)g=i('<td class="fc-more-cell">').attr("rowspan",p),l=d[f],y=this.renderMoreLink(t,a.leftCol+f,[a].concat(l)),v=i("<div>").append(y),g.append(v),h.push(g[0]),w.push(g[0]);c.addClass("fc-limited").after(i(h)),o.push(c[0])}}E(this.colCnt),b.moreEls=i(w),b.limitedEls=i(o)}},e.prototype.unlimitRow=function(t){var e=this.eventRenderer.rowStructs[t];e.moreEls&&(e.moreEls.remove(),e.moreEls=null),e.limitedEls&&(e.limitedEls.removeClass("fc-limited"),e.limitedEls=null)},e.prototype.renderMoreLink=function(t,e,n){var r=this,o=this.view;return i('<a class="fc-more">').text(this.getMoreLinkText(n.length)).on("click",function(s){var a=r.opt("eventLimitClick"),l=r.getCellDate(t,e),u=i(s.currentTarget),d=r.getCellEl(t,e),c=r.getCellSegs(t,e),p=r.resliceDaySegs(c,l),h=r.resliceDaySegs(n,l);"function"==typeof a&&(a=r.publiclyTrigger("eventLimitClick",{context:o,args:[{date:l.clone(),dayEl:d,moreEl:u,segs:p,hiddenSegs:h},s,o]})),"popover"===a?r.showSegPopover(t,e,u,p):"string"==typeof a&&o.calendar.zoomTo(l,a)})},e.prototype.showSegPopover=function(t,e,n,r){var i,o,s=this,l=this.view,u=n.parent();i=1===this.rowCnt?l.el:this.rowEls.eq(t),o={className:"fc-more-popover "+l.calendar.theme.getClass("popover"),content:this.renderSegPopoverContent(t,e,r),parentEl:l.el,top:i.offset().top,autoHide:!0,viewportConstrain:this.opt("popoverViewportConstrain"),hide:function(){s.popoverSegs&&s.triggerBeforeEventSegsDestroyed(s.popoverSegs),s.segPopover.removeElement(),s.segPopover=null,s.popoverSegs=null}},this.isRTL?o.right=u.offset().left+u.outerWidth()+1:o.left=u.offset().left-1,this.segPopover=new a.default(o),this.segPopover.show(),this.bindAllSegHandlersToEl(this.segPopover.el),this.triggerAfterEventSegsRendered(r)},e.prototype.renderSegPopoverContent=function(t,e,n){var r,s=this.view,a=s.calendar.theme,l=this.getCellDate(t,e).format(this.opt("dayPopoverFormat")),u=i('<div class="fc-header '+a.getClass("popoverHeader")+'"><span class="fc-close '+a.getIconClass("close")+'"></span><span class="fc-title">'+o.htmlEscape(l)+'</span><div class="fc-clear"></div></div><div class="fc-body '+a.getClass("popoverContent")+'"><div class="fc-event-container"></div></div>'),d=u.find(".fc-event-container");for(n=this.eventRenderer.renderFgSegEls(n,!0),this.popoverSegs=n,r=0;r<n.length;r++)this.hitsNeeded(),n[r].hit=this.getCellHit(t,e),this.hitsNotNeeded(),d.append(n[r].el);return u},e.prototype.resliceDaySegs=function(t,e){var n,r,o,s=e.clone(),a=s.clone().add(1,"days"),c=new l.default(s,a),p=[];for(n=0;n<t.length;n++)r=t[n],(o=r.footprint.componentFootprint.unzonedRange.intersect(c))&&p.push(i.extend({},r,{footprint:new d.default(new u.default(o,r.footprint.componentFootprint.isAllDay),r.footprint.eventDef,r.footprint.eventInstance),isStart:r.isStart&&o.isStart,isEnd:r.isEnd&&o.isEnd}));return this.eventRenderer.sortEventSegs(p),p},e.prototype.getMoreLinkText=function(t){var e=this.opt("eventLimitText");return"function"==typeof e?e(t):"+"+t+" "+e},e.prototype.getCellSegs=function(t,e,n){for(var r,i=this.eventRenderer.rowStructs[t].segMatrix,o=n||0,s=[];o<i.length;)r=i[o][e],r&&s.push(r),o++;return s},e}(h.default);e.default=m,m.prototype.eventRendererClass=g.default,m.prototype.businessHourRendererClass=c.default,m.prototype.helperRendererClass=v.default,m.prototype.fillRendererClass=y.default,p.default.mixInto(m),f.default.mixInto(m)},function(t,e,n){function r(t){return function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.colWeekNumbersVisible=!1,e}return i.__extends(e,t),e.prototype.renderHeadIntroHtml=function(){var t=this.view;return this.colWeekNumbersVisible?'<th class="fc-week-number '+t.calendar.theme.getClass("widgetHeader")+'" '+t.weekNumberStyleAttr()+"><span>"+s.htmlEscape(this.opt("weekNumberTitle"))+"</span></th>":""},e.prototype.renderNumberIntroHtml=function(t){var e=this.view,n=this.getCellDate(t,0);return this.colWeekNumbersVisible?'<td class="fc-week-number" '+e.weekNumberStyleAttr()+">"+e.buildGotoAnchorHtml({date:n,type:"week",forceOff:1===this.colCnt},n.format("w"))+"</td>":""},e.prototype.renderBgIntroHtml=function(){var t=this.view;return this.colWeekNumbersVisible?'<td class="fc-week-number '+t.calendar.theme.getClass("widgetContent")+'" '+t.weekNumberStyleAttr()+"></td>":""},e.prototype.renderIntroHtml=function(){var t=this.view;return this.colWeekNumbersVisible?'<td class="fc-week-number" '+t.weekNumberStyleAttr()+"></td>":""},e.prototype.getIsNumbersVisible=function(){return d.default.prototype.getIsNumbersVisible.apply(this,arguments)||this.colWeekNumbersVisible},e}(t)}Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),o=n(3),s=n(4),a=n(41),l=n(43),u=n(68),d=n(66),c=function(t){function e(e,n){var r=t.call(this,e,n)||this;return r.dayGrid=r.instantiateDayGrid(),r.dayGrid.isRigid=r.hasRigidRows(),r.opt("weekNumbers")&&(r.opt("weekNumbersWithinDays")?(r.dayGrid.cellWeekNumbersVisible=!0,r.dayGrid.colWeekNumbersVisible=!1):(r.dayGrid.cellWeekNumbersVisible=!1,r.dayGrid.colWeekNumbersVisible=!0)),r.addChild(r.dayGrid),r.scroller=new a.default({overflowX:"hidden",overflowY:"auto"}),r}return i.__extends(e,t),e.prototype.instantiateDayGrid=function(){return new(r(this.dayGridClass))(this)},e.prototype.executeDateRender=function(e){this.dayGrid.breakOnWeeks=/year|month|week/.test(e.currentRangeUnit),t.prototype.executeDateRender.call(this,e)},e.prototype.renderSkeleton=function(){var t,e;this.el.addClass("fc-basic-view").html(this.renderSkeletonHtml()),this.scroller.render(),t=this.scroller.el.addClass("fc-day-grid-container"),e=o('<div class="fc-day-grid">').appendTo(t),this.el.find(".fc-body > tr > td").append(t),this.dayGrid.headContainerEl=this.el.find(".fc-head-container"),this.dayGrid.setElement(e)},e.prototype.unrenderSkeleton=function(){this.dayGrid.removeElement(),this.scroller.destroy()},e.prototype.renderSkeletonHtml=function(){var t=this.calendar.theme;return'<table class="'+t.getClass("tableGrid")+'">'+(this.opt("columnHeader")?'<thead class="fc-head"><tr><td class="fc-head-container '+t.getClass("widgetHeader")+'">&nbsp;</td></tr></thead>':"")+'<tbody class="fc-body"><tr><td class="'+t.getClass("widgetContent")+'"></td></tr></tbody></table>'},e.prototype.weekNumberStyleAttr=function(){return null!=this.weekNumberWidth?'style="width:'+this.weekNumberWidth+'px"':""},e.prototype.hasRigidRows=function(){var t=this.opt("eventLimit");return t&&"number"!=typeof t},e.prototype.updateSize=function(e,n,r){var i,o,a=this.opt("eventLimit"),l=this.dayGrid.headContainerEl.find(".fc-row");if(!this.dayGrid.rowEls)return void(n||(i=this.computeScrollerHeight(e),this.scroller.setHeight(i)));t.prototype.updateSize.call(this,e,n,r),this.dayGrid.colWeekNumbersVisible&&(this.weekNumberWidth=s.matchCellWidths(this.el.find(".fc-week-number"))),this.scroller.clear(),s.uncompensateScroll(l),this.dayGrid.removeSegPopover(),a&&"number"==typeof a&&this.dayGrid.limitRows(a),i=this.computeScrollerHeight(e),this.setGridHeight(i,n),a&&"number"!=typeof a&&this.dayGrid.limitRows(a),n||(this.scroller.setHeight(i),o=this.scroller.getScrollbarWidths(),(o.left||o.right)&&(s.compensateScroll(l,o),i=this.computeScrollerHeight(e),this.scroller.setHeight(i)),this.scroller.lockOverflow(o))},e.prototype.computeScrollerHeight=function(t){return t-s.subtractInnerElHeight(this.el,this.scroller.el)},e.prototype.setGridHeight=function(t,e){e?s.undistributeHeight(this.dayGrid.rowEls):s.distributeHeight(this.dayGrid.rowEls,t,!0)},e.prototype.computeInitialDateScroll=function(){return{top:0}},e.prototype.queryDateScroll=function(){return{top:this.scroller.getScrollTop()}},e.prototype.applyDateScroll=function(t){void 0!==t.top&&this.scroller.setScrollTop(t.top)},e}(l.default);e.default=c,c.prototype.dateProfileGeneratorClass=u.default,c.prototype.dayGridClass=d.default},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(5),o=n(55),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e.prototype.buildRenderRange=function(e,n,r){var o=t.prototype.buildRenderRange.call(this,e,n,r),s=this.msToUtcMoment(o.startMs,r),a=this.msToUtcMoment(o.endMs,r);return/^(year|month)$/.test(n)&&(s.startOf("week"),a.weekday()&&a.add(1,"week").startOf("week")),new i.default(s,a)},e}(o.default);e.default=s},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){function r(t,e,n){var r;for(r=0;r<t.length;r++)if(!e(t[r].eventInstance.toLegacy(),n?n.toLegacy():null))return!1;return!0}function i(t,e){var n,r,i,o,s=e.toLegacy();for(n=0;n<t.length;n++){if(r=t[n].eventInstance,i=r.def,!1===(o=i.getOverlap()))return!1;if("function"==typeof o&&!o(r.toLegacy(),s))return!1}return!0}Object.defineProperty(e,"__esModule",{value:!0});var o=n(5),s=n(12),a=n(36),l=n(6),u=n(19),d=function(){function t(t,e){this.eventManager=t,this._calendar=e}return t.prototype.opt=function(t){return this._calendar.opt(t)},t.prototype.isEventInstanceGroupAllowed=function(t){var e,n=t.getEventDef(),r=this.eventRangesToEventFootprints(t.getAllEventRanges()),i=this.getPeerEventInstances(n),o=i.map(u.eventInstanceToEventRange),s=this.eventRangesToEventFootprints(o),a=n.getConstraint(),l=n.getOverlap(),d=this.opt("eventAllow");for(e=0;e<r.length;e++)if(!this.isFootprintAllowed(r[e].componentFootprint,s,a,l,r[e].eventInstance))return!1;if(d)for(e=0;e<r.length;e++)if(!1===d(r[e].componentFootprint.toLegacy(this._calendar),r[e].getEventLegacy()))return!1;return!0},t.prototype.getPeerEventInstances=function(t){return this.eventManager.getEventInstancesWithoutId(t.id)},t.prototype.isSelectionFootprintAllowed=function(t){var e,n=this.eventManager.getEventInstances(),r=n.map(u.eventInstanceToEventRange),i=this.eventRangesToEventFootprints(r);return!!this.isFootprintAllowed(t,i,this.opt("selectConstraint"),this.opt("selectOverlap"))&&(!(e=this.opt("selectAllow"))||!1!==e(t.toLegacy(this._calendar)))},t.prototype.isFootprintAllowed=function(t,e,n,o,s){var a,l;if(null!=n&&(a=this.constraintValToFootprints(n,t.isAllDay),!this.isFootprintWithinConstraints(t,a)))return!1;if(l=this.collectOverlapEventFootprints(e,t),!1===o){if(l.length)return!1}else if("function"==typeof o&&!r(l,o,s))return!1;return!(s&&!i(l,s))},t.prototype.isFootprintWithinConstraints=function(t,e){var n;for(n=0;n<e.length;n++)if(this.footprintContainsFootprint(e[n],t))return!0;return!1},t.prototype.constraintValToFootprints=function(t,e){var n;return"businessHours"===t?this.buildCurrentBusinessFootprints(e):"object"==typeof t?(n=this.parseEventDefToInstances(t),n?this.eventInstancesToFootprints(n):this.parseFootprints(t)):null!=t?(n=this.eventManager.getEventInstancesWithId(t),this.eventInstancesToFootprints(n)):void 0},t.prototype.buildCurrentBusinessFootprints=function(t){var e=this._calendar.view,n=e.get("businessHourGenerator"),r=e.dateProfile.activeUnzonedRange,i=n.buildEventInstanceGroup(t,r);return i?this.eventInstancesToFootprints(i.eventInstances):[]},t.prototype.eventInstancesToFootprints=function(t){var e=t.map(u.eventInstanceToEventRange);return this.eventRangesToEventFootprints(e).map(u.eventFootprintToComponentFootprint)},t.prototype.collectOverlapEventFootprints=function(t,e){var n,r=[];for(n=0;n<t.length;n++)this.footprintsIntersect(e,t[n].componentFootprint)&&r.push(t[n]);return r},t.prototype.parseEventDefToInstances=function(t){var e=this.eventManager,n=a.default.parse(t,new l.default(this._calendar));return!!n&&n.buildInstances(e.currentPeriod.unzonedRange)},t.prototype.eventRangesToEventFootprints=function(t){var e,n=[];for(e=0;e<t.length;e++)n.push.apply(n,this.eventRangeToEventFootprints(t[e]));return n},t.prototype.eventRangeToEventFootprints=function(t){return[u.eventRangeToEventFootprint(t)]},t.prototype.parseFootprints=function(t){var e,n;return t.start&&(e=this._calendar.moment(t.start),e.isValid()||(e=null)),t.end&&(n=this._calendar.moment(t.end),n.isValid()||(n=null)),[new s.default(new o.default(e,n),e&&!e.hasTime()||n&&!n.hasTime())]},t.prototype.footprintContainsFootprint=function(t,e){return t.unzonedRange.containsRange(e.unzonedRange)},t.prototype.footprintsIntersect=function(t,e){return t.unzonedRange.intersectsWith(e.unzonedRange)},t}();e.default=d},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(3),i=n(19),o=n(20),s=n(54),a=n(6),l={start:"09:00",end:"17:00",dow:[1,2,3,4,5],rendering:"inverse-background"},u=function(){function t(t,e){this.rawComplexDef=t,this.calendar=e}return t.prototype.buildEventInstanceGroup=function(t,e){var n,r=this.buildEventDefs(t);if(r.length)return n=new o.default(i.eventDefsToEventInstances(r,e)),n.explicitEventDef=r[0],n},t.prototype.buildEventDefs=function(t){var e,n=this.rawComplexDef,i=[],o=!1,s=[];for(!0===n?i=[{}]:r.isPlainObject(n)?i=[n]:r.isArray(n)&&(i=n,o=!0),e=0;e<i.length;e++)o&&!i[e].dow||s.push(this.buildEventDef(t,i[e]));return s},t.prototype.buildEventDef=function(t,e){var n=r.extend({},l,e);return t&&(n.start=null,n.end=null),s.default.parse(n,new a.default(this.calendar))},t}();e.default=u},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(3),i=n(4),o=n(21),s=n(13),a=n(5),l=n(20),u=function(){function t(t,e,n){this.pendingCnt=0,this.freezeDepth=0,this.stuntedReleaseCnt=0,this.releaseCnt=0,this.start=t,this.end=e,this.timezone=n,this.unzonedRange=new a.default(t.clone().stripZone(),e.clone().stripZone()),this.requestsByUid={},this.eventDefsByUid={},this.eventDefsById={},this.eventInstanceGroupsById={}}return t.prototype.isWithinRange=function(t,e){return!t.isBefore(this.start)&&!e.isAfter(this.end)},t.prototype.requestSources=function(t){this.freeze();for(var e=0;e<t.length;e++)this.requestSource(t[e]);this.thaw()},t.prototype.requestSource=function(t){var e=this,n={source:t,status:"pending",eventDefs:null};this.requestsByUid[t.uid]=n,this.pendingCnt+=1,t.fetch(this.start,this.end,this.timezone).then(function(t){"cancelled"!==n.status&&(n.status="completed",n.eventDefs=t,e.addEventDefs(t),e.pendingCnt--,e.tryRelease())},function(){"cancelled"!==n.status&&(n.status="failed",e.pendingCnt--,e.tryRelease())})},t.prototype.purgeSource=function(t){var e=this.requestsByUid[t.uid];e&&(delete this.requestsByUid[t.uid],"pending"===e.status?(e.status="cancelled",this.pendingCnt--,this.tryRelease()):"completed"===e.status&&e.eventDefs.forEach(this.removeEventDef.bind(this)))},t.prototype.purgeAllSources=function(){var t,e,n=this.requestsByUid,r=0;for(t in n)e=n[t],"pending"===e.status?e.status="cancelled":"completed"===e.status&&r++;this.requestsByUid={},this.pendingCnt=0,r&&this.removeAllEventDefs()},t.prototype.getEventDefByUid=function(t){return this.eventDefsByUid[t]},t.prototype.getEventDefsById=function(t){var e=this.eventDefsById[t];return e?e.slice():[]},t.prototype.addEventDefs=function(t){for(var e=0;e<t.length;e++)this.addEventDef(t[e])},t.prototype.addEventDef=function(t){var e,n=this.eventDefsById,r=t.id,i=n[r]||(n[r]=[]),o=t.buildInstances(this.unzonedRange);for(i.push(t),this.eventDefsByUid[t.uid]=t,e=0;e<o.length;e++)this.addEventInstance(o[e],r)},t.prototype.removeEventDefsById=function(t){var e=this;this.getEventDefsById(t).forEach(function(t){e.removeEventDef(t)})},t.prototype.removeAllEventDefs=function(){var t=r.isEmptyObject(this.eventDefsByUid);this.eventDefsByUid={},this.eventDefsById={},this.eventInstanceGroupsById={},t||this.tryRelease()},t.prototype.removeEventDef=function(t){var e=this.eventDefsById,n=e[t.id];delete this.eventDefsByUid[t.uid],n&&(i.removeExact(n,t),n.length||delete e[t.id],this.removeEventInstancesForDef(t))},t.prototype.getEventInstances=function(){var t,e=this.eventInstanceGroupsById,n=[];for(t in e)n.push.apply(n,e[t].eventInstances);return n},t.prototype.getEventInstancesWithId=function(t){var e=this.eventInstanceGroupsById[t];return e?e.eventInstances.slice():[]},t.prototype.getEventInstancesWithoutId=function(t){var e,n=this.eventInstanceGroupsById,r=[];for(e in n)e!==t&&r.push.apply(r,n[e].eventInstances);return r},t.prototype.addEventInstance=function(t,e){var n=this.eventInstanceGroupsById;(n[e]||(n[e]=new l.default)).eventInstances.push(t),this.tryRelease()},t.prototype.removeEventInstancesForDef=function(t){var e,n=this.eventInstanceGroupsById,r=n[t.id];r&&(e=i.removeMatching(r.eventInstances,function(e){return e.def===t}),r.eventInstances.length||delete n[t.id],e&&this.tryRelease())},t.prototype.tryRelease=function(){this.pendingCnt||(this.freezeDepth?this.stuntedReleaseCnt++:this.release())},t.prototype.release=function(){this.releaseCnt++,this.trigger("release",this.eventInstanceGroupsById)},t.prototype.whenReleased=function(){var t=this;return this.releaseCnt?o.default.resolve(this.eventInstanceGroupsById):o.default.construct(function(e){t.one("release",e)})},t.prototype.freeze=function(){this.freezeDepth++||(this.stuntedReleaseCnt=0)},t.prototype.thaw=function(){--this.freezeDepth||!this.stuntedReleaseCnt||this.pendingCnt||this.release()},t}();e.default=u,s.default.mixInto(u)},function(t,e,n){function r(t,e){return t.getPrimitive()===e.getPrimitive()}Object.defineProperty(e,"__esModule",{value:!0});var i=n(3),o=n(4),s=n(219),a=n(56),l=n(6),u=n(38),d=n(9),c=n(20),p=n(13),h=n(7),f=function(){function t(t){this.calendar=t,this.stickySource=new a.default(t),this.otherSources=[]}return t.prototype.requestEvents=function(t,e,n,r){return!r&&this.currentPeriod&&this.currentPeriod.isWithinRange(t,e)&&n===this.currentPeriod.timezone||this.setPeriod(new s.default(t,e,n)),this.currentPeriod.whenReleased()},t.prototype.addSource=function(t){this.otherSources.push(t),this.currentPeriod&&this.currentPeriod.requestSource(t)},t.prototype.removeSource=function(t){o.removeExact(this.otherSources,t),this.currentPeriod&&this.currentPeriod.purgeSource(t)},t.prototype.removeAllSources=function(){this.otherSources=[],this.currentPeriod&&this.currentPeriod.purgeAllSources()},t.prototype.refetchSource=function(t){var e=this.currentPeriod;e&&(e.freeze(),e.purgeSource(t),e.requestSource(t),e.thaw())},t.prototype.refetchAllSources=function(){var t=this.currentPeriod;t&&(t.freeze(),t.purgeAllSources(),t.requestSources(this.getSources()),t.thaw())},t.prototype.getSources=function(){return[this.stickySource].concat(this.otherSources)},t.prototype.multiQuerySources=function(t){t?i.isArray(t)||(t=[t]):t=[];var e,n=[];for(e=0;e<t.length;e++)n.push.apply(n,this.querySources(t[e]));return n},t.prototype.querySources=function(t){var e,n,o=this.otherSources;for(e=0;e<o.length;e++)if((n=o[e])===t)return[n];return(n=this.getSourceById(l.default.normalizeId(t)))?[n]:(t=u.default.parse(t,this.calendar),t?i.grep(o,function(e){return r(t,e)}):void 0)},t.prototype.getSourceById=function(t){return i.grep(this.otherSources,function(e){return e.id&&e.id===t})[0]},t.prototype.setPeriod=function(t){this.currentPeriod&&(this.unbindPeriod(this.currentPeriod),this.currentPeriod=null),this.currentPeriod=t,this.bindPeriod(t),t.requestSources(this.getSources())},t.prototype.bindPeriod=function(t){this.listenTo(t,"release",function(t){this.trigger("release",t)})},t.prototype.unbindPeriod=function(t){this.stopListeningTo(t)},t.prototype.getEventDefByUid=function(t){if(this.currentPeriod)return this.currentPeriod.getEventDefByUid(t)},t.prototype.addEventDef=function(t,e){e&&this.stickySource.addEventDef(t),this.currentPeriod&&this.currentPeriod.addEventDef(t)},t.prototype.removeEventDefsById=function(t){this.getSources().forEach(function(e){e.removeEventDefsById(t)}),this.currentPeriod&&this.currentPeriod.removeEventDefsById(t)},t.prototype.removeAllEventDefs=function(){this.getSources().forEach(function(t){t.removeAllEventDefs()}),this.currentPeriod&&this.currentPeriod.removeAllEventDefs()},t.prototype.mutateEventsWithId=function(t,e){var n,r=this.currentPeriod,i=[];return r?(r.freeze(),n=r.getEventDefsById(t),n.forEach(function(t){r.removeEventDef(t),i.push(e.mutateSingle(t)),r.addEventDef(t)}),r.thaw(),function(){r.freeze();for(var t=0;t<n.length;t++)r.removeEventDef(n[t]),i[t](),r.addEventDef(n[t]);r.thaw()}):function(){}},t.prototype.buildMutatedEventInstanceGroup=function(t,e){var n,r,i=this.getEventDefsById(t),o=[];for(n=0;n<i.length;n++)(r=i[n].clone())instanceof d.default&&(e.mutateSingle(r),o.push.apply(o,r.buildInstances()));return new c.default(o)},t.prototype.freeze=function(){this.currentPeriod&&this.currentPeriod.freeze()},t.prototype.thaw=function(){this.currentPeriod&&this.currentPeriod.thaw()},t.prototype.getEventDefsById=function(t){return this.currentPeriod.getEventDefsById(t)},t.prototype.getEventInstances=function(){return this.currentPeriod.getEventInstances()},t.prototype.getEventInstancesWithId=function(t){return this.currentPeriod.getEventInstancesWithId(t)},t.prototype.getEventInstancesWithoutId=function(t){
return this.currentPeriod.getEventInstancesWithoutId(t)},t}();e.default=f,p.default.mixInto(f),h.default.mixInto(f)},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(22),o=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e}(i.default);e.default=o,o.prototype.classes={widget:"fc-unthemed",widgetHeader:"fc-widget-header",widgetContent:"fc-widget-content",buttonGroup:"fc-button-group",button:"fc-button",cornerLeft:"fc-corner-left",cornerRight:"fc-corner-right",stateDefault:"fc-state-default",stateActive:"fc-state-active",stateDisabled:"fc-state-disabled",stateHover:"fc-state-hover",stateDown:"fc-state-down",popoverHeader:"fc-widget-header",popoverContent:"fc-widget-content",headerRow:"fc-widget-header",dayRow:"fc-widget-content",listView:"fc-widget-content"},o.prototype.baseIconClass="fc-icon",o.prototype.iconClasses={close:"fc-icon-x",prev:"fc-icon-left-single-arrow",next:"fc-icon-right-single-arrow",prevYear:"fc-icon-left-double-arrow",nextYear:"fc-icon-right-double-arrow"},o.prototype.iconOverrideOption="buttonIcons",o.prototype.iconOverrideCustomButtonOption="icon",o.prototype.iconOverridePrefix="fc-icon-"},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(22),o=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e}(i.default);e.default=o,o.prototype.classes={widget:"ui-widget",widgetHeader:"ui-widget-header",widgetContent:"ui-widget-content",buttonGroup:"fc-button-group",button:"ui-button",cornerLeft:"ui-corner-left",cornerRight:"ui-corner-right",stateDefault:"ui-state-default",stateActive:"ui-state-active",stateDisabled:"ui-state-disabled",stateHover:"ui-state-hover",stateDown:"ui-state-down",today:"ui-state-highlight",popoverHeader:"ui-widget-header",popoverContent:"ui-widget-content",headerRow:"ui-widget-header",dayRow:"ui-widget-content",listView:"ui-widget-content"},o.prototype.baseIconClass="ui-icon",o.prototype.iconClasses={close:"ui-icon-closethick",prev:"ui-icon-circle-triangle-w",next:"ui-icon-circle-triangle-e",prevYear:"ui-icon-seek-prev",nextYear:"ui-icon-seek-next"},o.prototype.iconOverrideOption="themeButtonIcons",o.prototype.iconOverrideCustomButtonOption="themeIcon",o.prototype.iconOverridePrefix="ui-icon-"},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(3),o=n(21),s=n(6),a=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e.parse=function(t,e){var n;return i.isFunction(t.events)?n=t:i.isFunction(t)&&(n={events:t}),!!n&&s.default.parse.call(this,n,e)},e.prototype.fetch=function(t,e,n){var r=this;return this.calendar.pushLoading(),o.default.construct(function(i){r.func.call(r.calendar,t.clone(),e.clone(),n,function(t){r.calendar.popLoading(),i(r.parseEventDefs(t))})})},e.prototype.getPrimitive=function(){return this.func},e.prototype.applyManualStandardProps=function(e){var n=t.prototype.applyManualStandardProps.call(this,e);return this.func=e.events,n},e}(s.default);e.default=a,a.defineStandardProps({events:!1})},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(3),o=n(4),s=n(21),a=n(6),l=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e.parse=function(t,e){var n;return"string"==typeof t.url?n=t:"string"==typeof t&&(n={url:t}),!!n&&a.default.parse.call(this,n,e)},e.prototype.fetch=function(t,n,r){var a=this,l=this.ajaxSettings,u=l.success,d=l.error,c=this.buildRequestParams(t,n,r);return this.calendar.pushLoading(),s.default.construct(function(t,n){i.ajax(i.extend({},e.AJAX_DEFAULTS,l,{url:a.url,data:c,success:function(e,r,s){var l;a.calendar.popLoading(),e?(l=o.applyAll(u,a,[e,r,s]),i.isArray(l)&&(e=l),t(a.parseEventDefs(e))):n()},error:function(t,e,r){a.calendar.popLoading(),o.applyAll(d,a,[t,e,r]),n()}}))})},e.prototype.buildRequestParams=function(t,e,n){var r,o,s,a,l=this.calendar,u=this.ajaxSettings,d={};return r=this.startParam,null==r&&(r=l.opt("startParam")),o=this.endParam,null==o&&(o=l.opt("endParam")),s=this.timezoneParam,null==s&&(s=l.opt("timezoneParam")),a=i.isFunction(u.data)?u.data():u.data||{},i.extend(d,a),d[r]=t.format(),d[o]=e.format(),n&&"local"!==n&&(d[s]=n),d},e.prototype.getPrimitive=function(){return this.url},e.prototype.applyMiscProps=function(t){this.ajaxSettings=t},e.AJAX_DEFAULTS={dataType:"json",cache:!1},e}(a.default);e.default=l,l.defineStandardProps({url:!0,startParam:!0,endParam:!0,timezoneParam:!0})},function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t){this.items=t||[]}return t.prototype.proxyCall=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var r=[];return this.items.forEach(function(n){r.push(n[t].apply(n,e))}),r},t}();e.default=n},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(3),i=n(4),o=n(7),s=function(){function t(t,e){this.isFollowing=!1,this.isHidden=!1,this.isAnimating=!1,this.options=e=e||{},this.sourceEl=t,this.parentEl=e.parentEl?r(e.parentEl):t.parent()}return t.prototype.start=function(t){this.isFollowing||(this.isFollowing=!0,this.y0=i.getEvY(t),this.x0=i.getEvX(t),this.topDelta=0,this.leftDelta=0,this.isHidden||this.updatePosition(),i.getEvIsTouch(t)?this.listenTo(r(document),"touchmove",this.handleMove):this.listenTo(r(document),"mousemove",this.handleMove))},t.prototype.stop=function(t,e){var n=this,i=this.options.revertDuration,o=function(){n.isAnimating=!1,n.removeElement(),n.top0=n.left0=null,e&&e()};this.isFollowing&&!this.isAnimating&&(this.isFollowing=!1,this.stopListeningTo(r(document)),t&&i&&!this.isHidden?(this.isAnimating=!0,this.el.animate({top:this.top0,left:this.left0},{duration:i,complete:o})):o())},t.prototype.getEl=function(){var t=this.el;return t||(t=this.el=this.sourceEl.clone().addClass(this.options.additionalClass||"").css({position:"absolute",visibility:"",display:this.isHidden?"none":"",margin:0,right:"auto",bottom:"auto",width:this.sourceEl.width(),height:this.sourceEl.height(),opacity:this.options.opacity||"",zIndex:this.options.zIndex}),t.addClass("fc-unselectable"),t.appendTo(this.parentEl)),t},t.prototype.removeElement=function(){this.el&&(this.el.remove(),this.el=null)},t.prototype.updatePosition=function(){var t,e;this.getEl(),null==this.top0&&(t=this.sourceEl.offset(),e=this.el.offsetParent().offset(),this.top0=t.top-e.top,this.left0=t.left-e.left),this.el.css({top:this.top0+this.topDelta,left:this.left0+this.leftDelta})},t.prototype.handleMove=function(t){this.topDelta=i.getEvY(t)-this.y0,this.leftDelta=i.getEvX(t)-this.x0,this.isHidden||this.updatePosition()},t.prototype.hide=function(){this.isHidden||(this.isHidden=!0,this.el&&this.el.hide())},t.prototype.show=function(){this.isHidden&&(this.isHidden=!1,this.updatePosition(),this.getEl().show())},t}();e.default=s,o.default.mixInto(s)},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(3),i=n(4),o=n(7),s=function(){function t(t){this.isHidden=!0,this.margin=10,this.options=t||{}}return t.prototype.show=function(){this.isHidden&&(this.el||this.render(),this.el.show(),this.position(),this.isHidden=!1,this.trigger("show"))},t.prototype.hide=function(){this.isHidden||(this.el.hide(),this.isHidden=!0,this.trigger("hide"))},t.prototype.render=function(){var t=this,e=this.options;this.el=r('<div class="fc-popover">').addClass(e.className||"").css({top:0,left:0}).append(e.content).appendTo(e.parentEl),this.el.on("click",".fc-close",function(){t.hide()}),e.autoHide&&this.listenTo(r(document),"mousedown",this.documentMousedown)},t.prototype.documentMousedown=function(t){this.el&&!r(t.target).closest(this.el).length&&this.hide()},t.prototype.removeElement=function(){this.hide(),this.el&&(this.el.remove(),this.el=null),this.stopListeningTo(r(document),"mousedown")},t.prototype.position=function(){var t,e,n,o,s,a=this.options,l=this.el.offsetParent().offset(),u=this.el.outerWidth(),d=this.el.outerHeight(),c=r(window),p=i.getScrollParent(this.el);o=a.top||0,s=void 0!==a.left?a.left:void 0!==a.right?a.right-u:0,p.is(window)||p.is(document)?(p=c,t=0,e=0):(n=p.offset(),t=n.top,e=n.left),t+=c.scrollTop(),e+=c.scrollLeft(),!1!==a.viewportConstrain&&(o=Math.min(o,t+p.outerHeight()-d-this.margin),o=Math.max(o,t+this.margin),s=Math.min(s,e+p.outerWidth()-u-this.margin),s=Math.max(s,e+this.margin)),this.el.css({top:o-l.top,left:s-l.left})},t.prototype.trigger=function(t){this.options[t]&&this.options[t].apply(this,Array.prototype.slice.call(arguments,1))},t}();e.default=s,o.default.mixInto(s)},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(13),i=function(){function t(){this.q=[],this.isPaused=!1,this.isRunning=!1}return t.prototype.queue=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.q.push.apply(this.q,t),this.tryStart()},t.prototype.pause=function(){this.isPaused=!0},t.prototype.resume=function(){this.isPaused=!1,this.tryStart()},t.prototype.getIsIdle=function(){return!this.isRunning&&!this.isPaused},t.prototype.tryStart=function(){!this.isRunning&&this.canRunNext()&&(this.isRunning=!0,this.trigger("start"),this.runRemaining())},t.prototype.canRunNext=function(){return!this.isPaused&&this.q.length},t.prototype.runRemaining=function(){var t,e,n=this;do{if(t=this.q.shift(),(e=this.runTask(t))&&e.then)return void e.then(function(){n.canRunNext()&&n.runRemaining()})}while(this.canRunNext());this.trigger("stop"),this.isRunning=!1,this.tryStart()},t.prototype.runTask=function(t){return t()},t}();e.default=i,r.default.mixInto(i)},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(228),o=function(t){function e(e){var n=t.call(this)||this;return n.waitsByNamespace=e||{},n}return r.__extends(e,t),e.prototype.queue=function(t,e,n){var r,i={func:t,namespace:e,type:n};e&&(r=this.waitsByNamespace[e]),this.waitNamespace&&(e===this.waitNamespace&&null!=r?this.delayWait(r):(this.clearWait(),this.tryStart())),this.compoundTask(i)&&(this.waitNamespace||null==r?this.tryStart():this.startWait(e,r))},e.prototype.startWait=function(t,e){this.waitNamespace=t,this.spawnWait(e)},e.prototype.delayWait=function(t){clearTimeout(this.waitId),this.spawnWait(t)},e.prototype.spawnWait=function(t){var e=this;this.waitId=setTimeout(function(){e.waitNamespace=null,e.tryStart()},t)},e.prototype.clearWait=function(){this.waitNamespace&&(clearTimeout(this.waitId),this.waitId=null,this.waitNamespace=null)},e.prototype.canRunNext=function(){if(!t.prototype.canRunNext.call(this))return!1;if(this.waitNamespace){for(var e=this.q,n=0;n<e.length;n++)if(e[n].namespace!==this.waitNamespace)return!0;return!1}return!0},e.prototype.runTask=function(t){t.func()},e.prototype.compoundTask=function(t){var e,n,r=this.q,i=!0;if(t.namespace&&"destroy"===t.type)for(e=r.length-1;e>=0;e--)if(n=r[e],n.namespace===t.namespace)switch(n.type){case"init":i=!1;case"add":case"remove":r.splice(e,1)}return i&&r.push(t),i},e}(i.default);e.default=o},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(51),o=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e.prototype.setElement=function(t){this.el=t,this.bindGlobalHandlers(),this.renderSkeleton(),this.set("isInDom",!0)},e.prototype.removeElement=function(){this.unset("isInDom"),this.unrenderSkeleton(),this.unbindGlobalHandlers(),this.el.remove()},e.prototype.bindGlobalHandlers=function(){},e.prototype.unbindGlobalHandlers=function(){},e.prototype.renderSkeleton=function(){},e.prototype.unrenderSkeleton=function(){},e}(i.default);e.default=o},function(t,e,n){function r(t){var e,n,r,i=[];for(e in t)for(n=t[e].eventInstances,r=0;r<n.length;r++)i.push(n[r].toLegacy());return i}Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),o=n(3),s=n(0),a=n(4),l=n(11),u=n(49),d=n(230),c=n(19),p=function(t){function e(n,r){var i=t.call(this)||this;return i.isRTL=!1,i.hitsNeededDepth=0,i.hasAllDayBusinessHours=!1,i.isDatesRendered=!1,n&&(i.view=n),r&&(i.options=r),i.uid=String(e.guid++),i.childrenByUid={},i.nextDayThreshold=s.duration(i.opt("nextDayThreshold")),i.isRTL=i.opt("isRTL"),i.fillRendererClass&&(i.fillRenderer=new i.fillRendererClass(i)),i.eventRendererClass&&(i.eventRenderer=new i.eventRendererClass(i,i.fillRenderer)),i.helperRendererClass&&i.eventRenderer&&(i.helperRenderer=new i.helperRendererClass(i,i.eventRenderer)),i.businessHourRendererClass&&i.fillRenderer&&(i.businessHourRenderer=new i.businessHourRendererClass(i,i.fillRenderer)),i}return i.__extends(e,t),e.prototype.addChild=function(t){return!this.childrenByUid[t.uid]&&(this.childrenByUid[t.uid]=t,!0)},e.prototype.removeChild=function(t){return!!this.childrenByUid[t.uid]&&(delete this.childrenByUid[t.uid],!0)},e.prototype.updateSize=function(t,e,n){this.callChildren("updateSize",arguments)},e.prototype.opt=function(t){return this._getView().opt(t)},e.prototype.publiclyTrigger=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n=this._getCalendar();return n.publiclyTrigger.apply(n,t)},e.prototype.hasPublicHandlers=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n=this._getCalendar();return n.hasPublicHandlers.apply(n,t)},e.prototype.executeDateRender=function(t){this.dateProfile=t,this.renderDates(t),this.isDatesRendered=!0,this.callChildren("executeDateRender",arguments)},e.prototype.executeDateUnrender=function(){this.callChildren("executeDateUnrender",arguments),this.dateProfile=null,this.unrenderDates(),this.isDatesRendered=!1},e.prototype.renderDates=function(t){},e.prototype.unrenderDates=function(){},e.prototype.getNowIndicatorUnit=function(){},e.prototype.renderNowIndicator=function(t){this.callChildren("renderNowIndicator",arguments)},e.prototype.unrenderNowIndicator=function(){this.callChildren("unrenderNowIndicator",arguments)},e.prototype.renderBusinessHours=function(t){this.businessHourRenderer&&this.businessHourRenderer.render(t),this.callChildren("renderBusinessHours",arguments)},e.prototype.unrenderBusinessHours=function(){this.callChildren("unrenderBusinessHours",arguments),this.businessHourRenderer&&this.businessHourRenderer.unrender()},e.prototype.executeEventRender=function(t){this.eventRenderer?(this.eventRenderer.rangeUpdated(),this.eventRenderer.render(t)):this.renderEvents&&this.renderEvents(r(t)),this.callChildren("executeEventRender",arguments)},e.prototype.executeEventUnrender=function(){this.callChildren("executeEventUnrender",arguments),this.eventRenderer?this.eventRenderer.unrender():this.destroyEvents&&this.destroyEvents()},e.prototype.getBusinessHourSegs=function(){var t=this.getOwnBusinessHourSegs();return this.iterChildren(function(e){t.push.apply(t,e.getBusinessHourSegs())}),t},e.prototype.getOwnBusinessHourSegs=function(){return this.businessHourRenderer?this.businessHourRenderer.getSegs():[]},e.prototype.getEventSegs=function(){var t=this.getOwnEventSegs();return this.iterChildren(function(e){t.push.apply(t,e.getEventSegs())}),t},e.prototype.getOwnEventSegs=function(){return this.eventRenderer?this.eventRenderer.getSegs():[]},e.prototype.triggerAfterEventsRendered=function(){this.triggerAfterEventSegsRendered(this.getEventSegs()),this.publiclyTrigger("eventAfterAllRender",{context:this,args:[this]})},e.prototype.triggerAfterEventSegsRendered=function(t){var e=this;this.hasPublicHandlers("eventAfterRender")&&t.forEach(function(t){var n;t.el&&(n=t.footprint.getEventLegacy(),e.publiclyTrigger("eventAfterRender",{context:n,args:[n,t.el,e]}))})},e.prototype.triggerBeforeEventsDestroyed=function(){this.triggerBeforeEventSegsDestroyed(this.getEventSegs())},e.prototype.triggerBeforeEventSegsDestroyed=function(t){var e=this;this.hasPublicHandlers("eventDestroy")&&t.forEach(function(t){var n;t.el&&(n=t.footprint.getEventLegacy(),e.publiclyTrigger("eventDestroy",{context:n,args:[n,t.el,e]}))})},e.prototype.showEventsWithId=function(t){this.getEventSegs().forEach(function(e){e.footprint.eventDef.id===t&&e.el&&e.el.css("visibility","")}),this.callChildren("showEventsWithId",arguments)},e.prototype.hideEventsWithId=function(t){this.getEventSegs().forEach(function(e){e.footprint.eventDef.id===t&&e.el&&e.el.css("visibility","hidden")}),this.callChildren("hideEventsWithId",arguments)},e.prototype.renderDrag=function(t,e,n){var r=!1;return this.iterChildren(function(i){i.renderDrag(t,e,n)&&(r=!0)}),r},e.prototype.unrenderDrag=function(){this.callChildren("unrenderDrag",arguments)},e.prototype.renderEventResize=function(t,e,n){this.callChildren("renderEventResize",arguments)},e.prototype.unrenderEventResize=function(){this.callChildren("unrenderEventResize",arguments)},e.prototype.renderSelectionFootprint=function(t){this.renderHighlight(t),this.callChildren("renderSelectionFootprint",arguments)},e.prototype.unrenderSelection=function(){this.unrenderHighlight(),this.callChildren("unrenderSelection",arguments)},e.prototype.renderHighlight=function(t){this.fillRenderer&&this.fillRenderer.renderFootprint("highlight",t,{getClasses:function(){return["fc-highlight"]}}),this.callChildren("renderHighlight",arguments)},e.prototype.unrenderHighlight=function(){this.fillRenderer&&this.fillRenderer.unrender("highlight"),this.callChildren("unrenderHighlight",arguments)},e.prototype.hitsNeeded=function(){this.hitsNeededDepth++||this.prepareHits(),this.callChildren("hitsNeeded",arguments)},e.prototype.hitsNotNeeded=function(){this.hitsNeededDepth&&!--this.hitsNeededDepth&&this.releaseHits(),this.callChildren("hitsNotNeeded",arguments)},e.prototype.prepareHits=function(){},e.prototype.releaseHits=function(){},e.prototype.queryHit=function(t,e){var n,r,i=this.childrenByUid;for(n in i)if(r=i[n].queryHit(t,e))break;return r},e.prototype.getSafeHitFootprint=function(t){var e=this.getHitFootprint(t);return this.dateProfile.activeUnzonedRange.containsRange(e.unzonedRange)?e:null},e.prototype.getHitFootprint=function(t){},e.prototype.getHitEl=function(t){},e.prototype.eventRangesToEventFootprints=function(t){var e,n=[];for(e=0;e<t.length;e++)n.push.apply(n,this.eventRangeToEventFootprints(t[e]));return n},e.prototype.eventRangeToEventFootprints=function(t){return[c.eventRangeToEventFootprint(t)]},e.prototype.eventFootprintsToSegs=function(t){var e,n=[];for(e=0;e<t.length;e++)n.push.apply(n,this.eventFootprintToSegs(t[e]));return n},e.prototype.eventFootprintToSegs=function(t){var e,n,r,i=t.componentFootprint.unzonedRange;for(e=this.componentFootprintToSegs(t.componentFootprint),n=0;n<e.length;n++)r=e[n],i.isStart||(r.isStart=!1),i.isEnd||(r.isEnd=!1),r.footprint=t;return e},e.prototype.componentFootprintToSegs=function(t){return[]},e.prototype.callChildren=function(t,e){this.iterChildren(function(n){n[t].apply(n,e)})},e.prototype.iterChildren=function(t){var e,n=this.childrenByUid;for(e in n)t(n[e])},e.prototype._getCalendar=function(){var t=this;return t.calendar||t.view.calendar},e.prototype._getView=function(){return this.view},e.prototype._getDateProfile=function(){return this._getView().get("dateProfile")},e.prototype.buildGotoAnchorHtml=function(t,e,n){var r,i,s,u;return o.isPlainObject(t)?(r=t.date,i=t.type,s=t.forceOff):r=t,r=l.default(r),u={date:r.format("YYYY-MM-DD"),type:i||"day"},"string"==typeof e&&(n=e,e=null),e=e?" "+a.attrsToStr(e):"",n=n||"",!s&&this.opt("navLinks")?"<a"+e+' data-goto="'+a.htmlEscape(JSON.stringify(u))+'">'+n+"</a>":"<span"+e+">"+n+"</span>"},e.prototype.getAllDayHtml=function(){return this.opt("allDayHtml")||a.htmlEscape(this.opt("allDayText"))},e.prototype.getDayClasses=function(t,e){var n,r=this._getView(),i=[];return this.dateProfile.activeUnzonedRange.containsDate(t)?(i.push("fc-"+a.dayIDs[t.day()]),r.isDateInOtherMonth(t,this.dateProfile)&&i.push("fc-other-month"),n=r.calendar.getNow(),t.isSame(n,"day")?(i.push("fc-today"),!0!==e&&i.push(r.calendar.theme.getClass("today"))):t<n?i.push("fc-past"):i.push("fc-future")):i.push("fc-disabled-day"),i},e.prototype.formatRange=function(t,e,n,r){var i=t.end;return e&&(i=i.clone().subtract(1)),u.formatRange(t.start,i,n,r,this.isRTL)},e.prototype.currentRangeAs=function(t){return this._getDateProfile().currentUnzonedRange.as(t)},e.prototype.computeDayRange=function(t){var e=this._getCalendar(),n=e.msToUtcMoment(t.startMs,!0),r=e.msToUtcMoment(t.endMs),i=+r.time(),o=r.clone().stripTime();return i&&i>=this.nextDayThreshold&&o.add(1,"days"),o<=n&&(o=n.clone().add(1,"days")),{start:n,end:o}},e.prototype.isMultiDayRange=function(t){var e=this.computeDayRange(t);return e.end.diff(e.start,"days")>1},e.guid=0,e}(d.default);e.default=p},function(t,e,n){function r(t,e){return null==e?t:i.isFunction(e)?t.filter(e):(e+="",t.filter(function(t){return t.id==e||t._id===e}))}Object.defineProperty(e,"__esModule",{value:!0});var i=n(3),o=n(0),s=n(4),a=n(33),l=n(225),u=n(23),d=n(13),c=n(7),p=n(257),h=n(258),f=n(259),g=n(217),v=n(32),y=n(11),m=n(5),b=n(12),w=n(16),D=n(220),E=n(218),S=n(38),C=n(36),R=n(9),T=n(39),M=n(6),I=n(57),H=function(){function t(t,e){this.loadingLevel=0,this.ignoreUpdateViewSize=0,this.freezeContentHeightDepth=0,u.default.needed(),this.el=t,this.viewsByType={},this.optionsManager=new h.default(this,e),this.viewSpecManager=new f.default(this.optionsManager,this),this.initMomentInternals(),this.initCurrentDate(),this.initEventManager(),this.constraints=new g.default(this.eventManager,this),this.constructed()}return t.prototype.constructed=function(){},t.prototype.getView=function(){return this.view},t.prototype.publiclyTrigger=function(t,e){var n,r,o=this.opt(t);if(i.isPlainObject(e)?(n=e.context,r=e.args):i.isArray(e)&&(r=e),null==n&&(n=this.el[0]),r||(r=[]),this.triggerWith(t,n,r),o)return o.apply(n,r)},t.prototype.hasPublicHandlers=function(t){return this.hasHandlers(t)||this.opt(t)},t.prototype.option=function(t,e){var n;if("string"==typeof t){if(void 0===e)return this.optionsManager.get(t);n={},n[t]=e,this.optionsManager.add(n)}else"object"==typeof t&&this.optionsManager.add(t)},t.prototype.opt=function(t){return this.optionsManager.get(t)},t.prototype.instantiateView=function(t){var e=this.viewSpecManager.getViewSpec(t);if(!e)throw new Error('View type "'+t+'" is not valid');return new e.class(this,e)},t.prototype.isValidViewType=function(t){return Boolean(this.viewSpecManager.getViewSpec(t))},t.prototype.changeView=function(t,e){e&&(e.start&&e.end?this.optionsManager.recordOverrides({visibleRange:e}):this.currentDate=this.moment(e).stripZone()),this.renderView(t)},t.prototype.zoomTo=function(t,e){var n;e=e||"day",n=this.viewSpecManager.getViewSpec(e)||this.viewSpecManager.getUnitViewSpec(e),this.currentDate=t.clone(),this.renderView(n?n.type:null)},t.prototype.initCurrentDate=function(){var t=this.opt("defaultDate");this.currentDate=null!=t?this.moment(t).stripZone():this.getNow()},t.prototype.prev=function(){var t=this.view,e=t.dateProfileGenerator.buildPrev(t.get("dateProfile"));e.isValid&&(this.currentDate=e.date,this.renderView())},t.prototype.next=function(){var t=this.view,e=t.dateProfileGenerator.buildNext(t.get("dateProfile"));e.isValid&&(this.currentDate=e.date,this.renderView())},t.prototype.prevYear=function(){this.currentDate.add(-1,"years"),this.renderView()},t.prototype.nextYear=function(){this.currentDate.add(1,"years"),this.renderView()},t.prototype.today=function(){this.currentDate=this.getNow(),this.renderView()},t.prototype.gotoDate=function(t){this.currentDate=this.moment(t).stripZone(),this.renderView()},t.prototype.incrementDate=function(t){this.currentDate.add(o.duration(t)),this.renderView()},t.prototype.getDate=function(){return this.applyTimezone(this.currentDate)},t.prototype.pushLoading=function(){this.loadingLevel++||this.publiclyTrigger("loading",[!0,this.view])},t.prototype.popLoading=function(){--this.loadingLevel||this.publiclyTrigger("loading",[!1,this.view])},t.prototype.render=function(){this.contentEl?this.elementVisible()&&(this.calcSize(),this.updateViewSize()):this.initialRender()},t.prototype.initialRender=function(){var t=this,e=this.el;e.addClass("fc"),e.on("click.fc","a[data-goto]",function(e){var n=i(e.currentTarget),r=n.data("goto"),o=t.moment(r.date),a=r.type,l=t.view.opt("navLink"+s.capitaliseFirstLetter(a)+"Click");"function"==typeof l?l(o,e):("string"==typeof l&&(a=l),t.zoomTo(o,a))}),this.optionsManager.watch("settingTheme",["?theme","?themeSystem"],function(n){var r=I.getThemeSystemClass(n.themeSystem||n.theme),i=new r(t.optionsManager),o=i.getClass("widget");t.theme=i,o&&e.addClass(o)},function(){var n=t.theme.getClass("widget");t.theme=null,n&&e.removeClass(n)}),this.optionsManager.watch("settingBusinessHourGenerator",["?businessHours"],function(e){t.businessHourGenerator=new E.default(e.businessHours,t),t.view&&t.view.set("businessHourGenerator",t.businessHourGenerator)},function(){t.businessHourGenerator=null}),this.optionsManager.watch("applyingDirClasses",["?isRTL","?locale"],function(t){e.toggleClass("fc-ltr",!t.isRTL),e.toggleClass("fc-rtl",t.isRTL)}),this.contentEl=i("<div class='fc-view-container'>").prependTo(e),this.initToolbars(),this.renderHeader(),this.renderFooter(),this.renderView(this.opt("defaultView")),this.opt("handleWindowResize")&&i(window).resize(this.windowResizeProxy=s.debounce(this.windowResize.bind(this),this.opt("windowResizeDelay")))},t.prototype.destroy=function(){this.view&&this.clearView(),this.toolbarsManager.proxyCall("removeElement"),this.contentEl.remove(),this.el.removeClass("fc fc-ltr fc-rtl"),this.optionsManager.unwatch("settingTheme"),this.optionsManager.unwatch("settingBusinessHourGenerator"),this.el.off(".fc"),this.windowResizeProxy&&(i(window).unbind("resize",this.windowResizeProxy),this.windowResizeProxy=null),u.default.unneeded()},t.prototype.elementVisible=function(){return this.el.is(":visible")},t.prototype.bindViewHandlers=function(t){var e=this;t.watch("titleForCalendar",["title"],function(n){t===e.view&&e.setToolbarsTitle(n.title)}),t.watch("dateProfileForCalendar",["dateProfile"],function(n){t===e.view&&(e.currentDate=n.dateProfile.date,e.updateToolbarButtons(n.dateProfile))})},t.prototype.unbindViewHandlers=function(t){t.unwatch("titleForCalendar"),t.unwatch("dateProfileForCalendar")},t.prototype.renderView=function(t){var e,n=this.view;this.freezeContentHeight(),n&&t&&n.type!==t&&this.clearView(),!this.view&&t&&(e=this.view=this.viewsByType[t]||(this.viewsByType[t]=this.instantiateView(t)),this.bindViewHandlers(e),e.startBatchRender(),e.setElement(i("<div class='fc-view fc-"+t+"-view'>").appendTo(this.contentEl)),this.toolbarsManager.proxyCall("activateButton",t)),this.view&&(this.view.get("businessHourGenerator")!==this.businessHourGenerator&&this.view.set("businessHourGenerator",this.businessHourGenerator),this.view.setDate(this.currentDate),e&&e.stopBatchRender()),this.thawContentHeight()},t.prototype.clearView=function(){var t=this.view;this.toolbarsManager.proxyCall("deactivateButton",t.type),this.unbindViewHandlers(t),t.removeElement(),t.unsetDate(),this.view=null},t.prototype.reinitView=function(){var t=this.view,e=t.queryScroll();this.freezeContentHeight(),this.clearView(),this.calcSize(),this.renderView(t.type),this.view.applyScroll(e),this.thawContentHeight()},t.prototype.getSuggestedViewHeight=function(){return null==this.suggestedViewHeight&&this.calcSize(),this.suggestedViewHeight},t.prototype.isHeightAuto=function(){return"auto"===this.opt("contentHeight")||"auto"===this.opt("height")},t.prototype.updateViewSize=function(t){void 0===t&&(t=!1);var e,n=this.view;if(!this.ignoreUpdateViewSize&&n)return t&&(this.calcSize(),e=n.queryScroll()),this.ignoreUpdateViewSize++,n.updateSize(this.getSuggestedViewHeight(),this.isHeightAuto(),t),this.ignoreUpdateViewSize--,t&&n.applyScroll(e),!0},t.prototype.calcSize=function(){this.elementVisible()&&this._calcSize()},t.prototype._calcSize=function(){var t=this.opt("contentHeight"),e=this.opt("height");this.suggestedViewHeight="number"==typeof t?t:"function"==typeof t?t():"number"==typeof e?e-this.queryToolbarsHeight():"function"==typeof e?e()-this.queryToolbarsHeight():"parent"===e?this.el.parent().height()-this.queryToolbarsHeight():Math.round(this.contentEl.width()/Math.max(this.opt("aspectRatio"),.5))},t.prototype.windowResize=function(t){t.target===window&&this.view&&this.view.isDatesRendered&&this.updateViewSize(!0)&&this.publiclyTrigger("windowResize",[this.view])},t.prototype.freezeContentHeight=function(){this.freezeContentHeightDepth++||this.forceFreezeContentHeight()},t.prototype.forceFreezeContentHeight=function(){this.contentEl.css({width:"100%",height:this.contentEl.height(),overflow:"hidden"})},t.prototype.thawContentHeight=function(){this.freezeContentHeightDepth--,this.contentEl.css({width:"",height:"",overflow:""}),this.freezeContentHeightDepth&&this.forceFreezeContentHeight()},t.prototype.initToolbars=function(){this.header=new p.default(this,this.computeHeaderOptions()),this.footer=new p.default(this,this.computeFooterOptions()),this.toolbarsManager=new l.default([this.header,this.footer])},t.prototype.computeHeaderOptions=function(){return{extraClasses:"fc-header-toolbar",layout:this.opt("header")}},t.prototype.computeFooterOptions=function(){return{extraClasses:"fc-footer-toolbar",layout:this.opt("footer")}},t.prototype.renderHeader=function(){var t=this.header;t.setToolbarOptions(this.computeHeaderOptions()),t.render(),t.el&&this.el.prepend(t.el)},t.prototype.renderFooter=function(){var t=this.footer;t.setToolbarOptions(this.computeFooterOptions()),t.render(),t.el&&this.el.append(t.el)},t.prototype.setToolbarsTitle=function(t){this.toolbarsManager.proxyCall("updateTitle",t)},t.prototype.updateToolbarButtons=function(t){var e=this.getNow(),n=this.view,r=n.dateProfileGenerator.build(e),i=n.dateProfileGenerator.buildPrev(n.get("dateProfile")),o=n.dateProfileGenerator.buildNext(n.get("dateProfile"));this.toolbarsManager.proxyCall(r.isValid&&!t.currentUnzonedRange.containsDate(e)?"enableButton":"disableButton","today"),this.toolbarsManager.proxyCall(i.isValid?"enableButton":"disableButton","prev"),this.toolbarsManager.proxyCall(o.isValid?"enableButton":"disableButton","next")},t.prototype.queryToolbarsHeight=function(){return this.toolbarsManager.items.reduce(function(t,e){return t+(e.el?e.el.outerHeight(!0):0)},0)},t.prototype.select=function(t,e){this.view.select(this.buildSelectFootprint.apply(this,arguments))},t.prototype.unselect=function(){this.view&&this.view.unselect()},t.prototype.buildSelectFootprint=function(t,e){var n,r=this.moment(t).stripZone();return n=e?this.moment(e).stripZone():r.hasTime()?r.clone().add(this.defaultTimedEventDuration):r.clone().add(this.defaultAllDayEventDuration),new b.default(new m.default(r,n),!r.hasTime())},t.prototype.initMomentInternals=function(){var t=this;this.defaultAllDayEventDuration=o.duration(this.opt("defaultAllDayEventDuration")),this.defaultTimedEventDuration=o.duration(this.opt("defaultTimedEventDuration")),this.optionsManager.watch("buildingMomentLocale",["?locale","?monthNames","?monthNamesShort","?dayNames","?dayNamesShort","?firstDay","?weekNumberCalculation"],function(e){var n,r=e.weekNumberCalculation,i=e.firstDay;"iso"===r&&(r="ISO");var o=Object.create(v.getMomentLocaleData(e.locale));e.monthNames&&(o._months=e.monthNames),e.monthNamesShort&&(o._monthsShort=e.monthNamesShort),e.dayNames&&(o._weekdays=e.dayNames),e.dayNamesShort&&(o._weekdaysShort=e.dayNamesShort),null==i&&"ISO"===r&&(i=1),null!=i&&(n=Object.create(o._week),n.dow=i,o._week=n),"ISO"!==r&&"local"!==r&&"function"!=typeof r||(o._fullCalendar_weekCalc=r),t.localeData=o,t.currentDate&&t.localizeMoment(t.currentDate)})},t.prototype.moment=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n;return"local"===this.opt("timezone")?(n=y.default.apply(null,t),n.hasTime()&&n.local()):n="UTC"===this.opt("timezone")?y.default.utc.apply(null,t):y.default.parseZone.apply(null,t),this.localizeMoment(n),n},t.prototype.msToMoment=function(t,e){var n=y.default.utc(t)
;return e?n.stripTime():n=this.applyTimezone(n),this.localizeMoment(n),n},t.prototype.msToUtcMoment=function(t,e){var n=y.default.utc(t);return e&&n.stripTime(),this.localizeMoment(n),n},t.prototype.localizeMoment=function(t){t._locale=this.localeData},t.prototype.getIsAmbigTimezone=function(){return"local"!==this.opt("timezone")&&"UTC"!==this.opt("timezone")},t.prototype.applyTimezone=function(t){if(!t.hasTime())return t.clone();var e,n=this.moment(t.toArray()),r=t.time().asMilliseconds()-n.time().asMilliseconds();return r&&(e=n.clone().add(r),t.time().asMilliseconds()-e.time().asMilliseconds()==0&&(n=e)),n},t.prototype.footprintToDateProfile=function(t,e){void 0===e&&(e=!1);var n,r=y.default.utc(t.unzonedRange.startMs);return e||(n=y.default.utc(t.unzonedRange.endMs)),t.isAllDay?(r.stripTime(),n&&n.stripTime()):(r=this.applyTimezone(r),n&&(n=this.applyTimezone(n))),this.localizeMoment(r),n&&this.localizeMoment(n),new w.default(r,n,this)},t.prototype.getNow=function(){var t=this.opt("now");return"function"==typeof t&&(t=t()),this.moment(t).stripZone()},t.prototype.humanizeDuration=function(t){return t.locale(this.opt("locale")).humanize()},t.prototype.parseUnzonedRange=function(t){var e=null,n=null;return t.start&&(e=this.moment(t.start).stripZone()),t.end&&(n=this.moment(t.end).stripZone()),e||n?e&&n&&n.isBefore(e)?null:new m.default(e,n):null},t.prototype.initEventManager=function(){var t=this,e=new D.default(this),n=this.opt("eventSources")||[],r=this.opt("events");this.eventManager=e,r&&n.unshift(r),e.on("release",function(e){t.trigger("eventsReset",e)}),e.freeze(),n.forEach(function(n){var r=S.default.parse(n,t);r&&e.addSource(r)}),e.thaw()},t.prototype.requestEvents=function(t,e){return this.eventManager.requestEvents(t,e,this.opt("timezone"),!this.opt("lazyFetching"))},t.prototype.getEventEnd=function(t){return t.end?t.end.clone():this.getDefaultEventEnd(t.allDay,t.start)},t.prototype.getDefaultEventEnd=function(t,e){var n=e.clone();return t?n.stripTime().add(this.defaultAllDayEventDuration):n.add(this.defaultTimedEventDuration),this.getIsAmbigTimezone()&&n.stripZone(),n},t.prototype.rerenderEvents=function(){this.view.flash("displayingEvents")},t.prototype.refetchEvents=function(){this.eventManager.refetchAllSources()},t.prototype.renderEvents=function(t,e){this.eventManager.freeze();for(var n=0;n<t.length;n++)this.renderEvent(t[n],e);this.eventManager.thaw()},t.prototype.renderEvent=function(t,e){void 0===e&&(e=!1);var n=this.eventManager,r=C.default.parse(t,t.source||n.stickySource);r&&n.addEventDef(r,e)},t.prototype.removeEvents=function(t){var e,n,i=this.eventManager,o=[],s={};if(null==t)i.removeAllEventDefs();else{for(i.getEventInstances().forEach(function(t){o.push(t.toLegacy())}),o=r(o,t),n=0;n<o.length;n++)e=this.eventManager.getEventDefByUid(o[n]._id),s[e.id]=!0;i.freeze();for(n in s)i.removeEventDefsById(n);i.thaw()}},t.prototype.clientEvents=function(t){var e=[];return this.eventManager.getEventInstances().forEach(function(t){e.push(t.toLegacy())}),r(e,t)},t.prototype.updateEvents=function(t){this.eventManager.freeze();for(var e=0;e<t.length;e++)this.updateEvent(t[e]);this.eventManager.thaw()},t.prototype.updateEvent=function(t){var e,n,r=this.eventManager.getEventDefByUid(t._id);r instanceof R.default&&(e=r.buildInstance(),n=T.default.createFromRawProps(e,t,null),this.eventManager.mutateEventsWithId(r.id,n))},t.prototype.getEventSources=function(){return this.eventManager.otherSources.slice()},t.prototype.getEventSourceById=function(t){return this.eventManager.getSourceById(M.default.normalizeId(t))},t.prototype.addEventSource=function(t){var e=S.default.parse(t,this);e&&this.eventManager.addSource(e)},t.prototype.removeEventSources=function(t){var e,n,r=this.eventManager;if(null==t)this.eventManager.removeAllSources();else{for(e=r.multiQuerySources(t),r.freeze(),n=0;n<e.length;n++)r.removeSource(e[n]);r.thaw()}},t.prototype.removeEventSource=function(t){var e,n=this.eventManager,r=n.querySources(t);for(n.freeze(),e=0;e<r.length;e++)n.removeSource(r[e]);n.thaw()},t.prototype.refetchEventSources=function(t){var e,n=this.eventManager,r=n.multiQuerySources(t);for(n.freeze(),e=0;e<r.length;e++)n.refetchSource(r[e]);n.thaw()},t.defaults=a.globalDefaults,t.englishDefaults=a.englishDefaults,t.rtlDefaults=a.rtlDefaults,t}();e.default=H,d.default.mixInto(H),c.default.mixInto(H)},function(t,e,n){function r(t){var e,n,r,i,l=a.dataAttrPrefix;return l&&(l+="-"),e=t.data(l+"event")||null,e&&(e="object"==typeof e?o.extend({},e):{},n=e.start,null==n&&(n=e.time),r=e.duration,i=e.stick,delete e.start,delete e.time,delete e.duration,delete e.stick),null==n&&(n=t.data(l+"start")),null==n&&(n=t.data(l+"time")),null==r&&(r=t.data(l+"duration")),null==i&&(i=t.data(l+"stick")),n=null!=n?s.duration(n):null,r=null!=r?s.duration(r):null,i=Boolean(i),{eventProps:e,startTime:n,duration:r,stick:i}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),o=n(3),s=n(0),a=n(18),l=n(4),u=n(11),d=n(7),c=n(17),p=n(9),h=n(20),f=n(6),g=n(14),v=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.isDragging=!1,e}return i.__extends(e,t),e.prototype.end=function(){this.dragListener&&this.dragListener.endInteraction()},e.prototype.bindToDocument=function(){this.listenTo(o(document),{dragstart:this.handleDragStart,sortstart:this.handleDragStart})},e.prototype.unbindFromDocument=function(){this.stopListeningTo(o(document))},e.prototype.handleDragStart=function(t,e){var n,r;this.opt("droppable")&&(n=o((e?e.item:null)||t.target),r=this.opt("dropAccept"),(o.isFunction(r)?r.call(n[0],n):n.is(r))&&(this.isDragging||this.listenToExternalDrag(n,t,e)))},e.prototype.listenToExternalDrag=function(t,e,n){var i,o=this,s=this.component,a=this.view,u=r(t);(this.dragListener=new c.default(s,{interactionStart:function(){o.isDragging=!0},hitOver:function(t){var e,n=!0,r=t.component.getSafeHitFootprint(t);r?(i=o.computeExternalDrop(r,u),i?(e=new h.default(i.buildInstances()),n=u.eventProps?s.isEventInstanceGroupAllowed(e):s.isExternalInstanceGroupAllowed(e)):n=!1):n=!1,n||(i=null,l.disableCursor()),i&&s.renderDrag(s.eventRangesToEventFootprints(e.sliceRenderRanges(s.dateProfile.renderUnzonedRange,a.calendar)))},hitOut:function(){i=null},hitDone:function(){l.enableCursor(),s.unrenderDrag()},interactionEnd:function(e){i&&a.reportExternalDrop(i,Boolean(u.eventProps),Boolean(u.stick),t,e,n),o.isDragging=!1,o.dragListener=null}})).startDrag(e)},e.prototype.computeExternalDrop=function(t,e){var n,r=this.view.calendar,i=u.default.utc(t.unzonedRange.startMs).stripZone();return t.isAllDay&&(e.startTime?i.time(e.startTime):i.stripTime()),e.duration&&(n=i.clone().add(e.duration)),i=r.applyTimezone(i),n&&(n=r.applyTimezone(n)),p.default.parse(o.extend({},e.eventProps,{start:i,end:n}),new f.default(r))},e}(g.default);e.default=v,d.default.mixInto(v),a.dataAttrPrefix=""},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(3),o=n(4),s=n(39),a=n(40),l=n(17),u=n(14),d=function(t){function e(e,n){var r=t.call(this,e)||this;return r.isResizing=!1,r.eventPointing=n,r}return r.__extends(e,t),e.prototype.end=function(){this.dragListener&&this.dragListener.endInteraction()},e.prototype.bindToEl=function(t){var e=this.component;e.bindSegHandlerToEl(t,"mousedown",this.handleMouseDown.bind(this)),e.bindSegHandlerToEl(t,"touchstart",this.handleTouchStart.bind(this))},e.prototype.handleMouseDown=function(t,e){this.component.canStartResize(t,e)&&this.buildDragListener(t,i(e.target).is(".fc-start-resizer")).startInteraction(e,{distance:5})},e.prototype.handleTouchStart=function(t,e){this.component.canStartResize(t,e)&&this.buildDragListener(t,i(e.target).is(".fc-start-resizer")).startInteraction(e)},e.prototype.buildDragListener=function(t,e){var n,r,i=this,s=this.component,a=this.view,u=a.calendar,d=u.eventManager,c=t.el,p=t.footprint.eventDef,h=t.footprint.eventInstance;return this.dragListener=new l.default(s,{scroll:this.opt("dragScroll"),subjectEl:c,interactionStart:function(){n=!1},dragStart:function(e){n=!0,i.eventPointing.handleMouseout(t,e),i.segResizeStart(t,e)},hitOver:function(n,l,c){var h,f=!0,g=s.getSafeHitFootprint(c),v=s.getSafeHitFootprint(n);g&&v?(r=e?i.computeEventStartResizeMutation(g,v,t.footprint):i.computeEventEndResizeMutation(g,v,t.footprint),r?(h=d.buildMutatedEventInstanceGroup(p.id,r),f=s.isEventInstanceGroupAllowed(h)):f=!1):f=!1,f?r.isEmpty()&&(r=null):(r=null,o.disableCursor()),r&&(a.hideEventsWithId(t.footprint.eventDef.id),a.renderEventResize(s.eventRangesToEventFootprints(h.sliceRenderRanges(s.dateProfile.renderUnzonedRange,u)),t))},hitOut:function(){r=null},hitDone:function(){a.unrenderEventResize(t),a.showEventsWithId(t.footprint.eventDef.id),o.enableCursor()},interactionEnd:function(e){n&&i.segResizeStop(t,e),r&&a.reportEventResize(h,r,c,e),i.dragListener=null}})},e.prototype.segResizeStart=function(t,e){this.isResizing=!0,this.component.publiclyTrigger("eventResizeStart",{context:t.el[0],args:[t.footprint.getEventLegacy(),e,{},this.view]})},e.prototype.segResizeStop=function(t,e){this.isResizing=!1,this.component.publiclyTrigger("eventResizeStop",{context:t.el[0],args:[t.footprint.getEventLegacy(),e,{},this.view]})},e.prototype.computeEventStartResizeMutation=function(t,e,n){var r,i,o=n.componentFootprint.unzonedRange,l=this.component.diffDates(e.unzonedRange.getStart(),t.unzonedRange.getStart());return o.getStart().add(l)<o.getEnd()&&(r=new a.default,r.setStartDelta(l),i=new s.default,i.setDateMutation(r),i)},e.prototype.computeEventEndResizeMutation=function(t,e,n){var r,i,o=n.componentFootprint.unzonedRange,l=this.component.diffDates(e.unzonedRange.getEnd(),t.unzonedRange.getEnd());return o.getEnd().add(l)>o.getStart()&&(r=new a.default,r.setEndDelta(l),i=new s.default,i.setDateMutation(r),i)},e}(u.default);e.default=d},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(4),o=n(39),s=n(40),a=n(59),l=n(17),u=n(226),d=n(14),c=function(t){function e(e,n){var r=t.call(this,e)||this;return r.isDragging=!1,r.eventPointing=n,r}return r.__extends(e,t),e.prototype.end=function(){this.dragListener&&this.dragListener.endInteraction()},e.prototype.getSelectionDelay=function(){var t=this.opt("eventLongPressDelay");return null==t&&(t=this.opt("longPressDelay")),t},e.prototype.bindToEl=function(t){var e=this.component;e.bindSegHandlerToEl(t,"mousedown",this.handleMousedown.bind(this)),e.bindSegHandlerToEl(t,"touchstart",this.handleTouchStart.bind(this))},e.prototype.handleMousedown=function(t,e){!this.component.shouldIgnoreMouse()&&this.component.canStartDrag(t,e)&&this.buildDragListener(t).startInteraction(e,{distance:5})},e.prototype.handleTouchStart=function(t,e){var n=this.component,r={delay:this.view.isEventDefSelected(t.footprint.eventDef)?0:this.getSelectionDelay()};n.canStartDrag(t,e)?this.buildDragListener(t).startInteraction(e,r):n.canStartSelection(t,e)&&this.buildSelectListener(t).startInteraction(e,r)},e.prototype.buildSelectListener=function(t){var e=this,n=this.view,r=t.footprint.eventDef,i=t.footprint.eventInstance;if(this.dragListener)return this.dragListener;var o=this.dragListener=new a.default({dragStart:function(t){o.isTouch&&!n.isEventDefSelected(r)&&i&&n.selectEventInstance(i)},interactionEnd:function(t){e.dragListener=null}});return o},e.prototype.buildDragListener=function(t){var e,n,r,o=this,s=this.component,a=this.view,d=a.calendar,c=d.eventManager,p=t.el,h=t.footprint.eventDef,f=t.footprint.eventInstance;if(this.dragListener)return this.dragListener;var g=this.dragListener=new l.default(a,{scroll:this.opt("dragScroll"),subjectEl:p,subjectCenter:!0,interactionStart:function(r){t.component=s,e=!1,n=new u.default(t.el,{additionalClass:"fc-dragging",parentEl:a.el,opacity:g.isTouch?null:o.opt("dragOpacity"),revertDuration:o.opt("dragRevertDuration"),zIndex:2}),n.hide(),n.start(r)},dragStart:function(n){g.isTouch&&!a.isEventDefSelected(h)&&f&&a.selectEventInstance(f),e=!0,o.eventPointing.handleMouseout(t,n),o.segDragStart(t,n),a.hideEventsWithId(t.footprint.eventDef.id)},hitOver:function(e,l,u){var p,f,v,y=!0;t.hit&&(u=t.hit),p=u.component.getSafeHitFootprint(u),f=e.component.getSafeHitFootprint(e),p&&f?(r=o.computeEventDropMutation(p,f,h),r?(v=c.buildMutatedEventInstanceGroup(h.id,r),y=s.isEventInstanceGroupAllowed(v)):y=!1):y=!1,y||(r=null,i.disableCursor()),r&&a.renderDrag(s.eventRangesToEventFootprints(v.sliceRenderRanges(s.dateProfile.renderUnzonedRange,d)),t,g.isTouch)?n.hide():n.show(),l&&(r=null)},hitOut:function(){a.unrenderDrag(t),n.show(),r=null},hitDone:function(){i.enableCursor()},interactionEnd:function(i){delete t.component,n.stop(!r,function(){e&&(a.unrenderDrag(t),o.segDragStop(t,i)),a.showEventsWithId(t.footprint.eventDef.id),r&&a.reportEventDrop(f,r,p,i)}),o.dragListener=null}});return g},e.prototype.segDragStart=function(t,e){this.isDragging=!0,this.component.publiclyTrigger("eventDragStart",{context:t.el[0],args:[t.footprint.getEventLegacy(),e,{},this.view]})},e.prototype.segDragStop=function(t,e){this.isDragging=!1,this.component.publiclyTrigger("eventDragStop",{context:t.el[0],args:[t.footprint.getEventLegacy(),e,{},this.view]})},e.prototype.computeEventDropMutation=function(t,e,n){var r=new o.default;return r.setDateMutation(this.computeEventDateMutation(t,e)),r},e.prototype.computeEventDateMutation=function(t,e){var n,r,i=t.unzonedRange.getStart(),o=e.unzonedRange.getStart(),a=!1,l=!1,u=!1;return t.isAllDay!==e.isAllDay&&(a=!0,e.isAllDay?(u=!0,i.stripTime()):l=!0),n=this.component.diffDates(o,i),r=new s.default,r.clearEnd=a,r.forceTimed=l,r.forceAllDay=u,r.setDateDelta(n),r},e}(d.default);e.default=c},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(4),o=n(17),s=n(12),a=n(5),l=n(14),u=function(t){function e(e){var n=t.call(this,e)||this;return n.dragListener=n.buildDragListener(),n}return r.__extends(e,t),e.prototype.end=function(){this.dragListener.endInteraction()},e.prototype.getDelay=function(){var t=this.opt("selectLongPressDelay");return null==t&&(t=this.opt("longPressDelay")),t},e.prototype.bindToEl=function(t){var e=this,n=this.component,r=this.dragListener;n.bindDateHandlerToEl(t,"mousedown",function(t){e.opt("selectable")&&!n.shouldIgnoreMouse()&&r.startInteraction(t,{distance:e.opt("selectMinDistance")})}),n.bindDateHandlerToEl(t,"touchstart",function(t){e.opt("selectable")&&!n.shouldIgnoreTouch()&&r.startInteraction(t,{delay:e.getDelay()})}),i.preventSelection(t)},e.prototype.buildDragListener=function(){var t,e=this,n=this.component;return new o.default(n,{scroll:this.opt("dragScroll"),interactionStart:function(){t=null},dragStart:function(t){e.view.unselect(t)},hitOver:function(r,o,s){var a,l;s&&(a=n.getSafeHitFootprint(s),l=n.getSafeHitFootprint(r),t=a&&l?e.computeSelection(a,l):null,t?n.renderSelectionFootprint(t):!1===t&&i.disableCursor())},hitOut:function(){t=null,n.unrenderSelection()},hitDone:function(){i.enableCursor()},interactionEnd:function(n,r){!r&&t&&e.view.reportSelection(t,n)}})},e.prototype.computeSelection=function(t,e){var n=this.computeSelectionFootprint(t,e);return!(n&&!this.isSelectionFootprintAllowed(n))&&n},e.prototype.computeSelectionFootprint=function(t,e){var n=[t.unzonedRange.startMs,t.unzonedRange.endMs,e.unzonedRange.startMs,e.unzonedRange.endMs];return n.sort(i.compareNumbers),new s.default(new a.default(n[0],n[3]),t.isAllDay)},e.prototype.isSelectionFootprintAllowed=function(t){return this.component.dateProfile.validUnzonedRange.containsRange(t.unzonedRange)&&this.view.calendar.constraints.isSelectionFootprintAllowed(t)},e}(l.default);e.default=u},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(17),o=n(14),s=function(t){function e(e){var n=t.call(this,e)||this;return n.dragListener=n.buildDragListener(),n}return r.__extends(e,t),e.prototype.end=function(){this.dragListener.endInteraction()},e.prototype.bindToEl=function(t){var e=this.component,n=this.dragListener;e.bindDateHandlerToEl(t,"mousedown",function(t){e.shouldIgnoreMouse()||n.startInteraction(t)}),e.bindDateHandlerToEl(t,"touchstart",function(t){e.shouldIgnoreTouch()||n.startInteraction(t)})},e.prototype.buildDragListener=function(){var t,e=this,n=this.component,r=new i.default(n,{scroll:this.opt("dragScroll"),interactionStart:function(){t=r.origHit},hitOver:function(e,n,r){n||(t=null)},hitOut:function(){t=null},interactionEnd:function(r,i){var o;!i&&t&&(o=n.getSafeHitFootprint(t))&&e.view.triggerDayClick(o,n.getHitEl(t),r)}});return r.shouldCancelTouchScroll=!1,r.scrollAlwaysKills=!0,r},e}(o.default);e.default=s},function(t,e,n){function r(t){var e,n=[],r=[];for(e=0;e<t.length;e++)t[e].componentFootprint.isAllDay?n.push(t[e]):r.push(t[e]);return{allDay:n,timed:r}}Object.defineProperty(e,"__esModule",{value:!0});var i,o,s=n(2),a=n(0),l=n(3),u=n(4),d=n(41),c=n(43),p=n(239),h=n(66),f=function(t){function e(e,n){var r=t.call(this,e,n)||this;return r.usesMinMaxTime=!0,r.timeGrid=r.instantiateTimeGrid(),r.addChild(r.timeGrid),r.opt("allDaySlot")&&(r.dayGrid=r.instantiateDayGrid(),r.addChild(r.dayGrid)),r.scroller=new d.default({overflowX:"hidden",overflowY:"auto"}),r}return s.__extends(e,t),e.prototype.instantiateTimeGrid=function(){var t=new this.timeGridClass(this);return u.copyOwnProps(i,t),t},e.prototype.instantiateDayGrid=function(){var t=new this.dayGridClass(this);return u.copyOwnProps(o,t),t},e.prototype.renderSkeleton=function(){var t,e;this.el.addClass("fc-agenda-view").html(this.renderSkeletonHtml()),this.scroller.render(),t=this.scroller.el.addClass("fc-time-grid-container"),e=l('<div class="fc-time-grid">').appendTo(t),this.el.find(".fc-body > tr > td").append(t),this.timeGrid.headContainerEl=this.el.find(".fc-head-container"),this.timeGrid.setElement(e),this.dayGrid&&(this.dayGrid.setElement(this.el.find(".fc-day-grid")),this.dayGrid.bottomCoordPadding=this.dayGrid.el.next("hr").outerHeight())},e.prototype.unrenderSkeleton=function(){this.timeGrid.removeElement(),this.dayGrid&&this.dayGrid.removeElement(),this.scroller.destroy()},e.prototype.renderSkeletonHtml=function(){var t=this.calendar.theme;return'<table class="'+t.getClass("tableGrid")+'">'+(this.opt("columnHeader")?'<thead class="fc-head"><tr><td class="fc-head-container '+t.getClass("widgetHeader")+'">&nbsp;</td></tr></thead>':"")+'<tbody class="fc-body"><tr><td class="'+t.getClass("widgetContent")+'">'+(this.dayGrid?'<div class="fc-day-grid"></div><hr class="fc-divider '+t.getClass("widgetHeader")+'"></hr>':"")+"</td></tr></tbody></table>"},e.prototype.axisStyleAttr=function(){return null!=this.axisWidth?'style="width:'+this.axisWidth+'px"':""},e.prototype.getNowIndicatorUnit=function(){return this.timeGrid.getNowIndicatorUnit()},e.prototype.updateSize=function(e,n,r){var i,o,s;if(t.prototype.updateSize.call(this,e,n,r),this.axisWidth=u.matchCellWidths(this.el.find(".fc-axis")),!this.timeGrid.colEls)return void(n||(o=this.computeScrollerHeight(e),this.scroller.setHeight(o)));var a=this.el.find(".fc-row:not(.fc-scroller *)");this.timeGrid.bottomRuleEl.hide(),this.scroller.clear(),u.uncompensateScroll(a),this.dayGrid&&(this.dayGrid.removeSegPopover(),i=this.opt("eventLimit"),i&&"number"!=typeof i&&(i=5),i&&this.dayGrid.limitRows(i)),n||(o=this.computeScrollerHeight(e),this.scroller.setHeight(o),s=this.scroller.getScrollbarWidths(),(s.left||s.right)&&(u.compensateScroll(a,s),o=this.computeScrollerHeight(e),this.scroller.setHeight(o)),this.scroller.lockOverflow(s),this.timeGrid.getTotalSlatHeight()<o&&this.timeGrid.bottomRuleEl.show())},e.prototype.computeScrollerHeight=function(t){return t-u.subtractInnerElHeight(this.el,this.scroller.el)},e.prototype.computeInitialDateScroll=function(){var t=a.duration(this.opt("scrollTime")),e=this.timeGrid.computeTimeTop(t);return e=Math.ceil(e),e&&e++,{top:e}},e.prototype.queryDateScroll=function(){return{top:this.scroller.getScrollTop()}},e.prototype.applyDateScroll=function(t){void 0!==t.top&&this.scroller.setScrollTop(t.top)},e.prototype.getHitFootprint=function(t){return t.component.getHitFootprint(t)},e.prototype.getHitEl=function(t){return t.component.getHitEl(t)},e.prototype.executeEventRender=function(t){var e,n,r={},i={};for(e in t)n=t[e],n.getEventDef().isAllDay()?r[e]=n:i[e]=n;this.timeGrid.executeEventRender(i),this.dayGrid&&this.dayGrid.executeEventRender(r)},e.prototype.renderDrag=function(t,e,n){var i=r(t),o=!1;return o=this.timeGrid.renderDrag(i.timed,e,n),this.dayGrid&&(o=this.dayGrid.renderDrag(i.allDay,e,n)||o),o},e.prototype.renderEventResize=function(t,e,n){var i=r(t);this.timeGrid.renderEventResize(i.timed,e,n),this.dayGrid&&this.dayGrid.renderEventResize(i.allDay,e,n)},e.prototype.renderSelectionFootprint=function(t){t.isAllDay?this.dayGrid&&this.dayGrid.renderSelectionFootprint(t):this.timeGrid.renderSelectionFootprint(t)},e}(c.default);e.default=f,f.prototype.timeGridClass=p.default,f.prototype.dayGridClass=h.default,i={renderHeadIntroHtml:function(){var t,e=this.view,n=e.calendar,r=n.msToUtcMoment(this.dateProfile.renderUnzonedRange.startMs,!0);return this.opt("weekNumbers")?(t=r.format(this.opt("smallWeekFormat")),'<th class="fc-axis fc-week-number '+n.theme.getClass("widgetHeader")+'" '+e.axisStyleAttr()+">"+e.buildGotoAnchorHtml({date:r,type:"week",forceOff:this.colCnt>1},u.htmlEscape(t))+"</th>"):'<th class="fc-axis '+n.theme.getClass("widgetHeader")+'" '+e.axisStyleAttr()+"></th>"},renderBgIntroHtml:function(){var t=this.view;return'<td class="fc-axis '+t.calendar.theme.getClass("widgetContent")+'" '+t.axisStyleAttr()+"></td>"},renderIntroHtml:function(){return'<td class="fc-axis" '+this.view.axisStyleAttr()+"></td>"}},o={renderBgIntroHtml:function(){var t=this.view;return'<td class="fc-axis '+t.calendar.theme.getClass("widgetContent")+'" '+t.axisStyleAttr()+"><span>"+t.getAllDayHtml()+"</span></td>"},renderIntroHtml:function(){return'<td class="fc-axis" '+this.view.axisStyleAttr()+"></td>"}}},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(3),o=n(0),s=n(4),a=n(42),l=n(61),u=n(65),d=n(60),c=n(58),p=n(5),h=n(12),f=n(240),g=n(241),v=n(242),y=[{hours:1},{minutes:30},{minutes:15},{seconds:30},{seconds:15}],m=function(t){function e(e){var n=t.call(this,e)||this;return n.processOptions(),n}return r.__extends(e,t),e.prototype.componentFootprintToSegs=function(t){var e,n=this.sliceRangeByTimes(t.unzonedRange);for(e=0;e<n.length;e++)this.isRTL?n[e].col=this.daysPerRow-1-n[e].dayIndex:n[e].col=n[e].dayIndex;return n},e.prototype.sliceRangeByTimes=function(t){var e,n,r=[];for(n=0;n<this.daysPerRow;n++)(e=t.intersect(this.dayRanges[n]))&&r.push({startMs:e.startMs,endMs:e.endMs,isStart:e.isStart,isEnd:e.isEnd,dayIndex:n});return r},e.prototype.processOptions=function(){var t,e=this.opt("slotDuration"),n=this.opt("snapDuration");e=o.duration(e),n=n?o.duration(n):e,this.slotDuration=e,this.snapDuration=n,this.snapsPerSlot=e/n,t=this.opt("slotLabelFormat"),i.isArray(t)&&(t=t[t.length-1]),this.labelFormat=t||this.opt("smallTimeFormat"),t=this.opt("slotLabelInterval"),this.labelInterval=t?o.duration(t):this.computeLabelInterval(e)},e.prototype.computeLabelInterval=function(t){var e,n,r;for(e=y.length-1;e>=0;e--)if(n=o.duration(y[e]),r=s.divideDurationByDuration(n,t),s.isInt(r)&&r>1)return n;return o.duration(t)},e.prototype.renderDates=function(t){this.dateProfile=t,this.updateDayTable(),this.renderSlats(),this.renderColumns()},e.prototype.unrenderDates=function(){this.unrenderColumns()},e.prototype.renderSkeleton=function(){var t=this.view.calendar.theme;this.el.html('<div class="fc-bg"></div><div class="fc-slats"></div><hr class="fc-divider '+t.getClass("widgetHeader")+'" style="display:none"></hr>'),this.bottomRuleEl=this.el.find("hr")},e.prototype.renderSlats=function(){var t=this.view.calendar.theme;this.slatContainerEl=this.el.find("> .fc-slats").html('<table class="'+t.getClass("tableGrid")+'">'+this.renderSlatRowHtml()+"</table>"),this.slatEls=this.slatContainerEl.find("tr"),this.slatCoordCache=new c.default({els:this.slatEls,isVertical:!0})},e.prototype.renderSlatRowHtml=function(){for(var t,e,n,r=this.view,i=r.calendar,a=i.theme,l=this.isRTL,u=this.dateProfile,d="",c=o.duration(+u.minTime),p=o.duration(0);c<u.maxTime;)t=i.msToUtcMoment(u.renderUnzonedRange.startMs).time(c),e=s.isInt(s.divideDurationByDuration(p,this.labelInterval)),n='<td class="fc-axis fc-time '+a.getClass("widgetContent")+'" '+r.axisStyleAttr()+">"+(e?"<span>"+s.htmlEscape(t.format(this.labelFormat))+"</span>":"")+"</td>",d+='<tr data-time="'+t.format("HH:mm:ss")+'"'+(e?"":' class="fc-minor"')+">"+(l?"":n)+'<td class="'+a.getClass("widgetContent")+'"></td>'+(l?n:"")+"</tr>",c.add(this.slotDuration),p.add(this.slotDuration);return d},e.prototype.renderColumns=function(){var t=this.dateProfile,e=this.view.calendar.theme;this.dayRanges=this.dayDates.map(function(e){return new p.default(e.clone().add(t.minTime),e.clone().add(t.maxTime))}),this.headContainerEl&&this.headContainerEl.html(this.renderHeadHtml()),this.el.find("> .fc-bg").html('<table class="'+e.getClass("tableGrid")+'">'+this.renderBgTrHtml(0)+"</table>"),this.colEls=this.el.find(".fc-day, .fc-disabled-day"),this.colCoordCache=new c.default({els:this.colEls,isHorizontal:!0}),this.renderContentSkeleton()},e.prototype.unrenderColumns=function(){this.unrenderContentSkeleton()},e.prototype.renderContentSkeleton=function(){var t,e,n="";for(t=0;t<this.colCnt;t++)n+='<td><div class="fc-content-col"><div class="fc-event-container fc-helper-container"></div><div class="fc-event-container"></div><div class="fc-highlight-container"></div><div class="fc-bgevent-container"></div><div class="fc-business-container"></div></div></td>';e=this.contentSkeletonEl=i('<div class="fc-content-skeleton"><table><tr>'+n+"</tr></table></div>"),this.colContainerEls=e.find(".fc-content-col"),this.helperContainerEls=e.find(".fc-helper-container"),this.fgContainerEls=e.find(".fc-event-container:not(.fc-helper-container)"),this.bgContainerEls=e.find(".fc-bgevent-container"),this.highlightContainerEls=e.find(".fc-highlight-container"),this.businessContainerEls=e.find(".fc-business-container"),this.bookendCells(e.find("tr")),this.el.append(e)},e.prototype.unrenderContentSkeleton=function(){this.contentSkeletonEl&&(this.contentSkeletonEl.remove(),this.contentSkeletonEl=null,this.colContainerEls=null,this.helperContainerEls=null,this.fgContainerEls=null,this.bgContainerEls=null,this.highlightContainerEls=null,this.businessContainerEls=null)},e.prototype.groupSegsByCol=function(t){var e,n=[];for(e=0;e<this.colCnt;e++)n.push([]);for(e=0;e<t.length;e++)n[t[e].col].push(t[e]);return n},e.prototype.attachSegsByCol=function(t,e){var n,r,i;for(n=0;n<this.colCnt;n++)for(r=t[n],i=0;i<r.length;i++)e.eq(n).append(r[i].el)},e.prototype.getNowIndicatorUnit=function(){return"minute"},e.prototype.renderNowIndicator=function(t){if(this.colContainerEls){var e,n=this.componentFootprintToSegs(new h.default(new p.default(t,t.valueOf()+1),!1)),r=this.computeDateTop(t,t),o=[];for(e=0;e<n.length;e++)o.push(i('<div class="fc-now-indicator fc-now-indicator-line"></div>').css("top",r).appendTo(this.colContainerEls.eq(n[e].col))[0]);n.length>0&&o.push(i('<div class="fc-now-indicator fc-now-indicator-arrow"></div>').css("top",r).appendTo(this.el.find(".fc-content-skeleton"))[0]),this.nowIndicatorEls=i(o)}},e.prototype.unrenderNowIndicator=function(){this.nowIndicatorEls&&(this.nowIndicatorEls.remove(),this.nowIndicatorEls=null)},e.prototype.updateSize=function(e,n,r){t.prototype.updateSize.call(this,e,n,r),this.slatCoordCache.build(),r&&this.updateSegVerticals([].concat(this.eventRenderer.getSegs(),this.businessSegs||[]))},e.prototype.getTotalSlatHeight=function(){return this.slatContainerEl.outerHeight()},e.prototype.computeDateTop=function(t,e){return this.computeTimeTop(o.duration(t-e.clone().stripTime()))},e.prototype.computeTimeTop=function(t){var e,n,r=this.slatEls.length,i=this.dateProfile,o=(t-i.minTime)/this.slotDuration;return o=Math.max(0,o),o=Math.min(r,o),e=Math.floor(o),e=Math.min(e,r-1),n=o-e,this.slatCoordCache.getTopPosition(e)+this.slatCoordCache.getHeight(e)*n},e.prototype.updateSegVerticals=function(t){this.computeSegVerticals(t),this.assignSegVerticals(t)},e.prototype.computeSegVerticals=function(t){var e,n,r,i=this.opt("agendaEventMinHeight");for(e=0;e<t.length;e++)n=t[e],r=this.dayDates[n.dayIndex],n.top=this.computeDateTop(n.startMs,r),n.bottom=Math.max(n.top+i,this.computeDateTop(n.endMs,r))},e.prototype.assignSegVerticals=function(t){var e,n;for(e=0;e<t.length;e++)n=t[e],n.el.css(this.generateSegVerticalCss(n))},e.prototype.generateSegVerticalCss=function(t){return{top:t.top,bottom:-t.bottom}},e.prototype.prepareHits=function(){this.colCoordCache.build(),this.slatCoordCache.build()},e.prototype.releaseHits=function(){this.colCoordCache.clear()},e.prototype.queryHit=function(t,e){var n=this.snapsPerSlot,r=this.colCoordCache,i=this.slatCoordCache;if(r.isLeftInBounds(t)&&i.isTopInBounds(e)){var o=r.getHorizontalIndex(t),s=i.getVerticalIndex(e);if(null!=o&&null!=s){var a=i.getTopOffset(s),l=i.getHeight(s),u=(e-a)/l,d=Math.floor(u*n),c=s*n+d,p=a+d/n*l,h=a+(d+1)/n*l;return{col:o,snap:c,component:this,left:r.getLeftOffset(o),right:r.getRightOffset(o),top:p,bottom:h}}}},e.prototype.getHitFootprint=function(t){var e,n=this.getCellDate(0,t.col),r=this.computeSnapTime(t.snap);return n.time(r),e=n.clone().add(this.snapDuration),new h.default(new p.default(n,e),!1)},e.prototype.computeSnapTime=function(t){return o.duration(this.dateProfile.minTime+this.snapDuration*t)},e.prototype.getHitEl=function(t){return this.colEls.eq(t.col)},e.prototype.renderDrag=function(t,e,n){var r;if(e){if(t.length)return this.helperRenderer.renderEventDraggingFootprints(t,e,n),!0}else for(r=0;r<t.length;r++)this.renderHighlight(t[r].componentFootprint)},e.prototype.unrenderDrag=function(){this.unrenderHighlight(),this.helperRenderer.unrender()},e.prototype.renderEventResize=function(t,e,n){this.helperRenderer.renderEventResizingFootprints(t,e,n)},e.prototype.unrenderEventResize=function(){this.helperRenderer.unrender()},e.prototype.renderSelectionFootprint=function(t){this.opt("selectHelper")?this.helperRenderer.renderComponentFootprint(t):this.renderHighlight(t)},e.prototype.unrenderSelection=function(){this.helperRenderer.unrender(),this.unrenderHighlight()},e}(a.default);e.default=m,m.prototype.eventRendererClass=f.default,m.prototype.businessHourRendererClass=l.default,m.prototype.helperRendererClass=g.default,m.prototype.fillRendererClass=v.default,u.default.mixInto(m),d.default.mixInto(m)},function(t,e,n){function r(t){var e,n,r,i=[];for(e=0;e<t.length;e++){for(n=t[e],r=0;r<i.length&&s(n,i[r]).length;r++);n.level=r,(i[r]||(i[r]=[])).push(n)}return i}function i(t){var e,n,r,i,o;for(e=0;e<t.length;e++)for(n=t[e],r=0;r<n.length;r++)for(i=n[r],i.forwardSegs=[],o=e+1;o<t.length;o++)s(i,t[o],i.forwardSegs)}function o(t){var e,n,r=t.forwardSegs,i=0;if(void 0===t.forwardPressure){for(e=0;e<r.length;e++)n=r[e],o(n),i=Math.max(i,1+n.forwardPressure);t.forwardPressure=i}}function s(t,e,n){void 0===n&&(n=[]);for(var r=0;r<e.length;r++)a(t,e[r])&&n.push(e[r]);return n}function a(t,e){return t.bottom>e.top&&t.top<e.bottom}Object.defineProperty(e,"__esModule",{value:!0});var l=n(2),u=n(4),d=n(44),c=function(t){function e(e,n){var r=t.call(this,e,n)||this;return r.timeGrid=e,r}return l.__extends(e,t),e.prototype.renderFgSegs=function(t){this.renderFgSegsIntoContainers(t,this.timeGrid.fgContainerEls)},e.prototype.renderFgSegsIntoContainers=function(t,e){var n,r;for(n=this.timeGrid.groupSegsByCol(t),r=0;r<this.timeGrid.colCnt;r++)this.updateFgSegCoords(n[r]);this.timeGrid.attachSegsByCol(n,e)},e.prototype.unrenderFgSegs=function(){this.fgSegs&&this.fgSegs.forEach(function(t){t.el.remove()})},e.prototype.computeEventTimeFormat=function(){return this.opt("noMeridiemTimeFormat")},e.prototype.computeDisplayEventEnd=function(){return!0},e.prototype.fgSegHtml=function(t,e){
var n,r,i,o=this.view,s=o.calendar,a=t.footprint.componentFootprint,l=a.isAllDay,d=t.footprint.eventDef,c=o.isEventDefDraggable(d),p=!e&&t.isStart&&o.isEventDefResizableFromStart(d),h=!e&&t.isEnd&&o.isEventDefResizableFromEnd(d),f=this.getSegClasses(t,c,p||h),g=u.cssToStr(this.getSkinCss(d));if(f.unshift("fc-time-grid-event","fc-v-event"),o.isMultiDayRange(a.unzonedRange)){if(t.isStart||t.isEnd){var v=s.msToMoment(t.startMs),y=s.msToMoment(t.endMs);n=this._getTimeText(v,y,l),r=this._getTimeText(v,y,l,"LT"),i=this._getTimeText(v,y,l,null,!1)}}else n=this.getTimeText(t.footprint),r=this.getTimeText(t.footprint,"LT"),i=this.getTimeText(t.footprint,null,!1);return'<a class="'+f.join(" ")+'"'+(d.url?' href="'+u.htmlEscape(d.url)+'"':"")+(g?' style="'+g+'"':"")+'><div class="fc-content">'+(n?'<div class="fc-time" data-start="'+u.htmlEscape(i)+'" data-full="'+u.htmlEscape(r)+'"><span>'+u.htmlEscape(n)+"</span></div>":"")+(d.title?'<div class="fc-title">'+u.htmlEscape(d.title)+"</div>":"")+'</div><div class="fc-bg"></div>'+(h?'<div class="fc-resizer fc-end-resizer"></div>':"")+"</a>"},e.prototype.updateFgSegCoords=function(t){this.timeGrid.computeSegVerticals(t),this.computeFgSegHorizontals(t),this.timeGrid.assignSegVerticals(t),this.assignFgSegHorizontals(t)},e.prototype.computeFgSegHorizontals=function(t){var e,n,s;if(this.sortEventSegs(t),e=r(t),i(e),n=e[0]){for(s=0;s<n.length;s++)o(n[s]);for(s=0;s<n.length;s++)this.computeFgSegForwardBack(n[s],0,0)}},e.prototype.computeFgSegForwardBack=function(t,e,n){var r,i=t.forwardSegs;if(void 0===t.forwardCoord)for(i.length?(this.sortForwardSegs(i),this.computeFgSegForwardBack(i[0],e+1,n),t.forwardCoord=i[0].backwardCoord):t.forwardCoord=1,t.backwardCoord=t.forwardCoord-(t.forwardCoord-n)/(e+1),r=0;r<i.length;r++)this.computeFgSegForwardBack(i[r],0,t.forwardCoord)},e.prototype.sortForwardSegs=function(t){t.sort(u.proxy(this,"compareForwardSegs"))},e.prototype.compareForwardSegs=function(t,e){return e.forwardPressure-t.forwardPressure||(t.backwardCoord||0)-(e.backwardCoord||0)||this.compareEventSegs(t,e)},e.prototype.assignFgSegHorizontals=function(t){var e,n;for(e=0;e<t.length;e++)n=t[e],n.el.css(this.generateFgSegHorizontalCss(n)),n.footprint.eventDef.title&&n.bottom-n.top<30&&n.el.addClass("fc-short")},e.prototype.generateFgSegHorizontalCss=function(t){var e,n,r=this.opt("slotEventOverlap"),i=t.backwardCoord,o=t.forwardCoord,s=this.timeGrid.generateSegVerticalCss(t),a=this.timeGrid.isRTL;return r&&(o=Math.min(1,i+2*(o-i))),a?(e=1-o,n=i):(e=i,n=1-o),s.zIndex=t.level+1,s.left=100*e+"%",s.right=100*n+"%",r&&t.forwardPressure&&(s[a?"marginLeft":"marginRight"]=20),s},e}(d.default);e.default=c},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(3),o=n(63),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e.prototype.renderSegs=function(t,e){var n,r,o,s=[];for(this.eventRenderer.renderFgSegsIntoContainers(t,this.component.helperContainerEls),n=0;n<t.length;n++)r=t[n],e&&e.col===r.col&&(o=e.el,r.el.css({left:o.css("left"),right:o.css("right"),"margin-left":o.css("margin-left"),"margin-right":o.css("margin-right")})),s.push(r.el[0]);return i(s)},e}(o.default);e.default=s},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(62),o=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e.prototype.attachSegEls=function(t,e){var n,r=this.component;return"bgEvent"===t?n=r.bgContainerEls:"businessHours"===t?n=r.businessContainerEls:"highlight"===t&&(n=r.highlightContainerEls),r.updateSegVerticals(e),r.attachSegsByCol(r.groupSegsByCol(e),n),e.map(function(t){return t.el[0]})},e}(i.default);e.default=o},function(t,e,n){function r(t,e){var n,r;for(n=0;n<e.length;n++)if(r=e[n],r.leftCol<=t.rightCol&&r.rightCol>=t.leftCol)return!0;return!1}function i(t,e){return t.leftCol-e.leftCol}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),s=n(3),a=n(4),l=n(44),u=function(t){function e(e,n){var r=t.call(this,e,n)||this;return r.dayGrid=e,r}return o.__extends(e,t),e.prototype.renderBgRanges=function(e){e=s.grep(e,function(t){return t.eventDef.isAllDay()}),t.prototype.renderBgRanges.call(this,e)},e.prototype.renderFgSegs=function(t){var e=this.rowStructs=this.renderSegRows(t);this.dayGrid.rowEls.each(function(t,n){s(n).find(".fc-content-skeleton > table").append(e[t].tbodyEl)})},e.prototype.unrenderFgSegs=function(){for(var t,e=this.rowStructs||[];t=e.pop();)t.tbodyEl.remove();this.rowStructs=null},e.prototype.renderSegRows=function(t){var e,n,r=[];for(e=this.groupSegRows(t),n=0;n<e.length;n++)r.push(this.renderSegRow(n,e[n]));return r},e.prototype.renderSegRow=function(t,e){function n(t){for(;o<t;)d=(y[r-1]||[])[o],d?d.attr("rowspan",parseInt(d.attr("rowspan")||1,10)+1):(d=s("<td>"),a.append(d)),v[r][o]=d,y[r][o]=d,o++}var r,i,o,a,l,u,d,c=this.dayGrid.colCnt,p=this.buildSegLevels(e),h=Math.max(1,p.length),f=s("<tbody>"),g=[],v=[],y=[];for(r=0;r<h;r++){if(i=p[r],o=0,a=s("<tr>"),g.push([]),v.push([]),y.push([]),i)for(l=0;l<i.length;l++){for(u=i[l],n(u.leftCol),d=s('<td class="fc-event-container">').append(u.el),u.leftCol!==u.rightCol?d.attr("colspan",u.rightCol-u.leftCol+1):y[r][o]=d;o<=u.rightCol;)v[r][o]=d,g[r][o]=u,o++;a.append(d)}n(c),this.dayGrid.bookendCells(a),f.append(a)}return{row:t,tbodyEl:f,cellMatrix:v,segMatrix:g,segLevels:p,segs:e}},e.prototype.buildSegLevels=function(t){var e,n,o,s=[];for(this.sortEventSegs(t),e=0;e<t.length;e++){for(n=t[e],o=0;o<s.length&&r(n,s[o]);o++);n.level=o,(s[o]||(s[o]=[])).push(n)}for(o=0;o<s.length;o++)s[o].sort(i);return s},e.prototype.groupSegRows=function(t){var e,n=[];for(e=0;e<this.dayGrid.rowCnt;e++)n.push([]);for(e=0;e<t.length;e++)n[t[e].row].push(t[e]);return n},e.prototype.computeEventTimeFormat=function(){return this.opt("extraSmallTimeFormat")},e.prototype.computeDisplayEventEnd=function(){return 1===this.dayGrid.colCnt},e.prototype.fgSegHtml=function(t,e){var n,r,i=this.view,o=t.footprint.eventDef,s=t.footprint.componentFootprint.isAllDay,l=i.isEventDefDraggable(o),u=!e&&s&&t.isStart&&i.isEventDefResizableFromStart(o),d=!e&&s&&t.isEnd&&i.isEventDefResizableFromEnd(o),c=this.getSegClasses(t,l,u||d),p=a.cssToStr(this.getSkinCss(o)),h="";return c.unshift("fc-day-grid-event","fc-h-event"),t.isStart&&(n=this.getTimeText(t.footprint))&&(h='<span class="fc-time">'+a.htmlEscape(n)+"</span>"),r='<span class="fc-title">'+(a.htmlEscape(o.title||"")||"&nbsp;")+"</span>",'<a class="'+c.join(" ")+'"'+(o.url?' href="'+a.htmlEscape(o.url)+'"':"")+(p?' style="'+p+'"':"")+'><div class="fc-content">'+(this.dayGrid.isRTL?r+" "+h:h+" "+r)+"</div>"+(u?'<div class="fc-resizer fc-start-resizer"></div>':"")+(d?'<div class="fc-resizer fc-end-resizer"></div>':"")+"</a>"},e}(l.default);e.default=u},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(3),o=n(63),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e.prototype.renderSegs=function(t,e){var n,r=[];return n=this.eventRenderer.renderSegRows(t),this.component.rowEls.each(function(t,o){var s,a,l=i(o),u=i('<div class="fc-helper-skeleton"><table></table></div>');e&&e.row===t?a=e.el.position().top:(s=l.find(".fc-content-skeleton tbody"),s.length||(s=l.find(".fc-content-skeleton table")),a=s.position().top),u.css("top",a).find("table").append(n[t].tbodyEl),l.append(u),r.push(u[0])}),i(r)},e}(o.default);e.default=s},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(3),o=n(62),s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.fillSegTag="td",e}return r.__extends(e,t),e.prototype.attachSegEls=function(t,e){var n,r,i,o=[];for(n=0;n<e.length;n++)r=e[n],i=this.renderFillRow(t,r),this.component.rowEls.eq(r.row).append(i),o.push(i[0]);return o},e.prototype.renderFillRow=function(t,e){var n,r,o,s=this.component.colCnt,a=e.leftCol,l=e.rightCol+1;return n="businessHours"===t?"bgevent":t.toLowerCase(),r=i('<div class="fc-'+n+'-skeleton"><table><tr></tr></table></div>'),o=r.find("tr"),a>0&&o.append(new Array(a+1).join("<td></td>")),o.append(e.el.attr("colspan",l-a)),l<s&&o.append(new Array(s-l+1).join("<td></td>")),this.component.bookendCells(o),r},e}(o.default);e.default=s},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(0),o=n(4),s=n(67),a=n(247),l=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e.prototype.setGridHeight=function(t,e){e&&(t*=this.dayGrid.rowCnt/6),o.distributeHeight(this.dayGrid.rowEls,t,!e)},e.prototype.isDateInOtherMonth=function(t,e){return t.month()!==i.utc(e.currentUnzonedRange.startMs).month()},e}(s.default);e.default=l,l.prototype.dateProfileGeneratorClass=a.default},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(68),o=n(5),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e.prototype.buildRenderRange=function(e,n,r){var i,s=t.prototype.buildRenderRange.call(this,e,n,r),a=this.msToUtcMoment(s.startMs,r),l=this.msToUtcMoment(s.endMs,r);return this.opt("fixedWeekCount")&&(i=Math.ceil(l.diff(a,"weeks",!0)),l.add(6-i,"weeks")),new o.default(a,l)},e}(i.default);e.default=s},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(3),o=n(4),s=n(5),a=n(43),l=n(41),u=n(249),d=n(250),c=function(t){function e(e,n){var r=t.call(this,e,n)||this;return r.segSelector=".fc-list-item",r.scroller=new l.default({overflowX:"hidden",overflowY:"auto"}),r}return r.__extends(e,t),e.prototype.renderSkeleton=function(){this.el.addClass("fc-list-view "+this.calendar.theme.getClass("listView")),this.scroller.render(),this.scroller.el.appendTo(this.el),this.contentEl=this.scroller.scrollEl},e.prototype.unrenderSkeleton=function(){this.scroller.destroy()},e.prototype.updateSize=function(e,n,r){t.prototype.updateSize.call(this,e,n,r),this.scroller.clear(),n||this.scroller.setHeight(this.computeScrollerHeight(e))},e.prototype.computeScrollerHeight=function(t){return t-o.subtractInnerElHeight(this.el,this.scroller.el)},e.prototype.renderDates=function(t){for(var e=this.calendar,n=e.msToUtcMoment(t.renderUnzonedRange.startMs,!0),r=e.msToUtcMoment(t.renderUnzonedRange.endMs,!0),i=[],o=[];n<r;)i.push(n.clone()),o.push(new s.default(n,n.clone().add(1,"day"))),n.add(1,"day");this.dayDates=i,this.dayRanges=o},e.prototype.componentFootprintToSegs=function(t){var e,n,r,i=this.dayRanges,o=[];for(e=0;e<i.length;e++)if((n=t.unzonedRange.intersect(i[e]))&&(r={startMs:n.startMs,endMs:n.endMs,isStart:n.isStart,isEnd:n.isEnd,dayIndex:e},o.push(r),!r.isEnd&&!t.isAllDay&&e+1<i.length&&t.unzonedRange.endMs<i[e+1].startMs+this.nextDayThreshold)){r.endMs=t.unzonedRange.endMs,r.isEnd=!0;break}return o},e.prototype.renderEmptyMessage=function(){this.contentEl.html('<div class="fc-list-empty-wrap2"><div class="fc-list-empty-wrap1"><div class="fc-list-empty">'+o.htmlEscape(this.opt("noEventsMessage"))+"</div></div></div>")},e.prototype.renderSegList=function(t){var e,n,r,o=this.groupSegsByDay(t),s=i('<table class="fc-list-table '+this.calendar.theme.getClass("tableList")+'"><tbody></tbody></table>'),a=s.find("tbody");for(e=0;e<o.length;e++)if(n=o[e])for(a.append(this.dayHeaderHtml(this.dayDates[e])),this.eventRenderer.sortEventSegs(n),r=0;r<n.length;r++)a.append(n[r].el);this.contentEl.empty().append(s)},e.prototype.groupSegsByDay=function(t){var e,n,r=[];for(e=0;e<t.length;e++)n=t[e],(r[n.dayIndex]||(r[n.dayIndex]=[])).push(n);return r},e.prototype.dayHeaderHtml=function(t){var e=this.opt("listDayFormat"),n=this.opt("listDayAltFormat");return'<tr class="fc-list-heading" data-date="'+t.format("YYYY-MM-DD")+'"><td class="'+(this.calendar.theme.getClass("tableListHeading")||this.calendar.theme.getClass("widgetHeader"))+'" colspan="3">'+(e?this.buildGotoAnchorHtml(t,{class:"fc-list-heading-main"},o.htmlEscape(t.format(e))):"")+(n?this.buildGotoAnchorHtml(t,{class:"fc-list-heading-alt"},o.htmlEscape(t.format(n))):"")+"</td></tr>"},e}(a.default);e.default=c,c.prototype.eventRendererClass=u.default,c.prototype.eventPointingClass=d.default},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(4),o=n(44),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e.prototype.renderFgSegs=function(t){t.length?this.component.renderSegList(t):this.component.renderEmptyMessage()},e.prototype.fgSegHtml=function(t){var e,n=this.view,r=n.calendar,o=r.theme,s=t.footprint,a=s.eventDef,l=s.componentFootprint,u=a.url,d=["fc-list-item"].concat(this.getClasses(a)),c=this.getBgColor(a);return e=l.isAllDay?n.getAllDayHtml():n.isMultiDayRange(l.unzonedRange)?t.isStart||t.isEnd?i.htmlEscape(this._getTimeText(r.msToMoment(t.startMs),r.msToMoment(t.endMs),l.isAllDay)):n.getAllDayHtml():i.htmlEscape(this.getTimeText(s)),u&&d.push("fc-has-url"),'<tr class="'+d.join(" ")+'">'+(this.displayEventTime?'<td class="fc-list-item-time '+o.getClass("widgetContent")+'">'+(e||"")+"</td>":"")+'<td class="fc-list-item-marker '+o.getClass("widgetContent")+'"><span class="fc-event-dot"'+(c?' style="background-color:'+c+'"':"")+'></span></td><td class="fc-list-item-title '+o.getClass("widgetContent")+'"><a'+(u?' href="'+i.htmlEscape(u)+'"':"")+">"+i.htmlEscape(a.title||"")+"</a></td></tr>"},e.prototype.computeEventTimeFormat=function(){return this.opt("mediumTimeFormat")},e}(o.default);e.default=s},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(3),o=n(64),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e.prototype.handleClick=function(e,n){var r;t.prototype.handleClick.call(this,e,n),i(n.target).closest("a[href]").length||(r=e.footprint.eventDef.url)&&!n.isDefaultPrevented()&&(window.location.href=r)},e}(o.default);e.default=s},,,,,,function(t,e,n){var r=n(3),i=n(18),o=n(4),s=n(232);n(11),n(49),n(260),n(261),n(264),n(265),n(266),n(267),r.fullCalendar=i,r.fn.fullCalendar=function(t){var e=Array.prototype.slice.call(arguments,1),n=this;return this.each(function(i,a){var l,u=r(a),d=u.data("fullCalendar");"string"==typeof t?"getCalendar"===t?i||(n=d):"destroy"===t?d&&(d.destroy(),u.removeData("fullCalendar")):d?r.isFunction(d[t])?(l=d[t].apply(d,e),i||(n=l),"destroy"===t&&u.removeData("fullCalendar")):o.warn("'"+t+"' is an unknown FullCalendar method."):o.warn("Attempting to call a FullCalendar method on an element with no calendar."):d||(d=new s.default(u,t),u.data("fullCalendar",d),d.render())}),n},t.exports=i},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(3),i=n(4),o=function(){function t(t,e){this.el=null,this.viewsWithButtons=[],this.calendar=t,this.toolbarOptions=e}return t.prototype.setToolbarOptions=function(t){this.toolbarOptions=t},t.prototype.render=function(){var t=this.toolbarOptions.layout,e=this.el;t?(e?e.empty():e=this.el=r("<div class='fc-toolbar "+this.toolbarOptions.extraClasses+"'>"),e.append(this.renderSection("left")).append(this.renderSection("right")).append(this.renderSection("center")).append('<div class="fc-clear"></div>')):this.removeElement()},t.prototype.removeElement=function(){this.el&&(this.el.remove(),this.el=null)},t.prototype.renderSection=function(t){var e=this,n=this.calendar,o=n.theme,s=n.optionsManager,a=n.viewSpecManager,l=r('<div class="fc-'+t+'">'),u=this.toolbarOptions.layout[t],d=s.get("customButtons")||{},c=s.overrides.buttonText||{},p=s.get("buttonText")||{};return u&&r.each(u.split(" "),function(t,s){var u,h=r(),f=!0;r.each(s.split(","),function(t,s){var l,u,g,v,y,m,b,w,D;"title"===s?(h=h.add(r("<h2>&nbsp;</h2>")),f=!1):((l=d[s])?(g=function(t){l.click&&l.click.call(w[0],t)},(v=o.getCustomButtonIconClass(l))||(v=o.getIconClass(s))||(y=l.text)):(u=a.getViewSpec(s))?(e.viewsWithButtons.push(s),g=function(){n.changeView(s)},(y=u.buttonTextOverride)||(v=o.getIconClass(s))||(y=u.buttonTextDefault)):n[s]&&(g=function(){n[s]()},(y=c[s])||(v=o.getIconClass(s))||(y=p[s])),g&&(b=["fc-"+s+"-button",o.getClass("button"),o.getClass("stateDefault")],y?(m=i.htmlEscape(y),D=""):v&&(m="<span class='"+v+"'></span>",D=' aria-label="'+s+'"'),w=r('<button type="button" class="'+b.join(" ")+'"'+D+">"+m+"</button>").click(function(t){w.hasClass(o.getClass("stateDisabled"))||(g(t),(w.hasClass(o.getClass("stateActive"))||w.hasClass(o.getClass("stateDisabled")))&&w.removeClass(o.getClass("stateHover")))}).mousedown(function(){w.not("."+o.getClass("stateActive")).not("."+o.getClass("stateDisabled")).addClass(o.getClass("stateDown"))}).mouseup(function(){w.removeClass(o.getClass("stateDown"))}).hover(function(){w.not("."+o.getClass("stateActive")).not("."+o.getClass("stateDisabled")).addClass(o.getClass("stateHover"))},function(){w.removeClass(o.getClass("stateHover")).removeClass(o.getClass("stateDown"))}),h=h.add(w)))}),f&&h.first().addClass(o.getClass("cornerLeft")).end().last().addClass(o.getClass("cornerRight")).end(),h.length>1?(u=r("<div>"),f&&u.addClass(o.getClass("buttonGroup")),u.append(h),l.append(u)):l.append(h)}),l},t.prototype.updateTitle=function(t){this.el&&this.el.find("h2").text(t)},t.prototype.activateButton=function(t){this.el&&this.el.find(".fc-"+t+"-button").addClass(this.calendar.theme.getClass("stateActive"))},t.prototype.deactivateButton=function(t){this.el&&this.el.find(".fc-"+t+"-button").removeClass(this.calendar.theme.getClass("stateActive"))},t.prototype.disableButton=function(t){this.el&&this.el.find(".fc-"+t+"-button").prop("disabled",!0).addClass(this.calendar.theme.getClass("stateDisabled"))},t.prototype.enableButton=function(t){this.el&&this.el.find(".fc-"+t+"-button").prop("disabled",!1).removeClass(this.calendar.theme.getClass("stateDisabled"))},t.prototype.getViewsWithButtons=function(){return this.viewsWithButtons},t}();e.default=o},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(3),o=n(4),s=n(33),a=n(32),l=n(51),u=function(t){function e(e,n){var r=t.call(this)||this;return r._calendar=e,r.overrides=i.extend({},n),r.dynamicOverrides={},r.compute(),r}return r.__extends(e,t),e.prototype.add=function(t){var e,n=0;this.recordOverrides(t);for(e in t)n++;if(1===n){if("height"===e||"contentHeight"===e||"aspectRatio"===e)return void this._calendar.updateViewSize(!0);if("defaultDate"===e)return;if("businessHours"===e)return;if(/^(event|select)(Overlap|Constraint|Allow)$/.test(e))return;if("timezone"===e)return void this._calendar.view.flash("initialEvents")}this._calendar.renderHeader(),this._calendar.renderFooter(),this._calendar.viewsByType={},this._calendar.reinitView()},e.prototype.compute=function(){var t,e,n,r,i;t=o.firstDefined(this.dynamicOverrides.locale,this.overrides.locale),e=a.localeOptionHash[t],e||(t=s.globalDefaults.locale,e=a.localeOptionHash[t]||{}),n=o.firstDefined(this.dynamicOverrides.isRTL,this.overrides.isRTL,e.isRTL,s.globalDefaults.isRTL),r=n?s.rtlDefaults:{},this.dirDefaults=r,this.localeDefaults=e,i=s.mergeOptions([s.globalDefaults,r,e,this.overrides,this.dynamicOverrides]),a.populateInstanceComputableOptions(i),this.reset(i)},e.prototype.recordOverrides=function(t){var e;for(e in t)this.dynamicOverrides[e]=t[e];this._calendar.viewSpecManager.clearCache(),this.compute()},e}(l.default);e.default=u},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),i=n(3),o=n(24),s=n(4),a=n(33),l=n(32),u=function(){function t(t,e){this.optionsManager=t,this._calendar=e,this.clearCache()}return t.prototype.clearCache=function(){this.viewSpecCache={}},t.prototype.getViewSpec=function(t){var e=this.viewSpecCache;return e[t]||(e[t]=this.buildViewSpec(t))},t.prototype.getUnitViewSpec=function(t){var e,n,r;if(-1!==i.inArray(t,s.unitsDesc))for(e=this._calendar.header.getViewsWithButtons(),i.each(o.viewHash,function(t){e.push(t)}),n=0;n<e.length;n++)if((r=this.getViewSpec(e[n]))&&r.singleUnit===t)return r},t.prototype.buildViewSpec=function(t){for(var e,n,i,l,u,d=this.optionsManager.overrides.views||{},c=[],p=[],h=[],f=t;f;)e=o.viewHash[f],n=d[f],f=null,"function"==typeof e&&(e={class:e}),e&&(c.unshift(e),p.unshift(e.defaults||{}),i=i||e.duration,f=f||e.type),n&&(h.unshift(n),i=i||n.duration,f=f||n.type);return e=s.mergeProps(c),e.type=t,!!e.class&&(i=i||this.optionsManager.dynamicOverrides.duration||this.optionsManager.overrides.duration,i&&(l=r.duration(i),l.valueOf()&&(u=s.computeDurationGreatestUnit(l,i),e.duration=l,e.durationUnit=u,1===l.as(u)&&(e.singleUnit=u,h.unshift(d[u]||{})))),e.defaults=a.mergeOptions(p),e.overrides=a.mergeOptions(h),this.buildViewSpecOptions(e),this.buildViewSpecButtonText(e,t),e)},t.prototype.buildViewSpecOptions=function(t){var e=this.optionsManager;t.options=a.mergeOptions([a.globalDefaults,t.defaults,e.dirDefaults,e.localeDefaults,e.overrides,t.overrides,e.dynamicOverrides]),l.populateInstanceComputableOptions(t.options)},t.prototype.buildViewSpecButtonText=function(t,e){function n(n){var r=n.buttonText||{};return r[e]||(t.buttonTextKey?r[t.buttonTextKey]:null)||(t.singleUnit?r[t.singleUnit]:null)}var r=this.optionsManager;t.buttonTextOverride=n(r.dynamicOverrides)||n(r.overrides)||t.overrides.buttonText,t.buttonTextDefault=n(r.localeDefaults)||n(r.dirDefaults)||t.defaults.buttonText||n(a.globalDefaults)||(t.duration?this._calendar.humanizeDuration(t.duration):null)||e},t}();e.default=u},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(38),i=n(56),o=n(223),s=n(224);r.default.registerClass(i.default),r.default.registerClass(o.default),r.default.registerClass(s.default)},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(57),i=n(221),o=n(222),s=n(262),a=n(263);r.defineThemeSystem("standard",i.default),r.defineThemeSystem("jquery-ui",o.default),r.defineThemeSystem("bootstrap3",s.default),r.defineThemeSystem("bootstrap4",a.default)},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(22),o=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e}(i.default);e.default=o,o.prototype.classes={widget:"fc-bootstrap3",tableGrid:"table-bordered",tableList:"table",tableListHeading:"active",buttonGroup:"btn-group",button:"btn btn-default",stateActive:"active",stateDisabled:"disabled",today:"alert alert-info",popover:"panel panel-default",popoverHeader:"panel-heading",popoverContent:"panel-body",headerRow:"panel-default",dayRow:"panel-default",listView:"panel panel-default"},o.prototype.baseIconClass="glyphicon",o.prototype.iconClasses={close:"glyphicon-remove",prev:"glyphicon-chevron-left",next:"glyphicon-chevron-right",prevYear:"glyphicon-backward",nextYear:"glyphicon-forward"},o.prototype.iconOverrideOption="bootstrapGlyphicons",o.prototype.iconOverrideCustomButtonOption="bootstrapGlyphicon",o.prototype.iconOverridePrefix="glyphicon-"},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(22),o=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e}(i.default);e.default=o,o.prototype.classes={widget:"fc-bootstrap4",tableGrid:"table-bordered",tableList:"table",tableListHeading:"table-active",buttonGroup:"btn-group",button:"btn btn-primary",stateActive:"active",stateDisabled:"disabled",today:"alert alert-info",popover:"card card-primary",popoverHeader:"card-header",popoverContent:"card-body",headerRow:"table-bordered",dayRow:"table-bordered",listView:"card card-primary"},o.prototype.baseIconClass="fa",o.prototype.iconClasses={close:"fa-times",prev:"fa-chevron-left",next:"fa-chevron-right",prevYear:"fa-angle-double-left",nextYear:"fa-angle-double-right"},o.prototype.iconOverrideOption="bootstrapFontAwesome",o.prototype.iconOverrideCustomButtonOption="bootstrapFontAwesome",o.prototype.iconOverridePrefix="fa-"},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(24),i=n(67),o=n(246);r.defineView("basic",{class:i.default}),r.defineView("basicDay",{type:"basic",duration:{days:1}}),r.defineView("basicWeek",{type:"basic",duration:{weeks:1}}),r.defineView("month",{class:o.default,duration:{months:1},defaults:{fixedWeekCount:!0}})},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(24),i=n(238);r.defineView("agenda",{class:i.default,defaults:{allDaySlot:!0,slotDuration:"00:30:00",slotEventOverlap:!0}}),r.defineView("agendaDay",{type:"agenda",duration:{days:1}}),r.defineView("agendaWeek",{type:"agenda",duration:{weeks:1}})},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(24),i=n(248);r.defineView("list",{class:i.default,buttonTextKey:"list",defaults:{buttonText:"list",listDayFormat:"LL",noEventsMessage:TextUtils.i18n('CALENDARWEBCLIENT/INFO_NO_EVENTS_TO_DISPLAY')}}),r.defineView("listDay",{type:"list",duration:{days:1},defaults:{listDayFormat:"dddd"}}),r.defineView("listWeek",{type:"list",duration:{weeks:1},defaults:{listDayFormat:"dddd",listDayAltFormat:"LL"}}),r.defineView("listMonth",{type:"list",duration:{month:1},defaults:{listDayAltFormat:"dddd"}}),r.defineView("listYear",{type:"list",duration:{year:1},defaults:{listDayAltFormat:"dddd"}})},function(t,e){Object.defineProperty(e,"__esModule",{value:!0})}])});

/***/ }),

/***/ "Ttfz":
/*!************************************************************************!*\
  !*** ./modules/CalendarWebclient/js/views/CalendarSettingsFormView.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	
	UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV"),
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),
	
	CalendarUtils = __webpack_require__(/*! modules/CalendarWebclient/js/utils/Calendar.js */ "nwS3"),
	
	CalendarCache = __webpack_require__(/*! modules/CalendarWebclient/js/Cache.js */ "exyt"),
	Settings = __webpack_require__(/*! modules/CalendarWebclient/js/Settings.js */ "KvAJ")
;

function GetClosestValue(aTimes, sValue)
{
	var
		oTime = _.find(aTimes, function (oTmpTime) {
			return oTmpTime.value === sValue;
		})
	;
	return (oTime || !aTimes[0]) ? sValue : aTimes[0].value;
}

/**
 * @constructor
 */
function CCalendarSettingsFormView()
{
	CAbstractSettingsFormView.call(this, Settings.ServerModuleName);

	this.availableTimes = ko.observableArray(CalendarUtils.getTimeListStepHour((UserSettings.timeFormat() !== Enums.TimeFormat.F24) ? 'hh:mm A' : 'HH:mm'));
	UserSettings.timeFormat.subscribe(function () {
		this.availableTimes(CalendarUtils.getTimeListStepHour((UserSettings.timeFormat() !== Enums.TimeFormat.F24) ? 'hh:mm A' : 'HH:mm'));
	}, this);

	/* Editable fields */
	this.showWeekends = ko.observable(Settings.HighlightWorkingDays);
	this.showWeekNumbers = ko.observable(Settings.ShowWeekNumbers);
	this.selectedWorkdayStarts = ko.observable(GetClosestValue(this.availableTimes(), Settings.WorkdayStarts));
	this.selectedWorkdayEnds = ko.observable(GetClosestValue(this.availableTimes(), Settings.WorkdayEnds));
	this.showWorkday = ko.observable(Settings.HighlightWorkingHours);
	this.weekStartsOn = ko.observable(Settings.WeekStartsOn);
	this.defaultTab = ko.observable(Settings.DefaultTab);
	this.defaultReminders = ko.observable(Settings.DefaultReminders);
	/*-- Editable fields */
	
	this.showWeekNumbersAccaptable = ko.computed(function () {
		return this.weekStartsOn() == 1
	}, this);
	this.bAllowDefaultReminders = Settings.AllowDefaultReminders;

	const reminderOptions = _.union(Settings.DefaultReminders, Settings.ReminderValuesInMinutes).map((iMinutes) => {
		const bSelected = Settings.DefaultReminders.indexOf(iMinutes) >= 0;
		return {
			'value': iMinutes,
			'label': TextUtils.i18n('CALENDARWEBCLIENT/INFO_REMINDER', {'REMINDERS': CalendarUtils.getReminderFiendlyTitle(iMinutes)}),
			'selected': ko.observable(bSelected)
		};
	});
	this.reminderOptions = ko.observableArray(reminderOptions);
	this.displayReminderSelector = ko.observable(false);

	this.selectedReminderOptions = ko.computed(function () {
		const selectedOptions = _.sortBy(this.reminderOptions().filter(option => option.selected()), 'value');
		this.defaultReminders(selectedOptions.map(option => option.value));
		this.displayReminderSelector(selectedOptions.length <= 4);

		return selectedOptions;
	}, this);
	
	this.selectedReminder = ko.observable(null);
	this.selectedReminder.subscribe(function (v) {
		const oFoundOption = this.reminderOptions().find((option)=> {
			return option.value === Types.pInt(v);
		});
		if (oFoundOption) {
			this.selectReminder(oFoundOption);
			this.selectedReminder('');
		}
	}, this);
}

_.extendOwn(CCalendarSettingsFormView.prototype, CAbstractSettingsFormView.prototype);

CCalendarSettingsFormView.prototype.ViewTemplate = 'CalendarWebclient_CalendarSettingsFormView';

CCalendarSettingsFormView.prototype.getCurrentValues = function()
{
	return [
		this.showWeekends(),
		this.showWeekNumbers(),
		this.selectedWorkdayStarts(),
		this.selectedWorkdayEnds(),
		this.showWorkday(),
		this.weekStartsOn(),
		this.defaultTab(),
		this.defaultReminders()
	];
};

CCalendarSettingsFormView.prototype.revertGlobalValues = function()
{
	this.showWeekends(Settings.HighlightWorkingDays);
	this.showWeekNumbers(Settings.ShowWeekNumbers);
	this.selectedWorkdayStarts(GetClosestValue(this.availableTimes(), Settings.WorkdayStarts));
	this.selectedWorkdayEnds(GetClosestValue(this.availableTimes(), Settings.WorkdayEnds));
	this.showWorkday(Settings.HighlightWorkingHours);
	this.weekStartsOn(Settings.WeekStartsOn);
	this.defaultTab(Settings.DefaultTab);
	this.defaultReminders(Settings.DefaultReminders);
};

CCalendarSettingsFormView.prototype.getParametersForSave = function ()
{
	return {
		'HighlightWorkingDays': this.showWeekends(),
		'HighlightWorkingHours': this.showWorkday(),
		'ShowWeekNumbers': this.showWeekNumbers(),
		'WorkdayStarts': Types.pInt(this.selectedWorkdayStarts()),
		'WorkdayEnds': Types.pInt(this.selectedWorkdayEnds()),
		'WeekStartsOn': Types.pInt(this.weekStartsOn()),
		'DefaultTab': Types.pInt(this.defaultTab()),
		'DefaultReminders': this.defaultReminders()
	};
};

/**
 * @param {Object} oParameters
 */
CCalendarSettingsFormView.prototype.applySavedValues = function (oParameters)
{
	CalendarCache.calendarSettingsChanged(true);

	Settings.update(
		oParameters.HighlightWorkingDays,
		oParameters.HighlightWorkingHours,
		oParameters.WorkdayStarts,
		oParameters.WorkdayEnds,
		oParameters.WeekStartsOn,
		oParameters.DefaultTab,
		oParameters.DefaultReminders
	);
};

CCalendarSettingsFormView.prototype.setAccessLevel = function (sEntityType, iEntityId)
{
	this.visible(sEntityType === '');
};

CCalendarSettingsFormView.prototype.selectReminder = function (oReminder) 
{
	oReminder.selected(true);
};

CCalendarSettingsFormView.prototype.removeReminder = function (oReminder) 
{
	oReminder.selected(false);
};

module.exports = new CCalendarSettingsFormView();


/***/ }),

/***/ "tenK":
/*!************************************************************!*\
  !*** ./modules/CalendarWebclient/js/views/CalendarView.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const _ = __webpack_require__(/*! underscore */ "C3HO"),
  $ = __webpack_require__(/*! jquery */ "M4cL"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  moment = __webpack_require__(/*! moment-timezone */ "R+qY")

const DateUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Date.js */ "injE"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
  Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
  App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
  Browser = __webpack_require__(/*! modules/CoreWebclient/js/Browser.js */ "dfnr"),
  CJua = __webpack_require__(/*! modules/CoreWebclient/js/CJua.js */ "qBBW"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
  UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV"),
  Pulse = __webpack_require__(/*! modules/CoreWebclient/js/Pulse.js */ "fDmo"),
  CAbstractScreenView = __webpack_require__(/*! modules/CoreWebclient/js/views/CAbstractScreenView.js */ "doeu"),
  Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
  ConfirmPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/ConfirmPopup.js */ "XeMN"),
  Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5")

const EditCalendarPopup = __webpack_require__(/*! modules/CalendarWebclient/js/popups/EditCalendarPopup.js */ "b9Gz"),
  EditEventPopup = __webpack_require__(/*! modules/CalendarWebclient/js/popups/EditEventPopup.js */ "6prR"),
  EditEventRecurrencePopup = __webpack_require__(/*! modules/CalendarWebclient/js/popups/EditEventRecurrencePopup.js */ "ZC11"),
  GetCalendarLinkPopup = __webpack_require__(/*! modules/CalendarWebclient/js/popups/GetCalendarLinkPopup.js */ "+yZ/"),
  ImportCalendarPopup = __webpack_require__(/*! modules/CalendarWebclient/js/popups/ImportCalendarPopup.js */ "QN/U"),
  SelectCalendarPopup = __webpack_require__(/*! modules/CalendarWebclient/js/popups/SelectCalendarPopup.js */ "lRUe"),
  CalendarSharePopup = __webpack_require__(/*! modules/CalendarWebclient/js/popups/CalendarSharePopup.js */ "axPU"),
  FullCalendarUtils = __webpack_require__(/*! modules/CalendarWebclient/js/utils/FullCalendar.js */ "Qb2c"),
  Ajax = __webpack_require__(/*! modules/CalendarWebclient/js/Ajax.js */ "M0Qh"),
  CalendarCache = __webpack_require__(/*! modules/CalendarWebclient/js/Cache.js */ "exyt"),
  Settings = __webpack_require__(/*! modules/CalendarWebclient/js/Settings.js */ "KvAJ"),
  CCalendarListModel = __webpack_require__(/*! modules/CalendarWebclient/js/models/CCalendarListModel.js */ "k+x/"),
  CCalendarModel = __webpack_require__(/*! modules/CalendarWebclient/js/models/CCalendarModel.js */ "nGOo")

const bMobileDevice = false

__webpack_require__(/*! jquery-ui/ui/widgets/datepicker */ "okSt")

/**
 * @constructor
 */
function CCalendarView() {
  CAbstractScreenView.call(this, 'CalendarWebclient')

  this.browserTitle = ko.observable(TextUtils.i18n('CALENDARWEBCLIENT/HEADING_BROWSER_TAB'))

  var self = this
  this.initialized = ko.observable(false)
  this.isPublic = App.isPublic()

  this.uploaderArea = ko.observable(null)
  this.bDragActive = ko.observable(false)
  this.bDragActiveComp = ko.computed(function () {
    return this.bDragActive()
  }, this)

  this.aDayNames = TextUtils.i18n('COREWEBCLIENT/LIST_DAY_NAMES').split(' ')

  this.popUpStatus = false
  this.linkRow = 0
  this.linkColumn = 0

  this.sTimeFormat = UserSettings.timeFormat() === Enums.TimeFormat.F24 ? 'HH:mm' : 'hh:mm A'
  this.dateFormatForMoment = Utils.getDateFormatForMoment(UserSettings.dateFormat())

  this.topPositionToday = ko.observable('.fc-widget-content.fc-today')
  this.loadOnce = false
  this.scrollModel = ko.observable(null)
  this.scrollHeight = 0

  this.dateTitle = ko.observable('')
  this.aMonthNames = DateUtils.getMonthNamesArray()
  this.selectedView = ko.observable('')
  this.visibleWeekdayHeader = ko.computed(function () {
    return this.selectedView() === 'month'
  }, this)
  this.selectedView.subscribe(function () {
    this.resize()
  }, this)

  this.$calendarGrid = null
  this.calendarGridDom = ko.observable(null)

  this.$datePicker = null
  this.datePickerDom = ko.observable(null)

  this.calendars = new CCalendarListModel({
    onCalendarCollectionChange: function () {
      self.refreshView()
    },
    onCalendarActiveChange: function () {
      self.refreshView()
    },
  })

  this.colors = Settings.CalendarColors

  this.busyDays = ko.observableArray([])

  this.$inlineEditedEvent = null
  this.inlineEditedEventText = null
  this.checkStarted = ko.observable(false)

  this.loaded = false

  this.startDateTime = 0
  this.endDateTime = 0
  this.needsToReload = false
  this.bTimezoneChanged = false

  UserSettings.timezone.subscribe(function () {
    this.startDateTime = 0
    this.endDateTime = 0
    this.needsToReload = true
    this.bTimezoneChanged = true
    this.getCalendars()
  }, this)

  this.calendarListClick = function (oItem) {
    oItem.active(!oItem.active())
  }
  this.currentCalendarDropdown = ko.observable(false)
  this.currentCalendarDropdownOffset = ko.observable(0)
  this.calendarDropdownToggle = function (bValue, oElement) {
    if (oElement && bValue) {
      var position = oElement.position(),
        height = oElement.outerHeight()
      self.currentCalendarDropdownOffset(Types.pInt(position.top) + height)
    }

    self.currentCalendarDropdown(bValue)
  }
  this.calendarDropdownHide = _.throttle(
    _.bind(function () {
      this.calendarDropdownToggle(false)
    }, this),
    500
  )

  this.dayNamesResizeBinding = _.throttle(_.bind(this.resize, this), 50)

  this.customscrollTop = ko.observable(0)
  this.fullcalendarOptions = {
    handleWindowResize: true,
    eventLimit: 10,
    header: false,
    editable: !this.isPublic,
    selectable: !this.isPublic,
    allDayText: TextUtils.i18n('CALENDARWEBCLIENT/LABEL_ALL_DAY'),
    dayNames: this.aDayNames,
    monthNames: this.aMonthNames,
    isRTL: UserSettings.IsRTL,
    scrollTime: moment.duration(8, 'hours'),
    forceEventDuration: true,
    defaultTimedEventDuration: '00:00:01',
    views: {
      month: {
        columnFormat: 'dddd', // Monday
      },
      week: {
        columnFormat: 'dddd D', // Monday 7
      },
      day: {
        columnFormat: 'dddd D', // Monday 7
      },
      listMonth: {
        listDayFormat: this.dateFormatForMoment
      }
    },
    displayEventEnd: {
      month: true,
      basicWeek: true,
      default: true,
    },
    select: _.bind(this.createEventFromGrid, this),
    eventClick: _.bind(this.eventClickCallback, this),
    eventDragStart: _.bind(this.onEventDragStart, this),
    eventDragStop: _.bind(this.onEventDragStop, this),
    eventResizeStart: _.bind(this.onEventResizeStart, this),
    eventResizeStop: _.bind(this.onEventResizeStop, this),
    eventDrop: _.bind(this.moveEvent, this),
    eventResize: _.bind(this.resizeEvent, this),
    eventRender: function (oEv, oEl) {
      if (Settings.AddDescriptionToTitle) {
        var oTitle = oEl.find('.fc-title')
        oTitle.html(
          '<span class="subject-title">' +
            $.trim(oEv.subject.replace(/[\n\r]/g, ' ')) +
            '</span> ' +
            '<span class="desc-title">' +
            $.trim(oEv.description.replace(/[\n\r]/g, ' ')) +
            '</span> ' +
            '<span class="loc-title">' +
            $.trim(oEv.location.replace(/[\n\r]/g, ' ')) +
            '</span>'
        )
      }

      if (oEv.isCalendarShared && oEv.isPrivate && Settings.AllowPrivateEvents) {
        oEl.css('cursor', 'default')
        // var oTitle = oEl.find('.fc-title');
        // oTitle.html('<span class="subject-title" style="opacity: 0.5">[' + TextUtils.i18n('CALENDARWEBCLIENT/LABEL_NO_EVENT_INFORMATION') + ']</span> ');
      }

      if (oEv.type === 'VTODO') {
        var content = oEl.find('.fc-content'),
          title = content.find('.fc-title'),
          completed = $(
            '<label class="custom_checkbox round"><span class="icon"></span><input type="checkbox"></label>'
          )
          // fcTime = content.find('.fc-time')
        if (oEv.status) {
          completed.addClass('checked')
          title.css('text-decoration-line', 'line-through')
        } else {
          completed.removeClass('checked')
          title.css('text-decoration-line', 'unset')
        }
        oEl.addClass('fc-custom-task')

        title.prepend(completed)

        if (oEv.isCalendarShared && oEv.isPrivate && Settings.AllowPrivateEvents) {
          completed.attr('readonly', true)
          completed.css('cursor', 'default')
        } else {
          completed.on(function (event) {
            if (oEv.status) {
              oEv.status = false
              completed.removeClass('checked')
              title.css('text-decoration-line', 'unset')
            } else {
              oEv.status = true
              completed.addClass('checked')
              title.css('text-decoration-line', 'line-through')
            }
            oEv.modified = true

            if (oEv.rrule) {
              oEv.allEvents = Enums.CalendarEditRecurrenceEvent.OnlyThisInstance
            }

            self.updateEvent(oEv)

            event.preventDefault()
            event.stopPropagation()
          })
        }
      }
    },
    eventAfterRender: _.bind(function (oEv, oEl) {}, this),
    eventAfterAllRender: _.bind(this.updateAllEvents, this),
    viewRender: _.bind(this.viewRenderCallback, this),
    events: _.bind(this.eventsSource, this),
  }

  this.revertFunction = null

  this.bAllowShare = Settings.AllowShare
  this.bAllowTasks = Settings.AllowTasks

  this.defaultViewName = ko.computed(function () {
    switch (Settings.DefaultTab) {
      case Enums.CalendarDefaultTab.List:
        return 'listWeek'
      case Enums.CalendarDefaultTab.Day:
        return 'agendaDay'
      case Enums.CalendarDefaultTab.Week:
        return 'agendaWeek'
      case Enums.CalendarDefaultTab.Month:
      default:
        return 'month'
    }
  }, this)

  this.iAutoReloadTimer = -1

  this.dragEventTrigger = false
  this.delayOnEventResult = false
  this.delayOnEventResultData = []

  this.refreshView = _.throttle(_.bind(this.refreshViewSingle, this), 100)
  this.uploadCalendarId = ko.observable('')
  this.changeFullCalendarDate = true
  this.domScrollWrapper = null
  this.hotKeysBind()

  this.viewEventRoute = null

  App.broadcastEvent('CalendarWebclient::ConstructView::after', { Name: this.ViewConstructorName, View: this })
}

_.extendOwn(CCalendarView.prototype, CAbstractScreenView.prototype)

CCalendarView.prototype.ViewTemplate = 'CalendarWebclient_CalendarView'
CCalendarView.prototype.ViewConstructorName = 'CCalendarView'

/**
 * Hot keys events
 */
CCalendarView.prototype.hotKeysBind = function () {
  var self = this
  $(document).on('keyup', function (ev) {
    var iKey = ev.keyCode
    /* Close popup "more events" if click Esc button */
    if (self.calendars.getEvents().length > 0 && self.selectedView() === 'month') {
      if (iKey === Enums.Key.Esc && self.popUpStatus) {
        /* two triggers for correct plugin working */
        $('body').trigger('click')
        /* popUpStatus has just been changed */
        if (!self.popUpStatus) {
          $('body').trigger('mousedown')
        }
      }
    }
  })
}

CCalendarView.prototype.getDateFromCurrentView = function (sDateType) {
  var oView = this.$calendarGrid.fullCalendar('getView'),
    oDate = oView && oView[sDateType] ? oView[sDateType] : null
  if (oDate && sDateType === 'end' && oView.name === 'agendaDay') {
    oDate.add(1, 'd')
  }

  return oDate && oDate['unix'] ? oView[sDateType]['unix']() : 0
}

/**
 * @param {Object} oStart
 * @param {Object} oEnd
 * @param {*} mTimezone
 * @param {Function} fCallback
 */
CCalendarView.prototype.eventsSource = function (oStart, oEnd, mTimezone, fCallback) {
  fCallback(this.calendars.getEvents(oStart, oEnd))
}

CCalendarView.prototype.changeView = function (viewName) {
  this.selectedView(viewName)
  if (viewName === 'month') {
    this.loadOnce = false
  }
  this.$calendarGrid.fullCalendar('changeView', viewName)
}

CCalendarView.prototype.recreateFullCalendar = function (viewName) {
  this.$calendarGrid.fullCalendar('destroy')
  this.$calendarGrid.fullCalendar(this.fullcalendarOptions)
  this.changeView(viewName)
}

CCalendarView.prototype.applyCalendarSettings = function () {
  this.sTimeFormat = UserSettings.timeFormat() === Enums.TimeFormat.F24 ? 'HH:mm' : 'hh:mm A'
  this.dateFormatForMoment = Utils.getDateFormatForMoment(UserSettings.dateFormat())
  this.calendarGridDom().removeClass('fc-show-weekends')
  if (Settings.HighlightWorkingDays) {
    this.calendarGridDom().addClass('fc-show-weekends')
  }

  this.fullcalendarOptions.timeFormat = this.sTimeFormat
  this.fullcalendarOptions.views.listMonth.listDayFormat = this.dateFormatForMoment
  this.fullcalendarOptions.slotLabelFormat = this.sTimeFormat
  this.fullcalendarOptions.defaultView = this.defaultViewName()
  this.fullcalendarOptions.lang = moment.locale()

  this.applyFirstDay()

  const showWeekNumbers = Settings.ShowWeekNumbers && Settings.WeekStartsOn == 1;

  this.$datePicker.datepicker('option', 'showWeek', showWeekNumbers);
	this.fullcalendarOptions.weekNumbers = showWeekNumbers;
  this.fullcalendarOptions.weekNumberTitle = TextUtils.i18n('CALENDARWEBCLIENT/LABEL_WEEK_SHORT') + ' ';
  this.fullcalendarOptions.weekNumberCalculation = 'ISO';

  this.recreateFullCalendar(this.defaultViewName())
}

CCalendarView.prototype.applyFirstDay = function () {
  var aDayNames = [],
    sFirstDay = '',
    sLastDay = ''
  if (App.getUserRole() !== Enums.UserRole.Anonymous) {
    this.fullcalendarOptions.firstDay = Settings.WeekStartsOn
  }

  _.each(this.aDayNames, function (sDayName) {
    aDayNames.push(sDayName)
  })

  switch (Settings.WeekStartsOn) {
    case 1:
      sLastDay = aDayNames.shift()
      aDayNames.push(sLastDay)
      break
    case 6:
      sFirstDay = aDayNames.pop()
      aDayNames.unshift(sFirstDay)
      break
  }

  this.$datePicker.datepicker('option', 'firstDay', Settings.WeekStartsOn)
}

CCalendarView.prototype.initDatePicker = function () {
  this.$datePicker.datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    monthNames: this.aMonthNames,
    dayNamesMin: TextUtils.i18n('COREWEBCLIENT/LIST_DAY_NAMES_MIN').split(' '),
    showWeek: false,
		weekHeader: TextUtils.i18n('CALENDARWEBCLIENT/LABEL_WEEK_SHORT'),
    nextText: '',
    prevText: '',
    onChangeMonthYear: _.bind(this.changeMonthYearFromDatePicker, this),
    onSelect: _.bind(this.selectDateFromDatePicker, this),
    beforeShowDay: _.bind(this.getDayDescription, this),
  })
}

CCalendarView.prototype.onBind = function () {
  var self = this
  this.$calendarGrid = $(this.calendarGridDom())

  this.$datePicker = $(this.datePickerDom())
  if (!this.isPublic) {
    this.initUploader()
  }
  /* Click more links */
  $('body').on('click', function (e) {
    if (self.calendars.getEvents().length > 0 && self.selectedView() === 'month') {
      if ($(e.target).hasClass('fc-more')) {
        var $this = $(e.target)
        $('.fc-more-cell.active').removeClass('active')
        $('.fc-row.fc-week.active').removeClass('active')
        $this.closest('.fc-more-cell').addClass('active')
        $this.closest('.fc-row.fc-week').addClass('active')
        var $popup = $('body').find('.fc-popover.fc-more-popover'),
          $parent = $this.closest('tr'),
          $superParent = $this.closest('.fc-day-grid'),
          indexColumn = Types.pInt($parent.find('.fc-more-cell.active').index('.fc-more-cell')),
          indexRow = Types.pInt($superParent.find('.fc-row.fc-week.active').index('.fc-row.fc-week'))
        if ($popup.length > 0) {
          self.linkRow = indexRow
          self.linkColumn = indexColumn
          self.popUpStatus = true
        } else {
          self.popUpStatus = false
          self.linkRow = 0
          self.linkColumn = 0
        }
      } else if ($(e.target).hasClass('checkstate') || $(e.target).parent().hasClass('checkstate')) {
        e.preventDefault()
      } else {
        self.popUpStatus = false
        self.linkRow = 0
        self.linkColumn = 0
      }
    }
  })
}

CCalendarView.prototype.onShow = function () {
  var bInitialized = this.initialized()
  if (!bInitialized) {
    this.initDatePicker()

    var oParent = this.$calendarGrid.parent()
    if (oParent) {
      this.fullcalendarOptions.height = oParent.height()
    }

    this.applyCalendarSettings()
    this.highlightWeekInDayPicker()
    this.initialized(true)
  }

  var sTimeFormat = UserSettings.timeFormat() === Enums.TimeFormat.F24 ? 'HH:mm' : 'hh:mm A'
  const dateFormatForMoment = Utils.getDateFormatForMoment(UserSettings.dateFormat()) 
  if (CalendarCache.calendarSettingsChanged() || this.sTimeFormat !== sTimeFormat || CalendarCache.calendarChanged() || this.dateFormatForMoment !== dateFormatForMoment) {
    if (CalendarCache.calendarSettingsChanged() || this.sTimeFormat !== sTimeFormat || this.dateFormatForMoment !== dateFormatForMoment) {
      this.applyCalendarSettings()
    }
    CalendarCache.calendarSettingsChanged(false)
    CalendarCache.calendarChanged(false)
  } else if (this.isPublic) {
    this.$calendarGrid.fullCalendar('render')
    this.applyDateTime()
  }

  this.$calendarGrid.fullCalendar()
  if (bInitialized) {
    this.getCalendars()
  }
  this.refetchEvents()
}

/**
 * @param {Array} aParams
 */
CCalendarView.prototype.onRoute = function (aParams) {
  var sCalendarId = aParams[0],
    sEventId = aParams[1],
    start = aParams[2],
    oEvent = null
  this.$calendarGrid.fullCalendar('gotoDate', moment(start))
  oEvent = this.getClientEvent(sCalendarId, sEventId)
  if (oEvent !== null) {
    this.eventClickCallback(oEvent)
  } else {
    this.viewEventRoute = {
      CalendarId: sCalendarId,
      EventId: sEventId,
    }
  }
}

CCalendarView.prototype.getClientEvent = function (sCalendarId, sEventId) {
  var oCalendar = null,
    oEvent = null,
    oEventResult = null,
    aEvents = []
  aEvents = this.$calendarGrid.fullCalendar('clientEvents', sEventId)

  if (Array.isArray(aEvents) && aEvents.length > 0) {
    oCalendar = this.calendars.getCalendarById(sCalendarId)
    if (oCalendar !== undefined) {
      oEvent = _.find(
        aEvents,
        function (oEvent) {
          return oEvent.calendarId === sCalendarId
        },
        this
      )
      if (oEvent !== undefined) {
        oEventResult = oEvent
      }
    }
  }

  return oEventResult
}

CCalendarView.prototype.applyDateTime = function () {
  FullCalendarUtils.recreateIfDateChanged(this.$calendarGrid, this.recreateFullCalendar.bind(this))
  FullCalendarUtils.setTimeline()
}

/**
 * When all event's rendered
 */
CCalendarView.prototype.updateAllEvents = function () {
  if (this.calendars.getEvents().length > 0 && this.selectedView() === 'month') {
    if (!this.loadOnce) {
      this.topPositionToday.valueHasMutated()
      this.loadOnce = true
    } else {
      this.scrollModel()['vertical'].set(this.scrollHeight)
    }

    /* open current more link */
    if (this.popUpStatus) {
      $('body')
        .find('.fc-row.fc-week')
        .eq(this.linkRow)
        .find('.fc-more-cell')
        .eq(this.linkColumn)
        .find('a.fc-more')
        .click()
    }
  }
}

/**
 * @param {Object} oView
 * @param {Object} oElement
 */
CCalendarView.prototype.viewRenderCallback = function (oView, oElement) {
  var prevDate = null,
    constDate = '01/01/1971 '
  this.changeDate()

  if (!this.loaded) {
    this.initResizing()
  }

  if (oView.name !== 'month' && Settings.HighlightWorkingHours) {
    $('.fc-slats tr').each(function () {
      $('tr .fc-time span').each(function () {
        var theValue = $(this).eq(0).text(),
          theDate = theValue !== '' ? Date.parse(constDate + theValue) : prevDate,
          rangeTimeFrom = Date.parse(constDate + Settings.WorkdayStarts + ':00'),
          rangeTimeTo = Date.parse(constDate + Settings.WorkdayEnds + ':00')
        prevDate = theDate
        if (theDate < rangeTimeFrom || theDate >= rangeTimeTo) {
          $(this).parent().parent().addClass('fc-non-working-time')
          $(this).parent().parent().next().addClass('fc-non-working-time')
        }
      })
    })
  }

  this.activateCustomScrollInDayAndWeekView()
}

CCalendarView.prototype.collectBusyDays = function () {
  var aBusyDays = [],
    oStart = null,
    oEnd = null,
    iDaysDiff = 0,
    iIndex = 0
  _.each(
    this.calendars.getEvents(),
    function (oEvent) {
      oStart = moment(oEvent.start)
      oEnd = oEvent.end ? moment(oEvent.end) : null
      if (oEvent.allDay && oEnd) {
        oEnd.subtract(1, 'days')
      }

      iDaysDiff = oEnd ? oEnd.diff(oStart, 'days') : 0
      iIndex = 0

      for (; iIndex <= iDaysDiff; iIndex++) {
        aBusyDays.push(oStart.clone().add(iIndex, 'days').toDate())
      }
    },
    this
  )

  this.busyDays(aBusyDays)
}

CCalendarView.prototype.refreshDatePicker = function () {
  var self = this

  _.defer(function () {
    self.collectBusyDays()
    self.$datePicker.datepicker('refresh')
    self.highlightWeekInDayPicker()
  })
}

/**
 * @param {Object} oDate
 */
CCalendarView.prototype.getDayDescription = function (oDate) {
  var bSelectable = true,
    oFoundBusyDay = _.find(
      this.busyDays(),
      function (oBusyDay) {
        return (
          oBusyDay.getDate() === oDate.getDate() &&
          oBusyDay.getMonth() === oDate.getMonth() &&
          oBusyDay.getYear() === oDate.getYear()
        )
      },
      this
    ),
    sDayClass = oFoundBusyDay ? 'day_with_events' : '',
    sDayTitle = ''
  return [bSelectable, sDayClass, sDayTitle]
}

CCalendarView.prototype.initResizing = function () {
  var fResize = _.throttle(_.bind(this.resize, this), 50)

  $(window).bind('resize', function (e) {
    if (e.target !== this && !Browser.ie8AndBelow) {
      return
    }

    fResize()
  })

  fResize()
}

CCalendarView.prototype.resize = function () {
  var oParent = this.$calendarGrid.parent()
  if (oParent) {
    this.$calendarGrid.fullCalendar('option', 'height', oParent.height())
  }
  this.dayNamesResize()
}

CCalendarView.prototype.dayNamesResize = function () {
  if (this.selectedView() === 'month') {
    var oDayNamesHeaderItem = $('div.weekday-header-item'),
      oFirstWeek = $('tr.fc-first td.fc-day'),
      oFirstWeekWidth = $(oFirstWeek[0]).width(),
      iIndex = 0
    if (oDayNamesHeaderItem.length === 7 && oFirstWeek.length === 7 && oFirstWeekWidth !== 0) {
      for (; iIndex < 7; iIndex++) {
        $(oDayNamesHeaderItem[iIndex]).width(oFirstWeekWidth)
      }
    }
  }
}

/**
 * @param {number} iYear
 * @param {number} iMonth
 * @param {Object} oInst
 */
CCalendarView.prototype.changeMonthYearFromDatePicker = function (iYear, iMonth, oInst) {
  if (this.changeFullCalendarDate) {
    var oDate = this.$calendarGrid.fullCalendar('getDate')
    // Date object in javascript and fullcalendar use numbers 0,1,2...11 for monthes
    // datepiker uses numbers 1,2,3...12 for monthes
    oDate.month(iMonth - 1).year(iYear)
    this.$calendarGrid.fullCalendar('gotoDate', oDate)
  }
}

/**
 * @param {string} sDate
 * @param {Object} oInst
 */
CCalendarView.prototype.selectDateFromDatePicker = function (sDate, oInst) {
  var oDate = moment(sDate, 'MM/DD/YYYY')
  this.$calendarGrid.fullCalendar('gotoDate', oDate)

  _.defer(_.bind(this.highlightWeekInDayPicker, this))
}

CCalendarView.prototype.highlightWeekInDayPicker = function () {
  var $currentDay = this.$datePicker.find('td.ui-datepicker-current-day'),
    $currentWeek = $currentDay.parent(),
    $currentMonth = this.$datePicker.find('table.ui-datepicker-calendar'),
    oView = this.$calendarGrid.fullCalendar('getView')
  switch (oView.name) {
    case 'agendaDay':
      $currentMonth.addClass('highlight_day').removeClass('highlight_week')
      break
    case 'agendaWeek':
      $currentMonth.removeClass('highlight_day').addClass('highlight_week')
      break
    default:
      $currentMonth.removeClass('highlight_day').removeClass('highlight_week')
      break
  }

  $currentWeek.addClass('current_week')
}

CCalendarView.prototype.changeDateTitle = function () {
  var oDate = this.$calendarGrid.fullCalendar('getDate').clone().locale(moment.locale()),
    oView = this.$calendarGrid.fullCalendar('getView'),
    sTitle = oDate.format('MMMM YYYY'),
    oStart = oView.intervalStart.clone().locale(moment.locale()),
    oEnd = oView.intervalEnd ? oView.intervalEnd.clone().add(-1, 'days').locale(moment.locale()) : null
  switch (oView.name) {
    case 'agendaDay':
      sTitle = oDate.format('MMMM D, YYYY')
      break
    case 'agendaWeek':
      if (oStart && oEnd) {
        sTitle = oStart.format('MMMM D, YYYY') + ' - ' + oEnd.format('MMMM D, YYYY')
      }
      break
  }

  this.dateTitle(sTitle)
}

CCalendarView.prototype.changeDate = function () {
  this.changeDateInDatePicker()
  this.changeDateTitle()
  this.getTimeLimits()
  this.getCalendars()
}

CCalendarView.prototype.changeDateInDatePicker = function () {
  var oDateMoment = this.$calendarGrid.fullCalendar('getDate')
  this.changeFullCalendarDate = false
  this.$datePicker.datepicker('setDate', oDateMoment.local().toDate())
  this.changeFullCalendarDate = true
  this.highlightWeekInDayPicker()
}

CCalendarView.prototype.activateCustomScrollInDayAndWeekView = function () {
  if (bMobileDevice) {
    return
  }

  var oView = this.$calendarGrid.fullCalendar('getView'),
    sGridType = oView.name === 'month' ? 'day' : 'time',
    oGridContainer = $('.fc-' + sGridType + '-grid-container')
  if (!oGridContainer.hasClass('scroll-inner')) {
    var oScrollWrapper = $('<div></div>')

    oGridContainer.parent().append(oScrollWrapper)
    oGridContainer.appendTo(oScrollWrapper)

    if (!oScrollWrapper.hasClass('scroll-wrap')) {
      oScrollWrapper.attr(
        'data-bind',
        'customScrollbar: {x: false, y: true, top: 0, scrollTo: topPositionToday, oScroll: scrollModel}'
      )
      oGridContainer.css({ overflow: 'hidden' }).addClass('scroll-inner')
      ko.applyBindings(this, oScrollWrapper[0])
    }

    this.domScrollWrapper = oScrollWrapper
  }
}

CCalendarView.prototype.displayToday = function () {
  this.$calendarGrid.fullCalendar('today')
}

CCalendarView.prototype.displayPrev = function () {
  this.$calendarGrid.fullCalendar('prev')
}

CCalendarView.prototype.displayNext = function () {
  this.$calendarGrid.fullCalendar('next')
}

CCalendarView.prototype.setAutoReloadTimer = function () {
  var self = this
  clearTimeout(this.iAutoReloadTimer)

  if (UserSettings.AutoRefreshIntervalMinutes > 0) {
    this.iAutoReloadTimer = setTimeout(function () {
      self.getCalendars()
    }, UserSettings.AutoRefreshIntervalMinutes * 60 * 1000)
  }
}

CCalendarView.prototype.getTimeLimits = function () {
  var iStart = this.getDateFromCurrentView('start'),
    iEnd = this.getDateFromCurrentView('end')
  if (this.startDateTime === 0 && this.endDateTime === 0) {
    this.startDateTime = iStart
    this.endDateTime = iEnd
    this.needsToReload = true
  } else if (iStart < this.startDateTime && iEnd > this.endDateTime) {
    this.startDateTime = iStart
    this.endDateTime = iEnd
    this.needsToReload = true
  } else if (iStart < this.startDateTime) {
    iEnd = this.startDateTime
    this.startDateTime = iStart
    this.needsToReload = true
  } else if (iEnd > this.endDateTime) {
    iStart = this.endDateTime
    this.endDateTime = iEnd
    this.needsToReload = true
  }
}

CCalendarView.prototype.getCalendars = function () {
  this.checkStarted(true)
  this.setCalendarGridVisibility()

  if (this.isPublic) {
    Ajax.send('GetPublicCalendar', { CalendarId: Settings.PublicCalendarId }, this.onGetCalendarsResponse, this)
  } else {
    Ajax.send('GetCalendars', null, this.onGetCalendarsResponse, this)
  }
}

/**
 * @param {Object} oResponse
 * @param {Object} oParameters
 */
CCalendarView.prototype.onGetCalendarsResponse = function (oResponse, oParameters) {
  var aCalendarIds = [],
    aNewCalendarIds = [],
    oCalendar = null,
    oClientCalendar = null
  if (this.loadOnce && this.selectedView() === 'month') {
    this.scrollHeight = this.scrollModel()['vertical'].get()
  } else {
    this.scrollHeight = 0
  }

  if (oResponse.Result) {
    this.loaded = true

    _.each(
      oResponse.Result.Calendars,
      function (oCalendarData) {
        if (!_.isEmpty(oCalendarData)) {
          oCalendar = this.calendars.parseCalendar(oCalendarData)
          aCalendarIds.push(oCalendar.id)
          oClientCalendar = this.calendars.getCalendarById(oCalendar.id)
          if (
            this.needsToReload ||
            (oClientCalendar && oClientCalendar.isSharedToAll) ||
            (oClientCalendar && oClientCalendar.sSyncToken) !== (oCalendar && oCalendar.sSyncToken)
          ) {
            oCalendar = this.calendars.parseAndAddCalendar(oCalendarData)
            if (oCalendar) {
              oCalendar.davUrl(Types.pString(oResponse.Result.ServerUrl))
              if (this.isPublic) {
                var oPublicHeaderItem = __webpack_require__(/*! modules/CalendarWebclient/js/views/PublicHeaderItem.js */ "lPkD")
                oPublicHeaderItem.linkText(oCalendar.name())
                this.browserTitle(oCalendar.name())
              }
              aNewCalendarIds.push(oCalendar.id)
            }
          }
        }
      },
      this
    )

    if (this.calendars.count() === 0 && this.isPublic && this.needsToReload) {
      this.browserTitle(TextUtils.i18n('CALENDARWEBCLIENT/INFO_NO_CALENDAR_FOUND'))
      Api.showErrorByCode(0, TextUtils.i18n('CALENDARWEBCLIENT/INFO_NO_CALENDAR_FOUND'), true)
    }

    this.needsToReload = false
    this.calendars.expunge(aCalendarIds)

    _.each(
      aCalendarIds,
      function (sCalendarId) {
        oCalendar = this.calendars.getCalendarById(sCalendarId)
        if (oCalendar && oCalendar.eventsCount() > 0) {
          oCalendar.reloadEvents()
        }
      },
      this
    )

    this.requestEvents(aNewCalendarIds)
  } else {
    this.setCalendarGridVisibility()
    this.checkStarted(false)
  }
}

/**
 * @param {Array} aCalendarIds
 */
CCalendarView.prototype.requestEvents = function (aCalendarIds) {
  var oOptions = {
    CalendarIds: aCalendarIds,
    Start: this.startDateTime,
    End: this.endDateTime,
    IsPublic: this.isPublic,
  }
  if (this.isPublic && !App.getUserId()) {
    oOptions.DefaultTimeZone = moment.tz.guess()
  }

  if (aCalendarIds.length > 0) {
    Ajax.send('GetEvents', oOptions, this.onGetEventsResponse, this)
  } else {
    this.setAutoReloadTimer()
    this.checkStarted(false)
  }
}

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CCalendarView.prototype.onGetEventsResponse = function (oResponse, oRequest) {
  if (oResponse.Result) {
    var oCalendar = null,
      oParameters = oRequest.Parameters,
      aCalendarIds = _.isArray(oParameters.CalendarIds) ? oParameters.CalendarIds : [],
      aEvents = []
    _.each(
      oResponse.Result,
      function (oEventData) {
        oCalendar = this.calendars.getCalendarById(oEventData.calendarId)
        if (oCalendar) {
          oEventData.isCalendarShared = oCalendar.isShared()
          aEvents.push(oEventData.id)
          var oEvent = oCalendar.getEvent(oEventData.id)
          if (!oEvent) {
            oCalendar.addEvent(oEventData)
          } else if (this.bTimezoneChanged || oEvent.lastModified !== oEventData.lastModified) {
            oCalendar.updateEvent(oEventData)
          }
        }
      },
      this
    )
    this.bTimezoneChanged = false

    _.each(
      aCalendarIds,
      function (sCalendarId) {
        oCalendar = this.calendars.getCalendarById(sCalendarId)
        if (oCalendar && oCalendar.eventsCount() > 0 && oCalendar.active()) {
          oCalendar.expungeEvents(aEvents, this.startDateTime, this.endDateTime, 'VEVENT')
        }
      },
      this
    )

    this.refreshView()
    if (this.viewEventRoute) {
      var oEvent = this.getClientEvent(this.viewEventRoute.CalendarId, this.viewEventRoute.EventId)
      this.viewEventRoute = false
      if (oEvent !== null) {
        this.eventClickCallback(oEvent)
      }
    }
  }

  this.setAutoReloadTimer()
  this.checkStarted(false)
  this.getTasks(aCalendarIds)
}

/**
 * @param {Array} aCalendarIds
 */
CCalendarView.prototype.getTasks = function (aCalendarIds) {
  if (this.bAllowTasks) {
    if (Types.isNonEmptyArray(aCalendarIds)) {
      Ajax.send(
        'GetTasks',
        {
          CalendarIds: aCalendarIds,
          Start: this.startDateTime,
          End: this.endDateTime,
          IsPublic: this.isPublic,
        },
        this.onGetTasksResponse,
        this
      )
    } else {
      this.setAutoReloadTimer()
      this.checkStarted(false)
    }
  }
}

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CCalendarView.prototype.onGetTasksResponse = function (oResponse, oRequest) {
  if (oResponse.Result) {
    var oCalendar = null,
      oParameters = oRequest.Parameters,
      aCalendarIds = _.isArray(oParameters.CalendarIds) ? oParameters.CalendarIds : [],
      aTasks = []
    _.each(
      oResponse.Result,
      function (oTaskData) {
        oCalendar = this.calendars.getCalendarById(oTaskData.calendarId)
        if (oCalendar) {
          oTaskData.isCalendarShared = oCalendar.isShared()

          aTasks.push(oTaskData.id)
          var oEvent = oCalendar.getEvent(oTaskData.id)
          if (!oEvent) {
            oCalendar.addEvent(oTaskData)
          } else if (oEvent.lastModified !== oTaskData.lastModified) {
            oCalendar.updateEvent(oTaskData)
          }
        }
      },
      this
    )

    _.each(
      aCalendarIds,
      function (sCalendarId) {
        oCalendar = this.calendars.getCalendarById(sCalendarId)
        if (oCalendar && oCalendar.eventsCount() > 0 && oCalendar.active()) {
          oCalendar.expungeEvents(aTasks, this.startDateTime, this.endDateTime, 'VTODO')
        }
      },
      this
    )

    this.refreshView()
  }

  this.setAutoReloadTimer()
  this.checkStarted(false)
}

CCalendarView.prototype.setCalendarGridVisibility = function () {
  this.$calendarGrid.css('visibility', '').find('.fc-view div').first().css('visibility', '')
}

CCalendarView.prototype.getUnusedColor = function () {
  var colors = _.difference(this.colors, this.calendars.getColors())

  return colors.length > 0 ? colors[0] : this.colors[0]
}

CCalendarView.prototype.openCreateCalendarForm = function () {
  if (!this.isPublic) {
    var oCalendar = new CCalendarModel()
    oCalendar.color(this.getUnusedColor())
    Popups.showPopup(EditCalendarPopup, [_.bind(this.createCalendarCallback, this), this.colors, oCalendar])
  }
}

CCalendarView.prototype.createCalendarCallback = function (aCalendar) {
  if (aCalendar) {
    this.calendars.parseAndAddCalendar(aCalendar)
  }
}

/**
 * @param {Object} oCalendar
 */
CCalendarView.prototype.openImportCalendarForm = function (oCalendar) {
  if (!this.isPublic) {
    Popups.showPopup(ImportCalendarPopup, [_.bind(this.getCalendars, this), oCalendar])
  }
}

/**
 * @param {Object} oCalendar
 */
CCalendarView.prototype.openShareCalendarForm = function (oCalendar) {
  Popups.showPopup(CalendarSharePopup, [_.bind(this.shareCalendar, this), oCalendar])
}

/**
 * @param {string} sId
 * @param {boolean} bIsPublic
 * @param {Array} aShares
 * @param {boolean} bShareToAll
 * @param {number} iShareToAllAccess
 */
CCalendarView.prototype.shareCalendar = function (sId, bIsPublic, aShares, bShareToAll, iShareToAllAccess) {
  if (!this.isPublic) {
    Ajax.send(
      'UpdateCalendarShare',
      {
        Id: sId,
        IsPublic: bIsPublic ? 1 : 0,
        Shares: JSON.stringify(aShares),
        ShareToAll: bShareToAll ? 1 : 0,
        ShareToAllAccess: iShareToAllAccess,
      },
      this.onUpdateShareResponse,
      this
    )
  }
}

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CCalendarView.prototype.onUpdateShareResponse = function (oResponse, oRequest) {
  if (oResponse.Result) {
    this.getCalendars()
    /*		TODO:
		var	oCalendar = this.calendars.getCalendarById(oRequest.Parameters.Id);
		if (oCalendar)
		{
			oCalendar.shares(JSON.parse(oRequest.Parameters.Shares));
			if (oRequest.Parameters.ShareToAll === 1)
			{
				oCalendar.isShared(true);
				oCalendar.isSharedToAll(true);
				oCalendar.sharedToAllAccess = oRequest.Parameters.ShareToAllAccess;
			}
			else
			{
				oCalendar.isSharedToAll(false);
			}
		}
*/
  } else {
    Screens.showError(TextUtils.i18n('CALENDARWEBCLIENT/ERROR_SHARE_NOT_UPDATED'))
  }
}

/**
 * @param {Object} oCalendar
 */
CCalendarView.prototype.openUpdateCalendarForm = function (oCalendar) {
  if (!this.isPublic) {
    Popups.showPopup(EditCalendarPopup, [_.bind(this.updateCalendarCallback, this), this.colors, oCalendar])
  }
}

CCalendarView.prototype.updateCalendarCallback = function (oParameters) {
  if (oParameters) {
    var oCalendar = this.calendars.getCalendarById(oParameters.Id)

    if (oCalendar) {
      oCalendar.name(oParameters.Name)
      oCalendar.description(oParameters.Description)
      oCalendar.color(oParameters.Color)
      this.refetchEvents()
    }
  }
}

/**
 * @param {string} sColor
 * @param {string} sId
 */
CCalendarView.prototype.updateCalendarColor = function (sColor, sId) {
  if (!this.isPublic) {
    Ajax.send(
      'UpdateCalendarColor',
      {
        Color: sColor,
        Id: sId,
      },
      this.onUpdateCalendarColorResponse,
      this
    )
  }
}

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CCalendarView.prototype.onUpdateCalendarColorResponse = function (oResponse, oRequest) {
  if (oResponse.Result) {
    var oParameters = oRequest.Parameters,
      oCalendar = this.calendars.getCalendarById(oParameters.Id)
    if (oCalendar) {
      oCalendar.color(oParameters.Color)
      this.refetchEvents()
    }
  }
}

/**
 * @param {Object} oCalendar
 */
CCalendarView.prototype.openGetLinkCalendarForm = function (oCalendar) {
  if (!this.isPublic) {
    Popups.showPopup(GetCalendarLinkPopup, [_.bind(this.publicCalendar, this), oCalendar])
  }
}

/**
 * @param {string} sId
 * @param {boolean} bIsPublic
 */
CCalendarView.prototype.publicCalendar = function (sId, bIsPublic) {
  if (!this.isPublic) {
    Ajax.send(
      'UpdateCalendarPublic',
      {
        Id: sId,
        IsPublic: bIsPublic,
      },
      this.onUpdateCalendarPublicResponse,
      this
    )
  }
}

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CCalendarView.prototype.onUpdateCalendarPublicResponse = function (oResponse, oRequest) {
  if (oResponse.Result) {
    var oParameters = oRequest.Parameters,
      oCalendar = this.calendars.getCalendarById(oParameters.Id)
    if (oCalendar) {
      oCalendar.isPublic(oParameters.IsPublic)
    }
  }
}

/**
 * @param {string} sId
 * @param {boolean} bIsUnsubscribe
 */
CCalendarView.prototype.deleteCalendar = function (sId, bIsUnsubscribe) {
  var oCalendar = this.calendars.getCalendarById(sId),
    sConfirm = oCalendar
      ? bIsUnsubscribe
        ? TextUtils.i18n('CALENDARWEBCLIENT/CONFIRM_UNSUBSCRIBE_CALENDAR', {
            CALENDARNAME: TextUtils.encodeHtml(oCalendar.name()),
          })
        : TextUtils.i18n('CALENDARWEBCLIENT/CONFIRM_REMOVE_CALENDAR', {
            CALENDARNAME: TextUtils.encodeHtml(oCalendar.name()),
          })
      : '',
    fRemove = _.bind(function (bRemove) {
      if (bRemove) {
        Ajax.send('DeleteCalendar', { Id: sId }, this.onDeleteCalendarResponse, this)
      }
    }, this)
  if (!this.isPublic && oCalendar) {
    Popups.showPopup(ConfirmPopup, [sConfirm, fRemove])
  }
}

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CCalendarView.prototype.onDeleteCalendarResponse = function (oResponse, oRequest) {
  if (oResponse.Result) {
    var oParameters = oRequest.Parameters,
      oCalendar = this.calendars.getCalendarById(oParameters.Id)
    if (oCalendar && !oCalendar.isDefault) {
      if (this.calendars.currentCal().id === oCalendar.id) {
        this.calendars.pickCurrentCalendar()
      }

      this.calendars.removeCalendar(oCalendar.id)
      this.refetchEvents()
    }
  }
}

CCalendarView.prototype.onEventDragStart = function () {
  this.dragEventTrigger = true
  this.refreshDatePicker()
}

CCalendarView.prototype.onEventDragStop = function (oEvent) {
  var self = this
  this.dragEventTrigger = false
  if (this.delayOnEventResult && this.delayOnEventResultData && 0 < this.delayOnEventResultData.length) {
    this.delayOnEventResult = false

    _.each(this.delayOnEventResultData, function (aData) {
      self.onEventActionResponse(aData[0], aData[1], false)
    })

    this.delayOnEventResultData = []
    this.refreshView()
  } else {
    this.refreshDatePicker()
  }
}

CCalendarView.prototype.onEventResizeStart = function () {
  this.dragEventTrigger = true
}

CCalendarView.prototype.onEventResizeStop = function () {
  var self = this
  this.dragEventTrigger = false
  if (this.delayOnEventResult && this.delayOnEventResultData && 0 < this.delayOnEventResultData.length) {
    this.delayOnEventResult = false

    _.each(this.delayOnEventResultData, function (aData) {
      self.onEventActionResponse(aData[0], aData[1], false)
    })

    this.delayOnEventResultData = []
    this.refreshView()
  } else {
    this.refreshDatePicker()
  }
}

CCalendarView.prototype.createEventInCurrentCalendar = function () {
  this.calendars.pickCurrentCalendar()
  this.createEventToday(this.calendars.currentCal())
}

/**
 * @param {Object} oCalendar
 */
CCalendarView.prototype.createEventToday = function (oCalendar) {
  var oToday = moment()

  if (oToday.minutes() > 30) {
    oToday.add(60 - oToday.minutes(), 'minutes')
  } else {
    oToday.minutes(30)
  }
  oToday.seconds(0).milliseconds(0)

  this.openEventPopup(oCalendar, oToday, oToday.clone().add(30, 'minutes'), false)
}

/**
 * @param {Object} oEventData
 */
CCalendarView.prototype.getParamsFromEventData = function (oEventData) {
  var sBrowserTimezone = moment.tz.guess(),
    sServerTimezone = UserSettings.timezone(),
    oStart = moment.tz(oEventData.start.format('YYYY-MM-DD HH:mm:ss'), sServerTimezone || sBrowserTimezone),
    oEnd = moment.tz(oEventData.end.format('YYYY-MM-DD HH:mm:ss'), sServerTimezone || sBrowserTimezone),
    rrule = null

  if (oEventData.rrule) {
    rrule = {
      byDays: oEventData.rrule.byDays,
      count: oEventData.rrule.count,
      end: Types.pInt(oEventData.rrule.end),
      interval: Types.pInt(oEventData.rrule.interval),
      period: Types.pInt(oEventData.rrule.period),
      until: Types.pInt(oEventData.rrule.until),
      weekNum: oEventData.rrule.weekNum,
    }
  }

  return {
    id: oEventData.id,
    uid: oEventData.uid,
    calendarId: oEventData.calendarId,
    newCalendarId: oEventData.newCalendarId || oEventData.calendarId,
    subject: oEventData.subject,
    allDay: oEventData.allDay ? 1 : 0,
    location: oEventData.location,
    description: oEventData.description,
    alarms: oEventData.alarms ? JSON.stringify(oEventData.alarms) : '[]',
    attendees: oEventData.attendees ? JSON.stringify(oEventData.attendees) : '[]',
    owner: oEventData.owner,
    recurrenceId: oEventData.recurrenceId,
    excluded: oEventData.excluded,
    allEvents: oEventData.allEvents,
    modified: oEventData.modified ? 1 : 0,
    start: oStart.format(),
    end: oEnd.format(),
    startTS: oStart.unix(),
    endTS: oEnd.unix(),
    rrule: rrule ? JSON.stringify(rrule) : null,
    type: oEventData.type,
    status: oEventData.status,
    withDate: oEventData.withDate,
    isPrivate: oEventData.isPrivate,
  }
}

/**
 * @param {Array} aParameters
 */
CCalendarView.prototype.getEventDataFromParams = function (aParameters) {
  var oEventData = aParameters
  oEventData.alarms = aParameters.alarms || []
  oEventData.attendees = aParameters.attendees || []

  if (aParameters.rrule) {
    oEventData.rrule = aParameters.rrule
  }

  return oEventData
}

/**
 * @param {Object} oStart
 * @param {Object} oEnd
 */
CCalendarView.prototype.createEventFromGrid = function (oStart, oEnd) {
  var bAllDay = !oStart.hasTime()
  this.calendars.pickCurrentCalendar()
  this.openEventPopup(this.calendars.currentCal(), oStart.local(), oEnd.local(), bAllDay)
}

/**
 * @param {Object} oCalendar
 * @param {Object} oStart
 * @param {Object} oEnd
 * @param {boolean} bAllDay
 */
CCalendarView.prototype.openEventPopup = function (oCalendar, oStart, oEnd, bAllDay) {
  if (!this.isPublic && oCalendar) {
    Popups.showPopup(EditEventPopup, [
      {
        CallbackSave: _.bind(this.createEvent, this),
        CallbackDelete: _.bind(this.deleteEvent, this),
        Calendars: this.calendars,
        SelectedCalendar: oCalendar ? oCalendar.id : 0,
        Start: oStart,
        End: oEnd,
        AllDay: bAllDay,
        TimeFormat: this.sTimeFormat,
        DateFormat: UserSettings.dateFormat(),
        CallbackAttendeeActionDecline: _.bind(this.attendeeActionDecline, this),
      },
    ])
  }
}

/**
 * @param {Object} oEventData
 */
CCalendarView.prototype.createEvent = function (oEventData) {
  var aParameters = this.getParamsFromEventData(oEventData)

  if (!this.isPublic) {
    aParameters.calendarId = oEventData.newCalendarId
    aParameters.selectStart = this.getDateFromCurrentView('start')
    aParameters.selectEnd = this.getDateFromCurrentView('end')
    Ajax.send('CreateEvent', aParameters, this.onEventActionResponseWithSubThrottle, this)
  }
}

/**
 * @param {Object} oEventData
 */
CCalendarView.prototype.eventClickCallback = function (oEventData) {
  if (oEventData.isCalendarShared && oEventData.isPrivate && Settings.AllowPrivateEvents) {
    return // reject editing
  }

  var /**
     * @param {number} iResult
     */
    fCallback = _.bind(function (iResult) {
      var oParams = {
        ID: oEventData.id,
        Uid: oEventData.uid,
        RecurrenceId: oEventData.recurrenceId,
        Calendars: this.calendars,
        SelectedCalendar: oEventData.calendarId,
        AllDay: oEventData.allDay,
        Location: oEventData.location,
        Description: oEventData.description,
        Subject: oEventData.subject,
        Alarms: oEventData.alarms,
        Attendees: oEventData.attendees,
        RRule: oEventData.rrule ? oEventData.rrule : null,
        Excluded: oEventData.excluded ? oEventData.excluded : false,
        Owner: oEventData.owner,
        Organizer: oEventData.organizer,
        Appointment: oEventData.appointment,
        OwnerName: oEventData.ownerName,
        TimeFormat: this.sTimeFormat,
        DateFormat: UserSettings.dateFormat(),
        AllEvents: iResult,
        CallbackSave: _.bind(this.updateEvent, this),
        CallbackDelete: _.bind(this.deleteEvent, this),
        CallbackAttendeeActionDecline: _.bind(this.attendeeActionDecline, this),
        Type: oEventData.type,
        Status: oEventData.status,
        IsPrivate: oEventData.isPrivate,
      }
      if (iResult !== Enums.CalendarEditRecurrenceEvent.None) {
        if (iResult === Enums.CalendarEditRecurrenceEvent.AllEvents && oEventData.rrule) {
          oParams.Start = moment.unix(oEventData.rrule.startBase)
          oParams.End = moment.unix(oEventData.rrule.endBase)
        } else {
          oParams.Start = oEventData.start.clone()
          oParams.Start = oParams.Start.local()

          oParams.End = oEventData.end.clone()
          oParams.End = oParams.End.local()
        }
        Popups.showPopup(EditEventPopup, [oParams])
      }
    }, this),
    oCalendar = this.calendars.getCalendarById(oEventData.calendarId)
  if (oEventData.rrule && !oCalendar.subscribed()) {
    if (oEventData.excluded) {
      fCallback(Enums.CalendarEditRecurrenceEvent.OnlyThisInstance)
    } else {
      Popups.showPopup(EditEventRecurrencePopup, [fCallback, oEventData.type])
    }
  } else {
    fCallback(Enums.CalendarEditRecurrenceEvent.AllEvents)
  }
}

/**
 * @param {string} sMethod
 * @param {Object} oParameters
 * @param {Function=} fRevertFunc = undefined
 */
CCalendarView.prototype.eventAction = function (sMethod, oParameters, fRevertFunc) {
  var oCalendar = this.calendars.getCalendarById(oParameters.calendarId)

  if (!oCalendar.isEditable()) {
    if (fRevertFunc) {
      fRevertFunc()
    }
  } else {
    if (!this.isPublic) {
      if (fRevertFunc) {
        this.revertFunction = fRevertFunc
      }

      Ajax.send(sMethod, oParameters, this.onEventActionResponseWithSubThrottle, this)
    }
  }
}

/**
 * @param {Object} oEventData
 */
CCalendarView.prototype.updateEvent = function (oEventData) {
  var oParameters = this.getParamsFromEventData(oEventData)

  oParameters.selectStart = this.getDateFromCurrentView('start')
  oParameters.selectEnd = this.getDateFromCurrentView('end')

  if (oEventData.modified) {
    this.calendars.setDefault(oEventData.newCalendarId)
    this.eventAction('UpdateEvent', oParameters)
  }
}

/**
 * @param {Object} oEventData
 * @param {number} delta
 * @param {Function} revertFunc
 */
CCalendarView.prototype.moveEvent = function (oEventData, delta, revertFunc) {
  var oParameters = this.getParamsFromEventData(oEventData)

  oParameters.selectStart = this.getDateFromCurrentView('start')
  oParameters.selectEnd = this.getDateFromCurrentView('end')
  if (!this.isPublic) {
    if (oParameters.rrule) {
      revertFunc(false)
    } else {
      oParameters.allEvents = Enums.CalendarEditRecurrenceEvent.AllEvents
      this.eventAction('UpdateEvent', oParameters, revertFunc)
    }
  }
}

/**
 * @param {Object} oEventData
 * @param {number} delta
 * @param {Function} revertFunc
 */
CCalendarView.prototype.resizeEvent = function (oEventData, delta, revertFunc) {
  if (oEventData?.rrule?.until) {
    var localUntill = new Date(oEventData.rrule.until * 1000),
    utcUntil = new Date(
      localUntill.getUTCFullYear(),
      localUntill.getUTCMonth(),
      localUntill.getUTCDate(),
      localUntill.getUTCHours(),
      localUntill.getUTCMinutes(),
      localUntill.getUTCSeconds()
    )
    
    oEventData.rrule.until = moment(utcUntil).unix()
  }

  var oParameters = this.getParamsFromEventData(oEventData),
    /**
     * @param {number} iResult
     */
    fCallback = _.bind(function (iResult) {
      if (iResult !== Enums.CalendarEditRecurrenceEvent.None) {
        oParameters.allEvents = iResult
        this.eventAction('UpdateEvent', oParameters, revertFunc)
      } else {
        revertFunc()
      }
    }, this)
  oParameters.selectStart = this.getDateFromCurrentView('start')
  oParameters.selectEnd = this.getDateFromCurrentView('end')
  if (oEventData.rrule) {
    if (oParameters.excluded) {
      fCallback(Enums.CalendarEditRecurrenceEvent.OnlyThisInstance)
    } else {
      Popups.showPopup(EditEventRecurrencePopup, [fCallback, oEventData.type])
    }
  } else {
    fCallback(Enums.CalendarEditRecurrenceEvent.AllEvents)
  }
}

/**
 * @param {Object} oEventData
 */
CCalendarView.prototype.deleteEvent = function (oEventData) {
  this.eventAction('DeleteEvent', this.getParamsFromEventData(oEventData))
  CalendarCache.markIcalNotSaved(oEventData.uid)
}

/**
 * @param {Object} oData
 * @param {Object} oParameters
 */
CCalendarView.prototype.onEventActionResponseWithSubThrottle = function (oData, oParameters) {
  if (this.dragEventTrigger) {
    this.delayOnEventResult = true
    this.delayOnEventResultData.push([oData, oParameters])
  } else {
    this.onEventActionResponse(oData, oParameters, true)
  }
}

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 * @param {boolean} bDoRefresh
 */
CCalendarView.prototype.onEventActionResponse = function (oResponse, oRequest, bDoRefresh) {
  var oParameters = oRequest.Parameters,
    oCalendar = this.calendars.getCalendarById(oParameters && oParameters.calendarId),
    oEvent = null,
    iScrollTop = 0
  if (oResponse && oResponse.Result && oCalendar) {
    iScrollTop = $('.calendar .fc-widget-content .scroll-inner').scrollTop()
    if (oRequest.Method === 'CreateEvent' || oRequest.Method === 'UpdateEvent') {
      oEvent = oCalendar.getEvent(oParameters.id)

      if (
        ((oEvent && oEvent.rrule) || oParameters.rrule) &&
        oParameters.allEvents === Enums.CalendarEditRecurrenceEvent.AllEvents
      ) {
        oCalendar.removeEventByUid(oParameters.uid)
      } else {
        oCalendar.removeEvent(oParameters.id)
      }

      if (oParameters.newCalendarId && oParameters.newCalendarId !== oParameters.calendarId) {
        oCalendar = this.calendars.getCalendarById(oParameters.newCalendarId)
      }

      _.each(
        oResponse.Result.Events,
        function (oEventData) {
          oCalendar.addEvent(oEventData)
        },
        this
      )

      oCalendar.sSyncToken = oResponse.Result.SyncToken

      if (!oCalendar.active()) {
        oCalendar.active(true)
      }

      if (bDoRefresh) {
        this.refreshView()
      }

      this.restoreScroll(iScrollTop)
      this.calendars.pickCurrentCalendar()
    } else if (oRequest.Method === 'DeleteEvent') {
      oCalendar.sSyncToken = oResponse.Result
      if (oParameters.allEvents === Enums.CalendarEditRecurrenceEvent.OnlyThisInstance) {
        oCalendar.removeEvent(oParameters.id)
      } else {
        oCalendar.removeEventByUid(oParameters.uid)
      }

      if (bDoRefresh) {
        this.refreshView()
      }

      this.restoreScroll(iScrollTop)
    }
  } else if (
    oRequest.Method === 'UpdateEvent' &&
    !oResponse.Result &&
    Enums.Errors.NotDisplayedError === Types.pInt(oResponse.ErrorCode)
  ) {
    this.revertFunction = null
  } else {
    Api.showErrorByCode(oResponse, TextUtils.i18n('CALENDARWEBCLIENT/ERROR_EVENT_NOT_UPDATED'))

    if (this.revertFunction) {
      this.revertFunction()
    }
  }

  this.revertFunction = null
}

/**
 * @param {Object} oCalendar
 * @param {string} sId
 */
CCalendarView.prototype.attendeeActionDecline = function (oCalendar, sId) {
  oCalendar.removeEvent(sId)
  this.refreshView()
}

CCalendarView.prototype.refetchEvents = function () {
  this.$calendarGrid.fullCalendar('refetchEvents')
}

CCalendarView.prototype.refreshViewSingle = function () {
  this.refetchEvents()
  this.refreshDatePicker()
}

CCalendarView.prototype.refreshView = function () {}

/**
 * Initializes file uploader.
 */
CCalendarView.prototype.initUploader = function () {
  var self = this
  if (this.uploaderArea()) {
    this.oJua = new CJua({
      action: '?/Api/',
      name: 'jua-uploader',
      queueSize: 2,
      dragAndDropElement: this.uploaderArea(),
      disableAjaxUpload: false,
      disableFolderDragAndDrop: false,
      disableDragAndDrop: false,
      disableAutoUploadOnDrop: true,
      hidden: _.extendOwn(
        {
          Module: Settings.ServerModuleName,
          Method: 'UploadCalendar',
          Parameters: function () {
            return JSON.stringify({
              CalendarID: self.uploadCalendarId(),
            })
          },
        },
        App.getCommonRequestParameters()
      ),
    })

    this.oJua
      .on('onDrop', _.bind(this.onFileDrop, this))
      .on('onComplete', _.bind(this.onFileUploadComplete, this))
      .on('onBodyDragEnter', _.bind(this.bDragActive, this, true))
      .on('onBodyDragLeave', _.bind(this.bDragActive, this, false))
  }
}

CCalendarView.prototype.onFileDrop = function (oFile, oEvent, fProceedUploading) {
  const editableCalendars = this.calendars.collection().filter((calendar) => calendar.isEditable())
  const calendarToSelect = editableCalendars.find((calendar) => calendar.isDefault) || editableCalendars[0]
  if (!calendarToSelect) {
    Screens.showError(TextUtils.i18n('CALENDARWEBCLIENT/ERROR_NO_EDITABLE_CALENDAR'))
    return
  }

  if (editableCalendars.length > 1) {
    Popups.showPopup(SelectCalendarPopup, [
      {
        CallbackSave: _.bind(this.uploadToSelectedCalendar, this),
        ProceedUploading: fProceedUploading,
        Calendars: this.calendars,
        EditableCalendars: editableCalendars,
        DefaultCalendarId: calendarToSelect.id,
      },
    ])
  } else {
    this.uploadToSelectedCalendar(calendarToSelect.id, fProceedUploading)
  }
}

CCalendarView.prototype.onFileUploadComplete = function (sFileUid, bResponseReceived, oResponse) {
  var bError = !bResponseReceived || !oResponse || !oResponse.Result

  if (!bError) {
    this.getCalendars()
  } else {
    if (oResponse && oResponse.ErrorCode && oResponse.ErrorCode === Enums.Errors.IncorrectFileExtension) {
      Screens.showError(TextUtils.i18n('CALENDARWEBCLIENT/ERROR_FILE_NOT_ICS'))
    } else {
      Screens.showError(TextUtils.i18n('COREWEBCLIENT/ERROR_UPLOAD_FILE'))
    }
  }
}

CCalendarView.prototype.uploadToSelectedCalendar = function (selectedCalendarId, fProceedUploading) {
  this.uploadCalendarId(selectedCalendarId)
  this.checkStarted(true)
  fProceedUploading()
}

/**
 * @param {number} iScrollTop
 */
CCalendarView.prototype.restoreScroll = function (iScrollTop) {
  if (
    Types.isPositiveNumber(iScrollTop) &&
    this.domScrollWrapper &&
    this.domScrollWrapper.data('customscroll') &&
    this.domScrollWrapper.data('customscroll')['vertical']
  ) {
    this.domScrollWrapper.data('customscroll')['vertical'].set(iScrollTop)
  }
}

const calendarView = new CCalendarView()

Pulse.registerEveryMinuteFunction(() => {
  calendarView.applyDateTime()
})

module.exports = calendarView


/***/ }),

/***/ "U208":
/*!**************************************************************!*\
  !*** ./modules/CalendarWebclient/js/views/HeaderItemView.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
			
	CHeaderItemView = __webpack_require__(/*! modules/CoreWebclient/js/views/CHeaderItemView.js */ "C5H3")
;

module.exports = new CHeaderItemView(TextUtils.i18n('CALENDARWEBCLIENT/ACTION_SHOW_CALENDAR'));


/***/ }),

/***/ "NCZ9":
/*!******************************************************************!*\
  !*** ./modules/CalendarWebclient/js/views/IcalAttachmentView.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	
	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	
	CalendarCache = __webpack_require__(/*! modules/CalendarWebclient/js/Cache.js */ "exyt"),
	CIcalModel = __webpack_require__(/*! modules/CalendarWebclient/js/models/CIcalModel.js */ "2zlO")
;

function CIcalAttachmentView()
{
	this.ical = ko.observable(null);
}

CIcalAttachmentView.prototype.ViewTemplate = 'CalendarWebclient_IcalAttachmentView';

/**
 * Receives properties of the message that is displaying in the message pane. 
 * It is called every time the message is changing in the message pane.
 * Receives null if there is no message in the pane.
 * 
 * @param {Object|null} oMessageProps Information about message in message pane.
 * @param {String} oMessageProps.sFromEmail Message sender email.
 * @param {Array} oMessageProps.aToEmails
 * @param {Object} oMessageProps.oIcal
 */
CIcalAttachmentView.prototype.doAfterPopulatingMessage = function (oMessageProps)
{
	var
		aExtend = (oMessageProps && Types.isNonEmptyArray(oMessageProps.aExtend)) ? oMessageProps.aExtend : [],
		oFoundRawIcal = _.find(aExtend, function (oRawIcal) {
			return oRawIcal['@Object'] === 'Object/Aurora\\Modules\\Calendar\\Classes\\Ics';
		})
	;

	if (oFoundRawIcal)
	{
		var
			sAttendee = null,
			oIcal = CalendarCache.getIcal(oFoundRawIcal.File)
		;
		if (_.isFunction(App.getAttendee))
		{
			sAttendee = App.getAttendee(oMessageProps.aToEmails);
		}

		if (!oIcal)
		{
			oIcal = new CIcalModel(oFoundRawIcal, sAttendee);

			// animation of buttons turns on with delay
			// so it does not trigger when placing initial values
			oIcal.animation(false);
			_.defer(_.bind(function () {
				if (oIcal !== null)
				{
					oIcal.animation(true);
				}
			}, this));

			oIcal.updateAttendeeStatus(oMessageProps.sFromEmail);
		}
		this.ical(oIcal);
	}
	else
	{
		this.ical(null);
	}
};

module.exports = new CIcalAttachmentView();


/***/ }),

/***/ "X8Jg":
/*!**********************************************************************!*\
  !*** ./modules/CalendarWebclient/js/views/MobileSyncSettingsView.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A")
;

/**
 * @constructor
 */
function CMobileSyncSettingsView()
{
	this.davCalendars = ko.observable([]);
	this.visible = ko.computed(function () {
		return this.davCalendars().length > 0;
	}, this);
}

CMobileSyncSettingsView.prototype.ViewTemplate = 'CalendarWebclient_MobileSyncSettingsView';

/**
 * @param {Object} oDav
 */
CMobileSyncSettingsView.prototype.populate = function (oDav)
{
	if (_.isArray(oDav.Calendars))
	{
		this.davCalendars(oDav.Calendars);
	}
};

module.exports = new CMobileSyncSettingsView();


/***/ }),

/***/ "lPkD":
/*!****************************************************************!*\
  !*** ./modules/CalendarWebclient/js/views/PublicHeaderItem.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
			
	CHeaderItemView = __webpack_require__(/*! modules/CoreWebclient/js/views/CHeaderItemView.js */ "C5H3"),
	
	PublicHeaderItem = new CHeaderItemView(TextUtils.i18n('CALENDARWEBCLIENT/ACTION_SHOW_CALENDAR'))
;

module.exports = PublicHeaderItem;


/***/ }),

/***/ "+vjt":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "Hf+z":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "fxCR":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./modules/CalendarWebclient/js/vendors/fullcalendar/fullcalendar.css ***!
  \******************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "Hf+z");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "+vjt");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*!
 * FullCalendar v3.4.0 Stylesheet
 * Docs & License: https://fullcalendar.io/
 * (c) 2017 Adam Shaw
 */


.fc {
	direction: ltr;
	text-align: left;
}

.fc-rtl {
	text-align: right;
}

body .fc { /* extra precedence to overcome jqui */
	font-size: 1em;
}


/* Colors
--------------------------------------------------------------------------------------------------*/

.fc-unthemed th,
.fc-unthemed td,
.fc-unthemed thead,
.fc-unthemed tbody,
.fc-unthemed .fc-divider,
.fc-unthemed .fc-row,
.fc-unthemed .fc-content, /* for gutter border */
.fc-unthemed .fc-popover,
.fc-unthemed .fc-list-view,
.fc-unthemed .fc-list-heading td {
	border-color: #ddd;
}

.fc-unthemed .fc-popover {
	background-color: #fff;
}

.fc-unthemed .fc-divider,
.fc-unthemed .fc-popover .fc-header,
.fc-unthemed .fc-list-heading td {
	background: #eee;
}

.fc-unthemed .fc-popover .fc-header .fc-close {
	color: #666;
}

.fc-unthemed td.fc-today {
	background: #fcf8e3;
}

.fc-highlight { /* when user is selecting cells */
	background: #bce8f1;
	opacity: .3;
}

.fc-bgevent { /* default look for background events */
	background: rgb(143, 223, 130);
	opacity: .3;
}

.fc-nonbusiness { /* default look for non-business-hours areas */
	/* will inherit .fc-bgevent's styles */
	background: #d7d7d7;
}

.fc-unthemed .fc-disabled-day {
	background: #d7d7d7;
	opacity: .3;
}

.ui-widget .fc-disabled-day { /* themed */
	background-image: none;
}


/* Icons (inline elements with styled text that mock arrow icons)
--------------------------------------------------------------------------------------------------*/

.fc-icon {
	display: inline-block;
	height: 1em;
	line-height: 1em;
	font-size: 1em;
	text-align: center;
	overflow: hidden;
	font-family: "Courier New", Courier, monospace;

	/* don't allow browser text-selection */
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	}

/*
Acceptable font-family overrides for individual icons:
	"Arial", sans-serif
	"Times New Roman", serif

NOTE: use percentage font sizes or else old IE chokes
*/

.fc-icon:after {
	position: relative;
}

.fc-icon-left-single-arrow:after {
	content: "\\02039";
	font-weight: bold;
	font-size: 200%;
	top: -7%;
}

.fc-icon-right-single-arrow:after {
	content: "\\0203A";
	font-weight: bold;
	font-size: 200%;
	top: -7%;
}

.fc-icon-left-double-arrow:after {
	content: "\\000AB";
	font-size: 160%;
	top: -7%;
}

.fc-icon-right-double-arrow:after {
	content: "\\000BB";
	font-size: 160%;
	top: -7%;
}

.fc-icon-left-triangle:after {
	content: "\\25C4";
	font-size: 125%;
	top: 3%;
}

.fc-icon-right-triangle:after {
	content: "\\25BA";
	font-size: 125%;
	top: 3%;
}

.fc-icon-down-triangle:after {
	content: "\\25BC";
	font-size: 125%;
	top: 2%;
}

.fc-icon-x:after {
	content: "\\000D7";
	font-size: 200%;
	top: 6%;
}


/* Buttons (styled <button> tags, normalized to work cross-browser)
--------------------------------------------------------------------------------------------------*/

.fc button {
	/* force height to include the border and padding */
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;

	/* dimensions */
	margin: 0;
	height: 2.1em;
	padding: 0 .6em;

	/* text & cursor */
	font-size: 1em; /* normalize */
	white-space: nowrap;
	cursor: pointer;
}

/* Firefox has an annoying inner border */
.fc button::-moz-focus-inner { margin: 0; padding: 0; }
	
.fc-state-default { /* non-theme */
	border: 1px solid;
}

.fc-state-default.fc-corner-left { /* non-theme */
	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
}

.fc-state-default.fc-corner-right { /* non-theme */
	border-top-right-radius: 4px;
	border-bottom-right-radius: 4px;
}

/* icons in buttons */

.fc button .fc-icon { /* non-theme */
	position: relative;
	top: -0.05em; /* seems to be a good adjustment across browsers */
	margin: 0 .2em;
	vertical-align: middle;
}
	
/*
  button states
  borrowed from twitter bootstrap (http://twitter.github.com/bootstrap/)
*/

.fc-state-default {
	background-color: #f5f5f5;
	background-image: -moz-linear-gradient(top, #ffffff, #e6e6e6);
	background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#e6e6e6));
	background-image: -webkit-linear-gradient(top, #ffffff, #e6e6e6);
	background-image: -o-linear-gradient(top, #ffffff, #e6e6e6);
	background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
	background-repeat: repeat-x;
	border-color: #e6e6e6 #e6e6e6 #bfbfbf;
	border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
	color: #333;
	text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
}

.fc-state-hover,
.fc-state-down,
.fc-state-active,
.fc-state-disabled {
	color: #333333;
	background-color: #e6e6e6;
}

.fc-state-hover {
	color: #333333;
	text-decoration: none;
	background-position: 0 -15px;
	-webkit-transition: background-position 0.1s linear;
	   -moz-transition: background-position 0.1s linear;
	     -o-transition: background-position 0.1s linear;
	        transition: background-position 0.1s linear;
}

.fc-state-down,
.fc-state-active {
	background-color: #cccccc;
	background-image: none;
	box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
}

.fc-state-disabled {
	cursor: default;
	background-image: none;
	opacity: 0.65;
	box-shadow: none;
}


/* Buttons Groups
--------------------------------------------------------------------------------------------------*/

.fc-button-group {
	display: inline-block;
}

/*
every button that is not first in a button group should scootch over one pixel and cover the
previous button's border...
*/

.fc .fc-button-group > * { /* extra precedence b/c buttons have margin set to zero */
	float: left;
	margin: 0 0 0 -1px;
}

.fc .fc-button-group > :first-child { /* same */
	margin-left: 0;
}


/* Popover
--------------------------------------------------------------------------------------------------*/

.fc-popover {
	position: absolute;
	box-shadow: 0 2px 6px rgba(0,0,0,.15);
}

.fc-popover .fc-header { /* TODO: be more consistent with fc-head/fc-body */
	padding: 2px 4px;
}

.fc-popover .fc-header .fc-title {
	margin: 0 2px;
}

.fc-popover .fc-header .fc-close {
	cursor: pointer;
}

.fc-ltr .fc-popover .fc-header .fc-title,
.fc-rtl .fc-popover .fc-header .fc-close {
	float: left;
}

.fc-rtl .fc-popover .fc-header .fc-title,
.fc-ltr .fc-popover .fc-header .fc-close {
	float: right;
}

/* unthemed */

.fc-unthemed .fc-popover {
	border-width: 1px;
	border-style: solid;
}

.fc-unthemed .fc-popover .fc-header .fc-close {
	font-size: .9em;
	margin-top: 2px;
}

/* jqui themed */

.fc-popover > .ui-widget-header + .ui-widget-content {
	border-top: 0; /* where they meet, let the header have the border */
}


/* Misc Reusable Components
--------------------------------------------------------------------------------------------------*/

.fc-divider {
	border-style: solid;
	border-width: 1px;
}

hr.fc-divider {
	height: 0;
	margin: 0;
	padding: 0 0 2px; /* height is unreliable across browsers, so use padding */
	border-width: 1px 0;
}

.fc-clear {
	clear: both;
}

.fc-bg,
.fc-bgevent-skeleton,
.fc-highlight-skeleton,
.fc-helper-skeleton {
	/* these element should always cling to top-left/right corners */
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
}

.fc-bg {
	bottom: 0; /* strech bg to bottom edge */
}

.fc-bg table {
	height: 100%; /* strech bg to bottom edge */
}


/* Tables
--------------------------------------------------------------------------------------------------*/

.fc table {
	width: 100%;
	box-sizing: border-box; /* fix scrollbar issue in firefox */
	table-layout: fixed;
	border-collapse: collapse;
	border-spacing: 0;
	font-size: 1em; /* normalize cross-browser */
}

.fc th {
	text-align: center;
}

.fc th,
.fc td {
	border-style: solid;
	border-width: 1px;
	padding: 0;
	vertical-align: top;
}

.fc td.fc-today {
	border-style: double; /* overcome neighboring borders */
}


/* Internal Nav Links
--------------------------------------------------------------------------------------------------*/

a[data-goto] {
	cursor: pointer;
}

a[data-goto]:hover {
	text-decoration: underline;
}


/* Fake Table Rows
--------------------------------------------------------------------------------------------------*/

.fc .fc-row { /* extra precedence to overcome themes w/ .ui-widget-content forcing a 1px border */
	/* no visible border by default. but make available if need be (scrollbar width compensation) */
	border-style: solid;
	border-width: 0;
}

.fc-row table {
	/* don't put left/right border on anything within a fake row.
	   the outer tbody will worry about this */
	border-left: 0 hidden transparent;
	border-right: 0 hidden transparent;

	/* no bottom borders on rows */
	border-bottom: 0 hidden transparent; 
}

.fc-row:first-child table {
	border-top: 0 hidden transparent; /* no top border on first row */
}


/* Day Row (used within the header and the DayGrid)
--------------------------------------------------------------------------------------------------*/

.fc-row {
	position: relative;
}

.fc-row .fc-bg {
	z-index: 1;
}

/* highlighting cells & background event skeleton */

.fc-row .fc-bgevent-skeleton,
.fc-row .fc-highlight-skeleton {
	bottom: 0; /* stretch skeleton to bottom of row */
}

.fc-row .fc-bgevent-skeleton table,
.fc-row .fc-highlight-skeleton table {
	height: 100%; /* stretch skeleton to bottom of row */
}

.fc-row .fc-highlight-skeleton td,
.fc-row .fc-bgevent-skeleton td {
	border-color: transparent;
}

.fc-row .fc-bgevent-skeleton {
	z-index: 2;

}

.fc-row .fc-highlight-skeleton {
	z-index: 3;
}

/*
row content (which contains day/week numbers and events) as well as "helper" (which contains
temporary rendered events).
*/

.fc-row .fc-content-skeleton {
	position: relative;
	z-index: 4;
	padding-bottom: 2px; /* matches the space above the events */
}

.fc-row .fc-helper-skeleton {
	z-index: 5;
}

.fc-row .fc-content-skeleton td,
.fc-row .fc-helper-skeleton td {
	/* see-through to the background below */
	background: none; /* in case <td>s are globally styled */
	border-color: transparent;

	/* don't put a border between events and/or the day number */
	border-bottom: 0;
}

.fc-row .fc-content-skeleton tbody td, /* cells with events inside (so NOT the day number cell) */
.fc-row .fc-helper-skeleton tbody td {
	/* don't put a border between event cells */
	border-top: 0;
}


/* Scrolling Container
--------------------------------------------------------------------------------------------------*/

.fc-scroller {
	-webkit-overflow-scrolling: touch;
}

/* TODO: move to agenda/basic */
.fc-scroller > .fc-day-grid,
.fc-scroller > .fc-time-grid {
	position: relative; /* re-scope all positions */
	width: 100%; /* hack to force re-sizing this inner element when scrollbars appear/disappear */
}


/* Global Event Styles
--------------------------------------------------------------------------------------------------*/

.fc-event {
	position: relative; /* for resize handle and other inner positioning */
	display: block; /* make the <a> tag block */
	font-size: .85em;
	line-height: 1.3;
	border-radius: 3px;
	border: 1px solid #3a87ad; /* default BORDER color */
	font-weight: normal; /* undo jqui's ui-widget-header bold */
}

.fc-event,
.fc-event-dot {
	background-color: #3a87ad; /* default BACKGROUND color */
}

/* overpower some of bootstrap's and jqui's styles on <a> tags */
.fc-event,
.fc-event:hover,
.ui-widget .fc-event {
	color: #fff; /* default TEXT color */
	text-decoration: none; /* if <a> has an href */
}

.fc-event[href],
.fc-event.fc-draggable {
	cursor: pointer; /* give events with links and draggable events a hand mouse pointer */
}

.fc-not-allowed, /* causes a "warning" cursor. applied on body */
.fc-not-allowed .fc-event { /* to override an event's custom cursor */
	cursor: not-allowed;
}

.fc-event .fc-bg { /* the generic .fc-bg already does position */
	z-index: 1;
	background: #fff;
	opacity: .25;
}

.fc-event .fc-content {
	position: relative;
	z-index: 2;
}

/* resizer (cursor AND touch devices) */

.fc-event .fc-resizer {
	position: absolute;
	z-index: 4;
}

/* resizer (touch devices) */

.fc-event .fc-resizer {
	display: none;
}

.fc-event.fc-allow-mouse-resize .fc-resizer,
.fc-event.fc-selected .fc-resizer {
	/* only show when hovering or selected (with touch) */
	display: block;
}

/* hit area */

.fc-event.fc-selected .fc-resizer:before {
	/* 40x40 touch area */
	content: "";
	position: absolute;
	z-index: 9999; /* user of this util can scope within a lower z-index */
	top: 50%;
	left: 50%;
	width: 40px;
	height: 40px;
	margin-left: -20px;
	margin-top: -20px;
}


/* Event Selection (only for touch devices)
--------------------------------------------------------------------------------------------------*/

.fc-event.fc-selected {
	z-index: 9999 !important; /* overcomes inline z-index */
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.fc-event.fc-selected.fc-dragging {
	box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
}


/* Horizontal Events
--------------------------------------------------------------------------------------------------*/

/* bigger touch area when selected */
.fc-h-event.fc-selected:before {
	content: "";
	position: absolute;
	z-index: 3; /* below resizers */
	top: -10px;
	bottom: -10px;
	left: 0;
	right: 0;
}

/* events that are continuing to/from another week. kill rounded corners and butt up against edge */

.fc-ltr .fc-h-event.fc-not-start,
.fc-rtl .fc-h-event.fc-not-end {
	margin-left: 0;
	border-left-width: 0;
	padding-left: 1px; /* replace the border with padding */
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
}

.fc-ltr .fc-h-event.fc-not-end,
.fc-rtl .fc-h-event.fc-not-start {
	margin-right: 0;
	border-right-width: 0;
	padding-right: 1px; /* replace the border with padding */
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
}

/* resizer (cursor AND touch devices) */

/* left resizer  */
.fc-ltr .fc-h-event .fc-start-resizer,
.fc-rtl .fc-h-event .fc-end-resizer {
	cursor: w-resize;
	left: -1px; /* overcome border */
}

/* right resizer */
.fc-ltr .fc-h-event .fc-end-resizer,
.fc-rtl .fc-h-event .fc-start-resizer {
	cursor: e-resize;
	right: -1px; /* overcome border */
}

/* resizer (mouse devices) */

.fc-h-event.fc-allow-mouse-resize .fc-resizer {
	width: 7px;
	top: -1px; /* overcome top border */
	bottom: -1px; /* overcome bottom border */
}

/* resizer (touch devices) */

.fc-h-event.fc-selected .fc-resizer {
	/* 8x8 little dot */
	border-radius: 4px;
	border-width: 1px;
	width: 6px;
	height: 6px;
	border-style: solid;
	border-color: inherit;
	background: #fff;
	/* vertically center */
	top: 50%;
	margin-top: -4px;
}

/* left resizer  */
.fc-ltr .fc-h-event.fc-selected .fc-start-resizer,
.fc-rtl .fc-h-event.fc-selected .fc-end-resizer {
	margin-left: -4px; /* centers the 8x8 dot on the left edge */
}

/* right resizer */
.fc-ltr .fc-h-event.fc-selected .fc-end-resizer,
.fc-rtl .fc-h-event.fc-selected .fc-start-resizer {
	margin-right: -4px; /* centers the 8x8 dot on the right edge */
}


/* DayGrid events
----------------------------------------------------------------------------------------------------
We use the full "fc-day-grid-event" class instead of using descendants because the event won't
be a descendant of the grid when it is being dragged.
*/

.fc-day-grid-event {
	margin: 1px 2px 0; /* spacing between events and edges */
	padding: 0 1px;
}

tr:first-child > td > .fc-day-grid-event {
	margin-top: 2px; /* a little bit more space before the first event */
}

.fc-day-grid-event.fc-selected:after {
	content: "";
	position: absolute;
	z-index: 1; /* same z-index as fc-bg, behind text */
	/* overcome the borders */
	top: -1px;
	right: -1px;
	bottom: -1px;
	left: -1px;
	/* darkening effect */
	background: #000;
	opacity: .25;
}

.fc-day-grid-event .fc-content { /* force events to be one-line tall */
	white-space: nowrap;
	overflow: hidden;
}

.fc-day-grid-event .fc-time {
	font-weight: bold;
}

/* resizer (cursor devices) */

/* left resizer  */
.fc-ltr .fc-day-grid-event.fc-allow-mouse-resize .fc-start-resizer,
.fc-rtl .fc-day-grid-event.fc-allow-mouse-resize .fc-end-resizer {
	margin-left: -2px; /* to the day cell's edge */
}

/* right resizer */
.fc-ltr .fc-day-grid-event.fc-allow-mouse-resize .fc-end-resizer,
.fc-rtl .fc-day-grid-event.fc-allow-mouse-resize .fc-start-resizer {
	margin-right: -2px; /* to the day cell's edge */
}


/* Event Limiting
--------------------------------------------------------------------------------------------------*/

/* "more" link that represents hidden events */

a.fc-more {
	margin: 1px 3px;
	font-size: .85em;
	cursor: pointer;
	text-decoration: none;
}

a.fc-more:hover {
	text-decoration: underline;
}

.fc-limited { /* rows and cells that are hidden because of a "more" link */
	display: none;
}

/* popover that appears when "more" link is clicked */

.fc-day-grid .fc-row {
	z-index: 1; /* make the "more" popover one higher than this */
}

.fc-more-popover {
	z-index: 2;
	width: 220px;
}

.fc-more-popover .fc-event-container {
	padding: 10px;
}


/* Now Indicator
--------------------------------------------------------------------------------------------------*/

.fc-now-indicator {
	position: absolute;
	border: 0 solid red;
}


/* Utilities
--------------------------------------------------------------------------------------------------*/

.fc-unselectable {
	-webkit-user-select: none;
	 -khtml-user-select: none;
	   -moz-user-select: none;
	    -ms-user-select: none;
	        user-select: none;
	-webkit-touch-callout: none;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}



/* Toolbar
--------------------------------------------------------------------------------------------------*/

.fc-toolbar {
	text-align: center;
}

.fc-toolbar.fc-header-toolbar {
	margin-bottom: 1em;
}

.fc-toolbar.fc-footer-toolbar {
	margin-top: 1em;
}

.fc-toolbar .fc-left {
	float: left;
}

.fc-toolbar .fc-right {
	float: right;
}

.fc-toolbar .fc-center {
	display: inline-block;
}

/* the things within each left/right/center section */
.fc .fc-toolbar > * > * { /* extra precedence to override button border margins */
	float: left;
	margin-left: .75em;
}

/* the first thing within each left/center/right section */
.fc .fc-toolbar > * > :first-child { /* extra precedence to override button border margins */
	margin-left: 0;
}
	
/* title text */

.fc-toolbar h2 {
	margin: 0;
}

/* button layering (for border precedence) */

.fc-toolbar button {
	position: relative;
}

.fc-toolbar .fc-state-hover,
.fc-toolbar .ui-state-hover {
	z-index: 2;
}
	
.fc-toolbar .fc-state-down {
	z-index: 3;
}

.fc-toolbar .fc-state-active,
.fc-toolbar .ui-state-active {
	z-index: 4;
}

.fc-toolbar button:focus {
	z-index: 5;
}


/* View Structure
--------------------------------------------------------------------------------------------------*/

/* undo twitter bootstrap's box-sizing rules. normalizes positioning techniques */
/* don't do this for the toolbar because we'll want bootstrap to style those buttons as some pt */
.fc-view-container *,
.fc-view-container *:before,
.fc-view-container *:after {
	-webkit-box-sizing: content-box;
	   -moz-box-sizing: content-box;
	        box-sizing: content-box;
}

.fc-view, /* scope positioning and z-index's for everything within the view */
.fc-view > table { /* so dragged elements can be above the view's main element */
	position: relative;
	z-index: 1;
}



/* BasicView
--------------------------------------------------------------------------------------------------*/

/* day row structure */

.fc-basicWeek-view .fc-content-skeleton,
.fc-basicDay-view .fc-content-skeleton {
	/* there may be week numbers in these views, so no padding-top */
	padding-bottom: 1em; /* ensure a space at bottom of cell for user selecting/clicking */
}

.fc-basic-view .fc-body .fc-row {
	min-height: 4em; /* ensure that all rows are at least this tall */
}

/* a "rigid" row will take up a constant amount of height because content-skeleton is absolute */

.fc-row.fc-rigid {
	overflow: hidden;
}

.fc-row.fc-rigid .fc-content-skeleton {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
}

/* week and day number styling */

.fc-day-top.fc-other-month {
	opacity: 0.3;
}

.fc-basic-view .fc-week-number,
.fc-basic-view .fc-day-number {
	padding: 2px;
}

.fc-basic-view th.fc-week-number,
.fc-basic-view th.fc-day-number {
	padding: 0 2px; /* column headers can't have as much v space */
}

.fc-ltr .fc-basic-view .fc-day-top .fc-day-number { float: right; }
.fc-rtl .fc-basic-view .fc-day-top .fc-day-number { float: left; }

.fc-ltr .fc-basic-view .fc-day-top .fc-week-number { float: left; border-radius: 0 0 3px 0; }
.fc-rtl .fc-basic-view .fc-day-top .fc-week-number { float: right; border-radius: 0 0 0 3px; }

.fc-basic-view .fc-day-top .fc-week-number {
	min-width: 1.5em;
	text-align: center;
	background-color: #f2f2f2;
	color: #808080;
}

/* when week/day number have own column */

.fc-basic-view td.fc-week-number {
	text-align: center;
}

.fc-basic-view td.fc-week-number > * {
	/* work around the way we do column resizing and ensure a minimum width */
	display: inline-block;
	min-width: 1.25em;
}


/* AgendaView all-day area
--------------------------------------------------------------------------------------------------*/

.fc-agenda-view .fc-day-grid {
	position: relative;
	z-index: 2; /* so the "more.." popover will be over the time grid */
}

.fc-agenda-view .fc-day-grid .fc-row {
	min-height: 3em; /* all-day section will never get shorter than this */
}

.fc-agenda-view .fc-day-grid .fc-row .fc-content-skeleton {
	padding-bottom: 1em; /* give space underneath events for clicking/selecting days */
}


/* TimeGrid axis running down the side (for both the all-day area and the slot area)
--------------------------------------------------------------------------------------------------*/

.fc .fc-axis { /* .fc to overcome default cell styles */
	vertical-align: middle;
	padding: 0 4px;
	white-space: nowrap;
}

.fc-ltr .fc-axis {
	text-align: right;
}

.fc-rtl .fc-axis {
	text-align: left;
}

.ui-widget td.fc-axis {
	font-weight: normal; /* overcome jqui theme making it bold */
}


/* TimeGrid Structure
--------------------------------------------------------------------------------------------------*/

.fc-time-grid-container, /* so scroll container's z-index is below all-day */
.fc-time-grid { /* so slats/bg/content/etc positions get scoped within here */
	position: relative;
	z-index: 1;
}

.fc-time-grid {
	min-height: 100%; /* so if height setting is 'auto', .fc-bg stretches to fill height */
}

.fc-time-grid table { /* don't put outer borders on slats/bg/content/etc */
	border: 0 hidden transparent;
}

.fc-time-grid > .fc-bg {
	z-index: 1;
}

.fc-time-grid .fc-slats,
.fc-time-grid > hr { /* the <hr> AgendaView injects when grid is shorter than scroller */
	position: relative;
	z-index: 2;
}

.fc-time-grid .fc-content-col {
	position: relative; /* because now-indicator lives directly inside */
}

.fc-time-grid .fc-content-skeleton {
	position: absolute;
	z-index: 3;
	top: 0;
	left: 0;
	right: 0;
}

/* divs within a cell within the fc-content-skeleton */

.fc-time-grid .fc-business-container {
	position: relative;
	z-index: 1;
}

.fc-time-grid .fc-bgevent-container {
	position: relative;
	z-index: 2;
}

.fc-time-grid .fc-highlight-container {
	position: relative;
	z-index: 3;
}

.fc-time-grid .fc-event-container {
	position: relative;
	z-index: 4;
}

.fc-time-grid .fc-now-indicator-line {
	z-index: 5;
}

.fc-time-grid .fc-helper-container { /* also is fc-event-container */
	position: relative;
	z-index: 6;
}


/* TimeGrid Slats (lines that run horizontally)
--------------------------------------------------------------------------------------------------*/

.fc-time-grid .fc-slats td {
	height: 1.5em;
	border-bottom: 0; /* each cell is responsible for its top border */
}

.fc-time-grid .fc-slats .fc-minor td {
	border-top-style: dotted;
}

.fc-time-grid .fc-slats .ui-widget-content { /* for jqui theme */
	background: none; /* see through to fc-bg */
}


/* TimeGrid Highlighting Slots
--------------------------------------------------------------------------------------------------*/

.fc-time-grid .fc-highlight-container { /* a div within a cell within the fc-highlight-skeleton */
	position: relative; /* scopes the left/right of the fc-highlight to be in the column */
}

.fc-time-grid .fc-highlight {
	position: absolute;
	left: 0;
	right: 0;
	/* top and bottom will be in by JS */
}


/* TimeGrid Event Containment
--------------------------------------------------------------------------------------------------*/

.fc-ltr .fc-time-grid .fc-event-container { /* space on the sides of events for LTR (default) */
	margin: 0 2.5% 0 2px;
}

.fc-rtl .fc-time-grid .fc-event-container { /* space on the sides of events for RTL */
	margin: 0 2px 0 2.5%;
}

.fc-time-grid .fc-event,
.fc-time-grid .fc-bgevent {
	position: absolute;
	z-index: 1; /* scope inner z-index's */
}

.fc-time-grid .fc-bgevent {
	/* background events always span full width */
	left: 0;
	right: 0;
}


/* Generic Vertical Event
--------------------------------------------------------------------------------------------------*/

.fc-v-event.fc-not-start { /* events that are continuing from another day */
	/* replace space made by the top border with padding */
	border-top-width: 0;
	padding-top: 1px;

	/* remove top rounded corners */
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}

.fc-v-event.fc-not-end {
	/* replace space made by the top border with padding */
	border-bottom-width: 0;
	padding-bottom: 1px;

	/* remove bottom rounded corners */
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
}


/* TimeGrid Event Styling
----------------------------------------------------------------------------------------------------
We use the full "fc-time-grid-event" class instead of using descendants because the event won't
be a descendant of the grid when it is being dragged.
*/

.fc-time-grid-event {
	overflow: hidden; /* don't let the bg flow over rounded corners */
}

.fc-time-grid-event.fc-selected {
	/* need to allow touch resizers to extend outside event's bounding box */
	/* common fc-selected styles hide the fc-bg, so don't need this anyway */
	overflow: visible;
}

.fc-time-grid-event.fc-selected .fc-bg {
	display: none; /* hide semi-white background, to appear darker */
}

.fc-time-grid-event .fc-content {
	overflow: hidden; /* for when .fc-selected */
}

.fc-time-grid-event .fc-time,
.fc-time-grid-event .fc-title {
	padding: 0 1px;
}

.fc-time-grid-event .fc-time {
	font-size: .85em;
	white-space: nowrap;
}

/* short mode, where time and title are on the same line */

.fc-time-grid-event.fc-short .fc-content {
	/* don't wrap to second line (now that contents will be inline) */
	white-space: nowrap;
}

.fc-time-grid-event.fc-short .fc-time,
.fc-time-grid-event.fc-short .fc-title {
	/* put the time and title on the same line */
	display: inline-block;
	vertical-align: top;
}

.fc-time-grid-event.fc-short .fc-time span {
	display: none; /* don't display the full time text... */
}

.fc-time-grid-event.fc-short .fc-time:before {
	content: attr(data-start); /* ...instead, display only the start time */
}

.fc-time-grid-event.fc-short .fc-time:after {
	content: "\\000A0-\\000A0"; /* seperate with a dash, wrapped in nbsp's */
}

.fc-time-grid-event.fc-short .fc-title {
	font-size: .85em; /* make the title text the same size as the time */
	padding: 0; /* undo padding from above */
}

/* resizer (cursor device) */

.fc-time-grid-event.fc-allow-mouse-resize .fc-resizer {
	left: 0;
	right: 0;
	bottom: 0;
	height: 8px;
	overflow: hidden;
	line-height: 8px;
	font-size: 11px;
	font-family: monospace;
	text-align: center;
	cursor: s-resize;
}

.fc-time-grid-event.fc-allow-mouse-resize .fc-resizer:after {
	content: "=";
}

/* resizer (touch device) */

.fc-time-grid-event.fc-selected .fc-resizer {
	/* 10x10 dot */
	border-radius: 5px;
	border-width: 1px;
	width: 8px;
	height: 8px;
	border-style: solid;
	border-color: inherit;
	background: #fff;
	/* horizontally center */
	left: 50%;
	margin-left: -5px;
	/* center on the bottom edge */
	bottom: -5px;
}


/* Now Indicator
--------------------------------------------------------------------------------------------------*/

.fc-time-grid .fc-now-indicator-line {
	border-top-width: 1px;
	left: 0;
	right: 0;
}

/* arrow on axis */

.fc-time-grid .fc-now-indicator-arrow {
	margin-top: -5px; /* vertically center on top coordinate */
}

.fc-ltr .fc-time-grid .fc-now-indicator-arrow {
	left: 0;
	/* triangle pointing right... */
	border-width: 5px 0 5px 6px;
	border-top-color: transparent;
	border-bottom-color: transparent;
}

.fc-rtl .fc-time-grid .fc-now-indicator-arrow {
	right: 0;
	/* triangle pointing left... */
	border-width: 5px 6px 5px 0;
	border-top-color: transparent;
	border-bottom-color: transparent;
}



/* List View
--------------------------------------------------------------------------------------------------*/

/* possibly reusable */

.fc-event-dot {
	display: inline-block;
	width: 10px;
	height: 10px;
	border-radius: 5px;
}

/* view wrapper */

.fc-rtl .fc-list-view {
	direction: rtl; /* unlike core views, leverage browser RTL */
}

.fc-list-view {
	border-width: 1px;
	border-style: solid;
}

/* table resets */

.fc .fc-list-table {
	table-layout: auto; /* for shrinkwrapping cell content */
}

.fc-list-table td {
	border-width: 1px 0 0;
	padding: 8px 14px;
}

.fc-list-table tr:first-child td {
	border-top-width: 0;
}

/* day headings with the list */

.fc-list-heading {
	border-bottom-width: 1px;
}

.fc-list-heading td {
	font-weight: bold;
}

.fc-ltr .fc-list-heading-main { float: left; }
.fc-ltr .fc-list-heading-alt { float: right; }

.fc-rtl .fc-list-heading-main { float: right; }
.fc-rtl .fc-list-heading-alt { float: left; }

/* event list items */

.fc-list-item.fc-has-url {
	cursor: pointer; /* whole row will be clickable */
}

.fc-list-item:hover td {
	background-color: #f5f5f5;
}

.fc-list-item-marker,
.fc-list-item-time {
	white-space: nowrap;
	width: 1px;
}

/* make the dot closer to the event title */
.fc-ltr .fc-list-item-marker { padding-right: 0; }
.fc-rtl .fc-list-item-marker { padding-left: 0; }

.fc-list-item-title a {
	/* every event title cell has an <a> tag */
	text-decoration: none;
	color: inherit;
}

.fc-list-item-title a[href]:hover {
	/* hover effect only on titles with hrefs */
	text-decoration: underline;
}

/* message when no events */

.fc-list-empty-wrap2 {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

.fc-list-empty-wrap1 {
	width: 100%;
	height: 100%;
	display: table;
}

.fc-list-empty {
	display: table-cell;
	vertical-align: middle;
	text-align: center;
}

.fc-unthemed .fc-list-empty { /* theme will provide own background */
	background-color: #eee;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "DIlQ":
/*!****************************************************************************!*\
  !*** ./modules/CalendarWebclient/js/vendors/fullcalendar/fullcalendar.css ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "LboF");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "5Hnr");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "shRe");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "3c4z");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "3mzb");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "Hd6Y");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_fullcalendar_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js!./fullcalendar.css */ "fxCR");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_fullcalendar_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_fullcalendar_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_fullcalendar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_fullcalendar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "LboF":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "shRe":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "3mzb":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "3c4z":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "5Hnr":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "Hd6Y":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

}]);