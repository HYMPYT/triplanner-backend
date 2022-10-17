import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CompaniesController } from './companies.controller';
import { companiesProviders } from './companies.providers';
import { CompaniesService } from './companies.service';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...companiesProviders,
        CompaniesService
    ],
    controllers: [CompaniesController],
    exports: [CompaniesService]
})
export class CompaniesModule { }
