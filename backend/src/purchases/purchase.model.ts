import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Purchase extends Document {
  @Prop({ required: true })
  supplierId: string;

  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  totalCost: number;

  @Prop({ required: true, enum: ['pending', 'shipped', 'received', 'cancelled'] })
  status: string;

  @Prop({ required: true })
  branchId: string;

  @Prop({ required: true })
  companyId: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
