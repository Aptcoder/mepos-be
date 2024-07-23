import { Type } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { PaymentMethod, TransactionStatus } from '../transaction.schema';

export class FindTransactionDto {
  @IsOptional()
  @IsEnum(TransactionStatus)
  status: TransactionStatus;
}
