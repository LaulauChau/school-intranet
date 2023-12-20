import { Injectable } from '@nestjs/common';
import type { Prisma, User } from '@repo/database';

import { PrismaService } from '~/common/services/prisma.service';
import { UtilsService } from '~/common/services/utils.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly utilsService: UtilsService,
  ) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await this.utilsService.hashPassword(data.password);

    return this.prismaService.user.create({
      data: {
        ...this.utilsService.excludeFields(data, ['password']),
        password: hashedPassword,
      },
    });
  }

  async findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;

    if (data.password) {
      data.password = await this.utilsService.hashPassword(data.password.toString());
    }

    return this.prismaService.user.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.delete({
      where,
    });
  }
}
