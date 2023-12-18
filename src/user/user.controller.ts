import { Body, Controller, Patch, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UserService } from './user.service';

import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

import { CurrentUser } from 'src/auth/decorators/currentUser';

import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('update')
  @UseInterceptors(FileInterceptor('userAvatar'))
  updateUser(
    @CurrentUser('userId') id: number,
    @Body() dto: UpdateUserDto,
    @UploadedFile() files: { userAvatar?: Express.Multer.File[] },
  ) {
    return this.userService.updateProfile(id, dto, files);
  }
}
