import { Controller, Get, Post, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('backend')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login-with-cookie')
  loginWithCookies(@Response() res) {
    try {
      const accessToken = 'something';
      res.cookie('serverToken', accessToken, {
        expires: new Date(new Date().getTime() + 60 * 1000),
        sameSite: 'strict',
        httpOnly: true,
      });
      return res.send(this.appService.login());
    } catch (error) {
      throw error;
    }
  }

  @Post('login-without-cookie')
  login() {
    return this.appService.login();
  }
}
