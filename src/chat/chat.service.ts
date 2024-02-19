import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { Server, Socket } from 'socket.io';
import { DataSource } from 'typeorm';

import { GroupService } from '../group/group.service';
import { MessagesService } from '../messages/messages.service';
import { DatabaseService } from '@shared/database/services/database.service';

import { AddUserToGroup } from './dtos/addUserToGroup';
import { SendMessageDto } from './dtos/send-message.dto';
import { TypingDto } from './dtos/typing.dto';
import { CreateGroupDto } from 'src/group/dtos/Create-group.dto';
import { DeleteGroupDto } from 'src/group/dtos/delete-group.dto';
import { LeaveGroupDto } from 'src/group/dtos/leave-group.dto';
import { DeleteMessageDto } from 'src/messages/dtos/delete-message.dto';
import { UpdateMessageDto } from 'src/messages/dtos/update-message.dto';

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

  async updateMessage(body: SocketEventPayload<UpdateMessageDto>) {
    const { server, userId, message, messageId } = body;
    const updatedMessage = await this.messagesService.updateMessage(userId, message, messageId);
    server.emit('updateMessage', { ...updatedMessage });
  }

  async deleteMessage(body: SocketEventPayload<DeleteMessageDto>) {
    const { messageId, server, userId } = body;
    const message = await this.messagesService.deleteMessage(messageId, userId);
    server.emit('deleteMessage', { ...message });
  }

  async isTyping(dto: TypingDto, userId: number, socket: Socket, server: Server) {
    const user = await this.database.users.findOneOrFail({ where: { id: userId } });
    server.emit('typing', { ...dto, user, createdAt: new Date(), userId });
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
