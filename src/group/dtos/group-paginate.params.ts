import { IsNotEmpty } from 'class-validator';

export class GroupPaginateParams {
  @IsNotEmpty()
  page: number = 1;

  @IsNotEmpty()
  pageSize: number = 10;
}
