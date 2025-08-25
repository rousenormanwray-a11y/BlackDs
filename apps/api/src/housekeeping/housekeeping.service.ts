import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HousekeepingService {
  private readonly logger = new Logger(HousekeepingService.name);

  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async expireCodes() {
    this.logger.log('Running housekeeping: expire codes');
    const now = new Date();

    // Find expired & not redeemed codes
    const expiredCodes = await this.prisma.promoCode.findMany({
      where: {
        expiresAt: { lt: now },
        redeemed: false,
      },
    });

    if (!expiredCodes.length) {
      this.logger.log('No expired codes found.');
      return;
    }

    // Create EXPIRED logs for each expired code
    for (const code of expiredCodes) {
      await this.prisma.redemptionLog.create({
        data: {
          promoCodeId: code.id,
          status: 'EXPIRED',
          note: 'Auto-expired by housekeeping job',
        },
      });
    }

    this.logger.log(`Expired ${expiredCodes.length} codes.`);
  }

  @Cron(CronExpression.EVERY_WEEK)
  async cleanupOldLogs() {
    this.logger.log('Running housekeeping: cleanup old logs');
    
    // Keep logs for 90 days
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 90);

    const deletedCount = await this.prisma.redemptionLog.deleteMany({
      where: {
        createdAt: { lt: cutoffDate },
      },
    });

    this.logger.log(`Cleaned up ${deletedCount.count} old logs.`);
  }
}