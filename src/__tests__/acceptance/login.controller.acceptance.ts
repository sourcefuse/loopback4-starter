import {Client, expect} from '@loopback/testlab';
import {Loopback4StarterApplication} from '../..';
import {setupApplication} from './test-helper';
import {
  UserRepository,
  AuthClientRepository,
  RoleRepository,
  TenantRepository,
  UserTenantRepository,
} from '../../repositories';
import {RoleType} from '../../modules/roles/role.enum';
import {TenantType} from '../../modules/user-tenants/tenant-type.enum';

describe('Login Controller', () => {
  let app: Loopback4StarterApplication;
  let client: Client;
  let userRepo: UserRepository;
  let authClientRepository: AuthClientRepository;
  let roleRepository: RoleRepository;
  let tenantRepository: TenantRepository;
  let userTenantRepository: UserTenantRepository;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  before(givenRepositories);
  before(setMockData);
  after(deleteMockData);
  after(async () => {
    await app.stop();
  });

  it('gives status 422 for login request with no client credentials', async () => {
    const reqData = {};
    const response = await client
      .post(`/auth/login`)
      .send(reqData)
      .expect(422);

    expect(response).to.have.property('error');
  });

  it('gives status 422 for login request with no user credentials', async () => {
    const reqData = {
      client_id: 'web',
      client_secret: 'blah',
    };

    const response = await client
      .post(`/auth/login`)
      .send(reqData)
      .expect(422);

    expect(response).to.have.property('error');
  });

  it('gives status 401 for login request with wrong client credentials', async () => {
    const reqData = {
      client_id: 'web1',
      client_secret: 'blah1',
      username: 'super_admin',
      password: 'test123!@#',
    };

    const response = await client
      .post(`/auth/login`)
      .send(reqData)
      .expect(401);

    expect(response).to.have.property('error');
  });

  it('gives status 401 for login request with wrong user credentials', async () => {
    const reqData = {
      client_id: 'webapp',
      client_secret: 'saqw21!@',
      username: 'someuser',
      password: 'somepassword',
    };

    const response = await client
      .post(`/auth/login`)
      .send(reqData)
      .expect(401);

    expect(response).to.have.property('error');
  });

  it('gives status 200 and return code for login request', async () => {
    const response = await authLogin();
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('code');
  });

  it('should return refresh token and access token in response', async () => {
    const authLoginResponse = await authLogin();
    const authTokenResponse = await authToken(authLoginResponse.body.code);

    expect(authTokenResponse.body).to.have.properties([
      'accessToken',
      'refreshToken',
    ]);
  });

  it('should return refresh token and access token for token refresh request', async () => {
    const authLoginResponse = await authLogin();
    const authTokenResponse = await authToken(authLoginResponse.body.code);

    const response = await client
      .post(`/auth/token-refresh`)
      .send({refreshToken: authTokenResponse.body.refreshToken});

    expect(response.body).to.have.properties(['accessToken', 'refreshToken']);
  });

  it('should return true on logout', async () => {
    const authLoginResponse = await authLogin();
    const authTokenResponse = await authToken(authLoginResponse.body.code);

    await client
      .post(`/logout`)
      .set('Authorization', `Bearer ${authTokenResponse.body.accessToken}`)
      .set('refresh-token', `${authTokenResponse.body.refreshToken}`)
      .expect(200);
  });

  async function authLogin() {
    const reqData = {
      client_id: 'web',
      client_secret: 'test',
      username: 'test_user',
      password: process.env.USER_TEMP_PASSWORD,
    };

    return await client.post(`/auth/login`).send(reqData);
  }

  async function authToken(code: string) {
    const response = await client.post(`/auth/token`).send({
      clientId: 'web',
      username: 'test_user',
      code: code,
    });
    return response;
  }

  async function givenRepositories() {
    userRepo = await app.getRepository(UserRepository);
    roleRepository = await app.getRepository(RoleRepository);
    authClientRepository = await app.getRepository(AuthClientRepository);
    tenantRepository = await app.getRepository(TenantRepository);
    userTenantRepository = await app.getRepository(UserTenantRepository);
  }

  async function deleteMockData() {
    await userRepo.deleteAllHard();
    await authClientRepository.deleteAllHard();
    await userTenantRepository.deleteAll();
    await roleRepository.deleteAllHard();
    await tenantRepository.deleteAllHard();
  }

  async function setMockData() {
    await roleRepository.createAll([
      {
        id: 1,
        name: 'super_admin',
        roleKey: RoleType.SuperAdmin,
        permissions: [
          'canLoginToIPS',
          'ViewOwnUser',
          'ViewAnyUser',
          'ViewTenantUser',
          'CreateAnyUser',
          'CreateTenantUser',
          'UpdateOwnUser',
          'UpdateTenantUser',
          'UpdateAnyUser',
          'DeleteTenantUser',
          'DeleteAnyUser',
          'ViewTenant',
          'CreateTenant',
          'UpdateTenant',
          'DeleteTenant',
          'ViewRole',
          'CreateRole',
          'UpdateRole',
          'DeleteRole',
          'ViewAudit',
          'CreateAudit',
          'UpdateAudit',
          'DeleteAudit',
        ],
      },
      {
        id: 2,
        name: 'admin',
        roleKey: RoleType.Admin,
        permissions: [
          'ViewOwnUser',
          'ViewTenantUser',
          'CreateTenantUser',
          'UpdateOwnUser',
          'UpdateTenantUser',
          'DeleteTenantUser',
          'ViewTenant',
          'ViewRole',
        ],
      },
    ]);

    const user = await userRepo.create({
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      username: 'test_user',
      defaultTenant: 1,
    });

    await authClientRepository.create({
      id: 1,
      clientId: 'web',
      clientSecret: 'test',
      redirectUrl: 'http://localhost:4200/login/success',
      accessTokenExpiration: 900,
      refreshTokenExpiration: 86400,
      authCodeExpiration: 180,
      secret: 'poiuytrewq',
    });

    await tenantRepository.create({
      id: 1,
      name: 'application',
      type: TenantType.APPLICATION,
    });

    await userTenantRepository.create(user);
  }
});
