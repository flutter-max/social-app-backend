import {  IsString } from 'class-validator';

export class RelationDto {
  @IsString()
  readonly follower: string;

  @IsString()
  readonly following: string;
}
