import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  accountName: string;

  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  bankCode: string;

  @IsString()
  @IsNotEmpty()
  accountType: string;
}

export class CreateAccountTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  parentAccountType: string;
}
