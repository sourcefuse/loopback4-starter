import {model, property, belongsTo} from '@loopback/repository';
import {BaseEntity} from '.';
import {User, UserWithRelations} from './user.model';

@model({
  name: 'user_credentials',
})
export class UserCredentials extends BaseEntity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @belongsTo(
    () => User,
    {keyFrom: 'user_id', name: 'user_id'},
    {
      name: 'user_id',
      required: true,
    },
  )
  userId: number;

  @property({
    type: 'string',
    required: true,
    name: 'auth_provider',
  })
  authProvider: string;

  @property({
    type: 'string',
    name: 'auth_id',
  })
  authId?: string;

  @property({
    type: 'string',
    name: 'auth_token',
  })
  authToken?: string;

  @property({
    type: 'string',
  })
  password?: string;

  constructor(data?: Partial<UserCredentials>) {
    super(data);
  }
}

export interface UserCredentialsRelations {
  user: UserWithRelations;
}

export type UserCredentialsWithRelations = UserCredentials &
  UserCredentialsRelations;
