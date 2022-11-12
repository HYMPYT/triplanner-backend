import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GoogleService } from './google.service'
import { Response } from 'express'
import { ConfigService } from '@nestjs/config'

@Controller('api/auth/google')
export class GoogleController {
	constructor(
		private readonly googleService: GoogleService,
		private readonly configService: ConfigService,
	) {}

	@Get('callback')
	@UseGuards(AuthGuard('google'))
	async googleAuthRedirect(@Req() req, @Res() res: Response) {
		const { token, type } = await this.googleService.googleLogin(req)
		res.redirect(`${this.configService.get<string>('FRONT_ORIGIN')}`)
		// /authenticate?access_token=${token}&type=${type}
	}
}
