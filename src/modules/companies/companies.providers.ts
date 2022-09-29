import { PROVIDERS } from "src/providers/providers.enum"
import { DataSource } from "typeorm"
import { Company } from "./entities/company.entity"

export const companiesProviders = [
    {
        provide: PROVIDERS.COMPANIES_REPOSITRY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Company),
        inject: [PROVIDERS.DATABASE_CONNECTION]
    }
]