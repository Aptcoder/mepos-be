import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';
import { Store } from 'src/store/store.schema';
import { User } from 'src/user/user.schema';

export type TransactionDocument = HydratedDocument<Transaction>;

export enum PaymentMethod {
  CASH = 'cash',
  POS = 'pos',
  BANK_TRANSFER = 'bank_transfer',
}

export enum TransactionStatus {
  COMPLETED = 'completed',
  SUSPENDED = 'suspended',
}

@Schema()
class TransactionItems {
  @Prop({
    ref: 'Product',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  product: Product;

  @Prop({
    required: true,
  })
  quantity: number;

  @Prop({
    required: true,
  })
  amount: number;
}

@Schema({
  timestamps: true,
})
export class Transaction {
  @Prop({
    required: true,
  })
  invoiceId: Number;

  @Prop({
    required: true,
  })
  amount: number;

  @Prop({
    required: true,
    type: String,
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod;

  @Prop({
    required: true,
    type: String,
    enum: TransactionStatus,
  })
  status: TransactionStatus;

  @Prop({
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  })
  addedBy: User;

  @Prop({
    required: true,
    ref: 'Store',
    type: mongoose.Schema.Types.ObjectId,
  })
  store: Store;

  @Prop({
    type: Array<TransactionItems>,
    required: true,
  })
  transactionItems: TransactionItems[];
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
