import {model, property} from '@loopback/repository';
import {IAuthClient} from 'loopback4-authentication';

import {BaseEntity} from './base-entity.model';

@model({
  name: 'auth_clients',
})
export class AuthClient extends BaseEntity implements IAuthClient {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    name: 'client_id',
  })
  clientId: string;

  @property({
    type: 'string',
    required: true,
    name: 'client_secret',
  })
  clientSecret: string;

  @property({
    type: 'string',
    required: true,
  })
  secret: string;

  @property({
    type: 'string',
    name: 'redirect_url',
  })
  redirectUrl?: string;

  @property({
    type: 'array',
    itemType: 'number',
    name: 'user_ids',
  })
  userIds: number[];

  @property({
    type: 'number',
    required: true,
    name: 'access_token_expiration',
  })
  accessTokenExpiration: number;

  @property({
    type: 'number',
    required: true,
    name: 'refresh_token_expiration',
  })
  refreshTokenExpiration: number;

  @property({
    type: 'number',
    required: true,
    name: 'auth_code_expiration',
  })
  authCodeExpiration: number;

  constructor(data?: Partial<AuthClient>) {
    super(data);
  }
}
