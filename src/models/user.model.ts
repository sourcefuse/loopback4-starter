import {belongsTo, model, property} from '@loopback/repository';
import {IAuthUser} from 'loopback4-authentication';

import {BaseEntity} from './base-entity.model';
import {Role} from './role.model';

@model({
  name: 'users',
})
export class User extends BaseEntity implements IAuthUser {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    name: 'first_name',
  })
  firstName: string;

  @property({
    type: 'string',
    name: 'last_name',
  })
  lastName: string;

  @property({
    type: 'string',
    name: 'middle_name',
  })
  middleName?: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  password?: string;

  @property({
    type: 'date',
    name: 'last_login',
    postgresql: {
      column: 'last_login',
    },
  })
  lastLogin?: Date;

  @belongsTo(
    () => Role,
    {name: 'role_id'},
    {
      name: 'role_id',
      required: true,
    },
  )
  roleId: number;

  @property({
    type: 'string',
    required: true,
    default: 'active',
  })
  status: string;

  @property({
    name: 'created_by',
  })
  createdBy?: number;

  @property({
    name: 'modified_by',
  })
  modifiedBy?: number;

  constructor(data?: Partial<User>) {
    super(data);
  }
}
