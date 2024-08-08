"use strict";
(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[49],{

/***/ "jNBr":
/*!*******************************************************!*\
  !*** ./modules/CoreWebclient/js/models/CDateModel.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	moment = __webpack_require__(/*! moment */ "sdEb"),
			
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
	
	UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV")
;

/**
 * @constructor
 */
function CDateModel()
{
	this.iTimeStampInUTC = 0;
	this.oMoment = null;
}

/**
 * @param {number} iTimeStampInUTC
 */
CDateModel.prototype.parse = function (iTimeStampInUTC)
{
	this.iTimeStampInUTC = iTimeStampInUTC;
	this.oMoment = moment.unix(this.iTimeStampInUTC);
};

/**
 * @param {number} iYear
 * @param {number} iMonth
 * @param {number} iDay
 */
CDateModel.prototype.setDate = function (iYear, iMonth, iDay)
{
	this.oMoment = moment([iYear, iMonth, iDay]);
};

/**
 * @return {string}
 */
CDateModel.prototype.getTimeFormat = function ()
{
	return (UserSettings.timeFormat() === window.Enums.TimeFormat.F24) ? 'HH:mm' : 'hh:mm A';
};

/**
 * @return {string}
 */
CDateModel.prototype.getFullDate = function ()
{
	return this.getDate() + ' ' + this.getTime();	
};

/**
 * @return {string}
 */
CDateModel.prototype.getMidDate = function ()
{
	return this.getShortDate(true);
};

/**
 * @param {boolean=} bTime = false
 * 
 * @return {string}
 */
CDateModel.prototype.getShortDate = function (bTime)
{
	var
		sResult = '',
		oMomentNow = null
	;

	if (this.oMoment)
	{
		oMomentNow = moment();

		if (oMomentNow.format('L') === this.oMoment.format('L'))
		{
			sResult = this.oMoment.format(this.getTimeFormat());
		}
		else
		{
			if (oMomentNow.clone().subtract(1, 'days').format('L') === this.oMoment.format('L'))
			{
				sResult = TextUtils.i18n('COREWEBCLIENT/LABEL_YESTERDAY');
			}
			else
			{
				if (UserSettings.UserSelectsDateFormat)
				{
					sResult = this.oMoment.format(Utils.getDateFormatForMoment(UserSettings.dateFormat()));
				}
				else
				{
					if (oMomentNow.year() === this.oMoment.year())
					{
						sResult = this.oMoment.format('MMM D');
					}
					else
					{
						sResult = this.oMoment.format('MMM D, YYYY');
					}
				}
			}

			if (!!bTime)
			{
				sResult += ', ' + this.oMoment.format(this.getTimeFormat());
			}
		}
	}

	return sResult;
};

/**
 * @return {string}
 */
CDateModel.prototype.getDate = function ()
{
	var sFormat = 'ddd, MMM D, YYYY';
	
	if (UserSettings.UserSelectsDateFormat)
	{
		sFormat = 'ddd, ' + Utils.getDateFormatForMoment(UserSettings.dateFormat());
	}
	
	return (this.oMoment) ? this.oMoment.format(sFormat) : '';
};

/**
 * @return {string}
 */
CDateModel.prototype.getTime = function ()
{
	return (this.oMoment) ? this.oMoment.format(this.getTimeFormat()): '';
};

/**
 * @return {number}
 */
CDateModel.prototype.getTimeStampInUTC = function ()
{
	return this.iTimeStampInUTC;
};

module.exports = CDateModel;


/***/ }),

/***/ "yKBN":
/*!*************************************************************!*\
  !*** ./modules/CoreWebclient/js/views/CPageSwitcherView.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



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

/***/ "lcuU":
/*!*************************************!*\
  !*** ./modules/Tasks/js/manager.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



module.exports = function (oAppData) {
	var
		App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
		ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
		
		sModuleName = 'tasks'
	;
	
	if (App.isUserNormalOrTenant() && ModulesManager.isModuleEnabled('CalendarWebclient'))
	{
		var
			TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
			HeaderItemView = null
		;

		return {
			/**
			 * Returns list of functions that are return module screens.
			 * 
			 * @returns {Object}
			 */
			getScreens: function ()
			{
				var oScreens = {};
				
				oScreens[sModuleName] = function () {
					return __webpack_require__(/*! modules/Tasks/js/views/MainView.js */ "Jwba");
				};
				
				return oScreens;
			},
			
			/**
			 * Returns object of header item view of sales module.
			 * 
			 * @returns {Object}
			 */
			getHeaderItem: function () {
				if (HeaderItemView === null)
				{
					var CHeaderItemView = __webpack_require__(/*! modules/CoreWebclient/js/views/CHeaderItemView.js */ "C5H3");
					HeaderItemView = new CHeaderItemView(TextUtils.i18n('TASKS/ACTION_SHOW_TASKS'));
				}

				return {
					item: HeaderItemView,
					name: sModuleName
				};
			}
		};
	}
	
	return null;
};


