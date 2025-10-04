import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IssueCodeDto, PromoCodeResponseDto } from '../common/dto/promo.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class PromoService {
  constructor(private prisma: PrismaService) {}

  async issueCode(campaignId: number, issueCodeDto: IssueCodeDto): Promise<PromoCodeResponseDto> {
    // Check if campaign exists and is active
    const campaign = await this.prisma.campaign.findFirst({
      where: {
        id: campaignId,
        status: 'ACTIVE',
        startsAt: { lte: new Date() },
        expiresAt: { gte: new Date() },
      },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found or inactive');
    }

    // Fraud prevention: Check for existing unredeemed code for same device/IP
    const existingCode = await this.prisma.promoCode.findFirst({
      where: {
        campaignId,
        userHint: issueCodeDto.deviceId || issueCodeDto.ipHash,
        redeemed: false,
        expiresAt: { gt: new Date() },
      },
    });

    if (existingCode) {
      return {
        code: existingCode.code,
        campaignId: existingCode.campaignId,
        issuedAt: existingCode.issuedAt,
        expiresAt: existingCode.expiresAt,
        redeemed: existingCode.redeemed,
      };
    }

    // Generate new code
    const code = `BLVK-${randomUUID().split('-')[0].toUpperCase()}`;
    const expiryDays = parseInt(process.env.PROMO_CODE_EXPIRY_DAYS || '30');
    const expiresAt = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000);

    const promoCode = await this.prisma.promoCode.create({
      data: {
        code,
        campaignId,
        userHint: issueCodeDto.deviceId || issueCodeDto.ipHash,
        expiresAt,
      },
    });

    // Track scan event
    await this.prisma.scanEvent.create({
      data: {
        campaignId,
        userAgent: 'BLVKDOT Web App',
        deviceId: issueCodeDto.deviceId,
        ipHash: issueCodeDto.ipHash,
      },
    });

    return {
      code: promoCode.code,
      campaignId: promoCode.campaignId,
      issuedAt: promoCode.issuedAt,
      expiresAt: promoCode.expiresAt,
      redeemed: promoCode.redeemed,
    };
  }

  async getCampaignStatus(campaignId: number) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
      include: {
        _count: {
          select: {
            codes: true,
            scans: true,
          },
        },
      },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    const redeemedCount = await this.prisma.promoCode.count({
      where: {
        campaignId,
        redeemed: true,
      },
    });

    return {
      id: campaign.id,
      name: campaign.name,
      status: campaign.status,
      totalIssued: campaign._count.codes,
      totalRedeemed: redeemedCount,
      totalScans: campaign._count.scans,
      conversionRate: campaign._count.codes > 0 
        ? Math.round((redeemedCount / campaign._count.codes) * 100) 
        : 0,
    };
  }
}