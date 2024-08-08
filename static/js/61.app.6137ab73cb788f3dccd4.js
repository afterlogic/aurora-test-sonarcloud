(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[61],{

/***/ "M0Qh":
/*!**********************************************!*\
  !*** ./modules/CalendarWebclient/js/Ajax.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
	
	Settings = __webpack_require__(/*! modules/CalendarWebclient/js/Settings.js */ "KvAJ")
;

Ajax.registerAbortRequestHandler(Settings.ServerModuleName, function (oRequest, oOpenedRequest) {
	switch (oRequest.Method)
	{
		case 'UpdateEvent':
			var
				oParameters = oRequest.Parameters,
				oOpenedParameters = oOpenedRequest.Parameters
			;
			return	oOpenedRequest.Method === 'UpdateEvent' && 
					oOpenedParameters.calendarId === oParameters.calendarId && 
					oOpenedParameters.uid === oParameters.uid;
		case 'GetCalendars':
			return oOpenedRequest.Method === 'GetCalendars';
		case 'GetPublicCalendar':
			return oOpenedRequest.Method === 'GetPublicCalendar';
		case 'GetEvents':
			return oOpenedRequest.Method === 'GetEvents';
	}
	
	return false;
});

module.exports = {
	send: function (sMethod, oParameters, fResponseHandler, oContext, sServerModuleName) {
		Ajax.send(
			sServerModuleName ? sServerModuleName : Settings.ServerModuleName,
			sMethod,
			oParameters,
			fResponseHandler,
			oContext
		);
	}
};


/***/ }),

/***/ "exyt":
/*!***********************************************!*\
  !*** ./modules/CalendarWebclient/js/Cache.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	ko = __webpack_require__(/*! knockout */ "p09A"),
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	
	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	
	Ajax = __webpack_require__(/*! modules/CalendarWebclient/js/Ajax.js */ "M0Qh")
;

/**
 * @constructor
 */
function CCalendarCache()
{
	// uses only for ical-attachments
	this.calendars = ko.observableArray([]);
	this.calendarsLoadingStarted = ko.observable(false);
	
	this.icalAttachments = [];
	
	this.recivedAnim = ko.observable(false).extend({'autoResetToFalse': 500});
	
	this.calendarSettingsChanged = ko.observable(false);
	this.calendarChanged = ko.observable(false);
}

/**
 * @param {Object} oIcal
 */
CCalendarCache.prototype.addIcal = function (oIcal)
{
	_.each(this.icalAttachments, function (oIcalItem) {
		if (oIcalItem.uid() === oIcal.uid() && oIcal.sSequence !== oIcalItem.sSequence)
		{
			if (oIcal.sSequence > oIcalItem.sSequence)
			{
				oIcalItem.lastModification(false);
			}
			else
			{
				oIcal.lastModification(false);
			}
		}
	});
	this.icalAttachments.push(oIcal);
	if (this.calendars().length === 0)
	{
		this.requestCalendarList();
	}
};

/**
 * @param {string} sFile
 */
CCalendarCache.prototype.getIcal = function (sFile)
{
	return _.find(this.icalAttachments, function (oIcal) {
		return (sFile === oIcal.file());
	});
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CCalendarCache.prototype.onGetCalendarsResponse = function (oResponse, oRequest)
{
	if (oResponse && oResponse.Result && oResponse.Result.Calendars)
	{
		var
			sCurrentEmail = App.currentAccountEmail ? App.currentAccountEmail() : '',
			aEditableCalendars = _.filter(oResponse.Result.Calendars, function (oCalendar) {
				return oCalendar.Owner === sCurrentEmail ||
					oCalendar.Access === Enums.CalendarAccess.Full ||
					oCalendar.Access === Enums.CalendarAccess.Write;
			})
		;
		this.calendars(_.map(aEditableCalendars, function (oCalendar) {
			return {
				'name': oCalendar.Name + ' <' + oCalendar.Owner + '>', 
				'id': oCalendar.Id,
				'readonly': oCalendar.Subscribed
			};
		}));
	}
	
	this.calendarsLoadingStarted(false);
};

CCalendarCache.prototype.requestCalendarList = function ()
{
	if (!this.calendarsLoadingStarted())
	{
		Ajax.send('GetCalendars', null, this.onGetCalendarsResponse, this);
		
		this.calendarsLoadingStarted(true);
	}
};

/**
 * @param {string} sFile
 * @param {string} sType
 * @param {string} sCancelDecision
 * @param {string} sReplyDecision
 * @param {string} sCalendarId
 * @param {string} sSelectedCalendar
 */
CCalendarCache.prototype.markIcalTypeByFile = function (sFile, sType, sCancelDecision, sReplyDecision,
														sCalendarId, sSelectedCalendar)
{
	_.each(this.icalAttachments, function (oIcal) {
		if (sFile === oIcal.file())
		{
			oIcal.type(sType);
			oIcal.cancelDecision(sCancelDecision);
			oIcal.replyDecision(sReplyDecision);
			oIcal.calendarId(sCalendarId);
			oIcal.selectedCalendarId(sSelectedCalendar);
		}
	});
};

/**
 * @param {string} sUid
 */
CCalendarCache.prototype.markIcalNonexistent = function (sUid)
{
	_.each(this.icalAttachments, function (oIcal) {
		if (sUid === oIcal.uid())
		{
			oIcal.markNeededAction();
		}
	});
};

/**
 * @param {string} sUid
 */
CCalendarCache.prototype.markIcalNotSaved = function (sUid)
{
	_.each(this.icalAttachments, function (oIcal) {
		if (sUid === oIcal.uid())
		{
			oIcal.markNotSaved();
		}
	});
};

/**
 * @param {string} sUid
 */
CCalendarCache.prototype.markIcalTentative = function (sUid)
{
	_.each(this.icalAttachments, function (oIcal) {
		if (sUid === oIcal.uid())
		{
			oIcal.markTentative();
		}
	});
};

/**
 * @param {string} sUid
 */
CCalendarCache.prototype.markIcalAccepted = function (sUid)
{
	_.each(this.icalAttachments, function (oIcal) {
		if (sUid === oIcal.uid())
		{
			oIcal.markAccepted();
		}
	});
};

module.exports = new CCalendarCache();

/***/ }),

/***/ "KvAJ":
/*!**************************************************!*\
  !*** ./modules/CalendarWebclient/js/Settings.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L")
;

module.exports = {
	ServerModuleName: 'Calendar',
	HashModuleName: 'calendar',
	ServerMeetingsPluginName: 'CalendarMeetingsPlugin',
	ServerCorporateCalendarName: 'CorporateCalendar',
	
	ReminderValuesInMinutes: [5, 10, 15, 30, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 1080, 1440, 2880, 4320, 5760, 10080, 20160],
	AddDescriptionToTitle: false,
	AllowAppointments: true,
	AllowShare: false,
	AllowTasks: true,
	DefaultTab: '3', // 1 - day, 2 - week, 3 - month
	HighlightWorkingDays: true,
	HighlightWorkingHours: true,
	PublicCalendarId: '',
	WeekStartsOn: '0', // 0 - sunday, 1 - monday, 6 - saturday
	WorkdayEnds: '18',
	WorkdayStarts: '9',
	AllowSubscribedCalendars: false,
	AllowPrivateEvents: true,
	DefaultReminders: [],
	CalendarColors: ['#f09650'],
	ShowWeekNumbers: false,
	
	/**
	 * Initializes settings from AppData object sections.
	 * 
	 * @param {Object} oAppData Object contained modules settings.
	 */
	init: function (oAppData)
	{
		var
			oAppDataSection = oAppData[this.ServerModuleName],
			oAppMeetingsDataSection = oAppData[this.ServerMeetingsPluginName],
			oAppCorporateCalendarDataSection = oAppData[this.ServerCorporateCalendarName]
		;
		
		if (!_.isEmpty(oAppDataSection))
		{
			this.AddDescriptionToTitle = Types.pBool(oAppDataSection.AddDescriptionToTitle, this.AddDescriptionToTitle);
			if (this.AddDescriptionToTitle)
			{
				$('html').addClass('AddDescriptionToTitle');
			}
			if (!_.isEmpty(oAppCorporateCalendarDataSection))
			{
				this.AllowShare = Types.pBool(oAppCorporateCalendarDataSection.AllowShare, this.AllowShare);
			}
			this.AllowTasks = Types.pBool(oAppDataSection.AllowTasks, this.AllowTasks);
			this.DefaultTab = Types.pString(oAppDataSection.DefaultTab, this.DefaultTab); // 1 - day, 2 - week, 3 - month
			this.HighlightWorkingDays = Types.pBool(oAppDataSection.HighlightWorkingDays, this.HighlightWorkingDays);
			this.HighlightWorkingHours = Types.pBool(oAppDataSection.HighlightWorkingHours, this.HighlightWorkingHours);
			this.PublicCalendarId = Types.pString(oAppDataSection.PublicCalendarId, this.PublicCalendarId);
			this.WeekStartsOn = Types.pString(oAppDataSection.WeekStartsOn, this.WeekStartsOn); // 0 - sunday
			this.WorkdayEnds = Types.pString(oAppDataSection.WorkdayEnds, this.WorkdayEnds);
			this.WorkdayStarts = Types.pString(oAppDataSection.WorkdayStarts, this.WorkdayStarts);
			this.AllowSubscribedCalendars = Types.pBool(oAppDataSection.AllowSubscribedCalendars, this.AllowSubscribedCalendars);
			this.AllowPrivateEvents = Types.pBool(oAppDataSection.AllowPrivateEvents, this.AllowPrivateEvents);
			this.AllowDefaultReminders = Types.pBool(oAppDataSection.AllowDefaultReminders, this.AllowDefaultReminders);
			this.DefaultReminders = oAppDataSection.DefaultReminders, this.DefaultReminders;
			this.CalendarColors = oAppDataSection.CalendarColors, this.CalendarColors;
			this.ShowWeekNumbers = oAppDataSection.ShowWeekNumbers, this.ShowWeekNumbers;
			
		}
		if (!_.isEmpty(oAppMeetingsDataSection))
		{
			this.AllowAppointments = Types.pBool(oAppMeetingsDataSection.AllowAppointments, this.AllowAppointments);
		}
	},
	
	/**
	 * Updates new settings values after saving on server.
	 * 
	 * @param {boolean} bHighlightWorkingDays
	 * @param {boolean} bHighlightWorkingHours
	 * @param {number} iWorkDayStarts
	 * @param {number} iWorkDayEnds
	 * @param {number} iWeekStartsOn
	 * @param {number} iDefaultTab
	 */
	update: function (bHighlightWorkingDays, bHighlightWorkingHours, iWorkDayStarts, iWorkDayEnds, iWeekStartsOn, iDefaultTab, aDefaultReminders)
	{
		this.DefaultTab = iDefaultTab.toString();
		this.HighlightWorkingDays = bHighlightWorkingDays;
		this.HighlightWorkingHours = bHighlightWorkingHours;
		this.WeekStartsOn = iWeekStartsOn.toString();
		this.WorkdayEnds = iWorkDayEnds.toString();
		this.WorkdayStarts = iWorkDayStarts.toString();
		this.DefaultReminders = aDefaultReminders;
	}
};


