import { Module } from '@nestjs/common';

import { ChatModule } from 'src/chat/chat.module';

import { GroupController } from './group.controller';

import { GroupService } from './group.service';
import { ChatService } from 'src/chat/chat.service';
import { MessagesService } from 'src/messages/messages.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService, ChatService, MessagesService],
  imports: [ChatModule],
})
export class GroupModule {}
