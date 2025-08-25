import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { PromoModule } from './promo/promo.module';
import { RedeemModule } from './redeem/redeem.module';
import { QrModule } from './qr/qr.module';
import { ExportsModule } from './exports/exports.module';
import { HousekeepingModule } from './housekeeping/housekeeping.module';
import { HealthModule } from './health/health.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UsersModule,
    CampaignsModule,
    PromoModule,
    RedeemModule,
    QrModule,
    ExportsModule,
    HousekeepingModule,
    HealthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}