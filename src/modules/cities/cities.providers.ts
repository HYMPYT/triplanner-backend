import { PROVIDERS } from "src/providers/providers.enum"
import { DataSource } from "typeorm"
import { City } from "./entities/city.entity"

export const citiesProviders = [
    {
        provide: PROVIDERS.CITIES_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(City),
        inject: [PROVIDERS.DATABASE_CONNECTION]
    }
]