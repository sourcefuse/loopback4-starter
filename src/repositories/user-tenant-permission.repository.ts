import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, repository} from '@loopback/repository';
import {AuthenticationBindings} from 'loopback4-authentication';

import {PgdbDataSource} from '../datasources';
import {
  UserTenant,
  UserTenantPermission,
  UserTenantPermissionRelations,
} from '../models';
import {AuthUser} from '../modules/auth';
import {DefaultUserModifyCrudRepository} from './default-user-modify-crud.repository.base';
import {UserTenantRepository} from './user-tenant.repository';

export class UserTenantPermissionRepository extends DefaultUserModifyCrudRepository<
  UserTenantPermission,
  typeof UserTenantPermission.prototype.id,
  UserTenantPermissionRelations
> {
  public readonly userTenant: BelongsToAccessor<
    UserTenant,
    typeof UserTenantPermission.prototype.id
  >;
  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
    @repository.getter(UserTenantRepository)
    utRepositoryGetter: Getter<UserTenantRepository>,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    protected readonly getCurrentUser: Getter<AuthUser | undefined>,
  ) {
    super(UserTenantPermission, dataSource, getCurrentUser);

    this.userTenant = this.createBelongsToAccessorFor(
      'user_tenant_id',
      utRepositoryGetter,
    );
  }
}
