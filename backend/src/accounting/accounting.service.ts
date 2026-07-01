import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountingService {
  private entries = [
    { _id: '1', type: 'revenue', account: 'المبيعات', amount: 5000, date: '2026-06-25', companyId: '1' },
    { _id: '2', type: 'expense', account: 'المشتريات', amount: 3000, date: '2026-06-26', companyId: '1' },
    { _id: '3', type: 'revenue', account: 'خدمات', amount: 1000, date: '2026-06-27', companyId: '1' },
    { _id: '4', type: 'expense', account: 'رواتب', amount: 2000, date: '2026-06-28', companyId: '1' },
  ];

  findAll(companyId: string) {
    return this.entries.filter(e => e.companyId === companyId);
  }

  create(data: any) {
    return { _id: String(Date.now()), ...data, date: new Date() };
  }

  getSummary(companyId: string) {
    const entries = this.findAll(companyId);
    const revenue = entries.filter(e => e.type === 'revenue').reduce((sum, e) => sum + e.amount, 0);
    const expenses = entries.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
    return { revenue, expenses, netProfit: revenue - expenses };
  }
}
