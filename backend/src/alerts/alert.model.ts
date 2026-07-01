import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Alert extends Document {
  @Prop({ required: true })
  message: string;

  @Prop({ required: true, enum: ['Critical', 'High', 'Medium', 'Low'] })
  priority: string;

  @Prop({ required: true })
  companyId: string;

  @Prop({ default: false })
  read: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const AlertSchema = SchemaFactory.createForClass(Alert);
