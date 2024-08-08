<?php
/**
 * This code is licensed under AGPLv3 license or Afterlogic Software License
 * if commercial version of the product was purchased.
 * For full statements of the licenses see LICENSE-AFTERLOGIC and LICENSE-AGPL3 files.
 */

namespace Aurora\Modules\LicensingWebclient;

use Aurora\System\SettingsProperty;

/**
 * @property bool $Disabled
 * @property string $TrialKeyLink
 * @property string $PermanentKeyLink
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
            "TrialKeyLink" => new SettingsProperty(
                "",
                "string",
                null,
                "URL of webpage for getting a trial key",
            ),
            "PermanentKeyLink" => new SettingsProperty(
                "",
                "string",
                null,
                "URL of the product license purchase page",
            ),
        ];
    }
}
