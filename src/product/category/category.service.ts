import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

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

  async findOne(storeId: string, id: string) {
    const category = await this.categoryModel.findOne({store: storeId, _id: id});
    if (!category) throw new NotFoundException('Category does not exist');
    return category
  }

  remove(storeId: string, id: string) {
    return this.categoryModel.deleteOne({
      store: storeId,
      _id: id,
    });
  }

  async update(storeId: string, id: string, updateCategory: UpdateCategoryDto) {
    const category = await this.categoryModel.findOneAndUpdate({store: storeId, _id: id}, {...updateCategory});
    if (!category) throw new NotFoundException('Category does not exist');
    return category
  }
}
