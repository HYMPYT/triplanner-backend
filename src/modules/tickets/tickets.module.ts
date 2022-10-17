import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BusTicketsModule } from './modules/bus-tickets/bus-tickets.module';
import { FlightTicketsModule } from './modules/flight-tickets/flight-tickets.module';
import { RailwayTicketsModule } from './modules/railway-tickets/railway-tickets.module';
import { TicketsController } from './tickets.controller';
import { ticketsProviders } from './tickets.providers';
import { TicketsService } from './tickets.service';

@Module({
  imports: [
    DatabaseModule,
    BusTicketsModule,
    FlightTicketsModule,
    RailwayTicketsModule
  ],
  providers: [
    ...ticketsProviders,
    TicketsService
  ],
  controllers: [TicketsController],
  exports: [TicketsService]
})
export class TicketsModule {}
