import {SoftDeleteEntity} from 'loopback4-soft-delete';
import {property} from '@loopback/repository';

export class BaseEntity extends SoftDeleteEntity {
  @property({
    type: 'date',
    default: () => new Date(),
  })
  created_on?: Date;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  modified_on?: Date;
}
