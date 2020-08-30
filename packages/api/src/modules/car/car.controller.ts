import { Controller, Get } from '@nestjs/common';

@Controller('car')
export class CarController {
  @Get()
  getHello(): string {
    return 'test';
  }
}
