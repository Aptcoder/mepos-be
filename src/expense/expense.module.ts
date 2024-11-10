import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { Expense } from './schemas/expense.schema';
import { ExpenseSchema } from './schemas/expense.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseCategorySchema } from './schemas/expense-category.schema';
import { ExpenseCategory } from './schemas/expense-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Expense.name, schema: ExpenseSchema },
      { name: ExpenseCategory.name, schema: ExpenseCategorySchema },
    ]),
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
