import { PROVIDERS } from "src/providers/providers.enum"
import { DataSource } from "typeorm"
import { Stay } from "./entities/stay.entity"
import { Hotel } from "./modules/hotels/entities/hotel.entity"
import { OrderedStay } from "./modules/ordered-stays/entities/ordered-stay.entity"
import { Room } from "./modules/rooms/entities/room.entity"

export const staysProviders = [
    {
        provide: PROVIDERS.MAIN_STAYS_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Stay),
        inject: [PROVIDERS.DATABASE_CONNECTION]
    }
]

export const hotelsProviders = [
    {
        provide: PROVIDERS.HOTELS_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Hotel),
        inject: [PROVIDERS.DATABASE_CONNECTION]
    }
]

export const roomsProviders = [
    {
        provide: PROVIDERS.ROOMS_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Room),
        inject: [PROVIDERS.DATABASE_CONNECTION]
    }
]

export const orderedStaysProviders = [
    {
        provide: PROVIDERS.ORDERED_STAYS_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(OrderedStay),
        inject: [PROVIDERS.DATABASE_CONNECTION]
    }
]