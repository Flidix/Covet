import { Module } from '@nestjs/common';

import { GroupService } from '../group/group.service';
import { MessagesService } from '../messages/messages.service';
import { ChatService } from './chat.service';

import { ChatGateway } from './chat.gateway';

@Module({
  providers: [ChatGateway, ChatService, MessagesService, GroupService],
  imports: [],
  exports: [ChatGateway],
})
export class ChatModule {}
