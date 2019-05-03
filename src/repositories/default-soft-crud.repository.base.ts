import {SoftCrudRepository, SoftDeleteEntity} from 'loopback4-soft-delete';

export abstract class DefaultSoftCrudRepository<
  T extends SoftDeleteEntity,
  ID
> extends SoftCrudRepository<T, ID> {}
