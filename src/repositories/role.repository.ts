import {inject} from '@loopback/core';

import {PgdbDataSource} from '../datasources';
import {Role} from '../models';
import {DefaultSoftCrudRepository} from './default-soft-crud.repository.base';

export class RoleRepository extends DefaultSoftCrudRepository<
  Role,
  typeof Role.prototype.id
> {
  constructor(@inject('datasources.pgdb') dataSource: PgdbDataSource) {
    super(Role, dataSource);
  }
}
