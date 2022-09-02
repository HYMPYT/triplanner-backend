import { Injectable } from '@nestjs/common'
import { UsersService } from '../../../users/users.service'
import { CreateUserResponseDto } from '../../../users/dto/create-user-response.dto'
import { AuthService } from '../../auth.service'
import { USER_STATUS } from '../../../../common/enums/users/user.enum'
import { LOGIN_TYPE } from '../../../../common/enums/login/login.enum'
import { CustomError } from '../../../../helpers/error.helper'

@Injectable()
export class GoogleService {
	constructor(
		private readonly userService: UsersService,
		private readonly authSerice: AuthService,
	) {}

	async googleLogin(req): Promise<{ token: string; type: string }> {
		let type: string
		if (!req.user) {
			return { token: '', type: '' }
		}
		let user_id: string
		try {
			const fetchedUser = await this.userService.getUserByCustomProperty([
				{ email: req.user.email },
			])
			if (fetchedUser) {
				throw new CustomError({ e: 'User exists' })
			}
			const data: CreateUserResponseDto = await this.userService.createUser({
				...req.user,
				status: USER_STATUS.APPROVED,
			})
			user_id = data.user_id
			type = LOGIN_TYPE.REGISTER
		} catch (e) {
			const data = await this.userService.getUserByCustomProperty([
				{ email: req.user.email },
			])
			user_id = data.user_id
			type = LOGIN_TYPE.LOGIN
		}
		const token = await this.authSerice.createToken({ user_id })
		return { token, type }
	}
}
