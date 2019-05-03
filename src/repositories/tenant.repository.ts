import {inject} from '@loopback/core';

import {PgdbDataSource} from '../datasources';
import {Tenant} from '../models';
import {DefaultSoftCrudRepository} from './default-soft-crud.repository.base';

export class TenantRepository extends DefaultSoftCrudRepository<
  Tenant,
  typeof Tenant.prototype.id
> {
  constructor(@inject('datasources.pgdb') dataSource: PgdbDataSource) {
    super(Tenant, dataSource);
  }
}
