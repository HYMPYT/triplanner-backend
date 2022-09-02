import { forwardRef, Module } from '@nestjs/common'
import { AuthModule } from '../../auth.module'
import { GoogleService } from './google.service'
import { UsersModule } from '../../../users/users.module'
import { GoogleController } from './google.controller'

@Module({
	imports: [
		forwardRef(() => AuthModule),
		forwardRef(() => UsersModule),
	],
	controllers: [GoogleController],
	providers: [GoogleService],
})
export class GoogleModule {}