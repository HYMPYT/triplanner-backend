import { City } from "src/modules/cities/entities/city.entity";

export class CreateCountryDto {
    name: string;
    cities: Array<City>
}