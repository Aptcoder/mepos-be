import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountDto, CreateAccountTypeDto } from './dto';
import { Account } from './account.schema';
import { AccountType } from './account-type.schema';
import { StoreService } from 'src/store/store.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
    @InjectModel(AccountType.name) private accountTypeModel: Model<AccountType>,
    private readonly storeService: StoreService,
  ) {}

  async createAccountType(
    storeId: string,
    createAccountTypeDto: CreateAccountTypeDto,
  ) {
    const store = await this.storeService.findOne(storeId);
    if (!store) throw new NotFoundException('Invalid Store!');

    return this.accountTypeModel.create({
      store: storeId,
      ...createAccountTypeDto,
    });
  }

  async createAccount(storeId: string, createAccountDto: CreateAccountDto) {
    const store = await this.storeService.findOne(storeId);
    if (!store) throw new NotFoundException('Invalid Store!');

    const accountType = await this.accountTypeModel.findById(
      createAccountDto.accountType,
    );

    if (!accountType) {
      throw new NotFoundException('Account type not found');
    }

    return this.accountModel.create({
      store: storeId,
      ...createAccountDto,
    });
  }

  findAccountTypes(storeId: string) {
    return this.accountTypeModel.find({ store: storeId });
  }

  findAccounts(storeId: string) {
    return this.accountModel.find({ store: storeId });
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
