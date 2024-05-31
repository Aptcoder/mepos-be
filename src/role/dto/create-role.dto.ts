import { ArrayNotEmpty, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @ArrayNotEmpty()
  permissions: string[];

  @IsOptional()
  description: string;

  @IsNotEmpty()
  name: string;
}
