import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class IssueCodeDto {
  @ApiProperty({
    description: 'Device ID for fraud prevention',
    example: 'device-uuid-123',
    required: false,
  })
  @IsOptional()
  @IsString()
  deviceId?: string;

  @ApiProperty({
    description: 'IP hash for fraud prevention',
    example: 'ip-hash-456',
    required: false,
  })
  @IsOptional()
  @IsString()
  ipHash?: string;

  @ApiProperty({
    description: 'User self-attestation that they followed social media',
    example: true,
  })
  @IsBoolean()
  selfAttested: boolean;
}

export class PromoCodeResponseDto {
  @ApiProperty({
    description: 'Unique promo code',
    example: 'BLVK-FOLLOW-ABC123',
  })
  code: string;

  @ApiProperty({
    description: 'Campaign ID',
    example: 1,
  })
  campaignId: number;

  @ApiProperty({
    description: 'When the code was issued',
    example: '2025-01-15T10:30:00Z',
  })
  issuedAt: Date;

  @ApiProperty({
    description: 'When the code expires',
    example: '2025-02-14T10:30:00Z',
  })
  expiresAt: Date;

  @ApiProperty({
    description: 'Whether the code has been redeemed',
    example: false,
  })
  redeemed: boolean;
}