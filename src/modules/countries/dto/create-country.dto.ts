import { ApiProperty } from "@nestjs/swagger";
import { City } from "src/modules/cities/entities/city.entity";

export class CreateCountryDto {
    @ApiProperty({ default: 'Kyiv' })
    name: string;
    @ApiProperty({ type: [City] })
    cities: Array<City>
}