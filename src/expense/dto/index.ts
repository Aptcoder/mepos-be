import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ExpenseStatus } from '../schemas/expense.schema';
import { PaymentMethod } from 'src/transaction/transaction.schema';

export class CreateExpenseDto {
  @IsDateString()
  @IsNotEmpty()
  expenseDate: string;

  @IsString()
  @IsNotEmpty()
  referenceNo: string;

  @IsString()
  @IsOptional()
  contact: string;

  @IsEnum(ExpenseStatus)
  @IsNotEmpty()
  expenseStatus: ExpenseStatus;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @IsString()
  @IsNotEmpty()
  note: string;

  @IsString()
  @IsNotEmpty()
  expenseCategory: string;
}

export class CreateExpenseCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
