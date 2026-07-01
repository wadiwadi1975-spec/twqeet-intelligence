import { Injectable } from '@nestjs/common';
import { MockService } from '../mock/mock.service';

@Injectable()
export class DashboardService {
  constructor(private mockService: MockService) {}

  getSummary(companyId: string) {
    return this.mockService.getDashboardSummary(companyId);
  }

  getHealth(companyId: string) {
    const score = this.mockService.calculateHealthScore(companyId);
    return {
      score,
      classification: score >= 90 ? 'Excellent' : score >= 75 ? 'Very Good' : score >= 60 ? 'Good' : score >= 40 ? 'Needs Attention' : 'Critical',
      breakdown: {
        salesGrowth: 25,
        profitGrowth: 25,
        inventoryTurnover: 20,
        branchPerformance: 10,
        employeePerformance: 10,
        customerSatisfaction: 5,
        criticalAlerts: 5,
      },
    };
  }

  getKPIs(companyId: string) {
    const summary = this.mockService.getDashboardSummary(companyId);
    const categoryStats = this.mockService.getCategoryStats(companyId);
    const employeeStats = this.mockService.getEmployeeStats(companyId);
    const topCategory = categoryStats[0];
    const topEmployee = employeeStats[0];

    return {
      financial: {
        salesToday: summary.totalSales,
        salesThisMonth: summary.totalSales,
        grossProfit: summary.totalProfit,
        profitMargin: summary.profitMargin,
        averageInvoice: summary.avgInvoice,
        revenueGrowth: summary.salesGrowth,
      },
      inventory: {
        value: summary.inventoryValue,
        weight: summary.inventoryWeight,
        turnover: summary.inventoryTurnover,
        deadStockPercent: Math.round((summary.deadStockValue / (summary.inventoryValue || 1)) * 100),
        averageAge: 85,
      },
      executive: {
        healthScore: summary.healthScore,
        salesScore: Math.min(100, Math.round(summary.salesGrowth * 8)),
        profitScore: Math.min(100, Math.round(summary.profitMargin * 6)),
        inventoryScore: Math.min(100, Math.round(summary.inventoryTurnover * 8)),
        growthScore: summary.salesGrowth,
        customerScore: 78,
        employeeScore: 82,
        branchScore: 80,
      },
      topCategory: topCategory ? { name: topCategory.nameAr, sales: topCategory.sales } : null,
      topEmployee: topEmployee ? { name: topEmployee.name, sales: topEmployee.totalSales } : null,
    };
  }

  getTimeline(companyId: string) {
    return [
      { time: '08:00', event: 'ارتفعت المبيعات 12%', type: 'positive', icon: 'trending-up' },
      { time: '09:15', event: 'نفد مخزون السبائك 10 جرام', type: 'warning', icon: 'alert-triangle' },
      { time: '10:30', event: 'أفضل موظف اليوم: أحمد', type: 'positive', icon: 'award' },
      { time: '11:00', event: 'AI يقترح شراء أساور', type: 'info', icon: 'brain' },
      { time: '14:00', event: 'تنبيه: مخزون راكد 18 قطعة', type: 'warning', icon: 'clock' },
      { time: '16:00', event: 'تقرير اليوم: 4,200 د.ك مبيعات', type: 'info', icon: 'file-text' },
    ];
  }
}
