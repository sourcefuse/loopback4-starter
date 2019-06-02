import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {authenticate, STRATEGY} from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';

import {User} from '../../models';
import {UserRepository} from '../../repositories';
import {PermissionKey} from '../auth/permission-key.enum';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.CreateAnyUser, PermissionKey.CreateTenantUser])
  @post('/users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: {'x-ts-type': User}}},
      },
    },
  })
  async create(@requestBody() user: User): Promise<User> {
    return await this.userRepository.create(user);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([
    PermissionKey.ViewAnyUser,
    PermissionKey.ViewOwnUser,
    PermissionKey.ViewTenantUser,
  ])
  @get('/users/count', {
    responses: {
      '200': {
        description: 'User model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return await this.userRepository.count(where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([
    PermissionKey.ViewAnyUser,
    PermissionKey.ViewOwnUser,
    PermissionKey.ViewTenantUser,
  ])
  @get('/users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': User}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(User))
    filter?: Filter<User>,
  ): Promise<User[]> {
    return await this.userRepository.find(filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([
    PermissionKey.UpdateAnyUser,
    PermissionKey.UpdateOwnUser,
    PermissionKey.UpdateTenantUser,
  ])
  @patch('/users', {
    responses: {
      '200': {
        description: 'User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() user: User,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return await this.userRepository.updateAll(user, where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([
    PermissionKey.ViewAnyUser,
    PermissionKey.ViewOwnUser,
    PermissionKey.ViewTenantUser,
  ])
  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: {'x-ts-type': User}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<User> {
    return await this.userRepository.findById(id);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([
    PermissionKey.UpdateAnyUser,
    PermissionKey.UpdateOwnUser,
    PermissionKey.UpdateTenantUser,
  ])
  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'User PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([
    PermissionKey.UpdateAnyUser,
    PermissionKey.UpdateOwnUser,
    PermissionKey.UpdateTenantUser,
  ])
  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'User PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.DeleteAnyUser, PermissionKey.DeleteTenantUser])
  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
