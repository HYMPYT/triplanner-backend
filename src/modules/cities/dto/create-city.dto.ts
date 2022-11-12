import { ApiProperty } from "@nestjs/swagger";
import { Locale } from "locale-enum";
import { CURRENCY_CODE } from "src/common/enums/cities/currency-code.enum";
import { Car } from "src/modules/cars/entities/car.entity";
import { Country } from "src/modules/countries/entities/country.entity";
import { Entertainment } from "src/modules/entertainment/entities/entertainment.entity";
import { Stay } from "src/modules/stays/entities/stay.entity";
import { Ticket } from "src/modules/tickets/entities/ticket.entity";

export class CreateCityDto {
    @ApiProperty({ default: 'Kyiv' })
	name: string;
    @ApiProperty({ enum: CURRENCY_CODE, default: CURRENCY_CODE.UAH })
	currency: CURRENCY_CODE
    @ApiProperty({ enum: Locale, default: Locale.uk_UA })
	language: Locale
    @ApiProperty({ type: Country })
    country: Country
    @ApiProperty({ type: [Ticket], required: false })
    fromTickets?: Array<Ticket>
    @ApiProperty({ type: [Ticket], required: false })
    toTickets?: Array<Ticket>
    @ApiProperty({ type: [Car], required: false })
    cars?: Array<Car>
    @ApiProperty({ type: [Entertainment], required: false })
    entertainment?: Array<Entertainment>
    @ApiProperty({ type: [Stay], required: false })
    stays?: Array<Stay>
}