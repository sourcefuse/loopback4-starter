import {belongsTo} from '@loopback/repository';

import {BaseEntity} from './base-entity.model';
import {UserTenant} from './user-tenant.model';

export class UserModifiableEntity extends BaseEntity {
  @belongsTo(() => UserTenant, {name: 'created_by'})
  createdBy?: number;

  @belongsTo(() => UserTenant, {name: 'modified_by'})
  modifiedBy?: number;
}
