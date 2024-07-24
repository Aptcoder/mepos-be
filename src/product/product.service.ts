import { BadRequestException, Injectable } from '@nestjs/common';
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

  async createBatch(storeId: string, productsData: any[]) {
    try {
      const modProductsData = await Promise.all(
        productsData.map(async (p) => {
          const modp = {
            store: storeId,
            ...p,
          };
          await this.productModel.validate(modp);
          return modp;
        }),
      );

      return this.productModel.create(modProductsData);
    } catch (err) {
      throw new BadRequestException('Invalid values found in update data');
    }
  }

  findAll(storeId?: string, name?: string) {
    let query = {};
    if (storeId) {
      query['store'] = storeId;
    }

    if (name) {
      query['name'] = { $regex: `${name}`, $options: 'i' };
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

  remove(id: string) {
    return this.productModel.deleteOne({
      _id: id,
    });
  }
}
