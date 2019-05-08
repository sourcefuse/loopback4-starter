import {inject} from '@loopback/core';
import {DefaultKeyValueRepository} from '@loopback/repository';

import {RedisDataSource} from '../datasources';
import {RefreshToken} from '../models';

export class RefreshTokenRepository extends DefaultKeyValueRepository<
  RefreshToken
> {
  constructor(@inject('datasources.redis') dataSource: RedisDataSource) {
    super(RefreshToken, dataSource);
  }
}
