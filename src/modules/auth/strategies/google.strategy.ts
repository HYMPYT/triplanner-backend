import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { User } from 'src/users/entities/user.entity'
import { GUARD_STRATEGIES } from 'src/common/enums/strategies.enum'

@Injectable()
export class GoogleStrategy extends PassportStrategy(
    Strategy,
    GUARD_STRATEGIES.GOOGLE,
) {
    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get<string>('GOOGLE_SECRET'),
            callbackURL: `${configService.get<string>(
                'ORIGIN',
            )}/api/auth/google/callback`,
            scope: ['email', 'profile'],
        })
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback,
    ): Promise<any> {
        const user: User = {
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            login_provider: profile.provider,
        }

        done(null, user)
    }
}
