import { FLIGHT_SEAT_CLASS } from "src/common/enums/tickets/ticket.enum";

export class CreateFlightTicketDto {
    flightNumber: string;
	classType: FLIGHT_SEAT_CLASS.ECONOMY
}