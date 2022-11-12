import { ApiProperty } from "@nestjs/swagger";
import { Car } from "src/modules/cars/entities/car.entity";
import { Entertainment } from "src/modules/entertainment/entities/entertainment.entity";
import { Ticket } from "src/modules/tickets/entities/ticket.entity";

export class CreateCompanyDto {
    @ApiProperty({ default: 'Airbus' })
    name: string
    @ApiProperty({ default: 'Airbus', required: false })
	shortName?: string
    @ApiProperty({ type: [Ticket], required: false })
    tickets?: Array<Ticket>
    @ApiProperty({ type: [Car], required: false })
    cars?: Array<Car>
    @ApiProperty({ type: [Car], required: false })
    entertainment?: Array<Entertainment>
}