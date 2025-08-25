import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class QrService {
  async generateQR(campaignId: number, format: 'png' | 'svg' = 'png'): Promise<Buffer | string> {
    const deeplink = `${process.env.CORS_ORIGIN || 'http://localhost:3000'}/claim?campaignId=${campaignId}`;
    
    if (format === 'svg') {
      return QRCode.toString(deeplink, {
        type: 'svg',
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
    }

    return QRCode.toBuffer(deeplink, {
      type: 'image/png',
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });
  }
}