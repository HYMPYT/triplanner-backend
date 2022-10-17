import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import { busTicketsProviders } from '../../tickets.providers';
import { BusTicketsService } from './bus-tickets.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...busTicketsProviders,
    BusTicketsService
  ],
  exports: [BusTicketsService]
})
export class BusTicketsModule {}
