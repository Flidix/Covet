import { UserEntity } from '../../../user/entities/user.entity';
import { GroupEntity } from 'src/group/entities/group.entity';
import { UserToGroupEntity } from 'src/group/entities/user-to-group.entity';
import { MessageEntity } from 'src/messages/entities/message.entity';

import { DatabaseRepository } from '../repositories/database.repository';

export type DatabaseEntitiesType = {
  users: UserEntity;
  messages: MessageEntity;
  groups: GroupEntity;
  userToGroups: UserToGroupEntity;
};

export type DatabaseRepositories = {
  [table in keyof DatabaseEntitiesType]: DatabaseRepository<DatabaseEntitiesType[table]>;
};
