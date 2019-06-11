import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class RevokedToken extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  token: string;


  constructor(data?: Partial<RevokedToken>) {
    super(data);
  }
}

export interface RevokedTokenRelations {
  // describe navigational properties here
}

export type RevokedTokenWithRelations = RevokedToken & RevokedTokenRelations;
