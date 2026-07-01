import { Injectable } from '@nestjs/common';
import { MockService } from '../mock/mock.service';

@Injectable()
export class CategoriesService {
  constructor(private mockService: MockService) {}

  findAll(companyId: string) {
    return this.mockService.getCategories(companyId);
  }

  getIntelligence(companyId: string) {
    return this.mockService.getCategoryStats(companyId);
  }
}
