import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { UsersModule } from './users/users.module'
import { GoogleModule } from './auth/modules/google/google.module'
import { FacebookModule } from './auth/modules/facebook/facebook.module'
import { PasswordEncryptorMiddleware } from 'src/middlewares/password-encryptor.middleware'
import { CitiesModule } from './cities/cities.module'
import { CompaniesModule } from './companies/companies.module'
import { CountriesModule } from './countries/countries.module'
import { TicketsModule } from './tickets/tickets.module'

@Module({
    imports: [
        DatabaseModule,
        UsersModule,
        CitiesModule,
        CompaniesModule,
        CountriesModule,
        TicketsModule,
    ],
})
export class ApiModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(PasswordEncryptorMiddleware)
            .exclude({ path: 'api/user/login', method: RequestMethod.POST })
            .forRoutes({ path: 'api/user', method: RequestMethod.POST })
        consumer
            .apply(PasswordEncryptorMiddleware)
            .forRoutes({ path: 'api/user', method: RequestMethod.PUT })
        consumer
            .apply(PasswordEncryptorMiddleware)
            .exclude({ path: 'api/user/login', method: RequestMethod.POST })
            .forRoutes({
                path: 'api/user/password/confirm',
                method: RequestMethod.POST,
            })
    }
}
