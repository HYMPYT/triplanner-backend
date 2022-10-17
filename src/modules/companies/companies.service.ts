import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from 'src/providers/providers.enum';
import { Repository } from 'typeorm';
import { CreateCompanyResponseDto } from './dto/create-company-response.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
    constructor(@Inject(PROVIDERS.COMPANIES_REPOSITRY) private companiesRepository: Repository<Company>) { }

    async createCompany(company: CreateCompanyDto): Promise<CreateCompanyResponseDto> {
        try {
            const data = await this.companiesRepository.save(company)
            return { companyId: data.id }
        } catch (e) {
            return
        }
    }

    async getAllCompanies(): Promise<Array<Company>> {
        try {
            return this.companiesRepository.find()
        } catch (e) {
            return
        }
    }
}
