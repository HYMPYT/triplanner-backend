import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { Response } from 'express';
import { CreateCountryResponseDto } from './dto/create-country-response.dto';
import { Country } from './entities/country.entity';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import RoleAuth from 'src/guards/decorators/roles.decorator';
import { USER_ROLES } from 'src/common/enums/users/user.enum';

@ApiTags('Coutries Service')
@Controller('api/countries')
export class CountriesController {

    constructor(private readonly countriesService: CountriesService) { }

	@ApiCreatedResponse({ description: 'Country has been created' })
	@ApiBadRequestResponse({ description: 'Country has already been created' })
	@ApiOperation({ summary: '[ADMIN, MODERATOR] Create country' })
	@ApiOkResponse({ type: CreateCountryResponseDto })
    @ApiBearerAuth()
    @RoleAuth([USER_ROLES.ADMIN, USER_ROLES.MODERATOR])
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

	@ApiOkResponse({ type: [Country] })
	@ApiOperation({ summary: '[ADMIN, MODERATOR] Get countries' })
	@ApiBearerAuth()
    @RoleAuth([USER_ROLES.ADMIN, USER_ROLES.MODERATOR])
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