import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CitiesController } from './cities.controller';
import { citiesProviders } from './cities.providers';
import { CitiesService } from './cities.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...citiesProviders,
    CitiesService
  ],
  controllers: [CitiesController],
  exports: [CitiesService]
})
export class CitiesModule {}
