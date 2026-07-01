import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Branch extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  companyId: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop({ default: 0 })
  employeeCount: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);
