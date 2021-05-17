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
  })
  operationName: string;

  @property({
    type: 'date',
    required: true,
    name: 'operation_type',
  })
  operationTime: string;

  @property({
    type: 'string',
    required: true,
    name: 'table_name',
  })
  tableName: string;

  @property({
    type: 'string',
    name: 'log_type',
  })
  logType?: string;

  @property({
    type: 'string',
    name: 'entity_id',
  })
  entityId?: string;

  @property({
    type: 'string',
    name: 'user_id',
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AuditLog>) {
    super(data);
  }
}
