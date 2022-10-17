import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from 'src/providers/providers.enum';
import { Repository } from 'typeorm';
import { CreateTicketInfoDto } from '../../dto/create-ticket-info-response.dto';
import { CreateFlightTicketDto } from './dto/create-flight-ticket.dto';
import { FlightTicket } from './entities/flight-ticket.entity';

@Injectable()
export class FlightTicketsService {
    constructor(@Inject(PROVIDERS.FLIGHT_TICKETS_REPOSITORY) private flightTicketsRepository: Repository<FlightTicket>) {}

    async createFlightTicket(flightTicket: CreateFlightTicketDto): Promise<CreateTicketInfoDto> {
        try {
            const data = await this.flightTicketsRepository.save(flightTicket)
            return { ticketInfoId: data.id }
        } catch(e) {

        }
    }

    async checkFlightTicketById(id: string): Promise<boolean> {
        return (await this.flightTicketsRepository.findOneBy({ id })) !== null
    }
}
