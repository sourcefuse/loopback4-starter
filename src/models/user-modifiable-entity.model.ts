import {belongsTo} from '@loopback/repository';

import {BaseEntity} from './base-entity.model';
import {User} from './user.model';

export class UserModifiableEntity extends BaseEntity {
  @belongsTo(
    () => User,
    {keyFrom: 'created_by', name: 'created'},
    {
      name: 'created_by',
    },
  )
  createdBy?: number;

  @belongsTo(
    () => User,
    {keyFrom: 'modified_by', name: 'modified'},
    {
      name: 'modified_by',
    },
  )
  modifiedBy?: number;
}
