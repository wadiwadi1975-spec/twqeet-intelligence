import { Injectable } from '@nestjs/common';

@Injectable()
export class CashFlowService {
  private flows = [
    { _id: '1', type: 'income', source: 'مبيعات', amount: 5000, date: '2026-06-25', companyId: '1' },
    { _id: '2', type: 'expense', source: 'مشتريات', amount: 3000, date: '2026-06-26', companyId: '1' },
    { _id: '3', type: 'income', source: 'خدمات', amount: 1000, date: '2026-06-27', companyId: '1' },
    { _id: '4', type: 'expense', source: 'رواتب', amount: 2000, date: '2026-06-28', companyId: '1' },
  ];

  findAll(companyId: string) {
    return this.flows.filter(f => f.companyId === companyId);
  }

  create(data: any) {
    return { _id: String(Date.now()), ...data, date: new Date() };
  }

  getSummary(companyId: string) {
    const flows = this.findAll(companyId);
    const income = flows.filter(f => f.type === 'income').reduce((sum, f) => sum + f.amount, 0);
    const expense = flows.filter(f => f.type === 'expense').reduce((sum, f) => sum + f.amount, 0);
    return { income, expense, netCashFlow: income - expense };
  }
}
