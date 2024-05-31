import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { HttpResponseHelper } from 'src/common/helper/http-response.helper';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Permission } from 'src/common/guards/permission.helper';

@Controller('/:storeId/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Permission('user-create')
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Param('storeId') storeId: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.userService.create(storeId, createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Post('login')
  async loginUser(
    @Param('storeId') storeId: string,
    @Body() loginUserDto: LoginUserDto,
  ) {
    const data = await this.userService.login(storeId, loginUserDto);
    return HttpResponseHelper.send('User logged in', data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
