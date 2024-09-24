import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  create(storeId: string, createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create({ store: storeId, ...createCategoryDto });
  }

  findAll(storeId?: string) {
    let query = {};
    if (storeId) {
      query = {
        store: storeId,
      };
    }
    return this.categoryModel.find(query);
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  remove(storeId: string, id: string) {
    return this.categoryModel.deleteOne({
      store: storeId,
      _id: id,
    });
  }
}
