import { IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @ValidateIf((object, value) => value !== undefined)
  @IsNotEmpty({ message: 'Please Enter password token' })
  passwordToken?: string;

  @ValidateIf((object, value) => value !== undefined)
  @IsNotEmpty({ message: 'Please Enter your password' })
  password?: string;
}
