import { forwardRef, Module } from '@nestjs/common'
import { FacebookController } from './facebook.controller'
import { AuthModule } from '../../auth.module'
import { UsersModule } from '../../../users/users.module'
import { FacebookService } from './facebook.service'

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [FacebookController],
  providers: [FacebookService],
})
export class FacebookModule { }
