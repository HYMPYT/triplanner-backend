import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { USER_ROLES } from 'src/common/enums/users/user.enum';
import RoleAuth from 'src/guards/decorators/roles.decorator';
import { CitiesService } from './cities.service';
import { CreateCityResponseDto } from './dto/create-city-response.dto';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './entities/city.entity';

@ApiTags('Cities Service')
@Controller('cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) {}

    @ApiCreatedResponse({ description: 'City has been created' })
	@ApiBadRequestResponse({ description: 'City has already been created' })
	@ApiOperation({ summary: '[ADMIN, MODERATOR] Create city' })
	@ApiOkResponse({ type: CreateCityResponseDto })
    @ApiBearerAuth()
    @RoleAuth([USER_ROLES.ADMIN, USER_ROLES.MODERATOR])
    @Post()
    async createCity(@Body() createCityDto: CreateCityDto, @Res() res: Response) {
        try {
            const city: CreateCityResponseDto = await this.citiesService.createCity(createCityDto)

            if(city) {
                res.status(HttpStatus.CREATED).json(city)
            } else {
                res.sendStatus(HttpStatus.BAD_REQUEST)
            }
        } catch (e) {
            res.sendStatus(HttpStatus.BAD_REQUEST)
        }
    }

    @ApiOkResponse({ type: [City] })
	@ApiOperation({ summary: '[ADMIN, MODERATOR] Get cities' })
	@ApiBearerAuth()
    @RoleAuth([USER_ROLES.ADMIN, USER_ROLES.MODERATOR])
    @Get()
    async getAllCities(@Res() res: Response) {
        try {
            const cities: Array<City> = await this.citiesService.getAllCities()
            res.status(HttpStatus.OK).json(cities)
        } catch (e) {
            res.sendStatus(HttpStatus.BAD_REQUEST)
        }
    }

    @ApiOkResponse({ type: [City] })
	@ApiOperation({ summary: '[ALL] Get cities by name or partial name' })
    @Get(':name')
    async getCitiesLikeName(@Param('name') name: string, @Res() res: Response) {
        try {
            const cities: Array<City> = await this.citiesService.getCitiesLikeName(name)
            res.status(HttpStatus.OK).json(cities)
        } catch (e) {
            res.sendStatus(HttpStatus.BAD_REQUEST)
        }
    }
}