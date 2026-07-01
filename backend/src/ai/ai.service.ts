import { Injectable } from '@nestjs/common';
import { MockService } from '../mock/mock.service';

@Injectable()
export class AiService {
  constructor(private mockService: MockService) {}

  async getInsights(companyId: string) {
    return {
      recommendations: this.mockService.getRecommendations(companyId),
      forecasts: await this.getForecasts(companyId),
    };
  }

  async generateRecommendations(companyId: string, salesData: any[], inventoryData: any[]) {
    return this.mockService.getRecommendations(companyId);
  }

  async getForecasts(companyId: string) {
    return [
      { _id: '1', type: 'sales', period: 'الأسبوع القادم', predictedValue: 28000, confidence: 88, companyId, trend: 'up' },
      { _id: '2', type: 'sales', period: 'الشهر القادم', predictedValue: 120000, confidence: 82, companyId, trend: 'up' },
      { _id: '3', type: 'profit', period: 'الشهر القادم', predictedValue: 18000, confidence: 78, companyId, trend: 'up' },
      { _id: '4', type: 'inventory', period: 'بعد 3 أشهر', predictedValue: 165000, confidence: 75, companyId, trend: 'down' },
      { _id: '5', type: 'category', category: 'الأساور', predictedGrowth: '+18%', confidence: 92, companyId },
      { _id: '6', type: 'category', category: 'الأطقم', predictedGrowth: '-5%', confidence: 85, companyId },
    ];
  }

  async getChat(companyId: string, question: string) {
    return this.mockService.getAIChatResponse(companyId, question);
  }

  async getExecutiveBrief(companyId: string) {
    return this.mockService.getExecutiveBrief(companyId);
  }

  async getMarketIntelligence(companyId: string) {
    return {
      goldPrice: { usd: 2350, change: -0.5, changePercent: -0.5 },
      localPrices: { '24K': 13.2, '21K': 11.55, '18K': 9.9, '22K': 12.1 },
      dollarRate: 0.305,
      marketTrend: 'up',
      news: [
        { title: 'الfed يثبت أسعار الفائدة', impact: 'positive', effect: 'ارتفاع الطلب على الذهب كملاذ آمن' },
        { title: 'انخفاض الإنتاج الصناعي الأمريكي', impact: 'positive', effect: 'دعم أسعار الذهب' },
        { title: 'توقعات التضخم ترتفع', impact: 'positive', effect: 'زيادة الطلب على السلع الذهبية' },
      ],
      recommendations: [
        'فرصة شراء ممتازة بسبب ارتفاع الذهب عالمياً',
        'التركيز على المنتجات خفيفة الوزن',
        'الاحتفاظ بالسبائك كاستثمار',
      ],
    };
  }

  async getCategoryIntelligence(companyId: string) {
    return this.mockService.getCategoryStats(companyId);
  }
}
