import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from 'src/providers/providers.enum';
import { Repository } from 'typeorm';
import { CreateCountryResponseDto } from './dto/create-country-response.dto';
import { CreateCountryDto } from './dto/create-country.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountriesService {
    constructor(@Inject(PROVIDERS.COUNTRIES_REPOSITORY) private countriesRepository: Repository<Country>) { }

    async createCountry(country: CreateCountryDto): Promise<CreateCountryResponseDto> {
        try {
            const data = await this.countriesRepository.save(country)
            return { countryId: data.id }
        } catch (e) {

        }
    }

    async getAllCountries(): Promise<Array<Country>> {
        try {
            return await this.countriesRepository.find()
        } catch (e) {
            
        }
    }
}
