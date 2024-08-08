<?php
/**
 * This code is licensed under AGPLv3 license or Afterlogic Software License
 * if commercial version of the product was purchased.
 * For full statements of the licenses see LICENSE-AFTERLOGIC and LICENSE-AGPL3 files.
 */

namespace Aurora\Modules\CoreExtender;

/**
 * Provides user groups.
 *
 * @license https://www.gnu.org/licenses/agpl-3.0.html AGPL-3.0
 * @license https://afterlogic.com/products/common-licensing Afterlogic Software License
 * @copyright Copyright (c) 2023, Afterlogic Corp.
 *
 * @property Settings $oModuleSettings
 *
 * @package Modules
 */
class Module extends \Aurora\System\Module\AbstractModule
{
    public function init()
    {
        $this->subscribeEvent('Core::SetAuthDataAndGetAuthToken::after', array($this, 'onAfterAuthenticate'), 10);
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

    public function onAfterAuthenticate(&$aArgs, &$mResult)
    {
        if ($mResult && is_array($mResult) && isset($mResult['AuthToken'])) {
            $sXClientHeader = (string) \MailSo\Base\Http::SingletonInstance()->GetHeader('X-Client');

            if (strtolower($sXClientHeader) !== 'webclient') {
                $mResult['AllowAccess'] = 1;
            }
        }
    }
}
