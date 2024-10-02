import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Store } from "src/store/store.schema";
import { UserGender } from "src/user/user.schema";

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({
    timestamps: true,
})
export class Customer {
    @Prop({
        required: true,
    })
    firstName: string;

    @Prop({
        required: true,
    })
    lastName: string;

    @Prop({
        required: true,
    })
    email: string;

    @Prop({
        required: true,
    })
    phoneNumber: string;

    @Prop({
        required: true,
        type: String,
        enum: UserGender
    })
    gender: string;

    @Prop({
        required: true,
    })
    membershipStatus: string;    

    @Prop({
        required: true,
        unique: true
    })
    customerId: number;
    
    @Prop({
        required: true,
        ref: 'Store',
        type: mongoose.Schema.Types.ObjectId,
    })
    store: Store;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer)