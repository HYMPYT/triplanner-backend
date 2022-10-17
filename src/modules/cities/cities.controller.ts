import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CitiesService } from './cities.service';
import { CreateCityResponseDto } from './dto/create-city-response.dto';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './entities/city.entity';

@Controller('cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) {}

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

    @Get()
    async getAllCities(@Res() res: Response) {
        try {
            const cities: Array<City> = await this.citiesService.getAllCities()
            res.status(HttpStatus.OK).json(cities)
        } catch (e) {
            res.sendStatus(HttpStatus.BAD_REQUEST)
        }
    }
}