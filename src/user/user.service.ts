import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  Injectable,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtHelper } from 'src/common/helper/jwt.helper';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly mailService: MailService) {}

  async login(storeId: string, input: LoginUserDto) {
    const user = await this.userModel
      .findOne({
        email: input.email.toLowerCase(),
        store: storeId,
      })
      .populate('role password store');
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

  async findByEmail(email: string) {
    return await this.userModel.findOne({email})
  }

  async forgotPassword(email: string, storeId: string) {
    const user = await this.userModel
    .findOne({
      email: email.toLowerCase(),
      store: storeId,
    });
    
    if (!user) throw new BadRequestException('Invalid credentials');
    
    await this.mailService.sendPasswordResetMail(user, storeId);

    return { data: [], status: HttpStatus.OK, message: 'Please check your email for the Password Reset link' };
  }

  async resetPassword(resetPassword: ResetPasswordDto, storeId: string) {
    const {email, passwordToken, password} = resetPassword;    

    const user = await this.userModel
    .findOne({
      email: email.toLowerCase(),
      store: storeId,
    });
    
    if (!user) throw new BadRequestException('Invalid credentials');

    const currentDay = new Date();
    if (user.passwordToken === passwordToken && user.passwordTokenExpirationDate > currentDay) {
      throw new UnauthorizedException('Invalid Password Token');
    }

    const hashedPassword = bcrypt.hashSync(password);
    user.password = hashedPassword;
    user.passwordToken = '';
    user.passwordTokenExpirationDate = null;
    await this.update(user.id, user)
    
    return { data: [], status: HttpStatus.OK, message: 'Password reset is successful!' };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: any) {
    await this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true, runValidators: true})
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
