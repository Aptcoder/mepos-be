import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Unit } from '../unit/unit.schema';
import { Category } from '../category/category.schema';
import { Store } from 'src/store/store.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  sku: string;

  @Prop({
    ref: 'Unit',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  unit: Unit;

  @Prop({
    ref: 'Category',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  category: Category;

  @Prop()
  warranty: string;

  @Prop()
  alertQuantity: string;

  @Prop({
    required: true,
  })
  companyName: string;

  @Prop()
  distributorName: string;

  @Prop()
  supplierName: string;

  @Prop()
  contactInformation: string;

  @Prop({
    required: true,
  })
  unitPurchasePrice: string;

  @Prop({
    required: true,
  })
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
