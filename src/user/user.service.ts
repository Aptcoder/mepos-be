import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtHelper } from 'src/common/helper/jwt.helper';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async login(storeId: string, input: LoginUserDto) {
    const user = await this.userModel
      .findOne({
        email: input.email.toLowerCase(),
        store: storeId,
      })
      .populate('role password');
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!bcrypt.compareSync(input.password, user.password)) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = await JwtHelper.signToken({
      id: user.id,
      role: user.role,
    });
    const userObject = user.toObject();
    delete userObject.password;
    return {
      token: jwt,
      user: userObject,
    };
  }

  async create(storeId: string, createUserDto: CreateUserDto) {
    createUserDto.email = createUserDto.email.toLowerCase();
    createUserDto.username = createUserDto.username.toLowerCase();
    const foundUser = await this.userModel.findOne({
      $or: [
        {
          email: createUserDto.email,
          store: storeId,
        },
        {
          store: storeId,
          username: createUserDto.username,
        },
      ],
    });

    if (foundUser) {
      if (foundUser.username == createUserDto.username) {
        throw new ConflictException(
          'User with this username already exists on store',
        );
      } else {
        throw new ConflictException(
          'User with this email address already exists on store',
        );
      }
    }

    createUserDto.password = bcrypt.hashSync(createUserDto.password, 8);
    return this.userModel.create({ store: storeId, ...createUserDto });
  }

  findAll(storeId?: string) {
    let query = {};
    if (storeId) {
      query['store'] = storeId;
    }
    return this.userModel.find(query).populate('role');
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
