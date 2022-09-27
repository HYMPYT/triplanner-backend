import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { RentedCarsModule } from './rented-cars/rented-cars.module';

@Module({
  providers: [CarsService],
  controllers: [CarsController],
  imports: [RentedCarsModule]
})
export class CarsModule {}
