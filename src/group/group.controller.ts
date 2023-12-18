import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { GroupService } from './group.service';

import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

import { CurrentUser } from '../auth/decorators/currentUser';

import { CreateGroupDto } from './dtos/Create-group.dto';

@UseGuards(JwtAuthGuard)
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  createGroup(@CurrentUser('userId') userId: number, @Body() dto: CreateGroupDto) {
    return this.groupService.createGroup(dto, userId);
  }

  @Get('my-groups')
  getMyGroups(@CurrentUser('userId') userId: number) {
    return this.groupService.getGroups(userId);
  }

  @Get(':id')
  getGroup(@CurrentUser('userId') userId: number, @Param('id') groupId: number) {
    return this.groupService.getGroup(userId, groupId);
  }
}
