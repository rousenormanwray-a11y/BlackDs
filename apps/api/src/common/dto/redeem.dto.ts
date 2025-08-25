import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class LookupCodeDto {
  @ApiProperty({
    description: 'Promo code to lookup',
    example: 'BLVK-FOLLOW-ABC123',
  })
  @IsString()
  code: string;
}

export class ConfirmRedemptionDto {
  @ApiProperty({
    description: 'Promo code to redeem',
    example: 'BLVK-FOLLOW-ABC123',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Optional note about the redemption',
    example: 'Follows verified on WhatsApp and Instagram',
    required: false,
  })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({
    description: 'Whether social media follows were verified',
    example: true,
  })
  @IsBoolean()
  followedVerified: boolean;
}

export class RedemptionResponseDto {
  @ApiProperty({
    description: 'Whether redemption was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Promo code that was redeemed',
    example: 'BLVK-FOLLOW-ABC123',
  })
  code: string;

  @ApiProperty({
    description: 'When the code was redeemed',
    example: '2025-01-15T10:30:00Z',
  })
  redeemedAt: Date;

  @ApiProperty({
    description: 'Campaign information',
  })
  campaign: {
    id: number;
    name: string;
  };
}