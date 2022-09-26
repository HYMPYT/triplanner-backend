import { Module } from '@nestjs/common';
import { OrderedTicketsService } from './ordered-tickets.service';

@Module({
  providers: [OrderedTicketsService]
})
export class OrderedTicketsModule {}
