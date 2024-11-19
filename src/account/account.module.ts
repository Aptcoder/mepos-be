import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Account, AccountSchema } from './account.schema';
import { AccountType, AccountTypeSchema } from './account-type.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: AccountType.name, schema: AccountTypeSchema },
    ]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
