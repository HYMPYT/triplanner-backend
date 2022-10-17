import { TICKET_TYPE } from "src/common/enums/tickets/ticket.enum"
import { City } from "src/modules/cities/entities/city.entity"
import { Company } from "src/modules/companies/entities/company.entity"
import { CreateBusTicketDto } from "../modules/bus-tickets/dto/create-bus-ticket.dto"
import { CreateFlightTicketDto } from "../modules/flight-tickets/dto/create-flight-ticket.dto"
import { CreateRailwayTicketDto } from "../modules/railway-tickets/dto/create-railway-ticket.dto"

export class CreateTicketDto {
    departureTime: Date
    arrivalTime: Date
    place: string
    price: number
    from: City
    to: City
    company: Company
    ticketType: TICKET_TYPE.FLIGHT
    busTicketInfo?: CreateBusTicketDto
    flightTicketInfo?: CreateFlightTicketDto
    railwayTicketInfo?: CreateRailwayTicketDto
}