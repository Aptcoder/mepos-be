import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';
import { Store } from 'src/store/store.schema';

export type PurchaseDocument = HydratedDocument<Purchase>;

@Schema()
export class Purchase {
  @Prop({
    required: true,
  })
  supplier: string;

  @Prop({
    required: true,
    unique: true,
  })
  referenceNo: string;

  @Prop({
    required: true,
  })
  purchaseDate: string;

  @Prop({
    required: true,
  })
  purchaseStatus: string;

  @Prop({
    required: true,
    ref: 'Product',
    type: mongoose.Schema.Types.ObjectId,
  })
  product: Product;

  @Prop({
    required: true,
  })
  purchaseAmount: string;

  @Prop({
    required: true,
  })
  paymentAmount: string;

  @Prop({
    required: true,
  })
  paymentDate: string;

  @Prop({
    required: true,
  })
  paymentMethod: string;

  @Prop()
  note: string;

  @Prop({
    required: true,
    ref: 'Store',
    type: mongoose.Schema.Types.ObjectId,
  })
  store: Store;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
