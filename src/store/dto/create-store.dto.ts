import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateStoreDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  location: string;

  @ValidateNested()
  @Type(() => CreateUserDto)
  @IsNotEmpty()
  owner: CreateUserDto;
}
