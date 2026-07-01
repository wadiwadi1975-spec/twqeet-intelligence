import { Injectable } from '@nestjs/common';
import { MockService } from '../mock/mock.service';

@Injectable()
export class AiService {
  constructor(private mockService: MockService) {}

  async getInsights(companyId: string) {
    return {
      recommendations: [
        { _id: '1', text: 'قم بزيادة مخزون الأساور بنسبة 15%', priority: 'Critical', category: 'inventory', companyId },
        { _id: '2', text: 'اعرض خصومات على القلائد لتسريع حركتها', priority: 'Medium', category: 'inventory', companyId },
        { _id: '3', text: 'ركز على عيار 21K لأنه الأكثر طلبًا', priority: 'High', category: 'sales', companyId },
      ],
      forecasts: [
        { _id: '1', type: 'sales', period: 'الشهر القادم', predictedValue: 18000, confidence: 85, companyId },
        { _id: '2', type: 'profit', period: 'الربع القادم', predictedValue: 6500, confidence: 78, companyId },
      ],
    };
  }

  async generateRecommendations(companyId: string, salesData: any[], inventoryData: any[]) {
    return [
      { text: 'قم بزيادة مخزون الأساور بنسبة 15%', priority: 'Critical', category: 'inventory', companyId },
      { text: 'اعرض خصومات على القلائد', priority: 'Medium', category: 'inventory', companyId },
    ];
  }

  async getForecasts(companyId: string) {
    return [
      { _id: '1', type: 'sales', period: 'الشهر القادم', predictedValue: 18000, confidence: 85, companyId },
      { _id: '2', type: 'profit', period: 'الربع القادم', predictedValue: 6500, confidence: 78, companyId },
    ];
  }
}
