import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(companyId: string) {
    return this.productModel.find({ companyId }).exec();
  }

  async findById(id: string) {
    return this.productModel.findById(id).exec();
  }

  async create(data: Partial<Product>) {
    const product = new this.productModel(data);
    return product.save();
  }

  async update(id: string, data: Partial<Product>) {
    return this.productModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