/***/ }),

/***/ "k+x/":
/*!*******************************************************************!*\
  !*** ./modules/CalendarWebclient/js/models/CCalendarListModel.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),

	CCalendarModel = __webpack_require__(/*! modules/CalendarWebclient/js/models/CCalendarModel.js */ "nGOo")
;

/**
 * @param {Object} oParameters
 * @constructor
 */
function CCalendarListModel(oParameters)
{
	this.parentOnCalendarActiveChange = oParameters.onCalendarActiveChange;
	this.parentOnCalendarCollectionChange = oParameters.onCalendarCollectionChange;
	
	this.defaultCal = ko.observable(null);
	this.currentCal = ko.observable(null);
	
	this.collection = ko.observableArray([]);
	this.collection.subscribe(function () {
		this.pickCurrentCalendar(this.defaultCal());
		
		if (this.parentOnCalendarCollectionChange)
		{
			this.parentOnCalendarCollectionChange();
		}
	}, this);
	this.count = ko.computed(function () {
		return this.collection().length;
	}, this);
	
	this.own = ko.computed(function () {
		var 
			calendars = _.filter(this.collection(), 
				function(oItem){ return (!oItem.isShared()); 
			})
		;
		return calendars;
	}, this);
	this.ownCount = ko.computed(function () {
		return this.own().length;
	}, this);
	this.shared = ko.computed(function () {
		var 
			calendars = _.filter(this.collection(), 
				function(oItem){ return (oItem.isShared() && !oItem.isSharedToAll()); 
			})
		;
		return calendars;
	}, this);
	this.sharedCount = ko.computed(function () {
		return this.shared().length;
	}, this);
	this.sharedToAll = ko.computed(function () {
		var 
			calendars = _.filter(this.collection(), 
				function(oItem){ return (oItem.isShared() && oItem.isSharedToAll()); 
			})
		;
		return calendars;
	}, this);
	this.sharedToAllCount = ko.computed(function () {
		return this.sharedToAll().length;
	}, this);
	this.ids = ko.computed(function () {
		return _.map(this.collection(), function (oCalendar){
			return oCalendar.id;
		}, this);
	}, this);
}

/**
 * @param {Object=} pickedCalendar
 */
CCalendarListModel.prototype.pickCurrentCalendar = function (pickedCalendar)
{
	const isCalendarEditableAndActive = cal => cal.active() && cal.isEditable() && !cal.subscribed();
	if (!this.currentCal() || !isCalendarEditableAndActive(this.currentCal())) {
		if (pickedCalendar && isCalendarEditableAndActive(pickedCalendar)) {
			this.currentCal(pickedCalendar);
		} else if (this.defaultCal() && isCalendarEditableAndActive(this.defaultCal())) {
			this.currentCal(this.defaultCal());
		} else {
			let firstEditableCalendar = this.collection().find(isCalendarEditableAndActive);
			if (!firstEditableCalendar) {
				firstEditableCalendar = this.collection().find(cal => cal.isEditable() && !cal.subscribed());
			}
			if (firstEditableCalendar) {
				this.currentCal(firstEditableCalendar);
			}
		}
	}
};

/**
 * @param {string} sCalendarId
 */
CCalendarListModel.prototype.getCalendarById = function (sCalendarId)
{
	return _.find(this.collection(), function(oCalendar) {
		return oCalendar.id === sCalendarId;
	}, this);
};

/**
 * @param {Object=} oStart
 * @param {Object=} oEnd
 * @return {Array}
 */
CCalendarListModel.prototype.getEvents = function (oStart, oEnd)
{
	var
		aCalendarsEvents = [],
		aCalendarEvents = []
	;
	
	_.each(this.collection(), function (oCalendar) {
		if (oCalendar && oCalendar.active())
		{
			if (oStart && oEnd)
			{
				aCalendarEvents = oCalendar.getEvents(oStart, oEnd);
			}
			else
			{
				aCalendarEvents = oCalendar.events();
			}
			aCalendarsEvents = _.union(aCalendarsEvents, aCalendarEvents);
		}
	}, this);

	return aCalendarsEvents;
};

/**
 * @param {Object} oCalendarData
 * 
 * @return {Object}
 */
CCalendarListModel.prototype.parseCalendar = function (oCalendarData)
{
	var	oCalendar = new CCalendarModel();
	oCalendar.parse(oCalendarData);
	
	return oCalendar;
};
	
/**
 * @param {Object} oCalendarData
 * 
 * @return {Object}
 */
CCalendarListModel.prototype.parseAndAddCalendar = function (oCalendarData)
{
	var
		mIndex = 0,
		oClientCalendar = null,
		oCalendar = this.parseCalendar(oCalendarData)
	;
	
	oCalendar.active.subscribe(function (value) {
		this.parentOnCalendarActiveChange(oCalendar);
		var oPickCalendar = oCalendar.active() ? oCalendar : this.defaultCal();
		this.pickCurrentCalendar(oPickCalendar);
	}, this);
	
	if (oCalendar.isDefault)
	{
		this.defaultCal(oCalendar);
	}
	
	mIndex = this.calendarExists(oCalendar.id);
	if (mIndex || mIndex === 0)
	{
		oClientCalendar = this.getCalendarById(oCalendar.id);
		oCalendar.events(oClientCalendar.events());
		this.collection.splice(mIndex, 1, oCalendar);
		
	}
	else
	{
		this.collection.push(oCalendar);
	}
	
	//this.sort();
	
	return oCalendar;
};

/**
 * @param {string|number} sId
 * 
 * @return {?}
 */
CCalendarListModel.prototype.calendarExists = function (sId)
{
	var iIndex = _.indexOf(_.map(this.collection(), function(oItem){return oItem.id;}), sId);
	
	return (iIndex < 0) ? false : iIndex;
};

/**
 * @param {string} sId
 */
CCalendarListModel.prototype.removeCalendar = function (sId)
{
	this.collection(_.filter(this.collection(), function(oCalendar) {
		return oCalendar.id !== sId;
	}, this));
};


CCalendarListModel.prototype.clearCollection = function ()
{
	this.collection.removeAll();
};

CCalendarListModel.prototype.getColors = function ()
{
	return _.map(this.collection(), function (oCalendar) {
		return oCalendar.color().toLowerCase();
	}, this);
};

/**
 * @param {string} sId
 */
CCalendarListModel.prototype.setDefault = function (sId)
{
	_.each(this.collection(), function(oCalendar) {
		if (oCalendar.id !== sId)
		{
			oCalendar.isDefault = true;
			this.defaultCal(oCalendar);
		}
		else
		{
			oCalendar.isDefault = false;
		}
	}, this);
};

CCalendarListModel.prototype.sort = function ()
{
	var collection = _.sortBy(this.collection(), function(oCalendar){return oCalendar.name();});
	this.collection(_.sortBy(collection, function(oCalendar){return oCalendar.isShared();}));
};

/**
 * @param {Array} aIds
 */
CCalendarListModel.prototype.expunge = function (aIds)
{
	this.collection(_.filter(this.collection(), function(oCalendar) {
		return _.include(aIds, oCalendar.id);
	}, this));
};

module.exports = CCalendarListModel;


/***/ }),

/***/ "nGOo":
/*!***************************************************************!*\
  !*** ./modules/CalendarWebclient/js/models/CCalendarModel.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  moment = __webpack_require__(/*! moment */ "sdEb")

const Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
  UrlUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Url.js */ "Tt1R"),
  App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
  Storage = __webpack_require__(/*! modules/CoreWebclient/js/Storage.js */ "HCAJ")

const CalendarUtils = __webpack_require__(/*! modules/CalendarWebclient/js/utils/Calendar.js */ "nwS3"),
  DataFromServer = __webpack_require__(/*! modules/CalendarWebclient/js/utils/DataFromServer.js */ "W5ZY"),
  Settings = __webpack_require__(/*! modules/CalendarWebclient/js/Settings.js */ "KvAJ")

/**
 * @constructor
 */
function CCalendarModel() {
  this.id = 0
  this.sSyncToken = ''
  this.name = ko.observable('')
  this.description = ko.observable('')
  this.owner = ko.observable('')
  this.isDefault = false
  this.isShared = ko.observable(false)
  this.isSharedToAll = ko.observable(false)
  this.sharedToAllAccess = Enums.CalendarAccess.Read
  this.isPublic = ko.observable(false)
  this.url = ko.observable('')
  this.davUrl = ko.observable('')
  this.exportUrl = ko.observable('')
  this.pubUrl = ko.observable('')
  this.shares = ko.observableArray([])
  this.events = ko.observableArray([])
  this.eventsCount = ko.computed(function () {
    return this.events().length
  }, this)
  this.access = ko.observable(Enums.CalendarAccess.Write)

  this.color = ko.observable('')
  this.color.subscribe(function () {
    this.events(
      _.map(
        this.events(),
        function (oEvent) {
          oEvent.backgroundColor = oEvent.borderColor = this.color()
          return oEvent
        },
        this
      )
    )

    this.name.valueHasMutated()
  }, this)

  this.active = ko.observable(true)

  this.startDateTime = 0
  this.endDateTime = 0
  this.canShare = ko.computed(function () {
    return (
      !this.isShared() ||
      (this.isShared() && this.access() === Enums.CalendarAccess.Write && this.shares().length !== 0) ||
      this.isOwner()
    )
  }, this)
  this.bAllowShare = Settings.AllowShare
  this.bAllowAppointments = Settings.AllowAppointments

  this.subscribed = ko.observable(false)
  this.source = ko.observable('')
}

/**
 * @param {string} sColor
 * @returns {string}
 */
