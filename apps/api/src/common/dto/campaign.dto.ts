import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { CampaignStatus } from '@prisma/client';

export class CreateCampaignDto {
  @ApiProperty({
    description: 'Campaign name',
    example: 'Follow Us Promo',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Campaign type',
    example: 'FOLLOW_US',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Campaign start date',
    example: '2025-01-15T00:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startsAt?: string;

  @ApiProperty({
    description: 'Campaign end date',
    example: '2025-12-31T23:59:59Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}

export class UpdateCampaignDto {
  @ApiProperty({
    description: 'Campaign name',
    example: 'Follow Us Promo',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Campaign type',
    example: 'FOLLOW_US',
    required: false,
  })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({
    description: 'Campaign status',
    enum: CampaignStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(CampaignStatus)
  status?: CampaignStatus;

  @ApiProperty({
    description: 'Campaign start date',
    example: '2025-01-15T00:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startsAt?: string;

  @ApiProperty({
    description: 'Campaign end date',
    example: '2025-12-31T23:59:59Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}

export class CampaignResponseDto {
  @ApiProperty({
    description: 'Campaign ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Campaign name',
    example: 'Follow Us Promo',
  })
  name: string;

  @ApiProperty({
    description: 'Campaign type',
    example: 'FOLLOW_US',
  })
  type: string;

  @ApiProperty({
    description: 'Campaign status',
    example: 'ACTIVE',
  })
  status: CampaignStatus;

  @ApiProperty({
    description: 'Campaign creation date',
    example: '2025-01-15T10:30:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Campaign start date',
    example: '2025-01-15T00:00:00Z',
  })
  startsAt?: Date;

  @ApiProperty({
    description: 'Campaign end date',
    example: '2025-12-31T23:59:59Z',
  })
  expiresAt?: Date;
}