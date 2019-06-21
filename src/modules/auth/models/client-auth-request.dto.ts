import {Model, model, property} from '@loopback/repository';

@model()
export class ClientAuthRequest extends Model {
  @property({
    type: 'string',
    required: true,
  })
  client_id: string;

  @property({
    type: 'string',
    required: true,
  })
  client_secret: string;

  constructor(data?: Partial<ClientAuthRequest>) {
    super(data);
  }
}
