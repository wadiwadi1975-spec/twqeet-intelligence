import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Recommendation extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true, enum: ['Critical', 'High', 'Medium', 'Low'] })
  priority: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  companyId: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const RecommendationSchema = SchemaFactory.createForClass(Recommendation);
