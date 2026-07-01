import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from './company.model';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  async findAll() {
    return this.companyModel.find().exec();
  }

  async findById(id: string) {
    return this.companyModel.findById(id).exec();
  }

  async create(data: Partial<Company>) {
    const company = new this.companyModel(data);
    return company.save();
  }

  async update(id: string, data: Partial<Company>) {
    return this.companyModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string) {
    return this.companyModel.findByIdAndDelete(id).exec();
  }
}
