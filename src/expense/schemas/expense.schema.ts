import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ExpenseCategory } from './expense-category.schema';
import { Account } from 'src/account/account.schema';
import { PaymentMethod } from 'src/transaction/transaction.schema';
import { Store } from 'src/store/store.schema';

export type ExpenseDocument = HydratedDocument<Expense>;
export enum ExpenseStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}
@Schema()
export class Expense {
  @Prop({
    required: true,
    ref: 'ExpenseCategory',
    type: mongoose.Schema.Types.ObjectId,
  })
  expenseCategory: ExpenseCategory;

  @Prop({ required: true })
  referenceNo: string;

  @Prop({ required: true, type: Date })
  expenseDate: Date;

  //   @Prop({ required: true })
  //   expenseFor: string;

  @Prop()
  contact: string;

  @Prop({
    required: true,
    enum: ExpenseStatus,
    default: ExpenseStatus.PAID,
  })
  expenseStatus: string;

  @Prop({ required: true, type: Number })
  totalAmount: number;

  @Prop({ ref: 'Account', type: mongoose.Schema.Types.ObjectId })
  paymentAccount: Account;

  @Prop({ type: Date })
  paymentDate: Date;

  @Prop({
    enum: PaymentMethod,
    required: true,
  })
  paymentMethod: PaymentMethod;

  @Prop()
  note: string;

  @Prop({
    required: true,
    ref: 'Store',
    type: mongoose.Schema.Types.ObjectId,
  })
  store: Store;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
