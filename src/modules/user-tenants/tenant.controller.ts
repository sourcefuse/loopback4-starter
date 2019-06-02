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

import {Tenant} from '../../models';
import {TenantRepository} from '../../repositories';
import {PermissionKey} from '../auth/permission-key.enum';

export class TenantController {
  constructor(
    @repository(TenantRepository)
    public tenantRepository: TenantRepository,
  ) {}

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.CreateTenant])
  @post('/tenants', {
    responses: {
      '200': {
        description: 'Tenant model instance',
        content: {'application/json': {schema: {'x-ts-type': Tenant}}},
      },
    },
  })
  async create(@requestBody() tenant: Tenant): Promise<Tenant> {
    return await this.tenantRepository.create(tenant);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.ViewTenant])
  @get('/tenants/count', {
    responses: {
      '200': {
        description: 'Tenant model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Tenant))
    where?: Where<Tenant>,
  ): Promise<Count> {
    return await this.tenantRepository.count(where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.ViewTenant])
  @get('/tenants', {
    responses: {
      '200': {
        description: 'Array of Tenant model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Tenant}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Tenant))
    filter?: Filter<Tenant>,
  ): Promise<Tenant[]> {
    return await this.tenantRepository.find(filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.UpdateTenant])
  @patch('/tenants', {
    responses: {
      '200': {
        description: 'Tenant PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() tenant: Tenant,
    @param.query.object('where', getWhereSchemaFor(Tenant))
    where?: Where<Tenant>,
  ): Promise<Count> {
    return await this.tenantRepository.updateAll(tenant, where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.ViewTenant])
  @get('/tenants/{id}', {
    responses: {
      '200': {
        description: 'Tenant model instance',
        content: {'application/json': {schema: {'x-ts-type': Tenant}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Tenant> {
    return await this.tenantRepository.findById(id);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.UpdateTenant])
  @patch('/tenants/{id}', {
    responses: {
      '204': {
        description: 'Tenant PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() tenant: Tenant,
  ): Promise<void> {
    await this.tenantRepository.updateById(id, tenant);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.UpdateTenant])
  @put('/tenants/{id}', {
    responses: {
      '204': {
        description: 'Tenant PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tenant: Tenant,
  ): Promise<void> {
    await this.tenantRepository.replaceById(id, tenant);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.DeleteTenant])
  @del('/tenants/{id}', {
    responses: {
      '204': {
        description: 'Tenant DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tenantRepository.deleteById(id);
  }
}
