import { Injectable } from '@nestjs/common';
import { MockService } from '../mock/mock.service';

@Injectable()
export class CustomersService {
  constructor(private mockService: MockService) {}

  findAll(companyId: string) {
    return this.mockService.getCustomers(companyId);
  }

  getTopCustomers(companyId: string, limit: number = 10) {
    return this.mockService.getCustomers(companyId)
      .sort((a, b) => b.totalPurchases - a.totalPurchases)
      .slice(0, limit);
  }

  create(data: any) {
    return { _id: String(Date.now()), ...data };
  }

  update(id: string, data: any) {
    return { _id: id, ...data, updated: true };
  }

  delete(id: string) {
    return { deleted: true };
  }
}
