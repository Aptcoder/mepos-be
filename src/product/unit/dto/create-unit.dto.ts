import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUnitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  shortName: string;

  @IsOptional()
  allowDecimal: boolean;
}
