import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  readonly userId: string;
  
  @IsString()
  @IsOptional()
  readonly image: string;

  @IsString()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsString()
  @IsOptional()
  readonly cookTime: string;

  @IsString()
  @IsOptional()
  readonly serves: string;

  @IsArray()
  @IsOptional()
  readonly ingredients: string[][];

  @IsArray()
  @IsOptional()
  readonly instructions: string[][];
  
  @IsArray()
  @IsOptional()
  readonly courses: string[];

  @IsArray()
  @IsOptional()
  readonly fields: string[];
  
  @IsString()
  @IsOptional()
  readonly difficulty: string;
}
