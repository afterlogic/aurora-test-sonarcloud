<?php
/**
 * This code is licensed under AGPLv3 license or Afterlogic Software License
 * if commercial version of the product was purchased.
 * For full statements of the licenses see LICENSE-AFTERLOGIC and LICENSE-AGPL3 files.
 */

namespace Aurora\Modules\MobileAppsWebclient;

use Aurora\System\SettingsProperty;

/**
 * @property bool $Disabled
 * @property string $FilesSectionName
 * @property bool $ShowFilesAndroidApp
 * @property bool $ShowFilesServerUrlApp
 * @property string $FilesAndroidAppLink
 * @property bool $ShowFilesIosApp
 * @property string $FilesIosAppLink
 * @property bool $ShowFilesWinApp
 * @property string $FilesWinAppLink
 * @property string $MailSectionName
 * @property bool $ShowMailServerUrlApp
 * @property bool $ShowMailAndroidApp
 * @property string $MailAndroidAppLink
 * @property bool $ShowMailIosApp
 * @property string $MailIosAppLink
 */

class Settings extends \Aurora\System\Module\Settings
{
    protected function initDefaults()
    {
        $this->aContainer = [
            "Disabled" => new SettingsProperty(
                false,
                "bool",
                null,
                "Setting to true disables the module",
            ),
            "FilesSectionName" => new SettingsProperty(
                "Aurora Files",
                "string",
                null,
                "Title of Files section in Mobile Apps tab of Settings screen",
            ),
            "ShowFilesAndroidApp" => new SettingsProperty(
                true,
                "bool",
                null,
                "If true, display a link to Aurora Files for Android",
            ),
            "ShowFilesServerUrlApp" => new SettingsProperty(
                true,
                "bool",
                null,
                "If true, display URL which needs to be supplied in mobile apps to access files",
            ),
            "FilesAndroidAppLink" => new SettingsProperty(
                "https://play.google.com/store/apps/details?id=com.afterlogic.aurora.files",
                "string",
                null,
                "URL of a link to Aurora Files for Android",
            ),
            "ShowFilesIosApp" => new SettingsProperty(
                true,
                "bool",
                null,
                "If true, display a link to Aurora Files for iOS",
            ),
            "FilesIosAppLink" => new SettingsProperty(
                "https://apps.apple.com/us/app/aurorafiles/id1030108751?platform=iphone",
                "string",
                null,
                "URL of a link to Aurora Files for iOS",
            ),
            "ShowFilesWinApp" => new SettingsProperty(
                true,
                "bool",
                null,
                "If true, link to Windows client for accessing files is shown",
            ),
            "FilesWinAppLink" => new SettingsProperty(
                "https://afterlogic.com/download/AuroraFileSync.msi",
                "string",
                null,
                "URL of a link to Windows client for accessing files",
            ),
            "MailSectionName" => new SettingsProperty(
                "Aurora Mail",
                "string",
                null,
                "Title of Mail section in Mobile Apps tab of Settings screen",
            ),
            "ShowMailServerUrlApp" => new SettingsProperty(
                true,
                "bool",
                null,
                "If true, display the URL for accessing this product installation",
            ),
            "ShowMailAndroidApp" => new SettingsProperty(
                true,
                "bool",
                null,
                "If true, display a link to Aurora Mail for Android",
            ),
            "MailAndroidAppLink" => new SettingsProperty(
                "https://play.google.com/store/apps/details?id=com.afterlogic.aurora.mail",
                "string",
                null,
                "URL of a link to Aurora Mail for Android",
            ),
            "ShowMailIosApp" => new SettingsProperty(
                true,
                "bool",
                null,
                "If true, display a link to Aurora Mail for iOS",
            ),
            "MailIosAppLink" => new SettingsProperty(
                "https://apps.apple.com/us/app/aurora-mail/id1494290317?platform=iphone",
                "string",
                null,
                "URL of a link to Aurora Mail for iOS",
            ),
        ];
    }
}
