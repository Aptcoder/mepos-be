import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  create(storeId: string, createProductDto: CreateProductDto) {
    return this.productModel.create({ store: storeId, ...createProductDto });
  }

  findAll(storeId?: string) {
    let query = {};
    if (storeId) {
      query = {
        store: storeId,
      };
    }
    return this.productModel
      .find(query)
      .populate(['category', 'store', 'unit']);
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
