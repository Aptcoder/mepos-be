import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseCategoryDto, CreateExpenseDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './entities/expense.entity';
import { Model } from 'mongoose';
import { ExpenseCategory } from './schemas/expense-category.schema';
import { StoreService } from 'src/store/store.service';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
    @InjectModel(ExpenseCategory.name)
    private expenseCategoryModel: Model<ExpenseCategory>,
    private readonly storeService: StoreService,
  ) {}

  async createCategory(
    storeId: string,
    createExpenseCategoryDto: CreateExpenseCategoryDto,
  ) {
    const store = await this.storeService.findOne(storeId);
    if (!store) throw new NotFoundException('Invalid Store!');

    return this.expenseCategoryModel.create({
      ...createExpenseCategoryDto,
      store: storeId,
    });
  }

  async createExpense(storeId: string, createExpenseDto: CreateExpenseDto) {
    const store = await this.storeService.findOne(storeId);
    if (!store) throw new NotFoundException('Invalid Store!');

    return this.expenseModel.create({
      ...createExpenseDto,
      store: storeId,
    });
  }

  findAllCategories(storeId: string) {
    return this.expenseCategoryModel.find({ store: storeId });
  }

  findOneCategory(storeId: string, id: string) {
    return this.expenseCategoryModel.findById(id);
  }

  findOneExpense(storeId: string, id: string) {
    return this.expenseModel.findById(id);
  }

  findAllExpenses(storeId: string) {
    return this.expenseModel.find({ store: storeId });
  }
}
