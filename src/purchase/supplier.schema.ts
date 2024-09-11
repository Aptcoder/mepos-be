import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SupplierDocument = HydratedDocument<Supplier>;

@Schema()
export class Supplier {
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

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
