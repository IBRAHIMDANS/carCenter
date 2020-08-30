import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CarService } from './car.service';
import { Car } from './car.entity';
import { ApiResponse } from '@nestjs/swagger';
import CarInterface from '../../interfaces/Car.interface';

@Controller('car')
export class CarController {

  constructor(private readonly carService: CarService) {
  }

  @Get('u/:id')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(@Param('id') id: string): Promise<Car[]> {
    return this.carService.findAll(id);
  }

  @Get(':id')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findById(@Param('id') id: string): Promise<Car> {
    return this.carService.findById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  postCarByUserId(@Body() payload: CarInterface): Promise<CarInterface> {
    return this.carService.create(payload);

  }

  @Delete(':id')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  DeleteCarByUserId(@Param('id') id): Promise<CarInterface> {
    return this.carService.delete(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  UpdateCarByUserId(@Param('id') id, @Body() payload: CarInterface): Promise<unknown> {
    return this.carService.update(id, payload);
  }
}
