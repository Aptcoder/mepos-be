import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from 'src/role/role.schema';
import { Store } from 'src/store/store.schema';

export type UserDocument = HydratedDocument<User>;

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum RelationshipStatus {
  SINGLE = 'single',
  MARRIED = 'married',
  IN_RELATIONSHIP = 'in_relationship',
}
@Schema({
  autoIndex: true,
})
export class User {
  @Prop({
    select: false,
  })
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

  @Prop()
  code: number;

  @Prop()
  passwordToken: string;

  @Prop()
  passwordTokenExpirationDate: Date;

  @Prop({
    default: UserGender.MALE,
    type: String,
    enum: UserGender,
  })
  gender: UserGender;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  ninNumber: string;

  @Prop({
    default: RelationshipStatus.SINGLE,
    type: String,
    enum: RelationshipStatus,
  })
  relationshipStatus: RelationshipStatus;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1, store: 1 }, { unique: true });
UserSchema.index({ username: 1, store: 1 }, { unique: true });