CCalendarModel.prototype.parseCssColor = function (sColor) {
  var sCssColor = Types.pString(sColor)

  if (sCssColor.length > 7) {
    sCssColor = sCssColor.substr(0, 7)
  } else if (sCssColor.length > 4 && sCssColor.length < 7) {
    sCssColor = sCssColor.substr(0, 4)
  }

  if (sCssColor.length === 4) {
    sCssColor = sCssColor[0] + sCssColor[1] + sCssColor[1] + sCssColor[2] + sCssColor[2] + sCssColor[3] + sCssColor[3]
  }

  if (!sCssColor.match(/^#[A-Fa-f0-9]{6}$/i)) {
    sCssColor = '#f09650'
  }

  return sCssColor
}

CCalendarModel.prototype.getIsActiveFromStorage = function () {
  if (Storage.hasData(this.id)) {
    const isActive = Storage.getData(this.id)
    Storage.removeData(this.id)
    Storage.setData(`aurora_calendar_${this.id}_is-active`, isActive)
    return isActive
  }
  if (Storage.hasData(`aurora_calendar_${this.id}_is-active`)) {
    return Storage.getData(`aurora_calendar_${this.id}_is-active`)
  }
  return true
}

/**
 * @param {Object} oData
 */
CCalendarModel.prototype.parse = function (oData) {
  this.id = Types.pString(oData.Id)
  this.sSyncToken = oData.SyncToken
  this.name(Types.pString(oData.Name))
  this.description(Types.pString(oData.Description))
  this.owner(Types.pString(oData.Owner))
  this.active(this.getIsActiveFromStorage())
  this.active.subscribe(() => {
    Storage.setData(`aurora_calendar_${this.id}_is-active`, this.active())
  })
  this.isDefault = !!oData.IsDefault
  this.isShared(!!oData.Shared)
  this.isSharedToAll(!!oData.SharedToAll)
  this.sharedToAllAccess = oData.SharedToAllAccess
  this.isPublic(!!oData.IsPublic)
  this.access(oData.Access)

  this.color(this.parseCssColor(oData.Color))
  this.url(Types.pString(oData.Url))
  this.exportUrl(UrlUtils.getAppPath() + '?calendar-download/' + Types.pString(oData.ExportHash))
  this.pubUrl(UrlUtils.getAppPath() + '?calendar-pub=' + Types.pString(oData.PubHash))
  this.shares(oData.Shares || [])

  _.each(
    oData.Events,
    function (oEvent) {
      this.addEvent(oEvent)
    },
    this
  )

  this.subscribed(!!oData.Subscribed)
  this.source(oData.Source)
}

/**
 * @param {Object} oEvent
 */
CCalendarModel.prototype.updateEvent = function (oEvent) {
  var bResult = false
  if (oEvent) {
    this.removeEvent(oEvent.id)
    this.addEvent(oEvent)
  }

  return bResult
}

/**
 * @param {Object} oEvent
 */
CCalendarModel.prototype.addEvent = function (oEvent) {
  if (oEvent && !this.eventExists(oEvent.id)) {
    this.events.push(this.parseEvent(oEvent))
  }
}

/**
 * @param {string} sId
 */
CCalendarModel.prototype.getEvent = function (sId) {
  return _.find(
    this.events(),
    function (oEvent) {
      return oEvent.id === sId
    },
    this
  )
}

/**
 * @param {string} sId
 *
 * @return {boolean}
 */
CCalendarModel.prototype.eventExists = function (sId) {
  return !!this.getEvent(sId)
}

/**
 * @param {Object} start
 * @param {Object} end
 */
CCalendarModel.prototype.getEvents = function (start, end) {
  var aResult = _.filter(
    this.events(),
    function (oEvent) {
      var iStart = start.unix(),
        iEnd = end.unix(),
        iEventStart = moment.utc(oEvent.start).unix(),
        iEventEnd = moment.utc(oEvent.end).unix()
      return (
        (iEventStart >= iStart && iEventEnd <= iEnd) ||
        (iEventStart <= iStart && iEventEnd >= iEnd) ||
        (iEventStart >= iStart && iEventStart <= iEnd) ||
        (iEventEnd <= iEnd && iEventEnd >= iStart)
      )
    },
    this
  )

  return aResult || []
}

/**
 * @param {string} sId
 */
CCalendarModel.prototype.removeEvent = function (sId) {
  this.events(
    _.filter(
      this.events(),
      function (oEvent) {
        return oEvent.id !== sId
      },
      this
    )
  )
}

/**
 * @param {string} sUid
 * @param {boolean=} bSkipExcluded = false
 */
CCalendarModel.prototype.removeEventByUid = function (sUid, bSkipExcluded) {
  this.events(
    _.filter(
      this.events(),
      function (oEvent) {
        return oEvent.uid !== sUid || (bSkipExcluded && oEvent.excluded)
      },
      this
    )
  )
}

CCalendarModel.prototype.removeEvents = function () {
  this.events([])
}

/**
 * @param {Array} aEventIds
 * @param {number} start
 * @param {number} end
 */
CCalendarModel.prototype.expungeEvents = function (aEventIds, start, end, type) {
  var aEventRemoveIds = []
  _.each(
    this.getEvents(moment.unix(start), moment.unix(end)),
    function (oEvent) {
      if (!_.include(aEventIds, oEvent.id) && oEvent.type === type) {
        aEventRemoveIds.push(oEvent.id)
      }
    },
    this
  )
  this.events(
    _.filter(
      this.events(),
      function (oEvent) {
        return !_.include(aEventRemoveIds, oEvent.id)
      },
      this
    )
  )
}

/**
 * @return {boolean}
 */
CCalendarModel.prototype.isEditable = function () {
  return this.access() !== Enums.CalendarAccess.Read
}

/**
 * @return {boolean}
 */
CCalendarModel.prototype.isOwner = function () {
  return App.getUserPublicId() === this.owner()
}

CCalendarModel.prototype.parseEvent = function (oEvent) {
  oEvent.description = DataFromServer.parseDescriptionLocation(oEvent.description)
  oEvent.location = DataFromServer.parseDescriptionLocation(oEvent.location)
  oEvent.title = CalendarUtils.getTitleForEvent(oEvent.subject, oEvent.description)
  oEvent.editable = oEvent.appointment ? false : true
  oEvent.backgroundColor = oEvent.borderColor = this.color()
  if (!_.isArray(oEvent.className)) {
    var className = oEvent.className
    oEvent.className = [className]
  }
  if (this.access() === Enums.CalendarAccess.Read) {
    if (!oEvent.className.includes('fc-event-readonly')) {
      oEvent.className.push('fc-event-readonly')
    }
    oEvent.editable = false
  } else {
    oEvent.className = _.filter(oEvent.className, function (sItem) {
      return sItem !== 'fc-event-readonly'
    })
    if (this.subscribed()) {
      oEvent.editable = false
    }
  }
  if (oEvent.rrule && !oEvent.excluded) {
    if (!oEvent.className.includes('fc-event-repeat')) {
      oEvent.className.push('fc-event-repeat')
    }
  } else {
    oEvent.className = _.filter(oEvent.className, function (sItem) {
      return sItem !== 'fc-event-repeat'
    })
  }
  if (Types.isNonEmptyArray(oEvent.attendees) && this.bAllowAppointments) {
    if (!oEvent.className.includes('fc-event-appointment')) {
      oEvent.className.push('fc-event-appointment')
    }
  } else {
    oEvent.className = _.filter(oEvent.className, function (sItem) {
      return sItem !== 'fc-event-appointment'
    })
  }
  if (oEvent.isPrivate && App.getUserPublicId() !== oEvent.owner) {
    oEvent.editable = false
  }
  if (oEvent.isPrivate) {
    if (!oEvent.className.includes('fc-event-private')) {
      oEvent.className.push('fc-event-private')
    }
  } else {
    oEvent.className = _.filter(oEvent.className, function (sItem) {
      return sItem !== 'fc-event-private'
    })
  }
  return oEvent
}

CCalendarModel.prototype.reloadEvents = function () {
  this.events(
    _.map(
      this.events(),
      function (oEvent) {
        return this.parseEvent(oEvent)
      },
      this
    )
  )
}

module.exports = CCalendarModel


/***/ }),

/***/ "6prR":
/*!***************************************************************!*\
  !*** ./modules/CalendarWebclient/js/popups/EditEventPopup.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const _ = __webpack_require__(/*! underscore */ "C3HO"),
  $ = __webpack_require__(/*! jquery */ "M4cL"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  moment = __webpack_require__(/*! moment */ "sdEb")

const DateUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Date.js */ "injE"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
  Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
  Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
  App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
  ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
  UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV"),
  Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
  CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
  AlertPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/AlertPopup.js */ "hT1I"),
  ConfirmPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/ConfirmPopup.js */ "XeMN")

const AppointmentUtils = __webpack_require__(/*! modules/CalendarWebclient/js/utils/Appointment.js */ "HZAs"),
  CalendarUtils = __webpack_require__(/*! modules/CalendarWebclient/js/utils/Calendar.js */ "nwS3"),
  Ajax = __webpack_require__(/*! modules/CalendarWebclient/js/Ajax.js */ "M0Qh"),
  Settings = __webpack_require__(/*! modules/CalendarWebclient/js/Settings.js */ "KvAJ"),
  CSimpleEditableView = __webpack_require__(/*! modules/CalendarWebclient/js/views/CSimpleEditableView.js */ "QDxx"),
  CLinkPopupEditableView = __webpack_require__(/*! modules/CalendarWebclient/js/views/CLinkPopupEditableView.js */ "8tGW")

/**
 * @constructor
 */
