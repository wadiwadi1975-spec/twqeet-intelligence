import { Injectable } from '@nestjs/common';
import { MockService } from '../mock/mock.service';

@Injectable()
export class SuppliersService {
  constructor(private mockService: MockService) {}

  findAll(companyId: string) {
    return this.mockService.getSuppliers(companyId);
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
