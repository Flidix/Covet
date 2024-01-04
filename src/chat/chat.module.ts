import { Module } from '@nestjs/common';

import { GroupService } from '../group/group.service';
import { MessagesService } from '../messages/messages.service';
import { ChatService } from './chat.service';
import { FileService } from 'src/file/file.service';

import { ChatGateway } from './chat.gateway';

@Module({
  providers: [ChatGateway, ChatService, MessagesService, GroupService, FileService],
  imports: [],
  exports: [ChatGateway],
})
export class ChatModule {}
