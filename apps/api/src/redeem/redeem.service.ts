import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LookupCodeDto, ConfirmRedemptionDto, RedemptionResponseDto } from '../common/dto/redeem.dto';

@Injectable()
export class RedeemService {
  constructor(private prisma: PrismaService) {}

  async lookupCode(lookupDto: LookupCodeDto) {
    const promoCode = await this.prisma.promoCode.findUnique({
      where: { code: lookupDto.code },
      include: { campaign: true },
    });

    if (!promoCode) {
      throw new NotFoundException('Invalid promo code');
    }

    const isExpired = promoCode.expiresAt < new Date();
    const isRedeemed = promoCode.redeemed;

    return {
      code: promoCode.code,
      campaign: {
        id: promoCode.campaign.id,
        name: promoCode.campaign.name,
      },
      expiresAt: promoCode.expiresAt,
      redeemed: isRedeemed,
      expired: isExpired,
      valid: !isExpired && !isRedeemed,
    };
  }

  async confirmRedemption(
    confirmDto: ConfirmRedemptionDto,
    attendantId: number,
  ): Promise<RedemptionResponseDto> {
    // Validate code exists and is valid
    const promoCode = await this.prisma.promoCode.findUnique({
      where: { code: confirmDto.code },
      include: { campaign: true },
    });

    if (!promoCode) {
      throw new NotFoundException('Invalid promo code');
    }

    if (promoCode.redeemed) {
      throw new BadRequestException('Code has already been redeemed');
    }

    if (promoCode.expiresAt < new Date()) {
      throw new BadRequestException('Code has expired');
    }

    if (!confirmDto.followedVerified) {
      throw new BadRequestException('Social media follows must be verified before redemption');
    }

    // Update promo code as redeemed
    const updatedCode = await this.prisma.promoCode.update({
      where: { id: promoCode.id },
      data: {
        redeemed: true,
        redeemedAt: new Date(),
        redeemedBy: attendantId,
      },
      include: { campaign: true },
    });

    // Create redemption log
    await this.prisma.redemptionLog.create({
      data: {
        promoCodeId: promoCode.id,
        attendantId,
        status: 'SUCCESS',
        note: confirmDto.note,
      },
    });

    return {
      success: true,
      code: updatedCode.code,
      redeemedAt: updatedCode.redeemedAt!,
      campaign: {
        id: updatedCode.campaign.id,
        name: updatedCode.campaign.name,
      },
    };
  }

  async getRedemptionHistory(attendantId: number) {
    return this.prisma.redemptionLog.findMany({
      where: { attendantId },
      include: {
        promoCode: {
          include: { campaign: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}