/***/ }),

/***/ "Jwba":
/*!********************************************!*\
  !*** ./modules/Tasks/js/views/MainView.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	moment = __webpack_require__(/*! moment */ "sdEb"),
    
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
	
	Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	CAbstractScreenView = __webpack_require__(/*! modules/CoreWebclient/js/views/CAbstractScreenView.js */ "doeu"),
	CSelector = __webpack_require__(/*! modules/CoreWebclient/js/CSelector.js */ "vdUg"),
	CPageSwitcherView = __webpack_require__(/*! modules/CoreWebclient/js/views/CPageSwitcherView.js */ "yKBN"),
	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
	UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV"),
	
	CCalendarListModel = __webpack_require__(/*! modules/CalendarWebclient/js/models/CCalendarListModel.js */ "k+x/"),
	EditTaskPopup = __webpack_require__(/*! modules/CalendarWebclient/js/popups/EditEventPopup.js */ "6prR"),
	EditEventRecurrencePopup = __webpack_require__(/*! modules/CalendarWebclient/js/popups/EditEventRecurrencePopup.js */ "ZC11")
;

__webpack_require__(/*! jquery-ui/ui/widgets/datepicker */ "okSt");

/**
 * View that is used as screen of sales module.
 * 
 * @constructor
 */
function CMainView()
{
	this.saveCommand = Utils.createCommand(this, this.executeSave);	
	this.removeCommand = Utils.createCommand(this, this.executeRemove);	
	this.calendars = new CCalendarListModel({
		onCalendarCollectionChange: function () {},
		onCalendarActiveChange: function () {}
	});

	CAbstractScreenView.call(this, 'Tasks');
	this.iItemsPerPage = 20;
	/**
	 * Text for displaying in browser title when sales screen is shown.
	 */
	this.browserTitle = ko.observable(TextUtils.i18n('TASKS/HEADING_BROWSER_TAB'));
	this.tasksList = ko.observableArray([]);
	this.hiddenTasksList = ko.observableArray([]);
	this.selectedItem = ko.observable(null);
	this.isSearchFocused = ko.observable(false);
	this.searchInput = ko.observable('');
	
	this.selector = new CSelector(
		this.tasksList,
		_.bind(this.viewItem, this),
        this.executeRemove,
		_.bind(this.taskClickCallback, this)
	);
	
	this.searchClick = ko.observable(false);
	this.isSearch = ko.computed(function () {
		return this.searchInput() !== '' && this.searchClick();
	}, this);
	
	this.pageSwitcherLocked = ko.observable(false);
	this.oPageSwitcher = new CPageSwitcherView(0, this.iItemsPerPage);
	this.oPageSwitcher.currentPage.subscribe(function (iCurrentpage) {
		this.currentPage(iCurrentpage);
		this.getTasks();
	}, this);
	this.currentPage = ko.observable(1);
	this.loadingList = ko.observable(false);
	this.preLoadingList = ko.observable(false);
	this.loadingList.subscribe(function (bLoading) {
		this.preLoadingList(bLoading);
	}, this);
	this.sTimeFormat = ko.computed(function () {
		return (UserSettings.timeFormat() === Enums.TimeFormat.F24) ? 'HH:mm' : 'hh:mm A';
	}, this);
	this.isEmptyList = ko.computed(function () {
		return 0 === this.tasksList().length;
	}, this);
	this.searchText = ko.observable('');
	this.showCompleted = ko.observable(false);
	this.actionCompletedText = ko.computed(function () {
		return this.showCompleted() ?  TextUtils.i18n('TASKS/ACTION_HIDE_COMPLETED') : TextUtils.i18n('TASKS/ACTION_SHOW_COMPLETED');
	}, this);	

}

