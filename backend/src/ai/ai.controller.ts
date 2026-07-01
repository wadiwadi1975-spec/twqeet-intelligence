import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Get('insights')
  async getInsights(@Query('companyId') companyId: string) {
    return this.aiService.getInsights(companyId);
  }

  @Post('recommendations')
  async generateRecommendations(
    @Body('companyId') companyId: string,
    @Body('salesData') salesData: any[],
    @Body('inventoryData') inventoryData: any[],
  ) {
    return this.aiService.generateRecommendations(companyId, salesData, inventoryData);
  }

  @Get('forecast')
  async getForecasts(@Query('companyId') companyId: string) {
    return this.aiService.getForecasts(companyId);
  }
}
