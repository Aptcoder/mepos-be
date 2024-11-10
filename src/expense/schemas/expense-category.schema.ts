import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Store } from 'src/store/store.schema';

export type ExpenseCategoryDocument = ExpenseCategory & Document;

@Schema({ timestamps: true })
export class ExpenseCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  code: string;

  @Prop({
    required: true,
    ref: 'Store',
    type: mongoose.Schema.Types.ObjectId,
  })
  store: Store;
}

export const ExpenseCategorySchema =
  SchemaFactory.createForClass(ExpenseCategory);
