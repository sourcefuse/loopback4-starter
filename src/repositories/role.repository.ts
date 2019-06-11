import {Role, RoleRelations} from '../models';
import {PgdbDataSource} from '../datasources';
import {inject} from '@loopback/core';
import {DefaultSoftCrudRepository} from './default-soft-crud.repository.base';

export class RoleRepository extends DefaultSoftCrudRepository<
  Role,
  typeof Role.prototype.id,
  RoleRelations
> {
  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
  ) {
    super(Role, dataSource);
  }
}
