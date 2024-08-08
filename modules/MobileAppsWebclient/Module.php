<?php
/**
 * This code is licensed under AGPLv3 license or Afterlogic Software License
 * if commercial version of the product was purchased.
 * For full statements of the licenses see LICENSE-AFTERLOGIC and LICENSE-AGPL3 files.
 */

namespace Aurora\Modules\MobileAppsWebclient;

/**
 * @license https://www.gnu.org/licenses/agpl-3.0.html AGPL-3.0
 * @license https://afterlogic.com/products/common-licensing Afterlogic Software License
 * @copyright Copyright (c) 2023, Afterlogic Corp.
 *
 * @property Settings $oModuleSettings
 *
 * @package Modules
 */
class Module extends \Aurora\System\Module\AbstractWebclientModule
{
    /***** public functions might be called with web API *****/

    /**
     * @return Module
     */
    public static function getInstance()
    {
        return parent::getInstance();
    }

    /**
     * @return Module
     */
    public static function Decorator()
    {
        return parent::Decorator();
    }

    /**
     * @return Settings
     */
    public function getModuleSettings()
    {
        return $this->oModuleSettings;
    }

    /**
     * Obtains list of module settings for authenticated user.
     *
     * @return array
     */
    public function GetSettings()
    {
        \Aurora\System\Api::checkUserRoleIsAtLeast(\Aurora\System\Enums\UserRole::Anonymous);

        return array(
            'FilesSectionName' => $this->oModuleSettings->FilesSectionName,
            'ShowFilesServerUrlApp' => $this->oModuleSettings->ShowFilesServerUrlApp,
            'ShowFilesAndroidApp' => $this->oModuleSettings->ShowFilesAndroidApp,
            'FilesAndroidAppLink' => $this->oModuleSettings->FilesAndroidAppLink,
            'ShowFilesIosApp' => $this->oModuleSettings->ShowFilesIosApp,
            'FilesIosAppLink' => $this->oModuleSettings->FilesIosAppLink,
            'ShowFilesWinApp' => $this->oModuleSettings->ShowFilesWinApp,
            'FilesWinAppLink' => $this->oModuleSettings->FilesWinAppLink,
            'MailSectionName' => $this->oModuleSettings->MailSectionName,
            'ShowMailServerUrlApp' => $this->oModuleSettings->ShowMailServerUrlApp,
            'ShowMailAndroidApp' => $this->oModuleSettings->ShowMailAndroidApp,
            'MailAndroidAppLink' => $this->oModuleSettings->MailAndroidAppLink,
            'ShowMailIosApp' => $this->oModuleSettings->ShowMailIosApp,
            'MailIosAppLink' => $this->oModuleSettings->MailIosAppLink,
        );
    }
}
