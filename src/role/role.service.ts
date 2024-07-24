import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './role.schema';
import { Model } from 'mongoose';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}
  
  async onModuleInit() {
    await this.createDefaultRoles();
  }
  async createDefaultRoles() {
    const defaultRoles = [
      {
        name: 'admin',
        permissions: [
          'user-create',
          'user-update',
          'role-create',
          'role-update',
        ],
        description: 'Administrator with full access',
      },
      {
        name: 'manager',
        permissions: ['user-create', 'user-update'],
        description: 'Store manager with user management permissions',
      },
      {
        name: 'cashier',
        permissions: [],
        description: 'Basic cashier role',
      },
    ];

    for (const role of defaultRoles) {
      const existingRole = await this.roleModel.findOne({ name: role.name });
      if (!existingRole) {
        await this.roleModel.create(role);
      }
    }
  }

  async create(createRoleDto: CreateRoleDto) {
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

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
