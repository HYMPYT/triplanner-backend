import { PROVIDERS } from "src/providers/providers.enum"
import { DataSource } from "typeorm"
import { Amenity } from "./entities/amenity.entity"

export const amenitiesProviders = [
    {
        provide: PROVIDERS.AMENITIES_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Amenity),
        inject: [PROVIDERS.DATABASE_CONNECTION]
    }
]