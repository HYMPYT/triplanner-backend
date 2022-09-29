import { PROVIDERS } from "src/providers/providers.enum"
import { DataSource } from "typeorm"
import { Car } from "./entities/car.entity"
import { RentedCar } from "./modules/rented-cars/entities/rented-car.entity"

export const carsProviders = [
    {
        provide: PROVIDERS.CARS_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Car),
        inject: [PROVIDERS.DATABASE_CONNECTION]
    }
]

export const rentedCarsProviders = [
    {
        provide: PROVIDERS.RENTED_CARS_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(RentedCar),
        inject: [PROVIDERS.DATABASE_CONNECTION]
    }
]