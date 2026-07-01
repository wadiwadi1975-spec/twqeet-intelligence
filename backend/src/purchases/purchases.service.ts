import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Purchase } from './purchase.model';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectModel(Purchase.name) private purchaseModel: Model<Purchase>,
  ) {}

  async findAll(companyId: string) {
    return this.purchaseModel.find({ companyId }).sort({ createdAt: -1 }).exec();
  }

  async create(data: Partial<Purchase>) {
    const purchase = new this.purchaseModel(data);
    return purchase.save();
  }

  async updateStatus(id: string, status: string) {
    return this.purchaseModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  async delete(id: string) {
    return this.purchaseModel.findByIdAndDelete(id).exec();
  }
}
