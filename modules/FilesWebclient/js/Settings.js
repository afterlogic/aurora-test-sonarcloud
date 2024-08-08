'use strict';

var
	_ = require('underscore'),

	Types = require('%PathToCoreWebclientModule%/js/utils/Types.js')
;

module.exports = {
	ServerModuleName: 'Files',
	CorporateServerModuleName: 'CorporateFiles',
	PersonalServerModuleName: 'PersonalFiles',
	HashModuleName: 'files',

	CustomTabTitle: '',
	Storages: [],
	EnableUploadSizeLimit: false,
	PublicFolderName: '',
	PublicHash: '',
	UploadSizeLimitMb: 0,
	UserSpaceLimitMb: 0,
	TenantSpaceLimitMb: 0,
	CorporateSpaceLimitMb: 0,

	EditFileNameWithoutExtension: false,
	ShowCommonSettings: true,
	ShowFilesApps: true,
	BottomLeftCornerLinks: [],

	ShowPersonalFilesAdminSection: false,
	ShowCorporateFilesAdminSection: false,
	PublicLinksEnabled: true,

	Sorting: { Allow: false },

	/**
	 * Initializes settings from AppData object sections.
	 *
	 * @param {Object} oAppData Object contained modules settings.
	 */
	init: function (oAppData)
	{
		var
			oAppDataFilesSection = oAppData[this.ServerModuleName],
			// oAppDataPersonalFilesSection = oAppData[this.PersonalServerModuleName],
			oAppDataCorporateFilesSection = oAppData[this.CorporateServerModuleName],
			oAppDataFilesWebclientSection = oAppData['%ModuleName%']
		;

		if (!_.isEmpty(oAppDataFilesSection))
		{
			this.CustomTabTitle = Types.pString(oAppDataFilesSection.CustomTabTitle, this.CustomTabTitle);
			this.Storages = Types.pArray(oAppDataFilesSection.Storages, this.Storages);
			this.EnableUploadSizeLimit = Types.pBool(oAppDataFilesSection.EnableUploadSizeLimit, this.EnableUploadSizeLimit);
			this.PublicFolderName = Types.pString(oAppDataFilesSection.PublicFolderName, this.PublicFolderName);
			this.PublicHash = Types.pString(oAppDataFilesSection.PublicHash, this.PublicHash);
			this.UploadSizeLimitMb = Types.pNonNegativeInt(oAppDataFilesSection.UploadSizeLimitMb, this.UploadSizeLimitMb);

			this.UserSpaceLimitMb = Types.pNonNegativeInt(oAppDataFilesSection.UserSpaceLimitMb, this.UserSpaceLimitMb);
			this.TenantSpaceLimitMb = Types.pNonNegativeInt(oAppDataFilesSection.TenantSpaceLimitMb, this.TenantSpaceLimitMb);

			// this.EFilesSortField = Types.pObject(oAppDataFilesSection.SortField);
		}

		// if (!_.isEmpty(oAppDataPersonalFilesSection))
		// {
		 	this.ShowPersonalFilesAdminSection = true;
		// }

		if (!_.isEmpty(oAppDataCorporateFilesSection))
		{
			this.ShowCorporateFilesAdminSection = true;
			this.CorporateSpaceLimitMb = Types.pNonNegativeInt(oAppDataCorporateFilesSection.SpaceLimitMb, this.CorporateSpaceLimitMb);
		}

		if (!_.isEmpty(oAppDataFilesWebclientSection))
		{
			this.EditFileNameWithoutExtension = Types.pBool(oAppDataFilesWebclientSection.EditFileNameWithoutExtension, this.EditFileNameWithoutExtension);
			this.ShowCommonSettings = Types.pBool(oAppDataFilesWebclientSection.ShowCommonSettings, this.ShowCommonSettings);
			this.ShowFilesApps = Types.pBool(oAppDataFilesWebclientSection.ShowFilesApps, this.ShowFilesApps);
			this.BottomLeftCornerLinks = Types.pArray(oAppDataFilesWebclientSection.BottomLeftCornerLinks, this.BottomLeftCornerLinks);
			this.PublicLinksEnabled = Types.pBool(oAppDataFilesWebclientSection.PublicLinksEnabled, this.PublicLinksEnabled);
			this.Sorting = this.getSortConfig(Types.pObject(oAppDataFilesWebclientSection.FilesSortBy));
		}
	},

	/**
	 * Updates settings from settings tab in admin panel.
	 *
	 * @param {boolean} bEnableUploadSizeLimit Indicates if upload size limit is enabled.
	 * @param {number} iUploadSizeLimitMb Value of upload size limit in Mb.
	 */
	updateAdmin: function (bEnableUploadSizeLimit, iUploadSizeLimitMb)
	{
		this.EnableUploadSizeLimit = bEnableUploadSizeLimit;
		this.UploadSizeLimitMb = iUploadSizeLimitMb;
	},

	updateAdminPersonal: function (iUserSpaceLimitMb)
	{
		this.PersonalSpaceLimitMb = iUserSpaceLimitMb;
	},

	updateAdminCorporate: function (iSpaceLimitMb)
	{
		this.CorporateSpaceLimitMb = iSpaceLimitMb;
	},

	getSortConfig: function (config)
	{
		return {
			Allow: Types.pBool(config?.Allow),
			DisplayOptions: config?.DisplayOptions || [],
			DefaultSortBy: Types.pEnum(Enums.FilesSortField[config?.DefaultSortBy], Enums.FilesSortField, Enums.FilesSortField.Filename),
			DefaultSortOrder: Types.pEnum(Enums.SortOrder[config?.DefaultSortOrder], Enums.SortOrder, Enums.SortOrder.Desc),
		}
	}
};
