import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { GroupService } from '../group/group.service';
import { MessagesService } from '../messages/messages.service';
import { DatabaseService } from '@shared/database/services/database.service';

import { AddUserToGroup } from './dtos/addUserToGroup';
import { SendMessageDto } from './dtos/send-message.dto';
import { CreateGroupDto } from 'src/group/dtos/Create-group.dto';
import { DeleteGroupDto } from 'src/group/dtos/delete-group.dto';
import { LeaveGroupDto } from 'src/group/dtos/leave-group.dto';

import { SocketEventPayload } from './types';

@Injectable()
export class ChatService extends DatabaseService {
  constructor(
    @InjectDataSource() datasource: DataSource,
    private readonly messagesService: MessagesService,
    private readonly groupService: GroupService,
  ) {
    super(datasource);
  }

  async sendMessage(body: SocketEventPayload<SendMessageDto>) {
    const { server, userId, groupId } = body;
    await this.database.userToGroups.findOneOrFail({ where: { groupId, userId } });
    const createMessage = await this.messagesService.sendMessage(body, userId);
    server.emit('message', { ...createMessage });
  }

  async createGroup(body: SocketEventPayload<CreateGroupDto>) {
    const { server, userId, name, socket, groupAvatar } = body;

    const group = await this.groupService.createGroup(name, userId, groupAvatar);

    socket.join(`${group.id}`);
    server.emit('create', { group });
  }

  async addUserToGroup(dto: AddUserToGroup, userId: number, socket, server) {
    await this.database.userToGroups.findOneOrFail({
      where: { groupId: dto.groupId, userId: userId },
    });
    const group = await this.groupService.addUserToGroup(dto);

    socket.join(`${dto.groupId}`);
    server.emit('join', { group });
  }

  async deleteGroup(dto: DeleteGroupDto, userId: number, socket, server) {
    await this.groupService.deleteGroup(userId, dto.groupId);

    socket.leave(`${dto.groupId}`);
    server.emit('delete', { groupId: dto.groupId, userId });
  }

  async leaveGroup(dto: LeaveGroupDto, userId: number, socket, server) {
    await this.groupService.leaveGroup(dto, userId);

    socket.leave(`${dto.groupId}`);
    server.emit('leave', { groupId: dto.groupId, userId });
  }
}