function CEditEventPopup() {
  CAbstractPopup.call(this)

  this.modified = false
  this.isPublic = App.isPublic()
  this.isEditable = ko.observable(false)
  this.isEditableReminders = ko.observable(false)
  this.selectedCalendarIsShared = ko.observable(false)
  this.selectedCalendarIsEditable = ko.observable(false)
  this.selectedCalendarIsSubscribed = ko.observable(false)

  this.callbackSave = null
  this.callbackDelete = null
  this.timeFormatMoment = 'HH:mm'
  this.dateFormatMoment = 'MM/DD/YYYY'
  this.dateFormatDatePicker = 'mm/dd/yy'
  this.ampmTimeFormat = ko.observable(false)

  this.calendarId = ko.observable(null)
  this.id = ko.observable(null)
  this.uid = ko.observable(null)
  this.recurrenceId = ko.observable(null)
  this.allEvents = ko.observable(Enums.CalendarEditRecurrenceEvent.AllEvents)

  this.isMyEvent = ko.observable(false)

  this.startDom = ko.observable(null)
  this.endDom = ko.observable(null)
  this.repeatEndDom = ko.observable(null)

  this.yearlyDayText = ko.observable('')
  this.monthlyDayText = ko.observable('')

  this.subject = ko.observable('').extend({ disableLinebreaks: true })

  this.linkPopupEditableView = new CLinkPopupEditableView()
  this.descriptionView = new CSimpleEditableView({
    isEditableObservable: this.isEditable,
    autosizeTriggerObservable: this.autosizeTrigger,
    linkPopupEditableView: this.linkPopupEditableView,
    allowEditLinks: true,
    placeholderText: TextUtils.i18n('CALENDARWEBCLIENT/LABEL_DESCRIPTION'),
  })
  this.locationView = new CSimpleEditableView({
    isEditableObservable: this.isEditable,
    autosizeTriggerObservable: this.autosizeTrigger,
    linkPopupEditableView: this.linkPopupEditableView,
    allowEditLinks: true,
    placeholderText: TextUtils.i18n('CALENDARWEBCLIENT/LABEL_LOCATION'),
  })

  this.lockSelectStartEndDate = ko.observable(false)

  this.startDate = ko.observable('')
  this.startTime = ko.observable('')
  this.startTime.subscribe(function () {
    this.selectStartDate()
  }, this)
  this.allDay = ko.observable(false)
  this.allDay.subscribe(function () {
    if (!this.allDay()) {
      this.setActualTime()
    }
  }, this)

  this.endDate = ko.observable('')
  this.endTime = ko.observable('')
  this.endTime.subscribe(function () {
    this.selectEndDate()
  }, this)

  this.repeatEndDate = ko.observable('')

  this.isEvOneDay = ko.observable(true)
  this.isEvOneTime = ko.observable(true)

  this.isRepeat = ko.observable(false)

  this.allowSetPrivateEvent = ko.observable(false)
  this.isPrivateEvent = ko.observable(false)

  this.repeatPeriodOptions = ko.observableArray(this.getDisplayedPeriods())
  this.repeatWeekIntervalOptions = ko.observableArray([1, 2, 3, 4])
  this.defaultAlarms = ko.observableArray(Settings.ReminderValuesInMinutes)
  this.alarmOptions = ko.observableArray([])
  this.timeOptions = ko.observableArray(
    CalendarUtils.getTimeListStepHalfHour(UserSettings.timeFormat() !== Enums.TimeFormat.F24 ? 'hh:mm A' : 'HH:mm')
  )
  UserSettings.timeFormat.subscribe(function () {
    this.timeOptions(
      CalendarUtils.getTimeListStepHalfHour(UserSettings.timeFormat() !== Enums.TimeFormat.F24 ? 'hh:mm A' : 'HH:mm')
    )
  }, this)

  this.displayedAlarms = ko.observableArray([])
  this.displayedAlarms.subscribe(function () {
    this.disableAlarms()
  }, this)

  this.excluded = ko.observable(false)
  this.rrule = ko.observable(null)
  this.repeatPeriod = ko.observable(Enums.CalendarRepeatPeriod.None)
  this.repeatPeriod.subscribe(function (iRepeatPeriod) {
    this.setDayOfWeek()
    this.isRepeat(!!iRepeatPeriod)
  }, this)
  this.repeatInterval = ko.observable(1)
  this.repeatCount = ko.observable(null)
  this.repeatWeekNum = ko.observable(null)

  this.weekMO = ko.observable(false)
  this.weekTU = ko.observable(false)
  this.weekWE = ko.observable(false)
  this.weekTH = ko.observable(false)
  this.weekFR = ko.observable(false)
  this.weekSA = ko.observable(false)
  this.weekSU = ko.observable(false)

  this.always = ko.observable(1)

  this.appointment = ko.observable(false)
  this.attendees = ko.observableArray([])
  this.attenderStatus = ko.observable(0)
  this.owner = ko.observable('')
  this.organizer = ko.observable('')

  this.recivedAnim = ko.observable(false).extend({ autoResetToFalse: 500 })
  this.whomAnimate = ko.observable('')
  this.guestAutocompleteItem = ko.observable(null)
  this.guestAutocomplete = ko.observable('')
  this.guestEmailFocus = ko.observable(false)
  this.guestAutocomplete.subscribe(function (sItem) {
    if (sItem === '') {
      this.guestAutocompleteItem(null)
    }
  }, this)

  this.condition = ko.observable('')

  this.autosizeTrigger = ko.observable(true)

  this.calendars = null

  this.calendarsList = ko.observableArray([])
  this.calendarColor = ko.observable('')
  this.selectedCalendarId = ko.observable('')
  this.selectedCalendarName = ko.observable('')
  this.selectedCalendarId.subscribe(function (sValue) {
    if (sValue) {
      var oCalendar = this.calendars.getCalendarById(sValue)

      this.owner(oCalendar.owner())
      this.selectedCalendarName(oCalendar.name())
      this.selectedCalendarIsShared(oCalendar.isShared())
      this.selectedCalendarIsEditable(oCalendar.isEditable() && !oCalendar.subscribed())
      this.selectedCalendarIsSubscribed(oCalendar.subscribed())
      this.changeCalendarColor(sValue)

      // isShared - only if shared to me
      // isSharedToAll - shared to me and shared by me
      // shares - shared to me and shared by me
      this.allowSetPrivateEvent(Settings.AllowPrivateEvents && !oCalendar.isShared() && !oCalendar.isSharedToAll())
    }
  }, this)

  this.subjectFocus = ko.observable(false)

  this.dateEdit = ko.observable(false)
  this.repeatEdit = ko.observable(false)
  this.guestsEdit = ko.observable(false)
  this.isEditForm = ko.computed(function () {
    return !!this.id()
  }, this)

  this.callbackAttendeeActionDecline = null

  this.additionalButtonControllers = ko.observableArray([])
  App.broadcastEvent('CalendarWebclient::RegisterEditEventController', {
    register: (controller, place) => {
      if (place === 'AdditionalButton') {
        this.additionalButtonControllers.push(controller)
      }
    },
    view: this,
  })

  this.bAllowAppointments = Settings.AllowAppointments
  this.bAllowTasks = Settings.AllowTasks

  this.eventType = ko.observable('VEVENT')
  this.status = ko.observable(false)
  this.isTask = ko.observable(false)
  this.isTaskApp = ko.observable(false)
  this.withDate = ko.observable(true)
  this.allowConvertEventToTask = ko.computed(function () {
    return this.isEditable() && !this.isTaskApp() && this.attendees().length === 0 && this.allEvents() === Enums.CalendarEditRecurrenceEvent.AllEvents;
  }, this);

  this.isTask.subscribe(function (value) {
    this.eventType(value ? 'VTODO' : 'VEVENT')
  }, this)

  this.allChanges = ko.computed(function () {
    this.subject()
    this.descriptionView.dataHtml()
    this.locationView.dataHtml()
    this.isRepeat()
    this.allDay()
    this.repeatPeriod()
    this.repeatInterval()
    this.repeatCount()
    this.repeatWeekNum()
    this.startDate()
    this.startTime()
    this.endDate()
    this.endTime()
    this.repeatEndDate()
    this.displayedAlarms()
    this.weekMO()
    this.weekTU()
    this.weekWE()
    this.weekTH()
    this.weekFR()
    this.weekSA()
    this.weekSU()
    this.always()
    this.attendees()
    this.selectedCalendarId()
    this.status()
    this.isTask()
    this.withDate()
    this.isPrivateEvent()

    this.modified = true
  }, this)

  this.aReminderPhrase = TextUtils.i18n('CALENDARWEBCLIENT/INFO_REMINDER').split('%')

  this.isAppointmentButtonsVisible = ko.observable(false)
}

_.extendOwn(CEditEventPopup.prototype, CAbstractPopup.prototype)

CEditEventPopup.prototype.PopupTemplate = 'CalendarWebclient_EditEventPopup'

/**
 * @param {Object} oElement
 * @param {Function} fSelect
 */
CEditEventPopup.prototype.createDatePickerObject = function (oElement, fSelect) {
  $(oElement).datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    monthNames: DateUtils.getMonthNamesArray(),
    dayNamesMin: TextUtils.i18n('COREWEBCLIENT/LIST_DAY_NAMES_MIN').split(' '),
    nextText: '',
    prevText: '',
    firstDay: Settings.WeekStartsOn,
    showOn: 'both',
    buttonText: ' ',
    dateFormat: this.dateFormatDatePicker,
    onSelect: fSelect,
  })

  $(oElement).on('mousedown', function () {
    $('#ui-datepicker-div').toggle()
  })
}

CEditEventPopup.prototype.initializeDatePickers = function () {
  this.createDatePickerObject(this.startDom(), this.selectStartDate.bind(this))
  this.createDatePickerObject(this.endDom(), this.selectEndDate.bind(this))
  this.createDatePickerObject(
    this.repeatEndDom(),
    function (sNewValue) {
      this.repeatEndDate(sNewValue)
    }.bind(this)
  )

  this.startDom().datepicker('option', 'dateFormat', this.dateFormatDatePicker)
  this.endDom().datepicker('option', 'dateFormat', this.dateFormatDatePicker)
  this.repeatEndDom().datepicker('option', 'dateFormat', this.dateFormatDatePicker)
}

/**
 * @param {Object} oParameters
 */
CEditEventPopup.prototype.onOpen = function (oParameters) {
  this.linkPopupEditableView.onOpen()

  var owner = App.getUserPublicId(),
    oEndMomentDate = null,
    oStartMomentDate = null,
    sAttendee = '',
    oCalendar = null,
    sCalendarOwner = '',
    oToday = moment()
  this.withDate(!!oParameters.Start && !!oParameters.End)

  if (!oParameters.Start && !oParameters.End) {
    if (oToday.minutes() > 30) {
      oToday.add(60 - oToday.minutes(), 'minutes')
    } else {
      oToday.minutes(30)
    }
    oToday.seconds(0).milliseconds(0)
    oParameters.Start = oToday
    oParameters.End = oToday.clone().add(30, 'minutes')
  }
  oEndMomentDate = oParameters.End ? oParameters.End.clone() : null
  oStartMomentDate = oParameters.Start ? oParameters.Start.clone() : null

  this.iDiffInMinutes = null

  this.eventType(oParameters.Type || 'VEVENT')
  this.isTask(this.eventType() === 'VTODO')

  this.calendarId(oParameters.SelectedCalendar)
  this.calendars = oParameters.Calendars

  oCalendar = this.calendars.getCalendarById(this.calendarId())
  if (oCalendar) {
    sCalendarOwner = oCalendar.owner()
  }

  this.callbackSave = oParameters.CallbackSave
  this.callbackDelete = oParameters.CallbackDelete
  this.callbackAttendeeActionDecline = oParameters.CallbackAttendeeActionDecline

  this.timeFormatMoment = oParameters.TimeFormat
  this.dateFormatMoment = Utils.getDateFormatForMoment(oParameters.DateFormat)
  this.dateFormatDatePicker = CalendarUtils.getDateFormatForDatePicker(oParameters.DateFormat)

  this.ampmTimeFormat(UserSettings.timeFormat() !== Enums.TimeFormat.F24)

  this.initializeDatePickers()

  this.allDay(oParameters.AllDay)

  //we are overwriting variables because the date format is incorrect from the full calendar
  oStartMomentDate = moment(oStartMomentDate.format('X'), 'X')
  oEndMomentDate = moment(oEndMomentDate.format('X'), 'X')

  if (oStartMomentDate) {
    this.setStartDate(oStartMomentDate, true)
    this.startTime(oStartMomentDate.format(this.timeFormatMoment))
  }
  if (oEndMomentDate && this.allDay()) {
    oEndMomentDate.subtract(1, 'days')
  }
  if (!oEndMomentDate && oStartMomentDate) {
    oEndMomentDate = oStartMomentDate
  }
  if (oEndMomentDate) {
    this.setEndDate(oEndMomentDate, true)
    this.endTime(oEndMomentDate.format(this.timeFormatMoment))
  }

  if (this.calendars) {
    this.calendarsList(
      _.filter(this.calendars.collection(), function (oItem) {
        return oItem.isEditable() && !oItem.subscribed()
      })
    )
  }

  if (!oParameters.Alarms && Settings.AllowDefaultReminders) {
    oParameters.Alarms = Settings.DefaultReminders
  }

  this.selectedCalendarId(oParameters.SelectedCalendar)
  this.selectedCalendarId.valueHasMutated()

  this.changeCalendarColor(this.selectedCalendarId())

  // parameters for event editing only (not for creating)
  this.id(oParameters.ID || null)
  this.uid(oParameters.Uid || null)
  this.recurrenceId(oParameters.RecurrenceId || null)

  this.subject(oParameters.Subject || '')

  this.status(oParameters.Status || false)
  this.locationView.setPlain(oParameters.Location)
  this.descriptionView.setPlain(oParameters.Description)
  this.allEvents(oParameters.AllEvents || Enums.CalendarEditRecurrenceEvent.AllEvents)

  this.isTaskApp(oParameters.IsTaskApp || false)

  this.populateAlarms(oParameters.Alarms)

  this.organizer(Types.pString(oParameters.Organizer))

  this.appointment(oParameters.Appointment)

  this.attendees(oParameters.Attendees || [])

  if (_.isFunction(App.getAttendee)) {
    sAttendee = App.getAttendee(this.attendees())
  }

  this.isMyEvent(
    ((this.organizer() != '' && owner === this.organizer()) || this.organizer() == '') &&
      (owner === oParameters.Owner || owner === sCalendarOwner)
  )
  this.editableSwitch(
    this.selectedCalendarIsShared(),
    this.selectedCalendarIsEditable(),
    this.isMyEvent(),
    this.selectedCalendarIsSubscribed()
  )

  this.setCurrentAttenderStatus(sAttendee, oParameters.Attendees || [])

  this.owner(oParameters.Owner || owner)

  this.guestAutocomplete('')

  this.excluded(oParameters.Excluded || false)
  this.rrule(oParameters.RRule || null);
  this.repeatRuleParse(oParameters.RRule || null)

  if (this.id() === null) {
    this.subjectFocus(true)
  }

  this.autosizeTrigger.notifySubscribers(true)

  this.modified = false

  this.isAppointmentButtonsVisible(
    this.appointment() &&
      this.selectedCalendarIsEditable() &&
      _.find(this.attendees(), function (oAttendee) {
        return oAttendee.email === owner
      })
  )

  this.isPrivateEvent(!!oParameters.IsPrivate)
}

