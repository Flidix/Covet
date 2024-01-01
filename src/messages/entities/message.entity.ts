import { Column, Entity, ManyToOne } from 'typeorm';

import { GroupEntity } from '../../group/entities/group.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { BaseEntity } from '@shared/database/entities/base.entity';

import { databaseTables } from '@shared/database/constants';

@Entity({ name: databaseTables.messages })
export class MessageEntity extends BaseEntity {
  @Column()
  message: string;

  @Column()
  userId: number;

  @Column()
  groupId: number;

  @ManyToOne(() => UserEntity)
  user?: UserEntity;

  @ManyToOne(() => GroupEntity, (group) => group.messages, { onDelete: 'CASCADE' })
  group?: GroupEntity;
}
