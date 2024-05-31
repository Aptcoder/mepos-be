import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from 'src/role/role.schema';
import { Store } from 'src/store/store.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  password: string;

  @Prop({
    lowercase: true,
  })
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({
    default: false,
  })
  userCanLogin: boolean;

  @Prop({
    required: true,
    ref: 'Store',
    type: mongoose.Schema.Types.ObjectId,
  })
  store: Store;

  @Prop({
    lowercase: true,
  })
  username: string;

  @Prop({
    required: true,
    ref: 'Role',
    type: mongoose.Schema.Types.ObjectId,
  })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
