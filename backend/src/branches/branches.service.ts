import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Branch } from './branch.model';

@Injectable()
export class BranchesService {
  constructor(
    @InjectModel(Branch.name) private branchModel: Model<Branch>,
  ) {}

  async findAll(companyId: string) {
    return this.branchModel.find({ companyId }).exec();
  }

  async findById(id: string) {
    return this.branchModel.findById(id).exec();
  }

  async create(data: Partial<Branch>) {
    const branch = new this.branchModel(data);
    return branch.save();
  }

  async update(id: string, data: Partial<Branch>) {
    return this.branchModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string) {
    return this.branchModel.findByIdAndDelete(id).exec();
  }
}
