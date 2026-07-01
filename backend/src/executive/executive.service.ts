import { Injectable } from '@nestjs/common';
import { MockService } from '../mock/mock.service';

@Injectable()
export class ExecutiveService {
  constructor(private mockService: MockService) {}

  getBrief(companyId: string) {
    return this.mockService.getExecutiveBrief(companyId);
  }

  getDecisions(companyId: string) {
    return [
      { _id: '1', decision: 'زيادة شراء الأساور بنسبة 20%', priority: 'Critical', expectedProfit: '+12% مبيعات', risk: 'منخفض', confidence: 92, score: 94 },
      { _id: '2', decision: 'تصفية 37 قطعة راكدة', priority: 'Critical', expectedProfit: '+8% سيولة', risk: 'منخفض', confidence: 88, score: 90 },
      { _id: '3', decision: 'نقل 15 سبيكة إلى فرع الرياض', priority: 'Medium', expectedProfit: '+5% دوران مخزون', risk: 'متوسط', confidence: 75, score: 78 },
      { _id: '4', decision: 'تدريب موظفي فرع الأحمدي', priority: 'Low', expectedProfit: '+4% مبيعات', risk: 'منخفض', confidence: 70, score: 72 },
      { _id: '5', decision: 'تعديل أسعار الخواتم 3%', priority: 'Medium', expectedProfit: '+3% ربح', risk: 'متوسط', confidence: 80, score: 76 },
    ];
  }

  getRadar(companyId: string) {
    const summary = this.mockService.getDashboardSummary(companyId);
    return {
      labels: ['المبيعات', 'الأرباح', 'المخزون', 'العملاء', 'الموظفين', 'النمو'],
      values: [
        Math.min(100, Math.round(summary.salesGrowth * 8)),
        Math.min(100, Math.round(summary.profitMargin * 6)),
        Math.min(100, Math.round(summary.inventoryTurnover * 8)),
        78,
        82,
        summary.salesGrowth,
      ],
    };
  }

  getOpportunities(companyId: string) {
    const categoryStats = this.mockService.getCategoryStats(companyId);
    return categoryStats.map(cat => ({
      category: cat.nameAr,
      opportunityScore: cat.opportunityScore,
      salesGrowth: cat.growth,
      profitMargin: cat.profitMargin,
      turnoverRate: cat.turnoverRate,
      recommendation: cat.opportunityScore > 80 ? 'استثمار عالي' : cat.opportunityScore > 60 ? 'استثمار متوسط' : 'تجنب',
    })).sort((a, b) => b.opportunityScore - a.opportunityScore);
  }

  getHeatMap(companyId: string) {
    const branches = this.mockService.getBranches(companyId);
    return branches.map(b => ({
      name: b.branchName,
      score: 60 + Math.floor(Math.random() * 35),
      status: Math.random() > 0.3 ? 'Good' : 'Warning',
    }));
  }

  getSmartBenchmark(companyId: string) {
    return {
      vsLastMonth: { sales: '+12%', profit: '+8%', inventory: '-5%' },
      vsLastYear: { sales: '+25%', profit: '+18%', inventory: '+10%' },
      vsTarget: { sales: '92%', profit: '88%', inventory: '95%' },
    };
  }

  getMonthlyReview(companyId: string) {
    return {
      month: new Date().toLocaleDateString('ar-KW', { month: 'long', year: 'numeric' }),
      bestDecision: 'زيادة شراء الأساور',
      worstDecision: 'تأخير تصفية الأطقم',
      topBranch: 'فرع السالمية',
      topEmployee: 'أحمد',
      topCategory: 'الأساور',
      biggestProblem: 'مخزون راكد 37 قطعة',
      biggestOpportunity: 'زيادة مخزون السبائك قبل ارتفاع السعر',
      summary: 'الشهر كان إيجابياً بشكل عام. المبيعات ارتفعت 12% والربح 8%. لكن المخزون الراكد يزداد وحاجة لمراجعة.',
    };
  }

  getMorningReport(companyId: string) {
    return {
      date: new Date().toLocaleDateString('ar-KW'),
      greeting: 'صباح الخير',
      companyStatus: 'جيد',
      salesChange: '+9%',
      profitChange: '-3%',
      topBranch: 'فرع السالمية',
      worstBranch: 'فرع الأحمدي',
      topCategory: 'الأساور',
      deadStock: 18,
      topRisk: 'مخزون الأطقم الراكد',
      topOpportunity: 'شراء سبائك ذهب قبل ارتفاع السعر',
      todayDecision: 'طلبت 50 جرام سبائك',
    };
  }

  getBudgetAllocation(companyId: string) {
    return [
      { category: 'شراء أساور', percentage: 40, amount: 24000 },
      { category: 'شراء سبائك', percentage: 25, amount: 15000 },
      { category: 'شراء خواتم', percentage: 20, amount: 12000 },
      { category: 'احتياطي', percentage: 15, amount: 9000 },
    ];
  }
}
