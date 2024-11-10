import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto, CreateAccountTypeDto } from './dto';
import { HttpResponseHelper } from 'src/common/helper/http-response.helper';

@Controller('/:storeId/accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async create(
    @Param('storeId') storeId: string,
    @Body() createAccountDto: CreateAccountDto,
  ) {
    const data = await this.accountService.createAccount(
      storeId,
      createAccountDto,
    );
    return HttpResponseHelper.send('Account created', data);
  }

  @Post('types')
  async createAccountTypes(
    @Param('storeId') storeId: string,
    @Body() createAccountTypeDto: CreateAccountTypeDto,
  ) {
    const data = await this.accountService.createAccountType(
      storeId,
      createAccountTypeDto,
    );
    return HttpResponseHelper.send('Account type created', data);
  }

  @Get('types')
  async findAccountTypes(@Param('storeId') storeId: string) {
    const data = await this.accountService.findAccountTypes(storeId);
    return HttpResponseHelper.send('Account types', data);
  }

  @Get()
  async findAll(@Param('storeId') storeId: string) {
    const data = await this.accountService.findAccounts(storeId);
    return HttpResponseHelper.send('Accounts', data);
  }

  // @Get(':id')
  // async findOne(@Param('storeId') storeId: string, @Param('id') id: string) {
  //   const data = await this.accountService.findOne(storeId, id);
  //   return HttpResponseHelper.send('Account', data);
  // }

  // @Patch(':id')
  // async update(
  //   @Param('storeId') storeId: string,
  //   @Param('id') id: string,
  //   @Body() updateAccountDto: UpdateAccountDto,
  // ) {
  //   await this.accountService.update(storeId, id, updateAccountDto);
  //   return HttpResponseHelper.send('Account updated', {});
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
}
