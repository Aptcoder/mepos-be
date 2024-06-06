import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  sku: string;

  @IsNotEmpty()
  unit: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  warranty: string;

  @IsOptional()
  alertQuantity: string;

  @IsNotEmpty()
  companyName: string;

  @IsOptional()
  distributorName: string;

  @IsNotEmpty()
  supplierName: string;

  @IsNotEmpty()
  contactInformation: string;

  @IsNotEmpty()
  unitPurchasePrice: string;

  @IsNotEmpty()
  sellingPrice: string;

  @IsOptional()
  includeTax: string;
}
