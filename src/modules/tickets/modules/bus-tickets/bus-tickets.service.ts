import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from 'src/providers/providers.enum';
import { Repository } from 'typeorm';
import { CreateTicketInfoDto } from '../../dto/create-ticket-info-response.dto';
import { CreateBusTicketDto } from './dto/create-bus-ticket.dto';
import { BusTicket } from './entities/bus-ticket.entity';

@Injectable()
export class BusTicketsService {
    constructor(@Inject(PROVIDERS.BUS_TICKETS_REPOSITORY) private busTicketsRepository: Repository<BusTicket>) {}

    async createBusTicket(busTicket: CreateBusTicketDto): Promise<CreateTicketInfoDto> {
        try {
            const data = await this.busTicketsRepository.save(busTicket)
            return { ticketInfoId: data.id }
        } catch(e) {

        }
    }

    async checkBusTicketById(id: string): Promise<boolean> {
        return (await this.busTicketsRepository.findOneBy({ id })) !== null
    }
}
