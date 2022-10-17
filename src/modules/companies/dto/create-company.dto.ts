import { Car } from "src/modules/cars/entities/car.entity";
import { Entertainment } from "src/modules/entertainment/entities/entertainment.entity";
import { Ticket } from "src/modules/tickets/entities/ticket.entity";

export class CreateCompanyDto {
    name: string
	shortName?: string
    tickets?: Array<Ticket>
    cars?: Array<Car>
    entertainment?: Array<Entertainment>
}