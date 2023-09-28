import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RegisterUserDto } from './dtos/register.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

 
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response): Promise<void> {
    console.log(`dddd: ${req}`);
    try {
      //const user = await this.authService.login(req);
      //res.status(HttpStatus.OK).json({ message: 'success', body: user });
    } catch (err) {
      res.status(err.status).json({ message: 'failed', body: err.message });
    }
  }

  @Post('register')
  async register(
    @Res() res: Response,
    @Body() registerDto: RegisterUserDto,
  ): Promise<void> {
    try {
      const user = await this.authService.register(registerDto);
      res.status(HttpStatus.OK).json({ message: 'success', body: user });
    } catch (err) {
      res.status(err.status).json({ message: 'failed', body: err.message });
    }
  }
}
