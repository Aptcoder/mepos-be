import { IsNotEmpty, IsEmail, IsEnum, ValidateIf } from "class-validator";
import { UserGender } from "src/user/user.schema";

export class CreateCustomerDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    phoneNumber: string;

    @IsEnum(UserGender)
    gender: UserGender;

    @IsNotEmpty()
    membershipStatus: string;    

    @ValidateIf((object, value) => value !== undefined)
    @IsNotEmpty()
    customersID?: string;
}