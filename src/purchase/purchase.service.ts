import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Purchase } from './schemas/purchase.schema';
import { Model } from 'mongoose';
import { ProductService } from 'src/product/product.service';
import { StoreService } from 'src/store/store.service';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel(Purchase.name) private purchaseModel: Model<Purchase>,
    private readonly productService: ProductService,
    private readonly storeService: StoreService
  ) {}
  
  async create(storeId: string, createPurchaseDto: CreatePurchaseDto, productFileJSON: any[]) {
    const store = await this.storeService.findOne(storeId);
    if (!store) throw new NotFoundException('Invalid Store!');

    const products = await this.productService.createBatch(storeId, productFileJSON);
    const productIds = products.filter((product) => product._id);

    const purchase =  await this.purchaseModel.create({ store: storeId, product: productIds, ...createPurchaseDto });
    
    return purchase;
  }

  async findAll(storeId: string) {
    const purchases = await this.purchaseModel.find({store: storeId});
    return purchases;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchase`;
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
