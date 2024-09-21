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
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('/:storeId/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Permission('user-create')
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Param('storeId') storeId: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    const user = await this.userService.create(storeId, createUserDto);
    return HttpResponseHelper.send('User created', user);
  }

  @Get()
  async findAll(@Param('storeId') storeId: string) {
    const users = await this.userService.findAll(storeId);
    return HttpResponseHelper.send('Users', users);
    // return this.userService.findAll(storeId);
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

  @Post('forgot-password')
  async ForgotPassword(@Body() body: ResetPasswordDto, @Param('storeId') storeId: string): Promise<{ data: any, status: number, message: string }>  {
    return await this.userService.forgotPassword(body.email, storeId);
  }

  @Post('reset-password')
  async ResetPassword(@Body() resetPasswordDto: ResetPasswordDto, @Param('storeId') storeId: string): Promise<{ data: any, status: number, message: string }>  {
    return await this.userService.resetPassword(resetPasswordDto, storeId);
  }
}
