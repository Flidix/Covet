import { Column, CreateDateColumn, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '@shared/database/entities/base.entity';
import { UserToGroupEntity } from 'src/group/entities/user-to-group.entity';

import { databaseTables } from '@shared/database/constants';

@Entity({ name: databaseTables.users })
export class UserEntity extends BaseEntity {
  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  lastLoginAt: Date;

  @OneToMany(() => UserToGroupEntity, (userToGroup) => userToGroup.user)
  userToGroups?: UserToGroupEntity[];
}
