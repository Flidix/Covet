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

  async deleteMessage(messageId: number, userId: number) {
    const message = await this.database.messages.findOneOrFail({
      where: { id: messageId, userId },
    });
    await this.database.messages.delete({ id: messageId, userId });
    return { messageId, userId: message.userId };
  }

  async updateMessage(userId: number, message: string, messageId: number) {
    await this.database.messages.update({ id: messageId, userId }, { message: message });
    return { messageId, userId, message };
  }
}
