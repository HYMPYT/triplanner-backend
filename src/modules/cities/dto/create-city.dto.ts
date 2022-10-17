import { Locale } from "locale-enum";
import { CURRENCY_CODE } from "src/common/enums/cities/currency-code.enum";
import { Car } from "src/modules/cars/entities/car.entity";
import { Country } from "src/modules/countries/entities/country.entity";
import { Entertainment } from "src/modules/entertainment/entities/entertainment.entity";
import { Stay } from "src/modules/stays/entities/stay.entity";
import { Ticket } from "src/modules/tickets/entities/ticket.entity";

export class CreateCityDto {
	name: string;
	currency: CURRENCY_CODE
	language: Locale
    country: Country
    fromTickets: Array<Ticket>
    toTickets: Array<Ticket>
    cars?: Array<Car>
    entertainment?: Array<Entertainment>
    stays?: Array<Stay>
}