import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from 'src/providers/providers.enum';
import { Brackets, Repository } from 'typeorm';
import { CreateTicketResponseDto } from './dto/create-ticket-response.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { SearchTicketDto } from './dto/search-ticket.dto';
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

    async search(searchDto: SearchTicketDto): Promise<Array<Ticket>> {
        try {
            const tableName = 'tickets'
            const query = this.ticketsRepository.createQueryBuilder(tableName)

            query.leftJoinAndSelect(`${tableName}.from`, "city_from")
            query.leftJoinAndSelect(`${tableName}.to`, "city_to")
            query.leftJoinAndSelect(`${tableName}.company`, "company")
            query.leftJoinAndSelect(`${tableName}.busTicketInfo`, "bus_ticket")
            query.leftJoinAndSelect(`${tableName}.flightTicketInfo`, "flight_ticket")
            query.leftJoinAndSelect(`${tableName}.railwayTicketInfo`, "railway_ticket")

            query.where(`${tableName}.fromId = :from_id`, { from_id: searchDto.fromId })

            if (searchDto.type) {
                query.andWhere(`${tableName}.ticketType = :type`, { type: searchDto.type })
            }

            if (searchDto.toId) {
                query.andWhere(`${tableName}.toId = :to_id`, { to_id: searchDto.toId })
            }

            if (searchDto.dDate && searchDto.rDate) {
                const depDate = new Date(searchDto.dDate)
                const retDate = new Date(searchDto.rDate)

                query.andWhere(
                    new Brackets(query => {
                        query.where(
                            new Brackets(query => {
                                query.where(`${tableName}.departureTime >= :d_date_bottom and ${tableName}.departureTime < :d_date_top`, {
                                    d_date_bottom: depDate,
                                    d_date_top: this.getUpperLimitOfDate(depDate)
                                })
                            })
                        ).orWhere(
                            new Brackets(query => {
                                query.where(`${tableName}.departureTime >= :r_date_bottom and ${tableName}.departureTime < :r_date_top`, {
                                    r_date_bottom: retDate,
                                    r_date_top: this.getUpperLimitOfDate(retDate)
                                })
                            })
                        )
                    })
                )
            } else if (searchDto.dDate) {
                const depDate = new Date(searchDto.dDate)

                query.andWhere(`${tableName}.departureTime >= :d_date_bottom and ${tableName}.departureTime < :d_date_top`, {
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
