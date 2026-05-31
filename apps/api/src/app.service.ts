import { Injectable } from '@nestjs/common';
import { message } from '@bt/schemas';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World from Nest!' + message;
  }
}
