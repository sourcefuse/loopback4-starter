import {belongsTo} from '@loopback/repository';

import {BaseEntity} from './base-entity.model';
import {UserTenant} from './user-tenant.model';

export class UserModifiableEntity extends BaseEntity {
  @belongsTo(
    () => UserTenant,
    {keyFrom: 'created_by', name: 'created'},
    {
      name: 'created_by',
    },
  )
  createdBy?: number;

  @belongsTo(
    () => UserTenant,
    {keyFrom: 'modified_by', name: 'modified'},
    {
      name: 'modified_by',
    },
  )
  modifiedBy?: number;
}
