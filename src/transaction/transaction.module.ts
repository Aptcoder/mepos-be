import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './transaction.schema';
import { Product, ProductSchema } from 'src/product/schemas/product.schema';
import { TranslationModule } from 'src/translation/translation.module';
import { TranslationService } from 'src/translation/translation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
    TranslationModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService, TranslationService],
})
export class TransactionModule {}
