import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from 'src/providers/providers.enum';
import { Repository } from 'typeorm';
import { Country } from '../countries/entities/country.entity';
import { CreateCityResponseDto } from './dto/create-city-response.dto';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './entities/city.entity';

@Injectable()
export class CitiesService {
    constructor(@Inject(PROVIDERS.CITIES_REPOSITORY) private citiesRepository: Repository<City>) { }

    async createCity(city: CreateCityDto): Promise<CreateCityResponseDto> {
        try {
            const data = await this.citiesRepository.save(city)
            return { cityId: data.id }
        } catch (e) {
            return
        }
    }

    async getAllCities(): Promise<Array<City>> {
        try {
            return await this.citiesRepository.find({
                relations: {
                    country: true
                }
            })
        } catch (e) {
            return
        }
    }

    async getCitiesLikeName(name: string): Promise<Array<City>> {
        try {
            const query = this.citiesRepository.createQueryBuilder('city')

            query.leftJoinAndSelect("city.country", "country")
            query.where(`LOWER(city.name) like '${name.toLowerCase()}%'`)

            return await query.getMany()
        } catch (e) {
            return
        }
    }
}
