import {inject} from '@loopback/core';

import {PgdbDataSource} from '../datasources';
import {UserTenant} from '../models';
import {DefaultSoftCrudRepository} from './default-soft-crud.repository.base';

export class UserTenantRepository extends DefaultSoftCrudRepository<
  UserTenant,
  typeof UserTenant.prototype.id
> {
  constructor(@inject('datasources.pgdb') dataSource: PgdbDataSource) {
    super(UserTenant, dataSource);
  }
}
