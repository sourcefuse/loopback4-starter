import {model, property} from '@loopback/repository';

import {UserModifiableEntity} from './user-modifiable-entity.model';

@model({
  name: 'tenants',
})
export class Tenant extends UserModifiableEntity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  address1?: string;

  @property({
    type: 'string',
  })
  address2?: string;

  @property({
    type: 'string',
  })
  address3?: string;

  @property({
    type: 'string',
  })
  address4?: string;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'string',
  })
  state?: string;

  @property({
    type: 'string',
  })
  zip?: string;

  @property({
    type: 'string',
  })
  country?: string;

  @property({
    type: 'string',
    required: true,
    default: 'active',
  })
  status: string;

  constructor(data?: Partial<Tenant>) {
    super(data);
  }
}
