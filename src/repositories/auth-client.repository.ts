import {AuthClient, AuthClientRelations} from '../models';
import {PgdbDataSource} from '../datasources';
import {inject} from '@loopback/core';
import {DefaultSoftCrudRepository} from './default-soft-crud.repository.base';

export class AuthClientRepository extends DefaultSoftCrudRepository<
  AuthClient,
  typeof AuthClient.prototype.id,
  AuthClientRelations
> {
  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
  ) {
    super(AuthClient, dataSource);
  }
}
