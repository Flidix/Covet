import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { GroupModule } from './group/group.module';
import { MessagesModule } from './messages/messages.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from '@shared/database/database.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, MessagesModule, GroupModule, ChatModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class RootModule {}
