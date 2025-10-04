import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { QrService } from './qr.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('qr')
@Controller('campaigns')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @Get(':id/qr')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Generate QR code for campaign' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiQuery({ name: 'format', description: 'QR format', enum: ['png', 'svg'], required: false })
  async generateQR(
    @Param('id') id: string,
    @Query('format') format: 'png' | 'svg' = 'png',
    @Res() res: Response,
  ) {
    const qrData = await this.qrService.generateQR(+id, format);
    
    if (format === 'svg') {
      res.setHeader('Content-Type', 'image/svg+xml');
      res.setHeader('Content-Disposition', `attachment; filename="campaign-${id}-qr.svg"`);
      res.send(qrData);
    } else {
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Disposition', `attachment; filename="campaign-${id}-qr.png"`);
      res.send(qrData);
    }
  }
}