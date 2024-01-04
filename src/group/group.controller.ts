import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { GroupService } from './group.service';

import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

import { CurrentUser } from '../auth/decorators/currentUser';

@UseGuards(JwtAuthGuard)
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get('my-groups')
  getMyGroups(@CurrentUser('userId') userId: number) {
    return this.groupService.getUserGroup(userId);
  }

  @Get(':id')
  getGroup(@CurrentUser('userId') userId: number, @Param('id') groupId: number) {
    return this.groupService.getGroup(userId, groupId);
  }
}
