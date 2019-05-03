import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'audit_logs',
  settings: {strict: false},
})
export class AuditLog extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    name: 'operation_name',
    postgresql: {
      column: 'operation_name',
    },
  })
  operationName: string;

  @property({
    type: 'date',
    required: true,
    name: 'operation_type',
    postgresql: {
      column: 'operation_time',
    },
  })
  operationTime: string;

  @property({
    type: 'string',
    required: true,
    name: 'table_name',
    postgresql: {
      column: 'table_name',
    },
  })
  tableName: string;

  @property({
    type: 'string',
    name: 'log_type',
    postgresql: {
      column: 'log_type',
    },
  })
  logType?: string;

  @property({
    type: 'string',
    name: 'entity_id',
    postgresql: {
      column: 'entity_id',
    },
  })
  entityId?: string;

  @property({
    type: 'string',
    name: 'user_id',
    postgresql: {
      column: 'user_id',
    },
  })
  userId?: string;

  @property({
    type: 'object',
  })
  before?: object;

  @property({
    type: 'object',
  })
  after?: object;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<AuditLog>) {
    super(data);
  }
}
