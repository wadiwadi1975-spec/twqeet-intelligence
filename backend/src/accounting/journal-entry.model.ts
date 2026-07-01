import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class JournalEntry extends Document {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  account: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  description: string;

  @Prop({ required: true })
  companyId: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const JournalEntrySchema = SchemaFactory.createForClass(JournalEntry);
