import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Store } from 'src/store/store.schema';

export type Document = HydratedDocument<AccountType>;

@Schema()
export class AccountType {
  @Prop()
  name: string;

  @Prop({
    ref: 'AccountType',
    type: mongoose.Schema.Types.ObjectId,
  })
  parentAccountType: AccountType;

  @Prop({
    required: true,
    ref: 'Store',
    type: mongoose.Schema.Types.ObjectId,
  })
  store: Store;
}

export const AccountTypeSchema = SchemaFactory.createForClass(AccountType);
