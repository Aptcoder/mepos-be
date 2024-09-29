import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Store } from "src/store/store.schema";
import { UserGender } from "src/user/user.schema";

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({
    timestamps: true,
})
export class Customer {
    @Prop({})
    firstName: string;

    @Prop({})
    lastName: string;

    @Prop({})
    email: string;

    @Prop({})
    phoneNumber: string;

    @Prop({
        type: String,
        enum: UserGender
    })
    gender: string;

    @Prop({})
    membershipStatus: string;    

    @Prop({})
    customersID: string;
    
    @Prop({
        required: true,
        ref: 'Store',
        type: mongoose.Schema.Types.ObjectId,
    })
    store: Store;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer)