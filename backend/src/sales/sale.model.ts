import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Sale extends Document {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  employeeId: string;

  @Prop({ required: true })
  branchId: string;

  @Prop({ required: true })
  companyId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  unitPrice: number;

  @Prop()
  customerName: string;

  @Prop()
  customerId: string;

  @Prop({ default: 'paid', enum: ['paid', 'pending', 'partial', 'cancelled'] })
  status: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
