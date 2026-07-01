import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CashFlow extends Document {
  @Prop({ required: true, enum: ['income', 'expense'] })
  type: string;

  @Prop({ required: true })
  source: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  description: string;

  @Prop({ required: true })
  companyId: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const CashFlowSchema = SchemaFactory.createForClass(CashFlow);
