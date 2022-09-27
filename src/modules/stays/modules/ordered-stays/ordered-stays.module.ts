import { Module } from '@nestjs/common';
import { OrderedStaysService } from './ordered-stays.service';

@Module({
  providers: [OrderedStaysService]
})
export class OrderedStaysModule {}
