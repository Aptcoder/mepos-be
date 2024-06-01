import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { RelationshipStatus, UserGender } from '../user.schema';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  userCanLogin: boolean = false;

  @IsOptional()
  role: string;

  @IsNotEmpty()
  @IsEnum(UserGender)
  gender: UserGender;

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  ninNumber: string;

  @IsEnum(RelationshipStatus)
  relationshipStatus: RelationshipStatus;
}
