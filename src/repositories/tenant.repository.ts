import {Getter, inject} from '@loopback/core';
import {AuthenticationBindings} from 'loopback4-authentication';

import {PgdbDataSource} from '../datasources';
import {Tenant} from '../models';
import {AuthUser} from '../modules/auth';
import {DefaultUserModifyCrudRepository} from './default-user-modify-crud.repository.base';

export class TenantRepository extends DefaultUserModifyCrudRepository<
  Tenant,
  typeof Tenant.prototype.id
> {
  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    protected readonly getCurrentUser: Getter<AuthUser | undefined>,
  ) {
    super(Tenant, dataSource, getCurrentUser);
  }
}
