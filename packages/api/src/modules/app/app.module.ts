import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { database } from '../../config';
import { CarModule } from '../car/car.module';
import { Car } from '../car/car.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const db = config.get('database');
        db.entities = [Car];
        return db;
      },
      inject: [ConfigService],
    }),
    CarModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
