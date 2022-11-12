import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { USER_ROLES } from 'src/common/enums/users/user.enum';
import RoleAuth from 'src/guards/decorators/roles.decorator';
import { CompaniesService } from './companies.service';
import { CreateCompanyResponseDto } from './dto/create-company-response.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';

@ApiTags('Companies Service')
@Controller('api/companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @ApiCreatedResponse({ description: 'Company has been created' })
	@ApiBadRequestResponse({ description: 'Company has already been created' })
	@ApiOperation({ summary: '[ADMIN, MODERATOR] Create company' })
	@ApiOkResponse({ type: CreateCompanyResponseDto })
    @ApiBearerAuth()
    @RoleAuth([USER_ROLES.ADMIN, USER_ROLES.MODERATOR])
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

    @ApiOkResponse({ type: [Company] })
	@ApiOperation({ summary: '[ADMIN, MODERATOR] Get companies' })
	@ApiBearerAuth()
    @RoleAuth([USER_ROLES.ADMIN, USER_ROLES.MODERATOR])
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