import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterUserDto } from './dtos/register.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.entity';
import { Model, Types } from 'mongoose';
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
    const payload = { userId: user._id, phoneNumber: user.phoneNumber };
    const access_token = this.jwtService.sign(payload);
    return { ...{ user }, access_token };
  }

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.userService.findByPhoneNumber(
      registerUserDto.phoneNumber,
    );

    if (user) {
      throw new BadRequestException('This phone number is already exists');
    }
    const newUser = await new this.userModel({
      _id: new Types.ObjectId(),
      ...registerUserDto,
    }).save();

    const payload = { userId: newUser._id, phoneNumber: newUser.phoneNumber };
    const token = this.jwtService.sign(payload);
    return {
      ...newUser.toObject(),
      token,
    };
  }

  async validateUser(phoneNumber: string) {
    const user = await this.userService.findByPhoneNumber(phoneNumber);
    return user ?? null;
  }

  async sendOtp(number: string, text: string): Promise<any> {}
}
