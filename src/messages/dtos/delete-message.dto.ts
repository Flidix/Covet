import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteMessageDto {
  @IsNumber()
  @IsNotEmpty()
  messageId: number;
}
