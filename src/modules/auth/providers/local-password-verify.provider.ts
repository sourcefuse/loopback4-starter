import {Provider} from '@loopback/context';
import {repository} from '@loopback/repository';
import {VerifyFunction} from 'loopback4-authentication';

import {UserRepository} from '../../../repositories';
import {AuthUser} from '../models/auth-user.model';
import {Tenant} from '../../../models';

export class LocalPasswordVerifyProvider
  implements Provider<VerifyFunction.LocalPasswordFn> {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  value(): VerifyFunction.LocalPasswordFn {
    return async (username, password) => {
      const user: AuthUser = new AuthUser(
        await this.userRepository.verifyPassword(username, password),
      );
      user.permissions = [];
      user.tenant = new Tenant({id: user.defaultTenant});
      return user;
    };
  }
}
