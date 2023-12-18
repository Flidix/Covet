import { Module } from '@nestjs/common';

import { UserController } from './user.controller';

import { UserService } from './user.service';
import { FileService } from 'src/file/file.service';

@Module({
  controllers: [UserController],
  providers: [UserService, FileService],
  imports: [],
})
export class UserModule {}
