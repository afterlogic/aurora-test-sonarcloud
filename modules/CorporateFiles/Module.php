<?php
/**
 * This code is licensed under AGPLv3 license or Afterlogic Software License
 * if commercial version of the product was purchased.
 * For full statements of the licenses see LICENSE-AFTERLOGIC and LICENSE-AGPL3 files.
 */

namespace Aurora\Modules\CorporateFiles;

/**
 * Main Files module. It provides PHP and Web APIs for managing files.
 *
 * @license https://www.gnu.org/licenses/agpl-3.0.html AGPL-3.0
 * @license https://afterlogic.com/products/common-licensing Afterlogic Software License
 * @copyright Copyright (c) 2023, Afterlogic Corp.
 *
 * @property Settings $oModuleSettings
 *
 * @package Modules
 */
class Module extends \Aurora\Modules\PersonalFiles\Module
{
    protected static $sStorageType = 'corporate';
    protected static $iStorageOrder = 20;

    public function init()
    {
        parent::init();

        $this->subscribeEvent('Files::GetQuota::after', array($this, 'onAfterGetQuota'));
    }

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
     * Obtains list of module settings.
     *
     * @return array
     */
    public function GetSettings()
    {
        \Aurora\System\Api::checkUserRoleIsAtLeast(\Aurora\System\Enums\UserRole::Anonymous);

        return array(
            'SpaceLimitMb' => $this->oModuleSettings->SpaceLimitMb,
        );
    }

    /**
     * Updates module's settings - saves them to config.json file.
     *
     * @param int $SpaceLimitMb Space limit setting in Mb.
     * @return bool
     */
    public function UpdateSettings($SpaceLimitMb)
    {
        \Aurora\System\Api::checkUserRoleIsAtLeast(\Aurora\System\Enums\UserRole::TenantAdmin);

        $this->setConfig('SpaceLimitMb', $SpaceLimitMb);
        return (bool) $this->saveModuleConfig();
    }

    public function UpdateUsedSpace()
    {
        $iResult = 0;

        \Aurora\System\Api::checkUserRoleIsAtLeast(\Aurora\System\Enums\UserRole::NormalUser);
        $oUser = \Aurora\System\Api::getAuthenticatedUser();

        if ($oUser) {
            $oTenant = \Aurora\Modules\Core\Module::Decorator()->GetTenantWithoutRoleCheck($oUser->IdTenant);

            if ($oTenant) {
                $iResult = $this->getManager()->getUserSpaceUsed($oUser->PublicId, [\Aurora\System\Enums\FileStorageType::Corporate]);
                $oTenant->setExtendedProp(self::GetName() . '::UsedSpace', $iResult);
                $oTenant->save();
            }
        }

        return $iResult;
    }


    public function onAfterGetQuota($aArgs, &$mResult)
    {
        if ($this->checkStorageType($aArgs['Type'])) {
            $iSize = 0;

            $oUser = \Aurora\Modules\Core\Module::Decorator()->GetUserWithoutRoleCheck((int)$aArgs['UserId']);

            if ($oUser) {
                $oTenant = \Aurora\Modules\Core\Module::Decorator()->GetTenantWithoutRoleCheck($oUser->IdTenant);

                if ($oTenant) {
                    $iSize = null !== $oTenant->getExtendedProp(self::GetName() . '::UsedSpace') ? (int) $oTenant->getExtendedProp(self::GetName() . '::UsedSpace') : 0;
                }
            }

            $mResult = array(
                'Used' => (int) $iSize,
                'Limit' => $this->oModuleSettings->SpaceLimitMb * 1024 * 1024
            );
        }
    }
}
