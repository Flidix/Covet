import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteGroupDto {
  @IsNumber()
  @IsNotEmpty()
  groupId: number;
}
