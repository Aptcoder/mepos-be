import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseCategoryDto, CreateExpenseDto } from './dto';
import { HttpResponseHelper } from 'src/common/helper/http-response.helper';

@Controller('/:storeId/expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async createExpense(
    @Param('storeId') storeId: string,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    const data = await this.expenseService.createExpense(
      storeId,
      createExpenseDto,
    );
    return HttpResponseHelper.send('Expense created', data);
  }

  @Post('/categories')
  async createExpenseCategory(
    @Param('storeId') storeId: string,
    @Body() createExpenseCategoryDto: CreateExpenseCategoryDto,
  ) {
    const data = await this.expenseService.createCategory(
      storeId,
      createExpenseCategoryDto,
    );
    return HttpResponseHelper.send('Expense category created', data);
  }

  @Get()
  async findAllExpenses(@Param('storeId') storeId: string) {
    const data = await this.expenseService.findAllExpenses(storeId);
    return HttpResponseHelper.send('Expenses', data);
  }

  @Get('/categories')
  async findAllExpenseCategories(@Param('storeId') storeId: string) {
    const data = await this.expenseService.findAllCategories(storeId);
    return HttpResponseHelper.send('Expense categories', data);
  }

  @Get(':id')
  async findOneExpense(
    @Param('storeId') storeId: string,
    @Param('id') id: string,
  ) {
    const data = await this.expenseService.findOneExpense(storeId, id);
    return HttpResponseHelper.send('Expense', data);
  }
}
