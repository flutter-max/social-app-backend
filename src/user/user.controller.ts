import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Query,
  Request,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { RelationDto } from './dtos/relation.dto';
import { SearchUsersDto } from './dtos/search_users.dto';
import { CreateUserDto } from './dtos/create_user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(@Res() res: Response): Promise<void> {
    try {
      const posts = await this.userService.getAllUsers();
      res.status(HttpStatus.OK).json({ message: 'success', body: posts });
    } catch (err) {
      res.status(err.status).json(err.response);
    }
  }

  @Get('/search')
  async searchUsers(@Query() searchUsersDto: SearchUsersDto): Promise<User[]> {
    return this.userService.searchUsers(searchUsersDto);
  }

  @Post()
  async createUser(
    @Res() res: Response,
    @Body() createUserDto: CreateUserDto,
  ): Promise<object> {
    try {
      const user = await this.userService.createUser(createUserDto);
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'success', body: user });
    } catch (_) {}
  }

  @Get('followers')
  async getUserFollowers(@Query('id') userId: string): Promise<User[]> {
    return this.userService.getUserFollowers(userId);
  }

  @Get('followings')
  async getUserFollowings(@Query('id') userId: string): Promise<User[]> {
    return this.userService.getUserFollowings(userId);
  }

  @Post('follow')
  async followUser(@Body() relationDto: RelationDto): Promise<void> {
    return this.userService.followUser(relationDto);
  }

  @Patch('unFollow')
  async unFollowUser(@Body() relationDto: RelationDto): Promise<void> {
    return this.userService.unFollowUser(relationDto);
  }

  @Post('blockUser')
  async blockUser(@Request() req): Promise<void> {
    return this.userService.blockUser(
      req.getHandler.params.id,
      req.body.personId,
    );
  }

  @Post('unBlockUser')
  async unBlockUser(@Request() req): Promise<void> {
    return this.userService.unBlockUser(
      req.getHandler.params.id,
      req.body.personId,
    );
  }
}
