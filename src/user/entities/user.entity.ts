import { Column, CreateDateColumn, Entity, OneToMany } from 'typeorm';

import { Environment } from '@shared/variables/environment';

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

  @Column({ default: Environment.S3_BUCKET_USER_DEfAULT_PATH })
  userAvatar: string;

  @OneToMany(() => UserToGroupEntity, (userToGroup) => userToGroup.user)
  userToGroups?: UserToGroupEntity[];
}
