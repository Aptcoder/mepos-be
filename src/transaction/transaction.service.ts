import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateTransactionDto,
  TransactionItems,
} from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionStatus } from './transaction.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/product/schemas/product.schema';
import { FindTransactionDto } from './dto/find-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(storeId: string, createTransactionDto: CreateTransactionDto) {
    const transactionItems = await this.populateTransactionItems(
      createTransactionDto.transactionItems,
    );
    let amount = 0;
    transactionItems.forEach((i) => {
      amount += i.amount;
    });
    const invoiceId = this.generateInvoiceId();
        
    return this.transactionModel.create({
      invoiceId,
      amount,
      store: storeId,
      ...createTransactionDto,
      transactionItems,
    });
  }

  generateInvoiceId(): number {
    return Math.floor(10000000 + Math.random() * 90000000);
  }

  async populateTransactionItems(transactionItems: TransactionItems[]) {
    const productIds = transactionItems.map((t) => t.product);
    const products = await this.productModel.find({ _id: productIds });
    const productIdsToProduct = {};
    for (let i = 0; i < products.length; i++) {
      let p = products[i];
      productIdsToProduct[p.id] = p;
    }

    const transactionItemsNew = transactionItems.map((item) => {
      let product: Product = productIdsToProduct[item.product];
      return {
        product: item.product,
        quantity: item.quantity,
        amount: Number(product.sellingPrice) * item.quantity,
      };
    });

    return transactionItemsNew;
  }

  findAll(storeId?: string, q?: FindTransactionDto) {
    let query = q;
    if (storeId) {
      query['store'] = storeId;
    }
    return this.transactionModel.find(query);
  }

  async findOne(id: string) {
    const transaction = await this.transactionModel.findById(id).populate({
      path: 'transactionItems',
      populate: {
        path: 'product',
        model: 'Product',
      },
    });
    if (!transaction) {
      throw new NotFoundException('Transation not found');
    }
    return transaction;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionModel.findById(id);
    if (!transaction || transaction.status != TransactionStatus.SUSPENDED) {
      throw new BadRequestException(
        'Transaction to update must be a suspended one',
      );
    }
    const transactionItems = await this.populateTransactionItems(
      updateTransactionDto.transactionItems,
    );
    let amount = 0;
    transactionItems.forEach((i) => {
      amount += i.amount;
    });
    await this.transactionModel.updateOne(
      {
        _id: transaction._id,
      },
      {
        transactionItems,
        amount,
        status: updateTransactionDto.status,
      },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
