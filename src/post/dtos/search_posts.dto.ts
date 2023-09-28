import { IsOptional } from 'class-validator';

export class SearchPostsDto {
  @IsOptional()
  query: string;

  userId: string;

  @IsOptional()
  fields: string[];

  @IsOptional()
  courses: string[];

  @IsOptional()
  difficulty: string;
}
