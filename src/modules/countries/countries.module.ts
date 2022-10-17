import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CountriesController } from './countries.controller';
import { countriesProviders } from './countries.providers';
import { CountriesService } from './countries.service';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...countriesProviders,
        CountriesService
    ],
    controllers: [CountriesController],
    exports: [CountriesService]
})
export class CountriesModule {}