_.extendOwn(CMainView.prototype, CAbstractScreenView.prototype);

CMainView.prototype.ViewTemplate = 'Tasks_MainView';
CMainView.prototype.ViewConstructorName = 'CMainView';

/**
 * Called every time when screen is shown.
 */
CMainView.prototype.onShow = function ()
{
	this.getCalendars();
};

CMainView.prototype.getCalendars = function ()
{
	this.loadingList(true);
	Ajax.send(
			'Calendar',
			'GetCalendars', 
			null, 
			this.onGetCalendarsResponse, 
			this
	);
};

/**
 * @param {Object} oResponse
 * @param {Object} oParameters
 */
CMainView.prototype.onGetCalendarsResponse = function (oResponse, oParameters)
{
	var
		aCalendarIds = [],
		aNewCalendarIds = [],
		oCalendar = null,
		oClientCalendar = null,
		self = this
	;
	
	if (oResponse.Result)
	{
		_.each(oResponse.Result.Calendars, function (oCalendarData) {
			oCalendar = this.calendars.parseCalendar(oCalendarData);
			
			if (!oCalendar.isShared() && !oCalendar.subscribed())
			{
				aCalendarIds.push(oCalendar.id);
				oClientCalendar = this.calendars.getCalendarById(oCalendar.id);
				if (this.needsToReload || (oClientCalendar && oClientCalendar.sSyncToken) !== (oCalendar && oCalendar.sSyncToken))
				{
					oCalendar = this.calendars.parseAndAddCalendar(oCalendarData);
					if (oCalendar)
					{
						var calId = oCalendar.id;

						oCalendar.active.subscribe(function (newValue) {
							_.each(self.tasksList(), function(oItem){
								if (oItem.calendarId === calId)
								{
									oItem.visible(newValue);
								}
							});
						}, oCalendar);
						oCalendar.davUrl(Types.pString(oResponse.Result.ServerUrl));
						aNewCalendarIds.push(oCalendar.id);
					}
				}
			}
		}, this);
		
		this.calendars.expunge(aCalendarIds);

		this.getTasks(aCalendarIds);
	}
};

CMainView.prototype.getTasks = function (aNewCalendarIds)
{
	this.loadingList(true);
	Ajax.send(
		'Calendar',
		'GetTasks', 
		{
			'CalendarIds': aNewCalendarIds,
			'Completed': this.showCompleted(),
			'Search': this.searchInput()
		},
		this.onGetTasksResponse,
		this
	);
};

