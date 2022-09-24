import {
    Controller,
    Get,
    HttpStatus,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import { FacebookService } from './facebook.service'
import { ConfigService } from '@nestjs/config'

@Controller('api/auth/facebook')
export class FacebookController {
    constructor(
        private readonly facebookService: FacebookService,
        private readonly configService: ConfigService,
    ) { }

    @Get()
    @UseGuards(AuthGuard('facebook'))
    async facebookLogin(): Promise<any> {
        return HttpStatus.OK
    }

    @Get('callback')
    @UseGuards(AuthGuard('facebook'))
    async facebookLoginRedirect(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<any> {
        console.log(req)
        const { token, type } = await this.facebookService.facebookLogin(req)
        res.redirect(`${this.configService.get<string>('FRONT_ORIGIN')}/authenticate?access_token=${token}&type=${type}`)
    }
}
