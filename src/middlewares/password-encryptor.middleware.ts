import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class PasswordEncryptorMiddleware implements NestMiddleware {
	constructor(private readonly configService: ConfigService) {}
	async use(request: Request, response: Response, next: NextFunction) {
		if (request.body.password) {
			const hash = await bcrypt.hash(
				request.body.password,
				parseInt(this.configService.get<string>('HASH_NUMBER')),
			)
			request.body.password = hash
		}
		next()
	}
}
