import { PROVIDERS } from "src/providers/providers.enum"
import { DataSource } from "typeorm"
import { User } from "./entities/user.entity"

export const usersProviders = [
    {
        provide: PROVIDERS.USERS_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: [PROVIDERS.DATABASE_CONNECTION]
    }
]