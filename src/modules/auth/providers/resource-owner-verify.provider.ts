import {Provider} from '@loopback/context';
import {repository} from '@loopback/repository';
import {VerifyFunction, AuthErrorKeys} from 'loopback4-authentication';

import {UserRepository, AuthClientRepository} from '../../../repositories';
import {HttpErrors} from '@loopback/rest';

export class ResourceOwnerVerifyProvider
  implements Provider<VerifyFunction.ResourceOwnerPasswordFn> {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(AuthClientRepository)
    public authClientRepository: AuthClientRepository,
  ) {}

  value(): VerifyFunction.ResourceOwnerPasswordFn {
    return async (clientId, clientSecret, username, password) => {
      const user = await this.userRepository.verifyPassword(username, password);
      if (!user) {
        throw new HttpErrors.Unauthorized(AuthErrorKeys.InvalidCredentials);
      }
      const client = await this.authClientRepository.findOne({
        where: {
          clientId,
        },
      });
      if (!client || client.userIds.indexOf(user.id || 0) < 0) {
        throw new HttpErrors.Unauthorized(AuthErrorKeys.ClientInvalid);
      } else if (!client.clientSecret || client.clientSecret !== clientSecret) {
        throw new HttpErrors.Unauthorized(
          AuthErrorKeys.ClientVerificationFailed,
        );
      }
      return {
        client,
        user,
      };
    };
  }
}
