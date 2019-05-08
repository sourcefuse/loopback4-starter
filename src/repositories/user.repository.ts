import {Getter, inject} from '@loopback/core';
import {DataObject} from '@loopback/repository';
import {Options} from '@loopback/repository/src/common-types';
import {HttpErrors} from '@loopback/rest';
import * as bcrypt from 'bcrypt';
import {AuthenticationBindings, AuthErrorKeys} from 'loopback4-authentication';

import {PgdbDataSource} from '../datasources';
import {User} from '../models';
import {AuthUser} from '../modules/auth';
import {AuthenticateErrorKeys} from '../modules/auth/error-keys';
import {DefaultUserModifyCrudRepository} from './default-user-modify-crud.repository.base';

export class UserRepository extends DefaultUserModifyCrudRepository<
  User,
  typeof User.prototype.id
> {
  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    protected readonly getCurrentUser: Getter<AuthUser | undefined>,
  ) {
    super(User, dataSource, getCurrentUser);
  }

  private readonly saltRounds = 10;

  async create(entity: DataObject<User>, options?: Options): Promise<User> {
    try {
      // Add temporary password for first time
      entity.password = await bcrypt.hash(
        process.env.USER_TEMP_PASSWORD,
        this.saltRounds,
      );
    } catch (err) {
      throw new HttpErrors.UnprocessableEntity('Error while hashing password');
    }

    return super.create(entity, options);
  }

  async verifyPassword(username: string, password: string): Promise<User> {
    const user = await super.findOne({where: {username}});
    if (!user || user.deleted || !user.password) {
      throw new HttpErrors.Unauthorized(AuthenticateErrorKeys.UserDoesNotExist);
    } else if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpErrors.Unauthorized(AuthErrorKeys.InvalidCredentials);
    }
    return user;
  }

  async updatePassword(
    username: string,
    password: string,
    newPassword: string,
  ): Promise<User> {
    const user = await super.findOne({where: {username}});
    if (!user || user.deleted || !user.password) {
      throw new HttpErrors.Unauthorized(AuthenticateErrorKeys.UserDoesNotExist);
    } else if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpErrors.Unauthorized(AuthErrorKeys.WrongPassword);
    } else if (await bcrypt.compare(newPassword, user.password)) {
      throw new HttpErrors.Unauthorized(
        'Password cannot be same as previous password!',
      );
    }
    await super.updateById(user.id, {
      password: await bcrypt.hash(newPassword, this.saltRounds),
    });
    return user;
  }
}
