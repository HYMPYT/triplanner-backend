import { forwardRef, Module } from '@nestjs/common';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    DatabaseModule
  ],
  providers: [
    ...usersProviders,
    UsersService
  ],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule { }
