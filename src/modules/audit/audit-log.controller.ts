import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {AuditLog} from '../../models';
import {AuditLogRepository} from '../../repositories';
import {authenticate, STRATEGY} from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';
import {PermissionKey} from '../auth/permission-key.enum';

export class AuditLogController {
  constructor(
    @repository(AuditLogRepository)
    public auditLogRepository: AuditLogRepository,
  ) {}

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.CreateAudit])
  @post('/audit-logs', {
    responses: {
      '200': {
        description: 'AuditLog model instance',
        content: {'application/json': {schema: {'x-ts-type': AuditLog}}},
      },
    },
  })
  async create(@requestBody() auditLog: AuditLog): Promise<AuditLog> {
    return await this.auditLogRepository.create(auditLog);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.ViewAudit])
  @get('/audit-logs/count', {
    responses: {
      '200': {
        description: 'AuditLog model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(AuditLog))
    where?: Where<AuditLog>,
  ): Promise<Count> {
    return await this.auditLogRepository.count(where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.ViewAudit])
  @get('/audit-logs', {
    responses: {
      '200': {
        description: 'Array of AuditLog model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': AuditLog}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(AuditLog))
    filter?: Filter<AuditLog>,
  ): Promise<AuditLog[]> {
    return await this.auditLogRepository.find(filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.UpdateAudit])
  @patch('/audit-logs', {
    responses: {
      '200': {
        description: 'AuditLog PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() auditLog: AuditLog,
    @param.query.object('where', getWhereSchemaFor(AuditLog))
    where?: Where<AuditLog>,
  ): Promise<Count> {
    return await this.auditLogRepository.updateAll(auditLog, where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.ViewAudit])
  @get('/audit-logs/{id}', {
    responses: {
      '200': {
        description: 'AuditLog model instance',
        content: {'application/json': {schema: {'x-ts-type': AuditLog}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<AuditLog> {
    return await this.auditLogRepository.findById(id);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.UpdateAudit])
  @patch('/audit-logs/{id}', {
    responses: {
      '204': {
        description: 'AuditLog PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() auditLog: AuditLog,
  ): Promise<void> {
    await this.auditLogRepository.updateById(id, auditLog);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.UpdateAudit])
  @put('/audit-logs/{id}', {
    responses: {
      '204': {
        description: 'AuditLog PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() auditLog: AuditLog,
  ): Promise<void> {
    await this.auditLogRepository.replaceById(id, auditLog);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize([PermissionKey.DeleteAudit])
  @del('/audit-logs/{id}', {
    responses: {
      '204': {
        description: 'AuditLog DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.auditLogRepository.deleteById(id);
  }
}
