import { Injectable } from './main';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
