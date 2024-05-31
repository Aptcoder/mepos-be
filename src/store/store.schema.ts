import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StoreDocument = HydratedDocument<Store>;

@Schema()
export class Store {
  @Prop()
  location: string;

  @Prop()
  name: string;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
