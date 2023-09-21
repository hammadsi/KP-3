import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Arbitrary function that returs string
   * @returns "Hello World!"
   */
  getHello(): string {
    return 'Hello World!';
  }
}
