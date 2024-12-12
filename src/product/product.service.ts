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
    const query = {};
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

  async findOne(storeId: string, id: string) {
    const product = await this.productModel.findOne({
      store: storeId,
      _id: id,
    });
    if (!product) throw new BadRequestException("Product doesn't exist");
    return product;
  }

  async update(
    storeId: string,
    id: string,
    updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productModel.findOneAndUpdate(
      { store: storeId, _id: id },
      { ...updateProductDto },
    );
    if (!product) throw new BadRequestException("Product doesn't exist");
    return product;
  }

  remove(storeId: string, id: string) {
    return this.productModel.deleteOne({
      store: storeId,
      _id: id,
    });
  }


}
