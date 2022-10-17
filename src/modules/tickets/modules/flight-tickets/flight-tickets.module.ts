import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import { flightTicketsProviders } from '../../tickets.providers';
import { FlightTicketsService } from './flight-tickets.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...flightTicketsProviders,
    FlightTicketsService
  ],
  exports: [FlightTicketsService]
})
export class FlightTicketsModule {}
