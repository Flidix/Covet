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
import { DeleteGroupDto } from 'src/group/dtos/delete-group.dto';
import { LeaveGroupDto } from 'src/group/dtos/leave-group.dto';

@UseGuards(WebSocketAuthGuard)
@WebSocketGateway(3001, {
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('message')
  onMessage(
    @SocketCtx() userId: number,
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

  @SubscribeMessage('join')
  onJoin(
    @ConnectedSocket() socket: Socket,
    @SocketCtx() userId: number,
    @MessageBody() body: AddUserToGroup,
  ) {
    return this.chatService.addUserToGroup(body, userId, socket, this.server);
  }

  @SubscribeMessage('delete')
  onDelete(
    @ConnectedSocket() socket: Socket,
    @SocketCtx() userId: number,
    @MessageBody() dto: DeleteGroupDto,
  ) {
    return this.chatService.deleteGroup(dto, userId, socket, this.server);
  }

  @SubscribeMessage('leave')
  onLeave(
    @ConnectedSocket() socket: Socket,
    @SocketCtx() userId: number,
    @MessageBody() dto: LeaveGroupDto,
  ) {
    return this.chatService.deleteGroup(dto, userId, socket, this.server);
  }
}
