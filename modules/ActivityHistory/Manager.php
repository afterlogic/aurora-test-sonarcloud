<?php
/**
 * This code is licensed under AGPLv3 license or Afterlogic Software License
 * if commercial version of the product was purchased.
 * For full statements of the licenses see LICENSE-AFTERLOGIC and LICENSE-AGPL3 files.
 */

namespace Aurora\Modules\ActivityHistory;

use Aurora\Modules\ActivityHistory\Models\ActivityHistory;

/**
 * @license https://www.gnu.org/licenses/agpl-3.0.html AGPL-3.0
 * @license https://afterlogic.com/products/common-licensing Afterlogic Software License
 * @copyright Copyright (c) 2023, Afterlogic Corp.
 *
 * @property Module $oModule
 */
class Manager extends \Aurora\System\Managers\AbstractManager
{
    public function __construct(\Aurora\System\Module\AbstractModule $oModule = null)
    {
        parent::__construct($oModule);
    }

    /**
     * @param int $UserId
     * @param string $ResourceType
     * @param string $ResourceId
     * @param string $IpAddress
     * @param string $Action
     * @param int $Time
     * @param string $GuestPublicId
     * @return string|bool
     */
    public function Create($UserId, $ResourceType, $ResourceId, $IpAddress, $Action, $Time, $GuestPublicId)
    {
        return ActivityHistory::create([
            'UserId' => $UserId,
            'ResourceType' => $ResourceType,
            'ResourceId' => $ResourceId,
            'IpAddress' => $IpAddress,
            'Action' => $Action,
            'Timestamp' => $Time,
            'GuestPublicId' => $GuestPublicId
        ]);
    }

    /**
     * @param int $UserId
     *
     * @return array|bool
     */
    public function GetListByUserId($UserId)
    {
        return ActivityHistory::where('UserId', $UserId)->get();
    }

    public function DeleteActivityHistory($iId)
    {
        $bResult = false;

        try {
            $bResult = !!ActivityHistory::find($iId)->delete();
        } catch (\Aurora\System\Exceptions\BaseException $oException) {
            $this->setLastException($oException);
        }

        return $bResult;
    }

    /**
     * @param int $UserId
     * @param string $ResourceType
     * @param string $ResourceId
     * @param int $Offset
     * @param int $Limit
     *
     * @return array|bool
     */
    public function GetList($UserId, $ResourceType, $ResourceId, $Offset, $Limit)
    {
        $oQuery = ActivityHistory::where([
            ['UserId', '=', $UserId],
            ['ResourceType', '=', $ResourceType],
            ['ResourceId', '=', $ResourceId],
        ]);
        if ($Offset > 0) {
            $oQuery = $oQuery->offset($Offset);
        }
        if ($Limit > 0) {
            $oQuery = $oQuery->limit($Limit);
        }
        return $oQuery->get();
    }

    /**
     * @param int $UserId
     * @param string $ResourceType
     * @param string $ResourceId
     *
     * @return array|bool
     */
    public function GetListCount($UserId, $ResourceType, $ResourceId)
    {
        return ActivityHistory::where([
            ['UserId', '=', $UserId],
            ['ResourceType', '=', $ResourceType],
            ['ResourceId', '=', $ResourceId],
        ])->count();
    }

    public function Delete($UserId, $ResourceType, $ResourceId)
    {
        return ActivityHistory::where([
            ['UserId', '=', $UserId],
            ['ResourceType', '=', $ResourceType],
            ['ResourceId', '=', $ResourceId],
        ])->delete();
    }
}
