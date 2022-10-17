import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import { railwayTicketsProviders } from '../../tickets.providers';
import { RailwayTicketsService } from './railway-tickets.service';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...railwayTicketsProviders,
        RailwayTicketsService
    ],
    exports: [RailwayTicketsService]
})
export class RailwayTicketsModule { }
