import { Module } from '@nestjs/common';

import { PrismaService } from './services/prisma.service';
import { UtilsService } from './services/utils.service';

@Module({
  providers: [PrismaService, UtilsService],
  exports: [PrismaService, UtilsService],
})
export class CommonModule {}
