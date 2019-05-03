import {inject} from '@loopback/core';

import {PgdbDataSource} from '../datasources';
import {UserTenantPermission} from '../models';
import {DefaultSoftCrudRepository} from './default-soft-crud.repository.base';

export class UserTenantPermissionRepository extends DefaultSoftCrudRepository<
  UserTenantPermission,
  typeof UserTenantPermission.prototype.id
> {
  constructor(@inject('datasources.pgdb') dataSource: PgdbDataSource) {
    super(UserTenantPermission, dataSource);
  }
}
