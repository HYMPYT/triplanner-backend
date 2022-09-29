import { PROVIDERS } from "src/providers/providers.enum"
import { DataSource } from "typeorm"
import { Country } from "./entities/country.entity"

export const countriesProviders = [
    {
        provide: PROVIDERS.COUNTRIES_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Country),
        inject: [PROVIDERS.DATABASE_CONNECTION]
    }
]