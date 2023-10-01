import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RegisterUserDto } from './dtos/register.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/common/decorators/public.decorator';
import { sendResponse } from 'src/common/utils/sendResponse';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(
    @Body('phoneNumber') phoneNumber: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const user = await this.authService.login(phoneNumber);
      res.status(HttpStatus.OK).json({ message: 'success', body: user });
    } catch (err) {
      res.status(err.status).json({ message: 'failed', body: err.message });
    }
  }

  @Public()
  @Post('register')
  async register(@Res() res: Response, @Body() registerDto: RegisterUserDto) {
    const user = await this.authService.register(registerDto);
    sendResponse(res, user);
  }

  @Post('https://wa.futuretechdev.com/message/text?key=marymAdnan')
  async sendOtp(@Body() id: string, message: string) {
    await this.authService.sendOtp(id, message);
  }
}
