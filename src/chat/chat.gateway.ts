import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import { ChatService } from './chat.service';

import { WebSocketAuthGuard } from '../auth/guards/socket.auth.guard';

import { SocketCtx } from '../auth/decorators/socket-ctx.decorator';

import { AddUserToGroup } from './dtos/addUserToGroup';
import { SendMessageDto } from './dtos/send-message.dto';
import { TypingDto } from './dtos/typing.dto';
import { CreateGroupDto } from 'src/group/dtos/Create-group.dto';
import { DeleteGroupDto } from 'src/group/dtos/delete-group.dto';
import { LeaveGroupDto } from 'src/group/dtos/leave-group.dto';
import { DeleteMessageDto } from 'src/messages/dtos/delete-message.dto';
import { UpdateMessageDto } from 'src/messages/dtos/update-message.dto';

@UseGuards(WebSocketAuthGuard)
@WebSocketGateway(3001, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('updateMessage')
  onUpdate(
    @SocketCtx('userId') userId: number,
    @MessageBody() dto: UpdateMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    return this.chatService.updateMessage({
      server: this.server,
      socket,
      userId,
      ...dto,
    });
  }

  @SubscribeMessage('message')
  onMessage(
    @SocketCtx('userId') userId: number,
    @MessageBody() dto: SendMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    return this.chatService.sendMessage({
      server: this.server,
      socket,
      userId,
      ...dto,
    });
  }

  @SubscribeMessage('typing')
  onTyping(
    @ConnectedSocket() socket: Socket,
    @SocketCtx('userId') userId: number,
    @MessageBody() dto: TypingDto,
  ) {
    return this.chatService.isTyping(dto, userId, socket, this.server);
  }

  @SubscribeMessage('create')
  onCreate(
    @ConnectedSocket() socket: Socket,
    @SocketCtx('userId') userId: number,
    @MessageBody() body: CreateGroupDto,
  ) {
    return this.chatService.createGroup({
      server: this.server,
      socket,
      userId,
      ...body,
      groupId: userId,
    });
  }

  @SubscribeMessage('join')
  onJoin(
    @ConnectedSocket() socket: Socket,
    @SocketCtx('userId') userId: number,
    @MessageBody() body: AddUserToGroup,
  ) {
    return this.chatService.addUserToGroup(body, userId, socket, this.server);
  }

  @SubscribeMessage('onDelete')
  onDelete(
    @ConnectedSocket() socket: Socket,
    @SocketCtx('userId') userId: number,
    @MessageBody() dto: DeleteGroupDto,
  ) {
    return this.chatService.deleteGroup(dto, userId, socket, this.server);
  }

  @SubscribeMessage('leave')
  onLeave(
    @ConnectedSocket() socket: Socket,
    @SocketCtx('userId') userId: number,
    @MessageBody() dto: LeaveGroupDto,
  ) {
    return this.chatService.leaveGroup(dto, userId, socket, this.server);
  }

  @SubscribeMessage('deleteMessage')
  onDeleteMessage(
    @SocketCtx('userId') userId: number,
    @ConnectedSocket() socket: Socket,
    @MessageBody() dto: DeleteMessageDto,
  ) {
    return this.chatService.deleteMessage({
      server: this.server,
      socket,
      userId,
      ...dto,
    });
  }
}
