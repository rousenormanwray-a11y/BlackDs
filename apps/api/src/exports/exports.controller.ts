import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { ExportsService } from './exports.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('exports')
@Controller('exports')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ExportsController {
  constructor(private readonly exportsService: ExportsService) {}

  @Get('campaign/:id/codes.csv')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Export campaign codes as CSV' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  async exportCodes(@Param('id') id: string, @Res() res: Response) {
    const csv = await this.exportsService.exportCodes(+id);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="campaign-${id}-codes.csv"`);
    res.send(csv);
  }

  @Get('campaign/:id/redemptions.csv')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Export campaign redemptions as CSV' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  async exportRedemptions(@Param('id') id: string, @Res() res: Response) {
    const csv = await this.exportsService.exportRedemptions(+id);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="campaign-${id}-redemptions.csv"`);
    res.send(csv);
  }
}