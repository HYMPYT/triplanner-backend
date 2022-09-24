import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/modules/users/users.service'
import { AuthService } from '../../auth.service'
import { USER_STATUS } from '../../../../common/enums/users/user.enum'
import { LOGIN_TYPE } from '../../../../common/enums/login/login.enum'
import { CustomError } from '../../../../helpers/error.helper'
import { CreateUserResponseDto } from 'src/modules/users/dto/create-user-response.dto'

@Injectable()
export class FacebookService {
	constructor(
		private readonly userService: UsersService,
		private readonly authSerice: AuthService,
	) {}
	async facebookLogin(req): Promise<{ token: string; type: string }> {
		let type: string
		console.log(req.user)
		if (!req.user) {
			return { token: '', type: '' }
		}
		let user_id: string
		try {
			const fetchedUser = await this.userService.getUserByCustomProperty([
				{ email: req.user.email },
				{ providerId: req.user.provider_id },
			])
			console.log(22)
			console.log(fetchedUser)
			if (fetchedUser) {
				throw new CustomError({ e: 'User exists' })
			}
			const data: CreateUserResponseDto = await this.userService.createUser({
				...req.user,
				status: USER_STATUS.APPROVED,
			})
			if (!req.user.email) {
				type = LOGIN_TYPE.RECURRING_REGISTER
			} else {
				type = LOGIN_TYPE.REGISTER
			}
			user_id = data.user_id
		} catch (e) {
			const data = await this.userService.getUserByCustomProperty([
				{ email: req.user.email },
				{ providerId: req.user.provider_id },
			])
			user_id = data.id
			type = LOGIN_TYPE.LOGIN
		}
		const token = await this.authSerice.createToken({ user_id })
		return { token, type }
	}
}
