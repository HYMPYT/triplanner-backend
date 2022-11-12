import { Body, Controller, forwardRef, Get, HttpStatus, Inject, Post, Put, Req, Res } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Response } from 'express'
import * as bcrypt from 'bcrypt'
import { AuthService } from '../auth/auth.service'
import RoleAuth from 'src/guards/decorators/roles.decorator';
import { USER_ROLES } from 'src/common/enums/users/user.enum';
import { JwtAuthorizedRequest } from '../auth/interfaces/jwt.inteface';
import { AutenticateUserDto, CreateUserDto, CreateUserResponseDto, UpdateUserDto, UpdateUserInsertDto } from './dto/user.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Users Service')
@Controller('api/user')
export class UsersController {

    constructor(private userService: UsersService, @Inject(forwardRef(() => AuthService)) private authService: AuthService) { }

    @ApiCreatedResponse({ description: 'User has been created' })
	@ApiBadRequestResponse({ description: 'Email already using' })
	@ApiOperation({ summary: '[ALL] Create user' })
	@ApiOkResponse({ type: CreateUserResponseDto })
    @Post()
    async createUser(@Body() createUserRequestDto: CreateUserDto, @Res() res: Response) {
        delete createUserRequestDto.role
        const user = await this.userService.createUser(createUserRequestDto)
        if (user?.user_id) {
            res.status(HttpStatus.CREATED).json({ user_id: user?.user_id })
        } else {
            res.sendStatus(HttpStatus.BAD_REQUEST)
        }
    }

    @ApiCreatedResponse({ description: 'User with role moderator has been created' })
	@ApiBadRequestResponse({ description: 'Email already using' })
	@ApiOperation({ summary: '[ADMIN] Create moderator' })
	@ApiOkResponse({ type: CreateUserResponseDto })
    @ApiBearerAuth()
    @RoleAuth([USER_ROLES.ADMIN])
    @Post()
    async createModerator(@Body() createUserRequestDto: CreateUserDto, @Res() res: Response) {
        createUserRequestDto.role = USER_ROLES.MODERATOR
        const user = await this.userService.createUser(createUserRequestDto)
        if (user?.user_id) {
            res.status(HttpStatus.CREATED).json({ user_id: user?.user_id })
        } else {
            res.sendStatus(HttpStatus.BAD_REQUEST)
        }
    }

    @ApiCreatedResponse({ description: 'User has been created' })
	@ApiBadRequestResponse({ description: 'Email already using' })
	@ApiOperation({ summary: '[ALL] Update user' })
	@ApiBearerAuth()
    @RoleAuth([USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.MODERATOR])
    @Put()
    async updateUser(
        @Body() updateUserRequestDto: UpdateUserDto,
        @Res() res: Response,
        @Req() req: JwtAuthorizedRequest,
    ) {
        try {
            delete updateUserRequestDto.role
            const updateUserInsertDto: UpdateUserInsertDto = {
                ...updateUserRequestDto,
                user_id: req.user.id,
            }
            const update = await this.userService.updateUser(updateUserInsertDto)
            if (update) {
                res.sendStatus(HttpStatus.CREATED)
            } else {
                res.sendStatus(HttpStatus.BAD_REQUEST)
            }
        } catch (e) {
            res.sendStatus(HttpStatus.BAD_REQUEST)
        }
    }

    @ApiOkResponse({ description: 'User have found' })
	@ApiUnauthorizedResponse({ description: 'User not found' })
	@ApiInternalServerErrorResponse({ description: 'Something went wrong' })
	@ApiOperation({ summary: '[ALL] Login user to system' })
    @Post('/login')
    async login(@Res() res: Response, @Body() body: AutenticateUserDto) {
        try {
            const userResult = await this.userService.getUserByEmail(body.email)
            const passwordComparing = await bcrypt.compare(
                body.password,
                userResult.password,
            )
            if (passwordComparing) {
                const token = await this.authService.createToken({
                    user_id: userResult.id,
                })
                res.status(HttpStatus.OK).json({ access_token: token })
            } else {
                res.status(HttpStatus.BAD_REQUEST)
                    .json({ error: "Password doesn't match" })
            }
        } catch (e) {
            res.sendStatus(HttpStatus.BAD_REQUEST)
        }
    }

    @ApiOperation({ summary: '[ADMIN] Get all users' })
	@ApiBearerAuth()
    @RoleAuth([USER_ROLES.ADMIN])
    @Get('admin')
    async getAllUsers(@Res() res: Response) {
        try {
            const users: Array<User> = await this.userService.getAllUsers()
            res.status(HttpStatus.OK).json(users)
        } catch (e) {
            res.sendStatus(HttpStatus.BAD_REQUEST)
        }
    }
}
