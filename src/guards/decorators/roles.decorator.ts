import { applyDecorators, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../jwt.guard'
import { USER_ROLES } from '../../common/enums/users/user.enum'
import { RolesAuthGuard } from '../roles.guard'

const RoleAuth = (roles: Array<USER_ROLES>) =>
    applyDecorators(UseGuards(JwtAuthGuard, new RolesAuthGuard(roles)))
export default RoleAuth