/**
 * @param {string} sId
 */
CEditEventPopup.prototype.changeCalendarColor = function (sId) {
  if (_.isFunction(this.calendars.getCalendarById)) {
    var oCalendar = this.calendars.getCalendarById(sId)
    if (oCalendar) {
      this.calendarColor('')
      this.calendarColor(oCalendar.color())
    }
  }
}

CEditEventPopup.prototype.onIsTaskClick = function () {
  this.eventType(this.eventType() === 'VTODO' ? 'VEVENT' : 'VTODO')
}

CEditEventPopup.prototype.onSaveClick = function () {
  if (this.subject() === '') {
    Popups.showPopup(AlertPopup, [
      TextUtils.i18n('CALENDARWEBCLIENT/ERROR_SUBJECT_BLANK'),
      _.bind(function () {
        this.subjectFocus(true)
      }, this),
    ])
  } else {
    if (this.callbackSave) {
      var iPeriod = Types.pInt(this.repeatPeriod()),
        sDate = '',
        iUnixDate = null,
        iInterval = 0,
        oStart = moment(this.getDateTime(this.startDom(), this.startTime())),
        oEnd = moment(this.getDateTime(this.endDom(), this.endTime())),
        oEventData = {
          calendarId: this.calendarId(),
          newCalendarId: this.selectedCalendarId(),
          id: this.id(),
          uid: this.uid(),
          recurrenceId: this.recurrenceId(),
          allEvents: this.allEvents(),
          subject: this.subject(),
          title: CalendarUtils.getTitleForEvent(this.subject(), this.descriptionView.getPlain()),
          allDay: this.allDay(),
          location: this.locationView.getPlain(),
          description: this.descriptionView.getPlain(),
          alarms: this.getAlarmsArray(this.displayedAlarms()),
          attendees: this.attendees(),
          owner: this.owner(),
          modified: this.modified,
          type: this.eventType(),
          status: this.status(),
          withDate: this.withDate(),
          isPrivate: this.allowSetPrivateEvent() && this.isPrivateEvent(),
          excluded: this.excluded(),
        },
        iAlways = Types.pInt(this.always())
      if (this.allDay()) {
        oEnd.add(1, 'days')
      }

      oEventData.start = oStart
      oEventData.end = oEnd

      if (iPeriod) {
        sDate = this.repeatEndDom().datepicker('getDate')
        iUnixDate = sDate ? moment(sDate).unix() : null
        iInterval = this.repeatInterval()

        const rrule = {
          byDays: [],
          count: null,
          end: 0,
          interval: 1,
          period: iPeriod,
          until: null,
          weekNum: null,
        }

        switch (iPeriod) {
          case Enums.CalendarRepeatPeriod.Daily:
            if (iAlways === Enums.CalendarAlways.Disable) {
              rrule['end'] = 2;
              rrule['until'] = iUnixDate;
            } else if (iAlways === Enums.CalendarAlways.Enable) {
              rrule['end'] = 3;
            }
            break;
          case Enums.CalendarRepeatPeriod.Weekly:
            this.setDayOfWeek()
            rrule['byDays'] = this.getDays();
            rrule['interval'] = iInterval;
            if (iAlways === Enums.CalendarAlways.Disable) {
              rrule['end'] = 2;
              rrule['until'] = iUnixDate;
            } else if (iAlways === Enums.CalendarAlways.Enable) {
              rrule['end'] = 3;
            }
            break;
          case Enums.CalendarRepeatPeriod.Monthly:
          case Enums.CalendarRepeatPeriod.Yearly:
            //do nothing
            break;
        }

        oEventData.rrule = rrule;
      }

      this.callbackSave(oEventData)
    }

    this.closePopup()
  }
}

CEditEventPopup.prototype.onEscHandler = function () {
  if (this.dateEdit()) {
    this.dateEdit(false)
  } else {
    this.closePopup()
  }
}

CEditEventPopup.prototype.onClose = function () {
  this.linkPopupEditableView.onClose()
  this.hideAll()
  this.cleanAll()
}

CEditEventPopup.prototype.hideAll = function () {
  this.dateEdit(false)
  this.repeatEdit(false)
  this.guestsEdit(false)
}

CEditEventPopup.prototype.cleanAll = function () {
  if (this.isTask()) {
    this.withDate(false)
  } else {
    this.withDate(true)
  }
  this.isTask(false)
  this.subject('')
  this.descriptionView.setPlain('')
  this.locationView.setPlain('')
  this.isRepeat(false)
  this.allDay(false)
  this.repeatPeriod(Enums.CalendarRepeatPeriod.None)
  this.repeatInterval(1)
  this.repeatCount(null)
  this.repeatWeekNum(null)
  this.startDate('')
  this.startTime('')
  this.endDate('')
  this.endTime('')
  this.repeatEndDate('')
  this.displayedAlarms([])
  this.weekMO(false)
  this.weekTU(false)
  this.weekWE(false)
  this.weekTH(false)
  this.weekFR(false)
  this.weekSA(false)
  this.weekSU(false)
  this.attendees([])
  this.always(1)
  this.selectedCalendarId('')
  this.isPrivateEvent(false)

  this.attendees([])
}

CEditEventPopup.prototype.onDeleteClick = function () {
  if (this.callbackDelete) {
    var oEventData = {
      calendarId: this.selectedCalendarId(),
      id: this.id(),
      uid: this.uid(),
      recurrenceId: this.recurrenceId(),
      allEvents: this.allEvents(),
      subject: this.subject(),
      title: CalendarUtils.getTitleForEvent(this.subject(), this.descriptionView.getPlain()),
      start: moment(this.getDateTime(this.startDom(), this.startTime())),
      end: moment(this.getDateTime(this.endDom(), this.endTime())),
      allDay: this.allDay(),
      location: this.locationView.getPlain(),
      description: this.descriptionView.getPlain(),
    }
    this.callbackDelete(oEventData)
  }
  this.closePopup()
}

/**
 * @param {Object} oModel
 * @param {Object} oEv
 */
CEditEventPopup.prototype.showDates = function (oModel, oEv) {
  oEv.stopPropagation()
  this.dateEdit(!this.dateEdit())
}

CEditEventPopup.prototype.showGuests = function () {
  if (this.attendees().length > 0) {
    var sConfirm = TextUtils.i18n('CALENDARWEBCLIENT/CONFIRM_REMOVE_ALL_ATTENDEES'),
      fAction = _.bind(function (bResult) {
        if (bResult) {
          this.guestsEdit(false)
          this.guestEmailFocus(false)
          this.attendees([])
        }
      }, this)
    Popups.showPopup(ConfirmPopup, [sConfirm, fAction])
  } else {
    this.guestsEdit(!this.guestsEdit())
    this.guestEmailFocus(!this.guestEmailFocus())
  }
}

CEditEventPopup.prototype.onAddGuestClick = function () {
  var oGuestAutocompleteItem = this.guestAutocompleteItem(),
    sGuestAutocomplete = this.guestAutocomplete(),
    oItem = oGuestAutocompleteItem || { name: '', email: sGuestAutocomplete },
    bIsInvited = _.any(this.attendees(), function (oEl) {
      return oEl.email === oItem.email
    })
  if (oItem.email === '') {
    Screens.showError(TextUtils.i18n('CALENDARWEBCLIENT/ERROR_EMAIL_BLANK'))
  } else if (oItem.email === this.owner()) {
    this.recivedAnim(true)
  } else if (bIsInvited) {
    this.recivedAnim(true)
  } else {
    this.attendees.push({
      status: 0,
      name: oItem.name,
      email: oItem.email,
    })
  }

  this.whomAnimate(oItem.email)
  this.guestAutocomplete('')

  this.guestEmailFocus(true)
}

/**
 * @param {Array} aAlarms
 */
CEditEventPopup.prototype.populateAlarms = function (aAlarms) {
  if (aAlarms) {
    this.alarmOptions(this.getDisplayedAlarms(_.union(this.defaultAlarms(), aAlarms)))
    this.displayedAlarms(this.getDisplayedAlarms(aAlarms))
  } else {
    this.alarmOptions(this.getDisplayedAlarms(this.defaultAlarms()))
  }
}

/**
 * @param {Array} aMinutes
 */
