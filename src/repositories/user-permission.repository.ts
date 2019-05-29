import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, repository} from '@loopback/repository';
import {AuthenticationBindings} from 'loopback4-authentication';

import {PgdbDataSource} from '../datasources';
import {UserLevelPermission, User} from '../models';
import {AuthUser} from '../modules/auth';
import {DefaultUserModifyCrudRepository} from './default-user-modify-crud.repository.base';
import {UserRepository} from './user.repository';

export class UserPermissionRepository extends DefaultUserModifyCrudRepository<
  UserLevelPermission,
  typeof UserLevelPermission.prototype.id
> {
  public readonly user: BelongsToAccessor<
    User,
    typeof UserLevelPermission.prototype.id
  >;
  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
    @repository.getter(UserRepository)
    userRepositoryGetter: Getter<UserRepository>,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    protected readonly getCurrentUser: Getter<AuthUser | undefined>,
  ) {
    super(UserLevelPermission, dataSource, getCurrentUser);

    this.user = this._createBelongsToAccessorFor(
      'user_id',
      userRepositoryGetter,
    );
  }
}
