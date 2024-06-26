import { IsNumber, IsNumberString, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  // @IsNumber()
  @IsNumberString()
  price: number;

  image: string;
}
