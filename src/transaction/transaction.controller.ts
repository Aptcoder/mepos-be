import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { HttpResponseHelper } from 'src/common/helper/http-response.helper';
import { FindTransactionDto } from './dto/find-transaction.dto';
import { Response } from 'express';
import { TranslationService } from 'src/translation/translation.service';

@Controller('/:storeId/transactions')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly translationService: TranslationService,
  ) {}

  @Post()
  async create(
    @Param('storeId') storeId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    const transaction = await this.transactionService.create(
      storeId,
      createTransactionDto,
    );
    return HttpResponseHelper.send('Transaction created', transaction);
  }

  @Get()
  async findAll(
    @Param('storeId') storeId: string,
    @Query() query: FindTransactionDto,
  ) {
    const transactions = await this.transactionService.findAll(storeId, query);
    return HttpResponseHelper.send('Transactions', transactions);
  }

  @Get('/:id/receipt')
  async getReceipt(@Param('id') id: string, @Res() res: Response) {
    // return this.transactionService.findOne(+id);
    const transaction = await this.transactionService.findOne(id);
    const products = transaction.transactionItems.map((item) => {
      return {
        name: item.product.name,
        quantity: item.quantity,
        amount: item.amount,
        product_price: item.product.sellingPrice,
      };
    });
    return res.render('receipt', {
      transaction_id: transaction.id,
      date: new Date().toISOString(),
      products,
      payment_method: transaction.paymentMethod.toUpperCase(),
      transaction_total: transaction.amount,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('lang') lang?: string) {
    const transaction = await this.transactionService.findOne(id);

    if (lang) {
      const dataTranslation =
        await this.translationService.translateKeysAndValues(
          transaction.toJSON(),
          lang,
        );

      return HttpResponseHelper.send('Transaction', dataTranslation);
    }
    return HttpResponseHelper.send('Transaction', transaction);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    await this.transactionService.update(id, updateTransactionDto);
    return HttpResponseHelper.send('Transaction updated', {});
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
