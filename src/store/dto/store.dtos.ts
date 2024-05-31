import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateStoreDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  location: string;
}