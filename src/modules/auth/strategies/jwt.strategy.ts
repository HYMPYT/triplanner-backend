import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtCustomPayload } from '../interfaces/jwt.inteface'
import { GUARD_STRATEGIES } from 'src/common/enums/auth/strategies.enum'
import { UsersService } from 'src/modules/users/users.service'
import { User } from 'src/modules/users/entities/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(
	Strategy,
	GUARD_STRATEGIES.JWT,
) {
	constructor(
		private readonly userService: UsersService,
		private readonly configService: ConfigService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('JWT_KEY'),
		})
	}

	async validate(payload: JwtCustomPayload): Promise<User> {
		const user: User = await this.userService.findOne(+payload.user_id)
		if (user) {
			delete user.password
			return user
		}
		throw new UnauthorizedException()
	}
}