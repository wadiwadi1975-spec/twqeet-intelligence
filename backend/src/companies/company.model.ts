import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Company extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  ownerId: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop({ default: 'basic' })
  subscriptionPlan: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
