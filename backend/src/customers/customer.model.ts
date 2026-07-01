import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Customer extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop({ default: 0 })
  totalPurchases: number;

  @Prop({ default: 0 })
  loyaltyPoints: number;

  @Prop()
  favoriteCategory: string;

  @Prop({ required: true })
  companyId: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
