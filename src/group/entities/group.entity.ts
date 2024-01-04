import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { MessageEntity } from '../../messages/entities/message.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { UserToGroupEntity } from './user-to-group.entity';
import { BaseEntity } from '@shared/database/entities/base.entity';

import { databaseTables } from '@shared/database/constants';

@Entity({ name: databaseTables.groups })
export class GroupEntity extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => UserEntity)
  user?: UserEntity;

  @Column()
  userId: number;

  @Column({ default: '' })
  groupAvatar?: string;

  @OneToMany(() => MessageEntity, (message) => message.group, { onDelete: 'CASCADE' })
  messages?: MessageEntity[];

  @OneToMany(() => UserToGroupEntity, (userToGroup) => userToGroup.group, { onDelete: 'CASCADE' })
  userToGroups?: UserToGroupEntity[];
}
