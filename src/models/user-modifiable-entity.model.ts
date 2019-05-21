import {belongsTo} from '@loopback/repository';

import {BaseEntity} from './base-entity.model';
import {UserTenant} from './user-tenant.model';

export class UserModifiableEntity extends BaseEntity {
  @belongsTo(() => UserTenant, {name: 'created_by'})
  created_by?: number;

  @belongsTo(() => UserTenant, {name: 'modified_by'})
  modified_by?: number;
}
