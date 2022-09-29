import { PROVIDERS } from "src/providers/providers.enum"
import { DataSource } from "typeorm"
import { Ticket } from "./entities/ticket.entity"
import { BusTicket } from "./modules/bus-tickets/entities/bus-ticket.entity"
import { FlightTicket } from "./modules/flight-tickets/entities/flight-ticket.entity"
import { OrderedTicket } from "./modules/ordered-tickets/entities/ordered-ticket.entity"
import { RailwayTicket } from "./modules/railway-tickets/entities/railway-ticket.entity"

export const ticketsProviders = [
    {
        provide: PROVIDERS.MAIN_TICKETS_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Ticket),
        inject: [PROVIDERS.DATABASE_CONNECTION]
    }
]

export const flightTicketsProviders = [
    {
        provide: PROVIDERS.FLIGHT_TICKETS_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(FlightTicket),
        inject: [PROVIDERS.DATABASE_CONNECTION]
    }
]

export const railwayTicketsProviders = [
    {
        provide: PROVIDERS.RAILWAY_TICKETS_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(RailwayTicket),
        inject: [PROVIDERS.DATABASE_CONNECTION]
    }
]

export const busTicketsProviders = [
    {
        provide: PROVIDERS.BUS_TICKETS_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(BusTicket),
        inject: [PROVIDERS.DATABASE_CONNECTION]
    }
]

export const orderedTicketsProviders = [
    {
        provide: PROVIDERS.ORDERED_TICKETS_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(OrderedTicket),
        inject: [PROVIDERS.DATABASE_CONNECTION]
    }
]