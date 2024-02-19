import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateMessageDto {
  @IsNumber()
  @IsNotEmpty()
  messageId: number;

  @IsString()
  @IsNotEmpty()
  message: string;
}
