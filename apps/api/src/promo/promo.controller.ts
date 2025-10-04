import { Controller, Post, Get, Param, Body, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PromoService } from './promo.service';
import { IssueCodeDto, PromoCodeResponseDto } from '../common/dto/promo.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('promo')
@Controller('promo')
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  @Public()
  @Post(':id/issue-code')
  @ApiOperation({ summary: 'Issue a promo code for a campaign' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({
    status: 201,
    description: 'Code issued successfully',
    type: PromoCodeResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Campaign not found or inactive',
  })
  async issueCode(
    @Param('id') id: string,
    @Body() issueCodeDto: IssueCodeDto,
    @Req() req: any,
  ): Promise<PromoCodeResponseDto> {
    // Add IP hash from request if not provided
    if (!issueCodeDto.ipHash && req.ip) {
      issueCodeDto.ipHash = req.ip;
    }

    return this.promoService.issueCode(Number(id), issueCodeDto);
  }

  @Public()
  @Get(':id/status')
  @ApiOperation({ summary: 'Get campaign status and statistics' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({
    status: 200,
    description: 'Campaign status retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Campaign not found',
  })
  async getCampaignStatus(@Param('id') id: string) {
    return this.promoService.getCampaignStatus(Number(id));
  }
}