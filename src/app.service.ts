import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  truncateTo2DP(num: number): number {
    return Math.floor(num * 100) / 100;
  }
}
