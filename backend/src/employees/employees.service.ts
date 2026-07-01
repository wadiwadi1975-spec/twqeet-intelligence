import { Injectable } from '@nestjs/common';
import { MockService } from '../mock/mock.service';

@Injectable()
export class EmployeesService {
  constructor(private mockService: MockService) {}

  findAll(companyId: string) {
    return this.mockService.getEmployees(companyId);
  }

  getLeaderboard(companyId: string) {
    return this.mockService.getEmployeeStats(companyId);
  }

  getPerformance(companyId: string, employeeId: string) {
    const stats = this.mockService.getEmployeeStats(companyId);
    return stats.find(e => e._id === employeeId) || null;
  }
}
