import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Unit } from '../unit/unit.schema';
import { Category } from '../category/category.schema';
import { Store } from 'src/store/store.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  sku: string;

  @Prop({
    ref: 'Unit',
    type: mongoose.Schema.Types.ObjectId,
  })
  unit: Unit;

  @Prop({
    ref: 'Category',
    type: mongoose.Schema.Types.ObjectId,
  })
  category: Category;

  @Prop()
  warranty: string;

  @Prop()
  alertQuantity: string;

  @Prop()
  companyName: string;

  @Prop()
  distributorName: string;

  @Prop()
  supplierName: string;

  @Prop()
  contactInformation: string;

  @Prop()
  unitPurchasePrice: string;

  @Prop()
  sellingPrice: string;

  @Prop()
  includeTax: string;

  @Prop({
    required: true,
    ref: 'Store',
    type: mongoose.Schema.Types.ObjectId,
  })
  store: Store;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
