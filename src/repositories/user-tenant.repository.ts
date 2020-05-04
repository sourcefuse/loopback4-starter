import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, repository} from '@loopback/repository';

import {PgdbDataSource} from '../datasources';
import {Role, Tenant, User, UserTenant, UserTenantRelations} from '../models';
import {DefaultSoftCrudRepository} from './default-soft-crud.repository.base';
import {RoleRepository} from './role.repository';
import {TenantRepository} from './tenant.repository';
import {UserRepository} from './user.repository';
import {HttpErrors} from '@loopback/rest';

export class UserTenantRepository extends DefaultSoftCrudRepository<
  UserTenant,
  typeof UserTenant.prototype.id,
  UserTenantRelations
> {
  public readonly tenant: BelongsToAccessor<
    Tenant,
    typeof UserTenant.prototype.id
  >;

  public readonly user: BelongsToAccessor<User, typeof UserTenant.prototype.id>;
  public readonly role: BelongsToAccessor<Role, typeof UserTenant.prototype.id>;

  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
    @repository.getter(TenantRepository)
    tenantRepositoryGetter: Getter<TenantRepository>,
    @repository.getter(UserRepository)
    userRepositoryGetter: Getter<UserRepository>,
    @repository.getter(RoleRepository)
    roleRepositoryGetter: Getter<RoleRepository>,
    @repository(RoleRepository)
    public roleRepo: RoleRepository,
  ) {
    super(UserTenant, dataSource);

    this.tenant = this.createBelongsToAccessorFor(
      'tenant_id',
      tenantRepositoryGetter,
    );

    this.user = this.createBelongsToAccessorFor(
      'user_id',
      userRepositoryGetter,
    );

    this.role = this.createBelongsToAccessorFor(
      'role_id',
      roleRepositoryGetter,
    );
  }

  async create(user: User): Promise<UserTenant> {
    if (!user.id || !user.defaultTenant) {
      throw new HttpErrors.UnprocessableEntity(
        'User Id or Default Tenant Id is missing in the request parameters',
      );
    }
    const userTenant: UserTenant = new UserTenant();
    userTenant.userId = user.id;
    userTenant.tenantId = user.defaultTenant;
    const role = await this.roleRepo.findOne({
      where: {
        name: process.env.DEFAULT_ROLE,
      },
    });
    if (role && role.id) {
      userTenant.roleId = role.id;
    } else {
      throw new HttpErrors.UnprocessableEntity('Failed to set default role.');
    }
    return await super.create(userTenant);
  }
}
