import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { DatabaseService } from '@shared/database/services/database.service';
import { FileService, FileTypes } from 'src/file/file.service';

import { AddUserToGroup } from '../chat/dtos/addUserToGroup';
import { LeaveGroupDto } from './dtos/leave-group.dto';

@Injectable()
export class GroupService extends DatabaseService {
  constructor(
    @InjectDataSource() datasource: DataSource,
    private readonly fileService: FileService,
  ) {
    super(datasource);
  }
  async createGroup(name: string, userId: number, avatar?: string) {
    const groupAvatar = await this.fileService.createFile(FileTypes.groupAvatarCovet, avatar);
    const user = await this.database.users.findOneOrFail({ where: { id: userId } });
    const group = await this.database.groups.create({
      groupAvatar,
      name,
      userId,
    });
    await this.database.userToGroups.create({
      groupId: group.id,
      user,
      group,
      userId,
    });
    return group;
  }

  async addUserToGroup(dto: AddUserToGroup) {
    const user = await this.database.users.findOneOrFail({ where: { id: dto.userId } });
    const group = await this.database.groups.findOneOrFail({ where: { id: dto.groupId } });
    await this.database.userToGroups.checkNotExists({
      userId: dto.userId,
      groupId: dto.groupId,
    });
    return await this.database.userToGroups.create({
      userId: dto.userId,
      groupId: dto.groupId,
      user,
      group,
    });
  }

  async getUserGroup(userId: number) {
    return await this.database.userToGroups.findAllOrFail({
      where: { userId },
      relations: { group: true },
    });
  }

  async getGroup(userId: number, groupId: number) {
    await this.database.userToGroups.findOneOrFail({ where: { userId, groupId } });
    return await this.database.groups.findOneOrFail({
      where: { id: groupId },
      relations: {
        userToGroups: { user: true },
        messages: { user: true },
      },
    });
  }

  async deleteGroup(userId: number, groupId: number) {
    await this.database.groups.findOneOrFail({ where: { id: groupId, userId } });
    await this.database.userToGroups.delete({ groupId });
    await this.database.groups.delete({ id: groupId });
    await this.database.messages.delete({ groupId });
    return { userId, groupId };
  }

  async leaveGroup(dto: LeaveGroupDto, userId: number) {
    const userOnGroup = await this.database.userToGroups.findOneOrFail({
      where: { userId, groupId: dto.groupId },
    });

    await this.database.userToGroups.delete({ id: userOnGroup.id });
  }
}
