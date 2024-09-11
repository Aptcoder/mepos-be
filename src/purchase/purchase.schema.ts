import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PurchaseDocument = HydratedDocument<Purchase>;

@Schema()
export class Purchase {
  @Prop()
  permissions: string[];

  @Prop({
    required: true,
    unique: true,
  })
  referenceNo: string;

  @Prop({
    default: true,
  })
  isDefault: boolean;

  @Prop({
    required: false,
  })
  description: string;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
