import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UsersService } from 'src/users/users.service'
import { JwtCustomPayload } from '../interfaces/jwt.inteface'
import { User } from 'src/users/entities/user.entity'
import { GUARD_STRATEGIES } from 'src/common/enums/strategies.enum'

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