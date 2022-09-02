import { Module } from '@nestjs/common';
import { FlightTicketsService } from './flight-tickets.service';

@Module({
  providers: [FlightTicketsService]
})
export class FlightTicketsModule {}
