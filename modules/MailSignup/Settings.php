<?php
/**
 * This code is licensed under AGPLv3 license or Afterlogic Software License
 * if commercial version of the product was purchased.
 * For full statements of the licenses see LICENSE-AFTERLOGIC and LICENSE-AGPL3 files.
 */

namespace Aurora\Modules\MailSignup;

use Aurora\System\SettingsProperty;

/**
 * @property bool $Disabled
 * @property string $ServerModuleName
 * @property string $HashModuleName
 * @property string $CustomLogoUrl
 * @property string $InfoText
 * @property string $BottomInfoHtmlText
 * @property array $DomainList
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
            "ServerModuleName" => new SettingsProperty(
                "MailSignup",
                "string",
                null,
                "Defines name of the module responsible for signup",
            ),
            "HashModuleName" => new SettingsProperty(
                "signup",
                "string",
                null,
                "Defines hash of the module responsible for signup",
            ),
            "CustomLogoUrl" => new SettingsProperty(
                "",
                "string",
                null,
                "Defines URL of logo image used on signup page",
            ),
            "InfoText" => new SettingsProperty(
                "",
                "string",
                null,
                "Defines additional text message shown on signup page",
            ),
            "BottomInfoHtmlText" => new SettingsProperty(
                "",
                "string",
                null,
                "Defines bottom text message shown on signup page",
            ),
            "DomainList" => new SettingsProperty(
                [],
                "array",
                null,
                "Defines list of domains signup feature is available for",
            ),
        ];
    }
}
