import { PROVIDERS } from "src/providers/providers.enum"
import { DataSource } from "typeorm"
import { Image } from "./entities/image.entity"

export const imagesProviders = [
    {
        provide: PROVIDERS.IMAGES_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Image),
        inject: [PROVIDERS.DATABASE_CONNECTION]
    }
]