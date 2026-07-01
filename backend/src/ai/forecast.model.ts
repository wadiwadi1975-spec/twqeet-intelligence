import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Forecast extends Document {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  period: string;

  @Prop({ required: true })
  predictedValue: number;

  @Prop()
  confidence: number;

  @Prop({ required: true })
  companyId: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ForecastSchema = SchemaFactory.createForClass(Forecast);
