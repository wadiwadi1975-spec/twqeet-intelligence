import { Injectable } from '@nestjs/common';
import { MockService } from '../mock/mock.service';

@Injectable()
export class AlertsService {
  constructor(private mockService: MockService) {}

  findAll(companyId: string) {
    return this.mockService.getAlerts(companyId);
  }

  create(message: string, priority: string, companyId: string) {
    return { _id: String(Date.now()), message, priority, companyId, read: false, createdAt: new Date() };
  }

  markAsRead(id: string) {
    return { _id: id, read: true };
  }

  delete(id: string) {
    return { deleted: true };
  }
}