CEditEventPopup.prototype.getDisplayedAlarms = function (aMinutes) {
  var aDisplayedAlarms = []

  if (aMinutes) {
    _.each(
      aMinutes,
      function (iMinutes) {
        var koAlarm = (this['alarm' + iMinutes] = ko.observable(iMinutes)),
          sText = CalendarUtils.getReminderFiendlyTitle(iMinutes)
        koAlarm.subscribe(function () {
          //alarm observable value not actual
          this.disableAlarms()
          this.modified = true
        }, this)

        aDisplayedAlarms.push({
          value: iMinutes,
          alarm: koAlarm,
          text: sText,
          isDisabled: false,
        })
      },
      this
    )
  }

  return _.sortBy(aDisplayedAlarms, function (oAlarm) {
    return oAlarm.value
  })
}

CEditEventPopup.prototype.getDisplayedPeriods = function () {
  return [
    {
      label: TextUtils.i18n('CALENDARWEBCLIENT/LABEL_REPEAT_NEVER'),
      value: 0,
    },
    {
      label: TextUtils.i18n('CALENDARWEBCLIENT/LABEL_REPEAT_DAILY'),
      value: 1,
    },
    {
      label: TextUtils.i18n('CALENDARWEBCLIENT/LABEL_REPEAT_WEEKLY'),
      value: 2,
    },
    {
      label: TextUtils.i18n('CALENDARWEBCLIENT/LABEL_REPEAT_MONTHLY'),
      value: 3,
    },
    {
      label: TextUtils.i18n('CALENDARWEBCLIENT/LABEL_REPEAT_YEARLY'),
      value: 4,
    },
  ]
}

/**
 * @param {Array} aDisplayedAlarms
 */
CEditEventPopup.prototype.getAlarmsArray = function (aDisplayedAlarms) {
  var aAlarms = []

  _.each(
    aDisplayedAlarms,
    function (oAlarm, iIdx) {
      aAlarms.push(oAlarm.alarm())
    },
    this
  )

  return _.sortBy(aAlarms, function (num) {
    return -num
  })
}

CEditEventPopup.prototype.addFirstAlarm = function () {
  if (!this.displayedAlarms().length) {
    this.displayedAlarms(this.getDisplayedAlarms([this.alarmOptions()[0].value]))
  } else {
    var sConfirm = TextUtils.i18n('CALENDARWEBCLIENT/CONFIRM_REMOVE_ALL_ALARMS'),
      fAction = _.bind(function (bResult) {
        if (bResult) {
          this.displayedAlarms.removeAll()
        }
      }, this)
    Popups.showPopup(ConfirmPopup, [sConfirm, fAction])
  }
}

CEditEventPopup.prototype.addAlarm = function () {
  var oDisplayedAlarm,
    aSortedAlarms,
    iMinutes = 0
  aSortedAlarms = _.sortBy(this.displayedAlarms(), function (oAlarm) {
    return oAlarm.alarm()
  })

  _.each(aSortedAlarms, function (oAlarm) {
    var nAlarmMinutes = oAlarm.alarm()

    if (nAlarmMinutes !== 5 && iMinutes <= 5) {
      iMinutes = 5
    } else if (nAlarmMinutes !== 10 && iMinutes <= 10) {
      iMinutes = 10
    } else if (nAlarmMinutes !== 15 && iMinutes <= 15) {
      iMinutes = 15
    } else if (nAlarmMinutes !== 30 && iMinutes <= 30) {
      iMinutes = 30
    } else if (nAlarmMinutes !== 1440 && iMinutes <= 1440) {
      iMinutes = 1440
    }
  })

  oDisplayedAlarm = this.getDisplayedAlarms([iMinutes])[0]

  this['alarm' + iMinutes] = ko.observable(iMinutes)
  this.displayedAlarms.push(oDisplayedAlarm)
}

/**
 * @param {Object} oItem
 */
CEditEventPopup.prototype.removeAlarm = function (oItem) {
  this.displayedAlarms.remove(oItem)
}

/**
 * @param {Object} oItem
 */
CEditEventPopup.prototype.removeGuest = function (oItem) {
  this.attendees.remove(oItem)
}

CEditEventPopup.prototype.disableAlarms = function () {
  _.each(
    this.alarmOptions(),
    function (oAlarm, iIdx) {
      oAlarm.isDisabled = _.any(this.displayedAlarms(), function (oItem) {
        return oItem.alarm() === oAlarm.value
      })
    },
    this
  )

  this.alarmOptions.valueHasMutated()
}

/**
 * @param {object} oRequest
 * @param {function} fResponse
 */
CEditEventPopup.prototype.autocompleteCallback = function (oRequest, fResponse) {
  const suggestParameters = {
      exceptEmail: this.owner(),
    },
    autocompleteCallback = ModulesManager.run('ContactsWebclient', 'getSuggestionsAutocompleteCallback', [
      suggestParameters,
    ])
  if (_.isFunction(autocompleteCallback)) {
    this.guestAutocompleteItem(null)
    autocompleteCallback(oRequest, fResponse)
  }
}

/**
 * @param {Object} oRepeatRule
 */
CEditEventPopup.prototype.repeatRuleParse = function (oRepeatRule) {
  var allEvents = this.allEvents()

  this.repeatEndDom().datepicker('option', 'minDate', this.getDateTime(this.endDom()))

  if (oRepeatRule && allEvents === Enums.CalendarEditRecurrenceEvent.AllEvents) {
    if (oRepeatRule.until) {
      var localUntill = new Date(oRepeatRule.until * 1000),
        utcUntil = new Date(
          localUntill.getUTCFullYear(),
          localUntill.getUTCMonth(),
          localUntill.getUTCDate(),
          localUntill.getUTCHours(),
          localUntill.getUTCMinutes(),
          localUntill.getUTCSeconds()
        )
      this.repeatEndDom().datepicker('setDate', utcUntil)
    }

    if (oRepeatRule.byDays.length) {
      _.each(
        oRepeatRule.byDays,
        function (sItem) {
          this['week' + sItem](true)
        },
        this
      )
    }
    this.repeatPeriod(oRepeatRule.period)
    this.repeatInterval(oRepeatRule.interval)
    this.repeatCount(oRepeatRule.count)
    this.repeatWeekNum(oRepeatRule.weekNum)
    this.always(oRepeatRule.end === 3 ? 1 : 0)
  }
}

CEditEventPopup.prototype.getDays = function () {
  var aDays = []

  if (this.weekMO()) {
    aDays.push('MO')
  }
  if (this.weekTU()) {
    aDays.push('TU')
  }
  if (this.weekWE()) {
    aDays.push('WE')
  }
  if (this.weekTH()) {
    aDays.push('TH')
  }
  if (this.weekFR()) {
    aDays.push('FR')
  }
  if (this.weekSA()) {
    aDays.push('SA')
  }
  if (this.weekSU()) {
    aDays.push('SU')
  }

  return aDays
}

CEditEventPopup.prototype.onMainPanelClick = function () {
  if (this.dateEdit()) {
    this.dateEdit(false)
  }
}

/**
 * @param {string} sDate
 */
CEditEventPopup.prototype.getDateWithoutYearIfMonthWord = function (sDate) {
  var aDate = sDate.split(' '),
    oNowMoment = moment(),
    oNowYear = oNowMoment.format('YYYY')
  if (aDate.length === 3 && oNowYear === aDate[2]) {
    return aDate[0] + ' ' + aDate[1]
  }
  return sDate
}

/**
 * @param {Object} oMomentDate
 * @param {boolean} bChangeInDatepicker
 */
CEditEventPopup.prototype.setStartDate = function (oMomentDate, bChangeInDatepicker) {
  if (bChangeInDatepicker) {
    this.startDom().datepicker('setDate', oMomentDate.toDate())
  }
  this.startDate(this.getDateWithoutYearIfMonthWord($(this.startDom()).val()))

  this.yearlyDayText(
    TextUtils.i18n('CALENDARWEBCLIENT/LABEL_REPEAT_YEARLY_DAYMONTH', {
      DAYMONTH: oMomentDate.format(this.getDateMonthFormat()),
    })
  )
  this.monthlyDayText(TextUtils.i18n('CALENDARWEBCLIENT/LABEL_REPEAT_MONTHLY_DAY', { DAY: oMomentDate.format('DD') }))
}

CEditEventPopup.prototype.selectStartDate = function () {
  if (!this.lockSelectStartEndDate() && this.startDate() && this.endDate()) {
    this.lockSelectStartEndDate(true)

    var oStartDate = this.getDateTime(this.startDom(), this.startTime()),
      oStartMomentDate = moment(oStartDate),
      oEndDate = this.getDateTime(this.endDom(), this.endTime()),
      oEndMomentDate = moment(oEndDate)
    if (Types.isNumber(this.iDiffInMinutes)) {
      oEndMomentDate = oStartMomentDate.clone().add(this.iDiffInMinutes, 'minutes')
      oEndDate = oEndMomentDate.toDate()
      this.setEndDate(oEndMomentDate, true)
      this.endTime(oEndMomentDate.format(this.timeFormatMoment))
    }

    if (oEndMomentDate.diff(oStartMomentDate, 'minutes') < 0) {
      this.setEndDate(oStartMomentDate, true)
      this.endTime(oStartMomentDate.format(this.timeFormatMoment))
    }

    this.isEvOneDay(oEndMomentDate.diff(oStartMomentDate, 'days') === 0)
    this.isEvOneTime(oEndMomentDate.diff(oStartMomentDate, 'minutes') === 0)

    this.setStartDate(oStartMomentDate, false)
    this.startTime(oStartMomentDate.format(this.timeFormatMoment))

    this.lockSelectStartEndDate(false)
  }
}

/**
 * @return {string}
 */
CEditEventPopup.prototype.getDateMonthFormat = function () {
  var sDateMonthFormat = this.dateFormatMoment.slice(0, -5)

  if ($.inArray(sDateMonthFormat, ['MM/DD', 'DD/MM', 'DD MMMM']) === -1) {
    sDateMonthFormat = 'MM/DD'
  }

  return sDateMonthFormat
}

/**
 * @param {Object} oMomentDate
 * @param {boolean} bChangeInDatepicker
 */
CEditEventPopup.prototype.setEndDate = function (oMomentDate, bChangeInDatepicker) {
  if (bChangeInDatepicker) {
    this.endDom().datepicker('setDate', oMomentDate.toDate())
  }
  this.endDate(this.getDateWithoutYearIfMonthWord($(this.endDom()).val()))
}

