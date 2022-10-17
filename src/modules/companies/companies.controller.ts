import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CompaniesService } from './companies.service';
import { CreateCompanyResponseDto } from './dto/create-company-response.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';

@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @Post()
    async createCompany(@Body() createCompanyDto: CreateCompanyDto, @Res() res: Response) {
        try {
            const company: CreateCompanyResponseDto = await this.companiesService.createCompany(createCompanyDto)

            if (company) {
				res.status(HttpStatus.CREATED).json(company)
			} else {
				res.sendStatus(HttpStatus.BAD_REQUEST)
			}
        } catch (e) {
            res.sendStatus(HttpStatus.BAD_REQUEST)
        }
    }

    @Get()
    async getAllCompanies(@Res() res: Response) {
        try {
            const companies: Array<Company> = await this.companiesService.getAllCompanies()
            res.status(HttpStatus.OK).json(companies)
        } catch (e) {
            res.sendStatus(HttpStatus.BAD_REQUEST)
        }
    }
}