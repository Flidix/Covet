import { IsNotEmpty, IsNumber } from 'class-validator';

export class LeaveGroupDto {
  @IsNotEmpty()
  @IsNumber()
  groupId: number;
}