CEditEventPopup.prototype.selectEndDate = function () {
  if (!this.lockSelectStartEndDate() && this.endDate() && this.startDate()) {
    this.lockSelectStartEndDate(true)

    var oStartDate = this.getDateTime(this.startDom(), this.startTime()),
      oStartMomentDate = moment(oStartDate),
      oEndDate = this.getDateTime(this.endDom(), this.endTime()),
      oEndMomentDate = moment(oEndDate)
    this.iDiffInMinutes = oEndMomentDate.diff(oStartMomentDate, 'minutes')

    if (this.iDiffInMinutes < 0) {
      this.setStartDate(oEndMomentDate, true)
      this.startTime(oEndMomentDate.format(this.timeFormatMoment))
      this.iDiffInMinutes = 0
    }

    this.isEvOneDay(oEndMomentDate.diff(oStartMomentDate, 'days') === 0)
    this.isEvOneTime(oEndMomentDate.diff(oStartMomentDate, 'minutes') === 0)

    this.setEndDate(oEndMomentDate, false)
    this.endTime(oEndMomentDate.format(this.timeFormatMoment))
    this.repeatEndDom().datepicker('option', 'minDate', oEndDate)

    if (!this.isRepeat()) {
      this.repeatEndDom().datepicker('setDate', oEndMomentDate.add(7, 'days').toDate())
    }

    this.lockSelectStartEndDate(false)
  }
}

/**
 * @param {Object} oInput
 * @param {string} sTime
 * @return {Date}
 */
CEditEventPopup.prototype.getDateTime = function (oInput, sTime) {
  sTime = sTime ? moment(sTime, this.timeFormatMoment).format('HH:mm') : ''
  var oDate = oInput.datepicker('getDate'),
    aTime = sTime ? sTime.split(':') : []
  //in some cases aTime is a current time (it happens only once after page loading), in this case oDate is null, so code falls.
  // the checking if oDate is not null is necessary
  if (aTime.length === 2 && oDate !== null) {
    oDate.setHours(aTime[0])
    oDate.setMinutes(aTime[1])
  }

  return oDate
}

CEditEventPopup.prototype.setActualTime = function () {
  if (!this.lockSelectStartEndDate() && this.endDate() && this.startDate()) {
    this.lockSelectStartEndDate(true)

    var oNowMomentDate = moment(),
      sNowTime = oNowMomentDate.format(this.timeFormatMoment),
      oStartDate = this.getDateTime(this.startDom(), sNowTime),
      oStartMomentDate = moment(oStartDate),
      oEndDate = this.getDateTime(this.endDom(), sNowTime),
      oEndMomentDate = moment(oEndDate)
    if(_.isEqual(oStartMomentDate, oEndMomentDate)) {
      oEndMomentDate.add(30, 'minutes')
      this.isEvOneTime(false)
    }
    if (oStartMomentDate.minutes() > 30) {
      oStartMomentDate.add(60 - oStartMomentDate.minutes(), 'minutes')
      oEndMomentDate.add(90 - oEndMomentDate.minutes(), 'minutes')
    } else {
      oStartMomentDate.add(30 - oStartMomentDate.minutes(), 'minutes')
      oEndMomentDate.add(60 - oEndMomentDate.minutes(), 'minutes')
    }
    this.iDiffInMinutes = oEndMomentDate.diff(oStartMomentDate, 'minutes')
    this.setStartDate(oStartMomentDate, true)
    this.startTime(oStartMomentDate.format(this.timeFormatMoment))

    this.setEndDate(oEndMomentDate, true)
    this.endTime(oEndMomentDate.format(this.timeFormatMoment))

    this.lockSelectStartEndDate(false)
  }
}

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CEditEventPopup.prototype.onSetAppointmentActionResponse = function (oResponse, oRequest) {
  if (!oResponse.Result) {
    Api.showErrorByCode(oResponse, TextUtils.i18n('COREWEBCLIENT/ERROR_UNKNOWN'))
  }
}

/**
 * @param {string} sDecision
 */
CEditEventPopup.prototype.setAppointmentAction = function (sDecision) {
  const iDecision = AppointmentUtils.getIntDecision(sDecision)
  if (iDecision === this.attenderStatus()) {
    return
  }

  var aAttendees = this.attendees(),
    sEmail = App.getAttendee ? App.getAttendee(this.attendees()) : '',
    oAttendee = _.find(
      this.attendees(),
      function (oAttendee) {
        return oAttendee.email === sEmail
      },
      this
    ),
    oCalendar = this.calendars.getCalendarById(this.selectedCalendarId()),
    oParameters = {
      AppointmentAction: sDecision,
      CalendarId: this.selectedCalendarId(),
      EventId: this.uid(),
      Attendee: sEmail,
      RecurrenceId: this.recurrenceId(),
			AllEvents:  this.allEvents(),
    }
  if (oAttendee) {
    AppointmentUtils.markIcalInCache(sDecision, this.uid())
    Ajax.send('SetAppointmentAction', oParameters, this.onSetAppointmentActionResponse, this, 'CalendarMeetingsPlugin')

    oAttendee.status = iDecision
    this.attendees([])
    this.attendees(aAttendees)
    this.setCurrentAttenderStatus(oAttendee.email, this.attendees())
    if (
      sDecision === Enums.IcalConfig.Declined &&
      oCalendar &&
      this.callbackAttendeeActionDecline &&
      _.isFunction(this.callbackAttendeeActionDecline)
    ) {
      this.callbackAttendeeActionDecline(oCalendar, this.id())
      this.closePopup()
    }
  }
}

/**
 * @param {boolean} bShared
 * @param {boolean} bEditable
 * @param {boolean} bMyEvent
 * @param {boolean} bSubscrubed
 */
CEditEventPopup.prototype.editableSwitch = function (bShared, bEditable, bMyEvent, bSubscrubed = false) {
  this.isEditable(((bShared && bEditable) || bMyEvent) && !bSubscrubed)
  this.isEditableReminders(bEditable)
}

/**
 * @param {string} sCurrentEmail
 * @param {Array} aAttendees
 */
CEditEventPopup.prototype.setCurrentAttenderStatus = function (sCurrentEmail, aAttendees) {
  var oCurrentAttender = _.find(aAttendees, function (oAttender) {
    return oAttender.email === sCurrentEmail
  })

  this.attenderStatus(oCurrentAttender ? oCurrentAttender.status : 0)
}

CEditEventPopup.prototype.getAttenderTextStatus = function (sStatus) {
  switch (sStatus) {
    case 0:
      sStatus = TextUtils.i18n('CALENDARWEBCLIENT/LABEL_ATTENDER_STATUS_PENDING')
      break
    case 1:
      sStatus = TextUtils.i18n('CALENDARWEBCLIENT/LABEL_ATTENDER_STATUS_ACCEPTED')
      break
    case 2:
      sStatus = TextUtils.i18n('CALENDARWEBCLIENT/LABEL_ATTENDER_STATUS_DECLINED')
      break
    case 3:
      sStatus = TextUtils.i18n('CALENDARWEBCLIENT/LABEL_ATTENDER_STATUS_TENTATIVE')
      break
  }
  return sStatus
}

CEditEventPopup.prototype.setDayOfWeek = function () {
  if (this.repeatPeriod() === Enums.CalendarRepeatPeriod.Weekly && !this.getDays().length) {
    var iDayOfWeek = this.getDateTime(this.startDom()).getUTCDay()

    switch (iDayOfWeek) {
      case 0:
        this.weekMO(true)
        break
      case 1:
        this.weekTU(true)
        break
      case 2:
        this.weekWE(true)
        break
      case 3:
        this.weekTH(true)
        break
      case 4:
        this.weekFR(true)
        break
      case 5:
        this.weekSA(true)
        break
      case 6:
        this.weekSU(true)
        break
    }
  }
}

CEditEventPopup.prototype.switchTask = function (isTask) {
  this.isTask(isTask)
}

module.exports = new CEditEventPopup()


/***/ }),

/***/ "ZC11":
/*!*************************************************************************!*\
  !*** ./modules/CalendarWebclient/js/popups/EditEventRecurrencePopup.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	
	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX")
;

/**
 * @constructor
 */
function CEditEventRecurrencePopup()
{
	CAbstractPopup.call(this);
	
	this.fCallback = null;
	this.confirmDesc = ko.observable(TextUtils.i18n('CALENDARWEBCLIENT/CONFIRM_EDIT_RECURRENCE'));
	this.onlyThisInstanceButtonText = TextUtils.i18n('CALENDARWEBCLIENT/ACTION_CHANGE_ONLY_THIS_INSTANCE');
	this.allEventsButtonText = ko.observable(TextUtils.i18n('CALENDARWEBCLIENT/ACTION_CHANGE_ALL_EVENTS'));
	this.cancelButtonText = TextUtils.i18n('COREWEBCLIENT/ACTION_CANCEL');
}

_.extendOwn(CEditEventRecurrencePopup.prototype, CAbstractPopup.prototype);

CEditEventRecurrencePopup.prototype.PopupTemplate = 'CalendarWebclient_EditEventRecurrencePopup';

/**
 * @param {Function} fCallback
 */
CEditEventRecurrencePopup.prototype.onOpen = function (fCallback, sDataType)
{
	if (_.isFunction(fCallback))
	{
		this.fCallback = fCallback;
	}

	if (sDataType === 'VTODO') {
		this.confirmDesc(TextUtils.i18n('CALENDARWEBCLIENT/CONFIRM_EDIT_RECURRENCE_TASKS'));
		this.allEventsButtonText(TextUtils.i18n('CALENDARWEBCLIENT/ACTION_CHANGE_ALL_TASKS'));
	} else {
		this.confirmDesc(TextUtils.i18n('CALENDARWEBCLIENT/CONFIRM_EDIT_RECURRENCE'));
		this.allEventsButtonText(TextUtils.i18n('CALENDARWEBCLIENT/ACTION_CHANGE_ALL_EVENTS'));
	}
};

CEditEventRecurrencePopup.prototype.onlyThisInstanceButtonClick = function ()
{
	if (this.fCallback)
	{
		this.fCallback(Enums.CalendarEditRecurrenceEvent.OnlyThisInstance);
	}

	this.closePopup();
};

CEditEventRecurrencePopup.prototype.allEventsButtonClick = function ()
{
	if (this.fCallback)
	{
		this.fCallback(Enums.CalendarEditRecurrenceEvent.AllEvents);
	}

	this.closePopup();
};

CEditEventRecurrencePopup.prototype.cancelPopup = function ()
{
	if (this.fCallback)
	{
		this.fCallback(Enums.CalendarEditRecurrenceEvent.None);
	}

	this.closePopup();
};

module.exports = new CEditEventRecurrencePopup();


/***/ }),

/***/ "HZAs":
/*!***********************************************************!*\
  !*** ./modules/CalendarWebclient/js/utils/Appointment.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const
	CalendarCache = __webpack_require__(/*! modules/CalendarWebclient/js/Cache.js */ "exyt")
;

