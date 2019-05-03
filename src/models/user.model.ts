import {model, property} from '@loopback/repository';

import {UserModifiableEntity} from './user-modifiable-entity.model';

@model({
  name: 'users',
})
export class User extends UserModifiableEntity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    name: 'first_name',
    postgresql: {
      column: 'first_name',
    },
  })
  firstName: string;

  @property({
    type: 'string',
    name: 'last_name',
    postgresql: {
      column: 'last_name',
    },
  })
  lastName: string;

  @property({
    type: 'string',
    name: 'middle_name',
    postgresql: {
      column: 'middle_name',
    },
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
    type: 'number',
    required: true,
    name: 'default_tenant',
    postgresql: {
      column: 'default_tenant',
    },
  })
  defaultTenant: number;

  @property({
    type: 'date',
    name: 'last_login',
    postgresql: {
      column: 'last_login',
    },
  })
  lastLogin?: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}
