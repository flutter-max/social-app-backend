import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterUserDto } from './dtos/register.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(phoneNumber: string): Promise<Object> {
    const user = await this.userService.findByPhoneNumber(phoneNumber);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payload = { sub: user.id, username: user.phoneNumber };
    const token = this.jwtService.sign(payload);
    return { ...{ user }, token };
  }

  async register(registerUserDto: RegisterUserDto): Promise<Object> {
    const currentUser = new this.userModel(registerUserDto);
    const user = await this.userService.findByPhoneNumber(
      currentUser.phoneNumber,
    );

    if (user) {
      throw new BadRequestException('This phone number is already exists');
    }

    const payload = { sub: currentUser._id, username: currentUser.phoneNumber };
    const token = this.jwtService.sign(payload);
    await currentUser.save();
    return {
      ...currentUser.toJSON(),
      token,
    };
  }

  async validateUser(phoneNumber: string) {
    const user = await this.userService.findByPhoneNumber(phoneNumber);
    return user ?? null;
  }
}
