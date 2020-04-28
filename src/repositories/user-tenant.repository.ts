import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, repository, DataObject} from '@loopback/repository';

import {PgdbDataSource} from '../datasources';
import {Role, Tenant, User, UserTenant, UserTenantRelations} from '../models';
import {DefaultSoftCrudRepository} from './default-soft-crud.repository.base';
import {RoleRepository} from './role.repository';
import {TenantRepository} from './tenant.repository';
import {UserRepository} from './user.repository';
import {HttpErrors} from '@loopback/rest';
import {Options} from '@loopback/repository/src/common-types';

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

  async create(
    entity: DataObject<User>,
    options?: Options,
  ): Promise<UserTenant> {
    if (!entity.id || !entity.defaultTenant) {
      throw new HttpErrors.UnprocessableEntity(
        'User Id or Default Tenant Id is missing in the request parameters',
      );
    }
    const userTenant: UserTenant = new UserTenant();
    userTenant.userId = entity.id;
    userTenant.tenantId = entity.defaultTenant;
    const role = await this.roleRepo.findOne({
      where: {
        name: process.env.DEFAULT_ROLE,
      },
    });
    if (role && role.id) {
      userTenant.roleId = role.id;
    } else {
      throw new HttpErrors.InternalServerError('Failed to set default role.');
    }
    return await super.create(userTenant);
  }
}
