import { forwardRef, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategies/jwt.strategy'
import { GoogleStrategy } from './strategies/google.strategy'
import { GoogleModule } from './modules/google/google.module'
import { FacebookStrategy } from './strategies/facebook.strategy'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    ConfigModule,
    forwardRef(() => GoogleModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_KEY'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    FacebookStrategy
  ],
  exports: [AuthService]
})
export class AuthModule { }
