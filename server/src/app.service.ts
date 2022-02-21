import { Injectable } from '@nestjs/common';

const token = {
  access_token: 'access_token',
  refresh_token: 'refresh_token',
};

@Injectable()
export class AppService {
  login() {
    return token;
  }
}
