import { Injectable } from '@nestjs/common';
import { MockService } from '../mock/mock.service';

@Injectable()
export class SalesService {
  constructor(private mockService: MockService) {}

  findAll(companyId: string) {
    return this.mockService.getSales(companyId);
  }

  findDaily(companyId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.mockService.getSales(companyId).filter(s => new Date(s.date) >= today);
  }

  findMonthly(companyId: string) {
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    return this.mockService.getSales(companyId).filter(s => new Date(s.date) >= start);
  }

  getStats(companyId: string) {
    return this.mockService.getSalesStats(companyId);
  }

  create(data: any) {
    return { _id: String(Date.now()), ...data, date: new Date() };
  }
}
