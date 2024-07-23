import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { PaymentMethod, TransactionStatus } from '../transaction.schema';

export class CreateTransactionDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TransactionItems)
  transactionItems: TransactionItems[];

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsEnum(TransactionStatus)
  status: TransactionStatus;
}

export class TransactionItems {
  @IsNotEmpty()
  product: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;
}
