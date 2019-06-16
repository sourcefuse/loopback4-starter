import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import * as dotenv from 'dotenv';
import * as dotenvExt from 'dotenv-extended';
import {
  AuthenticationBindings,
  AuthenticationComponent,
} from 'loopback4-authentication';
import {
  AuthorizationComponent,
  AuthorizationBindings,
} from 'loopback4-authorization';
import * as path from 'path';

import {
  BearerTokenVerifyProvider,
  ClientPasswordVerifyProvider,
  LocalPasswordVerifyProvider,
  ResourceOwnerVerifyProvider,
} from './modules/auth';
import {MySequence} from './sequence';

export class Loopback4StarterApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    // Add authentication component
    this.component(AuthenticationComponent);
    // Customize authentication verify handlers
    this.bind(
      AuthenticationBindings.Passport.OAUTH2_CLIENT_PASSWORD_VERIFIER,
    ).toProvider(ClientPasswordVerifyProvider);
    this.bind(
      AuthenticationBindings.Passport.LOCAL_PASSWORD_VERIFIER,
    ).toProvider(LocalPasswordVerifyProvider);
    this.bind(AuthenticationBindings.Passport.BEARER_TOKEN_VERIFIER).toProvider(
      BearerTokenVerifyProvider,
    );
    this.bind(
      AuthenticationBindings.Passport.RESOURCE_OWNER_PASSWORD_VERIFIER,
    ).toProvider(ResourceOwnerVerifyProvider);

    // Add authorization component
    this.bind(AuthorizationBindings.CONFIG).to({
      allowAlwaysPaths: ['/explorer'],
    });
    this.component(AuthorizationComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers', 'modules'],
        extensions: ['.controller.js'],
        nested: true,
      },
      repositories: {
        dirs: ['repositories'],
        extensions: ['.repository.js'],
        nested: true,
      },
    };

    dotenv.config();
    dotenvExt.load({
      schema: '.env.example',
      errorOnMissing: false,
    });
  }
}
