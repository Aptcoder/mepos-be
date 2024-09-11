import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
}

export const AccountSchema = SchemaFactory.createForClass(Account);
