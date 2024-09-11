import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type Document = HydratedDocument<AccountType>;

@Schema()
export class AccountType {
  @Prop()
  name: string;

  @Prop()
  accountNumber: string;

  @Prop({})
  bankName: string;

  @Prop({})
  bankCode: string;
}

export const AccountSchema = SchemaFactory.createForClass(AccountType);
