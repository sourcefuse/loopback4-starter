import {belongsTo, model, property} from '@loopback/repository';

import {BaseEntity} from './base-entity.model';
import {Role} from './role.model';
import {Tenant} from './tenant.model';
import {User} from './user.model';

@model({
  name: 'user_tenants',
})
export class UserTenant extends BaseEntity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @belongsTo(
    () => User,
    {name: 'user_id'},
    {
      required: true,
    },
  )
  user_id: number;

  @belongsTo(
    () => Tenant,
    {name: 'tenant_id'},
    {
      required: true,
    },
  )
  tenant_id: number;

  @belongsTo(
    () => Role,
    {name: 'role_id'},
    {
      required: true,
    },
  )
  role_id: number;

  @property({
    type: 'string',
    required: true,
    default: 'active',
  })
  status: string;

  constructor(data?: Partial<UserTenant>) {
    super(data);
  }
}
