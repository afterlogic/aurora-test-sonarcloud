<?php
/**
 * This code is licensed under Afterlogic Software License.
 * For full statements of the license see LICENSE file.
 */

namespace Aurora\Modules\ActivityHistory\Models;

use Aurora\Modules\Core\Models\User;

/**
 * Aurora\Modules\ActivityHistory\Models\ActivityHistory
 *
 * @license https://afterlogic.com/products/common-licensing Afterlogic Software License
 * @copyright Copyright (c) 2023, Afterlogic Corp.
 * @property int $Id
 * @property int $UserId
 * @property string $ResourceType
 * @property string $ResourceId
 * @property string $IpAddress
 * @property string $Action
 * @property int $Timestamp
 * @property string $GuestPublicId
 * @property \Illuminate\Support\Carbon|null $CreatedAt
 * @property \Illuminate\Support\Carbon|null $UpdatedAt
 * @property-read mixed $entity_id
 * @method static int count(string $columns = '*')
 * @method static \Illuminate\Database\Eloquent\Builder|\Aurora\Modules\ActivityHistory\Models\ActivityHistory find(int|string $id, array|string $columns = ['*'])
 * @method static \Illuminate\Database\Eloquent\Builder|\Aurora\Modules\ActivityHistory\Models\ActivityHistory findOrFail(int|string $id, mixed $id, Closure|array|string $columns = ['*'], Closure $callback = null)
 * @method static \Illuminate\Database\Eloquent\Builder|\Aurora\Modules\ActivityHistory\Models\ActivityHistory first(array|string $columns = ['*'])
 * @method static \Illuminate\Database\Eloquent\Builder|\Aurora\Modules\ActivityHistory\Models\ActivityHistory firstWhere(Closure|string|array|\Illuminate\Database\Query\Expression $column, mixed $operator = null, mixed $value = null, string $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityHistory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityHistory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityHistory query()
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityHistory create(array $attributes)
 * @method static \Illuminate\Database\Eloquent\Builder|\Aurora\Modules\ActivityHistory\Models\ActivityHistory where(Closure|string|array|\Illuminate\Database\Query\Expression $column, mixed $operator = null, mixed $value = null, string $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityHistory whereAction($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityHistory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityHistory whereGuestPublicId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityHistory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\Aurora\Modules\ActivityHistory\Models\ActivityHistory whereIn(string $column, mixed $values, string $boolean = 'and', bool $not = false)
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityHistory whereIpAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityHistory whereResourceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityHistory whereResourceType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityHistory whereTimestamp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityHistory whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityHistory whereUserId($value)
 * @mixin \Eloquent
 */
class ActivityHistory extends \Aurora\System\Classes\Model
{
    protected $table = 'core_activity_history';

    protected $foreignModel = User::class;
    protected $foreignModelIdColumn = 'UserId'; // Column that refers to an external table

    protected $fillable = [
        'Id',
        'UserId',
        'ResourceType',
        'ResourceId',
        'IpAddress',
        'Action',
        'Timestamp',
        'GuestPublicId'
    ];
}
