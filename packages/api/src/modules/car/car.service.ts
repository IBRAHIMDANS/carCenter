import { Injectable } from '@nestjs/common';
import { Car } from './car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import CarInterface from '../../interfaces/Car.interface';

@Injectable()
export class CarService {
  private header = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  };

  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>) {
  }

  public async findAll(id: string) {
    return await this.carRepository.find({ where: { userId: id } });
  }
  public async findById(id: string) {
    return await this.carRepository.findOneOrFail({ where: {  id } });
  }

  public async create(payload: CarInterface): Promise<CarInterface> {
    return await this.carRepository.save(payload);
  }
  public async update(id, payload: CarInterface): Promise<unknown> {
    return this.carRepository
      .createQueryBuilder()
      .update()
      .set(payload)
      .where({ id })
      .execute()
      .then(r => r)
      .catch(e => e);
  }
  public async delete(id): Promise<CarInterface> {
    return this.carRepository.findOneOrFail({ where: { id } })
      .then(r => this.carRepository.remove(r)).catch(e => e);
  }


}
