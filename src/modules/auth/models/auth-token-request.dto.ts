import {Model, model, property} from '@loopback/repository';

@model()
export class AuthTokenRequest extends Model {
  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  clientId: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  constructor(data?: Partial<AuthTokenRequest>) {
    super(data);
  }
}
