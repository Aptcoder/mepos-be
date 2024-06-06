import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Store } from 'src/store/store.schema';

export type UnitDocument = HydratedDocument<Unit>;

@Schema()
export class Unit {
  @Prop()
  name: string;

  @Prop()
  shortName: string;

  @Prop({
    default: false,
  })
  allowDecimal: boolean;

  @Prop({
    required: true,
    ref: 'Store',
    type: mongoose.Schema.Types.ObjectId,
  })
  store: Store;
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
