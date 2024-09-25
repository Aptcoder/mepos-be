import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUnitDto } from './dto/create-unit.dto';
import { Unit } from './unit.schema';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Injectable()
export class UnitService {
  constructor(@InjectModel(Unit.name) private unitModel: Model<Unit>) {}

  create(storeId: string, createUnitDto: CreateUnitDto) {
    return this.unitModel.create({ store: storeId, ...createUnitDto });
  }

  findAll(storeId?: string) {
    let query = {};
    if (storeId) {
      query = {
        store: storeId,
      };
    }
    return this.unitModel.find(query);
  }

  async findOne(storeId: string, id: string) {
    const unit = await this.unitModel.findOne({store: storeId, _id: id});
    if(!unit) throw new NotFoundException("Unit doesn't exist");
    return unit;
  }

  async update(storeId: string, id: string, updateUnitDto: UpdateUnitDto) {
    const unit = await this.unitModel.findOneAndUpdate({store: storeId, _id: id}, {...updateUnitDto});
    if(!unit) throw new NotFoundException("Unit doesn't exist");
    return unit;
  }

  remove(storeId: string, id: string) {
    return this.unitModel.deleteOne({
      store: storeId,
      _id: id,
    });
  }
}