module.exports = {
	getIntDecision(sDecision) {
		switch (sDecision) {
			case Enums.IcalConfig.Accepted: return Enums.IcalConfigInt.Accepted;
			case Enums.IcalConfig.Tentative: return Enums.IcalConfigInt.Tentative;
			case Enums.IcalConfig.Declined: return Enums.IcalConfigInt.Declined;
			default: return Enums.IcalConfigInt.NeedsAction;
		}
	},

	markIcalInCache(sDecision, uid) {
		switch (sDecision) {
			case Enums.IcalConfig.Accepted:
				CalendarCache.markIcalAccepted(uid);
				break;
			case Enums.IcalConfig.Tentative:
				CalendarCache.markIcalTentative(uid);
				break;
			case Enums.IcalConfig.Declined:
				CalendarCache.markIcalNonexistent(uid);
				break;
		}
	}
};


/***/ }),

/***/ "nwS3":
/*!********************************************************!*\
  !*** ./modules/CalendarWebclient/js/utils/Calendar.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),

	CalendarUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Calendar.js */ "A3in"),
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),

	Settings = __webpack_require__(/*! modules/CalendarWebclient/js/Settings.js */ "KvAJ")
;

/**
 * @param {string} sSubject
 * @param {string} sDescription
 * 
 * @return {string}
 */
CalendarUtils.getTitleForEvent = function (sSubject, sDescription)
{
	if (Settings.AddDescriptionToTitle)
	{
		return $.trim((sSubject + ' ' + sDescription).replace(/[\n\r]/g, ' '));
	}
	else
	{
		var
			sTitle = sSubject ? $.trim(sSubject.replace(/[\n\r]/, ' ')) : '',
			iFirstSpacePos = sTitle.indexOf(' ', 180)
		;

		if (iFirstSpacePos >= 0)
		{
			sTitle = sTitle.substring(0, iFirstSpacePos) + '...';
		}

		if (sTitle.length > 200)
		{
			sTitle = sTitle.substring(0, 200) + '...';
		}

		return sTitle;
	}
};

/**
 * @param {integer} iMinutes
 * 
 * @return {string}
 */
CalendarUtils.getReminderFiendlyTitle = function (iMinutes)
{
	let sText = '' + iMinutes;

	if (iMinutes > 0 && iMinutes < 60)
	{
		sText = (TextUtils.i18n('COREWEBCLIENT/LABEL_MINUTES_PLURAL', {'COUNT': iMinutes}, null, iMinutes));
	}
	else if (iMinutes >= 60 && iMinutes < 1440)
	{
		sText = (TextUtils.i18n('CALENDARWEBCLIENT/LABEL_HOURS_PLURAL', {'COUNT': iMinutes / 60}, null, iMinutes / 60));
	}
	else if (iMinutes >= 1440 && iMinutes < 10080)
	{
		sText = (TextUtils.i18n('CALENDARWEBCLIENT/LABEL_DAYS_PLURAL', {'COUNT': iMinutes / 1440}, null, iMinutes / 1440));
	}
	else
	{
		sText = (TextUtils.i18n('CALENDARWEBCLIENT/LABEL_WEEKS_PLURAL', {'COUNT': iMinutes / 10080}, null, iMinutes / 10080));
	}

	return sText;
};

module.exports = CalendarUtils;


/***/ }),

/***/ "W5ZY":
/*!**************************************************************!*\
  !*** ./modules/CalendarWebclient/js/utils/DataFromServer.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "M4cL");


const
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	CDateModel = __webpack_require__(/*! modules/CoreWebclient/js/models/CDateModel.js */ "jNBr")

module.exports = {
	parseDescriptionLocation(rawValue) {
		const preparedValue = Types.pString(rawValue).replace(/\\n/g, '\n').replace(/\r/g, '')
		if (TextUtils.isHtml(preparedValue)) {
			const $desc = $(`<div>${preparedValue.replace(/\n/g, '<br />')}</div>`)
			$desc.find('a').attr('target', '_blank')
			return $desc.html()
		} else {
			return TextUtils.plainToHtml(preparedValue, true)
		}
	},

	formatDate(inputDate) {
		const date = new Date(Types.pString(inputDate))
		const oDateModel = new CDateModel()
		oDateModel.parse(date.getTime() / 1000)
		return oDateModel.getDate()
	},

}


/***/ }),

/***/ "8tGW":
/*!**********************************************************************!*\
  !*** ./modules/CalendarWebclient/js/views/CLinkPopupEditableView.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "M4cL");


const ko = __webpack_require__(/*! knockout */ "p09A");

function CLinkPopupEditableView()
{
	this.visibleLinkPopup = ko.observable(false);
	this.linkPopupDom = ko.observable(null);
	this.linkHrefDom = ko.observable(null);
	this.linkHref = ko.observable('');
	this.visibleLinkHref = ko.observable(false);
	this.allowEditLinks = ko.observable(false);
	this.currLink = false;

	this.onBodyClick = function (event) {
		const parent = $(event.target).parents('div.inline_popup');
		if (parent.length === 0) {
			this.closeAllPopups();
		}
	}.bind(this);
}

CLinkPopupEditableView.prototype.PopupTemplate = 'CalendarWebclient_LinkPopupEditableView';

CLinkPopupEditableView.prototype.onOpen = function () {
	$(document.body).on('click', this.onBodyClick);
};

CLinkPopupEditableView.prototype.onClose = function () {
	$(document.body).off('click', this.onBodyClick);
};

CLinkPopupEditableView.prototype.initInputField = function (inputField, allowEditLinks)
{
	inputField.on('click', 'a', function (event) {
		if (event.ctrlKey) {
			window.open(event.target.href, '_blank');
		} else {
			const currLink = event.currentTarget;
			if (this.visibleLinkPopup() && currLink === this.currLink) {
				this.currLink = null;
				this.hideLinkPopup();
			} else {
				this.allowEditLinks(allowEditLinks);
				this.showLinkPopup(currLink, inputField);
			}
		}
		event.preventDefault();
		event.stopPropagation();
	}.bind(this));
};

/**
 * @param {Object} currLink
 * @param {Object} inputField
 */
CLinkPopupEditableView.prototype.showLinkPopup = function (currLink, inputField)
{
	const
		$currLink = $(currLink),
		inputFieldParent = inputField.parents('div.row'),
		inputFieldPos = inputFieldParent.position(),
		linkPos = $currLink.position(),
		linkHeight = $currLink.height(),
		linkLeft = Math.round(linkPos.left + inputFieldPos.left),
		linkTop = Math.round(linkPos.top + linkHeight + inputFieldPos.top),
		css = {
			'left': linkLeft,
			'top': linkTop
		}
	;

	this.currLink = currLink;
	this.linkHref($currLink.attr('href') || $currLink.text());
	$(this.linkPopupDom()).css(css);
	$(this.linkHrefDom()).css(css);
	this.visibleLinkPopup(true);
};

CLinkPopupEditableView.prototype.hideLinkPopup = function ()
{
	this.visibleLinkPopup(false);
};

CLinkPopupEditableView.prototype.showChangeLink = function ()
{
	this.visibleLinkHref(true);
	this.hideLinkPopup();
};

CLinkPopupEditableView.prototype.changeLink = function ()
{
	this.changeLinkHref(this.linkHref());
	this.hideChangeLink();
};

CLinkPopupEditableView.prototype.hideChangeLink = function ()
{
	this.visibleLinkHref(false);
};

/**
 * @param {string} text
 * @return {string}
 */
CLinkPopupEditableView.prototype.normaliseURL = function (text)
{
	return text.search(/^https?:\/\/|^mailto:|^tel:/g) !== -1 ? text : 'http://' + text;
};

/**
 * @param {string} newHref
 */
CLinkPopupEditableView.prototype.changeLinkHref = function (newHref)
{
	const
		normHref = this.normaliseURL(newHref),
		currLink = $(this.currLink)
	;

	if (currLink) {
		if (currLink.attr('href') === currLink.text()) {
			currLink.text(normHref);
		}
		currLink.attr('href', normHref);
		this.currLink = null;
	}
};

CLinkPopupEditableView.prototype.removeCurrentLink = function ()
{
	if (this.currLink && document.createRange && window.getSelection) {
		const
			range = document.createRange(),
			selection = window.getSelection()
		;

		range.selectNodeContents(this.currLink);
		selection.removeAllRanges();
		selection.addRange(range);

		window.document.execCommand('unlink');
		this.currLink = null;
		this.hideLinkPopup();
	}
};

CLinkPopupEditableView.prototype.closeAllPopups = function ()
{
	this.currLink = null;
	this.hideLinkPopup();
	this.hideChangeLink();
};

module.exports = CLinkPopupEditableView;


/***/ }),

/***/ "QDxx":
/*!*******************************************************************!*\
  !*** ./modules/CalendarWebclient/js/views/CSimpleEditableView.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const ko = __webpack_require__(/*! knockout */ "p09A"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L")
function CSimpleEditableView({
  isEditableObservable,
  autosizeTriggerObservable,
  linkPopupEditableView,
  allowEditLinks,
  placeholderText,
}) {
  this.isEditable = isEditableObservable
  this.autosizeTrigger = autosizeTriggerObservable
  this.placeholderText = placeholderText

  this.dataHtml = ko.observable('')
  this.dataDom = ko.observable(null)
  this.dataDom.subscribe(function () {
    if (this.dataDom()) {
      this.dataDom().on(
        'keyup paste cut',
        function (event) {
          if (!event.ctrlKey && !event.metaKey && !event.altKey && !event.shiftKey) {
            this.dataHtml(this.dataDom().html())
          }
        }.bind(this)
      )
      this.dataDom().on('paste', function (event) {
        event = event.originalEvent || event
        const clipboardData = event.clipboardData || window.clipboardData
        if (clipboardData) {
          const text = Types.pString(clipboardData.getData('text'))
          const html = TextUtils.plainToHtml(text, true)
          window.document.execCommand('insertHTML', false, html)
          event.preventDefault()
        }
      })
      linkPopupEditableView.initInputField(this.dataDom(), allowEditLinks)
      if (this.dataHtml() !== '') {
        this.dataDom().html(this.dataHtml())
      }
    }
  }, this)
  this.dataFocus = ko.observable(false)
}

CSimpleEditableView.prototype.PopupTemplate = 'CalendarWebclient_SimpleEditableView'

CSimpleEditableView.prototype.getHtml = function () {
  return this.dataHtml()
}

CSimpleEditableView.prototype.getPlain = function () {
  return TextUtils.htmlToPlain(this.dataHtml())
}

CSimpleEditableView.prototype.setHtml = function (data) {
  this.setData(Types.pString(data).replace(/\r/g, '').replace(/\n/g, '<br />'))
}

CSimpleEditableView.prototype.setData = function (preparedData) {
  this.dataHtml(preparedData)
  if (this.dataDom()) {
    this.dataDom().html(this.dataHtml())
  }
}

CSimpleEditableView.prototype.setPlain = function (data) {
  let preparedData = Types.pString(data)
  if (!TextUtils.isHtml(preparedData)) {
    preparedData = TextUtils.plainToHtml(preparedData, true)
  }
  this.setData(preparedData)
}

module.exports = CSimpleEditableView


/***/ }),

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


/***/ })

}]);