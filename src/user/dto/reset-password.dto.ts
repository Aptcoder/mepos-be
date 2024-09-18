import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordrDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  passwordToken: string;

  @IsNotEmpty()
  password: string;
}
