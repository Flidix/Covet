import { Column, Entity, ManyToOne } from 'typeorm';

import { UserEntity } from '../../user/entities/user.entity';
import { GroupEntity } from './group.entity';
import { BaseEntity } from '@shared/database/entities/base.entity';

import { databaseTables } from '@shared/database/constants';

@Entity({ name: databaseTables.userToGroups })
export class UserToGroupEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.userToGroups)
  user?: UserEntity;

  @Column()
  userId: number;

  @ManyToOne(() => GroupEntity, (group) => group.userToGroups)
  group?: GroupEntity;

  @Column()
  groupId: number;
}