CMainView.prototype.prepareTask = function (oItem)
{
	var
		self = this,
		oCalendar = self.calendars.getCalendarById(oItem.calendarId),
		dateFormatMoment = Utils.getDateFormatForMoment(UserSettings.dateFormat())
	;

	oItem.visibleDate = ko.observable('');

	oItem.withDate = false;
	if (oItem.start && oItem.end)
	{
		oItem.withDate = true;
		oItem.start = moment(oItem.start);
		oItem.end = moment(oItem.end);

		var oMomentStart = oItem.start.clone();
		var oMomentEnd = oItem.end.clone();

		if (oMomentEnd && oItem.allDay)
		{
			oMomentEnd.subtract(1, 'days');
		}
		var isEvOneDay = oMomentEnd.diff(oMomentStart, 'days') === 0;
		var isEvOneTime = oMomentEnd.diff(oMomentStart, 'minutes') === 0;					

		var sStartDate = self.getDateWithoutYearIfMonthWord(oMomentStart.format(dateFormatMoment));
		var sEndDate = !isEvOneDay ? ' - ' + self.getDateWithoutYearIfMonthWord(oMomentEnd.format(dateFormatMoment)) : '';

		var sStartTime = !oItem.allDay ? ', ' + oMomentStart.format(this.sTimeFormat()) : '';
		var sEndTime = !oItem.allDay && !isEvOneTime ? 
			(isEvOneDay ? ' - ' : ', ')  + oMomentEnd.format(this.sTimeFormat()) : '';

		oItem.visibleDate(
			sStartDate +
			sStartTime +
			sEndDate +
			sEndTime
		);
	}

	if(oItem.excluded === undefined) {
		oItem.excluded = false;
	}

	if(oItem.rrule === undefined) {
		oItem.rrule = false;
	}

	oItem.selected = ko.observable(oItem.selected);
	oItem.checked = ko.observable(oItem.status);
	oItem.visible = ko.observable(oCalendar.active());
	oItem.color = oCalendar.color;
	oItem.checked.subscribe(function(newValue) {
		oItem.status = newValue;
		var
			/**
			 * @param {number} iResult
			 */
			fCallback = _.bind(function (iResult) {
				if (iResult !== Enums.CalendarEditRecurrenceEvent.None) {
					if (iResult === Enums.CalendarEditRecurrenceEvent.AllEvents && oItem.rrule) {
					  oItem.start = moment.unix(oItem.rrule.startBase)
					  oItem.end = moment.unix(oItem.rrule.endBase)
					}
					oItem.allEvents = iResult;
					self.updateTask(oItem);
				  } else {
					oItem.checked(!newValue);
				  }
			}, this)
		;

		if (oItem.rrule && oItem.rrule.until) {
			oItem.rrule.until = moment.unix(oItem.rrule.until).utc().hour(0).minute(0).second(0).unix();
		}

		var oCalendar = self.calendars.getCalendarById(oItem.calendarId)

		if (oItem.rrule && !oCalendar.subscribed()) {
			if (oItem.excluded) {
				oItem.allEvents = Enums.CalendarEditRecurrenceEvent.OnlyThisInstance;
				self.updateTask(oItem);
			} else {
				Popups.showPopup(EditEventRecurrencePopup, [fCallback])
			}
		} else {
			oItem.allEvents = Enums.CalendarEditRecurrenceEvent.AllEvents;
			self.updateTask(oItem);
		}
	});
	return oItem;	
};

CMainView.prototype.getTaskFromList = function (id)
{
	return _.find(this.tasksList(), function (oItem){
		return oItem.id === id;
	});
};

CMainView.prototype.onGetTasksResponse = function (oResponse)
{
	var 
		oResult = oResponse.Result,
		self = this;

	if (oResult)
	{
		var
			aNewCollection = Types.isNonEmptyArray(oResult) ? _.compact(_.map(oResult, function (oItem) {
				return self.prepareTask(oItem);
			})) : [];
			
		this.tasksList(aNewCollection);
		this.sortTasksList();
		this.loadingList(false);
	}
};

CMainView.prototype.viewItem = function (oItem)
{
	this.selectedItem(oItem);
};

CMainView.prototype.onBind = function ()
{
	this.selector.initOnApplyBindings(
		'.sales_sub_list .item',
		'.sales_sub_list .selected.item',
		'.sales_sub_list .selected.item',
		$('.sales_list', this.$viewDom),
		$('.sales_list_scroll.scroll-inner', this.$viewDom)
	);
};

CMainView.prototype.searchSubmit = function ()
{
	if (this.searchInput() !== '')
	{
		this.searchText(
			TextUtils.i18n('TASKS/INFO_SEARCH_RESULT', {
				'SEARCH': this.searchInput()
			})
		);
	}
	else
	{
		this.searchText('');
	}
	
	this.searchClick(true);
	this.tasksList([]);
	this.getCalendars();
};

CMainView.prototype.onClearSearchClick = function ()
{
	// initiation empty search
	this.searchInput('');
	this.searchText('');
	this.searchClick(false);
	this.searchSubmit();
};

CMainView.prototype.createTaskInCurrentCalendar = function ()
{
	this.calendars.pickCurrentCalendar();
	this.createTaskToday(this.calendars.currentCal());
};

/**
 * @param {Object} oCalendar
 */
CMainView.prototype.createTaskToday = function (oCalendar)
{
	this.openTaskPopup(oCalendar, null, null, false);
};

/**
 * @param {Object} oCalendar
 * @param {Object} oStart
 * @param {Object} oEnd
 * @param {boolean} bAllDay
 */
CMainView.prototype.openTaskPopup = function (oCalendar, oStart, oEnd, bAllDay)
{
	if (oCalendar)
	{
		Popups.showPopup(EditTaskPopup, [{
			CallbackSave: _.bind(this.createTask, this),
			CallbackDelete: null,
			Calendars: this.calendars,
			SelectedCalendar: oCalendar ? oCalendar.id : 0,
			Start: oStart,
			End: oEnd,
			AllDay: bAllDay,            
			TimeFormat: this.sTimeFormat(),
			DateFormat: UserSettings.dateFormat(),
            Type: 'VTODO',
			IsTaskApp: true
		}]);
	}
};

