import { Module } from '@nestjs/common';
import { BusTicketsService } from './bus-tickets.service';

@Module({
  providers: [BusTicketsService]
})
export class BusTicketsModule {}
