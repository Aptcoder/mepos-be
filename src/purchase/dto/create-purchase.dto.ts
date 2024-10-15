import { IsNotEmpty, IsEmail, IsEnum, ValidateIf } from "class-validator";

export class CreatePurchaseDto {
    @IsNotEmpty()
    supplier: string;

    @IsNotEmpty()
    referenceNo:string;

    @IsNotEmpty()
    purchaseDate: string;

    @IsNotEmpty()
    purchaseStatus: string;
    
    @IsNotEmpty() 
    purchaseAmount: string;
    
    @IsNotEmpty()
    paymentAmount: string;
    
    @IsNotEmpty()  
    paymentDate: string;
    
    @IsNotEmpty() 
    paymentMethod: string;
    
    note?: string;
}
