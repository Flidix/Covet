import { Module } from '@nestjs/common';

import { GroupController } from './group.controller';

import { GroupService } from './group.service';
import { FileService } from 'src/file/file.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService, FileService],
  imports: [],
})
export class GroupModule {}
