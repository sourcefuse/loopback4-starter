import {inject} from '@loopback/core';
import {DefaultKeyValueRepository} from '@loopback/repository';

import {RedisDataSource} from '../datasources';
import {RevokedToken} from '../models';

export class RevokedTokenRepository extends DefaultKeyValueRepository<
  RevokedToken
> {
  constructor(@inject('datasources.redis') dataSource: RedisDataSource) {
    super(RevokedToken, dataSource);
  }
}
