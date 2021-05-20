import {inject} from '@loopback/context';
import {repository} from '@loopback/repository';
import {HttpErrors, param, post, Request, RestBindings} from '@loopback/rest';
import {authenticate, AuthErrorKeys, STRATEGY} from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';

import {RevokedTokenRepository} from '../../repositories';

export class LogoutController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private readonly req: Request,
    @repository(RevokedTokenRepository)
    private readonly revokedTokens: RevokedTokenRepository,
  ) {}

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['*']})
  @post('/logout')
  async logout(@param.header.string('Authorization') auth: string) {
    try {
      const token = auth?.replace(/bearer /i, '');
      if (!token) {
        throw new HttpErrors.Unauthorized(AuthErrorKeys.TokenInvalid);
      }
      await this.revokedTokens.set(token, {token});
    } catch (err) {
      throw new HttpErrors.InternalServerError(AuthErrorKeys.UnknownError);
    }
    return true;
  }
}
