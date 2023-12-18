import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@shared/database/services/database.service';

import { SendMessageDto } from './dtos/send-message.dto';

@Injectable()
export class MessagesService extends DatabaseService {
  async sendMessage(dto: SendMessageDto, userId: number) {
    const user = await this.database.users.findOneOrFail({ where: { id: userId } });
    const group = await this.database.groups.findOneOrFail({ where: { id: dto.groupId } });
    return await this.database.messages.create({
      user,
      group,
      ...dto,
    });
  }
}
