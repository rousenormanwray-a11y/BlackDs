import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { stringify } from 'csv-stringify/sync';

@Injectable()
export class ExportsService {
  constructor(private prisma: PrismaService) {}

  async exportCodes(campaignId: number): Promise<string> {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    const codes = await this.prisma.promoCode.findMany({
      where: { campaignId },
      include: {
        campaign: true,
      },
      orderBy: { issuedAt: 'desc' },
    });

    const records = codes.map(code => ({
      code: code.code,
      campaign: code.campaign.name,
      issuedAt: code.issuedAt.toISOString(),
      expiresAt: code.expiresAt.toISOString(),
      redeemed: code.redeemed ? 'Yes' : 'No',
      redeemedAt: code.redeemedAt?.toISOString() || '',
      userHint: code.userHint || '',
    }));

    return stringify(records, { header: true });
  }

  async exportRedemptions(campaignId: number): Promise<string> {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    const redemptions = await this.prisma.redemptionLog.findMany({
      where: {
        promoCode: { campaignId },
      },
      include: {
        promoCode: {
          include: { campaign: true },
        },
        attendant: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const records = redemptions.map(redemption => ({
      code: redemption.promoCode.code,
      campaign: redemption.promoCode.campaign.name,
      status: redemption.status,
      attendant: redemption.attendant?.email || 'System',
      note: redemption.note || '',
      createdAt: redemption.createdAt.toISOString(),
    }));

    return stringify(records, { header: true });
  }
}