import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaignDto, UpdateCampaignDto, CampaignResponseDto } from '../common/dto/campaign.dto';

@Injectable()
export class CampaignsService {
  constructor(private prisma: PrismaService) {}

  async create(createCampaignDto: CreateCampaignDto): Promise<CampaignResponseDto> {
    const campaign = await this.prisma.campaign.create({
      data: {
        name: createCampaignDto.name,
        type: createCampaignDto.type,
        startsAt: createCampaignDto.startsAt ? new Date(createCampaignDto.startsAt) : null,
        expiresAt: createCampaignDto.expiresAt ? new Date(createCampaignDto.expiresAt) : null,
      },
    });

    return {
      id: campaign.id,
      name: campaign.name,
      type: campaign.type,
      status: campaign.status,
      createdAt: campaign.createdAt,
      startsAt: campaign.startsAt || undefined,
      expiresAt: campaign.expiresAt || undefined,
    };
  }

  async findAll(): Promise<CampaignResponseDto[]> {
    const campaigns = await this.prisma.campaign.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return campaigns.map(campaign => ({
      id: campaign.id,
      name: campaign.name,
      type: campaign.type,
      status: campaign.status,
      createdAt: campaign.createdAt,
      startsAt: campaign.startsAt || undefined,
      expiresAt: campaign.expiresAt || undefined,
    }));
  }

  async findOne(id: number): Promise<CampaignResponseDto> {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id },
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
        campaignId: id,
        redeemed: true,
      },
    });

    return {
      id: campaign.id,
      name: campaign.name,
      type: campaign.type,
      status: campaign.status,
      createdAt: campaign.createdAt,
      startsAt: campaign.startsAt || undefined,
      expiresAt: campaign.expiresAt || undefined,
      // Additional stats
      totalCodes: campaign._count.codes,
      totalRedeemed: redeemedCount,
      totalScans: campaign._count.scans,
      conversionRate: campaign._count.codes > 0 
        ? Math.round((redeemedCount / campaign._count.codes) * 100) 
        : 0,
    } as any;
  }

  async update(id: number, updateCampaignDto: UpdateCampaignDto): Promise<CampaignResponseDto> {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    const updatedCampaign = await this.prisma.campaign.update({
      where: { id },
      data: {
        name: updateCampaignDto.name,
        type: updateCampaignDto.type,
        status: updateCampaignDto.status,
        startsAt: updateCampaignDto.startsAt ? new Date(updateCampaignDto.startsAt) : null,
        expiresAt: updateCampaignDto.expiresAt ? new Date(updateCampaignDto.expiresAt) : null,
      },
    });

    return {
      id: updatedCampaign.id,
      name: updatedCampaign.name,
      type: updatedCampaign.type,
      status: updatedCampaign.status,
      createdAt: updatedCampaign.createdAt,
      startsAt: updatedCampaign.startsAt || undefined,
      expiresAt: updatedCampaign.expiresAt || undefined,
    };
  }

  async remove(id: number): Promise<void> {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    // Soft delete by archiving
    await this.prisma.campaign.update({
      where: { id },
      data: { status: 'ARCHIVED' },
    });
  }

  async getDeeplink(id: number): Promise<string> {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    const baseUrl = process.env.CORS_ORIGIN || 'http://localhost:3000';
    return `${baseUrl}/claim?campaignId=${id}`;
  }
}