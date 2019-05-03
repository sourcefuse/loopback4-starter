import {inject} from '@loopback/core';

import {PgdbDataSource} from '../datasources';
import {User} from '../models';
import {DefaultSoftCrudRepository} from './default-soft-crud.repository.base';

export class UserRepository extends DefaultSoftCrudRepository<
  User,
  typeof User.prototype.id
> {
  constructor(@inject('datasources.pgdb') dataSource: PgdbDataSource) {
    super(User, dataSource);
  }
}
