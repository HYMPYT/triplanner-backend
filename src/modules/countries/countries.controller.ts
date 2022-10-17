import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { Response } from 'express';
import { CreateCountryResponseDto } from './dto/create-country-response.dto';
import { Country } from './entities/country.entity';

@Controller('countries')
export class CountriesController {

    constructor(private readonly countriesService: CountriesService) { }

    @Post()
    async createCountry(@Body() createCountryDto: CreateCountryDto, @Res() res: Response) {
        try {
            const country: CreateCountryResponseDto = await this.countriesService.createCountry(createCountryDto)

            if (country) {
				res.status(HttpStatus.CREATED).json(country)
			} else {
				res.sendStatus(HttpStatus.BAD_REQUEST)
			}

        } catch (e) {
            res.sendStatus(HttpStatus.BAD_REQUEST)
        }
    }

    @Get()
	async getAllCountries(@Res() res: Response) {
		try {
			const countries: Array<Country> = await this.countriesService.getAllCountries()
			res.status(HttpStatus.OK).json(countries)
		} catch (e) {
			res.sendStatus(HttpStatus.BAD_REQUEST)
		}
	}
}