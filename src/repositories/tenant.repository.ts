import { Tenant, TenantRelations } from '../models';
import { PgdbDataSource } from '../datasources';
import { Getter, inject } from '@loopback/core';
import { DefaultUserModifyCrudRepository } from './default-user-modify-crud.repository.base';
import { AuthenticationBindings } from 'loopback4-authentication';
import { AuthUser } from '../modules/auth';

export class TenantRepository extends DefaultUserModifyCrudRepository<
  Tenant,
  typeof Tenant.prototype.id,
  TenantRelations
  > {
  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    protected readonly getCurrentUser: Getter<AuthUser | undefined>,
  ) {
    super(Tenant, dataSource, getCurrentUser);
  }
}
