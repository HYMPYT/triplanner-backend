import { Module } from '@nestjs/common';
import { OrderedEntertainmentService } from './ordered-entertainment.service';

@Module({
  providers: [OrderedEntertainmentService]
})
export class OrderedEntertainmentModule {}
