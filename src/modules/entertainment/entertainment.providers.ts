import { PROVIDERS } from "src/providers/providers.enum"
import { DataSource } from "typeorm"
import { Entertainment } from "./entities/entertainment.entity"
import { OrderedEntertainment } from "./modules/ordered-entertainment/entities/ordered-entertainment.entity"

export const entertainmentProviders = [
    {
        provide: PROVIDERS.ENTERTAINMENT_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Entertainment),
        inject: [PROVIDERS.DATABASE_CONNECTION]
    }
]

export const orderedEntertainmentProviders = [
    {
        provide: PROVIDERS.ORDERED_ENTERTAINMENT_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(OrderedEntertainment),
        inject: [PROVIDERS.DATABASE_CONNECTION]
    }
]