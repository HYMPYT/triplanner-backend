import { ApiProperty } from "@nestjs/swagger";
import { RAILWAY_CARRIAGE_TYPE, RAILWAY_SEAT_CLASS } from "src/common/enums/tickets/ticket.enum";

export class CreateRailwayTicketDto {
	@ApiProperty({ default: '147k' })
	trainNumber: string
	@ApiProperty({ default: '10' })
	carriageNumber: number
	@ApiProperty({ default: RAILWAY_SEAT_CLASS.SECOND })
	classType: RAILWAY_SEAT_CLASS.SECOND
	@ApiProperty({ default: RAILWAY_CARRIAGE_TYPE.OPEN_COMPARTMENT })
	carriageType: RAILWAY_CARRIAGE_TYPE.OPEN_COMPARTMENT
}