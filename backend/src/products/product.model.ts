import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  purity: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  branchId: string;

  @Prop({ required: true })
  companyId: string;

  @Prop({ default: 0 })
  quantity: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
