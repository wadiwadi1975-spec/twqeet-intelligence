import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Get('insights')
  async getInsights(@Query('companyId') companyId: string) {
    return this.aiService.getInsights(companyId || '1');
  }

  @Post('recommendations')
  async generateRecommendations(
    @Body('companyId') companyId: string,
    @Body('salesData') salesData: any[],
    @Body('inventoryData') inventoryData: any[],
  ) {
    return this.aiService.generateRecommendations(companyId || '1', salesData, inventoryData);
  }

  @Get('forecast')
  async getForecasts(@Query('companyId') companyId: string) {
    return this.aiService.getForecasts(companyId || '1');
  }

  @Get('chat')
  async getChat(@Query('companyId') companyId: string, @Query('q') question: string) {
    return this.aiService.getChat(companyId || '1', question || '');
  }

  @Get('brief')
  async getExecutiveBrief(@Query('companyId') companyId: string) {
    return this.aiService.getExecutiveBrief(companyId || '1');
  }

  @Get('market')
  async getMarketIntelligence(@Query('companyId') companyId: string) {
    return this.aiService.getMarketIntelligence(companyId || '1');
  }

  @Get('category-intelligence')
  async getCategoryIntelligence(@Query('companyId') companyId: string) {
    return this.aiService.getCategoryIntelligence(companyId || '1');
  }
}
