import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
  @Prop()
  permissions: string[];

  @Prop({
    unique: true,
    lowercase: true,
  })
  name: string;

  @Prop({
    default: true,
  })
  isDefault: boolean;

  @Prop({
    required: false,
  })
  description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
