import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService) {

  }

  getHello(): string {
    return `Car Center Api  ${this.config.get<string>('database.host')}`;
  }
}
