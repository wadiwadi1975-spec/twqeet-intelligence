import { Injectable } from '@nestjs/common';
import { MockService } from '../mock/mock.service';

@Injectable()
export class BudgetService {
  constructor(private mockService: MockService) {}

  findAll(companyId: string) {
    return this.mockService.getBudgets(companyId);
  }

  findOne(id: string) {
    return this.mockService.getBudgetById(id);
  }

  create(data: any) {
    return this.mockService.createBudget(data);
  }

  update(id: string, data: any) {
    return this.mockService.updateBudget(id, data);
  }

  delete(id: string) {
    return this.mockService.deleteBudget(id);
  }

  getSummary(companyId: string) {
    return this.mockService.getBudgetSummary(companyId);
  }
}
