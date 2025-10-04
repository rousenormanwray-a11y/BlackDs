import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RedeemService } from './redeem.service';
import { LookupCodeDto, ConfirmRedemptionDto, RedemptionResponseDto } from '../common/dto/redeem.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('redeem')
@Controller('redeem')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class RedeemController {
  constructor(private readonly redeemService: RedeemService) {}

  @Post('lookup')
  @Roles(Role.ATTENDANT, Role.ADMIN)
  @ApiOperation({ summary: 'Lookup a promo code status' })
  @ApiResponse({
    status: 200,
    description: 'Code lookup successful',
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid promo code',
  })
  async lookupCode(@Body() lookupDto: LookupCodeDto) {
    return this.redeemService.lookupCode(lookupDto);
  }

  @Post('confirm')
  @Roles(Role.ATTENDANT, Role.ADMIN)
  @ApiOperation({ summary: 'Confirm redemption of a promo code' })
  @ApiResponse({
    status: 201,
    description: 'Redemption confirmed successfully',
    type: RedemptionResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid code or already redeemed',
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid promo code',
  })
  async confirmRedemption(
    @Body() confirmDto: ConfirmRedemptionDto,
    @Req() req: any,
  ): Promise<RedemptionResponseDto> {
    return this.redeemService.confirmRedemption(confirmDto, req.user.id);
  }

  @Get('history')
  @Roles(Role.ATTENDANT, Role.ADMIN)
  @ApiOperation({ summary: 'Get redemption history for current user' })
  @ApiResponse({
    status: 200,
    description: 'Redemption history retrieved successfully',
  })
  async getRedemptionHistory(@Req() req: any) {
    return this.redeemService.getRedemptionHistory(req.user.id);
  }
}