/**
 * @param {Object} oEventData
 */
CMainView.prototype.getParamsFromEventData = function (oEventData)
{
	var
		rrule = null
	;
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
		start: oEventData.withDate ? oEventData.start.local().toDate() : null,
		end: oEventData.withDate ? oEventData.end.local().toDate() : null,
		startTS: oEventData.withDate ? oEventData.start.unix() : null,
		endTS: oEventData.withDate ? (oEventData.end ? oEventData.end.unix() : oEventData.end.unix()) : null,
		rrule: rrule ? JSON.stringify(rrule) : null,
		type: oEventData.type,
		status: oEventData.status,
		withDate: oEventData.withDate
	};
};

/**
 * @param {Object} oEventData
 */
CMainView.prototype.createTask = function (oData)
{
	var aParameters = this.getParamsFromEventData(oData);

	aParameters.calendarId = oData.newCalendarId;
    Ajax.send(
		'Calendar',
		'CreateEvent', 
        aParameters,
        this.onCreateTaskResponse,
		this
	);	
};

CMainView.prototype.sortTasksList = function ()
{
	this.tasksList(this.tasksList().sort(function (left, right) {
		if (!left.withDate && !right.withDate) {
			if (left.lastModified === right.lastModified) {
				return 0;
			} else {
				return left.lastModified > right.lastModified ? -1 : 1
			}
		} else if(!left.withDate) {
			return -1;
		} else if (left.startTS !== null && right.startTS !== null) {
			if (left.startTS === right.startTS) 
			{
				return 0;
			}
			return (left.startTS > right.startTS) ? 1 : -1;
		}
	}));
}

CMainView.prototype.onCreateTaskResponse = function (oResponse)
{
	var oResult = oResponse.Result;

	if (oResult)
	{
		oResult.Events.forEach((event) => {
			var oTask = this.prepareTask(event);
			this.tasksList.push(oTask);
		  })

		this.sortTasksList();
	}
	else
	{
		Api.showErrorByCode(oResponse);
	}
};

/**
 * @param {Object} oData
 */
CMainView.prototype.taskClickCallback = function (oData)
{
	var
		/**
		 * @param {number} iResult
		 */
		fCallback = _.bind(function (iResult) {
			var oParams = {
					ID: oData.id,
					Uid: oData.uid,
					RecurrenceId: oData.recurrenceId,
					Calendars: this.calendars,
					SelectedCalendar: oData.calendarId,
					AllDay: oData.allDay,
					Location: oData.location,
					Description: oData.description,
					Subject: oData.subject,
					Alarms: oData.alarms,
					Attendees: oData.attendees,
					RRule: oData.rrule,
					Excluded: oData.excluded,
					Owner: oData.owner,
					Appointment: false,
					OwnerName: oData.ownerName,
					TimeFormat: this.sTimeFormat(),
					DateFormat: UserSettings.dateFormat(),
					AllEvents: iResult,
					CallbackSave: _.bind(this.updateTask, this),
					CallbackDelete: _.bind(this.executeRemove, this),
					Type: oData.type,
					Status: oData.status,
					IsTaskApp: true
				}
			;
			if (iResult !== Enums.CalendarEditRecurrenceEvent.None) {
				if (iResult === Enums.CalendarEditRecurrenceEvent.AllEvents && oData.rrule) {
				  oParams.Start = moment.unix(oData.rrule.startBase)
				  oParams.End = moment.unix(oData.rrule.endBase)
				} else {
				  if (oData.start) { 
					oParams.Start = oData.start.clone()
					oParams.Start = oParams.Start.local()
				  }
				  if (oData.end) {
					oParams.End = oData.end.clone()
					oParams.End = oParams.End.local()
				  }
				}
				Popups.showPopup(EditTaskPopup, [oParams])
			  }
		}, this)
	;
    var oCalendar = this.calendars.getCalendarById(oData.calendarId)
	if (oData.rrule && !oCalendar.subscribed()) {
		if (oData.excluded) {
			fCallback(Enums.CalendarEditRecurrenceEvent.OnlyThisInstance)
		} else {
			Popups.showPopup(EditEventRecurrencePopup, [fCallback])
		}
	} else {
		fCallback(Enums.CalendarEditRecurrenceEvent.AllEvents)
	}
};

