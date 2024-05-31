import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { HttpResponseHelper } from 'src/common/helper/http-response.helper';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    const role = await this.roleService.create(createRoleDto);
    return HttpResponseHelper.send('Role created', role);
  }

  @Get()
  async findAll() {
    const roles = await this.roleService.findAll();
    return HttpResponseHelper.send('Roles', roles);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.roleService.get(+id);
  // }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    const updatedRole = await this.roleService.update(id, updateRoleDto);
    return HttpResponseHelper.send('Role updated', updatedRole);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
