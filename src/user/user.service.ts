import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { DatabaseService } from '@shared/database/services/database.service';
import { FileService, FileTypes } from 'src/file/file.service';

import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService extends DatabaseService {
  constructor(
    @InjectDataSource() datasource: DataSource,
    private readonly fileService: FileService,
  ) {
    super(datasource);
  }

  async updateProfile(userId: number, dto: UpdateUserDto, file) {
    const userAvatar = await this.fileService.createFile(FileTypes.userAvatarCovet, file);
    await this.database.users.update({ id: userId }, { ...dto, userAvatar });
    return true;
  }
}
