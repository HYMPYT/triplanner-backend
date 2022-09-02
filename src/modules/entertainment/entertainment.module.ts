import { Module } from '@nestjs/common';
import { EntertainmentService } from './entertainment.service';
import { EntertainmentController } from './entertainment.controller';

@Module({
  providers: [EntertainmentService],
  controllers: [EntertainmentController]
})
export class EntertainmentModule {}
