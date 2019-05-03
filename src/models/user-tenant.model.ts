import {model, property} from '@loopback/repository';

import {BaseEntity} from './base-entity.model';

@model({
  name: 'user_tenants',
})
export class UserTenant extends BaseEntity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    name: 'user_id',
    postgresql: {
      column: 'user_id',
    },
  })
  userId: number;

  @property({
    type: 'number',
    required: true,
    name: 'tenant_id',
    postgresql: {
      column: 'tenant_id',
    },
  })
  tenantId: number;

  @property({
    type: 'number',
    required: true,
    name: 'role_id',
    postgresql: {
      column: 'role_id',
    },
  })
  roleId: number;

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
