import { RAILWAY_CARRIAGE_TYPE, RAILWAY_SEAT_CLASS } from "src/common/enums/tickets/ticket.enum";

export class CreateRailwayTicketDto {
	trainNumber: string
	carriageNumber: number
	classType: RAILWAY_SEAT_CLASS.SECOND
	carriageType: RAILWAY_CARRIAGE_TYPE.OPEN_COMPARTMENT
}