import { Module } from '@nestjs/common';
import { RentedCarsService } from './rented-cars.service';

@Module({
  providers: [RentedCarsService]
})
export class RentedCarsModule {}
