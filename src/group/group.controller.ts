import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';

import { GroupService } from './group.service';

import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

import { CurrentUser } from '../auth/decorators/currentUser';

import { GroupPaginateParams } from './dtos/group-paginate.params';

@UseGuards(JwtAuthGuard)
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get('my-groups')
  getMyGroups(@CurrentUser('userId') userId: number, @Query() query: GroupPaginateParams) {
    return this.groupService.getUserGroup(userId, query);
  }

  @Get(':id')
  getGroup(
    @CurrentUser('userId') userId: number,
    @Param('id') groupId: number,
    @Query() query: GroupPaginateParams,
  ) {
    return this.groupService.getGroup(userId, groupId, query);
  }
}
