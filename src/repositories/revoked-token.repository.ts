import {DefaultKeyValueRepository, juggler} from '@loopback/repository';
import {RevokedToken} from '../models';
import {RedisDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RevokedTokenRepository extends DefaultKeyValueRepository<
  RevokedToken
> {
  constructor(
    @inject('datasources.redis') dataSource: RedisDataSource,
  ) {
    super(RevokedToken, dataSource);
  }
}
