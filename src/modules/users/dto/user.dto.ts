import { ApiProperty } from "@nestjs/swagger"
import { USER_ROLES, USER_STATUS } from "src/common/enums/users/user.enum"

export class CreateUserDto {
	@ApiProperty({ default: 'John' })
	first_name: string
	@ApiProperty({ default: 'John' })
	last_name: string
	@ApiProperty({ default: 'test@gmail.com' })
	email: string
	@ApiProperty({ default: 'qwerty12345' })
	password: string
	@ApiProperty({ enum: USER_ROLES, default: USER_ROLES.USER })
	role: USER_ROLES
}

export class UpdateUserDto {
	@ApiProperty({ default: '3564a7be-7e8f-4c1a-9662-8d0418e99644' })
	user_id: string
	@ApiProperty({ default: 'John' })
	first_name: string
	@ApiProperty({ default: 'John' })
	last_name: string
	@ApiProperty({ default: 'test@gmail.com' })
	email: string
	@ApiProperty({ default: 'qwerty12345' })
	password: string
	@ApiProperty({ enum: USER_ROLES, default: USER_ROLES.USER })
	role: USER_ROLES
}
export class RecoveryPasswordRequestDto {
	@ApiProperty({ default: 'test@gmail.com' })
	email: string
}
export class ApprovePasswordRequestDto {
	@ApiProperty({ default: '3564a7be-7e8f-4c1a-9662-8d0418e99644' })
	token: string
	@ApiProperty({ default: 'qwerty12345' })
	password: string
}
export class ApproveUserRequestDto {
	@ApiProperty({ default: '3564a7be-7e8f-4c1a-9662-8d0418e99644' })
	token: string
}
export class CreateUserInsertDto {
	@ApiProperty({ default: 'John' })
	first_name: string
	@ApiProperty({ default: 'John' })
	last_name: string
	@ApiProperty({ default: 'test@gmail.com' })
	email: string
	@ApiProperty({ default: 'qwerty12345' })
	password?: string
}
export class UpdateUserModeratorFieldsRequestDto {
	@ApiProperty({ default: '3564a7be-7e8f-4c1a-9662-8d0418e99644' })
	user_id: string
	@ApiProperty({ enum: USER_STATUS, default: USER_STATUS.ONSITE })
	status: USER_STATUS
}

export class UpdateUserModeratorFieldsInsertDto extends UpdateUserModeratorFieldsRequestDto {}

export class UpdateUserAdminFieldsRequestDto {
	@ApiProperty({ default: '3564a7be-7e8f-4c1a-9662-8d0418e99644' })
	user_id: string
	@ApiProperty({ enum: USER_ROLES, default: USER_ROLES.MODERATOR })
	role: USER_ROLES.MODERATOR
}

export class UpdateUserAdminFieldsInsertDto extends UpdateUserAdminFieldsRequestDto {}

export class UpdateUserInsertDto extends CreateUserInsertDto {
	@ApiProperty({ default: '3564a7be-7e8f-4c1a-9662-8d0418e99644' })
	user_id: string
}

export class CreateUserResponseDto {
	@ApiProperty({ default: '3564a7be-7e8f-4c1a-9662-8d0418e99644' })
	user_id: string
}

export class AutenticateUserDto {
	@ApiProperty({ default: 'test@gmail.com' })
	email: string
	@ApiProperty({ default: 'qwerty12345' })
	password: string
}

export class FindEmailResponseDto {
	valid: boolean
}

export class UserIdentityDto {
	@ApiProperty({ default: '3564a7be-7e8f-4c1a-9662-8d0418e99644' })
	user_id: string
}
