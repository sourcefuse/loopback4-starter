import { Entity, model, property } from '@loopback/repository';

@model({ settings: {} })
export class RefreshToken extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  clientId: string;

  @property({
    type: 'number',
    required: true,
  })
  userId: number;

  @property({
    type: 'string',
    required: true,
  })
  username: string;


  constructor(data?: Partial<RefreshToken>) {
    super(data);
  }
}

export interface RefreshTokenRelations {
  // describe navigational properties here
}

export type RefreshTokenWithRelations = RefreshToken & RefreshTokenRelations;
