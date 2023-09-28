import { IsArray, IsBoolean, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class RegisterUserDto {
    @IsString()
    phoneNumber: string;
  
    @IsString()
    country: string;
  
    @IsString()
    userName: string;
  
    @IsString()
    fullName: string;
  
    @IsString()
    gender: string;
  
    @IsString()
    birthDate: string;
  
    @IsString()
    @IsOptional()
    userAvatar: string;

    @IsBoolean()
    @IsOptional()
    isPublic: boolean;

    @IsArray()
    @IsOptional()
    cuisinesPreferences: string[];
  
    @IsArray()
    @IsOptional()
    dietaryPreferences: string[];
}
