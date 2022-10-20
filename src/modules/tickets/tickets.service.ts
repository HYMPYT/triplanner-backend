import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from 'src/providers/providers.enum';
import { Brackets, Repository } from 'typeorm';
import { CreateTicketResponseDto } from './dto/create-ticket-response.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
    constructor(@Inject(PROVIDERS.MAIN_TICKETS_REPOSITORY) private ticketsRepository: Repository<Ticket>) { }

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

    async search(fromId: string, toId?: string, dDate?: number, rDate?: number): Promise<Array<Ticket>> {
        try {
            const query = this.ticketsRepository.createQueryBuilder('ticket')

            query.where('ticket.fromId = :from_id', { from_id: fromId })

            if (toId) {
                query.andWhere('ticket.toId = :to_id', { to_id: toId })
            }

            if (dDate && rDate) {
                const depDate = new Date(dDate)
                const retDate = new Date(rDate)

                query.andWhere(
                    new Brackets(query => {
                        query.where(
                            new Brackets(query => {
                                query.where('ticket.departureTime >= :d_date_bottom and ticket.departureTime < :d_date_top', {
                                    d_date_bottom: depDate,
                                    d_date_top: this.getUpperLimitOfDate(depDate)
                                })
                            })
                        ).orWhere(
                            new Brackets(query => {
                                query.where('ticket.departureTime >= :r_date_bottom and ticket.departureTime < :r_date_top', {
                                    r_date_bottom: retDate,
                                    r_date_top: this.getUpperLimitOfDate(retDate)
                                })
                            })
                        )
                    })
                )
            } else if (dDate) {
                const depDate = new Date(dDate)

                query.andWhere('ticket.departureTime >= :d_date_bottom and ticket.departureTime < :d_date_top', {
                    d_date_bottom: depDate,
                    d_date_top: this.getUpperLimitOfDate(depDate)
                })
            }

            return await query.getMany()
        } catch (e) {

        }
    }

    private getUpperLimitOfDate(date: Date): Date {
        const d = new Date(date.getTime())
        d.setDate(d.getDate() + 1)
        return d
    }
}
