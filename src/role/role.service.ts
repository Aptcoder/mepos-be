import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './role.schema';
import { Model } from 'mongoose';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  async create(createRoleDto: CreateRoleDto) {
    const name = createRoleDto.name.toLowerCase();
    const existingRole = await this.roleModel.findOne({ name });
    if (existingRole) {
      throw new ConflictException(`Role with name ${name} already exists`);
    }

    // TODO - Check that the permissions sent are valid for us
    return this.roleModel.create(createRoleDto);
  }

  findAll() {
    return this.roleModel.find();
  }

  getRole(name: string, isDefault = false) {
    return this.roleModel.findOne({
      name,
      isDefault,
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleModel.findById(id);
    if (!role) {
      throw new NotFoundException('Role with id not found');
    }

    for (const [key, value] of Object.entries(updateRoleDto)) {
      role[key] = value;
    }
    return role.save();
  }

  async remove(id: string) {
    await this.roleModel.findByIdAndDelete(id);
  }
}
