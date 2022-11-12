import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-facebook'
import { ConfigService } from '@nestjs/config'
import { GUARD_STRATEGIES } from '../../../common/enums/auth/strategies.enum'
import { FacebookUser } from '../interfaces/jwt.inteface'

@Injectable()
export class FacebookStrategy extends PassportStrategy(
	Strategy,
	GUARD_STRATEGIES.FACEBOOK,
) {
	constructor(private readonly configService: ConfigService) {
		super({
			clientID: configService.get<string>('FACEBOOK_CLIENT_ID'),
			clientSecret: configService.get<string>('FACEBOOK_CLIENT_SECRET'),
			callbackURL: `${configService.get<string>('ORIGIN')}/oauth2/redirect/facebook`,
			scope: 'email',
			profileFields: ['emails', 'name'],
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: (err: any, user: any, info?: any) => void,
	): Promise<any> {
		const user: FacebookUser = {
			...(profile?.emails?.length ? {} : { provider_id: profile.id }),
			...(profile?.emails?.length ? { email: profile?.emails[0]?.value } : {}),
			firstName: profile.name.givenName,
			lastName: profile.name.familyName,
			loginProvider: profile.provider,
		}
		console.log(user)
		done(null, user)
	}
}
