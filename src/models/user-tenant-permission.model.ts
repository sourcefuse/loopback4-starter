import {model, property} from '@loopback/repository';

import {UserModifiableEntity} from './user-modifiable-entity.model';

@model({
  name: 'user_tenant_permissions',
})
export class UserTenantPermission extends UserModifiableEntity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    name: 'user_tenant_id',
    postgresql: {
      column: 'user_tenant_id',
    },
  })
  userTenantId: number;

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

  constructor(data?: Partial<UserTenantPermission>) {
    super(data);
  }
}
