import { UserEntity } from '../../../user/entities/user.entity';

import { DatabaseRepository } from '../repositories/database.repository';

export type DatabaseEntitiesType = {
  users: UserEntity;
};

export type DatabaseRepositories = {
  [table in keyof DatabaseEntitiesType]: DatabaseRepository<DatabaseEntitiesType[table]>;
};
