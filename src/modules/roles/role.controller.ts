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

import {Role} from '../../models';
import {RoleRepository} from '../../repositories';
import {PermissionKey} from '../auth/permission-key.enum';

export class RoleController {
  constructor(
    @repository(RoleRepository)
    public roleRepository: RoleRepository,
  ) {}

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.CreateRole])
  @post('/roles', {
    responses: {
      '200': {
        description: 'Role model instance',
        content: {'application/json': {schema: {'x-ts-type': Role}}},
      },
    },
  })
  async create(@requestBody() role: Role): Promise<Role> {
    return await this.roleRepository.create(role);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.ViewRole])
  @get('/roles/count', {
    responses: {
      '200': {
        description: 'Role model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Role)) where?: Where<Role>,
  ): Promise<Count> {
    return await this.roleRepository.count(where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.ViewRole])
  @get('/roles', {
    responses: {
      '200': {
        description: 'Array of Role model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Role}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Role))
    filter?: Filter<Role>,
  ): Promise<Role[]> {
    return await this.roleRepository.find(filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.UpdateRole])
  @patch('/roles', {
    responses: {
      '200': {
        description: 'Role PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() role: Role,
    @param.query.object('where', getWhereSchemaFor(Role)) where?: Where<Role>,
  ): Promise<Count> {
    return await this.roleRepository.updateAll(role, where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.ViewRole])
  @get('/roles/{id}', {
    responses: {
      '200': {
        description: 'Role model instance',
        content: {'application/json': {schema: {'x-ts-type': Role}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Role> {
    return await this.roleRepository.findById(id);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.UpdateRole])
  @patch('/roles/{id}', {
    responses: {
      '204': {
        description: 'Role PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() role: Role,
  ): Promise<void> {
    await this.roleRepository.updateById(id, role);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.UpdateRole])
  @put('/roles/{id}', {
    responses: {
      '204': {
        description: 'Role PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() role: Role,
  ): Promise<void> {
    await this.roleRepository.replaceById(id, role);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.DeleteRole])
  @del('/roles/{id}', {
    responses: {
      '204': {
        description: 'Role DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.roleRepository.deleteById(id);
  }
}
