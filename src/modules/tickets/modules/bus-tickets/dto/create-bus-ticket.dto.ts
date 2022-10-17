import { Ticket } from "src/modules/tickets/entities/ticket.entity"

export class CreateBusTicketDto {
    number: string
    tickets: Array<Ticket>
}