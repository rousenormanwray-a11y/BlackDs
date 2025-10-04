import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HousekeepingService } from './housekeeping.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [HousekeepingService, PrismaService],
})
export class HousekeepingModule {}