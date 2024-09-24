import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUnitDto } from './dto/create-unit.dto';
import { Unit } from './unit.schema';

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

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  remove(storeId: string, id: string) {
    return this.unitModel.deleteOne({
      store: storeId,
      _id: id,
    });
  }
}
