import {belongsTo, model, property} from '@loopback/repository';
import {UserPermission} from 'loopback4-authorization';

import {UserModifiableEntity} from './user-modifiable-entity.model';
import {User} from './user.model';

@model({
  name: 'user_permissions',
})
export class UserLevelPermission
  extends UserModifiableEntity
  implements UserPermission<string>
{
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @belongsTo(
    () => User,
    {name: 'user_id'},
    {
      name: 'user_id',
      required: true,
    },
  )
  userId: number;

  @property({
    type: 'string',
    required: true,
  })
  permission: string;

  @property({
    type: 'boolean',
    required: true,
    default: true,
  })
  allowed: boolean;

  constructor(data?: Partial<UserLevelPermission>) {
    super(data);
  }
}
