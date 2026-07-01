import { Injectable } from '@nestjs/common';
import { MockService } from '../mock/mock.service';

@Injectable()
export class InventoryService {
  constructor(private mockService: MockService) {}

  findAll(companyId: string) {
    return this.mockService.getInventory(companyId);
  }

  findAging(companyId: string) {
    return this.mockService.getInventory(companyId).sort((a, b) => a.quantity - b.quantity);
  }

  findLowStock(companyId: string) {
    return this.mockService.getInventory(companyId).filter(i => i.quantity <= i.minStock);
  }

  getStats(companyId: string) {
    return this.mockService.getInventoryStats(companyId);
  }

  create(data: any) {
    return { _id: String(Date.now()), ...data };
  }

  updateQuantity(id: string, quantity: number) {
    return { _id: id, quantity, updated: true };
  }
}
