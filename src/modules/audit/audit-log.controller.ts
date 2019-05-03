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

export class AuditLogController {
  constructor(
    @repository(AuditLogRepository)
    public auditLogRepository : AuditLogRepository,
  ) {}

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

  @get('/audit-logs/count', {
    responses: {
      '200': {
        description: 'AuditLog model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(AuditLog)) where?: Where,
  ): Promise<Count> {
    return await this.auditLogRepository.count(where);
  }

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
    @param.query.object('filter', getFilterSchemaFor(AuditLog)) filter?: Filter,
  ): Promise<AuditLog[]> {
    return await this.auditLogRepository.find(filter);
  }

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
    @param.query.object('where', getWhereSchemaFor(AuditLog)) where?: Where,
  ): Promise<Count> {
    return await this.auditLogRepository.updateAll(auditLog, where);
  }

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
