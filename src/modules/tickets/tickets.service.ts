import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from 'src/providers/providers.enum';
import { Repository } from 'typeorm';
import { CreateTicketResponseDto } from './dto/create-ticket-response.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { BusTicketsService } from './modules/bus-tickets/bus-tickets.service';
import { FlightTicketsService } from './modules/flight-tickets/flight-tickets.service';
import { RailwayTicketsService } from './modules/railway-tickets/railway-tickets.service';

@Injectable()
export class TicketsService {
    constructor(@Inject(PROVIDERS.MAIN_TICKETS_REPOSITORY) private ticketsRepository: Repository<Ticket>,
        private readonly busTicketsService: BusTicketsService,
        private readonly flightTicketsService: FlightTicketsService,
        private readonly railwayTicketsService: RailwayTicketsService) { }

    async createTicket(ticketDto: CreateTicketDto): Promise<CreateTicketResponseDto> {
        try {
            if (!ticketDto.busTicketInfo && !ticketDto.flightTicketInfo && !ticketDto.railwayTicketInfo) {
                console.log('Ooops!')
                return
            }
            const data = await this.ticketsRepository.save(ticketDto)
            return { ticketId: data.id }
        } catch (e) {
            return
        }
    }

    async getAllTickets(): Promise<Array<Ticket>> {
        try {
            return await this.ticketsRepository.find({
                relations: {
                    company: true,
                    from: true,
                    to: true,
                    busTicketInfo: true,
                    flightTicketInfo: true,
                    railwayTicketInfo: true
                }
            })
        } catch (e) {

        }
    }
}
