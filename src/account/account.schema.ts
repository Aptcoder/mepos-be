import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Store } from 'src/store/store.schema';
import { AccountType } from './account-type.schema';

export type Document = HydratedDocument<Account>;

@Schema()
export class Account {
  @Prop()
  accountName: string;

  @Prop()
  accountNumber: string;

  @Prop({})
  bankName: string;

  @Prop({})
  bankCode: string;

  @Prop({
    ref: 'AccountType',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  accountType: AccountType;

  @Prop({
    required: true,
    ref: 'Store',
    type: mongoose.Schema.Types.ObjectId,
  })
  store: Store;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
