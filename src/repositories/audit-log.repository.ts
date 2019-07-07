import {DefaultCrudRepository} from '@loopback/repository';
import {AuditLog} from '../models';
import {AuditdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AuditLogRepository extends DefaultCrudRepository<
  AuditLog,
  typeof AuditLog.prototype.id
> {
  constructor(@inject('datasources.auditdb') dataSource: AuditdbDataSource) {
    super(AuditLog, dataSource);
  }
}
