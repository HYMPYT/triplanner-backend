import { ApiProperty } from "@nestjs/swagger"
import { TICKET_TYPE } from "src/common/enums/tickets/ticket.enum"
import { City } from "src/modules/cities/entities/city.entity"
import { Company } from "src/modules/companies/entities/company.entity"
import { CreateBusTicketDto } from "../modules/bus-tickets/dto/create-bus-ticket.dto"
import { CreateFlightTicketDto } from "../modules/flight-tickets/dto/create-flight-ticket.dto"
import { CreateRailwayTicketDto } from "../modules/railway-tickets/dto/create-railway-ticket.dto"

export class CreateTicketDto {
    @ApiProperty({ default: '2022-11-05' })
    departureTime: Date

    @ApiProperty({ default: '2022-11-05' })
    arrivalTime: Date

    @ApiProperty({ default: '4B' })
    place: string

    @ApiProperty({ default: '320.50' })
    price: number

    @ApiProperty({ default: 'Kyiv' })
    from: City

    @ApiProperty({ default: 'Lviv' })
    to: City

    @ApiProperty({ default: 'Airbus' })
    company: Company

    @ApiProperty({ default: TICKET_TYPE.FLIGHT })
    ticketType: TICKET_TYPE.FLIGHT

    @ApiProperty({ type: CreateBusTicketDto })
    busTicketInfo?: CreateBusTicketDto

    @ApiProperty({ type: CreateFlightTicketDto })
    flightTicketInfo?: CreateFlightTicketDto
    
    @ApiProperty({ type: CreateRailwayTicketDto })
    railwayTicketInfo?: CreateRailwayTicketDto
}