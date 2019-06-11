import { DefaultKeyValueRepository } from '@loopback/repository';
import { RefreshToken } from '../models';
import { RedisDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class RefreshTokenRepository extends DefaultKeyValueRepository<
  RefreshToken
  > {
  constructor(
    @inject('datasources.redis') dataSource: RedisDataSource,
  ) {
    super(RefreshToken, dataSource);
  }
}
