import { PROVIDERS } from 'src/providers/providers.enum';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';

export const databaseProviders = [
  {
    provide: PROVIDERS.DATABASE_CONNECTION,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'postgres',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'triplanner',
        entities: [
          User,
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];