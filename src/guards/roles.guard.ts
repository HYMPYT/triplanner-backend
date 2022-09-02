import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'

@Injectable()
export class RolesAuthGuard implements CanActivate {
    roles: Array<string>
    constructor(roles: Array<string>) {
        this.roles = roles
    }
    canActivate(context: ExecutionContext): boolean {
        const roles = this.roles
        if (!roles) {
            return true
        }
        const request = context.switchToHttp().getRequest()
        for (const element of roles) {
            if (request.user.role === element) {
                return true
            }
        }
        return false
    }
}