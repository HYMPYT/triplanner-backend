import { ApiProperty } from "@nestjs/swagger";
import { FLIGHT_SEAT_CLASS } from "src/common/enums/tickets/ticket.enum";

export class CreateFlightTicketDto {
    @ApiProperty({ default: '777' })
    flightNumber: string;
    @ApiProperty({ default: FLIGHT_SEAT_CLASS.ECONOMY })
	classType: FLIGHT_SEAT_CLASS.ECONOMY
}