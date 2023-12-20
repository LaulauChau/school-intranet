import { Body, Controller, Delete, Param, Patch, UseGuards } from '@nestjs/common';
import type { Prisma } from '@repo/database';

import { JwtAuthGuard } from '~/modules/auth/guards/jwt-auth.guard';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
    return this.usersService.update({
      where: { id },
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete({ id });
  }
}
