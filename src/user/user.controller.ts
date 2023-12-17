import { Controller, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';

import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
