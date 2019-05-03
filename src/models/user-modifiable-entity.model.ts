import {belongsTo} from '@loopback/repository';

import {BaseEntity} from './base-entity.model';
import {UserTenant} from './user-tenant.model';

export class UserModifiableEntity extends BaseEntity {
  @belongsTo(() => UserTenant)
  created_by: number;

  @belongsTo(() => UserTenant)
  modified_by: number;
}
