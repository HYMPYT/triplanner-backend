import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from 'src/providers/providers.enum';
import { Repository } from 'typeorm';
import { CreateTicketInfoDto } from '../../dto/create-ticket-info-response.dto';
import { CreateRailwayTicketDto } from './dto/create-railway-ticket.dto';
import { RailwayTicket } from './entities/railway-ticket.entity';

@Injectable()
export class RailwayTicketsService {
    constructor(@Inject(PROVIDERS.RAILWAY_TICKETS_REPOSITORY) private railwayTicketsRepository: Repository<RailwayTicket>) {}

    async createRailwayTicket(railwayTicket: CreateRailwayTicketDto): Promise<CreateTicketInfoDto> {
        try {
            const data = await this.railwayTicketsRepository.save(railwayTicket)
            return { ticketInfoId: data.id }
        } catch(e) {

        }
    }

    async checkRailwayById(id: string): Promise<boolean> {
        return (await this.railwayTicketsRepository.findOneBy({ id })) !== null
    }
}