/**
 * @param {Object} oTask
 */
CMainView.prototype.addTask = function (oTask) {
	if (oTask && !this.taskExists(oTask.id)) {
	  this.tasksList.push(this.prepareTask(oTask))
	}
  }
  
  /**
   * @param {string} sId
   */
  CMainView.prototype.getTask = function (sId) {
	return _.find(
	  this.tasksList(),
	  function (oTask) {
		return oTask.id === sId
	  },
	  this
	)
  }
  
  /**
   * @param {string} sId
   *
   * @return {boolean}
   */
  CMainView.prototype.taskExists = function (sId) {
	return !!this.getTask(sId)
  }

/**
 * @param {string} sId
 */
CMainView.prototype.removeTask = function (sId) {
	this.tasksList(
	  _.filter(
		this.tasksList(),
		function (oEvent) {
		  return oEvent.id !== sId
		},
		this
	  )
	)
  }

CMainView.prototype.removeTaskByUid = function (sUid, bSkipExcluded) {
	this.tasksList(
	  _.filter(
		this.tasksList(),
		function (oEvent) {
		  return oEvent.uid !== sUid || (bSkipExcluded && oEvent.excluded)
		},
		this
	  )
	)
  }

/**
 * @param {Object} oEventData
 */
CMainView.prototype.updateTask = function (oData)
{
    var aParameters = this.getParamsFromEventData(oData);

    Ajax.send(
		'Calendar',
		'UpdateEvent', 
        aParameters,
		this.onUpdateTaskResponse,
		this
	);	
};

CMainView.prototype.onUpdateTaskResponse = function (oResponse, oArguments)
{
	var 
		oResult = oResponse.Result,
		oParameters = oArguments.Parameters,
		oCalendar = this.calendars.getCalendarById(oParameters && oParameters.calendarId)
	;

	if (oResult) {
		var oTask = this.getTask(oParameters.id);

		if (
		  ((oTask && oTask.rrule) || oParameters.rrule) &&
		  oParameters.allEvents === Enums.CalendarEditRecurrenceEvent.AllEvents
		) {
		  this.removeTaskByUid(oParameters.uid, true);
		} else {
		  this.removeTask(oParameters.id);
		}
  
		_.each(
		  oResponse.Result.Events,
		  function (oData) {
			this.addTask(oData)
		  },
		  this
		);

		oTask = this.getTask(oParameters.id);
		if (oTask) {
			this.selector.itemSelected(oTask);
		}

		this.sortTasksList();
	} else {
		Api.showErrorByCode(oResponse);
	}
};

/**
 * @param {Object} oEventData
 */
CMainView.prototype.executeRemove = function (oData)
{
	Ajax.send(
		'Calendar',
		'DeleteEvent', 
		this.getParamsFromEventData(oData),
		this.onDeleteTaskResponse,
		this
	);	
};

CMainView.prototype.onDeleteTaskResponse = function (oResponse, oArguments)
{
	if (oResponse.Result)
	{
		var 
			oParameters = oArguments.Parameters
		;
		if (oParameters.allEvents === Enums.CalendarEditRecurrenceEvent.OnlyThisInstance) {
			this.removeTask(oParameters.id)
		  } else {
			this.removeTaskByUid(oParameters.uid)
		  }
	}
	else
	{
		Api.showErrorByCode(oResponse);
	}
};

/**
 * @param {string} sDate
 */
CMainView.prototype.getDateWithoutYearIfMonthWord = function (sDate)
{
	var
		aDate = sDate.split(' '),
		oNowMoment = moment(),
		oNowYear = oNowMoment.format('YYYY')
	;
	
	if (aDate.length === 3 && oNowYear === aDate[2])
	{
		return aDate[0] + ' ' + aDate[1];
	}
	return sDate;
};

CMainView.prototype.onShowCompletedClick = function ()
{
	this.showCompleted(!this.showCompleted());
	this.searchSubmit();
};

module.exports = new CMainView();


/***/ })

}]);