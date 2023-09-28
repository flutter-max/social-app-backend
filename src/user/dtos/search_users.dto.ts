import { IsOptional } from 'class-validator';

export class SearchUsersDto {
  userId: string;

  @IsOptional()
  query: string;

  @IsOptional()
  isPublic: boolean;

  @IsOptional()
  gender: string;

  @IsOptional()
  country: string;
}
